---
phase: quick-261012-lje
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/RouteErrorBoundary.tsx
  - src/App.tsx
  - src/utils/chunkReload.ts
  - src/main.tsx
autonomous: true
requirements: [QUICK-261012-lje]

must_haves:
  truths:
    - "When a lazy route chunk fails to load, Navigation, Footer, RoofleSlideout and ScrollToTop stay mounted and a branded fallback renders inside <main> instead of a blank page"
    - "Navigating to another route after a failure renders that route normally (boundary resets on pathname change)"
    - "A failed chunk import triggers exactly one automatic page reload; a second failure within ~10 s falls through to the error boundary (no reload loop)"
    - "Prerendered HTML is unchanged in substance: /locations/dublin and /services/roof-repair still contain exactly one <h1> and never contain the fallback text"
  artifacts:
    - path: "src/components/RouteErrorBoundary.tsx"
      provides: "Class error boundary + pathname-keyed default-export wrapper + Tailwind fallback UI"
      contains: "getDerivedStateFromError"
    - path: "src/utils/chunkReload.ts"
      provides: "installChunkReloadHandler(): one-shot reload on vite:preloadError with sessionStorage guard"
      exports: ["installChunkReloadHandler"]
  key_links:
    - from: "src/App.tsx"
      to: "src/components/RouteErrorBoundary.tsx"
      via: "<RouteErrorBoundary> wrapping the existing <Suspense fallback={<PageLoader />}> inside <main>"
      pattern: "<RouteErrorBoundary>"
    - from: "src/main.tsx"
      to: "src/utils/chunkReload.ts"
      via: "installChunkReloadHandler() called before hydrateRoot/createRoot"
      pattern: "installChunkReloadHandler\\(\\)"
---

<objective>
Stop a single failed lazy route chunk from blanking the whole prerendered page.

Purpose: On production, blocking or 502-ing one route chunk (Dublin, RoofRepair) during hydrateRoot made React 18 unmount the entire root (0 H1s, 1 word left), because App.tsx has one Suspense boundary and no error boundary. Fix = (1) a route-level error boundary inside <main> so the shell survives, and (2) a one-shot auto-reload on Vite's `vite:preloadError` to recover from stale-hash 404s after deploys and transient 502s.

Output: src/components/RouteErrorBoundary.tsx (new), src/utils/chunkReload.ts (new), small edits to src/App.tsx and src/main.tsx. One commit.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@./CLAUDE.md
@.planning/STATE.md
@src/App.tsx
@src/main.tsx
@src/entry-server.tsx

<interfaces>
Current App.tsx layout (lines ~59-112). The ONLY change is to wrap the Suspense element:

    <ScrollToTop />
    <RoofleSlideout />
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes> ...40+ <Route> elements, all React.lazy... </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>

App.tsx imports: `import { lazy, Suspense } from 'react';` and `import { Routes, Route } from 'react-router-dom';`. Components are imported as `./components/Navigation` etc. (no extension).

Current main.tsx: builds `tree` (StrictMode > HelmetProvider > BrowserRouter > App), then `container.hasChildNodes() ? hydrateRoot(container, tree) : createRoot(container).render(tree)`. Imports `App from './App.tsx'` and `'./index.css'`.

Vite event typing: src/vite-env.d.ts references `vite/client`, which declares `'vite:preloadError'` in WindowEventMap as `VitePreloadErrorEvent` (an Event with `payload: Error`). So `window.addEventListener('vite:preloadError', (event) => { event.payload; event.preventDefault(); })` is type-safe with no extra declarations.

Confirmed in installed Vite (node_modules/vite/dist/node/chunks/dep-*.js): the preload helper does `baseModule().catch(handlePreloadError)`, so a failed dynamic import of a route chunk itself (not only its CSS/deps) dispatches `vite:preloadError`; if the event is NOT defaultPrevented the error is rethrown to React.lazy.

