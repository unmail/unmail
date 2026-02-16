import type { CSSProperties } from 'vue';
import { defineComponent, h } from 'vue';

export interface ContainerProps {
  style?: CSSProperties;
}

export const Container = defineComponent({
  name: 'EContainer',
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
          style: { maxWidth: '37.5em', ...props.style },
        },
        [
          h('tbody', [
            h('tr', { style: { width: '100%' } }, [
              h('td', slots.default?.()),
            ]),
          ]),
        ],
      );
    };
  },
});
