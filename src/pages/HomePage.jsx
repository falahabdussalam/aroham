import React from 'react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Building2, 
  Users, 
  ShieldCheck, 
  BookOpen, 
  HeartHandshake, 
  Quote, 
  TrendingUp, 
  Mail 
} from 'lucide-react';

export default function HomePage({ setActivePage, onOpenGetInvolved, mentorsCount = 10 }) {
  return (
    <div className="space-y-20 lg:space-y-28 pb-12 animate-fadeIn">
      {/* =========================================================================
          HERO SECTION WITH AMBIENT BACKGROUND VIDEO
          ========================================================================= */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-14 pb-16 sm:pt-20 sm:pb-28 overflow-hidden bg-aroham-dark">
        {/* Full-Fit Background Video with Aroham Dark (#0B3B2C) 85% Opacity Cover */}
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
          {/* Same background color as Get Involved button (#0B3B2C) at 85% opacity */}
          <div className="absolute inset-0 bg-aroham-dark/85 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-7">
          {/* Subtitle */}
          <p className="text-[11px] sm:text-xs uppercase font-extrabold tracking-[0.25em] text-amber-300 drop-shadow-sm">
            Aroham Foundation
          </p>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white leading-[1.2] sm:leading-[1.15] tracking-tight drop-shadow-sm">
            Connected by Our Past, <br />
            <span className="italic font-serif font-normal text-emerald-100">
              United by Our Future.
            </span>
          </h1>

          {/* Paragraph */}
          <p className="text-sm sm:text-lg text-emerald-50/90 font-medium leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
            Bringing generations together, turning shared experiences into opportunities, and guiding students towards a future filled with possibilities.
          </p>

          {/* Action Buttons with smooth section scrolling */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-sm sm:max-w-none mx-auto">
            <button
              onClick={() => setActivePage('unimates')}
              className="w-full sm:w-auto px-6 py-3.5 bg-aroham-terracotta hover:bg-aroham-terracotta-dark text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Explore UniMates</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setActivePage('about')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/95 backdrop-blur-sm hover:bg-white text-aroham-dark text-sm font-semibold rounded-lg border border-white/30 shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              <BookOpen size={16} className="text-aroham-forest" />
              <span>Our Story</span>
            </button>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-6 pt-6 max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-elevated">
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
          TWO PILLARS, ONE SHARED MISSION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold">
            Our Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-aroham-heading">
            Two Pillars, One Shared Mission
          </h2>
          <p className="text-sm text-aroham-body leading-relaxed">
            From organizational advocacy to personalized student mentorship, discover how the Aroham ecosystem elevates students at every crossroad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1: Aroham Foundation */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-soft border border-aroham-border flex flex-col justify-between transition-all duration-200 hover:shadow-elevated">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-aroham-mint flex items-center justify-center text-aroham-dark">
                  <Building2 size={24} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-aroham-sage text-aroham-forest border border-aroham-border">
                  Institutional Entity
                </span>
              </div>

              <h3 className="text-2xl font-bold font-serif text-aroham-heading">
                Aroham Foundation
              </h3>

              <p className="text-sm text-aroham-body leading-relaxed">
                Founded by Bolster Girls Campus alumnae, this non-profit, women-led organisation brings together alumnae to create educational opportunities, guidance, and mentorship for students.
              </p>

              <ul className="space-y-3 pt-2 text-xs font-medium text-aroham-heading">
                <li className="flex items-start gap-2">
                  <span className="text-aroham-forest font-bold">→</span>
                  <span>Generational support networks spanning global institutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-aroham-forest font-bold">→</span>
                  <span>Career readiness, scholarship grants & academic resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-aroham-forest font-bold">→</span>
                  <span>Cultivating leadership and self-determination in young women</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-aroham-border">
              <button
                onClick={() => setActivePage('about')}
                className="text-xs font-bold text-aroham-dark hover:text-aroham-forest inline-flex items-center gap-1.5 transition-colors group"
              >
                <span>Learn More About Us</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Pillar 2: Aroham UniMates */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-soft border-t-4 border-t-aroham-terracotta border-x border-b border-aroham-border flex flex-col justify-between transition-all duration-200 hover:shadow-elevated">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-aroham-gold">
                  <Users size={24} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-aroham-amber-light text-aroham-gold border border-amber-200/80">
                  1:1 Mentorship
                </span>
              </div>

              <h3 className="text-2xl font-bold font-serif text-aroham-heading">
                Aroham UniMates
              </h3>

              <p className="text-sm text-aroham-body leading-relaxed">
                Aroham's one-to-one student mentorship programme, connecting students with alum mentors who offer guidance and support in their educational journeys.
              </p>

              <ul className="space-y-3 pt-2 text-xs font-medium text-aroham-heading">
                <li className="flex items-start gap-2">
                  <span className="text-aroham-terracotta font-bold">→</span>
                  <span>Personalised matches tailored to field of study and interests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-aroham-terracotta font-bold">→</span>
                  <span>Ongoing academic tracking, application reviews, and mock sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-aroham-terracotta font-bold">→</span>
                  <span>Safe, empathetic space to navigate campus life & ambitions</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-aroham-border">
              <button
                onClick={() => setActivePage('unimates')}
                className="text-xs font-bold text-aroham-terracotta hover:text-aroham-terracotta-dark inline-flex items-center gap-1.5 transition-colors group"
              >
                <span>Find a Mentor / Join UniMates</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          QUOTE & MENTORSHIP GROWTH MAP
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Quote Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-aroham-forest">
              <HeartHandshake size={15} />
              <span>Generational Sisterhood</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-aroham-heading leading-tight">
              "When one alumna rises, she extends a hand to ten more."
            </h2>

            <p className="text-sm sm:text-base text-aroham-body leading-relaxed max-w-xl">
              Aroham Foundation bridges the transition from school corridors to global lecture halls. Our network of Bolster Girls Campus alumnae spans medicine, public policy, engineering, humanities, and social entrepreneurship, dedicated to nurturing each young woman's distinctive spark.
            </p>

            {/* Testimonial callout */}
            <div className="p-5 rounded-2xl bg-white border border-aroham-border shadow-soft flex items-start gap-4 max-w-xl">
              <Quote size={28} className="text-aroham-gold shrink-0 mt-1 opacity-70" />
              <div>
                <p className="text-xs sm:text-sm italic text-aroham-heading leading-relaxed">
                  "Having a mentor who walked the very same halls gave me the certainty I needed to apply for national merit fellowships. UniMates changed my trajectory."
                </p>
                <span className="block text-[11px] font-bold text-aroham-muted uppercase tracking-wider mt-2">
                  — Scholar Cohort '24
                </span>
              </div>
            </div>
          </div>

          {/* Right Mentorship Growth Map Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-aroham-border space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-serif text-aroham-heading">
                    Mentorship Growth Map
                  </h3>
                  <TrendingUp size={18} className="text-aroham-forest" />
                </div>
                <p className="text-xs text-aroham-body mt-1">
                  Distribution of student guidance pathways across universities and career tracks.
                </p>
              </div>

              {/* Progress bars */}
              <div className="space-y-4">
                {/* STEM */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-aroham-heading">
                    <span>STEM & Technology Advancements</span>
                    <span>42%</span>
                  </div>
                  <div className="w-full h-2.5 bg-aroham-sage rounded-full overflow-hidden">
                    <div className="h-full bg-aroham-dark rounded-full w-[42%]" />
                  </div>
                </div>

                {/* Humanities & Law */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-aroham-heading">
                    <span>Humanities, Law & Public Policy</span>
                    <span>34%</span>
                  </div>
                  <div className="w-full h-2.5 bg-aroham-sage rounded-full overflow-hidden">
                    <div className="h-full bg-aroham-gold rounded-full w-[34%]" />
                  </div>
                </div>

                {/* Medicine & Biology */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-aroham-heading">
                    <span>Medicine, Healthcare & Biology</span>
                    <span>24%</span>
                  </div>
                  <div className="w-full h-2.5 bg-aroham-sage rounded-full overflow-hidden">
                    <div className="h-full bg-aroham-terracotta rounded-full w-[24%]" />
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-aroham-border flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-aroham-forest font-semibold">
                  <ShieldCheck size={15} />
                  <span>100% Volunteer Driven</span>
                </span>
                <button
                  onClick={() => setActivePage('about')}
                  className="font-semibold text-aroham-dark hover:underline"
                >
                  Read Impact Report
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
