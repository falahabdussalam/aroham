import React from 'react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  BookOpen, 
  HeartHandshake,
  Quote,
  TrendingUp,
  Award,
  Mail
} from 'lucide-react';
import { ArohamEmblem } from '../components/ArohamLogo';
import { InstagramIcon } from '../components/Icons';
import { upcomingEvents } from '../data/eventsData';

export default function HomePage({ setActivePage, onOpenRegister, onOpenGetInvolved }) {
  return (
    <div className="space-y-20 lg:space-y-28 pb-20 animate-fadeIn">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative pt-6 sm:pt-12 lg:pt-16 overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-100/40 via-amber-100/30 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aroham-amber-light text-aroham-gold text-xs font-bold tracking-wide uppercase border border-amber-200/60 shadow-sm">
                <Sparkles size={14} className="text-aroham-gold" />
                <span>Women-Led Alumnae Initiative</span>
              </div>

              {/* Subtitle */}
              <p className="text-xs uppercase font-extrabold tracking-[0.25em] text-aroham-forest">
                Aroham Foundation
              </p>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-aroham-heading leading-[1.15] tracking-tight">
                Connected by Our Past, <br />
                <span className="italic font-serif font-normal text-aroham-dark">
                  United by Our Future.
                </span>
              </h1>

              {/* Paragraph */}
              <p className="text-base sm:text-lg text-aroham-body leading-relaxed max-w-xl">
                Bringing generations together, turning shared experiences into opportunities, and guiding students towards a future filled with possibilities.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setActivePage('unimates');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-aroham-terracotta hover:bg-aroham-terracotta-dark text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>Explore UniMates</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-white hover:bg-aroham-sage text-aroham-dark text-sm font-semibold rounded-lg border border-aroham-border shadow-sm hover:border-aroham-border-dark transition-all duration-200 flex items-center gap-2"
                >
                  <BookOpen size={16} className="text-aroham-forest" />
                  <span>Our Story</span>
                </button>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-aroham-border/80 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-serif text-aroham-dark">
                    10+
                  </div>
                  <div className="text-xs font-medium text-aroham-muted mt-0.5">
                    Alumnae Mentors
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-serif text-aroham-dark">
                    100%
                  </div>
                  <div className="text-xs font-medium text-aroham-muted mt-0.5">
                    Student Match Rate
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-serif text-aroham-dark">
                    Global
                  </div>
                  <div className="text-xs font-medium text-aroham-muted mt-0.5">
                    University Guidance
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Presentation */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-elevated border border-aroham-border flex flex-col items-center text-center">
                {/* Cohort status badge */}
                <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active Cohort 2025</span>
                </div>

                {/* Original Logo with subtle back glow */}
                <div className="my-6 relative flex flex-col items-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/40 via-emerald-200/40 to-transparent rounded-full blur-2xl -z-10 scale-125" />
                  <img
                    src="/logo.png"
                    alt="Aroham Foundation Logo"
                    className="w-56 sm:w-64 h-auto object-contain mx-auto drop-shadow-sm"
                  />
                </div>

                <p className="text-xs font-medium tracking-wider uppercase text-aroham-forest/80 mt-2 mb-6">
                  Nurturing Generational Guidance
                </p>

                {/* Bottom affiliation pill */}
                <div className="w-full py-2.5 px-4 rounded-xl bg-aroham-dark text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm">
                  <GraduationCap size={15} className="text-amber-300" />
                  <span>Founded by Bolster Girls Campus Alumnae</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          UPCOMING EVENTS SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-aroham-terracotta text-xs font-bold tracking-wide uppercase mb-2">
              <Sparkles size={13} />
              <span>Event Schedule</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-aroham-heading">
              Upcoming Events
            </h2>
            <p className="text-sm text-aroham-body mt-1">
              Live guidance sessions, university admission bootcamps, and alumnae roundtables.
            </p>
          </div>
          {upcomingEvents.length > 0 && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-aroham-forest border border-emerald-200/60 text-xs font-bold shrink-0 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-aroham-forest animate-ping" />
              <span>{upcomingEvents.length} Event{upcomingEvents.length > 1 ? 's' : ''} Scheduled</span>
            </div>
          )}
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id}
                className="bg-white rounded-3xl overflow-hidden shadow-soft border border-aroham-border grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Left Side */}
                <div className="lg:col-span-5 bg-gradient-to-br from-aroham-dark via-aroham-forest to-[#07251C] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold tracking-wider uppercase border border-amber-400/30">
                      {event.tag || 'Upcoming Session'}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif leading-snug">
                      {event.name}
                    </h3>
                  </div>

                  {(event.date || event.time) && (
                    <div className="pt-8 border-t border-white/10 mt-6 flex flex-wrap gap-4 text-xs font-medium text-emerald-200">
                      {event.date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar size={15} className="text-amber-300" />
                          <span>{event.date}</span>
                        </div>
                      )}
                      {event.time && (
                        <div className="flex items-center gap-1.5">
                          <Clock size={15} className="text-amber-300" />
                          <span>{event.time}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Side: Details & Link */}
                <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    {event.platform && (
                      <div className="text-xs font-semibold text-aroham-forest/90 mb-3 flex items-center gap-2">
                        <span>Platform: {event.platform}</span>
                      </div>
                    )}
                    <h4 className="text-xs font-bold uppercase tracking-wider text-aroham-muted mb-2">
                      Event Details
                    </h4>
                    <p className="text-sm text-aroham-body leading-relaxed">
                      {event.details}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-aroham-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-aroham-muted flex items-center gap-1.5">
                      <ShieldCheck size={16} className="text-aroham-forest" />
                      <span>Free access for all registered students</span>
                    </span>
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-2.5 bg-aroham-terracotta hover:bg-aroham-terracotta-dark text-white rounded-lg text-xs font-bold tracking-wide transition-all shadow flex items-center justify-center gap-2"
                    >
                      <span>{event.linkText || 'Register Now'}</span>
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-aroham-border shadow-soft text-center max-w-3xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-aroham-mint text-aroham-dark flex items-center justify-center mx-auto">
              <Calendar size={28} />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold">
                Schedule Status
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-aroham-heading">
                No upcoming events at the moment. Stay connected for future updates.
              </h3>
              <p className="text-xs sm:text-sm text-aroham-body max-w-md mx-auto pt-1 leading-relaxed">
                We organize higher education guidance sessions, alumnae roundtables, and university workshops dynamically throughout the academic year.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://www.instagram.com/aroham_foundation"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-aroham-dark hover:bg-aroham-forest text-white text-xs font-bold rounded-lg transition-all shadow flex items-center gap-2"
              >
                <InstagramIcon size={14} />
                <span>Follow on Instagram</span>
              </a>
              <button
                onClick={onOpenGetInvolved}
                className="px-5 py-2.5 bg-white hover:bg-aroham-sage text-aroham-dark border border-aroham-border text-xs font-bold rounded-lg transition-all shadow-sm flex items-center gap-1.5"
              >
                <Mail size={14} />
                <span>Stay Connected / Get Involved</span>
              </button>
            </div>
          </div>
        )}
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
                onClick={() => {
                  setActivePage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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
                onClick={() => {
                  setActivePage('unimates');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-semibold text-aroham-dark hover:underline"
                >
                  Read Impact Report
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          CALL TO ACTION BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-aroham-darker via-aroham-dark to-aroham-forest p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-elevated">
          {/* Subtle glowing radial background */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold tracking-wide uppercase border border-white/10">
              <Sparkles size={13} />
              <span>Join Our Growing Sisterhood</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight">
              Ready to shape the next generation of women leaders?
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Whether you are a student seeking admission roadmaps, an alumna ready to give back as a mentor, or a supporter passionate about educational equity, your voice matters here.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenGetInvolved}
                className="px-6 py-3.5 bg-aroham-terracotta hover:bg-aroham-terracotta-dark text-white rounded-lg text-sm font-semibold shadow transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Get Involved
              </button>

              <button
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold border border-white/20 backdrop-blur-sm transition-all duration-200"
              >
                Contact Aroham Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

