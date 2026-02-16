# Examples

Send emails rendered with `@unmail/react` and `@unmail/vue` to a local [Mailpit](https://mailpit.axllent.org) instance.

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

# 3. Build & send both examples
pnpm example:build
pnpm example:send

# 4. Open http://localhost:8025 in your browser to view the emails

# 5. Stop Mailpit when done
pnpm mailpit:down
```

## Individual scripts

```bash
# Build examples
pnpm example:build

# Send only the React email
pnpm example:send:react

# Send only the Vue email
pnpm example:send:vue
```

## Configuration

Set environment variables or copy `.env.example`:

| Variable      | Default               | Description      |
| ------------- | --------------------- | ---------------- |
| `SMTP_HOST`   | `127.0.0.1`           | SMTP server host |
| `SMTP_PORT`   | `1025`                | SMTP server port |
| `SMTP_SECURE` | `false`               | Use TLS          |
| `MAIL_FROM`   | `noreply@unmail.local` | Sender address   |
| `MAIL_TO`     | `check@mailpit.local`  | Recipient address |

## Structure

```
examples/
├── react/              # React + Nodemailer example
│   ├── src/
│   │   ├── email.tsx   # Email template (JSX)
│   │   └── index.tsx   # Render & send
│   ├── package.json
│   └── tsconfig.json
├── vue/                # Vue + Nodemailer example
│   ├── src/
│   │   ├── email.vue   # Email template (SFC)
│   │   └── index.ts    # Render & send
│   ├── package.json
│   ├── tsconfig.json
│   └── tsdown.config.ts
├── docker-compose.yml  # Mailpit service
└── .env.example
```
