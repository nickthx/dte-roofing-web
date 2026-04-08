# Technical SEO Audit — dteroofingllc.com
**Date:** 2026-04-08
**Overall Score:** 8.5/10 (up from 5.5 on 2026-04-07)

## Verdict
Prerender pipeline is live and working — homepage ships fully rendered HTML with title, meta description, canonical, JSON-LD (RoofingContractor, BreadcrumbList, WebPage), and visible body content. Prior blocker resolved. Remaining issues are polish.

## Top Fixes (priority order)
1. **Promote CSP from Report-Only to enforcing** in `vercel.json` once reports are clean.
2. **Real sitemap lastmod dates** — generate from git mtime per URL, or drop the field. All 35 entries currently share `2026-03-25`.
3. **Verify apex redirect is 301** in Vercel dashboard — `vercel.json` declares 301 but edge emits HTTP 308 on live curl.
4. **Measure Core Web Vitals** — PageSpeed Insights on `/`, `/locations/columbus`, `/services/roof-repair`.
5. **Rich Results validation** across all 25 service/location routes to confirm per-route schema ships from prerender pipeline.
6. **Add Permissions-Policy header** (optional hardening).

## What Improved Since 2026-04-07
- ✅ Prerender shipped — HTML contains canonical, meta, JSON-LD, body content
- ✅ Sitemap expanded 24 → 35 URLs (all 12 services + 13 locations)
- ✅ Gutter duplicate resolved (`/services/gutter-services` → 301 → `/services/gutters`)
- ✅ Security headers added (XFO, XCTO, Referrer-Policy, CSP Report-Only)
- ✅ `vercel.json` declares 301 for apex→www

## Dimension Scores
Crawlability 9 · Indexability 9 · Security 8 · Schema 9 · URL Structure 9 · Mobile ✅ · Speed ?

## Open Loops / Not Measured
- Core Web Vitals (LCP/CLS/INP) — run PageSpeed Insights
- Rich Results validation for all 25 service/location routes
- GSC Coverage report confirmation after sitemap expansion
- CSP Report-Only violation reports — review before promoting to enforcing
- **Vercel project mismatch**: No `dte-roofing-web` in Vercel team `nick-whitsetts-projects`; only `dte-roofing-demo`. Confirm production deployment source.

## Sources
- `curl -sIL https://dteroofingllc.com/` — HTTP 308 apex→www, HSTS max-age=63072000
- WebFetch `https://www.dteroofingllc.com/` — full HTML, schema types + H1 + body confirmed
- WebFetch `/sitemap.xml` — 35 URLs, single lastmod `2026-03-25`, `/services/gutters` canonical
- WebFetch `/robots.txt` — valid, sitemap declared, only `/api/` + redirect utils blocked
- Vercel MCP `list_teams` + `list_projects` — no dte-roofing-web project found
- `vercel.json` — CSP Report-Only, apex redirect declared statusCode 301
- Prior audit: `memory/audits/technical-seo-checker/2026-04-07-dteroofingllc.md`
