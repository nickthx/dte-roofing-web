---
quick_id: 260411-m0s
description: Security headers batch 2 — Permissions-Policy + CSP promotion
date: 2026-04-11
status: completed
commits:
  - f4c356f fix(security): add Permissions-Policy header to vercel.json
  - 678e0f3 fix(security): promote CSP from Report-Only to enforcing
files_changed:
  - vercel.json (+2 / -1)
build: passed (npm run build, 73 modules, 34 routes prerendered, 3.09s)
---

# Quick Task 260411-m0s — Summary

## What Changed

### Task 1 — Permissions-Policy (commit f4c356f)
Added a new header entry to the `/(.*)` headers array in `vercel.json`:

```
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), gyroscope=(), accelerometer=(), magnetometer=()
```

Restricts 8 browser APIs to an empty allowlist. Defensive defaults for a static marketing site that doesn't use any of these capabilities. Logically placed between HSTS and CSP.

### Task 2 — CSP promotion (commit 678e0f3)
Renamed the `Content-Security-Policy-Report-Only` key to `Content-Security-Policy`. The directive value string is **byte-identical** to the prior Report-Only value — this is a policy-enforcement promotion, not a policy change.

**Risk accepted:** no `report-uri` was configured on the prior Report-Only policy, so no violation reports were being collected. User was briefed on the silent-break risk and explicitly authorized the promotion. The existing policy already allows Roofle, Cloudflare Insights, Supabase, and Google Fonts, so the blast radius should be small.

## Final security header stack on `/(.*)`

1. `X-Frame-Options: DENY`
2. `X-Content-Type-Options: nosniff`
3. `Referrer-Policy: strict-origin-when-cross-origin`
4. `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` *(added 260411-kct)*
5. `Permissions-Policy: camera=(), microphone=(), ...` *(this task)*
6. `Content-Security-Policy: default-src 'self'; script-src ...` *(enforcing as of this task)*

## Untouched

- 9 redirects (apex→www, legacy paths, gutter rename, maintenance rename)
- `cleanUrls: true`
- `trailingSlash: false`
- `rewrites` (/blog/:slug → /index.html)

## Verification

- JSON parse succeeded
- Assertion: all 6 expected headers present, old `Content-Security-Policy-Report-Only` key absent
- CSP value string confirmed byte-equal to pre-rename value
- `npm run build` passed (73 modules, 34 routes prerendered, 3.09s)

## Post-deploy follow-up

After Vercel deploys:
1. Test the live site in a browser (homepage + Roofle widget open + contact form submit) — any CSP violation will now **block** silently, so watch DevTools Console for `Refused to ...` errors
2. Optional: configure a `report-uri` endpoint later if you want ongoing CSP telemetry

## Out of scope

- LCP image preload (Week 2 audit item)
- Rich Results Test spot-check
- Blog post sitemap entries (Week 3)
