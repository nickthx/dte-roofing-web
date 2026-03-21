# Testing Patterns

**Analysis Date:** 2026-03-21

## Test Framework

**Status:** Not detected

- No test runner configured (Jest, Vitest, or Cypress not found in package.json)
- No test configuration files (`jest.config.*`, `vitest.config.*`, `cypress.config.*`)
- No test files (`*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`) in source directory
- No test directory structure (`src/__tests__/`, `tests/`, `e2e/`)
- TypeScript strict mode enabled but no test type definitions detected

**Development Practice:** Currently testing is manual/external. No automated test suite is in place.

## Run Commands

Testing is not currently automated. Manual testing approaches:

```bash
npm run lint                # ESLint type checking
npm run typecheck           # TypeScript type checking without emit
npm run dev                 # Start dev server for manual testing
npm run build               # Build for production
npm run preview             # Preview production build locally
```

## Testing Recommendations

**For Future Implementation:**

**Unit Tests (Recommended First):**
- Framework: Vitest (lighter than Jest, same API, better TypeScript support)
- Assertion library: Vitest built-in or Chai
- Target files for testing:
  - `src/utils/formValidation.ts` - Validation logic
  - `src/utils/formatPhone.ts` - Phone formatting
  - `src/hooks/useMultiStepForm.ts` - Form state and step validation
  - `src/hooks/useReviewData.ts` - Data fetching and fallback logic
  - `src/hooks/useLeadTracking.ts` - Tracking data generation

**Integration Tests (Secondary Priority):**
- Test form submission flow end-to-end
- Test SEO meta tag injection
- Test schema markup generation
- Test Supabase integration with mocked responses
- Test webhook submission to n8n

**E2E Tests (Optional):**
- Framework: Playwright or Cypress
- Test critical user flows: form submission, page navigation, quote tool integration

## Current Code Patterns for Testing

**Validation Logic** (`src/utils/formValidation.ts`):
```typescript
export function validateRequired(value: string): string | null {
  return value.trim() ? null : 'This field is required';
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : 'Please enter a valid email address';
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return 'Phone number is required';
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 ? null : 'Please enter a valid 10-digit phone number';
}
```

**Test approach:** Pure functions with clear input/output make these easy to unit test.

Example test structure:
```typescript
describe('formValidation', () => {
  describe('validateEmail', () => {
    it('should return null for valid email', () => {
      expect(validateEmail('test@example.com')).toBeNull();
    });
    it('should return error for invalid email', () => {
      expect(validateEmail('invalid')).toBeTruthy();
    });
    it('should return error for empty string', () => {
      expect(validateEmail('')).toBeTruthy();
    });
  });
});
```

**Hook Testing** (`src/hooks/useMultiStepForm.ts`):
```typescript
export function useMultiStepForm(formSource: string) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<LeadFormData>({...});
  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = useCallback((name: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const validateStep = useCallback((step: number): boolean => {
    const validator = stepValidators[step];
    if (!validator) return true;
    const stepErrors = validator(formData);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }, [formData]);

  // ... more methods

  return {
    currentStep,
    formData,
    errors,
    isSubmitting,
    submitStatus,
    updateField,
    validateStep,
    nextStep,
    prevStep,
    submit,
    retry,
  };
}
```

**Test approach:** Use `@testing-library/react` and Vitest renderHook pattern:
```typescript
import { renderHook, act } from '@testing-library/react';
import { useMultiStepForm } from './useMultiStepForm';

describe('useMultiStepForm', () => {
  it('should initialize with step 0', () => {
    const { result } = renderHook(() => useMultiStepForm('test-source'));
    expect(result.current.currentStep).toBe(0);
  });

  it('should validate required fields on step', async () => {
    const { result } = renderHook(() => useMultiStepForm('test-source'));

    act(() => {
      result.current.nextStep(); // No service selected
    });

    expect(result.current.errors.service).toBeTruthy();
    expect(result.current.currentStep).toBe(0); // Should not advance
  });

  it('should move to next step when validation passes', async () => {
    const { result } = renderHook(() => useMultiStepForm('test-source'));

    act(() => {
      result.current.updateField('service', 'Roof Repair');
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(1);
  });
});
```

