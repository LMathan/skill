# SkillForge Technologies — Marketing Site & Product Hub

Corporate website for SkillForge Technologies built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**. Includes the marketing site, blog, product pages (Active Pulse, ExpenseMate, Mavio), a moderated public reviews portal, and email-driven lead forms backed by Resend and Firestore.

## Getting Started

```bash
npm install
npm run dev        # development server on http://localhost:3000
npm run build      # production build
npm run lint       # ESLint (0 errors expected)
npx tsc --noEmit   # typecheck
```

## Environment Variables

Copy to `.env.local` (never commit — `.env*` is gitignored).

### Email (Resend)

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | for production | API key from [resend.com](https://resend.com). **Without it, email routes run in mock mode: submissions are still persisted to Firestore but no email is sent.** |
| `RESEND_FROM_EMAIL` | for production | Verified sender domain, e.g. `noreply@skillforgetechnology.app`. While unset, routes use `onboarding@resend.dev`, which Resend restricts to your own account email — client-facing auto-responses are skipped automatically in that case. |
| `OWNER_EMAIL` | recommended | Where owner alert emails are delivered. Defaults to `skillforgetechnology05@gmail.com`. |

### Firebase (Firestore)

Client-safe config values (safe to expose; protected by Firestore security rules):

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | e.g. `your-project.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Project id — **also gates server-side writes**; if unset, API routes skip persistence and log a warning |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Sender id |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | App id |

## API Routes & Form Security

All public `POST` routes (`/api/inquiry`, `/api/subscribe`, `/api/book-call`, `/api/place-order`, `/api/careers-apply`, `/api/real-estate-quote`, `/api/expense-mate-delete-account`, `/api/feedback`) share a common hardening layer in [`src/lib/api.ts`](src/lib/api.ts):

- **Rate limiting** — fixed-window per-IP limiter (default 5 req/min; 3/min for sensitive routes). In-memory: fine for a single instance; swap in Redis/Upstash before scaling horizontally.
- **Honeypot** — forms render a hidden `_gotcha` field; filled = bot → the route returns a fake success and stores/sends nothing.
- **Input validation & length caps** — strict email regex, per-field max lengths, quantity range checks, resume PDF type + 5 MB size limit.
- **HTML escaping** — every user-supplied value is escaped before being interpolated into email templates (blocks HTML/email injection).
- **Persistence before email** — leads, orders, bookings, applications, deletion requests, and reviews are written to Firestore *first*, so nothing is lost if Resend is down or unconfigured.
- **Moderated reviews** — `/api/feedback` stores reviews with `approved: false`; flip the flag in the Firestore console to publish. Clients only *read* Firestore directly; all writes go through the API.

### Firestore collections

| Collection | Written by |
| --- | --- |
| `inquiries` | contact/projects/landing forms |
| `subscribers` | newsletter footer |
| `bookings` | book-a-call modal |
| `orders` | Active Pulse order form |
| `job-applications` | careers form (resume attached to owner email) |
| `real-estate-quotes` | real-estate landing form |
| `expense-mate-deletion-requests` | Play-Store-compliant account deletion |
| `feedbacks` | reviews portal (`approved: false` until moderated) |

> **Firestore rules are not in this repo.** Ensure `feedbacks` (and other collections) are **not** world-writable from the client — the API routes use the Firebase Web SDK server-side.

## Error Handling

Global [`error.tsx`](src/app/error.tsx), [`global-error.tsx`](src/app/global-error.tsx), and [`not-found.tsx`](src/app/not-found.tsx) boundaries are in place.

## Security Headers

Configured in [`next.config.ts`](next.config.ts): CSP (`unsafe-eval` in dev only), HSTS (2 years, preload), X-Frame-Options DENY, nosniff, strict referrer policy, and restrictive Permissions-Policy.
