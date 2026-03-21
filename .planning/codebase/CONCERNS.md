# Codebase Concerns

**Analysis Date:** 2026-03-21

## Security Issues

**Exposed Supabase Credentials:**
- Issue: Supabase URL and anonymous API key are hardcoded in source code
- Files: `src/lib/supabase.ts`
- Impact: Keys are readable in compiled output, git history, and any public source code viewers. While anonymous keys have limited permissions, they enable unauthorized access patterns and should use environment variables
- Risk Level: High
- Fix approach: Move to environment variables (`.env.local`). Update Supabase initialization to read `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from import.meta.env. Regenerate keys if committed to public repos.

**Hardcoded Webhook URLs:**
- Issue: n8n webhook URLs are hardcoded in component files
- Files: `src/hooks/useMultiStepForm.ts`, `src/pages/Financing.tsx`
- Impact: Webhooks are public and network-observable. Changing endpoints requires code changes and redeploy. URL pattern reveals internal infrastructure (n8n backend at whitflow.com)
- Risk Level: Medium
- Fix approach: Extract to environment variables (`VITE_WEBHOOK_FORM_URL`, `VITE_WEBHOOK_FINANCING_URL`). Create a centralized webhook config module at `src/config/webhooks.ts`.

**No CSRF Protection:**
- Issue: Form submissions (webhook calls) have no CSRF tokens or request signing
- Files: `src/hooks/useMultiStepForm.ts` (line 107-112), `src/pages/Financing.tsx` (line 70-75)
- Impact: Forms can be forged and submitted from other domains; webhook endpoint is unprotected against replay attacks
- Risk Level: Medium
- Fix approach: Implement request signing (HMAC) using a shared secret, or add CSRF token validation on the n8n side. Restrict webhook endpoint by IP whitelist if possible.

**localStorage/sessionStorage Data Persistence:**
- Issue: Session ID and landing page stored in browser storage without expiration or validation
- Files: `src/hooks/useLeadTracking.ts` (lines 18-25, 28-35)
- Impact: SessionStorage can be accessed via XSS, tracking data could be manipulated by browser extensions or malicious scripts
- Risk Level: Low (non-sensitive data)
- Fix approach: Consider server-side session management instead. If client-side storage needed, add data validation and short expiration times.

## Tech Debt

**Duplicate Route Definitions:**
- Issue: Two separate routes for the same service (gutter-services and gutters)
- Files: `src/App.tsx` (lines 59-60)
- Impact: Confusing URL structure, duplicate content for SEO, maintenance burden
- Current state: Both `/services/gutter-services` and `/services/gutters` routes exist
- Fix approach: Consolidate to single route path. If both needed for backwards compatibility, use redirect (already used for /faqs → /faq pattern on line 72). Remove GutterServices.tsx or Gutters.tsx component.

**Repeated Form Validation Logic:**
- Issue: Form validation duplicated across multiple forms (lead form, financing form)
- Files: `src/hooks/useMultiStepForm.ts`, `src/pages/Financing.tsx` (both contain email/phone/name validation)
- Impact: Inconsistent error messages, bug fixes must be applied in multiple places, validation logic drift
- Fix approach: Consolidate validators into a shared validation module at `src/utils/formValidation.ts`. Create reusable FormErrors type. Both hooks/pages should import common validators.

**Repeated Webhook Submission Code:**
- Issue: Nearly identical fetch-with-timeout logic in two places
- Files: `src/hooks/useMultiStepForm.ts` (lines 88-127), `src/pages/Financing.tsx` (lines 48-85)
- Impact: Bug fixes, timeout changes, error handling improvements must be duplicated. Inconsistent behavior between forms.
- Fix approach: Create `src/utils/submitToWebhook.ts` utility function. Both hooks and pages should call this shared function.

**Hardcoded Timeout Value:**
- Issue: 10-second timeout hardcoded in two places (line 93 in useMultiStepForm, line 56 in Financing)
- Files: `src/hooks/useMultiStepForm.ts`, `src/pages/Financing.tsx`
- Impact: Timeout changes require code edits and redeploy. No flexibility for slow networks.
- Fix approach: Create `src/config/api.ts` with `FORM_SUBMISSION_TIMEOUT_MS = 10000`. Import in both files.

**Type Safety Issues:**
- Issue: `any` type used in SchemaMarkup component
- Files: `src/components/SchemaMarkup.tsx` (line 99: `const schema: any = {...}`)
- Impact: Loses TypeScript safety on schema objects. Bugs in schema structure won't be caught at compile time.
- Fix approach: Create `src/seo/schemaTypes.ts` with proper interfaces for Schema.org types (LocalBusiness, Organization, etc.). Replace `any` with specific types.

**Disabled ESLint Rule Without Justification:**
- Issue: react-hooks/exhaustive-deps disabled without explanation
- Files: `src/components/lead-form/MultiStepLeadForm.tsx` (line 47)
- Impact: Effect dependencies may be incomplete; component could fail to re-initialize when props change
- Current behavior: Service pre-selection only runs once (intentional), but dependency array suggests it should respond to defaultService changes
- Fix approach: Add comment explaining why dependency is intentionally omitted. Consider if this is the desired behavior (form should respond to page changes when visiting different service pages).

## Performance Bottlenecks

**Unoptimized Review Data Fetching:**
- Issue: Google Sheets API called via public gviz endpoint with complex parsing
- Files: `src/hooks/useReviewData.ts` (lines 53-56)
- Impact: Slow fallback if Supabase fails. String slicing magic number (47, -2) is fragile. No caching beyond component lifetime.
- Current approach: Try Supabase first, fall back to Google Sheets gviz endpoint
- Fix approach: Cache review data in localStorage with 1-hour TTL. Consider moving sheet parsing to a server function. Add timeout to Google Sheets fetch.

**Large Service/Location Page Files:**
- Issue: Multiple pages over 600 lines each
- Files: `src/pages/services/CommercialRoofing.tsx` (793 lines), `src/pages/services/Siding.tsx` (670 lines), `src/pages/Home.tsx` (645 lines)
- Impact: Slower to edit, higher cognitive load, component responsibilities unclear
- Fix approach: Break up large pages into smaller sub-components. Home.tsx could split into HeroSection.tsx, MissionSection.tsx, CarouselSection.tsx. Service pages already use template pattern (good), but template itself (`src/components/ServicePageTemplate.tsx`, 355 lines) could be split.

**No Image Lazy Loading:**
- Issue: All images (carousel, gallery, project photos) loaded eagerly
- Files: `src/components/WorkCarousel.tsx`, `src/pages/Gallery.tsx`, `src/data/projects.ts`
- Impact: Initial page load includes all image downloads even if not in viewport
- Fix approach: Add `loading="lazy"` to img tags. Consider using next/image equivalent for React or react-lazyload. Generate WebP variants and use srcset.

**No Code Splitting:**
- Issue: All routes bundled into single JavaScript file
- Files: `src/App.tsx` (all routes imported eagerly), vite.config.ts
- Impact: First page load includes JS for all services, locations, pages (40+ components)
- Fix approach: Use React Router lazy() for route splitting. Example: `const Services = lazy(() => import('./pages/Services'))`. Wrap in Suspense. This is critical for a 40+ route app.

## Fragile Areas

**Review Data Fallback Chain:**
- Files: `src/hooks/useReviewData.ts`
- Why fragile: Multiple fallback layers (Supabase → Google Sheets → hardcoded default). If Google Sheets API changes format, parsing fails silently and falls back to constant "92 reviews". No error boundary or user notification.
- Safe modification: Update parsing logic carefully with error logging. Test fallback behavior in isolation. Consider separating concerns into smaller functions (parseGoogleSheetResponse, mergeReviewSources).
- Test coverage gaps: No unit tests for fallback scenarios. Add tests for: Supabase unavailable, Google Sheets parsing fails, timeout scenario.

**Form Submission State Machine:**
- Files: `src/hooks/useMultiStepForm.ts` (lines 44-57)
- Why fragile: Multiple interrelated state variables (currentStep, direction, submitStatus, isSubmitting). No single source of truth for form state. Possible race conditions in async submit callback.
- Example: If user clicks submit while response pending, could enter invalid state (isSubmitting=false but currentStep=3)
- Safe modification: Consider useReducer instead of multiple useState. Define explicit state transitions. Add invariant checks.
- Test coverage gaps: No tests for rapid clicks, network retry behavior, timeout handling.

**Service Selection Mapping:**
- Files: `src/components/lead-form/MultiStepLeadForm.tsx` (lines 31-43)
- Why fragile: hardcoded serviceMap object maps URL slugs to form values. If service pages are added/renamed, map must be updated manually or service pre-selection fails silently.
- Example: New service "roof-cleaning" won't auto-select form service
- Safe modification: Generate map from a source of truth (services data structure). Or use a data attribute on service pages to specify form value.
- Test coverage gaps: No tests verifying all service routes have mappings.

**Webhook Endpoint Fragility:**
- Files: `src/hooks/useMultiStepForm.ts`, `src/pages/Financing.tsx`
- Why fragile: Hardcoded n8n endpoint URLs. If webhook URL changes, all forms break until code redeploy. No circuit breaker or graceful degradation.
- Current behavior: If webhook fails, user sees error screen but lead is lost
- Safe modification: Add retry logic with exponential backoff. Store failed submissions in localStorage temporarily. Add webhook health check.
- Test coverage gaps: No tests for webhook failures, network timeouts.

## Scaling Limits

**Single Webhook Endpoint Capacity:**
- Current setup: All form submissions hit `https://n8n.whitflow.com/webhook/dte-form-submissions`
- Limit: n8n free tier workflow execution limits (likely 500-1000/month). If marketing campaign succeeds, endpoint could be rate-limited.
- Scaling path: Implement submission queue system (localStorage → service worker → batched webhook calls). Add analytics to monitor submission volume. Consider upgrading n8n or using dedicated CRM API (HubSpot, Pipedrive).

