<script setup lang="ts">
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Text,
  Button,
  Link,
  Hr,
  Img,
  Preview,
  Font,
  Markdown,
  CodeBlock,
  CodeInline,
  codeBlockThemes,
  Tailwind,
} from "@unmail/vue";

const codeExample = `<script setup>
import { Html, Text, Button } from "@unmail/vue";
<\/script>

<template>
  <Html>
    <Text>Hello from Unmail!</Text>
    <Button href="https://example.com">
      Get Started
    </Button>
  </Html>
</template>`;

const markdownContent = `
## What is Unmail?

Unmail provides **unstyled components** that produce clean, \`table-based\` HTML optimized for email clients.

### Key benefits:

- Works in *all major email clients* including Outlook
- First-class [Tailwind CSS](https://tailwindcss.com) support
- Available for both **React** and **Vue**

> "The best way to build emails in 2025."

Here's a quick example:

\`\`\`vue
<script setup>
import { Html, Button } from "@unmail/vue";
<\/script>

<template>
  <Html>
    <Button href="https://example.com">Click me</Button>
  </Html>
</template>
\`\`\`
`;

const markdownContainerStyles = { color: "#374151", fontSize: "14px" };

const markdownCustomStyles = {
  h2: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#111827",
    marginTop: "0",
  },
  h3: { fontSize: "16px", fontWeight: "600", color: "#1f2937" },
  p: { lineHeight: "1.7", marginTop: "8px" },
  link: { color: "#4f46e5", textDecoration: "none" },
  bold: { fontWeight: "600", color: "#111827" },
  codeInline: {
    backgroundColor: "#f3f4f6",
    padding: "2px 6px",
    borderRadius: "4px",
    fontSize: "13px",
    fontFamily: "monospace",
  },
  codeBlock: {
    backgroundColor: "#1e293b",
    color: "#e2e8f0",
    padding: "16px",
    borderRadius: "8px",
    fontSize: "13px",
    lineHeight: "1.6",
    fontFamily: "monospace",
    overflowX: "auto",
  },
  blockQuote: {
    borderLeft: "4px solid #6366f1",
    paddingLeft: "16px",
    fontStyle: "italic",
    color: "#6b7280",
    margin: "16px 0",
  },
  li: { lineHeight: "1.7", marginBottom: "4px" },
};
</script>

