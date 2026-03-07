# Codebase Structure

**Analysis Date:** 2026-03-07

## Directory Layout

```
dte-roofing-web/
├── .planning/              # Planning and analysis docs
│   └── codebase/           # Codebase analysis documents
├── dist/                   # Vite build output (generated)
├── public/                 # Static assets served as-is
│   ├── data/               # Static JSON data files
│   │   └── blog-posts.json # Legacy blog data (superseded by Supabase)
│   └── images/             # All site images (logos, photos, screenshots)
├── src/                    # Application source code
│   ├── components/         # Shared React components
│   │   ├── lead-form/      # Multi-step lead form system
│   │   │   ├── steps/      # Individual form step components
│   │   │   └── ...         # Form UI primitives
│   │   └── seo/            # SEO-specific components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # External service clients
│   ├── pages/              # Page components (one per route)
│   │   ├── locations/      # Geo-targeted location pages
│   │   └── services/       # Service-specific pages
│   ├── seo/                # SEO constants and schema definitions
│   └── utils/              # Pure utility functions
├── supabase/               # Supabase backend configuration
│   ├── functions/          # Edge functions (Deno runtime)
│   │   └── update-reviews/ # Review data CRUD endpoint
│   └── migrations/         # Database migration SQL files
├── index.html              # SPA entry point
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS theme (primary/charcoal colors)
├── vercel.json             # Vercel deploy config (rewrites, redirects)
├── tsconfig.json           # TypeScript base config
├── tsconfig.app.json       # TypeScript app config
├── tsconfig.node.json      # TypeScript node config
├── eslint.config.js        # ESLint configuration
└── postcss.config.js       # PostCSS config (Tailwind + Autoprefixer)
```

## Directory Purposes

**`src/components/`:**
- Purpose: Shared UI components used across multiple pages
- Contains: Layout (Navigation, Footer), SEO (SEO, SchemaMarkup, SeoSchema), UI (MobileStickyCall, RoofQuoteButton, SidebarTrustBadges), Templates (ServicePageTemplate, ServiceLeadForm), ScrollToTop
- Key files:
  - `ServicePageTemplate.tsx`: Template for all service pages (hero, content sections, sidebar form)
  - `SchemaMarkup.tsx`: JSON-LD structured data generator (handles home, service, FAQ, location, general types)
  - `SEO.tsx`: DOM-based meta tag manager (title, description, OG, canonical)
  - `Navigation.tsx`: Site header with desktop dropdown and mobile menu
  - `Footer.tsx`: Site footer with links, trust badges, contact info

**`src/components/lead-form/`:**
- Purpose: Multi-step lead capture form system
- Contains: Form orchestrator, step components, UI primitives
- Key files:
  - `MultiStepLeadForm.tsx`: Orchestrator — renders current step, manages progress bar
  - `steps/StepService.tsx`: Step 1 — service selection
  - `steps/StepAddress.tsx`: Step 2 — property address
  - `steps/StepContact.tsx`: Step 3 — name, phone, email, message
  - `steps/StepResult.tsx`: Step 4 — success/error result
  - `FormField.tsx`: Reusable form input wrapper
  - `FormProgressBar.tsx`: Visual step progress indicator
  - `ServiceOptionCard.tsx`: Clickable service selection card
  - `UrgencyPill.tsx`: Urgency level selector pill

**`src/hooks/`:**
- Purpose: Custom React hooks for data and form logic
- Key files:
  - `useReviewData.ts`: Fetches review statistics (Supabase -> Google Sheets -> defaults)
  - `useMultiStepForm.ts`: Form state machine (steps, validation, webhook submission)
  - `useLeadTracking.ts`: Captures UTM parameters, referrer, device info, session ID

**`src/lib/`:**
- Purpose: External service client initialization
- Key files:
  - `supabase.ts`: Supabase client + `BlogPost` interface definition

**`src/pages/`:**
- Purpose: Top-level page components, one per route
- Key files:
  - `Home.tsx`: Homepage with hero, services overview, trust signals
  - `About.tsx`: Company story page
  - `Services.tsx`: Services index page
  - `Contact.tsx`: Contact form page
  - `Blog.tsx`: Blog listing (fetches from Supabase)
  - `BlogPost.tsx`: Individual blog post (fetches by slug from Supabase)
  - `Reviews.tsx`: Customer reviews page
  - `Gallery.tsx`: Photo gallery
  - `FAQ.tsx`: Frequently asked questions
  - `Locations.tsx`: Service areas index
  - `InstantQuote.tsx`: Roofle instant quote widget page
  - `Financing.tsx`: Financing options page

**`src/pages/services/`:**
- Purpose: Individual service landing pages
- Pattern: Each file creates a thin wrapper passing content props to `ServicePageTemplate`
- Key files (12 total):
  - `RoofRepair.tsx`, `RoofReplacement.tsx`, `RoofInstallation.tsx`, `RoofInspection.tsx`
  - `RoofMaintenance.tsx`, `PreventativeMaintenance.tsx`
  - `StormDamage.tsx`, `EmergencyServices.tsx`
  - `GutterServices.tsx`, `Gutters.tsx`
  - `Siding.tsx`, `CommercialRoofing.tsx`

