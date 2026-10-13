---
phase: quick-261013-gsu
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/utils/prerenderSnapshot.ts
  - src/main.tsx
  - src/components/RouteErrorBoundary.tsx
autonomous: true
requirements: [QUICK-261013-gsu]

must_haves:
  truths:
    - "On a prerendered route whose chunk fails twice (reload already spent), the server-rendered <main> content (H1 + body copy) stays visible in the DOM, preceded by a one-line status banner with a Reload button"
    - "When no snapshot exists for the current pathname (client-side navigation to a failing route, or an empty-#root SPA-shell load), the existing 'This page didn't finish loading' section renders exactly as before"
    - "Prerendered HTML output is unchanged: dist/locations/dublin/index.html still has exactly one <h1> and contains neither the banner text nor the fallback text"
    - "SSR/prerender still builds: the new util never touches window at module top level"
  artifacts:
    - path: "src/utils/prerenderSnapshot.ts"
      provides: "capturePrerenderedMain(container) and getPrerenderedMain(pathname) with pathname normalization and SSR guard"
      exports: ["capturePrerenderedMain", "getPrerenderedMain"]
    - path: "src/components/RouteErrorBoundary.tsx"
      provides: "Error state renders banner + snapshot when available, else the unchanged error section"
      contains: "getPrerenderedMain"
  key_links:
    - from: "src/main.tsx"
      to: "src/utils/prerenderSnapshot.ts"
      via: "capturePrerenderedMain(container) inside the container.hasChildNodes() branch, before hydrateRoot"
      pattern: "capturePrerenderedMain\\(container\\)"
    - from: "src/components/RouteErrorBoundary.tsx"
      to: "src/utils/prerenderSnapshot.ts"
      via: "getPrerenderedMain(this.props.pathname) in the error branch of render()"
      pattern: "getPrerenderedMain\\("
---

<objective>
Keep the prerendered page content on screen when a lazy route chunk fails to load even after the one-shot reload.

Purpose: Reproduced 2026-10-13 on the built site: with dist/assets/Dublin-*.js hidden, chunkReload reloads once, the second failure reaches RouteErrorBoundary, and React discards the server-rendered HTML inside the boundary, removing the H1 and all body copy (only Navigation, Footer and <title> survive). Users or crawlers hitting a transient chunk failure see an error screen instead of the approved location content. Fix: snapshot <main>'s prerendered innerHTML before hydration and, in the boundary's error state, re-render that snapshot (plus a slim reload banner) when the pathname matches.

Output: new src/utils/prerenderSnapshot.ts, small edits to src/main.tsx and src/components/RouteErrorBoundary.tsx. One local commit (no push).
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@./CLAUDE.md
@.planning/STATE.md
@src/main.tsx
@src/components/RouteErrorBoundary.tsx

<interfaces>
Current src/main.tsx (relevant part):

    installChunkReloadHandler();
    const container = document.getElementById('root')!;
    const tree = ( <StrictMode><HelmetProvider><BrowserRouter><App /></BrowserRouter></HelmetProvider></StrictMode> );
    if (container.hasChildNodes()) {
      hydrateRoot(container, tree);
    } else {
      createRoot(container).render(tree);
    }

Current src/components/RouteErrorBoundary.tsx:
- `interface RouteErrorBoundaryProps { children: ReactNode; }`, `interface BoundaryState { hasError: boolean; }`
- non-exported `class RouteErrorBoundaryInner extends Component<RouteErrorBoundaryProps, BoundaryState>` with getDerivedStateFromError, componentDidCatch (console.error 'Route failed to render:'), and render() returning children or a `<section className="min-h-[60vh] ...">` error screen (h2 "This page didn't finish loading", Reload page button, Go to homepage Link, tel:6149716028).
- `export default function RouteErrorBoundary({ children }: RouteErrorBoundaryProps): JSX.Element` reads `const { pathname } = useLocation();` and returns `<RouteErrorBoundaryInner key={pathname}>{children}</RouteErrorBoundaryInner>`.

