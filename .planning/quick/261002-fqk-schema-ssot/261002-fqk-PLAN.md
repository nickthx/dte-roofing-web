---
phase: quick-261002-fqk
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - scripts/verify-schema.mjs
  - scripts/schema-baseline.json
  - package.json
  - src/data/services.ts
  - src/components/SchemaMarkup.tsx
  - src/pages/Home.tsx
  - src/pages/About.tsx
  - src/pages/Locations.tsx
  - src/pages/Contact.tsx
  - src/pages/Reviews.tsx
  - src/pages/FAQ.tsx
  - src/pages/BlogPost.tsx
  - src/pages/locations/Columbus.tsx
  - src/pages/locations/Hilliard.tsx
  - src/pages/locations/Dublin.tsx
  - src/pages/locations/NewAlbany.tsx
  - src/pages/locations/UpperArlington.tsx
  - src/pages/locations/Westerville.tsx
  - src/pages/locations/Gahanna.tsx
  - src/pages/locations/Reynoldsburg.tsx
  - src/pages/locations/GroveCity.tsx
  - src/pages/locations/Pickerington.tsx
  - src/pages/locations/Worthington.tsx
  - src/pages/locations/Delaware.tsx
  - src/pages/locations/Powell.tsx
  - src/pages/services/RoofInstallation.tsx
  - src/pages/services/RoofRepair.tsx
  - src/pages/services/RoofReplacement.tsx
  - src/pages/services/RoofInspection.tsx
  - src/pages/services/Gutters.tsx
  - src/pages/services/EmergencyServices.tsx
  - src/pages/services/StormDamage.tsx
  - src/pages/services/PreventativeMaintenance.tsx
  - src/pages/services/Siding.tsx
  - src/pages/services/CommercialRoofing.tsx
  - .planning/PROJECT.md
  - .planning/quick/261002-fqk-schema-ssot/261002-fqk-heads-before.json
autonomous: true
requirements: [QUICK-261002-fqk]

must_haves:
  truths:
    - "Every prerendered page that has JSON-LD emits exactly one RoofingContractor node, its @id is https://www.dteroofingllc.com/#business, and no other @id on the page ends with #business"
    - "No aggregateRating or review key appears in any prerendered JSON-LD, and no offers object carries priceRange"
    - "Every bare {\"@id\": ...} reference on a page resolves to a node defined on that same page"
    - "On every schema page the WebPage-family node name equals the page's <title> text; /about is an AboutPage, /contact a ContactPage, /locations a CollectionPage with a 13-item ItemList"
    - "Every /locations/{city} page has at least 7 Service nodes and a WebPage spatialCoverage whose name is that city"
    - "The <title>, meta description, and <body> of all 41 prerendered routes plus 404.html are byte-identical to the pre-change build"
    - "FAQPage question counts and BreadcrumbList item counts match the committed pre-change baseline (/about is exempt as a new schema page)"
    - "npm run build and npm run verify-schema exit 0; typecheck and lint show zero new problems compared with the D5 baseline"
  artifacts:
    - path: "scripts/verify-schema.mjs"
      provides: "Dependency-free JSON-LD gate over dist/ (checks a-h, --snapshot mode)"
      contains: "NO_SCHEMA_ROUTES"
    - path: "scripts/schema-baseline.json"
      provides: "Pre-change (db754d0) per-route jsonLdBlocks / faqQuestions / breadcrumbItems snapshot"
      contains: "/locations/hilliard"
    - path: "src/data/services.ts"
      provides: "SERVICES SSOT (10 service pages)"
      exports: ["SERVICES", "ServiceConfig"]
      contains: "Emergency Roofing Services"
    - path: "src/components/SchemaMarkup.tsx"
      provides: "Single business node, enriched WebPage/Service/BlogPosting nodes"
      contains: "WEBSITE_ID"
    - path: "package.json"
      provides: "verify-schema npm script"
      contains: "\"verify-schema\": \"node scripts/verify-schema.mjs\""
    - path: ".planning/PROJECT.md"
      provides: "Recorded reversal of the per-page @id decision"
      contains: "261002-fqk"
  key_links:
    - from: "src/components/SchemaMarkup.tsx"
      to: "src/seo/constants.ts"
      via: "aliased import of CANONICAL_DOMAIN"
      pattern: "CANONICAL_DOMAIN as SITE_URL"
    - from: "src/components/SchemaMarkup.tsx"
      to: "src/data/services.ts"
      via: "SERVICES import that drives the 7 location Service nodes"
      pattern: "import \\{ SERVICES \\} from '../data/services'"
    - from: "src/pages/**/*.tsx call sites"
      to: "SchemaMarkup documentTitle prop -> WebPage name"
      via: "shared DOCUMENT_TITLE const used by both <SEO title> and <SchemaMarkup documentTitle>"
      pattern: "documentTitle=\\{(DOCUMENT_TITLE|documentTitle)\\}"
    - from: "scripts/verify-schema.mjs"
      to: "src/routes.config.mjs + scripts/schema-baseline.json"
      via: "PRERENDER_ROUTES walk + check (g) comparison"
      pattern: "PRERENDER_ROUTES"
---

<objective>
Collapse the 15 per-page RoofingContractor entities into one business node (`https://www.dteroofingllc.com/#business`) that is identical on every schema page. Remove the self-serving `aggregateRating`/`review`, enrich the WebPage, Service and BlogPosting nodes, add the `src/data/services.ts` SSOT, pass `documentTitle` at every `<SchemaMarkup>` call site, and gate all of it with a dependency-free `scripts/verify-schema.mjs`.

