import React from 'react';
import {
  ArrowRight,
  Building2,
  Users,
  BookOpen
} from 'lucide-react';
import Reveal from '../components/Reveal';

export default function HomePage({ setActivePage, onOpenGetInvolved, mentorsCount = 10 }) {
  return (
    <div className="space-y-20 lg:space-y-28 animate-fadeIn">
      {/* =========================================================================
          HERO SECTION WITH AMBIENT BACKGROUND VIDEO
          ========================================================================= */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-14 pb-16 sm:pt-20 sm:pb-28 overflow-hidden bg-aroham-dark">
        {/* Full-Fit Background Video with Aroham Dark (#0B3B2C) 90% Opacity Cover */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            ref={(el) => {
              if (el) {
                el.muted = true;
                el.setAttribute('playsinline', '');
                el.setAttribute('webkit-playsinline', '');
                el.play().catch(() => { });
              }
            }}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Same background color as Get Involved button (#0B3B2C) at 90% opacity */}
          <div className="absolute inset-0 bg-aroham-dark/90 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-7">
          {/* Headline */}
          <h1 className="hero-reveal hero-reveal-1 text-3xl sm:text-5xl lg:text-6xl font-semibold font-serif text-white leading-[1.2] sm:leading-[1.15] tracking-tight drop-shadow-sm">
            Connected by Our Past, <br />
            <span className="italic font-serif font-normal text-emerald-100">
              United by Our Future.
            </span>
          </h1>

          {/* Paragraph */}
          <p className="hero-reveal hero-reveal-2 text-sm sm:text-base text-emerald-50/90 font-medium leading-relaxed max-w-3xl mx-auto px-2 sm:px-0 text-center">
            Bringing generations together, turning shared experiences into opportunities,
            <br className="hidden sm:inline" />{' '}
            and guiding students towards a future filled with possibilities.
          </p>

          {/* Action Buttons with smooth section scrolling */}
          <div className="hero-reveal hero-reveal-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-sm sm:max-w-none mx-auto">
            <button
              onClick={() => setActivePage('unimates')}
              className="w-full sm:w-auto px-6 py-3.5 bg-aroham-terracotta hover:bg-aroham-terracotta-dark text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 flex items-center justify-center"
            >
              <span>Explore UniMates</span>
            </button>

            <button
              onClick={() => setActivePage('about')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/95 backdrop-blur-sm hover:bg-white text-aroham-dark text-sm font-semibold rounded-lg border border-white/30 shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              <BookOpen size={16} className="text-aroham-forest" />
              <span>Our Story</span>
            </button>
          </div>

          {/* Metrics Row */}
          <div className="hero-reveal hero-reveal-4 grid grid-cols-3 gap-6 pt-6 max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-elevated transition-all duration-300 hover:bg-white/15">
            <div>
              <div className="text-2xl sm:text-3xl font-semibold font-serif text-white">
                {mentorsCount}+
              </div>
              <div className="text-xs font-semibold text-emerald-100/85 mt-0.5">
                Alumnae Mentors
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-semibold font-serif text-white">
                100%
              </div>
              <div className="text-xs font-semibold text-emerald-100/85 mt-0.5">
                Student Match Rate
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-semibold font-serif text-white">
                Global
              </div>
              <div className="text-xs font-semibold text-emerald-100/85 mt-0.5">
                University Guidance
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          TWO PILLARS CARDS (MODERN INTERACTIVE GLASS CARDS WITH OVERLAY ANIMATIONS)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Pillar 1: Aroham Foundation */}
          <Reveal variant="up" delay={0} className="h-full">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setActivePage('about')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActivePage('about'); } }}
              className="group relative h-full rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-white via-[#FAFBF9] to-emerald-50/40 border border-emerald-950/10 shadow-soft hover:shadow-elevated hover:border-emerald-600/40 transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Dynamic Light Sweep / Shine Overlay Effect */}
              <div
                className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20"
                aria-hidden="true"
              />

              {/* Ambient Radial Glow on Hover */}
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-400/15 blur-3xl opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 z-0"
                aria-hidden="true"
              />

              {/* Subtle Decorative Background Watermark */}
              <div
                className="pointer-events-none absolute -bottom-6 -right-6 text-emerald-900/[0.04] group-hover:text-emerald-900/[0.08] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700 z-0 select-none"
                aria-hidden="true"
              >
                <Building2 size={160} strokeWidth={1} />
              </div>

              {/* Card Main Body */}
              <div className="relative z-10 space-y-6">
                {/* Top Icon */}
                <div className="w-14 h-14 rounded-2xl bg-emerald-100/60 text-aroham-dark border border-emerald-200/80 shadow-xs flex items-center justify-center group-hover:bg-aroham-dark group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Building2 size={26} strokeWidth={2.2} />
                </div>

                {/* Headings & Narrative */}
                <div className="space-y-2.5">
                  <h3 className="text-2xl sm:text-3xl font-semibold font-serif text-aroham-heading tracking-tight group-hover:text-aroham-forest transition-colors duration-300 inline-block relative">
                    Aroham Foundation
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gradient-to-r from-aroham-forest to-emerald-400 rounded-full" />
                  </h3>

                  <p className="text-sm sm:text-base text-aroham-body leading-relaxed">
                    Founded by Bolster Girls Campus alumnae, this women-led non-profit connects graduates with students. Together, we build educational opportunities, guidance, and mentorship.
                  </p>
                </div>

                {/* Interactive Feature List Items with Overlay Animation */}
                <ul className="space-y-2.5 pt-2">
                  <li className="group/item relative overflow-hidden rounded-xl p-3 -mx-3 transition-all duration-300 hover:bg-white/80 hover:shadow-xs hover:translate-x-1.5 border border-transparent hover:border-emerald-100/80 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100/70 text-aroham-forest flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-aroham-forest group-hover/item:text-white transition-colors duration-200">
                      <ArrowRight size={13} strokeWidth={2.5} className="group-hover/item:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-aroham-heading group-hover/item:text-aroham-dark transition-colors">
                      Generational support networks spanning global institutions
                    </span>
                  </li>

                  <li className="group/item relative overflow-hidden rounded-xl p-3 -mx-3 transition-all duration-300 hover:bg-white/80 hover:shadow-xs hover:translate-x-1.5 border border-transparent hover:border-emerald-100/80 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100/70 text-aroham-forest flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-aroham-forest group-hover/item:text-white transition-colors duration-200">
                      <ArrowRight size={13} strokeWidth={2.5} className="group-hover/item:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-aroham-heading group-hover/item:text-aroham-dark transition-colors">
                      Career readiness, scholarship grants & academic resources
                    </span>
                  </li>

                  <li className="group/item relative overflow-hidden rounded-xl p-3 -mx-3 transition-all duration-300 hover:bg-white/80 hover:shadow-xs hover:translate-x-1.5 border border-transparent hover:border-emerald-100/80 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100/70 text-aroham-forest flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-aroham-forest group-hover/item:text-white transition-colors duration-200">
                      <ArrowRight size={13} strokeWidth={2.5} className="group-hover/item:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-aroham-heading group-hover/item:text-aroham-dark transition-colors">
                      Cultivating leadership and self-determination in young women
                    </span>
                  </li>
                </ul>
              </div>

              {/* Bottom Action Button */}
              <div className="relative z-10 mt-8 pt-5 border-t border-emerald-950/10 flex items-center justify-end">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-aroham-dark to-emerald-900 text-white shadow-soft group-hover:shadow-elevated group-hover:scale-105 group-hover:from-emerald-700 group-hover:to-emerald-800 transition-all duration-300 flex items-center justify-center border border-white/20 group-hover:ring-4 group-hover:ring-emerald-500/20">
                  <ArrowRight size={20} strokeWidth={2.2} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Pillar 2: Aroham UniMates */}
          <Reveal variant="up" delay={140} className="h-full">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setActivePage('unimates')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActivePage('unimates'); } }}
              className="group relative h-full rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-white via-[#FAF8F5] to-amber-50/40 border border-amber-950/10 shadow-soft hover:shadow-elevated hover:border-amber-600/40 transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Dynamic Light Sweep / Shine Overlay Effect */}
              <div
                className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20"
                aria-hidden="true"
              />

              {/* Ambient Radial Glow on Hover */}
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 z-0"
                aria-hidden="true"
              />

              {/* Subtle Decorative Background Watermark */}
              <div
                className="pointer-events-none absolute -bottom-6 -right-6 text-amber-900/[0.04] group-hover:text-amber-900/[0.08] group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 z-0 select-none"
                aria-hidden="true"
              >
                <Users size={160} strokeWidth={1} />
              </div>

              {/* Card Main Body */}
              <div className="relative z-10 space-y-6">
                {/* Top Icon */}
                <div className="w-14 h-14 rounded-2xl bg-amber-100/60 text-aroham-gold border border-amber-200/80 shadow-xs flex items-center justify-center group-hover:bg-aroham-gold group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                  <Users size={26} strokeWidth={2.2} />
                </div>

                {/* Headings & Narrative */}
                <div className="space-y-2.5">
                  <h3 className="text-2xl sm:text-3xl font-semibold font-serif text-aroham-heading tracking-tight group-hover:text-aroham-gold transition-colors duration-300 inline-block relative">
                    Aroham UniMates
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gradient-to-r from-aroham-gold to-orange-400 rounded-full" />
                  </h3>

                  <p className="text-sm sm:text-base text-aroham-body leading-relaxed">
                    Aroham's one-to-one mentorship programme connects students with alumnae mentors for dedicated academic and career guidance.
                  </p>
                </div>

                {/* Interactive Feature List Items with Overlay Animation */}
                <ul className="space-y-2.5 pt-2">
                  <li className="group/item relative overflow-hidden rounded-xl p-3 -mx-3 transition-all duration-300 hover:bg-white/80 hover:shadow-xs hover:translate-x-1.5 border border-transparent hover:border-amber-100/80 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-amber-100/70 text-aroham-gold flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-aroham-gold group-hover/item:text-white transition-colors duration-200">
                      <ArrowRight size={13} strokeWidth={2.5} className="group-hover/item:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-aroham-heading group-hover/item:text-aroham-dark transition-colors">
                      Personalised matches tailored to field of study and interests
                    </span>
                  </li>

                  <li className="group/item relative overflow-hidden rounded-xl p-3 -mx-3 transition-all duration-300 hover:bg-white/80 hover:shadow-xs hover:translate-x-1.5 border border-transparent hover:border-amber-100/80 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-amber-100/70 text-aroham-gold flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-aroham-gold group-hover/item:text-white transition-colors duration-200">
                      <ArrowRight size={13} strokeWidth={2.5} className="group-hover/item:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-aroham-heading group-hover/item:text-aroham-dark transition-colors">
                      Ongoing academic tracking, application reviews, and mock sessions
                    </span>
                  </li>

                  <li className="group/item relative overflow-hidden rounded-xl p-3 -mx-3 transition-all duration-300 hover:bg-white/80 hover:shadow-xs hover:translate-x-1.5 border border-transparent hover:border-amber-100/80 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-amber-100/70 text-aroham-gold flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-aroham-gold group-hover/item:text-white transition-colors duration-200">
                      <ArrowRight size={13} strokeWidth={2.5} className="group-hover/item:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-aroham-heading group-hover/item:text-aroham-dark transition-colors">
                      Safe, empathetic space to navigate campus life & ambitions
                    </span>
                  </li>
                </ul>
              </div>

              {/* Bottom Action Button */}
              <div className="relative z-10 mt-8 pt-5 border-t border-amber-950/10 flex items-center justify-end">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-aroham-gold to-amber-600 text-white shadow-soft group-hover:shadow-elevated group-hover:scale-105 group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-300 flex items-center justify-center border border-white/20 group-hover:ring-4 group-hover:ring-amber-500/20">
                  <ArrowRight size={20} strokeWidth={2.2} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* =========================================================================
          QUOTE & TESTIMONIAL SECTION WITH DARK YELLOW WAVE BACKGROUND
          ========================================================================= */}
      <section className="relative w-full overflow-hidden">
        {/* Top Organic Wave + Decorative Aroham Outline Logo */}
        <div className="relative w-full pt-12 sm:pt-16 leading-none pointer-events-none select-none">
          {/* Decorative Aroham Outline Emblem (Full uncropped, right side overlapping wave) */}
          <svg
            viewBox="-4 -4 148 208"
            overflow="visible"
            className="w-24 h-36 sm:w-32 sm:h-44 lg:w-36 lg:h-52 absolute right-6 sm:right-14 lg:right-24 top-0 text-[#B47208]/25 z-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Top Flame / Petal */}
            <path d="M70 4 C58 18 54 30 55 43 C60 35 65 30 70 26 C75 30 80 35 85 43 C86 30 82 18 70 4 Z" />
            {/* Upper-Left Crescent */}
            <path d="M53 18 C42 36 44 62 58 84 C61 79 65 75 69 72 C55 54 50 36 53 18 Z" />
            {/* Left Wing Hook */}
            <path d="M4 44 C18 45 30 51 40 61 C31 56 24 57 24 63 C25 74 34 86 46 95 C44 98 42 101 40 104 C16 90 2 68 4 44 Z" />
            {/* Main Sweeping Teal S-Ribbon Outline */}
            <path d="M87 16 C97 44 95 72 74 96 C53 120 43 142 47 166 C50 180 56 190 64 196 C41 182 28 158 31 132 C34 108 50 90 70 72 C86 56 91 36 87 16 Z" />
            {/* Right Wing to Lower-Center Ribbon Outline */}
            <path d="M136 44 C122 45 110 51 100 61 C109 56 116 57 116 63 C114 78 100 94 82 108 C64 122 57 146 60 180 C52 160 51 134 62 114 C72 98 88 86 102 74 C112 65 124 54 136 44 Z" />
            {/* Lower-Center Inner Curve */}
            <path d="M79 126 C88 140 90 162 80 182 C83 166 80 148 73 135 C75 131 77 128 79 126 Z" />
            {/* Lower-Right Crescent */}
            <path d="M94 114 C114 138 116 174 78 196 C96 174 99 144 85 123 C88 120 91 117 94 114 Z" />
          </svg>

          <svg
            viewBox="0 0 1440 130"
            preserveAspectRatio="none"
            className="w-full h-16 sm:h-24 lg:h-32 block relative z-10"
            aria-hidden="true"
          >
            <path
              d="M0,76 C260,104 460,12 740,22 C1040,34 1200,124 1440,26 L1440,130 L0,130 Z"
              fill="rgba(180, 114, 8, 0.16)"
            />
          </svg>
        </div>

        {/* Dark Yellow Tinted Wave Body (flows seamlessly into Footer) */}
        <div className="bg-[rgba(180,114,8,0.16)] pb-16 sm:pb-24 pt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <Reveal variant="up" delay={0}>
                <h2 className="text-3xl sm:text-4xl font-semibold font-serif text-aroham-heading leading-tight max-w-2xl mx-auto">
                  "When one alumna rises, she extends a hand to ten more."
                </h2>
              </Reveal>

              <Reveal variant="up" delay={100}>
                <p className="text-sm sm:text-base text-aroham-body leading-relaxed max-w-[760px] mx-auto text-center">
                  Aroham Foundation guides students from school corridors to global universities. Our Bolster Girls Campus alumnae work across medicine, policy, engineering, humanities, and social impact to help every young woman thrive.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
