import type { CSSProperties, PropType } from 'vue';
import { defineComponent, h } from 'vue';

export interface ImgProps {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  style?: CSSProperties;
}

export const Img = defineComponent({
  name: 'EImg',
  props: {
    src: {
      type: String,
      default: undefined,
    },
    alt: {
      type: String,
      default: undefined,
    },
    width: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    style: {
      type: Object as () => CSSProperties,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    return () => {
      return h('img', {
        ...attrs,
        src: props.src,
        alt: props.alt,
        width: props.width,
        height: props.height,
        style: {
          display: 'block',
          outline: 'none',
          border: 'none',
          textDecoration: 'none',
          ...props.style,
        },
      });
    };
  },
});
