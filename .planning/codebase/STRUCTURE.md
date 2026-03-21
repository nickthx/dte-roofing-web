# Codebase Structure

**Analysis Date:** 2026-03-21

## Directory Layout

```
dte-roofing-web/
├── src/
│   ├── main.tsx                      # React app entry point
│   ├── App.tsx                       # Route definitions and layout wrapper
│   ├── index.css                     # Tailwind CSS imports and custom styles
│   │
│   ├── components/                   # Reusable UI components
│   │   ├── Navigation.tsx            # Header nav, mobile menu, logo
│   │   ├── Footer.tsx                # Footer with links, contact info
│   │   ├── SEO.tsx                   # Meta tag injection (description, OG, canonical)
│   │   ├── SchemaMarkup.tsx          # JSON-LD structured data wrapper
│   │   ├── ServicePageTemplate.tsx   # Reusable service/location page layout
│   │   ├── ServiceLeadForm.tsx       # Wrapper for MultiStepLeadForm with service config
│   │   ├── MobileStickyCall.tsx      # Sticky phone CTA for mobile
│   │   ├── ScrollToTop.tsx           # Auto-scroll to top on route change
│   │   ├── WorkCarousel.tsx          # embla-carousel project gallery
│   │   ├── SidebarTrustBadges.tsx    # "Trusted by" badges sidebar
│   │   ├── RoofQuoteButton.tsx       # Roofle widget trigger button
│   │   │
│   │   └── lead-form/                # Multi-step form components
│   │       ├── MultiStepLeadForm.tsx # Form orchestrator and step router
│   │       ├── FormProgressBar.tsx   # Progress indicator (step 1-3)
│   │       ├── FormField.tsx         # Text input wrapper with validation display
│   │       ├── ServiceOptionCard.tsx # Service selection card (grid layout)
│   │       ├── UrgencyPill.tsx       # Urgency button pills
│   │       │
│   │       └── steps/                # Individual form steps
│   │           ├── StepService.tsx   # Service + urgency selection
│   │           ├── StepAddress.tsx   # Property address input
│   │           ├── StepContact.tsx   # Name, phone, email, message
│   │           └── StepResult.tsx    # Success/error confirmation screen
│   │
│   ├── seo/                          # SEO configuration and schemas
│   │   └── schemas.ts                # Schema object definitions (FAQSchema, ServiceSchema, etc.)
│   │
│   ├── pages/                        # Page components mapped to routes
│   │   ├── Home.tsx                  # Hero, story, carousel, CTA
│   │   ├── About.tsx                 # Company story and values
│   │   ├── Services.tsx              # Services overview with links
│   │   ├── Gallery.tsx               # Project photo gallery
│   │   ├── Reviews.tsx               # Google reviews embed
│   │   ├── Blog.tsx                  # Blog post listing
│   │   ├── BlogPost.tsx              # Single blog post view (dynamic slug)
│   │   ├── FAQ.tsx                   # Accordion FAQ page
│   │   ├── Contact.tsx               # Contact form and info
│   │   ├── Financing.tsx             # Financing options and calculator
│   │   ├── InstantQuote.tsx          # Full-screen lead form entry point
│   │   ├── Locations.tsx             # Location links overview
│   │   │
│   │   ├── services/                 # Service detail pages (template-based)
│   │   │   ├── RoofRepair.tsx
│   │   │   ├── RoofReplacement.tsx
│   │   │   ├── RoofInstallation.tsx
│   │   │   ├── RoofInspection.tsx
│   │   │   ├── GutterServices.tsx
│   │   │   ├── Gutters.tsx
│   │   │   ├── EmergencyServices.tsx
│   │   │   ├── StormDamage.tsx
│   │   │   ├── RoofMaintenance.tsx
│   │   │   ├── PreventativeMaintenance.tsx
│   │   │   ├── Siding.tsx
│   │   │   └── CommercialRoofing.tsx
│   │   │
│   │   └── locations/                # Location-specific pages (template-based)
│   │       ├── Columbus.tsx
│   │       ├── Hilliard.tsx
│   │       ├── Dublin.tsx
│   │       ├── NewAlbany.tsx
│   │       ├── UpperArlington.tsx
│   │       ├── Westerville.tsx
│   │       ├── Gahanna.tsx
│   │       ├── Reynoldsburg.tsx
│   │       ├── GroveCity.tsx
│   │       ├── Pickerington.tsx
│   │       ├── Worthington.tsx
│   │       ├── Delaware.tsx
│   │       └── Powell.tsx
│   │
│   ├── hooks/                        # Custom React hooks for state/logic
│   │   ├── useMultiStepForm.ts       # Form state, validation, submission
│   │   ├── useReviewData.ts          # Fetch review count from Supabase/Google Sheets
│   │   └── useLeadTracking.ts        # Session and device tracking
│   │
│   ├── lib/                          # External library clients
│   │   └── supabase.ts               # Supabase client + BlogPost interface
│   │
│   ├── data/                         # Static data files
│   │   └── projects.ts               # Project carousel data array
│   │
│   └── utils/                        # Utility functions
│       ├── formValidation.ts         # validateRequired, validateEmail, validatePhone
│       └── formatPhone.ts            # Format phone number as (XXX)-XXX-XXXX
│
├── public/                           # Static assets
│   ├── images/                       # Project photos (referenced in projects.ts)
│   ├── dte_favicon.png              # Favicon
│   └── site.webmanifest             # PWA manifest
│
├── index.html                        # HTML entry point with Roofle widget script
├── vite.config.ts                   # Vite build configuration
├── tailwind.config.js               # Tailwind CSS configuration with custom colors
├── postcss.config.js                # PostCSS plugins (Tailwind processing)
├── eslint.config.js                 # ESLint rules for TypeScript and React
├── tsconfig.json                    # TypeScript compiler configuration
├── package.json                     # Dependencies and scripts
├── package-lock.json                # Dependency lock file
└── vercel.json                      # Vercel deployment config (rewrites, redirects)
```

