import React, { useState } from 'react';
import { X, CheckCircle, GraduationCap, Building2, MapPin, Sparkles } from 'lucide-react';

export default function RequestMatchModal({ isOpen, onClose, mentor }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    schoolOrCollege: '',
    intendedMajor: mentor ? mentor.major : '',
    aspirations: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDone = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-aroham-dark/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-elevated max-w-lg w-full overflow-hidden border border-aroham-border relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-aroham-dark to-aroham-forest p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/20 text-xs font-semibold text-amber-300 mb-2 border border-amber-400/30">
            <Sparkles size={12} />
            <span>UniMates 1:1 Mentorship Matching</span>
          </div>
          <h3 className="text-xl font-bold font-serif leading-snug">
            {mentor ? `Request 1:1 Match with ${mentor.name}` : 'Connect with an Alumna Mentor'}
          </h3>
          {mentor && (
            <p className="text-xs text-emerald-200 mt-1 flex items-center gap-2">
              <span>{mentor.university}</span> • <span>{mentor.major}</span>
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={36} />
              </div>
              <h4 className="text-xl font-bold text-aroham-dark font-serif">
                Match Request Submitted!
              </h4>
              <p className="text-sm text-aroham-body max-w-sm mx-auto">
                Your profile has been routed to the Aroham Mentorship Council. We will review your goals and introduce you to your mentor within 24–48 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleDone}
                  className="px-6 py-2.5 bg-aroham-dark text-white rounded-lg text-sm font-semibold hover:bg-aroham-forest transition-colors shadow"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs">
                <span className="text-amber-900 font-medium">Direct Google Form available:</span>
                <a
                  href="https://forms.gle/JyFUEfFbERjRgUyD6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-aroham-dark font-bold rounded-lg transition-colors shrink-0"
                >
                  Register as a Mentee ↗
                </a>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="e.g. Fathima Zahra"
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
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 ..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                  Current Institution / School
                </label>
                <input
                  type="text"
                  value={formData.schoolOrCollege}
                  onChange={(e) => setFormData({ ...formData, schoolOrCollege: e.target.value })}
                  placeholder="e.g. Higher Secondary School / College"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                  What specific guidance are you seeking?
                </label>
                <textarea
                  rows={3}
                  value={formData.aspirations}
                  onChange={(e) => setFormData({ ...formData, aspirations: e.target.value })}
                  placeholder="Tell us about your target course, scholarships, application questions, or country of interest..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-aroham-dark hover:bg-aroham-forest text-white rounded-lg font-semibold text-sm shadow transition-all duration-200"
                >
                  Submit 1:1 Match Request →
                </button>
              </div>
            </form>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

