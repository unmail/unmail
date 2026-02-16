import * as React from 'react';
import type { PrismLanguage } from './languages-available';
import { Prism } from './prism';
import type { Theme } from './themes';

export interface CodeBlockProps
  extends React.ComponentPropsWithoutRef<'pre'> {
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
}

const stylesForToken = (token: Prism.Token, theme: Theme) => {
  let styles = { ...theme[token.type] };

  const aliases = Array.isArray(token.alias) ? token.alias : [token.alias];

  for (const alias of aliases) {
    styles = { ...styles, ...theme[alias] };
  }

  return styles;
};

const CodeBlockLine = ({
  token,
  theme,
  inheritedStyles,
}: {
  token: string | Prism.Token;
  theme: Theme;
  inheritedStyles?: React.CSSProperties;
}) => {
  if (token instanceof Prism.Token) {
    const styleForToken = {
      ...inheritedStyles,
      ...stylesForToken(token, theme),
    };

    if (token.content instanceof Prism.Token) {
      return (
        <span style={styleForToken}>
          <CodeBlockLine theme={theme} token={token.content} />
        </span>
      );
    }
    if (typeof token.content === 'string') {
      return <span style={styleForToken}>{token.content}</span>;
    }
    return (
      <>
        {token.content.map((subToken, i) => (
          <CodeBlockLine
            inheritedStyles={styleForToken}
            key={i}
            theme={theme}
            token={subToken}
          />
        ))}
      </>
    );
  }

  return (
    <span style={inheritedStyles}>
      {token.replaceAll(' ', '\xA0\u200D\u200B')}
    </span>
  );
};

export const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ code, fontFamily, lineNumbers, theme, language, ...rest }, ref) => {
    const languageGrammar = Prism.languages[language];
    if (typeof languageGrammar === 'undefined') {
      throw new Error(
        `CodeBlock: There is no language defined on Prism called ${language}`,
      );
    }

    const lines = code.split(/\r\n|\r|\n/gm);
    const tokensPerLine = lines.map((line) =>
      Prism.tokenize(line, languageGrammar),
    );

    return (
      <pre
        {...rest}
        ref={ref}
        style={{ ...theme.base, width: '100%', ...rest.style }}
      >
        <code>
          {tokensPerLine.map((tokensForLine, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {lineNumbers ? (
                <span
                  style={{
                    width: '2em',
                    height: '1em',
                    display: 'inline-block',
                    fontFamily: fontFamily,
                  }}
                >
                  {lineIndex + 1}
                </span>
              ) : null}

              {tokensForLine.map((token, i) => (
                <CodeBlockLine
                  inheritedStyles={{ fontFamily: fontFamily }}
                  key={i}
                  theme={theme}
                  token={token}
                />
              ))}
              <br />
            </React.Fragment>
          ))}
        </code>
      </pre>
    );
  },
);

CodeBlock.displayName = 'CodeBlock';
