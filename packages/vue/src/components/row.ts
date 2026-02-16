import type { CSSProperties } from 'vue';
import { defineComponent, h } from 'vue';

export interface RowProps {
  style?: CSSProperties;
}

export const Row = defineComponent({
  name: 'ERow',
  props: {
    style: {
      type: Object as () => CSSProperties,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      return h(
        'table',
        {
          ...attrs,
          align: 'center',
          width: '100%',
          border: 0,
          cellpadding: '0',
          cellspacing: '0',
          role: 'presentation',
          style: props.style,
        },
        [
          h('tbody', { style: { width: '100%' } }, [
            h('tr', { style: { width: '100%' } }, slots.default?.()),
          ]),
        ],
      );
    };
  },
});
