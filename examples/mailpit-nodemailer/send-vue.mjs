import { h, defineComponent } from "vue";
import nodemailer from "nodemailer";
import {
  render,
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
  Tailwind,
} from "@unmail/vue";

// ---------------------------------------------------------------------------
// Config (reads from .env or falls back to Mailpit defaults)
// ---------------------------------------------------------------------------
const SMTP_HOST = process.env.SMTP_HOST ?? "127.0.0.1";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 1025);
const SMTP_SECURE = process.env.SMTP_SECURE === "true";
const MAIL_FROM = process.env.MAIL_FROM ?? "noreply@unmail.local";
const MAIL_TO = process.env.MAIL_TO ?? "check@mailpit.local";

// ---------------------------------------------------------------------------
// Email template — exercises every component
// ---------------------------------------------------------------------------
const WelcomeEmail = defineComponent({
  name: "WelcomeEmail",
  setup() {
    return () =>
      h(Tailwind, null, () =>
        h(Html, { lang: "en", dir: "ltr" }, () => [
          h(Head, null, () =>
            h(Font, {
              fontFamily: "Inter",
              fallbackFontFamily: "Arial",
              webFont: {
                url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
                format: "woff2",
              },
              fontWeight: 400,
              fontStyle: "normal",
            }),
          ),
          h(Preview, null, () => "Welcome to Unmail — unstyled email components"),
          h(Body, { class: "bg-gray-100 font-sans" }, () =>
            h(Container, { class: "bg-white mx-auto my-10 p-8 rounded-lg" }, () => [
              // Logo
              h(Section, { class: "text-center" }, () =>
                h(Img, {
                  src: "https://placehold.co/120x40/6366f1/white?text=unmail",
                  alt: "Unmail logo",
                  width: 120,
                  height: 40,
                  class: "mx-auto",
                }),
              ),

              h(Heading, { as: "h1", class: "text-2xl font-bold text-gray-900 text-center" }, () => "Welcome to Unmail"),
              h(Text, { class: "text-gray-600 text-base leading-6" }, () => [
                "This email was rendered with ",
                h("strong", null, "@unmail/vue"),
                " and sent via ",
                h(Link, { href: "https://nodemailer.com" }, () => "Nodemailer"),
                " to ",
                h(Link, { href: "https://mailpit.axllent.org" }, () => "Mailpit"),
                ".",
              ]),

              h(Hr, { class: "border-gray-200 my-6" }),

              // Feature grid
              h(Heading, { as: "h2", class: "text-lg font-semibold text-gray-800" }, () => "Components used in this email"),
              h(Section, null, () =>
                h(Row, null, () => [
                  h(Column, { class: "w-1/2 pr-2" }, () => [
                    h(Text, { class: "text-sm text-gray-700 font-semibold" }, () => "Layout"),
                    h(Text, { class: "text-sm text-gray-500" }, () => "Html, Head, Body, Container, Section, Row, Column"),
                  ]),
                  h(Column, { class: "w-1/2 pl-2" }, () => [
                    h(Text, { class: "text-sm text-gray-700 font-semibold" }, () => "Content"),
                    h(Text, { class: "text-sm text-gray-500" }, () => "Heading, Text, Link, Button, Img, Hr, Preview, Font"),
                  ]),
                ]),
              ),

              h(Hr, { class: "border-gray-200 my-6" }),

              // CTA button
              h(Section, { class: "text-center my-8" }, () =>
                h(
                  Button,
                  {
                    href: "https://github.com/pfrfrh/unmail",
                    class: "bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md no-underline",
                  },
                  () => "View on GitHub",
                ),
              ),

              // Footer
              h(Hr, { class: "border-gray-200 my-6" }),
              h(Text, { class: "text-xs text-gray-400 text-center" }, () =>
                "Sent with Unmail — unstyled email components for React & Vue.",
              ),
            ]),
          ),
        ]),
      );
  },
});

// ---------------------------------------------------------------------------
// Render & send
// ---------------------------------------------------------------------------
console.log("Rendering Vue email...");
const html = await render(WelcomeEmail);
const plainText = await render(WelcomeEmail, {}, { plainText: true });

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
});

const info = await transporter.sendMail({
  from: MAIL_FROM,
  to: MAIL_TO,
  subject: "[Vue] Welcome to Unmail",
  html,
  text: plainText,
});

console.log("Vue email sent! Message ID:", info.messageId);
console.log("Check Mailpit at http://localhost:8025");
