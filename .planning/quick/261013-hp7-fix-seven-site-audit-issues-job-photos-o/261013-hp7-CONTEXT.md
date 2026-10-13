# Quick Task 261013-hp7: Fix seven site-audit issues - Context

**Gathered:** 2026-10-13
**Status:** Ready for planning

<domain>
## Task Boundary

A site audit of dteroofingllc.com flagged seven issues. Fix all seven:

1. **No content images on 37 of 41 pages.** Service, location and blog pages show only the logo. Add job photos from the existing `/public/images/` assets.
2. **Homepage title and `/locations/columbus` H1 target the same phrase.** Change the homepage document title to `Roofing Contractor in Columbus, OH | DTE Roofing`.
3. **Homepage H1 contains a pipe** (`DTE Roofing | Roofing Contractor in Columbus OH You Can Trust`). Remove it.
4. **`/locations/columbus` is the thinnest location page** (~1,080 words, no FAQ). The other 12 run 1,900-2,700 words with FAQ schema. Expand it to 1,800+ words and add a FAQ.
5. **Reynoldsburg, Grove City and Pickerington share 47-54% of their text.** Rewrite each so the copy is unique and locally grounded.
6. **Blog posts are weakly linked.** Four of seven are linked only from `/blog`; no service page links to a post except StormDamage. Add related-post links between posts and contextual links from matching service pages.
7. **`/financing` and `/get-a-quote-consultation` have no in-content links out; `/about` has one.** Add in-content links.

Hard constraints (from CLAUDE.md, still in force):
- Do NOT change any URL or slug.
- Do NOT change NAP (business name, `615 Hilliard Rome Rd, Columbus, OH 43228`, `614-971-6028`, `experience@dteroofing.com`).
- Match the existing Tailwind design (charcoal / primary-700).
- Use only images already in `/public/images/`. No new assets, no new dependencies.
- Source files are CRLF. Preserve CRLF line endings when editing `src/` files (Edit mismatches on these files are usually line endings, not content).
- The old "do not modify content" constraint is lifted ONLY for the four location pages named in items 4 and 5, and only as far as those items require. Everything else keeps its existing prose; add, do not rewrite.

</domain>

<decisions>
## Implementation Decisions

### A. Job photos (issue 1)

**Shared component.** Create `src/components/RecentWork.tsx`:

```ts
interface RecentWorkProps {
  projectIds: number[];      // ids from src/data/projects.ts, rendered in the given order
  heading: string;           // e.g. "Recent Roofing Work in Dublin"
  intro?: string;            // optional one-sentence lead-in
  className?: string;        // optional wrapper classes so pages can control spacing
}
```

- Renders `<section aria-labelledby={headingId}>` with an `<h2>` (`text-3xl font-bold text-charcoal-900 mb-6`), optional `<p className="text-lg text-charcoal-600 mb-8">`, a grid `grid grid-cols-1 sm:grid-cols-3 gap-4`, and a trailing `<Link to="/gallery">` ("See more completed projects").
- Each item is a `<figure>` wrapping `<div className="aspect-video overflow-hidden rounded-xl shadow-md">` + `<Picture>` (`className="w-full h-full object-cover"`, `loading="lazy"`, `sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"`) and a `<figcaption className="mt-2 text-sm text-charcoal-600">` showing `{project.title} — {project.location}`.
- `alt` comes from `project.alt` (already descriptive). Never invent alt text.
- Add `export function getProjectsByIds(ids: number[]): Project[]` to `src/data/projects.ts` that returns projects in the requested order and silently drops unknown ids.
- Pure markup (no state/effects) so it prerenders into static HTML like `Picture` does.

