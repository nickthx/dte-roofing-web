# Architecture

**Analysis Date:** 2026-03-21

## Pattern Overview

**Overall:** Component-driven SPA (Single Page Application) with client-side routing

**Key Characteristics:**
- React 18 with TypeScript for type-safe component development
- React Router v7 for multi-page routing and navigation
- Custom hook-based state management for form and data handling
- Responsive Tailwind CSS styling with custom utility configuration
- API integration via Supabase SDK for dynamic content and webhooks for lead capture
- SEO-optimized with meta tag manipulation and structured schema markup in-component

## Layers

**Presentation Layer (UI Components):**
- Purpose: Display and user interaction
- Location: `src/components/`
- Contains: React components (Pages, Forms, Layout, Reusable UI)
- Depends on: Hooks, utilities, styling (Tailwind)
- Used by: React Router and parent components

**Pages/Route Layer:**
- Purpose: Route-specific page compositions
- Location: `src/pages/` and `src/pages/services/`, `src/pages/locations/`
- Contains: Page components that map to routes, template-based service/location pages
- Depends on: Presentation components, hooks, SEO utilities
- Used by: React Router (App.tsx)

**State Management & Business Logic (Hooks):**
- Purpose: Complex state handling, API calls, tracking
- Location: `src/hooks/`
- Contains: Custom hooks (useMultiStepForm, useReviewData, useLeadTracking)
- Depends on: Utils, lib (Supabase), external APIs
- Used by: Components and pages

**Data Layer:**
- Purpose: Static data, type definitions, constants
- Location: `src/data/` and `src/seo/`
- Contains: Project carousel data, SEO constants, schema definitions
- Depends on: None
- Used by: Components, hooks, pages

**Integration Layer:**
- Purpose: Third-party service clients
- Location: `src/lib/supabase.ts`
- Contains: Supabase client initialization, blog post types
- Depends on: Supabase SDK
- Used by: Hooks (useReviewData)

**Utility/Helper Layer:**
- Purpose: Reusable functions and validators
- Location: `src/utils/`
- Contains: Form validation, phone formatting
- Depends on: None
- Used by: Hooks and components

## Data Flow

**Lead Form Submission Flow:**

1. User lands on page with MultiStepLeadForm component (`src/components/lead-form/MultiStepLeadForm.tsx`)
2. useMultiStepForm hook manages form state, validation, and submission logic
3. Each step (Service, Address, Contact) is a separate component that updates form state via `updateField()`
4. User submits → `submit()` validates final step
5. Payload constructed with form data + tracking data (from useLeadTracking)
6. POST to n8n webhook: `https://n8n.whitflow.com/webhook/dte-form-submissions`
7. Success/Error result triggers StepResult component
8. Tracking includes: UTM params, referrer, device type, session ID, landing page

**Review Data Fetch Flow:**

1. Components using review count (Home, service pages) call useReviewData hook
2. Hook attempts to fetch from Supabase `review_data` table
3. If Supabase fails or no data: Falls back to Google Sheets API
4. Default fallback: 92 reviews, 5.0 rating
5. Data cached in component state until page reload

**Page Rendering Flow:**

1. main.tsx initializes React in DOM
2. App.tsx sets up Router and wraps app with Navigation/Footer
3. User navigates → Router matches path to Route component
4. Route component renders page (Home.tsx, About.tsx, service pages)
5. Page fetches review data via hook, renders SEO component, renders structured schema
6. Components consume data, render based on props and state

## Key Abstractions

**ServicePageTemplate Component:**
- Purpose: DRY pattern for 12+ service pages with identical structure
- Examples: `src/pages/services/RoofRepair.tsx`, `src/pages/services/RoofInstallation.tsx`, `src/pages/services/Gutters.tsx`
- Pattern: Service pages pass config object (serviceName, slug, content sections, FAQs) to template component which handles layout, SEO, schema generation

**MultiStepLeadForm Hook:**
- Purpose: Encapsulate complex multi-step form logic (state, validation, submission)
- Location: `src/hooks/useMultiStepForm.ts`
- Exports: Form data, errors, step navigation, submission handlers
- Pattern: Custom hook exposes interface allowing components to be form-agnostic; stepValidators map validates each step

**SEO Components:**
- Purpose: Meta tag injection and structured data markup
- Examples: `SEO.tsx` (meta tags), `SchemaMarkup.tsx` (JSON-LD), `SeoSchema.tsx` (schema helpers)
- Pattern: Effects-based meta manipulation at page/component mount time; schema objects defined in `src/seo/schemas.ts`

**Project/Portfolio Data:**
- Purpose: Centralized, type-safe carousel and gallery data
- Location: `src/data/projects.ts`
- Pattern: Static TypeScript array with Project interface; exported subsets (carouselProjects) for selective consumption

## Entry Points

**Application Entry (main.tsx):**
- Location: `src/main.tsx`
- Triggers: Browser page load
- Responsibilities: DOM mounting, React initialization, StrictMode wrapping

**Router Entry (App.tsx):**
- Location: `src/App.tsx`
- Triggers: After React initialization
- Responsibilities: Route definitions (40+ routes), layout wrapper (Nav/Footer), form service mapping via defaultService prop

**Home Page (Home.tsx):**
- Location: `src/pages/Home.tsx`
- Triggers: Route "/"
- Responsibilities: Hero section, mission statement, founder story, work carousel, CTA sections

**Service Pages (RoofRepair.tsx, etc.):**
- Location: `src/pages/services/*.tsx`
- Triggers: Routes like "/services/roof-repair"
- Responsibilities: Wrap ServicePageTemplate with service-specific content config

**Lead Form Entry Points:**
- Locations: Embedded in Home, service pages, dedicated InstantQuote page
- Trigger: User clicks "Get Quote" or dedicated form page
- Responsibilities: Collect lead info, submit to webhook, display result

## Error Handling

**Strategy:** Client-side try-catch with fallback defaults; no centralized error boundary detected

**Patterns:**
- Form validation: stepValidators check fields, setErrors on component state
- API failures: useReviewData catches fetch errors, displays fallback review count (92)
- Lead submission: Fetch wrapped in try-catch with 10s timeout; error sets submitStatus='error' and shows StepResult error screen
- Webhook timeouts: AbortController with 10000ms timeout prevents hanging requests

## Cross-Cutting Concerns

**Logging:** No explicit logging framework; console.error used in hooks (useReviewData)

**Validation:** Form validation via utility functions (validateRequired, validateEmail, validatePhone in `src/utils/formValidation.ts`); step-based validators in useMultiStepForm hook

**Authentication:** None required (public site); Supabase anon key allows read-only DB access

**SEO/Meta Management:** Programmatic meta tag injection via SEO component effects; JSON-LD schema injected via `<script type="application/ld+json">` in page templates

**Lead Tracking:** useLeadTracking hook captures UTM params, referrer, device type, session ID, landing page; bundled into form payload

**Styling:** Global Tailwind CSS via `src/index.css`; custom color variables (--charcoal-900, --primary-700, etc.) defined in Tailwind config; no CSS modules or styled-components

---

*Architecture analysis: 2026-03-21*
