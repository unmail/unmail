import * as React from 'react';

const marginProperties: (keyof React.CSSProperties)[] = [
  'margin',
  'marginTop',
  'marginBottom',
  'marginRight',
  'marginLeft',
  'marginInline',
  'marginBlock',
  'marginBlockStart',
  'marginBlockEnd',
  'marginInlineStart',
  'marginInlineEnd',
];

export type BodyProps = Readonly<React.HtmlHTMLAttributes<HTMLBodyElement>>;

export const Body = React.forwardRef<HTMLBodyElement, BodyProps>(
  ({ children, style, ...props }, ref) => {
    const bodyStyle: Record<string, string | number | undefined> = {
      background: style?.background,
      backgroundColor: style?.backgroundColor,
    };
    if (style) {
      for (const property of marginProperties) {
        bodyStyle[property] = style[property] !== undefined ? 0 : undefined;
      }
    }
    return (
      <body {...props} style={bodyStyle} ref={ref}>
        <table
          border={0}
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
          align="center"
        >
          <tbody>
            <tr>
              <td style={style}>{children}</td>
            </tr>
          </tbody>
        </table>
      </body>
    );
  },
);

Body.displayName = 'Body';
