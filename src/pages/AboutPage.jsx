import React, { useState, useEffect } from 'react';
import strategicGatheringImg from '../assets/strategic_gathering.jpg';
import aboutHeroImg from '../assets/about_hero.jpg';
import Reveal from '../components/Reveal';
import AboutMosaicBanner from '../components/AboutMosaicBanner';
import { 
  Flag, 
  Eye, 
  MapPin, 
  Calendar, 
  Users, 
  Award, 
  TrendingUp,
  Heart,
  Sparkles,
  X
} from 'lucide-react';

export default function AboutPage({ setActivePage, onOpenGetInvolved }) {
  const [selectedPoster, setSelectedPoster] = useState(null);

  // Lock body scroll and allow ESC key closing when poster modal is open
  useEffect(() => {
    if (selectedPoster) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedPoster(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedPoster]);
  const committee = [
    {
      id: 'president',
      name: 'Fathimath Mufeedha',
      role: 'President',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/fathimath-mufeedha.jpg',
      badgeColor: 'bg-aroham-dark text-white',
      hasFullPoster: true
    },
    {
      id: 'gen-sec',
      name: 'Afifa M.A',
      role: 'General Secretary',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/afifa-ma.jpg',
      badgeColor: 'bg-aroham-forest text-white',
      hasFullPoster: true
    },
    {
      id: 'fin-sec',
      name: 'Nishfa Mariya V',
      role: 'Finance Secretary',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/nishfa-mariya-v.jpg',
      badgeColor: 'bg-aroham-gold text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-fathima-hija',
      name: 'Fathima Hija T',
      role: 'Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/fathima-hija-t.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-minha-nafeesa',
      name: 'Minha Nafeesa',
      role: 'Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/minha-nafeesa.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-hajara',
      name: 'Hajara Fida',
      role: 'Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/hajara-fida.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-fathima-nasreen',
      name: 'Fathima Nasreen',
      role: 'Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/fathima-nasreen.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-fathima-minha',
      name: 'Fathima Minha PM',
      role: 'Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/fathima-minha-pm.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-shana',
      name: 'Shana',
      role: 'Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/shana.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-khadeeja-misba',
      name: 'Khadeeja Misba PM',
      role: 'Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/khadeeja-misba-pm.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-aysha-huda',
      name: 'Aysha Huda AP',
      role: 'Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/aysha-huda-ap.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-diya-fathima',
      name: 'Diya Fathima MN',
      role: 'Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/diya-fathima-mn.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    }
  ];

  const milestones = [
    {
      date: '12–13 July 2025',
      title: 'The Inception',
      description: 'At the Bolster Girls Campus Alumni Meet, alumnae agreed to form an organised guidance collective.',
      tag: 'Committee Initiated'
    },
    {
      date: '29 July 2025',
      title: 'Digital Network',
      description: 'Launched the official Aroham Instagram page to reconnect batches and share student stories.',
      tag: 'Community Reach'
    },
    {
      date: 'Aug–Oct 2025',
      title: 'Identity Sealed',
      description: 'Finalised the Aroham emblem, core values, and formal operating guidelines.',
      tag: 'Branding & Ethos'
    },
    {
      date: '25–29 Dec 2025',
      title: 'HiLite Mall Summit',
      description: 'Held a five-day planning summit in Kozhikode to assign executive roles and launch UniMates.',
      tag: 'Future Realised'
    }
  ];

  return (
    <div className="space-y-10 lg:space-y-14 pb-20 animate-fadeIn">
      {/* =========================================================================
          HERO SECTION (Full-bleed Banner like reference)
          ========================================================================= */}
      <section className="relative w-full min-h-[380px] sm:min-h-[460px] flex items-end overflow-hidden bg-aroham-dark">
        {/* Background Image */}
        <img
          src={aboutHeroImg}
          alt="Aroham Foundation Alumnae and UniMates Team"
          className="absolute inset-0 w-full h-full object-cover object-[center_55%]"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-aroham-dark/95 via-aroham-dark/55 to-aroham-dark/25" />

        {/* Banner Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 sm:pt-36 sm:pb-14">
          <div className="space-y-1 max-w-4xl hero-reveal hero-reveal-1">
            <h1 className="text-3xl sm:text-5xl font-semibold font-serif text-emerald-300 tracking-tight">
              About Us
            </h1>

            <p className="text-sm sm:text-base text-white/95 leading-relaxed">
              Aroham Foundation is a women-led alumni initiative empowering students through mentorship, education, and community support. Rooted in the sisterhood of Bolster Girls Campus, we connect young learners with experienced alumnae worldwide. Together, we help students make confident academic choices and build brighter futures.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          GENESIS OF AROHAM: FROM SISTERHOOD TO SUSTAINED IMPACT
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="up" className="mb-3 sm:mb-4">
          <h2 className="text-3xl sm:text-4xl font-semibold font-montserrat text-aroham-heading tracking-tight">
            From Sisterhood to Sustained Impact
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Narrative Column */}
          <Reveal variant="right" delay={100} className="lg:col-span-7 space-y-5 text-aroham-body leading-relaxed text-sm sm:text-base">
            <p className="text-base sm:text-lg text-aroham-heading font-medium leading-relaxed">
              Aroham Foundation began with a shared goal among Bolster Girls Campus alumnae: stay connected and create lasting opportunities for future students.
            </p>

            {/* Turning Point Callout - Modern Glassmorphic Milestone Card */}
            <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-amber-50/70 via-white to-amber-100/30 border border-amber-200/90 shadow-soft hover:shadow-elevated hover:border-amber-400 transition-all duration-500 hover:-translate-y-1">
              {/* Dynamic Light Sweep / Shine Overlay Effect */}
              <div 
                className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/70 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20"
                aria-hidden="true"
              />

              {/* Ambient Radial Glow on Hover */}
              <div 
                className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-amber-400/20 blur-3xl opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 z-0"
                aria-hidden="true"
              />

              {/* Subtle Decorative Background Watermark */}
              <div 
                className="pointer-events-none absolute -bottom-4 -right-4 text-amber-900/[0.04] group-hover:text-amber-900/[0.08] group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 z-0 select-none"
                aria-hidden="true"
              >
                <Sparkles size={110} strokeWidth={1.2} />
              </div>

              {/* Card Content */}
              <div className="relative z-10 space-y-4">
                {/* Header Tag Pill with Pulsing Dot */}
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/80 text-amber-900 border border-amber-300/80 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                    <span>The Turning Point • 12–13 July 2025</span>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800/80 uppercase tracking-wider">
                    <Calendar size={13} className="text-amber-600" />
                    Alumni Meet
                  </span>
                </div>

                {/* Narrative Text with Refined Typography */}
                <p className="text-xs sm:text-sm text-aroham-heading leading-relaxed font-normal">
                  The idea took shape at the <strong className="font-semibold text-aroham-dark">Bolster Girls Campus Alumni Meet</strong> on 12–13 July 2025. Casual conversations quickly grew into a collective movement. An executive committee was formed, and formal planning began.
                </p>

                {/* Micro-Badges Row */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-amber-200/60 text-[11px] font-medium text-amber-900/80">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/80 border border-amber-200/70 shadow-2xs">
                    📍 Bolster Girls Campus
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/80 border border-amber-200/70 shadow-2xs">
                    🌱 Executive Committee
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/80 border border-amber-200/70 shadow-2xs">
                    ✨ Collective Movement
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
              From August to October 2025, the team finalised Aroham's name, logo, vision, and mission. Earlier, on 29 July 2025, the official Instagram page went live to unite the wider alumni network.
            </p>

            <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
              On 22 October 2025, Aroham launched its awareness campaign to share its mission publicly. From 25–29 December 2025, a strategic planning summit at HiLite Mall, Kozhikode set the roadmap ahead.
            </p>
          </Reveal>

          {/* Right Cards & Visual Evidence */}
          <Reveal variant="left" delay={180} className="lg:col-span-5 space-y-6">
            {/* Photo Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft border border-aroham-border">
              <div className="relative w-full">
                <img
                  src={strategicGatheringImg}
                  alt="Bolster Summer Camp & Aroham Gathering"
                  className="w-full h-auto object-cover block"
                />
                <span className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 px-2.5 sm:px-3 py-1 rounded-full bg-aroham-dark/85 text-white text-[10px] sm:text-[11px] font-medium backdrop-blur-sm shadow-sm">
                  📍 Bolster Girls Campus, Kerala
                </span>
              </div>
            </div>

            {/* 2 Stats row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-aroham-mint border border-aroham-border">
                <div className="text-3xl font-semibold font-serif text-aroham-dark">
                  100%
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-aroham-forest mt-1">
                  Alumnae Governed
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-aroham-amber-light border border-amber-200">
                <div className="text-3xl font-semibold font-serif text-aroham-gold">
                  4+
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-aroham-gold mt-1">
                  Core Programs
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================================
          QUOTE BANNER WITH ORANGE MOSAIC BACKGROUND
          ========================================================================= */}
      <AboutMosaicBanner />

      {/* =========================================================================
          FOUNDATIONAL TIMELINE (2025)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="up" className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-semibold font-serif text-aroham-heading">
            Foundational Timeline (2025)
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((item, idx) => (
            <Reveal
              key={idx}
              variant="up"
              delay={idx * 90}
              className="h-full bg-white rounded-2xl p-6 border border-aroham-border shadow-soft flex flex-col justify-between hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-aroham-sage text-aroham-forest text-xs font-semibold border border-aroham-border">
                  {item.date}
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-semibold font-serif text-aroham-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs text-aroham-body leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-aroham-border text-[11px] font-semibold text-aroham-muted flex items-center gap-1.5">
                <span>🏷 {item.tag}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* =========================================================================
          OUR GUIDING LIGHT: MISSION & VISION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="up" className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-semibold font-serif text-aroham-heading">
            Our Guiding Light
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Mission Card */}
          <Reveal variant="up" delay={0} className="h-full">
            <div className="group relative h-full rounded-3xl bg-gradient-to-br from-aroham-dark via-[#0c3327] to-[#08261c] p-8 sm:p-12 text-white shadow-soft hover:shadow-elevated border border-emerald-500/20 hover:border-emerald-400/40 flex flex-col justify-between space-y-6 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              {/* Dynamic Light Sweep / Shine Overlay Effect */}
              <div 
                className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20"
                aria-hidden="true"
              />

              {/* Ambient Radial Glow on Hover */}
              <div 
                className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 z-0"
                aria-hidden="true"
              />

              {/* Subtle Decorative Background Watermark */}
              <div 
                className="pointer-events-none absolute -bottom-6 -right-6 text-white/[0.04] group-hover:text-white/[0.08] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 z-0 select-none"
                aria-hidden="true"
              >
                <Flag size={160} strokeWidth={1} />
              </div>

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 group-hover:bg-amber-400 group-hover:text-aroham-dark group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xs">
                    <Flag size={24} strokeWidth={2.2} />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/10 text-emerald-200 border border-white/15">
                    Core Directive
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-semibold font-serif inline-block relative">
                    Our Mission
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200 rounded-full mt-1" />
                  </h3>
                  <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                    Build a global mentor network that guides young people—especially from underserved backgrounds—toward their academic and career goals.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Vision Card */}
          <Reveal variant="up" delay={140} className="h-full">
            <div className="group relative h-full rounded-3xl bg-gradient-to-br from-aroham-gold-gradient-start via-[#d69830] to-aroham-gold-gradient-end p-8 sm:p-12 text-aroham-heading shadow-soft hover:shadow-elevated border border-amber-300/60 hover:border-amber-400 flex flex-col justify-between space-y-6 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              {/* Dynamic Light Sweep / Shine Overlay Effect */}
              <div 
                className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20"
                aria-hidden="true"
              />

              {/* Ambient Radial Glow on Hover */}
              <div 
                className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-200/40 blur-3xl opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 z-0"
                aria-hidden="true"
              />

              {/* Subtle Decorative Background Watermark */}
              <div 
                className="pointer-events-none absolute -bottom-6 -right-6 text-aroham-heading/[0.04] group-hover:text-aroham-heading/[0.08] group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 z-0 select-none"
                aria-hidden="true"
              >
                <Eye size={160} strokeWidth={1} />
              </div>

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-aroham-dark text-white flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-xs">
                    <Eye size={24} strokeWidth={2.2} />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-black/10 text-aroham-heading border border-black/10">
                    North Star
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-semibold font-serif inline-block relative">
                    Our Vision
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gradient-to-r from-aroham-dark to-emerald-900 rounded-full mt-1" />
                  </h3>
                  <p className="text-sm sm:text-base text-aroham-heading/90 leading-relaxed font-medium">
                    A world where every student has the guidance, opportunities, and support needed to build their future with confidence.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================================
          OUR COMMITTEE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold font-serif text-aroham-heading">
            Our Committee
          </h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3.5 lg:gap-6">
          {committee.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-aroham-border shadow-soft group hover:shadow-elevated transition-all duration-200 flex flex-col justify-between"
            >
              <div 
                className="relative aspect-[4/5] sm:h-64 md:h-72 w-full overflow-hidden bg-aroham-sage cursor-pointer shrink-0"
                onClick={() => {
                  setSelectedPoster(member);
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top md:group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2 sm:p-3 md:p-5 flex-1 flex flex-col justify-center">
                <h4 className="text-[11px] sm:text-sm md:text-base font-semibold font-serif text-aroham-heading leading-snug line-clamp-1 sm:line-clamp-none">
                  {member.name}
                </h4>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase font-semibold tracking-wider text-aroham-forest mt-0.5 sm:mt-1 truncate">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Full Poster Lightbox Modal (Works seamlessly on Mobile and Desktop) */}
        {selectedPoster && (
          <div 
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn select-none"
            onClick={() => setSelectedPoster(null)}
          >
            {/* Top Bar with Name & Close Button */}
            <div 
              className="w-full max-w-md flex items-center justify-between mb-3 px-1"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-white text-sm font-semibold truncate pr-2">
                <span>{selectedPoster.name}</span>
                <span className="text-white/60 text-xs ml-1.5">• {selectedPoster.role}</span>
              </div>
              <button
                onClick={() => setSelectedPoster(null)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all transform active:scale-90 shrink-0"
                aria-label="Close Poster"
              >
                <X size={20} />
              </button>
            </div>

            {/* Poster Card View */}
            <div 
              className="relative max-w-md w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPoster.image}
                alt={selectedPoster.name}
                className="max-h-[80vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-white/20"
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

