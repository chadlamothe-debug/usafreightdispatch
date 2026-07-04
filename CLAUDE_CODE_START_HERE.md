# START HERE — Instructions for Claude Code

You are being handed a **finished, deploy-ready static website**. Your job is NOT
to redesign or rebuild it — it already works as-is. Your job is to **get it onto
GitHub and deployed to Vercel** using the user's own git and Vercel access on this
machine.

## What this is
- A 5-page static marketing site for **USA Freight Dispatch** (Home, About,
  Services, Why Us, Contact) plus a branded `404.html`.
- Plain HTML rendered by a small client-side runtime (`support.js`) — **there is
  no build step.** It is served as static files.
- A serverless contact form at `api/contact.js` that emails leads via Resend.

## The goal
1. Put every file in this folder into the user's GitHub repo:
   **https://github.com/chadlamothe-debug/usafreightdispatch.git**
   The repo currently contains a Vite + React starter — **replace it entirely**
   with these files (delete `src/`, `vite.config.ts`, `tsconfig*.json`,
   `.oxlintrc.json`, and the old `index.html`/`package.json`). A force-push of
   this folder's contents to `main` is the clean way to do it.
2. Deploy to Vercel from that repo:
   - It is a **static site — Framework Preset "Other", NO build command,** output
     directory = repo root.
   - The repo may already be linked to a Vercel project named
     `usafreightdispatch` (that's why a re-import errors with "already exists").
     Prefer deploying into that existing project, or use `vercel --prod` via the
     Vercel CLI from this folder.
3. Set the environment variable **`RESEND_API_KEY`** in the Vercel project
   (the user has the key from their Resend dashboard — prompt them for it; never
   hard-code it). Redeploy after adding it.
4. Set **www.usafreightdispatch.com** as the project's **primary domain** so the
   bare apex redirects to www (all SEO tags in the site use the www version).

## Important details
- The contact form (`api/contact.js`) already emails leads to
  **chad.lamothe@gmail.com** from **dispatch@usafreightdispatch.com** (the user's
  verified Resend domain). Don't change these unless the user asks.
- All SEO / canonical / sitemap URLs use `https://www.usafreightdispatch.com`.
  If the user picks a different final domain, find-and-replace it across the
  `.html` files, `sitemap.xml`, and `robots.txt`.
- After deploy, have the user add the site to **Google Search Console** and submit
  `sitemap.xml`.

## Files in this bundle
- `index.html`, `about.html`, `services.html`, `why-us.html`, `contact.html`, `404.html`
- `support.js`, `image-slot.js` — runtime (keep alongside the HTML)
- `api/contact.js` — Resend serverless function
- `uploads/` — all images used by the site
- `vercel.json` — clean URLs config
- `package.json` — minimal, no build
- `sitemap.xml`, `robots.txt`, `favicon.png`, `favicon-32.png`, `apple-touch-icon.png`
- `README.md` — human-facing deploy notes

Confirm each step with the user as you go (git push, Vercel deploy, env var,
domain). Work from what Vercel actually returns, not assumptions.
