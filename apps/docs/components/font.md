# Font

Web font @font-face injection for emails.

Injects a `<style>` tag with an `@font-face` declaration for loading web fonts in emails. Also applies the font globally via a `* { font-family }` rule and sets `mso-font-alt` for Outlook fallback.

**This component must be placed inside the `<Head>` component.**

## Import

::: code-group
```tsx [React]
import { Font, Head } from "@unmail/react";
```

```ts [Vue]
import { Font, Head } from "@unmail/vue";
```
:::


## Usage

::: code-group
```tsx [React]
import { Font, Head } from "@unmail/react";

export function Email() {
  return (
    <Head>
      <Font
        fontFamily="Inter"
        fallbackFontFamily="sans-serif"
        webFont={{
          url: "https://fonts.googleapis.com/css2?family=Inter&display=swap",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
  );
}
```

```ts [Vue]
import { h } from "vue";
import { Font, Head } from "@unmail/vue";

export default {
  setup() {
    return () =>
      h(Head, null, () =>
        h(Font, {
          fontFamily: "Inter",
          fallbackFontFamily: "sans-serif",
          webFont: {
            url: "https://fonts.googleapis.com/css2?family=Inter&display=swap",
            format: "woff2",
          },
          fontWeight: 400,
          fontStyle: "normal",
        })
      );
  },
};
```
:::


## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `fontFamily` | `string` | — | The font name. **Required.** |
| `fallbackFontFamily` | `FallbackFont \| FallbackFont[]` | — | Fallback font(s). **Required.** |
| `webFont` | `{ url: string; format: FontFormat }` | — | Web font source URL and format. |
| `fontStyle` | `CSSProperties['fontStyle']` | `'normal'` | The font style. |
| `fontWeight` | `CSSProperties['fontWeight']` | `400` | The font weight. |

### FallbackFont

```ts
type FallbackFont =
  | "Arial"
  | "Helvetica"
  | "Verdana"
  | "Georgia"
  | "Times New Roman"
  | "serif"
  | "sans-serif"
  | "monospace"
  | "cursive"
  | "fantasy";
```

### FontFormat

```ts
type FontFormat =
  | "woff"
  | "woff2"
  | "truetype"
  | "opentype"
  | "embedded-opentype"
  | "svg";
```

## What it renders

The component outputs a `<style>` tag containing:

1. An `@font-face` rule with the specified `src`, `font-family`, `font-style`, and `font-weight` (only if `webFont` is provided).
2. A `* { font-family: 'fontFamily', fallbacks; }` rule to apply the font globally.
3. `mso-font-alt` is set on the global rule so Outlook uses the fallback font.

## Notes

- This is **not** a `forwardRef` component — it renders a `<style>` tag and does not accept a ref.
- Must be placed inside `<Head>`. Placing it in the body will not work correctly.
- Web font support varies across email clients. The `fallbackFontFamily` ensures a safe fallback is always available.
- You can include multiple `<Font>` components for different weights or styles of the same font family.
