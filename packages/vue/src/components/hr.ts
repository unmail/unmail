import type { CSSProperties } from 'vue';
import { defineComponent, h } from 'vue';

export interface HrProps {
  style?: CSSProperties;
}

export const Hr = defineComponent({
  name: 'EHr',
  props: {
    style: {
      type: Object as () => CSSProperties,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    return () => {
      return h('hr', {
        ...attrs,
        style: {
          width: '100%',
          border: 'none',
          borderTop: '1px solid #eaeaea',
          ...props.style,
        },
      });
    };
  },
});
