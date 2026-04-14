---
quick_id: 260413-tz5
description: Remove dead /blog/:slug rewrite from vercel.json; close two audit findings
date: 2026-04-13
commits:
  - d3a1025 chore(260413-tz5-01): remove dead /blog/:slug rewrite from vercel.json
  - cde9d55 docs(260413-tz5-02): close blog rewrite and 308-vs-301 items in SEO audit
status: complete
---

# Quick Task 260413-tz5 — Summary

## What Shipped

- **`vercel.json`:** `rewrites` key removed entirely. Previously declared `{ "source": "/blog/:slug", "destination": "/index.html" }` — broken (404s) and obsolete since `scripts/prerender.mjs:22` skips dynamic routes and `blog-posts.json` is empty.
- **SEO audit memory:** two findings moved from "Remaining Issues" to new "Closed Items" section with dispositions.

## Audit Item Dispositions

| Item | Disposition |
|------|-------------|
| `/blog/:slug` 404 | ✅ Resolved — rewrite removed |
| Naked→www sends 308 instead of 301 | ✅ Accepted — working as intended |

**308 rationale:** Vercel platform-level apex→primary redirect takes precedence over `vercel.json` redirects. Google treats 301/308 identically for SEO. 308 is more semantically correct (preserves HTTP method). Not worth the operational risk of removing the apex domain to force 301.

## Future Note

When blog activates: extend `scripts/prerender.mjs` to generate per-slug static HTML files from `public/data/blog-posts.json`. Do NOT reintroduce the SPA fallback rewrite — the prerender pipeline is the intended render path.

## Files Changed

- `vercel.json` (-3 lines, `rewrites` key removed)
- `memory/audits/technical-seo-checker/2026-04-13-dteroofingllc-technical-seo.md` (+17/-6, Closed Items section added)
