---
status: APPROVED
approved_at: 2026-04-09T20:49:29Z
approved_by: user
source: 03-COPY-DRAFTS.md
scope: 6 core pages (about, gallery, reviews, faq, contact, get-a-quote-consultation)
approval_path: approve-all
modifications: none
---

# Phase 3 - Core Pages Copy APPROVED

**Status:** APPROVED - frozen for Plan 03-02 mechanical application
**Scope:** 6 core pages: /about, /gallery, /reviews, /faq, /contact, /get-a-quote-consultation
**Validator:** All titles verified <=60 chars, all descriptions verified 140-200 chars via `node -e 't.length'`
**Superlative audit:** Zero matches against `best|top-rated|#1|premier|leading|finest|greatest|award-winning|most trusted|highest-rated`

## Scope (ROADMAP Phase 3 Anchor)

Phase 3 rewrites ONLY the `<SEO title>` and `<SEO description>` props on 6 core pages. This phase does NOT touch H1, H2, body copy, testimonials, FAQs, or any other page content. Per ROADMAP Phase 3:

> Goal: 6 non-location/non-service pages have unique, accurate titles and descriptions matching their actual content
> Success Criteria:
>   1. /about, /gallery, /reviews, /faq, /contact, /get-a-quote-consultation all have unique titles
>   2. All 6 have unique 140-200 char descriptions
>   3. No "BEST" superlatives; descriptions match page intent
>   4. Build passes; prerendered HTML contains new metadata

H1 rewrites for core pages are out of scope (they retain their brand-voice H1s like "Two Brothers, One Mission", "Let's Talk About Your Roof", etc.).

## In-Scope Files (6)

Line numbers verified against current source via grep.

| # | Route | File | SEO block line | Title line | Description line | H1 line | Notes |
|---|-------|------|----------------|------------|-------------------|---------|-------|
| 1 | /about | `src/pages/About.tsx` | 11 | 12 | 13 | 22 | Description currently contains "most trusted" — superlative per META-05 |
| 2 | /gallery | `src/pages/Gallery.tsx` | 78 | 79 | 80 | 89 | SEO block is nested inside lightbox JSX, NOT at the top of the component |
| 3 | /reviews | `src/pages/Reviews.tsx` | 73 | 74 | 75 | 84 | Description is a TEMPLATE LITERAL `{`Read ${totalReviews} verified five-star reviews ... highest-rated ...`}` — must be replaced with a plain string literal and "highest-rated" superlative removed |
| 4 | /faq | `src/pages/FAQ.tsx` | 106 | 107 | 108 | 123 | Standard SEO block structure |
| 5 | /contact | `src/pages/Contact.tsx` | 13 | 14 | 15 | 29 | Standard structure; Contact.tsx also has a SchemaMarkup component at lines 19-24 which is OUT of scope |
| 6 | /get-a-quote-consultation | `src/pages/InstantQuote.tsx` | 10 | 11 | 12 | 24 (spans 24-26) | Route is `/get-a-quote-consultation` (not `/instant-quote`) - verified in App.tsx:92 |

**IMPORTANT - Reviews.tsx description is a template literal, not a plain string.** The current code is:

```tsx
description={`Read ${totalReviews} verified five-star reviews from Columbus homeowners. See why DTE Roofing is the highest-rated roofing company in Columbus, OH.`}
```

Plan 03-02 MUST replace this entire expression (including the braces and backticks) with a plain double-quoted string literal. The `totalReviews` variable is a runtime value from `useReviewData()` and does not appear in prerendered HTML correctly anyway (it was always a static interpolation at render time). The approved description below is a plain string with no interpolation.

**IMPORTANT - Gallery.tsx SEO block is nested.** The SEO component appears at line 78 inside a later JSX fragment (after the lightbox modal), not at the top of the component return. Plan 03-02 must use the exact string from line 79 (title) and line 80 (description) as the Edit tool's `old_string`.

## Approved Copy - 6 Pages

Each row below contains the exact strings Plan 03-02 will write. Character counts are pre-verified via node.

### 1. About.tsx (`/about`)

| Field | Value | Chars |
|-------|-------|-------|
| title | `About DTE Roofing \| Family-Owned Roofer in Columbus, OH` | 55 |
| description | `Learn about DTE Roofing, a family-owned roofing company serving Columbus and Central Ohio since 2023. Licensed, insured, and committed to honest, quality workmanship.` | 166 |

Current strings that will be replaced:
- L12 title: `BEST Roofer in Columbus - if you're looking for Honest Roofing Services near me or Expert Roof Repair & Replacement near me - DTE Roofing is the place to be.` (duplicate boilerplate, 166 chars)
- L13 description: `Learn about DTE Roofing, Columbus's most trusted roofing company. Quality workmanship, honest service, and dedication to excellence.` (contains "most trusted" superlative)

