---
quick_id: 260606-jiy
description: Add 301 redirects for indexed-404 old blog slugs and verify hero preload matches rendered image
date: 2026-06-06
mode: quick (inline — gsd-* subagent types unavailable in this harness)
---

# Quick Task 260606-jiy — Plan

## Background

1. **Indexed 404s:** Google still indexes two root-level blog URLs from the pre-migration site that 404 on dteroofingllc.com. Confirmed complete set via SEO audit docx in git history (commit 8d89245); the repo never had root-level blog routes.
2. **Hero preload:** The June 1 audit flagged a preload(.webp)/render(.jpg) mismatch on the homepage hero. Commit 3595481 (2026-06-06) already fixed this by rendering the hero through `<Picture>` (WebP `<source>` + JPG fallback, eager + fetchpriority=high) while `SEO.tsx` preloads the .webp. Remaining work is build-output verification only.

## Tasks

### Task 1 — Add two 301 redirects to vercel.json

**Files:** `vercel.json`

**Action:** Insert two entries into the `redirects` array, after the existing path redirects and BEFORE the host-based apex entry, matching existing style (`"statusCode": 301`):
- `/best-asphalt-shingle-brands-on-the-market-today` → `/blog/asphalt-vs-metal-roofing-ohio`
- `/my-claim-got-denied-or-partially-approved-what-should-i-do-next` → `/blog/hail-damage-roof-insurance-claim-ohio`

**Verify:** `vercel.json` parses as valid JSON; redirects array has 11 entries; both destinations correspond to existing posts (`src/data/posts/asphalt-vs-metal-roofing-ohio.tsx`, `src/data/posts/hail-damage-roof-insurance-claim-ohio.tsx`).

**Done:** Both old slugs 301 to live blog posts on next deploy.

### Task 2 — Verify hero preload/render match in built HTML

**Files:** none (verification only)

**Action:** Run `npm run build` (the project's verification gate; typecheck/lint are pre-existing red). Grep `dist/index.html` for:
1. `<link rel="preload" as="image" href="/images/hero-roofing-professional.webp" type="image/webp"` with fetchpriority
2. `<source type="image/webp" srcset="/images/hero-roofing-professional.webp"` inside the hero `<picture>`
3. `<img src="/images/hero-roofing-professional.jpg"` with `loading="eager"` and `fetchpriority="high"`

Also confirm no other prerendered page emits an image preload (only Home.tsx passes `preloadImage`).

**Verify:** All three elements present in `dist/index.html`; no preload links in other dist pages.

**Done:** Preload URL matches the resource the browser actually fetches (WebP) — no code change expected; escalate if verification fails.

## must_haves

- vercel.json contains 301s for both old blog slugs pointing at existing /blog/ posts
- Build succeeds; prerendered homepage head preload matches the hero picture's WebP source
- No content/URL/NAP changes; no new dependencies
