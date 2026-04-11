---
quick_id: 260411-kct
description: Critical SEO header + index.html cleanup (HSTS + static head neutralization)
date: 2026-04-11
status: completed
commits:
  - 542bdda fix(security): add Strict-Transport-Security header to vercel.json
  - 1ee0b31 fix(seo): remove homepage-leaked static head tags from index.html
files_changed:
  - vercel.json (+1 / -0)
  - index.html (+2 / -8)
build: passed (npm run build, 73 modules, 34 routes prerendered, 2.60s)
---

# Quick Task 260411-kct — Summary

## What Changed

### Task 1 — `vercel.json` (commit 542bdda)
Added `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` to the existing `/(.*)` headers entry, logically grouped between `Referrer-Policy` and the Report-Only CSP. No other fields in `vercel.json` were touched — redirects, CSP, rewrites, `cleanUrls`, and `trailingSlash` all remain as-is.

### Task 2 — `index.html` (commit 1ee0b31)
Four atomic edits to the static `<head>`:
1. `<title>` → brand-only fallback `DTE Roofing` (was homepage-specific)
2. `<meta description>` → neutral brand description (was long homepage copy leaking to non-JS crawlers on every route)
3. `<meta keywords>` → **deleted** (ignored by Google since 2009)
4. `<!-- Geo Tags -->` block (`geo.region`, `geo.position`, `ICBM`) → **deleted** (React Helmet now owns geo.placename per-route per commits dfa9ca1 and 1fdad49)

Preserved unchanged: DOCTYPE, `html lang`, charset, viewport, favicons, author meta, robots meta, Open Graph static brand tags (`og:type`, `og:locale`, `og:site_name`), Twitter card, preconnects, Roofle widget, Cloudflare beacon, `<div id="root">`, main.tsx script.

## Verification

- `npm run build` succeeded (73 modules, 34 prerendered routes, 2.60s)
- Cross-route audit of `dist/` confirmed:
  - Zero occurrences of the old `"Columbus Roofing Experts"` leak text
  - Zero static `meta keywords`, `geo.region`, `geo.position`, or `ICBM` tags
  - Dublin route (spot-checked) shows its own per-route Helmet title, confirming the original audit-flagged non-JS crawler leak is closed

## Unexpected Finding

The executor discovered the project already uses `prerender-react-router` (commit f144e2e) for build-time SSG across all 34 sitemap URLs. **This contradicts a finding in the 2026-04-11 technical SEO audit**, which flagged the site as a pure client-rendered Vite SPA. The audit's "critical rendering-strategy" recommendation is therefore already addressed — only the static-head leaks needed closing, which this quick task has now done. The Week 1 prerendering planning item from the audit can be struck.

## Out of Scope (deferred)

- CSP promotion from Report-Only to enforcing (Week 2)
- `Permissions-Policy` header (Week 2)
- LCP image preload (Week 2)
- Rich Results Test validation (Week 2)
- Blog post entries in sitemap (Week 3)
