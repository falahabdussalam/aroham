import React, { useState } from 'react';
import { X, CheckCircle, Heart, GraduationCap, Users2, Building } from 'lucide-react';

export default function GetInvolvedModal({ isOpen, onClose }) {
  const [selectedRole, setSelectedRole] = useState('student');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    campusYear: '',
    message: ''
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-aroham-dark/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-elevated max-w-lg w-full overflow-hidden border border-aroham-border relative">
        <div className="bg-gradient-to-r from-aroham-dark to-aroham-forest p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-200 mb-2 border border-white/10">
            <Heart size={12} className="fill-emerald-200" />
            <span>Join Our Sisterhood</span>
          </div>
          <h3 className="text-xl font-bold font-serif leading-snug">
            Get Involved with Aroham Foundation
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            Empowering students and uniting alumnae across the globe.
          </p>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={36} />
              </div>
              <h4 className="text-xl font-bold text-aroham-dark font-serif">
                Thank You for Stepping Forward!
              </h4>
              <p className="text-sm text-aroham-body max-w-sm mx-auto">
                We're thrilled to welcome you. Our leadership committee will reach out to <span className="font-semibold text-aroham-dark">{formData.email}</span> shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-aroham-dark text-white rounded-lg text-sm font-semibold hover:bg-aroham-forest transition-colors shadow"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role selection tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-aroham-sage/40 rounded-xl border border-aroham-border">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all flex flex-col items-center gap-1 ${
                    selectedRole === 'student'
                      ? 'bg-white text-aroham-dark shadow-sm'
                      : 'text-aroham-muted hover:text-aroham-dark'
                  }`}
                >
                  <GraduationCap size={16} />
                  <span>As a Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('mentor')}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all flex flex-col items-center gap-1 ${
                    selectedRole === 'mentor'
                      ? 'bg-white text-aroham-dark shadow-sm'
                      : 'text-aroham-muted hover:text-aroham-dark'
                  }`}
                >
                  <Users2 size={16} />
                  <span>As a Mentor</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('partner')}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all flex flex-col items-center gap-1 ${
                    selectedRole === 'partner'
                      ? 'bg-white text-aroham-dark shadow-sm'
                      : 'text-aroham-muted hover:text-aroham-dark'
                  }`}
                >
                  <Building size={16} />
                  <span>As a Partner</span>
                </button>
              </div>

              {selectedRole === 'student' && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-center justify-between gap-3 text-xs">
                  <span className="text-amber-900 font-medium">Looking for 1:1 guidance from an alumna?</span>
                  <a
                    href="https://forms.gle/JyFUEfFbERjRgUyD6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-aroham-dark font-bold rounded-lg transition-colors"
                  >
                    Register as a Mentee ↗
                  </a>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
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
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                    Contact / WhatsApp
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

              {selectedRole === 'mentor' && (
                <div>
                  <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                    Bolster Girls Campus Batch / Graduation Year
                  </label>
                  <input
                    type="text"
                    value={formData.campusYear}
                    onChange={(e) => setFormData({ ...formData, campusYear: e.target.value })}
                    placeholder="e.g. Batch of 2022 / Current University"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-aroham-dark uppercase tracking-wider mb-1">
                  How would you like to contribute or connect?
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your background, interests, or any questions..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-aroham-border bg-aroham-sage/30 text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-aroham-dark hover:bg-aroham-forest text-white rounded-lg font-semibold text-sm shadow transition-all duration-200"
                >
                  Join Aroham Network →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

