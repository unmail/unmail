import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'unmail',
  description: 'Unstyled email components for React and Vue. Build beautiful emails with Tailwind CSS.',

  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/introduction' },
      { text: 'Components', link: '/components/html' },
      { text: 'Rendering', link: '/rendering/render' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Installation', link: '/installation' },
          { text: 'Quick Start', link: '/quick-start' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'Html', link: '/components/html' },
          { text: 'Head', link: '/components/head' },
          { text: 'Body', link: '/components/body' },
          { text: 'Container', link: '/components/container' },
          { text: 'Section', link: '/components/section' },
          { text: 'Row', link: '/components/row' },
          { text: 'Column', link: '/components/column' },
          { text: 'Text', link: '/components/text' },
          { text: 'Heading', link: '/components/heading' },
          { text: 'Link', link: '/components/link' },
          { text: 'Img', link: '/components/img' },
          { text: 'Button', link: '/components/button' },
          { text: 'Hr', link: '/components/hr' },
          { text: 'Preview', link: '/components/preview' },
          { text: 'Font', link: '/components/font' },
          { text: 'Markdown', link: '/components/markdown' },
        ],
      },
      {
        text: 'Rendering',
        items: [
          { text: 'render()', link: '/rendering/render' },
          { text: 'Tailwind', link: '/rendering/tailwind' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pfrfrh/unmail' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright 2025 unmail',
    },

    search: {
      provider: 'local',
    },
  },
})
