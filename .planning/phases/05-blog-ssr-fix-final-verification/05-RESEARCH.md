# Phase 5: /blog SSR Fix & Final Verification — Research

**Researched:** 2026-04-10
**Status:** Complete

## 1. Blog Page Root Cause Analysis

### Root Cause (confirmed in Phase 1 diagnosis, commit `5a169c9`)

The `/blog` page ships empty `<title>` and empty `<h1>` in prerendered HTML due to a **JSX rendering order bug** in `src/pages/Blog.tsx`.

**The bug (Blog.tsx lines 44-49):**

```tsx
if (loading) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin ..."></div>
    </div>
  );
}
// <SEO> and <h1> are below this point — never reached during prerender
```

**Why it fails during prerender:**
1. `useState(true)` initializes `loading` to `true`
2. `useEffect` (which fetches from Supabase) does NOT execute during SSR/prerender — `renderToString` is synchronous
3. `loading` stays `true` forever during prerender
4. The component early-returns the spinner JSX, which contains **no `<SEO>`** and **no `<h1>`**
5. `react-helmet-async` emits nothing for this route
6. The prerender script injects an empty helmet head into the template
7. The static `index.html` title (`"DTE Roofing - Columbus Roofing Experts | Trusted Local Roofer"`) and static description bleed through as the only metadata

**Current Blog.tsx title (line 55, never rendered during SSR):**
```
"BEST Roofer in Columbus – if you're looking for Honest Roofing Services near me..."
```
This is the 166-char duplicate string identified in Phase 1 — it also needs replacing with a proper blog-specific title.

### BlogPost.tsx (dynamic route `/blog/:slug`) — Same Bug + Layered Issue

`src/pages/BlogPost.tsx` has the identical early-return pattern at line 56. Additionally, even if the early return were removed, the title template `${post.title} | DTE Roofing Blog` would render as `" | DTE Roofing Blog"` because `post` is `null` during prerender (no Supabase data available). This is a **dynamic route** excluded from prerender (not in `PRERENDER_ROUTES`) and handled via Vercel SPA fallback (`vercel.json` rewrite: `/blog/:slug` -> `/index.html`), so it is lower priority but should still get a static fallback title for the SPA shell.

## 2. Prerender Pipeline Architecture

### Build Command (package.json `scripts.build`)

```
npm run generate-sitemap && vite build && vite build --ssr src/entry-server.tsx --outDir dist/server && node scripts/prerender.mjs
```

Four-step sequential pipeline:
1. **Sitemap generation** (`scripts/generate-sitemap.mjs`) — reads `src/routes.config.mjs`, generates `public/sitemap.xml` with git-derived `<lastmod>` dates
2. **Client build** (`vite build`) — standard Vite production build to `dist/`
3. **SSR build** (`vite build --ssr src/entry-server.tsx --outDir dist/server`) — builds the server entry point for prerendering
4. **Prerender** (`scripts/prerender.mjs`) — iterates `PRERENDER_ROUTES` (35 routes from `routes.config.mjs`), calls `render(route)` from the SSR bundle, injects HTML + helmet head tags into the `dist/index.html` template, writes `dist/<route>/index.html`

### SSR Entry Point (`src/entry-server.tsx`)

```tsx
export function render(url: string) {
  const helmetContext = {} as FilledContext;
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );
  return { html, helmet: helmetContext.helmet };
}
```

Key points:
- Uses `renderToString` — **synchronous**, no async data fetching support
- `StaticRouter` provides the route context
- `HelmetProvider` captures head tags via context
- `react-helmet-async` is bundled into SSR output via `vite.config.ts` `ssr.noExternal`

### Prerender Script (`scripts/prerender.mjs`)

- Reads 35 routes from `PRERENDER_ROUTES` (filters out dynamic `:slug` routes defensively)
- For each route: calls `render(route)`, extracts `helmet.title`, `helmet.meta`, `helmet.link`, `helmet.script`
- Strips the default `<title>` and `<meta name="description">` from the template HTML
- Injects helmet tags before `</head>` and SSR body into `<div id="root">`
- `/blog` IS in the prerender list (line 33 of `routes.config.mjs`)

### Why /blog Fails Specifically

The prerender pipeline has **no async data fetching capability**. `renderToString` is synchronous — `useEffect` callbacks never fire. For the 33 pages that render `<SEO>` unconditionally (without waiting for data), this works perfectly. For `/blog`, the `if (loading) return <Spinner/>` guard means `<SEO>` is never reached, so helmet captures nothing.

### Routes Config (`src/routes.config.mjs`)

- 35 routes total, all with `prerender: true`
- `/blog` is included (line 33)
- `/blog/:slug` is NOT included (dynamic route, handled by SPA fallback)
- This file is the SSOT for both sitemap generation and prerendering

## 3. SEO Component Patterns

