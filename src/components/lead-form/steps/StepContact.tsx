import { ArrowLeft, Loader2 } from 'lucide-react';
import FormField from '../FormField';
import { formatPhoneNumber } from '../../../utils/formatPhone';
import type { LeadFormData, FormErrors } from '../../../hooks/useMultiStepForm';

interface StepContactProps {
  formData: LeadFormData;
  errors: FormErrors;
  updateField: (name: keyof LeadFormData, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function StepContact({ formData, errors, updateField, onSubmit, onBack, isSubmitting }: StepContactProps) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-charcoal-500 hover:text-charcoal-700 mb-3 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h3 className="text-lg font-bold text-charcoal-900 mb-1">How should we reach you?</h3>
      <p className="text-sm text-charcoal-600 mb-4">We'll contact you within 24 hours</p>

      <div className="space-y-3 mb-4">
        <FormField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={(v) => updateField('name', v)}
          error={errors.name}
          placeholder="John Smith"
          required
        />
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(v) => updateField('phone', formatPhoneNumber(v))}
          error={errors.phone}
          placeholder="(614)-555-0123"
          maxLength={14}
          required
        />
        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={(v) => updateField('email', v)}
          error={errors.email}
          placeholder="john@example.com"
          required
        />
        <FormField
          label="Additional Details"
          name="message"
          value={formData.message}
          onChange={(v) => updateField('message', v)}
          placeholder="Tell us about your roofing needs..."
          multiline
          rows={3}
        />
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-bold text-base shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Get My Free Inspection'
        )}
      </button>
    </div>
  );
}
