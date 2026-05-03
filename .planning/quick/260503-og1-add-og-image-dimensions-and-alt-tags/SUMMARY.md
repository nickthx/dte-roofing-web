---
slug: og1-add-og-image-dimensions-and-alt-tags
date: 2026-05-03
status: complete
---

# Summary — og:image dimension + alt meta tags

## What changed
- `src/components/SEO.tsx`: added 5 meta tags to Helmet output
  (`og:image:width`, `og:image:height`, `og:image:type`, `og:image:alt`,
  `twitter:image:alt`), new optional `ogImageAlt` prop with default
  `"DTE Roofing — professional roofing services in Central Ohio"`.
- `index.html`: added matching tags in the static shell so social
  scrapers that hit raw HTML before prerender see the same metadata.

## Diff stat
```
 index.html             | 5 +++++
 src/components/SEO.tsx | 9 +++++++++
 2 files changed, 14 insertions(+)
```

## Verification
- `npm run build` — succeeded, all 34 routes prerendered.
- Confirmed all 5 new tag types present in 34/34 prerendered routes
  (each tag appears 2× per page: once from static shell, once from
  Helmet — same pattern as existing `og:image`/`twitter:image`).
- TypeScript: no new errors in `SEO.tsx`. Pre-existing typecheck
  warnings in unrelated files (`ServiceAreaMap.tsx`, `entry-server.tsx`,
  unused-import diagnostics) are unchanged.

## Out of scope (separate task)
- Replacing the placeholder `public/images/hero-roofing-professional.jpg`
  (currently a 68-byte text file). The OG dimensions are pre-declared
  to match the planned 1200×630 replacement.

## Why dimensions chosen
Facebook recommends 1200×630 (1.91:1) for `summary_large_image`
Twitter cards and Open Graph link previews. These match the planned
hero image replacement.
