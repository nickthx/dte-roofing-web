import { Wrench, Home, Search, CloudLightning, Droplets, Settings, HelpCircle } from 'lucide-react';
import ServiceOptionCard from '../ServiceOptionCard';
import UrgencyPill from '../UrgencyPill';
import type { LeadFormData, FormErrors } from '../../../hooks/useMultiStepForm';

const SERVICES = [
  { label: 'Roof Repair', value: 'repair', icon: Wrench },
  { label: 'Replacement', value: 'replacement', icon: Home },
  { label: 'Inspection', value: 'inspection', icon: Search },
  { label: 'Storm Damage', value: 'storm-damage', icon: CloudLightning },
  { label: 'Gutters', value: 'gutters', icon: Droplets },
  { label: 'Maintenance', value: 'maintenance', icon: Settings },
  { label: 'Other', value: 'other', icon: HelpCircle },
];

const URGENCY_OPTIONS = [
  { label: 'Emergency (today)', value: 'emergency' },
  { label: 'Within a week', value: 'within-a-week' },
  { label: 'Just planning', value: 'just-planning' },
];

interface StepServiceProps {
  formData: LeadFormData;
  errors: FormErrors;
  updateField: (name: keyof LeadFormData, value: string) => void;
  onNext: () => void;
}

export default function StepService({ formData, errors, updateField, onNext }: StepServiceProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-charcoal-900 mb-1">What do you need?</h3>
      <p className="text-sm text-charcoal-600 mb-4">Select a service to get started</p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {SERVICES.map((s) => (
          <ServiceOptionCard
            key={s.value}
            label={s.label}
            value={s.value}
            icon={s.icon}
            selected={formData.service === s.value}
            onSelect={(v) => updateField('service', v)}
          />
        ))}
      </div>
      {errors.service && (
        <p className="text-sm text-red-600 mb-3">{errors.service}</p>
      )}

      <div className="mb-5">
        <p className="text-sm font-semibold text-charcoal-900 mb-2">How soon do you need help?</p>
        <div className="flex flex-wrap gap-2">
          {URGENCY_OPTIONS.map((u) => (
            <UrgencyPill
              key={u.value}
              label={u.label}
              value={u.value}
              selected={formData.urgency === u.value}
              onSelect={(v) => updateField('urgency', v)}
            />
          ))}
        </div>
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
