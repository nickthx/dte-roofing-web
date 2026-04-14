---
name: dteroofingllc-technical-seo-audit
description: Technical SEO audit of dteroofingllc.com — infrastructure, rendering, schema, security, canonicalization (verified against live prerendered HTML)
type: reference
date: 2026-04-13
score: 8.8/10
---

# Technical SEO Audit — dteroofingllc.com (2026-04-13)

**Verdict:** Infrastructure is strong. Prerendering is already shipped (quick task `260407-m8b`, `scripts/prerender.mjs` + `vite build --ssr`), sitemap is git-log driven, security headers are excellent. Remaining gaps are narrow: missing social-share meta tags, an unresolved `/blog/:slug` rewrite, and a 308-vs-301 canonicalization detail.

## Scores

| Area | Score |
|---|---|
| Crawlability | 9/10 |
| Indexability | 9/10 |
| Security & HTTPS | 10/10 |
| URL Canonicalization | 8/10 |
| Rendering | 9/10 (prerender active) |
| Schema | 9/10 |
| Head/meta defaults | 7/10 |
| **Overall** | **8.8/10** |

## Verified Live (2026-04-13)

- `/locations/columbus` prerendered HTML contains: `<title>Roofers Columbus, OH | DTE Roofing…</title>`, `<link rel="canonical">`, full `RoofingContractor` JSON-LD, og:title/description/type/locale/site_name, twitter:card/title/description ✓
- HSTS preload: `max-age=63072000; includeSubDomains; preload` ✓
- CSP scoped tightly to Roofle/Maps/Supabase/Cloudflare Insights ✓
- `robots.txt` → 200, declares sitemap, disallows `/api/` and `/_redirects` ✓
- `sitemap.xml` → 200, 34 URLs, `lastmod` auto-generated from `git log` via `scripts/generate-sitemap.mjs:22-31` ✓

## Remaining Issues

### P1 — Missing social/share tags
In both `src/components/SEO.tsx:28-47` and `index.html:12-23`:
- ❌ No `og:image` (social cards render without preview image)
- ❌ No `og:url` (canonical equivalent for OG)
- ❌ No `twitter:image`
- ❌ No `twitter:site` / `twitter:creator`

**Fix:** add these to `SEO.tsx` with sensible defaults (hero image as fallback), and add a static baseline in `index.html` for first-paint bots that render pre-helmet.

### P1 — `/blog/:slug` rewrite not serving
`vercel.json:33-35` declares `{ "source": "/blog/:slug", "destination": "/index.html" }` but `/blog/test-post` returns **404** from Vercel. Either the rewrite is being short-circuited by a missing prerender of `/index.html` as a route, or the destination needs to match a prerendered HTML file. Investigate: does the blog section have any live posts? If blog isn't active, consider removing the rewrite or noindexing the path.

### P2 — Naked→www redirect sends 308
`vercel.json:11-16` specifies `statusCode: 301` but curl shows **308 Permanent Redirect**. Google treats both as permanent, but Vercel may be overriding. Switch to `"permanent": true` (Vercel's preferred syntax) for guaranteed 308, or use config-level domain redirect for 301.

### P2 — Polish
- Add `<link rel="preload">` for hero LCP image on `/` and location pages.
- Add `image:image` entries to sitemap for service + location pages.

## What's Already Solved (do not re-open)

- ✅ Prerendering — `vite build --ssr src/entry-server.tsx` + `scripts/prerender.mjs` (shipped 2026-04-07)
- ✅ Sitemap auto-generation with git-log lastmod — `scripts/generate-sitemap.mjs`
- ✅ Security headers batch — HSTS preload, CSP enforcing, Permissions-Policy (shipped 2026-04-11)
- ✅ HTTP→HTTPS and apex→www canonicalization infrastructure

## Source

Live curl headers + live HTML response + codebase inspection on commit `bdcc348`. Audit conducted by /technical-seo-checker skill, then corrected after discovering existing prerender implementation in STATE.md.
