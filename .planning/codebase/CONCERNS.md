# Codebase Concerns

**Analysis Date:** 2026-03-21

## Tech Debt

### Hardcoded Supabase and Webhook Credentials (High Impact)

**Issue:** API credentials embedded directly in source files without environment variable protection.

**Files:**
- `src/lib/supabase.ts` (lines 3-4) - Supabase URL and anonymous key hardcoded
- `src/hooks/useMultiStepForm.ts` (line 17) - n8n webhook URL hardcoded
- `src/pages/Financing.tsx` (line 7) - n8n webhook URL hardcoded

**Impact:** Credentials exposed in version control and client bundle. If keys are rotated or endpoints change, code must be redeployed. Secrets accessible to frontend inspection. Cannot easily separate dev/staging/production environments.

**Fix approach:**
1. Move all credentials to Vite environment variables (`.env`, `.env.production`)
2. Update `src/lib/supabase.ts` to read from `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY`
3. Update webhook URLs in `useMultiStepForm.ts` and `Financing.tsx` to read from `import.meta.env.VITE_WEBHOOK_URL` and `import.meta.env.VITE_FINANCING_WEBHOOK_URL`
4. Document required env vars in `.env.example`

---

### Unsafe HTML Rendering in Blog Posts (Security Risk)

**Issue:** User-generated HTML from Supabase rendered directly with `dangerouslySetInnerHTML` without sanitization.

**Files:** `src/pages/BlogPost.tsx` (line 154)

**Problem:**
```typescript
<div dangerouslySetInnerHTML={{ __html: post.content_html }} />
```

If blog content in Supabase `blog_posts.content_html` is ever compromised or edited by untrusted users, XSS attacks become possible. No HTML validation or sanitization before rendering.

**Current Mitigation:** Content is stored server-side in Supabase, reducing risk but not eliminating it.

**Fix approach:**
1. Install `dompurify` or `sanitize-html` package
2. Sanitize content before rendering: `DOMPurify.sanitize(post.content_html)`
3. Consider using a Markdown-to-React library instead of raw HTML if blog structure allows
4. Document content creation security guidelines for admin/editors

---

### Missing Environment Configuration File (Deployment Risk)

**Issue:** No `.env.example` or environment setup documentation for developers/deployment.

**Files:** Root directory lacks `.env.example`

**Impact:** New developers don't know what env vars are required. Deployment to production fails silently if vars are missing. CI/CD pipelines cannot auto-configure.

