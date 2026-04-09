---
phase: 02-service-pages-metadata
fix_date: 2026-04-09T10:45:00Z
iteration: 1
fix_scope: critical_warning
review_path: .planning/phases/02-service-pages-metadata/02-REVIEW.md
findings_in_scope: 1
fixed: 1
skipped: 4
status: all_fixed
---

# Phase 2: Code Review Fix Report

**Fixed at:** 2026-04-09T10:45:00Z
**Source review:** `.planning/phases/02-service-pages-metadata/02-REVIEW.md`
**Iteration:** 1
**Fix scope:** `critical_warning` (Critical + Warning only; Info findings skipped)

## Summary

- Findings in source review: 5 (0 Critical, 1 Warning, 4 Info)
- Findings in scope (`critical_warning`): 1
- Fixed: 1
- Skipped: 4 (all Info-level, out of scope)
- Status: **all_fixed** — every in-scope finding was successfully fixed and committed.

## Fixed Issues

### WR-01: `set -u` + unset associative-array lookup can crash verify script before it reports failures

**Files modified:** `scripts/verify-phase-02.sh`
**Commit:** `cca4f26`
**Applied fix:**
1. Added a shebang-area comment documenting the bash 4+ requirement (`declare -A`) and the `brew install bash` hint for macOS contributors (line 5).
2. Inside the per-slug loop, before the associative-array lookup, added a guard using the `${MAP[$key]+x}` expansion pattern. If the slug has no matching `EXPECTED_TITLES` entry, the script now prints `FAIL [$slug]: no expected title defined in EXPECTED_TITLES (script bug)`, increments `FAIL`, and `continue`s — instead of crashing under `set -u` with a cryptic `unbound variable` error before the failure counter logic runs.
3. Left the existing `expected="${EXPECTED_TITLES[$slug]}"` assignment in place immediately after the guard (now safe, since the guard has already confirmed the key exists).

**Verification:**
- Tier 1: Re-read modified file — guard and comment are present, surrounding code intact.
- Tier 2: `bash -n scripts/verify-phase-02.sh` → `SYNTAX OK` (no parse errors).
- Extra sanity test: constructed a minimal `set -euo pipefail` + `declare -A` + `${MAP[$slug]+x}` reproducer with a missing key — guard branch fired correctly (`GUARD WORKED`), confirming the pattern handles the exact failure mode WR-01 describes.

## Skipped Issues

All skipped findings are Info-level and explicitly out of scope for this `critical_warning` run. No code change was attempted for any of them. They remain documented in `02-REVIEW.md` and can be revisited by running the fix command with `fix_scope: all` or folded into a future hygiene phase.

### IN-01: Verify script greps for escaped `&amp;` — add dist/ existence sanity check

**File:** `scripts/verify-phase-02.sh:14,18,20`
**Reason skipped:** Info-level, out of `critical_warning` scope.
**Original issue:** The expected-titles table correctly HTML-escapes `&` → `&amp;` for SSR output. Reviewer suggested adding a `[[ ! -d dist ]]` guard at the top of the script to produce a clearer error if someone forgets to run `npm run build` first. Optional quality-of-life improvement only, not a correctness issue.

### IN-02: `prerender.mjs` path normalization uses sequential `replace` for Windows/POSIX separators

**File:** `scripts/prerender.mjs:51`
**Reason skipped:** Info-level, out of `critical_warning` scope.
**Original issue:** `outFile.replace(ROOT + '\\', '').replace(ROOT + '/', '')` is pre-existing (not introduced by Phase 2) and functionally correct on every platform — just slightly inelegant. Reviewer suggested `path.relative(ROOT, outFile)` as a cleaner single-call alternative. No bug; style-only observation.

### IN-03: Helmet `<meta name="description">` strip regex assumes fixed attribute order

**File:** `scripts/prerender.mjs:38`
**Reason skipped:** Info-level, out of `critical_warning` scope.
**Original issue:** The new `page.replace(/<meta name="description"[^>]*>/i, '')` line only matches `<meta name="description" ...>` with the `name` attribute first. If the template ever reorders attributes (e.g., `<meta content="..." name="description">`), the strip will silently no-op. Reviewer explicitly noted this matches the existing `<title>` strip pattern and suggested only a clarifying code comment — no behavior change needed for Phase 2 since `index.html` already matches the regex.

### IN-04: Pre-existing dynamic Tailwind classes in `PreventativeMaintenance.tsx`

**File:** `src/pages/services/PreventativeMaintenance.tsx:227`
**Reason skipped:** Info-level, out of `critical_warning` scope. **Also pre-existing** — not introduced by Phase 2, which is metadata-only.
**Original issue:** The ROI grid interpolates dynamic Tailwind class names (`bg-${option.color}-50`, `border-${option.color}-200`). Tailwind JIT cannot statically discover these, so the colored backgrounds only render if the classes happen to be safelisted or used elsewhere. Reviewer explicitly marked this as "Do not fix in Phase 2 — this is metadata-only scope" and recommended moving it to a hygiene backlog alongside items in `deferred-items.md`.

---

_Fixed: 2026-04-09T10:45:00Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
