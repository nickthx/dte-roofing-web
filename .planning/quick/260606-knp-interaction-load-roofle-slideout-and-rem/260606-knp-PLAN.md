---
quick_id: 260606-knp
description: Interaction-load Roofle slideout and remove dead Supabase client to cut main-thread work blocking LCP
date: 2026-06-06
mode: quick (inline — gsd-* subagent types unavailable in this harness)
---

# Quick Task 260606-knp — Plan

## Background

Local Lighthouse (mobile, simulated) on production: score 49, LCP 6.8s, TBT 860ms, element render delay 2,869ms, Script Eval 1,031ms. The hero image arrives in <400ms (preload works); LCP is blocked by main-thread work from the Roofle slideout widget (197KB JS + 50KB gif, idle-injected on every page) and the dead Supabase client (35KB chunk; runtime queries fail and fall back to a docs.google.com gviz fetch on every page using useReviewData).

Scope notes:
- Requested item 3 (drifted "103" review counts) was verified ALREADY DONE: all copy/meta/schema read `src/data/review-stats.json` at build time (22 importers); live sweep of 14 prod pages shows no stale counts. No change.
- Do NOT touch the hero image pipeline.
- Do NOT push — report Lighthouse before/after comparison first.

Live widget appearance (captured via headless-Chrome DOM dump of production): left edge, `top: 50%`, tab rotated 270°, label "Instant Roof Quote", bg `#b80100`, white text. Widget API: `window.RoofQuotePro.open()/.toggle()/.close()`; renders `#quick-quote-button-wrapper`.

## Tasks

### Task 0 — Local Lighthouse baseline (current build)

Serve current `dist/` via `vite preview`; run Lighthouse mobile (same flags as production baseline). Record score/LCP/TBT/render-delay/script-eval for apples-to-apples comparison.

### Task 1 — Interaction-load Roofle slideout

**Files:** `src/components/RoofleSlideout.tsx`

Replace idle injection with a lightweight placeholder tab that mimics the live widget (left edge, vertically centered, rotated, "Instant Roof Quote", #b80100). Behavior:
- `pointerenter`/`focus` → inject `roof-quote-pro-widget.js` (warm-up, no open)
- `click` → inject if needed, poll for `window.RoofQuotePro.open` (≤10s), call it
- once `#quick-quote-button-wrapper` exists, remove placeholder (real tab takes over)
- never double-inject; respect prerender (placeholder is server-renderable markup)
`/get-a-quote-consultation` (InstantQuote) uses the separate embedded-widget script on mount — untouched.

**Verify:** built homepage HTML contains placeholder, no roofle script tag; clicking placeholder in preview loads widget and opens panel.

### Task 2 — Remove dead Supabase client

**Files:** `src/hooks/useReviewData.ts`, `src/lib/supabase.ts` (delete), `vite.config.ts`, `vercel.json`, `package.json`

- Rewrite `useReviewData` to return build-time `reviewStats` synchronously (same `{reviewData, loading, error}` shape — no consumer edits); drop supabase + gviz fetches.
- Delete `src/lib/supabase.ts` (BlogPost interface there is dead — blog uses `src/data/blogPosts.tsx`; verify no imports).
- Remove `manualChunks` supabase entry from `vite.config.ts`.
- `npm uninstall @supabase/supabase-js`.
- CSP connect-src: remove `https://ujasdbelviyamnwxjgth.supabase.co` and `https://docs.google.com` (gviz fallback gone).

**Verify:** build succeeds; no `supabase-*.js` in dist/assets; no supabase/docs.google strings in built JS; review counts still render 108.

### Task 3 — After-measurement + comparison

Rebuild, `vite preview`, same Lighthouse config. Report before/after: performance score, LCP, TBT, element render delay, Script Eval total.

## must_haves

- Homepage initial load makes zero requests to app.roofle.com and zero supabase/gviz code in bundle
- Slideout still reachable: placeholder → click → widget opens; embedded widget on /get-a-quote-consultation unchanged
- Review counts unchanged (108 from review-stats.json)
- Lighthouse before/after table reported; nothing pushed
