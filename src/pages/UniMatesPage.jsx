import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  GraduationCap, 
  MapPin, 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Lightbulb, 
  Calendar,
  Building,
  HeartHandshake,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import { INITIAL_MENTORS } from '../admin/data/initialAdminData';
import Reveal from '../components/Reveal';

export default function UniMatesPage({ onOpenRequestMatch, onOpenGetInvolved, mentors: propMentors }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState('All Disciplines');
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Directly derive mentors from propMentors or fallback to cached storage / INITIAL_MENTORS
  const mentors = propMentors && Array.isArray(propMentors) 
    ? propMentors 
    : (() => {
        try {
          const saved = localStorage.getItem('aroham_mentors');
          return saved ? JSON.parse(saved) : INITIAL_MENTORS;
        } catch (e) {
          return INITIAL_MENTORS;
        }
      })();

  const defaultStreams = [
    'All Disciplines',
    'Engineering',
    'Medicine & Biomedical',
    'Business',
    'Humanities',
    'Computer Science & AI',
    'Law & Public Policy'
  ];

  // Dynamic streams extracted from mentor roster
  const streams = Array.from(new Set([
    ...defaultStreams,
    ...mentors.map(m => m.stream).filter(Boolean)
  ]));

  const filteredMentors = mentors.filter((m) => {
    const matchStream = selectedStream === 'All Disciplines' || m.stream === selectedStream;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchStream;
    const matchQuery = 
      (m.name || '').toLowerCase().includes(q) ||
      (m.university || '').toLowerCase().includes(q) ||
      (m.major || '').toLowerCase().includes(q) ||
      (m.location || '').toLowerCase().includes(q) ||
      (m.stream || '').toLowerCase().includes(q);
    return matchStream && matchQuery;
  });

  const scrollToDirectory = () => {
    const el = document.getElementById('mentors-directory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-fadeIn">
      {/* =========================================================================
          HERO SECTION (LOGO GREEN)
          ========================================================================= */}
      <section className="w-full bg-aroham-dark/95 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4 hero-reveal hero-reveal-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold font-serif text-white tracking-tight">
              Aroham UniMates
            </h1>

            <p className="text-base sm:text-lg italic font-serif text-emerald-200">
              Guidance from those who have been there. Support for those who are just beginning.
            </p>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl">
              Aroham UniMates is our one-to-one mentorship programme. It connects students with alumnae mentors for clear academic and career guidance.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToDirectory}
                className="px-6 py-3.5 bg-aroham-amber hover:bg-amber-400 text-aroham-dark text-sm font-semibold rounded-lg shadow transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                <span>Browse Mentors</span>
                <span>↓</span>
              </button>

              <button
                onClick={onOpenGetInvolved}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg border border-white/25 backdrop-blur-sm shadow-sm transition-all duration-200 flex items-center gap-2"
              >
                <Users size={16} className="text-emerald-200" />
                <span>Join the Community</span>
              </button>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[300px] sm:max-w-[320px] rounded-3xl overflow-hidden shadow-elevated border border-aroham-border bg-[#07281E]">
              <div
                className="relative aspect-[9/16] w-full bg-[#07281E] overflow-hidden cursor-pointer group"
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  src="/unimates-launch.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover"
                />

                {/* Subtle bottom gradient for control legibility */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />

                {/* Floating Play/Pause & Mute/Unmute controls */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    aria-label={isPlaying ? 'Pause launch video' : 'Play launch video'}
                    className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all active:scale-95 shadow-sm"
                  >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute launch video' : 'Mute launch video'}
                    className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all active:scale-95 shadow-sm"
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* =========================================================================
          PHILOSOPHY & LAUNCH MILESTONE CARDS (LOGO ORANGE)
          ========================================================================= */}
      <section className="w-full bg-[#FEF3DC]/85 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Mentorship Philosophy */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-aroham-border shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-aroham-gold">
                Mentorship Philosophy
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold font-serif text-aroham-heading">
                Empowering decisions through lived experience
              </h2>
              <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
                Students connect directly with alumnae who share real insights and experience. This helps them explore study paths, understand higher education, and plan ahead with confidence.
              </p>
              <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
                We match each student with a mentor based on their interests and goals. Together, they build a supportive space for honest questions and clarity.
              </p>
            </div>

            {/* 3 Pillars of Philosophy */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-aroham-border">
              <div className="p-3.5 rounded-xl bg-aroham-mint/50 border border-aroham-border">
                <div className="text-xs font-semibold text-aroham-dark flex items-center gap-1.5">
                  <Lightbulb size={14} className="text-aroham-gold" />
                  <span>Unbiased Advice</span>
                </div>
                <div className="text-[10px] text-aroham-muted mt-1">Lived alumna narratives</div>
              </div>

              <div className="p-3.5 rounded-xl bg-aroham-sage/50 border border-aroham-border">
                <div className="text-xs font-semibold text-aroham-dark flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-aroham-forest" />
                  <span>Custom Matched</span>
                </div>
                <div className="text-[10px] text-aroham-muted mt-1">Subject-specific synergy</div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80">
                <div className="text-xs font-semibold text-aroham-dark flex items-center gap-1.5">
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold tracking-wide uppercase border border-amber-400/30">
                <span>🚩 Our Beginning</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-semibold font-serif leading-snug">
                  Launched on 4 May 2026
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  Aroham UniMates began its journey with <strong className="text-white font-semibold">10 registered mentors</strong> and <strong className="text-white font-semibold">17 students</strong>. All 17 students were successfully matched with mentors, marking the beginning of a growing mentorship community.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="uppercase tracking-wider text-emerald-200 text-[10px]">Cohort 1 Placement</span>
                <span className="text-amber-300 font-semibold text-sm">17 / 17 Matched</span>
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
        </div>
      </section>

      {/* =========================================================================
          UNIMATES MENTORS DIRECTORY (LOGO GREEN)
          ========================================================================= */}
      <section id="mentors-directory" className="w-full bg-aroham-mint/85 py-16 sm:py-20 lg:py-24 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="up" className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-aroham-gold mb-1">
              Directory
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold font-serif text-aroham-heading">
              UniMates Mentors
            </h2>
            <p className="text-sm text-aroham-body mt-1">
              Connect with verified Aroham alumnae studying and working across leading global universities.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-aroham-mint text-aroham-dark text-xs font-semibold shrink-0 self-start sm:self-auto border border-aroham-border">
            <span>{filteredMentors.length} Mentors Listed</span>
          </div>
        </Reveal>

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
            <span className="text-xs font-semibold text-aroham-muted uppercase tracking-wider shrink-0 mr-2">
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
        {filteredMentors.length > 0 ? (
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
                        <div className="w-12 h-12 rounded-2xl bg-aroham-mint border border-aroham-border flex items-center justify-center text-aroham-dark font-serif font-semibold text-sm tracking-wider shrink-0 shadow-sm">
                          {(mentor.name || 'M').split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                      )}
                      <div>
                        <h4 className="text-base font-semibold font-serif text-aroham-heading">
                          {mentor.name}
                        </h4>
                        <p className="text-xs font-medium text-aroham-forest">
                          {mentor.university}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border uppercase tracking-wider ${mentor.badgeColor || 'bg-emerald-100 text-aroham-forest border-emerald-200'}`}>
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
                  <span className="text-[11px] font-semibold text-aroham-muted uppercase tracking-wider">
                    ID: {mentor.id}
                  </span>
                  <button
                    onClick={() => onOpenRequestMatch(mentor)}
                    className="text-xs font-semibold text-aroham-forest hover:text-aroham-dark flex items-center gap-1 group transition-colors"
                  >
                    <span>Request Match</span>
                    <span className="group-hover:translate-x-1 transition-transform">›</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-aroham-border shadow-soft text-center max-w-2xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-aroham-mint text-aroham-dark flex items-center justify-center mx-auto shadow-sm">
              <Users size={26} />
            </div>
            <h4 className="text-xl font-semibold font-serif text-aroham-heading">
              No mentors found
            </h4>
            <p className="text-xs sm:text-sm text-aroham-body max-w-md mx-auto leading-relaxed">
              {searchQuery
                ? `No mentor records matched "${searchQuery}". Try searching with a different term.`
                : `No mentors are currently listed under the "${selectedStream}" stream.`}
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStream('All Disciplines');
                }}
                className="px-5 py-2.5 bg-aroham-dark hover:bg-aroham-forest text-white text-xs font-semibold rounded-xl transition-all shadow"
              >
                Reset Search & Filters
              </button>
            </div>
          </div>
        )}
        </div>
      </section>

      {/* =========================================================================
          ACTIVITIES UNDER AROHAM UNIMATES (LOGO ORANGE)
          ========================================================================= */}
      <section className="w-full bg-[#FEF3DC]/85 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-aroham-terracotta">
            Programs & Events
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold font-serif text-aroham-heading">
            Activities Under Aroham UniMates
          </h2>
          <p className="text-sm text-aroham-body max-w-2xl">
            Under Aroham UniMates, we host guidance sessions to help students explore global study options and make informed academic choices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: GCC Session */}
          <div className="bg-white rounded-3xl p-8 border border-aroham-border shadow-soft flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-aroham-gold font-semibold border border-amber-200">
                  ✔ Concluded Session
                </span>
                <span className="text-aroham-muted font-semibold">GCC Region</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold font-serif text-aroham-heading">
                  GCC Higher Education Guidance Session
                </h3>
                <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
                  A focused session on admissions, merit scholarships, and visa steps for top universities in the UAE, Qatar, and Saudi Arabia.
                </p>
              </div>
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
                <span className="px-3 py-1 rounded-full bg-amber-100 text-aroham-gold font-semibold border border-amber-200">
                  ✔ Concluded Session
                </span>
                <span className="text-aroham-muted font-semibold">United Kingdom</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold font-serif text-aroham-heading">
                  UK Higher Education Guidance Session
                </h3>
                <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
                  A practical workshop covering UCAS applications, personal statements, student housing, and Chevening or Commonwealth scholarships.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-aroham-border flex items-center justify-between text-xs font-semibold text-aroham-forest">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> 10 May 2026
              </span>
              <span>Virtual Interactive Panel</span>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* =========================================================================
          BE A PART OF AROHAM UNIMATES (LOGO GREEN)
          ========================================================================= */}
      <section className="w-full bg-aroham-mint/85 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-aroham-forest">
            Get Connected
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold font-serif text-aroham-heading">
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
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-semibold font-serif">
                  Register as a Mentee
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  Exploring higher education or preparing for university admissions? Connect with an alumna who has walked your path.
                </p>
              </div>
            </div>

            <a
              href="https://forms.gle/JyFUEfFbERjRgUyD6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-aroham-dark rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow text-center block"
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
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-semibold font-serif">
                  Register as a Mentor
                </h3>
                <p className="text-xs sm:text-sm text-orange-100/90 leading-relaxed">
                  Are you a Bolster Girls Campus alumna studying or working in India or abroad? Share your experience and guide rising scholars.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenGetInvolved}
              className="w-full py-3.5 bg-white hover:bg-orange-50 text-aroham-terracotta rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow"
            >
              Join as Alumna Mentor
            </button>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}

