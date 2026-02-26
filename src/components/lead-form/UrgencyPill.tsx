interface UrgencyPillProps {
  label: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
}

export default function UrgencyPill({ label, value, selected, onSelect }: UrgencyPillProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`px-3 py-2 rounded-full text-xs font-semibold transition-all ${
        selected
          ? 'bg-primary-700 text-white'
          : 'bg-gray-100 text-charcoal-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}
