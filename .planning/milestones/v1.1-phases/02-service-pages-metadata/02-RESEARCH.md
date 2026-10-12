# Phase 2: Service Pages Metadata (Batch B2) — Research

**Researched:** 2026-04-08
**Domain:** On-page SEO metadata (title, description, H1, H2) for 11 prerendered React service pages
**Confidence:** HIGH

---

## Summary

Phase 2 rewrites `<title>`, `<meta description>`, `<h1>`, and secondary `<h2>` headings for **11 prerendered service pages** (not 12 as the roadmap phrasing implies — see "Scope decision" below). All 11 currently hardcode the same 166-char duplicate `<SEO title>` string and ship that string in their prerendered `dist/services/*/index.html`. Ten use inline `<SEO>`; **RoofRepair.tsx** is different — it routes through `ServicePageTemplate.tsx` which hardcodes the same duplicate title on line 71 and is additionally coupled to a shared-template H1 ("Honest Roof Repairs That Actually Last") and H2s that cannot be varied per-page without a template refactor. Phase 1's research explicitly scheduled that refactor for **Phase 3a**, so this research recommends Phase 2 covers **10 inline service pages** and defers RoofRepair to Phase 3a — leaving the 11th prerendered service page on the duplicate title for ~1 phase, which is an acceptable tradeoff versus widening Phase 2's risk surface.

A second and equally important discovery: **the prerendered `dist/*.html` files contain TWO `<meta name="description">` tags** — one from the static `index.html:12` template (the 197-char duplicated description, same on every page) and one from react-helmet-async (`data-rh="true"`, unique per page). The prerender script strips the static `<title>` but does NOT strip the static description. This is a latent problem that affects Phase 2's prerender verification: grepping `<meta name="description"` blindly will match the static duplicate on every service page. Verification steps must filter for the `data-rh` variant.

