# Heading

Polymorphic heading element (h1-h6) with margin shorthand props.

A semantic heading component that renders as any heading level (`h1`–`h6`). It includes margin shorthand props for convenient spacing control in email layouts.

## Import

::: code-group
```tsx [React]
import { Heading } from "@unmail/react";
```

```vue [Vue]
<script setup>
import { Heading } from "@unmail/vue";
</script>
```
:::


## Usage

::: code-group
```tsx [React]
import { Heading } from "@unmail/react";

export function Email() {
  return (
    <>
      <Heading as="h1" mt={16} mb={8}>
        Welcome to our newsletter
      </Heading>
      <Heading as="h2" mx={0} my={12} style={{ color: "#333" }}>
        Latest updates
      </Heading>
    </>
  );
}
```

```vue [Vue]
<script setup>
import { Heading } from "@unmail/vue";
</script>

<template>
  <Heading as="h1" :mt="16" :mb="8">
    Welcome to our newsletter
  </Heading>
  <Heading as="h2" :mx="0" :my="12" :style="{ color: '#333' }">
    Latest updates
  </Heading>
</template>
```
:::


## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'` | The heading level to render. |
| `m` | `number \| string` | — | Margin on all sides. |
| `mx` | `number \| string` | — | Horizontal margin (left and right). |
| `my` | `number \| string` | — | Vertical margin (top and bottom). |
| `mt` | `number \| string` | — | Margin top. |
| `mr` | `number \| string` | — | Margin right. |
| `mb` | `number \| string` | — | Margin bottom. |
| `ml` | `number \| string` | — | Margin left. |

All standard HTML heading element attributes are also supported.

## How margins work

Margin shorthand props are resolved via the `withMargin()` utility and applied before the `style` prop. This means values in `style` will override margin shorthands if both are specified for the same side.

## Notes

- The component uses `React.forwardRef` (React) to forward refs to the underlying heading element.
- Numeric margin values are treated as pixels.
