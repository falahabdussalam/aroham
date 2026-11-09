import React, { useState } from 'react';
import { X, UserPlus, Sparkles, GraduationCap, Building2, MapPin, Mail, Phone, BookOpen, ShieldCheck } from 'lucide-react';

export default function AddMentorModal({ isOpen, onClose, onAddMentor }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    stream: 'Engineering',
    location: '',
    status: 'Available for 1-on-1 Guidance',
    description: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const streamOptions = [
    'Engineering',
    'Business',
    'Medicine & Biomedical',
    'Humanities',
    'Computer Science & AI',
    'Law & Public Policy'
  ];

  const statusOptions = [
    'Available for 1-on-1 Guidance',
    'Active Mentor',
    'Weekend Sessions',
    'Available for UCAS Guidance'
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Mentor name is required';
    if (!formData.university.trim()) errs.university = 'University is required';
    if (!formData.major.trim()) errs.major = 'Major / specialization is required';
    if (!formData.location.trim()) errs.location = 'Location is required';
    if (!formData.description.trim()) errs.description = 'Please provide a short mentorship overview';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Determine badge color based on stream
    let badgeColor = 'bg-emerald-100 text-aroham-forest border-emerald-200';
    if (formData.stream === 'Engineering') {
      badgeColor = 'bg-amber-100 text-aroham-gold border-amber-200';
    } else if (formData.stream === 'Medicine & Biomedical') {
      badgeColor = 'bg-orange-100 text-aroham-terracotta border-orange-200';
    } else if (formData.stream === 'Computer Science & AI') {
      badgeColor = 'bg-blue-100 text-blue-700 border-blue-200';
    }

    const newMentor = {
      id: `AM-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name.trim(),
      university: formData.university.trim(),
      major: formData.major.trim(),
      stream: formData.stream,
      location: formData.location.trim(),
      status: formData.status,
      badgeColor,
      description: formData.description.trim(),
      email: formData.email.trim() || 'mentor@alumnae.aroham.org',
      phone: formData.phone.trim() || 'N/A',
      activeMentees: 0,
      image: '' // Prepared for blank / custom photo upload
    };

    onAddMentor(newMentor);
    onClose();
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      university: '',
      major: '',
      stream: 'Engineering',
      location: '',
      status: 'Available for 1-on-1 Guidance',
      description: ''
    });
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-aroham-dark/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-popup max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-aroham-border relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-aroham-darker via-aroham-dark to-aroham-forest p-6 text-white relative sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-300 mb-2 border border-white/10">
            <UserPlus size={13} />
            <span>Aroham UniMates Directory</span>
          </div>
          <h3 className="text-2xl font-bold font-serif leading-snug">
            Add New Alumna Mentor
          </h3>
          <p className="text-xs text-emerald-100/90 mt-1">
            Expand the network with verified Bolster Girls Campus alumnae across global universities.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-aroham-dark uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Fathima Zahra"
                className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-400 bg-red-50/50' : 'border-aroham-border bg-[#F4F8F5]'} text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* University */}
            <div>
              <label className="block text-xs font-bold text-aroham-dark uppercase tracking-wider mb-1.5">
                University / Institution *
              </label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                placeholder="e.g. Khalifa University / UCL"
                className={`w-full px-4 py-2.5 rounded-xl border ${errors.university ? 'border-red-400 bg-red-50/50' : 'border-aroham-border bg-[#F4F8F5]'} text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20`}
              />
              {errors.university && <p className="text-xs text-red-500 mt-1">{errors.university}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Major */}
            <div>
              <label className="block text-xs font-bold text-aroham-dark uppercase tracking-wider mb-1.5">
                Degree / Major *
              </label>
              <input
                type="text"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                placeholder="e.g. Aerospace Engineering"
                className={`w-full px-4 py-2.5 rounded-xl border ${errors.major ? 'border-red-400 bg-red-50/50' : 'border-aroham-border bg-[#F4F8F5]'} text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20`}
              />
              {errors.major && <p className="text-xs text-red-500 mt-1">{errors.major}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-aroham-dark uppercase tracking-wider mb-1.5">
                Location (City, Country) *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Abu Dhabi, UAE / London, UK"
                className={`w-full px-4 py-2.5 rounded-xl border ${errors.location ? 'border-red-400 bg-red-50/50' : 'border-aroham-border bg-[#F4F8F5]'} text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20`}
              />
              {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Stream */}
            <div>
              <label className="block text-xs font-bold text-aroham-dark uppercase tracking-wider mb-1.5">
                Academic Stream
              </label>
              <select
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
              >
                {streamOptions.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-aroham-dark uppercase tracking-wider mb-1.5">
                Mentorship Availability Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-aroham-dark uppercase tracking-wider mb-1.5">
                Email Address (Confidential)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="mentor@alumnae.aroham.org"
                className="w-full px-4 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-aroham-dark uppercase tracking-wider mb-1.5">
                Phone / WhatsApp (Optional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+971 ... / +91 ..."
                className="w-full px-4 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-aroham-dark uppercase tracking-wider mb-1.5">
              Mentorship Focus & Guidance Description *
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Focuses on STEM admissions in the GCC, engineering design fundamentals, and undergraduate research application strategies."
              className={`w-full px-4 py-2.5 rounded-xl border ${errors.description ? 'border-red-400 bg-red-50/50' : 'border-aroham-border bg-[#F4F8F5]'} text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-aroham-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-aroham-border text-aroham-body text-xs font-semibold hover:bg-aroham-sage transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-aroham-dark hover:bg-aroham-forest text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow hover:shadow-elevated flex items-center gap-1.5"
            >
              <UserPlus size={15} />
              <span>Save & Publish Mentor</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

