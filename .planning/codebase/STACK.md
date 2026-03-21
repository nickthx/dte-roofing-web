# Technology Stack

**Analysis Date:** 2026-03-21

## Languages

**Primary:**
- TypeScript 5.5.3 - All application code, configuration, and components (`src/` directory)

**Secondary:**
- JSX/TSX - React component markup in `src/components/` and `src/pages/`
- JavaScript - Configuration files (`eslint.config.js`, `tailwind.config.js`, `postcss.config.js`)
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
- React Router DOM 7.9.4 - Client-side routing with 40+ routes for services, locations, and pages (implemented in `src/App.tsx`)
- Tailwind CSS 3.4.1 - Utility-first CSS framework with custom color extensions (charcoal and primary red)

**Build/Dev:**
- Vite 5.4.2 - Build tool and dev server
- @vitejs/plugin-react 4.3.1 - React plugin for Vite

**Linting:**
- ESLint 9.9.1 - Code linting with TypeScript support
- typescript-eslint 8.3.0 - TypeScript linting rules
- eslint-plugin-react-hooks 5.1.0-rc.0 - React hooks linting rules
- eslint-plugin-react-refresh 0.4.11 - React fast refresh linting

**CSS Processing:**
- Tailwind CSS 3.4.1 - Utility-first CSS framework
- PostCSS 8.4.35 - CSS transformation tool
- autoprefixer 10.4.18 - Vendor prefix auto-insertion

**Type Checking:**
- TypeScript 5.5.3 - Static type checking

## Key Dependencies

**Critical:**
- @supabase/supabase-js 2.57.4 - PostgreSQL database client for dynamic content and review data (`src/lib/supabase.ts`)
- lucide-react 0.344.0 - Icon library (excluded from Vite optimization in `vite.config.ts`)

**UI Components:**
- embla-carousel-react 8.6.0 - Carousel/slider component library
- embla-carousel-autoplay 8.6.0 - Auto-play plugin for embla carousels

**State Management:**
- React Hooks only - useState, useRef, useEffect, useCallback (no Redux or Context API)

## Configuration

**Environment:**
- Supabase credentials hardcoded in `src/lib/supabase.ts` (URL: `https://ujasdbelviyamnwxjgth.supabase.co`)
- Webhook URLs hardcoded in source files (not env-based)
  - Form submissions: `https://n8n.whitflow.com/webhook/dte-form-submissions` (`src/hooks/useMultiStepForm.ts`)
  - Financing submissions: `https://n8n.whitflow.com/webhook/dte-financing-submissions` (`src/pages/Financing.tsx`)
- Roofle widget CDN loaded in `index.html` with ID: `zEGtbFpfjh6Snz6t4Tz23`

**Build:**
- Vite config: `vite.config.ts`
  - lucide-react excluded from optimization
  - React plugin enabled for JSX transformation
- TypeScript configs:
  - `tsconfig.json` - Root config with references to app and node configs
  - `tsconfig.app.json` - Application config with strict mode enabled
  - `tsconfig.node.json` - Config for build tools
- ESLint config: `eslint.config.js` with TypeScript, React hooks, and React refresh plugins
- Tailwind config: `tailwind.config.js` with custom color theme (charcoal and primary red)
- PostCSS config: `postcss.config.js` with Tailwind and autoprefixer

**Deployment:**
- Vercel config: `vercel.json`
  - Redirect `/home` to `/` (permanent)
  - Rewrite all paths to `index.html` for SPA routing

## Platform Requirements

**Development:**
- Node.js 24.11.0 or compatible LTS version
- npm 11.6.2 or yarn
- TypeScript knowledge for modifications to `src/` files
- Vite development server (included in dependencies)

**Production:**
- Deployment target: Vercel (via `vercel.json` configuration)
- CDN for static assets (Vite handles bundling to `dist/`)
- Roofle widget loaded via CDN: `https://app.roofle.com/roof-quote-pro-widget.js` (async script in `index.html`)
- Google Fonts CDN preconnected in `index.html`

## TypeScript Configuration

**Compiler Options:**
- Target: ES2020
- Module: ESNext
- Strict mode: enabled
- No unused locals/parameters: enforced
- No fallthrough cases in switch: enforced
- JSX: react-jsx (automatic runtime)

---

*Stack analysis: 2026-03-21*
