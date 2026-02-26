import { ArrowLeft } from 'lucide-react';
import FormField from '../FormField';
import type { LeadFormData, FormErrors } from '../../../hooks/useMultiStepForm';

interface StepAddressProps {
  formData: LeadFormData;
  errors: FormErrors;
  updateField: (name: keyof LeadFormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepAddress({ formData, errors, updateField, onNext, onBack }: StepAddressProps) {
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

      <h3 className="text-lg font-bold text-charcoal-900 mb-1">Where is your property?</h3>
      <p className="text-sm text-charcoal-600 mb-4">We'll use this to provide an accurate estimate</p>

      <div className="mb-5">
        <FormField
          label="Property Address"
          name="address"
          value={formData.address}
          onChange={(v) => updateField('address', v)}
          error={errors.address}
          placeholder="123 Main St, Columbus, OH"
          required
        />
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-bold text-base shadow-lg hover:shadow-xl"
      >
        Next
      </button>
    </div>
  );
}