H1 "Two Brothers, One Mission: Roofing Done Right" (line 22) is NOT edited.

### 2. Gallery.tsx (`/gallery`)

| Field | Value | Chars |
|-------|-------|-------|
| title | `Roofing Project Gallery \| DTE Roofing Columbus, OH` | 50 |
| description | `Browse our portfolio of completed roof replacements, repairs, and commercial roofing projects across Columbus, Dublin, Hilliard, and Central Ohio. See the DTE Roofing difference.` | 178 |

Current strings (lines 79, 80 - nested SEO block inside JSX):
- L79 title: duplicate boilerplate
- L80 description: `View our portfolio of completed roofing projects in Columbus, Dublin, and Hilliard OH. See quality roof installations, repairs, and commercial roofing work by DTE Roofing.`

H1 "See the Work That Speaks for Itself" (line 89) is NOT edited.

### 3. Reviews.tsx (`/reviews`)

| Field | Value | Chars |
|-------|-------|-------|
| title | `DTE Roofing Reviews \| Central Ohio Homeowners Speak Out` | 55 |
| description | `Read verified reviews from DTE Roofing customers across Columbus and Central Ohio. Real feedback on roof repairs, replacements, and installations from local homeowners.` | 168 |

Current strings:
- L74 title: duplicate boilerplate
- L75 description: template literal ``{`Read ${totalReviews} verified five-star reviews from Columbus homeowners. See why DTE Roofing is the highest-rated roofing company in Columbus, OH.`}`` - contains "highest-rated" superlative AND is a template literal (must become a plain string)

H1 "Don't Take Our Word for It - Hear From Our Customers" (line 84) is NOT edited.

**Note on variable cleanup:** After replacing the description with a plain string, the `totalReviews` variable may become unused depending on where else it is referenced. Plan 03-02 must NOT delete `totalReviews` or `useReviewData` usage — it is likely referenced elsewhere in the page body (e.g., in the H2 or review count display). Plan 03-02's only concern is the description prop on line 75.

### 4. FAQ.tsx (`/faq`)

| Field | Value | Chars |
|-------|-------|-------|
| title | `Roofing FAQs \| Questions Answered by DTE Roofing Columbus` | 57 |
| description | `Answers to common roofing questions about costs, timelines, warranties, insurance claims, and materials. Expert guidance from DTE Roofing in Columbus, OH. Call 614-971-6028.` | 173 |

Current strings:
- L107 title: duplicate boilerplate
- L108 description: `Get answers to common roofing questions. Learn about costs, timelines, warranties, insurance claims, and more. Expert guidance from Columbus's trusted roofing contractor.`

H1 "Your Roofing Questions, Answered Honestly" (line 123) is NOT edited.

### 5. Contact.tsx (`/contact`)

| Field | Value | Chars |
|-------|-------|-------|
| title | `Contact DTE Roofing \| Free Estimates in Columbus, OH` | 52 |
| description | `Contact DTE Roofing for a free roofing estimate in Columbus and Central Ohio. Located at 615 Hilliard Rome Rd. Call 614-971-6028 or email for 24/7 emergency service.` | 165 |

Current strings:
- L14 title: duplicate boilerplate
- L15 description: `Contact DTE Roofing for free estimates on roof repair, replacement & installation. Located at 615 Hilliard Rome Rd, Columbus OH. Call 614-971-6028. Fast response, 24/7 emergency service.`

H1 "Let's Talk About Your Roof" (line 29) is NOT edited. The SchemaMarkup component (lines 19-24) is NOT edited.

**NAP verification:** address "615 Hilliard Rome Rd" and phone "614-971-6028" are preserved verbatim in the new description (NAP lock).

### 6. InstantQuote.tsx (`/get-a-quote-consultation`)

| Field | Value | Chars |
|-------|-------|-------|
| title | `Get an Instant Roof Quote \| DTE Roofing Columbus, OH` | 52 |
| description | `Get an instant roof replacement quote in under 60 seconds using satellite imagery. Accurate estimates with no inspection needed to get started. Serving Central Ohio.` | 165 |

Current strings:
- L11 title: duplicate boilerplate
- L12 description: `Get an accurate roof replacement quote in 30 seconds. Satellite imagery estimates with no inspection needed to get started.`

H1 "Get Your Roof Quote in Under 60 Seconds" (lines 24-26, multi-line JSX) is NOT edited.

## Character Budget Validation

All 6 approved strings validated pre-freeze via node:

```
about                      title= 55 [OK] | desc=166 [OK]
gallery                    title= 50 [OK] | desc=178 [OK]
reviews                    title= 55 [OK] | desc=168 [OK]
faq                        title= 57 [OK] | desc=173 [OK]
contact                    title= 52 [OK] | desc=165 [OK]
get-a-quote-consultation   title= 52 [OK] | desc=165 [OK]
```

