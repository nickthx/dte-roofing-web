---
phase: 260407-lws-technical-seo-phase-a
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - vercel.json
  - scripts/generate-sitemap.ts
  - package.json
  - public/sitemap.xml
autonomous: true
requirements:
  - SEO-A-01-apex-301
  - SEO-A-02-security-headers
  - SEO-A-03-gutter-services-301
  - SEO-A-04-sitemap-regen

must_haves:
  truths:
    - "Apex dteroofingllc.com → www.dteroofingllc.com returns HTTP 301 (not 307)"
    - "All routes serve security headers: CSP, X-Frame-Options, Referrer-Policy, X-Content-Type-Options"
    - "/services/gutter-services returns 301 → /services/gutters at the edge"
    - "public/sitemap.xml lists all 12 services + 13 locations + top-level pages and excludes /services/gutter-services"
    - "Roofle widget, Supabase, Google Fonts, and Cloudflare analytics still load on the live site (CSP not blocking)"
    - "npm run build regenerates the sitemap before vite build"
  artifacts:
    - path: vercel.json
      provides: "Apex→www 301, security headers, gutter-services 301"
      contains: "redirects, headers"
    - path: scripts/generate-sitemap.ts
      provides: "Sitemap generator with git-based lastmod"
      exports: ["main routine writing public/sitemap.xml"]
    - path: public/sitemap.xml
      provides: "Regenerated sitemap with all canonical routes"
      contains: "urlset"
    - path: package.json
      provides: "Build script wired to run sitemap generator"
      contains: "generate-sitemap"
  key_links:
    - from: scripts/generate-sitemap.ts
      to: src/App.tsx
      via: "ROUTES manifest mirroring App.tsx routes"
      pattern: "ROUTES.*=.*\\["
    - from: package.json build
      to: scripts/generate-sitemap.ts
      via: "tsx prebuild step"
      pattern: "generate-sitemap"
---

<objective>
Ship Technical SEO Phase A quick wins from the 2026-04-07 audit:
1. Apex→www redirect upgraded to permanent (301)
2. Baseline security headers on all routes
3. Duplicate-URL fix: 301 /services/gutter-services → /services/gutters
4. Real, complete sitemap regenerated at build time with git-based lastmod

Purpose: Close low-risk technical SEO gaps without touching page content, NAP, URLs, or design.
Output: Updated vercel.json, new scripts/generate-sitemap.ts, updated package.json, regenerated public/sitemap.xml.
</objective>

<context>
@./CLAUDE.md
@memory/audits/technical-seo-checker/2026-04-07-dteroofingllc.md
@vercel.json
@package.json
@src/App.tsx
@public/sitemap.xml

<interfaces>
Current vercel.json (minimal):
```json
{
  "redirects": [
    { "source": "/home", "destination": "/", "permanent": true }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
NOTE: There is NO existing apex redirect in vercel.json — apex→www was likely handled at the Vercel domain level (was returning 307). We add an explicit 301 in vercel.json so the redirect is permanent and source-controlled.

Routes from src/App.tsx (canonical set for sitemap, excluding redirects/Navigates and dynamic /blog/:slug):
- /
- /about
- /services
- /services/roof-installation
- /services/roof-repair
- /services/roof-replacement
- /services/roof-inspection
- /services/gutters            ← canonical (gutter-services excluded)
- /services/emergency-services
- /services/storm-damage
- /services/roof-maintenance
- /services/preventative-maintenance
- /services/siding
- /services/commercial-roofing
- /gallery
- /reviews
- /blog
- /faq
- /financing
- /contact
- /locations
- /locations/columbus
- /locations/hilliard
- /locations/dublin
- /locations/new-albany
- /locations/upper-arlington
- /locations/westerville
- /locations/gahanna
- /locations/reynoldsburg
- /locations/grove-city
- /locations/pickerington
- /locations/worthington
- /locations/delaware
- /locations/powell
- /get-a-quote-consultation

Total: 35 URLs.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update vercel.json with apex 301, security headers, and gutter-services 301</name>
  <files>vercel.json</files>
  <action>
Rewrite vercel.json to add three things while preserving the existing /home → / redirect and SPA rewrite:

1. **Apex → www 301.** Add a redirect with `has` host condition matching `dteroofingllc.com` (no www), destination `https://www.dteroofingllc.com/:path*`, `permanent: true` (Vercel emits 308 for permanent; to force 301 use `statusCode: 301` explicitly). Use `statusCode: 301` form, NOT `permanent`, for apex redirect to guarantee 301 (the audit specifically called out 307 → must be 301).

