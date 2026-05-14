// Custom aesthetic domain icons with gradient backgrounds
// Usage: <TechIcon className="h-12 w-12" />

interface IconProps {
  className?: string;
}

export function TechIcon({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#techGrad)" />
      {/* Code brackets </> */}
      <path d="M17 18L11 24L17 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 18L37 24L31 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 15L21 33" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function AccountingIcon({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="accGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#accGrad)" />
      {/* Rising bar chart */}
      <rect x="11" y="30" width="7" height="8" rx="2" fill="white" opacity="0.5" />
      <rect x="20.5" y="23" width="7" height="15" rx="2" fill="white" opacity="0.75" />
      <rect x="30" y="14" width="7" height="24" rx="2" fill="white" />
      {/* Trend line */}
      <path d="M13 29L23 22L32 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" opacity="0.6" />
    </svg>
  );
}

export function HealthcareIcon({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="healGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#healGrad)" />
      {/* Medical cross */}
      <rect x="20" y="11" width="8" height="26" rx="3" fill="white" />
      <rect x="11" y="20" width="26" height="8" rx="3" fill="white" />
    </svg>
  );
}

export function CreativeIcon({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="creGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="creGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#creGrad)" />
      {/* Diamond gem shape */}
      <polygon points="24,11 36,21 24,37 12,21" fill="white" opacity="0.9" />
      <polygon points="24,17 30,21 24,31 18,21" fill="url(#creGrad2)" />
      <line x1="12" y1="21" x2="36" y2="21" stroke="white" strokeWidth="1" opacity="0.5" />
      <line x1="24" y1="11" x2="12" y2="21" stroke="white" strokeWidth="1" opacity="0.4" />
      <line x1="24" y1="11" x2="36" y2="21" stroke="white" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export function BusinessIcon({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bizGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#bizGrad)" />
      {/* Rocket */}
      <path
        d="M24 9C24 9 33 13 33 24C33 24 30 26 24 26C18 26 15 24 15 24C15 13 24 9 24 9Z"
        fill="white"
      />
      <circle cx="24" cy="20" r="3.5" fill="url(#bizGrad)" />
      {/* Flames */}
      <path d="M20 26C19 29 17 33 20 35C21 32 22 30 24 29C26 30 27 32 28 35C31 33 29 29 28 26" fill="white" opacity="0.6" />
      {/* Side fins */}
      <path d="M15 24L11 28L15 27" fill="white" opacity="0.7" />
      <path d="M33 24L37 28L33 27" fill="white" opacity="0.7" />
    </svg>
  );
}