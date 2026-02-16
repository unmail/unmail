import * as React from 'react';
import { computeMargins } from '../utils/compute-margins';

export type TextProps = Readonly<React.ComponentPropsWithoutRef<'p'>>;

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ style, ...props }, ref) => {
    const defaultMargins: React.CSSProperties = {};
    if (style?.marginTop === undefined) {
      defaultMargins.marginTop = '16px';
    }
    if (style?.marginBottom === undefined) {
      defaultMargins.marginBottom = '16px';
    }
    const margins = computeMargins({
      ...defaultMargins,
      ...style,
    });

    return (
      <p
        {...props}
        ref={ref}
        style={{
          fontSize: '14px',
          lineHeight: '24px',
          ...style,
          ...margins,
        }}
      />
    );
  },
);

Text.displayName = 'Text';
