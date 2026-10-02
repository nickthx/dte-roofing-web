# Quick Task 261002-fqk: schema-ssot (Schema single source of truth, Week 2A) - Context

**Gathered:** 2026-10-02
**Status:** Ready for planning
**Branch:** `feat/schema-ssot` (created from `origin/main` @ db754d0 — already checked out)

<domain>
## Task Boundary

Collapse the 15 per-page RoofingContractor entities into ONE business node
(`https://www.dteroofingllc.com/#business`) emitted identically on every schema page, remove
self-serving `aggregateRating`/`review`, enrich WebPage / Service / BlogPosting nodes, add a
services SSOT data file, and add a dependency-free `scripts/verify-schema.mjs` gate.

Only JSON-LD output changes. No visible copy, URL, route, NAP, hours, `<title>`, meta description,
image, `index.html`, or `vercel.json` change. No new dependencies. No merge, no push, no deploy.

</domain>

<user_spec>
## User Specification (VERBATIM — this is the contract; follow it exactly)

# Task: Schema single source of truth (Week 2A) — dteroofingllc.com

## Workflow
- Start through the GSD workflow per CLAUDE.md: `/gsd:quick` (task name: `schema-ssot`). Read CLAUDE.md first; its constraints apply throughout.
- Work on a new branch `feat/schema-ssot`. Small conventional commits. Do NOT merge, push to main, or deploy. Finish by printing the verification output and `git diff --stat`.

## Hard constraints
- Do not change visible page copy, URLs/slugs, routes, NAP (name, address, phone, email), hours, `<title>`s, meta descriptions, images, `index.html`, or `vercel.json`.
- No new dependencies.
- JSON-LD stays in `src/components/SchemaMarkup.tsx` (react-helmet-async, prerendered by `scripts/prerender.mjs` into `dist/<route>/index.html`). Pages must render identically; only the `<script type="application/ld+json">` output changes, plus the new data file and verify script below.
- `src/data/review-stats.json` is already at the current count (128). Leave it.

## Why (current state, verified 2026-10-02)
- `SchemaMarkup.tsx` emits a RoofingContractor node with a DIFFERENT `@id` on each city page (`/locations/{city}#business`) and on the hub (`/locations#business`): 15 business entities for one business. On every city page the WebPage `about` / `isPartOf.publisher` reference `https://www.dteroofingllc.com#business`, which that page never defines.
- The business node carries `aggregateRating` + 5 copied Google reviews. Google's review-snippet policy: self-serving LocalBusiness reviews are ineligible, and "Don't aggregate reviews or ratings from other websites." Remove them.
- `.planning/PROJECT.md` (~line 125) records the per-page `@id` as deliberate. This task reverses that decision on purpose; update that line in PROJECT.md to record the new decision.

## Changes

### 1. Constants (SchemaMarkup.tsx)
- Import `CANONICAL_DOMAIN` from `src/seo/constants.ts` as `SITE_URL` (`https://www.dteroofingllc.com`).
- ``const BUSINESS_ID = `${SITE_URL}/#business` `` and ``const WEBSITE_ID = `${SITE_URL}/#website` ``. Use these everywhere; no other `#business` ids may remain.
- Delete `BUSINESS_REVIEWS` and the `review-stats.json` import from this file only (the UI and meta descriptions still read it elsewhere).

### 2. One business node, identical on every page
`generateLocalBusinessSchema()` returns the SAME RoofingContractor node on every page type, including `faq` and `blog` (currently skipped), so every `@id` reference resolves on the same page:
- `@id: BUSINESS_ID`. Never a per-page `@id`. `areaServed` = all 13 `LOCATIONS` as `City` + `containedInPlace` State Ohio on every page (drop the per-page neighbor subset; it moves to the Service/WebPage nodes below).
- Remove `aggregateRating` and `review` entirely.
- Keep: name, legalName, foundingDate, url, logo, image, telephone, email, priceRange, address, geo, openingHoursSpecification.
- `sameAs` (replace the generic Maps search URL):
  - `https://www.google.com/maps?cid=15933068684969168707`
  - `https://www.facebook.com/people/DTE-Roofing/61556271692460/`
  - `https://www.instagram.com/dte_roofing/`
  - `https://www.bbb.org/us/oh/columbus/profile/roofing-contractors/dte-roofing-llc-0302-70165482`
  - `https://www.gaf.com/en-us/roofing-contractors/residential/usa/oh/columbus/dte-roofing-llc-1146165`
  - `https://www.yelp.com/biz/dte-roofing-lincoln-village`
  - `https://nextdoor.com/pages/dte-roofing-llc-hilliard-oh/`