2. **gutter-services → gutters 301.** Add redirect: `{ "source": "/services/gutter-services", "destination": "/services/gutters", "statusCode": 301 }`. Place BEFORE the SPA rewrite. Do NOT remove the React route from src/App.tsx — edge handles it.

3. **Security headers** for `source: "/(.*)"`:
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Content-Security-Policy-Report-Only` (use Report-Only to avoid breaking the live Roofle widget / Supabase / analytics on first deploy — audit can flip to enforcing later). Policy must allow:
     - `default-src 'self'`
     - `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.roofle.com https://static.cloudflareinsights.com`
     - `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`
     - `font-src 'self' https://fonts.gstatic.com data:`
     - `img-src 'self' data: https: blob:`
     - `connect-src 'self' https://ujasdbelviyamnwxjgth.supabase.co https://app.roofle.com https://cloudflareinsights.com https://*.cloudflareinsights.com`
     - `frame-src https://app.roofle.com`
     - `object-src 'none'`
     - `base-uri 'self'`
     - `form-action 'self'`

Final structure:
```json
{
  "redirects": [
    { "source": "/home", "destination": "/", "permanent": true },
    { "source": "/services/gutter-services", "destination": "/services/gutters", "statusCode": 301 },
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "dteroofingllc.com" }],
      "destination": "https://www.dteroofingllc.com/:path*",
      "statusCode": 301
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Content-Security-Policy-Report-Only", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.roofle.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://ujasdbelviyamnwxjgth.supabase.co https://app.roofle.com https://cloudflareinsights.com https://*.cloudflareinsights.com; frame-src https://app.roofle.com; object-src 'none'; base-uri 'self'; form-action 'self'" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Validate JSON parses (`node -e "JSON.parse(require('fs').readFileSync('vercel.json','utf8'))"`).
  </action>
  <verify>
    <automated>node -e "const c=JSON.parse(require('fs').readFileSync('vercel.json','utf8'));if(!c.headers||!c.redirects.find(r=>r.source==='/services/gutter-services')||!c.redirects.find(r=>r.has))throw new Error('vercel.json missing required entries');console.log('ok')"</automated>
  </verify>
  <done>
vercel.json parses as valid JSON; contains apex 301 redirect with statusCode 301 + host has-condition; contains gutter-services 301 redirect; contains headers block with all four security headers; original /home redirect and SPA rewrite preserved.
  </done>
</task>

<task type="auto">
  <name>Task 2: Create sitemap generator and wire into build</name>
  <files>scripts/generate-sitemap.ts, package.json, public/sitemap.xml</files>
  <action>
Create `scripts/generate-sitemap.ts` (TypeScript, 2-space indent, ESM — project is `"type": "module"`):

1. Define a `ROUTES` array — a parallel manifest mirroring src/App.tsx (parsing JSX is fragile per scope guidance). Each entry: `{ path, sourceFile, changefreq, priority }`. Use the 35 URLs listed in the <interfaces> block above. Map source files:
   - `/` → `src/pages/Home.tsx`
   - `/about` → `src/pages/About.tsx`
   - `/services` → `src/pages/Services.tsx`
   - `/services/<slug>` → `src/pages/services/<Component>.tsx` (match the imports in App.tsx)
   - `/locations` → `src/pages/Locations.tsx`
   - `/locations/<slug>` → `src/pages/locations/<Component>.tsx`
   - `/gallery` → `src/pages/Gallery.tsx`, `/reviews` → `Reviews.tsx`, `/blog` → `Blog.tsx`, `/faq` → `FAQ.tsx`, `/financing` → `Financing.tsx`, `/contact` → `Contact.tsx`, `/get-a-quote-consultation` → `InstantQuote.tsx`

2. Priorities/changefreq (mirror current sitemap.xml conventions):
   - `/` → 1.0 weekly
   - `/services`, `/contact` → 0.9 monthly
   - `/about`, `/reviews` → 0.8 (reviews weekly, about monthly)
   - service pages → 0.8 monthly (commercial-roofing, gutters, siding, preventative-maintenance → 0.7)
   - `/locations` hub → 0.8 monthly
   - location pages → 0.7 monthly
   - `/blog` → 0.6 weekly, `/faq` → 0.7 monthly, `/gallery` → 0.6 monthly, `/financing` → 0.7 monthly, `/get-a-quote-consultation` → 0.8 monthly

3. lastmod via git: `execSync(\`git log -1 --format=%cI -- "${sourceFile}"\`, { encoding: 'utf8' }).trim()`. If empty (untracked) or git fails, fall back to today's date in `YYYY-MM-DD` format. Slice to date-only (`.slice(0,10)`) for compactness, matching existing sitemap style.

4. Generate XML with `<?xml version="1.0" encoding="UTF-8"?>` + `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`. Each `<url>` block on multiple lines, 2-space indent, matching the existing public/sitemap.xml format. Base URL constant: `const BASE = 'https://www.dteroofingllc.com';`.

5. Write to `public/sitemap.xml` via `fs.writeFileSync`. Log `Generated sitemap with N urls`.

6. **Avoid the tsx devDep.** Instead of adding `tsx`, write the file so it can be run directly with Node by giving it a `.ts` extension and running through a tiny wrapper — OR simpler: name the file `scripts/generate-sitemap.mjs` (plain ESM JavaScript, no TS compilation needed) since it has no type dependencies on the app. **Decision: use `scripts/generate-sitemap.mjs`** (plain Node ESM, no new deps). Update `files_modified` mentally: the actual file written is `scripts/generate-sitemap.mjs`, NOT `.ts`. Use JSDoc `@type` comments if type hints are desired.

7. Update `package.json` scripts:
   - Add: `"generate-sitemap": "node scripts/generate-sitemap.mjs"`
   - Change: `"build": "npm run generate-sitemap && vite build"`
   - Preserve all other scripts and dependencies untouched.

8. Run `npm run generate-sitemap` to produce the new `public/sitemap.xml`. Verify it contains 35 `<url>` blocks and does NOT contain `gutter-services`.
  </action>
  <verify>
    <automated>npm run generate-sitemap && node -e "const x=require('fs').readFileSync('public/sitemap.xml','utf8');const n=(x.match(/<url>/g)||[]).length;if(n!==35)throw new Error('expected 35 urls, got '+n);if(x.includes('gutter-services'))throw new Error('sitemap still contains gutter-services');if(!x.includes('/locations/powell'))throw new Error('missing powell');console.log('sitemap ok:',n,'urls')" && npm run build</automated>
  </verify>
  <done>
`scripts/generate-sitemap.mjs` exists and runs cleanly with `node`; `package.json` build script runs the generator before vite build; `public/sitemap.xml` contains exactly 35 URLs covering all 12 services (excluding gutter-services), all 13 locations, plus top-level pages; lastmod values come from `git log` per source file with today fallback; `npm run build` completes without errors.
  </done>
</task>

</tasks>

<verification>
- `cat vercel.json | node -e "JSON.parse(require('fs').readFileSync(0,'utf8'))"` parses
- `grep -c '<url>' public/sitemap.xml` returns 35
- `grep gutter-services public/sitemap.xml` returns nothing
- `npm run build` succeeds end-to-end
- After deploy: `curl -sI https://dteroofingllc.com/` shows `301` and `location: https://www.dteroofingllc.com/`
- After deploy: `curl -sI https://www.dteroofingllc.com/services/gutter-services` shows `301` → `/services/gutters`
- After deploy: `curl -sI https://www.dteroofingllc.com/` shows `x-frame-options: DENY`, `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, `content-security-policy-report-only: ...`
- Live site smoke test: home page loads, Roofle widget renders, reviews fetch from Supabase works (CSP is Report-Only so won't block; check browser console for CSP report violations to inform a future enforcing policy)
</verification>

<success_criteria>
1. vercel.json contains apex 301, gutter-services 301, and four security headers; parses as valid JSON
2. public/sitemap.xml regenerated with 35 URLs, no gutter-services entry, real git-based lastmod
3. `npm run build` produces a working dist with sitemap regenerated as a prebuild step
4. No content, NAP, URL, or design changes outside the gutter-services 301
5. No new runtime dependencies added (only a Node ESM script using built-in modules)
</success_criteria>

<output>
After completion, create `.planning/quick/260407-lws-technical-seo-phase-a-vercel-json-301-re/260407-lws-SUMMARY.md` documenting: files changed, sitemap URL count, deploy verification curl commands to run, and CSP Report-Only → enforcing migration note for follow-up.
</output>
