# Architecture

**Analysis Date:** 2026-03-21

## Pattern Overview

**Overall:** React 18 SPA (Single Page Application) with React Router client-side routing

**Key Characteristics:**
- Hook-based state management (no Redux/Context API)
- Multi-step form abstraction for lead capture
- Service page template pattern for DRY service/location pages
- SEO-first design with meta tag manipulation and JSON-LD schema
- Supabase + webhook integration for lead persistence and external processing

## Layers

**Presentation Layer:**
- Purpose: Display UI and handle user interaction
- Location: `src/components/`, `src/pages/`
- Contains: React components (page components, form steps, reusable UI elements)
- Depends on: Hooks (for state/data), utilities (for formatting), Tailwind CSS
- Used by: React Router and parent components

**Page Layer:**
- Purpose: Route-specific page compositions that map to URL paths
- Location: `src/pages/`, `src/pages/services/`, `src/pages/locations/`
- Contains: Page components (Home.tsx, Services.tsx, 12+ service pages, 13+ location pages)
- Depends on: Presentation components, hooks (useReviewData, useLeadTracking), SEO utilities
- Used by: React Router in `src/App.tsx`

**Hook Layer (State & Data):**
- Purpose: Complex state handling, API calls, form logic, tracking
- Location: `src/hooks/`
- Contains:
  - `useMultiStepForm.ts` - Form state, validation, submission, step navigation
  - `useReviewData.ts` - Fetch review counts from Supabase or Google Sheets
  - `useLeadTracking.ts` - Capture UTM params, device info, session ID
- Depends on: Utils (validation, formatting), Supabase client
- Used by: Components and pages

**Library/Client Layer:**
- Purpose: Third-party service clients and configuration
- Location: `src/lib/`
- Contains: Supabase client initialization (`supabase.ts`), type definitions (BlogPost)
- Depends on: @supabase/supabase-js SDK
- Used by: Hooks (useReviewData)

**Utility Layer:**
- Purpose: Reusable functions and validators
- Location: `src/utils/`
- Contains:
  - `formValidation.ts` - Email, phone, required field validators
  - `formatPhone.ts` - Phone number formatting
- Depends on: None
- Used by: Hooks and components

**Data & Configuration Layer:**
- Purpose: Static data, constants, and SEO config
- Location: `src/data/`, `src/seo/`
- Contains:
  - `src/data/projects.ts` - Project carousel data (Project interface, projects array)
  - `src/seo/constants.ts` - CANONICAL_DOMAIN constant
  - `src/seo/schemas.ts` - JSON-LD schema helpers
- Depends on: None
- Used by: Components, pages, SEO components

**SEO Layer:**
- Purpose: Meta tag manipulation and structured data markup
- Location: `src/components/SEO.tsx`, `src/components/SchemaMarkup.tsx`, `src/components/seo/SeoSchema.tsx`
- Contains: SEO component (meta tags), schema markup generators (JSON-LD)
- Depends on: React effects, utility components
- Used by: Pages and service page templates

## Data Flow

**Lead Form Submission (Primary Business Flow):**

1. User lands on form (MultiStepLeadForm in service page or dedicated page)
2. useLeadTracking hook captures UTM params, device info, session ID on first mount
3. useMultiStepForm hook manages form state:
   - Step 0: Select service (mapped from URL slug via defaultService prop)
   - Step 1: Enter property address
   - Step 2: Enter contact info (name, phone, email)
   - Step 3: Display result (success/error)
4. Form submission collects:
   - formData (service, urgency, address, name, phone, email, message)
   - tracking data (UTM params, referrer, landing page, device type, session ID)
   - page metadata (current URL, page title, timestamp)
5. Payload sent to n8n webhook: `https://n8n.whitflow.com/webhook/dte-form-submissions`
6. Webhook processes lead and optionally stores in Supabase
7. Success/error state displayed via StepResult component

**Review Data Loading:**

1. useReviewData hook mounts on pages displaying review count
2. Attempts to fetch from Supabase `review_data` table
3. Falls back to Google Sheets API if Supabase unavailable
4. Falls back to hardcoded default (92 reviews, 5.0 rating) if both fail
5. Data cached in state and used throughout component lifecycle

