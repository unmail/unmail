# Column

Table cell for column-based email layouts.

The `Column` component renders a `<td>` element for use inside a `Row`. It represents a single column in a multi-column email layout.

## Import

::: code-group
```tsx [React]
import { Column } from "@unmail/react";
```

```vue [Vue]
<script setup>
import { Column } from "@unmail/vue";
</script>
```
:::


## Usage

::: code-group
```tsx [React]
import { Row, Column, Text } from "@unmail/react";

export function ThreeColumns() {
  return (
    <Row>
      <Column style={{ width: "33%", padding: "0 8px" }}>
        <Text>Column 1</Text>
      </Column>
      <Column style={{ width: "33%", padding: "0 8px" }}>
        <Text>Column 2</Text>
      </Column>
      <Column style={{ width: "34%", padding: "0 8px" }}>
        <Text>Column 3</Text>
      </Column>
    </Row>
  );
}
```

```vue [Vue]
<script setup>
import { Row, Column, Text } from "@unmail/vue";
</script>

<template>
  <Row>
    <Column :style="{ width: '33%', padding: '0 8px' }">
      <Text>Column 1</Text>
    </Column>
    <Column :style="{ width: '33%', padding: '0 8px' }">
      <Text>Column 2</Text>
    </Column>
    <Column :style="{ width: '34%', padding: '0 8px' }">
      <Text>Column 3</Text>
    </Column>
  </Row>
</template>
```
:::


## Props

| Prop    | Type                   | Default | Description                              |
| ------- | ---------------------- | ------- | ---------------------------------------- |
| `style` | `React.CSSProperties` | —       | Styles applied to the `<td>`.            |
| `...`   | —                      | —       | All standard `<td>` element attributes.  |

## Default Styles

No default styles are applied. The component renders a plain `<td>` element.

## Rendered Structure

```html
<td style="/* your styles */">
  <!-- children -->
</td>
```

## Notes

- **Must be used inside a `Row` component.** Using `Column` outside of a `Row` will produce invalid table markup.
- Use `width` (percentage or pixel values) to control column sizing.
- Use `verticalAlign` to control content alignment within the cell (e.g., `"top"`, `"middle"`, `"bottom"`).
- Padding on columns is the recommended way to add gutters between columns.
