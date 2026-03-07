# Codebase Concerns

**Analysis Date:** 2026-03-07

## Tech Debt

**Massive Code Duplication in Location Pages:**
- Issue: 13 location pages (`src/pages/locations/*.tsx`) are ~470-504 lines each of nearly identical hand-written JSX. They differ only in city name, neighborhood references, and minor copy. None use the shared template pattern.
- Files: `src/pages/locations/Dublin.tsx`, `src/pages/locations/Powell.tsx`, `src/pages/locations/Hilliard.tsx`, `src/pages/locations/Columbus.tsx`, `src/pages/locations/Delaware.tsx`, `src/pages/locations/Gahanna.tsx`, `src/pages/locations/GroveCity.tsx`, `src/pages/locations/NewAlbany.tsx`, `src/pages/locations/Pickerington.tsx`, `src/pages/locations/Reynoldsburg.tsx`, `src/pages/locations/UpperArlington.tsx`, `src/pages/locations/Westerville.tsx`, `src/pages/locations/Worthington.tsx`
- Impact: Any layout change, CTA update, or design improvement must be replicated across all 13 files manually. High risk of inconsistency. Total ~6,300 lines that could be ~200 lines with a data-driven template.
- Fix approach: Create a `LocationPageTemplate` component (similar to `src/components/ServicePageTemplate.tsx`), extract location-specific data into a config object per city, and render from the template.

**Inconsistent Service Page Architecture:**
- Issue: Some service pages use `ServicePageTemplate` (e.g., `src/pages/services/RoofRepair.tsx`) while most are fully hand-written with duplicated layouts (e.g., `src/pages/services/RoofInstallation.tsx`, `src/pages/services/StormDamage.tsx`, `src/pages/services/Siding.tsx`, `src/pages/services/CommercialRoofing.tsx`). The hand-written ones are 300-793 lines each.
- Files: `src/pages/services/RoofInstallation.tsx` (668 lines), `src/pages/services/CommercialRoofing.tsx` (793 lines), `src/pages/services/Siding.tsx` (670 lines), `src/pages/services/RoofReplacement.tsx` (627 lines), `src/pages/services/StormDamage.tsx`, `src/pages/services/EmergencyServices.tsx`, `src/pages/services/GutterServices.tsx`, `src/pages/services/Gutters.tsx`
- Impact: Two parallel patterns for the same thing. Updating the CTA, layout, or lead form on hand-written pages requires per-file changes. `ServicePageTemplate` improvements do not propagate.
- Fix approach: Migrate all service pages to use `ServicePageTemplate`, extending its props as needed. Remove hand-written duplicates.

**Duplicate Gutter Service Pages:**
- Issue: Two separate pages for essentially the same service: `GutterServices` at `/services/gutter-services` and `Gutters` at `/services/gutters`. Both are hand-written with different layouts but overlapping content.
- Files: `src/pages/services/GutterServices.tsx`, `src/pages/services/Gutters.tsx`
- Impact: SEO keyword cannibalization, confusing navigation, duplicate maintenance burden. Navigation links to `/services/gutters` only.
- Fix approach: Consolidate into one page at `/services/gutters` (the nav-linked route), redirect `/services/gutter-services` to it.

**Duplicate Emergency/Storm Pages:**
- Issue: `EmergencyServices` at `/services/emergency-services` and `StormDamage` at `/services/storm-damage` have significant content overlap. Navigation links to `StormDamage` only.
- Files: `src/pages/services/EmergencyServices.tsx`, `src/pages/services/StormDamage.tsx`
- Impact: SEO cannibalization, user confusion. Emergency services page is unreachable from navigation.
- Fix approach: Merge emergency content into storm damage page, or differentiate clearly and add emergency to navigation.

**Hardcoded Phone Numbers and Business Info:**
- Issue: The phone number `614-971-6028` / `6149716028` appears hardcoded in 37 files across 152 occurrences. Business address is also hardcoded in multiple places.
- Files: Nearly every page and component file in `src/pages/` and `src/components/`
- Impact: Changing the phone number or address requires editing 37+ files. High risk of missing an instance.
- Fix approach: Create a `src/constants/business.ts` file with phone, address, email, and other business info. Import everywhere.

