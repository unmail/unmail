# Preview

Hidden preview text for email client list views.

Renders hidden preview text that appears in email client list views (the snippet shown next to or below the subject line). The content is visually hidden in the email body but read by email clients for preview purposes.

## Import

::: code-group
```tsx [React]
import { Preview } from "@unmail/react";
```

```vue [Vue]
<script setup>
import { Preview } from "@unmail/vue";
</script>
```
:::


## Usage

::: code-group
```tsx [React]
import { Preview } from "@unmail/react";

export function Email() {
  return (
    <>
      <Preview>Your order has been shipped and is on its way!</Preview>
      {/* rest of email body */}
    </>
  );
}
```

```vue [Vue]
<script setup>
import { Preview } from "@unmail/vue";
</script>

<template>
  <Preview>Your order has been shipped and is on its way!</Preview>
  <!-- rest of email body -->
</template>
```
:::


## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `string \| string[]` | — | The preview text content. **Required.** |

All standard HTML `<div>` element attributes are also supported.

## Default styles

The component renders a `<div>` with the following styles to ensure it is completely hidden:

```css
display: none;
overflow: hidden;
line-height: 1px;
opacity: 0;
max-height: 0;
max-width: 0;
```

## Auto-padding behavior

The component automatically pads the preview text with zero-width Unicode characters to fill up to **150 characters** (`PREVIEW_MAX_LENGTH`). This prevents email clients from pulling in body text to fill the preview area.

- If the text exceeds 150 characters, it is truncated to 150 characters.
- If the text is shorter than 150 characters, the remaining space is filled with invisible characters.

## Notes

- Place `<Preview>` at the top of your email body, before any visible content.
- The `children` prop must be a string or array of strings — not arbitrary JSX/VNodes.
- The zero-width padding characters are invisible and do not affect the displayed preview text.
