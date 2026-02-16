# CodeInline

Inline code element with an Orange.fr email client compatibility fix.

Renders an inline `<code>` element. Includes a workaround for the Orange.fr email client, which strips `<code>` tags from emails. A hidden `<span>` fallback is automatically revealed on Orange.fr via CSS.

## Import

::: code-group
```tsx [React]
import { CodeInline } from "@unmail/react";
```

```vue [Vue]
<script setup>
import { CodeInline } from "@unmail/vue";
</script>
```
:::


## Usage

::: code-group
```tsx [React]
import { CodeInline, Text } from "@unmail/react";

export function Email() {
  return (
    <Text>
      Run <CodeInline>npm install @unmail/react</CodeInline> to get started.
    </Text>
  );
}
```

```vue [Vue]
<script setup>
import { CodeInline, Text } from "@unmail/vue";
</script>

<template>
  <Text>
    Run <CodeInline>npm install @unmail/vue</CodeInline> to get started.
  </Text>
</template>
```
:::


## With custom styling

::: code-group
```tsx [React]
import { CodeInline, Text } from "@unmail/react";

export function Email() {
  return (
    <Text>
      Use the{" "}
      <CodeInline
        style={{
          backgroundColor: "#f0f0f0",
          padding: "2px 6px",
          borderRadius: "4px",
          fontFamily: "monospace",
          fontSize: "14px",
        }}
      >
        render()
      </CodeInline>{" "}
      function to convert components to HTML.
    </Text>
  );
}
```

```vue [Vue]
<script setup>
import { CodeInline, Text } from "@unmail/vue";
</script>

<template>
  <Text>
    Use the
    <CodeInline
      :style="{
        backgroundColor: '#f0f0f0',
        padding: '2px 6px',
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '14px',
      }"
    >
      render()
    </CodeInline>
    function to convert components to HTML.
  </Text>
</template>
```
:::


## Props

All standard HTML `<code>` element attributes are supported.

## How it works

The Orange.fr email client removes `<code>` tags from emails. To work around this, the component renders two elements:

1. A `<code class="cino">` element — visible in all clients, hidden on Orange.fr
2. A `<span class="cio">` element — hidden by default, revealed on Orange.fr

The fix uses a CSS selector (`meta ~ .cino` / `meta ~ .cio`) that targets the unique behavior of Orange.fr, where `<meta>` tags become siblings of body content because `<head>` and `<html>` are stripped.

::: warning
This component requires a `<Head>` element with meta tags in your email for the Orange.fr fix to work.
:::