Purpose: Google currently sees 15 different business entities for one company, city pages reference a `#business` node they never define, and the business node carries review markup that Google's policy makes ineligible. One authoritative entity with resolvable references is the foundation for local SEO.

Output: the verify script, its committed pre-change baseline, `src/data/services.ts`, the rewritten `SchemaMarkup.tsx`, `documentTitle` on 30 call sites (plus new SchemaMarkup on About), the PROJECT.md decision update, and SUMMARY.md with the verification evidence. Only JSON-LD output changes. Titles, descriptions and rendered bodies stay byte-identical.

THE CONTRACT is `261002-fqk-CONTEXT.md`. Its `<user_spec>` sections §1–§8 and decisions D1–D10 are locked. This plan cites them by number. When this plan and CONTEXT.md seem to differ, CONTEXT.md wins, except for the three codebase-verified facts listed under "Planner-verified facts" below.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/quick/261002-fqk-schema-ssot/261002-fqk-CONTEXT.md
@.planning/STATE.md
@./CLAUDE.md
@src/components/SchemaMarkup.tsx
@src/data/locations.ts
@src/seo/constants.ts
@src/routes.config.mjs
@scripts/prerender.mjs

## Planner-verified facts (checked against the repo on 2026-10-02; they refine D6/D7 wording without changing intent)

1. **Only `src/pages/services/RoofRepair.tsx` uses `ServicePageTemplate`.** Its `<SEO title>` comes from the template's `title` prop. The other 9 service pages render `<SEO title="...">` directly in the page file. D7's principle still applies to all 10: lift the exact title string into a module-level const and use it for both the title and `documentTitle`. For RoofRepair that means the template's `title` prop. For the other 9 it means the page's own `<SEO title>`. `ServicePageTemplate.tsx` is NOT modified (D7).
2. **All 10 service pages already pass `service.url`** (D6 says only 2 do). This has no effect on behaviour: keep the D6 fallback exactly, and every service `@id` resolves to `${SITE_URL}${service.url}#service`.
3. **`npm run build` regenerates the TRACKED file `public/sitemap.xml`.** Its lastmod values come from git commit dates of each route's source file, and the generator's header says schema/template edits must not bump lastmod. Vercel ships the committed file. NEVER stage `public/sitemap.xml`. After EVERY build, run `git restore public/sitemap.xml` if `git status --porcelain public/sitemap.xml` shows it modified. Otherwise it pollutes `git diff --stat origin/main`.

## Repo memory that applies here

- Prerendered `dist/**/index.html` is ONE line. `grep -c` counts lines, not matches. Use `node` or `grep -o ... | wc -l` for counts in dist.
- react-helmet-async emits `data-rh="true"` BEFORE `type=`/`name=`, so never assume attribute order (D8).
- `npm run build` = sitemap, then vite client build, then SSR build, then `scripts/prerender.mjs`. It prerenders 41 routes plus `dist/404.html`. Build is the real gate. typecheck/lint are already red at baseline (D5).
- Keep tool output small to save context. Pipe the build through `tail -n 15` and read the exit status from `${PIPESTATUS[0]}`.

<interfaces>
<!-- Extracted from the codebase. Use directly; no exploration needed. -->

From src/seo/constants.ts:
```typescript
export const CANONICAL_DOMAIN = "https://www.dteroofingllc.com";
```

From src/data/locations.ts:
```typescript
export interface LocationConfig {
  slug: string;
  cityName: string;
  stateAbbr: string;
  neighbors: string[];
  description?: string;
  highlight?: string;
}
export const LOCATIONS: LocationConfig[];            // 13 entries, order: columbus, hilliard, dublin, new-albany, upper-arlington, westerville, gahanna, reynoldsburg, grove-city, pickerington, worthington, delaware, powell
export const getLocationBySlug: (slug: string) => LocationConfig | undefined;
export const getAreaServedForLocation: (slug: string) => LocationConfig[];  // [primary, ...neighbors]
// Source text format (for the verify script's regex): `slug: 'hilliard',\n    cityName: 'Hilliard',`
```

From src/routes.config.mjs:
```javascript
export const ROUTES;              // { path, source, changefreq, priority, prerender }[]
export const PRERENDER_ROUTES;    // string[] — 41 paths
```

Current src/components/SchemaMarkup.tsx public surface (to be extended, not renamed):
```typescript
interface SchemaMarkupProps {
  type: 'home' | 'service' | 'faq' | 'location' | 'hub' | 'general' | 'blog';
  service?: { name: string; description: string; url?: string };
  faqs?: { question: string; answer: string }[];
  locationName?: string;
  locationSlug?: string;
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
  blog?: { headline: string; description: string; datePublished: string; dateModified?: string; image: string; url: string };
}
export default function SchemaMarkup(props: SchemaMarkupProps): JSX.Element;
// One <script type="application/ld+json"> per node via <Helmet>; keep that (D6, no @graph).
```

Prerendered HTML shapes (dist/locations/hilliard/index.html, verified):
```html
<title data-rh="true">Roofers in Hilliard, OH | Roofing Contractor | DTE Roofing</title>
<meta data-rh="true" name="description" content="... gutters, siding &amp; storm damage. ..."/>
<script data-rh="true" type="application/ld+json">{...}</script>
```
No body section on any of the 41 routes references hashed `/assets/` files (verified), so a body hash is stable across builds.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: verify-schema gate + pre-change baseline (no src edits)</name>
  <files>scripts/verify-schema.mjs, package.json, scripts/schema-baseline.json, .planning/quick/261002-fqk-schema-ssot/261002-fqk-heads-before.json</files>
  <read_first>CONTEXT.md §7 and D1, D2, D3, D4, D8; src/routes.config.mjs; scripts/prerender.mjs (how dist paths are written)</read_first>
  <action>