**Inconsistent Canonical URL Approach:**
- Issue: Some pages use the `CANONICAL_DOMAIN` constant from `src/seo/constants.ts` (14 service pages, Home), while 23 other pages hardcode the full `https://www.dteroofingllc.com/...` canonical URL string directly.
- Files: All `src/pages/locations/*.tsx`, `src/pages/About.tsx`, `src/pages/Contact.tsx`, `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`, `src/pages/Gallery.tsx`, `src/pages/FAQ.tsx`, `src/pages/Reviews.tsx`, `src/pages/Services.tsx`, `src/pages/InstantQuote.tsx`, `src/pages/Locations.tsx`, `src/pages/Financing.tsx`
- Impact: If the domain changes, 23 files need manual updates. The constant exists but is not used consistently.
- Fix approach: Replace all hardcoded canonical URLs with `${CANONICAL_DOMAIN}/path`.

**Identical SEO Title Across 20 Pages:**
- Issue: 20 pages share the exact same `<title>` tag: "BEST Roofer in Columbus -- if you're looking for Honest Roofing Services near me or Expert Roof Repair & Replacement near me -- DTE Roofing is the place to be." This includes Blog, FAQ, Gallery, Contact, all service pages, and all pages using `ServicePageTemplate`.
- Files: `src/components/ServicePageTemplate.tsx` (line 71 -- hardcodes this title, ignoring the `serviceName` prop), `src/pages/Blog.tsx`, `src/pages/Contact.tsx`, `src/pages/FAQ.tsx`, `src/pages/Gallery.tsx`, `src/pages/About.tsx`, `src/pages/Services.tsx`, `src/pages/Reviews.tsx`, `src/pages/InstantQuote.tsx`, all `src/pages/services/*.tsx` files
- Impact: Major SEO problem. Google cannot differentiate pages by title. Click-through rates suffer because every SERP result shows the same title. The `ServicePageTemplate` hardcodes the title on line 71, completely ignoring the service-specific `serviceName` prop.
- Fix approach: Give each page a unique, descriptive title. Fix `ServicePageTemplate` to use `serviceName` in the title (e.g., `${serviceName} Columbus OH | DTE Roofing`).

**Supabase Credentials Hardcoded in Source:**
- Issue: The Supabase URL and anon key are hardcoded directly in source code rather than loaded from environment variables.
- Files: `src/lib/supabase.ts` (lines 3-4)
- Impact: Credentials are committed to git and visible in the built JavaScript bundle. While anon keys are designed to be public, this pattern makes it impossible to use different Supabase projects for dev/staging/production without code changes.
- Fix approach: Move to `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY` environment variables.

**Unused `direction` State in Form Hook:**
- Issue: `useMultiStepForm` tracks a `direction` state (`'forward' | 'backward'`) and returns it, but no consumer uses it for animation or any purpose.
- Files: `src/hooks/useMultiStepForm.ts` (lines 45, 77, 83, 117, 121, 132)
- Impact: Minor dead code. Could be cleaned up or used for step transition animations.
- Fix approach: Remove `direction` state or implement transition animations.

**Duplicate Schema Systems:**
- Issue: Two separate schema markup systems exist: `src/components/SchemaMarkup.tsx` (dynamic, React-based) and `src/seo/schemas.ts` (static export). `SchemaMarkup.tsx` defines its own `BUSINESS_INFO` object that duplicates data from `src/seo/schemas.ts`. They have slightly different geo coordinates.
- Files: `src/components/SchemaMarkup.tsx` (lines 25-84), `src/seo/schemas.ts`
- Impact: Business info (address, hours, geo coords) maintained in two places with drift risk. Geo coordinates already differ between the two files.
- Fix approach: Consolidate into a single source of truth for business schema data.

## Known Bugs

**ServicePageTemplate Hardcodes Wrong Title:**
- Symptoms: Every page using `ServicePageTemplate` gets the same generic title regardless of the service being displayed.
- Files: `src/components/ServicePageTemplate.tsx` (line 71)
- Trigger: Visit any page using ServicePageTemplate (e.g., `/services/roof-repair`).
- Workaround: None. The `serviceName` prop is available but not used in the SEO title.

