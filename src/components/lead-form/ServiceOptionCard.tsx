import { LucideIcon } from 'lucide-react';

interface ServiceOptionCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  selected: boolean;
  onSelect: (value: string) => void;
}

export default function ServiceOptionCard({
  label,
  value,
  icon: Icon,
  selected,
  onSelect,
}: ServiceOptionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-center ${
        selected
          ? 'border-primary-700 bg-primary-50 text-primary-700'
          : 'border-gray-200 bg-white text-charcoal-700 hover:border-primary-300'
      }`}
    >
      <Icon className={`w-5 h-5 ${selected ? 'text-primary-700' : 'text-charcoal-500'}`} />
      <span className="text-xs font-semibold leading-tight">{label}</span>
    </button>
  );
}