**Page Routing & Composition:**

1. User navigates to `/services/roof-repair` or `/locations/columbus`
2. App.tsx Route matches and renders service/location page component
3. Page component passes config object to ServicePageTemplate
4. Template uses config to render:
   - Hero section with service name and CTA
   - Problem/promise statement
   - Process steps
   - FAQ section with JSON-LD schema
   - Sidebar with lead form
   - Trust badges and reviews

**SEO Meta Tag Injection:**

1. SEO component mounted on page
2. useEffect updates document.title
3. Updates or creates meta tags (description, keywords, og:*, twitter:*)
4. Creates canonical link
5. SchemaMarkup component injects JSON-LD into document.head
6. Schema type determines structure (home, service, location, etc.)

**State Management Strategy:**

- React hooks only: useState for form data, errors, submission status, UI state
- useRef for non-state values: timeouts (Navigation), carousel refs (WorkCarousel)
- useCallback for memoized callbacks: form field updates, step navigation
- Custom hooks abstract complex logic: useMultiStepForm, useReviewData, useLeadTracking
- No Context API or Redux: form data passed as props through component tree

## Key Abstractions

**Service/Location Page Template Pattern:**
- Purpose: Generate 25+ identical page structures (12 services + 13 locations) from config
- Examples: `src/pages/services/RoofRepair.tsx`, `src/pages/locations/Columbus.tsx`
- Pattern:
  - Service/location page passes ServicePageProps config to `ServicePageTemplate`
  - Template renders fixed layout with slots for content
  - Config includes: serviceName, slug, metaDescription, FAQs, process steps, hero text
  - Enables 95% code reuse; only config differs between pages
  - Reduces maintenance burden for service/location additions

**Form State & Validation Abstraction:**
- Purpose: Encapsulate multi-step form logic without coupling to UI
- Location: `src/hooks/useMultiStepForm.ts`
- Exports: Form data object, errors object, step navigation functions, submit handler
- Pattern:
  - stepValidators map defines validation rules per step
  - updateField updates state and clears related errors
  - validateStep checks current step before navigation
  - submit sends payload with tracking data to webhook
  - Components agnostic to validation rules; consume hook interface

**SEO Abstraction:**
- Purpose: Centralize meta tag and schema generation
- Components:
  - `SEO.tsx` - Meta tag injection (title, description, keywords, og:*, canonical)
  - `SchemaMarkup.tsx` - JSON-LD generator (home, service, location, organization)
  - `SeoSchema.tsx` - Helper functions for schema building
- Pattern: Pass config props (title, description, schema type) to components; effects handle DOM manipulation

**Review Data Abstraction:**
- Purpose: Abstract data source (Supabase vs Google Sheets) from consumers
- Location: `src/hooks/useReviewData.ts`
- Pattern:
  - Attempts Supabase first (authoritative source)
  - Falls back to Google Sheets API (real-time sync)
  - Falls back to hardcoded default (graceful degradation)
  - Returns reviewData object with normalized shape

## Entry Points

**Application Initialization:**
- Location: `src/main.tsx`
- Triggers: Browser page load
- Responsibilities:
  - Render React app into DOM root element
  - Wrap with React StrictMode for dev warnings

**Router & Layout:**
- Location: `src/App.tsx`
- Triggers: After React initialization
- Responsibilities:
  - Define all 40+ routes (services, locations, pages)
  - Wrap app with Router, Navigation, Footer
  - Map URL slugs to service names for form pre-population

**Home Page:**
- Location: `src/pages/Home.tsx`
- Triggers: Route "/"
- Responsibilities:
  - Hero section with company mission
  - Work carousel (embla-carousel)
  - Trust badges (reviews, certifications)
  - Service overview section
  - CTA buttons (Get Inspection, Quote)

**Service Pages:**
- Location: `src/pages/services/*.tsx` (12 pages)
- Triggers: Routes like "/services/roof-repair"
- Responsibilities:
  - Wrap ServicePageTemplate with service-specific config
  - Inject SchemaMarkup for service + FAQ
  - Pass defaultService slug to lead form for pre-population