Implements §7 with D1/D2/D3/D4/D8. HARD RULE (D1): `src/` must not be touched in this task.

Step 0 (preconditions). Confirm `git rev-parse --abbrev-ref HEAD` prints `feat/schema-ssot` and that `git diff --quiet db754d0 -- src` exits 0. If either check fails, STOP and report. Do not switch branches, and do not create a worktree (D10).

Step 1: create `scripts/verify-schema.mjs`. It is plain Node ESM with zero dependencies (only `node:fs`, `node:path`, `node:url`, `node:child_process` if needed). It uses 2-space indentation and semicolons, and its comments explain why, not what. Requirements:
- Import `PRERENDER_ROUTES` from `../src/routes.config.mjs`. Resolve paths from the script's own directory (`fileURLToPath(import.meta.url)`) so the script works from any cwd. The HTML path is `dist/index.html` for `/` and `dist/<route>/index.html` for every other route.
- Constants: `BUSINESS_ID = 'https://www.dteroofingllc.com/#business'`. `EXPECTED_SAME_AS` = the 7 URLs in §2, copied verbatim from CONTEXT.md. `WEB_PAGE_TYPES` = WebPage, AboutPage, ContactPage, CollectionPage. `NO_SCHEMA_ROUTES` = exactly `/services`, `/gallery`, `/blog`, `/financing`, `/get-a-quote-consultation` (D4). `BASELINE_PATH` = `scripts/schema-baseline.json`.
- City names (D8): read `src/data/locations.ts` as text and extract slug/cityName pairs with a regex that tolerates whitespace and newlines between `slug: '...'` and `cityName: '...'`, accepting either quote style. If the pair count differs from the number of `/locations/<x>` routes in PRERENDER_ROUTES (13), print a clear error and exit 1 before checking any page.
- Extraction (D8): to find JSON-LD blocks, match `<script[^>]*type="application/ld\+json"[^>]*>([\s\S]*?)</script>` globally. For the page title, take the first `<title[^>]*>([\s\S]*?)</title>`. Decode HTML entities in the title before comparing: the named entities amp, lt, gt, quot, apos, nbsp, plus decimal `&#NN;` and hex `&#xHH;`. Never assume attribute order.
- Parsing: `JSON.parse` each block. Flatten into "top-level nodes": a block can be an object, an array, or an object with `@graph`. Write a generic recursive walker over objects and arrays to collect every object at any depth. `@type` may be a string or an array, so normalise it to an array.
- Snapshot mode (`--snapshot`). For every route, record `{ jsonLdBlocks, faqQuestions, breadcrumbItems }`. `faqQuestions` is the summed `mainEntity` length over FAQPage nodes. `breadcrumbItems` is the summed `itemListElement` length over BreadcrumbList nodes. Missing nodes count as 0. Write `{ "baselineCommit": "<git rev-parse --short HEAD>", "routes": { "<path>": {...} } }` with 2-space indentation and a trailing newline. A missing HTML file or a JSON.parse error during snapshot exits 1, because a broken build must never be snapshotted. Print `wrote N routes` and exit 0.
- Check mode (default). If the baseline file is missing, print "run --snapshot on the pre-change build first" and exit 1. A missing HTML file is reported as `missing: <path>`. A JSON.parse error is reported as `parse: block <i> <message>`. Both are per-page failures, never crashes (D8). Zero blocks: a route in NO_SCHEMA_ROUTES gets status SKIP with detail `skip (no JSON-LD)`. Any other route with zero blocks is a FAIL with detail `none: no JSON-LD blocks` (D4). Run all checks on every route that has blocks, including allowlisted routes that unexpectedly have them. The checks, each failure prefixed by its letter:
  - a: exactly one node anywhere whose @type includes RoofingContractor; its `@id` === BUSINESS_ID; every `@id` string on the page that ends with `#business` equals BUSINESS_ID.
  - b: a bare reference is an object whose ONLY key is `@id`. It resolves when some object on the same page has that `@id` plus at least one other key.
  - c: no `aggregateRating` or `review` key at any depth; no `priceRange` key anywhere inside any `offers` value.
  - d: every node whose @type includes Service has `provider['@id'] === BUSINESS_ID` and a non-empty `areaServed` (an array with length > 0, or a non-null object).
  - e: exactly one top-level WebPage-family node exists, and its `name` === the decoded `<title>`. Report expected vs actual on mismatch.
  - f: each `/locations/<slug>` page has at least 7 Service nodes, and its WebPage-family node's `spatialCoverage.name` === that slug's cityName. `/locations` has an object with @type ItemList whose `itemListElement` has 13 items. `/about` has a top-level AboutPage. `/contact` has a top-level ContactPage.
  - g (D3): applies only when the route exists in the baseline with `jsonLdBlocks >= 1`. Then faqQuestions and breadcrumbItems must equal the baseline (report `baseline -> now`). Otherwise add the note `note(g): new schema page`. Never skip silently.
  - h: the RoofingContractor node's `sameAs` contains all 7 EXPECTED_SAME_AS URLs, and `founder` is an array of length 2.
- Output: one row per route, formatted `route | nodes | PASS/FAIL/SKIP | details`. `nodes` is the top-level node count. `details` joins failures (`<code>: <text>`) and notes (`note(<code>): <text>`) with `; `. This exact format matters because Task 2's grep relies on it. Follow the table with a summary line: `checked X, pass P, fail F, skip S`. Call `process.exit(1)` if F > 0, otherwise exit 0.