**ServicePageTemplate "Our Recent Work" Section Shows Placeholders:**
- Symptoms: Three placeholder boxes with camera emoji and "Photo coming soon" text appear on every ServicePageTemplate page.
- Files: `src/components/ServicePageTemplate.tsx` (lines 186-212)
- Trigger: Visit any page using ServicePageTemplate.
- Workaround: None. The TODO on line 192 marks this as incomplete.

**Google Sheets Fallback Uses Fragile Parsing:**
- Symptoms: If Supabase is unreachable, the review data hook falls back to fetching from a Google Spreadsheet using a fragile `text.slice(47, -2)` parse of the Google Visualization API response.
- Files: `src/hooks/useReviewData.ts` (lines 53-56)
- Trigger: Supabase returns error or is unreachable.
- Workaround: Falls back to hardcoded defaults (`DEFAULT_REVIEW_COUNT = 92`) if Google Sheets also fails. But the hardcoded 92 will become stale over time.

## Security Considerations

**XSS Risk via dangerouslySetInnerHTML:**
- Risk: Blog post content loaded from Supabase is rendered directly via `dangerouslySetInnerHTML` without sanitization.
- Files: `src/pages/BlogPost.tsx` (line 154)
- Current mitigation: Content comes from Supabase which is admin-controlled. No user-generated content path exists currently.
- Recommendations: Add DOMPurify sanitization before rendering. If a blog CMS or content pipeline is compromised, arbitrary scripts could execute on the site.

**Form Submission to External Webhook:**
- Risk: Lead form data (name, phone, email, address) is sent to an external n8n webhook (`https://n8n.whitflow.com/webhook/dte-form-submissions`) with no CSRF protection or rate limiting on the client side.
- Files: `src/hooks/useMultiStepForm.ts` (line 17, lines 96-112)
- Current mitigation: 10-second timeout via AbortController.
- Recommendations: Add client-side rate limiting or honeypot field to prevent spam submissions. Ensure the n8n webhook has server-side validation.

**No Content Security Policy:**
- Risk: The site loads third-party scripts (Roofle widget from `app.roofle.com`) and uses inline styles without a CSP header.
- Files: `index.html` (line 36)
- Current mitigation: None.
- Recommendations: Add CSP headers via Vercel configuration to restrict script sources.

## Performance Bottlenecks

**Multiple useReviewData Calls Per Page Load:**
- Problem: Many pages call `useReviewData()` which triggers a Supabase query. `Home.tsx` uses it, `Footer.tsx` uses it (rendered on every page), `SchemaMarkup.tsx` uses it, and location/service pages use it. Each instance makes its own network request.
- Files: `src/hooks/useReviewData.ts`, `src/components/Footer.tsx`, `src/components/SchemaMarkup.tsx`, `src/pages/Home.tsx`, all 13 location pages, `src/components/ServicePageTemplate.tsx`, `src/components/SidebarTrustBadges.tsx`
- Cause: No caching, memoization, or React Context. Each `useReviewData()` call is an independent `useEffect` with its own fetch cycle.
- Improvement path: Create a `ReviewDataProvider` context that fetches once and shares data to all consumers. Alternatively, use React Query or SWR with caching.

**SPA Without SSR/SSG -- Poor SEO Crawlability:**
- Problem: This is a client-side rendered React SPA. All SEO metadata (title, description, canonical, schema markup) is set via `useEffect` DOM manipulation after JavaScript execution. Search engine crawlers that do not fully execute JS will see only the static `index.html` content.
- Files: `src/components/SEO.tsx` (uses `useEffect` to set meta tags), `src/components/SchemaMarkup.tsx` (uses `useEffect` to inject JSON-LD), `index.html` (has only generic meta tags)
- Cause: Vite SPA architecture without pre-rendering or SSR.
- Improvement path: Add `vite-plugin-ssr` or migrate to a framework with SSG (Next.js, Astro). At minimum, add a pre-rendering step for static pages using `vite-ssg` or similar. Blog posts loaded from Supabase are especially impacted since their content is entirely JS-dependent.

**Large Bundle -- No Code Splitting:**
- Problem: All 30+ page components are imported eagerly in `src/App.tsx`. Every route's code is loaded on initial page load regardless of which page the user visits.
- Files: `src/App.tsx` (lines 1-41 -- all static imports)
- Cause: No `React.lazy()` or dynamic imports used.
- Improvement path: Convert route imports to `React.lazy()` with `<Suspense>` fallbacks. Location and service pages are ideal candidates since users visit only one at a time.

