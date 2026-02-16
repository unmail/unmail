# Row

Table row for multi-column email layouts.

The `Row` component renders a `<table>` that creates a horizontal row for multi-column layouts. Unlike `Section`, it wraps children in `<tbody><tr>` without an extra `<td>`, expecting `Column` components as direct children.

## Import

::: code-group
```tsx [React]
import { Row } from "@unmail/react";
```

```ts [Vue]
import { Row } from "@unmail/vue";
```
:::


## Usage

::: code-group
```tsx [React]
import { Container, Section, Row, Column, Text } from "@unmail/react";

export function Email() {
  return (
    <Container>
      <Section>
        <Row>
          <Column style={{ width: "50%" }}>
            <Text>Left column</Text>
          </Column>
          <Column style={{ width: "50%" }}>
            <Text>Right column</Text>
          </Column>
        </Row>
      </Section>
    </Container>
  );
}
```

```ts [Vue]
import { h } from "vue";
import { Container, Section, Row, Column, Text } from "@unmail/vue";

export default defineComponent({
  setup() {
    return () =>
      h(Container, () => [
        h(Section, () => [
          h(Row, () => [
            h(Column, { style: { width: "50%" } }, () => [
              h(Text, () => "Left column"),
            ]),
            h(Column, { style: { width: "50%" } }, () => [
              h(Text, () => "Right column"),
            ]),
          ]),
        ]),
      ]);
  },
});
```
:::


## Props

| Prop       | Type                   | Default | Description                                 |
| ---------- | ---------------------- | ------- | ------------------------------------------- |
| `children` | `React.ReactNode`     | —       | **Required.** Must be `Column` components.  |
| `style`    | `React.CSSProperties` | —       | Additional styles merged with defaults.     |
| `...`      | —                      | —       | All standard `<table>` element attributes.  |

## Default Styles

The following attributes are applied by default:

| Property       | Value            |
| -------------- | ---------------- |
| `align`        | `"center"`       |
| `width`        | `"100%"`         |
| `border`       | `0`              |
| `cellPadding`  | `"0"`            |
| `cellSpacing`  | `"0"`            |
| `role`         | `"presentation"` |

## Rendered Structure

```html
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
       role="presentation">
  <tbody>
    <tr>
      <!-- Column children rendered here as <td> elements -->
    </tr>
  </tbody>
</table>
```

## Notes

- **Only use `Column` components as direct children of `Row`.** Other elements will not render correctly since they are placed directly inside a `<tr>`.
- Use percentage-based widths on `Column` components to control column proportions.
- For single-column content, use `Section` instead of `Row`.
