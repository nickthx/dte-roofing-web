# Quick Task 261002-j0z: internal-links (Internal links, nav, footer, lists from one source — Week 2B) - Context

**Gathered:** 2026-10-02
**Status:** Ready for planning
**Branch:** `feat/internal-links` (created from `main` @ e67d43b — already checked out)

<domain>
## Task Boundary

Make the Services dropdown crawlable, drive nav / footer / city lists / service lists from the
`LOCATIONS` and `SERVICES` SSOTs, link gallery locations and blog posts to city pages, fix the
`neighbors` graph, add schema to the five bare pages, and gate it all with a new dependency-free
`scripts/verify-links.mjs`. Ends with a pushed branch and an open PR. NOT merged.

</domain>

<user_spec>
## User Specification (VERBATIM — this is the contract; follow it exactly)

# Task: Internal links, nav, footer, lists from one source (Week 2B) — dteroofingllc.com

## Workflow
- Start via `/gsd:quick` (task name: `internal-links`). Read CLAUDE.md; its constraints apply.
- Preflight: `git checkout main && git pull`. If local main is ahead of origin (the unpushed `chore(verify)` + docs commits), `git push origin main` first. Then branch `feat/internal-links` from main. Small conventional commits. Push the branch and open a PR with `gh pr create` at the end. Do NOT merge.

## Hard constraints
- No changes to page copy (paragraphs, testimonials, FAQs, service descriptions), URLs/slugs, routes, NAP, titles, meta descriptions, images, `index.html`, `vercel.json`. No new dependencies.
- New elements reuse the existing Tailwind classes next to them (charcoal/primary-700). No new colors, no new layout patterns.
- Every list that names cities or services must render from `LOCATIONS` (`src/data/locations.ts`) or `SERVICES` (`src/data/services.ts`, added in 2A). No hard-coded city or service links remain in `src/pages/**` or `src/components/**` except where this spec says so.

## Why (verified against the served HTML on 2026-10-02)
- The Services dropdown is rendered only while open (`src/components/Navigation.tsx`: `{isServicesOpen && (...)}` at ~line 88 desktop and ~172 mobile), so the prerendered header has 0 `/services` links; the dropdown also lists 7 of 10 services.
- Footer Services column (`src/components/Footer.tsx` ~34–41) lists 8 of 10: no Roof Replacement, no Siding, no `/services`. Result: `/services` is linked from 1 page, `/services/roof-replacement` from 25 of 42, siding from 16.
- Hard-coded subsets: `ServicePageTemplate.tsx` "We Serve These Areas" ~247–296 (5 of 13 cities); `Home.tsx` ~590–620 and `Contact.tsx` ~205–235 (10 of 13); `Locations.tsx` ~130–135 (6 of 10 services).
- `Gallery.tsx` lines 157, 172, 271 print `project.location` ("Hilliard, OH") as plain text.
- Blog posts: 1 of 7 links to a city page. Delaware has 1 inbound neighbor link; Grove City↔Pickerington and Upper Arlington↔Grove City are non-adjacent "neighbors".
- `/services`, `/gallery`, `/blog`, `/financing`, `/get-a-quote-consultation` emit no JSON-LD (verify-schema skips them).

## Changes

### 1. Crawlable nav (`src/components/Navigation.tsx`)
- Desktop and mobile: always render the dropdown markup; toggle visibility with classes driven by `isServicesOpen` (e.g. `hidden` vs `block`, or `invisible opacity-0 pointer-events-none` vs visible). Hover/click/close-timeout behavior and appearance stay identical. Add `aria-expanded={isServicesOpen}` and `aria-haspopup="true"` to the Services button; add `aria-label="Open menu"` to the mobile menu button (currently no accessible name).
- Replace the local `services` array with `SERVICES` (all 10, using `name` and `path`). Keep the "All Services" → `/services` entry first.

