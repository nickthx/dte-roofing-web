---
quick_id: 260615-g1y
status: complete
date: 2026-06-15
commits:
  - 0d2d5e1  # Task 1: variant generator + manifest
  - e6eb836  # Task 2: Picture + SEO responsive support
  - 89db986  # Task 3: wire sizes at call sites
  - a9717c1  # sitemap lastmod refresh for the changed routes
---

# Quick Task 260615-g1y — Responsive srcset/sizes for large images

## Outcome

Added responsive `srcset`/`sizes` to the LCP hero and the large on-page photographic
images (homepage WorkCarousel, Gallery grid, About job-site grid). Mobile now fetches a
width-appropriate variant instead of one fixed-resolution file. Headshots and logos were
left untouched (already small). `npm run build` clean (41 routes prerendered).

## What shipped

**Task 1 — `0d2d5e1`** — `scripts/generate-responsive-variants.mjs` (sharp, ESM,
network-free, idempotent) + generated typed manifest `src/data/imageVariants.ts` +
`generate-responsive-variants` npm script.
- 30 base images (hero + 29 project photos), **178 variant files** (`slug-<w>.{avif,webp,jpg}`).
- Reads back `sharp` `info.width` as the descriptor — never trusts the requested ladder
  rung — so clamped portraits don't produce width-lies. Verified: every variant's real
  width == its descriptor and `< intrinsicWidth`; the 500px-wide `dte-roofing-job-site-columbus`
  correctly gets only `[400]`; the 1599px landscape gets `[400,800,1200]`; hero `[400,800]`.

**Task 2 — `e6eb836`** — responsive component layer.
- `Picture.tsx`: optional `sizes` prop. With `sizes` + a manifest entry it emits per-format
  `<source srcSet sizes>` (avif/webp) plus a responsive `<img srcSet sizes>` jpg fallback.
  With no `sizes` it renders the **identical** single-source markup as before (backward compatible).
- `SEO.tsx`: hero preload became responsive via **lowercase `imagesrcset`/`imagesizes`**
  spread (the same Helmet-safe pattern the existing `fetchpriority` uses — avoided the
  react-helmet-async camelCase-drop risk entirely). `href` falls back to a mid (800w) variant.

**Task 3 — `89db986`** — layout-derived `sizes` at in-scope call sites:
- Hero (`Home.tsx`): `sizes="100vw"` + `preloadImageSizes="100vw"` on `<SEO>`.
- WorkCarousel: `sizes="(min-width: 896px) 896px, 100vw"` (verified `max-w-4xl` container).
- Gallery grid: `sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"`.
- About job-site grid (6 photos): `sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"`.
- Untouched: 3 About headshots, all logos, the gallery lightbox (`object-contain` full-res view).

**`a9717c1`** — regenerated `public/sitemap.xml`; `/`, `/about`, `/gallery` lastmod
2026-06-06 → 2026-06-15 (their sources changed today).

## Verification (all passed)

- `npm run build` exit 0 — 41 routes + `dist/404.html` prerendered.
- **LCP-critical**: hero `<head>` preload `imagesrcset="…-400.webp 400w, …-800.webp 800w, …hero….webp 1200w" imagesizes="100vw"` EXACTLY matches the hero `<source srcSet … sizes="100vw">` — no double-download, LCP protected.
- Gallery + About grids emit per-format responsive `<source srcSet sizes>`.
- Headshots have NO `-<w>` variants (byte-identical to before).
- All 277 `/images/...` URLs referenced across home/gallery/about resolve to real files (no 404s).
- Variant generator is idempotent (second run leaves manifest byte-identical).

## Notes / deviations

- **Executor crash recovery**: the gsd-executor completed Task 1's generation but hit a
  transient `API Error: Overloaded` before committing or starting Tasks 2–3. The orchestrator
  verified Task 1's output (178 files, no upscales/width-lies, idempotent), then committed
  Task 1 and finished Tasks 2–3 directly. End state matches the plan exactly.
- The hero `<source>` renders `srcSet` (capital S) in the prerendered HTML — the known
  react-dom SSR quirk (see project memory `verifying-prerendered-html-grep-pitfalls`);
  browsers parse attribute names case-insensitively, so selection works correctly.
- NOT pushed — pending user review (push to main = live deploy).

## Follow-ups (out of scope)

- Field CWV confirmation still needs a keyed PageSpeed Insights / Search Console pull
  (PSI keyless API is quota-0). Expect mobile LCP/data improvement from the hero + lazy grids.
