# Parva Realty — Admin Dashboard Setup

This adds a secure, database-backed Admin Dashboard on top of the existing
Parva Realty site. The public website and the dashboard now read/write the
**same** data, so any change an admin makes shows up immediately for every
visitor — not just in the admin's own browser.

## What changed

- `api/` — new serverless backend (deploys as Vercel Functions). Handles
  admin login/logout/session check, and all property CRUD.
- `src/store/propertyStore.ts` — now fetches the live property list from
  `/api/properties` instead of `localStorage`.
- `src/store/adminApi.ts` — new client for all admin-only calls.
- `src/admin/AdminLogin.tsx`, `src/admin/AdminDashboard.tsx`,
  `src/admin/RequireAdmin.tsx` — rebuilt to use the real backend: search/filter,
  available/unavailable toggle, quantity editing, summary cards, and a change log.
- `scripts/` — one-time setup scripts (create tables, seed your 12 existing
  properties, generate the password hash).
- Nothing about the public site's layout, branding, or booking/enquiry flow
  was changed — only the admin dashboard and its data source.

## 1. Get a Postgres database

Any of these work (all have a free tier):

- [Neon](https://neon.tech) — fastest to set up
- [Supabase](https://supabase.com)
- [Vercel Postgres](https://vercel.com/storage/postgres) — simplest if you're already deploying on Vercel
- Your own AWS RDS Postgres instance

Copy the connection string it gives you — you'll need it as `DATABASE_URL`.

## 2. Set environment variables

Copy `.env.example` to `.env` and fill in:

```bash
cp .env.example .env
```

- `DATABASE_URL` — from step 1
- The 3 admin accounts — each signs in with **their own email + password**
  (no shared login, no name field). Paste these ready-to-use hashes into
  `.env` as-is:

  ```
  ADMIN_1_EMAIL=nagesh@parvarealty.ae
  ADMIN_1_PASSWORD_HASH=$2a$12$eLWAdlfI2E/HSJ.ZW6sNR.i257XfyuvcpAtb7glFeepAlJjQIL91W
  ADMIN_1_NAME=Nagesh

  ADMIN_2_EMAIL=chaitra@parvarealty.ae
  ADMIN_2_PASSWORD_HASH=$2a$12$Fnrs6t4of3Jj906sFGFnQOALycvGT9Z/zKrIl/jOtKqUAIe2wojn6
  ADMIN_2_NAME=Chaitra

  ADMIN_3_EMAIL=sushma@diagofinance.com
  ADMIN_3_PASSWORD_HASH=$2a$12$gpFYMx4zGobhjDDXzuthdOF1YNrGMUOkaU7Mt.GP669G3J/4Nnk5O
  ADMIN_3_NAME=Sushma
  ```

  These hashes correspond to `Nagesh@2026`, `Chaitra@2026`, and
  `Sushma@2026` respectively — the plain passwords themselves are never
  stored anywhere, only these one-way hashes. If you ever need to change
  someone's password, generate a new hash with:
  ```bash
  npm run hash-password -- "TheirNewPassword"
  ```
  and replace their `*_PASSWORD_HASH` value. To add a 4th admin later, add
  `ADMIN_4_EMAIL` / `ADMIN_4_PASSWORD_HASH` / `ADMIN_4_NAME`.

- `ADMIN_JWT_SECRET` — a long random string:
  ```bash
  node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
  ```

## 3. Create the tables and load your 12 properties

```bash
npm install
npm run db:migrate   # creates the properties and audit_log tables
npm run db:seed      # loads your existing 12 properties, unchanged
```

## 4. Deploy

This project is set up for **Vercel** (it already has a `vercel.json` and the
`api/` folder follows Vercel's convention, so both the site and the backend
deploy together from one repo):

1. Push this project to GitHub (or import the folder directly in Vercel).
2. In Vercel: **New Project → Import** → select the repo.
3. Add all the variables from `.env` under **Project → Settings →
   Environment Variables** (for Production *and* Preview).
4. Deploy.

> Note: the `/api/*` routes only run once deployed to Vercel (or via
> `vercel dev` locally) — they will not respond inside a plain `vite dev`
> preview, since that only serves the frontend.

If you'd rather use a different host for the API (Render, Railway, etc.),
the same `api/*.js` files can be adapted to a small Express server — the
logic (auth, database calls, audit logging) is unchanged either way.

## 5. Sign in

Go to `/admin/login` (or tap the lock icon in the site nav next to the
light/dark toggle) and sign in with one of the 3 authorized emails and its
password. You'll land directly on `/admin` — the Admin Dashboard.

## Security notes

- Sessions are httpOnly, `SameSite=Strict` cookies — not accessible to page
  JavaScript, so they can't be read or forged from the browser console.
- Every admin API route independently checks the session on the server
  before touching the database. Opening `/admin` in a browser without a
  valid session redirects to login; calling the APIs directly without a
  valid session returns `401` — neither the dashboard nor its data can be
  reached by URL guessing or editing frontend code.
- The login endpoint has a basic in-memory rate limit (8 attempts / 10 min
  per IP) to slow down password guessing. For stronger protection at scale,
  consider adding a dedicated rate limiter (e.g. Upstash) or Vercel's WAF.
- Rotate `ADMIN_PASSWORD_HASH` (and re-share the new password out of band)
  periodically, and immediately if someone who had access leaves.

## Note on images

The 12 properties' photos now live only in `public/property-images/` (served
as real URLs the database points to), resized and compressed to web-friendly
JPEGs. The original, larger copies that used to sit in `src/imports/` were
unused dead weight after the switch to a database-backed catalogue (they
weren't part of the actual site bundle even before this change — confirmed
via a production build), so they were removed rather than kept twice. The
logo is untouched.
