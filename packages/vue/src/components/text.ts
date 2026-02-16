import type { CSSProperties } from 'vue';
import { defineComponent, h } from 'vue';
import { computeMargins } from '../utils/compute-margins';

export interface TextProps {
  style?: CSSProperties;
}

export const Text = defineComponent({
  name: 'EText',
  props: {
    style: {
      type: Object as () => CSSProperties,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const style = props.style;
      const defaultMargins: CSSProperties = {};
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

      return h(
        'p',
        {
          ...attrs,
          style: {
            fontSize: '14px',
            lineHeight: '24px',
            ...style,
            ...margins,
          },
        },
        slots.default?.(),
      );
    };
  },
});
