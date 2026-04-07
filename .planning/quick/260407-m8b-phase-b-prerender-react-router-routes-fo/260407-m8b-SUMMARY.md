---
phase: 260407-m8b
plan: phase-b-prerender
status: T1+T2 complete, awaiting T3 human verification
completed: 2026-04-07
tasks_completed: 2
tasks_total: 3
---

# Phase B: Prerender React Router Routes — Summary

**One-liner:** Full SSG prerender pipeline using `renderToString` + `StaticRouter` + `react-helmet-async@2.0.5`, emitting 35 crawler-ready HTML files with baked-in title, canonical, OG tags, and JSON-LD.

## Tasks Completed

| # | Task | Commit |
|---|------|--------|
| 1 | Install helmet, create routes SSOT, refactor SEO/Schema/useReviewData | `767d241` |
| 2 | entry-server, main.tsx hydration, prerender.mjs, build pipeline, vercel redirects | `f144e2e` |
| 3 | Human verification (checkpoint) | **PENDING** |

## Files Modified / Created

**Created:**
- `src/routes.config.mjs` — SSOT for routes (consumed by sitemap + prerender)
- `src/routes.config.ts` — TS re-export of the .mjs SSOT
- `src/entry-server.tsx` — SSR entry wrapping App in StaticRouter + HelmetProvider
- `scripts/prerender.mjs` — post-build walker that writes `dist/<route>/index.html`

**Modified:**
- `package.json` — pinned `react-helmet-async@2.0.5`; `build` now runs sitemap → vite build → vite SSR build → prerender
- `src/App.tsx` — removed `<BrowserRouter>` wrapper (router-less shell)
- `src/main.tsx` — wraps with HelmetProvider + BrowserRouter; uses `hydrateRoot` when prerendered, `createRoot` otherwise
- `src/components/SEO.tsx` — returns `<Helmet>` JSX; no more `document.head` mutation
- `src/components/SchemaMarkup.tsx` — JSON-LD now emitted via `<Helmet><script type="application/ld+json">`; no more effect-driven DOM mutation
- `src/hooks/useReviewData.ts` — seeds state with `DEFAULT_REVIEW_COUNT` (92) and empty `lastUpdated` string for deterministic SSR; fallback also uses empty string
- `src/hooks/useLeadTracking.ts` — SSR guard (`typeof window === 'undefined'`) returning stub data, client rehydrates on first render
- `scripts/generate-sitemap.mjs` — imports `ROUTES` from `src/routes.config.mjs`; legacy hardcoded list removed
- `vite.config.ts` — `ssr.noExternal: ['react-helmet-async']` (CJS→ESM interop for prerender dynamic import)
- `vercel.json` — adds 301s for `/team`, `/faqs`, `/careers`, `/book-a-consultation`, `/cart`

## Build Verification (Task 2 done criteria)

`npm run build` exit 0:

- client build: `dist/index.html` (2.34 kB) + CSS (41.26 kB) + JS (1,178 kB)
- SSR build: `dist/server/entry-server.js` (1,151 kB)
- prerender step: **35 routes written**

Per-route HTML count in `dist/` (≥35 required):

- `dist/index.html` (home)
- 34 nested `dist/<route>/index.html` files (`find dist -mindepth 2 -name index.html | wc -l` → 34)
- Total: 35 ✓

`dist/locations/columbus/index.html` contents verified:

| Check | Result |
|---|---|
| `<title>` | `Roofers Columbus, OH \| DTE Roofing — Roof Repair & Replacement` |
| `rel="canonical"` | `https://www.dteroofingllc.com/locations/columbus` |
| `og:title` | present (1) |
| `application/ld+json` | present (1) — contains `RoofingContractor` schema |
| `aggregateRating.reviewCount` | `"92"` (seeded from DEFAULT_REVIEW_COUNT, hydration-safe) |

Navigate routes (`/team`, `/faqs`, `/careers`, `/book-a-consultation`, `/cart`) have **no** corresponding HTML files — handled by Vercel 301s.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] StaticRouter import path changed in react-router-dom v7**
- **Found during:** Task 2, first `vite build --ssr`
- **Issue:** Plan specified `import { StaticRouter } from 'react-router-dom/server'` but RR7 no longer exposes that specifier; Vite errored with `Missing "./server" specifier in "react-router-dom" package`.
- **Fix:** Import from the main entry: `import { StaticRouter } from 'react-router-dom'` (verified via `Object.keys(require('react-router-dom'))`).
- **Files:** `src/entry-server.tsx`
- **Commit:** `f144e2e`

