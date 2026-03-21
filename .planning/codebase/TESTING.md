# Testing Patterns

**Analysis Date:** 2026-03-21

## Test Framework

**Status:** No testing framework currently configured

**Runner:** Not installed
- Jest not found in `devDependencies`
- Vitest not found
- No `jest.config.js` or `vitest.config.ts` present

**Assertion Library:** Not applicable (no tests present)

**Run Commands:** Not available
- No test commands in `package.json` scripts
- Only `dev`, `build`, `lint`, `preview`, and `typecheck` scripts present

**Current State:**
The codebase has no automated tests. Code is verified through:
1. TypeScript type checking: `npm run typecheck`
2. ESLint: `npm run lint`
3. Manual testing during development

## Test File Organization

**Current Pattern:** Not applicable

**Recommended Location (if tests were added):**
- Co-located with source files (industry standard for React)
- Pattern: `ComponentName.test.tsx` alongside `ComponentName.tsx`
- Example locations:
  - `src/components/FormField.test.tsx` (alongside `src/components/lead-form/FormField.tsx`)
  - `src/hooks/useMultiStepForm.test.ts` (alongside `src/hooks/useMultiStepForm.ts`)
  - `src/utils/formValidation.test.ts` (alongside `src/utils/formValidation.ts`)

**Directory Structure (recommended):**
```
src/
├── components/
│   ├── FormField.tsx
│   ├── FormField.test.tsx
│   ├── Navigation.tsx
│   └── Navigation.test.tsx
├── hooks/
│   ├── useMultiStepForm.ts
│   └── useMultiStepForm.test.ts
└── utils/
    ├── formValidation.ts
    └── formValidation.test.ts
```

**Naming Convention (recommended):**
- Test files: `[FileName].test.tsx` or `[FileName].test.ts`
- Test suites: `describe('[ComponentName]', () => { ... })`
- Individual tests: `it('should [expected behavior]', () => { ... })`

## Testing Areas (Current Gaps)

**High Priority for Testing:**

**Form Validation (`src/utils/formValidation.ts`):**
- Pure functions ideal for unit testing
- Functions to test:
  - `validateRequired()` - returns null for non-empty, error message for empty
  - `validateEmail()` - regex validation
  - `validatePhone()` - digit extraction and length check (10 digits)
- Example test structure:
  ```typescript
  describe('formValidation', () => {
    describe('validateEmail', () => {
      it('should return null for valid email', () => {
        expect(validateEmail('test@example.com')).toBeNull();
      });
      it('should return error message for invalid email', () => {
        expect(validateEmail('invalid')).not.toBeNull();
      });
      it('should return error for empty email', () => {
        expect(validateEmail('')).toBe('Email is required');
      });
    });
  });
  ```

**Form Hooks (`src/hooks/useMultiStepForm.ts`):**
- Complex state management logic
- Functions to test:
  - Form data state updates via `updateField()`
  - Step validation via `validateStep()`
  - Navigation between steps (`nextStep()`, `prevStep()`)
  - Form submission with webhook integration
- Mocking required: fetch API, AbortController
- Example test structure:
  ```typescript
  describe('useMultiStepForm', () => {
    it('should initialize with step 0 and empty form data', () => {
      const { result } = renderHook(() => useMultiStepForm('test-source'));
      expect(result.current.currentStep).toBe(0);
    });
    it('should validate service selection on step 0', () => {
      // Test step validation logic
    });
  });
  ```

**Data Fetching Hook (`src/hooks/useReviewData.ts`):**
- Async data loading with fallback values
- Sources tested:
  - Supabase database query
  - Google Sheets fallback API
  - Default value fallback
- Mocking required: Supabase client, fetch API
- Example test structure:
  ```typescript
  describe('useReviewData', () => {
    it('should load review data from Supabase when available', async () => {
      // Mock supabase.from().select()
      const { result } = renderHook(() => useReviewData());
      expect(result.current.loading).toBe(false);
    });
    it('should fallback to DEFAULT_REVIEW_COUNT on error', async () => {
      // Mock fetch failure
      const { result } = renderHook(() => useReviewData());
      expect(result.current.reviewData?.totalReviews).toBe(92);
    });
  });
  ```

**Utility Functions (`src/utils/formatPhone.ts`):**
- Pure function testing
- Test cases:
  - Partial input: "123" → "123"
  - Three-digit format: "1234" → "(123)-4"
  - Full ten-digit format: "1234567890" → "(123)-456-7890"
