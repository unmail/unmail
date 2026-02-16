# Img

Image element with email-safe defaults.

An image component with default styles that prevent unwanted borders, outlines, and spacing issues common across email clients.

## Import

::: code-group
```tsx [React]
import { Img } from "@unmail/react";
```

```vue [Vue]
<script setup>
import { Img } from "@unmail/vue";
</script>
```
:::


## Usage

::: code-group
```tsx [React]
import { Img } from "@unmail/react";

export function Email() {
  return (
    <Img
      src="https://example.com/logo.png"
      alt="Company Logo"
      width={200}
      height={50}
    />
  );
}
```

```vue [Vue]
<script setup>
import { Img } from "@unmail/vue";
</script>

<template>
  <Img
    src="https://example.com/logo.png"
    alt="Company Logo"
    :width="200"
    :height="50"
  />
</template>
```
:::


## Props

All standard HTML `<img>` element attributes are supported, including:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | — | The image URL. |
| `alt` | `string` | — | Alternative text for the image. |
| `width` | `number \| string` | — | Image width. |
| `height` | `number \| string` | — | Image height. |

## Default styles

The following styles are applied by default to ensure consistent rendering across email clients:

```css
display: block;
outline: none;
border: none;
text-decoration: none;
```

## Notes

- `display: block` prevents the phantom spacing that some email clients add below images.
- `border: none` removes the default border that older email clients add to linked images.
- `outline: none` and `text-decoration: none` provide additional cleanup for linked images.
- Always set explicit `width` and `height` attributes for best compatibility.
