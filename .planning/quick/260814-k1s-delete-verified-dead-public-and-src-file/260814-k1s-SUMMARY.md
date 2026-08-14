---
id: 260814-k1s
description: Delete verified-dead public and src files
date: 2026-08-14
status: complete
commit: fc7dffa
---

# Quick Task 260814-k1s — Summary

Deleted nine paths (11 files) confirmed unreferenced by shipping code, built
output, `index.html`, `site.webmanifest`, and `vercel.json`. No behavior change.

## Deleted

**`public/` — these were being served in production:**

- `favicon-preview.html` — dev-only preview page, publicly reachable at
  `/favicon-preview.html`
- `favicon-16x16.svg`, `favicon-32x32.svg` — referenced only by
  `favicon-preview.html`, which went with them
- `browserconfig.xml` — `index.html` has no `msapplication-config` meta, so
  nothing ever requested it
- `data/blog-posts.json` — contained literally `[]`; Supabase-era leftover,
  superseded by `src/data/blogPosts.tsx`
- `roofle-embed.html` — standalone Roofle iframe page, never linked. The live
  widget loads through `RoofleSlideout.tsx` + the CDN script in `index.html`.

**`src/` and root:**

- `components/seo/SeoSchema.tsx` — zero imports; `SEO.tsx` and
  `SchemaMarkup.tsx` emit all schema
- `routes.config.ts` — TypeScript re-export wrapper. Every consumer
  (`prerender.mjs`, `generate-sitemap.mjs`, `verify-phase-05.mjs`) imports
  `routes.config.mjs` directly.
- `dead-code/` — `GutterServices.tsx`, `RoofMaintenance.tsx`, `README.md`.
  Quarantined 2026-05-03, outside `tsconfig.app.json`'s `include: ["src"]`.
  The `/services/gutter-services` and `/services/roof-maintenance` 301s live in
  `vercel.json` and are untouched.

`public/data/` was left empty by the deletion and removed.

## Retained deliberately

`favicon.svg` and `apple-touch-icon.svg` (both referenced by
`site.webmanifest`), `dte_favicon.png` (referenced by `index.html`), and both
`google*.html` GSC ownership tokens.

## Verification

- `npm run build` exits 0
- 41 routes prerendered — matches the documented route count, no loss
- `dist/` grepped for all six deleted `public/` basenames plus `SeoSchema`:
  zero hits
- `dist/index.html` `<head>` confirmed still emitting the icon, apple-touch-icon,
  and manifest links
- `dist/favicon.svg`, `dist/apple-touch-icon.svg`, `dist/dte_favicon.png`,
  `dist/site.webmanifest`, `dist/sitemap.xml`, `dist/robots.txt`, and both
  `dist/google*.html` all present

## Not pushed

Committed to `main` locally only. Pushing to `main` triggers a live production
deploy on the `dte-roofing-demo` Vercel project.

## Deferred

- `public/dte_favicon.png` is 344 KB and loaded on every page as both favicon
  and apple-touch-icon. It is referenced, so it was out of scope here — but
  replacing it with the existing 803-byte `favicon.svg` is the obvious follow-up.
- Root clutter (`repo-context.txt`, two `.docx` audits, `.bolt/`, `memory/`,
  the one-off `scripts/verify-phase-02|03|04.sh`) — identified, not yet removed.
