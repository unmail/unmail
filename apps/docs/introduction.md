# Introduction

Unstyled email components for React and Vue. Build beautiful emails with Tailwind CSS.

## What is unmail?

unmail is a collection of unstyled, email-compatible components for **React** and **Vue**. It gives you the building blocks to create beautiful, responsive emails using the framework you already know, styled with **Tailwind CSS v4**.

Both packages produce identical HTML output, so you can switch between frameworks without worrying about email client rendering differences.

## Packages

| Package | Description |
|---------|-------------|
| [`@unmail/react`](/installation#react) | Components, render function, and Tailwind support for React. |
| [`@unmail/vue`](/installation#vue) | Components, render function, and Tailwind support for Vue. |

## Why unmail?

- **Unstyled by default** -- Components ship with only the minimal styles required for email client compatibility. You bring your own design with Tailwind or inline styles.
- **Tailwind CSS v4** -- First-class Tailwind support via the `<Tailwind>` wrapper component. Utility classes are compiled and inlined at render time.
- **Email client hacks built-in** -- Outlook conditional comments, Yahoo/AOL body table wrappers, Apple Mail meta tags, and more are handled automatically.
- **Identical output** -- React and Vue produce the same HTML, so your emails look the same regardless of which framework you use.
- **Server-side rendering** -- The `render()` function produces a complete HTML string ready to send via any email provider (Nodemailer, Resend, SendGrid, etc.).

## Components

unmail ships 16 components:

| Component | Description |
|-----------|-------------|
| `Html` | Root `<html>` element with email defaults |
| `Head` | `<head>` with charset and Apple Mail meta tags |
| `Body` | `<body>` with Yahoo/AOL table wrapper hack |
| `Container` | Centered 600px max-width table container |
| `Section` | Table-based section for layout grouping |
| `Row` | Table row for multi-column layouts |
| `Column` | Table cell (`<td>`) for column content |
| `Text` | `<p>` with email-safe default styles |
| `Heading` | `<h1>`-`<h6>` with margin shorthand props |
| `Link` | `<a>` with `target="_blank"` default |
| `Img` | `<img>` with email-safe display defaults |
| `Button` | CTA button with Outlook padding hacks |
| `Hr` | Horizontal rule |
| `Preview` | Hidden preview text for email client list views |
| `Font` | Web font `@font-face` injection |
| `Markdown` | Render markdown strings as styled HTML |
