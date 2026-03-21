# Codebase Structure

**Analysis Date:** 2026-03-21

## Directory Layout

```
dte-roofing-web/
├── src/                          # Application source code
│   ├── components/               # Reusable and page-level UI components
│   │   ├── lead-form/            # Multi-step lead form system
│   │   │   ├── steps/            # Form step components (Service, Address, Contact, Result)
│   │   │   ├── MultiStepLeadForm.tsx
│   │   │   ├── FormField.tsx
│   │   │   ├── FormProgressBar.tsx
│   │   │   ├── ServiceOptionCard.tsx
│   │   │   └── UrgencyPill.tsx
│   │   ├── seo/                  # SEO-specific components
│   │   │   └── SeoSchema.tsx     # Schema building helpers
│   │   ├── Navigation.tsx        # Header with dropdown menus
│   │   ├── Footer.tsx            # Footer with company info
│   │   ├── SEO.tsx               # Meta tag injection component
│   │   ├── SchemaMarkup.tsx      # JSON-LD schema generator
│   │   ├── ServicePageTemplate.tsx  # Template for 12+ service pages
│   │   ├── ServiceLeadForm.tsx   # Embedded lead form wrapper
│   │   ├── MobileStickyCall.tsx  # Mobile floating call button
│   │   ├── RoofQuoteButton.tsx   # Roofle widget trigger button
│   │   ├── ScrollToTop.tsx       # Scroll-to-top on route change
│   │   ├── WorkCarousel.tsx      # Project image carousel (embla)
│   │   └── SidebarTrustBadges.tsx # Reviews/certifications sidebar
│   ├── pages/                    # Route-specific page components
│   │   ├── services/             # 12 service pages (config-based)
│   │   │   ├── RoofRepair.tsx
│   │   │   ├── RoofInstallation.tsx
│   │   │   ├── RoofReplacement.tsx
│   │   │   ├── RoofInspection.tsx
│   │   │   ├── GutterServices.tsx
│   │   │   ├── Gutters.tsx
│   │   │   ├── EmergencyServices.tsx
│   │   │   ├── StormDamage.tsx
│   │   │   ├── RoofMaintenance.tsx
│   │   │   ├── PreventativeMaintenance.tsx
│   │   │   ├── Siding.tsx
│   │   │   └── CommercialRoofing.tsx
│   │   ├── locations/            # 13 location pages (config-based)
│   │   │   ├── Columbus.tsx
│   │   │   ├── Hilliard.tsx
│   │   │   ├── Dublin.tsx
│   │   │   ├── NewAlbany.tsx
│   │   │   ├── UpperArlington.tsx
│   │   │   ├── Westerville.tsx
│   │   │   ├── Gahanna.tsx
│   │   │   ├── Reynoldsburg.tsx
│   │   │   ├── GroveCity.tsx
│   │   │   ├── Pickerington.tsx
│   │   │   ├── Worthington.tsx
│   │   │   ├── Delaware.tsx
│   │   │   └── Powell.tsx
│   │   ├── Home.tsx              # Landing page
│   │   ├── About.tsx             # About page
│   │   ├── Services.tsx          # Services overview page
│   │   ├── Gallery.tsx           # Project gallery
│   │   ├── Reviews.tsx           # Reviews page
│   │   ├── Blog.tsx              # Blog listing
│   │   ├── BlogPost.tsx          # Individual blog post
│   │   ├── FAQ.tsx               # FAQ page
│   │   ├── Contact.tsx           # Contact/lead form page
│   │   ├── Locations.tsx         # Locations overview
│   │   ├── InstantQuote.tsx      # Dedicated quote form page
│   │   └── Financing.tsx         # Financing information page
│   ├── hooks/                    # Custom React hooks
│   │   ├── useMultiStepForm.ts   # Form state, validation, submission
│   │   ├── useReviewData.ts      # Fetch reviews from Supabase/Sheets
│   │   └── useLeadTracking.ts    # UTM/session/device tracking
│   ├── lib/                      # Third-party client initialization
│   │   └── supabase.ts           # Supabase client, BlogPost type
│   ├── utils/                    # Utility functions
│   │   ├── formValidation.ts     # Email, phone, required validators
│   │   └── formatPhone.ts        # Phone number formatting
│   ├── data/                     # Static data and constants
│   │   └── projects.ts           # Project carousel data
│   ├── seo/                      # SEO configuration and schemas
│   │   ├── constants.ts          # CANONICAL_DOMAIN constant
│   │   └── schemas.ts            # JSON-LD schema builders
│   ├── App.tsx                   # Router setup, 40+ route definitions
│   ├── main.tsx                  # React app initialization
│   └── index.css                 # Tailwind and custom styles
├── public/                       # Static assets
│   └── images/                   # Project photos, hero, logo
├── index.html                    # HTML entry point (Roofle widget script)
├── vite.config.ts                # Vite build configuration
├── tailwind.config.js            # Tailwind CSS config (primary, charcoal colors)
├── eslint.config.js              # ESLint rules
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies (React, Router, Tailwind, Supabase)
├── package-lock.json             # Locked versions
└── vercel.json                   # Vercel deployment config (redirects, rewrites)
```

