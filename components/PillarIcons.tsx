'use client';

// ==========================================
// PROFESSIONAL PILLAR ICONS
// Custom SVG icons to replace emojis
// ==========================================

interface IconProps {
  className?: string;
  color?: string;
}

export function EconomicIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="20" width="12" height="20" rx="2" fill="currentColor" fillOpacity="0.2"/>
      <rect x="18" y="12" width="12" height="28" rx="2" fill="currentColor" fillOpacity="0.4"/>
      <rect x="28" y="4" width="12" height="36" rx="2" fill="currentColor"/>
      <path d="M4 44H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function AntiCorruptionIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3"/>
      <path d="M24 14V24L30 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M14 14L34 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="24" cy="24" r="6" fill="currentColor" fillOpacity="0.3"/>
    </svg>
  );
}

export function HealthcareIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="16" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="3"/>
      <path d="M16 16V12C16 8.686 18.686 6 22 6H26C29.314 6 32 8.686 32 12V16" stroke="currentColor" strokeWidth="3"/>
      <path d="M24 24V36" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M18 30H30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="36" cy="22" r="3" fill="currentColor"/>
    </svg>
  );
}

export function EducationIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4L4 16L24 28L44 16L24 4Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 20V34C8 34 14 40 24 40C34 40 40 34 40 34V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 28V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="24" cy="14" r="4" fill="currentColor"/>
    </svg>
  );
}

export function IntegrityIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4L28 18H42L30 26L34 40L24 32L14 40L18 26L6 18H20L24 4Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="24" cy="24" r="8" fill="currentColor"/>
      <path d="M20 24L23 27L29 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function UnityIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="20" r="8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="20" r="8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="24" cy="32" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 28L16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 28L32 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 38L28 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
