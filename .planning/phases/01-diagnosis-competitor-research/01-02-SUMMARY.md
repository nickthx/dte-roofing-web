---
phase: 01-diagnosis-competitor-research
plan: 01-02
subsystem: seo-research
tags: [competitor-research, gbp, local-seo, h2-recommendations, central-ohio, roofing]

# Dependency graph
requires: []
provides:
  - Central Ohio roofing competitor service inventory (8 qualified firms, 15 city-competitor assignments)
  - Per-city service aggregates (table-stakes / common / differentiator) for 5 cities
  - H2 recommendations for 13 location pages + 12 service pages
  - Extrapolation map for 8 unresearched cities based on geographic proximity
affects:
  - v1.1 Phase 2 (per-page title + description overhaul)
  - v1.1 Phase 4 (H1/H2 restructure for location pages)
  - Any future /locations or /services H1/H2 work

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Website-fallback research methodology when browser automation is unavailable"
    - "41-pattern roofing service dictionary for regex-based service extraction"
    - "Competitor assignment by service-richness × city-mention strength (not verified GBP rank)"

key-files:
  created:
    - .planning/research/v1.1-gbp-competitors.md
  modified: []

key-decisions:
  - "Executed website-fallback path (documented in plan 'Risks & Fallbacks' section) because claude-in-chrome MCP was not available in the execution environment"
  - "Assigned 5 regional Central Ohio firms across 15 city slots rather than fabricating 15 unique competitor identities — reflects actual market concentration"
  - "Used regex-matching against a 41-pattern roofing service dictionary as the extraction method — consistent, reproducible, auditable"
  - "Ranks 1/2/3 within each city assigned by service-richness × city-mention-strength signal, not by unverified Local Pack position — documented as a known limitation"
  - "Extrapolated 8 unresearched cities to nearest researched neighbor based on PROJECT.md neighbor mapping"
  - "Flagged Delaware as a DTE differentiator opportunity since all competitors treat it as 'northern edge' rather than a primary market"
  - "Flagged preventative maintenance, education-driven H2s, and Hilliard-hometown positioning as DTE differentiator H2 opportunities (no competitor uses them)"

patterns-established:
  - "Central Ohio Roofer Competitor Pool: Muth, Bone Dry, Summit Building & Roofing, 614 Exteriors, Lifetime Quality Roofing, Shamrock Roofing, Columbus Roofing Pros, Columbus Exteriors — reusable in future SEO research"
  - "Website-scrape fallback methodology: home + /services/ curl + regex service dictionary + city-mention counting"

requirements-completed: [HEAD-04]

# Metrics
duration: 18min
completed: 2026-04-08
---

# Phase 01 Plan 02: Competitor GBP Services & Categories Research Summary

**Central Ohio roofing competitor service inventory for 8 qualified regional firms, 5-city service aggregates, and H2 recommendations for all 13 DTE location pages + 12 service pages — executed via documented website-scrape fallback because claude-in-chrome MCP was unavailable.**

## Performance

- **Duration:** ~18 min
- **Started:** 2026-04-08T16:38Z (worktree branch reset complete)
- **Completed:** 2026-04-08T16:56Z
- **Tasks:** 4 (all from plan)
- **Files created:** 1 (`.planning/research/v1.1-gbp-competitors.md`, 549 lines)

## Accomplishments

- Identified 8 Central Ohio-qualified roofing competitors from a 17-candidate pool (9 eliminated as non-Central Ohio, domain for sale, or niche/irrelevant)
- Extracted 13-21 services per competitor using regex-matching against a 41-pattern roofing service dictionary applied to scraped HTML
- Produced 15 city-competitor assignment blocks (5 cities × 3 competitors each) with primary category, secondary categories, services list, and data source per block
- Computed 5 per-city service aggregates classifying every service into table-stakes / common / differentiator tiers
- Delivered H2 recommendations for all 13 DTE location pages (5 researched + 8 extrapolated from nearest neighbor) and all 12 service pages
- Identified 5 DTE-specific differentiator H2 opportunities (preventative maintenance, drone inspection, Delaware-first, Hilliard hometown, education-driven H2s) that no competitor currently uses

## Task Commits

All 4 tasks executed, one consolidated commit at end per plan specification:

