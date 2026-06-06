---
quick_id: 260606-m9k
description: Add branded prerendered 404 page served by Vercel with 404 status
date: 2026-06-06
commits:
  - 64efae7 feat(seo)(260606-m9k-01): branded prerendered 404 page
status: complete
---

# Quick Task 260606-m9k — Summary

## What Shipped

Closes audit finding #2 (2026-06-06 technical SEO audit): unmatched paths previously got Vercel's plain-text `NOT_FOUND` body.

- **`src/pages/NotFound.tsx`** (new): design-matched 404 — charcoal-900 hero ("This Page Has Blown Off the Roof"), Back to Home + phone CTAs, Popular Pages grid (services / locations / blog / contact). Renders inside the App layout, so nav + footer + Roofle tab come along.
- **`src/App.tsx`**: lazy `NotFound` + `<Route path="*">` — client-side coverage for bad internal links too.
- **`src/components/SEO.tsx`**: new optional `noindex` prop → `<meta name="robots" content="noindex, nofollow">`.
- **`src/routes.config.mjs`**: `NOT_FOUND_ROUTE` exported SEPARATELY from `ROUTES` (the sitemap maps all of ROUTES; a 404 page must never be listed).
- **`scripts/prerender.mjs`**: loop body refactored into `buildPage()`/`writePage()`; after the main loop it renders `/404` through the catch-all and writes root-level `dist/404.html` — the file Vercel serves with a 404 status for any unmatched path. `stripRobots` option removes the template's static `index, follow` so the page carries a single `noindex` signal.

## Verified

- Build: `dist/404.html` present (24.5KB), branded markup, single robots meta (noindex), internal links to /services /locations /blog /contact; sitemap still 41 URLs with no /404.
- Production (post-deploy `64efae7`): `/this-page-does-not-exist-xyz` → HTTP **404** + branded page; `/blog/nonexistent-post-abc` → 404; real pages (home, service, blog post) still 200.
- Visual: screenshot of prerendered page matches site design.

## Files Changed

- `src/pages/NotFound.tsx` (new), `src/App.tsx`, `src/components/SEO.tsx`, `src/routes.config.mjs`, `scripts/prerender.mjs`