**Primary recommendation:** Scope Phase 2 to the **10 inline-SEO service pages** (not 11, not 12). Draft all 10 titles + descriptions + H1s + H2 lists as a single copy packet for user approval. After approval, commit atomically per page (10 commits). Verify each commit by grepping the `data-rh="true"` title and description from the corresponding `dist/services/<slug>/index.html`. Defer RoofRepair.tsx / ServicePageTemplate.tsx refactor to Phase 3a per Phase 1 plan. Delete the orphan GutterServices.tsx source file as a cleanup task (optional, low risk — it is already 301'd at the edge, unreachable from the sitemap, and unused by any other code path).

---

## 1. Scope Decision — Definitive File Inventory for Phase 2

### The "12 service pages" count is wrong — it's actually 11 prerendered + 1 orphan

The ROADMAP v1.1 and phase description both say "12 service pages". The actual codebase has:

- **`src/routes.config.mjs`** enumerates exactly **11** `/services/*` routes marked `prerender: true`
- **`dist/services/`** contains exactly **11** prerendered directories after `npm run build`
- **`sitemap.xml`** is generated from `routes.config.mjs` → 11 service URLs
- **`vercel.json`** lists `/services/gutter-services` as a 301 → `/services/gutters`, and `routes.config.mjs` does NOT include `/services/gutter-services`
- **`src/App.tsx`** still has a `<Route path="/services/gutter-services" element={<GutterServices />}>` — reachable ONLY if someone bypasses the Vercel 301 by direct SPA navigation (i.e., clicks an internal link to that URL from within the running app). No internal links reference it.
- **`src/pages/services/GutterServices.tsx`** source file still exists (orphan — Phase 1 research flagged it for deletion)

The "12th" service page in the roadmap phrasing is `gutter-services` — which Phase 1 already identified as a dead code path: not prerendered, not in sitemap, redirected at the Vercel edge. **Phase 2 must NOT count it as an edit target.** Including it would mean editing a file whose output never reaches users, then verifying against a `dist/` file that does not exist.

### Definitive Phase 2 scope: 10 inline-SEO service pages

| # | Sitemap URL | Source file | Class (Phase 1) | Current H1 (line) | In Phase 2? | Reason |
|---|---|---|---|---|---|---|
| 1 | `/services/commercial-roofing` | `src/pages/services/CommercialRoofing.tsx` | B | "Commercial Roofing That Protects Your Business" (L19) | ✅ YES | Inline `<SEO>`, hardcoded duplicate title |
| 2 | `/services/emergency-services` | `src/pages/services/EmergencyServices.tsx` | B | "Roof Emergency? We're on Our Way" (L23) | ✅ YES | Inline `<SEO>`, hardcoded duplicate title |
| 3 | `/services/gutters` | `src/pages/services/Gutters.tsx` | B | "Gutters That Actually Do Their Job" (L19) | ✅ YES | Inline `<SEO>`, hardcoded duplicate title |
| 4 | `/services/preventative-maintenance` | `src/pages/services/PreventativeMaintenance.tsx` | B | "Stop Roof Problems Before They Start" (L19) | ✅ YES | Inline `<SEO>`, hardcoded duplicate title |
| 5 | `/services/roof-inspection` | `src/pages/services/RoofInspection.tsx` | B | "Know Exactly What's Going On Up There" (L19) | ✅ YES | Inline `<SEO>`, hardcoded duplicate title |
| 6 | `/services/roof-installation` | `src/pages/services/RoofInstallation.tsx` | B | "New Construction Roofing Built to Outlast the Weather" (L19) | ✅ YES | Inline `<SEO>`, hardcoded duplicate title |
| 7 | `/services/roof-maintenance` | `src/pages/services/RoofMaintenance.tsx` | B | "Keep Your Roof Strong Year After Year" (L19) | ✅ YES | Inline `<SEO>`, hardcoded duplicate title |
| 8 | `/services/roof-replacement` | `src/pages/services/RoofReplacement.tsx` | B | "Roof Replacement Columbus OH" (L31) | ✅ YES (H1 already close) | Inline `<SEO>`, hardcoded duplicate title. H1 is already in target format — minor polish only. |
| 9 | `/services/siding` | `src/pages/services/Siding.tsx` | B | "Siding That Looks Great and Holds Up for Decades" (L19) | ✅ YES | Inline `<SEO>`, hardcoded duplicate title |
| 10 | `/services/storm-damage` | `src/pages/services/StormDamage.tsx` | B | "Storm Hit? We'll Get Your Roof Back Fast" (L19) | ✅ YES | Inline `<SEO>`, hardcoded duplicate title |

### Deferred from Phase 2

| # | URL | Source | Reason to defer |
|---|---|---|---|
| 11 | `/services/roof-repair` | `src/pages/services/RoofRepair.tsx` → `ServicePageTemplate.tsx` | **Phase 3a.** RoofRepair passes props to `ServicePageTemplate`, which hardcodes the duplicate title at `ServicePageTemplate.tsx:71` and a generic H1 ("Honest Roof Repairs That Actually Last") at L84-86. Phase 1 research scheduled the template refactor (accept `title` + `h1Title` props) for Phase 3a. Editing Phase 2 to inline the title in `ServicePageTemplate.tsx` would either (a) break the template's intended reusability, or (b) require a props refactor that belongs in Phase 3a. Leaving RoofRepair on the duplicate title for one extra phase is the lower-risk choice. |
| — | `/services/gutter-services` | `src/pages/services/GutterServices.tsx` | **Orphan.** 301'd at Vercel edge (`vercel.json:9`). Not in `routes.config.mjs`. Not prerendered. Not in sitemap. No internal links reference it. Phase 1 research recommends deletion as a cleanup task. **Recommendation:** Phase 2 can delete this file as task #11 (optional cleanup) — it has zero user impact and removes a maintenance trap. Alternatively, defer to Phase 5 cleanup. |

### Scope Decision Summary

> **Phase 2 edits exactly 10 files** — all inline-`<SEO>` service pages with hardcoded duplicate titles. It does **NOT** touch `ServicePageTemplate.tsx`, `RoofRepair.tsx`, or any non-service-page file. Optional 11th task: delete `GutterServices.tsx` orphan. RoofRepair.tsx is handled by Phase 3a per the Phase 1 plan.

**This means the Phase 2 success criterion "All 12 `/services/*` pages have unique titles" should be updated to read "All 10 inline-SEO `/services/*` pages have unique titles; RoofRepair covered in Phase 3a; gutter-services orphan deleted."** The planner or the user must reconcile this in the plan's acceptance criteria — see Risks & Open Questions section 9 below.

---

## 2. Title Format Analysis — 2-3 Concrete Options with Character Counts

### Length budget (verified against current SERP behavior)

Google truncates `<title>` in SERPs at approximately **580-600 pixels** on desktop and slightly less on mobile — not a strict character count because the SERP font is proportional. Practical character targets (verified against industry SEO guidance, Apr 2026):

- **Safe for all characters:** ≤ 50-55 chars
- **Typical safe max:** ≤ 60 chars
- **Hard truncation floor:** ~70 chars, earlier for titles with wide characters (W, M, uppercase)

Recommendation: **target 50-60 characters**, hard-cap at 65. Every draft title must include (a) the primary service keyword, (b) "Columbus" or "Central Ohio", and (c) a brand suffix ("DTE Roofing" or "| DTE Roofing").

**Source:** [Meta Title Length For SEO: Pixel Width Vs Character Limits](https://contentdecoded.com/meta-title-length/), [Title Tag Length 2025 — Search Engine Land](https://searchengineland.com/title-tag-length-388468), [Meta Title Length Best Practices 2026 — Scalenut](https://www.scalenut.com/blogs/meta-title-length-best-practices-2026)

### Three title format options

#### Option A: "Service in Columbus, OH | DTE Roofing" (Preferred)

| Service | Example | Chars |
|---|---|---|
| Roof Replacement | `Roof Replacement in Columbus, OH \| DTE Roofing` | 47 |
| Roof Installation | `Roof Installation in Columbus, OH \| DTE Roofing` | 48 |
| Roof Inspection | `Roof Inspection in Columbus, OH \| DTE Roofing` | 46 |
| Roof Maintenance | `Roof Maintenance in Columbus, OH \| DTE Roofing` | 47 |
| Preventative Maintenance | `Preventative Roof Maintenance Columbus OH \| DTE Roofing` | 55 |
| Emergency Services | `24/7 Emergency Roof Repair Columbus OH \| DTE Roofing` | 52 |
| Storm Damage | `Storm Damage Roof Repair Columbus OH \| DTE Roofing` | 50 |
| Commercial Roofing | `Commercial Roofing Contractor Columbus, OH \| DTE Roofing` | 56 |
| Gutters | `Gutter Installation & Repair in Columbus, OH \| DTE Roofing` | 58 |
| Siding | `Siding Installation in Columbus, OH \| DTE Roofing` | 49 |

**Pros:** Reads naturally; mirrors Phase 1's recommended H1 format from `v1.1-gbp-competitors.md` (e.g., "Roof Replacement in Central Ohio | DTE Roofing"); 45-58 chars fits comfortably under the 60-char safe limit; consistent pattern for all 10 pages; preposition "in" reads more naturally than dash or colon separators.
**Cons:** "Columbus, OH" pushed to middle — may cap a few edge cases (Commercial Roofing brushes 56 chars). Google SERP preview tools should be used to sanity-check each draft.

#### Option B: "Columbus Service | DTE Roofing"

| Service | Example | Chars |
|---|---|---|
| Roof Replacement | `Columbus Roof Replacement \| DTE Roofing` | 39 |
| Emergency Services | `Columbus 24/7 Emergency Roof Repair \| DTE Roofing` | 48 |
| Commercial Roofing | `Columbus Commercial Roofing Contractor \| DTE Roofing` | 52 |
| Gutters | `Columbus Gutter Installation & Repair \| DTE Roofing` | 51 |

**Pros:** Puts city first, which some SEO tools weight higher for local-intent queries; tighter character budget.
**Cons:** Sounds robotic ("Columbus Roof Replacement" is grammatically awkward vs "Roof Replacement in Columbus"); less conversational; doesn't match Phase 1 RESEARCH.md H1 recommendations (which use "in Columbus" phrasing).

#### Option C: "Service Columbus OH — DTE Roofing" (em-dash variant)

| Service | Example | Chars |
|---|---|---|
| Roof Replacement | `Roof Replacement Columbus OH — DTE Roofing` | 43 |
| Commercial Roofing | `Commercial Roofing Columbus OH — DTE Roofing` | 45 |

**Pros:** Shortest character count; em-dash is trendy in 2025-2026 SEO title formatting; mirrors the existing Muth & Company title pattern seen in competitor research.
**Cons:** The em-dash (`—`) is not the same as a hyphen (`-`) and some older SERP snippets normalize it oddly; comma after city reads more naturally than a bare "Columbus OH"; less consistent with Phase 1's recommended H1 format. Less readable as a verbal phrase.

### Recommendation

**Use Option A.** It is the most natural phrasing, consistently fits the 60-char safe budget, and mirrors the H1 format Phase 1 already proposed in `v1.1-gbp-competitors.md` ("Roof Replacement in Central Ohio | DTE Roofing"). Option A keeps title and H1 in sync, which is a positive SEO signal.

**Character verification tool for the planner:** Before committing any title, verify character length with a one-liner:

```bash
# Node one-liner
node -e 'const t="Roof Replacement in Columbus, OH | DTE Roofing"; console.log(t.length, "chars")'

# awk one-liner (POSIX-friendly)
awk 'BEGIN{t="Roof Replacement in Columbus, OH | DTE Roofing"; print length(t)}'
```

The planner should bake a `≤ 60 chars` assertion into each task's acceptance criteria.

---

## 3. Description Budget — 140-200 char Target Justification

### Length budget (verified Apr 2026)

Google's meta description pixel width is approximately **920px on desktop (~158 chars)** and **680px on mobile (~120 chars)**. Industry consensus in 2026: aim for **140-160 characters**, front-load the most important content, and accept that mobile will truncate to ~120 chars regardless.

**Source:** [Meta Description Length Best Practices — SiteGrade 2026](https://sitegrade.io/en/quick-answers/meta-description-title-tag-correct-lengths-2026/), [Straight North 2026 guide](https://www.straightnorth.com/blog/title-tags-and-meta-descriptions-how-to-write-and-optimize-them-in-2026/)

### Phase 2 roadmap target: 140-200 chars

The ROADMAP specifies **140-200 chars**. The upper end (200) exceeds Google's ~158-char desktop visible window, meaning the last ~40 chars will be truncated with an ellipsis in desktop SERPs and potentially cut mid-word on mobile. This is not *wrong* — Google still reads the full description for ranking context, and longer descriptions may display more content for specific long-form queries or on wide monitors — but it is aggressive.

### Recommendation

- **Hard floor:** 140 chars (minimum useful content per ROADMAP)
- **Sweet spot:** 150-160 chars (maximizes desktop display without mobile truncation midsentence)
- **Hard ceiling:** 200 chars (ROADMAP maximum; front-load everything meaningful within the first 120 chars so mobile still gets the value prop)
- **Every description must contain:** the service name, "Columbus" or "Central Ohio", and a CTA phrase (call number, free estimate, "call 614-971-6028", etc.)
- **Every description must NOT contain:** "BEST", "top-rated", "#1", "award-winning", "premier", "leading", "finest", "greatest", or similar unverifiable superlatives (META-05)

**Planner should:** Define acceptance criteria as `150 ≤ len(description) ≤ 200` per task, with a 140-char absolute floor if a shorter description serves a specific page better.

---

## 4. H1 Rewrite Targets — Current vs. Recommended

For all 10 in-scope pages, the H1 currently lives in the hero section as the first `<h1 className="text-4xl md:text-5xl font-bold mb-6">` inside a `<section className="relative bg-gradient-to-br from-charcoal-900 ... py-20">`. DOM location is consistent across all 10 files.

All recommended H1s below follow the **"Primary Service + Columbus, OH" format (HEAD-02)** and are sourced from Phase 1's `v1.1-gbp-competitors.md` H2/H1 recommendations table.

| # | Page | Current H1 | Current H1 line | Recommended H1 | Source |
|---|---|---|---|---|---|
| 1 | CommercialRoofing.tsx | "Commercial Roofing That Protects Your Business" | L19 | `Commercial Roofing in Columbus, OH` | competitors.md L450 |
| 2 | EmergencyServices.tsx | "Roof Emergency? We're on Our Way" | L23 | `24/7 Emergency Roofing in Central Ohio` | competitors.md L432 |
| 3 | Gutters.tsx | "Gutters That Actually Do Their Job" | L19 | `Gutter Installation & Repair in Columbus, OH` | competitors.md L459 |
| 4 | PreventativeMaintenance.tsx | "Stop Roof Problems Before They Start" | L19 | `Preventative Roof Maintenance in Central Ohio` | competitors.md L423 |
| 5 | RoofInspection.tsx | "Know Exactly What's Going On Up There" | L19 | `Free Roof Inspection in Central Ohio` | competitors.md L405 |
| 6 | RoofInstallation.tsx | "New Construction Roofing Built to Outlast the Weather" | L19 | `New Roof Installation in Columbus, OH` | competitors.md L396 |
| 7 | RoofMaintenance.tsx | "Keep Your Roof Strong Year After Year" | L19 | `Roof Maintenance & Tune-Ups in Central Ohio` | competitors.md L414 |
| 8 | RoofReplacement.tsx | "Roof Replacement Columbus OH" | L31 | `Roof Replacement in Columbus, OH` | competitors.md L387 (minor polish — comma + "in") |
| 9 | Siding.tsx | "Siding That Looks Great and Holds Up for Decades" | L19 | `Siding Installation & Repair in Central Ohio` | competitors.md L472 |
| 10 | StormDamage.tsx | "Storm Hit? We'll Get Your Roof Back Fast" | L19 | `Storm Damage Roof Repair in Central Ohio` | competitors.md L441 |

**Important notes on H1 edits:**

1. **"Columbus, OH" vs "Central Ohio"** — Phase 1 mixed both. Recommendation: use "Columbus, OH" for services where Columbus is the precise city-level market (Commercial Roofing, Gutters, Roof Replacement, Roof Installation), and "Central Ohio" for services that naturally extend to the whole service area (Emergency, Storm Damage, Inspection, Maintenance, Preventative, Siding). **The user may prefer consistency** — this is a copy-draft decision the planner should surface in the approval gate.

2. **H1 edit is a one-line string replacement** in each file. No JSX restructuring needed. The subheadline `<p>` tag below each H1 is currently different per page and should NOT be rewritten (that's body copy, protected by the "do not touch content" constraint).

3. **HEAD-02** reads literally: *"Every service page H1 follows the format `Primary Service + Columbus Region`"*. All 10 recommended H1s satisfy this. The current 10 H1s are brand-voice / pain-point hooks and do NOT satisfy HEAD-02 — all 10 will be replaced.

---

## 5. H2 Sourcing Map — Competitor H2 Recommendations → DTE Service Pages

The H2 rewrite is the most structurally significant part of Phase 2. HEAD-03 requires *"H2s listing secondary categories + most pertinent services, informed by competitor GBP research"*. Phase 1's `v1.1-gbp-competitors.md` (lines 373-479) provides a 1:1 mapping for every in-scope service page.

### H2 injection strategy: replace the first content `<h2>` + optionally add a secondary `<h2>` block

Each service page currently has a first content `<h2 className="text-3xl font-bold text-charcoal-900 mb-6">` immediately below the hero section (inside the first `grid lg:grid-cols-2 gap-12 mb-16`). That H2 currently contains a secondary-services list (e.g., Gutters: "Seamless Gutter Installation, Gutter Guards, Downspout Extensions & Custom Colors"). This H2 is the natural place to inject the Phase 2 rewrite.

**Strategy:**
- **Replace** the existing first content `<h2>` (around line 31) with H2 #1 from the recommendation list below.
- **Do NOT** add new H2 sections to the page — body copy sections have their own H3/H4 structure and the "don't modify content" constraint applies.
- If H2 #2 / #3 / #4 from the recommendation list are worth injecting, they become rewrites of subsequent existing H2s where semantically compatible. Otherwise, drop them — it's better to land the primary rewrite cleanly than to force unnatural injections.

### H2 mapping (Phase 2 scope, 10 pages)

| # | Page | Current first `<h2>` (line) | Recommended primary H2 (competitors.md source) |
|---|---|---|---|
| 1 | CommercialRoofing | "TPO & EPDM Systems, Flat Roof Repair, Metal Roofing & Maintenance Programs" (L31) | `Commercial Flat Roof Systems: TPO, EPDM & Modified Bitumen` (competitors.md L452) |
| 2 | EmergencyServices | *(need to verify — see below)* | `24/7 Emergency Roof Repair & Tarping` (competitors.md L434) |
| 3 | Gutters | "Seamless Gutter Installation, Gutter Guards, Downspout Extensions & Custom Colors" (L31) | `Seamless Gutter Installation in Central Ohio` (competitors.md L461) |
| 4 | PreventativeMaintenance | *(need to verify)* | `Annual Preventative Maintenance Plans` (competitors.md L425) |
| 5 | RoofInspection | *(need to verify)* | `What's Included in Our Free Roof Inspection` (competitors.md L407) |
| 6 | RoofInstallation | *(need to verify)* | `Roofing Systems We Install (Asphalt, Metal, Flat)` (competitors.md L398) |
| 7 | RoofMaintenance | *(need to verify)* | `Annual Roof Maintenance Checklist` (competitors.md L416) |
| 8 | RoofReplacement | "Full Tear-Off, Architectural Shingles, Metal Roofing & Ventilation Upgrades" (L43) | `Full Roof Replacement: Asphalt, Metal & Architectural Shingles` (competitors.md L389) |
| 9 | Siding | "Vinyl Siding, LP SmartSide, Siding Repair & Custom Trim Installation" (L31) | `Vinyl Siding, Fiber Cement & Composite Siding Options` (competitors.md L474) |
| 10 | StormDamage | *(need to verify)* | `Storm Damage, Hail & Wind Damage Roof Repair` (competitors.md L443) |

**Gaps flagged:** H2 current-text for 6 pages marked `*(need to verify)*` was not grepped in this research pass because the files are 300-700 lines each and the primary diagnostic signal (duplicate title + H1 DOM location) was already confirmed. **The planner should verify each of those 6 H2s during drafting** — either read the relevant line range or grep for the first `<h2 className="text-3xl` in each file.

### Coverage check

Every one of the 10 in-scope service pages has a 1:1 competitor H2 recommendation in `v1.1-gbp-competitors.md` lines 373-479. **Zero gaps.** (RoofRepair is also covered in that file at L378-384, but it is out-of-scope for Phase 2 per the scope decision.)

### Secondary H2 candidates (for manual drafting if a natural injection point exists)

Each page has 3-4 recommended H2s from Phase 1. H2 #1 is the safe primary rewrite. H2s #2-#4 are optional injections the copy-drafter can consider if they fit an existing H2 in the page. **Recommendation: keep Phase 2 minimal** — rewrite the first content `<h2>` only. Save secondary H2 expansions for a future phase if on-page audit re-run flags the service pages as still thin.

---

## 6. Superlative Audit — "BEST" and Forbidden Language

### Title-level "BEST" (the 166-char duplicate)

All 10 in-scope files contain "BEST Roofer in Columbus" in their `<SEO title>` prop (line 10 in each file except RoofReplacement.tsx which is line 11). **This is the primary Phase 2 edit — replacing the duplicate title removes the "BEST" superlative automatically.**

### Body-copy superlatives (out of scope but flagged)

The grep for `\b(best|top|#1|premier|leading|finest|greatest)\b` found a large number of matches. Most are in body copy that is explicitly **protected by the "do not modify content" constraint** — these use "best" in a non-superlative contextual way ("best for", "best time of year", "best option for your situation"). The planner should NOT rewrite these.

**However, there is ONE H2 that contains "Best" in a superlative way and IS in Phase 2 scope:**

| File | Line | Current H2 | Fix |
|---|---|---|---|
| RoofReplacement.tsx | 202 | `Best Roofing Materials for Ohio Weather` | **Rewrite to:** `Roofing Materials for Ohio Weather` or `Asphalt, Metal & Architectural Shingle Materials for Ohio Weather` |

This H2 is a section heading (not the first primary H2 — the primary is L43 "Full Tear-Off, Architectural Shingles, Metal Roofing & Ventilation Upgrades"). Rewriting it is a minor Phase 2 task — removing the superlative while preserving semantic meaning.

**FAQ question on RoofReplacement L482** contains "What's the best time of year for roof replacement in Columbus?" — this is user-facing copy inside a FAQ block. Recommendation: **leave it alone.** FAQ questions are part of the approved body content and the "best time of year" usage is a legitimate temporal comparison, not a brand superlative. The planner should NOT rewrite this.

### Other superlative matches (all body copy — LEAVE ALONE)

- `RoofInstallation.tsx:205, 258, 319` — "Best for: ..." labels on material comparison cards. Body copy, protected.
- `Siding.tsx:144, 202, 260, 318` — "Best for: ..." labels on siding comparison cards. Body copy, protected.
- `CommercialRoofing.tsx:144, 198, 252, 310, 364` — "Best for: ..." labels on commercial system cards. Body copy, protected.
- `RoofMaintenance.tsx:35, 239` — contextual "perform at its best" and "Best For:" card label. Body copy, protected.
- `RoofReplacement.tsx:327, 402` — contextual "best balance" and "Best suited for:" labels in body. Protected.
- `RoofRepair.tsx:81, 165` — body copy; RoofRepair is out of Phase 2 scope anyway.

### Summary

**Superlatives to rewrite in Phase 2:** 2 items per page (the 166-char duplicate title → replaced by draft, and the first content H2 → replaced by competitor-sourced H2) × 10 pages = **20 string edits**, plus **1 extra H2 rewrite** on RoofReplacement.tsx L202. Total: **21 atomic string edits across 10 files**.

---

## 7. Prerender Verification Plan — Exact Grep Commands

### Critical context: two description tags in every dist file

Every prerendered `dist/services/<slug>/index.html` file contains TWO `<meta name="description">` tags:

1. **`<meta name="description" content="DTE Roofing - Professional...">`** — copied from `index.html:12`, duplicated on every page, 197 chars
2. **`<meta data-rh="true" name="description" content="...">`** — emitted by react-helmet-async, unique per page

The prerender script at `scripts/prerender.mjs:38` strips the template `<title>` with `template.replace(/<title>[^<]*<\/title>/i, '')` but does NOT strip the static description. This is a latent issue outside Phase 2's scope (recommend Phase 4 cleanup — or add it as an optional Phase 2 cleanup task if the user wants it).

**For Phase 2 verification, ALWAYS filter for `data-rh="true"`** when grepping descriptions. Filtering for the raw `<meta name="description"` pattern will match the static duplicate on every page and produce false passes.

### Verification commands (bash / cross-platform)

After `npm run build`, for each of the 10 edited service pages, run:

```bash
# 1. Verify unique title is baked into dist (should match draft exactly)
grep -o '<title data-rh="true">[^<]*</title>' dist/services/gutters/index.html

# 2. Verify Helmet description is baked into dist (unique per page)
grep -oE '<meta data-rh="true" name="description" content="[^"]*"' dist/services/gutters/index.html

# 3. Verify new H1 is in the server-rendered body
grep -o '<h1 class="[^"]*">[^<]*</h1>' dist/services/gutters/index.html

# 4. Verify new primary H2 is in the server-rendered body
grep -oE '<h2 class="[^"]*">[^<]*</h2>' dist/services/gutters/index.html | head -3

# 5. Verify NO "BEST Roofer in Columbus" string anywhere in the file
! grep -q "BEST Roofer in Columbus" dist/services/gutters/index.html && echo "CLEAN" || echo "STILL HAS DUPLICATE TITLE"
```

### Automated batch verification script (recommended)

The planner should bake a simple verification script into the plan as the per-task acceptance gate:

```bash
#!/usr/bin/env bash
# Phase 2 verification — run after npm run build
set -euo pipefail

SERVICES=(commercial-roofing emergency-services gutters preventative-maintenance roof-inspection roof-installation roof-maintenance roof-replacement siding storm-damage)
FAIL=0

for slug in "${SERVICES[@]}"; do
  f="dist/services/$slug/index.html"
  [[ -f "$f" ]] || { echo "MISSING: $f"; FAIL=1; continue; }

  # Must NOT contain the duplicate title string
  if grep -q "BEST Roofer in Columbus" "$f"; then
    echo "FAIL [$slug]: still contains duplicate title"
    FAIL=1
  fi

  # Must contain a unique data-rh description
  if ! grep -q 'data-rh="true" name="description"' "$f"; then
    echo "FAIL [$slug]: missing helmet description"
    FAIL=1
  fi
done

[[ $FAIL -eq 0 ]] && echo "ALL 10 SERVICE PAGES VERIFIED" || exit 1
```

This script should live in `scripts/verify-phase-02.sh` (or similar) and be invoked as the last task of Phase 2 before commit.

### Full verification gate (VERIFY-04 compliance)

Per ROADMAP VERIFY-04, all three must pass:

```bash
npm run build       # must exit 0 — tests prerender pipeline and vite build
npm run lint        # must exit 0 — eslint across src/
npm run typecheck   # must exit 0 — tsc --noEmit -p tsconfig.app.json
```

**Note:** `npm run typecheck` is the correct command per `package.json`, NOT `tsc --noEmit` directly. The ROADMAP phrasing "tsc --noEmit" is shorthand for the script.

---

## 8. Scope Boundaries — What Phase 2 Does NOT Touch

| Domain | In Phase 2? | Reason |
|---|---|---|
| `src/components/ServicePageTemplate.tsx` | ❌ NO | Refactor scheduled for Phase 3a per Phase 1 RESEARCH.md |
| `src/pages/services/RoofRepair.tsx` | ❌ NO | Depends on ServicePageTemplate refactor (Phase 3a) |
| `src/components/SEO.tsx` | ❌ NO | Component is correct — no default props to change. Phase 1 verified. |
| `index.html:12` (static description) | ❌ NO | Cleanup deferred to Phase 4/5 per Phase 1 RESEARCH.md. |
| `src/pages/Blog.tsx` / `src/pages/BlogPost.tsx` | ❌ NO | /blog SSR fix is Phase 5. |
| Location pages (`src/pages/locations/*.tsx`) | ❌ NO | Location pages are Phase 4 (they already have unique titles per Phase 1; only descriptions + H1/H2 need rewrites). |
| Core pages (`/about`, `/gallery`, `/reviews`, `/faq`, `/contact`, `/get-a-quote-consultation`) | ❌ NO | Core pages are Phase 3. |
| Body paragraph content, FAQs, testimonials | ❌ NO | v1.0 "do not modify content" constraint — unchanged for v1.1. |
| URL / slug changes | ❌ NO | Locked per CLAUDE.md. |
| NAP (business name/address/phone) | ❌ NO | Locked per CLAUDE.md. |
| New dependencies | ❌ NO | Phase is pure string edits — no new libraries. |
| Schema markup (`SchemaMarkup.tsx`, `schemas.ts`) | ❌ NO | v1.0 Phases 1 & 4 handled all schema. |
| `src/pages/services/GutterServices.tsx` | ⚠️ OPTIONAL | Orphan — deletion is an optional Phase 2 cleanup task. Recommend deleting. |

---

## 9. Risks & Open Questions for the Planner

### 9.1 (RESOLVED in research) Scope mismatch: ROADMAP says "12 service pages", reality is 11 prerendered + 1 orphan + 1 template-driven

**Resolution:** This research recommends Phase 2 edit exactly **10 files** (inline-SEO pages). Phase 2 acceptance criteria in PLAN should read:

- All 10 inline-SEO service pages have unique titles containing the service + Columbus region
- All 10 have unique 140-200 char descriptions
- All 10 have H1 in `Primary Service + Columbus, OH` format
- All 10 have primary H2 rewritten per competitor research
- `/services/roof-repair` handled in Phase 3a (deferred per Phase 1 research)
- `/services/gutter-services` orphan deleted (optional cleanup task) OR explicitly left in place for Phase 5 cleanup

**The user must accept this scope interpretation.** If the user insists on "12 service pages in Phase 2", the planner must pull ServicePageTemplate refactor forward from Phase 3a into Phase 2 — which expands risk and scope.

### 9.2 (USER DECISION) Title format — Option A, B, or C?

Option A (`Service in Columbus, OH | DTE Roofing`) is the research recommendation. User should confirm before the drafter writes 10 titles.

### 9.3 (USER DECISION) "Columbus, OH" vs "Central Ohio" split per page

Some pages (local services like gutters, commercial roofing) read better with "Columbus, OH". Others (region-wide services like emergency, storm damage, inspection, maintenance) read better with "Central Ohio". Research recommends a split; user should confirm whether to use a single consistent phrase or the mixed split.

### 9.4 (USER DECISION) Delete `GutterServices.tsx` orphan in Phase 2, or defer to Phase 5?

Research recommends deleting in Phase 2 as an optional 11th task (low risk — file is unreachable). Alternative: defer to Phase 5 "final verification" cleanup.

### 9.5 (USER DECISION) `RoofReplacement.tsx:202` H2 "Best Roofing Materials for Ohio Weather" — rewrite in Phase 2 or skip?

Research recommends rewriting to remove the "Best" superlative (META-05). This is a non-first-H2 edit inside an in-scope file — natural fit for Phase 2. User should confirm whether non-primary H2 rewrites are in Phase 2 scope or limited to the first content H2 only.

### 9.6 (OPEN) 6 pages need first-H2 current-text verification

Research mapped all 10 primary H2 targets from Phase 1's competitor research but only grepped 4 current first-H2 texts (Gutters, Siding, CommercialRoofing, RoofReplacement). The planner should verify the current first-H2 text for the other 6 pages (Emergency, Preventative, RoofInspection, RoofInstallation, RoofMaintenance, StormDamage) during drafting — straightforward `grep '<h2 className="text-3xl'` of each file.

### 9.7 (LATENT — out of scope but flag for user awareness) Static description in `index.html:12` is duplicated on every dist page

The prerender script strips the template `<title>` but not the template `<meta description>`. Result: every `dist/*.html` has both a static description AND a Helmet description. Google's behavior when multiple description tags exist is to prefer the first one *in document order* — and the static description appears on `index.html:12`, well before Helmet's at line 42. This means **even after Phase 2 finishes, Google may still see the 197-char "Licensed, bonded & insured" description as canonical for every service page**.

**Impact on Phase 2:** If the plan only verifies the Helmet description in dist, the verification will pass but the live site may still serve the duplicate description to Googlebot. This is a Phase 4/5 issue per Phase 1's research plan, but the Phase 2 executor should **document this in the phase outcome summary** so Phase 4/5 can confirm and fix.

**Recommended Phase 2 mitigation (optional cleanup):** Patch `scripts/prerender.mjs:38` to also strip `<meta name="description" content="[^"]*" />` from the template before injecting Helmet tags — adds one line, low risk:

```js
let page = template.replace(/<title>[^<]*<\/title>/i, '');
page = page.replace(/<meta name="description"[^>]*>/i, '');  // ADD THIS LINE
page = page.replace('</head>', `    ${headTags}\n  </head>`);
```

This would immediately resolve the description-duplication risk Phase 1 flagged. **Recommendation: include this one-line fix as an optional Phase 2 cleanup task**, gated on user approval.

### 9.8 (OPEN) Atomic commit structure — 10 commits or grouped?

ROADMAP and CLAUDE.md both specify "atomic per-page commits". Research agrees: **10 separate commits, one per service page**, with the commit message pattern `docs(phase-02): update <service> metadata — <slug>` or similar.

Recommended task breakdown for the planner:
- **Task 1:** Copy draft for all 10 pages (single artifact, user approval gate)
- **Task 2-11:** Apply draft per page, verify prerender, commit (10 atomic tasks)
- **Task 12:** Optional — delete `GutterServices.tsx` orphan, patch `scripts/prerender.mjs` if user approved 9.7 cleanup, run full `npm run build && npm run lint && npm run typecheck`
- **Task 13:** Run `scripts/verify-phase-02.sh` batch check, commit verification report

This gives 12-13 plan tasks, which aligns with the ROADMAP's "1 plan" for Phase 2 (the copy-approval gate is the natural phase boundary).

---

## 10. Character-Count Guardrail for Drafters

### Simple Node one-liner (cross-platform)

```bash
node -e "const t=process.argv[1]; console.log('chars:', t.length)" "Roof Replacement in Columbus, OH | DTE Roofing"
# Output: chars: 47
```

### Simple awk one-liner (POSIX)

```bash
echo -n "Roof Replacement in Columbus, OH | DTE Roofing" | awk '{print length}'
# Output: 47
```

### Recommended per-task acceptance criterion

Each Phase 2 task should include a line like:

```
- [ ] Draft title passes: node -e "const t=\`<TITLE>\`; if(t.length>60)process.exit(1)"
- [ ] Draft description passes: node -e "const d=\`<DESC>\`; if(d.length<140||d.length>200)process.exit(1)"
```

This ensures character budgets are enforced at the acceptance gate, not discovered during SERP audit weeks later.

### Recommended single batch check

A single script that validates all 10 drafts in one pass:

```bash
#!/usr/bin/env node
// scripts/validate-phase-02-copy.mjs
const drafts = [
  { slug: 'commercial-roofing', title: '...', description: '...' },
  { slug: 'emergency-services', title: '...', description: '...' },
  // ... 10 entries
];
let fail = 0;
for (const d of drafts) {
  if (d.title.length > 60) { console.error(`${d.slug}: title ${d.title.length} chars (max 60)`); fail++; }
  if (d.description.length < 140 || d.description.length > 200) {
    console.error(`${d.slug}: description ${d.description.length} chars (140-200)`); fail++;
  }
}
process.exit(fail);
```

Run this once after the copy draft is finalized, before any source-file edits start.

---

## Phase Requirements

| ID | Description | Research Support |
|---|---|---|
| META-01 | Every prerendered sitemap URL has a unique `<title>` | Section 1 (10-file scope), Section 2 (title format options), Section 7 (verification commands). Current state: 10 of 10 in-scope pages ship the same 166-char duplicate title in `dist/services/*/index.html` — confirmed by grep in research session. |
| META-02 | Every prerendered sitemap URL has a unique `<meta description>` | Section 3 (140-200 char budget), Section 7 (data-rh verification + latent static-description duplication warning in 9.7). Current state: Helmet emits unique descriptions to dist, BUT the static `index.html:12` description is also present in every dist file. |
| META-04 | Titles reflect actual page intent with city + service keyword | Section 2 (format options), Section 4 (H1 alignment between title and H1 is consistent). All 10 recommended titles contain the service name + "Columbus"/"Central Ohio". |
| META-05 | Descriptions 140-200 chars, no "BEST"/superlatives | Section 3 (budget), Section 6 (superlative audit). One extra body-H2 on RoofReplacement.tsx L202 contains "Best" and should be rewritten as part of Phase 2. |
| HEAD-02 | Service page H1 in `Primary Service + Columbus Region` format | Section 4 (H1 rewrite targets table — 10 current vs recommended pairs, all sourced from Phase 1's competitors.md). |
| HEAD-03 | H2s list secondary categories informed by competitor GBP research | Section 5 (H2 sourcing map, 1:1 mapping from `v1.1-gbp-competitors.md` L373-479 — zero gaps for in-scope pages). |

---

## Project Constraints (from CLAUDE.md)

These directives from `CLAUDE.md` and project `CLAUDE.md` MUST be honored in the Phase 2 plan:

| Constraint | Source | Implication for Phase 2 |
|---|---|---|
| Do NOT rewrite body paragraphs, FAQs, testimonials, service descriptions | project `CLAUDE.md` | Phase 2 edits ONLY `<SEO title>`, `<SEO description>`, H1 text, and first content H2 text. Leaves all body `<p>` and `<details>` elements intact. |
| Do NOT change URLs or slugs | project `CLAUDE.md` | No edits to `App.tsx` routes, `routes.config.mjs`, or `vercel.json`. |
| Do NOT change NAP | project `CLAUDE.md` | Titles and descriptions may NOT alter business name, address, phone, email. |
| Match existing Tailwind design (charcoal/primary-700 color scheme) | project `CLAUDE.md` | H1/H2 rewrites reuse existing Tailwind classes — only text content changes. |
| No new heavy dependencies | project `CLAUDE.md` | Phase 2 is pure string edits. Zero new packages. |
| Complete each phase fully and get user approval before next | project `CLAUDE.md` | Copy draft for all 10 pages is a SINGLE user approval gate BEFORE any edits land. After approval, atomic per-page commits proceed. |
| Never save working files, text/mds, or tests to root folder | user global `CLAUDE.md` | Any drafter scripts (verify-phase-02.sh, validate-phase-02-copy.mjs) live in `scripts/`, not project root. |
| ALWAYS run tests after making code changes | user global `CLAUDE.md` | After each per-page edit: `npm run build` must pass. After all 10: `npm run build && npm run lint && npm run typecheck`. |
| ALWAYS verify build succeeds before committing | user global `CLAUDE.md` | Atomic commit protocol: edit → build → verify dist grep → commit. Not commit-then-build. |
| Do what has been asked; nothing more, nothing less | user global `CLAUDE.md` | Recommend keeping optional 9.7 prerender-script cleanup and optional GutterServices deletion as explicit user-approval questions, not unilateral additions. |
| NEVER create documentation files unless requested | user global `CLAUDE.md` | This RESEARCH.md IS requested output. No additional .md files in Phase 2 unless ROADMAP specifies them. |

---

## Standard Stack (Confirmed — No Changes Needed)

| Library | Version | Purpose | Status |
|---|---|---|---|
| react | 18.3.1 | UI framework | Unchanged — Phase 2 is string edits |
| react-helmet-async | 2.0.5 | SSR-safe `<head>` management | Unchanged — SEO component already wraps this correctly |
| react-router-dom | 7.9.4 | Routing | Unchanged |
| vite | 5.4.2 | Build tool | Unchanged |
| typescript | 5.5.3 | Type checking | `npm run typecheck` enforces on every commit |

**No new dependencies. No version bumps.** Phase 2 is text edits only.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|---|---|---|
| A1 | Google's 2026 SERP title truncation is ~580-600px / ~60 chars | 2 | LOW — verified via 3 independent 2026 SEO sources; recommendation is 50-60 char target, well within any realistic truncation. |
| A2 | Google's 2026 meta description truncation is ~920px/158 chars desktop, ~680px/120 chars mobile | 3 | LOW — verified via 2026 SEO best-practice sources. Front-loading the first 120 chars mitigates mobile truncation. |
| A3 | Helmet's `data-rh="true" name="description"` overrides the static `index.html:12` description for Googlebot | 7, 9.7 | MEDIUM — Google's public documentation is ambiguous on behavior when two `<meta name="description">` tags coexist. Most SEO sources say Google reads the first one in document order, which would be the static one. **Phase 4/5 MUST re-verify this assumption with a live-site curl + Search Console inspection.** Phase 2 should NOT rely on Helmet's description "winning" — recommendation in 9.7 is to strip the static description in the prerender script. |
| A4 | `GutterServices.tsx` has zero internal link references (confirming true orphan status) | 1 | LOW — Phase 1 research claimed this. Not re-verified this session. Planner should run `grep -rn "gutter-services" src/` before deletion as a 1-command sanity check. |
| A5 | The first `<h2 className="text-3xl font-bold">` in each service page is the correct rewrite target (not a later H2) | 5 | LOW-MEDIUM — confirmed by direct read for Gutters, Siding, CommercialRoofing, RoofReplacement. Not verified for the other 6 (Emergency, Preventative, RoofInspection, RoofInstallation, RoofMaintenance, StormDamage). Planner should verify during drafting. |
| A6 | RoofRepair.tsx handling via ServicePageTemplate refactor belongs in Phase 3a | 1 | LOW — this is directly stated in Phase 1 RESEARCH.md (`.planning/phases/01-diagnosis-competitor-research/RESEARCH.md` L79-80). Locked decision from upstream plan. |

---

## Sources

### Primary (HIGH confidence — project artifacts)
- `.planning/phases/01-diagnosis-competitor-research/RESEARCH.md` — full root-cause diagnosis of duplicate titles, classification of all 35 sitemap pages, S3 Hybrid fix strategy, per-phase action checklist
- `.planning/phases/01-diagnosis-competitor-research/01-01-SUMMARY.md` — Phase 1 Plan 1 outcomes with decision log
- `.planning/phases/01-diagnosis-competitor-research/01-02-SUMMARY.md` — Phase 1 Plan 2 outcomes (competitor research methodology + data sources)
- `.planning/research/v1.1-gbp-competitors.md` — complete competitor GBP research, H2 recommendations for all 12 service pages (L373-479)
- `.planning/ROADMAP.md` — v1.1 milestone definition with phase goals and success criteria
- `.planning/REQUIREMENTS.md` — v1.1 requirements (META-01 through META-05, HEAD-01 through HEAD-04)
- `src/components/SEO.tsx` — confirmed no default props, component is a pure pass-through
- `src/components/ServicePageTemplate.tsx` — confirmed hardcoded duplicate title at L71 and shared H1 at L84-86 (out of Phase 2 scope)
- `src/routes.config.mjs` — authoritative sitemap/prerender route list (11 service routes, not 12)
- `src/App.tsx` — React Router declaration (12 service routes including orphan `/services/gutter-services`)
- `vercel.json` — confirmed `/services/gutter-services` → `/services/gutters` 301
- `scripts/prerender.mjs` — build-time prerender script; strips static `<title>` but NOT static `<meta description>` (L38)
- `index.html` — contains static title (L38) and duplicate static description (L12)
- `dist/services/gutters/index.html` + `dist/services/roof-repair/index.html` — verified both contain the 166-char duplicate title AND two description tags (one static, one `data-rh`)

### Secondary (MEDIUM confidence — live SERP guidance, verified Apr 2026)
- [Meta Title Length For SEO: Pixel Width Vs Character Limits](https://contentdecoded.com/meta-title-length/) — 2026 pixel-width guidance
- [Title Tag Length — Search Engine Land](https://searchengineland.com/title-tag-length-388468) — verified 60-char practical limit
- [Meta Title Length Best Practices 2026 — Scalenut](https://www.scalenut.com/blogs/meta-title-length-best-practices-2026) — 2026 best practices reference
- [Meta Description Length 2026 — SiteGrade](https://sitegrade.io/en/quick-answers/meta-description-title-tag-correct-lengths-2026/) — 920px desktop / 680px mobile guidance
- [Title & Meta Description 2026 Guide — Straight North](https://www.straightnorth.com/blog/title-tags-and-meta-descriptions-how-to-write-and-optimize-them-in-2026/) — front-loading recommendation for mobile truncation
- [Has Google returned to 512px? — Google Search Central Community](https://support.google.com/webmasters/thread/14768168/has-google-returned-to-length-of-only-512px-for-title-tag-in-serps-unnoticedly?hl=en) — noted volatility in title-width limits

### Tertiary (verified in-session via curl / grep)
- `npm run build` script flow: `npm run generate-sitemap && vite build && vite build --ssr ... && node scripts/prerender.mjs` (from `package.json`)
- `npm run typecheck` is the correct command name, not `tsc --noEmit` directly (from `package.json`)

---

## Metadata

**Confidence breakdown:**
- Scope decision (10 pages, not 12): HIGH — verified by file grep, dist listing, routes.config.mjs read, and vercel.json inspection
- Title format options: HIGH — character counts are deterministic; Option A recommendation mirrors Phase 1 competitor research
- Description budget: HIGH — verified 140-200 char target against 2026 SERP guidance
- H1 rewrites: HIGH — all 10 current H1s grep-confirmed, all 10 recommendations sourced from Phase 1 competitor research
- H2 sourcing map: MEDIUM-HIGH — 4 of 10 current first-H2s directly verified; 6 of 10 rely on the planner to verify during drafting (well-defined task, low risk)
- Superlative audit: HIGH — grep-verified all 11 service files for `\b(best|top|#1|premier|leading|finest|greatest)\b`
- Prerender verification plan: HIGH — manually verified duplicate title AND duplicate static description in 2 dist files (gutters, roof-repair); script logic read directly from `scripts/prerender.mjs`
- Latent static-description issue (9.7): MEDIUM — empirically confirmed the duplication exists in dist; behavior of Google when two description tags coexist is ambiguous (flagged A3)
- Project constraints: HIGH — extracted from both CLAUDE.md files

**Research date:** 2026-04-08
**Valid until:** 2026-05-08 (30 days — SERP pixel limits and SEO guidance are stable; Phase 1 dependencies and codebase structure are fixed)

---

## RESEARCH COMPLETE

**Phase:** 2 — Service Pages Metadata (Batch B2)
**Confidence:** HIGH

### Key Findings

1. **Scope is 10 pages, not 12.** ROADMAP phrasing "12 service pages" is off by 2: the actual codebase has 11 prerendered service pages in `routes.config.mjs` (not 12), and RoofRepair.tsx must be deferred to Phase 3a per Phase 1 research (leaving 10 inline-SEO pages in Phase 2 scope). The "12th" page (`/services/gutter-services`) is a 301-redirected orphan — not prerendered, not in sitemap, recommend deletion as optional Phase 2 cleanup.

2. **All 10 in-scope pages ship the same 166-char duplicate title TODAY** — verified by direct grep of `dist/services/*/index.html`. Every page also currently displays a brand-voice / pain-point H1 that does NOT satisfy HEAD-02's `Primary Service + Columbus Region` format requirement. All 10 H1s and all 10 titles are Phase 2 rewrite targets. Phase 1's `v1.1-gbp-competitors.md` provides 1:1 H2 recommendations for every in-scope page (zero gaps).

3. **Title format recommendation:** Option A — `Service in Columbus, OH | DTE Roofing` — 45-58 chars across all 10 pages, well under the 60-char safe SERP limit, matches Phase 1's H1 format, reads naturally. Two other options (B: `Columbus Service | DTE Roofing`, C: em-dash variant) are documented with tradeoffs for user decision.

4. **Latent prerender issue:** The build pipeline strips the static `index.html:12` `<title>` but NOT the static `<meta description>`. Every `dist/*.html` file currently contains TWO description tags — the static 197-char duplicate (first in document order) and the Helmet-emitted unique one (second). Phase 2's prerender verification MUST grep the `data-rh="true"` variant specifically, and the research recommends an optional one-line patch to `scripts/prerender.mjs` to strip the static description as well.

5. **One superlative-rewrite task beyond the primary H1/H2:** `RoofReplacement.tsx:202` has a content H2 "Best Roofing Materials for Ohio Weather" that violates META-05. Recommended rewrite: "Roofing Materials for Ohio Weather" (simple deletion of "Best"). All other `best`/`top`/superlative matches in the codebase are inside protected body content (material comparison cards, FAQ questions) and MUST be left alone.

### File Created
`.planning/phases/02-service-pages-metadata/02-RESEARCH.md`

### Confidence Assessment

| Area | Level | Reason |
|---|---|---|
| Scope decision | HIGH | Verified via routes.config.mjs, dist/ listing, vercel.json, and App.tsx cross-reference |
| Title format + budget | HIGH | Character counts deterministic; 2026 SERP guidance verified from 5 independent sources |
| Description budget | HIGH | 140-200 char target matches ROADMAP and 2026 guidance |
| H1 rewrites | HIGH | All 10 current H1s grep-verified; all 10 recommendations sourced from Phase 1 competitor research |
| H2 sourcing map | MEDIUM-HIGH | Phase 1 provides 1:1 map; 4/10 current H2s directly verified, 6/10 require planner verification during drafting (straightforward) |
| Superlative audit | HIGH | Full codebase grep completed and categorized |
| Prerender verification | HIGH | Manually verified dist output contains duplicate static description alongside Helmet description |
| Google's tie-breaker between two `<meta description>` tags | MEDIUM | Flagged as Assumption A3; Phase 4/5 must re-verify on live site |

### Open Questions for User / Planner

1. **Scope acceptance:** Confirm Phase 2 targets 10 files (inline-SEO pages only), deferring RoofRepair.tsx to Phase 3a per Phase 1 research
2. **Title format:** Choose between Option A (recommended), B, or C
3. **"Columbus, OH" vs "Central Ohio":** Per-page split recommended or single consistent phrase?
4. **GutterServices.tsx orphan:** Delete in Phase 2 (optional task 11) or defer to Phase 5?
5. **RoofReplacement.tsx L202 "Best" H2:** Rewrite in Phase 2 scope, or limit Phase 2 to first-H2 only?
6. **Optional one-line fix to `scripts/prerender.mjs`:** Strip static description in Phase 2, or defer to Phase 4/5?
7. **Verification of first-H2 current text on 6 pages** (Emergency, Preventative, RoofInspection, RoofInstallation, RoofMaintenance, StormDamage): planner should verify during drafting — straightforward grep.

### Ready for Planning

Research complete. Planner can now create `02-01-PLAN.md` for the copy-draft + atomic commit execution. The 10-page scope is tight and well-bounded; the drafter's creative work is the critical path (writing 10 unique titles + 10 unique descriptions + 10 H1s + 10 primary H2s = 40 copy artifacts, all within character budgets), followed by a single user approval gate, then 10 mechanical atomic commits.
