---
quick_id: 260606-jiy
description: Add 301 redirects for indexed-404 old blog slugs and verify hero preload matches rendered image
date: 2026-06-06
commits:
  - 902a3f5 fix(seo)(260606-jiy-01): 301 old root-level blog slugs to /blog/ posts
status: complete
---

# Quick Task 260606-jiy — Summary

## What Shipped

**Task 1 — vercel.json 301 redirects (commit 902a3f5):**
Two entries added to the `redirects` array (placed before the host-based apex entry, matching existing `statusCode: 301` style):

| Old indexed URL (404) | New destination |
|---|---|
| `/best-asphalt-shingle-brands-on-the-market-today` | `/blog/asphalt-vs-metal-roofing-ohio` |
| `/my-claim-got-denied-or-partially-approved-what-should-i-do-next` | `/blog/hail-damage-roof-insurance-claim-ohio` |

Both old slugs come from the pre-migration site — confirmed as the complete set via the SEO audit docx in git history (commit 8d89245, `DTE_Roofing_SEO_Audit_REVISED.docx`: "Individual post URLs that appear in Google's index — for example /best-asphalt-shingle-brands... and /my-claim-got-denied..."). The repo itself never had root-level blog routes (initial-commit App.tsx and sitemap confirm blog was always under `/blog`). Both destinations are live posts in `src/data/posts/`.

**Task 2 — hero preload/render verification (no code change):**
The June 1 audit's preload(.webp)/render(.jpg) mismatch was already fixed by commit 3595481 (2026-06-06, serve hero via `<Picture>`). Verified in fresh `npm run build` output (`dist/index.html`):
- Head: `<link data-rh="true" rel="preload" as="image" href="/images/hero-roofing-professional.webp" type="image/webp" fetchpriority="high"/>`
- Hero: `<picture class="contents"><source type="image/webp" srcSet="/images/hero-roofing-professional.webp"/><img src="/images/hero-roofing-professional.jpg" ... loading="eager" ... fetchpriority="high"/>`
- WebP-capable browsers fetch the preloaded `.webp` via the `<source>`; the `.jpg` is fallback-only. Preload matches render.
- No other prerendered page emits an image preload (`Home.tsx` is the sole `preloadImage` consumer), so no other page can have this mismatch.

**Verification grep gotchas (for future audits):** the prerendered preload `<link>` has `data-rh="true"` before `rel="preload"`, and React's streaming SSR emits `srcSet` (capital S — valid, HTML attribute names are case-insensitive). Naive greps for `<link rel="preload"` or `srcset=` return false negatives.

## Post-deploy verification

- Redirect: `curl -sI https://www.dteroofingllc.com/best-asphalt-shingle-brands-on-the-market-today` → expect `HTTP/2 301` (or 308) with `location: /blog/asphalt-vs-metal-roofing-ohio`; same for the my-claim slug → `/blog/hail-damage-roof-insurance-claim-ohio`.
- Preload: view-source on `https://www.dteroofingllc.com/` → preload href `.webp` matches the `<picture>` WebP source.

## Files Changed

- `vercel.json` (+2 redirect entries)