**Fix approach:**
1. Create `.env.example` with placeholders:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...
   VITE_WEBHOOK_URL=https://n8n.whitflow.com/webhook/dte-form-submissions
   VITE_FINANCING_WEBHOOK_URL=https://n8n.whitflow.com/webhook/dte-financing-submissions
   ```
2. Update deployment docs to require copying `.env.example` → `.env.local`
3. Add env validation on app startup with helpful error messages

---

### Placeholder TODO in Production UI (Data Integrity Risk)

**Issue:** "Photo coming soon" placeholders in service page galleries indicate incomplete feature in production.

**Files:** `src/components/ServicePageTemplate.tsx` (line 192)

**Problem:** All service pages using the template display three placeholder image boxes with "📷 Photo coming soon". This appears unfinished and hurts credibility. Users see incomplete content.

**Fix approach:**
1. Either add real project photos to `/public/images/` and pass them via `ServicePageProps`
2. Or remove the gallery section entirely from template and conditionally render only if `photos` prop is provided
3. Update all service pages to include actual project image paths

---

## Known Bugs

### Review Data Fallback Masking Real Issues (Low Impact but Problematic)

**Issue:** When review data fails to load, fallback hardcoded value (92 reviews, 5.0 rating) is used silently.

**Files:** `src/hooks/useReviewData.ts` (lines 71-79)

**Problem:**
```typescript
catch (err) {
  console.error('Failed to load reviews:', err);
  setError(true);
  setLoading(false);
  setReviewData({
    totalReviews: DEFAULT_REVIEW_COUNT,  // 92 - hardcoded fallback
    averageRating: 5.0,
    ratingBreakdown: { 5: DEFAULT_REVIEW_COUNT, 4: 0, 3: 0, 2: 0, 1: 0 },
    // ...
  });
}
```

Errors are logged but component renders stale/potentially false data. If Supabase is down, users see "92 reviews" when the real count may be different. No visual indication that data is outdated.

**Trigger:** Supabase connection loss, bad query, Google Sheets API timeout, network error

**Fix approach:**
1. Pass `error` state from hook to component consumers
2. Display a subtle notice: "Review data temporarily unavailable"
3. Consider caching review data in localStorage with TTL to serve stale-but-recent data instead of 92
4. Add monitoring/alerting for review data fetch failures

---

### Phone Number Format Inconsistency (Cosmetic)

**Issue:** Phone input accepts `(614)-555-0123` format but contact form payload and webhook may not handle formatting consistently.

**Files:**
- `src/components/lead-form/steps/StepContact.tsx` (line 45)
- `src/utils/formatPhone.ts` (assumed - not verified but imported)

**Problem:** Form field applies `formatPhoneNumber()` transform with `maxLength={14}` assuming format like `(614)-555-0123`. If backend n8n webhook expects unformatted `6145550123`, parsing may fail silently. Different form fields (lead form vs financing form) might apply different formatting.

**Fix approach:**
1. Standardize on one phone format (recommended: unformatted `10-digit` for storage, formatted for display)
2. Strip formatting before submitting to webhook: `phone: formData.phone.replace(/\D/g, '')`
3. Document expected phone format in webhook endpoint

---

## Security Considerations

### Exposed Webhook URLs Allow Form Spam (Medium Risk)

**Issue:** n8n webhook URLs are visible in frontend code and bundled JavaScript.

**Files:**
- `src/hooks/useMultiStepForm.ts` (line 17)
- `src/pages/Financing.tsx` (line 7)

**Risk:** Any bot/attacker can directly POST to webhook endpoints, flooding n8n with fake leads. No rate limiting on client side.

**Current Mitigation:** n8n may have its own rate limiting; URL is difficult to guess but not secret.

**Fix approach:**
1. Implement rate limiting in frontend: track submissions per session, show cooldown if too many in short time
2. Add reCAPTCHA v3 to form submission to block automated attacks
3. Add webhook authentication: sign requests with a client secret (n8n can verify)
4. Monitor n8n webhook logs for unusual submission patterns

---

### Geolocation and Device Tracking in Leads (Privacy Concern)

**Issue:** Tracking hook collects extensive user fingerprint data without explicit consent.

**Files:** `src/hooks/useLeadTracking.ts` (lines 50-63)

**Collected Data:**
- Screen resolution, device type, user agent, session ID
- Referrer, UTM parameters, landing page, page title
- Session timing data

**Problem:** Privacy policy may not mention this collection. GDPR/CCPA may require explicit opt-in before form submission. User agent and screen resolution combination can uniquely identify users.

**Fix approach:**
1. Add privacy notice on contact forms: "We collect usage data to improve your experience"
2. Verify terms of service and privacy policy cover this tracking
3. Consider reducing tracked data to only: utm_source, referrer, landing_page (remove device fingerprinting unless necessary)
4. Add user consent checkbox or link to privacy policy before form submission

---

## Performance Bottlenecks

### Large Location Pages with Repeated Content (Bundle Size, Render Performance)

**Issue:** 10 location pages (Hilliard, Dublin, Columbus, etc.) are nearly identical with only location-specific text and SEO changes. Each is 480-500+ lines of nearly duplicate code.

**Files:**
- `src/pages/locations/Hilliard.tsx` (487 lines)
- `src/pages/locations/Dublin.tsx` (504 lines)
- `src/pages/locations/NewAlbany.tsx` (500 lines)
- And 7 more similar pages
- Total: ~6200+ lines of duplicated location page code

**Impact:**
- Increases bundle size significantly (same JSX duplicated 10x)
- Harder to maintain: changes to location page layout require updates in all 10 files
- Slow initial load if users visit multiple location pages

**Fix approach:**
1. Create `src/pages/LocationPageTemplate.tsx` similar to `ServicePageTemplate.tsx`
2. Move all layout/structure to template; accept `locationData` prop with location-specific fields (name, description, services, FAQs)
3. Create `src/data/locations.ts` with array of location configs
4. Generate dynamic routes in `App.tsx` using a loop instead of hardcoding 10 Route elements
5. Example:
   ```typescript
   const locations = [
     { slug: 'hilliard', name: 'Hilliard', description: '...', ... },
     { slug: 'dublin', name: 'Dublin', description: '...', ... },
   ];

   locations.map(loc => (
     <Route
       key={loc.slug}
       path={`/locations/${loc.slug}`}
       element={<LocationPageTemplate locationData={loc} />}
     />
   ))
   ```

---

### Synchronous Review Data Fetch on Every Page Load (Network Latency)

**Issue:** `useReviewData` hook fetches review data from Supabase/Google Sheets on every component that uses it.

**Files:** `src/hooks/useReviewData.ts` (line 25)

**Problem:** Multiple components call this hook:
- Home.tsx
- ServicePageTemplate.tsx (used by 12+ service pages)
- Location pages (10 pages)
- Gallery, Reviews, etc.

Each component that mounts triggers a new fetch. No caching across pages. If Google Sheets is slow, page load blocks.

**Fix approach:**
1. Cache review data in localStorage with TTL (e.g., 1 hour)
2. Use Context API or global state to share fetched data across all components
3. Fetch on app mount (in App.tsx) instead of per-component
4. Add stale-while-revalidate: serve cached data immediately, fetch fresh data in background
5. Example:
   ```typescript
   // App.tsx
   useEffect(() => {
     // Fetch once on app startup
     fetchReviewData();
   }, []);

   // Then provide via context
   <ReviewDataContext.Provider value={reviewData}>
     <Routes>...</Routes>
   </ReviewDataContext.Provider>
   ```

---

## Fragile Areas

### Form Validation Spread Across Multiple Locations (Maintenance Fragility)

**Issue:** Form validation logic duplicated and spread across multiple files without DRY pattern.

**Files:**
- `src/hooks/useMultiStepForm.ts` - `stepValidators` for multi-step form
- `src/pages/Financing.tsx` - inline `validate()` function with nearly identical logic
- `src/utils/formValidation.ts` - utility validators
- Each form step has its own validation calls

**Problem:** If validation rules change (e.g., phone number format, required fields), must update multiple places. Easy to introduce inconsistency between forms.

**Safe modification:**
1. Create centralized `formValidationRules.ts`:
   ```typescript
   export const VALIDATION_RULES = {
     name: { required: true, minLength: 2 },
     email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
     phone: { required: true, minLength: 10 },
   };
   ```
2. Both `useMultiStepForm` and Financing form import and use the same rules
3. Test coverage: 100% of validation rules should have unit tests

---

### Service Page Content Hard-coded in Each File (Content Update Risk)

**Issue:** Service page content (FAQs, process steps, descriptions) is hard-coded in each service file.

**Files:** All files in `src/pages/services/` (RoofRepair.tsx, RoofInstallation.tsx, etc.)

**Problem:**
- To update FAQ text shared across services, must edit multiple files
- Content marketing team cannot update content without developer
- No A/B testing or versioning of content

**Safe modification:** Consider future refactor:
1. Move service content to `src/data/services/` as data files
2. Example: `src/data/services/roofRepair.ts`:
   ```typescript
   export const roofRepairConfig = {
     serviceName: 'Roof Repair',
     slug: 'roof-repair',
     faqs: [{ question: '...', answer: '...' }],
     processSteps: [...],
   };
   ```
3. Service pages become thin wrappers that import config and pass to `ServicePageTemplate`
4. Allows non-developers to edit content in data files

---

### AbortController Timeout Not Guaranteed to Prevent Hanging Requests (Minor Reliability)

**Issue:** 10-second timeout on webhook requests may not always prevent hung requests in slow networks.

**Files:**
- `src/hooks/useMultiStepForm.ts` (lines 92-93)
- `src/pages/Financing.tsx` (lines 55-56)

**Code:**
```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 10000);
```

**Problem:** If network is extremely slow, even abort may not prevent the browser from hanging briefly. 10 seconds is long for user to wait with no feedback.

**Fix approach:**
1. Add user-facing timeout message: "Request taking longer than expected..."
2. Consider shorter timeout (5 seconds) with retry option
3. Add loading state that shows estimated time: "Submitting... (timeout in 5s)"
4. Log timeout events for monitoring

---

## Test Coverage Gaps

### No Unit Tests for Form Validation (High Priority)

**Issue:** Form validation logic exists but has no test coverage.

**Files:**
- `src/utils/formValidation.ts` - utility validators
- `src/hooks/useMultiStepForm.ts` - step validators

**Untested Functionality:**
- Email validation edge cases (spaces, special chars, very long addresses)
- Phone number validation (international formats, non-numeric)
- Required field detection
- Error message formatting

**Risk:** Bug in validation could cause forms to fail silently or allow invalid data.

**Priority:** High - validation is critical path for lead generation

---

### No Integration Tests for Lead Form Submission (High Priority)

**Issue:** Multi-step form submission to webhook is not tested end-to-end.

**Files:** `src/hooks/useMultiStepForm.ts`, `src/components/lead-form/MultiStepLeadForm.tsx`

**Untested Scenarios:**
- Form submission success flow
- Network error handling (webhook unreachable)
- Timeout scenarios
- Invalid form state submission blocked
- Retry flow after error

**Risk:** Form could silently fail to submit leads; users think they submitted but no lead reaches sales.

**Priority:** High - directly impacts revenue

---

### No Tests for Review Data Hook Fallback (Medium Priority)

**Issue:** `useReviewData` hook error handling and fallback logic is untested.

**Files:** `src/hooks/useReviewData.ts`

**Untested Scenarios:**
- Supabase fetch failure (fallback to Google Sheets)
- Google Sheets fetch failure (fallback to hardcoded 92)
- Invalid data format from either source
- Cache invalidation

**Risk:** If real review data fails to load, fake data could be served to customers.

---

### No Tests for Environment-Dependent Code (Medium Priority)

**Issue:** Hooks and components that access `window`, `localStorage`, `sessionStorage` are not tested.

**Files:**
- `src/hooks/useLeadTracking.ts` - uses `window.location`, `sessionStorage`, `window.innerWidth`
- `src/components/ScrollToTop.tsx` - uses `window.scrollTo`

**Risk:** Changes to tracking or scroll logic could break without test verification.

---

## Scaling Limits

### Session ID Storage Using SessionStorage (Low Risk, Single-Server Safe)

**Issue:** Session ID stored in `sessionStorage` (client-side only) for lead tracking.

**Files:** `src/hooks/useLeadTracking.ts` (lines 18-25)

**Problem:** If user opens multiple tabs/windows, each gets a different session ID. If user switches devices or clears storage, session ID is lost. Analytics won't correlate the same user across sessions.

**Current Capacity:** Works fine for current volume (single-tab typical usage).

**Scaling Path:** If analytics become critical:
1. Move to server-side session management (cookies + backend session store)
2. Use persistent user ID (email/phone from form)
3. Track with Google Analytics or Segment instead of custom session ID

---

### Hardcoded Route Limits (Route Configuration Scalability)

**Issue:** App.tsx contains 40+ hardcoded Route elements and imports. No dynamic route generation.

**Files:** `src/App.tsx` (lines 50-93)

**Problem:** Adding a new service or location page requires:
1. Create new file in `src/pages/services/` or `src/pages/locations/`
2. Import it in `App.tsx`
3. Add Route element in Routes

**Current Capacity:** ~50 routes (reasonable). If adding 50+ more routes, file becomes unmaintainable.

**Scaling Path:**
1. Use dynamic route generation with metadata files (see location page suggestion above)
2. Consider file-based routing plugin (Vite has options) to auto-generate routes

---

## Dependencies at Risk

### Google Sheets as Backend (Fragility Risk)

**Issue:** Review data falls back to parsing Google Sheets JSON API response.

**Files:** `src/hooks/useReviewData.ts` (lines 53-55)

**Code:**
```typescript
const res = await fetch('https://docs.google.com/spreadsheets/d/1ZZ3-sLfyRXhls8tPGe6hxK_W5vEfkO0XnHCxbwBNtCY/gviz/tq?tqx=out:json&range=A2:D2');
const text = await res.text();
const parsed = JSON.parse(text.slice(47, -2));
```

**Risk:**
- String slicing `text.slice(47, -2)` is fragile; if API response changes, parsing breaks
- Google Sheets API is undocumented and unsupported by Google
- Spreadsheet ID is hardcoded; if sheet is deleted/moved, fetches fail
- No error handling for parsing failures

**Fix approach:**
1. Rely on Supabase as primary source (not fallback)
2. If fallback is necessary, use supported API (e.g., Airtable, Firebase)
3. Add try-catch around JSON.parse with error logging
4. Document expected spreadsheet format and structure

---

### Embla Carousel ESLint Exclusion (Hidden Dependency)

**Issue:** `lucide-react` is excluded from Vite optimizeDeps but included in bundle.

**Files:** `vite.config.ts` (line 8)

**Code:**
```typescript
optimizeDeps: {
  exclude: ['lucide-react'],
},
```

**Problem:** Exclusion suggests lucide-react has compatibility issues with Vite optimization. This is unusual and could indicate:
- Older/incompatible package version
- Tree-shaking not working properly
- Increased bundle size

**Fix approach:**
1. Verify reason for exclusion (check git history or comments)
2. Try removing exclusion and run bundle size analysis
3. If lucide-react is causing issues, consider alternative icon library (react-icons, heroicons)
4. Update lucide-react to latest version

---

## Missing Critical Features

### No Form Submission Confirmation Email (Lead Verification)

**Issue:** When user submits contact/lead form, no confirmation email is sent to user.

**Files:** `src/hooks/useMultiStepForm.ts`, `src/pages/Financing.tsx`

**Problem:** User doesn't know if form actually submitted. If webhook silently fails, user has no indication. No way to verify user's email is correct.

**Fix approach:**
1. After successful form submission, trigger confirmation email
2. Update n8n webhook to send email on receipt
3. Or add backend endpoint to send confirmation via `nodemailer` or Sendgrid
4. Include in email: summary of submitted info, lead ID, next steps

---

### No Rate Limiting on Form Submissions (Lead Quality Risk)

**Issue:** User can submit the same form repeatedly with no throttling or CAPTCHA.

**Files:** `src/hooks/useMultiStepForm.ts`, `src/pages/Financing.tsx`

**Problem:** Bots can flood webhook with fake leads. Same user can submit same form 100 times. No way to deduplicate leads.

**Fix approach:**
1. Client-side: Disable submit button for 5 seconds after submission
2. Add reCAPTCHA v3 to form (invisible, score-based)
3. Server-side: Implement webhook rate limiting by IP address
4. Add duplicate detection in n8n workflow (same phone/email within 1 hour = skip)

---

## Date: 2026-03-21
*Concerns audit: 2026-03-21*
