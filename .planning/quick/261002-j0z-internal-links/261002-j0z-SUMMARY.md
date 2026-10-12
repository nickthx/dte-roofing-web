---
phase: quick-261002-j0z
plan: 02 (final; covers plans 01 + 02)
subsystem: seo-internal-linking
tags: [react, react-router, tailwind, prerender, seo, json-ld, verify-script]

requires:
  - phase: quick-261002-fqk (2A schema-ssot)
    provides: src/data/services.ts SERVICES SSOT, scripts/verify-schema.mjs, scripts/schema-baseline.json
provides:
  - scripts/verify-links.mjs + npm run verify-links (spec section 9, checks a-f)
  - crawlable Services dropdown, complete footer, SSOT-driven city/service lists
  - "We Serve These Areas" (13 cities + All Service Areas) on all 10 service pages
  - corrected neighbors graph + getLocationByCityLabel (src/data/locations.ts)
  - gallery project locations linked to city pages
  - "Roofing Services Near You" (RelatedAreas) on all 7 blog posts
  - JSON-LD on /services, /gallery, /blog, /financing, /get-a-quote-consultation; verify-schema requires all 41
affects: [orchestrator PR for feat/internal-links]

tech-stack:
  added: []
  patterns:
    - "SchemaMarkup optional itemList prop -> WebPage mainEntity ItemList (non-hub pages)"
    - "Page DOCUMENT_TITLE / DOCUMENT_DESCRIPTION consts shared by <SEO> and <SchemaMarkup>"
    - "Links nested in a role=button card stop click AND keydown propagation"