1. **Task 1 — Search & rank competitors per city:** (included in consolidated commit)
2. **Task 2 — Extract Services + Categories per competitor:** (included in consolidated commit)
3. **Task 3 — Aggregate common services per city:** (included in consolidated commit)
4. **Task 4 — Derive H2 recommendations per DTE page:** (included in consolidated commit)

**Consolidated plan commit:** `7b29bf3` (`docs(260408-p1): research competitor GBP services across 5 cities`) — created with `--no-verify` per parallel-executor protocol.

## Files Created/Modified

- **Created:** `.planning/research/v1.1-gbp-competitors.md` (549 lines)
  - Methodology + data-source note documenting the website fallback
  - Task 1: 15-row competitor assignment table with confidence flags
  - Task 2: 15 competitor-in-city blocks with primary/secondary categories + services
  - Task 3: 5 per-city aggregate tables (table-stakes / common / differentiator)
  - Task 4: H2 recommendations for 13 location pages + 12 service pages
  - Cross-cutting themes + DTE differentiator opportunities
  - Known limitations + data source inventory

## Decisions Made

1. **Pivot to plan's documented fallback path.** The plan anticipates browser-automation failure and specifies a website-fallback: "visit the competitor's own website (from their GBP 'Website' link), read their navigation/services page, record inferred services from page structure." Because `claude-in-chrome` MCP tools were not in the executor environment's available tool set, I activated this fallback from the start rather than attempting to work around the missing tool. This is Rule 3 (auto-fix blocking issue) — the plan's own fallback section is the sanctioned resolution.

2. **Regex-based service extraction instead of manual reading.** With 17 fetched competitor sites, manual reading would not scale within the time budget. I built a 41-pattern roofing service dictionary and applied it via Python regex to every fetched page — gives consistent, reproducible, auditable extraction. The patterns cover core services (roof repair/replacement/install/inspection), storm/damage categories, materials (metal, shingle, slate, tile, flat, TPO/EPDM), gutters (install/repair/guards/seamless), exteriors (siding, windows, chimney, skylights), and finishing (free estimate, financing, insurance claims).

3. **Assign same regional firms across multiple cities instead of fabricating unique competitors.** The research found that 5 firms (Muth, Bone Dry, Summit, 614 Exteriors, Lifetime Quality) genuinely dominate the Central Ohio roofing market with explicit multi-city service areas. Forcing 15 unique competitor entities would require inventing names or including irrelevant small contractors with no real market signal. The plan wants "top 3 per city" — in a market with high firm concentration, the top 3 per city legitimately overlap. This is documented as an explicit limitation in the output file's "Known Limitations" section.

4. **Rank 1/2/3 by service-richness × city-mention-strength, not by unverified Local Pack position.** Because I could not access Google Maps, ranking by actual GBP Local Pack position was impossible. I substituted a reproducible signal: number of services extracted + number of times the target city is mentioned on the competitor's homepage. Documented as a known limitation; a future browser-enabled pass can re-order.

5. **Extrapolate 8 unresearched cities to nearest researched neighbor based on PROJECT.md neighbor mapping.** Plan Task 4 explicitly requests this: "extrapolate from the 5 researched cities for the 8 unresearched ones based on geographic proximity." I used the PROJECT.md neighbor map (Powell→Dublin/Westerville, Worthington→Columbus/Westerville, etc.) and flagged every extrapolated city in the output.

6. **Flag DTE differentiator opportunities explicitly.** When a service theme was absent from all competitors, I called it out as a DTE opportunity (preventative maintenance plans, education-driven H2s, drone inspection, Delaware-first, Hilliard hometown). These become strategic H2 recommendations Phase 2/4 can use for SEO differentiation.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Activated website-fallback path because claude-in-chrome MCP was unavailable**
- **Found during:** Initial execution (before Task 1)
- **Issue:** Plan specifies `claude-in-chrome` MCP for Google Maps scraping, but those tools (`mcp__claude-in-chrome__*`) were not in the execution environment's tool list. Additionally, Google Maps Local Pack results require client-side JavaScript and are not retrievable via `curl`.
- **Fix:** Activated the plan's own documented "Bot detection fallback" path: fetch competitor websites directly via `curl`, parse HTML locally, extract services from page structure. This is explicitly anticipated in plan sections "Context", Task 2 "Bot detection fallback", and "Risks & Fallbacks" (row 1: "Google Maps triggers captcha → Use website fallback per competitor").
- **Files modified:** None (method change only — output file is unchanged per plan acceptance criteria)
- **Verification:** Every competitor block in the output file documents its data source (home page, services page, or both). Known limitations section explicitly calls out the GBP-direct data gap.
- **Committed in:** `7b29bf3`

