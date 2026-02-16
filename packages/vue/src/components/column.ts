import type { CSSProperties } from 'vue';
import { defineComponent, h } from 'vue';

export interface ColumnProps {
  style?: CSSProperties;
}

export const Column = defineComponent({
  name: 'EColumn',
  props: {
    style: {
      type: Object as () => CSSProperties,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      return h(
        'td',
        {
          ...attrs,
          style: props.style,
        },
        slots.default?.(),
      );
    };
  },
});
