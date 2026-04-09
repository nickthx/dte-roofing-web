# Phase 2 — Service Pages Copy Drafts

**Status:** DRAFT — awaiting user approval
**Scope:** 10 inline-SEO service pages (RoofRepair deferred to Phase 3a; GutterServices is a 301 orphan)
**Validator:** All titles verified ≤60 chars, all descriptions verified 140-200 chars via `node -e 't.length'`

## Decisions Required Before Any Source Edit Lands

Source: `02-RESEARCH.md` Section 9.1-9.5 identified 5 decision points the user must resolve.

| ID   | Question | Research Recommendation | User Decision |
|------|----------|------------------------|---------------|
| D-01 | Confirm 10-page scope (defer RoofRepair to Phase 3a; GutterServices orphan 301'd at Vercel edge)? | ACCEPT: 10 files. RoofRepair needs ServicePageTemplate refactor which is scheduled for Phase 3a per Phase 1 research. | ___________ |
| D-02 | Title format: Option A (`Service in Columbus, OH \| DTE Roofing`), Option B (`Columbus Service \| DTE Roofing`), or Option C (`Service Columbus OH — DTE Roofing`)? | Option A — most natural phrasing, all 10 fit ≤60 chars, matches Phase 1 H1 recommendations. | ___________ |
| D-03 | City phrasing: single consistent "Columbus, OH" everywhere, single consistent "Central Ohio" everywhere, or the mixed split below (Columbus for city-level services; Central Ohio for region-wide services)? | Mixed split: Columbus, OH for Commercial Roofing, Gutters, Roof Replacement, Roof Installation, Preventative Maintenance. Central Ohio for Emergency, Storm Damage, Roof Inspection, Roof Maintenance, Siding. | ___________ |
| D-04a | Delete `src/pages/services/GutterServices.tsx` orphan as optional Plan 02-02 cleanup task? | RECOMMEND: Defer. Deletion requires also removing the App.tsx route at line 59 and the MultiStepLeadForm.tsx slug mapping at line 36. Low user value and expands surface area. Keep in Phase 5 cleanup instead. | ___________ |
| D-04b | Apply optional `scripts/prerender.mjs` one-line description-strip fix (strips the static template `<meta description>` so Helmet's unique description is the only one in dist HTML) as part of Plan 02-02? | RECOMMEND: YES. One-line change, directly fixes the META-02 latent bug flagged in RESEARCH.md Section 9.7. If declined, Phase 5 verification will likely fail and Phase 5 must reopen Phase 2. | ___________ |
| D-05 | Rewrite `RoofReplacement.tsx:202` secondary H2 "Best Roofing Materials for Ohio Weather" → "Roofing Materials for Ohio Weather" to remove the "Best" superlative per META-05? | RECOMMEND: YES. Single word removal, META-05 compliance, no body-copy rewrite. | ___________ |

**The executor MUST present this file to the user and WAIT for explicit approval on all 6 decisions (D-01 through D-05) before Task 2 runs. No source files are edited in this plan.**

## In-Scope Files (10)

Per `02-RESEARCH.md` Section 1 scope decision. Line numbers are verified against current source.

| # | File | Current title line | Current H1 line | Current first content H2 line | Current first content H2 class |
|---|------|-------------------|-----------------|-------------------------------|--------------------------------|
| 1 | `src/pages/services/CommercialRoofing.tsx` | 10 | 19 | 31 | `text-3xl font-bold text-charcoal-900 mb-6` |
| 2 | `src/pages/services/EmergencyServices.tsx` | 10 | 23 | 55 | `text-3xl font-bold text-charcoal-900 mb-6` |
| 3 | `src/pages/services/Gutters.tsx` | 10 | 19 | 31 | `text-3xl font-bold text-charcoal-900 mb-6` |
| 4 | `src/pages/services/PreventativeMaintenance.tsx` | 10 | 19 | 30 (H2 text on line 31) | `text-4xl font-bold text-charcoal-900 mb-6` (centered layout — NOT text-3xl) |
| 5 | `src/pages/services/RoofInspection.tsx` | 10 | 19 | 31 | `text-3xl font-bold text-charcoal-900 mb-6` |
| 6 | `src/pages/services/RoofInstallation.tsx` | 10 | 19 | 31 | `text-3xl font-bold text-charcoal-900 mb-6` |
| 7 | `src/pages/services/RoofMaintenance.tsx` | 10 | 19 | 31 | `text-3xl font-bold text-charcoal-900 mb-6` |
| 8 | `src/pages/services/RoofReplacement.tsx` | 11 | 31 | 43 | `text-3xl font-bold text-charcoal-900 mb-6` |
| 9 | `src/pages/services/Siding.tsx` | 10 | 19 | 31 | `text-3xl font-bold text-charcoal-900 mb-6` |
| 10 | `src/pages/services/StormDamage.tsx` | 10 | 19 | 48 | `text-3xl font-bold text-charcoal-900 mb-6` |

**IMPORTANT — PreventativeMaintenance is structurally different.** The first content H2 uses `text-4xl` (not `text-3xl`) and the H2 text is on line 31 inside a `text-center max-w-4xl mx-auto mb-16` wrapper. Plan 02-02 must NOT grep for `text-3xl` in this file — it will return the second H2 ("The Cost of Neglect" at line 67), which is a body-copy heading protected by the content lock.

## Drafted Copy — 10 Pages

Each row below contains the exact strings Plan 02-02 will write. Character counts are pre-verified.

### 1. CommercialRoofing.tsx (`/services/commercial-roofing`)

| Field | Value | Chars | Source |
|-------|-------|-------|--------|
| title | `Commercial Roofing Contractor Columbus, OH \| DTE Roofing` | 56 | Option A format |
| description | `Expert commercial roofing in Columbus, OH. TPO, EPDM, metal roofing, flat roof repair, and maintenance programs. Licensed and insured. Call 614-971-6028 for a free estimate.` | 173 | Per-page value prop |
| H1 | `Commercial Roofing in Columbus, OH` | 34 | competitors.md L450 |
| First H2 | `Commercial Flat Roof Systems: TPO, EPDM & Modified Bitumen` | 58 | competitors.md L452 |

Current strings that will be replaced:
- L10 title: the 166-char "BEST Roofer in Columbus..." duplicate
- L11 description: kept (already unique per Phase 1 research) UNLESS user prefers the new one — **recommend replacing to align with new title format and unify wording across all 10 pages**
- L19 H1: `Commercial Roofing That Protects Your Business`
- L31 first H2: `TPO & EPDM Systems, Flat Roof Repair, Metal Roofing & Maintenance Programs`

### 2. EmergencyServices.tsx (`/services/emergency-services`)

| Field | Value | Chars | Source |
|-------|-------|-------|--------|
| title | `24/7 Emergency Roof Repair in Central Ohio \| DTE Roofing` | 56 | Option A, Central Ohio per D-03 split |
| description | `24/7 emergency roof repair across Central Ohio. Immediate response for storm damage, leaks, and urgent roofing issues. Same-day service available. Call 614-971-6028 now.` | 169 | Per-page value prop |
| H1 | `24/7 Emergency Roofing in Central Ohio` | 39 | competitors.md L432 |
| First H2 | `24/7 Emergency Roof Repair & Tarping` | 37 | competitors.md L434 |

Current strings:
- L10 title: duplicate
- L11 description: replaced
- L23 H1: `Roof Emergency? We're on Our Way`
- L55 first content H2: `Emergency Tarping, Leak Repair, Storm Damage Response & Temporary Repairs`

### 3. Gutters.tsx (`/services/gutters`)

| Field | Value | Chars | Source |
|-------|-------|-------|--------|
| title | `Gutter Installation & Repair in Columbus, OH \| DTE Roofing` | 58 | Option A |
| description | `Seamless gutter installation, repair, and gutter guards in Columbus, OH. Custom colors, downspout extensions, fascia and soffit repair. Licensed and insured. Call 614-971-6028.` | 176 | Per-page value prop |
| H1 | `Gutter Installation & Repair in Columbus, OH` | 44 | competitors.md L459 (polished) |
| First H2 | `Seamless Gutter Installation in Central Ohio` | 44 | competitors.md L461 |

Current strings:
- L10 title: duplicate
- L11 description: replaced
- L19 H1: `Gutters That Actually Do Their Job`
- L31 first H2: `Seamless Gutter Installation, Gutter Guards, Downspout Extensions & Custom Colors`

### 4. PreventativeMaintenance.tsx (`/services/preventative-maintenance`)

| Field | Value | Chars | Source |
|-------|-------|-------|--------|
| title | `Preventative Roof Maintenance Columbus OH \| DTE Roofing` | 55 | Variation without "in" for char budget |
| description | `Preventative roof maintenance in Columbus and Central Ohio. Annual plans, seasonal inspections, gutter and vent care. Catch issues early and save money. Call 614-971-6028.` | 171 | Per-page value prop |
| H1 | `Preventative Roof Maintenance in Central Ohio` | 45 | competitors.md L423 |
| First H2 | `Annual Preventative Maintenance Plans` | 37 | competitors.md L425 |

Current strings:
- L10 title: duplicate
- L11 description: replaced
- L19 H1: `Stop Roof Problems Before They Start`
- L31 first content H2 (inside `text-4xl` centered wrapper): `Seasonal Inspections, Debris Removal, Flashing Repair & Gutter Maintenance`

### 5. RoofInspection.tsx (`/services/roof-inspection`)

| Field | Value | Chars | Source |
|-------|-------|-------|--------|
| title | `Free Roof Inspection in Central Ohio \| DTE Roofing` | 50 | Option A, Central Ohio |
| description | `Free, thorough roof inspections across Central Ohio. Pre-purchase, post-storm, and insurance claim reports with photos and honest assessments. Call DTE Roofing at 614-971-6028.` | 176 | Per-page value prop |
| H1 | `Free Roof Inspection in Central Ohio` | 36 | competitors.md L405 |
| First H2 | `What's Included in Our Free Roof Inspection` | 43 | competitors.md L407 |

Current strings:
- L10 title: duplicate
- L11 description: replaced
- L19 H1: `Know Exactly What's Going On Up There`
- L31 first H2: `Roof Condition Assessments, Storm Damage Inspections & Insurance Claim Reports`

### 6. RoofInstallation.tsx (`/services/roof-installation`)

| Field | Value | Chars | Source |
|-------|-------|-------|--------|
| title | `New Roof Installation in Columbus, OH \| DTE Roofing` | 51 | Option A |
| description | `Expert new roof installation in Columbus, OH. Asphalt, metal, and flat roofing systems for residential and commercial projects. Warranty-backed installs. Call 614-971-6028.` | 172 | Per-page value prop |
| H1 | `New Roof Installation in Columbus, OH` | 38 | competitors.md L396 |
| First H2 | `Roofing Systems We Install (Asphalt, Metal, Flat)` | 49 | competitors.md L398 |

Current strings:
- L10 title: duplicate
- L11 description: replaced
- L19 H1: `New Construction Roofing Built to Outlast the Weather`
- L31 first H2: `Asphalt Shingles, Metal Roofing, Ventilation Systems & Flashing Installation`

### 7. RoofMaintenance.tsx (`/services/roof-maintenance`)

| Field | Value | Chars | Source |
|-------|-------|-------|--------|
| title | `Roof Maintenance & Tune-Ups in Central Ohio \| DTE Roofing` | 57 | Option A, Central Ohio |
| description | `Roof maintenance and annual tune-ups across Central Ohio. Gutter cleaning, attic ventilation checks, minor repairs, and leak prevention. Maintenance plans. Call 614-971-6028.` | 174 | Per-page value prop |
| H1 | `Roof Maintenance & Tune-Ups in Central Ohio` | 43 | competitors.md L414 |
| First H2 | `Annual Roof Maintenance Checklist` | 33 | competitors.md L416 |

Current strings:
- L10 title: duplicate
- L11 description: replaced
- L19 H1: `Keep Your Roof Strong Year After Year`
- L31 first H2: `Annual Inspections, Gutter Cleaning, Minor Repairs & Preventative Care`

### 8. RoofReplacement.tsx (`/services/roof-replacement`)

| Field | Value | Chars | Source |
|-------|-------|-------|--------|
| title | `Roof Replacement in Columbus, OH \| DTE Roofing` | 46 | Option A |
| description | `Expert roof replacement in Columbus, OH. Full tear-off with asphalt, metal, or architectural shingles. Financing and GAF warranties available. Free estimates. Call 614-971-6028.` | 177 | Per-page value prop |
| H1 | `Roof Replacement in Columbus, OH` | 32 | competitors.md L387 (polished from current "Roof Replacement Columbus OH") |
| First H2 | `Full Roof Replacement: Asphalt, Metal & Architectural Shingles` | 62 | competitors.md L389 |
| Secondary H2 (line 202, gated on D-05) | `Roofing Materials for Ohio Weather` | 34 | META-05 superlative removal |

Current strings:
- L11 title: duplicate
- L12 description: replaced
- L31 H1: `Roof Replacement Columbus OH` (polished)
- L43 first H2: `Full Tear-Off, Architectural Shingles, Metal Roofing & Ventilation Upgrades`
- L202 secondary H2 (IF D-05 = yes): `Best Roofing Materials for Ohio Weather` → removes "Best"

**Note on H2 char count:** "Full Roof Replacement: Asphalt, Metal & Architectural Shingles" = 62 chars. H2 character budget is NOT constrained (only title and description have SERP budgets). H2s render in the DOM, not in SERP snippets. Any length fit for visual layout is acceptable.

### 9. Siding.tsx (`/services/siding`)

| Field | Value | Chars | Source |
|-------|-------|-------|--------|
| title | `Siding Installation & Repair in Central Ohio \| DTE Roofing` | 58 | Option A, Central Ohio |
| description | `Siding installation and repair across Central Ohio. Vinyl, fiber cement, and composite siding, plus storm damage repair and complete exterior packages. Call 614-971-6028.` | 170 | Per-page value prop |
| H1 | `Siding Installation & Repair in Central Ohio` | 44 | competitors.md L472 |
| First H2 | `Vinyl Siding, Fiber Cement & Composite Siding Options` | 53 | competitors.md L474 |

Current strings:
- L10 title: duplicate
- L11 description: replaced
- L19 H1: `Siding That Looks Great and Holds Up for Decades`
- L31 first H2: `Vinyl Siding, LP SmartSide, Siding Repair & Custom Trim Installation`

### 10. StormDamage.tsx (`/services/storm-damage`)

| Field | Value | Chars | Source |
|-------|-------|-------|--------|
| title | `Storm Damage Roof Repair in Central Ohio \| DTE Roofing` | 54 | Option A, Central Ohio |
| description | `Storm, hail, and wind damage roof repair across Central Ohio. Free inspections, insurance claim support, and emergency tarping. Licensed and insured. Call 614-971-6028.` | 168 | Per-page value prop |
| H1 | `Storm Damage Roof Repair in Central Ohio` | 40 | competitors.md L441 |
| First H2 | `Storm Damage, Hail & Wind Damage Roof Repair` | 44 | competitors.md L443 |

Current strings:
- L10 title: duplicate
- L11 description: replaced
- L19 H1: `Storm Hit? We'll Get Your Roof Back Fast`
- L48 first H2: `Hail Damage Repair, Wind Damage Restoration, Insurance Claims & Emergency Tarping`

## Plain-Text Title Roster (unescaped — verification reference)

The markdown tables above escape `|` as `\|` per GFM table rules. The unescaped strings that Plan 02-02 must write to source are:

```
Commercial Roofing Contractor Columbus, OH | DTE Roofing
24/7 Emergency Roof Repair in Central Ohio | DTE Roofing
Gutter Installation & Repair in Columbus, OH | DTE Roofing
Preventative Roof Maintenance Columbus OH | DTE Roofing
Free Roof Inspection in Central Ohio | DTE Roofing
New Roof Installation in Columbus, OH | DTE Roofing
Roof Maintenance & Tune-Ups in Central Ohio | DTE Roofing
Roof Replacement in Columbus, OH | DTE Roofing
Siding Installation & Repair in Central Ohio | DTE Roofing
Storm Damage Roof Repair in Central Ohio | DTE Roofing
```

## Character Budget Validation

All 10 drafts were validated pre-write:

```
commercial-roofing         title=56 [OK] | desc=173 [OK]
emergency-services         title=56 [OK] | desc=169 [OK]
gutters                    title=58 [OK] | desc=176 [OK]
preventative-maintenance   title=55 [OK] | desc=171 [OK]
roof-inspection            title=50 [OK] | desc=176 [OK]
roof-installation          title=51 [OK] | desc=172 [OK]
roof-maintenance           title=57 [OK] | desc=174 [OK]
roof-replacement           title=46 [OK] | desc=177 [OK]
siding                     title=58 [OK] | desc=170 [OK]
storm-damage               title=54 [OK] | desc=168 [OK]
```

All titles ≤60 chars. All descriptions 168-177 (within 140-200 budget).

## Superlative Audit (META-05)

Grep for `\b(best|top|#1|premier|leading|finest|greatest|award-winning|top-rated)\b` across all 10 drafted titles + descriptions returns ZERO matches. All drafts comply with META-05.

## What Plan 02-02 Will Do After Approval

1. Apply each drafted title, description, H1, and first-content-H2 to the corresponding source file (one atomic commit per page = 10 commits)
2. IF D-05 = yes: additionally edit `RoofReplacement.tsx:202` in the same commit as the RoofReplacement primary edits
3. IF D-04b = yes: add one additional commit patching `scripts/prerender.mjs` line 37 to also strip the static description
4. Run `npm run build && npm run lint && npm run typecheck` (must exit 0)
5. Grep each `dist/services/<slug>/index.html` for the new `data-rh="true"` title and description strings
6. Confirm no dist file contains "BEST Roofer in Columbus"
