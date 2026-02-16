import React from "react";
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
} from "@unmail/react";

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
const WelcomeEmail = () =>
  React.createElement(
    Tailwind,
    null,
    React.createElement(
      Html,
      { lang: "en", dir: "ltr" },
      React.createElement(
        Head,
        null,
        React.createElement(Font, {
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
      React.createElement(
        Preview,
        null,
        "Welcome to Unmail — unstyled email components",
      ),
      React.createElement(
        Body,
        { className: "bg-gray-100 font-sans" },
        React.createElement(
          Container,
          { className: "bg-white mx-auto my-10 p-8 rounded-lg" },

          // Logo
          React.createElement(
            Section,
            { className: "text-center" },
            React.createElement(Img, {
              src: "https://placehold.co/120x40/6366f1/white?text=unmail",
              alt: "Unmail logo",
              width: 120,
              height: 40,
              className: "mx-auto",
            }),
          ),

          React.createElement(Heading, { as: "h1", className: "text-2xl font-bold text-gray-900 text-center" }, "Welcome to Unmail"),
          React.createElement(Text, { className: "text-gray-600 text-base leading-6" },
            "This email was rendered with ",
            React.createElement("strong", null, "@unmail/react"),
            " and sent via ",
            React.createElement(Link, { href: "https://nodemailer.com" }, "Nodemailer"),
            " to ",
            React.createElement(Link, { href: "https://mailpit.axllent.org" }, "Mailpit"),
            ".",
          ),

          React.createElement(Hr, { className: "border-gray-200 my-6" }),

          // Feature grid
          React.createElement(Heading, { as: "h2", className: "text-lg font-semibold text-gray-800" }, "Components used in this email"),
          React.createElement(
            Section,
            null,
            React.createElement(
              Row,
              null,
              React.createElement(Column, { className: "w-1/2 pr-2" },
                React.createElement(Text, { className: "text-sm text-gray-700 font-semibold" }, "Layout"),
                React.createElement(Text, { className: "text-sm text-gray-500" }, "Html, Head, Body, Container, Section, Row, Column"),
              ),
              React.createElement(Column, { className: "w-1/2 pl-2" },
                React.createElement(Text, { className: "text-sm text-gray-700 font-semibold" }, "Content"),
                React.createElement(Text, { className: "text-sm text-gray-500" }, "Heading, Text, Link, Button, Img, Hr, Preview, Font"),
              ),
            ),
          ),

          React.createElement(Hr, { className: "border-gray-200 my-6" }),

          // CTA button
          React.createElement(
            Section,
            { className: "text-center my-8" },
            React.createElement(
              Button,
              {
                href: "https://github.com/pfrfrh/unmail",
                className: "bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md no-underline",
              },
              "View on GitHub",
            ),
          ),

          // Footer
          React.createElement(Hr, { className: "border-gray-200 my-6" }),
          React.createElement(Text, { className: "text-xs text-gray-400 text-center" },
            "Sent with Unmail — unstyled email components for React & Vue.",
          ),
        ),
      ),
    ),
  );

// ---------------------------------------------------------------------------
// Render & send
// ---------------------------------------------------------------------------
console.log("Rendering React email...");
const html = await render(WelcomeEmail());
const plainText = await render(WelcomeEmail(), { plainText: true });

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
});

const info = await transporter.sendMail({
  from: MAIL_FROM,
  to: MAIL_TO,
  subject: "[React] Welcome to Unmail",
  html,
  text: plainText,
});

console.log("React email sent! Message ID:", info.messageId);
console.log("Check Mailpit at http://localhost:8025");
