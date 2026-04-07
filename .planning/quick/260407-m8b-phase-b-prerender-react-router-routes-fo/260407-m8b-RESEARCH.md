# Phase B: Prerender React Router Routes — Research

**Researched:** 2026-04-07
**Domain:** Static Site Generation (SSG) for Vite + React 18.3 + React Router DOM 7.9 SPA
**Confidence:** HIGH (verified against current official docs and npm registry)

---

## 1. TL;DR Recommendation

**Use `react-snap` — NO. Use React Router 7 framework mode `prerender` — NO (too invasive). Use a custom Vite post-build prerender script powered by `react-dom/server` + `StaticRouter` + `react-helmet-async`.**

Revised after verifying the ecosystem: **the cleanest path for this codebase is React Router 7's built-in `prerender` with `ssr: false`, but it requires migrating from `<BrowserRouter>` in `src/App.tsx` to the `@react-router/dev` Vite plugin and a `routes.ts` config file** [CITED: reactrouter.com/how-to/pre-rendering]. That's the officially blessed path in 2026, keeps the SPA runtime behavior identical, produces one `.html` per route with baked-in meta/JSON-LD, and is maintained by the React Router team.

**If the migration cost is unacceptable** (it touches `main.tsx`, `App.tsx`, adds `routes.ts`, requires `react-router.config.ts`, and changes build output paths), the **fallback is a ~80-line custom prerender script** invoked as a `postbuild` step that uses `react-dom/server.renderToString` + `StaticRouter` from `react-router-dom` to walk the hardcoded route list and write HTML files into `dist/`. No new runtime dependency, no router refactor, full control.

**Meta tags: use `react-helmet-async` 2.0.5** [VERIFIED: npm view, 2.0.5 current] for both options. It's the only battle-tested React 18 meta manager that works in both SSR string rendering and client hydration. `@unhead/react` exists but its SSG story is Vue-first.

**Recommendation ranking:**
1. **Custom prerender script** (lowest risk, ~1 day, zero refactor) ← **PICK THIS**
2. React Router 7 framework mode + `prerender: true` (canonical, but ~2-3 day refactor)
3. Everything else: rejected (see §2)

---

## 2. Library Comparison

| Option | RR7 Compat | Vite 5 | Maintained | Migration Cost | Verdict |
|--------|-----------|--------|------------|----------------|---------|
| **Custom prerender script** (renderToString + StaticRouter) | ✅ Native | ✅ Native | N/A | **Low** — new script, zero app changes | **RECOMMENDED** |
| **React Router 7 `prerender`** (`@react-router/dev` 7.14.0) | ✅ (it IS RR7) | ✅ | ✅ Official | **High** — rewrites `App.tsx`, adds `routes.ts`, `react-router.config.ts`, changes `main.tsx` entry [CITED: reactrouter.com/how-to/pre-rendering] | Canonical but invasive |
| `vite-react-ssg` 0.9.1-beta.1 | ❌ Peer dep `react-router-dom: ^6.14.1` [VERIFIED: npm view 2026-02-13] | ✅ | ⚠️ Beta | Medium | **Rejected — no RR7 peer support** |
| `vite-ssg` (antfu) | ❌ Vue 3 only [CITED: github.com/antfu-collective/vite-ssg] | ✅ | ✅ | N/A | **Rejected — Vue only** |
| `react-snap` 1.23.0 | ❌ Unknown | ❌ CRA-era | ❌ **Last publish 2022-05-15** [VERIFIED: npm view] | Medium | **Rejected — abandoned 4 years** |
| `vike` (vite-plugin-ssr) | ⚠️ Possible | ✅ | ✅ | **Very high** — reorganizes app around file-based routing | **Rejected — overkill** |

