# Link

Anchor element with email-safe defaults.

A styled anchor element preconfigured for email. Opens links in a new tab by default and applies a clean visual style with no underline.

## Import

::: code-group
```tsx [React]
import { Link } from "@unmail/react";
```

```ts [Vue]
import { Link } from "@unmail/vue";
```
:::


## Usage

::: code-group
```tsx [React]
import { Link } from "@unmail/react";

export function Email() {
  return (
    <Link href="https://example.com" style={{ fontSize: "14px" }}>
      Visit our website
    </Link>
  );
}
```

```ts [Vue]
import { h } from "vue";
import { Link } from "@unmail/vue";

export default {
  setup() {
    return () =>
      h(Link, { href: "https://example.com", style: { fontSize: "14px" } }, () => "Visit our website");
  },
};
```
:::


## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | `string` | `'_blank'` | Link target. |

All standard HTML `<a>` element attributes are also supported.

## Default styles

The following styles are applied by default and can be overridden via the `style` prop:

```css
color: #067df7;
text-decoration-line: none;
```

## Notes

- The component uses `React.forwardRef` (React) to forward refs to the underlying anchor element.
- `target="_blank"` is set by default since most email clients open links externally.
