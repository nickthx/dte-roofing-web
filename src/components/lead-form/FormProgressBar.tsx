interface FormProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function FormProgressBar({ currentStep, totalSteps }: FormProgressBarProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
            i <= currentStep ? 'bg-primary-700' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}