### 2. Footer (`src/components/Footer.tsx`)
- Services column: render `SERVICES` (all 10) plus a final "All Services" → `/services`, same `<li><Link className="hover:text-white transition-colors">` markup.
- Next to the existing Google Maps link: add Facebook (`https://www.facebook.com/people/DTE-Roofing/61556271692460/`), Instagram (`https://www.instagram.com/dte_roofing/`) and BBB (`https://www.bbb.org/us/oh/columbus/profile/roofing-contractors/dte-roofing-llc-0302-70165482`, use the existing `src/components/logos/BbbLogo.tsx`) with `rel="noopener"` and `target="_blank"`, styled like the Maps link.

### 3. Lists from the SSOT
- `ServicePageTemplate.tsx` "We Serve These Areas": map `LOCATIONS` (13) with the existing card/link markup, plus one trailing link "All Service Areas" → `/locations`.
- `Home.tsx` and `Contact.tsx` city lists: map `LOCATIONS` (13) with the existing `<Link className="text-primary-700 hover:text-primary-800 font-semibold hover:underline transition-colors">` markup; keep the surrounding heading and copy untouched.
- `Locations.tsx` services list: map `SERVICES` (10) with the existing markup.

### 4. Gallery → city pages (`src/pages/Gallery.tsx` 157, 172, 271)
- Add a helper (in `src/data/locations.ts`): `getLocationByCityLabel(label: string): LocationConfig | undefined` that matches `"Hilliard, OH"` → the `hilliard` config by `cityName`. Where a match exists, render the label as ``<Link to={`/locations/${slug}`}>`` with the same classes plus `hover:underline`; otherwise keep plain text (Plain City, Lewis Center, Grandview Heights have no page).

### 5. Blog "Related service areas"
- Add optional `relatedAreas?: string[]` (location slugs) to the `BlogPost` type in `src/data/blogPosts.tsx`. Set per post: `roof-replacement-cost-columbus-ohio` → columbus, hilliard, dublin, upper-arlington · `what-to-look-for-columbus-roofing-contractor` → columbus, hilliard, grove-city, westerville · `hail-damage-roof-insurance-claim-ohio` → reynoldsburg, pickerington, gahanna, westerville · `asphalt-vs-metal-roofing-ohio` → dublin, powell, new-albany, worthington · `how-long-does-a-roof-last-ohio` → columbus, hilliard, delaware, grove-city · `roof-repair-vs-replacement` → hilliard, columbus, westerville, gahanna · `signs-you-need-a-new-roof` → columbus, hilliard, dublin, powell.
- New `src/components/RelatedAreas.tsx` (copy the card markup from `NearbyAreas.tsx`, heading "Roofing Services Near You", 4 cards), rendered in `src/pages/BlogPost.tsx` after the FAQ section and before `</article>` (~line 202). No change to post copy.

### 6. Geographic neighbors (`src/data/locations.ts`)
Replace `neighbors` exactly as follows (every city then has ≥3 inbound links; first 5 are shown by NearbyAreas):
- columbus: hilliard, upper-arlington, worthington, gahanna, grove-city
- hilliard: columbus, dublin, upper-arlington, grove-city
- dublin: hilliard, powell, worthington, upper-arlington, columbus
- new-albany: gahanna, westerville, columbus, reynoldsburg, pickerington
- upper-arlington: columbus, hilliard, dublin, worthington, grove-city
- westerville: worthington, new-albany, gahanna, powell, delaware
- gahanna: columbus, new-albany, westerville, reynoldsburg, pickerington
- reynoldsburg: gahanna, pickerington, columbus, new-albany
- grove-city: columbus, hilliard, upper-arlington
- pickerington: reynoldsburg, gahanna, columbus, new-albany
- worthington: columbus, dublin, westerville, powell, delaware
- delaware: powell, westerville, worthington
- powell: dublin, worthington, delaware, westerville