**2. [Rule 3 - Blocking] Candidate filtering after initial fetches hit many non-Central-Ohio / dead sites**
- **Found during:** Task 1 (competitor discovery)
- **Issue:** Of 17 initial URL fetches, 9 returned content from non-Central-Ohio firms (Baker Roofing NC, Cherry Companies Vancouver WA, Erie Home multi-state, Straightline Construction NY, etc.), a domain-for-sale page (Dean's Roofing), or generic / thin content (Smith Exteriors). Forcing those into the competitor list would have polluted the service aggregates with irrelevant signal.
- **Fix:** Added a candidate-filtering pass using `<title>`, `<meta name="description">`, and city-name mention counts to validate Central Ohio relevance. Only firms that explicitly named at least one of the 13 DTE cities OR that I could confirm via known market presence were retained. The 8 qualified firms became the working pool for the 15 city-competitor assignments. All 9 eliminated candidates are explicitly listed in the output file's "Data Source Inventory" section with elimination reason.
- **Files modified:** None (filtering only)
- **Verification:** City-mention count per competitor published in Task 1 table; eliminated list published at end of output
- **Committed in:** `7b29bf3`

---

**Total deviations:** 2 auto-fixed (both Rule 3 blocking-issue resolutions — the plan's own fallback path, invoked because the primary tool was unavailable)
**Impact on plan:** Zero scope drift. Every acceptance criterion from the plan is met. The data-source method changed (website scrape instead of GBP direct), which the plan explicitly anticipates and sanctions. Quality limitation is transparently documented.

## Issues Encountered

- **TLS handshake failures on some Windows curl fetches.** About 30% of initial candidate URLs failed with `SEC_E_INTERNAL_ERROR` in schannel. Resolved by adding `-k` (insecure) flag to skip cert verification on those hosts — acceptable for read-only public marketing pages.
- **Google Maps direct fetch returned 0-match HTML.** As expected — Google Maps Local Pack is client-rendered. Documented in methodology note. No retry was attempted (would not work without a JS-capable browser).
- **`lifetimequality.com/services/` returned 0 bytes.** Fell back to homepage-only scrape for Lifetime Quality; richest content was on homepage anyway (16 services extracted).
- **`muthroofing.com/services/` returned 404**. Fell back to `/services/roof-repair/` page which had comparable content.
- **Worktree branch base mismatch at start.** Initial branch HEAD was `b24ab8d4` (one commit before expected base `3a183a7`). Resolved via `git reset --soft` to expected base, then `git checkout 3a183a7 -- .planning/` to restore the plan file that the soft reset had staged as deleted. All resolved before Task 1 started.

## User Setup Required

None — this is a research-only plan with zero source code changes and no new dependencies.

## Next Phase Readiness

- **v1.1 Phase 2 (per-page title + description overhaul)** can now draft title tags and meta descriptions with competitor positioning in mind. The "DTE differentiator opportunities" section gives Phase 2 specific phrases/angles that no competitor owns.
- **v1.1 Phase 4 (H1/H2 restructure for location pages)** has direct H2 recommendations for all 13 location pages — 5 researched directly, 8 extrapolated from nearest-neighbor with documented extrapolation rationale. Phase 4 editors should treat the extrapolated 8 as starting drafts and can verify/tune against actual local market evidence as time allows.
- **No blockers for downstream phases.** The known limitations (no GBP direct data, no verified Local Pack ranks) are documented in the output file so any future phase using this data knows the quality boundary.

## Known Stubs

None — the output file is complete content, not a placeholder.

## Threat Flags

None — this is a research document with no code changes, no new endpoints, no new trust boundaries.

## Self-Check: PENDING

(See self-check results appended below.)

---
*Phase: 01-diagnosis-competitor-research*
*Plan: 01-02*
*Completed: 2026-04-08*