- Example test structure:
  ```typescript
  describe('formatPhoneNumber', () => {
    it('should format 10 digits as (123)-456-7890', () => {
      expect(formatPhoneNumber('1234567890')).toBe('(123)-456-7890');
    });
    it('should handle partial input', () => {
      expect(formatPhoneNumber('123')).toBe('123');
    });
  });
  ```

**Component Rendering (`src/components/FormField.tsx`):**
- Props validation
- Conditional rendering based on `error` prop
- Accessibility attributes
- Event handler firing
- Example test structure:
  ```typescript
  describe('FormField', () => {
    it('should render label with required indicator', () => {
      render(<FormField label="Email" name="email" required onChange={() => {}} />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
    it('should display error message when provided', () => {
      render(
        <FormField label="Email" name="email" error="Invalid email" onChange={() => {}} />
      );
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
    it('should call onChange when input value changes', () => {
      const onChange = jest.fn();
      render(<FormField label="Email" name="email" onChange={onChange} />);
      userEvent.type(screen.getByRole('textbox'), 'test');
      expect(onChange).toHaveBeenCalled();
    });
  });
  ```

## Mocking Patterns (Recommended)

**Fetch API (for webhook/API calls):**
```typescript
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => ({ success: true }),
  })
);
```

**Supabase Client (for database queries):**
```typescript
jest.mock('../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          limit: jest.fn(() => ({
            maybeSingle: jest.fn(() =>
              Promise.resolve({ data: mockData, error: null })
            ),
          })),
        })),
      })),
    })),
  },
}));
```

**React Router (for Link/navigation):**
```typescript
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};
```

**What to Mock:**
- External API calls (fetch, Supabase)
- Global objects (window, document for non-DOM tests)
- Third-party libraries (React Router, when testing isolated components)
- Date/time functions (for reproducible tests)

**What NOT to Mock:**
- User interactions (use `userEvent` from `@testing-library/user-event`)
- DOM rendering (test actual component output)
- Local utilities (validate form validation logic directly)
- React hooks in your own code (test hook behavior through component)

## Test Types

**Unit Tests (needed):**
- Scope: Individual functions and small components
- What to test:
  - Form validation functions (`validateEmail()`, `validatePhone()`, etc.)
  - Utility functions (`formatPhoneNumber()`)
  - Hook logic (`useMultiStepForm()` state transitions)
- Approach: Jest or Vitest with testing-library

**Integration Tests (needed):**
- Scope: Multi-step form workflow end-to-end
- What to test:
  - Form submission flow (all steps, validation, submission)
  - Data flow between components and hooks
  - Navigation between steps
- Approach: React Testing Library with mocked API calls

**E2E Tests (not configured):**
- Framework: Not installed (could be Cypress, Playwright, or WebDriver)
- Current state: Manual testing only
- Recommended: Add for critical user flows (form submission, lead capture)

## Coverage

**Requirements:** No coverage target currently enforced

**If Tests Were Added:**
- Recommended minimum: 80% coverage
- Critical areas (must test):
  - Form validation (100%)
  - Hook state management (95%)
  - Component rendering with props (85%)
- Lower priority: Styling, layout (can skip in some teams)

**View Coverage Command (if configured):**
```bash
npm run test:coverage
# or
npm run test -- --coverage
```

## Setup Requirements (for future testing)

**Packages to Install:**
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest ts-jest
```

**TypeScript Jest Config (`jest.config.js`):**
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
```

**Setup File (`src/setupTests.ts`):**
```typescript
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn();

// Mock scrollIntoView (used in ServicePageTemplate)
Element.prototype.scrollIntoView = jest.fn();

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

**NPM Scripts (add to `package.json`):**
```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "typecheck": "tsc --noEmit -p tsconfig.app.json"
}
```

## Code Examples for Testing Common Patterns

**Testing useCallback memoization:**
```typescript
it('should memoize nextStep callback', () => {
  const { result, rerender } = renderHook(() => useMultiStepForm('test'));
  const firstCallback = result.current.nextStep;
  rerender();
  expect(result.current.nextStep).toBe(firstCallback);
});
```

**Testing async hook with cleanup:**
```typescript
it('should cleanup timeout on unmount', () => {
  const { unmount } = renderHook(() => useMultiStepForm('test'));
  jest.useFakeTimers();
  unmount();
  jest.clearAllTimers();
  jest.useRealTimers();
});
```

**Testing form submission error handling:**
```typescript
it('should handle network error during submission', async () => {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('Network error'))
  );

  const { result } = renderHook(() => useMultiStepForm('test'));
  await act(async () => {
    await result.current.submit();
  });

  expect(result.current.submitStatus).toBe('error');
});
```

---

*Testing analysis: 2026-03-21*
