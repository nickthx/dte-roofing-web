# Codebase Concerns

**Analysis Date:** 2026-03-21

## Tech Debt

**Hardcoded Supabase Credentials:**
- Issue: Supabase client configuration exposes API keys and credentials directly in source code
- Files: `src/lib/supabase.ts`
- Impact: Security vulnerability; API keys visible in version control and public repositories
- Fix approach: Move credentials to environment variables (.env); use import.meta.env for Vite-based configuration
- Severity: **HIGH** - Security risk

**Hardcoded External API URLs:**
- Issue: Google Sheets API URL hardcoded in review data fetching logic
- Files: `src/hooks/useReviewData.ts` (line 53)
- Impact: Difficult to test, brittle dependency on specific Google Sheets document ID; URL exposed in bundle
- Fix approach: Move to environment configuration with proper error handling fallback
- Severity: **MEDIUM** - Maintainability and fragility

**Large Monolithic Page Components:**
- Issue: Location and service pages exceed 400-700 lines each without component decomposition
- Files:
  - `src/pages/services/CommercialRoofing.tsx` (793 lines)
  - `src/pages/services/Siding.tsx` (670 lines)
  - `src/pages/services/RoofInstallation.tsx` (668 lines)
  - `src/pages/Home.tsx` (630 lines)
  - All 13 location pages average 500+ lines each
- Impact: Reduced readability, difficult testing, poor component reusability, bloated bundle size
- Fix approach: Extract shared sections (hero, FAQ, services list, testimonials) into reusable components; create location/service data-driven page factory
- Severity: **MEDIUM** - Code organization and maintainability

**Code Duplication Across 13 Location Pages:**
- Issue: All location pages (Dublin, Hilliard, New Albany, etc.) share identical structure with only data differences
- Files: `src/pages/locations/*.tsx` (6,221 total lines duplicated)
- Impact: Maintenance nightmare—every change to structure requires editing 13 files; inconsistent updates; testing burden
- Fix approach: Create reusable LocationPageTemplate component or factory function; move location-specific data to `src/data/locations.ts`
- Severity: **HIGH** - Maintainability and scalability

**Inline Magic Numbers and Hardcoded Strings:**
- Issue: Business details, phone numbers, addresses, rating numbers scattered throughout components
- Files: `src/pages/Home.tsx`, all service pages, all location pages
- Impact: Single source of truth violations; difficult to update company info globally
- Fix approach: Centralize constants in `src/data/company.ts` (address, phone, hours, ratings); import everywhere needed
- Severity: **MEDIUM** - Maintainability

## Known Bugs

**Review Data Fallback Behavior:**
- Symptoms: If Supabase query fails AND Google Sheets fetch fails, defaults to hardcoded 92 reviews and 5.0 rating
- Files: `src/hooks/useReviewData.ts` (lines 69-79)
- Trigger: Network outage, Google Sheets API changes, Supabase connection failure
- Impact: Stale review counts displayed; users see outdated information
- Current state: Error silently swallowed, error flag set but UI doesn't respond to it
- Fix approach: Add explicit error handling UI; log errors for monitoring; consider caching with expiration timestamps

**Missing Accessibility Attributes:**
- Symptoms: Images lack comprehensive alt text; icons lack aria-labels; landmark roles missing
- Files: All pages, especially `src/pages/Home.tsx`, location pages
- Impact: Screen reader users cannot navigate effectively; fails WCAG 2.1 AA compliance; SEO impact
- Trigger: Automated accessibility scanning tools; real user testing with screen readers
- Fix approach: Audit all images for descriptive alt text; add aria-labels to interactive elements; use proper heading hierarchy

**Inconsistent Environment Configuration:**
- Symptoms: Some parts use hardcoded URLs, others expect environment variables; mixed patterns
- Files: `src/lib/supabase.ts`, `src/hooks/useReviewData.ts`, `src/seo/constants.ts`
- Impact: Production deployment confusion; difficult environment promotion
- Fix approach: Create unified config system using .env.example template

## Security Considerations

**Exposed API Keys in Repository:**
- Risk: Supabase anonymous key visible in `src/lib/supabase.ts`; accessible to anyone with repo access
- Files: `src/lib/supabase.ts` (lines 3-4)
- Current mitigation: Relying on Supabase's row-level security policies; anonymous key restricted to public tables only
- Recommendations:
  1. Immediately move to environment variables
  2. Rotate exposed keys in Supabase dashboard
  3. Add `.env` to `.gitignore` (verify it exists)
  4. Implement GitHub secret scanning
  5. Consider using Supabase client with server-side auth for sensitive operations

