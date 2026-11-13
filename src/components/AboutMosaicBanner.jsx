import React from 'react';
import Reveal from './Reveal';

// Pre-compute deterministic matrix of small square tiles (recreating user reference banner)
const MOSAIC_COLS = 26;
const MOSAIC_ROWS = 14;
const CELL_PITCH = 18; // 14px tile + 4px gap

const MOSAIC_TILES = (() => {
  const tiles = [];
  for (let c = 0; c < MOSAIC_COLS; c++) {
    for (let r = 0; r < MOSAIC_ROWS; r++) {
      // Density increases from left (sparse dissolving) to right (dense digital matrix)
      let threshold = 88; // col 0-4: ~12% density
      if (c >= 18) threshold = 18; // col 18-25: ~82% density
      else if (c >= 12) threshold = 42; // col 12-17: ~58% density
      else if (c >= 6) threshold = 66; // col 6-11: ~34% density

      const hash = (c * 37 + r * 59 + ((c ^ r) * 17)) % 100;
      if (hash >= threshold) {
        const animIndex = ((c * 3 + r * 5) % 4) + 1;
        const delay = (((c * 7 + r * 11) % 45) / 10).toFixed(1);
        const isWarmTint = hash % 5 === 0;
        tiles.push({
          key: `${c}-${r}`,
          x: c * CELL_PITCH + 8,
          y: r * CELL_PITCH + 8,
          fill: isWarmTint ? '#FEF3C7' : '#FFFFFF',
          className: `mosaic-box-${animIndex}`,
          delay: `${delay}s`,
        });
      }
    }
  }
  return tiles;
})();

export default function AboutMosaicBanner() {
  return (
    <section className="relative w-full overflow-hidden shadow-elevated">
      {/* Background Gradient Layer with 75% Opacity on Mobile */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#F59E0B] opacity-75 sm:opacity-100 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Background Soft Glow Accents */}
      <div 
        className="absolute top-1/2 right-[15%] -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-amber-300/25 blur-3xl pointer-events-none z-0" 
        aria-hidden="true" 
      />

      {/* Small Boxes Digital Grid on Right with Slow Organic Blinking Animation */}
      <div 
        className="absolute inset-y-0 right-0 w-full sm:w-3/5 lg:w-1/2 pointer-events-none select-none overflow-hidden flex items-center justify-end z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 480 260"
          preserveAspectRatio="xMaxYMid meet"
          className="w-full h-full max-h-[340px] opacity-90"
        >
          <defs>
            <linearGradient id="mosaicFadeMask" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
            <mask id="mosaicMask">
              <rect x="0" y="0" width="480" height="260" fill="url(#mosaicFadeMask)" />
            </mask>
          </defs>

          <g mask="url(#mosaicMask)">
            {MOSAIC_TILES.map((tile) => (
              <rect
                key={tile.key}
                x={tile.x}
                y={tile.y}
                width="14"
                height="14"
                rx="2.5"
                ry="2.5"
                fill={tile.fill}
                className={tile.className}
                style={{ animationDelay: tile.delay }}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Main Quote Content on Left */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <Reveal variant="up" className="max-w-2xl sm:max-w-3xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold font-serif text-black sm:text-white leading-relaxed tracking-tight drop-shadow-none sm:drop-shadow-sm">
            "From early conversations to an organised movement, Aroham grew through alumnae dedication. Today, we help students make confident academic and career choices through mentorship and education."
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

