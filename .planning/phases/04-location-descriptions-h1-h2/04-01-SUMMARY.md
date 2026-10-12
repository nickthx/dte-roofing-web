---
phase: 04-location-descriptions-h1-h2
plan: 01
subsystem: seo
tags: [metadata, copywriting, approval-gate, locations]

requires:
  - phase: 01-diagnosis-competitor-research
    provides: per-city GBP secondary-service mapping (.planning/research/v1.1-gbp-competitors.md)
provides:
  - 04-COPY-DRAFTS.md — audit of current title/description/H1/H2 per location file plus 13 drafts
  - 04-COPY-APPROVED.md — frozen, user-approved packet; source of truth for plan 04-02
affects: [04-02 application, location pages, local SEO]

tech-stack:
  added: []
  patterns: [draft -> human approval gate -> freeze -> mechanical apply (mirrors 02-01 and 03-01)]

key-files:
  created:
    - .planning/phases/04-location-descriptions-h1-h2/04-COPY-DRAFTS.md
    - .planning/phases/04-location-descriptions-h1-h2/04-COPY-APPROVED.md
  modified: []

key-decisions:
  - "Titles on the 13 location pages kept as-is (already unique from v1.0); scope limited to description + H1 + H2"
  - "H1 standardized to `Roof Repair & Replacement in {City}, OH`; H2 to `{Secondary services} in {City}` sourced from per-city GBP research"
  - "Descriptions targeted at 160-180 chars inside the 140-200 envelope; zero superlatives; NAP verbatim where referenced"

patterns-established:
  - "Approval gate: no source edits until the packet carries approved_at + approved_by and is frozen in git"

requirements-completed: [META-02, META-04, META-05, HEAD-01, HEAD-03]

duration: retroactive
completed: 2026-04-09
status: complete
retroactive: true
---

# Phase 04 Plan 01: Location Pages Copy Drafting + Approval Gate Summary

**Drafted and user-approved unique descriptions, H1s and H2s for all 13 location pages, frozen in 04-COPY-APPROVED.md on 2026-04-09 and applied verbatim by plan 04-02.**

## Retroactive note

Written 2026-10-12. The work finished on 2026-04-09 (commit `2e57cfe`) but no SUMMARY.md was produced, so Phase 4 kept reading as 1 of 2 plans in `/gsd:progress`. This file records what the artifacts and git history show. It adds no new work.

## Accomplishments

- Tasks 1-4: audited current title/description/H1/H2 per file (line numbers recorded), mapped per-city secondary services from the GBP research, drafted all 13 pages, and ticked every item on the self-review checklist (see "Self-Review Checklist" in 04-COPY-APPROVED.md).
- Task 5: human approval checkpoint passed. Frontmatter of 04-COPY-APPROVED.md: `approved_at: 2026-04-09T23:41:04Z`, `approved_by: user`, `pages: 13`, `scope: descriptions + H1 + H2 (titles kept)`.
- Task 6: packet frozen in commit `2e57cfe` "docs(04-01): freeze approved location metadata copy" (2 files, 652 insertions).
- Downstream: plan 04-02 applied the packet in 13 per-page commits (`fb6e747` onward; see 04-02-SUMMARY.md).

## Verification (2026-10-12, live www.dteroofingllc.com)

- All 13 H1s match `Roof Repair & Replacement in {City}, OH`.
- All 13 carry a city-specific secondary-services H2.
- 13 unique meta descriptions, zero superlatives.
- Descriptions no longer match the approved packet. Commit `b9a514f` (2026-06-06, "feat(seo): add FAQPage schema and expand service page content") rewrote all 13 to 127-152 chars; 10 of 13 are below the 140-char floor this plan set. Recorded in 04-UAT.md as a gap for the user to accept or re-open.

## Deviations

- No SUMMARY.md written at the time; this file closes that gap.
- The later description rewrite (`b9a514f`) bypassed the approval gate this plan established.
