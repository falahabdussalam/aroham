import React, { useState, useEffect } from 'react';
import strategicGatheringImg from '../assets/strategic_gathering.jpg';
import { 
  Sparkles, 
  Flag, 
  Eye, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Users, 
  Award, 
  TrendingUp,
  Heart,
  Lightbulb,
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
      role: 'Our Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/fathima-hija-t.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-minha-nafeesa',
      name: 'Minha Nafeesa',
      role: 'Our Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/minha-nafeesa.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-hajara',
      name: 'Hajara Fida',
      role: 'Our Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/hajara-fida.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-fathima-nasreen',
      name: 'Fathima Nasreen',
      role: 'Our Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/fathima-nasreen.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-fathima-minha',
      name: 'Fathima Minha PM',
      role: 'Our Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/fathima-minha-pm.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-shana',
      name: 'Shana',
      role: 'Our Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/shana.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-khadeeja-misba',
      name: 'Khadeeja Misba PM',
      role: 'Our Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/khadeeja-misba-pm.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-aysha-huda',
      name: 'Aysha Huda AP',
      role: 'Our Trustee',
      almaMater: 'Bolster Girls Campus Alumnae',
      image: '/committee/aysha-huda-ap.jpg',
      badgeColor: 'bg-aroham-terracotta text-white',
      hasFullPoster: true
    },
    {
      id: 'trustee-diya-fathima',
      name: 'Diya Fathima MN',
      role: 'Our Trustee',
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
      description: 'Bolster Girls Campus Alumni Meet. Spontaneous alumnae dialogues spark the unanimous call for an organised guidance collective.',
      tag: 'Committee Initiated'
    },
    {
      date: '29 July 2025',
      title: 'Digital Network',
      description: 'Launch of the official Aroham Instagram channel, reuniting distributed batches and amplifying student success stories.',
      tag: 'Community Reach'
    },
    {
      date: 'Aug–Oct 2025',
      title: 'Identity Sealed',
      description: 'Finalisation of Aroham\'s emblem, blossoming flame symbol, institutional values, and formal operational charters.',
      tag: 'Branding & Ethos'
    },
    {
      date: '25–29 Dec 2025',
      title: 'HiLite Mall Summit',
      description: 'Five-day strategic roadmap meeting in Kozhikode formulating executive roles and UniMates campus onboarding plans.',
      tag: 'Future Realised'
    }
  ];

  return (
    <div className="space-y-20 lg:space-y-28 pb-20 animate-fadeIn">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="pt-6 sm:pt-12 lg:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-aroham-border">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aroham-amber-light text-aroham-gold text-xs font-bold tracking-wide uppercase">
              <Sparkles size={13} />
              <span>Our Legacy & Horizon</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold font-serif text-aroham-heading tracking-tight">
              About Aroham Foundation
            </h1>

            <p className="text-base sm:text-lg text-aroham-body leading-relaxed">
              A women-led alumni initiative that bridges the gap between students and opportunities through education, mentorship, and community development.
            </p>
          </div>

          {/* Rooted in Alma Mater badge */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-aroham-border shadow-soft flex items-center gap-4 shrink-0 self-start lg:self-center">
            <div className="w-12 h-12 rounded-xl bg-aroham-dark text-white font-bold text-xs flex items-center justify-center tracking-wider">
              BGC
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-aroham-muted">
                Rooted in Alma Mater
              </div>
              <div className="text-base font-bold font-serif text-aroham-heading">
                Bolster Girls Campus
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          GENESIS OF AROHAM: FROM SISTERHOOD TO SUSTAINED IMPACT
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold mb-2">
          Genesis of Aroham
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-aroham-heading mb-10">
          From Sisterhood to Sustained Impact
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-aroham-body leading-relaxed text-sm sm:text-base">
            <p className="text-aroham-heading font-medium">
              <span className="float-left text-5xl font-serif font-bold text-aroham-dark pr-3 pt-1 leading-none">
                A
              </span>
              roham Foundation began with a shared vision among the alumnae of Bolster Girls Campus to stay connected and create meaningful opportunities for the generations that follow.
            </p>

            {/* Turning Point Callout */}
            <div className="p-6 rounded-2xl bg-white border border-aroham-border shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-aroham-gold uppercase tracking-wide">
                <Lightbulb size={16} />
                <span>The Turning Point at Alumni Meet</span>
              </div>
              <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
                The idea took shape during the Bolster Girls Campus Alumni Meet held on 12–13 July 2025. What began as conversations among alumnae gradually developed into a collective initiative. An executive committee was formed, and the initial discussions and planning to bring this vision to life began.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
              As the idea evolved, efforts were made to establish a distinct identity for the organisation. Between August and October 2025, the name, logo, vision and mission of Aroham were finalised, giving direction to the initiative and shaping its purpose. The official Instagram page had already been created on 29 July 2025, providing a platform to connect with the wider alumni community.
            </p>

            <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
              On 22 October 2025, Aroham launched its awareness campaign to introduce the initiative and its vision to a wider audience. This was followed by a strategic planning meeting held from 25–29 December 2025 at HiLite Mall, Kozhikode, where further discussions and planning helped shape the organisation's future direction.
            </p>

            {/* Dark green quote box */}
            <div className="p-6 rounded-2xl bg-aroham-dark text-white shadow-soft">
              <p className="text-xs sm:text-sm italic leading-relaxed text-emerald-100">
                "From those first conversations to the formation of an organised initiative, Aroham has grown through the collective efforts and commitment of its alumnae. Today, Aroham Foundation continues to work towards its vision of helping students make informed academic and career decisions through guidance, mentorship, education and community engagement."
              </p>
            </div>
          </div>

          {/* Right Cards & Visual Evidence */}
          <div className="lg:col-span-5 space-y-6">
            {/* Photo Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-soft border border-aroham-border">
              <div className="relative w-full">
                <img
                  src={strategicGatheringImg}
                  alt="Bolster Summer Camp & Aroham Gathering"
                  className="w-full h-auto object-cover block"
                />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-aroham-dark/80 text-white text-[11px] font-medium backdrop-blur-sm shadow-sm">
                  📍 Bolster Girls Campus, Kerala
                </span>
              </div>
            </div>

            {/* 2 Stats row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-aroham-mint border border-aroham-border">
                <div className="text-3xl font-extrabold font-serif text-aroham-dark">
                  100%
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-aroham-forest mt-1">
                  Alumnae Governed
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-aroham-amber-light border border-amber-200">
                <div className="text-3xl font-extrabold font-serif text-aroham-gold">
                  4+
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-aroham-gold mt-1">
                  Core Programs
                </div>
              </div>
            </div>

            {/* Evolution Momentum timeline chart */}
            <div className="p-6 rounded-2xl bg-white border border-aroham-border shadow-soft space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold font-serif text-aroham-heading text-sm">Evolution Momentum</span>
                <span className="text-aroham-muted text-[11px]">2025 Milestones</span>
              </div>
              {/* Graphic line chart representation */}
              <div className="relative pt-6 pb-2">
                <div className="h-1 bg-aroham-sage rounded-full relative">
                  <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-600 via-amber-500 to-aroham-terracotta rounded-full w-full" />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-aroham-muted mt-3">
                  <span>July: Meet</span>
                  <span>Aug: Identity</span>
                  <span>Oct: Campaign</span>
                  <span>Dec: HiLite Meet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOUNDATIONAL TIMELINE (2025)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold">
            Chronology of Growth
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-aroham-heading">
            Foundational Timeline (2025)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-aroham-border shadow-soft flex flex-col justify-between hover:shadow-elevated transition-all duration-200"
            >
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-aroham-sage text-aroham-forest text-xs font-bold border border-aroham-border">
                  {item.date}
                </span>
                <h3 className="text-lg font-bold font-serif text-aroham-heading">
                  {item.title}
                </h3>
                <p className="text-xs text-aroham-body leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-aroham-border text-[11px] font-semibold text-aroham-muted flex items-center gap-1.5">
                <span>🏷 {item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          OUR GUIDING LIGHT: MISSION & VISION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold">
            Purpose & Ambition
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-aroham-heading">
            Our Guiding Light
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="rounded-3xl bg-aroham-dark p-8 sm:p-12 text-white shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Flag size={22} />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-300">
                Core Directive
              </span>
              <h3 className="text-3xl font-bold font-serif">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed pt-2">
                We aim to build a global network of mentors who can guide young people, especially those from underprivileged backgrounds, towards achieving their academic and career aspirations.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <span className="text-xs font-bold text-amber-300 inline-flex items-center gap-1">
                <span>Action-driven mentorship</span>
                <ArrowRight size={14} />
              </span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="rounded-3xl bg-gradient-to-br from-aroham-gold-gradient-start to-aroham-gold-gradient-end p-8 sm:p-12 text-aroham-heading shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-aroham-dark text-white flex items-center justify-center">
                <Eye size={22} />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-aroham-dark/80">
                North Star
              </span>
              <h3 className="text-3xl font-bold font-serif">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base text-aroham-heading/90 leading-relaxed pt-2">
                Aroham Foundation envisions a world where every child has access to the right guidance, opportunities, and support to shape their own future with confidence and fulfil their dreams.
              </p>
            </div>

            <div className="pt-6 border-t border-aroham-heading/10">
              <span className="text-xs font-bold text-aroham-dark inline-flex items-center gap-1">
                <span>Empowered generational pathways</span>
                <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          OUR COMMITTEE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold mb-2">
              Governance & Stewardship
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-aroham-heading">
              Our Committee
            </h2>
            <p className="text-sm text-aroham-body mt-1">
              Executive Committee & Alumnae Leadership bringing diverse expertise across medicine, technology, academia, and social change.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aroham-mint text-aroham-dark text-xs font-bold shrink-0 self-start sm:self-auto border border-aroham-border">
            <GraduationCap size={15} />
            <span>Bolster Girls Campus Alumnae</span>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3.5 lg:gap-6">
          {committee.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-aroham-border shadow-soft group hover:shadow-elevated transition-all duration-200 flex flex-col justify-between"
            >
              <div 
                className="relative aspect-[4/5] sm:h-64 md:h-72 w-full overflow-hidden bg-aroham-sage md:cursor-pointer shrink-0"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                    setSelectedPoster(member);
                  }
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top md:group-hover:scale-105 transition-transform duration-300"
                />
                <span className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 md:top-3 md:right-3 px-1.5 py-0.5 sm:px-2 md:px-2.5 rounded sm:rounded-md text-[7.5px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-wider shadow leading-tight ${member.badgeColor}`}>
                  {member.role}
                </span>
              </div>
              <div className="p-2 sm:p-3 md:p-5 flex-1 flex flex-col justify-center">
                <h4 className="text-[11px] sm:text-sm md:text-base font-bold font-serif text-aroham-heading leading-snug line-clamp-1 sm:line-clamp-none">
                  {member.name}
                </h4>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase font-bold tracking-wider text-aroham-muted mt-0.5 sm:mt-1 truncate">
                  {member.almaMater}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Full Poster Lightbox Modal (Desktop Only - Disabled on Mobile for Smooth Page Scrolling) */}
        {selectedPoster && (
          <div 
            className="hidden md:flex fixed inset-0 z-[100] flex-col items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-fadeIn select-none"
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