**Async Data Fetching** (`src/hooks/useReviewData.ts`):
```typescript
export const useReviewData = () => {
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const { data: dbData, error: dbError } = await supabase
          .from('review_data')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (dbData && !dbError) {
          setReviewData({ /* ... */ });
          setLoading(false);
          return;
        }

        // Fallback to Google Sheets
        const res = await fetch('https://docs.google.com/...');
        // ... parse and set data
      } catch (err) {
        console.error('Failed to load reviews:', err);
        setReviewData({ /* default */ });
      }
    };
    fetchReviewData();
  }, []);

  return { reviewData, loading, error };
};
```

**Test approach:** Mock Supabase and fetch, test fallback logic:
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useReviewData } from './useReviewData';
import { supabase } from '../lib/supabase';
import * as supabaseModule from '../lib/supabase';

vi.mock('../lib/supabase');

describe('useReviewData', () => {
  it('should load review data from Supabase', async () => {
    const mockData = { total_reviews: 100, average_rating: 5.0 /* ... */ };
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockReturnValue({
          limit: vi.fn().mockReturnValue({
            maybeSingle: vi.fn().mockResolvedValue({ data: mockData, error: null }),
          }),
        }),
      }),
    });

    const { result } = renderHook(() => useReviewData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.reviewData?.totalReviews).toBe(100);
  });

  it('should fallback to Google Sheets on Supabase error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      text: () => Promise.resolve(`)]}')\n{"table":{"rows":[{"c":[null,{"v":92},{"v":5.0}]}]}}`),
    });

    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockReturnValue({
          limit: vi.fn().mockReturnValue({
            maybeSingle: vi.fn().mockResolvedValue({ data: null, error: 'failed' }),
          }),
        }),
      }),
    });

    const { result } = renderHook(() => useReviewData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.reviewData?.totalReviews).toBe(92);
  });

  it('should return default data on all errors', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockReturnValue({
          limit: vi.fn().mockReturnValue({
            maybeSingle: vi.fn().mockResolvedValue({ data: null, error: 'failed' }),
          }),
        }),
      }),
    });

    const { result } = renderHook(() => useReviewData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(true);
    });

    expect(result.current.reviewData?.totalReviews).toBe(92); // DEFAULT_REVIEW_COUNT
  });
});
```

## Mocking Strategy

**What to Mock:**
- External APIs: Supabase client, Google Sheets fetch
- Network requests: Webhook submissions (fetch to n8n)
- Browser APIs: `window.location`, `sessionStorage`, `screen` dimensions
- Third-party hooks: useReviewData when testing form components

**What NOT to Mock:**
- Validation functions (pure, no side effects)
- Formatting utilities (pure, no side effects)
- Tailwind CSS (testing behavior, not styling)
- React Router components (test with MemoryRouter wrapper)

## Component Testing Patterns

**Example: FormField Component** (`src/components/lead-form/FormField.tsx`):

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormField from './FormField';

describe('FormField', () => {
  it('should render label and input', () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('should display error message when provided', () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
        error="Invalid email"
      />
    );

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('should call onChange with new value on input change', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={onChange}
      />
    );

    const input = screen.getByLabelText('Email');
    await user.type(input, 'test@example.com');

    expect(onChange).toHaveBeenCalledWith('test@example.com');
  });

  it('should render textarea for multiline input', () => {
    render(
      <FormField
        label="Message"
        name="message"
        value=""
        onChange={() => {}}
        multiline
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
```

## Coverage Goals

**Recommended targets** (not currently enforced):
- Unit tests: 80%+ coverage on utilities and hooks
- Integration tests: Cover critical form submission flows
- No coverage requirement on purely presentational components

## Test Organization Structure

```
src/
├── components/
│   └── lead-form/
│       ├── FormField.tsx
│       └── FormField.test.tsx          # Co-located
├── hooks/
│   ├── useMultiStepForm.ts
│   └── useMultiStepForm.test.ts        # Co-located
├── utils/
│   ├── formValidation.ts
│   └── formValidation.test.ts          # Co-located
└── __tests__/
    ├── integration/
    │   └── form-submission.test.ts     # Complex workflows
    └── e2e/                             # Future E2E tests
```

**Test file naming:** `[module].test.ts` or `[module].spec.ts` (recommend `.test.ts` for consistency)

---

*Testing analysis: 2026-03-21*
