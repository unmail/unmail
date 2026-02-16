import { type CssNode, generate, List, type StyleSheet } from 'css-tree';
import type { PropType } from 'vue';
import { createSSRApp, defineComponent, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import type { Config } from 'tailwindcss';
import { sanitizeStyleSheet } from './sanitize-stylesheet';
import { extractRulesPerClass } from './utils/extract-rules-per-class';
import { getCustomProperties } from './utils/get-custom-properties';
import { sanitizeNonInlinableRules } from './utils/sanitize-non-inlinable-rules';
import { makeInlineStylesFor } from './utils/make-inline-styles-for';
import { sanitizeClassName } from './utils/sanitize-class-name';
import { setupTailwind } from './setup-tailwind';
import { cleanup } from '../render/cleanup';

export type TailwindConfig = Omit<Config, 'content'>;

export interface TailwindProps {
  config?: TailwindConfig;
}

export const pixelBasedPreset: TailwindConfig = {
  theme: {
    extend: {
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '36px' }],
        '5xl': ['48px', { lineHeight: '1' }],
        '6xl': ['60px', { lineHeight: '1' }],
        '7xl': ['72px', { lineHeight: '1' }],
        '8xl': ['96px', { lineHeight: '1' }],
        '9xl': ['144px', { lineHeight: '1' }],
      },
      spacing: {
        px: '1px',
        0: '0',
        0.5: '2px',
        1: '4px',
        1.5: '6px',
        2: '8px',
        2.5: '10px',
        3: '12px',
        3.5: '14px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px',
        28: '112px',
        32: '128px',
        36: '144px',
        40: '160px',
        44: '176px',
        48: '192px',
        52: '208px',
        56: '224px',
        60: '240px',
        64: '256px',
        72: '288px',
        80: '320px',
        96: '384px',
      },
    },
  },
};

/**
 * Extracts all class names from an HTML string.
 */
function extractClassesFromHtml(html: string): string[] {
  const classSet = new Set<string>();
  const classAttrRegex = /\bclass="([^"]*)"/g;
  let match: RegExpExecArray | null;
  while ((match = classAttrRegex.exec(html)) !== null) {
    for (const cls of match[1].split(/\s+/)) {
      if (cls) classSet.add(cls);
    }
  }
  return Array.from(classSet);
}

/**
 * Converts a CSSProperties-like record to an inline style string.
 */
