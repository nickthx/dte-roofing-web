---
phase: 260407-lws-technical-seo-phase-a
plan: 01
type: quick
one_liner: "Technical SEO Phase A: apex 301, security headers, gutter-services 301, and build-time sitemap generator with git-based lastmod"
tags: [seo, vercel, sitemap, security-headers, redirects]
key_files:
  created:
    - scripts/generate-sitemap.mjs
  modified:
    - vercel.json
    - package.json
    - public/sitemap.xml
requirements:
  - SEO-A-01-apex-301
  - SEO-A-02-security-headers
  - SEO-A-03-gutter-services-301
  - SEO-A-04-sitemap-regen
---

# Quick Task 260407-lws: Technical SEO Phase A Summary

Shipped the four technical SEO quick wins from the 2026-04-07 audit: permanent apex→www 301, baseline security headers (with CSP Report-Only to avoid breaking Roofle/Supabase/Cloudflare on first deploy), 301 for the duplicate `/services/gutter-services` URL, and a Node ESM sitemap generator wired into `npm run build` that produces 35 canonical URLs with git-based lastmod values.

## Files Changed

| File | Change | Commit |
|------|--------|--------|
| `vercel.json` | Added apex 301 (host has-condition), gutter-services 301, security headers block (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP Report-Only). Preserved existing `/home` redirect and SPA rewrite. | f96cfeb |
| `scripts/generate-sitemap.mjs` | New Node ESM script. ROUTES manifest mirrors src/App.tsx. Uses `git log -1 --format=%cI` per source file for lastmod, today fallback. No new deps. | b3f4968 |
| `package.json` | Added `generate-sitemap` script; changed `build` to `npm run generate-sitemap && vite build`. | b3f4968 |
| `public/sitemap.xml` | Regenerated: 35 URLs (1 home + 12 services + 13 locations + 9 top-level). gutter-services excluded. | b3f4968 |

## Verification Results

- `node -e "JSON.parse(...vercel.json)"` → ok
- `npm run generate-sitemap` → `Generated sitemap with 35 urls`
- Sitemap URL count: **35** (expected 35)
- `gutter-services` in sitemap: **no**
- `/locations/powell` in sitemap: **yes**
- `npm run build` → success (vite built in 16.28s, sitemap regenerated as prebuild step)

## Deploy Verification (run after Vercel deploys `main`)

```bash
# Apex → www must be 301 (was 307)
curl -sI https://dteroofingllc.com/ | grep -iE "^(HTTP|location)"

# gutter-services duplicate must 301 to canonical
curl -sI https://www.dteroofingllc.com/services/gutter-services | grep -iE "^(HTTP|location)"

# Security headers present on any route
curl -sI https://www.dteroofingllc.com/ | grep -iE "x-frame-options|x-content-type-options|referrer-policy|content-security-policy"

# Sitemap served
curl -s https://www.dteroofingllc.com/sitemap.xml | grep -c "<url>"   # expect 35
```

Then smoke-test home page in a browser:
- Roofle widget renders
- Reviews load (Supabase)
- Cloudflare Web Analytics beacon fires
- Browser console: watch for CSP violation reports (Report-Only). None blocking, but collect violations to refine policy before enforcing.

## Follow-ups

1. **CSP Report-Only → enforcing.** After 1–2 weeks of production traffic with zero console CSP violations from legitimate flows, flip `Content-Security-Policy-Report-Only` to `Content-Security-Policy` in `vercel.json`. Consider adding `report-uri` / `report-to` before flipping for telemetry.
2. **GutterServices.tsx React route.** The React route in `src/App.tsx` still exists — the edge 301 handles the canonical redirect, so users/crawlers never reach it. Safe to leave, or delete the route + component in a future cleanup plan.
3. **Bundle size warning.** Vite reports the main JS chunk is >500 kB. Not in scope for this plan; candidate for a future code-splitting plan.

## Deviations from Plan

None — plan executed exactly as written. The plan explicitly instructed using `scripts/generate-sitemap.mjs` (plain ESM JS) instead of `.ts` to avoid a new `tsx` devDep; followed that guidance.

## Self-Check: PASSED

- `vercel.json` exists with apex 301, gutter-services 301, 4 security headers — FOUND
- `scripts/generate-sitemap.mjs` exists — FOUND
- `public/sitemap.xml` regenerated with 35 URLs — FOUND
- `package.json` build script wired to generator — FOUND
- Commit `f96cfeb` (vercel.json) — FOUND
- Commit `b3f4968` (sitemap generator + wiring) — FOUND
- `npm run build` succeeds — PASSED