- Add `founder`: `[{ '@type': 'Person', name: 'Donovan Davis' }, { '@type': 'Person', name: 'Mitchell Davis' }]` (both are named as owners in `src/pages/About.tsx`; confirm the spelling there, don't invent anything).
- Add `hasCredential: [{ '@type': 'EducationalOccupationalCredential', name: 'GAF Certified Plus Contractor', credentialCategory: 'certification', recognizedBy: { '@type': 'Organization', name: 'GAF' }, url: <the GAF URL above> }]`.
- Add `memberOf: { '@type': 'Organization', name: 'Better Business Bureau', url: <the BBB URL above> }` and `award: 'BBB Accredited Business, A+ rating'`.

### 3. WebPage node
- New optional props on `SchemaMarkupProps`: `webPageType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'` (default `'WebPage'`) and `documentTitle?: string` (the exact `<title>` string).
- Node: `@type` = webPageType; ``@id: `${pageUrl}#webpage` ``; `url`; `name: documentTitle ?? pageTitle`; `description`; `isPartOf: { '@type': 'WebSite', '@id': WEBSITE_ID, url: SITE_URL, name: 'DTE Roofing', publisher: { '@id': BUSINESS_ID } }`; `about: { '@id': BUSINESS_ID }`; `primaryImageOfPage` unchanged.
- Location pages only: add `spatialCoverage` = that city's City node and `mentions` = the neighbor City nodes from `getAreaServedForLocation(slug).slice(1)`.
- Hub only: `webPageType: 'CollectionPage'` and ``mainEntity: { '@type': 'ItemList', itemListElement: LOCATIONS.map((loc, i) => ({ '@type': 'ListItem', position: i + 1, name: `${loc.cityName}, OH`, url: `${SITE_URL}/locations/${loc.slug}` })) }``.

### 4. Service nodes
- New SSOT `src/data/services.ts`: `export const SERVICES: { slug: string; name: string; path: string }[]` for the 10 service pages, paths exactly as in `src/routes.config.mjs`: roof-installation "Roof Installation", roof-repair "Roof Repair", roof-replacement "Roof Replacement", roof-inspection "Roof Inspection", gutters "Gutter Services", emergency-services "Emergency Roofing Services", storm-damage "Storm Damage Repair", preventative-maintenance "Preventative Maintenance", siding "Siding", commercial-roofing "Commercial Roofing". (Week 2B reuses this for nav, footer and hub lists.)
- Service pages (`type="service"`): keep the Service node; ``@id: `${SITE_URL}${service.url}#service` ``; `provider: { '@id': BUSINESS_ID }`; add `areaServed` = all 13 City nodes; REMOVE `offers` (`Offer.priceRange` is not a schema.org property).
- Location pages: add one Service node per core service for slugs `roof-repair, roof-replacement, roof-installation, roof-inspection, storm-damage, gutters, siding` (7): ``{ '@type': 'Service', '@id': `${pageUrl}#service-${slug}`, name: `${name} in ${cityName}, OH`, serviceType: name, provider: { '@id': BUSINESS_ID }, areaServed: <that City node>, url: `${SITE_URL}${path}` }``. No `description` (don't write new marketing copy).

### 5. BlogPosting
- ``@id: `${blog.url}#blogposting` ``; `author: { '@id': BUSINESS_ID }`; `publisher: { '@id': BUSINESS_ID }`; ``mainEntityOfPage: { '@id': `${pageUrl}#webpage` }``; keep headline, description, image, dates, `about`.

### 6. Call sites
- Every `<SchemaMarkup>` gets `documentTitle` equal to the exact string passed to `<SEO title=…>` on the same page (lift it into a `const` used by both). Pages: Home, Locations, Contact, Reviews, FAQ, BlogPost, the 13 files in `src/pages/locations/`, the 10 in `src/pages/services/` (and `ServicePageTemplate.tsx` if it renders SEO for them).
- Keep existing `pageTitle` values unchanged (breadcrumbs use them).
- `src/pages/About.tsx` has no SchemaMarkup today: add `<SchemaMarkup type="general" webPageType="AboutPage" documentTitle={<its SEO title>} pageTitle="About DTE Roofing" pageDescription={<its SEO description>} pageUrl="https://www.dteroofingllc.com/about" />`.
- `Contact.tsx`: `webPageType="ContactPage"`. `Locations.tsx`: `webPageType="CollectionPage"`.

### 7. Verification script (no deps)
Add `scripts/verify-schema.mjs` and `"verify-schema": "node scripts/verify-schema.mjs"` in package.json. Before changing anything, run a fresh `npm run build` on the starting commit and snapshot per-page counts of FAQPage questions and BreadcrumbList items to a temp JSON for comparison. After the changes, the script walks `PRERENDER_ROUTES` from `src/routes.config.mjs`, reads `dist/<route>/index.html` (`dist/index.html` for `/`), extracts every `<script type="application/ld+json">`, `JSON.parse`s it, and asserts per page:
a. exactly one node with `@type` `RoofingContractor`, its `@id` === `https://www.dteroofingllc.com/#business`, and no other `@id` on the page ends with `#business`;
b. every bare reference (an object whose only key is `@id`) resolves to a node defined on the same page;
c. no `aggregateRating` or `review` key anywhere; no `priceRange` inside any `offers`;
d. every Service node has `provider['@id'] === BUSINESS_ID` and a non-empty `areaServed`;
e. the WebPage-family node's `name` === the page's `<title>` text;
f. each `/locations/{city}` page has ≥ 7 Service nodes and `spatialCoverage.name` equal to the city name; `/locations` has an ItemList with 13 items; `/about` has an AboutPage; `/contact` a ContactPage;
g. FAQPage question counts and BreadcrumbList item counts match the pre-change snapshot;
h. `sameAs` contains the 7 URLs above and `founder` has 2 entries.
Print a per-page table (route · nodes · pass/fail · failures) and exit non-zero on any failure.

### 8. Run and report
`npm run typecheck && npm run lint && npm run build && npm run verify-schema` — all must pass. Final message: the verify-schema table, `git diff --stat`, and the pretty-printed JSON-LD from `dist/locations/hilliard/index.html`. Do not deploy.

</user_spec>

<decisions>
## Implementation Decisions (resolved by the orchestrator from the codebase — LOCKED)

### D1. Ordering: baseline snapshot BEFORE any src change
- Task 1 must be: write `scripts/verify-schema.mjs` (with a `--snapshot` mode) + the package.json
  script, run a fresh `npm run build` while `src/` is still byte-identical to db754d0, then run
  `node scripts/verify-schema.mjs --snapshot` to write the baseline. Adding the script file and the
  package.json entry does not alter build output, so this satisfies "before changing anything".
- Only after the baseline exists may `src/` be edited.

### D2. Baseline lives in the repo: `scripts/schema-baseline.json` (committed)
- The spec says "temp JSON", but a committed npm script that depends on an uncommitted temp file
  cannot be re-run by the user or on another checkout. Commit the baseline (small JSON:
  per-route `{ jsonLdBlocks, faqQuestions, breadcrumbItems }`) so check (g) works anywhere.
  `--snapshot` regenerates it deliberately. The orchestrator will flag this deviation to the user.
- The committed baseline must be the PRE-change snapshot (do not regenerate it after the changes).

### D3. Check (g) semantics
- (g) applies to routes that exist in the baseline AND had ≥ 1 JSON-LD block there.
- `/about` has zero JSON-LD at baseline and gains SchemaMarkup in this task (so it gains a
  2-item BreadcrumbList: Home → About DTE Roofing). That is expected: routes with
  `jsonLdBlocks === 0` in the baseline (or absent from it, e.g. future blog posts) are exempt from
  (g) and shown in the table with a note such as `g: new schema page`. Never silently skip.

### D4. Pages that emit no JSON-LD at all (out of scope — do NOT add SchemaMarkup to them)
- `/services`, `/gallery`, `/blog`, `/financing`, `/get-a-quote-consultation` render no
  `<SchemaMarkup>` today and the spec's call-site list does not include them. Do not add any.
- In the verify script keep an explicit allowlist `NO_SCHEMA_ROUTES` with exactly those 5 paths.
  A route on the allowlist with zero JSON-LD blocks is reported as `skip (no JSON-LD)` and is not a
  failure. If an allowlisted route DOES have JSON-LD, run all checks on it normally.
  Any route NOT on the allowlist with zero JSON-LD blocks is a FAILURE (this catches the
  lazy/Suspense regression where helmet output vanishes from prerendered HTML).

### D5. typecheck / lint gate — pre-existing red, do not fix unrelated errors
Baseline on db754d0 (captured by the orchestrator before any change):

`npm run typecheck` — 12 errors:
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
src/pages/Reviews.tsx(58,9): error TS6133: 'fiveStarPercentage' is declared but its value is never read.
src/pages/services/EmergencyServices.tsx(2,23): error TS6133: 'ArrowRight' is declared but its value is never read.
src/pages/services/RoofRepair.tsx(68,7): error TS2322: Type 'Element' is not assignable to type 'string'.
```
`npm run lint` — 6 errors, 1 warning:
```
src/components/SchemaMarkup.tsx        139:19 error  Unexpected any  @typescript-eslint/no-explicit-any
src/components/ServicePageTemplate.tsx  38:16 error  '_serviceName' is defined but never used
src/hooks/useLeadTracking.ts            85:3  error  React Hook "useEffect" is called conditionally  react-hooks/rules-of-hooks
src/pages/About.tsx                      2:30 error  'Users' is defined but never used
src/pages/Gallery.tsx                   70:39 warning react-hooks/exhaustive-deps
src/pages/Reviews.tsx                   58:9  error  'fiveStarPercentage' is assigned a value but never used
src/pages/services/EmergencyServices.tsx 2:23 error  'ArrowRight' is defined but never used
```
- These are unrelated to this task and several cannot be fixed without scope creep
  (Google Maps types need a new dependency; `useLeadTracking` is a behaviour change).
  DO NOT fix them, even in files this task touches (About, Reviews, EmergencyServices, RoofRepair,
  ServicePageTemplate) — leave those exact lines alone.
- The gate for this task is: **zero NEW typecheck or lint errors** versus the baseline above, and
  `src/components/SchemaMarkup.tsx`, `src/data/services.ts` and `scripts/verify-schema.mjs` must be
  fully clean. That means the rewritten SchemaMarkup must NOT use `any` (the existing
  `const schema: any` goes away — use `Record<string, unknown>` or plain object literals).
- Because typecheck/lint exit non-zero at baseline, run the four commands separately (not chained
  with `&&`) and record each result. `npm run build` and `npm run verify-schema` MUST exit 0.
- The orchestrator reports the pre-existing red state to the user; do not hide it.

### D6. SchemaMarkup.tsx details
- `SITE_URL` = `CANONICAL_DOMAIN` (`import { CANONICAL_DOMAIN as SITE_URL } from '../seo/constants'`).
  Replace `BUSINESS_INFO.url` usages for building ids/urls with `SITE_URL`; the business node's
  `url` value stays `https://www.dteroofingllc.com` (unchanged output).
- `BUSINESS_ID` = `https://www.dteroofingllc.com/#business`, `WEBSITE_ID` =
  `https://www.dteroofingllc.com/#website` (note the `/` before `#`).
- The business node is emitted for EVERY `type` (home, service, faq, location, hub, general, blog)
  and is byte-identical across pages (build it once from module-level constants).
- Keep emitting one `<script type="application/ld+json">` per node via Helmet as today (no
  `@graph` refactor). The 7 location Service nodes are 7 additional script blocks.
- Service-page `@id`: only RoofRepair and RoofReplacement pass `service.url` today; the other 8
  rely on the existing fallback. Keep the fallback so output is
  `${SITE_URL}${service.url}#service` when `url` is given, else `${pageUrl}#service` (same value).
- Breadcrumb generation, FAQPage generation, and `primaryImageOfPage` are unchanged.
- BlogPosting `about` stays `{ '@id': BUSINESS_ID }`.
- City node shape everywhere: `{ '@type': 'City', name: <cityName>, containedInPlace: { '@type': 'State', name: 'Ohio' } }`.
- Location Service nodes need the city: derive from `getLocationBySlug(locationSlug)` (fall back to
  `locationName` for the display name only if needed); core-service names/paths come from
  `SERVICES` in the new `src/data/services.ts` filtered by the 7 slugs in the order the spec lists.
- Founder spelling confirmed in `src/pages/About.tsx` (lines ~241-271): "Donovan Davis",
  "Mitchell Davis".

### D7. Call sites
- Service pages: `<SEO title>` is rendered inside `ServicePageTemplate` from its `title` prop. In
  each of the 10 `src/pages/services/*.tsx` files, lift the template's `title` string into a
  module-level `const` and pass it both as `title={...}` to `ServicePageTemplate` and as
  `documentTitle={...}` to `SchemaMarkup`. `ServicePageTemplate.tsx` itself needs no change.
- Location pages / Home / Locations / Contact / Reviews / FAQ / About: lift the `<SEO title>`
  string into a `const` used by both `<SEO title>` and `<SchemaMarkup documentTitle>`.
  For About also lift the description into a const shared by `<SEO description>` and
  `pageDescription`.
- BlogPost: ``const documentTitle = `${post.title} | DTE Roofing Blog` `` used by both. The
  "Post Not Found" branch is untouched.
- The lifted strings must be character-for-character identical to today's `<title>` values —
  the prerendered `<title>` and meta description of every page must not change (diff the
  `<title>`s of the baseline build against the new build to prove it).
- `pageTitle`, `pageDescription`, `locationName`, `faqs` props stay exactly as they are.

### D8. verify-schema.mjs implementation notes
- Zero dependencies; plain Node ESM (Node 24 locally). Import `PRERENDER_ROUTES` from
  `../src/routes.config.mjs`.
- Prerendered HTML is ONE line and react-helmet-async emits attributes like
  `<script data-rh="true" type="application/ld+json">` and `<title data-rh="true">…</title>` —
  match `<script[^>]*type="application/ld\+json"[^>]*>([\s\S]*?)</script>` and
  `<title[^>]*>([\s\S]*?)</title>`; never assume attribute order.
- `<title>` text is HTML-entity-encoded in the file (`&amp;`, `&#x27;`, `&quot;`, …) — decode
  entities before comparing with the JSON `name` in check (e).
- Walk nodes recursively (handle arrays and `@graph` generically). `@type` may be a string or array.
- "WebPage-family" = `WebPage | AboutPage | ContactPage | CollectionPage` (top-level node).
- A "bare reference" is an object whose ONLY key is `@id`; it resolves if any object on the same
  page (at any depth) has that `@id` and at least one other key.
- City names for check (f): do not import the `.ts` file — read `src/data/locations.ts` as text
  and extract `slug`/`cityName` pairs with a regex; fail loudly if the number of pairs does not
  equal the number of `/locations/{city}` routes (13).
- A missing `dist/<route>/index.html` or a `JSON.parse` failure is a per-page failure, not a crash.
- Output: per-page table (route · nodes · pass/fail · failures) + a summary line; `process.exit(1)`
  on any failure. `--snapshot` writes `scripts/schema-baseline.json` and exits 0.

### D9. PROJECT.md
- Update the Key Decisions row at ~line 125 ("Unique @id per subpage schema …") to record the
  reversal: single `https://www.dteroofingllc.com/#business` entity on every page, dated
  2026-10-02, quick task 261002-fqk, with the one-line reason (15 entities for one business;
  dangling `#business` references on city pages).
- Line ~43 (`- [x] Each subpage has unique @id in schema — Validated in Phase 1`) would then
  contradict it: append a short "superseded 2026-10-02 by quick task 261002-fqk (single business
  @id)" note to that line. Change nothing else in PROJECT.md.

### D10. Git / workflow
- Stay on `feat/schema-ssot`. Small conventional commits (e.g. `chore(schema): add verify-schema
  script + pre-change baseline`, `feat(schema): single business node …`, `feat(schema): services
  SSOT + Service nodes`, `feat(schema): documentTitle on all call sites`, `docs(planning): …`).
- Never `git add -A` / `git add .` — the working tree has unrelated untracked files and a modified
  `.claude/settings.local.json` that must NOT be committed. Stage explicit paths only.
- Do NOT merge, push, or deploy. `dist/` is gitignored.
- No worktree isolation for this run: the executor works directly in the main checkout on
  `feat/schema-ssot` (the build needs the existing `node_modules`, and the final report reads `dist/`).

### Claude's Discretion
- Internal helper naming/structure inside SchemaMarkup.tsx and verify-schema.mjs, as long as the
  file follows the project conventions in CLAUDE.md (2-space indent, semicolons, typed props,
  comments explain "why").

</decisions>

<specifics>
## Specific Ideas

- Build = `npm run build` (sitemap → vite build → SSR build → `scripts/prerender.mjs`); it prerenders
  41 routes + 404. It does not run tsc/eslint.
- `src/data/review-stats.json` (128) must not be touched; other files keep importing it.
- Final report needs: the verify-schema table, `git diff --stat` (vs `origin/main`), and the
  pretty-printed JSON-LD blocks of `dist/locations/hilliard/index.html`.

</specifics>

<canonical_refs>
## Canonical References

- `CLAUDE.md` (project constraints: no content/URL/NAP changes, no new deps)
- `src/components/SchemaMarkup.tsx`, `src/data/locations.ts`, `src/seo/constants.ts`,
  `src/routes.config.mjs`, `scripts/prerender.mjs`, `src/components/SEO.tsx`
- `.planning/PROJECT.md` lines ~43 and ~125

</canonical_refs>
