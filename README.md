# USA Freight Dispatch — Website

Static marketing site (Home, About, Services, Why Us, Contact) plus a serverless
contact form that emails leads through Resend.

## Deploying to Vercel

1. Put these files in your GitHub repo (`chadlamothe-debug/usafreightdispatch`),
   replacing the old Vite starter files. The repo root should contain:

   ```
   index.html
   about.html
   services.html
   why-us.html
   contact.html
   support.js
   image-slot.js
   vercel.json
   package.json
   uploads/            (all the images)
   api/contact.js      (the Resend email function)
   ```

2. In Vercel, import the repo. There is **no build step** — it is a static site,
   so Framework Preset = "Other" and Build Command can be left empty.

3. Add the environment variable (Vercel → Project → Settings → Environment Variables):

   | Name             | Value                         |
   |------------------|-------------------------------|
   | `RESEND_API_KEY` | *(your Resend API key)*       |

   Redeploy after adding it.

## The contact form

- Both the home page and the contact page POST to `/api/contact`.
- `api/contact.js` emails the lead to **chad.lamothe@gmail.com**
  from **dispatch@usafreightdispatch.com** (your verified Resend domain),
  and sets Reply-To to the lead's email so you can reply directly.
- To change the recipient or from-address, edit the `to` / `from` lines in
  `api/contact.js`.

## SEO

Every page has a unique `<title>`, meta description, canonical URL, Open Graph +
Twitter cards, and JSON-LD structured data (Organization + breadcrumbs) baked into
the static `<head>`. Also included:

- `sitemap.xml` — lists all five pages
- `robots.txt` — points crawlers to the sitemap
- `favicon.png`, `favicon-32.png`, `apple-touch-icon.png` — branded browser icons

**IMPORTANT — set your real domain.** Every SEO URL currently uses
`https://www.usafreightdispatch.com`. If your live site is at `www.` or a different
domain, do a find-and-replace across `sitemap.xml`, `robots.txt`, and the five
HTML files to swap in the correct base URL before/after deploying.

### After you deploy
1. Add the site to **Google Search Console** (verify ownership).
2. Submit `https://YOURDOMAIN/sitemap.xml` there.
3. Google generates the indented "sitelinks" (About / Services / Contact under
   your main result) automatically once the site is indexed and has some traffic
   — you can't force them, but the sitemap, clean nav, and structured data here
   are exactly what Google looks for.

## Notes

- `support.js` is the runtime that renders the pages — keep it alongside the HTML.
- Clean URLs are on (`/about`, `/services`, …) via `vercel.json`.
