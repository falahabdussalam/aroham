import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CalendarPlus, 
  Trash2, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  X 
} from 'lucide-react';

export default function ManageEvents({ events, onAddEvent, onDeleteEvent, onToggleEventStatus }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    platform: 'Zoom Platform',
    type: 'Webinar',
    status: 'Upcoming',
    details: '',
    link: ''
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;

    const created = {
      id: `EVT-${Math.floor(10 + Math.random() * 90)}`,
      title: newEvent.title.trim(),
      date: newEvent.date || 'TBA',
      time: newEvent.time || 'TBA',
      platform: newEvent.platform.trim(),
      type: newEvent.type,
      status: newEvent.status,
      attendees: 0,
      details: newEvent.details.trim(),
      link: newEvent.link.trim()
    };

    onAddEvent(created);
    setIsAddOpen(false);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      platform: 'Zoom Platform',
      type: 'Webinar',
      status: 'Upcoming',
      details: '',
      link: ''
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-aroham-border shadow-soft">
        <div>
          <h2 className="text-2xl font-bold font-serif text-aroham-heading">
            Manage Events & Conclaves
          </h2>
          <p className="text-xs text-aroham-body mt-0.5">
            Coordinate guidance sessions, higher education conclaves, and alumni meets.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-5 py-2.5 bg-aroham-dark hover:bg-aroham-forest text-white rounded-xl text-xs font-bold transition-all shadow hover:shadow-elevated flex items-center justify-center gap-2 transform hover:-translate-y-0.5 shrink-0"
        >
          <CalendarPlus size={16} />
          <span>Schedule New Event</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-aroham-border shadow-soft flex flex-col justify-between space-y-5 hover:shadow-elevated transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                  evt.status === 'Upcoming'
                    ? 'bg-amber-100 text-aroham-gold border-amber-200'
                    : 'bg-emerald-50 text-aroham-forest border-emerald-200'
                }`}>
                  {evt.status} • {evt.type}
                </span>

                <span className="text-[10px] font-mono text-aroham-muted">{evt.id}</span>
              </div>

              <h3 className="text-xl font-bold font-serif text-aroham-heading leading-snug">
                {evt.title}
              </h3>

              <p className="text-xs text-aroham-body leading-relaxed">
                {evt.details}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-aroham-forest font-semibold">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-aroham-terracotta" />
                  <span>{evt.date}</span>
                </span>
                {evt.time && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-aroham-gold" />
                    <span>{evt.time}</span>
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-aroham-forest" />
                  <span>{evt.platform}</span>
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-aroham-border flex items-center justify-between text-xs">
              <button
                onClick={() => onToggleEventStatus(evt.id)}
                className="font-bold text-aroham-forest hover:underline flex items-center gap-1"
              >
                <span>Mark as {evt.status === 'Upcoming' ? 'Completed' : 'Upcoming'}</span>
              </button>

              <button
                onClick={() => onDeleteEvent(evt.id)}
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove Event"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-aroham-dark/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-lg w-full max-h-[92vh] overflow-y-auto border border-aroham-border shadow-popup space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-aroham-border">
              <h3 className="text-xl font-bold font-serif text-aroham-heading">
                Schedule Guidance Event
              </h3>
              <button onClick={() => setIsAddOpen(false)} className="text-aroham-muted hover:text-aroham-dark">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-aroham-dark uppercase mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g. European University Admissions Masterclass"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-aroham-dark uppercase mb-1">Date</label>
                  <input
                    type="text"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    placeholder="e.g. 15 Sep 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-aroham-dark uppercase mb-1">Time</label>
                  <input
                    type="text"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    placeholder="e.g. 18:30 IST"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-aroham-dark uppercase mb-1">Platform / Venue</label>
                  <input
                    type="text"
                    value={newEvent.platform}
                    onChange={(e) => setNewEvent({ ...newEvent, platform: e.target.value })}
                    placeholder="Zoom Platform / Campus Hall"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-aroham-dark uppercase mb-1">Status</label>
                  <select
                    value={newEvent.status}
                    onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-aroham-dark uppercase mb-1">Registration Link (Optional)</label>
                <input
                  type="url"
                  value={newEvent.link}
                  onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })}
                  placeholder="https://forms.gle/... or Zoom registration URL"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                />
              </div>

              <div>
                <label className="block font-bold text-aroham-dark uppercase mb-1">Event Description & Key Topics</label>
                <textarea
                  rows={3}
                  value={newEvent.details}
                  onChange={(e) => setNewEvent({ ...newEvent, details: e.target.value })}
                  placeholder="Outline topics covered, target scholar grade, and participating speakers..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                />
              </div>

              <div className="pt-3 border-t border-aroham-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 border border-aroham-border rounded-xl text-aroham-body hover:bg-aroham-sage"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-aroham-dark hover:bg-aroham-forest text-white rounded-xl font-bold"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

