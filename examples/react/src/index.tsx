import { render } from "@unmail/react";
import nodemailer from "nodemailer";
import { WelcomeEmail } from "./email";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "127.0.0.1",
  port: Number(process.env.SMTP_PORT ?? 1025),
  secure: process.env.SMTP_SECURE === "true",
});

const html = await render(<WelcomeEmail />);
const text = await render(<WelcomeEmail />, { plainText: true });

const info = await transporter.sendMail({
  from: process.env.MAIL_FROM ?? "noreply@unmail.local",
  to: process.env.MAIL_TO ?? "check@mailpit.local",
  subject: "[React] Welcome to Unmail",
  html,
  text,
});

console.log("React email sent! Message ID:", info.messageId);
console.log("Check Mailpit at http://localhost:8025");
