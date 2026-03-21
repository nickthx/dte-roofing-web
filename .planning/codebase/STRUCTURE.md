# Codebase Structure

**Analysis Date:** 2026-03-21

## Directory Layout

```
dte-roofing-web/
├── src/                           # Application source code
│   ├── main.tsx                   # React entry point (DOM mount)
│   ├── App.tsx                    # Router and layout setup
│   ├── index.css                  # Global Tailwind styles
│   ├── vite-env.d.ts              # Vite type definitions
│   │
│   ├── pages/                     # Route-level page components
│   │   ├── Home.tsx               # Homepage
│   │   ├── About.tsx              # About page
│   │   ├── Services.tsx           # Services index
│   │   ├── Gallery.tsx            # Project gallery
│   │   ├── Blog.tsx               # Blog listing
│   │   ├── BlogPost.tsx           # Individual blog posts
│   │   ├── Reviews.tsx            # Reviews/testimonials
│   │   ├── FAQ.tsx                # FAQ page
│   │   ├── Contact.tsx            # Contact/lead form
│   │   ├── Locations.tsx          # Service areas index
│   │   ├── InstantQuote.tsx       # Dedicated quote page
│   │   ├── Financing.tsx          # Financing options
│   │   │
│   │   ├── services/              # Service-specific pages (12 pages)
│   │   │   ├── RoofRepair.tsx
│   │   │   ├── RoofReplacement.tsx
│   │   │   ├── RoofInstallation.tsx
│   │   │   ├── RoofInspection.tsx
│   │   │   ├── RoofMaintenance.tsx
│   │   │   ├── PreventativeMaintenance.tsx
│   │   │   ├── GutterServices.tsx
│   │   │   ├── Gutters.tsx
│   │   │   ├── EmergencyServices.tsx
│   │   │   ├── StormDamage.tsx
│   │   │   ├── Siding.tsx
│   │   │   └── CommercialRoofing.tsx
│   │   │
│   │   └── locations/             # Location-specific pages (13 pages)
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
│   ├── components/                # Reusable UI components
│   │   ├── Navigation.tsx          # Header/nav bar
│   │   ├── Footer.tsx              # Footer
│   │   ├── SEO.tsx                 # Meta tag injection
│   │   ├── SchemaMarkup.tsx        # Structured schema markup
│   │   ├── ScrollToTop.tsx         # Scroll behavior
│   │   ├── MobileStickyCall.tsx    # Mobile sticky call button
│   │   ├── RoofQuoteButton.tsx     # CTA button
│   │   ├── WorkCarousel.tsx        # Project carousel (Embla)
│   │   ├── SidebarTrustBadges.tsx  # Trust signals widget
│   │   ├── ServicePageTemplate.tsx # Template for service pages
│   │   ├── ServiceLeadForm.tsx     # Form wrapper for service pages
│   │   │
│   │   ├── lead-form/             # Multi-step form components
│   │   │   ├── MultiStepLeadForm.tsx   # Form orchestrator
│   │   │   ├── FormProgressBar.tsx     # Progress indicator
│   │   │   ├── FormField.tsx           # Input wrapper
│   │   │   ├── ServiceOptionCard.tsx   # Service selector UI
│   │   │   ├── UrgencyPill.tsx         # Urgency selector UI
│   │   │   │
│   │   │   └── steps/             # Form step components
│   │   │       ├── StepService.tsx    # Service selection
│   │   │       ├── StepAddress.tsx    # Address entry
│   │   │       ├── StepContact.tsx    # Name/phone/email
│   │   │       └── StepResult.tsx     # Success/error screen
│   │   │
│   │   ├── seo/                   # SEO-specific components
│   │   │   └── SeoSchema.tsx       # Schema helper component
│   │   │
│   │   └── [other top-level components]
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useMultiStepForm.ts    # Form state/validation/submission
│   │   ├── useReviewData.ts       # Fetch review count from Supabase/Sheets
│   │   └── useLeadTracking.ts     # Capture UTM/device/session data
│   │
│   ├── lib/                       # Third-party integrations
│   │   └── supabase.ts            # Supabase client + BlogPost interface
│   │
│   ├── utils/                     # Utility functions
│   │   ├── formValidation.ts      # Email, phone, required validation
│   │   └── formatPhone.ts         # Phone number formatting
│   │
│   ├── data/                      # Static data and constants
│   │   └── projects.ts            # Project carousel data with types
│   │
│   └── seo/                       # SEO configuration
│       ├── constants.ts           # CANONICAL_DOMAIN constant
│       └── schemas.ts             # Schema.org JSON-LD definitions
│
├── public/                        # Static assets
│   ├── images/                    # Project photos, hero images
│   └── data/                      # Static data files (if any)
│
├── dist/                          # Built/compiled output (generated)
│   ├── assets/
│   ├── data/
│   └── images/
│
├── supabase/                      # Supabase backend config
│   ├── migrations/                # Database migrations
│   └── functions/                 # Edge functions
│       └── update-reviews/        # Review sync function
│
├── .planning/                     # GSD workflow docs
│   ├── codebase/                  # Codebase analysis (this file)
│   └── phases/                    # Implementation phases
│
├── Configuration Files
│   ├── package.json               # Dependencies, build scripts
│   ├── tsconfig.json              # TypeScript references
│   ├── tsconfig.app.json          # App-specific TypeScript config
│   ├── tsconfig.node.json         # Build tool TypeScript config
│   ├── vite.config.ts             # Vite build config
│   ├── tailwind.config.js         # Tailwind CSS customization
│   ├── postcss.config.js          # PostCSS plugins
│   ├── eslint.config.js           # ESLint rules
│   └── vercel.json                # Vercel deployment config
│
└── Git & Doc Files
    ├── .git/
    ├── .gitignore
    ├── LOCATION-PAGES-FINAL-DELIVERY.md
    ├── NAVIGATION-DROPDOWN-FIX.md
    └── PHOTO-EXPANSION-PLAN.md
```

