import type { CSSProperties, PropType } from 'vue';
import { defineComponent, h } from 'vue';

export interface HtmlProps {
  lang?: string;
  dir?: 'ltr' | 'rtl' | 'auto';
}

export const Html = defineComponent({
  name: 'EHtml',
  props: {
    lang: {
      type: String,
      default: 'en',
    },
    dir: {
      type: String as PropType<'ltr' | 'rtl' | 'auto'>,
      default: 'ltr',
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      return h(
        'html',
        {
          ...attrs,
          lang: props.lang,
          dir: props.dir,
        },
        slots.default?.(),
      );
    };
  },
});
