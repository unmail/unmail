import { defineComponent, h } from 'vue';

export interface HeadProps {}

export const Head = defineComponent({
  name: 'EHead',
  setup(_, { slots, attrs }) {
    return () => {
      return h('head', { ...attrs }, [
        h('meta', { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }),
        h('meta', { name: 'x-apple-disable-message-reformatting' }),
        slots.default?.(),
      ]);
    };
  },
});
