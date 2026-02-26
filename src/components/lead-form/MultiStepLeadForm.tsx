import { useEffect } from 'react';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import FormProgressBar from './FormProgressBar';
import StepService from './steps/StepService';
import StepAddress from './steps/StepAddress';
import StepContact from './steps/StepContact';
import StepResult from './steps/StepResult';

interface MultiStepLeadFormProps {
  formSource: string;
  defaultService?: string;
}

export default function MultiStepLeadForm({ formSource, defaultService }: MultiStepLeadFormProps) {
  const {
    currentStep,
    formData,
    errors,
    isSubmitting,
    submitStatus,
    updateField,
    nextStep,
    prevStep,
    submit,
    retry,
  } = useMultiStepForm(formSource);

  // Pre-select service based on current page
  useEffect(() => {
    if (defaultService && !formData.service) {
      const serviceMap: Record<string, string> = {
        'roof-repair': 'repair',
        'roof-replacement': 'replacement',
        'roof-inspection': 'inspection',
        'storm-damage': 'storm-damage',
        'gutter-services': 'gutters',
        'roof-maintenance': 'maintenance',
        'preventative-maintenance': 'maintenance',
        'emergency-services': 'storm-damage',
        'siding': 'other',
        'commercial-roofing': 'other',
        'roof-installation': 'replacement',
      };
      const mapped = serviceMap[defaultService] || '';
      if (mapped) updateField('service', mapped);
    }
  }, [defaultService]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepService
            formData={formData}
            errors={errors}
            updateField={updateField}
            onNext={nextStep}
          />
        );
      case 1:
        return (
          <StepAddress
            formData={formData}
            errors={errors}
            updateField={updateField}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 2:
        return (
          <StepContact
            formData={formData}
            errors={errors}
            updateField={updateField}
            onSubmit={submit}
            onBack={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      case 3:
        return <StepResult status={submitStatus === 'success' ? 'success' : 'error'} onRetry={retry} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-xl">
      {currentStep < 3 && (
        <>
          <h3 className="text-xl font-bold text-charcoal-900 mb-1">Get Your Free Inspection</h3>
          <p className="text-xs text-charcoal-500 mb-4">Takes less than 30 seconds</p>
          <FormProgressBar currentStep={currentStep} totalSteps={3} />
        </>
      )}
      {renderStep()}
    </div>
  );
}
