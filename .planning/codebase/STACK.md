# Technology Stack

**Analysis Date:** 2026-03-07

## Languages

**Primary:**
- TypeScript ~5.5.3 - All application source code (`src/**/*.{ts,tsx}`)
- TSX - React components and pages

**Secondary:**
- SQL - Supabase database migrations (`supabase/migrations/`)
- HTML - Entry point (`index.html`) and embed pages (`public/roofle-embed.html`)
- CSS - Tailwind-based styles (`src/index.css`)

## Runtime

**Environment:**
- Node.js (no `.nvmrc` or `.node-version` present; version unspecified)
- Deno - Supabase Edge Functions runtime (`supabase/functions/`)

**Package Manager:**
- npm (implied by `package-lock.json` convention)
- Lockfile: Not verified in repo root

## Frameworks

**Core:**
- React 18.3.1 - UI framework, SPA architecture
- React Router DOM 7.9.4 - Client-side routing with `BrowserRouter`
- Vite 5.4.2 - Build tool and dev server

**Styling:**
- Tailwind CSS 3.4.1 - Utility-first CSS framework
- PostCSS 8.4.35 - CSS processing pipeline
- Autoprefixer 10.4.18 - Vendor prefix automation

**Testing:**
- None detected - No test framework, no test files, no test scripts

**Linting:**
- ESLint 9.9.1 - Flat config format (`eslint.config.js`)
- typescript-eslint 8.3.0 - TypeScript-specific linting
- eslint-plugin-react-hooks 5.1.0-rc.0 - React hooks rules
- eslint-plugin-react-refresh 0.4.11 - Fast refresh validation

## Key Dependencies

**Critical:**
- `@supabase/supabase-js` ^2.57.4 - Database client for blog posts and review data
- `react-router-dom` ^7.9.4 - All page routing and navigation
- `lucide-react` ^0.344.0 - Icon library used across all components

**Infrastructure:**
- `@vitejs/plugin-react` ^4.3.1 - Vite React plugin (JSX transform, HMR)

## Configuration

**TypeScript:**
- `tsconfig.json` - Project references setup, delegates to `tsconfig.app.json` and `tsconfig.node.json`
- `tsconfig.app.json` - Application config: ES2020 target, strict mode, bundler module resolution, `noUnusedLocals` and `noUnusedParameters` enabled
- Strict mode is ON

**Build:**
- `vite.config.ts` - Minimal config, React plugin, `lucide-react` excluded from optimizeDeps
- `tailwind.config.js` - Custom color palette (`primary` red scale, `charcoal` gray scale)
- `postcss.config.js` - Tailwind + Autoprefixer plugins
- `eslint.config.js` - Flat config, ignores `dist/`, recommended rules + react-hooks

**Deployment:**
- `vercel.json` - SPA fallback rewrite (`/(.*) -> /index.html`), redirect `/home -> /` (301)

**SEO/Static:**
- `robots.txt` - Allow all crawlers, sitemap reference
- `sitemap.xml` - Static sitemap in `public/`
- `public/google*.html` - Google Search Console verification files (2 files)

## Scripts

```bash
npm run dev          # Start Vite dev server
npm run build        # Production build (vite build)
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking (tsc --noEmit)
```

## Platform Requirements

**Development:**
- Node.js (version unspecified)
- npm

**Production:**
- Vercel (SPA hosting with rewrite rules)
- Supabase (PostgreSQL database + Edge Functions)

---

*Stack analysis: 2026-03-07*
