---
quick_id: 260606-jv8
description: Right-size DTE logo (232px nav/footer + 500px -large for Home founders) and verify content images serve WebP
date: 2026-06-06
commits:
  - 942bce6 perf(images)(260606-jv8-01): right-size logo to 232px; add -large variant for Home founders section
status: complete
---

# Quick Task 260606-jv8 — Summary

## What Shipped

**Task 1 — Logo right-sizing (commit 942bce6):**

| File | Before | After |
|---|---|---|
| `DTE-Roofing-Logo-two-Men.png` | 500x277, 19.7KB | 231x128, 9.2KB |
| `DTE-Roofing-Logo-two-Men.webp` | 500x277, 18.2KB | 231x128, 8.5KB |
| `DTE-Roofing-Logo-two-Men-large.png` | — | 500x277, 19.3KB (new) |
| `DTE-Roofing-Logo-two-Men-large.webp` | — | 500x277, 17.8KB (new) |

- Audit asked for a flat resize to ~232x128, but `Home.tsx:104` (founders section) renders the same file at `w-full` in a `md:grid-cols-2` column (~600px on desktop) — a flat resize would have made it blurry. User chose **two variants**: base shrunk for nav (h-16, the 232x128 @2x driver), footer (h-12), and JSON-LD schema logo (232px ≥ Google's 112px min); Home founders section repointed to the new `-large`.
- `scripts/optimize-images.mjs` logo jobs now read from the `-large` source for both outputs (maxWidth 500 and 232), so re-runs never upscale the shrunken base. Known wrinkle: a re-run regenerates base `.webp` as lossless-from-unquantized (~15KB) vs the committed lossless-from-palette-PNG (8.5KB) — correct but larger; re-encode from the PNG if it matters.
- WebP encoding note: lossless WebP of the *unquantized* 232px resize (15.3KB) was larger than the palette PNG (9.2KB); encoding lossless WebP **from the quantized PNG** got 8.5KB, pixel-identical to the fallback.

**Task 2 — Content-image WebP verification (no code change):**

The audit's "convert content images to WebP with srcset" was **already shipped** before this task: zero raw `<img>` tags exist in `src/` (everything renders via `Picture.tsx` → `<source type="image/webp" srcset>` + raster fallback) and every content JPG in `public/images/` has a `.webp` sibling (most also `.avif`). Verified in fresh build output (counts via `grep -o | wc -l` — prerendered HTML is one line, so `grep -c` lies):

| Page | `<source type="image/webp">` | raster `<img>` fallbacks |
|---|---|---|
| `dist/index.html` | 16 | 13 jpg + logos |
| `dist/about/index.html` | 11 | 9 |
| `dist/gallery/index.html` | 28 | 26 |

Homepage logo pictures: 2× base (nav, footer) + 1× `-large` (founders) — as designed. Remaining raw `.jpg`/`.png` refs in src are og:image / JSON-LD metadata, intentionally raster for scraper compatibility.

## Files Changed

- `public/images/DTE-Roofing-Logo-two-Men.{png,webp}` (resized to 231x128)
- `public/images/DTE-Roofing-Logo-two-Men-large.{png,webp}` (new, 500x277)
- `src/pages/Home.tsx` (founders Picture src → `-large`)
- `scripts/optimize-images.mjs` (logo jobs read from `-large`; sizes documented)
