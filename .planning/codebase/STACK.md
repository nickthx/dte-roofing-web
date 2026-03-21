# Technology Stack

**Analysis Date:** 2026-03-21

## Languages

**Primary:**
- TypeScript 5.5.3 - All application code, configuration, and components
- JSX/TSX - React component markup in `src/components/` and `src/pages/`

**Secondary:**
- JavaScript - Configuration files (vite.config.ts uses TS, but eslint.config.js, tailwind.config.js, postcss.config.js are JS)
- HTML - Static markup in `index.html`
- CSS - Tailwind utility classes and custom styles in `src/index.css`

## Runtime

**Environment:**
- Node.js v24.11.0 (recommended)
- Browser-based React application (ESM module format)

**Package Manager:**
- npm 11.6.2
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- React 18.3.1 - UI library and component framework
- React Router DOM 7.9.4 - Client-side routing, implemented in `src/App.tsx` with 30+ routes for services, locations, and pages

**Styling:**
- Tailwind CSS 3.4.1 - Utility-first CSS framework
  - Config: `tailwind.config.js` (extends with custom colors: primary red palette, charcoal palette)
  - PostCSS: 8.4.35 - Required processor for Tailwind
  - Autoprefixer: 10.4.18 - Auto-prefixes CSS for browser compatibility

**Build/Dev:**
- Vite 5.4.2 - Build tool and dev server
  - Config: `vite.config.ts` (React plugin enabled, lucide-react excluded from optimization)
  - React plugin: @vitejs/plugin-react 4.3.1
  - Dev command: `npm run dev`
  - Build command: `npm run build`
  - Preview command: `npm run preview`

**Testing:**
- Not detected

## Key Dependencies

**Critical:**
- @supabase/supabase-js 2.57.4 - Database client for Supabase PostgreSQL backend
  - Used in `src/lib/supabase.ts` for blog posts and review data queries
  - Implements read operations from `review_data` table (ratings, reviews)

**UI Components & Icons:**
- lucide-react 0.344.0 - Icon library (excluded from Vite optimization)
  - Used throughout components for CTAs, form icons, check marks, alerts

**Carousel:**
- embla-carousel-react 8.6.0 - Carousel/slider component library
- embla-carousel-autoplay 8.6.0 - Auto-play plugin for embla

**Form & Data:**
- Native React hooks (useState, useCallback, useEffect) for form state and validation
- Custom hooks: `useMultiStepForm`, `useLeadTracking`, `useReviewData` in `src/hooks/`

## Configuration

**Environment:**
- Client-side environment: Uses hardcoded Supabase credentials (not env-based currently)
  - Supabase URL: `https://ujasdbelviyamnwxjgth.supabase.co`
  - Supabase anon key: hardcoded in `src/lib/supabase.ts`
- Webhook URLs: Hardcoded n8n endpoints in `src/hooks/useMultiStepForm.ts` and `src/pages/Financing.tsx`
- Deployment config: `vercel.json` (redirects /home to /, rewrites all paths to index.html)

**Build:**
- TypeScript configs:
  - `tsconfig.json` - Root config with references to app and node configs
  - `tsconfig.app.json` - App compilation (target: ES2020, strict mode enabled, noUnusedLocals/noUnusedParameters enforced)
  - `tsconfig.node.json` - Build tool compilation
- Linting config: `eslint.config.js` (TypeScript ESLint with React hooks and refresh plugins)

## Platform Requirements

**Development:**
- Node.js 24.11.0 or compatible LTS version
- npm 11.6.2 or yarn
- TypeScript knowledge for `src/` changes
- Vite development server included in dependencies

**Production:**
- Deployment target: Vercel (via `vercel.json` configuration)
- CDN for static assets (Vite handles bundling to `dist/`)
- Roofle widget loaded via CDN: `https://app.roofle.com/roof-quote-pro-widget.js` (async script in index.html)
- Google Fonts CDN preconnected in `index.html`

---

*Stack analysis: 2026-03-21*
