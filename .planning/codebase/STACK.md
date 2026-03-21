# Technology Stack

**Analysis Date:** 2026-03-21

## Languages

**Primary:**
- TypeScript 5.5.3 - All application code, components, configuration
- JSX/TSX - React component markup in `src/components/` and `src/pages/`

**Secondary:**
- JavaScript - Configuration files (eslint.config.js, tailwind.config.js, postcss.config.js)
- HTML - Static markup in `index.html`
- CSS - Tailwind utility classes and custom styles in `src/index.css`

## Runtime

**Environment:**
- Node.js v24.11.0 (recommended, compatible with LTS versions)
- Browser-based React application (ESM module format)

**Package Manager:**
- npm 11.6.2
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- React 18.3.1 - UI library and component framework
- React Router DOM 7.9.4 - Client-side routing with 30+ routes for services, locations, and pages

**Styling:**
- Tailwind CSS 3.4.1 - Utility-first CSS framework with custom color extension (primary red, charcoal gray)

**Build/Dev:**
- Vite 5.4.2 - Build tool and dev server, configured in `vite.config.ts`
- Autoprefixer 10.4.18 - CSS vendor prefix plugin
- PostCSS 8.4.35 - CSS processing

**Testing:**
- Not detected

## Key Dependencies

**Critical:**
- @supabase/supabase-js 2.57.4 - PostgreSQL database client for dynamic content (blog posts, review data)
- react-router-dom 7.9.4 - Application routing layer

**UI & Interaction:**
- lucide-react 0.344.0 - Icon library (excluded from Vite optimization in vite.config.ts)
- embla-carousel-react 8.6.0 - Carousel/slider component library
- embla-carousel-autoplay 8.6.0 - Auto-play plugin for embla carousels

**Build & Linting:**
- @vitejs/plugin-react 4.3.1 - Vite React plugin with Fast Refresh
- ESLint 9.9.1 - Code linting
- @eslint/js 9.9.1 - ESLint JavaScript config
- typescript-eslint 8.3.0 - TypeScript ESLint rules
- eslint-plugin-react-hooks 5.1.0-rc.0 - React hooks linting rules
- eslint-plugin-react-refresh 0.4.11 - React Fast Refresh linting
- globals 15.9.0 - ESLint global variables
- @types/react 18.3.5 - TypeScript definitions for React
- @types/react-dom 18.3.0 - TypeScript definitions for React DOM

## Configuration

**Environment:**
- Supabase credentials hardcoded (not environment-based): `src/lib/supabase.ts`
  - URL: `https://ujasdbelviyamnwxjgth.supabase.co`
  - Anon Key: Embedded in source (public anon key for frontend)
- Webhook URLs hardcoded in source code:
  - `src/hooks/useMultiStepForm.ts`: n8n endpoint for form submissions
  - `src/pages/Financing.tsx`: n8n endpoint for financing submissions
- No .env file present; all configuration is static in source

**Build:**
- `vite.config.ts` - Vite configuration with React plugin and lucide-react optimization exclusion
- `tsconfig.json` - TypeScript root config with references to app and node configs
- `tsconfig.app.json` - App TypeScript config (ES2020 target, strict mode enabled)
- `tsconfig.node.json` - Node/build tools TypeScript config
- `tailwind.config.js` - Tailwind configuration with custom color themes
- `postcss.config.js` - PostCSS plugin configuration
- `eslint.config.js` - ESLint rules with React hooks and refresh plugins
- `vercel.json` - Deployment configuration with redirects and rewrites

## Platform Requirements

**Development:**
- Node.js 24.11.0 or compatible LTS version
- npm 11.6.2 or yarn
- TypeScript knowledge for changes to `src/`
- Vite development server included in dependencies

**Production:**
- Deployment target: Vercel (configured via `vercel.json`)
  - Uses rewrites to serve index.html for client-side routing
  - Redirects /home to /
- CDN for static assets (Vite handles bundling to `dist/`)
- Roofle widget loaded via CDN: `https://app.roofle.com/roof-quote-pro-widget.js` (async script tag in `index.html`)
- Google Fonts CDN preconnected in `index.html`

## Run Commands

```bash
npm run dev          # Start Vite development server
npm run build        # Build for production (outputs to dist/)
npm run lint         # Run ESLint on all files
npm run preview      # Preview production build locally
npm run typecheck    # Run TypeScript type checking (strict mode)
```

---

*Stack analysis: 2026-03-21*
