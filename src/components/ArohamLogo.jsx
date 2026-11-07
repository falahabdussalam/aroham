import React from 'react';

export function ArohamEmblem({ className = "w-10 h-10", size = 40 }) {
  return (
    <img
      src="/emblem.png"
      alt="Aroham Emblem"
      width={size}
      height={size}
      style={{ width: size, height: 'auto' }}
      className={`object-contain ${className}`}
    />
  );
}

export default function ArohamLogo({ withText = true, textDark = true, size = 50, onClick }) {
  const isLarge = size >= 42;

  return (
    <div 
      className="flex items-center gap-3 cursor-pointer group select-none"
      onClick={onClick}
    >
      <ArohamEmblem size={size} className="transition-transform group-hover:scale-105 duration-200 shrink-0" />
      {withText && (
        <div className="flex flex-col justify-center">
          <span className={`${isLarge ? 'text-2xl sm:text-[26px]' : 'text-xl'} font-bold tracking-tight font-serif leading-none ${textDark ? 'text-aroham-heading' : 'text-white'}`}>
            Aroham
          </span>
          <span className={`${isLarge ? 'text-[11px] sm:text-[11.5px]' : 'text-[10px]'} uppercase font-bold tracking-[0.24em] leading-none ${textDark ? 'text-aroham-muted' : 'text-emerald-300'}`}>
            FOUNDATION
          </span>
        </div>
      )}
    </div>
  );
}
