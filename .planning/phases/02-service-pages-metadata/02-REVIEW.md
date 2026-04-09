---
phase: 02-service-pages-metadata
reviewed: 2026-04-09T10:15:00Z
depth: standard
files_reviewed: 13
files_reviewed_list:
  - src/pages/services/CommercialRoofing.tsx
  - src/pages/services/EmergencyServices.tsx
  - src/pages/services/Gutters.tsx
  - src/pages/services/PreventativeMaintenance.tsx
  - src/pages/services/RoofInspection.tsx
  - src/pages/services/RoofInstallation.tsx
  - src/pages/services/RoofMaintenance.tsx
  - src/pages/services/RoofReplacement.tsx
  - src/pages/services/Siding.tsx
  - src/pages/services/StormDamage.tsx
  - scripts/prerender.mjs
  - scripts/verify-phase-02.sh
  - public/sitemap.xml
findings:
  critical: 0
  warning: 1
  info: 4
  total: 5
status: issues_found
---

# Phase 2: Code Review Report

**Reviewed:** 2026-04-09T10:15:00Z
**Depth:** standard
**Files Reviewed:** 13
**Status:** issues_found (1 Warning, 4 Info)

## Summary

Phase 2 is a metadata-only overhaul of 10 service pages plus a targeted one-line fix in `scripts/prerender.mjs`, a new batch verification shell script, and sitemap `<lastmod>` refreshes. The 10 source edits are mechanical string replacements from the frozen copy packet (`02-COPY-APPROVED.md`) and are all correct and consistent with `SEO.tsx` prop contracts.

**What I verified:**
- All 10 `SEO` components pass valid `title` / `description` string props that will flow through `react-helmet-async` without escaping or interpolation hazards.
- The old duplicate "BEST Roofer in Columbus..." title has been removed from every one of the 10 files (verified via diff inspection of each).
- Each H1 and first content H2 has been updated to match the frozen copy in `02-COPY-APPROVED.md` verbatim.
- `canonical={`${CANONICAL_DOMAIN}/services/<slug>`}` is unchanged and correct in every file; no URL drift.
- All 10 service routes are present in `src/routes.config.mjs` → `PRERENDER_ROUTES`, so the prerender loop will emit `dist/services/<slug>/index.html` for every file the verify script asserts against.
- `scripts/prerender.mjs` META-02 fix (strip static `<meta name="description">` from the template) uses a safe, case-insensitive, non-greedy regex on the build-time template only — no injection surface, no runtime exposure.
- `public/sitemap.xml` `<lastmod>` refreshes to 2026-04-09 are consistent across all 10 service URLs. The pre-existing `/services/roof-repair` entry was correctly left at its original `lastmod` because Phase 2 does not touch that page (RoofRepair is deferred to Phase 3a per `deferred-items.md`).
- No hardcoded secrets, `eval`, `innerHTML`, `dangerouslySetInnerHTML`, `console.log`, or debug artifacts introduced.
- No new dependencies, no TypeScript `any`, no loose error handling, no new logic branches.