### 7. Schema on the five bare pages
Add `<SchemaMarkup type="general" documentTitle={<exact SEO title>} pageTitle=... pageDescription={<its SEO description>} pageUrl=... />` to `Services.tsx` (webPageType `CollectionPage`, plus `mainEntity` ItemList of the 10 SERVICES — add that option to SchemaMarkup if the hub's ItemList code isn't reusable as-is), `Gallery.tsx` (`CollectionPage`), `Blog.tsx` (`CollectionPage`), `Financing.tsx`, `InstantQuote.tsx` (`WebPage`). Remove those five from the explicit skip list in `scripts/verify-schema.mjs` so they must PASS.

### 8. Housekeeping
- `src/pages/Locations.tsx` ~76: remove the hub card `aria-label` that overrides the visible anchor text (or make it identical to the visible text).
- `.planning/PROJECT.md` lines 41–42 and 122: describe the current schema (one `#business` entity; city pages carry WebPage `spatialCoverage` + Service nodes; hub is CollectionPage + ItemList).

### 9. Verification script
Add `scripts/verify-links.mjs` (no deps) + `"verify-links": "node scripts/verify-links.mjs"` in package.json. After `npm run build`, for every `PRERENDER_ROUTES` page in `dist/`, assert:
a. `<header>` contains `/services` and all 10 `SERVICES` paths; `<footer>` contains `/locations`, all 13 `/locations/{slug}`, `/services`, all 10 service paths, and the Facebook, Instagram and BBB hrefs;
b. every `/services/*` page's main content links all 13 cities + `/locations`; `/` and `/contact` link all 13; `/locations` links all 10 services;
c. each of the 7 blog posts has exactly 4 `/locations/` links in the related block; `/gallery` has ≥ 10 `/locations/` links;
d. from `src/data/locations.ts`, every city has ≥ 3 inbound `neighbors` references and no city lists itself;
e. every internal `href` on every page resolves to a prerendered route, `/`, or a known static file (`/images/`, `/sitemap.xml`, etc.); none start with `http://` or `https://dteroofingllc.com` (apex);
f. the mobile menu button has an `aria-label`.
Print a per-page table and exit non-zero on any failure.

### 10. Run and report
`npm run build && npm run verify-links && npm run verify-schema` must pass (verify-schema now 41 pass / 0 skip). `npm run typecheck` and `npm run lint` are already red on main (12 / 5 errors): report the counts; they must not increase. Confirm title + meta description are byte-identical to main on `/`, `/locations`, `/locations/hilliard`, `/services/roof-repair`. Push `feat/internal-links`, open the PR (`gh pr create --base main`, body = summary + both verify tables), and stop. Final message: PR URL, both tables, `git diff --stat`.

</user_spec>

<decisions>
## Implementation Decisions (resolved by the orchestrator from the codebase — LOCKED)

### D1. Preflight is DONE; push + PR are the orchestrator's job
- Orchestrator already ran: `git checkout main`, `git pull --ff-only` (up to date), `git push origin main`
  (`f214c44..e67d43b`, 2026-10-02 ~17:42Z), `git checkout -b feat/internal-links`.
- The executor must NOT push anything and must NOT open the PR. After the executor finishes, the
  orchestrator verifies independently, commits the docs, pushes the branch and opens the PR.
- No worktree: work directly in the main checkout on `feat/internal-links`.

### D2. Baseline first (before any `src/` edit)
- Fresh `npm run build` on the untouched tree, then record raw `<title>` inner text and
  meta-description `content` for all 41 `PRERENDER_ROUTES` + `/404` (→ `dist/404.html`) into
  `.planning/quick/261002-j0z-internal-links/261002-j0z-heads-before.json` (same rules as 2A's
  `261002-fqk-heads-before.json`: first `<title[^>]*>`, first meta tag containing
  `name="description"`, attribute order not assumed, values not entity-decoded).
  At the end, recompute with identical rules: title + description must be byte-identical on ALL
  42 pages (the spec names 4; proving all 42 is the same work). Bodies WILL differ — expected.
