# Architecture

**Analysis Date:** 2026-03-07

## Pattern Overview

**Overall:** Single-Page Application (SPA) with client-side routing

**Key Characteristics:**
- React SPA built with Vite, deployed on Vercel with SPA fallback rewrites
- Client-side routing via React Router v7 (`BrowserRouter`)
- No SSR/SSG — all rendering happens in the browser; SEO meta tags are injected via DOM manipulation in `useEffect`
- Flat page-based architecture with no state management library (local component state only)
- Supabase used as lightweight backend for blog posts and review data
- Lead form submissions sent to external n8n webhook

## Layers

**Entry Point / Shell:**
- Purpose: Bootstrap React, define routes, wrap pages in shared layout
- Location: `src/main.tsx`, `src/App.tsx`
- Contains: Router setup, all route definitions, layout shell (Navigation + Footer)
- Depends on: All page components, `src/components/Navigation.tsx`, `src/components/Footer.tsx`, `src/components/ScrollToTop.tsx`

**Pages:**
- Purpose: Full page components, one per route
- Location: `src/pages/`
- Contains: Page-level content, SEO component usage, SchemaMarkup injection
- Depends on: Shared components, hooks, SEO utilities
- Used by: `src/App.tsx` route definitions

**Service Pages (Template-Driven):**
- Purpose: SEO-optimized service landing pages using a shared template
- Location: `src/pages/services/`
- Contains: Data objects (FAQs, process steps, features) passed as props to `ServicePageTemplate`
- Depends on: `src/components/ServicePageTemplate.tsx`, `src/components/SchemaMarkup.tsx`
- Pattern: Each service page is a thin wrapper that passes content props to the template

**Location Pages (Custom):**
- Purpose: Geo-targeted landing pages for local SEO
- Location: `src/pages/locations/`
- Contains: Fully custom JSX per location (not template-driven)
- Depends on: `src/components/SEO.tsx`, `src/components/SchemaMarkup.tsx`, `src/hooks/useReviewData.ts`

**Shared Components:**
- Purpose: Reusable UI elements used across pages
- Location: `src/components/`
- Contains: Navigation, Footer, SEO, SchemaMarkup, MobileStickyCall, RoofQuoteButton, SidebarTrustBadges, ServiceLeadForm, ServicePageTemplate
- Depends on: Hooks, utilities, lucide-react icons

**Lead Form System:**
- Purpose: Multi-step lead capture form with validation and webhook submission
- Location: `src/components/lead-form/`
- Contains: `MultiStepLeadForm.tsx` (orchestrator), step components (`StepService`, `StepAddress`, `StepContact`, `StepResult`), UI primitives (`FormField`, `FormProgressBar`, `ServiceOptionCard`, `UrgencyPill`)
- Depends on: `src/hooks/useMultiStepForm.ts`, `src/hooks/useLeadTracking.ts`, `src/utils/formValidation.ts`

**Hooks:**
- Purpose: Custom React hooks for data fetching and form logic
- Location: `src/hooks/`
- Contains: `useReviewData.ts` (fetches review stats from Supabase with Google Sheets fallback), `useMultiStepForm.ts` (form state machine), `useLeadTracking.ts` (UTM/session tracking)
- Used by: Pages and components

**Utilities:**
- Purpose: Pure helper functions
- Location: `src/utils/`
- Contains: `formValidation.ts` (email, phone, required validators), `formatPhone.ts` (phone formatting)

**SEO Layer:**
- Purpose: Meta tag management and structured data injection
- Location: `src/components/SEO.tsx`, `src/components/SchemaMarkup.tsx`, `src/seo/`
- Contains: DOM-based meta tag updater (`SEO.tsx`), Schema.org JSON-LD generator (`SchemaMarkup.tsx`), constants (`src/seo/constants.ts`), schema definitions (`src/seo/schemas.ts`)
- Pattern: Each page calls `<SEO />` for meta tags and `<SchemaMarkup />` for structured data

**Supabase Backend:**
- Purpose: Database and edge functions
- Location: `src/lib/supabase.ts`, `supabase/`
- Contains: Client initialization, edge function for review data updates, database migration
- Tables: `review_data` (review statistics), `blog_posts` (blog content)

## Data Flow

**Review Data Flow:**
1. `useReviewData` hook queries Supabase `review_data` table
2. Falls back to Google Sheets API if Supabase returns no data
3. Falls back to hardcoded default (92 reviews, 5.0 rating) on error
4. Review counts are displayed in `ServicePageTemplate`, `Footer`, `Home`, location pages, and `SchemaMarkup`

