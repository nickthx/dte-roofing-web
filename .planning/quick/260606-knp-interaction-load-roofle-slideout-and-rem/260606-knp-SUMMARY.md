---
quick_id: 260606-knp
description: Interaction-load Roofle slideout and remove dead Supabase client to cut main-thread work blocking LCP
date: 2026-06-06
commits:
  - bad18f3 perf(roofle)(260606-knp-01): load slideout widget on interaction, not at idle
  - 09d1f99 refactor(reviews)(260606-knp-02): remove dead Supabase client; counts are build-time JSON
status: complete (NOT pushed — awaiting user review of Lighthouse comparison)
---

# Quick Task 260606-knp — Summary

## What Shipped

**1. Roofle slideout → interaction-loaded (bad18f3).** `RoofleSlideout.tsx` no longer injects the 197KB widget at idle on every page. It renders a zero-JS placeholder tab (left edge, top 50%, rotated 270°, "Instant Roof Quote", #b80100 — replicated from a headless-Chrome DOM dump of the live widget). First hover/focus warm-loads the script; click loads + auto-opens via `window.RoofQuotePro.open()` (discovered in the widget bundle); placeholder unmounts when `#quick-quote-button-wrapper` renders; 15s poll timeout re-arms the placeholder for retry. Embedded variant on `/get-a-quote-consultation` (`roof-quote-pro-embedded-widget.js`, InstantQuote.tsx) untouched.

**2. Supabase removed (09d1f99).** `useReviewData` returned runtime-fetched counts via a failing Supabase query + docs.google.com gviz fallback; now returns static `review-stats.json` synchronously (same `{reviewData, loading, error}` shape — zero consumer changes across 20+ files). Deleted `src/lib/supabase.ts` (hardcoded URL/anon key + dead BlogPost interface), uninstalled `@supabase/supabase-js`, removed the `supabase` manualChunks entry and the supabase/docs.google.com CSP `connect-src` entries in vercel.json.

**3. Review-count drift — verified non-issue, no change.** The requested "103 vs 108" fix was already shipped: all copy/meta/schema read `review-stats.json` at build time (22 importers); live sweep of 14 prod pages found zero stale counts (92/95/102/103/105). The n8n weekly commit keeps everything in sync.

## Verification

- Build clean. `dist/assets/` has no supabase chunk; no `ujasdbelviyamnwxjgth`/gviz strings in any bundle; homepage HTML has no roofle script tag; placeholder prerendered; counts render 108.
- Browser test (local preview, Chrome): click placeholder → widget loads → panel auto-opens ("What Will My Roof Cost?"). Embedded page: script injected, `#roof-quote-pro-embedded-frame` iframe created (content blank on localhost only — Roofle domain whitelist; production unaffected, verified working with identical code).

## Lighthouse (mobile, simulated throttling, local `vite preview`, apples-to-apples)

| Metric | Before | After |
|---|---|---|
| Performance score | 60 | **80** |
| LCP | 6.9s | **4.7s** |
| FCP | 2.5s | 2.1s |
| TBT | 450ms | **30ms** |
| Script Evaluation (main thread) | 1,250ms | **425ms** |
| Style & Layout (main thread) | 1,553ms | **766ms** |
| elementRenderDelay (observed-trace ms) | 1,939 | 1,761 |
| Roofle third-party transfer | 657KB | **0** |

Production baseline for reference (same LH config, vs live CDN): score 49 / LCP 6.8s / TBT 860ms.

## Remaining LCP drag (out of scope)

Render delay still dominates LCP: render-blocking CSS (~176ms), font loading, and hydration Style & Layout (~766ms). Candidates: critical-CSS inlining, font-display tuning, deferring below-fold hydration.

## Files Changed

- `src/components/RoofleSlideout.tsx` (rewritten — interaction-load placeholder)
- `src/hooks/useReviewData.ts` (static build-time stats)
- `src/lib/supabase.ts` (deleted)
- `vite.config.ts` (drop supabase manualChunks)
- `vercel.json` (CSP connect-src cleanup)
- `package.json` / `package-lock.json` (uninstall @supabase/supabase-js)
