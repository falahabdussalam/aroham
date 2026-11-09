import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  Mail, 
  UserPlus, 
  CalendarPlus, 
  ArrowUpRight, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export default function DashboardOverview({ 
  mentors, 
  mentees, 
  events, 
  applications, 
  onNavigateTab, 
  onOpenAddMentor 
}) {
  const activeMatches = mentees.filter(m => m.status === 'Active Match').length;
  const pendingMatches = mentees.filter(m => m.status === 'Pending Match').length;

  const stats = [
    {
      label: 'Total Mentors',
      value: mentors.length,
      sub: 'Alumnae across 6 countries',
      icon: Users,
      color: 'bg-emerald-50 text-aroham-forest border-emerald-200',
      action: () => onNavigateTab('mentors')
    },
    {
      label: 'Mentees Enrolled',
      value: mentees.length,
      sub: `${activeMatches} Active • ${pendingMatches} In Review`,
      icon: GraduationCap,
      color: 'bg-amber-50 text-aroham-gold border-amber-200',
      action: () => onNavigateTab('mentees')
    },
    {
      label: 'Events & Sessions',
      value: events.length,
      sub: '4 Concluded • Ongoing',
      icon: Calendar,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      action: () => onNavigateTab('events')
    },
    {
      label: 'Network Applications',
      value: applications.length,
      sub: 'Students & Alumnae',
      icon: Mail,
      color: 'bg-orange-50 text-aroham-terracotta border-orange-200',
      action: () => onNavigateTab('applications')
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner with Quick Actions */}
      <div className="bg-gradient-to-r from-aroham-darker via-aroham-dark to-aroham-forest rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-elevated">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-300 border border-white/10">
            <Sparkles size={13} />
            <span>Executive Alumnae Command Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
            Welcome to Aroham Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
            Monitor mentorship pairings, curate alumnae profiles, and manage upcoming educational conclaves seamlessly.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onOpenAddMentor}
            className="px-5 py-2.5 bg-aroham-terracotta hover:bg-aroham-terracotta-dark text-white rounded-xl text-xs font-bold transition-all shadow flex items-center gap-2 transform hover:-translate-y-0.5 active:scale-95"
          >
            <UserPlus size={15} />
            <span>+ Add Mentor</span>
          </button>

          <button
            onClick={() => onNavigateTab('events')}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/20 flex items-center gap-2"
          >
            <CalendarPlus size={15} />
            <span>Manage Events</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={i}
              onClick={st.action}
              className="bg-white rounded-2xl p-5 border border-aroham-border shadow-soft flex items-center justify-between cursor-pointer hover:shadow-elevated transition-all transform hover:-translate-y-0.5 group"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-aroham-muted block">
                  {st.label}
                </span>
                <div className="text-3xl font-extrabold font-serif text-aroham-heading group-hover:text-aroham-forest transition-colors">
                  {st.value}
                </div>
                <div className="text-[11px] font-medium text-aroham-muted pt-0.5">
                  {st.sub}
                </div>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 ${st.color}`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-Column Section: Mentee Matching Pipeline & Discipline Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Mentee Applications / Matches */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-aroham-border shadow-soft space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-aroham-border">
            <div>
              <h3 className="text-lg font-bold font-serif text-aroham-heading">
                Mentee Matching Cohort
              </h3>
              <p className="text-xs text-aroham-body mt-0.5">
                Current student guidance requests and matched alumnae mentors
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('mentees')}
              className="text-xs font-bold text-aroham-forest hover:text-aroham-dark flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {mentees.slice(0, 5).map((m) => (
              <div
                key={m.id}
                className="p-3.5 rounded-2xl bg-[#F4F8F5] border border-aroham-border flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-aroham-mint text-aroham-dark font-bold font-serif text-xs flex items-center justify-center border border-aroham-border shrink-0">
                    {m.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-aroham-heading leading-tight">
                      {m.name}
                    </h4>
                    <p className="text-xs text-aroham-body">
                      {m.targetMajor} • <span className="text-aroham-muted">{m.targetCountry}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    m.status === 'Active Match'
                      ? 'bg-emerald-50 text-aroham-forest border-emerald-200'
                      : 'bg-amber-50 text-aroham-gold border-amber-200'
                  }`}>
                    {m.status}
                  </span>
                  <div className="text-[10px] font-semibold text-aroham-forest mt-1">
                    Mentor: {m.assignedMentorName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Mentorship Stream Distribution */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-aroham-border shadow-soft space-y-6">
          <div className="pb-4 border-b border-aroham-border">
            <h3 className="text-lg font-bold font-serif text-aroham-heading">
              Guidance Streams
            </h3>
            <p className="text-xs text-aroham-body mt-0.5">
              Distribution of mentors by field of study
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-aroham-heading">
                <span>Engineering & Technology</span>
                <span className="text-aroham-forest font-semibold">2 Active</span>
              </div>
              <div className="w-full h-2 bg-aroham-sage rounded-full overflow-hidden">
                <div className="h-full bg-aroham-dark rounded-full w-[35%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-aroham-heading">
                <span>Humanities & Social Sciences</span>
                <span className="text-aroham-forest font-semibold">2 Active</span>
              </div>
              <div className="w-full h-2 bg-aroham-sage rounded-full overflow-hidden">
                <div className="h-full bg-aroham-gold rounded-full w-[35%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-aroham-heading">
                <span>Medicine & Healthcare</span>
                <span className="text-aroham-forest font-semibold">1 Active</span>
              </div>
              <div className="w-full h-2 bg-aroham-sage rounded-full overflow-hidden">
                <div className="h-full bg-aroham-terracotta rounded-full w-[20%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-aroham-heading">
                <span>Business & International Mgmt</span>
                <span className="text-aroham-forest font-semibold">1 Active</span>
              </div>
              <div className="w-full h-2 bg-aroham-sage rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full w-[20%]" />
              </div>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="p-4 rounded-2xl bg-aroham-mint border border-aroham-border space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-aroham-dark">
              <ShieldCheck size={16} className="text-aroham-forest" />
              <span>100% Match Ratio Guaranteed</span>
            </div>
            <p className="text-[11px] text-aroham-body leading-relaxed">
              Every registered Bolster Girls Campus scholar receives a dedicated 1-on-1 alumna pairing tailored to her admissions roadmap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
