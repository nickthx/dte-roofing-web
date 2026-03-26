interface BbbLogoProps {
  className?: string;
}

export default function BbbLogo({ className = '' }: BbbLogoProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="6" fill="#004B8D" />
      {/* Torch handle */}
      <rect x="18" y="22" width="4" height="12" rx="1" fill="white" />
      {/* Torch base */}
      <rect x="15" y="20" width="10" height="4" rx="1" fill="white" />
      {/* Flame */}
      <path
        d="M20 6 C20 6, 14 12, 14 16 C14 19.3 16.7 22 20 22 C23.3 22 26 19.3 26 16 C26 12, 20 6, 20 6Z"
        fill="white"
      />
    </svg>
  );
}
