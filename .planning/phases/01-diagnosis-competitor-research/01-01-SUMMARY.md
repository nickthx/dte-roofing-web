---
phase: 01-diagnosis-competitor-research
plan: 01-01
subsystem: seo-metadata-diagnosis
tags: [seo, diagnosis, research, prerender, helmet, blog, metadata]
requires: []
provides: [diagnosis-research-md, fix-strategy-s3, per-phase-action-checklist]
affects: [phase-02-metadata-fixes, phase-03-blog-ssr-fix, phase-04-cleanup]
tech-stack:
  added: []
  patterns: [classification-table, root-cause-analysis]
key-files:
  created:
    - .planning/phases/01-diagnosis-competitor-research/RESEARCH.md
  modified: []
decisions:
  - "Classify all 35 sitemap pages A/B/C/D/E to scope per-phase edit lists"
  - "Select fix strategy S3 (Hybrid) over S1 and S2 because the duplicate title is copy-paste proliferation (no default to fix) and the /blog bug is structural (JSX guard ordering, not string replacement)"
  - "Diagnose BlogPost.tsx as Class E alongside Blog.tsx (same early-return bug plus dynamic-data SSR issue requiring a static fallback title)"
  - "Reclassify Financing and Locations as Class A after direct source inspection (prior draft marked them B?)"
  - "Flag GutterServices.tsx as orphan code (301'd at edge via vercel.json) and recommend deletion in Phase 2"
metrics:
  duration_min: 8
  tasks_total: 5
  tasks_completed: 5
  files_created: 1
  files_modified: 0
  commits: 1
  completed_date: "2026-04-08"
---

# Phase 1 Plan 01: Root-Cause Diagnosis — Duplicate Metadata & /blog SSR Summary

**One-liner:** Diagnosed the v1.1 per-page metadata failure as 20 hardcoded copies of a 166-char title (not a default fallback) plus a prerender-time JSX guard bug in `Blog.tsx`/`BlogPost.tsx` that lets `index.html:12`'s static description bleed through — selected S3 Hybrid fix strategy across Phase 2/3/4.

## Objective

Identify the exact code path causing 21 pages to share the same 166-char default title, 35 pages to share the homepage meta description, and `/blog` to ship empty `<title>` and `<h1>` in prerendered HTML — and produce a per-phase action checklist for v1.1 Phase 2/3/4 executors.

## Tasks Completed

| # | Task | Outcome |
|---|---|---|
| 1 | Inventory `<SEO>` usage across all 35 sitemap pages | Full classification table: 16 Class A, 17 Class B, 1 Class D, 1 Class E |
| 2 | Locate the 166-char title fallback source | Confirmed **no default exists** — hardcoded in 20 source locations (19 inline + 1 template) |
| 3 | Locate the 197-char description fallback source | Confirmed single source: `index.html:12` static `<meta name="description">` |
| 4 | Diagnose `/blog` empty head root cause | `Blog.tsx:44` `if (loading) return` early return fires before `<SEO>` during SSR; `BlogPost.tsx:56` has same bug + dynamic template literal over `post?.title` |
| 5 | Write RESEARCH.md with fix strategy | S3 Hybrid selected with explicit rationale vs S1/S2, per-phase action checklist, impact map with risk ratings |

## Key Findings

### Root Causes

1. **Duplicate titles = copy-paste proliferation, not defaulting.** `src/components/SEO.tsx` has zero default props — `title` is a required prop and the component renders exactly what it receives. The 166-char `"BEST Roofer in Columbus – if you're looking for..."` string is literally hardcoded in 20 source locations (19 inline `<SEO>` calls + `ServicePageTemplate.tsx:71`). There is no single-point fix for the title duplication — it requires 19 per-page edits plus one template refactor.

2. **Description bleed-through is narrow, not universal.** The 197-char `"DTE Roofing - Professional... Licensed, bonded & insured. Free estimates."` exists in exactly one place: `index.html:12`. It only bleeds through to pages where react-helmet-async fails to emit a `<meta name="description" data-rh="true">` override. That happens for `/blog` and `/blog/:slug` (the two Class E pages). The other 33 sitemap pages all pass unique `description` props and their prerendered HTML is already correct. The v1.1 audit's "all 35 share homepage description" finding likely reflects only the Blog routes; Phase 2 executor should re-run the audit against `dist/**/index.html` to quantify the actual before/after delta.

3. **`/blog` is an SSR ordering bug, not a metadata bug.** `Blog.tsx:44` places an `if (loading) return <Spinner/>` early return BEFORE any `<SEO>` or `<h1>` render. `useEffect` doesn't run during prerender → `loading` stays `true` → component returns spinner JSX with no head metadata → Helmet emits nothing → `index.html`'s static title and description ship unchanged. `BlogPost.tsx:56` has the identical bug plus a layered second problem: even if the early return were removed, its title `{\`\${post.title} | DTE Roofing Blog\`}` would render as `" | DTE Roofing Blog"` during prerender because `post` is `null`.

