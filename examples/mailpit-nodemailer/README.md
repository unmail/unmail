# Mailpit + Nodemailer Example

Send emails rendered with `@unmail/react` and `@unmail/vue` to a local [Mailpit](https://mailpit.axllent.org) instance for visual verification.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (for Mailpit)
- [pnpm](https://pnpm.io/) (already required by this monorepo)

## Quick start

From the **monorepo root**:

```bash
# 1. Build packages
pnpm build

# 2. Start Mailpit (SMTP on :1025, Web UI on :8025)
pnpm mailpit:up

# 3. Send both React & Vue example emails
pnpm example:send

# 4. Open http://localhost:8025 in your browser to view the emails

# 5. Stop Mailpit when done
pnpm mailpit:down
```

## Individual scripts

```bash
# Send only the React email
pnpm example:send:react

# Send only the Vue email
pnpm example:send:vue
```

## Configuration

Copy `.env.example` to `.env` in the monorepo root (or set environment variables directly):

| Variable      | Default               | Description               |
| ------------- | --------------------- | ------------------------- |
| `SMTP_HOST`   | `127.0.0.1`           | SMTP server host          |
| `SMTP_PORT`   | `1025`                | SMTP server port          |
| `SMTP_SECURE` | `false`               | Use TLS                   |
| `MAIL_FROM`   | `noreply@unmail.local`| Sender address            |
| `MAIL_TO`     | `check@mailpit.local` | Recipient address         |

## What's in the example emails?

Both scripts render the same "Welcome to Unmail" email using every available component:

- **Layout:** Html, Head, Body, Container, Section, Row, Column
- **Content:** Heading, Text, Link, Button, Img, Hr, Preview, Font
- **Styling:** Tailwind (CSS v4, inlined for email clients)

The React script uses `React.createElement()` calls; the Vue script uses `defineComponent` + `h()` render functions.