Step 2: add `"verify-schema": "node scripts/verify-schema.mjs"` to package.json `scripts`, after `typecheck`. Change nothing else in package.json, and add no dependencies.

Step 3: run a fresh baseline build with src untouched: `npm run build 2>&1 | tail -n 15`. `${PIPESTATUS[0]}` must be 0. Re-check `git diff --quiet db754d0 -- src`. Then run `git restore public/sitemap.xml` if it shows as modified (Planner fact 3).

Step 4: run `node scripts/verify-schema.mjs --snapshot` to write `scripts/schema-baseline.json`. This is the ONLY time `--snapshot` may run in this plan. The committed baseline must stay the pre-change snapshot (D2).

Step 5 (prove the gate bites): run `npm run verify-schema` against this pre-change build. It MUST exit non-zero. The table must show `a:` failures on `/locations/hilliard` (per-page @id), `c:` failures on `/` (aggregateRating), `none:` on `/about`, and SKIP on the 5 D4 routes. If the script crashes or exits 0, fix the SCRIPT (never src) and rerun. Do not "fix" the baseline.

Step 6: capture the pre-change heads. Write a one-off `node --input-type=module -e` command (do not add a repo script). For every route in PRERENDER_ROUTES, plus key `/404` mapped to `dist/404.html`, record:
- `title`: the raw inner text of the first title tag, not decoded.
- `description`: the raw `content` attribute value of the first meta tag that contains `name="description"`, with attribute order not assumed.
- `bodySha256`: the sha256 hex of `html.slice(html.indexOf('<body'), html.indexOf('</body>'))`.

Write the result as 2-space JSON to `.planning/quick/261002-fqk-schema-ssot/261002-fqk-heads-before.json`. Task 3 recomputes the same three values with IDENTICAL rules. Do not stage this file now; Task 3 commits it.