**Lead Form Submission Flow:**
1. User fills multi-step form (Service -> Address -> Contact)
2. `useMultiStepForm` hook manages state, per-step validation, and submission
3. `useLeadTracking` captures UTM params, referrer, device type, session ID
4. On submit, form data + tracking data POSTed to n8n webhook at `https://n8n.whitflow.com/webhook/dte-form-submissions`
5. Success/error result shown on step 4

**Blog Content Flow:**
1. `Blog.tsx` queries Supabase `blog_posts` table for published posts
2. `BlogPost.tsx` fetches individual post by slug
3. Content stored as `content_html` (raw HTML rendered in browser)

**State Management:**
- No global state management library (no Redux, Zustand, Context, etc.)
- All state is local to components via `useState`
- Data fetching happens in individual components/hooks via `useEffect`

## Key Abstractions

**ServicePageTemplate:**
- Purpose: Standardized service page layout with hero, problem/promise, process steps, FAQs, proof section, lead form sidebar
- Location: `src/components/ServicePageTemplate.tsx`
- Pattern: Receives all content as props (`ServicePageProps` interface); each service page passes unique content to the same template
- Interface: `{ serviceName, slug, subheadline, metaDescription, keywords, problemPromise, whatWeDo, processSteps, faqs, relatedServices }`

**SchemaMarkup:**
- Purpose: Generates and injects Schema.org JSON-LD based on page type
- Location: `src/components/SchemaMarkup.tsx`
- Pattern: Accepts `type` prop (`home`, `service`, `faq`, `location`, `general`) and generates appropriate schemas (LocalBusiness, Service, FAQ, Breadcrumb, WebPage)
- Injects scripts into `document.head` via `useEffect`, cleans up on unmount

**SEO Component:**
- Purpose: Updates `<title>`, meta description, keywords, OG tags, canonical URL
- Location: `src/components/SEO.tsx`
- Pattern: DOM manipulation in `useEffect` — creates or updates meta tags directly since there is no SSR framework

**MultiStepLeadForm:**
- Purpose: 4-step lead capture wizard
- Location: `src/components/lead-form/MultiStepLeadForm.tsx`
- Pattern: Step-based form with `useMultiStepForm` hook managing current step, validation, and submission. Each step is a separate component receiving form state and callbacks as props.

## Entry Points

**Browser Entry:**
- Location: `index.html` -> `src/main.tsx`
- Triggers: Browser navigation to any URL
- Responsibilities: Mounts React app into `#root` div, loads global CSS (`src/index.css`)

**Routing Entry:**
- Location: `src/App.tsx`
- Triggers: All client-side navigation
- Responsibilities: Maps ~40 URL paths to page components, renders Navigation/Footer shell, handles redirects (e.g., `/home` -> `/`, `/team` -> `/services`)

**Supabase Edge Function:**
- Location: `supabase/functions/update-reviews/index.ts`
- Triggers: HTTP GET (read reviews) or POST (update reviews) from external webhook
- Responsibilities: CRUD operations on `review_data` table

**External Widget:**
- Location: `index.html` (script tag)
- Triggers: Page load
- Responsibilities: Loads Roofle roof-quote-pro slideout widget (`https://app.roofle.com/roof-quote-pro-widget.js`)

## Error Handling

**Strategy:** Graceful degradation with fallback defaults

**Patterns:**
- `useReviewData`: Three-tier fallback (Supabase -> Google Sheets -> hardcoded defaults). Errors logged to console, never shown to users.
- `useMultiStepForm`: 10-second timeout on webhook POST via `AbortController`. Shows error state on step 4 with retry option.
- Blog fetching: Errors logged to console; empty post list displayed on failure.
- No global error boundary component exists.

## Cross-Cutting Concerns

**Logging:** Console-only (`console.error` for data fetch failures). No structured logging or external error tracking.

**Validation:** Custom validators in `src/utils/formValidation.ts` — required field, email regex, 10-digit phone number. Applied per-step in `useMultiStepForm`.

**Authentication:** None. The site is fully public. Supabase RLS allows anonymous reads. Service role key used only in edge functions (server-side).

**SEO:** Every page uses `<SEO />` for meta tags and most use `<SchemaMarkup />` for structured data. Canonical URLs reference `https://www.dteroofingllc.com`.

**Responsive Design:** Tailwind responsive breakpoints (`md:`, `lg:`). Mobile-specific components: `MobileStickyCall.tsx` (sticky call button), mobile navigation menu, mobile bottom CTA bar on service pages.

---

*Architecture analysis: 2026-03-07*
