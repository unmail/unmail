import * as React from 'react';

type RootProps = React.ComponentPropsWithoutRef<'code'> &
  React.ComponentPropsWithoutRef<'span'>;

export type CodeInlineProps = Readonly<RootProps>;

/**
 * Renders an inline `<code>` element with a compatibility fix for the
 * Orange.fr email client, which strips `<code>` tags.
 *
 * A hidden `<span>` fallback is revealed via CSS when the `<head>` (and its
 * `<meta>` tags) are removed — a behaviour specific to Orange.fr.
 */
export const CodeInline = React.forwardRef<HTMLSpanElement, CodeInlineProps>(
  ({ children, ...props }, ref) => {
    return (
      <>
        {/*
    Orange.fr email client fix:
    - <code class="cino"> is hidden on Orange.fr via the meta ~ .cino selector
    - <span class="cio"> is revealed on Orange.fr via the meta ~ .cio selector
    See: https://www.caniemail.com/features/html-code/
    */}
        <style>{`
        meta ~ .cino {
          display: none !important;
          opacity: 0 !important;
        }

        meta ~ .cio {
          display: block !important;
        }
      `}</style>

        {/* Does not render on Orange.fr */}
        <code
          {...props}
          className={`${props.className ? props.className : ''} cino`}
        >
          {children}
        </code>

        {/* Renders only on Orange.fr */}
        <span
          {...props}
          className={`${props.className ? props.className : ''} cio`}
          ref={ref}
          style={{ display: 'none', ...props.style }}
        >
          {children}
        </span>
      </>
    );
  },
);

CodeInline.displayName = 'CodeInline';
