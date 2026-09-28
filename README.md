# KIFF 2027 website

Kigali International Fashion Festival (March 8–14, 2027), presented by 1819twenty.
The site runs on Next.js 16 (App Router), uses Tailwind CSS v4, sends email through Resend, and stores uploads in Cloudinary.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/partners` | Partners and sponsorship levels |
| `/apply` | Applicant types and the "Start Application" button |
| `/apply/form?type=designer\|vendor\|sponsor` | Branching application form (the type is optional and preselects the branch) |

## Setup

```bash
cp .env.example .env.local   # fill in the keys
npm install
npm run dev
```

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key |
| `APPLICATION_TO_EMAIL` | Inbox that receives applications. It is `hello@1819twenty.com` for now; comma-separate for several addresses. |
| `RESEND_FROM_EMAIL` | Sender for both emails, for example `KIFF <hello@kigalifashionfestival.com>`. The domain must be verified in Resend. |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Signed direct uploads for logos, lookbooks, and product photos |
| `APPLICATIONS_CLOSE_AT` | Optional. Overrides the deadline (ISO date) so you can test the closed state. |

## How the application works

1. The form (`components/form/ApplicationForm.tsx`) validates each step on the client. It uses the zod schemas in `lib/schema.ts`.
2. Files upload straight from the browser to Cloudinary (`kiff-2027/applications/{type}`), after `/api/cloudinary-sign` signs the request. The form keeps only the file URLs.
3. The server action (`app/apply/form/actions.ts`) re-validates everything and rejects submissions after **Feb 1, 2027, 23:59 Kigali time**. It then sends two emails:
   - The full application goes to `APPLICATION_TO_EMAIL`. Reply-To is set to the applicant.
   - The confirmation "We received your KIFF application" goes to the applicant.

Participation fees intentionally appear nowhere on the site or in the form.

## Editing content

All copy (tiers, benefits, intros, and the confirmation email) lives in `lib/content.ts`. Form questions live in `lib/schema.ts`. Photos are in `public/images/photos`. They are placeholders until Meisha supplies the final photos.

## Before launch

- Add `kigalifashionfestival.com` to the Vercel project and send the DNS records to Meisha for Squarespace Domains.
- Verify the sending domain in Resend.
- In Cloudinary, enable **Settings → Security → "Allow delivery of PDF and ZIP files"** so lookbook PDFs open.
- Replace the placeholder photos. The current ones are 1080px wide and show other events' signage and watermarks. Aim for 2400px or wider for the heroes.
- Confirm the Vogue Avant Garde font is licensed for web use.
- Transfer ownership of every account (Vercel, Resend, Cloudinary) to Meisha.
