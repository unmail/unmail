import type { CSSProperties } from 'vue';
import { defineComponent, h } from 'vue';

const marginProperties: (keyof CSSProperties)[] = [
  'margin',
  'marginTop',
  'marginBottom',
  'marginRight',
  'marginLeft',
];

export interface BodyProps {
  style?: CSSProperties;
}

export const Body = defineComponent({
  name: 'EBody',
  props: {
    style: {
      type: Object as () => CSSProperties,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const style = props.style;
      const bodyStyle: Record<string, string | number | undefined> = {
        background: style?.background as string | undefined,
        backgroundColor: style?.backgroundColor as string | undefined,
      };
      if (style) {
        for (const property of marginProperties) {
          bodyStyle[property as string] =
            style[property] !== undefined ? 0 : undefined;
        }
      }

      return h(
        'body',
        { ...attrs, style: bodyStyle },
        [
          h(
            'table',
            {
              border: 0,
              width: '100%',
              cellpadding: '0',
              cellspacing: '0',
              role: 'presentation',
              align: 'center',
            },
            [
              h('tbody', [
                h('tr', [
                  h('td', { style }, slots.default?.()),
                ]),
              ]),
            ],
          ),
        ],
      );
    };
  },
});
