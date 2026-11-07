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

export default function ArohamLogo({ withText = true, textDark = true, size = 38, onClick }) {
  return (
    <div 
      className="flex items-center gap-2.5 cursor-pointer group select-none"
      onClick={onClick}
    >
      <ArohamEmblem size={size} className="transition-transform group-hover:scale-105 duration-200 shrink-0" />
      {withText && (
        <div className="flex flex-col justify-center -space-y-0.5">
          <span className={`text-xl font-bold tracking-tight font-serif leading-none ${textDark ? 'text-aroham-heading' : 'text-white'}`}>
            Aroham
          </span>
          <span className={`text-[9.5px] uppercase font-bold tracking-[0.22em] leading-none ${textDark ? 'text-aroham-muted' : 'text-emerald-300'}`}>
            FOUNDATION
          </span>
        </div>
      )}
    </div>
  );
}
