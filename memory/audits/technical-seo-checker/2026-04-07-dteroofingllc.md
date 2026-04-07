# Technical SEO Audit — dteroofingllc.com
**Date:** 2026-04-07
**Overall Score:** 5.5/10

## Verdict
Solid security/robots foundation, but client-side rendering (React SPA, 2,295-byte HTML shell) hides canonical tags, JSON-LD, OG tags, and body content from crawlers — directly undermining the current local-authority SEO milestone.

## Top Fixes (priority order)
1. **Prerender routes** (vite-plugin-ssg / react-snap) so every /services/* and /locations/* page ships static HTML with canonical, meta, OG, and JSON-LD baked in. Biggest lever.
2. **Apex→www redirect is 307** — change to **301** in `vercel.json` to consolidate link equity.
3. **Sitemap is incomplete** — only 24 URLs, only 3 of 13 locations present. Regenerate from React Router config in `src/App.tsx` to include all 12 services + 13 locations.
4. **Duplicate service URLs** — `/services/gutters` and `/services/gutter-services` both in sitemap; pick canonical and 301 the other.
5. **Sitemap lastmod** — all 24 URLs share identical `2025-10-25` date. Use real git dates or drop the field.
6. **Add security headers** (CSP, X-Frame-Options, Referrer-Policy) in `vercel.json`.

## What's Working
- HTTPS + HSTS (max-age=63072000)
- robots.txt valid, sitemap declared
- `meta robots: index, follow`, viewport meta present
- Tailwind responsive (mobile-friendly assumed)

## Open Loops / Not Measured
- Core Web Vitals (run PageSpeed Insights on homepage + `/locations/columbus` + a service page)
- Schema rich-results validation (blocked until prerendering ships)
- GSC Coverage report — confirm all 13 locations indexed after sitemap fix

## Dimension Scores
Crawlability 7 · Indexability 4 · Security 8 · Schema 3 (client-only) · URL structure 7 · Mobile ✅ · Speed ?

## Sources
- `curl -sIL https://dteroofingllc.com/` (307 redirect observed)
- `curl -sL https://dteroofingllc.com/` (2295-byte HTML, no body/canonical/JSON-LD)
- WebFetch of /robots.txt and /sitemap.xml
- Codebase: `src/components/SEO.tsx` (client-side meta injection), `src/App.tsx` (40+ routes), `CLAUDE.md` milestone scope
