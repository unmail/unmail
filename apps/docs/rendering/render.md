# render()

Convert email component trees to HTML or plain text strings.

The `render()` function takes your email component tree and produces an HTML string, ready to send. It prepends the XHTML 1.0 Transitional doctype automatically.

## Import

::: code-group
```tsx [React]
import { render } from "@unmail/react";
```

```ts [Vue]
import { render } from "@unmail/vue";
```
:::


## API

::: code-group
```tsx [React]
const html = await render(
  element: React.ReactElement,
  options?: RenderOptions
): Promise<string>;
```

```ts [Vue]
const html = await render(
  component: Component,
  props?: Record<string, unknown>,
  options?: RenderOptions
): Promise<string>;
```
:::


**React** uses streaming SSR internally (`renderToReadableStream` with a `Suspense` fallback where supported, otherwise `renderToPipeableStream`).

**Vue** uses `createSSRApp` paired with `renderToString` from `vue/server-renderer`.

Both prepend the XHTML 1.0 Transitional doctype to the output.

## RenderOptions

```ts
type RenderOptions = {
  pretty?: boolean;
} & (
  | { plainText?: false }
  | { plainText?: true; htmlToTextOptions?: HtmlToTextOptions }
);
```

| Option | Type | Description |
| --- | --- | --- |
| `pretty` | `boolean` | Format the HTML output using prettier. Requires `prettier` as a peer dependency. |
| `plainText` | `boolean` | Convert the HTML to plain text using `html-to-text`. Requires `html-to-text` as a peer dependency. |
| `htmlToTextOptions` | `HtmlToTextOptions` | Options passed to `html-to-text`'s `convert()` function. Only available when `plainText` is `true`. |

## Usage

### Basic rendering

::: code-group
```tsx [React]
import { render } from "@unmail/react";
import { WelcomeEmail } from "./emails/welcome";

const html = await render(<WelcomeEmail name="Alice" />);
```

```ts [Vue]
import { render } from "@unmail/vue";
import WelcomeEmail from "./emails/welcome";

const html = await render(WelcomeEmail, { name: "Alice" });
```
:::


### Pretty printing

::: code-group
```tsx [React]
import { render } from "@unmail/react";
import { WelcomeEmail } from "./emails/welcome";

const html = await render(<WelcomeEmail name="Alice" />, {
  pretty: true,
});
```

```ts [Vue]
import { render } from "@unmail/vue";
import WelcomeEmail from "./emails/welcome";

const html = await render(WelcomeEmail, { name: "Alice" }, {
  pretty: true,
});
```
:::


### Plain text

::: code-group
```tsx [React]
import { render } from "@unmail/react";
import { WelcomeEmail } from "./emails/welcome";

const text = await render(<WelcomeEmail name="Alice" />, {
  plainText: true,
  htmlToTextOptions: {
    wordwrap: 80,
  },
});
```

```ts [Vue]
import { render } from "@unmail/vue";
import WelcomeEmail from "./emails/welcome";

const text = await render(WelcomeEmail, { name: "Alice" }, {
  plainText: true,
  htmlToTextOptions: {
    wordwrap: 80,
  },
});
```
:::


## Notes

- Install `prettier` as a peer dependency to use the `pretty` option.
- Install `html-to-text` as a peer dependency to use the `plainText` option.
- The returned string always includes the XHTML 1.0 Transitional doctype.
