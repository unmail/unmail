# Body

Body element with Yahoo and AOL email client compatibility.

The `Body` component renders a `<body>` element with a built-in compatibility hack for Yahoo and AOL email clients. It wraps children in a nested table structure to ensure consistent rendering.

## Import

::: code-group
```tsx [React]
import { Body } from "@unmail/react";
```

```ts [Vue]
import { Body } from "@unmail/vue";
```
:::


## Usage

::: code-group
```tsx [React]
import { Html, Head, Body, Container, Text } from "@unmail/react";

export function Email() {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f6f9fc" }}>
        <Container>
          <Text>Email content here.</Text>
        </Container>
      </Body>
    </Html>
  );
}
```

```ts [Vue]
import { h } from "vue";
import { Html, Head, Body, Container, Text } from "@unmail/vue";

export default defineComponent({
  setup() {
    return () =>
      h(Html, () => [
        h(Head),
        h(Body, { style: { backgroundColor: "#f6f9fc" } }, () => [
          h(Container, () => [h(Text, () => "Email content here.")]),
        ]),
      ]);
  },
});
```
:::


## Props

| Prop    | Type                    | Default | Description                                |
| ------- | ----------------------- | ------- | ------------------------------------------ |
| `style` | `React.CSSProperties`  | —       | Styles applied with special handling (see below). |
| `...`   | —                       | —       | All standard `<body>` element attributes.  |

## Default Styles

When a `style` prop is provided, the component applies the following behavior:

- **`background` and `backgroundColor`** are hoisted to the `<body>` tag directly, ensuring email clients that only read body-level background colors render correctly.
- **All margin properties** (`margin`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`) are forced to `0` on the `<body>` tag to prevent inconsistent spacing.
- **Remaining styles** are applied to the inner `<td>` element that wraps the children.

## Rendered Structure

The component outputs the following HTML structure:

```html
<body style="background-color: #f6f9fc; margin: 0;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
    <tbody>
      <tr>
        <td style="/* your remaining styles */">
          <!-- children -->
        </td>
      </tr>
    </tbody>
  </table>
</body>
```

## Notes

- The `<table><tbody><tr><td>` wrapper is required for Yahoo and AOL email clients, which do not reliably render content directly inside `<body>`.
- If you need padding on the body, apply it via the `style` prop — it will be placed on the inner `<td>`.
- Background colors should be set via the `style` prop to ensure they are hoisted correctly.
