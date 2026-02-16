# Html

Root HTML element for email documents.

The `Html` component wraps your entire email as the outermost `<html>` element. It sets sensible defaults for `lang` and `dir` attributes to ensure proper rendering across email clients.

## Import

::: code-group
```tsx [React]
import { Html } from "@unmail/react";
```

```vue [Vue]
<script setup>
import { Html } from "@unmail/vue";
</script>
```
:::


## Usage

::: code-group
```tsx [React]
import { Html, Head, Body, Container, Text } from "@unmail/react";

export function Email() {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Body>
        <Container>
          <Text>Hello, world!</Text>
        </Container>
      </Body>
    </Html>
  );
}
```

```vue [Vue]
<script setup>
import { Html, Head, Body, Container, Text } from "@unmail/vue";
</script>

<template>
  <Html lang="en" dir="ltr">
    <Head />
    <Body>
      <Container>
        <Text>Hello, world!</Text>
      </Container>
    </Body>
  </Html>
</template>
```
:::


## Props

| Prop    | Type     | Default | Description                                      |
| ------- | -------- | ------- | ------------------------------------------------ |
| `lang`  | `string` | `"en"`  | Language of the document.                        |
| `dir`   | `string` | `"ltr"` | Text direction of the document.                  |
| `...`   | —        | —       | All standard `<html>` element attributes.        |

The React component uses `React.forwardRef<HTMLHtmlElement, HtmlProps>`, so you can pass a `ref` to access the underlying DOM element.

## Default Styles

No default styles are applied. The component sets the following attributes by default:

- `lang="en"`
- `dir="ltr"`

## Notes

- This must be the outermost component in your email tree.
- Some email clients strip the `<html>` tag entirely, but including it with proper attributes improves accessibility in clients that preserve it.