- Also record baseline `npm run typecheck` error count (12) and `npm run lint` summary
  (`6 problems (5 errors, 1 warning)`); the lists are in `.planning/quick/261002-fqk-schema-ssot/261002-fqk-CONTEXT.md` D5
  minus the fixed `SchemaMarkup.tsx no-explicit-any`. Gate: counts must not increase; do NOT fix the
  pre-existing ones (even in files you touch — About `Users`, Reviews `fiveStarPercentage`,
  EmergencyServices `ArrowRight`, RoofRepair `problemPromise`, ServicePageTemplate `_serviceName`).
  All new files must be type- and lint-clean (no `any`).
- `npm run build` rewrites the TRACKED `public/sitemap.xml`. Never stage it; `git restore
  public/sitemap.xml` after every build.
- Pre-check already run by the orchestrator on the current build: check (e) is clean today —
  zero unresolved internal hrefs, zero `http://` hrefs, zero apex hrefs. External hosts present:
  `app.roofle.com`, `www.google.com`, `search.google.com`. So any (e) failure after the changes is
  something this task introduced.

### D3. Navigation (§1)
- Only the two Services-dropdown conditionals change (`{isServicesOpen && (` at ~88 desktop and
  ~172 mobile): always render, and switch the wrapper between `hidden` and `block` via
  `isServicesOpen` (display:none keeps closed links out of the tab order and out of layout, so
  behaviour/appearance are unchanged). Do NOT change the `{isMobileMenuOpen && (…)}` conditional
  around the whole mobile menu — the mobile dropdown simply lives inside it.
- Both Services buttons (desktop + mobile) get `aria-expanded={isServicesOpen}` and
  `aria-haspopup="true"`.
- Mobile menu button: `aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}` plus
  `aria-expanded={isMobileMenuOpen}`. The prerendered value is `Open menu` (what the spec and
  check (f) require); the dynamic label avoids announcing "Open menu" on a button that closes it.
- Replace the local `services` array with `SERVICES` (import from `../data/services`), all 10 in
  SSOT order, labels = `name`, links = `path`; "All Services" → `/services` stays first with its
  divider. Visible labels therefore change where they differed (`Storm Damage Restoration` →
  `Storm Damage Repair`, `Gutters` → `Gutter Services`) — mandated by the spec; list it in SUMMARY.
- Keep the existing handlers, timeout logic, classes and the explanatory comment.

### D4. Footer (§2)
- Services column: `SERVICES.map` (10) + final `<li>` "All Services" → `/services`, same markup.
  Labels change to the SSOT names (`Inspections` → `Roof Inspection`, `Emergency Services` →
  `Emergency Roofing Services`, `Storm Damage` → `Storm Damage Repair`, `Gutters` →
  `Gutter Services`) — mandated; list in SUMMARY.
- "Next to the existing Google Maps link" = the trust row (`grid md:grid-cols-5 gap-6 mb-8`), where
  the Maps link is the "Five-Star Reputation" tile. Do exactly this:
  - The existing "BBB Accredited" tile (already uses `BbbLogo`) becomes a link to the BBB URL: wrap
    its icon + text in `<a href=… target="_blank" rel="noopener" className="flex items-start gap-3 hover:text-white transition-colors group">`,
    text unchanged. Do not add a second BBB tile.
  - Add two tiles after "Nextdoor Verified", same tile + anchor markup as the Maps tile: lucide
    `Facebook` and `Instagram` icons (`w-6 h-6 text-primary-500 flex-shrink-0 mt-1`, like
    Shield/Award), `<h5>` "Facebook" / "Instagram", `<p className="text-sm">` "Follow us on Facebook" /
    "Follow us on Instagram". `target="_blank" rel="noopener"` as the spec says.
  - Leave the existing Maps anchor (incl. its `rel="noopener noreferrer"`) untouched. The grid stays
    `md:grid-cols-5`; 7 tiles wrap to a second row — no new layout pattern.
  - If `Facebook`/`Instagram` are not exported by the installed lucide-react, STOP and report
    (no new dependency, no hand-drawn brand SVGs).
