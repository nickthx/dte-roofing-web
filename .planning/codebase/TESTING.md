# Testing Patterns

**Analysis Date:** 2026-03-07

## Test Framework

**Runner:**
- No test framework installed
- No test runner configured
- No test scripts in `package.json`

**Assertion Library:**
- None

**Run Commands:**
```bash
# No test commands available
npm run lint               # ESLint only
npm run typecheck          # TypeScript type checking (tsc --noEmit)
```

## Test File Organization

**Location:**
- No test files exist in the project
- No `__tests__/` directories
- No `*.test.*` or `*.spec.*` files in `src/`

**Naming:**
- Not established

**Structure:**
- Not established

## Test Structure

**No tests exist.** If adding tests, follow these recommendations based on codebase patterns:

**Recommended framework:** Vitest (already uses Vite as build tool)

**Recommended setup:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**Recommended vitest.config.ts:**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

## Testable Units (Priority Order)

**Utility Functions (easiest, highest ROI):**
- `src/utils/formValidation.ts` - `validateRequired`, `validateEmail`, `validatePhone`
- `src/utils/formatPhone.ts` - `formatPhoneNumber`

**Example test for existing code:**
```typescript
// src/utils/formValidation.test.ts
import { describe, it, expect } from 'vitest';
import { validateEmail, validatePhone, validateRequired } from './formValidation';

describe('validateRequired', () => {
  it('returns null for non-empty string', () => {
    expect(validateRequired('hello')).toBeNull();
  });
  it('returns error for empty string', () => {
    expect(validateRequired('')).toBe('This field is required');
  });
  it('returns error for whitespace-only string', () => {
    expect(validateRequired('   ')).toBe('This field is required');
  });
});

describe('validatePhone', () => {
  it('accepts 10-digit phone number', () => {
    expect(validatePhone('6149716028')).toBeNull();
  });
  it('accepts formatted phone number', () => {
    expect(validatePhone('(614)-971-6028')).toBeNull();
  });
  it('rejects short phone number', () => {
    expect(validatePhone('614971')).toBe('Please enter a valid 10-digit phone number');
  });
  it('requires phone number', () => {
    expect(validatePhone('')).toBe('Phone number is required');
  });
});
```

**Custom Hooks:**
- `src/hooks/useMultiStepForm.ts` - form state management, step validation, submission
- `src/hooks/useLeadTracking.ts` - UTM parameter parsing, session management
- `src/hooks/useReviewData.ts` - Supabase data fetching with fallback chain

**Components (with React Testing Library):**
- `src/components/lead-form/FormField.tsx` - form input rendering, error display, ARIA attributes
- `src/components/lead-form/MultiStepLeadForm.tsx` - multi-step flow navigation
- `src/components/SEO.tsx` - meta tag injection

## Mocking

**Framework:** Not established

**Recommended approach for this codebase:**
```typescript
// Mock Supabase client
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          limit: vi.fn(() => ({
            maybeSingle: vi.fn(() => Promise.resolve({ data: null, error: null }))
          }))
        }))
      }))
    }))
  }
}));

// Mock fetch for webhook submissions
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  } as Response)
);
```

**What to Mock:**
- `src/lib/supabase.ts` - Supabase client
- `fetch` - for webhook POST to `n8n.whitflow.com`
- `window.location`, `document.referrer` - for UTM tracking in `useLeadTracking`
- `sessionStorage` - for session ID and landing page persistence
- `crypto.randomUUID` - for deterministic session IDs in tests

**What NOT to Mock:**
- Validation functions (`src/utils/formValidation.ts`) - pure functions, test directly
- Format functions (`src/utils/formatPhone.ts`) - pure functions, test directly
- React component rendering - use React Testing Library

## Fixtures and Factories

**Test Data:** Not established

**Recommended patterns based on existing interfaces:**
```typescript
// src/test/fixtures.ts
import type { LeadFormData } from '../hooks/useMultiStepForm';

export const validLeadFormData: LeadFormData = {
  service: 'repair',
  urgency: 'within-a-week',
  address: '123 Main St, Columbus, OH 43215',
  name: 'John Doe',
  phone: '6149716028',
  email: 'john@example.com',
  message: 'Need roof repair',
};

export const mockReviewData = {
  totalReviews: 92,
  averageRating: 5.0,
  ratingBreakdown: { 5: 92, 4: 0, 3: 0, 2: 0, 1: 0 },
  lastUpdated: '2026-03-07T00:00:00.000Z',
  businessName: 'DTE Roofing',
};
```

**Location:**
- Recommended: `src/test/fixtures.ts` for shared test data
- Recommended: `src/test/setup.ts` for global test configuration

## Coverage

**Requirements:** None enforced

**Recommended initial targets:**
- Utility functions: 100%
- Custom hooks: 80%
- Components: 60%

## Test Types

**Unit Tests:**
- Not implemented
- Priority targets: `src/utils/formValidation.ts`, `src/utils/formatPhone.ts`, `src/hooks/useMultiStepForm.ts`

**Integration Tests:**
- Not implemented
- Priority targets: Multi-step form flow (service selection -> address -> contact -> submission)

**E2E Tests:**
- Not implemented
- Recommended framework: Playwright (Vite-compatible, good React support)
- Priority flows: Lead form submission, page navigation, mobile menu

## Current Quality Assurance

**Available checks (in lieu of tests):**
```bash
npm run lint               # ESLint with TypeScript rules
npm run typecheck          # tsc --noEmit strict mode checking
npm run build              # Vite production build (catches import/syntax errors)
```

**CI/CD:**
- Deployed on Vercel (see `vercel.json` for rewrites)
- No automated test pipeline detected

## Recommended Test File Placement

**Co-locate tests with source files:**
```
src/
  utils/
    formValidation.ts
    formValidation.test.ts      # Unit tests next to source
    formatPhone.ts
    formatPhone.test.ts
  hooks/
    useMultiStepForm.ts
    useMultiStepForm.test.ts
  components/
    lead-form/
      FormField.tsx
      FormField.test.tsx
  test/
    setup.ts                    # Global test setup
    fixtures.ts                 # Shared test data
```

---

*Testing analysis: 2026-03-07*