**Supabase Connection Pool:**
- Current usage: Review data fetching in useReviewData
- Limit: Supabase free tier allows limited concurrent connections
- Scaling path: Cache review data on client/CDN. Move blog queries to server-side rendering or static generation. Use Supabase replication for read replicas if production volume increases.

**Image Asset Management:**
- Current approach: All images in `/public/images/` served statically
- Limit: No image optimization, no CDN, no adaptive sizing
- Scaling path: Implement image optimization pipeline (convert to WebP, generate multiple sizes). Deploy images to CDN (Vercel, Cloudflare). Use srcset for responsive images.

## Dependencies at Risk

**Embla Carousel Dependency Chain:**
- Package: embla-carousel-react 8.6.0, embla-carousel-autoplay 8.6.0
- Risk: Two separate carousel libraries for same feature (WorkCarousel.tsx). If Embla API changes, requires migration effort.
- Usage: `src/components/WorkCarousel.tsx` uses Embla
- Impact: Carousel breaks on major version upgrade if API changes
- Migration path: Already using modern Embla API. Consider consolidating if multiple carousels exist in future. Embla is actively maintained (low risk).

**Supabase SDK Coupled to Client Code:**
- Package: @supabase/supabase-js 2.57.4
- Risk: SDK imported directly in components/hooks. If SDK major version changes, affects many files.
- Files: `src/lib/supabase.ts`, `src/hooks/useReviewData.ts`
- Impact: Breaking SDK upgrade could require refactoring across codebase
- Migration path: Isolate Supabase usage to `src/lib/supabase.ts` only. All other code should use custom data-fetching hooks. This decouples business logic from SDK.

