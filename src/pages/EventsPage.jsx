import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Users, 
  CheckCircle, 
  Bell, 
  Mail, 
  ArrowRight, 
  ArrowUpRight,
  Filter,
  CheckCircle2,
  ExternalLink,
  Radio
} from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { INITIAL_EVENTS } from '../admin/data/initialAdminData';

export default function EventsPage({ setActivePage, onOpenRegister, onOpenGetInvolved, events: propEvents }) {
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' = oldest to newest, 'desc' = newest to oldest

  // Directly derive events from propEvents or fallback to cached storage / INITIAL_EVENTS
  const events = propEvents && Array.isArray(propEvents)
    ? propEvents
    : (() => {
        try {
          const saved = localStorage.getItem('aroham_events');
          return saved ? JSON.parse(saved) : INITIAL_EVENTS;
        } catch (e) {
          return INITIAL_EVENTS;
        }
      })();

  // Historic extra media & panelists map for foundational sessions
  const historicalDetailsMap = {
    'EVT-01': {
      day: '18',
      month: 'APR',
      year: '2026',
      sessionType: 'Zoom Session',
      sessionNo: 'Session #01',
      tags: ['Global Education', 'Gulf Higher Ed'],
      panelists: [
        { name: 'Nuha Kadija', university: 'Khalifa University' },
        { name: 'Ayishathul Fibha Fabhina', university: 'University of Stirling' },
        { name: 'Fathima Afiya', university: 'University of Sharjah' }
      ],
      stats: '63 registrations • 50+ active participants'
    },
    'EVT-02': {
      day: '04',
      month: 'MAY',
      year: '2026',
      sessionType: 'Flagship Launch',
      sessionNo: 'Milestone #02',
      tags: ['Mentorship Framework', '1-on-1 Matching'],
      launchStats: {
        students: 17,
        studentLabel: 'Initial founding cohort',
        mentors: 10,
        mentorLabel: 'Dedicated 1-on-1 pairings'
      },
      note: '17 students matched seamlessly with 10 senior mentors'
    },
    'EVT-03': {
      day: '10',
      month: 'MAY',
      year: '2026',
      sessionType: 'Zoom Platform',
      sessionNo: 'Session #03',
      tags: ['Study in UK', 'UCAS & Scholarships'],
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
    'EVT-04': {
      day: '23',
      month: 'MAY',
      year: '2026',
      sessionType: '📍 Rose Lounge, Malappuram, Kerala',
      sessionNo: 'Classes 10-12 Summit',
      tags: ['Summit Partnership', 'Classes 10–12 Mentorship'],
      onGroundMentors: {
        count: 9,
        label: 'Aroham Alumni Mentors',
        sub: 'On-ground personalized career desks',
        tag: 'Live 1-to-1 Counseling'
      }
    }
  };

  const parseDateParts = (dateStr) => {
    if (!dateStr || dateStr === 'TBA') {
      return { day: '—', month: 'DATE', year: 'TBA' };
    }
    const parts = dateStr.trim().split(/[\s,/-]+/);
    if (parts.length >= 3) {
      if (isNaN(parts[1]) && !isNaN(parts[0])) {
        return {
          day: parts[0].padStart(2, '0'),
          month: parts[1].slice(0, 3).toUpperCase(),
          year: parts[2]
        };
      }
      if (parts[0].length === 4 && !isNaN(parts[0])) {
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const mIdx = parseInt(parts[1], 10) - 1;
        return {
          day: parts[2].padStart(2, '0'),
          month: monthNames[mIdx] || parts[1].slice(0, 3).toUpperCase(),
          year: parts[0]
        };
      }
      return {
        day: parts[0].slice(0, 2),
        month: parts[1].slice(0, 3).toUpperCase(),
        year: parts[2]
      };
    }
    return { day: dateStr.slice(0, 2), month: 'EVT', year: '2026' };
  };

  const upcomingEvents = events.filter(e => e.status === 'Upcoming');
  const completedEvents = events.filter(e => e.status === 'Completed');

  const formattedCompletedEvents = completedEvents.map((evt, idx) => {
    const extra = historicalDetailsMap[evt.id] || {};
    const dateParts = extra.day ? { day: extra.day, month: extra.month, year: extra.year } : parseDateParts(evt.date);
    return {
      id: evt.id,
      day: dateParts.day,
      month: dateParts.month,
      year: dateParts.year,
      sessionType: extra.sessionType || evt.platform || 'Interactive Session',
      sessionNo: extra.sessionNo || `Session #${idx + 1}`,
      tags: extra.tags || [evt.type || 'Guidance Session', 'Completed'],
      title: evt.title || evt.name,
      description: evt.details || evt.description || '',
      panelists: extra.panelists,
      launchStats: extra.launchStats,
      note: extra.note,
      speaker: extra.speaker,
      stats: extra.stats || (evt.attendees ? `${evt.attendees}+ participants` : null),
      photos: extra.photos,
      onGroundMentors: extra.onGroundMentors,
      platform: evt.platform
    };
  });

  const sortedEvents = [...formattedCompletedEvents].sort((a, b) => {
    return sortOrder === 'asc' 
      ? String(a.id).localeCompare(String(b.id)) 
      : String(b.id).localeCompare(String(a.id));
  });

  return (
    <div className="space-y-20 lg:space-y-28 pb-20 animate-fadeIn">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="pt-6 sm:pt-12 lg:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-aroham-border">
          <div className="space-y-4 max-w-3xl">
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
                {completedEvents.length}+
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
            {upcomingEvents.length > 0 ? (
              <span>📋 {upcomingEvents.length} Event{upcomingEvents.length > 1 ? 's' : ''} Scheduled</span>
            ) : (
              <span>Stay Tuned</span>
            )}
          </div>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-aroham-border shadow-soft flex flex-col justify-between space-y-6 hover:shadow-elevated transition-all"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-aroham-gold text-xs font-bold border border-amber-200">
                      {event.tag || event.type || '⚡ Registration Open'}
                    </span>
                    {event.platform && (
                      <span className="text-xs font-semibold text-aroham-muted flex items-center gap-1.5">
                        <Video size={14} className="text-aroham-forest" />
                        <span>{event.platform}</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-aroham-heading">
                      {event.title || event.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-aroham-body leading-relaxed mt-2">
                      {event.details}
                    </p>
                  </div>

                  {(event.date || event.time) && (
                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-aroham-mint/50 border border-aroham-border text-xs">
                      {event.date && (
                        <div>
                          <span className="text-[10px] uppercase font-bold text-aroham-muted block">Date</span>
                          <span className="font-bold text-aroham-heading mt-0.5 block">{event.date}</span>
                        </div>
                      )}
                      {event.time && (
                        <div>
                          <span className="text-[10px] uppercase font-bold text-aroham-muted block">Time</span>
                          <span className="font-bold text-aroham-heading mt-0.5 block">{event.time}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-aroham-dark hover:bg-aroham-forest text-white rounded-lg text-xs font-bold text-center transition-all shadow flex items-center justify-center gap-2"
                    >
                      <span>{event.linkText || 'Register for Event'}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <button
                      onClick={() => onOpenRegister(event.title || event.name)}
                      className="w-full py-3 bg-aroham-dark hover:bg-aroham-forest text-white rounded-lg text-xs font-bold text-center transition-all shadow flex items-center justify-center gap-2"
                    >
                      <span>{event.linkText || 'Register for Event'}</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-14 border border-aroham-border shadow-soft text-center max-w-3xl mx-auto space-y-6">
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
                href="https://www.instagram.com/arohamfoundation?xtok=MWFnYWYyMDkwcHdpeQ=="
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
        {sortedEvents.length > 0 ? (
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
        ) : (
          <div className="bg-white rounded-3xl p-12 border border-aroham-border shadow-soft text-center max-w-xl mx-auto space-y-3">
            <p className="text-sm font-semibold text-aroham-heading">
              No sessions found in the archive.
            </p>
            <p className="text-xs text-aroham-body">
              Completed workshops and conclaves will appear in this chronological timeline.
            </p>
          </div>
        )}
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
          <a
            href="mailto:arohamconnect@gmail.com?subject=Proposal%20for%20Guidance%20Session%20%2F%20Collaboration"
            className="px-6 py-3.5 bg-aroham-terracotta hover:bg-aroham-terracotta-dark text-white rounded-lg text-xs font-bold tracking-wide transition-all shadow shrink-0 inline-flex items-center justify-center gap-2"
          >
            <Mail size={15} />
            <span>Propose a Session / Connect With Us</span>
          </a>
        </div>
      </section>
    </div>
  );
}