App.tsx (unchanged by this plan): `<main className="flex-grow"><RouteErrorBoundary><Suspense fallback={<PageLoader />}><Routes>...</Routes></Suspense></RouteErrorBoundary></main>`. So `main.innerHTML` at load time is exactly the prerendered route content the boundary wraps; rendering it back inside the boundary restores the same markup in the same place.

SSR graph: src/entry-server.tsx imports App -> RouteErrorBoundary -> (new) prerenderSnapshot. So prerenderSnapshot.ts must not reference window/document at module top level.

Tailwind tokens (tailwind.config.js): charcoal-* and primary-* scales both define 200 (primary-200 = #fecaca).

Prerendered Dublin H1 (dist/locations/dublin/index.html): `<h1 class="text-4xl md:text-5xl font-bold mb-6">Roof Repair &amp; Replacement in Dublin, OH`. dist HTML is one line: count with `grep -o ... | wc -l`, never `grep -c`.

Hashed chunks change on rebuild; re-list with `ls dist/assets | grep -E '^(Dublin|NotFound)-'`. Under `vite preview` use trailing-slash URLs, otherwise the SPA fallback serves the homepage. dist/404.html is the prerendered NotFound page.

Headless browser available: "/c/Program Files/Google/Chrome/Application/chrome.exe" (Edge also at "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"). No playwright/puppeteer in node_modules; do NOT install any.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: prerenderSnapshot util, capture in main.tsx, snapshot rendering in RouteErrorBoundary</name>
  <files>src/utils/prerenderSnapshot.ts, src/main.tsx, src/components/RouteErrorBoundary.tsx</files>
  <action>
Implement exactly the approved design (do not redesign). 2-space indent, semicolons, explicit return types on exported functions, no unused locals/params, Tailwind only, no new dependencies.

(1) Create src/utils/prerenderSnapshot.ts:
- Module-scope state: `let capturedPath: string | null = null;` and `let capturedHtml: string | null = null;` (no window access at top level, so it is safe in the SSR graph).
- Internal helper `normalizePath(pathname: string): string` that strips trailing slashes but returns '/' for root ('/locations/dublin/' -> '/locations/dublin', '/' -> '/', '' -> '/').
- `export function capturePrerenderedMain(container: HTMLElement): void`: return early if `typeof window === 'undefined'`; read `container.querySelector('main')?.innerHTML`; if undefined or blank after trim, leave state null and return; otherwise store the HTML and `normalizePath(window.location.pathname)`.
- `export function getPrerenderedMain(pathname: string): string | null`: return null if `typeof window === 'undefined'` or nothing captured; return capturedHtml only when `normalizePath(pathname) === capturedPath`, else null.

(2) Edit src/main.tsx: add `import { capturePrerenderedMain } from './utils/prerenderSnapshot';` next to the chunkReload import, and call `capturePrerenderedMain(container);` as the first statement inside the `if (container.hasChildNodes())` branch, before `hydrateRoot(container, tree);`. Do not touch the createRoot branch, installChunkReloadHandler, or anything else.

(3) Edit src/components/RouteErrorBoundary.tsx:
- Add `import { getPrerenderedMain } from '../utils/prerenderSnapshot';`.
- Give the inner class its own props interface, `interface RouteErrorBoundaryInnerProps extends RouteErrorBoundaryProps { pathname: string; }`, used as the Component props type. The default-export wrapper passes `pathname={pathname}` alongside the existing `key={pathname}` (keep the key). Keep the wrapper signature `({ children }: RouteErrorBoundaryProps): JSX.Element`.
- In render(): when hasError, compute `const snapshot = getPrerenderedMain(this.props.pathname);`. If snapshot is non-null, return a fragment with:
  a) a slim banner `<div role="status" className="bg-charcoal-900 text-white px-4 py-3 text-center text-sm sm:text-base">` containing the text "Part of this page didn't load." (escape the apostrophe with `&apos;`) followed by `<button type="button" onClick={() => window.location.reload()} className="ml-1 underline font-semibold hover:text-primary-200">Reload</button>`;
  b) `<div dangerouslySetInnerHTML={{ __html: snapshot }} />`, with a one-line comment directly above it stating the HTML is our own prerendered markup captured from #root before hydration, not user input.
  If snapshot is null, return the existing `<section>` error screen completely unchanged (same text, classes, button, Link, tel:6149716028). Do not add any <h1>.
