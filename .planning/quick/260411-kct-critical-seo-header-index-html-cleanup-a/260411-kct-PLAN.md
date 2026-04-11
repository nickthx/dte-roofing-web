---
phase: 260411-kct
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - vercel.json
  - index.html
autonomous: true
requirements:
  - SEC-HSTS-01
  - SEO-STATIC-HEAD-01
must_haves:
  truths:
    - "vercel.json sends Strict-Transport-Security on all responses with max-age=63072000; includeSubDomains; preload"
    - "Existing security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP-Report-Only) remain unchanged"
    - "All redirects, rewrites, cleanUrls, and trailingSlash settings in vercel.json remain untouched"
    - "index.html static head no longer hardcodes a homepage-specific <title>; brand-only fallback is used"
    - "index.html static head no longer hardcodes a homepage-specific <meta name=description>"
    - "index.html static head no longer contains <meta name=keywords>"
    - "index.html static head no longer contains static geo.region, geo.position, or ICBM tags"
    - "index.html static head still contains: charset, viewport, favicons, manifest, author, robots, og:type, og:locale, og:site_name, twitter:card, preconnects, Roofle widget, Cloudflare beacon, root div, and main.tsx script"
    - "React Helmet (via SEO.tsx) remains the single source of truth for per-route title/description/canonical/og:title/og:description/twitter:title/twitter:description/geo.placename on every route"
    - "npm run build completes without errors"
  artifacts:
    - path: "vercel.json"
      provides: "HSTS header alongside existing security headers"
      contains: "Strict-Transport-Security"
    - path: "index.html"
      provides: "Brand-neutral static head shell that defers per-route SEO to React Helmet"
      contains: "<title>DTE Roofing</title>"
  key_links:
    - from: "vercel.json"
      to: "all HTTP responses"
      via: "headers[].source = /(.*)"
      pattern: "Strict-Transport-Security.*max-age=63072000.*includeSubDomains.*preload"
    - from: "index.html"
      to: "src/components/SEO.tsx (react-helmet-async)"
      via: "client-side hydration replaces neutral fallback head with per-route tags"
      pattern: "<title>DTE Roofing</title>"
---

<objective>
Two atomic, independent edits identified by the 2026-04-11 technical SEO audit:

1. Add HSTS (Strict-Transport-Security) header to vercel.json so every response from www.dteroofingllc.com forces HTTPS for two years and is HSTS-preload eligible.
2. Strip homepage-specific values out of index.html's static <head> so React Helmet (SEO.tsx) is the single source of truth for per-route title, description, keywords, and geo tags. Today, non-JS crawlers (Bing, social scrapers, AI crawlers) see the homepage's title and description on every URL because index.html hardcodes them.

Purpose: Close two of the highest-priority Week 1 items from the audit. HSTS is a one-line security upgrade with zero functional risk. The index.html cleanup removes a long-standing crawler-leak bug that conflicts with the recent React Helmet migration (commits dfa9ca1, 1fdad49).

Output: Modified vercel.json and index.html, build verified.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@CLAUDE.md
@vercel.json
@index.html
@src/components/SEO.tsx

<interfaces>
<!-- SEO.tsx contract — already correct, DO NOT MODIFY in this plan. -->
<!-- This is included so the executor understands what React Helmet will inject -->
<!-- on top of the cleaned-up static head, and therefore what NOT to leave in index.html. -->

From src/components/SEO.tsx:
```typescript
interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  geoPlacename?: string;
}
```

Tags React Helmet renders per-route (these MUST be removed from index.html static head to avoid duplication / homepage-leak):
- <title>
- <meta name="description">
- <meta name="keywords"> (when provided)
- <meta property="og:title">
- <meta property="og:description">
- <meta property="og:type"> (Helmet re-asserts this; we keep the static one as a brand-level fallback for non-JS crawlers, which is safe because both values are "website")
- <meta property="og:image"> (when provided)
- <meta name="twitter:title">
- <meta name="twitter:description">
- <link rel="canonical">
- <meta name="geo.placename">