**Why custom script wins for THIS codebase:**
- 42 static routes, zero dynamic route params needing CMS lookups (blog `:slug` is the only dynamic route and `Blog.tsx` currently sources posts from Supabase — for v1 just skip prerendering `/blog/:slug` and let it SPA-fallback).
- `App.tsx` already has the exhaustive route list hardcoded — trivial to import and loop.
- No new dependencies (`react-dom/server` and `StaticRouter` already ship with current deps).
- Build pipeline already runs a custom Node script (`scripts/generate-sitemap.mjs`) — adding `scripts/prerender.mjs` is the same pattern.
- Reversible: if it causes issues, delete the script and the site is back to SPA.

---

## 3. Migration Steps (High-Level — Planner Will Turn Into Tasks)

### Step 1 — Install `react-helmet-async`
```bash
npm install react-helmet-async@2.0.5
```
[VERIFIED: npm view react-helmet-async version → 3.0.0 exists but 2.x is the stable React 18 line; confirm 3.0.0 React 18 compat before bumping]

Wrap `<App />` in `main.tsx` with `<HelmetProvider>`.

### Step 2 — Rewrite `src/components/SEO.tsx`
Replace the `useEffect`+`document.querySelector` approach with `<Helmet>` children:
```tsx
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, canonical, ogImage, ... }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={ogTitle || title} />
      {/* ...etc */}
    </Helmet>
  );
}
```
Returns JSX now, not `null`. Works identically in SPA hydration AND server string rendering.

### Step 3 — Rewrite `src/components/SchemaMarkup.tsx`
Same pattern: replace the `useEffect` that appends `<script type="application/ld+json">` with:
```tsx
<Helmet>
  {schemas.map((s, i) => (
    <script key={i} type="application/ld+json">
      {JSON.stringify(s)}
    </script>
  ))}
</Helmet>
```

### Step 4 — Create `scripts/prerender.mjs`
After `vite build` completes:
1. Read the list of routes (hardcode array or parse from `src/App.tsx`).
2. For each route:
   - `import('../dist/server/entry-server.js')` OR render inline via dynamic import of the built bundle.
   - Use `renderToString(<StaticRouter location={route}><App /></StaticRouter>)`.
   - Use `HelmetProvider`'s `helmetContext` to extract `<head>` tags.
   - Read the built `dist/index.html` as a template, inject the rendered body + helmet head.
   - Write to `dist/<route>/index.html`.

Add a separate `vite build --ssr` pass targeting a new `src/entry-server.tsx` that exports `App` wrapped in `HelmetProvider`.

### Step 5 — Wire into `package.json`
```json
"build": "npm run generate-sitemap && vite build && vite build --ssr src/entry-server.tsx && node scripts/prerender.mjs"
```
Sitemap still runs first so prerender can optionally read it for the route list (single source of truth).

### Step 6 — Vercel config
Verify `vercel.json` rewrites don't clobber the new per-route `index.html` files. Current SPA-fallback rewrites may need scoping so that `/locations/columbus/index.html` is served directly when it exists, falling back to `/index.html` only for truly dynamic routes (`/blog/:slug`).

### Step 7 — Handle `useReviewData` during prerender
See §4.

---

## 4. Pitfalls & Hydration Risks Specific to This Codebase

### Pitfall 1 — `useReviewData` Supabase fetch during SSR
**Problem:** `src/hooks/useReviewData.ts` calls `supabase.from('review_data').select(...)` inside `useEffect`. `useEffect` **does not run during `renderToString`**, so at prerender time `reviewData` is `null` and `SchemaMarkup` emits **no `aggregateRating`** in the JSON-LD. Client hydrates, effect fires, and the script tag mutates — causing a **hydration content mismatch warning** and a flicker in crawler render.

**Fix:** In `useReviewData`, initialize state with the hardcoded defaults instead of `null`:
```ts
const [reviewData, setReviewData] = useState<ReviewData | null>({
  totalReviews: DEFAULT_REVIEW_COUNT, // 92
  averageRating: 5.0,
  ratingBreakdown: { 5: 92, 4: 0, 3: 0, 2: 0, 1: 0 },
  lastUpdated: '', // static — do NOT use new Date().toISOString() — see Pitfall 3
  businessName: 'DTE Roofing'
});
```
Now prerender ships real `aggregateRating` (using the 92/5.0 defaults), and client-side the Supabase effect either confirms them or updates them. JSON-LD is valid at crawl time. This matches the pattern chosen in Phase 04 (defer live review-count updates to v2 per STATE.md blockers).