Design idioms (from existing pages, e.g. src/pages/NotFound.tsx):
  primary CTA: "bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold text-lg inline-flex items-center justify-center gap-2"
  colors: text-charcoal-900 headings, text-charcoal-600 body
  PageLoader container: "min-h-[60vh] flex items-center justify-center"

Phone: the ONLY allowed phone href is exactly `tel:6149716028` (src/components/Footer.tsx line 82). Do not introduce any other number; read Footer.tsx around line 82 and reuse its visible phone text verbatim.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: RouteErrorBoundary component and wire it around the routed Suspense in App.tsx</name>
  <files>src/components/RouteErrorBoundary.tsx, src/App.tsx</files>
  <action>
Create src/components/RouteErrorBoundary.tsx (2-space indent, semicolons, explicit return types):

- Import `{ Component }` and types `ErrorInfo`, `ReactNode` from 'react'; `{ Link, useLocation }` from 'react-router-dom'. No new dependencies.
- `interface RouteErrorBoundaryProps { children: ReactNode; }` and an internal `interface BoundaryState { hasError: boolean; }`.
- A NON-exported class `RouteErrorBoundaryInner extends Component<RouteErrorBoundaryProps, BoundaryState>` with `state: BoundaryState = { hasError: false };`, `static getDerivedStateFromError(): BoundaryState { return { hasError: true }; }`, `componentDidCatch(error: Error, info: ErrorInfo): void` that only calls `console.error('Route failed to render:', error, info.componentStack);` (project logging convention: console.error only), and `render(): ReactNode` returning `this.props.children` when no error, otherwise the fallback.
- Fallback markup: a `<section>` with `className="min-h-[60vh] flex items-center justify-center bg-white px-4 py-16"` containing a centered `max-w-xl text-center` block: an `<h2 className="text-3xl font-bold text-charcoal-900 mb-4">` reading "This page didn't finish loading" (escape the apostrophe with `&apos;` or use a JS string); a `<p className="text-lg text-charcoal-600 mb-8">` with one sentence, e.g. "A connection hiccup stopped part of this page from loading. Reloading usually fixes it."; a button row `flex flex-col sm:flex-row gap-4 justify-center` with (a) `<button type="button" onClick={() => window.location.reload()}>` using the primary CTA idiom from the interfaces block, text "Reload page"; (b) a secondary `<Link to="/">` styled `border-2 border-charcoal-900 text-charcoal-900 px-8 py-4 rounded-lg hover:bg-charcoal-900 hover:text-white transition-all font-semibold text-lg inline-flex items-center justify-center` with text "Go to homepage"; then a `<p className="mt-8 text-charcoal-600">` "Prefer to talk? Call us at " followed by `<a href="tel:6149716028" className="text-primary-700 font-semibold hover:text-primary-800">` whose visible text is copied verbatim from Footer.tsx's tel link. Use h2 (NOT h1) so the fallback never adds an H1; it never renders during SSR anyway because fallback only appears after a client error. `window` is referenced only inside the onClick handler, never at module top level (SSR safety).
- Default export: `export default function RouteErrorBoundary({ children }: RouteErrorBoundaryProps): JSX.Element` that reads `const { pathname } = useLocation();` and returns `<RouteErrorBoundaryInner key={pathname}>{children}</RouteErrorBoundaryInner>`. Keying by pathname gives a fresh boundary on route change; works on the server inside StaticRouter and the key is identical server/client, so hydration is unaffected.