**Client-Side Data Exposure:**
- Risk: All dynamic data (review counts, company info, pricing) exposed in client JavaScript
- Files: All component files
- Current mitigation: Read-only operations; no authentication required for public data
- Recommendations: This is acceptable for public-facing data but ensure no sensitive business logic in client code

**Google Sheets API Dependency:**
- Risk: Direct public access to Google Sheets via query URL; could be throttled or blocked
- Files: `src/hooks/useReviewData.ts` (line 53)
- Current mitigation: Supabase fallback when sheets API unavailable
- Recommendations: Consider private API endpoint instead; implement rate limiting

## Performance Bottlenecks

**Large Bundle Size from Duplicated Page Content:**
- Problem: 6,221 lines across 13 location pages creates ~700KB+ of duplicate code in production build
- Files: All location pages in `src/pages/locations/`
- Cause: No component extraction; full page code duplicated per location
- Impact:
  - Slower initial page load for users visiting multiple location pages
  - Larger main bundle JavaScript
  - Increased CPU usage during build
- Improvement path:
  1. Extract common layout into `LocationPageTemplate` component
  2. Move data to `src/data/locations.ts` as array of location config objects
  3. Use factory/template pattern to generate pages dynamically
  4. Target: Reduce deployed code by 70-80%

**Inefficient Review Data Fetching:**
- Problem: Google Sheets API call happens on every page load; no caching
- Files: `src/hooks/useReviewData.ts`
- Cause: Hook called in multiple pages; Google JSON query runs every render
- Impact: Network request per page visit; slow Time to First Byte on location pages
- Improvement path:
  1. Add localStorage caching with 24-hour expiration
  2. Consider using Context API to share review data app-wide (fetch once)
  3. Implement service worker for offline-capable caching

**No Image Optimization:**
- Problem: Project images in carousel likely not optimized or lazy-loaded
- Files: `src/components/WorkCarousel.tsx`, `src/data/projects.ts`
- Impact: Large uncompressed images; slow initial carousel render
- Improvement path:
  1. Implement Next.js Image component equivalent or Vite image plugin
  2. Add lazy loading to carousel items
  3. Use webp format with fallbacks

## Fragile Areas

**Review Data Hook (useReviewData):**
- Files: `src/hooks/useReviewData.ts`
- Why fragile:
  - Depends on external Google Sheets endpoint that could change without notice
  - JSON parsing fragile (line 55 magic slice `[47, -2]` is brittle)
  - No validation of response structure
  - Silent fallback masks real errors
- Safe modification:
  - Add explicit error types and logging
  - Parse response defensively
  - Add schema validation (zod/yup)
  - Test with network conditions (throttling, timeouts)
- Test coverage: Likely none; needs unit tests for parsing logic

**SEO Components (SEO, SchemaMarkup):**
- Files: `src/components/SEO.tsx`, `src/components/SchemaMarkup.tsx`, `src/components/seo/SeoSchema.tsx`
- Why fragile:
  - Hardcoded schema formats that must match Google's specifications exactly
  - No validation of structured data against schema.org
  - Multiple conflicting schema implementations (different pattern in different files)
  - Missing some critical schema types
- Safe modification:
  - Validate output with Google Rich Results Test after changes
  - Consolidate schema generation to single source
  - Add schema validation library
- Test coverage: No test files detected; should add schema validation tests

**Location Page Generator Pattern (or lack thereof):**
- Files: All 13 location pages: `src/pages/locations/{City}.tsx`
- Why fragile:
  - Each page manually maintains identical structure
  - Changes to layout require 13 edits
  - Easy to accidentally break one location page's layout
  - Inconsistent data structures lead to bugs
- Safe modification:
  - Create LocationPageTemplate component first
  - Create location data config objects
  - Gradually refactor each page to use template
  - Run visual regression tests before/after

**Multi-Step Lead Form:**
- Files: `src/components/lead-form/MultiStepLeadForm.tsx`, all step components
- Why fragile:
  - Form state management spans 5+ files
  - useMultiStepForm hook holds mutable state
  - No validation schema; business logic scattered
  - No persistence between page navigation (loses form data on back button)
- Safe modification:
  - Add form validation library (zod/yup)
  - Implement session storage persistence
  - Consider moving to React Hook Form for better state management
- Test coverage: Form lacks integration tests; should test happy path and error states

## Scaling Limits

