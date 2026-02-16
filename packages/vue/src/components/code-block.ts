import type { CSSProperties, PropType, VNode } from 'vue';
import { defineComponent, h } from 'vue';
import type { PrismLanguage } from './languages-available';
import { Prism } from './prism';
import type { Theme } from './themes';

export interface CodeBlockProps {
  /** The source code to highlight. */
  code: string;
  /** The PrismJS language grammar to use for tokenization. */
  language: PrismLanguage;
  /** A theme object mapping token types to inline styles. */
  theme: Theme;
  /** Whether to display line numbers. */
  lineNumbers?: boolean;
  /**
   * Override the font family on all rendered elements.
   * Useful when a global `<Font>` component sets a different family.
   */
  fontFamily?: string;
  style?: CSSProperties;
}

const stylesForToken = (
  token: Prism.Token,
  theme: Theme,
): CSSProperties => {
  let styles: CSSProperties = {
    ...(theme[token.type] as CSSProperties),
  };

  const aliases = Array.isArray(token.alias) ? token.alias : [token.alias];

  for (const alias of aliases) {
    styles = { ...styles, ...(theme[alias] as CSSProperties) };
  }

  return styles;
};

function renderToken(
  token: string | Prism.Token,
  theme: Theme,
  inheritedStyles?: CSSProperties,
): VNode | VNode[] {
  if (token instanceof Prism.Token) {
    const styleForToken: CSSProperties = {
      ...inheritedStyles,
      ...stylesForToken(token, theme),
    };

    if (token.content instanceof Prism.Token) {
      return h(
        'span',
        { style: styleForToken },
        [renderToken(token.content, theme) as VNode],
      );
    }
    if (typeof token.content === 'string') {
      return h('span', { style: styleForToken }, token.content);
    }
    return token.content.map((subToken) =>
      renderToken(subToken, theme, styleForToken),
    ) as VNode[];
  }

  return h(
    'span',
    { style: inheritedStyles },
    token.replaceAll(' ', '\xA0\u200D\u200B'),
  );
}

export const CodeBlock = defineComponent({
  name: 'ECodeBlock',
  props: {
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String as PropType<PrismLanguage>,
      required: true,
    },
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
    lineNumbers: {
      type: Boolean,
      default: false,
    },
    fontFamily: {
      type: String,
      default: undefined,
    },
    style: {
      type: Object as () => CSSProperties,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    return () => {
      const languageGrammar = Prism.languages[props.language];
      if (typeof languageGrammar === 'undefined') {
        throw new Error(
          `CodeBlock: There is no language defined on Prism called ${props.language}`,
        );
      }

      const lines = props.code.split(/\r\n|\r|\n/gm);
      const tokensPerLine = lines.map((line) =>
        Prism.tokenize(line, languageGrammar),
      );

      const children: VNode[] = [];

      for (let lineIndex = 0; lineIndex < tokensPerLine.length; lineIndex++) {
        const tokensForLine = tokensPerLine[lineIndex];
        const lineChildren: (VNode | VNode[])[] = [];

        if (props.lineNumbers) {
          lineChildren.push(
            h(
              'span',
              {
                style: {
                  width: '2em',
                  height: '1em',
                  display: 'inline-block',
                  fontFamily: props.fontFamily,
                } as CSSProperties,
              },
              String(lineIndex + 1),
            ),
          );
        }

        for (const token of tokensForLine) {
          const rendered = renderToken(token, props.theme, {
            fontFamily: props.fontFamily,
          } as CSSProperties);
          if (Array.isArray(rendered)) {
            lineChildren.push(...rendered);
          } else {
            lineChildren.push(rendered);
          }
        }

        lineChildren.push(h('br'));
        children.push(...(lineChildren.flat() as VNode[]));
      }

      return h(
        'pre',
        {
          ...attrs,
          style: {
            ...(props.theme.base as CSSProperties),
            width: '100%',
            ...props.style,
          },
        },
        [h('code', null, children)],
      );
    };
  },
});
