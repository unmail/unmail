# CodeBlock

Syntax-highlighted code block with PrismJS tokenization, designed for email rendering.

Renders source code with syntax highlighting using PrismJS. Includes 38 built-in themes and supports 300+ programming languages. Spaces are replaced with non-breaking space sequences for consistent rendering across email clients.

## Import

::: code-group
```tsx [React]
import { CodeBlock, codeBlockThemes } from "@unmail/react";
```

```vue [Vue]
<script setup>
import { CodeBlock, codeBlockThemes } from "@unmail/vue";
</script>
```
:::


## Usage

::: code-group
```tsx [React]
import { CodeBlock, codeBlockThemes } from "@unmail/react";

export function Email() {
  return (
    <CodeBlock
      code={`const greeting = "Hello, World!";
console.log(greeting);`}
      language="javascript"
      theme={codeBlockThemes.dracula}
    />
  );
}
```

```vue [Vue]
<script setup>
import { CodeBlock, codeBlockThemes } from "@unmail/vue";

const code = `const greeting = "Hello, World!";
console.log(greeting);`;
</script>

<template>
  <CodeBlock
    :code="code"
    language="javascript"
    :theme="codeBlockThemes.dracula"
  />
</template>
```
:::


## With line numbers

::: code-group
```tsx [React]
import { CodeBlock, codeBlockThemes } from "@unmail/react";

export function Email() {
  return (
    <CodeBlock
      code={`function add(a: number, b: number) {
  return a + b;
}

const result = add(1, 2);`}
      language="typescript"
      theme={codeBlockThemes.nightOwl}
      lineNumbers
    />
  );
}
```

```vue [Vue]
<script setup>
import { CodeBlock, codeBlockThemes } from "@unmail/vue";

const code = `function add(a: number, b: number) {
  return a + b;
}

const result = add(1, 2);`;
</script>

<template>
  <CodeBlock
    :code="code"
    language="typescript"
    :theme="codeBlockThemes.nightOwl"
    line-numbers
  />
</template>
```
:::


## With custom font

::: code-group
```tsx [React]
import { CodeBlock, codeBlockThemes } from "@unmail/react";

export function Email() {
  return (
    <CodeBlock
      code="npm install @unmail/react"
      language="bash"
      theme={codeBlockThemes.nord}
      fontFamily="Fira Code, monospace"
    />
  );
}
```

```vue [Vue]
<script setup>
import { CodeBlock, codeBlockThemes } from "@unmail/vue";
</script>

<template>
  <CodeBlock
    code="npm install @unmail/vue"
    language="bash"
    :theme="codeBlockThemes.nord"
    font-family="Fira Code, monospace"
  />
</template>
```
:::


## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `code` | `string` | — | **Required.** The source code to highlight. |
| `language` | `PrismLanguage` | — | **Required.** The language grammar for tokenization. |
| `theme` | `Theme` | — | **Required.** A theme object mapping token types to inline styles. |
| `lineNumbers` | `boolean` | `false` | Whether to display line numbers. |
| `fontFamily` | `string` | — | Override the font family on all rendered elements. |

All standard HTML `<pre>` element attributes are also supported.

## Available themes

The `codeBlockThemes` export provides 38 built-in themes:

`a11yDark`, `atomDark`, `baseAteliersulphurpoolLight`, `cb`, `coldarkCold`, `coldarkDark`, `coyWithoutShadows`, `darcula`, `dracula`, `duotoneDark`, `duotoneEarth`, `duotoneForest`, `duotoneLight`, `duotoneSea`, `duotoneSpace`, `ghcolors`, `gruvboxDark`, `gruvboxLight`, `holiTheme`, `hopscotch`, `laserwave`, `lucario`, `materialDark`, `materialLight`, `materialOceanic`, `nightOwl`, `nord`, `oneDark`, `oneLight`, `pojoaque`, `shadesOfPurple`, `solarizedDarkAtom`, `synthwave84`, `vesper`, `vs`, `vscDarkPlus`, `xonokai`, `zTouch`

## Supported languages

The `PrismLanguage` type supports 300+ languages including: `javascript`, `typescript`, `jsx`, `tsx`, `python`, `rust`, `go`, `java`, `ruby`, `css`, `html`, `bash`, `json`, `yaml`, `markdown`, `sql`, and many more.

## How it works

The component uses PrismJS to tokenize source code into semantic tokens, then renders each token as a `<span>` with inline styles from the selected theme. This approach ensures syntax highlighting works across all email clients without external CSS.

Spaces are replaced with `\xA0\u200D\u200B` (non-breaking space + zero-width joiner + zero-width space) sequences to prevent email clients from collapsing whitespace.