### SEO Component (`src/components/SEO.tsx`)

Uses `react-helmet-async` `<Helmet>` to inject:
- `<title>`
- `<meta name="description">`
- `<meta name="keywords">` (optional)
- Open Graph tags (`og:title`, `og:description`, `og:type`, `og:image`)
- Twitter tags
- `<link rel="canonical">` (optional)

**No default props** — `title` and `description` are required. The component renders exactly what it receives.

### Pattern Used by Working Pages

All 33 non-blog prerendered pages follow this pattern:

```tsx
export default function SomePage() {
  return (
    <div>
      <SEO
        title="Unique Page Title | DTE Roofing"
        description="Unique 140-200 char description..."
        canonical="https://www.dteroofingllc.com/some-page"
      />
      <section>
        <h1>Page Heading</h1>
        ...
      </section>
    </div>
  );
}
```

The `<SEO>` component is rendered **unconditionally** as part of the initial return JSX — no loading guards above it. This is why it works during prerender.

### Fix Pattern for Blog.tsx

Move `<SEO>` and the hero section (which contains `<h1>`) above the loading conditional. The blog post listing area becomes the only conditional part:

```tsx
export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  // ... useEffect ...

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Roofing Tips & News | DTE Roofing Blog"
        description="Expert roofing advice for Central Ohio homeowners. Roof maintenance tips, winter prep guides, storm damage resources, and more from DTE Roofing."
        canonical="https://www.dteroofingllc.com/blog"
      />
      <section className="...hero...">
        <h1>Roofing Tips & Insights for Central Ohio Homeowners</h1>
      </section>
      {loading ? <Spinner /> : <PostsGrid />}
      {/* Popular Topics and CTA sections — always rendered */}
    </div>
  );
}
```

The `<h1>` is already hardcoded in the hero section (line 64) — it just needs to be moved above the loading guard along with `<SEO>`.

### BlogPost.tsx Fix Pattern

Since `/blog/:slug` is a dynamic route NOT in the prerender list, the fix is different:
- Move `<SEO>` above loading guard with a **static fallback title** (e.g., `"DTE Roofing Blog | Central Ohio Roofing Tips"`)
- When `post` loads client-side, the dynamic title replaces the static one via helmet
- This ensures the SPA shell has reasonable metadata even before JS hydrates

## 4. Existing Verification Infrastructure

### Verification Scripts

| Script | Purpose | Scope |
|--------|---------|-------|
| `scripts/verify-phase-02.sh` | Service pages metadata verification | 10 service pages |
| `scripts/verify-phase-03.sh` | Core pages metadata verification | 6 core pages |
| `scripts/verify-phase-04.sh` | Location pages H1/H2/description verification | 13 location pages |

All scripts follow the same pattern:
- Check prerendered `dist/*/index.html` files
- Assert helmet `data-rh="true"` tags present
- Assert expected H1/H2 content
- Assert no superlatives ("BEST Roofer", etc.)
- Assert description uniqueness

### What Phase 5 Needs (New Verification)

1. **Blog-specific verification**: Check `dist/blog/index.html` for non-empty `<title>` and `<h1>`
2. **Site-wide curl audit**: All 35 URLs checked for unique titles and unique descriptions
3. **MCP tool audits**: `on-page-seo-auditor` and `technical-seo-checker` re-runs (these are Claude Code skills, not scripts)
4. **Build verification**: `npm run build && npm run lint && npm run typecheck` (existing commands)

### Sitemap Structure

`public/sitemap.xml` — 35 URLs generated from `routes.config.mjs` with git-derived `<lastmod>` dates. All routes share `www.dteroofingllc.com` as base domain.

## 5. Deployment Pipeline

### Vercel Configuration (`vercel.json`)

- **Redirects**: 301s for deprecated routes (`/home`, `/team`, `/faqs`, `/careers`, `/book-a-consultation`, `/cart`, `/services/gutter-services`), plus apex-to-www redirect
- **Headers**: Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP-Report-Only)
- **Clean URLs**: enabled (`"cleanUrls": true`)
- **Trailing slash**: disabled
- **Rewrites**: `/blog/:slug` -> `/index.html` (SPA fallback for dynamic blog posts)

### Build & Deploy

- Build command: `npm run build` (the 4-step pipeline described above)
- Output: `dist/` directory with prerendered HTML files
- Deploy: Vercel auto-deploys from git push to main (or manual `vercel --prod`)
- No special Vercel build config beyond `vercel.json` — uses Vite's default build behavior

### Key Deployment Considerations

- After fixing Blog.tsx, the prerender step will now produce a `dist/blog/index.html` with populated `<title>` and `<h1>` — no pipeline changes needed
- The Vercel rewrite for `/blog/:slug` means individual blog post pages are always served as SPA (client-rendered) — this is expected and acceptable since blog post slugs are dynamic/Supabase-driven