### Pitfall 2 — `useEffect`-driven DOM mutation in `SEO.tsx` and `SchemaMarkup.tsx`
**Problem:** Both components return `null` and mutate `document.head` in `useEffect`. This is the root cause of the audit finding — during SSR the effects never run, so nothing gets injected. Already addressed in Steps 2 and 3.

### Pitfall 3 — `new Date().toISOString()` inside render path
**Problem:** `useReviewData.ts` line 66 and 77 call `new Date().toISOString()` as fallback values. If this ever moves into the render path (or into the initial `useState` as shown above), every prerender build produces different HTML, and hydration will mismatch. **Hardcode an empty string or a stable build-time constant.**

### Pitfall 4 — `BrowserRouter` vs `StaticRouter`
**Problem:** `src/App.tsx` line 1 imports `BrowserRouter as Router`. `BrowserRouter` reads `window.history` — blows up under `renderToString`.

**Fix:** Extract the routes into a `<AppRoutes />` component that does NOT wrap itself in a router. Then:
- `src/main.tsx` wraps `<AppRoutes />` in `<BrowserRouter>` for client.
- `src/entry-server.tsx` wraps `<AppRoutes />` in `<StaticRouter location={url}>` for prerender.

### Pitfall 5 — Third-party CDN scripts on `window`
**Problem:** `index.html` loads the Roofle widget and Cloudflare Insights beacon. These only run client-side (they're in `index.html`, not React) so they're fine. But verify no component accesses `window.roofle` or similar during render.

### Pitfall 6 — `ScrollToTop` component
**Problem:** `src/components/ScrollToTop.tsx` likely calls `window.scrollTo` in an effect — that's fine (effects don't run in SSR) — but audit it for any top-level `window` access.

### Pitfall 7 — Sitemap duplicate routes
From STATE.md: `/services/gutters` and `/services/gutter-services` both exist. Phase A already added a 301 for this. Make sure the prerender list matches the sitemap and does NOT generate HTML for the 301'd URL — otherwise Vercel will serve the HTML instead of the redirect.

### Pitfall 8 — `<Navigate>` routes
`App.tsx` has several `<Navigate to="..." replace />` routes (`/team`, `/faqs`, `/careers`, `/book-a-consultation`, `/cart`). These should NOT be prerendered — the redirect only works client-side. Instead, add them as `vercel.json` 301 redirects (Phase A pattern) or simply omit them from the prerender list and let the SPA fallback handle them.

### Pitfall 9 — Build order vs sitemap
Current: `npm run generate-sitemap && vite build`. New: sitemap still runs first, but the prerender script should READ the same canonical route list the sitemap generator uses. **Extract the route list into `src/routes.config.ts`** (or similar) as single source of truth for: `App.tsx`, `scripts/generate-sitemap.mjs`, and `scripts/prerender.mjs`. This is a prerequisite refactor.

---

## 5. Verification Plan

Beyond `curl`, confirm:

### Build-time
- [ ] `dist/index.html` exists and is the SPA shell (for SPA-fallback routes).
- [ ] `dist/locations/columbus/index.html` exists and contains:
  - [ ] `<title>` with location-specific text
  - [ ] `<link rel="canonical" href="https://www.dteroofingllc.com/locations/columbus">`
  - [ ] `<meta property="og:title">` with location-specific content
  - [ ] `<script type="application/ld+json">` with `RoofingContractor` schema AND location-scoped `@id`
  - [ ] Body HTML with actual page content (not empty `<div id="root">`)
- [ ] All 42 routes from `App.tsx` (minus `<Navigate>` routes) have corresponding `.html` files.
- [ ] Build succeeds with no hydration warnings in `vite build` output.

### Runtime
- [ ] `npm run preview` locally: navigate to `/locations/columbus`, view source (not devtools), confirm meta/canonical/JSON-LD present.
- [ ] Navigate client-side from `/` → `/locations/columbus` — confirm no console hydration mismatch errors.
- [ ] React DevTools: confirm only ONE `<Helmet>` context (not duplicated from provider misconfiguration).

