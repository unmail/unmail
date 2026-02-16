# unmail

Unstyled email components for React and Vue. Build beautiful emails with Tailwind CSS.

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [@unmail/react](https://www.npmjs.com/package/@unmail/react) | ![npm](https://img.shields.io/npm/v/@unmail/react) | React components, render, and Tailwind support |
| [@unmail/vue](https://www.npmjs.com/package/@unmail/vue) | ![npm](https://img.shields.io/npm/v/@unmail/vue) | Vue components, render, and Tailwind support |

## Features

- **Unstyled by default** -- Only the minimal styles needed for email client compatibility
- **Tailwind CSS v4** -- First-class support via the `<Tailwind>` wrapper component
- **Email client hacks built-in** -- Outlook conditional comments, Yahoo/AOL body wrappers, Apple Mail meta tags
- **Identical output** -- React and Vue produce the same HTML
- **Server-side rendering** -- `render()` produces a complete HTML string ready to send

## Quick Start

### React

```bash
npm install @unmail/react
```

```tsx
import {
  Html, Head, Body, Container,
  Text, Heading, Button, Tailwind,
  render,
} from '@unmail/react';

function WelcomeEmail({ name }: { name: string }) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-gray-100">
          <Container className="bg-white mx-auto my-10 p-8">
            <Heading as="h1" className="text-2xl font-bold">
              Welcome, {name}!
            </Heading>
            <Text className="text-gray-600">
              We're glad to have you on board.
            </Text>
            <Button
              href="https://example.com"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md"
            >
              Get Started
            </Button>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

const html = await render(<WelcomeEmail name="Alice" />);
```

### Vue

```bash
npm install @unmail/vue
```

```ts
import { defineComponent, h } from 'vue';
import {
  Html, Head, Body, Container,
  Text, Heading, Button, Tailwind,
  render,
} from '@unmail/vue';

const WelcomeEmail = defineComponent({
  props: { name: { type: String, required: true } },
  setup(props) {
    return () =>
      h(Tailwind, null, () =>
        h(Html, null, () => [
          h(Head),
          h(Body, { class: 'bg-gray-100' }, () =>
            h(Container, { class: 'bg-white mx-auto my-10 p-8' }, () => [
              h(Heading, { as: 'h1', class: 'text-2xl font-bold' }, () =>
                `Welcome, ${props.name}!`
              ),
              h(Text, { class: 'text-gray-600' }, () =>
                "We're glad to have you on board."
              ),
              h(Button, {
                href: 'https://example.com',
                class: 'bg-indigo-600 text-white px-6 py-3 rounded-md',
              }, () => 'Get Started'),
            ])
          ),
        ])
      );
  },
});

const html = await render(WelcomeEmail, { name: 'Alice' });
```

## Components

| Component | Description |
|-----------|-------------|
| `Html` | Root `<html>` element with email defaults |
| `Head` | `<head>` with charset and Apple Mail meta tags |
| `Body` | `<body>` with Yahoo/AOL table wrapper |
| `Container` | Centered 600px max-width container |
| `Section` | Table-based section for layout grouping |
| `Row` | Table row for multi-column layouts |
| `Column` | Table cell for column content |
| `Text` | `<p>` with email-safe defaults |
| `Heading` | `<h1>`-`<h6>` with margin shorthand props |
| `Link` | `<a>` with `target="_blank"` default |
| `Img` | `<img>` with email-safe display defaults |
| `Button` | CTA button with Outlook padding hacks |
| `Hr` | Horizontal rule |
| `Preview` | Hidden preview text for email clients |
| `Font` | Web font `@font-face` injection |
| `Markdown` | Render markdown as styled HTML |
| `Tailwind` | Tailwind CSS v4 compilation wrapper |

## Development

This is a pnpm monorepo using Turborepo.

```bash
pnpm install
pnpm build
pnpm test
```

## License

MIT
