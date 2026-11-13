import React, { useState, useEffect } from 'react';
import strategicGatheringImg from '../assets/strategic_gathering.jpg';
import aboutHeroImg from '../assets/about_hero.jpg';
import Reveal from '../components/Reveal';
import AboutMosaicBanner from '../components/AboutMosaicBanner';
import { 
  Flag, 
  Eye, 
  MapPin, 
  Users, 
  Award, 
  TrendingUp,
  Heart,
  Sparkles,
  Calendar,
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
      step: '01',
      date: '12–13 July 2025',
      title: 'The Inception',
      description: 'At the Bolster Girls Campus Alumni Meet, alumnae agreed to form an organised guidance collective.',
      tag: 'Committee Initiated'
    },
    {
      step: '02',
      date: '29 July 2025',
      title: 'Digital Network',
      description: 'Launched the official Aroham Instagram page to reconnect batches and share student stories.',
      tag: 'Community Reach'
    },
    {
      step: '03',
      date: 'Aug–Oct 2025',
      title: 'Identity Sealed',
      description: 'Finalised the Aroham emblem, core values, and formal operating guidelines.',
      tag: 'Branding & Ethos'
    },
    {
      step: '04',
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Narrative Column */}
          <Reveal variant="right" delay={100} className="lg:col-span-6 flex flex-col justify-between space-y-5 text-aroham-body leading-relaxed text-sm sm:text-base">
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
              <div className="relative z-10">
                {/* Narrative Text with Refined Typography */}
                <p className="text-xs sm:text-sm text-aroham-heading leading-relaxed font-normal">
                  The idea took shape at the <strong className="font-semibold text-aroham-dark">Bolster Girls Campus Alumni Meet</strong> on 12–13 July 2025. Casual conversations quickly grew into a collective movement. An executive committee was formed, and formal planning began.
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
              From August to October 2025, the team finalised Aroham's name, logo, vision, and mission. Earlier, on 29 July 2025, the official Instagram page went live to unite the wider alumni network.
            </p>

            <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
              On 22 October 2025, Aroham launched its awareness campaign to share its mission publicly. From 25–29 December 2025, a strategic planning summit at HiLite Mall, Kozhikode set the roadmap ahead.
            </p>
          </Reveal>

          {/* Right Image Column - Perfectly Aligned in Same Position and Height */}
          <Reveal variant="left" delay={180} className="lg:col-span-6 flex flex-col h-full">
            <div className="group relative h-full min-h-[340px] sm:min-h-[420px] p-2.5 sm:p-3 bg-white rounded-2xl sm:rounded-3xl shadow-soft hover:shadow-elevated border border-slate-200/90 transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col">
              <div className="relative flex-1 w-full h-full min-h-[320px] sm:min-h-[400px] overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100">
                {/* Dynamic Light Sweep / Shine Overlay Effect */}
                <div 
                  className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20"
                  aria-hidden="true"
                />

                {/* Main Photo with Smooth Hover Zoom */}
                <img
                  src={strategicGatheringImg}
                  alt="Aroham Alumnae Academic & Career Guidance Session"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out block"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats Row - Spanning cleanly across below the story */}
        <Reveal variant="up" delay={220} className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-aroham-mint border border-aroham-border flex items-center justify-between shadow-2xs hover:shadow-soft transition-all duration-300">
            <div>
              <div className="text-3xl font-semibold font-serif text-aroham-dark">
                100%
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-aroham-forest mt-1">
                Alumnae Governed
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/70 border border-emerald-200/60 flex items-center justify-center text-aroham-forest">
              <Users size={22} />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-aroham-amber-light border border-amber-200 flex items-center justify-between shadow-2xs hover:shadow-soft transition-all duration-300">
            <div>
              <div className="text-3xl font-semibold font-serif text-aroham-gold">
                4+
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-aroham-gold mt-1">
                Core Programs
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/70 border border-amber-300/60 flex items-center justify-center text-aroham-gold">
              <Award size={22} />
            </div>
          </div>
        </Reveal>
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
              className="h-full"
            >
              <div className="group relative h-full rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-soft hover:shadow-elevated hover:border-emerald-600/30 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
                {/* Dynamic Light Sweep / Shine Overlay Effect */}
                <div 
                  className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20"
                  aria-hidden="true"
                />

                {/* Ambient Radial Glow on Hover */}
                <div 
                  className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-emerald-500/[0.08] blur-2xl opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 z-0"
                  aria-hidden="true"
                />

                {/* Watermark Milestone Number in Corner */}
                <div 
                  className="pointer-events-none absolute -bottom-3 -right-2 text-6xl font-serif font-bold text-slate-900/[0.04] group-hover:text-emerald-900/[0.08] group-hover:scale-110 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-500 select-none z-0"
                  aria-hidden="true"
                >
                  {item.step}
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Top Bar with Date Badge and Step Indicator */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-aroham-forest text-xs font-semibold border border-emerald-100/90 shadow-2xs group-hover:bg-aroham-forest group-hover:text-white transition-colors duration-300">
                      <Calendar size={12} strokeWidth={2.2} />
                      {item.date}
                    </span>
                    <span className="text-[11px] font-mono font-semibold tracking-wider text-slate-400 group-hover:text-aroham-forest transition-colors">
                      #{item.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold font-serif text-aroham-heading tracking-tight group-hover:text-aroham-dark transition-colors inline-block relative">
                      {item.title}
                      <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gradient-to-r from-aroham-forest to-emerald-400 rounded-full mt-0.5" />
                    </h3>
                    <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
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
            <div className="group relative h-full rounded-3xl bg-aroham-dark p-8 sm:p-12 text-white shadow-soft hover:shadow-elevated border border-emerald-500/20 hover:border-emerald-400/40 flex flex-col justify-between space-y-6 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
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
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 group-hover:bg-amber-400 group-hover:text-aroham-dark group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xs">
                  <Flag size={24} strokeWidth={2.2} />
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-semibold font-serif inline-block relative">
                    Our Mission
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-400 rounded-full mt-1" />
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
            <div className="group relative h-full rounded-3xl bg-[#d69830] p-8 sm:p-12 text-aroham-heading shadow-soft hover:shadow-elevated border border-amber-400/50 hover:border-amber-400 flex flex-col justify-between space-y-6 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
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
                <div className="w-14 h-14 rounded-2xl bg-aroham-dark text-white flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-xs">
                  <Eye size={24} strokeWidth={2.2} />
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-semibold font-serif inline-block relative">
                    Our Vision
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-aroham-dark rounded-full mt-1" />
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