**Out-of-scope findings:** I observed a few pre-existing issues in `PreventativeMaintenance.tsx` (dynamic Tailwind class names that won't survive purge — `bg-${option.color}-50`, `border-${option.color}-200`). These exist on `main` prior to Phase 2's commit and are untouched by the metadata edits. I'm noting them as Info-level references only. Do **not** fix them in this phase; they belong to a hygiene backlog alongside the items already in `deferred-items.md`.

The Warning finding is a real robustness issue in the new `scripts/verify-phase-02.sh` that can mask verification failures on certain shells.

---

## Warnings

### WR-01: `set -u` + unset associative-array lookup can crash verify script before it reports failures

**File:** `scripts/verify-phase-02.sh:5,43`
**Issue:** The script opens with `set -euo pipefail` and then, inside the per-slug loop, performs `expected="${EXPECTED_TITLES[$slug]}"`. Under `set -u` (nounset), if `$slug` is ever passed in without a matching key in the `EXPECTED_TITLES` associative array, bash treats the lookup as an unset variable reference and the script aborts with `unbound variable` **before** reaching the `echo` / `FAIL` counter logic. Today the `SERVICES` array and `EXPECTED_TITLES` keys are in sync, so this works — but it is a silent regression trap: if a future edit adds a slug to `SERVICES` but forgets to add the matching `EXPECTED_TITLES` entry (or vice-versa — a typo in one array), the script won't print `FAIL [slug]: ...`; it will simply die with a cryptic bash error and a non-zero exit, which can look like an infrastructure problem rather than a verification gap.

Also note: `declare -A` requires bash 4+. Running this on a default macOS shell (bash 3.2) will fail at line 11 with `declare: -A: invalid option`. This is a minor portability concern for any contributor on stock macOS who hasn't installed newer bash via Homebrew. Low impact if the team runs verification only in CI / Linux / WSL, but worth documenting.

**Fix:** Guard the array lookup and surface a clear error message instead of letting `set -u` crash the run. Two small edits:

```bash
# At the top of the per-slug loop, after the file-existence check:
if [[ -z "${EXPECTED_TITLES[$slug]+x}" ]]; then
  echo "FAIL [$slug]: no expected title defined in EXPECTED_TITLES (script bug)"
  FAIL=$((FAIL+1))
  continue
fi
expected="${EXPECTED_TITLES[$slug]}"
```

Optionally, add a shebang comment documenting the bash 4+ requirement:

```bash
#!/usr/bin/env bash
# Requires bash 4+ (uses `declare -A`). On macOS, install via `brew install bash`.
```

---

## Info

### IN-01: Verify script greps for an escaped `&amp;` title but also has unescaped `&` variants — confirm SSR output matches

**File:** `scripts/verify-phase-02.sh:14,18,20`
**Issue:** The expected-titles table HTML-escapes `&` to `&amp;` for `gutters`, `roof-maintenance`, and `siding`, which is correct for HTML-serialized output from React (react-helmet-async renders `<title>Gutter Installation &amp; Repair ...</title>`). Good. Just flagging as a confirmation point: if anyone ever runs this against non-SSR output (e.g., inspecting the dev server HTML before prerender runs), the assertion will fail because the SPA template has `<title>Gutter Installation & Repair ...</title>` only after hydration. The script name and comment already clarify "run after npm run build" — no change needed, but a single-line reminder could prevent a future debugging detour.

**Fix (optional):** Add one sanity check near the top:

```bash
if [[ ! -d dist ]]; then
  echo "ERROR: dist/ not found. Run 'npm run build' first."
  exit 2
fi
```

### IN-02: `prerender.mjs` path-normalization uses hardcoded backslash before forward slash — Windows-only quirk, not a bug

**File:** `scripts/prerender.mjs:51`
**Issue:** `written.push(outFile.replace(ROOT + '\\', '').replace(ROOT + '/', ''));` runs two sequential `replace` calls to strip the project root regardless of platform separator. This is pre-existing (not introduced by Phase 2) but I'm noting it as an observation: the Windows replacement runs first, which is fine on Linux/macOS (the first `replace` is a no-op). No correctness issue; mentioning only because I noticed it during the prerender review.

**Fix (optional, not required for Phase 2):** Use `path.relative(ROOT, outFile)` for a single cross-platform call.

### IN-03: Helmet `<meta name="description">` strip regex is intentionally narrow — consider noting template assumptions

**File:** `scripts/prerender.mjs:38`
**Issue:** The new line `page = page.replace(/<meta name="description"[^>]*>/i, '');` matches **only** `<meta name="description"...>` with the attribute in that exact order. If someone ever re-orders attributes in `index.html` (e.g., `<meta content="..." name="description">`), the strip will silently no-op and the static template description will leak through alongside the helmet-emitted one, re-creating the META-02 duplication problem this fix was designed to prevent. Same caveat already applies to the pre-existing `<title>[^<]*<\/title>` strip on the line above, so this is consistent with the existing pattern — not a regression, just an ongoing brittleness worth a one-line comment in the file.

**Fix (optional):** Add a comment near the two `replace` calls:

```js
// NOTE: These regexes assume index.html uses <title>...</title> and
// <meta name="description" ...> in that exact attribute order. If the
// template changes, update or widen these regexes to match.
```

No code change required for Phase 2 — the current `index.html` template matches the regex.

### IN-04: Pre-existing dynamic Tailwind classes in PreventativeMaintenance.tsx — not introduced by Phase 2

**File:** `src/pages/services/PreventativeMaintenance.tsx:227`
**Issue:** The `ROI` grid interpolates dynamic Tailwind class names: `bg-${option.color}-50`, `border-${option.color}-200`. Tailwind's JIT/purge only ships classes it can statically discover, so these three variants (`red`, `yellow`, `green`) will only render colored backgrounds if those classes happen to exist elsewhere in the project's safelist or source. This is **pre-existing** and is outside Phase 2 scope (the metadata edits only touched the H1 and first H2 earlier in the file). I'm recording it as an Info-level observation so it can be moved to a hygiene backlog alongside the items in `deferred-items.md`.

**Fix (optional, defer to a later hygiene phase):** Use a static lookup map so Tailwind can see the full class names at build time:

```tsx
const COLOR_CLASSES = {
  red: { bg: 'bg-red-50', border: 'border-red-200' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200' },
  green: { bg: 'bg-green-50', border: 'border-green-200' },
} as const;

// then:
<div className={`${COLOR_CLASSES[option.color].bg} p-6 rounded-xl border-2 ${COLOR_CLASSES[option.color].border}`}>
```

**Do not fix in Phase 2** — this is metadata-only scope.

---

## Verification Notes (all passed — no findings)

The following checks passed cleanly and generated no findings; noted here so the orchestrator has a clear record of coverage:

- **String-prop safety:** Every new `title` and `description` is a plain double-quoted literal with no template interpolation, no user input, no JSX expression containers. Zero injection surface.
- **H1 uniqueness:** All 10 H1s are now unique across the service pages (verified against `02-COPY-APPROVED.md` and via diff).
- **H2 uniqueness:** All 10 first-content H2s are now unique across the service pages (verified against `02-COPY-APPROVED.md` and via diff).
- **Old duplicate title removed:** The "BEST Roofer in Columbus – if you're looking for Honest Roofing Services near me..." string no longer appears in any of the 10 files.
- **Canonical URLs unchanged:** Every `canonical={\`${CANONICAL_DOMAIN}/services/<slug>\`}` is byte-identical to the pre-Phase-2 state.
- **Keywords unchanged:** Phase 2 scope does not modify `keywords`, and diff confirms none were touched.
- **No content body edits:** All paragraph text, testimonials, FAQ blocks, and service lists are byte-identical to the pre-Phase-2 state per `git diff`.
- **No URL changes:** No `to=`, `href=`, or route path strings were modified.
- **No NAP changes:** Phone number `614-971-6028` appears identically across all files; no business name or address edits.
- **SchemaMarkup unchanged:** `RoofReplacement.tsx` is the only file with `SchemaMarkup`, and its props are byte-identical to the pre-Phase-2 state. The H1 edit does not affect schema.
- **Sitemap lastmod consistency:** All 10 service URLs that were actually edited in Phase 2 have `<lastmod>2026-04-09</lastmod>`; `/services/roof-repair` correctly retained its pre-existing `lastmod` (RoofRepair deferred per `deferred-items.md`).
- **Prerender script META-02 fix:** The new `replace` call targets only the build-time template and runs inside the post-build script — no runtime code path, no client-side exposure, no new dependency surface.
- **No new dependencies:** `package.json` is untouched (not in diff).
- **No TypeScript changes:** No new types, interfaces, `any`, or type assertions introduced.
- **No pre-existing lint errors worsened:** The deferred items in `deferred-items.md` (e.g., `EmergencyServices.tsx:2:23 ArrowRight unused`) are untouched by Phase 2 edits — the diff shows only metadata strings, not imports.

---

_Reviewed: 2026-04-09T10:15:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