Tags index.html static head must KEEP (brand-level, route-agnostic, safe pre-hydration):
- charset, viewport
- favicons (icon, apple-touch-icon, manifest)
- author, robots
- og:type, og:locale, og:site_name (brand fallback only)
- twitter:card (brand fallback only)
- preconnects (fonts.googleapis.com, app.roofle.com)
- Roofle widget script
- Cloudflare beacon script
- root div + main.tsx module script
</interfaces>

Audit findings file: this plan's task_specifics in CONTEXT.md (passed by orchestrator).
Recent relevant commits:
- dfa9ca1 — feat: implement SEO component and migrate geo-tag management to React Helmet
- 1fdad49 — fix geo.placename static override in index.html and footer address formatting
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add Strict-Transport-Security header to vercel.json</name>
  <files>vercel.json</files>
  <action>
Open vercel.json. Locate the existing `headers` array entry whose `source` is `"/(.*)"` (currently lines 19-27). Inside that entry's `headers` array, add ONE new header object grouped logically with the other security headers (place it directly after Referrer-Policy and before Content-Security-Policy-Report-Only, so the order is X-Frame-Options → X-Content-Type-Options → Referrer-Policy → Strict-Transport-Security → Content-Security-Policy-Report-Only).

Exact object to insert:
```json
{ "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
```

Use the Edit tool with a precise old_string anchor that captures the Referrer-Policy line and the line that follows it (the CSP-Report-Only line) so the insertion is unambiguous. Preserve 2-space indentation, trailing commas, and the existing JSON formatting exactly.

CRITICAL — DO NOT MODIFY:
- The `redirects` array (apex→www, /home, /team, /faqs, /careers, /book-a-consultation, /cart, /services/gutter-services, /services/roof-maintenance) — leave byte-identical
- The `Content-Security-Policy-Report-Only` value — leave byte-identical
- Any other existing header value
- `cleanUrls`, `trailingSlash`, `rewrites` — leave byte-identical
- The `source: "/(.*)"` pattern itself

After editing, the file MUST still be valid JSON (no trailing comma after the new object since CSP follows it; the new object needs a trailing comma because CSP comes after it).

WHY a single Edit (not Write): This is a config file with redirects we must not touch. Edit tool with anchored old_string is the safest way to insert one line into a structured file.
  </action>
  <verify>
    <automated>node -e "const c = require('./vercel.json'); const sec = c.headers[0].headers.find(h => h.key === 'Strict-Transport-Security'); if (!sec) { console.error('HSTS missing'); process.exit(1); } if (sec.value !== 'max-age=63072000; includeSubDomains; preload') { console.error('HSTS value wrong:', sec.value); process.exit(1); } if (c.redirects.length !== 9) { console.error('redirects count changed:', c.redirects.length); process.exit(1); } if (!c.headers[0].headers.find(h => h.key === 'Content-Security-Policy-Report-Only')) { console.error('CSP missing'); process.exit(1); } if (!c.headers[0].headers.find(h => h.key === 'X-Frame-Options')) { console.error('XFO missing'); process.exit(1); } console.log('vercel.json OK');"</automated>
  </verify>
  <done>
    - vercel.json parses as valid JSON
    - headers[0].headers contains a Strict-Transport-Security entry with value `max-age=63072000; includeSubDomains; preload`
    - All four pre-existing headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Content-Security-Policy-Report-Only) are still present with unchanged values
    - redirects array still has 9 entries, byte-identical
    - cleanUrls, trailingSlash, rewrites unchanged
  </done>
</task>

<task type="auto">
  <name>Task 2: Strip homepage-leaked tags from index.html static head and verify build</name>
  <files>index.html</files>
  <action>
Open index.html (44 lines). Make exactly the following edits and NO others. Use the Edit tool with one Edit per logical change so the diff is reviewable.

Edit A — Replace the homepage-specific description (line 12) with a neutral brand description:
- old_string (line 12 in full):
  `    <meta name="description" content="DTE Roofing - Professional roofing services in Columbus, Hilliard, and Dublin, OH. Expert roof repair, replacement, installation, and emergency services. Licensed, bonded & insured. Free estimates." />`