- Footer hrefs must be the three URLs in §2 character-for-character.

### D5. "We Serve These Areas" on ALL 10 service pages (§3 + check 9b)
- Codebase fact: only `src/pages/services/RoofRepair.tsx` uses `ServicePageTemplate`. The other 9
  service pages are hand-built and have no areas list (just a few in-copy city links). Check (9b)
  nevertheless requires EVERY `/services/*` page to link all 13 cities + `/locations` in main content.
- Therefore: extract the template's block into `src/components/ServiceAreaLinks.tsx` — the existing
  `<section>` + `<h2>` "We Serve These Areas" + `grid md:grid-cols-3 gap-4`, cards rendered from
  `LOCATIONS` with the existing card `<Link>` markup (label = `cityName`), plus ONE trailing card
  with the same markup, text "All Service Areas", → `/locations`. `ServicePageTemplate` renders
  `<ServiceAreaLinks />` in place of lines ~245–296 (identical output apart from 13+1 cards).
- Add `<ServiceAreaLinks />` to each of the 9 hand-built service pages, placed directly before that
  page's final CTA section (or as the last block of main content if there is none), wrapped in the
  same section/container wrapper classes that the neighbouring section on that page uses, so it
  inherits the page's width and spacing. No other change to those pages; no copy edits.
- This is a visible addition to 9 pages that the spec did not spell out. The orchestrator flags it
  in the PR body; list the 9 insertion points (file + neighbouring section) in SUMMARY.

### D6. Other lists (§3)
- `Home.tsx` (~590–620) and `Contact.tsx` (~205–235): replace the 10 hard-coded links with
  `LOCATIONS.map` (13), keeping the existing `<Link>` classes, the existing separators/wrapper and
  the existing link-text format exactly; heading and surrounding copy untouched.
- `Locations.tsx` (~130–135): replace the local 6-item array with `SERVICES` (10), existing markup;
  labels become the SSOT names — list the label changes in SUMMARY.
- SCOPE RULE for the "no hard-coded links remain" constraint: convert ONLY the lists named in
  §1–§5 (+ D5). Links inside sentences and rich cards whose items carry their own copy, icons or
  images (e.g. the Services hub cards, home service cards, `relatedServices` on RoofRepair,
  location-page service sections) are page copy — leave them untouched. At the end, grep
  `src/pages/**` and `src/components/**` for remaining literal `/locations/<slug>` and
  `/services/<slug>` link targets and put a per-file count table in SUMMARY ("left by design") so
  the user can decide about them. Do not convert anything from that table.

### D7. Gallery (§4)
- `getLocationByCityLabel(label)` in `src/data/locations.ts`: strip a trailing `, <2-letter state>`
  and match `cityName` exactly (case-insensitive); return `undefined` otherwise. Explicit return type.
- The grid card is a `div role="button"` with `onClick`/`onKeyDown` that opens the lightbox. The
  new `<Link>`s at ~157 and ~172 must call `stopPropagation()` on click AND on keydown so
  activating a city link does not also open the lightbox.
- The lightbox (~271) locks body scroll (`document.body.style.overflow = 'hidden'`, restored only
  in `closeLightbox`). The lightbox `<Link>` must call `closeLightbox()` on click so navigating away
  does not leave the body scroll-locked.
- Link classes = the existing span classes + `hover:underline`. Unmatched labels stay plain `<span>`.

### D8. Blog related areas (§5)
- `relatedAreas?: string[]` on `BlogPost`; set the 7 lists exactly as §5 gives them (order
  preserved). `signs-you-need-a-new-roof` lives in `src/data/blogPosts.tsx`; the other six in
  `src/data/posts/*.tsx`.