## Directory Purposes

**src/:**
- Purpose: All application source code
- Contains: TypeScript/TSX components, hooks, pages, utilities, configuration, data

**src/components/:**
- Purpose: Reusable, isolated UI components
- Contains: Buttons, forms, layouts, headers, footers, carousels
- Key files: `ServicePageTemplate.tsx` (core layout abstraction), `MultiStepLeadForm.tsx` (form orchestrator), `SEO.tsx` (meta injection)

**src/components/lead-form/:**
- Purpose: Multi-step lead form related components
- Contains: Form wrapper, progress indicator, input fields, step components
- Key files: `MultiStepLeadForm.tsx` (container), `steps/` folder (individual steps)

**src/components/lead-form/steps/:**
- Purpose: Individual step components for form flow
- Contains: StepService (service selection), StepAddress (location), StepContact (contact info), StepResult (confirmation/error)

**src/components/seo/:**
- Purpose: SEO-related utilities and helpers
- Contains: Schema generation helpers, meta tag functions

**src/pages/:**
- Purpose: Route-specific page compositions
- Contains: Home, About, Services, Blog, Contact, and dynamic service/location pages
- Key files: `ServicePageTemplate.tsx` is consumed by service pages via config wrapper pattern

**src/pages/services/:**
- Purpose: Service detail pages (12 services)
- Contains: One page per service (RoofRepair, Gutters, etc.)
- Pattern: Each wraps `ServicePageTemplate` with service-specific config (name, slug, content, FAQs)

**src/pages/locations/:**
- Purpose: Location-specific service pages (13 locations)
- Contains: One page per location served (Columbus, Hilliard, Dublin, etc.)
- Pattern: Each location page shows service availability, local content, and embedded lead form

**src/hooks/:**
- Purpose: Custom React hooks for state management and logic
- Contains: Form state (useMultiStepForm), data fetching (useReviewData), tracking (useLeadTracking)
- Key exports: Objects with state variables and handler functions

**src/lib/:**
- Purpose: Third-party service clients and configuration
- Contains: Supabase client initialization, type definitions for database models
- Key files: `supabase.ts` initializes Supabase client with URL and API key

**src/data/:**
- Purpose: Static data files (not fetched at runtime)
- Contains: Project carousel images, project metadata
- Key files: `projects.ts` exports TypeScript array with Project interface

**src/utils/:**
- Purpose: Pure utility functions
- Contains: Form validation (email, phone, required), phone number formatting
- Key files: `formValidation.ts` (3 validators), `formatPhone.ts` (phone formatter)

**src/seo/:**
- Purpose: SEO constants and schema definitions
- Contains: Schema object templates for FAQs, services, locations, structured data markup
- Pattern: Schemas are imported and used inline in components, then stringified to JSON-LD

**public/:**
- Purpose: Static assets served as-is by Vite
- Contains: Images, favicon, PWA manifest, robots.txt (if present)
- Key folder: `images/` contains all project photos referenced in `src/data/projects.ts`

## Key File Locations

**Entry Points:**
- `src/main.tsx`: React DOM mount point; initializes React 18 with createRoot
- `src/App.tsx`: Route definitions (40+ routes); layout wrapper (Navigation/Footer); form default service mapping
- `index.html`: HTML shell; Roofle widget script async load; Favicon and preconnect tags

**Configuration:**
- `vite.config.ts`: Vite bundler config; lucide-react excluded from optimization
- `tailwind.config.js`: Color scheme (charcoal-900, primary-700), custom spacing, font families
- `tsconfig.json`: TypeScript settings; JSX preset; lib target
- `eslint.config.js`: TypeScript ESLint with React hooks and refresh plugins
- `vercel.json`: Deployment config; route rewrites for SPA; /home → / redirect

