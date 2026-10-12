# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.1 — Per-Page SEO Metadata Overhaul

**Shipped:** 2026-04-10 (closed in GSD 2026-10-12)
**Phases:** 5 | **Plans:** 10 | **Sessions:** not tracked (work ran 2026-04-08 → 2026-04-10, 67 commits in that window; 37 source/public/script files changed, +549/-146)

### What Was Built
- Unique `<title>` and `<meta description>` on all 35 sitemap URLs (34 unique titles plus one known ServicePageTemplate duplicate at ship time; 35 unique descriptions), verified by `scripts/verify-phase-05.sh` against the prerendered output
- H1/H2 rewrite on 10 service pages and 13 location pages to `primary service + city` / `secondary services + city`, sourced from competitor GBP research (8 firms, 15 city-competitor assignments, `.planning/research/v1.1-gbp-competitors.md`)
- `/blog` SSR fix: removed the early-return loading guard so the prerendered page ships a real title and H1
- Superlative removal across metadata and headings (META-05)
- `scripts/prerender.mjs` description-strip so helmet's description is the only one in dist HTML
- Batch verification scripts per phase (`verify-phase-02.sh`, `verify-phase-03.sh`, `verify-phase-05.sh/.mjs`); technical SEO health 9.4/10 at ship

### What Worked
- Diagnosis first (Phase 1) found one root cause and a per-page fix strategy before any copy was written
- The draft → user approval → frozen packet → mechanical per-page commits gate made 29 pages of copy changes reviewable and reversible, with atomic commits per page
- Verification scripts as hard gates caught the duplicate template description and the blog regression before deploy
- Research artifacts (GBP competitor inventory) were reused across three phases

### What Was Inefficient
- Plan 04-01 finished on 2026-04-09 but no SUMMARY.md was written and 04-UAT.md was left at `status: testing`; `/gsd:progress` reported 90% for six months until the paperwork was closed on 2026-10-12
- The milestone audit ran mid-milestone (2026-04-09, Phases 4-5 not started) and was never re-run, so it read `gaps_found` at close despite Phase 5's full verification pass
- Phase summaries use three different frontmatter shapes, so `summary-extract` returns no one-liner for 9 of 10 plans and the auto-generated MILESTONES.md entry had a single accomplishment
- A later out-of-phase commit (b9a514f, 2026-06-06, "Title/meta refinements") rewrote all 13 approved location descriptions without the approval gate; 10 of 13 dropped under the 140-char floor. Accepted after the fact on 2026-10-12
- The git tag `v1.1` had already been used on 2026-03-21 for an unrelated Home carousel change, so the milestone could not be tagged with its own version

### Patterns Established
- Copy approval gate: `XX-COPY-DRAFTS.md` → user approval → `XX-COPY-APPROVED.md` frozen with `approved_at`/`approved_by` → per-page commits
- Per-phase verification script committed under `scripts/` and run as the done-gate
- Prerendered dist HTML is one line: count with `grep -o … | wc -l`, never `grep -c`
- Build is the verification gate; `typecheck`/`lint` are known red and not gates

### Key Lessons
1. Write the SUMMARY.md and close the UAT in the same session the work ships. Retroactive paperwork cost more than the original work.
2. Run `/gsd:audit-milestone` after the last phase, not during. A mid-milestone audit goes stale and blocks the close.
3. Any title/description/H1/H2 edit, even a "refinement", goes through the copy gate. The one that did not left no rationale behind.
4. Reserve `vX.Y` git tags for GSD milestones. Tag feature work with descriptive names.
5. Standardize summary frontmatter (`one_liner`, `status: complete`) so the tooling can read it.

### Cost Observations
- Model mix: not tracked (config: planner opus, executor opus, checker/verifier sonnet)
- Sessions: not tracked
- Notable: the whole milestone shipped in three calendar days; the close took six months because bookkeeping was never finished

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | n/a | 4 | Phase-based GSD with per-phase STATE.md; phases archived to `milestones/v1.0-phases/` |
| v1.1 | n/a | 5 | Copy approval gate per batch; verification scripts as gates; mid-milestone audit (went stale) |

### Cumulative Quality

| Milestone | Tests | Coverage | Zero-Dep Additions |
|-----------|-------|----------|-------------------|
| v1.0 | none (manual + schema validation) | n/a | SVG service area map, LocationBreadcrumb, NearbyAreas |
| v1.1 | 3 verification scripts (`verify-phase-02/03/05`) | 35/35 URLs checked | none needed |
| post-v1.1 quick tasks | `verify-schema` (41 routes), `verify-links` (42 pages) | all prerendered routes | RouteErrorBoundary, chunk reload handler |

### Top Lessons (Verified Across Milestones)

1. Verification scripts committed to the repo outlive the session and keep catching regressions (v1.1 scripts caught b9a514f's effect only because the live check was re-run at close; a description-length check belongs in `verify-schema` or a sibling).
2. Centralizing data (locations.ts in v1.0, SERVICES/LOCATIONS SSOT and single `#business` entity post-v1.1) repeatedly removed whole classes of drift.