Edit src/App.tsx: add `import RouteErrorBoundary from './components/RouteErrorBoundary';` with the other component imports, then wrap the existing `<Suspense fallback={<PageLoader />}> ... </Suspense>` inside `<main className="flex-grow">` with `<RouteErrorBoundary> ... </RouteErrorBoundary>` (boundary OUTSIDE Suspense so a rejected lazy import inside Suspense is caught by it). Do not touch any Route, path, element, PageLoader, Navigation, Footer, ScrollToTop or RoofleSlideout. Re-indent the wrapped block by 2 spaces.
  </action>
  <verify>
    <automated>cd "C:/Users/geoca/OneDrive/Desktop/dte-roofing-web" && npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep -E "RouteErrorBoundary|App.tsx" ; grep -c "<RouteErrorBoundary>" src/App.tsx && grep -c "tel:6149716028" src/components/RouteErrorBoundary.tsx && grep -v "^\s*//" src/components/RouteErrorBoundary.tsx | grep -c "<h1"</automated>
  </verify>
  <done>tsc prints no errors for RouteErrorBoundary.tsx or App.tsx; App.tsx contains exactly one `<RouteErrorBoundary>` wrapping the Suspense inside main; boundary file contains tel:6149716028 once and zero `<h1`; `git diff src/App.tsx` shows only the import, the wrapper open/close tags, and re-indentation (no Route lines changed).</done>
</task>

<task type="auto">
  <name>Task 2: One-shot vite:preloadError reload handler installed in main.tsx</name>
  <files>src/utils/chunkReload.ts, src/main.tsx</files>
  <action>
Create src/utils/chunkReload.ts (client-only module; imported ONLY by src/main.tsx, never by App.tsx or anything reachable from entry-server.tsx):

- Module constants: `const RELOAD_KEY = 'dte:chunk-reload-at';` and `const RELOAD_WINDOW_MS = 10000;`.
- Internal helpers `readLastReload(): number` (try `Number(window.sessionStorage.getItem(RELOAD_KEY))`, returning 0 for null/NaN; catch returns 0) and `markReload(): boolean` (try `window.sessionStorage.setItem(RELOAD_KEY, String(Date.now()))` and return true; catch returns false). All sessionStorage access wrapped in try/catch (private mode / blocked storage).
- `export function installChunkReloadHandler(): void`: if `typeof window === 'undefined'` return (defensive); then `window.addEventListener('vite:preloadError', (event) => { ... })`:
  - If `Date.now() - readLastReload() < RELOAD_WINDOW_MS`: `console.error('Chunk failed to load after reload; showing fallback:', event.payload);` and return WITHOUT preventDefault, so Vite rethrows and RouteErrorBoundary shows the fallback.
  - If `markReload()` returns false (storage unavailable, so no loop guard possible): return without preventDefault (fail safe to the boundary rather than risk a reload loop).
  - Otherwise `event.preventDefault();` then `window.location.reload();`.
  The event is typed by vite/client (VitePreloadErrorEvent with `payload`); no extra type declarations needed.

Edit src/main.tsx: add `import { installChunkReloadHandler } from './utils/chunkReload';` and call `installChunkReloadHandler();` after the imports and BEFORE `const container = ...` / hydrateRoot / createRoot, so the listener exists before any lazy import starts during hydration. Leave the rest of main.tsx unchanged.
  </action>
  <verify>
    <automated>cd "C:/Users/geoca/OneDrive/Desktop/dte-roofing-web" && npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep -E "chunkReload|main.tsx" ; grep -n "installChunkReloadHandler" src/main.tsx && grep -rln "chunkReload" src | grep -v -E "src/main.tsx|src/utils/chunkReload.ts"</automated>
  </verify>
  <done>tsc prints nothing for chunkReload.ts/main.tsx; main.tsx imports and calls installChunkReloadHandler() before the hydrate/create branch; the final grep prints nothing (chunkReload imported only by main.tsx, so it stays out of the SSR graph); every sessionStorage access is inside try/catch.</done>
</task>

<task type="auto">
  <name>Task 3: Build, prove prerender is intact, restore sitemap, commit</name>
  <files>src/components/RouteErrorBoundary.tsx, src/utils/chunkReload.ts, src/App.tsx, src/main.tsx (commit only; no further edits)</files>
  <action>
