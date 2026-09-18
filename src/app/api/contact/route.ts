import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? site.email;
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Sahipa Website <onboarding@resend.dev>";

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
};

const asText = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char] as string,
  );

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: only bots fill this in. Pretend everything went fine.
  if (asText(body.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = asText(body.name, 120);
  const email = asText(body.email, 200);
  const subject = asText(body.subject, 160);
  const message = asText(body.message, 4000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot deliver contact enquiry.");
    return NextResponse.json(
      { error: "The contact form isn't configured yet." },
      { status: 503 },
    );
  }

  const heading = subject || `New enquiry from ${name}`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `sahipa.com — ${heading}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          subject ? `Subject: ${subject}` : null,
          "",
          message,
        ]
          .filter((line) => line !== null)
          .join("\n"),
        html: `
          <div style="font-family:Georgia,serif;color:#1b0a06;line-height:1.6">
            <h2 style="margin:0 0 16px">${escapeHtml(heading)}</h2>
            <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
            ${subject ? `<p style="margin:0 0 4px"><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
            <hr style="border:none;border-top:1px solid #e6d9d3;margin:20px 0" />
            <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("Resend rejected the message:", response.status, detail);
      return NextResponse.json(
        { error: "The message couldn't be sent right now." },
        { status: 502 },
      );
    }
  } catch (cause) {
    console.error("Failed to reach the email provider:", cause);
    return NextResponse.json(
      { error: "The message couldn't be sent right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