## Directory Purposes

**`src/pages/`:**
- Purpose: Route-mapped page components; one file per route (with nested subdirectories for service and location pages)
- Contains: Component exports matching route paths
- Key files: `Home.tsx` (homepage), `About.tsx`, `Contact.tsx`

**`src/pages/services/`:**
- Purpose: Service-specific landing pages (roof repair, replacement, gutters, etc.)
- Contains: Individual service pages using ServicePageTemplate
- Pattern: Each page passes config to template; config includes service name, problem statement, process steps, FAQs

**`src/pages/locations/`:**
- Purpose: City-specific service area pages (Columbus, Hilliard, Dublin, etc.)
- Contains: 13 location pages for Ohio service areas
- Pattern: Location pages follow same template pattern as services

**`src/components/`:**
- Purpose: Reusable UI components, layout shells, form sections
- Contains: Stateless presentational components and light-state components
- Key files: `Navigation.tsx`, `Footer.tsx`, `ServicePageTemplate.tsx`

**`src/components/lead-form/`:**
- Purpose: Multi-step lead capture form components
- Contains: Form orchestrator (MultiStepLeadForm), progress bar, input wrappers, step components
- Pattern: Controlled components; state managed by parent MultiStepLeadForm via useMultiStepForm hook

**`src/hooks/`:**
- Purpose: Custom hooks for complex state, API calls, tracking
- Key hooks: useMultiStepForm (form logic), useReviewData (API fetch), useLeadTracking (analytics)
- Pattern: Hooks return data + handler functions; can be composed across multiple components

**`src/lib/`:**
- Purpose: Third-party client initialization and type definitions
- Contains: Supabase client config, BlogPost interface
- Pattern: Single source of truth for external service setup

**`src/utils/`:**
- Purpose: Pure utility functions and validators
- Contains: Form validation (email, phone, required), formatting functions
- Pattern: No side effects; purely functional

**`src/data/`:**
- Purpose: Static application data with TypeScript interfaces
- Contains: Project carousel data (projects array), Project interface
- Pattern: Single file with type-safe data export; can be imported anywhere

**`src/seo/`:**
- Purpose: SEO constants and structured data schemas
- Contains: Canonical domain constant, Schema.org JSON-LD definitions
- Pattern: Imported by components; decoupled from page logic

## Key File Locations

**Entry Points:**
- `src/main.tsx`: DOM mount, React initialization
- `src/App.tsx`: Router setup, route definitions, layout wrapper
- `index.html`: HTML template (root div)

**Configuration:**
- `package.json`: Dependencies, scripts
- `tsconfig.json`: TypeScript compiler options
- `vite.config.ts`: Build and dev server config
- `tailwind.config.js`: Tailwind CSS customization
- `eslint.config.js`: Linting rules

**Core Logic:**
- `src/hooks/useMultiStepForm.ts`: Form state machine
- `src/hooks/useReviewData.ts`: API data fetching
- `src/lib/supabase.ts`: Supabase client

**Styling:**
- `src/index.css`: Global Tailwind imports
- `tailwind.config.js`: Custom colors, spacing, plugins

## Naming Conventions