## Missing Critical Features

**No Error Boundary:**
- Problem: No error boundary component to catch React component errors
- Blocks: If any page component throws during render, entire app crashes with white screen
- Impact: Runtime errors propagate to user, no fallback UI
- Recommendation: Create `src/components/ErrorBoundary.tsx` using class component. Wrap App component with it. Log errors to monitoring service.

**No Loading States for Async Data:**
- Problem: useReviewData returns loading=true but not used in Display components
- Files: Components using review data don't show loading skeleton or placeholder
- Blocks: User sees "92 reviews" suddenly appear; jarring UX
- Fix: Add loading UI in Review components. Use React Suspense or manual loading states.

**No Monitoring/Analytics:**
- Problem: Form submissions, errors, and user interactions have no observability
- Files: All form submission catches errors but only log to console
- Blocks: Can't detect patterns of failed submissions, slow webhooks, or high error rates
- Recommendation: Add error tracking (Sentry) and analytics (Plausible). Send errors/events to external service.

**No Offline Support:**
- Problem: Forms lose data if network drops before submission
- Impact: Users must re-enter form data
- Fix approach: Add service worker to cache form state. Implement submission queue that retries when offline.

## Missing Test Coverage

**Form Submission Logic:**
- What's not tested: Webhook error scenarios, timeout handling, retry logic, race conditions
- Files: `src/hooks/useMultiStepForm.ts`
- Risk: Silent failures in form submission could go unnoticed. User submits form, gets error, tries again, data duplicated or lost.
- Priority: High (core business flow)

**Validation Rules:**
- What's not tested: Edge cases in phone/email validation (international formats, special chars)
- Files: `src/utils/formValidation.ts`
- Risk: Users with unusual but valid phone formats (extensions, +1 country code) get rejected
- Priority: Medium

**Review Data Fetching:**
- What's not tested: Supabase failure, Google Sheets parsing edge cases, timeout scenarios
- Files: `src/hooks/useReviewData.ts`
- Risk: Silent fallback to hardcoded "92 reviews" masks real data fetch failures
- Priority: Medium

**Service Page Template:**
- What's not tested: Config validation, missing FAQ sections, null schema data
- Files: `src/components/ServicePageTemplate.tsx`
- Risk: Missing config properties could cause layout shifts or broken schema markup
- Priority: Low (component is simple template)

**SEO Meta Tags:**
- What's not tested: Meta tags actually injected into DOM, canonical URLs correct
- Files: `src/components/SEO.tsx`
- Risk: SEO improvements won't be effective if meta tags not properly rendered
- Priority: Medium (critical for business goals)

**Route Mapping (Pre-selection):**
- What's not tested: All 40+ service/location routes have correct service pre-selection
- Files: `src/components/lead-form/MultiStepLeadForm.tsx` serviceMap
- Risk: Users visiting some service pages see wrong pre-selected service in form
- Priority: Medium

---

*Concerns audit: 2026-03-21*
