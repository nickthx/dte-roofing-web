---
phase: quick-260727-fji
plan: 01
subsystem: reviews-page
tags: [seo, outbound-links, google-business-profile, bugfix]
requires: []
provides:
  - "Working 'Leave Us a Review' CTA on /reviews pointing at Google's writereview dialog"
affects:
  - src/pages/Reviews.tsx
tech-stack:
  added: []
  patterns:
    - "Hardcoded literal outbound URL on a Google-owned host (no state interpolation)"
key-files:
  created: []
  modified:
    - src/pages/Reviews.tsx
decisions:
  - "Used search.google.com/local/writereview?placeid=<PLACE_ID> over a regenerated g.page short code — canonical, non-obfuscated, and independently verifiable against the place ID"
  - "Reverted the build's incidental public/sitemap.xml lastmod churn to keep the commit atomic (unrelated pages, pre-existing drift)"
metrics:
  duration: ~4min
  tasks: 1
  files: 1
  completed: 2026-07-27
---

# Quick Task 260727-fji: Fix Broken "Leave Us a Review" Link Summary

Replaced the unresolvable `g.page/r/CUPMfU2NGh3dEBM/review` short code on `/reviews` with Google's canonical `search.google.com/local/writereview?placeid=ChIJvyCPVMOXOIgRQ898TY2hHd0`, so the review CTA reaches DTE Roofing's write-a-review dialog instead of silently redirecting to the Google homepage.

## What Was Built

One `href` value changed in `src/pages/Reviews.tsx` (line 226) — the second anchor in the "Google Reviews CTA Section", whose visible text is "Leave Us a Review".

The broken short code base64-decoded to CID `0xdd1d1a8d4d7dcc43`, which has transposed characters relative to the business's real CID `0xdd1da18d4d7ccf43`. That real CID is present in the working Maps link on line 216 of the same file (ftid `0x883897c3548f20bf:0xdd1da18d4d7ccf43`), which was the source of truth the place ID was derived from during planning. Google could not resolve the malformed CID and fell back to its homepage, meaning every customer who clicked the CTA landed nowhere — directly suppressing review velocity, an already-flagged concern in the GBP audit baseline.

Everything else on the anchor is byte-for-byte unchanged: `target="_blank"`, `rel="noopener noreferrer"`, the full `className` string, the "Leave Us a Review" text, and the `<MessageCircle className="ml-2 w-5 h-5" />` icon. The adjacent "Read All {totalReviews} Google Reviews" Maps link on line 216 was not touched.

## Key Implementation Details

The diff is exactly one line — a pure outbound-href correction. No content, copy, URL/slug, or NAP change, satisfying the project's content-freeze constraints in CLAUDE.md.

## Verification

| Check | Result |
|-------|--------|
| `search.google.com/local/writereview?placeid=ChIJvyCPVMOXOIgRQ898TY2hHd0` in `src/pages/Reviews.tsx` | 1 occurrence (line 226) |
| `g.page` anywhere under `src/` | 0 occurrences |
| Maps ftid `0x883897c3548f20bf:0xdd1da18d4d7ccf43` still present | Present, unchanged |
| `npm run build` | Clean — 41 routes prerendered through `dist/404.html` |
| `grep -o 'search.google.com/local/writereview' dist/reviews/index.html \| wc -l` | 1 |
| `grep -o 'g.page' dist/reviews/index.html \| wc -l` | 0 |

Per project memory, `npm run typecheck` and `npm run lint` are pre-existing red and were not treated as gates.

## Deviations from Plan

None affecting the code change — the plan executed exactly as written.

One out-of-scope working-tree observation, handled without modifying the plan's intent:

**[Scope boundary] Reverted incidental `public/sitemap.xml` churn**
- **Found during:** Task 1, post-build `git status`
- **Issue:** `npm run build` regenerated `public/sitemap.xml`, flipping 12 `lastmod` values from `2026-06-06` to `2026-06-30` on unrelated routes (`/faq`, `/locations/hilliard`, `/locations/dublin`, and others). The generator derives dates from git history, so this is pre-existing drift left over from the 2026-06-30 commits — not a consequence of this task's one-line change.
- **Action:** Reverted via `git checkout -- public/sitemap.xml` so the commit stays atomic to the review-link fix.
- **Deferred:** A sitemap refresh (`npm run generate-sitemap`) is worth running as its own task before the next deploy. Note that once this commit lands, `/reviews` will itself become stale in the sitemap.

## Threat Model Compliance

| Threat ID | Disposition | Status |
|-----------|-------------|--------|
| T-fji-01 (Tampering — anchor destination) | mitigate | Satisfied: destination is a hardcoded literal on `search.google.com`, no interpolation or state-derived query params |
| T-fji-02 (Info disclosure — reverse tabnabbing / referrer leak) | mitigate | Satisfied: `rel="noopener noreferrer"` preserved verbatim |
| T-fji-SC (Supply chain) | accept | No dependency changes; nothing installed |

No new security-relevant surface introduced.

## Known Stubs

None.

## Commits

| Hash | Message |
|------|---------|
| 4767b63 | fix(quick-260727-fji): repair broken "Leave Us a Review" link on /reviews |

## Follow-Up Note

The fix is verified structurally and at build time. End-to-end confirmation that the link opens the correct business's review dialog requires a signed-in browser click on the deployed page — worth a quick manual check after deploy, since a wrong-but-resolvable place ID would fail silently in exactly the same way the original bug did.

## Self-Check: PASSED

- `src/pages/Reviews.tsx` — FOUND, contains the corrected href at line 226
- Commit `4767b63` — FOUND in git log
- Prerendered `dist/reviews/index.html` — contains corrected link, zero `g.page` references