## 6. Risk Assessment

### Low Risk

- **Blog.tsx restructure**: Moving `<SEO>` and hero above loading guard is a straightforward JSX reorder. The hero section content is already hardcoded (not data-dependent). No logic changes required.
- **Title/description string replacement**: Swapping the 166-char duplicate title for a proper blog title is a string literal change.
- **Build pipeline**: No changes needed to `scripts/prerender.mjs`, `src/entry-server.tsx`, or `src/routes.config.mjs`. The existing pipeline will produce correct output once Blog.tsx renders `<SEO>` unconditionally.

### Medium Risk

- **BlogPost.tsx fallback title**: The static fallback title for the SPA shell needs to be generic enough to not be misleading if a crawler somehow sees it, but specific enough to be useful. Since this route is NOT prerendered and is served via SPA fallback, this is cosmetic for the SPA shell only.
- **Verification completeness**: The site-wide audit (VERIFY-01) requires checking all 35 prerendered HTML files for unique titles and descriptions. If any earlier phase left a page with a duplicate, it will surface here. This is a feature (catch regressions), not a risk.

### Edge Cases

- **Supabase unavailability during client-side load**: After the fix, the hero + SEO + Popular Topics + CTA sections will always render. Only the blog post listing grid depends on Supabase. If Supabase is down, the user sees the hero, an empty posts area ("No blog posts yet. Check back soon!"), and the rest of the page. This is acceptable degradation.
- **`index.html` static description bleed-through**: The static `<meta name="description">` at `index.html:12` still exists. The prerender script strips it (line 37-38 of `prerender.mjs`), so it only affects non-prerendered routes (dynamic `/blog/:slug`). This is a minor concern — the BlogPost.tsx fix should add its own static fallback description to override it via helmet.

## 7. Recommended Approach

### Plan 05-01: Fix /blog SSR Root Cause

**Scope:** 2 files, ~30 minutes

1. **Edit `src/pages/Blog.tsx`**:
   - Replace the 166-char duplicate title with a proper blog title (e.g., `"Roofing Tips & News | DTE Roofing Blog"`)
   - Restructure JSX: move `<SEO>` component and the hero `<section>` (which contains `<h1>`) ABOVE the `if (loading)` early return
   - Keep the loading spinner for the posts grid area only (conditional rendering within the main return)
   - The Popular Topics section and CTA section should also render unconditionally (they are static content)
   - Effectively: remove the early return entirely, wrap only the `blogPosts.map(...)` block in a loading conditional

2. **Edit `src/pages/BlogPost.tsx`** (secondary, non-blocking for BLOG-01/BLOG-02):
   - Add a static fallback `<SEO>` above the loading guard with generic blog title/description
   - When `post` loads, the dynamic helmet tags override the fallback client-side
   - Add a generic `<h1>` fallback (e.g., "DTE Roofing Blog") for the loading/not-found states

3. **Verify locally**:
   - Run `npm run build` — confirm `dist/blog/index.html` contains:
     - A `<title data-rh="true">` with the new blog title
     - A `<meta name="description" data-rh="true">` with the new blog description
     - An `<h1>` tag with "Roofing Tips & Insights for Central Ohio Homeowners"
   - Run `npm run lint && npm run typecheck`

### Plan 05-02: Deploy & Full Verification Suite

**Scope:** Verification only, ~45 minutes

1. **Build gate**: `npm run build && npm run lint && npm run typecheck` (VERIFY-04)
2. **Blog-specific verification**: Grep `dist/blog/index.html` for `<title>` and `<h1>` (BLOG-01, BLOG-02)
3. **Site-wide uniqueness audit** (VERIFY-01):
   - Script or loop through all 35 `dist/**/index.html` files
   - Extract `<title>` and `<meta name="description">` from each
   - Assert 35 unique titles, 35 unique descriptions
4. **MCP tool audits** (VERIFY-02, VERIFY-03):
   - Run `on-page-seo-auditor` skill on representative pages — assert title + description scores >= 8/10
   - Run `technical-seo-checker` skill — assert overall health >= 9/10
5. **Deploy to Vercel** (VERIFY-05):
   - Push to main or run `vercel --prod`
   - `claude-in-chrome` spot-checks on 3 pages: one service page, one location page, `/blog`
6. **Close out**: Update STATE.md, REQUIREMENTS.md traceability, mark BLOG-01, BLOG-02, VERIFY-01 through VERIFY-05 complete

### Dependencies

- **Phase 4 must be complete** (it is — confirmed in STATE.md)
- **Phases 2-3 titles/descriptions must already be landed** — the site-wide audit (VERIFY-01) will fail if any prior phase left duplicates
- **No new dependencies needed** — all tools (react-helmet-async, Vite SSR, prerender script) are already in place

---
*Phase: 05-blog-ssr-fix-final-verification*
*Research completed: 2026-04-10*
