import { useState, useCallback } from 'react';
import { validateRequired, validateEmail, validatePhone } from '../utils/formValidation';
import { useLeadTracking } from './useLeadTracking';

export interface LeadFormData {
  service: string;
  urgency: string;
  address: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

export type FormErrors = Partial<Record<keyof LeadFormData, string>>;

const WEBHOOK_URL = 'https://n8n.whitflow.com/webhook/dte-form-submissions';

const stepValidators: Record<number, (data: LeadFormData) => FormErrors> = {
  0: (data) => {
    const errors: FormErrors = {};
    if (!data.service) errors.service = 'Please select a service';
    return errors;
  },
  1: (data) => {
    const errors: FormErrors = {};
    const addrErr = validateRequired(data.address);
    if (addrErr) errors.address = 'Property address is required';
    return errors;
  },
  2: (data) => {
    const errors: FormErrors = {};
    const nameErr = validateRequired(data.name);
    if (nameErr) errors.name = 'Name is required';
    const phoneErr = validatePhone(data.phone);
    if (phoneErr) errors.phone = phoneErr;
    const emailErr = validateEmail(data.email);
    if (emailErr) errors.email = emailErr;
    return errors;
  },
};

export function useMultiStepForm(formSource: string) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [formData, setFormData] = useState<LeadFormData>({
    service: '',
    urgency: '',
    address: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const tracking = useLeadTracking();

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

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setDirection('forward');
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setDirection('backward');
    setErrors({});
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const submit = useCallback(async () => {
    if (!validateStep(2)) return;

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const payload = {
        ...formData,
        source: formSource,
        currentPage: window.location.pathname,
        pageTitle: document.title,
        ...tracking,
        formCompletedAt: new Date().toISOString(),
        timestamp: new Date().toISOString(),
        formVersion: '2.0',
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error('Submission failed');

      setSubmitStatus('success');
      setDirection('forward');
      setCurrentStep(3);
    } catch {
      setSubmitStatus('error');
      setDirection('forward');
      setCurrentStep(3);
    } finally {
      clearTimeout(timeout);
      setIsSubmitting(false);
    }
  }, [formData, formSource, tracking, validateStep]);

  const retry = useCallback(() => {
    setSubmitStatus('idle');
    setDirection('backward');
    setCurrentStep(2);
  }, []);

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
}
