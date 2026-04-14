---
name: dteroofingllc-technical-seo-audit
description: Technical SEO audit of dteroofingllc.com — infrastructure, rendering, schema, security, canonicalization (verified against live prerendered HTML)
type: reference
date: 2026-04-13
score: 8.8/10
---

# Technical SEO Audit — dteroofingllc.com (2026-04-13)

**Verdict:** Infrastructure is strong. Prerendering is already shipped (quick task `260407-m8b`, `scripts/prerender.mjs` + `vite build --ssr`), sitemap is git-log driven, security headers are excellent. Remaining gaps are narrow: missing social-share meta tags and polish items (LCP preload, sitemap image entries).

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

### P2 — Polish
- Add `<link rel="preload">` for hero LCP image on `/` and location pages.
- Add `image:image` entries to sitemap for service + location pages.

## Closed Items

### ✅ `/blog/:slug` rewrite — Resolved (rewrite removed) 2026-04-13
`vercel.json` previously declared `{ "source": "/blog/:slug", "destination": "/index.html" }` but the rewrite was both broken (404s) and obsolete:
- `public/data/blog-posts.json` is `[]` — no posts exist
- `scripts/prerender.mjs:22` has `if (route.includes(':')) continue;` — dynamic routes are intentionally skipped
- SPA fallback would not serve meaningful content anyway (prerender pipeline is the intended render path)

**Resolution:** `rewrites` key removed entirely from `vercel.json` (quick task `260413-tz5`). When blog activates, extend `scripts/prerender.mjs` to generate per-slug static pages from `blog-posts.json` — do NOT reintroduce the SPA fallback.

### ✅ Naked→www sends 308 — Accepted (working as intended) 2026-04-13
`vercel.json:14` declares `statusCode: 301` but Vercel sends **308 Permanent Redirect**. Root cause: Vercel's platform-level apex→primary-domain redirect takes precedence over `vercel.json` redirects.

**Disposition:** Accepted. No code change.
- Google treats 301 and 308 identically for SEO — zero ranking impact
- 308 is semantically more correct (preserves HTTP method on redirect)
- Overriding the platform default would require removing the apex domain from Vercel project settings, which is not worth the operational risk for a semantics-only improvement

## What's Already Solved (do not re-open)

- ✅ Prerendering — `vite build --ssr src/entry-server.tsx` + `scripts/prerender.mjs` (shipped 2026-04-07)
- ✅ Sitemap auto-generation with git-log lastmod — `scripts/generate-sitemap.mjs`
- ✅ Security headers batch — HSTS preload, CSP enforcing, Permissions-Policy (shipped 2026-04-11)
- ✅ HTTP→HTTPS and apex→www canonicalization infrastructure

## Source

Live curl headers + live HTML response + codebase inspection on commit `bdcc348`. Audit conducted by /technical-seo-checker skill, then corrected after discovering existing prerender implementation in STATE.md.
