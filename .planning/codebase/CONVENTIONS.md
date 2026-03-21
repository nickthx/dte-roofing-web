# Coding Conventions

**Analysis Date:** 2026-03-21

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `FormField.tsx`, `Navigation.tsx`, `SEO.tsx`)
- Pages: PascalCase (e.g., `Home.tsx`, `Contact.tsx`, `BlogPost.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useMultiStepForm.ts`, `useReviewData.ts`)
- Utilities: camelCase (e.g., `formatPhone.ts`, `formValidation.ts`)
- Data files: camelCase (e.g., `projects.ts`)
- Directories: kebab-case for multi-word dirs (e.g., `lead-form/`, `pages/services/`, `pages/locations/`)

**Functions:**
- Component functions: PascalCase (e.g., `export default function FormField()`, `export default function Navigation()`)
- Hook functions: camelCase with `use` prefix (e.g., `export function useMultiStepForm()`, `export const useReviewData = () => {}`)
- Regular utility functions: camelCase (e.g., `formatPhoneNumber()`, `validateEmail()`, `validatePhone()`)
- Internal helper functions: camelCase (e.g., `getOrCreateSessionId()`, `getLandingPage()`, `getDeviceType()`, `updateOrCreateMetaTag()`)

**Variables and Constants:**
- State variables: camelCase (e.g., `formData`, `currentStep`, `isSubmitting`, `reviewData`)
- Boolean variables: prefixed with `is`, `has`, or `should` (e.g., `isSubmitting`, `isServicesOpen`, `isMobileMenuOpen`, `error` for error states)
- Refs: suffixed with `Ref` (e.g., `closeTimeoutRef`, `emblaRef`, `dataRef`)
- Constants (all caps): UPPER_SNAKE_CASE (e.g., `WEBHOOK_URL`, `CANONICAL_DOMAIN`, `DEFAULT_REVIEW_COUNT`)

**Types and Interfaces:**
- Interfaces: PascalCase with suffix for clarity (e.g., `FormFieldProps`, `LeadFormData`, `TrackingData`, `ReviewData`)
- Type aliases: PascalCase (e.g., `FormErrors`)
- Discriminant unions: Use string literals (e.g., `'forward' | 'backward'`, `'idle' | 'success' | 'error'`, `'mobile' | 'tablet' | 'desktop'`)

## Code Style

**Formatting:**
- Indentation: 2 spaces (observed consistently across all files)
- Line length: Flexible, no strict limit enforced
- Semicolons: Always used
- Trailing commas: Used in multi-line objects/arrays
- No explicit formatter like Prettier (no `.prettierrc` found)

**Linting:**
- Tool: ESLint with TypeScript support
- Config: `eslint.config.js`
- Enabled plugins:
  - `@eslint/js` - JavaScript recommended rules
  - `typescript-eslint` - TypeScript recommended rules
  - `eslint-plugin-react-hooks` - React hooks rules (dependency array warnings)
  - `eslint-plugin-react-refresh` - React refresh warnings

**Key ESLint Rules:**
- React hooks dependency arrays enforced (`react-hooks/exhaustive-deps`)
- React components must be PascalCase and exported directly (enforced via `react-refresh/only-export-components`)
- TypeScript strict mode enabled (via `tsconfig.app.json`)

## Import Organization

**Patterns:**
- No path aliases configured (all imports use relative paths)
- Import order observed:
  1. React and hooks (`import { useState, useEffect } from 'react'`)
  2. React Router (`import { Link, Routes, Route } from 'react-router-dom'`)
  3. Third-party libraries (`import { createClient } from '@supabase/supabase-js'`, `import { AlertCircle } from 'lucide-react'`)
  4. Relative components and utilities (`import FormField from '../lead-form/FormField'`)
  5. Type imports use `import type` syntax where applicable

**Relative Imports:**
- Components: `../components/`, `./components/`
- Hooks: `../hooks/`
- Utilities: `../utils/`
- Data: `../data/`
- Library: `../lib/`
- Pages: `./` for same-level or `../pages/` for cross-directory

Example from `MultiStepLeadForm.tsx`:
```typescript
import { useEffect } from 'react';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import FormProgressBar from './FormProgressBar';
import StepService from './steps/StepService';
```

## TypeScript Strictness

**Enabled in `tsconfig.app.json`:**
- `strict: true` - All strict type checking options enabled
- `noUnusedLocals: true` - Error on unused variables
- `noUnusedParameters: true` - Error on unused function parameters
- `noFallthroughCasesInSwitch: true` - Error on missing switch cases

**Practices:**
- All function parameters must have explicit types
- All exported function return types explicitly annotated
- Component props defined via interfaces (e.g., `FormFieldProps`, `ServicePageProps`)
- Generic types used where appropriate (e.g., `Record<string, string>`, `Partial<Record<keyof LeadFormData, string>>`)

## Error Handling

**Form Validation:**
- Validators return `string | null` (error message or null for valid)
- Example from `formValidation.ts`:
  ```typescript
  export function validateEmail(email: string): string | null {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Please enter a valid email address';
  }
  ```
- Step-based validation stored in `stepValidators` object mapping step number to validator function
- Form errors stored in state: `errors` object of type `FormErrors` (partial record of field errors)

**Async Error Handling:**
- Try-catch blocks for async operations (e.g., fetch, Supabase queries)
- AbortController used for fetch requests with timeout (10000ms)
- Example from `useMultiStepForm.ts`:
  ```typescript
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('Submission failed');
  } catch (err) {
    setSubmitStatus('error');
  }
  ```