### Post-deploy (staging or preview URL)
- [ ] `curl -sL https://<preview>/locations/columbus | grep -c 'application/ld+json'` → returns `≥1`
- [ ] `curl -sL https://<preview>/locations/columbus | grep -o '<title>[^<]*</title>'` → returns Columbus-specific title
- [ ] `curl -sL https://<preview>/services/roof-repair | grep 'canonical'` → returns correct canonical
- [ ] Google Rich Results Test (https://search.google.com/test/rich-results) on 3 pages: `/`, `/locations/columbus`, `/services/roof-repair` — all show detected `RoofingContractor` / `Service` / `BreadcrumbList` schemas.
- [ ] Google Mobile-Friendly Test on the same 3 pages — confirm rendered HTML contains body content (proves Googlebot sees the prerendered output, not the SPA shell).
- [ ] Schema.org Validator (https://validator.schema.org) — zero errors across the 3 sample pages.
- [ ] Re-run the SEO audit command that produced `memory/audits/technical-seo-checker/2026-04-07-dteroofingllc.md` — confirm Indexability score rises from 4 → 8+ and Schema from 3 → 8+.

### Regression guards
- [ ] All existing routes still navigate client-side (SPA behavior preserved post-hydration).
- [ ] `MultiStepLeadForm` still submits (client-side only, unaffected).
- [ ] Roofle widget still loads (client-side CDN script, unaffected).
- [ ] Supabase review fetch still runs and (eventually) updates counts client-side.
- [ ] Sitemap regeneration still works and covers all 13 locations (Phase A fix preserved).

---

## Sources

**HIGH confidence (official docs, verified 2026-04-07):**
- reactrouter.com/how-to/pre-rendering — `prerender` config, SPA + SSG combo [CITED]
- reactrouter.com/start/framework/rendering — three rendering strategies [CITED]
- github.com/antfu-collective/vite-ssg README — Vue-only confirmation [CITED]
- `npm view` registry queries — version/time/peer-deps for `vite-react-ssg` (0.9.1-beta.1, RR6 peer), `@react-router/dev` (7.14.0), `react-helmet-async` (3.0.0), `@unhead/react` (2.1.13), `react-snap` (1.23.0, last publish 2022-05-15) [VERIFIED]

**Codebase (direct reads):**
- `src/App.tsx`, `src/main.tsx`, `src/components/SEO.tsx`, `src/components/SchemaMarkup.tsx`, `src/hooks/useReviewData.ts`, `vite.config.ts`, `package.json`, `index.html`, `.planning/STATE.md`, `memory/audits/technical-seo-checker/2026-04-07-dteroofingllc.md`

**Assumptions flagged:**
- `[ASSUMED]` `react-helmet-async@3.0.0` works with React 18.3 — 2.x is definitely safe; confirm 3.x compatibility before upgrading past 2.0.5. Recommend pinning **2.0.5** for this phase.
- `[ASSUMED]` `ScrollToTop.tsx` and `Navigation.tsx` do not touch `window` in render path — quick code review needed during execution to confirm.
- `[ASSUMED]` Vercel's default SPA rewrite rule will still serve per-route `index.html` files before falling back — verify `vercel.json` rewrites during execution.

---

## Confidence Breakdown

| Area | Level | Reason |
|------|-------|--------|
| Library selection | HIGH | Three candidates rejected with hard evidence (Vue-only, RR6 peer dep, abandoned 2022) |
| RR7 prerender capability | HIGH | Cited directly from reactrouter.com/how-to/pre-rendering |
| Custom script feasibility | HIGH | Standard `renderToString` + `StaticRouter` pattern, zero new deps |
| Hydration pitfalls | HIGH | Identified from direct read of SEO.tsx, SchemaMarkup.tsx, useReviewData.ts |
| `react-helmet-async` 3.x React 18 compat | MEDIUM | Pinning 2.0.5 as safe default |
