import type { CSSProperties } from 'vue';
import { defineComponent, h } from 'vue';

export interface LinkProps {
  href?: string;
  target?: string;
  style?: CSSProperties;
}

export const Link = defineComponent({
  name: 'ELink',
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
      return h(
        'a',
        {
          ...attrs,
          href: props.href,
          target: props.target,
          style: {
            color: '#067df7',
            textDecorationLine: 'none',
            ...props.style,
          },
        },
        slots.default?.(),
      );
    };
  },
});
