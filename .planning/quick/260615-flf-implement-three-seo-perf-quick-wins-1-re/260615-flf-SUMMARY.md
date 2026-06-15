---
phase: quick-260615-flf
plan: 01
subsystem: seo-performance
tags: [seo, performance, preconnect, sitemap, webp, images]
requires: []
provides:
  - "Head markup free of the dead fonts.googleapis.com preconnect"
  - "Fresh public/sitemap.xml lastmod values (git-derived)"
  - "scripts/reencode-webp.mjs — idempotent, network-free webp re-encoder"
  - "Every public/images/*.webp smaller than its .jpg sibling"
affects:
  - index.html
  - public/sitemap.xml
  - package.json
  - public/images/*.webp
tech-stack:
  added: []
  patterns:
    - "Re-encode webp from the jpg sibling at q60/effort6, overwrite only when smaller"
key-files:
  created:
    - scripts/reencode-webp.mjs
  modified:
    - index.html
    - public/sitemap.xml
    - package.json
    - public/images/*.webp (26 files)
decisions:
  - "Re-encode webp FROM the jpg (not from existing webp) at q60/effort6 to guarantee dimensions match the fallback and avoid generational quality loss"
  - "Overwrite a webp only when the fresh encode beats the jpg; leave the original otherwise — keeps the script safe and idempotent"
  - "Left 7 webp files untouched (already < jpg); 0 AVIF files touched"
metrics:
  duration: ~6min
  completed: 2026-06-15
  tasks: 3
  files: 29
---

# Quick Task 260615-flf: Three SEO/Performance Quick Wins Summary

Removed a wasted `fonts.googleapis.com` preconnect, regenerated the stale sitemap with current git-derived `lastmod` dates, and added an idempotent webp re-encoder that shrank 26 bloated WebP files (~2.29 MB saved) so every WebP is now smaller than its JPEG fallback.

## What Was Built

### Task 1 — Remove dead fonts.googleapis.com preconnect (`afed6bf`)
Deleted the `<link rel="preconnect" href="https://fonts.googleapis.com">` from `index.html`. The site loads zero web fonts (system font stack), so this opened a wasted DNS+TCP+TLS connection on every page load. Kept the in-use `app.roofle.com` preconnect.
- After: `grep -c "fonts.googleapis.com" index.html` → 0; `grep -c "app.roofle.com" index.html` → 1.

### Task 2 — Regenerate stale sitemap (`722960c`)
Ran `npm run generate-sitemap` (no script change). The committed sitemap was stale (2026-04/05 dates); routes were last committed 2026-06-06. The diff is purely `<lastmod>` lines — 40 routes bumped to `2026-06-06`, 1 to `2026-05-19`. No structural changes.
- The later `npm run build` re-ran generate-sitemap and produced a byte-identical sitemap → no delta to commit.

### Task 3 — Idempotent webp re-encoder + shrink bloated webp (`ef21681`)
Created `scripts/reencode-webp.mjs` (matching `optimize-images.mjs` conventions: ESM, `import sharp`, `failOn: 'none'`, before/after KB logging, 2-space indent). For each `public/images/*.jpg`:
1. No `.webp` sibling → skip.
2. `.webp` already smaller than `.jpg` → skip (idempotent re-run branch).
3. `.webp` >= `.jpg` → re-encode FROM the jpg at webp quality 60 / effort 6, preserving the jpg's intrinsic dimensions (no resize/enlarge), overwriting **only** if the new encode beats the jpg.

Added the `reencode-webp` npm script and ran it once.
- **Result:** 26 re-encoded, 7 already smaller, 0 with no sibling, 0 left-larger.
- **WebP byte savings:** 8066.9 KB → 5722.1 KB across the 26 re-encoded files = **~2344.8 KB (~2.29 MB) saved**.
- No `.avif` files touched (every flagged avif was already smaller than its jpg).

## Verification

- `npm run build` → **exit 0** (repo verification gate: generate-sitemap + vite build + ssr build + prerender of all 41 routes incl. `dist/404.html`).
- `grep -c "fonts.googleapis.com" index.html` → 0; `grep -c "app.roofle.com" index.html` → 1.
- `public/sitemap.xml` → 40× `<lastmod>2026-06-06</lastmod>`, 1× `2026-05-19`; no stale 04/05 dates.
- Every `public/images/*.jpg` with a `.webp` sibling: webp < jpg (script "all webp < jpg" check passed).
- All 33 webp/jpg pairs readable by sharp with **identical width/height** (0 dimension mismatches).
- Second `node scripts/reencode-webp.mjs` run: `re-encoded: 0, already-smaller: 33`; aggregate webp checksum identical before/after → **idempotent**.
- No `git push` performed.
- `typecheck`/`lint` are PRE-EXISTING RED per project memory — not run as a gate, not a regression.

## Deviations from Plan

None — plan executed exactly as written. The build's `generate-sitemap` rewrote `public/sitemap.xml` to a byte-identical file (consistent with Task 2), so no extra commit was needed.

## Commits

| Task | Commit | Message |
| ---- | ------ | ------- |
| 1 | `afed6bf` | perf(quick-260615-flf): remove dead fonts.googleapis.com preconnect |
| 2 | `722960c` | chore(quick-260615-flf): regenerate sitemap lastmod from git dates |
| 3 | `ef21681` | perf(quick-260615-flf): re-encode bloated webp images below jpg size |

## Self-Check: PASSED

- scripts/reencode-webp.mjs → FOUND
- Commits afed6bf, 722960c, ef21681 → FOUND on main
- index.html: fonts.googleapis.com=0, app.roofle.com=1 → CONFIRMED
- public/sitemap.xml fresh lastmod → CONFIRMED
- All webp < jpg, dimensions match, idempotent → CONFIRMED
- npm run build exit 0 → CONFIRMED
