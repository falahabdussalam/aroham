import React, { useState } from 'react';
import { X, CheckCircle, Calendar, Clock, MapPin, Users, ShieldCheck } from 'lucide-react';

export default function RegisterModal({ isOpen, onClose, eventTitle = "Next Guidance Cohort & University Workshop" }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    academicYear: 'Class 12 / Higher Secondary',
    targetStream: 'STEM & Engineering',
    questions: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-aroham-dark/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-elevated max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden border border-aroham-border relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-aroham-dark to-aroham-forest p-5 sm:p-6 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:top-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-200 mb-2 border border-white/10">
            <span>🔴 1 Live Event Scheduled</span>
          </div>
          <h3 className="text-xl font-bold font-serif leading-snug">
            {eventTitle}
          </h3>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-emerald-100">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> Nov 16, 2025
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> 4:30 PM IST
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} /> Limited to 35 Seats
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={36} />
              </div>
              <h4 className="text-xl font-bold text-aroham-dark font-serif">
                Seat Reserved Successfully!
              </h4>
              <p className="text-sm text-aroham-body max-w-sm mx-auto">
                Thank you, <span className="font-semibold text-aroham-dark">{formData.name}</span>. We've sent the Zoom invitation link and preparatory handbook to <span className="font-semibold text-aroham-dark">{formData.email}</span>.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-aroham-dark text-white rounded-lg text-sm font-semibold hover:bg-aroham-forest transition-colors shadow"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aysha Mariyam"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                    WhatsApp / Contact
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 ..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                    Current Academic Level
                  </label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                  >
                    <option>Class 11 / 12</option>
                    <option>Undergraduate Student</option>
                    <option>Postgraduate Aspirant</option>
                    <option>Bolster Girls Campus Alumna</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                    Target Stream
                  </label>
                  <select
                    value={formData.targetStream}
                    onChange={(e) => setFormData({ ...formData, targetStream: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                  >
                    <option>STEM & Engineering</option>
                    <option>Medicine & Healthcare</option>
                    <option>Humanities & Law</option>
                    <option>Commerce & Management</option>
                    <option>Computer Science & AI</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-aroham-terracotta hover:bg-aroham-terracotta-dark text-white rounded-lg font-semibold text-sm shadow transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Confirm Free Seat Registration ↗
                </button>
              </div>

              <p className="flex items-center justify-center gap-1.5 text-xs text-aroham-muted pt-1">
                <ShieldCheck size={14} className="text-aroham-forest" />
                <span>Free access for all registered students. No fees involved.</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

