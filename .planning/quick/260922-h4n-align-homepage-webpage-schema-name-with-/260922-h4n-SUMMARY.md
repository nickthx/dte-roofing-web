---
phase: quick-260922-h4n
plan: 01
subsystem: seo-schema
tags: [seo, json-ld, schema-org, homepage]
requires:
  - src/components/SchemaMarkup.tsx (generateWebPageSchema)
provides:
  - Homepage WebPage JSON-LD `name` consistent with the `<title>` tag
affects:
  - src/pages/Home.tsx
tech-stack:
  added: []
  patterns:
    - "SchemaMarkup `pageTitle` prop is the single source for WebPage `name`; keep it character-identical to the SEO `title` prop"
key-files:
  created: []
  modified:
    - src/pages/Home.tsx
decisions:
  - "Verification gate 4 was corrected at runtime: react-helmet emits `<title data-rh=\"true\">`, so the plan's literal `<title>...` grep could never match. Used `<title[^>]*>` instead. No code change resulted."
  - "Reverted build-induced line-ending churn in public/sitemap.xml (LF→CRLF, zero content diff) to keep the commit scoped to one line."
metrics:
  duration: ~4min
  tasks: 1
  files: 1
  completed: 2026-09-22
---

# Quick Task 260922-h4n: Align Homepage WebPage Schema Name With Title Tag Summary

Replaced the homepage `SchemaMarkup` `pageTitle` prop with the exact `<title>` string so the WebPage JSON-LD `name`, `<title>`, and `og:title` all emit one identical page-title signal.

## What Was Done

**Task 1 — Match SchemaMarkup pageTitle to the SEO title** (commit `5d46b54`)

Single-line change at `src/pages/Home.tsx:32`:

- Before: `pageTitle="DTE Roofing - Columbus's Highest-Rated Roofing Contractor"`
- After: `pageTitle="Roof Repair and Replacement in Columbus, OH | DTE Roofing"`

`pageDescription`, `pageUrl`, and `type` were untouched, as were all `<SEO>` props. `src/components/SchemaMarkup.tsx` needed no change — `generateWebPageSchema()` already maps `pageTitle` straight to `name`, and `generateBreadcrumbSchema()` early-returns `null` for `type === 'home'`, so no breadcrumb or LocalBusiness field was affected.

## Verification

Gate is `npm run build` only (`typecheck`/`lint` are pre-existing red in this repo and were not run).

| Gate | Expected | Actual |
|------|----------|--------|
| `npm run build` | exit 0 | exit 0, 41 routes prerendered |
| `grep -o '"name":"Roof Repair and Replacement in Columbus, OH \| DTE Roofing"' dist/index.html \| wc -l` | `1` | `1` |
| `grep -c "Highest-Rated" dist/index.html` | `0` | `0` |
| `<title>` tag intact | one match | `<title data-rh="true">Roof Repair and Replacement in Columbus, OH \| DTE Roofing</title>` |
| `git diff --stat src/pages/Home.tsx` | 1 file, 1+/1- | 1 file, 1 insertion(+), 1 deletion(-) |

Additional confirmations from the prerendered `dist/index.html`:

- `og:title` unchanged: `content="Roof Repair and Replacement in Columbus, OH | DTE Roofing"`
- WebPage `description` unchanged: `"Founded by two brothers from Hilliard, Ohio. Honest inspections, precision repairs, and a perfect 114 five-star rating."`
- Emitted WebPage node: `{"@type":"WebPage","@id":"https://www.dteroofingllc.com/#webpage","url":"https://www.dteroofingllc.com/","name":"Roof Repair and Replacement in Columbus, OH | DTE Roofing", ...}`

## Deviations from Plan

No code deviations. Two process notes:

**1. Verification expression corrected (not a code change)**

- **Found during:** Task 1 verification
- **Issue:** Plan gate 4 greps for the literal `<title>Roof Repair...</title>`. react-helmet emits `<title data-rh="true">`, so that grep returns nothing regardless of correctness — a false-negative gate, not a regression.
- **Resolution:** Re-ran as `grep -o '<title[^>]*>[^<]*</title>'`, which confirmed the title is intact and unchanged.

**2. Build side-effect reverted**

- **Found during:** pre-commit `git status`
- **Issue:** `npm run build` rewrote `public/sitemap.xml`, marking it modified. `git diff` showed zero content change — pure LF→CRLF line-ending churn.
- **Resolution:** `git checkout -- public/sitemap.xml`. The commit contains only `src/pages/Home.tsx`.

## Known Stubs

None.

## Threat Flags

None. The change is a static string literal in a JSON-LD `name` field — no new network surface, auth path, file access, or schema at a trust boundary.

## Deployment Status

NOT pushed. Per project convention, a push to `main` is a live production deploy, so this awaits user review. Post-deploy check: re-run Google Rich Results on `https://www.dteroofingllc.com/` and confirm the WebPage `name` reads "Roof Repair and Replacement in Columbus, OH | DTE Roofing".

## Self-Check: PASSED

- `src/pages/Home.tsx` — FOUND, contains `pageTitle="Roof Repair and Replacement in Columbus, OH | DTE Roofing"`
- Commit `5d46b54` — FOUND in `git log`
- Post-commit deletion check — no files deleted
- Untracked files after commit — none