**Core Logic:**
- `src/hooks/useMultiStepForm.ts`: Form state machine; step validators; webhook submission
- `src/components/ServicePageTemplate.tsx`: Reusable service page layout; form sidebar; SEO setup
- `src/components/lead-form/MultiStepLeadForm.tsx`: Form orchestrator; step routing; service mapping

**Testing:**
- Not yet configured (no test files present)

**API Integration:**
- `src/lib/supabase.ts`: Supabase client configuration; BlogPost type definition
- Webhook URLs: Hardcoded in `src/hooks/useMultiStepForm.ts` (n8n endpoint) and `src/pages/Financing.tsx`

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `Navigation.tsx`, `FormField.tsx`)
- Pages: PascalCase (e.g., `Home.tsx`, `Services.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useMultiStepForm.ts`)
- Utilities: camelCase (e.g., `formatPhone.ts`, `formValidation.ts`)
- Data files: camelCase (e.g., `projects.ts`)

**Directories:**
- Multi-word: kebab-case (e.g., `lead-form/`, `seo/`, `pages/services/`)
- Single word: lowercase (e.g., `hooks/`, `lib/`, `data/`, `utils/`, `pages/`)

**Exports:**
- Default export for page/component files: `export default function ComponentName()`
- Named exports for hooks: `export function useHookName()` or `export const useHookName = () => {}`
- Named exports for utilities: `export function utilityName()` or `export const utilityName = () => {}`
- Type exports: `export interface InterfaceName {}` or `export type TypeName = ...`
- Constants: camelCase within files, UPPER_SNAKE_CASE for module-level constants (e.g., `WEBHOOK_URL`, `SERVICES`)

## Where to Add New Code

**New Service Page:**
1. Create `src/pages/services/ServiceName.tsx`
2. Import `ServicePageTemplate` and `SchemaMarkup`
3. Define config object with serviceName, slug, subheadline, content, FAQs, processSteps
4. Pass config to ServicePageTemplate; wrap SchemaMarkup for structured data
5. Add route to `src/App.tsx` with import and `<Route path="/services/slug">`
6. Optionally add service to `src/components/lead-form/steps/StepService.tsx` SERVICES array

**New Location Page:**
1. Create `src/pages/locations/LocationName.tsx`
2. Follow same ServicePageTemplate pattern as service pages (can reuse template or extend)
3. Import location-specific content (address, service list)
4. Use SchemaMarkup with type="location" and locationName prop
5. Add route to `src/App.tsx`

**New Component:**
1. Create `src/components/ComponentName.tsx`
2. Use PascalCase file name; export default function
3. Define props interface inline or at module top with `Props` suffix
4. Use Tailwind CSS classes (prefer utility classes over custom CSS)
5. Import lucide-react icons if needed
6. Place in appropriate subdirectory if related to other components (e.g., lead-form components in `src/components/lead-form/`)

**New Utility Function:**
1. Create `src/utils/functionName.ts`
2. Keep function focused (single responsibility)
3. Use camelCase function names
4. Export named function; add TypeScript type annotations
5. Example: validation functions in `src/utils/formValidation.ts`

**New Custom Hook:**
1. Create `src/hooks/useHookName.ts`
2. Use `use` prefix per React conventions
3. Return object with state variables and handler functions
4. Use other hooks (useState, useEffect, useCallback) as needed
5. Example: `useMultiStepForm` returns { formData, errors, updateField, nextStep, submit, ... }

**Static Data:**
1. Add to `src/data/fileName.ts` if application-wide (e.g., projects, constants)
2. Export TypeScript array or object; define interface at top
3. Example: `src/data/projects.ts` exports `projects: Project[]`

**Adding a Page Route:**
1. Create page component in appropriate folder (`src/pages/`, `src/pages/services/`, `src/pages/locations/`)
2. Import page in `src/App.tsx`
3. Add `<Route path="/path" element={<PageComponent />} />` to Routes list
4. Update Navigation.tsx if route should appear in menu

## Special Directories

**node_modules/:**
- Purpose: Installed npm dependencies
- Generated: Yes (run `npm install`)
- Committed: No (.gitignore)

**dist/:**
- Purpose: Production build output from Vite
- Generated: Yes (run `npm run build`)
- Committed: No (.gitignore)

**public/images/:**
- Purpose: Project photos and visual assets referenced in pages and carousels
- Generated: No (manually added)
- Committed: Yes (git-tracked)
- Note: All project images must be pre-placed here; no dynamic image uploads

**src/components/seo/:**
- Purpose: SEO schema and helper utilities
- Generated: No
- Committed: Yes
- Note: Complementary to `src/seo/schemas.ts` (schema definitions)

**.planning/codebase/:**
- Purpose: Analysis documents for GSD workflow (this directory)
- Generated: Yes (by codebase mapper)
- Committed: Yes (.gitignore ignores .planning/ but can be overridden)
- Files: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, STACK.md, INTEGRATIONS.md, CONCERNS.md

---

*Structure analysis: 2026-03-21*
