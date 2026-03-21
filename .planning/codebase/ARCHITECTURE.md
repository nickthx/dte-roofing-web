# Architecture

**Analysis Date:** 2026-03-21

## Pattern Overview

**Overall:** React 18 + React Router single-page application (SPA) with template-based page generation and custom hook-based state management

**Key Characteristics:**
- Client-side routing via React Router v7 with 40+ routes covering services, locations, and dynamic pages
- Custom hooks for complex state (multi-step form, review data fetching, lead tracking)
- Template-based architecture for service and location pages to reduce code duplication
- Supabase backend integration for dynamic content (blog posts, review data)
- Webhook-based lead submission to n8n for CRM integration
- Tailwind CSS utility-first styling with custom charcoal/primary color scheme
- SEO-optimized with dynamic meta tags, structured data (JSON-LD), and OpenGraph support

## Layers

**Presentation (UI Components):**
- Purpose: Display and user interaction
- Location: `src/components/`
- Contains: Reusable UI components (Navigation, Footer, form fields), layout components, modular step components for the multi-step form
- Depends on: Hooks, utilities, styling (Tailwind CSS)
- Used by: Pages and other components

**Page Layer:**
- Purpose: Route-specific page compositions that map to URL paths
- Location: `src/pages/` (root pages), `src/pages/services/` (12+ service pages), `src/pages/locations/` (13 location pages)
- Contains: Page components that orchestrate templates, hooks, and components
- Depends on: ServicePageTemplate, SEO utilities, hooks (useReviewData)
- Used by: React Router in App.tsx

**State Management (Custom Hooks):**
- Purpose: Encapsulate complex state logic, API calls, and business logic
- Location: `src/hooks/`
- Contains: useMultiStepForm (form state, validation, submission), useReviewData (fetch and cache review counts), useLeadTracking (session and device tracking)
- Depends on: Utils (validation), lib (Supabase), external APIs
- Used by: Components and pages

**Data & Configuration:**
- Purpose: Static data, type definitions, constants, and SEO schemas
- Location: `src/data/` (project carousel), `src/seo/` (schema definitions)
- Contains: Project images array, SEO constants, schema objects for structured data
- Depends on: None
- Used by: Components, hooks, pages

**External Integrations:**
- Purpose: Third-party service clients and configuration
- Location: `src/lib/supabase.ts`
- Contains: Supabase client initialization, BlogPost interface, webhook endpoints (hardcoded in hooks)
- Depends on: @supabase/supabase-js SDK
- Used by: Hooks (useReviewData) and pages

**Utilities:**
- Purpose: Reusable functions for validation, formatting, and helpers
- Location: `src/utils/`
- Contains: Form validation (email, phone, required fields), phone number formatting
- Depends on: None
- Used by: Hooks and components

## Data Flow

**Lead Form Submission:**

1. User navigates to service page (e.g., `/services/roof-repair`)
2. ServicePageTemplate renders ServiceLeadForm component with defaultService prop
3. MultiStepLeadForm loads with useMultiStepForm hook, which initializes form state and tracking
4. User progresses through 4 steps (Service → Address → Contact → Result):
   - StepService: Selects service type and urgency
   - StepAddress: Enters property address
   - StepContact: Enters name, phone, email, optional message
   - StepResult: Success or error confirmation with retry option
5. Each step validates via stepValidators object in useMultiStepForm
6. On submit (step 2 → 3): Form data merged with tracking data (source, page, device) and posted to n8n webhook (hardcoded URL in useMultiStepForm)
7. Response determines success/error state; StepResult shows confirmation or error message with retry handler

**Review Data Loading:**

1. ServicePageTemplate or any component uses useReviewData hook
2. Hook attempts Supabase query to review_data table (single row, most recent)
3. If no Supabase data or error: falls back to Google Sheets fetch via GVIZ API
4. If all fails: returns hardcoded default (92 reviews, 5.0 rating)
5. Review count displayed on service pages in "Proof & Guarantees" section

**Page Navigation:**

1. User clicks link or navigates to URL
2. App.tsx Route component renders corresponding page component
3. Page component (e.g., RoofRepair.tsx) wraps ServicePageTemplate with service config
4. ServicePageTemplate renders full page layout with form sidebar
5. SEO component injects meta tags; SchemaMarkup injects JSON-LD structured data
6. Footer and Navigation always present (defined in App.tsx wrapping Routes)

**State Management:**

- React hooks only: useState for form state, errors, submission status
- useCallback for memoized event handlers
- useRef for carousel references (embla-carousel-react)
- No Context API or Redux—state lives in individual hooks and components
- Lead tracking state persists in useLeadTracking during session

## Key Abstractions

**ServicePageTemplate:**
- Purpose: DRY pattern for 12+ identical service page layouts (RoofRepair, RoofReplacement, Gutters, etc.)
- Examples: `src/pages/services/RoofRepair.tsx`, `src/pages/services/RoofInstallation.tsx`, `src/pages/services/CommercialRoofing.tsx`
- Pattern: Service pages create config object (serviceName, slug, content sections, FAQs, process steps) and pass to template component which handles layout, SEO, schema generation, form embedding
- Benefit: One-time implementation of page structure; new services added by creating config and wrapping template

