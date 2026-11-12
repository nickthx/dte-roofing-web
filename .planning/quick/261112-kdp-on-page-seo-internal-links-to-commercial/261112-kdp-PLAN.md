---
phase: quick-261112-kdp
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/pages/Home.tsx
  - src/pages/services/RoofRepair.tsx
  - src/pages/locations/Dublin.tsx
  - src/pages/locations/Gahanna.tsx
  - src/pages/locations/Reynoldsburg.tsx
  - src/pages/locations/Westerville.tsx
  - src/pages/locations/Worthington.tsx
  - src/pages/locations/Columbus.tsx
  - src/pages/services/RoofReplacement.tsx
  - src/pages/services/StormDamage.tsx
  - src/pages/services/CommercialRoofing.tsx
  - src/pages/services/EmergencyServices.tsx
  - src/pages/Gallery.tsx
  - src/data/blogPosts.tsx
  - src/data/posts/roof-replacement-cost-columbus-ohio.tsx
  - src/data/posts/roof-repair-vs-replacement.tsx
  - src/data/posts/how-long-does-a-roof-last-ohio.tsx
autonomous: true
requirements: [QUICK-261112-KDP-LINKS, QUICK-261112-KDP-HEADINGS]

must_haves:
  truths:
    - "/services/commercial-roofing gets contextual <main> in-links from at least 9 other pages (baseline 3)"
    - "/services/roof-installation gets contextual <main> in-links from at least 12 other pages (baseline 6)"
    - "No page links to itself; no page has more than one <main> link to the same target"
    - "/gallery, /services/emergency-services and /services/storm-damage have no H1-to-H3 skip, and no other dist page has a heading skip"
    - "Visible <main> text is byte-identical to baseline on every route except the 6 allowlisted list-item additions"
    - "Retagged headings look exactly the same as before (same className, Tailwind preflight resets h2/h3 size and weight)"
  artifacts:
    - path: "src/pages/services/RoofRepair.tsx"
      provides: "relatedServices entries for Commercial Roofing and Roof Installation"
      contains: "/services/commercial-roofing"
    - path: "src/pages/Home.tsx"
      provides: "Contextual link on 'commercial properties'"
      contains: "/services/commercial-roofing"
    - path: "src/pages/locations/Columbus.tsx"
      provides: "Contextual link on 'install roofs built to handle them'"
      contains: "/services/roof-installation"
  key_links:
    - from: "dist/**/index.html <main>"
      to: "/services/commercial-roofing, /services/roof-installation"
      via: "react-router <Link> rendered to <a href> in prerendered HTML"
      pattern: "href=\"/services/(commercial-roofing|roof-installation)\""
---

<objective>
Raise contextual internal links to the two weakest money pages, /services/commercial-roofing (3 to 10 pages) and /services/roof-installation (6 to 15 pages). Do it only by wrapping words that already exist in the copy, or by adding items to existing data-driven link lists. Also fix the H1-to-H3 heading skips on /gallery, /services/emergency-services and /services/storm-damage.

Purpose: Fix two on-page SEO audit findings (2026-11-12): weak link equity to the money pages and a broken heading outline. The project's hard rule is that no existing copy changes.
Output: Small JSX edits in 17 source files, a fresh build, and verification numbers (before vs after in-link counts, skip scan, text-diff gate).
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@./CLAUDE.md
@.planning/STATE.md

Do NOT edit .planning/STATE.md (the orchestrator owns it).

## Hard constraints (project CLAUDE.md + memory)
- Do NOT rewrite or add copy. Allowed: wrap EXISTING words in a react-router `<Link>`, or add an item to an EXISTING data-driven link list (location "services" list, ServicePageTemplate `relatedServices`).
- Never link inside FAQ answers. FAQ arrays feed FAQPage JSON-LD, and a mismatch between visible text and JSON-LD is a known risk. Never link in testimonials, in `description:`/`features:`/`text:` data strings, inside an existing `<Link>` or clickable card (nested `<a>`), or in headings.
- Source files are CRLF. If Edit fails to match, the cause is line endings, not content.
- The verification gate is `npm run build`. `typecheck` and `lint` were already red before this task, so ignore them.
- `npm run build` rewrites the tracked `public/sitemap.xml`. Run `git checkout public/sitemap.xml` after EVERY build.
- Prerendered dist HTML is a single line. Use `grep -o`, never `grep -c`, to count.

