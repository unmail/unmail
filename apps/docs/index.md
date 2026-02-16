---
layout: home

hero:
  name: unmail
  text: Email components for React & Vue
  tagline: Unstyled, Tailwind-powered, email-client-compatible components. Build beautiful emails with the framework you already know.
  actions:
    - theme: brand
      text: Get Started
      link: /installation
    - theme: alt
      text: Components
      link: /components/html

features:
  - title: React & Vue Parity
    details: Both packages expose the same 16 components and produce identical HTML output. Switch frameworks without worrying about rendering differences.
  - title: Tailwind CSS v4
    details: First-class Tailwind support via the Tailwind wrapper component. Utility classes are compiled and inlined at render time.
  - title: Email Hacks Built-in
    details: Outlook conditional comments, Yahoo/AOL body table wrappers, Apple Mail meta tags, and MSO padding tricks are handled automatically.
  - title: Server-side Rendering
    details: The async render() function produces a complete HTML string ready to send via Nodemailer, Resend, SendGrid, or any email provider.
---