**Location Pages:**
- Location: `src/pages/locations/*.tsx` (13 pages)
- Triggers: Routes like "/locations/columbus"
- Responsibilities:
  - Similar to service pages: config-driven content
  - Inject location-specific schema markup
  - Display local address, service areas, team photos

**Lead Form Components:**
- Location: `src/components/lead-form/` (MultiStepLeadForm, steps/)
- Triggers: User clicks "Get Quote" or navigates to form page
- Responsibilities:
  - Manage form state via useMultiStepForm hook
  - Render 4-step UI: service selection, address, contact, result
  - Validate on step transition
  - Submit to webhook with tracking data

## Error Handling

**Strategy:** Try-catch with graceful fallbacks and user-facing error states

**Form Validation:**
- stepValidators object validates each step's fields
- setErrors tracks field-level error messages
- User cannot proceed to next step until errors cleared
- Error messages display below affected fields
- Examples in `src/hooks/useMultiStepForm.ts`:
  ```typescript
  const stepErrors = validator(formData);
  setErrors(stepErrors);
  return Object.keys(stepErrors).length === 0;
  ```

**API Failures - Review Data Loading:**
- useReviewData tries Supabase first, catches with try-catch
- Falls back to Google Sheets fetch if Supabase fails
- Falls back to hardcoded defaults if both fail
- Error logged to console; user sees default value (92 reviews)
- Example in `src/hooks/useReviewData.ts`:
  ```typescript
  catch (err) {
    console.error('Failed to load reviews:', err);
    setReviewData({ totalReviews: DEFAULT_REVIEW_COUNT, ... });
  }
  ```

**Lead Submission Errors:**
- useMultiStepForm wraps submission in try-catch
- AbortController with 10-second timeout prevents hanging
- Network errors caught; submitStatus set to 'error'
- User sees StepResult component with retry button
- Example in `src/hooks/useMultiStepForm.ts`:
  ```typescript
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(WEBHOOK_URL, { signal: controller.signal });
    if (!response.ok) throw new Error('Submission failed');
    setSubmitStatus('success');
  } catch {
    setSubmitStatus('error');
  }
  ```

**Rendering Errors:**
- SEO component safely creates/updates meta tags with null checks
- Schema injection in try-catch wraps JSON.stringify
- No unhandled promise rejections; all async operations wrapped

## Cross-Cutting Concerns

**Logging:**
- Error logging to console only: `console.error('Failed to load reviews:', err)`
- No info/warning/debug logging in production
- Errors logged for developer visibility during dev

**Validation:**
- Form validation centralized in `src/utils/formValidation.ts`
- Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Phone: 10-digit format validation
- Required fields: trim and check non-empty
- Validators reusable across hooks and components

**SEO/Meta Management:**
- Every page/service/location wrapped with SEO component
- Canonical URLs set via CANONICAL_DOMAIN constant + route slug
- Open Graph and Twitter meta tags auto-populated
- JSON-LD schema injected for Google rich results
- Schema types: Organization, Service, LocalBusiness, FAQPage

**Authentication:**
- None currently: Supabase client uses anonymous key
- Webhook URLs and Supabase credentials hardcoded in source
- No API authentication or JWT tokens

**Lead Tracking:**
- useLeadTracking captures on first render: UTM params, referrer, landing page, device type, screen resolution, user agent, session ID
- Session ID generated with crypto.randomUUID() and stored in sessionStorage
- Landing page stored in sessionStorage on first form load (persists across steps)
- All tracking data included in webhook payload for CRM integration

**Styling:**
- Tailwind CSS utility classes (primary-700, charcoal-900, etc.)
- Custom color scheme: primary (primary-700, primary-800), charcoal (charcoal-600, charcoal-900)
- Responsive design: sm (640px), md (768px), lg (1024px) breakpoints
- Lucide-react icons throughout (Phone, Shield, Star, ChevronRight, etc.)

**Asset Management:**
- Images located in `public/images/` (project photos, hero images, logo)
- Roofle widget loaded via CDN: `https://app.roofle.com/roof-quote-pro-widget.js`
- Google Fonts preconnected in index.html
- Embla carousel for image galleries and work showcase

---

*Architecture analysis: 2026-03-21*