All titles 50-57 chars (<=60 SERP cap). All descriptions 165-178 chars (within 140-200 budget).

## Superlative Audit (META-05)

Grep against the approved titles + descriptions for `\b(best|top[- ]?rated|#1|premier|leading|finest|greatest|award[- ]?winning|most trusted|highest[- ]?rated|unmatched|unbeatable)\b` returns ZERO matches. All strings comply with META-05.

The current source contains 2 superlative violations that the new strings remove:
- `About.tsx:13` contains "most trusted" — removed
- `Reviews.tsx:75` contains "highest-rated" — removed

## Uniqueness Check (META-01, META-02)

All 6 approved titles are distinct. All 6 approved descriptions are distinct. Zero duplicates across the 6 core pages.

## Plain-Text Copy Roster (for verify-grep compatibility)

GFM tables escape pipes as `\|`, which breaks literal grep. The plain-text block below lists the 6 titles and descriptions with unescaped pipes so verification greps can match the literal SERP strings.

```
[about]
title: About DTE Roofing | Family-Owned Roofer in Columbus, OH
description: Learn about DTE Roofing, a family-owned roofing company serving Columbus and Central Ohio since 2023. Licensed, insured, and committed to honest, quality workmanship.

[gallery]
title: Roofing Project Gallery | DTE Roofing Columbus, OH
description: Browse our portfolio of completed roof replacements, repairs, and commercial roofing projects across Columbus, Dublin, Hilliard, and Central Ohio. See the DTE Roofing difference.

[reviews]
title: DTE Roofing Reviews | Central Ohio Homeowners Speak Out
description: Read verified reviews from DTE Roofing customers across Columbus and Central Ohio. Real feedback on roof repairs, replacements, and installations from local homeowners.

[faq]
title: Roofing FAQs | Questions Answered by DTE Roofing Columbus
description: Answers to common roofing questions about costs, timelines, warranties, insurance claims, and materials. Expert guidance from DTE Roofing in Columbus, OH. Call 614-971-6028.

[contact]
title: Contact DTE Roofing | Free Estimates in Columbus, OH
description: Contact DTE Roofing for a free roofing estimate in Columbus and Central Ohio. Located at 615 Hilliard Rome Rd. Call 614-971-6028 or email for 24/7 emergency service.

[get-a-quote-consultation]
title: Get an Instant Roof Quote | DTE Roofing Columbus, OH
description: Get an instant roof replacement quote in under 60 seconds using satellite imagery. Accurate estimates with no inspection needed to get started. Serving Central Ohio.
```

## Plan 03-02 Execution Instructions

Plan 03-02 MUST read this file and apply the exact title and description strings to each source file. Any deviation from these strings is a task failure.

Mechanical application rules:
- About.tsx line 12 title: Edit tool with exact old_string (current 166-char BEST title) -> new_string (approved title)
- About.tsx line 13 description: Edit tool with exact old_string (current "most trusted" description) -> new_string (approved description)
- Gallery.tsx lines 79 and 80: Edit tool; note the SEO block is nested inside JSX at lines 78-82, not at the top of the component
- Reviews.tsx line 74 title: standard Edit
- Reviews.tsx line 75 description: TEMPLATE LITERAL REPLACEMENT. The current expression is `description={`Read ${totalReviews} verified five-star reviews from Columbus homeowners. See why DTE Roofing is the highest-rated roofing company in Columbus, OH.`}`. Plan 03-02 must replace the ENTIRE expression including `{`...`}` braces with a plain double-quoted string: `description="Read verified reviews ..."`. The `totalReviews` variable is NOT deleted — it remains referenced elsewhere in the Reviews.tsx body (review count display). Only the description prop changes form.
- FAQ.tsx lines 107 and 108: standard Edit
- Contact.tsx lines 14 and 15: standard Edit. Do NOT touch SchemaMarkup (lines 19-24).
- InstantQuote.tsx lines 11 and 12: standard Edit. Do NOT touch H1 (lines 24-26).

Commit pattern (atomic per page):
- `feat(phase-03): update about metadata`
- `feat(phase-03): update gallery metadata`
- `feat(phase-03): update reviews metadata`
- `feat(phase-03): update faq metadata`
- `feat(phase-03): update contact metadata`
- `feat(phase-03): update instant-quote metadata` (filename slug is instant-quote; route is /get-a-quote-consultation)

Final verification task:
- Create scripts/verify-phase-03.sh mirroring scripts/verify-phase-02.sh
- Run `npm run build && npm run lint && npx tsc --noEmit` — all exit 0
- Run `bash scripts/verify-phase-03.sh` — exit 0
- Assert `grep -c '<title data-rh="true">' dist/{about,gallery,reviews,faq,contact,get-a-quote-consultation}/index.html` returns 1 per page
- Assert zero "BEST Roofer in Columbus" matches across all 6 dist files