key-files:
  created:
    - scripts/verify-links.mjs
    - src/components/ServiceAreaLinks.tsx
    - src/components/RelatedAreas.tsx
    - .planning/quick/261002-j0z-internal-links/261002-j0z-heads-before.json
  modified:
    - package.json
    - scripts/verify-schema.mjs
    - .planning/PROJECT.md
    - src/components/{Navigation,Footer,ServicePageTemplate,SchemaMarkup}.tsx
    - src/data/{locations.ts,blogPosts.tsx}
    - src/data/posts/*.tsx (6)
    - src/pages/{Home,Contact,Locations,Gallery,BlogPost,Services,Blog,Financing,InstantQuote}.tsx
    - src/pages/services/*.tsx (9 hand-built pages)

key-decisions:
  - "neighbors set exactly as spec section 6, including upper-arlington <-> grove-city (D9)"
  - "Services ItemList via one optional SchemaMarkup prop; hub branch untouched, hub JSON-LD byte-identical"
  - "verify-schema keeps NO_SCHEMA_ROUTES as an empty list so future exceptions must be explicit"

requirements-completed: [QUICK-261002-j0z]

duration: plan 01 ~9 min (18:04:30Z -> 18:13:06Z); plan 02 ~8 min (18:15:07Z -> 18:23Z)
completed: 2026-10-02
---

# Quick 261002-j0z: internal links, nav, footer, lists from one source (Week 2B) — Final Summary

**The header dropdown and footer now carry all 10 services. Every city and service list renders from `LOCATIONS`/`SERVICES`. All 10 service pages link the 13 cities, gallery locations link their city pages, and every blog post ends with 4 related city cards. The `neighbors` graph matches §6, and the five bare pages now emit JSON-LD. `verify-links` passes 42/42 and `verify-schema` passes 41/41 with 0 skips. Titles and meta descriptions are byte-identical on all 42 pages, and the hub JSON-LD is byte-identical.**

Branch `feat/internal-links`, 11 commits on top of `main` (e67d43b). Nothing pushed, no PR, no merge (D1).

## 1. Final gate (§10, run separately on the final tree, HEAD = e48ce2f)

| Step | Command | Exit | Result |
|------|---------|------|--------|
| 1 | `npm run build` | **0** | prerender wrote all routes + `dist/404.html`; `git restore public/sitemap.xml` afterwards, sitemap clean |
| 2 | `npm run verify-links` | **0** | `checked 42, pass 42, fail 0` |
| 3 | `npm run verify-schema` | **0** | `checked 41, pass 41, fail 0, skip 0` |
| 4 | `npm run typecheck` | 2 (pre-existing red) | **12** `error TS`, identical set **and** identical line:col to the e67d43b baseline |
| 5 | `npm run lint` | 1 (pre-existing red) | **`✖ 6 problems (5 errors, 1 warning)`**, identical file + rule + message set |
| 6 | heads comparison (scratchpad script, plan-01 rules) | 0 | `heads: 42 compared, title diffs 0, description diffs 0` |

### verify-links (full output, verbatim)

```
route                                              | links | status | details
/                                                  |    96 | PASS   | 
/about                                             |    64 | PASS   | 
/services                                          |    67 | PASS   | 
/services/roof-installation                        |    84 | PASS   | 
/services/roof-repair                              |    89 | PASS   | 
/services/roof-replacement                         |   103 | PASS   | 
/services/roof-inspection                          |    80 | PASS   | 
/services/gutters                                  |    79 | PASS   | 
/services/emergency-services                       |    79 | PASS   | 
/services/storm-damage                             |    87 | PASS   | 
/services/preventative-maintenance                 |    78 | PASS   | 
/services/siding                                   |    81 | PASS   | 
/services/commercial-roofing                       |    81 | PASS   | 
/gallery                                           |   107 | PASS   | 
/reviews                                           |    62 | PASS   | 
/blog                                              |    74 | PASS   | 
/blog/signs-you-need-a-new-roof                    |    75 | PASS   | 
/blog/roof-replacement-cost-columbus-ohio          |    76 | PASS   | 
/blog/asphalt-vs-metal-roofing-ohio                |    75 | PASS   | 
/blog/hail-damage-roof-insurance-claim-ohio        |    73 | PASS   | 
/blog/how-long-does-a-roof-last-ohio               |    73 | PASS   | 
/blog/roof-repair-vs-replacement                   |    74 | PASS   | 
/blog/what-to-look-for-columbus-roofing-contractor |    73 | PASS   | 
/faq                                               |    64 | PASS   | 
/financing                                         |    60 | PASS   | 
/contact                                           |    77 | PASS   | 
/locations                                         |    86 | PASS   | 
/locations/columbus                                |    81 | PASS   | 
/locations/hilliard                                |    82 | PASS   | 
/locations/dublin                                  |    92 | PASS   | 
/locations/new-albany                              |    91 | PASS   | 
/locations/upper-arlington                         |    83 | PASS   | 
/locations/westerville                             |    83 | PASS   | 
/locations/gahanna                                 |    83 | PASS   | 
/locations/reynoldsburg                            |    82 | PASS   | 
/locations/grove-city                              |    81 | PASS   | 
/locations/pickerington                            |    82 | PASS   | 
/locations/worthington                             |    83 | PASS   | 
/locations/delaware                                |    91 | PASS   | 
/locations/powell                                  |    82 | PASS   | 
/get-a-quote-consultation                          |    59 | PASS   | 
data: neighbors                                    |     - | PASS   | 
checked 42, pass 42, fail 0
```

### verify-schema (full output, verbatim)

```
route                                              | nodes | status | details
/                                                  |     2 | PASS   | 
/about                                             |     3 | PASS   | note(g): new schema page
/services                                          |     3 | PASS   | note(g): new schema page
/services/roof-installation                        |     5 | PASS   | 
/services/roof-repair                              |     5 | PASS   | 
/services/roof-replacement                         |     5 | PASS   | 
/services/roof-inspection                          |     5 | PASS   | 
/services/gutters                                  |     5 | PASS   | 
/services/emergency-services                       |     5 | PASS   | 
/services/storm-damage                             |     5 | PASS   | 
/services/preventative-maintenance                 |     5 | PASS   | 
/services/siding                                   |     5 | PASS   | 
/services/commercial-roofing                       |     5 | PASS   | 
/gallery                                           |     3 | PASS   | note(g): new schema page
/reviews                                           |     3 | PASS   | 
/blog                                              |     3 | PASS   | note(g): new schema page
/blog/signs-you-need-a-new-roof                    |     5 | PASS   | 
/blog/roof-replacement-cost-columbus-ohio          |     5 | PASS   | 
/blog/asphalt-vs-metal-roofing-ohio                |     5 | PASS   | 
/blog/hail-damage-roof-insurance-claim-ohio        |     5 | PASS   | 
/blog/how-long-does-a-roof-last-ohio               |     5 | PASS   | 
/blog/roof-repair-vs-replacement                   |     5 | PASS   | 
/blog/what-to-look-for-columbus-roofing-contractor |     5 | PASS   | 
/faq                                               |     4 | PASS   | 
/financing                                         |     3 | PASS   | note(g): new schema page
/contact                                           |     3 | PASS   | 
/locations                                         |     3 | PASS   | 
/locations/columbus                                |    10 | PASS   | 
/locations/hilliard                                |    11 | PASS   | 
/locations/dublin                                  |    11 | PASS   | 
/locations/new-albany                              |    11 | PASS   | 
/locations/upper-arlington                         |    11 | PASS   | 
/locations/westerville                             |    11 | PASS   | 
/locations/gahanna                                 |    11 | PASS   | 
/locations/reynoldsburg                            |    11 | PASS   | 
/locations/grove-city                              |    11 | PASS   | 
/locations/pickerington                            |    11 | PASS   | 
/locations/worthington                             |    11 | PASS   | 
/locations/delaware                                |    11 | PASS   | 
/locations/powell                                  |    11 | PASS   | 
/get-a-quote-consultation                          |     3 | PASS   | note(g): new schema page
checked 41, pass 41, fail 0, skip 0
```

Notes on that table:
- The five `note(g): new schema page` rows on the newly covered pages are expected. `scripts/schema-baseline.json` was deliberately NOT regenerated (D10), so it still records `jsonLdBlocks: 0` for them.
- The `/about` `note(g)` row is pre-existing from 2A (About got schema after the baseline was taken). This task did not cause it.
- `/locations/columbus` has 10 nodes and the other city pages have 11. This is also pre-existing: `schema-baseline.json` records Columbus with `faqQuestions: 0` and 3 JSON-LD blocks, versus 4 for the others.

### Heads (D2), titles and meta descriptions

```
baseline keys: 42; routes compared: 42
heads: 42 compared, title diffs 0, description diffs 0
/: identical (title + meta description)
/locations: identical (title + meta description)
/locations/hilliard: identical (title + meta description)
/services/roof-repair: identical (title + meta description)
```
I used plan 01's rules exactly. File mapping: `/` → `dist/index.html`, `/404` → `dist/404.html`, any other route → `dist<route>/index.html`. Title = raw group 1 of the first `<title[^>]*>`. Description = raw `content` of the first `<meta … name="description" …>`. The comparison ran against the committed `261002-j0z-heads-before.json`. Bodies were not compared; they differ by design.

### Hub JSON-LD (D10)

```
hub json-ld IDENTICAL 005ce82ca1383316e1ccf71e09f1aac3bc53572c007d4244e81c1429ac7e3b7e
```
This equals the plan-01 `hub-jsonld-sha256`. The rule: concatenate every `application/ld+json` script body in `dist/locations/index.html` in document order, join with `\n`, then take the sha256.

### Typecheck (12, unchanged set and positions)

```
src/components/ServiceAreaMap.tsx(35,16): error TS2339: Property 'google' does not exist on type 'Window & typeof globalThis'.
src/components/ServiceAreaMap.tsx(56,30): error TS2503: Cannot find namespace 'google'.
src/components/ServiceAreaMap.tsx(61,21): error TS2304: Cannot find name 'google'.
src/components/ServiceAreaMap.tsx(85,24): error TS2304: Cannot find name 'google'.
src/components/ServiceAreaMap.tsx(86,27): error TS2503: Cannot find namespace 'google'.
src/components/ServiceAreaMap.tsx(92,26): error TS2304: Cannot find name 'google'.
src/components/ServiceAreaMap.tsx(97,17): error TS2304: Cannot find name 'google'.
src/components/ServiceAreaMap.tsx(109,30): error TS2304: Cannot find name 'google'.
src/pages/About.tsx(2,30): error TS6133: 'Users' is declared but its value is never read.
src/pages/Reviews.tsx(60,9): error TS6133: 'fiveStarPercentage' is declared but its value is never read.
src/pages/services/EmergencyServices.tsx(2,23): error TS6133: 'ArrowRight' is declared but its value is never read.
src/pages/services/RoofRepair.tsx(71,7): error TS2322: Type 'Element' is not assignable to type 'string'.
```

### Lint (`✖ 6 problems (5 errors, 1 warning)`, unchanged set)

| File | Rule | Position now (baseline) |
|------|------|-------------------------|
| src/components/ServicePageTemplate.tsx `'_serviceName'` | @typescript-eslint/no-unused-vars | 39:16 (38:16, plan 01 added an import line) |
| src/hooks/useLeadTracking.ts `useEffect` called conditionally | react-hooks/rules-of-hooks | 85:3 (85:3) |
| src/pages/About.tsx `'Users'` | @typescript-eslint/no-unused-vars | 2:30 (2:30) |
| src/pages/Gallery.tsx `galleryRef.current` (warning) | react-hooks/exhaustive-deps | 79:39 (70:39, Gallery gained imports, consts and the slug array) |
| src/pages/Reviews.tsx `'fiveStarPercentage'` | @typescript-eslint/no-unused-vars | 60:9 (60:9) |
| src/pages/services/EmergencyServices.tsx `'ArrowRight'` | @typescript-eslint/no-unused-vars | 2:23 (2:23) |

The new and changed files are lint-clean with no `any`: RelatedAreas, ServiceAreaLinks, SchemaMarkup, locations.ts, Services, Blog, Financing, InstantQuote, BlogPost and verify-schema.mjs (checked with `npx eslint <files>`). Gallery's only finding is the pre-existing warning.

### Proof the gates bite

- **verify-links on the untouched e67d43b build** (plan 01): exit 1, **`checked 42, pass 0, fail 42`**. The failures broke down as `a:` 41, `b:` 13, `c:` 8, `d:` 1, `e:` 0, `f:` 41.
- **verify-schema with the emptied skip list, run on the pre-Task-2 dist** (plan 02): exit 1, `checked 41, pass 36, fail 5, skip 0`. Each of `/services`, `/gallery`, `/blog`, `/financing` and `/get-a-quote-consultation` reported `FAIL | none: no JSON-LD blocks`.
- **New `/services` (f) branch**: I renamed `"@type":"ItemList"` → `"ItemListX"` in a copy of `dist/services/index.html`, which gave `FAIL | f: no ItemList with 10 items (found none)` and `checked 41, pass 40, fail 1, skip 0`. After restoring the file it went back to `checked 41, pass 41, fail 0, skip 0`.

## 2. `git diff --stat main...HEAD`

```
 .planning/PROJECT.md                               |   6 +-
 .../261002-j0z-heads-before.json                   | 170 ++++++++++++
 package.json                                       |   3 +-
 scripts/verify-links.mjs                           | 307 +++++++++++++++++++++
 scripts/verify-schema.mjs                          |  13 +-
 src/components/Footer.tsx                          |  64 ++++-
 src/components/Navigation.tsx                      |  86 +++---
 src/components/RelatedAreas.tsx                    |  41 +++
 src/components/SchemaMarkup.tsx                    |  24 +-
 src/components/ServiceAreaLinks.tsx                |  36 +++
 src/components/ServicePageTemplate.tsx             |  54 +---
 src/data/blogPosts.tsx                             |   2 +
 src/data/locations.ts                              |  26 +-
 src/data/posts/asphalt-vs-metal-roofing-ohio.tsx   |   1 +
 .../hail-damage-roof-insurance-claim-ohio.tsx      |   1 +
 src/data/posts/how-long-does-a-roof-last-ohio.tsx  |   1 +
 src/data/posts/roof-repair-vs-replacement.tsx      |   1 +
 .../posts/roof-replacement-cost-columbus-ohio.tsx  |   1 +
 ...hat-to-look-for-columbus-roofing-contractor.tsx |   1 +
 src/pages/Blog.tsx                                 |  16 +-
 src/pages/BlogPost.tsx                             |   7 +
 src/pages/Contact.tsx                              |  36 +--
 src/pages/Financing.tsx                            |  14 +-
 src/pages/Gallery.tsx                              |  59 +++-
 src/pages/Home.tsx                                 |  36 +--
 src/pages/InstantQuote.tsx                         |  15 +-
 src/pages/Locations.tsx                            |  17 +-
 src/pages/Services.tsx                             |  20 +-
 src/pages/services/CommercialRoofing.tsx           |   7 +
 src/pages/services/EmergencyServices.tsx           |   9 +
 src/pages/services/Gutters.tsx                     |   9 +
 src/pages/services/PreventativeMaintenance.tsx     |   9 +
 src/pages/services/RoofInspection.tsx              |   9 +
 src/pages/services/RoofInstallation.tsx            |   7 +
 src/pages/services/RoofReplacement.tsx             |   7 +
 src/pages/services/Siding.tsx                      |   7 +
 src/pages/services/StormDamage.tsx                 |   9 +
 37 files changed, 916 insertions(+), 215 deletions(-)
```

No `index.html`, `vercel.json`, `public/` (images or sitemap), route, slug or dependency change. `package.json` only gains the `verify-links` script.

## 3. Commits (`git log --oneline main..HEAD`)

```
e48ce2f docs(planning): describe current schema in PROJECT.md, record heads baseline (261002-j0z)
6c7ee1b chore(verify): require JSON-LD on every route and a 10-item ItemList on /services
fa08b5d feat(schema): add JSON-LD to services, gallery, blog, financing and instant quote
4bece0a feat(blog): add related service areas to every post
4ee4c64 feat(gallery): link project locations to their city pages
d907433 fix(locations): correct neighbors graph and add getLocationByCityLabel
3f6cfda feat(services): link all 13 service areas from every service page
7a4dc34 refactor(pages): render home, contact and hub lists from LOCATIONS/SERVICES
966cf2e feat(footer): list all SERVICES and link Facebook, Instagram and BBB
952a479 feat(nav): keep services dropdown in the DOM and list all SERVICES
529fc44 chore(verify): add verify-links internal-link gate
```

Plan 01 made 5 commits (529fc44 to 3f6cfda) and plan 02 made 6 (d907433 to e48ce2f). Every commit used explicit-path staging. `git show --stat e48ce2f` lists exactly `.planning/PROJECT.md` and `261002-j0z-heads-before.json`. No branch commit touches `public/sitemap.xml`, `.claude/settings.local.json`, `dist/`, the untracked root files, or any PLAN/CONTEXT/SUMMARY file. Hygiene at the end: nothing staged, the sitemap is clean, and `.claude/settings.local.json` is still ` M` (unstaged).

## 4. Visible changes for the user

### 4a. Label / order changes (D3, D4, D6, from plan 01)

- **Nav dropdown (desktop + mobile):** now shows the 10 SERVICES in SSOT order: Roof Installation, Roof Repair, Roof Replacement, Roof Inspection, Gutter Services, Emergency Roofing Services, Storm Damage Repair, Preventative Maintenance, Siding, Commercial Roofing. "All Services" stays first. Renamed: `Storm Damage Restoration` → `Storm Damage Repair`, `Gutters` → `Gutter Services`. Added: Roof Installation, Roof Inspection, Emergency Roofing Services. Hover and close-delay behaviour are unchanged.
- **Footer Services column:** the same 10 in SSOT order, plus a final "All Services". Renamed: `Inspections` → `Roof Inspection`, `Emergency Services` → `Emergency Roofing Services`, `Storm Damage` → `Storm Damage Repair`, `Gutters` → `Gutter Services`. Added: Roof Replacement, Siding, All Services.
- **Footer trust row:** the BBB Accredited tile is now a link with unchanged text. New Facebook and Instagram tiles sit after Nextdoor Verified. The grid stays `md:grid-cols-5`, so the 7 tiles wrap to a second row.
- **Home "Areas We Serve" / Contact "Areas We Serve in Central Ohio":** now 13 cities in SSOT order. Upper Arlington, Reynoldsburg and Pickerington are new, and the order changed from Hilliard, Dublin, Columbus, …
- **Hub `/locations` "Services We Provide":** grew from 6 to 10 items in SSOT order. `Emergency Services` → `Emergency Roofing Services` and `Maintenance Programs` → `Preventative Maintenance`. Added: Roof Inspection, Gutter Services, Siding, Commercial Roofing.
- **Hub city cards:** the `aria-label` override was removed, so the accessible name is now the visible text. There is no visual change.

### 4b. D5: "We Serve These Areas" on the 9 hand-built service pages. The spec did not spell this out as a visible addition.

Each block has 13 city cards + "All Service Areas" and sits directly before the page's final CTA:

| File | Sits before (final CTA, pre-edit line) | Neighbouring section (pre-edit line) | Wrapper used |
|------|----------------------------------------|--------------------------------------|--------------|
| RoofInstallation.tsx | `py-20 bg-primary-700 text-white` (675) | `py-20 bg-white` (50) | `div.py-20 bg-white > div.container mx-auto px-4` |
| RoofReplacement.tsx | `py-20 bg-primary-700 text-white` (625) | `py-20 bg-white` (51) | `div.py-20 bg-white > div.container mx-auto px-4` |
| RoofInspection.tsx | `py-20 bg-primary-700 text-white` (271) | `py-16 bg-gray-50` (252) | `div.py-16 bg-gray-50 > div.container mx-auto px-4 > div.max-w-3xl mx-auto` |
| Gutters.tsx | `py-20 bg-primary-700 text-white` (307) | `py-16 bg-gray-50` (288) | `div.py-16 bg-gray-50 > div.container mx-auto px-4 > div.max-w-3xl mx-auto` |
| EmergencyServices.tsx | `py-20 bg-red-700 text-white` (302) | `py-16 bg-gray-50` (283) | `div.py-16 bg-gray-50 > div.container mx-auto px-4 > div.max-w-3xl mx-auto` |
| StormDamage.tsx | `py-20 bg-primary-700 text-white` (377) | `py-16 bg-white border-t border-gray-100` (293) | `div.py-16 bg-white border-t border-gray-100 > div.container mx-auto px-4 > div.max-w-4xl mx-auto` |
| PreventativeMaintenance.tsx | `py-20 bg-primary-700 text-white` (351) | `py-16 bg-gray-50` (332) | `div.py-16 bg-gray-50 > div.container mx-auto px-4 > div.max-w-3xl mx-auto` |
| Siding.tsx | `py-20 bg-primary-700 text-white` (678) | `py-20 bg-white` (50) | `div.py-20 bg-white > div.container mx-auto px-4` |
| CommercialRoofing.tsx | `py-20 bg-primary-700 text-white` (801) | `py-20 bg-white` (50) | `div.py-20 bg-white > div.container mx-auto px-4` |

RoofRepair renders the same block through `ServicePageTemplate.tsx`. It previously showed 5 cards and now shows 14.

### 4c. Neighbors (§6, D9): changes the "Nearby Areas We Serve" cards on city pages

NearbyAreas shows the first 5 `neighbors`, so the visible cards changed on 10 of 13 city pages. The same lists feed each city page's WebPage `mentions` in JSON-LD (D9 side effect, verify-schema still passes).

| City page | Cards before (first 5) | Cards after (first 5) |
|-----------|------------------------|-----------------------|
| columbus | hilliard, dublin, upper-arlington, westerville, gahanna | hilliard, upper-arlington, worthington, gahanna, grove-city |
| hilliard | columbus, dublin, upper-arlington, grove-city | unchanged |
| dublin | columbus, hilliard, powell, worthington, upper-arlington | hilliard, powell, worthington, upper-arlington, columbus |
| new-albany | columbus, westerville, gahanna | gahanna, westerville, columbus, reynoldsburg, pickerington |
| upper-arlington | columbus, hilliard, dublin, worthington, grove-city | unchanged |
| westerville | columbus, powell, gahanna, worthington, new-albany | worthington, new-albany, gahanna, powell, delaware |
| gahanna | columbus, westerville, new-albany, reynoldsburg | columbus, new-albany, westerville, reynoldsburg, pickerington |
| reynoldsburg | columbus, gahanna, pickerington | gahanna, pickerington, columbus, new-albany |
| grove-city | columbus, hilliard, pickerington | columbus, hilliard, upper-arlington |
| pickerington | columbus, reynoldsburg, grove-city, gahanna | reynoldsburg, gahanna, columbus, new-albany |
| worthington | columbus, dublin, powell, westerville, upper-arlington | columbus, dublin, westerville, powell, delaware |
| delaware | powell, westerville, worthington | unchanged |
| powell | dublin, westerville, delaware, worthington | dublin, worthington, delaware, westerville |

Inbound neighbor references now: columbus 9, hilliard 4, dublin 4, new-albany 4, upper-arlington 4, westerville 5, gahanna 5, reynoldsburg 3, grove-city 3, pickerington 3, worthington 6, delaware 3, powell 4. All are ≥ 3 and none is self-referencing. Before, new-albany and pickerington had 2 and delaware had 1.

**D9 note:** I kept `upper-arlington ↔ grove-city` (upper-arlington lists grove-city, and grove-city lists upper-arlington) because §6 says "exactly as follows", even though the spec's Why section calls that pair non-adjacent. `grove-city ↔ pickerington` is gone, as §6 specifies.

### 4d. Gallery (§4, D7)

- `/gallery` main now has **46** `/locations/<slug>` links (gate ≥ 10). That is 23 of the 26 projects, each with 2 labels: the hover overlay and the badge.
- Plain City, Lewis Center and Grandview Heights stay plain `<span>`s (6 spans in total).
- Grid links call `stopPropagation()` on click and on keydown, so neither a click nor Enter on the city link opens the lightbox. The lightbox link uses `onClick={closeLightbox}`, which restores `document.body.style.overflow` before navigation.

### 4e. Blog (§5, D8)

All 7 posts render `<section aria-labelledby="related-areas-heading">` with the heading "Roofing Services Near You" and exactly their 4 §5 cities, in order. It sits after the bottom CTA and before "Back to All Articles", both inside `</article>`. I checked the order on the built HTML for all 7 posts.

**Visual observation for the user (Planner-verified fact 3):** the cards are NearbyAreas' card markup copied verbatim, as §5 requires (`bg-gray-50` + `border-gray-200`). The blog post page background is also `bg-gray-50`, so the cards stand out from the page only by their border. I did not adapt this, as instructed. If it looks too flat, a one-class change (`bg-white` on the cards) would fix it, but that needs the user's OK.

### 4f. Schema on the five bare pages (§7, D10)

| Page | WebPage @type | WebPage name (= `<title>`) | Breadcrumb | mainEntity |
|------|---------------|----------------------------|------------|------------|
| /services | CollectionPage | Roofing Services in Columbus, OH \| DTE Roofing | Home > Services | ItemList, 10 items (the 10 SERVICES in SSOT order, absolute URLs) |
| /gallery | CollectionPage | Roofing Project Gallery \| DTE Roofing Columbus, OH | Home > Gallery | none |
| /blog | CollectionPage | Roofing Tips & News \| DTE Roofing Blog | Home > Blog | none |
| /financing | WebPage | Consumer Credit Center \| Roofing Financing \| DTE Roofing | Home > Financing | none |
| /get-a-quote-consultation | WebPage | Get an Instant Roof Quote \| DTE Roofing Columbus, OH | Home > Instant Quote | none |

(`\|` is table escaping.) A script cut the title and description literals out of each `<SEO>` into `DOCUMENT_TITLE` / `DOCUMENT_DESCRIPTION` consts (not retyped). It asserted that each value equals the plan's §7 table and that each canonical equals the `pageUrl`.

## 5. D6 "left by design": remaining hard-coded `/locations/<slug>` and `/services/<slug>` targets

Command: `grep -rEo "[\"'\`]/(locations|services)/[a-z][a-z-]*[\"'\`]" src/pages src/components | cut -d: -f1 | sort | uniq -c`. The "before" column is the same pattern run over `git show e67d43b:<file>`, and it matches the planner's numbers exactly.

| File | Before (e67d43b) | After (e48ce2f) |
|------|-----------------:|----------------:|
| src/components/Footer.tsx | 8 | 0 (converted, §2) |
| src/components/Navigation.tsx | 7 | 0 (converted, §1) |
| src/components/ServicePageTemplate.tsx | 5 | 0 (converted, §3 / D5) |
| src/pages/Contact.tsx | 10 | 0 (converted, §3) |
| src/pages/Home.tsx | 17 | 7 (city list converted; remaining 7 = service cards / in-copy links) |
| src/pages/Locations.tsx | 6 | 0 (converted, §3) |
| src/pages/Services.tsx | 7 | 7 |
| src/pages/locations/Columbus.tsx | 10 | 10 |
| src/pages/locations/Delaware.tsx | 17 | 17 |
| src/pages/locations/Dublin.tsx | 17 | 17 |
| src/pages/locations/Gahanna.tsx | 10 | 10 |
| src/pages/locations/GroveCity.tsx | 10 | 10 |
| src/pages/locations/Hilliard.tsx | 10 | 10 |
| src/pages/locations/NewAlbany.tsx | 15 | 15 |
| src/pages/locations/Pickerington.tsx | 10 | 10 |
| src/pages/locations/Powell.tsx | 10 | 10 |
| src/pages/locations/Reynoldsburg.tsx | 10 | 10 |
| src/pages/locations/UpperArlington.tsx | 10 | 10 |
| src/pages/locations/Westerville.tsx | 10 | 10 |
| src/pages/locations/Worthington.tsx | 10 | 10 |
| src/pages/services/CommercialRoofing.tsx | 7 | 7 |
| src/pages/services/EmergencyServices.tsx | 4 | 4 |
| src/pages/services/Gutters.tsx | 6 | 6 |
| src/pages/services/PreventativeMaintenance.tsx | 5 | 5 |
| src/pages/services/RoofInspection.tsx | 7 | 7 |
| src/pages/services/RoofInstallation.tsx | 11 | 11 |
| src/pages/services/RoofRepair.tsx | 11 | 11 |
| src/pages/services/RoofReplacement.tsx | 28 | 28 |
| src/pages/services/Siding.tsx | 8 | 8 |
| src/pages/services/StormDamage.tsx | 12 | 12 |

This is exactly the expected outcome: Footer, Navigation, ServicePageTemplate, Contact and Locations drop out, Home goes from 17 to 7, and every other file is unchanged. The remaining links are in-sentence links and rich cards with their own copy (page copy under D6). Nothing from this table was converted. The new links (Gallery, RelatedAreas, ServiceAreaLinks, Nav, Footer) use template literals or SSOT `path` values, so the pattern does not count them.

## 6. Deviations

### Plan 01 (from its handoff)
- **verify-links (d) is slightly stricter than the spec wording.** It also fails a neighbor slug that is not one of the 13 cities, and it counts distinct source cities. Neither rule changes any result on the old data or on the §6 data.
- **D5 insertion was done by an assertion-guarded scratchpad script** (one import anchor and one CTA anchor per file, CRLF preserved) rather than by hand. The diff is additions only.

### Plan 02
- **Scripted edits instead of hand edits** (method only, same output as the plan describes). Two assertion-guarded scratchpad scripts, neither in the repo, did the edits. The first added the 7 `relatedAreas:` lines; it required exactly one `content: () => (` anchor per file. The second did the 5-page SEO-const/SchemaMarkup edit; it required exactly one `<SEO` block, one title line, one description line and one SEO import per file, cross-checked values against the plan table, and checked canonical = pageUrl. Each post file diff is +1 line.
- **Extra checks not required by the plan:** the verify-schema negative test on the pre-Task-2 dist, and the `/services` (f) mutation test (section 1).
- I added a one-line "why" comment above `getLocationByCityLabel` (labels look like "Hilliard, OH").
- No CONTEXT.md deviations, and no Rule 1–4 auto-fixes were needed.

## 7. Things I was unsure about (no action taken)

- **Gallery keyboard / a11y:** the hover overlay (`opacity-0 group-hover:opacity-100`) now contains a focusable link. A keyboard user tabbing through a card lands first on an invisible overlay link (the overlay is not revealed on focus), then on the visible badge link. Both links also sit inside the `div role="button"` card, which is nested interactive content. D7 mandates both, and they behave correctly (no lightbox, no scroll lock). Making the overlay link non-focusable (`tabIndex={-1}`) or revealing the overlay on `group-focus-within` would be small follow-ups if the user wants them. File: `src/pages/Gallery.tsx`.
- **Line endings:** `src/components/RelatedAreas.tsx` was written with LF, matching plan 01's `ServiceAreaLinks.tsx`. Git warns "LF will be replaced by CRLF" for it and for the already-LF `Blog.tsx`, `blogPosts.tsx` and the `posts/*.tsx` files. The diffs contain no line-ending churn.

## Known Stubs

None.

## Threat Flags

None. No new network endpoints, auth paths or file access. The JSON-LD additions are covered by T-j0z-04 (verify-schema a–h on all 41 routes + the hub byte-identity check). T-j0z-05 (`closeLightbox` on the lightbox link) and T-j0z-06 (click + keydown `stopPropagation`) are implemented in `src/pages/Gallery.tsx`.

## Self-Check: PASSED

- FOUND: src/components/RelatedAreas.tsx, src/data/locations.ts (getLocationByCityLabel), scripts/verify-schema.mjs (`NO_SCHEMA_ROUTES = [];`), .planning/quick/261002-j0z-internal-links/261002-j0z-heads-before.json (committed in e48ce2f)
- FOUND commits: d907433, 4ee4c64, 4bece0a, fa08b5d, 6c7ee1b, e48ce2f (plus plan-01 529fc44, 952a479, 966cf2e, 7a4dc34, 3f6cfda)
