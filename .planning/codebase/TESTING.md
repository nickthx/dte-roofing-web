# Testing Patterns

**Analysis Date:** 2026-03-21

## Test Framework Status

**Current State:** No testing framework configured or in use

**Test Files:**
- No `.test.ts`, `.test.tsx`, `.spec.ts`, or `.spec.tsx` files found in `src/` directory
- No test configuration files present (jest.config.js, vitest.config.js, etc.)
- No testing dependencies in package.json

**Development Dependencies:**
- ESLint configured for static analysis
- TypeScript enabled for type checking (`npm run typecheck`)
- No Jest, Vitest, Testing Library, or similar testing frameworks installed

## Recommended Testing Setup

**For Future Implementation:**
- **Test Runner:** Vitest (recommended for Vite projects)
- **Component Testing:** React Testing Library
- **Assertion Library:** Vitest built-in or Chai/Expect
- **Mocking:** Vitest mocking utilities

## Code Quality Assurance

**Current Approach:**

1. **Type Safety:**
   - TypeScript strict mode enabled in `tsconfig.app.json`
   - Settings include: `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, `noFallthroughCasesInSwitch: true`
   - Run with: `npm run typecheck`

2. **Linting:**
   - ESLint configured in `eslint.config.js`
   - Run with: `npm run lint`
   - Covers React Hooks rules, React Refresh patterns, and TypeScript best practices

3. **Static Analysis:**
   - Built-in ESLint rules enforce code quality
   - React Hooks rules prevent common mistakes
   - Type checking prevents runtime errors

## Testing Patterns (If Tests Were Present)

**Component Structure for Testing:**

Based on component design in codebase, testing would follow these patterns:

```typescript
// Example test structure for FormField component
import { render, screen, fireEvent } from '@testing-library/react';
import FormField from '../FormField';

describe('FormField', () => {
  it('renders input with label', () => {
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

  it('displays error message when error prop is provided', () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
        error="Email is required"
      />
    );
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });
});
```

**Hook Testing Pattern:**

Based on `useMultiStepForm` hook structure:

```typescript
import { renderHook, act } from '@testing-library/react';
import { useMultiStepForm } from '../useMultiStepForm';

describe('useMultiStepForm', () => {
  it('initializes with step 0', () => {
    const { result } = renderHook(() => useMultiStepForm('test'));
    expect(result.current.currentStep).toBe(0);
  });

  it('validates required fields before advancing', () => {
    const { result } = renderHook(() => useMultiStepForm('test'));
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(0);
    expect(result.current.errors.service).toBeDefined();
  });
});
```

**Utility Function Testing Pattern:**

Based on validation and formatting utilities:

```typescript
import { validateEmail, validatePhone, formatPhoneNumber } from '../utils/formValidation';

