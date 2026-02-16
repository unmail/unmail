import DefaultTheme from 'vitepress/theme'
import PackageManagerTabs from './components/PackageManagerTabs.vue'
import type { Theme } from 'vitepress'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PackageManagerTabs', PackageManagerTabs)
  },
} satisfies Theme