function styleObjectToString(styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([prop, value]) => {
      // Convert camelCase to kebab-case
      const kebab = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${kebab}:${value}`;
    })
    .join(';');
}

/**
 * Applies inlined Tailwind styles to HTML elements:
 * - For each element with a class attribute, looks up inlinable rules
 * - Merges them into the existing style attribute
 * - Replaces non-inlinable class names with sanitized versions
 * - Removes fully-resolved class names
 */
function applyInlineStylesToHtml(
  html: string,
  inlinableRules: Map<string, import('css-tree').Rule>,
  nonInlinableRules: Map<string, import('css-tree').Rule>,
  customProperties: import('./utils/get-custom-properties').CustomProperties,
): string {
  // Match elements with class attributes
  return html.replace(
    /<([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^>]*?)?)>/g,
    (fullMatch, tagName: string, attrsStr: string) => {
      const classMatch = /\bclass="([^"]*)"/.exec(attrsStr);
      if (!classMatch) return fullMatch;

      const classes = classMatch[1].split(/\s+/).filter(Boolean);
      const residualClasses: string[] = [];
      const rulesToInline: import('css-tree').Rule[] = [];

      for (const className of classes) {
        const rule = inlinableRules.get(className);
        if (rule) {
          rulesToInline.push(rule);
        }
        if (nonInlinableRules.has(className)) {
          residualClasses.push(sanitizeClassName(className));
        } else if (!rule) {
          residualClasses.push(className);
        }
      }

      let newAttrs = attrsStr;

      // Build inline styles from rules
      if (rulesToInline.length > 0) {
        const styles = makeInlineStylesFor(rulesToInline, customProperties);
        const newStyleStr = styleObjectToString(styles);

        if (newStyleStr) {
          const existingStyleMatch = /\bstyle="([^"]*)"/.exec(newAttrs);
          if (existingStyleMatch) {
            // Append new styles after existing (Tailwind utilities take precedence)
            const merged = `${existingStyleMatch[1]};${newStyleStr}`;
            newAttrs = newAttrs.replace(
              /\bstyle="[^"]*"/,
              `style="${merged}"`,
            );
          } else {
            newAttrs = `${newAttrs} style="${newStyleStr}"`;
          }
        }
      }

      // Update or remove class attribute
      if (residualClasses.length > 0) {
        newAttrs = newAttrs.replace(
          /\bclass="[^"]*"/,
          `class="${residualClasses.join(' ')}"`,
        );
      } else {
        newAttrs = newAttrs.replace(/\s*\bclass="[^"]*"/, '');
      }

      return `<${tagName}${newAttrs}>`;
    },
  );
}

export const Tailwind = defineComponent({
  name: 'ETailwind',
  props: {
    config: {
      type: Object as PropType<TailwindConfig>,
      default: () => ({}),
    },
  },
  async setup(props, { slots }) {
    if (!slots.default || !slots.default()) {
      throw new Error('Tailwind component must have a default slot');
    }

    // 1. Render slot content to HTML string
    const slotContent = slots.default();
    const wrapperApp = createSSRApp({
      render: () => h('div', slotContent),
    });
    let markup = await renderToString(wrapperApp);
    // Strip wrapper <div> and clean up SSR artifacts
    markup = cleanup(markup.replace(/^<div[^>]*>/, '').replace(/<\/div>$/, ''));

    // 2. Extract class names from rendered HTML
    const classesUsed = extractClassesFromHtml(markup);

    if (classesUsed.length === 0) {
      // No Tailwind classes — return markup as-is
      return () => h('unmail-tailwind', { innerHTML: markup });
    }

    // 3. Setup Tailwind compiler and generate CSS
    const tailwindSetup = await setupTailwind(props.config ?? {});
    tailwindSetup.addUtilities(classesUsed);
    const styleSheet = tailwindSetup.getStyleSheet();

    // 4. Sanitize the stylesheet (resolve variables, calc, oklch→rgb, etc.)
    sanitizeStyleSheet(styleSheet);

    // 5. Extract inlinable vs non-inlinable rules
    const { inlinable: inlinableRules, nonInlinable: nonInlinableRules } =
      extractRulesPerClass(styleSheet, classesUsed);

    const customProperties = getCustomProperties(styleSheet);

    // 6. Build non-inlinable stylesheet (media queries, pseudo-classes)
    const nonInlineStyles: StyleSheet = {
      type: 'StyleSheet',
      children: new List<CssNode>().fromArray(
        Array.from(nonInlinableRules.values()),
      ),
    };
    sanitizeNonInlinableRules(nonInlineStyles);

    const hasNonInlineStylesToApply = nonInlinableRules.size > 0;
    const nonInlineCss = hasNonInlineStylesToApply
      ? generate(nonInlineStyles)
      : '';

    // 7. Validate that <head> exists for non-inlinable styles
    const hasHead = /<head[^>]*>/i.test(markup);
    if (hasNonInlineStylesToApply && !hasHead) {
      throw new Error(
        `You are trying to use the following Tailwind classes that cannot be inlined: ${Array.from(
          nonInlinableRules.keys(),
        ).join(' ')}.
For the media queries to work properly on rendering, they need to be added into a <style> tag inside of a <head> tag.
The Tailwind component tried finding a <head> element but was unable to find it.

Make sure that you have a <Head> component inside the <Tailwind> component.`,
      );
    }

    // 8. Apply inline styles to HTML
    markup = applyInlineStylesToHtml(
      markup,
      inlinableRules,
      nonInlinableRules,
      customProperties,
    );

    // 9. Inject non-inlinable styles into <head>
    if (nonInlineCss && hasHead) {
      markup = markup.replace(
        /(<head[^>]*>)/i,
        `$1<style>${nonInlineCss}</style>`,
      );
    }

    return () => h('unmail-tailwind', { innerHTML: markup });
  },
});