## Directory Purposes

**src/components/**
- Purpose: Reusable UI components and page-level component composition
- Contains: React components for layout, forms, SEO, carousels
- Key files:
  - `lead-form/` - Multi-step form system with 4 steps and validation
  - `ServicePageTemplate.tsx` - Template for 12 service pages
  - `SEO.tsx`, `SchemaMarkup.tsx` - SEO meta tag and schema injection
  - `Navigation.tsx`, `Footer.tsx` - Layout wrapper components

**src/pages/**
- Purpose: Route-specific page components mapped to URL paths
- Contains:
  - 12 service pages (`services/*.tsx`) - All use ServicePageTemplate
  - 13 location pages (`locations/*.tsx`) - Location-specific content
  - Top-level pages: Home, About, Services, Gallery, Reviews, Blog, FAQ, Contact, Financing
- Pattern: Service/location pages pass config to template; primary pages have custom layout

**src/pages/services/**
- Purpose: Service-specific page composition
- Contains: 12 pages (RoofRepair, RoofInstallation, Gutters, etc.)
- Pattern: Minimal code (30-150 lines each)
  - Import ServicePageTemplate
  - Define service config (name, slug, FAQs, process steps, content)
  - Pass config to template
  - Inject SchemaMarkup component with service type
- Why: Eliminates ~95% boilerplate; only config differs

**src/pages/locations/**
- Purpose: Location-specific page composition
- Contains: 13 pages (Columbus, Hilliard, Dublin, Westerville, etc.)
- Pattern: Same as services
  - Import location-specific layout components
  - Define location config
  - Inject SchemaMarkup with location type

**src/hooks/**
- Purpose: Complex state logic and API integration
- Key files:
  - `useMultiStepForm.ts` (150 lines) - Form state, step validation, webhook submission
  - `useReviewData.ts` (87 lines) - Supabase/Google Sheets fetch with fallback
  - `useLeadTracking.ts` (72 lines) - UTM params, device info, session tracking
- Pattern: Each hook returns object with related state and functions

**src/lib/**
- Purpose: Third-party client initialization and types
- Contains:
  - `supabase.ts` - Supabase client initialization, BlogPost interface
- Note: Supabase URL and anon key hardcoded (public credentials)

**src/utils/**
- Purpose: Reusable utility functions
- Contains:
  - `formValidation.ts` - Email regex, phone digit count, required field checks
  - `formatPhone.ts` - Phone number format transformation (XXX) XXX-XXXX
- Pattern: Pure functions, no state, no side effects

**src/data/**
- Purpose: Static data structures
- Contains:
  - `projects.ts` - Project interface (id, title, category, location, image) + array of ~25 projects
- Usage: WorkCarousel component consumes for image gallery

**src/seo/**
- Purpose: SEO constants and schema helpers
- Contains:
  - `constants.ts` - CANONICAL_DOMAIN = "https://www.dteroofingllc.com"
  - `schemas.ts` - Functions to build JSON-LD structures

**public/images/**
- Purpose: Static image assets
- Contains: Project photos (residential roof replacements, repairs), hero images, DTE logo
- All images committed to repo (no external CDN for local assets)

## Key File Locations

**Entry Points:**
- `src/main.tsx` - React app initialization, StrictMode wrapper
- `src/App.tsx` - Router definition, 40+ routes, Navigation/Footer layout
- `index.html` - HTML root, Roofle widget CDN script tag

**Configuration:**
- `vite.config.ts` - Vite build tool config, dev server settings
- `tailwind.config.js` - Tailwind CSS custom colors (primary-700, charcoal-900)
- `tsconfig.json` - TypeScript strict mode enabled
- `eslint.config.js` - ESLint rules (React hooks, TypeScript)
- `vercel.json` - Vercel deployment: redirects /home to /, SPA fallback

**Core Logic:**
- `src/hooks/useMultiStepForm.ts` - Form state machine, validation rules, webhook submit
- `src/hooks/useReviewData.ts` - Review data fetching with fallback chain
- `src/hooks/useLeadTracking.ts` - UTM/session/device tracking
- `src/components/ServicePageTemplate.tsx` - Template for 25+ pages

**Testing:**
- No test files found (0% test coverage currently)

**Styling:**
- `src/index.css` - Tailwind directives + custom styles
- Tailwind utility classes used throughout (no CSS modules)

## Naming Conventions

**Files:**
- Components: PascalCase, `.tsx` extension (e.g., `Navigation.tsx`, `FormField.tsx`)
- Pages: PascalCase, `.tsx` extension (e.g., `Home.tsx`, `RoofRepair.tsx`)
- Hooks: camelCase with `use` prefix, `.ts` extension (e.g., `useMultiStepForm.ts`)
- Utilities: camelCase, `.ts` extension (e.g., `formValidation.ts`, `formatPhone.ts`)
- Data: camelCase, `.ts` extension (e.g., `projects.ts`, `constants.ts`)

**Directories:**
- Multi-word directories: kebab-case (e.g., `lead-form/`, `seo/`, `pages/services/`)
- Single-word directories: lowercase (e.g., `components/`, `hooks/`, `utils/`, `data/`)

**Export Patterns:**
- Components: `export default function ComponentName() { }`
- Hooks: `export function useHookName() { }` or `export const useHookName = () => {}`
- Types/Interfaces: `export interface InterfaceName { }`
- Data: `export const arrayName: Type[] = [...]`
- Utilities: `export function functionName() { }`

## Where to Add New Code

**New Service Page (e.g., "Pool Repair"):**
1. Create file: `src/pages/services/PoolRepair.tsx`
2. Define content config (name, slug, FAQs, process steps)
3. Import ServicePageTemplate and SchemaMarkup
4. Render template with config + schema
5. Add route to `src/App.tsx`: `<Route path="/services/pool-repair" element={<PoolRepair />} />`
6. Add service option to form: Edit `src/components/lead-form/steps/StepService.tsx` SERVICES array
7. Add service slug mapping: Edit `src/components/lead-form/MultiStepLeadForm.tsx` serviceMap

**New Location Page (e.g., "Newark"):**
1. Create file: `src/pages/locations/Newark.tsx`
2. Copy structure from existing location (e.g., Columbus.tsx)
3. Update location name, address, description
4. Add route to `src/App.tsx`: `<Route path="/locations/newark" element={<Newark />} />`
5. Add location link to Locations page (`src/pages/Locations.tsx`)

**New Component (e.g., "TestimonialCard"):**
1. Create file: `src/components/TestimonialCard.tsx`
2. Define props interface: `interface TestimonialCardProps { }`
3. Export default function with Tailwind styling
4. Import and use in pages where needed

**New Hook (e.g., "useFaqData"):**
1. Create file: `src/hooks/useFaqData.ts`
2. Define return type interface
3. Export function that returns object with state + functions
4. Import and use in components

**New Utility Function (e.g., "calculateROI"):**
1. Add to existing file in `src/utils/` (e.g., `src/utils/calculations.ts`)
2. Or create new file: `src/utils/newUtility.ts`
3. Export as named function
4. Import where needed: `import { functionName } from '../utils/newUtility'`

**Styling Updates:**
1. Add Tailwind classes directly in component JSX
2. Custom styles in `src/index.css` (if Tailwind classes insufficient)
3. Use design tokens: `primary-700`, `primary-800`, `charcoal-600`, `charcoal-900`

## Special Directories

**src/components/lead-form/**
- Purpose: Self-contained form system with steps and validation
- Generated: No (hand-written)
- Committed: Yes
- Structure:
  - `MultiStepLeadForm.tsx` - Form orchestrator, renders steps
  - `steps/` - Individual step components (StepService, StepAddress, StepContact, StepResult)
  - Shared components: FormField, FormProgressBar, ServiceOptionCard, UrgencyPill

**public/images/**
- Purpose: Static image assets for hero, projects, logo
- Generated: No (user uploads)
- Committed: Yes (images checked into version control)
- Usage: Referenced in pages and components via `/images/filename`

**src/seo/**
- Purpose: SEO configuration isolated from component logic
- Generated: No
- Committed: Yes
- Modification pattern: Update constants and schema builders when SEO requirements change

---

*Structure analysis: 2026-03-21*
