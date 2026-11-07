import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Users, 
  CheckCircle, 
  Sparkles, 
  Bell, 
  Mail, 
  ArrowRight, 
  ArrowUpRight,
  Filter,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { InstagramIcon } from '../components/Icons';

export default function EventsPage({ setActivePage, onOpenRegister, onOpenGetInvolved }) {
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' = oldest to newest, 'desc' = newest to oldest

  const pastEvents = [
    {
      id: 1,
      day: '18',
      month: 'APR',
      year: '2026',
      sessionType: 'Zoom Session',
      sessionNo: 'Session #01',
      tags: ['Global Education', 'Gulf Higher Ed'],
      title: 'GCC Higher Education Guidance Session',
      description: "Aroham Foundation's first major online initiative was designed to introduce students to higher education opportunities in Gulf Cooperation Council (GCC) countries. The session covered university admission processes, scholarship opportunities and practical aspects of student life in GCC nations.",
      panelists: [
        { name: 'Nuha Kadija', university: 'Khalifa University' },
        { name: 'Ayishathul Fibha Fabhina', university: 'University of Stirling' },
        { name: 'Fathima Afiya', university: 'University of Sharjah' }
      ],
      stats: '63 registrations • 50+ active participants'
    },
    {
      id: 2,
      day: '04',
      month: 'MAY',
      year: '2026',
      sessionType: 'Flagship Launch',
      sessionNo: 'Milestone #02',
      tags: ['Mentorship Framework', '1-on-1 Matching'],
      title: 'Aroham UniMates – Programme Launch',
      description: 'Aroham UniMates was officially launched as a one-to-one student mentorship program. It aims to connect students with alumni mentors who can provide personalized academic and career guidance across diverse undergraduate specializations.',
      launchStats: {
        students: 17,
        studentLabel: 'Initial founding cohort',
        mentors: 10,
        mentorLabel: 'Dedicated 1-on-1 pairings'
      },
      note: '17 students matched seamlessly with 10 senior mentors'
    },
    {
      id: 3,
      day: '10',
      month: 'MAY',
      year: '2026',
      sessionType: 'Zoom Platform',
      sessionNo: 'Session #03',
      tags: ['Study in UK', 'UCAS & Scholarships'],
      title: 'UK Higher Education Guidance Session',
      description: 'The session offered students insights into the higher education landscape in the United Kingdom, guided by an alumna with firsthand experience. Topics included the UCAS application process, scholarships, campus life and career prospects.',
      speaker: {
        initials: 'FH',
        name: 'Fida Haneef',
        affiliation: 'University of Leicester (Alumna Speaker)',
        tag: 'Firsthand Insights'
      },
      stats: '20 registrations • 12+ participants (Photos & highlights)',
      photos: [
        {
          title: 'UCAS Step-by-Step Walkthrough',
          img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Q&A Session Highlights',
          img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80'
        }
      ]
    },
    {
      id: 4,
      day: '23',
      month: 'MAY',
      year: '2026',
      sessionType: '📍 Rose Lounge, Malappuram, Kerala',
      sessionNo: 'Classes 10-12 Summit',
      tags: ['Summit Partnership', 'Classes 10–12 Mentorship'],
      title: 'EduWay 2026 - Future Skills & Career Summit',
      description: "Aroham Foundation participated in EduWay 2026 as Career Mentors. The team guided students from Classes 10–12 by sharing insights into different academic fields, university experiences and career pathways. They also provided one-to-one career guidance and answered students' queries.",
      onGroundMentors: {
        count: 9,
        label: 'Aroham Alumni Mentors',
        sub: 'On-ground personalized career desks',
        tag: 'Live 1-to-1 Counseling'
      }
    }
  ];

  const sortedEvents = [...pastEvents].sort((a, b) => {
    return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
  });

  return (
    <div className="space-y-20 lg:space-y-28 pb-20 animate-fadeIn">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="pt-6 sm:pt-12 lg:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-aroham-border">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-aroham-terracotta text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-aroham-terracotta" />
              <span>Knowledge Exchanges & Cohort Milestones</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold font-serif text-aroham-heading tracking-tight">
              Aroham Events & Guidance Sessions
            </h1>

            <p className="text-base sm:text-lg text-aroham-body leading-relaxed">
              Empowering students through global education workshops, mentorship launches, and alumni meets.
            </p>
          </div>

          {/* 3 Metric Pills */}
          <div className="bg-white rounded-2xl p-5 border border-aroham-border shadow-soft flex items-center gap-8 shrink-0 self-start lg:self-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-aroham-dark">
                5+
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-aroham-muted mt-0.5">
                Sessions Completed
              </div>
            </div>
            <div className="w-px h-10 bg-aroham-border" />
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-aroham-dark">
                160+
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-aroham-muted mt-0.5">
                Scholars Reached
              </div>
            </div>
            <div className="w-px h-10 bg-aroham-border" />
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-aroham-dark">
                100%
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-aroham-muted mt-0.5">
                Alumnae Guided
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          UPCOMING EVENTS / CURRENT SCHEDULE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold mb-1">
              Current Schedule
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-aroham-heading">
              Upcoming Events
            </h2>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-aroham-forest border border-emerald-200 text-xs font-bold">
            <span>📋 1 Registration Phase Live</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Card 1: Featured Fall 2026 Event */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-10 border border-aroham-border shadow-soft space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-aroham-gold text-xs font-bold border border-amber-200">
                ⚡ Registration Open
              </span>
              <span className="text-xs font-semibold text-aroham-muted flex items-center gap-1.5">
                <Video size={14} className="text-aroham-forest" />
                <span>Platform: Zoom Webinar</span>
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-aroham-heading">
                Fall 2026 Global Academic Pathways
              </h3>
              <p className="text-xs sm:text-sm text-aroham-body leading-relaxed mt-2">
                Comprehensive roadmap for international bachelor's and master's degrees. Specialized roundtables on statement of purpose refinement, funding portfolios, and cross-cultural campus integration with Aroham mentors worldwide.
              </p>
            </div>

            {/* Grid specs */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-aroham-mint/50 border border-aroham-border text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-aroham-muted block">Proposed Date</span>
                <span className="font-bold text-aroham-heading mt-0.5 block">12 Sep 2026</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-aroham-muted block">Time Slot</span>
                <span className="font-bold text-aroham-heading mt-0.5 block">18:30 IST</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-aroham-muted block">Availability</span>
                <span className="font-bold text-aroham-terracotta mt-0.5 block">Limited Seats</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-medium text-aroham-heading flex items-center gap-1.5">
                <Users size={15} className="text-aroham-forest" />
                <span>Mentors from UK, GCC & European Universities</span>
              </span>
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-6 py-2.5 bg-aroham-dark hover:bg-aroham-forest text-white rounded-lg text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5"
              >
                <span>Secure Your Seat →</span>
              </button>
            </div>
          </div>

          {/* Card 2: Upcoming Feed Status Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-aroham-border shadow-soft space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-aroham-mint flex items-center justify-center text-aroham-dark">
              <Bell size={22} />
            </div>

            <div className="space-y-2">
              <div className="text-[10px] uppercase font-bold tracking-widest text-aroham-muted">
                System Status
              </div>
              <h4 className="text-xl font-bold font-serif text-aroham-heading">
                Upcoming Events Feed
              </h4>
            </div>

            <div className="p-4 rounded-xl bg-aroham-sage/50 border border-aroham-border text-xs italic text-aroham-body leading-relaxed">
              "No upcoming events at the moment. Stay connected for future updates"
            </div>

            <p className="text-xs text-aroham-muted leading-relaxed">
              We schedule guidance sessions dynamically in sync with college admission and scholarship release cycles.
            </p>

            <div className="pt-4 border-t border-aroham-border space-y-2">
              <div className="text-[10px] uppercase font-bold tracking-wider text-aroham-heading">
                Get Direct Reminders
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-aroham-mint hover:bg-aroham-mint/80 text-aroham-dark text-xs font-semibold flex items-center gap-1.5 border border-aroham-border"
                >
                  <InstagramIcon size={13} />
                  <span># Instagram Updates</span>
                </a>
                <button
                  onClick={onOpenGetInvolved}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-aroham-sage text-aroham-body text-xs font-semibold flex items-center gap-1.5 border border-aroham-border"
                >
                  <Mail size={13} />
                  <span>Mailing Circle</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAST EVENTS & IMPACT MILESTONES (CHRONOLOGICAL ARCHIVE)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-aroham-gold mb-1">
              Chronological Archive (2026)
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-aroham-heading">
              Past Events & Impact Milestones
            </h2>
            <p className="text-sm text-aroham-body mt-1 max-w-xl">
              A chronological timeline of transformative workshops, programs launched, and face-to-face mentorship assemblies organized by Aroham Foundation.
            </p>
          </div>

          {/* Toggle Sort Button */}
          <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-aroham-border shadow-sm text-xs font-semibold shrink-0 self-start sm:self-auto">
            <span className="px-3 py-1.5 rounded-lg bg-aroham-dark text-white">
              Chronological Sequence
            </span>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-1.5 rounded-lg text-aroham-body hover:text-aroham-dark hover:bg-aroham-sage transition-colors"
            >
              {sortOrder === 'asc' ? 'Oldest → Newest' : 'Newest → Oldest'}
            </button>
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-8">
          {sortedEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-aroham-border shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start hover:shadow-elevated transition-all duration-200"
            >
              {/* Left Date Column */}
              <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-3 lg:gap-1 border-b lg:border-b-0 lg:border-r border-aroham-border pb-4 lg:pb-0 lg:pr-6 shrink-0">
                <span className="text-xs uppercase font-extrabold tracking-wider text-aroham-muted">
                  {evt.month}
                </span>
                <span className="text-4xl sm:text-5xl font-extrabold font-serif text-aroham-dark">
                  {evt.day}
                </span>
                <div className="text-[11px] font-semibold text-aroham-forest/80 pt-1">
                  <span>Year {evt.year}</span>
                  <span className="block text-aroham-muted text-[10px]">{evt.sessionType}</span>
                </div>
              </div>

              {/* Center / Right Content */}
              <div className="lg:col-span-10 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {evt.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-full bg-aroham-amber-light text-aroham-gold text-[11px] font-bold border border-amber-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold font-serif text-aroham-heading">
                  {evt.title}
                </h3>

                <p className="text-xs sm:text-sm text-aroham-body leading-relaxed">
                  {evt.description}
                </p>

                {/* Specific Event Variants */}

                {/* Panelists card for Event 1 */}
                {evt.panelists && (
                  <div className="p-4 rounded-2xl bg-aroham-sage/40 border border-aroham-border space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-aroham-dark block">
                      Guest Speakers & Alumnae Panelists
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {evt.panelists.map((p, pIdx) => (
                        <div key={pIdx} className="text-xs font-semibold text-aroham-heading flex items-center gap-1.5">
                          <span className="text-aroham-forest">❖</span>
                          <span>{p.name} - <span className="text-aroham-muted font-normal">{p.university}</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats badge for Event 2 */}
                {evt.launchStats && (
                  <div className="grid grid-cols-2 gap-4 max-w-md pt-2">
                    <div className="p-4 rounded-xl bg-aroham-mint/60 border border-aroham-border flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-aroham-dark text-white font-bold text-sm flex items-center justify-center">
                        {evt.launchStats.students}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-aroham-dark">Student Registrations</div>
                        <div className="text-[10px] text-aroham-muted">{evt.launchStats.studentLabel}</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-aroham-amber-light border border-amber-200 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-aroham-gold text-white font-bold text-sm flex items-center justify-center">
                        {evt.launchStats.mentors}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-aroham-dark">Matched Alumni Mentors</div>
                        <div className="text-[10px] text-aroham-muted">{evt.launchStats.mentorLabel}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Speaker + Photos for Event 3 */}
                {evt.speaker && (
                  <div className="space-y-4 pt-2">
                    <div className="p-3.5 rounded-xl bg-white border border-aroham-border flex items-center justify-between max-w-md shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-aroham-dark text-white font-bold text-xs flex items-center justify-center">
                          {evt.speaker.initials}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-aroham-heading">{evt.speaker.name}</div>
                          <div className="text-[10px] text-aroham-muted">{evt.speaker.affiliation}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-aroham-forest bg-aroham-mint px-2 py-0.5 rounded-full border border-aroham-border">
                        {evt.speaker.tag}
                      </span>
                    </div>

                    {evt.photos && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {evt.photos.map((photo, phIdx) => (
                          <div key={phIdx} className="rounded-2xl overflow-hidden border border-aroham-border group relative">
                            <img
                              src={photo.img}
                              alt={photo.title}
                              className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white text-xs font-semibold">
                              {photo.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* On-ground summit for Event 4 */}
                {evt.onGroundMentors && (
                  <div className="p-4 rounded-xl bg-aroham-mint/40 border border-aroham-border flex items-center justify-between max-w-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <span className="w-8 h-8 rounded-full bg-aroham-dark text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">M1</span>
                        <span className="w-8 h-8 rounded-full bg-aroham-forest text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">M2</span>
                        <span className="w-8 h-8 rounded-full bg-aroham-gold text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">+7</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-aroham-heading">{evt.onGroundMentors.count} {evt.onGroundMentors.label}</div>
                        <div className="text-[10px] text-aroham-muted">{evt.onGroundMentors.sub}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-aroham-forest bg-white px-2.5 py-1 rounded-full border border-aroham-border">
                      {evt.onGroundMentors.tag}
                    </span>
                  </div>
                )}

                {/* Event Footer stats */}
                {evt.stats && (
                  <div className="pt-2 text-xs font-semibold text-aroham-forest flex items-center gap-2">
                    <CheckCircle2 size={15} />
                    <span>{evt.stats}</span>
                  </div>
                )}
                {evt.note && (
                  <div className="pt-1 text-xs text-aroham-muted">
                    <span>◆ {evt.note}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          PROPOSE A SESSION CALLOUT
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-aroham-dark p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-elevated">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif">
              Have an idea for a guidance session at your institution?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100">
              We collaborate with colleges, high schools, and student unions to host bespoke guidance assemblies and career bootcamps.
            </p>
          </div>
          <button
            onClick={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 bg-aroham-terracotta hover:bg-aroham-terracotta-dark text-white rounded-lg text-xs font-bold tracking-wide transition-all shadow shrink-0"
          >
            Propose a Session / Connect With Us
          </button>
        </div>
      </section>
    </div>
  );
}
