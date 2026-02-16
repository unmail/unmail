# Quick Start

Send your first email in under 5 minutes.

## React

Create an email template and render it to an HTML string:

```tsx
import {
  Html, Head, Body, Container, Section,
  Text, Heading, Button, Preview, Tailwind,
  render,
} from '@unmail/react';

function WelcomeEmail({ name }: { name: string }) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Welcome to our platform, {name}!</Preview>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white mx-auto my-10 p-8 rounded-lg">
            <Heading as="h1" className="text-2xl font-bold text-gray-900">
              Welcome, {name}!
            </Heading>
            <Text className="text-gray-600 text-base">
              We're glad to have you on board. Click below to get started.
            </Text>
            <Section className="text-center my-8">
              <Button
                href="https://example.com/dashboard"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md"
              >
                Go to Dashboard
              </Button>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

// Render to HTML string
const html = await render(<WelcomeEmail name="Alice" />);
```

## Vue

```vue
<script setup lang="ts">
import {
  Html, Head, Body, Container, Section,
  Text, Heading, Button, Preview, Tailwind,
} from '@unmail/vue';

defineProps<{ name: string }>();
</script>

<template>
  <Tailwind>
    <Html>
      <Head />
      <Preview>Welcome to our platform, {{ name }}!</Preview>
      <Body class="bg-gray-100 font-sans">
        <Container class="bg-white mx-auto my-10 p-8 rounded-lg">
          <Heading as="h1" class="text-2xl font-bold text-gray-900">
            Welcome, {{ name }}!
          </Heading>
          <Text class="text-gray-600 text-base">
            We're glad to have you on board. Click below to get started.
          </Text>
          <Section class="text-center my-8">
            <Button
              href="https://example.com/dashboard"
              class="bg-indigo-600 text-white px-6 py-3 rounded-md"
            >
              Go to Dashboard
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
</template>
```

```ts
// Render to HTML string
import { render } from '@unmail/vue';
import WelcomeEmail from './WelcomeEmail.vue';

const html = await render(WelcomeEmail, { name: 'Alice' });
```

## Sending with Nodemailer

Once you have the rendered HTML, send it with any email provider:

```ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  auth: { user: 'you@example.com', pass: 'password' },
});

await transporter.sendMail({
  from: '"My App" <noreply@example.com>',
  to: 'alice@example.com',
  subject: 'Welcome!',
  html,
});
```