<template>
  <Tailwind>
    <Html lang="en" dir="ltr">
      <Head>
        <Font
          font-family="Inter"
          :fallback-font-family="['Helvetica', 'Arial', 'sans-serif']"
          :web-font="{
            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
            format: 'woff2',
          }"
          :font-weight="400"
          font-style="normal"
        />
      </Head>

      <Preview>
        Welcome to Unmail — unstyled email components for React and Vue. Build
        beautiful, responsive emails with Tailwind CSS.
      </Preview>

      <Body class="bg-slate-100 font-sans">
        <Container class="bg-white mx-auto my-10 rounded-xl shadow-sm">
          <!-- Header -->
          <Section class="bg-indigo-600 rounded-t-xl px-10 py-8">
            <Row>
              <Column class="w-1/2">
                <Img
                  src="https://placehold.co/140x45/4f46e5/white?text=unmail"
                  alt="Unmail"
                  :width="140"
                  :height="45"
                />
              </Column>
              <Column class="w-1/2 text-right align-middle">
                <Link
                  href="https://unmail.dev/docs"
                  class="text-indigo-200 text-sm no-underline"
                >
                  Docs
                </Link>
                <span class="text-indigo-400 mx-2">·</span>
                <Link
                  href="https://github.com/unmail/unmail"
                  class="text-indigo-200 text-sm no-underline"
                >
                  GitHub
                </Link>
              </Column>
            </Row>
          </Section>

          <!-- Hero -->
          <Section class="px-10 pt-10 pb-6">
            <Heading
              as="h1"
              class="text-3xl font-bold text-gray-900 leading-tight"
              :mt="0"
              :mb="8"
            >
              Welcome to Unmail
            </Heading>
            <Text class="text-gray-600 text-base leading-7 mt-0">
              Build beautiful, responsive emails using the same components and
              workflow you already love. Unmail provides unstyled, accessible
              components for
              <Link href="https://react.dev" class="text-indigo-600 font-medium">
                React </Link
              >and
              <Link href="https://vuejs.org" class="text-indigo-600 font-medium">
                Vue </Link
              >, with first-class
              <Link
                href="https://tailwindcss.com"
                class="text-indigo-600 font-medium"
              >
                Tailwind CSS v4
              </Link>
              support.
            </Text>
          </Section>

          <Hr class="border-gray-200 mx-10 my-0" />

          <!-- Feature cards -->
          <Section class="px-10 py-8">
            <Heading
              as="h2"
              class="text-xl font-semibold text-gray-900"
              :mt="0"
              :mb="16"
            >
              Why Unmail?
            </Heading>
            <Row>
              <Column class="w-1/3 pr-3 align-top">
                <Img
                  src="https://placehold.co/48x48/eef2ff/4f46e5?text=🧩"
                  alt="Components"
                  :width="48"
                  :height="48"
                  class="rounded-lg"
                />
                <Heading
                  as="h3"
                  class="text-sm font-semibold text-gray-900"
                  :mt="12"
                  :mb="4"
                >
                  18 Components
                </Heading>
                <Text class="text-xs text-gray-500 leading-5 mt-0">
                  Everything from layout primitives to buttons, images,
                  code blocks, and markdown rendering.
                </Text>
              </Column>
              <Column class="w-1/3 px-3 align-top">
                <Img
                  src="https://placehold.co/48x48/eef2ff/4f46e5?text=🎨"
                  alt="Tailwind"
                  :width="48"
                  :height="48"
                  class="rounded-lg"
                />
                <Heading
                  as="h3"
                  class="text-sm font-semibold text-gray-900"
                  :mt="12"
                  :mb="4"
                >
                  Tailwind CSS v4
                </Heading>
                <Text class="text-xs text-gray-500 leading-5 mt-0">
                  Utility classes compiled and inlined automatically. No config
                  needed.
                </Text>
              </Column>
              <Column class="w-1/3 pl-3 align-top">
                <Img
                  src="https://placehold.co/48x48/eef2ff/4f46e5?text=📧"
                  alt="Compatibility"
                  :width="48"
                  :height="48"
                  class="rounded-lg"
                />
                <Heading
                  as="h3"
                  class="text-sm font-semibold text-gray-900"
                  :mt="12"
                  :mb="4"
                >
                  Email Client Ready
                </Heading>
                <Text class="text-xs text-gray-500 leading-5 mt-0">
                  Outlook conditional comments, Yahoo body wrappers, Apple Mail
                  fixes — all built in.
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr class="border-gray-200 mx-10 my-0" />

          <!-- Markdown section -->
          <Section class="px-10 py-8">
            <Markdown
              :markdown-container-styles="markdownContainerStyles"
              :markdown-custom-styles="markdownCustomStyles"
            >
              {{ markdownContent }}
            </Markdown>
          </Section>

          <Hr class="border-gray-200 mx-10 my-0" />

          <!-- Code section -->
          <Section class="px-10 py-8">
            <Heading
              as="h2"
              class="text-xl font-semibold text-gray-900"
              :mt="0"
              :mb="8"
            >
              Quick Start
            </Heading>
            <Text class="text-gray-600 text-sm leading-7 mt-0 mb-4">
              Install the package with
              <CodeInline
                :style="{
                  backgroundColor: '#f3f4f6',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                }"
              >
                npm install @unmail/vue
              </CodeInline>
              and start building emails:
            </Text>
            <CodeBlock
              :code="codeExample"
              language="markup"
              :theme="codeBlockThemes.nightOwl"
              :style="{ borderRadius: '8px', fontSize: '13px' }"
            />
          </Section>

          <Hr class="border-gray-200 mx-10 my-0" />

          <!-- CTA -->
          <Section class="px-10 py-10 text-center">
            <Heading
              as="h2"
              class="text-xl font-semibold text-gray-900"
              :mt="0"
              :mb="8"
            >
              Ready to get started?
            </Heading>
            <Text class="text-gray-500 text-sm mt-0 mb-6">
              Install the package for your framework and start building emails in
              minutes.
            </Text>
            <Row>
              <Column class="text-center">
                <Button
                  href="https://unmail.dev/installation"
                  class="bg-indigo-600 text-white font-semibold text-sm px-8 py-3 rounded-lg no-underline"
                >
                  Read the Docs
                </Button>
              </Column>
              <Column class="text-center">
                <Button
                  href="https://github.com/unmail/unmail"
                  class="bg-white text-indigo-600 font-semibold text-sm px-8 py-3 rounded-lg no-underline border border-indigo-200 border-solid"
                >
                  View on GitHub
                </Button>
              </Column>
            </Row>
          </Section>

          <!-- Footer -->
          <Section class="bg-gray-50 rounded-b-xl px-10 py-8">
            <Row>
              <Column class="w-1/2">
                <Text class="text-xs text-gray-400 mt-0 mb-0">
                  © 2025 Unmail. MIT License.
                </Text>
                <Text class="text-xs text-gray-400 mt-1 mb-0">
                  Unstyled email components for React & Vue.
                </Text>
              </Column>
              <Column class="w-1/2 text-right align-middle">
                <Link
                  href="https://github.com/unmail/unmail"
                  class="text-gray-400 text-xs no-underline"
                >
                  GitHub
                </Link>
                <span class="text-gray-300 mx-2">·</span>
                <Link
                  href="https://www.npmjs.com/package/@unmail/vue"
                  class="text-gray-400 text-xs no-underline"
                >
                  npm
                </Link>
                <span class="text-gray-300 mx-2">·</span>
                <Link
                  href="https://unmail.dev"
                  class="text-gray-400 text-xs no-underline"
                >
                  Website
                </Link>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
</template>