**`src/pages/locations/`:**
- Purpose: City-specific SEO landing pages
- Pattern: Each file is a fully custom page (NOT template-driven like services)
- Key files (13 total):
  - `Columbus.tsx`, `Hilliard.tsx`, `Dublin.tsx`, `NewAlbany.tsx`, `UpperArlington.tsx`
  - `Westerville.tsx`, `Gahanna.tsx`, `Reynoldsburg.tsx`, `GroveCity.tsx`
  - `Pickerington.tsx`, `Worthington.tsx`, `Delaware.tsx`, `Powell.tsx`

**`src/seo/`:**
- Purpose: SEO-related constants and schema definitions
- Key files:
  - `constants.ts`: `CANONICAL_DOMAIN` constant (`https://www.dteroofingllc.com`)
  - `schemas.ts`: `localBusinessSchema` object (Schema.org RoofingContractor)

**`src/utils/`:**
- Purpose: Pure utility functions with no React dependencies
- Key files:
  - `formValidation.ts`: `validateRequired`, `validateEmail`, `validatePhone`
  - `formatPhone.ts`: `formatPhoneNumber` — formats digits as `(XXX)-XXX-XXXX`

**`supabase/`:**
- Purpose: Backend database and serverless functions
- Key files:
  - `migrations/20260104060111_create_review_data_table.sql`: Creates `review_data` table with RLS policies
  - `functions/update-reviews/index.ts`: Deno edge function for review data CRUD

**`public/images/`:**
- Purpose: All site images
- Contains: Logo (`DTE-Roofing-Logo-two-Men.png`), hero image (`hero-roofing-professional.jpg`), Google Maps photos (`imgi_*`), job site photos (`PXL_*`), screenshots

## Key File Locations

**Entry Points:**
- `index.html`: HTML shell, Roofle widget script, meta tags
- `src/main.tsx`: React app bootstrap
- `src/App.tsx`: Router + route definitions + layout shell

**Configuration:**
- `vite.config.ts`: Vite build config (minimal — just React plugin)
- `tailwind.config.js`: Custom `primary` (red) and `charcoal` (dark gray) color palettes
- `vercel.json`: SPA fallback rewrite, `/home` -> `/` redirect
- `tsconfig.app.json`: TypeScript config for app code
- `eslint.config.js`: ESLint setup

**Core Logic:**
- `src/hooks/useMultiStepForm.ts`: Lead form state machine + webhook submission
- `src/hooks/useReviewData.ts`: Review data fetching with triple fallback
- `src/hooks/useLeadTracking.ts`: UTM + session tracking
- `src/components/ServicePageTemplate.tsx`: Reusable service page layout

**Data Layer:**
- `src/lib/supabase.ts`: Supabase client initialization + BlogPost type
- `supabase/functions/update-reviews/index.ts`: Review data API

## Naming Conventions

**Files:**
- Components: PascalCase (`ServicePageTemplate.tsx`, `MultiStepLeadForm.tsx`)
- Hooks: camelCase with `use` prefix (`useReviewData.ts`, `useMultiStepForm.ts`)
- Utilities: camelCase (`formValidation.ts`, `formatPhone.ts`)
- Pages: PascalCase matching route concept (`RoofRepair.tsx`, `Columbus.tsx`)

**Directories:**
- All lowercase, kebab-case for multi-word (`lead-form/`)
- Plural for collections (`pages/`, `hooks/`, `utils/`, `components/`)

**Components:**
- Default exports for all components and pages
- Named exports for hooks (`export function useReviewData`)
- Named exports for utilities (`export function validateEmail`)

**Routes:**
- Kebab-case URL paths (`/services/roof-repair`, `/locations/grove-city`)
- Match slug convention in `ServicePageTemplate` props

## Where to Add New Code

**New Service Page:**
1. Create `src/pages/services/NewService.tsx`
2. Import and use `ServicePageTemplate` with content props
3. Add `<SchemaMarkup type="service" />` for structured data
4. Add route in `src/App.tsx`: `<Route path="/services/new-service" element={<NewService />} />`
5. Optionally add to navigation dropdown in `src/components/Navigation.tsx`

**New Location Page:**
1. Create `src/pages/locations/CityName.tsx`
2. Use `<SEO />` and `<SchemaMarkup type="location" />` components
3. Add route in `src/App.tsx`: `<Route path="/locations/city-name" element={<CityName />} />`
4. Add to footer links in `src/components/Footer.tsx` if needed

**New Shared Component:**
- Place in `src/components/`
- Use PascalCase filename
- Default export the component

**New Hook:**
- Place in `src/hooks/`
- Prefix with `use` (e.g., `useNewHook.ts`)
- Use named export

**New Utility Function:**
- Place in `src/utils/`
- Use camelCase filename
- Use named exports

**New Supabase Migration:**
- Place in `supabase/migrations/` with timestamp prefix

**New Static Asset:**
- Images: `public/images/`
- Data files: `public/data/`

## Special Directories

**`dist/`:**
- Purpose: Vite production build output
- Generated: Yes (by `npm run build`)
- Committed: Should not be (check `.gitignore`)

**`.planning/`:**
- Purpose: Project planning and codebase analysis documents
- Generated: No (manually created)
- Committed: Yes

**`supabase/`:**
- Purpose: Supabase backend configuration
- Generated: No
- Committed: Yes (migrations and functions are source-controlled)

**`.bolt/`:**
- Purpose: Bolt.new AI tool configuration
- Generated: Yes
- Committed: Likely yes

---

*Structure analysis: 2026-03-07*
