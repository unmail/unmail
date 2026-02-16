# Head

Head element with auto-injected meta tags for email compatibility.

The `Head` component renders a `<head>` element and automatically injects essential meta tags for email rendering. Place any `<Font>` components inside `<Head>`.

## Import

::: code-group
```tsx [React]
import { Head } from "@unmail/react";
```

```vue [Vue]
<script setup>
import { Head } from "@unmail/vue";
</script>
```
:::


## Usage

::: code-group
```tsx [React]
import { Html, Head } from "@unmail/react";
import { Font } from "@unmail/react";

export function Email() {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter&display=swap",
            format: "woff2",
          }}
        />
        <title>Welcome Email</title>
      </Head>
      {/* ... */}
    </Html>
  );
}
```

```vue [Vue]
<script setup>
import { Html, Head, Font } from "@unmail/vue";
</script>

<template>
  <Html>
    <Head>
      <Font
        font-family="Inter"
        fallback-font-family="sans-serif"
        :web-font="{
          url: 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
          format: 'woff2',
        }"
      />
      <title>Welcome Email</title>
    </Head>
    <!-- ... -->
  </Html>
</template>
```
:::


## Props

| Prop  | Type        | Default | Description                                |
| ----- | ----------- | ------- | ------------------------------------------ |
| `...` | —           | —       | All standard `<head>` element attributes.  |

The React component uses `React.forwardRef<HTMLHeadElement, HeadProps>`, so you can pass a `ref` to access the underlying DOM element.

## Auto-Injected Tags

The following meta tags are automatically added inside the `<head>`:

```html
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
<meta name="x-apple-disable-message-reformatting" />
```

- The `charset` meta ensures proper character encoding across email clients.
- The `x-apple-disable-message-reformatting` meta prevents Apple Mail from reformatting your email content.

## Notes

- Always place `<Head>` as a direct child of `<Html>`.
- Use `<Head>` to include `<Font>` components, `<title>`, and any other metadata.
- Do not place visible content inside `<Head>`.
