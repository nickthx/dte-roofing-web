import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  maxLength,
  multiline = false,
  rows = 3,
}: FormFieldProps) {
  const inputClass = `w-full px-4 py-3 rounded-lg border-2 ${
    error ? 'border-red-500' : 'border-gray-300'
  } focus:border-primary-700 focus:ring-2 focus:ring-primary-700 focus:outline-none text-charcoal-900 transition-colors`;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-charcoal-900 mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder={placeholder}
          rows={rows}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