**Files:**
- Pages: PascalCase, e.g., `Home.tsx`, `RoofRepair.tsx`, `Columbus.tsx`
- Components: PascalCase, e.g., `Navigation.tsx`, `FormField.tsx`, `WorkCarousel.tsx`
- Hooks: Kebab-case with `use` prefix, e.g., `useMultiStepForm.ts`, `useReviewData.ts`
- Utilities: Kebab-case, e.g., `formValidation.ts`, `formatPhone.ts`
- Data/Config: Kebab-case or camelCase, e.g., `projects.ts`, `constants.ts`, `schemas.ts`

**Directories:**
- Feature directories: Kebab-case, e.g., `lead-form/`, `seo/`
- Semantic grouping: `pages/`, `components/`, `hooks/`, `lib/`, `utils/`, `data/`, `seo/`

**Components:**
- Props interfaces: `[ComponentName]Props`, e.g., `ServicePageProps`, `MultiStepLeadFormProps`
- Exports: Named exports for utility/hook functions; default export for page/component React files

## Where to Add New Code

**New Feature (service page, location page):**
- Primary code: Create `.tsx` file in `src/pages/services/` or `src/pages/locations/`
- Use ServicePageTemplate: Wrap with ServicePageTemplate, pass config object
- SEO: Import SchemaMarkup, pass service/location config
- Tests: No test directory detected; add manual QA steps

**New Component/Module:**
- If reusable across multiple pages: `src/components/[ComponentName].tsx`
- If specific to lead form: `src/components/lead-form/[ComponentName].tsx`
- If SEO-specific: `src/components/seo/[ComponentName].tsx`
- Props: Define interface ending in `Props`, pass as React component props

**New Hook:**
- Location: `src/hooks/[hookName].ts`
- Pattern: Export function starting with `use`, return object with data/handlers
- Example: `export function useMyHook(): { data: T, handler: () => void } { ... }`

**New Utility:**
- Location: `src/utils/[utilName].ts`
- Pattern: Pure functions, no side effects
- Example: `export function formatName(first: string, last: string): string { ... }`

**New Static Data:**
- Location: `src/data/[dataName].ts`
- Pattern: Define interface, export typed array/object
- Example: `export interface Service { ... }; export const services: Service[] = [...];`

**New Route:**
- Edit `src/App.tsx`: Add `<Route path="..." element={<Component />} />`
- Create page component in `src/pages/[PageName].tsx`
- Follow naming: PascalCase filenames, default export

## Special Directories

**`public/`:**
- Purpose: Static assets served directly (no processing)
- Generated: No
- Committed: Yes
- Contains: Images, favicon, static data files
- Access: From code via `/images/...` paths

**`dist/`:**
- Purpose: Build output (compiled, minified code)
- Generated: Yes (by `npm run build`)
- Committed: No
- Contents: Bundled JS/CSS, assets, public files copied over

**`.planning/`:**
- Purpose: GSD workflow documents and phase plans
- Generated: Yes (by GSD orchestrator)
- Committed: Yes
- Contains: Codebase analysis (ARCHITECTURE.md, STRUCTURE.md, etc.), phase implementation plans

**`supabase/`:**
- Purpose: Supabase backend configuration
- Generated: No
- Committed: Yes
- Contains: Database migrations, edge functions (review sync)

**`node_modules/`:**
- Purpose: Installed npm dependencies
- Generated: Yes (by `npm install`)
- Committed: No

## File Patterns & Conventions

**Page Files:**
```typescript
// src/pages/[PageName].tsx
import { useReviewData } from '../hooks/useReviewData';
import SEO from '../components/SEO';

export default function PageName() {
  const { reviewData } = useReviewData();

  return (
    <>
      <SEO title="..." description="..." />
      <MobileStickyCall />
      <div className="min-h-screen bg-white">
        {/* Page content */}
      </div>
    </>
  );
}
```

**Service Page Pattern:**
```typescript
// src/pages/services/[ServiceName].tsx
import ServicePageTemplate from '../../components/ServicePageTemplate';

export default function ServiceName() {
  return (
    <ServicePageTemplate
      serviceName="Service Name"
      slug="service-slug"
      subheadline="..."
      metaDescription="..."
      keywords="..."
      problemPromise={<>HTML content</>}
      whatWeDo={[...]}
      processSteps={[...]}
      faqs={[...]}
    />
  );
}
```

**Hook Pattern:**
```typescript
// src/hooks/[hookName].ts
import { useState, useCallback } from 'react';

export function useMyHook() {
  const [state, setState] = useState<Type>(initial);

  const handler = useCallback(() => {
    // Logic
  }, [deps]);

  return { state, handler };
}
```

**Component Pattern:**
```typescript
// src/components/[ComponentName].tsx
interface ComponentNameProps {
  prop1: string;
  prop2?: number;
}

export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  return <div>{prop1}</div>;
}
```

---

*Structure analysis: 2026-03-21*
