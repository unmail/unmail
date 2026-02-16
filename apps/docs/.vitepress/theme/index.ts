import DefaultTheme from 'vitepress/theme';
import 'virtual:group-icons.css';
import type { Theme } from 'vitepress';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    //
  },
} satisfies Theme;
