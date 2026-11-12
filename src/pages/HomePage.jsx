import React from 'react';
import { 
  ArrowRight, 
  Building2, 
  Users, 
  BookOpen, 
  Quote 
} from 'lucide-react';
import Reveal from '../components/Reveal';

export default function HomePage({ setActivePage, onOpenGetInvolved, mentorsCount = 10 }) {
  return (
    <div className="space-y-20 lg:space-y-28 pb-12 animate-fadeIn">
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
                el.play().catch(() => {});
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
          <h1 className="hero-reveal hero-reveal-1 text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white leading-[1.2] sm:leading-[1.15] tracking-tight drop-shadow-sm">
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
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                {mentorsCount}+
              </div>
              <div className="text-xs font-semibold text-emerald-100/85 mt-0.5">
                Alumnae Mentors
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                100%
              </div>
              <div className="text-xs font-semibold text-emerald-100/85 mt-0.5">
                Student Match Rate
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
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
          TWO PILLARS CARDS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1: Aroham Foundation */}
          <Reveal variant="up" delay={0}>
          <div className="h-full bg-white rounded-3xl p-8 sm:p-10 shadow-soft border border-aroham-border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-aroham-mint flex items-center justify-center text-aroham-dark">
                <Building2 size={24} />
              </div>

              <h3 className="text-2xl font-bold font-serif text-aroham-heading">
                Aroham Foundation
              </h3>

              <p className="text-sm text-aroham-body leading-relaxed">
                Founded by Bolster Girls Campus alumnae, this non-profit, women-led organisation brings together alumnae to create educational opportunities, guidance, and mentorship for students.
              </p>

              <ul className="space-y-3 pt-2 text-xs font-medium text-aroham-heading">
                <li className="flex items-start gap-2">
                  <ArrowRight size={14} strokeWidth={2.25} className="text-aroham-forest shrink-0 mt-0.5" />
                  <span>Generational support networks spanning global institutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight size={14} strokeWidth={2.25} className="text-aroham-forest shrink-0 mt-0.5" />
                  <span>Career readiness, scholarship grants & academic resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight size={14} strokeWidth={2.25} className="text-aroham-forest shrink-0 mt-0.5" />
                  <span>Cultivating leadership and self-determination in young women</span>
                </li>
              </ul>
            </div>
          </div>
          </Reveal>

          {/* Pillar 2: Aroham UniMates */}
          <Reveal variant="up" delay={140}>
          <div className="h-full bg-white rounded-3xl p-8 sm:p-10 shadow-soft border-t-4 border-t-aroham-terracotta border-x border-b border-aroham-border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-aroham-gold">
                <Users size={24} />
              </div>

              <h3 className="text-2xl font-bold font-serif text-aroham-heading">
                Aroham UniMates
              </h3>

              <p className="text-sm text-aroham-body leading-relaxed">
                Aroham's one-to-one student mentorship programme, connecting students with alum mentors who offer guidance and support in their educational journeys.
              </p>

              <ul className="space-y-3 pt-2 text-xs font-medium text-aroham-heading">
                <li className="flex items-start gap-2">
                  <ArrowRight size={14} strokeWidth={2.25} className="text-aroham-terracotta shrink-0 mt-0.5" />
                  <span>Personalised matches tailored to field of study and interests</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight size={14} strokeWidth={2.25} className="text-aroham-terracotta shrink-0 mt-0.5" />
                  <span>Ongoing academic tracking, application reviews, and mock sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight size={14} strokeWidth={2.25} className="text-aroham-terracotta shrink-0 mt-0.5" />
                  <span>Safe, empathetic space to navigate campus life & ambitions</span>
                </li>
              </ul>
            </div>
          </div>
          </Reveal>
        </div>
      </section>


      {/* =========================================================================
          QUOTE & TESTIMONIAL SECTION WITH DARK YELLOW WAVE BACKGROUND
          ========================================================================= */}
      <section className="relative w-full overflow-hidden">
        {/* Top Organic Wave + Decorative Aroham Logo Watermark */}
        <div className="relative w-full leading-none pointer-events-none select-none">
          {/* Decorative Aroham Logo Watermark (Right Side overlapping wave line) */}
          <img
            src="/emblem.png"
            alt=""
            aria-hidden="true"
            className="w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain absolute right-4 sm:right-12 lg:right-24 -top-4 sm:-top-8 opacity-[0.16] mix-blend-multiply z-0"
          />

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

        {/* Dark Yellow Tinted Wave Body */}
        <div className="bg-[rgba(180,114,8,0.16)] pb-14 sm:pb-20 pt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Reveal variant="up" delay={0}>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-aroham-heading leading-tight max-w-2xl mx-auto">
                "When one alumna rises, she extends a hand to ten more."
              </h2>
              </Reveal>

              <Reveal variant="up" delay={100}>
              <p className="text-sm sm:text-base text-aroham-body leading-relaxed max-w-[820px] mx-auto text-justify">
                Aroham Foundation bridges the transition from school corridors to global lecture halls. Our network of Bolster Girls Campus alumnae spans medicine, public policy, engineering, humanities, and social entrepreneurship, dedicated to nurturing each young woman's distinctive spark.
              </p>
              </Reveal>

              {/* Testimonial callout */}
              <Reveal variant="scale" delay={180}>
              <div className="p-6 rounded-2xl bg-white border border-aroham-border shadow-soft max-w-2xl mx-auto text-center space-y-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
                <Quote size={24} className="text-aroham-gold mx-auto opacity-70" />
                <p className="text-xs sm:text-sm italic text-aroham-heading leading-relaxed">
                  "Having a mentor who walked the very same halls gave me the certainty I needed to apply for national merit fellowships. UniMates changed my trajectory."
                </p>
                <span className="block text-[11px] font-bold text-aroham-muted uppercase tracking-wider">
                  — Scholar Cohort '24
                </span>
              </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Bottom Organic Wave returning to Cream */}
        <div className="w-full leading-none pointer-events-none select-none bg-[rgba(180,114,8,0.16)]">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            className="w-full h-12 sm:h-16 lg:h-20 block"
            aria-hidden="true"
          >
            <path
              d="M0,24 C360,84 1020,0 1440,56 L1440,90 L0,90 Z"
              fill="#F4F8F5"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
