// Custom SVG icon set themed for crane & heavy-lift industry
// All icons are inline SVGs — zero dependencies, fully styleable via className/style

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CrawlerCraneIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Crane body */}
      <rect x="8" y="30" width="32" height="8" rx="2" fill="currentColor" opacity="0.9" />
      {/* Boom */}
      <line x1="12" y1="30" x2="36" y2="4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Mast */}
      <line x1="12" y1="4" x2="12" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Jib backstay */}
      <line x1="12" y1="4" x2="36" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Hoist rope */}
      <line x1="36" y1="4" x2="36" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
      {/* Hook */}
      <path d="M33 16 Q36 20 39 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Crawler tracks */}
      <ellipse cx="14" cy="40" rx="6" ry="3" fill="currentColor" opacity="0.6" />
      <ellipse cx="34" cy="40" rx="6" ry="3" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function TruckCraneIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Truck cab */}
      <rect x="2" y="30" width="12" height="10" rx="2" fill="currentColor" opacity="0.85" />
      {/* Truck flatbed */}
      <rect x="14" y="33" width="30" height="7" rx="1.5" fill="currentColor" opacity="0.7" />
      {/* Outrigger left */}
      <line x1="6" y1="40" x2="2" y2="46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="46" x2="6" y2="46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Outrigger right */}
      <line x1="40" y1="40" x2="44" y2="46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="46" x2="40" y2="46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Telescopic boom */}
      <line x1="20" y1="33" x2="40" y2="8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="30" y1="20" x2="44" y2="4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      {/* Hoist rope */}
      <line x1="44" y1="4" x2="44" y2="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Hook */}
      <path d="M41 14 Q44 18 47 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Wheels */}
      <circle cx="8" cy="43" r="2.5" fill="currentColor" opacity="0.55" />
      <circle cx="26" cy="43" r="2.5" fill="currentColor" opacity="0.55" />
      <circle cx="34" cy="43" r="2.5" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export function LoadHookIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Rope */}
      <line x1="24" y1="4" x2="24" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Hook housing */}
      <rect x="17" y="12" width="14" height="8" rx="2" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5" />
      {/* Hook curve */}
      <path d="M22 20 C22 28 30 32 30 26 C30 22 26 20 24 22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Safety latch */}
      <path d="M26 26 Q30 28 30 32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function HardHatIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Hat dome */}
      <path d="M8 30 C8 18 16 10 24 10 C32 10 40 18 40 30" fill="currentColor" opacity="0.9" />
      {/* Brim */}
      <rect x="4" y="29" width="40" height="5" rx="2.5" fill="currentColor" />
      {/* Interior band line */}
      <line x1="10" y1="29" x2="38" y2="29" stroke="white" strokeWidth="1.5" opacity="0.3" />
      {/* Vent stripe */}
      <line x1="24" y1="12" x2="24" y2="29" stroke="white" strokeWidth="2" opacity="0.2" />
    </svg>
  );
}

export function LiftCapacityIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Gauge arc */}
      <path d="M8 36 A16 16 0 0 1 40 36" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.3" />
      {/* Filled arc */}
      <path d="M8 36 A16 16 0 0 1 32 18" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Needle */}
      <line x1="24" y1="36" x2="32" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="24" cy="36" r="3" fill="currentColor" />
      {/* Tick marks */}
      <line x1="8" y1="36" x2="10" y2="34" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="24" y1="20" x2="24" y2="23" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="40" y1="36" x2="38" y2="34" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      {/* Weight arrows */}
      <path d="M18 40 L24 44 L30 40" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

export function CertifiedShieldIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Shield */}
      <path d="M24 4 L40 10 L40 26 C40 34 24 44 24 44 C24 44 8 34 8 26 L8 10 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      {/* Checkmark */}
      <path d="M16 24 L21 29 L32 18" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TelescopicBoomIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Truck cab */}
      <rect x="4" y="28" width="14" height="12" rx="2" fill="currentColor" opacity="0.8" />
      {/* Truck body */}
      <rect x="18" y="32" width="26" height="8" rx="2" fill="currentColor" opacity="0.9" />
      {/* Outrigger left */}
      <line x1="10" y1="40" x2="4" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Outrigger right */}
      <line x1="38" y1="40" x2="44" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Main boom */}
      <rect x="28" y="18" width="6" height="15" rx="1" fill="currentColor" transform="rotate(-40 31 25)" />
      {/* Extension boom */}
      <rect x="30" y="10" width="4" height="12" rx="1" fill="currentColor" opacity="0.7" transform="rotate(-40 32 16)" />
      {/* Hook */}
      <path d="M38 8 Q42 12 38 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Wheels */}
      <circle cx="11" cy="43" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="29" cy="43" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="39" cy="43" r="3" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function WindTurbineIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Tower */}
      <path d="M20 44 L24 20 L28 44" fill="currentColor" opacity="0.4" />
      {/* Hub */}
      <circle cx="24" cy="20" r="3" fill="currentColor" />
      {/* Blade 1 (up) */}
      <path d="M24 20 C22 14 20 8 24 6 C26 10 26 15 24 20" fill="currentColor" opacity="0.85" />
      {/* Blade 2 (lower-left) */}
      <path d="M24 20 C18 23 12 26 10 22 C14 19 19 19 24 20" fill="currentColor" opacity="0.6" />
      {/* Blade 3 (lower-right) */}
      <path d="M24 20 C30 23 36 26 38 22 C34 19 29 19 24 20" fill="currentColor" opacity="0.45" />
    </svg>
  );
}