describe('Form Validation', () => {
  describe('validateEmail', () => {
    it('returns null for valid email', () => {
      expect(validateEmail('test@example.com')).toBeNull();
    });

    it('returns error message for invalid email', () => {
      expect(validateEmail('invalid')).toBeTruthy();
    });

    it('returns error for empty email', () => {
      expect(validateEmail('')).toEqual('Email is required');
    });
  });

  describe('formatPhoneNumber', () => {
    it('formats phone number correctly', () => {
      expect(formatPhoneNumber('6149716028')).toBe('(614)-971-6028');
    });

    it('handles partial input', () => {
      expect(formatPhoneNumber('614')).toBe('614');
    });
  });
});
```

## Areas That Would Benefit from Testing

**High Priority:**

1. **Form Validation Logic:**
   - File: `src/utils/formValidation.ts`
   - Test: Email regex, phone number length, required field checks
   - Current: No tests - validation is critical for data quality

2. **Multi-Step Form Hook:**
   - File: `src/hooks/useMultiStepForm.ts`
   - Test: Step transitions, validation before advancing, form submission with abort timeout
   - Current: No tests - complex state management logic

3. **Review Data Hook:**
   - File: `src/hooks/useReviewData.ts`
   - Test: Supabase fallback logic, Google Sheets parsing, error handling, DEFAULT_REVIEW_COUNT fallback
   - Current: No tests - error path with fallbacks needs verification

4. **Form Submission:**
   - File: `src/hooks/useMultiStepForm.ts` (submit function)
   - Test: Webhook POST request, timeout handling, success/error state tracking
   - Current: No tests - external API integration critical

**Medium Priority:**

5. **Service Mapping:**
   - File: `src/components/lead-form/MultiStepLeadForm.tsx`
   - Test: Service name to form value mapping, default service pre-selection
   - Current: No tests - incorrect mapping could cause bad data submission

6. **Tracking Data Collection:**
   - File: `src/hooks/useLeadTracking.ts`
   - Test: SessionId persistence, landing page capture, device type detection
   - Current: No tests - tracking data accuracy important for analytics

## Validation Testing Approach

**Current Validation Functions** (in `src/utils/formValidation.ts`):

1. `validateRequired(value: string)` - checks for trimmed non-empty string
2. `validateEmail(email: string)` - regex-based email validation
3. `validatePhone(phone: string)` - checks for 10-digit phone number

**Test Coverage Needed:**
- Boundary conditions (empty strings, whitespace)
- Valid/invalid formats
- Edge cases (special characters, unicode)

## Form Data Structure for Testing

**LeadFormData interface** (from `src/hooks/useMultiStepForm.ts`):
```typescript
export interface LeadFormData {
  service: string;
  urgency: string;
  address: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}
```

**Test fixtures would include:**
- Empty form state
- Partially filled form
- Valid complete form
- Form with validation errors

## Error Handling Test Patterns

**Network Error Handling** (useReviewData.ts):
```typescript
// Test error path
try {
  // Supabase query fails
  // Falls back to Google Sheets API
  // If that fails, uses DEFAULT_REVIEW_COUNT
} catch (err) {
  console.error('Failed to load reviews:', err);
  setError(true);
  // Verify fallback values are set
}
```

**Form Submission Error Path** (useMultiStepForm.ts):
```typescript
// Test timeout
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 10000);

// Test response.ok check
if (!response.ok) throw new Error('Submission failed');

// Verify submitStatus is set to 'error'
```

## Type Safety Substituting for Tests

**Current Strengths:**
- TypeScript strict mode catches many errors at compile time
- Component prop interfaces enforce correct usage
- Function return types are explicit
- Form data structure is typed

**Example:**
```typescript
// Type system prevents invalid field names
updateField('invalidFieldName', 'value'); // TS error: not in keyof LeadFormData
```

## Recommended Test Structure

**When implementing tests, use this structure:**

```
src/
├── components/
│   └── __tests__/
│       ├── FormField.test.tsx
│       ├── Navigation.test.tsx
│       └── ...
├── hooks/
│   └── __tests__/
│       ├── useMultiStepForm.test.ts
│       ├── useLeadTracking.test.ts
│       └── useReviewData.test.ts
├── utils/
│   └── __tests__/
│       └── formValidation.test.ts
└── lib/
    └── __tests__/
        └── supabase.test.ts
```

## Manual Testing Checklist

**Since automated tests are not yet implemented, focus manual testing on:**

1. **Form Submission Flow:**
   - Fill multi-step form on service pages
   - Verify webhook payload sent to `https://n8n.whitflow.com/webhook/dte-form-submissions`
   - Check error state transitions on network failure

2. **Validation:**
   - Submit empty fields - should see error messages
   - Enter invalid email - should see validation error
   - Enter phone without 10 digits - should see validation error

3. **Device Detection:**
   - Test on mobile, tablet, desktop - useLeadTracking should detect device type
   - Check sessionStorage for landing page and session ID persistence

4. **Review Data Loading:**
   - Verify review count displays on pages
   - Test fallback if Supabase/Google Sheets unavailable
   - Check DEFAULT_REVIEW_COUNT (92) displays as fallback

5. **Form Pre-selection:**
   - Navigate from service page to form - service should be pre-selected
   - Verify serviceMap translates page slug to form value correctly

## ESLint Run Command

```bash
npm run lint                 # Run linting checks
npm run typecheck           # Run TypeScript type checking
```

---

*Testing analysis: 2026-03-21*
