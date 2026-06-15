---
phase: quick-260615-flf
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - index.html
  - public/sitemap.xml
  - scripts/reencode-webp.mjs
  - public/images/*.webp
autonomous: true
requirements: [QW-01, QW-02, QW-03]

must_haves:
  truths:
    - "No page opens a wasted connection to fonts.googleapis.com (the site loads zero web fonts)"
    - "public/sitemap.xml shows current lastmod dates matching the latest commit of each route's source"
    - "Every public/images/*.webp is smaller than its .jpg sibling, with unchanged intrinsic dimensions"
  artifacts:
    - path: "index.html"
      provides: "Head markup without the dead fonts.googleapis.com preconnect"
      contains: "https://app.roofle.com"
    - path: "scripts/reencode-webp.mjs"
      provides: "Idempotent, safe webp re-encoder driven from the jpg siblings"
      min_lines: 30
    - path: "public/sitemap.xml"
      provides: "Regenerated sitemap with fresh lastmod values"
      contains: "<lastmod>"
  key_links:
    - from: "scripts/reencode-webp.mjs"
      to: "public/images/*.jpg"
      via: "sharp re-encode at webp quality ~60"
      pattern: "sharp\\("
---

<objective>
Implement three independent SEO/performance quick wins for dteroofingllc.com (Vite + React + react-helmet prerendered SPA):

1. Remove the dead `fonts.googleapis.com` preconnect (the site loads zero web fonts).
2. Regenerate the stale `public/sitemap.xml` so `<lastmod>` dates are current.
3. Add an idempotent script that re-encodes the bloated `.webp` images so each is smaller than its `.jpg` sibling.

Purpose: Eliminate a wasted connection on every page load, give crawlers accurate freshness signals, and stop serving WebP files that are larger than their JPEG fallbacks.

Output: Edited `index.html`, regenerated `public/sitemap.xml`, new `scripts/reencode-webp.mjs`, and shrunk `public/images/*.webp` files.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@./CLAUDE.md

# Task 1 target — the dead preconnect is line 21; KEEP line 22 (roofle, in use)
@index.html

# Task 2 — already auto-generates <lastmod> from `git log -1 --format=%cI`; DO NOT rewrite it
@scripts/generate-sitemap.mjs

# Task 3 — REFERENCE ONLY for style/conventions. Do NOT run it (re-fetches gallery
# photos from Google, skips cleaned-up sources — wrong tool for this fix).
@scripts/optimize-images.mjs

# How images are served: <picture> emits avif source, then webp source, then jpg <img> fallback
@src/components/Picture.tsx
</context>

<constraints>
- Verification gate for this repo is `npm run build` (runs generate-sitemap, vite build, ssr build, prerender).
- `npm run typecheck` and `npm run lint` are PRE-EXISTING RED — do NOT treat their failures as regressions. Rely on `npm run build` succeeding.
- Do NOT modify approved page content, URLs, slugs, or NAP. These tasks touch only head markup, the generated sitemap, and image binaries — no content.
- Do NOT push to any remote. Push to main = live production deploy. Commit locally only.
- AVIF files must NOT be touched — in every flagged case the .avif is already smaller than the jpg. Only WebP is bloated.
- New script: under 500 lines, 2-space indent, ESM, match optimize-images.mjs conventions (sharp import, `failOn: 'none'`, before/after KB logging). sharp ^0.34.5 is already a devDependency.
</constraints>

<tasks>

<task type="auto">
  <name>Task 1: Remove the dead fonts.googleapis.com preconnect</name>
  <files>index.html</files>
  <action>
    Delete ONLY the `<link rel="preconnect" href="https://fonts.googleapis.com">` line (currently line 21). The site loads zero web fonts (system font stack in tailwind.config.js, no @font-face / @import / font URLs anywhere), so this preconnect opens a wasted DNS+TCP+TLS connection on every page load. KEEP the adjacent `<link rel="preconnect" href="https://app.roofle.com">` line — the Roofle widget is loaded from that origin and the preconnect is real. Leave the surrounding "Preconnect to improve performance" comment in place (it still applies to the roofle line).
  </action>
  <verify>
    <automated>grep -c "fonts.googleapis.com" index.html  # expect 0</automated>
    Also confirm `grep -c "app.roofle.com" index.html` is still 1.
  </verify>
  <done>index.html contains no reference to fonts.googleapis.com; the app.roofle.com preconnect remains.</done>
</task>

<task type="auto">
  <name>Task 2: Regenerate the stale sitemap</name>
  <files>public/sitemap.xml</files>
  <action>
    Run `npm run generate-sitemap`. The script (scripts/generate-sitemap.mjs) already derives each route's `<lastmod>` from `git log -1 --format=%cI` (fallback: fs mtime, then today) — do NOT edit the script. The committed sitemap is stale: route source files were last committed 2026-06-06 but the sitemap still shows 2026-04/05 dates. Re-running regenerates `public/sitemap.xml` with current dates. Commit the regenerated `public/sitemap.xml` in this task's commit.
  </action>
  <verify>
    <automated>npm run generate-sitemap</automated>
    After regeneration, confirm `public/sitemap.xml` contains `<lastmod>2026-06-` entries (route sources were last committed 2026-06-06) — i.e. no longer stuck at 2026-04/05. `git status public/sitemap.xml` should show it as modified.
  </verify>
  <done>public/sitemap.xml regenerated with fresh lastmod values reflecting the latest commits, staged for commit.</done>
</task>

<task type="auto">
  <name>Task 3: Add idempotent webp re-encoder and shrink the bloated webp files</name>
  <files>scripts/reencode-webp.mjs, public/images/*.webp</files>
  <action>
    Create `scripts/reencode-webp.mjs` as a sibling to optimize-images.mjs, matching that file's style (ESM, `import sharp from 'sharp'`, node:fs / node:path / node:url with fileURLToPath, 2-space indent, before/after KB console logging). Root cause of the bloat: optimize-images.mjs encoded these photos at webp quality 74, too high for them — 28 of 33 jpgs have a `.webp` sibling that is >= the `.jpg` size.

    Script behavior — for each `public/images/*.jpg`:
      1. If no sibling `.webp` exists, skip (nothing to fix).
      2. If the sibling `.webp` is already SMALLER than the `.jpg`, leave it untouched and log it as skipped.
      3. Otherwise (webp >= jpg), re-encode the webp FROM THE JPG using sharp at webp quality ~60, effort 6. Preserve the jpg's intrinsic dimensions — read the jpg, do NOT resize or enlarge (no `.resize(...)` widening; the output must match the jpg's width/height).
      4. Only overwrite the existing `.webp` when the freshly-encoded webp is SMALLER than the jpg. If the new encode is still >= the jpg (rare), leave the existing file untouched and log it so it is visible.

    Print a before/after KB table per image and a summary of how many were re-encoded vs skipped. The script must be idempotent and safe to re-run: on a second run every webp is already smaller than its jpg, so all images fall into the "skip" branch and nothing changes. Do NOT touch `.avif` files (every flagged .avif is already smaller than the jpg). Do NOT re-fetch anything from the network — operate purely on local files.

    Add a `"reencode-webp": "node scripts/reencode-webp.mjs"` entry to package.json scripts (alongside the existing `optimize-images` entry), then run it once to shrink the bloated files.
  </action>
  <verify>
    <automated>node scripts/reencode-webp.mjs && node -e "const fs=require('fs');const p=require('path');const dir='public/images';let bad=0;for(const f of fs.readdirSync(dir)){if(!f.endsWith('.jpg'))continue;const w=p.join(dir,f.replace(/\.jpg$/,'.webp'));if(!fs.existsSync(w))continue;const js=fs.statSync(p.join(dir,f)).size,ws=fs.statSync(w).size;if(ws>=js){console.error('LARGER webp:',f,ws,'>=',js);bad++;}}if(bad){process.exit(1)}else{console.log('all webp < jpg')}"</automated>
    Then validate each output is a readable image with unchanged dimensions vs the jpg: for each `public/images/*.jpg` with a `.webp` sibling, `sharp(webp).metadata()` must succeed and its width/height must equal `sharp(jpg).metadata()`'s width/height. Re-running `node scripts/reencode-webp.mjs` a second time must report every image skipped (no overwrites) — proves idempotency.
  </verify>
  <done>scripts/reencode-webp.mjs exists, is idempotent, and after running it every public/images/*.webp is a valid image smaller than its .jpg sibling with identical intrinsic dimensions; no .avif files changed; package.json has a reencode-webp script.</done>
</task>

</tasks>

<verification>
- `npm run build` succeeds (this is the repo's verification gate; it runs generate-sitemap, vite build, ssr build, and prerender). typecheck/lint are pre-existing red and are NOT regressions.
- `grep -c "fonts.googleapis.com" index.html` returns 0; `grep -c "app.roofle.com" index.html` returns 1.
- `public/sitemap.xml` shows fresh `<lastmod>` dates (2026-06-*).
- Every `public/images/*.webp` is smaller than its `.jpg` sibling, intrinsic dimensions unchanged, each readable by sharp. No `.avif` files modified.
- Re-running `node scripts/reencode-webp.mjs` changes nothing (idempotent).
- No `git push` performed.
</verification>

<success_criteria>
- Dead fonts.googleapis.com preconnect removed; roofle preconnect intact.
- Sitemap regenerated with current lastmod values and staged.
- New idempotent reencode-webp.mjs shrinks every bloated webp below its jpg sibling without altering dimensions or touching avif.
- `npm run build` passes.
</success_criteria>

<output>
Create `.planning/quick/260615-flf-implement-three-seo-perf-quick-wins-1-re/260615-flf-SUMMARY.md` when done.
</output>