- Do NOT modify src/utils/chunkReload.ts, src/entry-server.tsx, scripts/prerender.mjs, src/App.tsx, any page content, URLs, or NAP.
  </action>
  <verify>
    <automated>cd "C:/Users/geoca/OneDrive/Desktop/dte-roofing-web" && npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep -E "prerenderSnapshot|main.tsx|RouteErrorBoundary" ; grep -n "capturePrerenderedMain(container)" src/main.tsx && grep -n "getPrerenderedMain(" src/components/RouteErrorBoundary.tsx && grep -c "tel:6149716028" src/components/RouteErrorBoundary.tsx && test -z "$(git status --short src/utils/chunkReload.ts src/entry-server.tsx scripts/prerender.mjs src/App.tsx)" && echo TASK1_OK</automated>
  </verify>
  <done>tsc prints no errors mentioning the three files (other pre-existing tsc errors are ignored; typecheck is not a gate); main.tsx calls capturePrerenderedMain(container) only in the hydrate branch before hydrateRoot; boundary renders banner + snapshot when getPrerenderedMain returns HTML, otherwise the original section verbatim; chunkReload.ts, entry-server.tsx, prerender.mjs and App.tsx untouched; TASK1_OK printed.</done>
</task>

<task type="auto">
  <name>Task 2: Build, prove both branches in a real headless browser, restore artifacts, commit</name>
  <files>src/utils/prerenderSnapshot.ts, src/main.tsx, src/components/RouteErrorBoundary.tsx (commit only; no further source edits unless a check fails)</files>
  <action>