- new_string:
  `    <meta name="description" content="DTE Roofing — Central Ohio roofing contractor." />`
- Rationale: Removing the line entirely would leave a brief window where non-JS crawlers see no description at all on any route. A neutral brand-level fallback is safer. React Helmet immediately overrides this on every route after hydration via SEO.tsx's `<meta name="description">`.

Edit B — Delete the keywords meta tag entirely (line 13):
- old_string (include the leading newline-indent so we delete the whole line cleanly):
  `    <meta name="keywords" content="roofing contractor, roof repair, roof replacement, Columbus roofing, Hilliard roofing, Dublin roofing, emergency roof repair, commercial roofing, residential roofing" />\n`
- new_string: empty string `` (deletes the line)
- Rationale: Google has ignored `meta keywords` since 2009. It only adds noise and competitor signal. SEO.tsx still supports an optional `keywords` prop for any route that wants it.

Edit C — Delete the three geo meta tags AND their `<!-- Geo Tags -->` comment (lines 25-28):
- old_string (capture the comment line + the 3 geo lines + trailing newline so the resulting blank-line spacing stays clean):
  ```
      <!-- Geo Tags -->
      <meta name="geo.region" content="US-OH" />
      <meta name="geo.position" content="39.9747532;-83.1253715" />
      <meta name="ICBM" content="39.9747532, -83.1253715" />

  ```
- new_string: empty string (delete all four lines including the trailing blank line; the next section "Preconnect to improve performance" then sits cleanly after the Twitter section)
- Rationale: Per commits dfa9ca1 and 1fdad49, geo.placename is now owned by React Helmet per-route. Static fallbacks here are stale (single hardcoded coordinate) and conflict with the dynamic per-location values.

Edit D — Replace the homepage-specific `<title>` (line 37) with a brand-only fallback:
- old_string:
  `    <title>DTE Roofing - Columbus Roofing Experts | Trusted Local Roofer</title>`
- new_string:
  `    <title>DTE Roofing</title>`
- Rationale: Brand-only fallback is shown to non-JS crawlers and during the pre-hydration paint. React Helmet immediately replaces it with the per-route title from SEO.tsx on every page. No more "Columbus Roofing Experts" leaking onto /locations/dublin or /services/gutters in crawler snapshots.

CRITICAL — DO NOT MODIFY any of these lines/elements:
- Line 1: <!doctype html>
- Line 2: <html lang="en">
- Line 4: <meta charset="UTF-8" />
- Lines 6-9: favicons block (icon, apple-touch-icon, manifest)
- Line 11: viewport meta
- Line 14: `<meta name="author" content="DTE Roofing" />`
- Line 15: `<meta name="robots" content="index, follow" />`
- Lines 17-20: Open Graph block (og:type, og:locale, og:site_name) — these are brand-level and safe; SEO.tsx overrides og:title/og:description per route
- Line 23: `<meta name="twitter:card" content="summary_large_image" />`
- Lines 31-32: preconnects (fonts.googleapis.com, app.roofle.com)
- Line 35: Roofle widget script
- Lines 39-40: body open, root div
- Line 41: main.tsx module script
- Line 42: Cloudflare beacon script
- All closing tags (</head>, </body>, </html>)

