# Markdown

Render markdown strings as styled inline HTML for emails.

Parses markdown strings into HTML with inline styles applied to every element. Uses the `marked` library under the hood with a custom renderer that injects styles directly onto each HTML tag for email client compatibility.

## Import

::: code-group
```tsx [React]
import { Markdown } from "@unmail/react";
```

```ts [Vue]
import { Markdown } from "@unmail/vue";
```
:::


## Usage

::: code-group
```tsx [React]
import { Markdown } from "@unmail/react";

const content = `
# Hello World

This is a **bold** statement with a [link](https://example.com).

- Item one
- Item two
`;

export function Email() {
  return (
    <Markdown
      markdownContainerStyles={{ padding: "16px", maxWidth: "600px" }}
      markdownCustomStyles={{
        h1: { fontSize: "28px", color: "#333" },
        link: { color: "#067df7" },
      }}
    >
      {content}
    </Markdown>
  );
}
```

```ts [Vue]
import { h } from "vue";
import { Markdown } from "@unmail/vue";

const content = `
# Hello World

This is a **bold** statement with a [link](https://example.com).

- Item one
- Item two
`;

export default {
  setup() {
    return () =>
      h(
        Markdown,
        {
          markdownContainerStyles: { padding: "16px", maxWidth: "600px" },
          markdownCustomStyles: {
            h1: { fontSize: "28px", color: "#333" },
            link: { color: "#067df7" },
          },
        },
        () => content
      );
  },
};
```
:::


## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `string` | — | The markdown content to render. **Required.** |
| `markdownCustomStyles` | `MarkdownStylesType` | — | Override styles for specific HTML elements. |
| `markdownContainerStyles` | `React.CSSProperties` | — | Styles for the wrapper `<div>`. |

## Supported style keys

The `markdownCustomStyles` prop accepts an object with the following keys, each mapping to a `CSSProperties` value:

| Key | Target element |
| --- | --- |
| `h1` – `h6` | Heading elements |
| `p` | Paragraphs |
| `bold` | `<strong>` / `**text**` |
| `italic` | `<em>` / `*text*` |
| `strikethrough` | `<del>` / `~~text~~` |
| `link` | `<a>` links |
| `image` | `<img>` images |
| `blockQuote` | `<blockquote>` |
| `codeBlock` | Fenced code blocks |
| `codeInline` | Inline `code` |
| `hr` | Horizontal rules |
| `br` | Line breaks |
| `table` | `<table>` |
| `thead` | `<thead>` |
| `tbody` | `<tbody>` |
| `tr` | `<tr>` |
| `td` | `<td>` |
| `ol` | Ordered lists |
| `ul` | Unordered lists |
| `li` | List items |

## Notes

- The component uses `React.forwardRef` (React) to forward refs to the wrapper `<div>`.
- All rendered HTML elements receive inline styles, which is required for email client compatibility since `<style>` blocks are stripped by many email clients.
- The `marked` library handles the markdown parsing. Standard markdown syntax is supported.
- Custom styles are merged with default styles — you only need to specify the properties you want to override.