**Location pages** (13 files in `src/pages/locations/`): insert one `<RecentWork>` block immediately BEFORE the FAQ block (`"{City} Roofing FAQs"` section). Columbus has no FAQ yet; its block goes immediately before the "Visit Our Columbus HQ" section. Heading: `Recent Roofing Work in {City}` when all three photos are from that city, otherwise `Recent Roofing Work Near {City}`. Project ids per page (first id is always the city's own photo when one exists):

| Page | projectIds | Heading |
|------|-----------|---------|
| Columbus | [1, 12, 19] | Recent Roofing Work in Columbus |
| Dublin | [2, 8, 25] | Recent Roofing Work in Dublin |
| Westerville | [3, 9, 23] | Recent Roofing Work in Westerville |
| Powell | [4, 16, 20] | Recent Roofing Work Near Powell |
| New Albany | [5, 15, 17] | Recent Roofing Work Near New Albany |
| Gahanna | [6, 17, 5] | Recent Roofing Work Near Gahanna |
| Hilliard | [7, 22, 1] | Recent Roofing Work Near Hilliard |
| Grove City | [10, 26, 19] | Recent Roofing Work Near Grove City |
| Upper Arlington | [11, 24, 1] | Recent Roofing Work Near Upper Arlington |
| Worthington | [13, 3, 4] | Recent Roofing Work Near Worthington |
| Pickerington | [14, 18, 15] | Recent Roofing Work Near Pickerington |
| Reynoldsburg | [18, 14, 6] | Recent Roofing Work Near Reynoldsburg |
| Delaware | [20, 16, 4] | Recent Roofing Work Near Delaware |

**Service pages** (10): `src/components/ServicePageTemplate.tsx` already has an "Our Recent Work" section with three "Photo coming soon" placeholders — replace that whole placeholder grid with `<RecentWork>` (keep the section heading, drop the TODO). Add an optional `recentWorkIds?: number[]` prop to the template with the roof-repair default below so `RoofRepair.tsx` needs no change beyond passing ids. The 9 hand-built service pages get a `<RecentWork>` block inserted immediately before their FAQ section; if a page has no FAQ section, insert it immediately before the `<ServiceAreaLinks />` wrapper. Wrap it in the same container pattern the neighbouring sections use (`container mx-auto px-4` + `max-w-4xl mx-auto` where the page uses that) so it aligns with the surrounding content.

| Service page | projectIds | Heading |
|--------------|-----------|---------|
| roof-repair (template) | [12, 15, 5] | Recent Roof Repairs |
| roof-replacement | [1, 7, 13] | Recent Roof Replacements |
| roof-installation | [21, 8, 26] | Recent Roof Installations |
| roof-inspection | [5, 18, 9] | What Our Inspections Catch |
| gutters | [10, 22, 15] | Recent Roofline & Water-Management Work |
| emergency-services | [12, 9, 23] | Recent Emergency Repairs |
| storm-damage | [18, 25, 23] | Recent Storm Damage Repairs |
| preventative-maintenance | [5, 22, 3] | Recent Maintenance & Ventilation Work |
| siding | [16, 11, 24] | Recent Exterior Projects |
| commercial-roofing | [19, 20, 24] | Recent Commercial & Complex Roof Projects |

**Blog.** Every post already has an `image` field (absolute URL under `https://www.dteroofingllc.com/images/...`). Do not add new fields for the image.
- `src/pages/BlogPost.tsx`: render a featured `<figure>` at the top of the article card (inside `.article-content`, before `{post.content()}`) using `<Picture>` with `src={post.image.replace(/^https?:\/\/[^/]+/, '')}`, `sizes="(min-width:1024px) 896px, 100vw"`, `loading="eager"`, `fetchPriority="high"`, `className="w-full rounded-xl object-cover aspect-video"`. Alt: look the image path up in `projects` (`projects.find((p) => p.image === path)?.alt`); fall back to `Completed DTE Roofing architectural shingle roof on a Central Ohio home` (the only post not backed by a project is the signs post, which uses the hero image). Add a `<figcaption className="text-sm text-charcoal-500 mt-2">` with the project title + location when a project matched; omit the caption otherwise. `.article-content img` already has rounded/shadow CSS.
- `src/pages/Blog.tsx`: replace the `🏠` emoji placeholder block in each card with the same `<Picture>` (alt lookup identical; `sizes="(min-width:768px) 50vw, 100vw"`, `loading="lazy"`, `className="w-full h-full object-cover"`). Keep the tag badge overlay. Put the alt lookup in one small exported helper in `src/data/projects.ts` (`getProjectByImage(path: string): Project | undefined`) so both pages share it.
- The hero image `hero-roofing-professional.jpg` has no AVIF variant; `Picture` handles that automatically when `sizes` is passed (it reads `imageVariants`). Always pass `sizes`.

### B. Homepage title and H1 (issues 2 and 3) — `src/pages/Home.tsx`

- `DOCUMENT_TITLE = 'Roofing Contractor in Columbus, OH | DTE Roofing'`.
- `SchemaMarkup pageTitle` must be the identical string (`scripts/verify-schema.mjs` check e fails if the WebPage `name` and `<title>` differ).
- H1 becomes `The Roofing Contractor in Columbus, OH You Can Trust` (no pipe, brand name stays out of the H1; the logo/nav already carries it). Nothing else on the page changes.

### C. Columbus expansion (issue 4) — `src/pages/locations/Columbus.tsx`

Keep every existing section and sentence. ADD, in this order:

1. A `columbusFaqs` array (10 Q&As, see angles below) passed to `<SchemaMarkup faqs={columbusFaqs} />`, and a "Columbus Roofing FAQs" `<details>` block using the exact markup pattern from `Reynoldsburg.tsx` lines 302-317. Place the FAQ block after the testimonials grid and before "Visit Our Columbus HQ".
2. A "Roofing Services Tailored to Columbus Homes" section (4 cards: Roof Repair, Roof Replacement, Storm & Hail Inspections, Gutters & Drainage) copied structurally from `Dublin.tsx` lines 225-337 (icons `Wrench`, `Home`, `CloudRain`, `Droplets`), with Columbus-specific bullet points and the same "Learn More" links. Place it after the "Common Roofing Issues in Columbus" grid.
3. A short prose section "Permits, Historic Districts & Columbus Housing Stock" (3 paragraphs, ~250 words) placed before the weather/testimonials grid. Content angles: City of Columbus re-roof permits and inspections; exterior changes in the German Village, Italian Village and Victorian Village historic districts may need commission approval so matching materials and documentation matter; University District / campus-area rental properties and landlord turnarounds; low-slope and flat roofs on downtown and older commercial-residential buildings; 1950s-1990s suburban ranches and two-stories across the I-270 ring. Link once each to `/services/roof-repair`, `/services/roof-replacement`, `/services/commercial-roofing` and `/services/storm-damage` using the site's inline link classes (`text-primary-700 hover:underline font-semibold`).
4. The `<RecentWork projectIds={[1, 12, 19]} heading="Recent Roofing Work in Columbus" />` block (per section A).

FAQ angles (write full answers, 60-110 words each, Columbus-specific, no invented statistics or dates): where the HQ is and which Columbus areas are served fastest; do you pull City of Columbus permits; historic-district roofing (German Village etc.); roofing rental/investment properties near OSU; flat/low-slope roofs; ice dams on 1950s-70s homes with little attic insulation; after a hail or wind storm what to do first and how insurance documentation works; how long a Columbus replacement takes; repair vs replacement guidance; the fastest way to schedule.

Target: 1,800-2,100 words of visible copy after the additions (the page is ~1,080 now). Do not pad; every added paragraph must say something specific to Columbus.

### D. Unique copy for Reynoldsburg, Grove City, Pickerington (issue 5)

Keep each page's structure, component usage, imports, `DOCUMENT_TITLE`, `<SEO>` and `<SchemaMarkup>` props, neighborhood tile lists, customer reviews, map iframes, directions links, and all CTA buttons/links. REWRITE all prose so it is unique to the city: hero paragraph, the three intro paragraphs, the "Why {City} Homeowners Choose DTE Roofing" bullets, the four "Common Roofing Issues" cards (new titles and bodies), the proximity paragraph, the FAQ questions AND answers (keep 10 per page; at most 3 may cover a topic another of the three pages also covers, and even then the question wording and answer must differ), the seven "Why {City} Residents Choose Us" items (keep titles, rewrite descriptions), and the closing CTA sentences. Keep each page between 1,800 and 2,300 visible words. Shared sentences across the three pages must disappear — a reviewer diffing any two of the three should find no paragraph in common.

Local angles to build from (all real places/facts; do not add population figures, storm dates or claim-statistics):

- **Reynoldsburg** (east side; city spans Franklin, Licking and Fairfield counties). "Birthplace of the Tomato" / Tomato Festival heritage. Old Reynoldsburg and the East Main Street / Broad Street (US-40) corridors have 1960s-70s ranches and split-levels, many on their second or third roof, some still carrying two shingle layers that force a full tear-off. Newer subdivisions toward Taylor Road, Waggoner Road and Blacklick have 1990s-2000s builder-grade roofs reaching replacement age. Blacklick Woods Metro Park and mature tree canopy on the older streets. Open exposure on the eastern edge means wind-driven rain and hail hit hard, so the page's spine is storm documentation and insurance claims (its `highlight` in `locations.ts` is "Storm Protection Experts"). Access via I-70 and I-270 east, Brice Road.
- **Grove City** (southwest; Jackson Township, Franklin County). Historic Town Center along Broadway, the former Beulah Park racetrack site now being redeveloped, the Pinnacle golf community, Stringtown Road retail corridor, Hoover Road, Buckeye Parkway, Fryer Park, Scioto Grove Metro Park. Housing splits between 1950s-70s ranches around Broadway and large 2000s-2010s subdivisions (Hoover Crossing, Indian Run, Derby Hill, Pinnacle) whose first roofs are aging out together, so the page's spine is builder-grade replacement, HOA colour matching and wind-lift on open-exposure lots backing farmland (its `highlight` is "Rapid Growth Area"). Access via I-71, I-270 south loop, US-62 and Stringtown Road.
- **Pickerington** (southeast; Fairfield County city with portions in Franklin County; surrounded by Violet Township, so permits depend on whether the house is inside city limits — its `highlight` is "Dual-County Service"). Olde Pickerington Village historic core, OH-256 / Hill Road / Refugee Road corridors, wooded lots along Sycamore Creek, Pickerington Ponds Metro Park, the Canal Winchester border. Housing is dominated by 1990s-2010s two-story homes with complex rooflines (multiple valleys, dormers, skylights), so the page's spine is valley and flashing work, attic ventilation in two-story homes, tree debris near the creek, and builder-grade shingles reaching 15-20 years. Access via I-270, I-70, US-33 and OH-256.

### E. Blog cross-links and service-to-blog links (issue 6)

**Related posts.** Add an optional `relatedPosts?: string[]` (slugs) to the `BlogPost` interface in `src/data/blogPosts.tsx`, plus `export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[]` that resolves the slugs via `getPostBySlug` and keeps order. Set the field on all seven posts exactly as follows (every post ends up with at least two inbound links):

| Post slug | relatedPosts |
|-----------|--------------|
| signs-you-need-a-new-roof | roof-repair-vs-replacement, how-long-does-a-roof-last-ohio, hail-damage-roof-insurance-claim-ohio |
| what-to-look-for-columbus-roofing-contractor | roof-replacement-cost-columbus-ohio, hail-damage-roof-insurance-claim-ohio, roof-repair-vs-replacement |
| roof-repair-vs-replacement | signs-you-need-a-new-roof, roof-replacement-cost-columbus-ohio, hail-damage-roof-insurance-claim-ohio |
| how-long-does-a-roof-last-ohio | asphalt-vs-metal-roofing-ohio, signs-you-need-a-new-roof, roof-repair-vs-replacement |
| hail-damage-roof-insurance-claim-ohio | roof-repair-vs-replacement, what-to-look-for-columbus-roofing-contractor, roof-replacement-cost-columbus-ohio |
| asphalt-vs-metal-roofing-ohio | roof-replacement-cost-columbus-ohio, how-long-does-a-roof-last-ohio, signs-you-need-a-new-roof |
| roof-replacement-cost-columbus-ohio | asphalt-vs-metal-roofing-ohio, roof-repair-vs-replacement, what-to-look-for-columbus-roofing-contractor |

`src/pages/BlogPost.tsx` renders a "Related Articles" section (`<section aria-labelledby="related-posts-heading">`, h2 `text-3xl font-bold text-charcoal-900 mb-8 text-center`) between the bottom CTA box and `<RelatedAreas>`: a `grid md:grid-cols-3 gap-6` of cards (`bg-white rounded-xl border-2 border-gray-200 hover:border-primary-600 p-6`), each with the post title as a `<Link to={`/blog/${slug}`}>` in an `<h3>`, the excerpt clamped to ~3 lines (`line-clamp-3` is available in Tailwind 3.4), and a "Read article" link. No images in these cards (keep the post chunk light).

**Service → blog links.** Add contextual inline links (existing link classes: `text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2`) inside EXISTING sentences or as one added sentence at the end of an existing paragraph. Do not add new sections for this. Targets:

| Service page | Link to |
|--------------|---------|
| RoofRepair.tsx (`problemPromise` JSX, in the "REPAIR VS. REPLACEMENT" block and the warning-signs list) | /blog/roof-repair-vs-replacement, /blog/signs-you-need-a-new-roof |
| RoofReplacement.tsx (cost section; materials section; the repair-or-replace FAQ) | /blog/roof-replacement-cost-columbus-ohio, /blog/asphalt-vs-metal-roofing-ohio, /blog/roof-repair-vs-replacement |
| RoofInspection.tsx | /blog/signs-you-need-a-new-roof, /blog/how-long-does-a-roof-last-ohio |
| RoofInstallation.tsx | /blog/asphalt-vs-metal-roofing-ohio, /blog/roof-replacement-cost-columbus-ohio |
| StormDamage.tsx (already links the hail post; keep it) | add /blog/roof-repair-vs-replacement where repair-vs-replace after a storm is discussed |
| EmergencyServices.tsx | /blog/hail-damage-roof-insurance-claim-ohio, /blog/signs-you-need-a-new-roof |
| Gutters.tsx | /blog/signs-you-need-a-new-roof (granules in gutters), /blog/how-long-does-a-roof-last-ohio |
| PreventativeMaintenance.tsx | /blog/how-long-does-a-roof-last-ohio, /blog/signs-you-need-a-new-roof |
| Siding.tsx | /blog/what-to-look-for-columbus-roofing-contractor, /blog/hail-damage-roof-insurance-claim-ohio |
| CommercialRoofing.tsx | /blog/what-to-look-for-columbus-roofing-contractor, /blog/roof-replacement-cost-columbus-ohio |

Anchor text must describe the post ("our guide to roof replacement cost in Columbus"), never "click here".

### F. In-content links on Financing, Instant Quote, About (issue 7)

Add links inside existing prose (same inline classes as the page's neighbours; Financing uses green accents, so use `text-green-700 hover:text-green-800 font-semibold underline` there). Minimum five in-content internal links per page, all to existing routes:

- **`src/pages/Financing.tsx`**: the "Roof Replacement, Installation & Siding Financing Options" intro paragraph links `/services/roof-replacement`, `/services/roof-installation` and `/services/siding`; step 1 "Get a Quote" text links `/get-a-quote-consultation`; the "See If You Qualify" intro gains one sentence linking `/blog/roof-replacement-cost-columbus-ohio` ("not sure what a new roof costs?") and `/contact` ("schedule a free inspection"). The products grid, form and webhook logic are untouched.
- **`src/pages/InstantQuote.tsx`**: step 4 "Schedule a free in-person inspection" links `/services/roof-inspection`; add one short paragraph under the How It Works box ("The instant tool prices full roof replacement. For repairs, storm damage or gutters, ...") linking `/services/roof-replacement`, `/services/roof-repair`, `/services/storm-damage`, `/financing` and `/contact`; the "Trusted by homeowners across Columbus, Hilliard, and Dublin" line links each city to its `/locations/{slug}` page. The Roofle widget script/effect is untouched.
- **`src/pages/About.tsx`**: "Founded in Columbus" links `/locations/columbus`; "a proud Hilliard native" links `/locations/hilliard`; "a simple repair or a complete roof replacement" links `/services/roof-repair` and `/services/roof-replacement`; "Emergency services available 24/7" in the Why Choose list becomes a JSX item linking `/services/emergency-services` (convert that single list entry to a node; keep the others as strings); the "See Us In Action" intro links `/gallery`; add one sentence under the Why Choose list linking `/reviews` and `/blog/what-to-look-for-columbus-roofing-contractor`.

### G. Execution mechanics

- Executors run on the main working tree (no worktree). Plans in the same wave MUST touch disjoint files. Commit with explicit paths (`git add <files>`); if git reports an `index.lock`, wait two seconds and retry once.
- Do NOT run `npm run build` inside executors (parallel builds clobber `dist/`; the orchestrator builds once per wave). Per-file type safety check: `npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep -E "<your files>"` must print nothing (typecheck has pre-existing errors elsewhere — only your files matter).
- Orchestrator gates after each wave: `npm run build` (then `git checkout public/sitemap.xml`, the build rewrites it), `npm run verify-links`, `npm run verify-schema`, and a shingled-text overlap check between the three rewritten location pages.
- Commit message style in this repo: `feat(scope): ...` / `fix(scope): ...` / `docs(quick-<id>): ...`, lower-case summary, plus the `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>` trailer.

### Claude's Discretion
Exact wording of all new prose, FAQ answers, and card bullets; exact insertion lines; whether a service page needs a wrapper `div` to align the RecentWork block with its neighbours.

</decisions>

<specifics>
## Specific Ideas

- Pattern references: FAQ `<details>` markup — `src/pages/locations/Reynoldsburg.tsx` lines 302-317; service cards with icons and "Learn More" links — `src/pages/locations/Dublin.tsx` lines 225-337; responsive `<Picture>` grid with `sizes` — `src/pages/About.tsx` "See Us In Action" section; project data and alt text — `src/data/projects.ts`.
- Inline link class string used across service pages: `text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2`.
- Word-count helper used in the audit (approximation of visible copy): `sed -E 's/<[^>]*>//g; s/className="[^"]*"//g; s/import .*//' FILE | grep -v "^\s*[{}();]*\s*$" | wc -w`.

</specifics>

<canonical_refs>
## Canonical References

- `CLAUDE.md` (project constraints: URLs, NAP, design, images, dependencies)
- `scripts/verify-schema.mjs` (WebPage name must equal `<title>`; FAQ counts must not drop)
- `scripts/verify-links.mjs` (every internal href must resolve to a prerendered route)
- Memory notes: build is the verification gate; `npm run build` dirties `public/sitemap.xml`; source files are CRLF.

</canonical_refs>