Run `npm run build` (sitemap + client build + SSR build + prerender); it must exit 0. Then `npm run verify-schema`; it must pass. Then check prerendered output (dist HTML is one line, so count with `grep -o ... | wc -l`, never `grep -c`):
- `grep -o "<h1" dist/locations/dublin/index.html | wc -l` gives 1
- `grep -o "<h1" dist/services/roof-repair/index.html | wc -l` gives 1
- `grep -o "Reload page" dist/locations/dublin/index.html dist/services/roof-repair/index.html | wc -l` gives 0 (fallback never prerendered)
- `grep -l "dte:chunk-reload-at" dist/assets/*.js` prints at least one file (handler shipped in client bundle)
Then restore the build-rewritten sitemap: `git checkout -- public/sitemap.xml` and confirm `git status --short public/sitemap.xml` is empty.

Optional manual sanity (not a gate): `npm run preview`, open /locations/dublin with DevTools request blocking on the Dublin-*.js chunk; the page should reload once, then show the fallback with Navigation and Footer intact.

Commit ONLY the four source files (do not stage .claude/settings.local.json, the untracked root .md files, _claude_audit_tmp/ or docs/): `git add src/components/RouteErrorBoundary.tsx src/utils/chunkReload.ts src/App.tsx src/main.tsx`, then commit with subject `fix(app): add route error boundary and one-shot chunk reload`, a blank line, and `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Do not push (push to main is a live deploy; current branch is feat/internal-links).
  </action>
  <verify>
    <automated>cd "C:/Users/geoca/OneDrive/Desktop/dte-roofing-web" && npm run build && npm run verify-schema && test "$(grep -o '<h1' dist/locations/dublin/index.html | wc -l)" -eq 1 && test "$(grep -o '<h1' dist/services/roof-repair/index.html | wc -l)" -eq 1 && test "$(grep -o 'Reload page' dist/locations/dublin/index.html dist/services/roof-repair/index.html | wc -l)" -eq 0 && grep -l "dte:chunk-reload-at" dist/assets/*.js && git checkout -- public/sitemap.xml && test -z "$(git status --short public/sitemap.xml)" && echo ALL_OK</automated>
  </verify>
  <done>Build and verify-schema pass; Dublin and RoofRepair prerendered pages each have exactly one H1 and no fallback text; handler key present in a client asset; public/sitemap.xml unchanged; one commit containing exactly the four source files.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| CDN/network -> browser | Route chunks fetched at runtime may 404 (stale hash post-deploy) or 502 |
| sessionStorage -> handler | Storage may be unavailable or hold arbitrary values |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-lje-01 | Denial of Service | chunkReload.ts reload loop | mitigate | 10 s sessionStorage timestamp guard; if the storage write fails, do not reload (fall through to boundary) |
| T-lje-02 | Denial of Service | App.tsx whole-root unmount | mitigate | RouteErrorBoundary inside <main> keeps the shell mounted; keyed by pathname to recover on navigation |
| T-lje-03 | Tampering | sessionStorage value | accept | Parsed with Number(); garbage treated as 0, worst case one extra reload, no data exposure |
| T-lje-04 | Information Disclosure | fallback UI | mitigate | Fallback shows generic text only; error details go to console.error, never rendered |
</threat_model>

<verification>
- `npm run build` and `npm run verify-schema` pass
- Prerendered Dublin and RoofRepair: 1 H1 each, 0 "Reload page"
- New/edited files type-clean under the tsc filter
- public/sitemap.xml unchanged in git status
- No page content, URL, slug, NAP, or dependency changes (`git show --stat HEAD` lists only the 4 source files; package.json untouched)
</verification>

<success_criteria>
A failed lazy route chunk triggers at most one automatic reload, then a branded in-page fallback with Navigation and Footer intact (never a blank page), while SSR prerender output remains identical in content.
</success_criteria>

<output>
Create `.planning/quick/261012-lje-chunk-load-error-boundary/261012-lje-SUMMARY.md` when done
</output>
