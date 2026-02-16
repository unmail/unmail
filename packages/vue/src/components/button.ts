import type { CSSProperties } from 'vue';
import { defineComponent, h } from 'vue';
import { parsePadding } from '../utils/parse-padding';
import { pxToPt } from '../utils/px-to-pt';

export interface ButtonProps {
  href?: string;
  target?: string;
  style?: CSSProperties;
}

const maxFontWidth = 5;

function computeFontWidthAndSpaceCount(expectedWidth: number) {
  if (expectedWidth === 0) return [0, 0] as const;

  let smallestSpaceCount = 0;

  const computeRequiredFontWidth = () => {
    if (smallestSpaceCount > 0) {
      return expectedWidth / smallestSpaceCount / 2;
    }
    return Number.POSITIVE_INFINITY;
  };

  while (computeRequiredFontWidth() > maxFontWidth) {
    smallestSpaceCount++;
  }

  return [computeRequiredFontWidth(), smallestSpaceCount] as const;
}

export const Button = defineComponent({
  name: 'EButton',
  props: {
    href: {
      type: String,
      default: undefined,
    },
    target: {
      type: String,
      default: '_blank',
    },
    style: {
      type: Object as () => CSSProperties,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const style = props.style ?? {};
      const { paddingTop, paddingRight, paddingBottom, paddingLeft } =
        parsePadding(style);

      const y = (paddingTop ?? 0) + (paddingBottom ?? 0);
      const textRaise = pxToPt(y);

      const [plFontWidth, plSpaceCount] = computeFontWidthAndSpaceCount(
        paddingLeft ?? 0,
      );
      const [prFontWidth, prSpaceCount] = computeFontWidthAndSpaceCount(
        paddingRight ?? 0,
      );

      const firstSpan = `<!--[if mso]><i style="mso-font-width:${
        plFontWidth * 100
      }%;mso-text-raise:${textRaise}" hidden>${'&#8202;'.repeat(
        plSpaceCount,
      )}</i><![endif]-->`;
      const secondSpan = `<!--[if mso]><i style="mso-font-width:${
        prFontWidth * 100
      }%" hidden>${'&#8202;'.repeat(
        prSpaceCount,
      )}&#8203;</i><![endif]-->`;

      return h(
        'a',
        {
          ...attrs,
          href: props.href,
          target: props.target,
          style: {
            lineHeight: '100%',
            textDecoration: 'none',
            display: 'inline-block',
            maxWidth: '100%',
            msoPaddingAlt: '0px',
            ...style,
            paddingTop: paddingTop !== undefined ? `${paddingTop}px` : undefined,
            paddingRight: paddingRight !== undefined ? `${paddingRight}px` : undefined,
            paddingBottom: paddingBottom !== undefined ? `${paddingBottom}px` : undefined,
            paddingLeft: paddingLeft !== undefined ? `${paddingLeft}px` : undefined,
          },
        },
        [
          h('span', { innerHTML: firstSpan }),
          h(
            'span',
            {
              style: {
                maxWidth: '100%',
                display: 'inline-block',
                lineHeight: '120%',
                msoPaddingAlt: '0px',
                msoTextRaise: `${pxToPt(paddingBottom)}`,
              },
            },
            slots.default?.(),
          ),
          h('span', { innerHTML: secondSpan }),
        ],
      );
    };
  },
});