Step 7: `npx eslint scripts/verify-schema.mjs` must exit 0 (it falls under ESLint's default `.mjs` matching), and so must `node --check scripts/verify-schema.mjs`.

Step 8: commit, staging explicit paths only (D10): `git add scripts/verify-schema.mjs scripts/schema-baseline.json package.json` then commit `chore(schema): add verify-schema script + pre-change baseline`. Never use `git add -A` or `git add .`. Never stage `.claude/settings.local.json`, `public/sitemap.xml`, or any untracked file in the root or `docs/`.
  </action>
  <verify>
    <automated>node --check scripts/verify-schema.mjs && git diff --quiet db754d0 -- src && node -e "const b=require('./scripts/schema-baseline.json');const r=b.routes;const n=Object.keys(r).length;if(n!==41||r['/about'].jsonLdBlocks!==0||r['/services'].jsonLdBlocks!==0||r['/locations/hilliard'].breadcrumbItems!==3||r['/locations/hilliard'].jsonLdBlocks<1){console.error('bad baseline',n);process.exit(1)}console.log('baseline ok',n)" && node -e "const h=require('./.planning/quick/261002-fqk-schema-ssot/261002-fqk-heads-before.json');if(Object.keys(h).length!==42)process.exit(1);console.log('heads ok')"; npm run verify-schema > /dev/null 2>&1; test $? -ne 0 && echo "gate is red on pre-change build (expected)"</automated>
  </verify>
  <done>`scripts/verify-schema.mjs` exists with checks a–h, D3 notes, the D4 allowlist and `--snapshot`. package.json has the `verify-schema` script. `scripts/schema-baseline.json` holds 41 routes snapshotted from the untouched db754d0 build. `261002-fqk-heads-before.json` holds 42 entries. `npm run verify-schema` exits non-zero on the pre-change build, with the expected a/c/none failures and 5 SKIP rows. The commit contains exactly the 3 staged paths, and `src/` is byte-identical to db754d0.</done>
</task>

<task type="auto">
  <name>Task 2: services SSOT + SchemaMarkup.tsx rewrite (single business node, enriched nodes)</name>
  <files>src/data/services.ts, src/components/SchemaMarkup.tsx</files>
  <read_first>CONTEXT.md §1–§5 and D5, D6; src/components/SchemaMarkup.tsx (already in context); src/data/locations.ts</read_first>
  <action>
Implements §1, §2, §3, §4 and §5 with D6. Use no `any` (D5): the existing `const schema: any` must disappear. Use a `type JsonLdNode = Record<string, unknown>` alias and plain object literals. All function return types are explicit. The file stays under 500 lines (CLAUDE.md).

Part A: create `src/data/services.ts` (§4). Export `interface ServiceConfig { slug: string; name: string; path: string }`. It is structurally identical to the spec's inline type and mirrors `LocationConfig`. Export `const SERVICES: ServiceConfig[]` with the 10 entries in exactly the §4 order and names: roof-installation "Roof Installation", roof-repair "Roof Repair", roof-replacement "Roof Replacement", roof-inspection "Roof Inspection", gutters "Gutter Services", emergency-services "Emergency Roofing Services", storm-damage "Storm Damage Repair", preventative-maintenance "Preventative Maintenance", siding "Siding", commercial-roofing "Commercial Roofing". Each `path` is `/services/<slug>` and must equal the matching path in `src/routes.config.mjs`. Add nothing else; Week 2B consumes this file. Commit it alone: `git add src/data/services.ts`, message `feat(schema): add services SSOT (src/data/services.ts)`.

Part B: rewrite `src/components/SchemaMarkup.tsx`.
- Imports (§1, D6): `Helmet`; `import { CANONICAL_DOMAIN as SITE_URL } from '../seo/constants'`; `getAreaServedForLocation`, `getLocationBySlug`, `LOCATIONS` and `type LocationConfig` from `../data/locations`; `import { SERVICES } from '../data/services'`. Delete the `review-stats.json` import and `BUSINESS_REVIEWS` (§1). Do NOT touch `src/data/review-stats.json` or its other importers.
- Module constants: ``BUSINESS_ID = `${SITE_URL}/#business` `` and ``WEBSITE_ID = `${SITE_URL}/#website` `` (§1, with `/` before `#`). No other `#business` id may exist anywhere in src. Also add GAF and BBB URL constants (the §2 URLs) and a 7-URL `SAME_AS` array in §2 order, copied verbatim. Add the 7 core location-service slugs in the §4 order: roof-repair, roof-replacement, roof-installation, roof-inspection, storm-damage, gutters, siding. BUSINESS_INFO keeps its values. Use SITE_URL wherever ids or URLs are built; the business `url` output stays `https://www.dteroofingllc.com`.
- City node helper (D6): returns `{ '@type': 'City', name, containedInPlace: { '@type': 'State', name: 'Ohio' } }`.
- The business node (§2, D6) is built ONCE at module level, so it is byte-identical on every page. It is emitted for EVERY `type`, including faq and blog. Fields:
  - `@context`, `@type: 'RoofingContractor'`, `@id: BUSINESS_ID`.
  - Unchanged values for name, legalName, foundingDate, url, logo, image (= logo), telephone, email, priceRange, address, geo and openingHoursSpecification.
  - `areaServed` = all 13 LOCATIONS as City nodes. The per-page subset is gone.
  - `sameAs` = SAME_AS (replaces the generic Maps search URL).
  - `founder` = the two Person entries "Donovan Davis" and "Mitchell Davis" (D6 confirmed the spelling).
  - `hasCredential`, `memberOf` and `award` exactly as §2 specifies.
  - NO `aggregateRating`, NO `review`.
- New props (§3): `webPageType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'` (default `'WebPage'`) and `documentTitle?: string`. All existing props are kept unchanged.
- WebPage node (§3), emitted when `pageUrl` is set:
  - `@type` = webPageType, ``@id: `${pageUrl}#webpage` ``, `url`.
  - `name`: `documentTitle ?? pageTitle`, keeping the existing final fallback to the business name when both are absent.
  - `description`.
  - `isPartOf` = `{ '@type': 'WebSite', '@id': WEBSITE_ID, url: SITE_URL, name: 'DTE Roofing', publisher: { '@id': BUSINESS_ID } }`.
  - `about: { '@id': BUSINESS_ID }`, and `primaryImageOfPage` unchanged.
  - When `type === 'location'` and `locationSlug` is set: add `spatialCoverage` = that city's City node and `mentions` = `getAreaServedForLocation(locationSlug).slice(1)` mapped to City nodes.
  - When `type === 'hub'`: add `mainEntity` = the §3 ItemList: 13 ListItems, `position: i + 1`, ``name: `${loc.cityName}, OH` ``, ``url: `${SITE_URL}/locations/${loc.slug}` ``. The CollectionPage `@type` comes from the call-site prop (Task 3).
- Service node for `type === 'service'` (§4, D6):
  - Keep the fallback id expression: `${SITE_URL}${service.url}#service` when `url` is set, else ``${pageUrl || SITE_URL}#service``.
  - Keep name, description and serviceType.
  - `provider: { '@id': BUSINESS_ID }`.
  - `areaServed` = all 13 City nodes.
  - REMOVE `offers` entirely.
- Location Service nodes (§4, D6), only when `type === 'location'` and `locationSlug` is set:
  - Get the city from `getLocationBySlug(locationSlug)`; fall back to `locationName` for the display name only if needed.
  - Build one node per core slug, in core-slug order, using SERVICES for name and path: `@context`; `@type: 'Service'`; ``@id: `${pageUrl}#service-${slug}` ``; ``name: `${name} in ${cityName}, OH` ``; `serviceType: name`; `provider: { '@id': BUSINESS_ID }`; `areaServed` = that City node; ``url: `${SITE_URL}${path}` ``.
  - No `description` (§4).
- BlogPosting (§5):
  - ``@id: `${blog.url}#blogposting` ``.
  - `author` and `publisher` are both `{ '@id': BUSINESS_ID }`.
  - ``mainEntityOfPage: { '@id': `${pageUrl}#webpage` }``.
  - Keep headline, description, image, datePublished, `dateModified` (`|| datePublished`), and `about: { '@id': BUSINESS_ID }` (D6).
- FAQPage, BreadcrumbList and primaryImageOfPage output is UNCHANGED (D6). The only edit there is swapping `BUSINESS_INFO.url` for `SITE_URL`, which is the same string.
- Emission order: business, service, the 7 location services, blogPosting, faq, breadcrumb, webpage. Filter nulls with a typed guard (`(n): n is JsonLdNode => n !== null`). Keep one `<script type="application/ld+json">` per node via Helmet with the existing key pattern (no `@graph`, per D6).
- Comments: a short "why" for the single entity and the dropped review markup. Keep the literal tokens `aggregateRating` and `#business` out of comments so the grep gates below stay meaningful.

Part C (check). Run `npx eslint src/components/SchemaMarkup.tsx src/data/services.ts`; it must exit 0. Run `npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep -E "src/components/SchemaMarkup.tsx|src/data/services.ts"`; it must print nothing. Then build with `npm run build 2>&1 | tail -n 15` (`${PIPESTATUS[0]}` must be 0) and `git restore public/sitemap.xml` if modified. Run `npm run verify-schema`. At this stage it is EXPECTED to still exit 1. The only remaining failure codes may be `e:` (most call sites don't pass documentTitle yet), `f:` on `/contact` and `/about`, and `none:` on `/about`. Every page must already pass a, b, c, d, g and h, and every `/locations/<city>` page plus the hub must pass f. If any a/b/c/d/g/h, parse or missing failure appears, fix SchemaMarkup.tsx and rebuild.

Part D: commit with `git add src/components/SchemaMarkup.tsx`, message `feat(schema): single business node, drop self-serving reviews, enrich WebPage/Service/BlogPosting`.
  </action>
  <verify>
    <automated>npx eslint src/components/SchemaMarkup.tsx src/data/services.ts && test "$(npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep -cE 'src/components/SchemaMarkup.tsx|src/data/services.ts')" = "0" && test "$(grep -vE '^\s*(//|\*|/\*)' src/components/SchemaMarkup.tsx | grep -cE 'aggregateRating|BUSINESS_REVIEWS|review-stats|: any|offers')" = "0" && test "$(grep -rn '#business' src --include=*.ts --include=*.tsx | wc -l)" = "1" && test "$(wc -l < src/components/SchemaMarkup.tsx)" -lt 500 && npm run build > /dev/null 2>&1 && git restore public/sitemap.xml 2>/dev/null; npm run verify-schema 2>&1 | grep -cE '(\| |; )(a|b|c|d|g|h|parse|missing): ' | grep -qx 0 && echo "a,b,c,d,g,h clean on every page"</automated>
  </verify>
  <done>`src/data/services.ts` exports SERVICES (10 entries, §4 names and paths) and is committed. SchemaMarkup.tsx emits the one module-level business node on every page type with no reviews or rating, plus the enriched WebPage (CollectionPage ItemList on the hub; spatialCoverage and mentions on cities), service-page Service (no offers, 13-city areaServed), 7 location Service nodes and BlogPosting nodes. It is lint- and type-clean, contains no `any`, and is committed. The build exits 0, and verify-schema's only remaining failures are e/f/none, which Task 3 resolves.</done>
</task>

<task type="auto">
  <name>Task 3: documentTitle on all call sites + final gate, PROJECT.md decision, SUMMARY evidence</name>
  <files>src/pages/Home.tsx, src/pages/About.tsx, src/pages/Locations.tsx, src/pages/Contact.tsx, src/pages/Reviews.tsx, src/pages/FAQ.tsx, src/pages/BlogPost.tsx, src/pages/locations/{Columbus,Hilliard,Dublin,NewAlbany,UpperArlington,Westerville,Gahanna,Reynoldsburg,GroveCity,Pickerington,Worthington,Delaware,Powell}.tsx, src/pages/services/{RoofInstallation,RoofRepair,RoofReplacement,RoofInspection,Gutters,EmergencyServices,StormDamage,PreventativeMaintenance,Siding,CommercialRoofing}.tsx, .planning/PROJECT.md, .planning/quick/261002-fqk-schema-ssot/261002-fqk-SUMMARY.md</files>
  <read_first>CONTEXT.md §6, §8, D5, D7, D9, D10; Planner-verified facts 1–3 above; .planning/PROJECT.md lines 40–46 and 118–128 only</read_first>
  <action>
Part A: call sites (§6, D7). Edit 30 files. To save context, for each file use Grep with `-n` to locate the `<SEO`, `title=`, `<SchemaMarkup` and `export default function` lines. Read only the top of the file through the end of the `<SchemaMarkup>` block, never the whole 400–500-line page. Apply the edits without re-reading. The rules:
- Each file gets a module-level `const DOCUMENT_TITLE = '...';` placed after the imports and before the first existing module-level declaration or the component. Its value is copied CHARACTER-FOR-CHARACTER from that page's current `<SEO title>`; for RoofRepair it is the `ServicePageTemplate` `title` prop (Planner fact 1). Then replace the literal with `title={DOCUMENT_TITLE}` and add `documentTitle={DOCUMENT_TITLE}` to that file's `<SchemaMarkup>`. Before starting, `grep -rn DOCUMENT_TITLE src` must be empty, so there are no name collisions.
- Leave the `pageTitle`, `pageDescription`, `locationName`, `locationSlug`, `faqs`, `service` and `pageUrl` props exactly as they are (§6, D7). Breadcrumbs depend on them.
- `BlogPost.tsx` (D7): after the existing `const pageUrl`, add ``const documentTitle = `${post.title} | DTE Roofing Blog`;``. Use it in both `<SEO title={documentTitle}>` and `<SchemaMarkup documentTitle={documentTitle}>`. The "Post Not Found" branch is untouched.
- `Contact.tsx`: also add `webPageType="ContactPage"`. `Locations.tsx`: also add `webPageType="CollectionPage"` (§6).
- `About.tsx` (§6, D7): add `import SchemaMarkup from '../components/SchemaMarkup';` directly after the `import SEO` line. Do NOT touch line 2; its unused `Users` import is pre-existing red per D5. Add module-level `DOCUMENT_TITLE` and `DOCUMENT_DESCRIPTION` consts lifted from the SEO `title`/`description` and use them in `<SEO>`. Insert directly after `<SEO ... />`: `<SchemaMarkup type="general" webPageType="AboutPage" documentTitle={DOCUMENT_TITLE} pageTitle="About DTE Roofing" pageDescription={DOCUMENT_DESCRIPTION} pageUrl="https://www.dteroofingllc.com/about" />`.
- `ServicePageTemplate.tsx` is NOT edited (D7). Do NOT fix any D5 pre-existing error lines (About `Users`, Reviews `fiveStarPercentage`, EmergencyServices `ArrowRight`, RoofRepair `problemPromise` type, ServicePageTemplate `_serviceName`). Do NOT add SchemaMarkup to `/services`, `/gallery`, `/blog`, `/financing` or `/get-a-quote-consultation` (D4).
- Expected titles, as a cross-check only (the source file is authoritative, and Part B's heads comparison proves equality):
  - Home: "Roof Repair and Replacement in Columbus, OH | DTE Roofing"
  - Locations: "Areas We Serve in Central Ohio | DTE Roofing Service Areas"
  - Contact: "Contact DTE Roofing | Free Estimates in Columbus, OH"
  - Reviews: "DTE Roofing Reviews | Central Ohio Homeowners Speak Out"
  - FAQ: "Roofing FAQs | Questions Answered by DTE Roofing Columbus"
  - About: "About DTE Roofing | Family-Owned Roofer in Columbus, OH"
  - RoofRepair: "Columbus Roof Repair | Leak & Storm Damage | DTE Roofing"
  - Hilliard: "Roofers in Hilliard, OH | Roofing Contractor | DTE Roofing"
  - The other location and service pages follow the same pattern in their own `<SEO title>`.

Part B: final gate (§8, D5). Run the four commands SEPARATELY, not chained with `&&` (D5), and record each exit code and the relevant output:
1. `npm run build 2>&1 | tail -n 15`: MUST exit 0. Then `git restore public/sitemap.xml` if modified (Planner fact 3).
2. `npm run verify-schema`: MUST exit 0, with `checked 41, pass 36, fail 0, skip 5`, and `/about` showing `note(g): new schema page`. On failure, fix the call site or SchemaMarkup.tsx, rebuild and rerun. NEVER rerun `--snapshot` (D2).
3. `npm run typecheck`: normalise with `sed -E 's/\([0-9]+,[0-9]+\)//'` and sort. The result must equal the 12 D5 typecheck lines normalised the same way. Line numbers shift where consts were added, so compare file + TS code + message only. Zero new errors, and none in SchemaMarkup.tsx or services.ts.
4. `npm run lint`: the expected summary is `6 problems (5 errors, 1 warning)`. The D5 `SchemaMarkup.tsx no-explicit-any` error is gone. The remaining problems must be exactly the other D5 entries (same files, rules and messages; line:col may shift). There must be no new problems and none in SchemaMarkup.tsx, services.ts or verify-schema.mjs.
5. Heads comparison: run a one-off `node --input-type=module -e` command. It recomputes `title`, `description` and `bodySha256` for all 42 entries using EXACTLY the Task 1 Step 6 rules, compares them with `261002-fqk-heads-before.json`, and prints the differing routes plus a line `heads: 42 compared, title diffs T, description diffs D, body diffs B`. T, D and B MUST all be 0. Any body diff is a blocker: investigate it, since this task must not change rendered pages.
6. Extra dist sanity checks (node or `grep -o | wc -l`, never `grep -c` on dist): zero occurrences of `aggregateRating` in `dist/**/index.html`, and zero occurrences of `/locations/hilliard#business` or `/locations#business`.

Part C: commit the call sites. Stage the 30 page files by explicit path (no globs that could catch other files; D10). Message: `feat(schema): documentTitle on all call sites (+ About AboutPage schema)`. Splitting into 2–3 commits (top-level pages / locations / services) is fine.

Part D: PROJECT.md (D9). Change only two lines.
- Line 125, the Key Decisions row `| Unique @id per subpage schema | ... |`: rewrite it to record the reversal. Single `https://www.dteroofingllc.com/#business` entity on every page. Dated 2026-10-02, quick task 261002-fqk. Include the one-line reason: per-page @ids made 15 entities for one business, and city pages referenced an undefined `#business` node.
- Line 43 (`- [x] Each subpage has unique @id in schema — Validated in Phase 1`): append ` — superseded 2026-10-02 by quick task 261002-fqk (single business @id)`.

Nothing else in PROJECT.md changes (D9), even though lines 40–41 and 123 also describe the old per-page areaServed. Mention that in SUMMARY as an observation only. Commit `git add .planning/PROJECT.md .planning/quick/261002-fqk-schema-ssot/261002-fqk-heads-before.json` with message `docs(planning): record single business @id decision (261002-fqk)`.

Part E: write the report. Use the Write tool to create `.planning/quick/261002-fqk-schema-ssot/261002-fqk-SUMMARY.md` with:
- (1) The four commands, each with its exit code and the D5 comparison verdict. State plainly that typecheck/lint are pre-existing red and that zero new problems were introduced.
- (2) The full verify-schema table and summary line.
- (3) The heads comparison line.
- (4) The output of `git diff --stat origin/main`. Annotate `.claude/settings.local.json` if it appears as a pre-existing, unrelated, uncommitted change. `public/sitemap.xml` must NOT appear.
- (5) The pretty-printed JSON-LD of `dist/locations/hilliard/index.html`. Extract every block with the D8 regex and print `JSON.stringify(JSON.parse(block), null, 2)` for each, in page order, as fenced json blocks.
- (6) Commit hashes and messages.
- (7) Deviations and notes: the D2 committed baseline (the spec said a temp JSON); Planner facts 1–3, including that the sitemap was restored rather than committed; the PROJECT.md lines 40–41/123 observation.

Do NOT merge, push or deploy (D10). The executor's final message prints the verify-schema table and `git diff --stat origin/main`, and points to SUMMARY.md for the Hilliard JSON-LD.
  </action>
  <verify>
    <automated>npm run build > /dev/null 2>&1; echo "build exit $?"; git restore public/sitemap.xml 2>/dev/null; npm run verify-schema 2>&1 | tail -n 1; test ${PIPESTATUS[0]} -eq 0 && echo "verify-schema exit 0"; npm run typecheck 2>&1 | grep -c "error TS"; npm run lint 2>&1 | grep -E "problems? \("; test "$(grep -rn 'documentTitle=' src/pages | wc -l)" -ge 30 && test -z "$(git status --porcelain -- src scripts package.json public)" && grep -q "261002-fqk" .planning/PROJECT.md && test -f .planning/quick/261002-fqk-schema-ssot/261002-fqk-SUMMARY.md && echo "tree clean, docs present"</automated>
  </verify>
  <done>Every one of the 30 listed call sites passes `documentTitle` taken from a shared const. About has its AboutPage SchemaMarkup, Contact is a ContactPage and Locations a CollectionPage. `npm run build` and `npm run verify-schema` both exit 0 (36 pass / 0 fail / 5 skip). typecheck still reports exactly the 12 D5 errors, and lint reports 5 errors + 1 warning, all from D5 with none new. The heads comparison shows 0 title, 0 description and 0 body diffs across 42 pages. PROJECT.md lines 43 and 125 are updated and committed together with the heads-before evidence. SUMMARY.md contains the command results, verify-schema table, `git diff --stat origin/main`, Hilliard JSON-LD and deviations. Nothing is merged, pushed or deployed, and `public/sitemap.xml` and `.claude/settings.local.json` are not committed.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| build output → public crawlers | Static JSON-LD in prerendered HTML is read by Google and other crawlers. All content is developer-authored source; no user input reaches it. |
| working tree → git history | Unrelated modified and untracked files sit in the tree (`.claude/settings.local.json`, root drafts, `docs/`, `_claude_audit_tmp/`, and the regenerated `public/sitemap.xml`). |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-fqk-01 | Tampering | `<script type="application/ld+json">` content in SchemaMarkup.tsx | accept | Only static, repo-authored strings are emitted, via `JSON.stringify` inside Helmet. No request or user data enters schema. verify-schema check (parse) proves every block is valid JSON. |
| T-fqk-02 | Information disclosure | `founder`, `sameAs`, `memberOf` fields | accept | Founder names are already published on /about, and every sameAs/BBB/GAF URL is a public profile. No NAP values change (CLAUDE.md constraint). |
| T-fqk-03 | Spoofing (search-entity integrity) | 15 conflicting RoofingContractor @ids and self-serving review markup | mitigate | One `BUSINESS_ID` node per page, and aggregateRating/review removed (§2). verify-schema checks a, b, c and h enforce this on every build. |
| T-fqk-04 | Tampering / Repudiation | git staging | mitigate | Explicit-path `git add` only (D10). After every build, `git restore public/sitemap.xml` (Planner fact 3). Task 3's verify asserts `git status --porcelain -- src scripts package.json public` is empty. No push, merge or deploy. |
| T-fqk-05 | Tampering | verify-schema.mjs file reads | accept | It reads only `dist/` and `src/` paths derived from the repo-controlled `PRERENDER_ROUTES`. It takes no CLI path input except the `--snapshot` flag. |
| T-fqk-SC | Tampering | npm installs | accept | No package installs. package.json gains a `scripts` entry only, and package-lock.json is unchanged (§ hard constraints: no new dependencies). |
</threat_model>

<verification>
- `npm run build` exits 0. `npm run verify-schema` exits 0 with `checked 41, pass 36, fail 0, skip 5`.
- `npm run typecheck` and `npm run lint` are each run separately. Their normalised outputs are subsets of the D5 baseline, with zero new problems (expected: 12 TS errors; lint `6 problems (5 errors, 1 warning)`).
- Heads comparison: 0 title, 0 description and 0 body diffs over 42 pages compared with the pre-change build.
- `grep -rn '#business' src` returns exactly one line (the `BUSINESS_ID` definition). dist has zero `aggregateRating` and zero per-page `#business` ids.
- `scripts/schema-baseline.json` is unchanged since the Task 1 commit (`git log --oneline -- scripts/schema-baseline.json` shows one commit).
- `git diff --stat origin/main` lists only: scripts/verify-schema.mjs, scripts/schema-baseline.json, package.json, src/data/services.ts, src/components/SchemaMarkup.tsx, the 30 page files, .planning/PROJECT.md, the heads-before JSON, and the pre-existing `.claude/settings.local.json` if still modified.
</verification>

<success_criteria>
- One RoofingContractor entity (`https://www.dteroofingllc.com/#business`) is byte-identical on all 36 schema pages, and every `@id` reference resolves on its page.
- There is no self-serving review or rating markup, and no `Offer.priceRange`.
- WebPage names match `<title>` everywhere. The AboutPage, ContactPage and CollectionPage (13-item ItemList) are in place. Each city has 7 Service nodes plus spatialCoverage and mentions.
- No visible copy, URL, NAP, hours, `<title>`, meta description, image, `index.html` or `vercel.json` changed, as proven by the heads comparison and the diff stat.
- No new dependencies. All work is in small conventional commits on `feat/schema-ssot`, with no merge, push or deploy.
</success_criteria>

<output>
Create `.planning/quick/261002-fqk-schema-ssot/261002-fqk-SUMMARY.md` when done, with the contents specified in Task 3 Part E.
</output>
