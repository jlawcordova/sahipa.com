# sahipa.com

One-page portfolio site for Jollie Sahipa — Mortgage Support Specialist.
Built with Next.js (App Router), Tailwind CSS v4, and Framer Motion, ready to
deploy on Vercel.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Contact form

The **Get in Touch** button opens a modal that posts to `/api/contact`, which
sends the enquiry to `jollie@sahipa.com` through [Resend](https://resend.com).
The sender's address is set as `reply_to`, so replying from the inbox goes
straight back to them.

Environment variables (see `.env.example`):

| Variable | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key. Without it the form returns a friendly "not configured yet" error. |
| `CONTACT_FROM_EMAIL` | no | Sender address, must be on a domain verified in Resend. Defaults to Resend's `onboarding@resend.dev` sandbox sender. |
| `CONTACT_TO_EMAIL` | no | Recipient. Defaults to `jollie@sahipa.com`. |

For local development, copy `.env.example` to `.env.local` and fill it in.

## Deploying to Vercel

1. Import the repository in Vercel — the Next.js preset needs no extra config.
2. Add `RESEND_API_KEY` (and optionally `CONTACT_FROM_EMAIL` /
   `CONTACT_TO_EMAIL`) under **Settings → Environment Variables**.
3. Verify the sending domain in Resend so mail lands reliably.
4. Point the `sahipa.com` domain at the project.

## Editing content

Nearly all copy lives in [`src/lib/site.ts`](src/lib/site.ts): the name, role,
intro, disciplines, the "Trusted by" list, and the five capability cards
(title, body, icon, and card colour).

The "Trusted by" names render as wordmarks. To use real logo files instead,
drop the images in `public/` and swap the `<span>` markup in
[`src/components/trusted-by.tsx`](src/components/trusted-by.tsx) for
`next/image`.

The hero portrait is `public/hero.webp` (transparent background, ring artwork
baked in).

## Structure

```
src/app/layout.tsx          fonts, metadata, global shell
src/app/page.tsx            the single page
src/app/api/contact/route.ts  contact form handler
src/components/             hero, trusted-by, capabilities, footer, modal
src/lib/site.ts             all site copy
```
