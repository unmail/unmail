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
  Tailwind,
} from "@unmail/react";

const markdownContent = `
## What is Unmail?

Unmail provides **unstyled components** that produce clean, \`table-based\` HTML optimized for email clients.

### Key benefits:

- Works in *all major email clients* including Outlook
- First-class [Tailwind CSS](https://tailwindcss.com) support
- Available for both **React** and **Vue**

> "The best way to build emails in 2025."

Here's a quick example:

\`\`\`tsx
import { render, Html, Button } from "@unmail/react";

const html = await render(
  <Html>
    <Button href="https://example.com">Click me</Button>
  </Html>
);
\`\`\`
`;

export const WelcomeEmail = () => {
  return (
    <Tailwind>
      <Html lang="en" dir="ltr">
        <Head>
          <Font
            fontFamily="Inter"
            fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
            webFont={{
              url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>

        <Preview>
          Welcome to Unmail — unstyled email components for React and Vue. Build
          beautiful, responsive emails with Tailwind CSS.
        </Preview>

        <Body className="bg-slate-100 font-sans">
          <Container className="bg-white mx-auto my-10 rounded-xl shadow-sm">
            {/* Header */}
            <Section className="bg-indigo-600 rounded-t-xl px-10 py-8">
              <Row>
                <Column className="w-1/2">
                  <Img
                    src="https://placehold.co/140x45/4f46e5/white?text=unmail"
                    alt="Unmail"
                    width={140}
                    height={45}
                  />
                </Column>
                <Column className="w-1/2 text-right align-middle">
                  <Link
                    href="https://unmail.dev/docs"
                    className="text-indigo-200 text-sm no-underline"
                  >
                    Docs
                  </Link>
                  <span className="text-indigo-400 mx-2">·</span>
                  <Link
                    href="https://github.com/unmail/unmail"
                    className="text-indigo-200 text-sm no-underline"
                  >
                    GitHub
                  </Link>
                </Column>
              </Row>
            </Section>

            {/* Hero */}
            <Section className="px-10 pt-10 pb-6">
              <Heading
                as="h1"
                className="text-3xl font-bold text-gray-900 leading-tight"
                mt={0}
                mb={8}
              >
                Welcome to Unmail
              </Heading>
              <Text className="text-gray-600 text-base leading-7 mt-0">
                Build beautiful, responsive emails using the same components and
                workflow you already love. Unmail provides unstyled, accessible
                components for{" "}
                <Link href="https://react.dev" className="text-indigo-600 font-medium">
                  React
                </Link>{" "}
                and{" "}
                <Link href="https://vuejs.org" className="text-indigo-600 font-medium">
                  Vue
                </Link>
                , with first-class{" "}
                <Link
                  href="https://tailwindcss.com"
                  className="text-indigo-600 font-medium"
                >
                  Tailwind CSS v4
                </Link>{" "}
                support.
              </Text>
            </Section>

            <Hr className="border-gray-200 mx-10 my-0" />

            {/* Feature cards */}
            <Section className="px-10 py-8">
              <Heading
                as="h2"
                className="text-xl font-semibold text-gray-900"
                mt={0}
                mb={16}
              >
                Why Unmail?
              </Heading>
              <Row>
                <Column className="w-1/3 pr-3 align-top">
                  <Img
                    src="https://placehold.co/48x48/eef2ff/4f46e5?text=🧩"
                    alt="Components"
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                  <Heading
                    as="h3"
                    className="text-sm font-semibold text-gray-900"
                    mt={12}
                    mb={4}
                  >
                    16 Components
                  </Heading>
                  <Text className="text-xs text-gray-500 leading-5 mt-0">
                    Everything from layout primitives to buttons, images, and
                    markdown rendering.
                  </Text>
                </Column>
                <Column className="w-1/3 px-3 align-top">
                  <Img
                    src="https://placehold.co/48x48/eef2ff/4f46e5?text=🎨"
                    alt="Tailwind"
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                  <Heading
                    as="h3"
                    className="text-sm font-semibold text-gray-900"
                    mt={12}
                    mb={4}
                  >
                    Tailwind CSS v4
                  </Heading>
                  <Text className="text-xs text-gray-500 leading-5 mt-0">
                    Utility classes compiled and inlined automatically. No config
                    needed.
                  </Text>
                </Column>
                <Column className="w-1/3 pl-3 align-top">
                  <Img
                    src="https://placehold.co/48x48/eef2ff/4f46e5?text=📧"
                    alt="Compatibility"
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                  <Heading
                    as="h3"
                    className="text-sm font-semibold text-gray-900"
                    mt={12}
                    mb={4}
                  >
                    Email Client Ready
                  </Heading>
                  <Text className="text-xs text-gray-500 leading-5 mt-0">
                    Outlook conditional comments, Yahoo body wrappers, Apple
                    Mail fixes — all built in.
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="border-gray-200 mx-10 my-0" />

            {/* Markdown section */}
            <Section className="px-10 py-8">
              <Markdown
                markdownContainerStyles={{ color: "#374151", fontSize: "14px" }}
                markdownCustomStyles={{
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
                }}
              >
                {markdownContent}
              </Markdown>
            </Section>

            <Hr className="border-gray-200 mx-10 my-0" />

            {/* CTA */}
            <Section className="px-10 py-10 text-center">
              <Heading
                as="h2"
                className="text-xl font-semibold text-gray-900"
                mt={0}
                mb={8}
              >
                Ready to get started?
              </Heading>
              <Text className="text-gray-500 text-sm mt-0 mb-6">
                Install the package for your framework and start building emails
                in minutes.
              </Text>
              <Row>
                <Column className="text-center">
                  <Button
                    href="https://unmail.dev/installation"
                    className="bg-indigo-600 text-white font-semibold text-sm px-8 py-3 rounded-lg no-underline"
                  >
                    Read the Docs
                  </Button>
                </Column>
                <Column className="text-center">
                  <Button
                    href="https://github.com/unmail/unmail"
                    className="bg-white text-indigo-600 font-semibold text-sm px-8 py-3 rounded-lg no-underline border border-indigo-200 border-solid"
                  >
                    View on GitHub
                  </Button>
                </Column>
              </Row>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-50 rounded-b-xl px-10 py-8">
              <Row>
                <Column className="w-1/2">
                  <Text className="text-xs text-gray-400 mt-0 mb-0">
                    © 2025 Unmail. MIT License.
                  </Text>
                  <Text className="text-xs text-gray-400 mt-1 mb-0">
                    Unstyled email components for React & Vue.
                  </Text>
                </Column>
                <Column className="w-1/2 text-right align-middle">
                  <Link
                    href="https://github.com/unmail/unmail"
                    className="text-gray-400 text-xs no-underline"
                  >
                    GitHub
                  </Link>
                  <span className="text-gray-300 mx-2">·</span>
                  <Link
                    href="https://www.npmjs.com/package/@unmail/react"
                    className="text-gray-400 text-xs no-underline"
                  >
                    npm
                  </Link>
                  <span className="text-gray-300 mx-2">·</span>
                  <Link
                    href="https://unmail.dev"
                    className="text-gray-400 text-xs no-underline"
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
  );
};