**Data Loading Errors:**
- Separate error/loading state variables (e.g., `loading`, `error` in `useReviewData`)
- Fallback values used on error: `DEFAULT_REVIEW_COUNT = 92` in `useReviewData.ts`
- Errors logged to console: `console.error('Failed to load reviews:', err)`

**User-Facing Errors:**
- Field-level error messages displayed below inputs
- Error styling applied to inputs: `border-red-500` when `error` prop present
- Accessibility: `aria-invalid` and `aria-describedby` attributes on inputs with errors

## Logging

**Framework:** No logging library; uses browser `console`

**Patterns:**
- Error logging only: `console.error('Failed to load reviews:', err)` in `useReviewData.ts`
- Errors logged at point of failure for development debugging
- No info/warning/debug logging observed
- Minimal logging in general (errors only)

**Best Practice:** Log errors for visibility during development; no production analytics/logging configured

## Comments

**When to Comment:**
- Generally minimize comments; code is self-documenting
- Comments explain "why" not "what"
- Example from `Navigation.tsx` - complex dropdown fix with detailed explanation:
  ```typescript
  /*
    FIXED DROPDOWN IMPLEMENTATION:
    1. Removed mt-2 gap that caused menu to close when cursor moves to dropdown
    2. Added 150ms delay before closing to improve UX and prevent accidental closes
    3. Used pt-2 padding inside dropdown wrapper to create hoverable bridge area
    4. Added useRef and setTimeout for proper delay handling
    5. Cleanup timeout on unmount to prevent memory leaks
  */
  ```

**JSDoc/TSDoc:**
- Used sparingly for complex utility functions
- Example from `SEO.tsx` - inline comment for helper function:
  ```typescript
  // Helper for OG/Twitter tags
  const updateOrCreateMetaTag = (property: string, content: string) => {
  ```
- Interface properties documented in interface definition, not comment blocks

## Function Design

**Size:** Small, focused functions (typically 20-50 lines)

**Structure:**
- Hook functions keep setup logic concise
- Utility functions single-purpose
- Example: `formatPhoneNumber()` handles only phone formatting:
  ```typescript
  export function formatPhoneNumber(value: string): string {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  }
  ```

**Parameters:**
- Props destructured in function signature: `function FormField({ label, name, type = 'text', ... })`
- Callback props follow naming: `onNext`, `onBack`, `onSubmit`, `onChange`, `onMouseEnter`, `onMouseLeave`
- Default parameter values used (e.g., `type = 'text'`, `required = false`)

**Return Values:**
- All return types explicitly annotated
- Components return JSX or null
- Hooks return objects with named properties
- Utility functions return primitives (string, boolean, number) or typed objects
- Example from `useMultiStepForm()`:
  ```typescript
  return {
    currentStep,
    direction,
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
  ```

## Module Design

**Exports:**
- Components: `export default function ComponentName()`
- Hooks: `export function useHookName()` or `export const useHookName = () => {}`
- Data: `export const dataArray: Type[] = [...]`
- Types/Interfaces: `export interface InterfaceName {}` or `export type TypeName = ...`
- Utilities: `export function utilityName()` or `export const utilityName = () => {}`

**Single Responsibility:**
- One component per file (except index files)
- Utilities grouped by domain (e.g., all form validation in `formValidation.ts`, phone formatting in `formatPhone.ts`)

**Barrel Files:**
- Not used in this codebase
- Direct imports from specific files preferred

**Constant Declarations:**
- Module-level constants defined above components/functions
- Example from `useMultiStepForm.ts`:
  ```typescript
  const WEBHOOK_URL = 'https://n8n.whitflow.com/webhook/dte-form-submissions';

  const stepValidators: Record<number, (data: LeadFormData) => FormErrors> = {
    0: (data) => { ... },
    // ...
  };
  ```

## State Management

**Approach:** React hooks only (useState, useRef, useEffect, useCallback)

**Patterns:**
- State updates with setter functions: `const [state, setState] = useState(initialValue)`
- Callback memoization with `useCallback` for event handlers that are passed as props
- Refs used for non-state values (timeouts, carousel refs, session storage)
- useEffect for side effects (fetching data, setting up listeners)
- Direct state mutations avoided

**Example from `Navigation.tsx`:**
```typescript
const [isServicesOpen, setIsServicesOpen] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
```

## JSX Patterns

**Conditional Rendering:**
- Ternary operators for binary conditions: `{error ? <ErrorMsg /> : <Input />}`
- Logical AND (`&&`) for single branch: `{isLoading && <Spinner />}`
- Switch statements for multi-step scenarios (e.g., form step rendering)

**Event Handlers:**
- Arrow functions inline for simple handlers: `onClick={() => setIsOpen(!isOpen)}`
- `useCallback` for handlers passed to child components: prevents unnecessary re-renders
- Example from `useMultiStepForm.ts`:
  ```typescript
  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setDirection('forward');
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  }, [currentStep, validateStep]);
  ```

**Styling:**
- Tailwind CSS utility classes exclusively
- No inline styles (except background-image in Hero section for dynamic content)
- Example from `FormField.tsx`:
  ```typescript
  const inputClass = `w-full px-4 py-3 rounded-lg border-2 ${
    error ? 'border-red-500' : 'border-gray-300'
  } focus:border-primary-700 focus:ring-2 focus:ring-primary-700 focus:outline-none text-charcoal-900 transition-colors`;
  ```

**Accessibility:**
- Form inputs have `aria-invalid` and `aria-describedby` attributes
- Images have `alt` attributes (e.g., `alt="DTE Roofing Logo"`)
- Navigation landmarks: `<header>`, `<main>`, `<nav>` semantic elements
- Color contrast enforced via Tailwind classes

---

*Convention analysis: 2026-03-21*
