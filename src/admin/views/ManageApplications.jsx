import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Calendar, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Search,
  Filter,
  UserCheck
} from 'lucide-react';

export default function ManageApplications({ applications, onUpdateApplicationStatus, onDeleteApplication }) {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  const roles = ['All', 'Student Aspirant', 'Alumna Mentor', 'Institutional Partner'];

  const filtered = applications.filter((app) => {
    const matchesSearch = 
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      (app.message && app.message.toLowerCase().includes(search.toLowerCase()));
    const matchesRole = filterRole === 'All' || app.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-aroham-border shadow-soft">
        <div>
          <h2 className="text-2xl font-bold font-serif text-aroham-heading">
            Network Applications
          </h2>
          <p className="text-xs text-aroham-body mt-0.5">
            Review incoming student requests, mentor volunteers, and partnership proposals from the website.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-aroham-mint text-aroham-dark text-xs font-bold border border-aroham-border">
          <span>{applications.length} Submissions Logged</span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-aroham-border shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-aroham-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or message note..."
            className="w-full pl-11 pr-4 py-2.5 bg-[#F4F8F5] rounded-xl border border-aroham-border text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setFilterRole(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                filterRole === r
                  ? 'bg-aroham-dark text-white shadow-sm'
                  : 'bg-[#F4F8F5] text-aroham-body hover:bg-aroham-sage border border-aroham-border'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Cards */}
      <div className="space-y-4">
        {filtered.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-3xl p-6 border border-aroham-border shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-elevated transition-all"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-bold font-serif text-lg text-aroham-heading">
                  {app.name}
                </span>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                  app.role === 'Alumna Mentor'
                    ? 'bg-amber-100 text-aroham-gold border-amber-200'
                    : app.role === 'Student Aspirant'
                    ? 'bg-emerald-50 text-aroham-forest border-emerald-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {app.role}
                </span>

                {app.campusBatch && app.campusBatch !== 'N/A' && (
                  <span className="text-[11px] font-semibold text-aroham-muted bg-aroham-sage px-2 py-0.5 rounded-md border border-aroham-border">
                    🎓 {app.campusBatch}
                  </span>
                )}

                <span className="text-[11px] text-aroham-muted">
                  • Received {app.date}
                </span>
              </div>

              <p className="text-xs text-aroham-body leading-relaxed bg-[#F4F8F5] p-3 rounded-xl border border-aroham-border">
                "{app.message}"
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                <a
                  href={`mailto:${app.email}?subject=Aroham%20Foundation%20Network%20Application%20Follow-up`}
                  className="font-semibold text-aroham-forest hover:text-aroham-dark flex items-center gap-1.5"
                >
                  <Mail size={13} />
                  <span>{app.email}</span>
                </a>

                {app.phone && app.phone !== 'N/A' && (
                  <a
                    href={`tel:${app.phone}`}
                    className="text-aroham-body hover:text-aroham-dark flex items-center gap-1.5 font-medium"
                  >
                    <Phone size={13} className="text-aroham-muted" />
                    <span>{app.phone}</span>
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-aroham-border">
              <select
                value={app.status}
                onChange={(e) => onUpdateApplicationStatus(app.id, e.target.value)}
                className={`px-3 py-1 rounded-xl text-xs font-bold border focus:outline-none ${
                  app.status === 'Approved'
                    ? 'bg-emerald-50 text-aroham-forest border-emerald-200'
                    : app.status === 'In Review'
                    ? 'bg-amber-50 text-aroham-gold border-amber-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}
              >
                <option value="New">Status: New</option>
                <option value="In Review">Status: In Review</option>
                <option value="Approved">Status: Approved</option>
              </select>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${app.email}?subject=Aroham%20Foundation%20Application%20Response&body=Dear%20${encodeURIComponent(app.name)}%2C%0A%0AThank%20you%20for%20reaching%20out%20to%20Aroham%20Foundation.%20`}
                  className="px-3 py-1.5 rounded-lg bg-aroham-sage hover:bg-aroham-mint text-aroham-dark text-xs font-semibold transition-colors flex items-center gap-1 border border-aroham-border"
                >
                  <Mail size={13} />
                  <span>Reply</span>
                </a>

                <button
                  onClick={() => onDeleteApplication(app.id)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Application"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center text-aroham-muted border border-aroham-border">
            No applications found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

