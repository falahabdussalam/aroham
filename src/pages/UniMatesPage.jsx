import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  GraduationCap, 
  MapPin, 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Lightbulb, 
  Calendar,
  Building,
  HeartHandshake
} from 'lucide-react';

export default function UniMatesPage({ onOpenRequestMatch, onOpenGetInvolved }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState('All Disciplines');

  const mentors = [
    {
      id: 'AM-2601',
      name: 'Nuha Kadija',
      university: 'Khalifa University',
      major: 'Aerospace Engineering',
      location: 'Abu Dhabi, UAE',
      stream: 'Engineering',
      status: 'Available for 1-on-1 Guidance',
      badgeColor: 'bg-amber-100 text-aroham-gold border-amber-200',
      description: 'Focuses on STEM admissions in the GCC, engineering design fundamentals, and undergraduate research application strategies.',
      image: ''
    },
    {
      id: 'AM-2602',
      name: 'Ayishathul Fibha Fabhina',
      university: 'University of Stirling',
      major: 'Business Management & Marketing',
      location: 'Scotland, United Kingdom',
      stream: 'Business',
      status: 'Active Mentor',
      badgeColor: 'bg-emerald-100 text-aroham-forest border-emerald-200',
      description: 'Specialises in UK international student transitions, brand management modules, and graduate internship readiness.',
      image: ''
    },
    {
      id: 'AM-2603',
      name: 'Fathima Afiya',
      university: 'University of Sharjah',
      major: 'Biomedical Sciences',
      location: 'Sharjah, UAE',
      stream: 'Medicine & Biomedical',
      status: 'Weekend Sessions',
      badgeColor: 'bg-orange-100 text-aroham-terracotta border-orange-200',
      description: 'Guides high school seniors aspiring for medical, lab sciences, and allied health professions curriculum requirements.',
      image: ''
    },
    {
      id: 'AM-2604',
      name: 'Fida Haneef',
      university: 'University of Leicester',
      major: 'Psychology & Mental Health',
      location: 'Leicester, United Kingdom',
      stream: 'Humanities',
      status: 'Available for UCAS Guidance',
      badgeColor: 'bg-amber-100 text-aroham-gold border-amber-200',
      description: 'Expert advice on UCAS personal statements, psychological empirical research pathways, and UK campus life acclimatization.',
      image: ''
    },
    {
      id: 'AM-2605',
      name: 'Hiba Mariyam',
      university: 'Delhi University',
      major: 'English Literature & Research',
      location: 'New Delhi, India',
      stream: 'Humanities',
      status: 'Available',
      badgeColor: 'bg-emerald-100 text-aroham-forest border-emerald-200',
      description: 'Mentors students on critical theory analysis, academic writing, entrance examinations, and central university admissions.',
      image: ''
    },
    {
      id: 'AM-2606',
      name: 'Raniya Thasneem',
      university: 'Calicut University',
      major: 'Computer Applications & AI',
      location: 'Kerala, India',
      stream: 'Computer Science & AI',
      status: 'Active Mentor',
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
      description: 'Passionate about bridging women into tech disciplines, coding foundational bootcamps, and artificial intelligence avenues.',
      image: ''
    }
  ];

  const streams = [
    'All Disciplines',
    'Engineering',
    'Medicine & Biomedical',
    'Business',
    'Humanities',
    'Computer Science & AI'
  ];

  const filteredMentors = mentors.filter((m) => {
    const matchStream = selectedStream === 'All Disciplines' || m.stream === selectedStream;
    const q = searchQuery.toLowerCase();
    const matchQuery = 
      m.name.toLowerCase().includes(q) ||
      m.university.toLowerCase().includes(q) ||
      m.major.toLowerCase().includes(q) ||
      m.location.toLowerCase().includes(q);
    return matchStream && matchQuery;
  });

  const scrollToDirectory = () => {
    const el = document.getElementById('mentors-directory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 lg:space-y-28 pb-20 animate-fadeIn">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="pt-6 sm:pt-12 lg:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-10 border-b border-aroham-border">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aroham-amber-light text-aroham-gold text-xs font-bold tracking-wide uppercase">
              <Sparkles size={13} />
              <span>One-to-One Academic Mentorship</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-aroham-heading tracking-tight">
              Aroham UniMates
            </h1>

            <p className="text-base sm:text-lg italic font-serif text-aroham-forest">
              Guidance from those who have been there. Support for those who are just beginning.
            </p>

            <p className="text-sm sm:text-base text-aroham-body leading-relaxed max-w-xl">
              Aroham UniMates is a one-to-one student mentorship programme initiated by Aroham Foundation to connect students with alumnae mentors who can guide them in their academic and career journeys.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToDirectory}
                className="px-6 py-3.5 bg-aroham-dark hover:bg-aroham-forest text-white text-sm font-semibold rounded-lg shadow transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>Browse Mentors</span>
                <span>↓</span>
              </button>

              <button
                onClick={onOpenGetInvolved}
                className="px-6 py-3.5 bg-white hover:bg-aroham-sage text-aroham-dark text-sm font-semibold rounded-lg border border-aroham-border shadow-sm transition-all duration-200 flex items-center gap-2"
              >
                <Users size={16} className="text-aroham-forest" />
                <span>Join the Community</span>
              </button>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-aroham-border bg-white">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Two student alumnae studying together in mentorship"
                className="w-full h-80 object-cover"
              />
              
              {/* Floating impact pod card */}
              <div className="p-6 bg-white border-t border-aroham-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold uppercase tracking-wider text-aroham-forest text-[10px]">
                    Aroham Impact Pod
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    100% Match Rate
                  </span>
                </div>
                <h4 className="text-base font-bold font-serif text-aroham-heading flex items-center gap-2">
                  <Users size={17} className="text-aroham-gold" />
                  <span>1:1 Pairing Model</span>
                </h4>
                <p className="text-xs text-aroham-body leading-relaxed">
                  Personalized academic guidance and support to unlock admission resilience and university integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PHILOSOPHY & LAUNCH MILESTONE CARDS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Mentorship Philosophy */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-aroham-border shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold">
                Mentorship Philosophy
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-aroham-heading">
                Empowering decisions through lived experience
              </h2>
              <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
                Through personalised mentorship, students get the opportunity to interact with alumnae who share their experiences, knowledge and insights. The programme aims to help students explore different academic pathways, understand higher education opportunities and make informed decisions about their future.
              </p>
              <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
                Each student is connected with a mentor based on their areas of interest and the guidance they seek, creating a space where they can ask questions, gain clarity and learn from real experiences.
              </p>
            </div>

            {/* 3 Pillars of Philosophy */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-aroham-border">
              <div className="p-3.5 rounded-xl bg-aroham-mint/50 border border-aroham-border">
                <div className="text-xs font-bold text-aroham-dark flex items-center gap-1.5">
                  <Lightbulb size={14} className="text-aroham-gold" />
                  <span>Unbiased Advice</span>
                </div>
                <div className="text-[10px] text-aroham-muted mt-1">Lived alumna narratives</div>
              </div>

              <div className="p-3.5 rounded-xl bg-aroham-sage/50 border border-aroham-border">
                <div className="text-xs font-bold text-aroham-dark flex items-center gap-1.5">
                  <Sparkles size={14} className="text-aroham-forest" />
                  <span>Custom Matched</span>
                </div>
                <div className="text-[10px] text-aroham-muted mt-1">Subject-specific synergy</div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80">
                <div className="text-xs font-bold text-aroham-dark flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-aroham-terracotta" />
                  <span>Safe Space</span>
                </div>
                <div className="text-[10px] text-aroham-muted mt-1">Supportive open dialogue</div>
              </div>
            </div>
          </div>

          {/* Launched on 4 May 2026 Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-aroham-dark via-aroham-forest to-[#082C21] text-white rounded-3xl p-8 sm:p-10 shadow-elevated flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold tracking-wide uppercase border border-amber-400/30">
                <span>🚩 Our Beginning</span>
              </div>
              <h3 className="text-3xl font-bold font-serif leading-snug">
                Launched on 4 May 2026
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed pt-2">
                Aroham UniMates began its journey with <strong className="text-white font-semibold">10 registered mentors</strong> and <strong className="text-white font-semibold">17 students</strong>. All 17 students were successfully matched with mentors, marking the beginning of a growing mentorship community.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="uppercase tracking-wider text-emerald-200 text-[10px]">Cohort 1 Placement</span>
                <span className="text-amber-300 font-bold text-sm">17 / 17 Matched</span>
              </div>
              <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-full" />
              </div>
              <div className="text-[10px] text-emerald-100/80 pt-1">
                100% successful student-mentor cohort pairing achieved in inaugural launch.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          UNIMATES MENTORS DIRECTORY
          ========================================================================= */}
      <section id="mentors-directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold mb-1">
              Directory
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-aroham-heading">
              UniMates Mentors
            </h2>
            <p className="text-sm text-aroham-body mt-1">
              Connect directly with verified Aroham alumnae currently thriving across international universities and respected global faculties.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-aroham-mint text-aroham-dark text-xs font-bold shrink-0 self-start sm:self-auto border border-aroham-border">
            <span>{filteredMentors.length} Mentors Listed</span>
          </div>
        </div>

        {/* Search Bar & Filter Tabs */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-aroham-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mentors by name, course/major, or university..."
              className="w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl border border-aroham-border shadow-soft text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-aroham-muted uppercase tracking-wider shrink-0 mr-2">
              Filter by academic stream:
            </span>
            {streams.map((stream) => (
              <button
                key={stream}
                onClick={() => setSelectedStream(stream)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedStream === stream
                    ? 'bg-aroham-dark text-white shadow-sm'
                    : 'bg-white text-aroham-body hover:bg-aroham-sage border border-aroham-border'
                }`}
              >
                {stream}
              </button>
            ))}
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-3xl p-6 border border-aroham-border shadow-soft flex flex-col justify-between space-y-5 hover:shadow-elevated transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Header: Photo + Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {mentor.image ? (
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-aroham-border shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-aroham-mint border border-aroham-border flex items-center justify-center text-aroham-dark font-serif font-bold text-sm tracking-wider shrink-0 shadow-sm">
                        {mentor.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                    )}
                    <div>
                      <h4 className="text-base font-bold font-serif text-aroham-heading">
                        {mentor.name}
                      </h4>
                      <p className="text-xs font-medium text-aroham-forest">
                        {mentor.university}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${mentor.badgeColor}`}>
                  {mentor.status}
                </div>

                {/* Major & Location */}
                <div className="p-3 rounded-xl bg-aroham-sage/40 border border-aroham-border text-xs space-y-1">
                  <div className="font-semibold text-aroham-heading flex items-center gap-1.5">
                    <GraduationCap size={14} className="text-aroham-forest shrink-0" />
                    <span>{mentor.major}</span>
                  </div>
                  <div className="text-aroham-muted flex items-center gap-1.5 text-[11px]">
                    <MapPin size={13} className="shrink-0" />
                    <span>{mentor.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-aroham-body leading-relaxed">
                  {mentor.description}
                </p>
              </div>

              {/* Footer CTA */}
              <div className="pt-4 border-t border-aroham-border flex items-center justify-between">
                <span className="text-[11px] font-bold text-aroham-muted uppercase tracking-wider">
                  ID: {mentor.id}
                </span>
                <button
                  onClick={() => onOpenRequestMatch(mentor)}
                  className="text-xs font-bold text-aroham-forest hover:text-aroham-dark flex items-center gap-1 group transition-colors"
                >
                  <span>Request Match</span>
                  <span className="group-hover:translate-x-1 transition-transform">›</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          ACTIVITIES UNDER AROHAM UNIMATES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-2">
          <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold">
            Programs & Events
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-aroham-heading">
            Activities Under Aroham UniMates
          </h2>
          <p className="text-sm text-aroham-body max-w-2xl">
            As part of Aroham UniMates, Aroham Foundation conducts higher education guidance sessions to help students explore international study opportunities and make informed decisions about their academic future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: GCC Session */}
          <div className="bg-white rounded-3xl p-8 border border-aroham-border shadow-soft flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-aroham-gold font-bold border border-amber-200">
                  ✔ Concluded Session
                </span>
                <span className="text-aroham-muted font-semibold">GCC Region</span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-aroham-heading">
                GCC Higher Education Guidance Session
              </h3>
              <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
                An exhaustive symposium exploring admissions criteria, merit scholarships, and visa protocols for renowned universities across the United Arab Emirates, Qatar, and Saudi Arabia.
              </p>
            </div>

            <div className="pt-4 border-t border-aroham-border flex items-center justify-between text-xs font-semibold text-aroham-forest">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> 18 April 2026
              </span>
              <span>Virtual Webinar</span>
            </div>
          </div>

          {/* Card 2: UK Session */}
          <div className="bg-white rounded-3xl p-8 border border-aroham-border shadow-soft flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-aroham-gold font-bold border border-amber-200">
                  ✔ Concluded Session
                </span>
                <span className="text-aroham-muted font-semibold">United Kingdom</span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-aroham-heading">
                UK Higher Education Guidance Session
              </h3>
              <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
                A deep-dive workshop unpacking the UCAS application ecosystem, personal statement crafting, accommodation navigating, and Chevening / Commonwealth grant landscapes.
              </p>
            </div>

            <div className="pt-4 border-t border-aroham-border flex items-center justify-between text-xs font-semibold text-aroham-forest">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> 10 May 2026
              </span>
              <span>Virtual Interactive Panel</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BE A PART OF AROHAM UNIMATES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold">
            Get Connected
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-aroham-heading">
            Be a Part of Aroham UniMates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mentee Student Card */}
          <div className="rounded-3xl bg-aroham-dark p-8 sm:p-12 text-white shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif">
                Register as a Mentee
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Are you exploring higher education or preparing for competitive university admissions? Get connected with an alumna who has walked the exact path.
              </p>
            </div>

            <a
              href="https://forms.gle/JyFUEfFbERjRgUyD6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-aroham-dark rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow text-center block"
            >
              Register as a Mentee
            </a>
          </div>

          {/* Mentor Alumna Card */}
          <div className="rounded-3xl bg-aroham-terracotta p-8 sm:p-12 text-white shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif">
                Register as a Mentor
              </h3>
              <p className="text-xs sm:text-sm text-orange-100/90 leading-relaxed">
                Are you an alumna of Bolster Girls Campus currently studying or working internationally or in India? Share your experience and illuminate the pathway for rising scholars.
              </p>
            </div>

            <button
              onClick={onOpenGetInvolved}
              className="w-full py-3.5 bg-white hover:bg-orange-50 text-aroham-terracotta rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow"
            >
              Join as Alumna Mentor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