- `src/components/RelatedAreas.tsx`: props `{ slugs: string[] }`; resolves slugs via
  `getLocationBySlug`, renders nothing if none resolve. Root element
  `<section aria-labelledby="related-areas-heading">` (the verify script locates the block by that
  id), `<h2 id="related-areas-heading">` "Roofing Services Near You" with NearbyAreas' heading
  classes, card markup copied from `NearbyAreas.tsx`; grid `grid sm:grid-cols-2 lg:grid-cols-4 gap-4`
  (4 cards instead of NearbyAreas' 5 columns).
- Placement in `BlogPost.tsx`: inside `<article>`, inside the existing `max-w-4xl mx-auto` wrapper,
  after the bottom CTA block and before the "Back to Blog" block, wrapped like its siblings
  (`mt-12`). That is after the FAQ and before `</article>`, and touches no post copy.

### D9. Neighbors (§6)
- Replace `neighbors` EXACTLY as §6 lists them (order matters: NearbyAreas shows the first 5).
  Note for the report only — do not "fix" it: §6 keeps `upper-arlington ↔ grove-city` although the
  spec's Why section calls that pair non-adjacent; "exactly as follows" wins.
- Side effect to verify, not prevent: location pages' WebPage `mentions` (2A) derive from
  `neighbors`, so they change accordingly; `npm run verify-schema` must still pass.

### D10. Schema on the five bare pages (§7)
- Same pattern as 2A: module-level `DOCUMENT_TITLE` (+ `DOCUMENT_DESCRIPTION`) consts lifted
  character-for-character from the page's `<SEO title/description>` and used by both `<SEO>` and
  `<SchemaMarkup>`. `pageUrl` = the page's canonical. `pageTitle` (breadcrumb name) uses the
  existing nav label, no new copy: Services → `Services`, Gallery → `Gallery`, Blog → `Blog`,
  Financing → `Financing`, InstantQuote → `Instant Quote`.
- `webPageType`: Services/Gallery/Blog = `CollectionPage`; Financing/InstantQuote = default `WebPage`.
- Services ItemList: add ONE small optional prop to `SchemaMarkup` rather than a new page type —
  e.g. `itemList?: { name: string; url: string }[]`, emitted as the WebPage node's
  `mainEntity: { '@type': 'ItemList', itemListElement: [...ListItem position/name/url] }` when
  provided. `Services.tsx` passes the 10 `SERVICES` mapped to `{ name, url: SITE_URL + path }`.
  The hub (`type === 'hub'`) keeps its existing output byte-for-byte. No `any`.
- `scripts/verify-schema.mjs`: empty the skip list (keep the `NO_SCHEMA_ROUTES` mechanism with an
  empty array and an updated comment) so all 41 routes must PASS; add to check (f): `/services` has
  an ItemList with exactly 10 items. Do NOT regenerate `scripts/schema-baseline.json` — the five
  pages have `jsonLdBlocks: 0` there and therefore show `note(g): new schema page`.
  Expected: `checked 41, pass 41, fail 0, skip 0`.

### D11. Housekeeping (§8)
- `Locations.tsx` ~line 80: remove the `aria-label={`View ${location.cityName} roofing services`}`
  attribute from the hub card link. Nothing else on that card changes.
- `.planning/PROJECT.md`: rewrite lines 41, 42 and 122 only, to describe the current schema (one
  `#business` entity on every page; city pages carry WebPage `spatialCoverage` + `mentions` + 7
  Service nodes; hub is CollectionPage + 13-item ItemList), dated 2026-10-02 with a reference to
  quick tasks 261002-fqk / 261002-j0z, in the same style as the already-updated lines 43 and 125.

### D12. verify-links.mjs (§9)
- Zero deps, plain Node ESM, same style as `scripts/verify-schema.mjs` (2-space, semicolons, "why"
  comments). Import `PRERENDER_ROUTES` from `../src/routes.config.mjs`. Read `SERVICES` paths and
  `LOCATIONS` slugs/neighbors by text-parsing `src/data/services.ts` / `src/data/locations.ts`
  (the `.ts` files cannot be imported); fail loudly if the parse does not yield exactly 10 services
  and 13 locations.
- Regions: header = `<header …>` … `</header>`; footer = `<footer …>` … `</footer>`;
  "main content" = `<main …>` … `</main>` (every page is wrapped by `src/App.tsx`'s `<main>`).
  A link "to X" means an `href="X"` attribute on an `<a>` (exact path; also accept a trailing
  slash, `#fragment` or `?query`). `/services` must match exactly, not as a prefix of
  `/services/roof-repair`; same for `/locations`.
- (c): blog related block = from `id="related-areas-heading"` back to its enclosing `<section` and
  forward to the matching `</section>`; exactly 4 `/locations/<slug>` hrefs. `/gallery`: ≥ 10
  `/locations/<slug>` hrefs inside main content (the footer's 13 must not count).
- (d) is a data check; report it once as its own row (e.g. `data: neighbors`) rather than per page.
- (e): for every `href` on `<a>` and `<link>` elements: skip `tel:`, `mailto:`, `sms:`, `#…`,
  `data:`; decode `&amp;`. Internal = starts with `/` (not `//`) or with
  `https://www.dteroofingllc.com`. After stripping `#…`/`?…`, it must be a `PRERENDER_ROUTES`
  path, `/`, or an existing file under `dist/` (covers `/images/…`, `/assets/…`, `/sitemap.xml`,
  favicons, manifest). Any href starting with `http://` or `https://dteroofingllc.com` is a failure.
- (f): the header contains a `<button` with `aria-label="Open menu"`.
- A missing `dist/<route>/index.html` is a per-page failure, not a crash. Output: per-page table
  (`route | links | PASS/FAIL | details`) + summary line, exit 1 on any failure.
- Prove it bites: before the src changes it must FAIL on the baseline build (0 `/services` links
  in the header, etc.).
- package.json gains only `"verify-links": "node scripts/verify-links.mjs"`.

### D13. Git
- Small conventional commits, explicit-path staging only (never `git add -A`/`.`). Never commit
  `.claude/settings.local.json`, `public/sitemap.xml` or the untracked root files.
- The executor does not commit SUMMARY/PLAN/CONTEXT or STATE.md (orchestrator does), but DOES
  commit `.planning/PROJECT.md` and `261002-j0z-heads-before.json` in a `docs(planning)` commit.
- No push, no PR, no merge by the executor.

### Claude's Discretion
- Internal structure/naming inside the new components and `verify-links.mjs`, within CLAUDE.md
  conventions (PascalCase components, typed props, explicit return types, files < 500 lines).

</decisions>

<specifics>
## Specific Ideas

- Final gate, run separately and recorded: `npm run build` (exit 0), `npm run verify-links`
  (exit 0), `npm run verify-schema` (exit 0, `checked 41, pass 41, fail 0, skip 0`),
  `npm run typecheck` (≤ 12 errors, same set), `npm run lint` (≤ 5 errors + 1 warning, same set),
  heads comparison (0 title diffs, 0 description diffs over 42 pages).
- SUMMARY must contain: both verify tables verbatim, the heads line, typecheck/lint counts,
  `git diff --stat main...HEAD`, the visible-label changes (D3/D4/D6), the 9 insertion points (D5),
  the "left by design" hard-coded link table (D6), and every deviation.

</specifics>

<canonical_refs>
## Canonical References

- `CLAUDE.md`
- `src/components/Navigation.tsx`, `Footer.tsx`, `ServicePageTemplate.tsx`, `NearbyAreas.tsx`, `SchemaMarkup.tsx`
- `src/data/locations.ts`, `src/data/services.ts`, `src/data/blogPosts.tsx`, `src/data/posts/*.tsx`, `src/data/projects.ts`
- `src/pages/{Home,Contact,Locations,Gallery,BlogPost,Services,Blog,Financing,InstantQuote}.tsx`, `src/pages/services/*.tsx`
- `scripts/verify-schema.mjs`, `scripts/schema-baseline.json`, `src/routes.config.mjs`
- `.planning/PROJECT.md` lines 41, 42, 122

</canonical_refs>