**2. [Rule 3 - Blocking] react-helmet-async is CJS, breaks ESM SSR dynamic import**
- **Found during:** Task 2, first `node scripts/prerender.mjs`
- **Issue:** The SSR bundle externalized `react-helmet-async`, but Node's ESM loader couldn't resolve its named exports (`Named export 'Helmet' not found. The requested module 'react-helmet-async' is a CommonJS module`).
- **Fix:** Added `ssr: { noExternal: ['react-helmet-async'] }` to `vite.config.ts` so Vite bundles it into the SSR output.
- **Files:** `vite.config.ts`
- **Commit:** `f144e2e`

**3. [Rule 1 - Bug] `useLeadTracking` references `window` at render time**
- **Found during:** Task 2, first `node scripts/prerender.mjs` after helmet fix
- **Issue:** `useLeadTracking` accessed `window.location.search`, `document.referrer`, `screen`, `navigator` in the hook body (not inside useEffect), causing `ReferenceError: window is not defined` during `renderToString`. Not flagged in RESEARCH.md Pitfall 5/6 review.
- **Fix:** Added `typeof window === 'undefined'` guard at top of the conditional; returns stub TrackingData during SSR. Client rehydration re-runs the hook with real window.
- **Files:** `src/hooks/useLeadTracking.ts`
- **Commit:** `f144e2e`

### Notes

- **Typecheck pre-existing errors:** `npm run typecheck` surfaces errors in `ServiceAreaMap.tsx` (missing `@types/google.maps`), `About.tsx`, `Reviews.tsx`, `EmergencyServices.tsx` (unused imports), and `RoofRepair.tsx` (JSX fragment passed to string prop). All are pre-existing, unrelated to this plan, and do not block `vite build` (tsc runs only in the `typecheck` script, not in `build`). Out of scope per deviation Rule scope boundary. Logged for future cleanup.
- **Build warnings:** Vite reports the main JS chunk exceeds 500 kB (1,178 kB). Pre-existing; not addressed in this plan.
- **Hydration warnings:** None reported during `vite build` output. Runtime hydration warnings (if any) will surface during T3 `npm run preview` human verification.

## Sample HTML Head (dist/locations/columbus/index.html — excerpt)

```html
<title data-rh="true">Roofers Columbus, OH | DTE Roofing — Roof Repair & Replacement</title>
<meta data-rh="true" property="og:title" content="Roofers Columbus, OH | DTE Roofing"/>
<link data-rh="true" rel="canonical" href="https://www.dteroofingllc.com/locations/columbus"/>
<script data-rh="true" type="application/ld+json">
  {"@context":"https://schema.org","@type":"RoofingContractor",...,"aggregateRating":{"@type":"AggregateRating","ratingValue":"5","reviewCount":"92","bestRating":"5","worstRating":"1"}}
</script>
```

## Follow-ups / Open Items

- **T3 human verification pending:** `npm run preview` on localhost:4173, view-source on `/locations/columbus`, hard-refresh hydration check, internal navigation smoke test.
- `/blog/:slug` deferred to v2 (dynamic Supabase-sourced, no static prerender).
- Pre-existing typecheck errors in unrelated files (see Notes above) remain for a future cleanup pass.
- Client JS chunk size warning (>500 kB) not addressed.
- Consider pinning `@types/google.maps` or adding a triple-slash ref to fix `ServiceAreaMap.tsx` typecheck.

## Self-Check

- [x] `src/routes.config.mjs` exists
- [x] `src/routes.config.ts` exists
- [x] `src/entry-server.tsx` exists
- [x] `scripts/prerender.mjs` exists
- [x] `dist/index.html` exists
- [x] `dist/locations/columbus/index.html` exists with title, canonical, og:title, ld+json, reviewCount:92
- [x] `dist` has 35 per-route index.html files (1 root + 34 nested)
- [x] No HTML files for Navigate routes (`/team`, `/faqs`, `/careers`, `/book-a-consultation`, `/cart`)
- [x] Commit `767d241` (Task 1) exists in `git log`
- [x] Commit `f144e2e` (Task 2) exists in `git log`

## Self-Check: PASSED

---

**Status:** T1 + T2 complete. **STOP at T3 human-verify checkpoint per orchestrator constraints.**
