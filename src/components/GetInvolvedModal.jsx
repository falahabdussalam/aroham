import React, { useState } from 'react';
import { X, CheckCircle, GraduationCap, Users2, Building, Mail, Loader2 } from 'lucide-react';

export default function GetInvolvedModal({ isOpen, onClose, onSubmitApplication }) {
  const [selectedRole, setSelectedRole] = useState('student');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    campusYear: '',
    message: ''
  });

  if (!isOpen) return null;

  const roleLabels = {
    student: 'Student Aspirant',
    mentor: 'Alumna Mentor',
    partner: 'Institutional Partner'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const appId = `APP-${Math.floor(100 + Math.random() * 900)}`;

    const applicationItem = {
      id: appId,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || 'N/A',
      role: roleLabels[selectedRole] || 'Student Aspirant',
      campusBatch: formData.campusYear.trim() || 'N/A',
      message: formData.message.trim() || `Submitted via Join Aroham Network form as ${roleLabels[selectedRole] || 'Community Member'}`,
      date: todayStr,
      status: 'New'
    };

    if (onSubmitApplication) {
      onSubmitApplication(applicationItem);
    } else {
      try {
        const savedApps = localStorage.getItem('aroham_applications');
        const apps = savedApps ? JSON.parse(savedApps) : [];
        localStorage.setItem('aroham_applications', JSON.stringify([applicationItem, ...apps]));

        if (selectedRole === 'student') {
          const studentId = `STU-${Math.floor(100 + Math.random() * 900)}`;
          const menteeItem = {
            id: studentId,
            name: formData.name.trim(),
            schoolOrCollege: formData.campusYear.trim() || 'Prospective Mentee',
            targetMajor: 'General Academic Guidance',
            assignedMentorId: null,
            assignedMentorName: 'Unassigned',
            status: 'Pending Match',
            matchedDate: 'In Review',
            targetCountry: 'Global'
          };
          const savedMentees = localStorage.getItem('aroham_mentees');
          const mentees = savedMentees ? JSON.parse(savedMentees) : [];
          localStorage.setItem('aroham_mentees', JSON.stringify([menteeItem, ...mentees]));
        }

        window.dispatchEvent(new Event('aroham_data_sync'));
      } catch (err) {
        console.error("Local sync error:", err);
      }
    }

    try {
      await fetch("https://formsubmit.co/ajax/arohamconnect@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: roleLabels[selectedRole] || selectedRole,
          phone: formData.phone || 'Not provided',
          campus_batch: formData.campusYear || 'N/A',
          message: formData.message || 'No additional note provided',
          _subject: `[Aroham Network Application] ${roleLabels[selectedRole] || selectedRole} - ${formData.name}`,
          _template: "table",
          _captcha: "false"
        })
      });
    } catch (err) {
      console.warn("Direct transmission note:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-aroham-dark/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-elevated max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden border border-aroham-border relative">
        <div className="bg-gradient-to-r from-aroham-dark to-aroham-forest p-5 sm:p-6 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:top-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <h3 className="text-xl font-bold font-serif leading-snug">
            Get Involved with Aroham Foundation
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            Empowering students and uniting alumnae across the globe.
          </p>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={36} />
              </div>
              <h4 className="text-xl font-bold text-aroham-dark font-serif">
                Thank You for Stepping Forward!
              </h4>
              <p className="text-sm text-aroham-body max-w-sm mx-auto leading-relaxed">
                Your application has been received and forwarded directly to <strong className="text-aroham-forest">arohamconnect@gmail.com</strong>. Our leadership team will review and connect with you at <span className="font-semibold text-aroham-dark">{formData.email}</span> shortly.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`mailto:arohamconnect@gmail.com?subject=Application%20Follow-up%20-%20${encodeURIComponent(formData.name)}`}
                  className="px-5 py-2.5 bg-aroham-sage text-aroham-dark rounded-lg text-xs font-semibold hover:bg-aroham-mint transition-colors flex items-center gap-1.5 border border-aroham-border"
                >
                  <Mail size={14} className="text-aroham-forest" />
                  <span>Email Team Directly</span>
                </a>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-aroham-dark text-white rounded-lg text-xs font-semibold hover:bg-aroham-forest transition-colors shadow"
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
                  disabled={isSubmitting}
                  className="w-full py-3 bg-aroham-dark hover:bg-aroham-forest disabled:opacity-75 text-white rounded-lg font-semibold text-sm shadow transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Connecting to arohamconnect@gmail.com...</span>
                    </>
                  ) : (
                    <span>Join Aroham Network →</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
