interface NextdoorLogoProps {
  className?: string;
}

export default function NextdoorLogo({ className = '' }: NextdoorLogoProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="6" fill="#00B636" />
      {/* House roofline (inverted V) */}
      <path
        d="M20 8 L6 22 L10 22 L10 32 L17 32 L17 25 L23 25 L23 32 L30 32 L30 22 L34 22 Z"
        fill="white"
      />
    </svg>
  );
}
