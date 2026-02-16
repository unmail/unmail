# Section

Table-based section for grouping email content.

The `Section` component renders a full-width `<table>` used for grouping content within a `Container`. It provides a logical content block in your email layout.

## Import

::: code-group
```tsx [React]
import { Section } from "@unmail/react";
```

```vue [Vue]
<script setup>
import { Section } from "@unmail/vue";
</script>
```
:::


## Usage

::: code-group
```tsx [React]
import { Container, Section, Text } from "@unmail/react";

export function Email() {
  return (
    <Container>
      <Section style={{ padding: "24px", backgroundColor: "#ffffff" }}>
        <Text>First section content.</Text>
      </Section>
      <Section style={{ padding: "24px", backgroundColor: "#f0f0f0" }}>
        <Text>Second section content.</Text>
      </Section>
    </Container>
  );
}
```

```vue [Vue]
<script setup>
import { Container, Section, Text } from "@unmail/vue";
</script>

<template>
  <Container>
    <Section :style="{ padding: '24px', backgroundColor: '#ffffff' }">
      <Text>First section content.</Text>
    </Section>
    <Section :style="{ padding: '24px', backgroundColor: '#f0f0f0' }">
      <Text>Second section content.</Text>
    </Section>
  </Container>
</template>
```
:::


## Props

| Prop    | Type                   | Default | Description                               |
| ------- | ---------------------- | ------- | ----------------------------------------- |
| `style` | `React.CSSProperties` | —       | Additional styles merged with defaults.   |
| `...`   | —                      | —       | All standard `<table>` element attributes.|

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
      <td>
        <!-- children -->
      </td>
    </tr>
  </tbody>
</table>
```

## Notes

- Use `Section` inside a `Container` to group related content blocks.
- For multi-column layouts, use `Row` and `Column` inside a `Section` instead.
- The table structure ensures consistent rendering across email clients that don't support modern CSS layout.