Build gate (the build is this repo's verification gate; do NOT use `npm run typecheck` or `npm run lint` as gates, they are pre-existing red):
1. `npm run build` must exit 0 (also proves the util is SSR-safe, since prerender imports it). Then `git checkout -- public/sitemap.xml` (build rewrites it) and confirm `git status --short public/sitemap.xml` is empty.
2. Prerender unchanged: `grep -o "<h1" dist/locations/dublin/index.html | wc -l` = 1; `grep -o "Part of this page" dist/locations/dublin/index.html | wc -l` = 0.

Snapshot branch (failure on a prerendered route):
3. `DUB=$(ls dist/assets | grep -E '^Dublin-.*\.js$')`; `mv "dist/assets/$DUB" "dist/assets/$DUB.bak"`.
4. Start `npx vite preview --port 4199 --strictPort` in the background; wait until `curl -s -o /dev/null -w "%{http_code}" http://localhost:4199/` returns 200.
5. Dump the post-JS DOM with headless Chrome into the session scratchpad: `"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --virtual-time-budget=20000 --dump-dom http://localhost:4199/locations/dublin/ > <scratchpad>/dublin-dom.html`. Confirm in that file: (a) it contains "Part of this page didn" (banner) and `role="status"`; (b) it contains "Roof Repair &amp; Replacement in Dublin, OH" inside an <h1>; (c) it does NOT contain "This page didn" (old error section). Because the reload-once handler causes two page loads, if the dump shows neither banner nor error section (still mid-reload), retry with --virtual-time-budget=40000; if Chrome still misbehaves, try Edge with the same flags. Restore: `mv "dist/assets/$DUB.bak" "dist/assets/$DUB"`.

No-snapshot branch (empty #root, the SPA-shell style load that goes through createRoot):
6. `NF=$(ls dist/assets | grep -E '^NotFound-.*\.js$')`; `mv "dist/assets/$NF" "dist/assets/$NF.bak"`.
7. Create a temporary empty-root page: write a short node one-off script in the scratchpad (not the repo) that reads dist/404.html and removes everything between `<div id="root">` and the `</div>` that actually closes it (inspect the file tail first; do not just take the first `</div>`), writing the result to dist/zz-shell-test/index.html. Confirm the written file contains `<div id="root"></div>` and still contains the module script tags.
8. Dump http://localhost:4199/zz-shell-test/ the same way to <scratchpad>/shell-dom.html. Confirm it contains "This page didn" (old error section, unchanged) and does NOT contain "Part of this page didn".
9. Cleanup: `mv "dist/assets/$NF.bak" "dist/assets/$NF"`, `rm -rf dist/zz-shell-test`, stop the preview server (free port 4199). dist/ is a build artifact (not committed) but leave it consistent.

Commit: stage ONLY `src/utils/prerenderSnapshot.ts src/main.tsx src/components/RouteErrorBoundary.tsx` (never .claude/settings.local.json, root untracked .md files, _claude_audit_tmp/, docs/, public/sitemap.xml). Commit message subject `fix(app): keep prerendered content visible when a route chunk fails`, blank line, one sentence of body, blank line, `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Do NOT push (push to main is a live production deploy; the user decides).
  </action>
  <verify>
    <automated>cd "C:/Users/geoca/OneDrive/Desktop/dte-roofing-web" && npm run build && git checkout -- public/sitemap.xml && test "$(grep -o '<h1' dist/locations/dublin/index.html | wc -l)" -eq 1 && test "$(grep -o 'Part of this page' dist/locations/dublin/index.html | wc -l)" -eq 0 && test -z "$(git status --short public/sitemap.xml)" && echo BUILD_OK</automated>
    Plus the headless-DOM checks from steps 3-9: dublin-dom.html has the banner and the Dublin H1 and no "This page didn"; shell-dom.html has "This page didn" and no banner.
  </verify>
  <done>Build passes; prerendered Dublin HTML unchanged (1 H1, no banner); with the Dublin chunk hidden the rendered DOM keeps the Dublin H1 and body copy under a role="status" banner with a Reload button; with an empty-#root load and the NotFound chunk hidden the original error section renders; hidden chunks restored, temp shell dir removed, preview stopped, sitemap restored; one local commit containing exactly the three source files.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Served HTML -> client DOM | #root markup comes from our own prerender output served by Vercel |
| CDN/network -> browser | Route chunks may 404 (stale hash) or 502 |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-gsu-01 | Tampering / XSS | dangerouslySetInnerHTML in RouteErrorBoundary | mitigate | Snapshot is only read from our own prerendered <main> before hydration (no URL/query/user input involved); script tags inserted via innerHTML do not execute; documented in a code comment |
| T-gsu-02 | Information Disclosure | snapshot shown on wrong route | mitigate | getPrerenderedMain returns HTML only when the normalized pathname equals the captured one; client-side navigation to another failing route falls back to the existing error section |
| T-gsu-03 | Denial of Service | reload behavior | accept | chunkReload.ts unchanged; the banner Reload is user-initiated only, no automatic loop |
</threat_model>

<verification>
- `npm run build` passes; public/sitemap.xml restored
- Prerendered dist/locations/dublin/index.html: 1 H1, no banner text
- Headless DOM with Dublin chunk hidden: banner + Dublin H1 present, old error section absent
- Headless DOM for empty-#root load with NotFound chunk hidden: old error section present, banner absent
- `git show --stat HEAD` lists only the 3 source files; chunkReload.ts, entry-server.tsx, prerender.mjs, App.tsx, package.json untouched
</verification>

<success_criteria>
A route chunk that still fails after the one automatic reload no longer wipes the prerendered page: the original H1 and body copy stay on screen under a one-line "Part of this page didn't load. Reload" banner, while routes without a matching prerender snapshot keep the existing error screen.
</success_criteria>

<output>
Create `.planning/quick/261013-gsu-keep-prerendered-html-on-screen-when-a-r/261013-gsu-SUMMARY.md` when done
</output>
