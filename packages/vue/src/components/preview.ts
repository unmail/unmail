import { defineComponent, h } from 'vue';

export interface PreviewProps {}

const PREVIEW_MAX_LENGTH = 150;

const whiteSpaceCodes = '\xa0\u200C\u200B\u200D\u200E\u200F\uFEFF';

function renderWhiteSpace(text: string) {
  if (text.length >= PREVIEW_MAX_LENGTH) {
    return null;
  }
  return h('div', whiteSpaceCodes.repeat(PREVIEW_MAX_LENGTH - text.length));
}

export const Preview = defineComponent({
  name: 'EPreview',
  setup(_, { slots, attrs }) {
    return () => {
      const children = slots.default?.();
      let text = '';
      if (children) {
        for (const child of children) {
          if (typeof child === 'string') {
            text += child;
          } else if (
            child &&
            typeof child === 'object' &&
            'children' in child &&
            typeof child.children === 'string'
          ) {
            text += child.children;
          }
        }
      }
      text = text.substring(0, PREVIEW_MAX_LENGTH);

      return h(
        'div',
        {
          ...attrs,
          style: {
            display: 'none',
            overflow: 'hidden',
            lineHeight: '1px',
            opacity: 0,
            maxHeight: 0,
            maxWidth: 0,
          },
        },
        [text, renderWhiteSpace(text)],
      );
    };
  },
});