### Classification Summary (35 sitemap pages)

| Class | Count | Description |
|---|---|---|
| **A** — unique title + description | **16** | Home, Financing, Locations hub, 13 location subpages |
| **B** — inline `<SEO>`, duplicate 166-char title, unique description | **17** | About, Contact, Services, Reviews, Gallery, FAQ, InstantQuote + 10 service subpages (excluding RoofRepair) |
| **C** — no `<SEO>` | **0** | None |
| **D** — template hardcodes duplicate title | **1** | RoofRepair.tsx (via `ServicePageTemplate.tsx:71`) |
| **E** — async-loading SSR edge case | **1** | Blog.tsx (+ BlogPost.tsx as non-sitemap dynamic route) |

### Fix Strategy: S3 Hybrid

Selected because:
- S1 (single-point fix) is impossible — there is no default to fix
- S2 (pure per-page edits) is necessary for titles but doesn't address the structural `/blog` bug or the template-driven `RoofRepair` case
- S3 combines both: 19 per-page title replacements + 3 targeted structural fixes (`ServicePageTemplate.tsx`, `Blog.tsx`, `BlogPost.tsx`)

Per-phase breakdown:
- **Phase 2:** Replace 19 hardcoded titles (18 sitemap files + 1 orphan) after user-approved copy draft
- **Phase 3a:** Refactor `ServicePageTemplate.tsx` to accept `title` as a required prop; update `RoofRepair.tsx` caller
- **Phase 3b:** Restructure `Blog.tsx` and `BlogPost.tsx` to render SEO+hero above the loading guard; add static fallback title for BlogPost dynamic route
- **Phase 4:** Optional cleanup of `index.html:12` static description; full dist-level sitemap audit to verify 35 unique titles + descriptions

## Files Created

| File | Lines | Purpose |
|---|---|---|
| `.planning/phases/01-diagnosis-competitor-research/RESEARCH.md` | 346 | Complete diagnosis with classification table, source-code traces for both defaults, /blog root cause with proposed fix, S3 fix strategy, per-phase action checklist, impact map |

## Files Modified

None. This is a diagnosis-only plan — zero source code changes per plan constraints.

## Commits

| Hash | Message | Files |
|---|---|---|
| `5a169c9` | `docs(260408-p1): diagnose duplicate metadata + /blog SSR root causes` | `RESEARCH.md` |

## Deviations from Plan

None. Plan executed exactly as written:
- Task 1: Inventory completed via `Grep` on `BEST Roofer in Columbus` + direct `Read` of 4 edge-case files (Financing, Locations, RoofRepair, BlogPost) for verification.
- Task 2: `Grep` confirmed 20 source locations; no defaults found in SEO.tsx.
- Task 3: `Grep` for `Licensed, bonded` confirmed single source at `index.html:12`.
- Task 4: Read `Blog.tsx` and `BlogPost.tsx` directly; confirmed identical early-return pattern and diagnosed BlogPost's additional dynamic-data failure mode.
- Task 5: RESEARCH.md written with all 6 required sections (classification table, title source, description source, /blog diagnosis, fix strategy, impact map).

### Accuracy improvements over prior RESEARCH.md draft

The prior version of RESEARCH.md (committed at `3a183a7`) had these gaps that this pass corrected:
- Financing.tsx and Locations.tsx were marked `B?` (unverified) — now both confirmed as **Class A** via direct source inspection
- Count was "14 Class A" — corrected to **16 Class A** after including Financing and Locations hub
- BlogPost.tsx was not classified — now identified as a second Class E page with a layered bug (early-return + dynamic template literal over undefined `post`)
- GutterServices.tsx orphan status (301'd at `vercel.json:9`) was not called out — now flagged with deletion recommendation for Phase 2
- App.tsx route inventory was not cross-referenced — now used to confirm exactly 35 canonical sitemap URLs vs non-sitemap code paths (dynamic blog route, 301 orphans, Navigate redirects)

## Authentication Gates

None. Pure diagnosis work.

## Deferred Issues

None. All tasks in-scope were completed.

## Known Stubs

None. No code was written.

## Verification

- [x] All 35 sitemap pages classified A/B/C/D/E (16A + 17B + 1D + 1E)
- [x] 166-char title fallback source located (file + line) — 20 locations enumerated
- [x] 197-char description fallback source located (file + line) — `index.html:12`
- [x] `/blog` empty-head root cause named — `Blog.tsx:44` early return + `BlogPost.tsx:56` same bug + dynamic title
- [x] Fix strategy (S1/S2/S3) selected with rationale — **S3 Hybrid**
- [x] RESEARCH.md committed — commit `5a169c9`
- [x] Phase 2/3/4 have actionable checklists in RESEARCH.md

## Self-Check: PASSED

- RESEARCH.md exists at `.planning/phases/01-diagnosis-competitor-research/RESEARCH.md` (346 lines)
- Commit `5a169c9` present in `git log` with prescribed message
- Zero source code modifications (verified via `git status` before commit showed only the single `RESEARCH.md` change)
