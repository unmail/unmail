import { render } from "@unmail/vue";
import nodemailer from "nodemailer";
import WelcomeEmail from "./email.vue";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "127.0.0.1",
  port: Number(process.env.SMTP_PORT ?? 1025),
  secure: process.env.SMTP_SECURE === "true",
});

const html = await render(WelcomeEmail);
const text = await render(WelcomeEmail, {}, { plainText: true });

const info = await transporter.sendMail({
  from: process.env.MAIL_FROM ?? "noreply@unmail.local",
  to: process.env.MAIL_TO ?? "check@mailpit.local",
  subject: "[Vue] Welcome to Unmail",
  html,
  text,
});

console.log("Vue email sent! Message ID:", info.messageId);
console.log("Check Mailpit at http://localhost:8025");