After all four edits, run `npm run build` and confirm it exits 0. Then read the freshly generated `dist/index.html` to confirm the static head looks right (Vite copies index.html through with hashed asset references injected). Spot-check that:
- `<title>DTE Roofing</title>` is present (not the long homepage title)
- No `meta name="keywords"` line exists
- No `meta name="geo.region"`, `geo.position`, or `ICBM` lines exist
- Description is the neutral brand description
- Roofle widget script and Cloudflare beacon are still present
- og:type, og:locale, og:site_name, twitter:card are still present
  </action>
  <verify>
    <automated>npm run build && node -e "const fs = require('fs'); const html = fs.readFileSync('dist/index.html', 'utf8'); const checks = [['has neutral title', /<title>DTE Roofing<\/title>/.test(html)], ['no homepage title', !/Columbus Roofing Experts/.test(html)], ['no keywords meta', !/name=\"keywords\"/.test(html)], ['no geo.region', !/name=\"geo\\.region\"/.test(html)], ['no geo.position', !/name=\"geo\\.position\"/.test(html)], ['no ICBM', !/name=\"ICBM\"/.test(html)], ['has neutral description', /Central Ohio roofing contractor/.test(html)], ['has og:type', /property=\"og:type\"/.test(html)], ['has og:locale', /property=\"og:locale\"/.test(html)], ['has og:site_name', /property=\"og:site_name\"/.test(html)], ['has twitter:card', /name=\"twitter:card\"/.test(html)], ['has author', /name=\"author\" content=\"DTE Roofing\"/.test(html)], ['has robots', /name=\"robots\" content=\"index, follow\"/.test(html)], ['has roofle widget', /roof-quote-pro-widget/.test(html)], ['has cloudflare beacon', /cloudflareinsights/.test(html)], ['has main.tsx', /src\\/main\\.tsx|assets\\/index-.*\\.js/.test(html)]]; let failed = 0; checks.forEach(([name, ok]) => { if (!ok) { console.error('FAIL:', name); failed++; } else { console.log('OK:', name); } }); process.exit(failed > 0 ? 1 : 0);"</automated>
  </verify>
  <done>
    - index.html line count reduced by 5 lines (1 keywords + 4 geo block lines = 5 deletions; description and title are replacements not deletions)
    - `<title>` reads exactly `DTE Roofing`
    - `<meta name="description">` reads exactly the neutral brand description
    - `<meta name="keywords">` is gone
    - `<meta name="geo.region">`, `<meta name="geo.position">`, `<meta name="ICBM">`, and the `<!-- Geo Tags -->` comment are all gone
    - All KEEP-list elements still present (charset, viewport, favicons, author, robots, og:type/locale/site_name, twitter:card, preconnects, Roofle, Cloudflare, root div, main.tsx)
    - `npm run build` exits 0
    - Generated `dist/index.html` passes all 16 automated checks above
  </done>
</task>

</tasks>

<verification>
After both tasks complete:

1. JSON validity: `node -e "JSON.parse(require('fs').readFileSync('vercel.json', 'utf8'))"` exits 0
2. HTML validity (loose): `npm run build` succeeds
3. Static head leak check: `dist/index.html` contains brand-only title and description, no keywords, no geo tags
4. Security header check: vercel.json has all 5 security headers (XFO, XCTO, Referrer-Policy, HSTS, CSP-Report-Only)
5. Untouched-region check: vercel.json `redirects` still has 9 entries; index.html still has Roofle widget and Cloudflare beacon
6. Run `git diff vercel.json index.html` and confirm the diff matches expectations: vercel.json shows only the HSTS line added; index.html shows 1 description swap, 1 keywords delete, 1 geo block delete, 1 title swap.

This is a routine config + HTML cleanup with no runtime code changes. SEO.tsx is NOT touched (it is already correct per commits dfa9ca1 and 1fdad49).
</verification>

<success_criteria>
- HSTS header present in vercel.json with value `max-age=63072000; includeSubDomains; preload`, deployable to Vercel without breaking redirects/CSP
- index.html static head is brand-neutral: no homepage title, no homepage description, no keywords, no static geo tags
- React Helmet (SEO.tsx) remains the single source of truth for per-route title/description/canonical/og/twitter/geo.placename
- `npm run build` succeeds
- Generated `dist/index.html` passes all 16 automated leak checks
- No unintended modifications to vercel.json redirects/rewrites/cleanUrls/trailingSlash
- No unintended modifications to index.html favicons, viewport, author, robots, og brand tags, twitter:card, preconnects, Roofle widget, Cloudflare beacon, body, or scripts
- No changes to SEO.tsx, src/, or any other file
</success_criteria>

<output>
After completion, create `.planning/quick/260411-kct-critical-seo-header-index-html-cleanup-a/260411-kct-SUMMARY.md` documenting:
- Final vercel.json header order (5 security headers)
- Final index.html static head (line-by-line)
- Build output confirmation
- Diff stats (lines added/removed per file)
- Confirmation that SEO.tsx and all other files were not touched
</output>
