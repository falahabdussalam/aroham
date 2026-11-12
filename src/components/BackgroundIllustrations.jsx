import React from 'react';

/* Clean Educational & Career Line-Art SVG Illustrations */

function GraduationCapIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M14 48 L60 26 L106 48 L60 70 Z" />
      <path d="M32 58 V80 C32 88 45 94 60 94 C75 94 88 88 88 80 V58" />
      <path d="M98 52 V82" />
      <circle cx="98" cy="86" r="4" />
      <path d="M56 48 H64" opacity="0.5" />
    </svg>
  );
}

function OpenBookIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M60 38 C46 30 28 30 16 36 V88 C28 82 46 82 60 90 C74 82 92 82 104 88 V36 C92 30 74 30 60 38 Z" />
      <path d="M60 38 V90" />
      <path d="M26 48 C34 45 44 45 50 48" opacity="0.6" />
      <path d="M26 60 C34 57 44 57 50 60" opacity="0.6" />
      <path d="M70 48 C76 45 86 45 94 48" opacity="0.6" />
      <path d="M70 60 C76 57 86 57 94 60" opacity="0.6" />
      <path d="M60 16 V24 M46 20 L50 26 M74 20 L70 26" />
    </svg>
  );
}

function CareerBriefcaseIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="18" y="38" width="84" height="58" rx="10" />
      <path d="M44 38 V28 C44 24 47 22 51 22 H69 C73 22 76 24 76 28 V38" />
      <path d="M18 60 H102" />
      <rect x="52" y="54" width="16" height="12" rx="3" />
      <path d="M84 22 L98 12 M98 12 H88 M98 12 V22" opacity="0.7" />
    </svg>
  );
}

function CareerGrowthIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 96 H100" />
      <rect x="26" y="70" width="14" height="26" rx="3" />
      <rect x="52" y="54" width="14" height="42" rx="3" />
      <rect x="78" y="36" width="14" height="60" rx="3" />
      <path d="M24 54 L56 36 L88 18" />
      <path d="M76 18 H88 V30" />
    </svg>
  );
}

function GlobalStudyIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="36" />
      <ellipse cx="60" cy="60" rx="16" ry="36" />
      <path d="M24 60 H96" />
      <path d="M30 42 H90" opacity="0.7" />
      <path d="M30 78 H90" opacity="0.7" />
      <path d="M16 34 C34 14 86 14 104 34" strokeDasharray="4 5" opacity="0.6" />
    </svg>
  );
}

function CompassDirectionIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="38" />
      <circle cx="60" cy="60" r="30" strokeDasharray="4 4" opacity="0.5" />
      <polygon points="60,34 68,58 60,86 52,58" />
      <path d="M60 16 V22 M60 98 V104 M16 60 H22 M98 60 H104" />
    </svg>
  );
}

const PAGE_LAYOUTS = {
  home: [
    { Icon: GraduationCapIllustration, pos: 'top-[92vh] left-[3%]', size: 'w-24 h-24 sm:w-32 sm:h-32', color: 'text-aroham-forest/10', anim: 'animate-float-slow' },
    { Icon: CareerGrowthIllustration, pos: 'top-[108vh] right-[4%]', size: 'w-24 h-24 sm:w-32 sm:h-32', color: 'text-aroham-gold/15', anim: 'animate-float-reverse' },
    { Icon: OpenBookIllustration, pos: 'bottom-28 left-[5%]', size: 'w-24 h-24 sm:w-28 sm:h-28', color: 'text-aroham-terracotta/10', anim: 'animate-float-drift' },
  ],
  about: [
    { Icon: OpenBookIllustration, pos: 'top-[460px] left-[2%]', size: 'w-24 h-24 sm:w-32 sm:h-32', color: 'text-aroham-forest/10', anim: 'animate-float-slow' },
    { Icon: GraduationCapIllustration, pos: 'top-[640px] right-[3%]', size: 'w-28 h-28 sm:w-36 sm:h-36', color: 'text-aroham-gold/15', anim: 'animate-float-reverse' },
    { Icon: CompassDirectionIllustration, pos: 'bottom-[340px] left-[3%]', size: 'w-24 h-24 sm:w-32 sm:h-32', color: 'text-aroham-terracotta/10', anim: 'animate-float-drift' },
    { Icon: CareerBriefcaseIllustration, pos: 'bottom-24 right-[4%]', size: 'w-24 h-24 sm:w-28 sm:h-28', color: 'text-aroham-forest/10', anim: 'animate-float-slow' },
  ],
  unimates: [
    { Icon: GlobalStudyIllustration, pos: 'top-24 right-[4%]', size: 'w-28 h-28 sm:w-36 sm:h-36', color: 'text-aroham-forest/10', anim: 'animate-float-slow' },
    { Icon: GraduationCapIllustration, pos: 'top-[460px] left-[2%]', size: 'w-24 h-24 sm:w-32 sm:h-32', color: 'text-aroham-gold/15', anim: 'animate-float-reverse' },
    { Icon: CareerGrowthIllustration, pos: 'bottom-[380px] right-[3%]', size: 'w-24 h-24 sm:w-32 sm:h-32', color: 'text-aroham-terracotta/10', anim: 'animate-float-drift' },
    { Icon: OpenBookIllustration, pos: 'bottom-24 left-[4%]', size: 'w-24 h-24 sm:w-28 sm:h-28', color: 'text-aroham-forest/10', anim: 'animate-float-slow' },
  ],
  events: [
    { Icon: CompassDirectionIllustration, pos: 'top-24 right-[4%]', size: 'w-24 h-24 sm:w-32 sm:h-32', color: 'text-aroham-gold/15', anim: 'animate-float-slow' },
    { Icon: CareerBriefcaseIllustration, pos: 'top-[440px] left-[2%]', size: 'w-24 h-24 sm:w-32 sm:h-32', color: 'text-aroham-forest/10', anim: 'animate-float-reverse' },
    { Icon: GlobalStudyIllustration, pos: 'bottom-32 right-[3%]', size: 'w-28 h-28 sm:w-32 sm:h-32', color: 'text-aroham-terracotta/10', anim: 'animate-float-drift' },
  ],
  contact: [
    { Icon: OpenBookIllustration, pos: 'top-28 right-[4%]', size: 'w-24 h-24 sm:w-32 sm:h-32', color: 'text-aroham-forest/10', anim: 'animate-float-slow' },
    { Icon: CareerGrowthIllustration, pos: 'top-[480px] left-[2%]', size: 'w-24 h-24 sm:w-32 sm:h-32', color: 'text-aroham-gold/15', anim: 'animate-float-reverse' },
    { Icon: GraduationCapIllustration, pos: 'bottom-28 right-[4%]', size: 'w-24 h-24 sm:w-32 sm:h-32', color: 'text-aroham-terracotta/10', anim: 'animate-float-drift' },
  ],
};

export default function BackgroundIllustrations({ variant = 'home' }) {
  const items = PAGE_LAYOUTS[variant] || PAGE_LAYOUTS.home;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
      {items.map(({ Icon, pos, size, color, anim }, idx) => (
        <div key={`${variant}-${idx}`} className={`absolute ${pos} ${color} ${anim}`}>
          <Icon className={size} />
        </div>
      ))}
    </div>
  );
}

