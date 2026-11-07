import React from 'react';

export function ArohamEmblem({ className = "", size = 48 }) {
  const heightStyle = typeof size === 'number' ? `${size}px` : undefined;
  return (
    <img
      src="/emblem.png"
      alt="Aroham Emblem"
      style={heightStyle ? { height: heightStyle, width: 'auto' } : undefined}
      className={`object-contain shrink-0 ${className}`}
    />
  );
}

export default function ArohamLogo({ 
  withText = true, 
  textDark = true, 
  size = "header", 
  className = "",
  onClick 
}) {
  // Sizing presets tailored for header and footer prominence
  let emblemClasses = "h-11 sm:h-14 w-auto";
  let titleClasses = "text-[26px] sm:text-[32px]";
  let subtitleClasses = "text-[11px] sm:text-[13px] tracking-[0.24em] mt-0.5";
  let gapClass = "gap-2 sm:gap-2.5";

  if (size === "footer") {
    emblemClasses = "h-14 sm:h-16 w-auto";
    titleClasses = "text-[30px] sm:text-[36px]";
    subtitleClasses = "text-[12px] sm:text-[14px] tracking-[0.26em] mt-0.5";
    gapClass = "gap-2.5 sm:gap-3";
  } else if (size === "large") {
    emblemClasses = "h-16 sm:h-20 w-auto";
    titleClasses = "text-3xl sm:text-4xl";
    subtitleClasses = "text-xs sm:text-sm tracking-[0.26em] mt-1";
    gapClass = "gap-3";
  } else if (typeof size === "number") {
    emblemClasses = "w-auto";
    gapClass = "gap-2";
  }

  return (
    <div 
      className={`flex items-center ${gapClass} cursor-pointer group select-none ${className}`}
      onClick={onClick}
    >
      <img
        src="/emblem.png"
        alt="Aroham Emblem"
        style={typeof size === "number" ? { height: `${size}px`, width: 'auto' } : undefined}
        className={`object-contain shrink-0 transition-transform duration-200 group-hover:scale-105 ${emblemClasses}`}
      />
      {withText && (
        <div className="flex flex-col justify-center leading-none">
          <span className={`${titleClasses} font-bold tracking-tight font-serif ${textDark ? 'text-aroham-heading' : 'text-white'}`}>
            Aroham
          </span>
          <span className={`${subtitleClasses} uppercase font-extrabold ${textDark ? 'text-aroham-muted' : 'text-emerald-300'}`}>
            FOUNDATION
          </span>
        </div>
      )}
    </div>
  );
}