**Static Location Pages (13 cities):**
- Current capacity: Hardcoded support for exactly 13 Ohio cities
- Limit: Adding new cities requires manual page creation + routing + navigation updates
- Scaling path:
  1. Move locations to database table or config file
  2. Create dynamic routing in App.tsx
  3. Update navigation to loop through locations array
  4. Use LocationPageTemplate to reduce maintenance

**Review Data from Google Sheets:**
- Current capacity: Single Google Sheets document; manual updates required
- Limit: Google's query API has rate limits; Sheets not designed for this use case
- Scaling path:
  1. Move review data to Supabase table (already partially set up)
  2. Implement backend API to fetch/update reviews
  3. Set up scheduled job to sync from Google Reviews API if available

**Import Statements Explosion:**
- Current state: `src/App.tsx` imports all 13 location pages explicitly (lines 27-39)
- Limit: Every new location requires code change + build; difficult to scale
- Scaling path:
  1. Implement dynamic imports for lazy loading
  2. Use route-based code splitting automatically via build tool
  3. Consider data-driven route generation

## Dependencies at Risk

**Supabase Integration (Partial):**
- Risk: Mixed usage—review data table exists but not fully utilized; configuration exposed
- Current usage: `src/lib/supabase.ts` created but only used in `useReviewData` hook
- Impact: Unused dependency increases bundle; suggests incomplete migration or unclear architecture
- Migration plan:
  1. Either fully commit to Supabase for all backend operations
  2. Or remove and replace with simpler solution (e.g., internal JSON API)
  3. Audit what data Supabase should own (reviews, forms submissions, etc.)

**Google Sheets API (Unofficial):**
- Risk: Using unofficial Google Visualization API query endpoint; could break with API changes
- Current usage: Review data fetching in `useReviewData` hook
- Impact: Site breaks if Google changes endpoint or rate limits requests
- Migration plan:
  1. Migrate to official Google Sheets API with service account
  2. Or move data to proper backend database
  3. Implement API layer to abstract from frontend

**Embla Carousel (Limited Testing):**
- Risk: Carousel is new addition; potential edge cases in mobile, keyboard navigation, accessibility
- Current usage: `src/components/WorkCarousel.tsx` with autoplay plugin
- Impact: Gallery carousel could break on certain devices/browsers
- Mitigation: Add automated tests for carousel on different viewport sizes

## Missing Critical Features

**Error Boundaries:**
- Problem: No React error boundaries; component errors crash entire app
- Blocks: Robust production deployment
- Recommendation: Add error boundary wrapper around major route sections

**Analytics & Conversion Tracking:**
- Problem: No analytics integration detected; can't track form submissions or page visits
- Blocks: Measuring lead generation effectiveness
- Recommendation: Integrate Google Analytics 4 or Segment

**Form Submission Backend:**
- Problem: Lead form components exist but unclear where submissions go
- Files: `src/components/lead-form/MultiStepLeadForm.tsx`
- Blocks: Actually collecting leads
- Recommendation: Implement backend endpoint and form submission handler

**Email Notifications:**
- Problem: No email service integrated for form notifications
- Blocks: Team notification of new leads
- Recommendation: Integrate SendGrid, AWS SES, or similar

**Production Build Optimization:**
- Problem: No evidence of minification, tree-shaking, or bundle analysis
- Blocks: Performance on slower connections
- Recommendation: Verify Vite production build settings

## Test Coverage Gaps

**No Test Files Detected:**
- What's not tested: All business logic, components, hooks, utilities
- Files: No .test.ts, .spec.ts, .test.tsx, .spec.tsx files found in repo
- Risk:
  - Refactoring could break layouts without detection
  - Component prop changes could break child renders
  - Hook state changes could cause silent failures
  - Data transformations in useReviewData could silently fail
- Priority: **HIGH** - Any future refactoring (especially location page extraction) needs test coverage

**Missing Component Tests:**
- What's not tested:
  - ServicePageTemplate rendering with different props
  - LocationPageTemplate (to be created) structure
  - Lead form state transitions and validation
  - Review data hook parsing and error handling
  - Navigation component active state
- Recommendation: Set up vitest or Jest; create test files for:
  1. All custom hooks
  2. Reusable components (ServicePageTemplate, etc.)
  3. Utility functions (form validation, data transformations)
  4. API integration logic (Supabase, Google Sheets)

**Missing Integration Tests:**
- What's not tested:
  - Multi-step form completion end-to-end
  - Navigation flow through location pages
  - SEO/Schema markup correctness
- Recommendation: Use Playwright or Cypress for critical user journeys

**Missing E2E Tests:**
- What's not tested: Form submission to backend; complete lead capture flow
- Blocks: Confident production deployment

---

*Concerns audit: 2026-03-21*