## Fragile Areas

**SEO Component (DOM Manipulation):**
- Files: `src/components/SEO.tsx`
- Why fragile: Manipulates the DOM directly with `document.querySelector` and `document.createElement` inside `useEffect`. Does not clean up on unmount -- meta tags accumulate as users navigate. If a page does not set `canonical`, the previous page's canonical remains active.
- Safe modification: Always test navigation between pages to verify meta tags update correctly. Consider a cleanup function in the useEffect return.
- Test coverage: No tests exist.

**Review Data Fallback Chain:**
- Files: `src/hooks/useReviewData.ts`
- Why fragile: Three-tier fallback (Supabase -> Google Sheets -> hardcoded 92) with the Google Sheets layer using a magic offset (`slice(47, -2)`) that could break if Google changes their Visualization API response format.
- Safe modification: Test with Supabase unavailable to verify fallback still works. Update `DEFAULT_REVIEW_COUNT` periodically.
- Test coverage: No tests exist.

**App.tsx Route Registration:**
- Files: `src/App.tsx`
- Why fragile: Every new page requires adding an import and a `<Route>` element manually. No dynamic route generation. Easy to add a page file without registering the route, or vice versa.
- Safe modification: Always verify both the import and route are added together.
- Test coverage: No tests exist.

## Scaling Limits

**Location Page Scaling:**
- Current capacity: 13 location pages, each hand-coded at ~490 lines.
- Limit: Adding a new location requires copying ~490 lines, modifying city-specific content, adding an import and route in `App.tsx`. Error-prone and slow.
- Scaling path: Template-based approach with location data configs. Could potentially generate pages from a data source.

**Service Page Scaling:**
- Current capacity: 12 service pages, mixed architecture.
- Limit: Same manual process. Some use template, some do not.
- Scaling path: Standardize on `ServicePageTemplate` for all services.

## Dependencies at Risk

**Roofle Widget (Third-Party Dependency):**
- Risk: The instant quote feature depends entirely on an externally loaded `app.roofle.com` script and an embedded iframe (`/roofle-embed.html`). Past commits show multiple fixes for Roofle loading reliability on Vercel.
- Impact: If Roofle service goes down or changes their API, the instant quote page becomes non-functional.
- Migration plan: No alternative. This is a business-critical third-party integration. Monitor uptime.

**Google Sheets as Data Fallback:**
- Risk: Review data fallback uses a public Google Sheets URL with the Visualization API. Google could deprecate this endpoint or rate-limit it.
- Impact: If both Supabase and Google Sheets fail, reviews show stale hardcoded count of 92.
- Migration plan: Ensure Supabase is reliable enough to be the sole source. Remove Google Sheets fallback once Supabase is proven stable.

## Missing Critical Features

**No 404 / Catch-All Route:**
- Problem: There is no `*` catch-all route in `src/App.tsx`. Visiting any undefined URL renders a blank page (Navigation + Footer with empty main content).
- Blocks: Users who follow broken links or mistype URLs see no helpful guidance. Search engines may index these blank pages.

**No Sitemap Generation:**
- Problem: No `sitemap.xml` is generated or served. With 30+ pages including location and service landing pages, a sitemap is critical for SEO.
- Blocks: Search engines may not discover all pages, especially deeper location and service pages.

**No robots.txt:**
- Problem: No `robots.txt` file exists in the `public/` directory.
- Blocks: Search engines have no crawl directives.

## Test Coverage Gaps

**No Tests Exist:**
- What's not tested: The entire application. Zero test files found. No test framework configured (no jest, vitest, or playwright in dependencies).
- Files: All files in `src/`
- Risk: Any refactoring (especially the recommended template consolidation) has no safety net. Form validation logic, review data fetching, SEO component behavior, and routing are all untested.
- Priority: High. At minimum, add tests for `src/utils/formValidation.ts`, `src/hooks/useMultiStepForm.ts`, and `src/hooks/useReviewData.ts` before any major refactoring.

---

*Concerns audit: 2026-03-07*
