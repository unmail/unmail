import type { CSSProperties } from 'vue';
import { defineComponent, h } from 'vue';

export interface CodeInlineProps {
  style?: CSSProperties;
  class?: string;
}

/**
 * Renders an inline `<code>` element with a compatibility fix for the
 * Orange.fr email client, which strips `<code>` tags.
 *
 * A hidden `<span>` fallback is revealed via CSS when the `<head>` (and its
 * `<meta>` tags) are removed — a behaviour specific to Orange.fr.
 */
export const CodeInline = defineComponent({
  name: 'ECodeInline',
  props: {
    style: {
      type: Object as () => CSSProperties,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const className = (attrs.class as string) ?? '';
      const { class: _, ...restAttrs } = attrs;
      const children = slots.default?.();

      return [
        // Orange.fr email client fix style tag
        h('style', null, `
        meta ~ .cino {
          display: none !important;
          opacity: 0 !important;
        }

        meta ~ .cio {
          display: block !important;
        }
      `),

        // Does not render on Orange.fr
        h(
          'code',
          {
            ...restAttrs,
            class: `${className} cino`.trim(),
            style: props.style,
          },
          children,
        ),

        // Renders only on Orange.fr
        h(
          'span',
          {
            ...restAttrs,
            class: `${className} cio`.trim(),
            style: { display: 'none', ...props.style },
          },
          children,
        ),
      ];
    };
  },
});