## JSX whitespace pitfall (important)
JSX drops any whitespace run that contains a newline between a text node and an element. So if the wrapped phrase starts at the beginning of a source line (previous line ends with text), or ends at the end of a line (next line starts with text), add an explicit `{' '}` on the side that meets a line break. Otherwise the words fuse ("specializes ininstalling"). The text-diff gate in Task 3 catches this, but get it right the first time. When the phrase is mid-line, no `{' '}` is needed.

## Link class patterns to reuse (copy exactly)
- Service pages, Home and location body copy: `className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2"`. This is the existing in-content pattern on StormDamage, EmergencyServices and RoofReplacement.
- Blog post bodies (src/data/posts/*, src/data/blogPosts.tsx): bare `<Link to="...">` with no className. The `.article-content` prose styles them, as in the existing links in those files. Each file already imports Link.
- Location service lists: add an object `{ name: "...", link: "..." }`. The `.map` renders the `<Link>`. Match each file's quote style (double quotes in Gahanna/Reynoldsburg/Westerville/Worthington, single quotes in Dublin).
- Make sure `Link` is imported from 'react-router-dom' in every TSX file you wrap in (Home, Columbus, RoofReplacement, StormDamage and CommercialRoofing already use Link; confirm with grep).

## Baseline measured by planner (dist built from HEAD cbc354c)
- commercial-roofing: 3 pages (/locations/columbus x2, /locations, /services)
- roof-installation: 6 pages (/blog/asphalt-vs-metal-roofing-ohio, /financing, /locations/delaware, /locations/dublin, /locations, /locations/new-albany)
- Heading skips: /gallery, /services/emergency-services, /services/storm-damage (all h1 -> h3)

## Verification helper (already exists, planning artifact, do not move into src/)
`.planning/quick/261112-kdp-on-page-seo-internal-links-to-commercial/seo-scan.mjs`
- `node <script> dist` prints per-target in-link pages (inside `<main>`, self-links excluded) plus the first heading skip per page.
- `--snapshot <file>` writes the visible `<main>` text per route. `--compare <file>` diffs against a snapshot and prints a before/after excerpt per changed route.

## Heading-skip analysis (planner verified)
All three skips are page-local. ServicePageTemplate (used only by RoofRepair) already has correct h1 > h2 > h3 order and is NOT touched. Tailwind preflight is on (no corePlugins override in tailwind.config.js). The only h2/h3 CSS rules in src/index.css are scoped to `.article-content` (blog only). So an h3 becomes an h2 with no visual change when the className is kept. No `querySelector('h3')` exists in src.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Baseline snapshot, then commercial-roofing in-links</name>
  <files>src/pages/Home.tsx, src/pages/services/RoofRepair.tsx, src/pages/locations/Dublin.tsx, src/pages/locations/Gahanna.tsx, src/pages/locations/Reynoldsburg.tsx, src/pages/locations/Westerville.tsx, src/pages/locations/Worthington.tsx</files>
  <action>
STEP 0 (before ANY source edit): run `npm run build` on clean HEAD, then `git checkout public/sitemap.xml`. Then run the seo-scan helper with `dist --snapshot "$TEMP/kdp-baseline.json"` (temp dir, NOT the repo) and save its printed counts as the "before" numbers. They should match the planner baseline above. If they differ, record the actual numbers and continue.

Then add 7 commercial-roofing links (target /services/commercial-roofing):
1. src/pages/Home.tsx line ~170. In the services-section subtitle `<p className="text-xl text-charcoal-600 ...">Comprehensive roofing solutions for residential and commercial properties in Columbus, OH</p>`, wrap the existing words "commercial properties" in a Link with the service-page in-content class. The phrase is mid-line, so no `{' '}` is needed. Do NOT add a card to the services array at lines ~176-218: that would need new description copy.
2. src/pages/services/RoofRepair.tsx line ~198, the `relatedServices` array passed to ServicePageTemplate. Append `{ name: 'Commercial Roofing', link: '/services/commercial-roofing' }` (Task 2 appends the Roof Installation item to the same array; you may add both now). This is an existing data-driven related-services list, which is allowed.
3. Location service lists: append `{ name: "Commercial Roofing", link: "/services/commercial-roofing" }`, mirroring Columbus.tsx:160 exactly, as the last item of the services list array in these 5 pages. Each page's own section H2 already advertises "Commercial Roofing" (Dublin:111, Gahanna:103, Reynoldsburg:111, Westerville:107, Worthington:111). The arrays end at Dublin.tsx:168 (single quotes), Gahanna.tsx:155, Reynoldsburg.tsx:163, Westerville.tsx:158 and Worthington.tsx:164 (double quotes). Add a comma after the current last item. Do not touch the other 7 location pages, which have no commercial mention, and do not touch Columbus, which already has 2 commercial links.

Do NOT link Columbus.tsx:36 (FAQ answer, feeds JSON-LD), FAQ.tsx answers, Services.tsx (already has the commercial card), or any heading.
  </action>
  <verify>
    <automated>grep -c "/services/commercial-roofing" src/pages/Home.tsx src/pages/services/RoofRepair.tsx src/pages/locations/Dublin.tsx src/pages/locations/Gahanna.tsx src/pages/locations/Reynoldsburg.tsx src/pages/locations/Westerville.tsx src/pages/locations/Worthington.tsx  (each file must report exactly 1); test -f "$TEMP/kdp-baseline.json"</automated>
  </verify>
  <done>Baseline snapshot exists in temp, and "before" counts are recorded. Each of the 7 files contains exactly one /services/commercial-roofing reference, added by a wrap of existing words (Home) or an appended list item (RoofRepair plus 5 locations).</done>
</task>

<task type="auto">
  <name>Task 2: roof-installation in-links on existing words</name>
  <files>src/pages/services/RoofRepair.tsx, src/pages/locations/Columbus.tsx, src/pages/services/RoofReplacement.tsx, src/pages/services/StormDamage.tsx, src/pages/services/CommercialRoofing.tsx, src/data/blogPosts.tsx, src/data/posts/roof-replacement-cost-columbus-ohio.tsx, src/data/posts/roof-repair-vs-replacement.tsx, src/data/posts/how-long-does-a-roof-last-ohio.tsx</files>
  <action>
Add 9 links to /services/roof-installation. None of these pages links there today. Anchors are deliberately varied (no exact-match repetition):

1. src/pages/services/RoofRepair.tsx `relatedServices`: append `{ name: 'Roof Installation', link: '/services/roof-installation' }` if Task 1 did not already add it. The grid becomes 6 items (even, md:grid-cols-2).
2. src/pages/locations/Columbus.tsx line ~113 (body paragraph after the H2 at :108): wrap "install roofs built to handle them" in "We understand these local conditions and install roofs built to handle them for decades". Use the in-content class. The phrase is mid-line. Do NOT add a list item to Columbus.
3. src/pages/services/RoofReplacement.tsx line 60: wrap "installing beautiful, long-lasting roofs" (in-content class). Line 59 ends "...DTE Roofing specializes in" and line 60 STARTS with the phrase, so put `{' '}` before the Link (for example, end line 59 with `specializes in{' '}`). Leave the rest of line 60 after the Link unchanged.
4. src/pages/services/StormDamage.tsx line ~347: in "Not sure whether storm damage calls for a / patch or a new roof? Our guide to", wrap "a new roof" (in-content class). The phrase is mid-line on 347. Leave the existing blog Link on the same line untouched.
5. src/pages/services/CommercialRoofing.tsx line 66: in "Our team provides detailed project planning, transparent communication, and expert installation" (line 67 continues "of TPO, EPDM, metal roofing..."), wrap "expert installation" (in-content class). The phrase ENDS its line, so add `{' '}` after the closing `</Link>`.
6. src/data/posts/roof-replacement-cost-columbus-ohio.tsx line 35 (intro paragraph): wrap "a new roof" in "If you're budgeting for a new roof, the first thing..." with a bare `<Link to="/services/roof-installation">`. Mid-line.
7. src/data/blogPosts.tsx line 76 (body of the signs-you-need-a-new-roof post, slug at :41): wrap "a new roof" in "So the signs that you need a new roof tend to show up here" with a bare Link. Mid-line.
8. src/data/posts/roof-repair-vs-replacement.tsx line 94: wrap "brand-new roof" in "big patch on an old roof to a brand-new roof with a fresh warranty." with a bare Link. Mid-line.
9. src/data/posts/how-long-does-a-roof-last-ohio.tsx line ~153 (body paragraph under the "Does a new roof come with a real warranty?" h2; this h2 is NOT in the post's `faqs` array at :189): in "warranty on the installation. Manufacturer coverage", wrap "the installation" with a bare Link. Mid-line.

Do NOT touch: testimonials ("Our new roof looks great" and similar on location pages), FAQ `answer:` strings, any `faqs` arrays in posts, Services.tsx card `description`/`features` strings, Home.tsx card descriptions, or the asphalt-vs-metal post (it already links roof-installation). Home and /services have no existing installation wording outside card data, so they get no installation link. That is intentional (no invented copy); report it in the SUMMARY.
  </action>
  <verify>
    <automated>grep -c "/services/roof-installation" src/pages/services/RoofRepair.tsx src/pages/locations/Columbus.tsx src/pages/services/RoofReplacement.tsx src/pages/services/StormDamage.tsx src/pages/services/CommercialRoofing.tsx src/data/blogPosts.tsx src/data/posts/roof-replacement-cost-columbus-ohio.tsx src/data/posts/roof-repair-vs-replacement.tsx src/data/posts/how-long-does-a-roof-last-ohio.tsx  (each exactly 1)</automated>
  </verify>
  <done>Each of the 9 files contains exactly one /services/roof-installation reference, and wrapped words are unchanged. `{' '}` is present at the RoofReplacement:59/60 and CommercialRoofing:66/67 line-boundary joins.</done>
</task>

<task type="auto">
  <name>Task 3: Fix H1-to-H3 skips, build, run all verification gates</name>
  <files>src/pages/services/EmergencyServices.tsx, src/pages/services/StormDamage.tsx, src/pages/Gallery.tsx</files>
  <action>
Heading fixes: change only the tag name and keep every className and all content identical.
- src/pages/services/EmergencyServices.tsx:70 — the callout `<h3 className="font-bold text-charcoal-900 mb-2 text-xl">Available 24 Hours a Day, 7 Days a Week</h3>` becomes h2 (open and close tags). The next heading is the h2 at :83, which is fine.
- src/pages/services/StormDamage.tsx:79 — the callout `<h3 className="font-bold text-charcoal-900 mb-2">After the Storm</h3>` becomes h2. Preflight gives h2 and h3 the same inherited size and weight, so no classes are needed. The following h2 at :94 and h3 at :122 stay valid.
- src/pages/Gallery.tsx — both project-title h3s inside the `filteredProjects.map` become h2: the overlay title at ~:169 (`text-white font-bold text-2xl mb-3`) and the card-content title at ~:193 (`text-xl font-bold text-charcoal-900 mb-3 group-hover:...`). Leave the lightbox h3 at ~:305 alone: it renders only when open, after the CTA h2, and is never in prerendered HTML.

Then build and verify:
1. `npm run build` must succeed, then run `git checkout public/sitemap.xml`.
2. Run the seo-scan helper with `dist --compare "$TEMP/kdp-baseline.json"`. Required results:
   - commercial-roofing at 10 or more pages, now including /, /services/roof-repair, /locations/dublin, /locations/gahanna, /locations/reynoldsburg, /locations/westerville and /locations/worthington. roof-installation at 15 or more pages, now including /services/roof-repair, /locations/columbus, /services/roof-replacement, /services/storm-damage, /services/commercial-roofing, /blog/signs-you-need-a-new-roof, /blog/roof-replacement-cost-columbus-ohio, /blog/roof-repair-vs-replacement and /blog/how-long-does-a-roof-last-ohio.
   - Per-target counts: no newly added page shows x2 or more. /locations/columbus stays at x2 for commercial (pre-existing). Neither target page lists itself.
   - Heading skips: 0.
   - Visible text changes ONLY on the allowlist: /services/roof-repair (inserted "Commercial Roofing" and "Roof Installation" related-service items), plus /locations/dublin, /locations/gahanna, /locations/reynoldsburg, /locations/westerville and /locations/worthington (inserted "Commercial Roofing" item only). Any other changed route means a whitespace fusion or accidental copy edit: fix it and rebuild.
3. `npm run verify-schema` must pass (proves FAQ/JSON-LD untouched) and `npm run verify-links` must pass.
4. `git status --short` should show only the 17 source files plus the planning dir (.claude/settings.local.json was already modified before this task, so leave it). No public/sitemap.xml change.
Record the before/after numbers and the skip-scan result in the SUMMARY.
  </action>
  <verify>
    <automated>npm run build && git checkout public/sitemap.xml && node .planning/quick/261112-kdp-on-page-seo-internal-links-to-commercial/seo-scan.mjs dist --compare "$TEMP/kdp-baseline.json" && npm run verify-schema && npm run verify-links</automated>
  </verify>
  <done>The build succeeds. Commercial is at 10 or more pages (from 3) and installation at 15 or more (from 6). The heading-skip scan reports 0 across all dist pages. Text diff is limited to the 6 allowlisted routes. verify-schema and verify-links pass. The sitemap is restored.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| none new | Static internal links and heading tags only. No user input, network, or new dependencies. |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-kdp-01 | Tampering | FAQPage JSON-LD vs visible FAQ text | mitigate | No edits inside FAQ arrays or answers; `npm run verify-schema` gate |
| T-kdp-02 | Tampering | Approved page copy (CLAUDE.md constraint) | mitigate | Visible-text diff vs baseline snapshot, allowlist only for list-item additions |
| T-kdp-03 | Denial of service (SEO) | Broken internal hrefs | mitigate | Targets are existing prerendered routes; `npm run verify-links` gate |
</threat_model>

<verification>
- The before/after in-link counts from seo-scan.mjs are recorded in the SUMMARY (commercial 3 to 10 or more, installation 6 to 15 or more).
- The H1-to-H3 (any level jump greater than 1) skip scan over all dist/**/index.html `<main>` reports 0.
- The visible-text diff is limited to the 6 allowlisted routes.
- `npm run build`, `npm run verify-schema` and `npm run verify-links` all pass. public/sitemap.xml is restored.
</verification>

<success_criteria>
- /services/commercial-roofing: 10 or more contextual in-link pages. /services/roof-installation: 15 or more.
- No self-links, at most one link per target per newly linked page, and varied anchors drawn from existing words.
- 0 heading skips site-wide, with retagged headings visually identical.
- No approved copy altered; STATE.md untouched.
</success_criteria>

<output>
Create `.planning/quick/261112-kdp-on-page-seo-internal-links-to-commercial/261112-kdp-SUMMARY.md` when done. Include: before/after in-link page lists for both targets, the skip-scan result, the text-diff allowlist result, and the deliberate gaps (no installation link on Home or /services because only card-data strings mention installation; adding a card would need new copy).
</output>