**Multi-Step Form Hook (useMultiStepForm):**
- Purpose: Encapsulate complex multi-step form logic (state, validation, submission, error handling, tracking)
- Location: `src/hooks/useMultiStepForm.ts`
- Exports: formData, errors, currentStep, direction, isSubmitting, submitStatus, plus handlers (updateField, nextStep, prevStep, submit, retry)
- Pattern: Custom hook with step-specific validators; stepValidators object maps step number to validation function; form logic decoupled from presentation
- Benefit: Components remain dumb; form behavior reusable; validation centralized

**SEO & Structured Data:**
- Purpose: Meta tag injection and structured data markup for Google/social sharing
- Examples: `src/components/SEO.tsx` (meta tags), `src/components/SchemaMarkup.tsx` (JSON-LD), `src/seo/schemas.ts` (schema objects)
- Pattern: useEffect-based meta manipulation in SEO.tsx; SchemaMarkup wraps inline `<script type="application/ld+json">` in component templates
- Benefit: Each page controls its own SEO; dynamic meta tags based on page props; structured data helps Google understand content

**Project Carousel Data:**
- Purpose: Centralized, type-safe carousel and gallery data
- Location: `src/data/projects.ts`
- Pattern: Static TypeScript array with Project interface defining title, category, location, image path, alt text; exported subsets (carouselProjects) for selective consumption
- Benefit: Single source of truth for project images; type-safe access; easy to update without touching components

## Entry Points

**Application Root (src/main.tsx):**
- Location: `src/main.tsx`
- Triggers: Browser page load, DOM ready
- Responsibilities: Mount React app to #root element, wrap in StrictMode for development warnings, initialize React 18 with createRoot

**Router & Layout (src/App.tsx):**
- Location: `src/App.tsx`
- Triggers: After React initialization
- Responsibilities: Define 40+ routes (/, /services/*, /locations/*, /blog/*, etc.), set up layout wrapper (Navigation + ScrollToTop + main + Footer), pass defaultService prop to InstantQuote for form pre-selection

**Home Page (src/pages/Home.tsx):**
- Location: `src/pages/Home.tsx`
- Triggers: Route "/"
- Responsibilities: Hero section, company story (founder backgrounds), work carousel (embla-carousel-react), mission statement, CTA sections, embedded lead form

**Service Pages (src/pages/services/*.tsx):**
- Location: `src/pages/services/RoofRepair.tsx`, `src/pages/services/RoofInstallation.tsx`, etc.
- Triggers: Routes like "/services/roof-repair"
- Responsibilities: Create service config object (serviceName, slug, content sections, FAQs, process steps), wrap ServicePageTemplate, call SchemaMarkup for structured data

**Location Pages (src/pages/locations/*.tsx):**
- Location: `src/pages/locations/Columbus.tsx`, `src/pages/locations/Hilliard.tsx`, etc.
- Triggers: Routes like "/locations/columbus"
- Responsibilities: Location-specific content (service offerings, local areas served, address), SEO customization, lead form with location pre-fill

**Instant Quote Page (src/pages/InstantQuote.tsx):**
- Location: `src/pages/InstantQuote.tsx`
- Triggers: Route "/get-a-quote-consultation"
- Responsibilities: Embed full-screen lead form with no service pre-selection, standalone form entry point for CTA clicks

## Error Handling

**Strategy:** Defensive error handling with fallback values; user-facing errors on form validation; silent failures with defaults for data fetches

**Patterns:**
- Form validation errors stored in component state (`errors` object); errors cleared on field change; validation triggered per step before advancing
- Lead submission wrapped in try-catch with AbortController timeout (10 seconds); timeout or network error sets submitStatus='error', shows StepResult error screen with retry button
- Review data fetch in useReviewData: Supabase query first, fall back to Google Sheets if Supabase fails, fall back to hardcoded default (92 reviews) if both fail—component always displays a number
- Phone and email validation: regex-based in utils; phone must be 10 digits; email must have @ and domain; validateRequired checks non-empty string

## Cross-Cutting Concerns

**Logging:** Error logging to console only (console.error in useReviewData for fetch failures); minimal logging in production

**Validation:** Centralized validators in `src/utils/formValidation.ts`; field-level error messages mapped to form fields; step-level validation in useMultiStepForm before advancing

**Authentication:** Custom session tracking via useLeadTracking (no user login); tracks device type, session ID, landing page; sends with form submission for lead qualification

**SEO:** Dynamic meta tags injected per page via SEO.tsx useEffect; structured data (JSON-LD) embedded as inline `<script>` tags in page templates; OpenGraph and Twitter card support; canonical URLs for duplicate prevention

**Lead Tracking:** useLeadTracking hook captures sessionId, deviceType, landingPage, timestamp; merged into webhook payload for CRM attribution and follow-up
