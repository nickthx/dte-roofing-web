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

## Post-push live verification (2026-06-06, commits 871e6e4 / adc1133 / afcb88a)

Three live iterations after the initial deploy:
1. **871e6e4** — placeholder moved to the RIGHT edge (Roofle's launcher anchors right when closed; the left-side reading came from the open-panel state) + poll no longer stops before `open()` is callable.
2. **adc1133** — retry `open()` until `isSlideOutWidgetOpened` confirms (single early call is swallowed during widget init; reproduced + confirmed via manual `open()` on production).
3. **afcb88a** — removed the ~5s retry cap; the slideout iframe cold-loads longer than that. Retries run the full 30s poll window.

**Final production verification:**
- `document.elementFromPoint()` inside the painted tab → returns the placeholder button (real hit-testing correct).
- Programmatic `.click()` on the placeholder (identical event path to a human click minus `isTrusted`, which nothing checks) → widget loads, panel auto-opens, `RoofQuotePro.isSlideOutWidgetOpened === true`. Screenshot-verified calculator with address input.
- Hover/warm-up path verified incidentally: extension pointer-moves loaded the widget without opening, placeholder swapped to Roofle's launcher cleanly.
- Chrome-extension synthetic clicks near the right viewport edge dispatch NO DOM mouse events (instrumented capture listeners proved this — coordinate mapping lands on the scrollbar strip). All "failed click" observations were this automation artifact, not a site bug.

## Addendum (4ab9c01): placeholder is now a pixel-faithful launcher clone

User feedback: the placeholder should be the same shape as the real launcher. Captured the live launcher's exact markup/CSS (injected the widget on production without clicking, dumped `#quick-quote-button` outerHTML + computed styles + the widget's injected CSS rules):
- 0-width anchor wrapper at content edge, `top: 50%`; button `transform: translate(-50%, -100%) rotate(270deg)`
- flex bar `height: 43px`, `#b80100`, `font: 500 22px/26px Rubik, sans-serif`, `padding: 0 1px`
- two 69x43 swoosh-cap SVGs absolutely positioned beyond each end (`right:1px translateX(100%)` / `left:1px translateX(calc(-100% + 1px))`); their inline `#EF7E45` fills are overridden to `#b80100` by widget CSS — clone uses `#b80100` directly
- classic-scrollbar gutter offset (`window.innerWidth - clientWidth`, set post-hydration) so `position:fixed` lands where the widget's in-document absolute positioning does

Verified on production: placeholder rect 43x187 at the content edge, zoomed screenshot identical to the real launcher; click → widget loads, placeholder swaps out, panel auto-opens (`isSlideOutWidgetOpened: true`). Local note: Roofle's script can stall on localhost (sets `RoofQuotePro={}` but never attaches `open` — domain whitelist); the placeholder correctly persists for retry in that case.
