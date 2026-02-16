import type { CSSProperties } from 'vue';
import { defineComponent, h } from 'vue';

export interface SectionProps {
  style?: CSSProperties;
}

export const Section = defineComponent({
  name: 'ESection',
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
          h('tbody', [
            h('tr', [
              h('td', slots.default?.()),
            ]),
          ]),
        ],
      );
    };
  },
});
