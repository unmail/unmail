import type { CSSProperties, PropType } from 'vue';
import { defineComponent, h } from 'vue';
import type { Margin } from '../utils/spaces';
import { withMargin } from '../utils/spaces';

export type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends Margin {
  as?: HeadingAs;
  style?: CSSProperties;
}

export const Heading = defineComponent({
  name: 'EHeading',
  props: {
    as: {
      type: String as PropType<HeadingAs>,
      default: 'h1',
    },
    m: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    mx: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    my: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    mt: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    mr: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    mb: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    ml: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    style: {
      type: Object as () => CSSProperties,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      return h(
        props.as!,
        {
          ...attrs,
          style: {
            ...withMargin({
              m: props.m,
              mx: props.mx,
              my: props.my,
              mt: props.mt,
              mr: props.mr,
              mb: props.mb,
              ml: props.ml,
            }),
            ...props.style,
          },
        },
        slots.default?.(),
      );
    };
  },
});
