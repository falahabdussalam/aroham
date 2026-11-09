import React, { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  Trash2, 
  Edit3, 
  MapPin, 
  GraduationCap, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Filter, 
  CheckCircle2, 
  Eye,
  Camera,
  Upload,
  X
} from 'lucide-react';

export default function ManageMentors({ mentors, onDeleteMentor, onOpenAddMentor, onUpdateMentor }) {
  const [search, setSearch] = useState('');
  const [selectedStream, setSelectedStream] = useState('All');
  const [selectedMentorDetails, setSelectedMentorDetails] = useState(null);
  const [editingMentor, setEditingMentor] = useState(null);
  const [mentorToDelete, setMentorToDelete] = useState(null);

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

  const streams = ['All', 'Engineering', 'Business', 'Medicine & Biomedical', 'Humanities', 'Computer Science & AI'];

  const filtered = mentors.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.university.toLowerCase().includes(search.toLowerCase()) ||
      m.major.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase());
    const matchesStream = selectedStream === 'All' || m.stream === selectedStream;
    return matchesSearch && matchesStream;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-aroham-border shadow-soft">
        <div>
          <h2 className="text-2xl font-bold font-serif text-aroham-heading">
            Manage Mentors
          </h2>
          <p className="text-xs text-aroham-body mt-0.5">
            Oversee, curate, and onboard verified alumnae mentors for Aroham UniMates.
          </p>
        </div>

        <button
          onClick={onOpenAddMentor}
          className="px-5 py-2.5 bg-aroham-dark hover:bg-aroham-forest text-white rounded-xl text-xs font-bold transition-all shadow hover:shadow-elevated flex items-center justify-center gap-2 transform hover:-translate-y-0.5 shrink-0"
        >
          <UserPlus size={16} />
          <span>Add New Mentor</span>
        </button>
      </div>

      {/* Search & Stream Filter */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-aroham-border shadow-soft space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-aroham-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by mentor name, university, degree, or country..."
            className="w-full pl-11 pr-4 py-3 bg-[#F4F8F5] rounded-xl border border-aroham-border text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-aroham-muted uppercase tracking-wider shrink-0 mr-1">
            Filter Stream:
          </span>
          {streams.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStream(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedStream === st
                  ? 'bg-aroham-dark text-white shadow-sm'
                  : 'bg-[#F4F8F5] text-aroham-body hover:bg-aroham-sage border border-aroham-border'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Card List (shown on mobile, hidden on desktop) */}
      <div className="md:hidden space-y-3">
        {filtered.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-2xl p-4 border border-aroham-border shadow-soft space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {mentor.image ? (
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-xl object-cover border border-aroham-border shrink-0 shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-aroham-mint border border-aroham-border text-aroham-dark font-serif font-bold text-sm flex items-center justify-center shrink-0">
                    {mentor.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                )}
                <div>
                  <h4 className="font-bold font-serif text-aroham-heading text-base leading-snug">
                    {mentor.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-aroham-sage text-aroham-muted border border-aroham-border">
                      {mentor.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${mentor.badgeColor}`}>
                      {mentor.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs pt-1 border-t border-aroham-border/60">
              <div className="font-semibold text-aroham-forest flex items-center gap-1.5">
                <GraduationCap size={14} />
                <span>{mentor.university}</span>
              </div>
              <div className="text-aroham-body pl-5">
                {mentor.major} • <span className="font-semibold text-aroham-gold">{mentor.stream}</span>
              </div>
              <div className="text-aroham-muted flex items-center gap-1.5 pl-5 pt-0.5">
                <MapPin size={12} />
                <span>{mentor.location}</span>
              </div>
            </div>

            {/* Mobile Touch Action Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-aroham-border/60">
              <button
                type="button"
                onClick={() => setSelectedMentorDetails(mentor)}
                className="py-2 px-2 bg-aroham-sage/60 hover:bg-aroham-sage text-aroham-dark rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border border-aroham-border active:scale-95"
              >
                <Eye size={13} />
                <span>Details</span>
              </button>

              <button
                type="button"
                onClick={() => setEditingMentor({ ...mentor })}
                className="py-2 px-2 bg-emerald-50 hover:bg-emerald-100 text-aroham-forest rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border border-emerald-200 active:scale-95"
              >
                <Edit3 size={13} />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => setMentorToDelete(mentor)}
                className="py-2 px-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border border-red-200 active:scale-95"
              >
                <Trash2 size={13} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-8 border border-aroham-border text-center text-aroham-muted text-xs">
            No mentors found matching your search.
          </div>
        )}
      </div>

      {/* Desktop Mentors Table (hidden on mobile) */}
      <div className="hidden md:block bg-white rounded-3xl border border-aroham-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F4F8F5] text-xs font-bold text-aroham-muted uppercase tracking-wider border-b border-aroham-border">
              <tr>
                <th className="py-4 px-6">Mentor Info</th>
                <th className="py-4 px-6">University & Degree</th>
                <th className="py-4 px-6">Discipline Stream</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-aroham-border/60">
              {filtered.map((mentor) => (
                <tr key={mentor.id} className="hover:bg-aroham-sage/30 transition-colors">
                  {/* Name & ID */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {mentor.image ? (
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-10 h-10 rounded-xl object-cover border border-aroham-border shrink-0 shadow-sm"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-aroham-mint border border-aroham-border text-aroham-dark font-serif font-bold text-sm flex items-center justify-center shrink-0">
                          {mentor.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-aroham-heading flex items-center gap-2">
                          <span>{mentor.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-aroham-sage text-aroham-muted border border-aroham-border">
                            {mentor.id}
                          </span>
                        </div>
                        <div className="text-xs text-aroham-muted flex items-center gap-1.5 mt-0.5">
                          <MapPin size={12} />
                          <span>{mentor.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* University & Major */}
                  <td className="py-4 px-6">
                    <div className="font-semibold text-aroham-forest flex items-center gap-1.5">
                      <GraduationCap size={15} />
                      <span>{mentor.university}</span>
                    </div>
                    <div className="text-xs text-aroham-body mt-0.5">
                      {mentor.major}
                    </div>
                  </td>

                  {/* Stream */}
                  <td className="py-4 px-6">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-aroham-sage text-aroham-forest border border-aroham-border">
                      {mentor.stream}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${mentor.badgeColor}`}>
                      {mentor.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedMentorDetails(mentor)}
                        className="p-2 rounded-lg text-aroham-muted hover:text-aroham-dark hover:bg-aroham-sage transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingMentor({ ...mentor })}
                        className="p-2 rounded-lg text-aroham-muted hover:text-aroham-forest hover:bg-emerald-50 transition-colors"
                        title="Edit Mentor Profile"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setMentorToDelete(mentor)}
                        className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                        title="Remove Mentor"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-aroham-muted">
                    No mentors found matching your search. Try adjusting the query or click "Add New Mentor".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mentor Details Modal */}
      {selectedMentorDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-aroham-dark/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-lg w-full max-h-[92vh] overflow-y-auto border border-aroham-border shadow-popup space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-aroham-border">
              <div className="flex items-center gap-3">
                {selectedMentorDetails.image ? (
                  <img
                    src={selectedMentorDetails.image}
                    alt={selectedMentorDetails.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-aroham-forest shrink-0 shadow-sm"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-aroham-mint text-aroham-dark font-bold font-serif flex items-center justify-center text-lg border border-aroham-border shrink-0 shadow-sm">
                    {selectedMentorDetails.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold font-serif text-aroham-heading">
                    {selectedMentorDetails.name}
                  </h3>
                  <p className="text-xs font-mono text-aroham-muted">{selectedMentorDetails.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMentorDetails(null)}
                className="p-1 rounded-full text-aroham-muted hover:text-aroham-dark"
              >
                ✕
              </button>
            </div>

            {/* Profile Picture Management Card */}
            <div className="p-3.5 rounded-2xl bg-[#F4F8F5] border border-aroham-border space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-aroham-dark uppercase tracking-wider flex items-center gap-1.5">
                  <Camera size={14} className="text-aroham-forest" />
                  <span>Profile Picture</span>
                </span>
                {selectedMentorDetails.image && (
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...selectedMentorDetails, image: '' };
                      setSelectedMentorDetails(updated);
                      if (onUpdateMentor) onUpdateMentor(updated);
                    }}
                    className="text-[11px] font-semibold text-red-500 hover:text-red-700"
                  >
                    Remove Photo
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="px-3 py-1.5 rounded-xl bg-aroham-dark hover:bg-aroham-forest text-white text-xs font-semibold cursor-pointer transition-all shadow-sm flex items-center gap-1.5">
                  <Upload size={13} />
                  <span>{selectedMentorDetails.image ? 'Change Photo' : 'Upload Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const updated = { ...selectedMentorDetails, image: reader.result };
                          setSelectedMentorDetails(updated);
                          if (onUpdateMentor) onUpdateMentor(updated);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>

                <span className="text-[11px] text-aroham-muted">or</span>

                <input
                  type="url"
                  placeholder="Paste image link URL..."
                  defaultValue={selectedMentorDetails.image && !selectedMentorDetails.image.startsWith('data:') ? selectedMentorDetails.image : ''}
                  onBlur={(e) => {
                    const url = e.target.value.trim();
                    if (url && url !== selectedMentorDetails.image) {
                      const updated = { ...selectedMentorDetails, image: url };
                      setSelectedMentorDetails(updated);
                      if (onUpdateMentor) onUpdateMentor(updated);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const url = e.target.value.trim();
                      if (url && url !== selectedMentorDetails.image) {
                        const updated = { ...selectedMentorDetails, image: url };
                        setSelectedMentorDetails(updated);
                        if (onUpdateMentor) onUpdateMentor(updated);
                      }
                    }
                  }}
                  className="flex-1 min-w-[150px] px-3 py-1.5 rounded-xl border border-aroham-border bg-white text-xs focus:outline-none focus:ring-1 focus:ring-aroham-dark"
                />
              </div>
              <p className="text-[10px] text-aroham-muted">
                Profile picture updates appear instantly across the UniMates directory and website.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#F4F8F5] rounded-xl border border-aroham-border space-y-1">
                <div className="font-bold text-aroham-forest flex items-center gap-1.5">
                  <GraduationCap size={15} />
                  <span>{selectedMentorDetails.university}</span>
                </div>
                <div className="text-aroham-body">{selectedMentorDetails.major}</div>
                <div className="text-aroham-muted flex items-center gap-1 pt-1">
                  <MapPin size={13} />
                  <span>{selectedMentorDetails.location}</span>
                </div>
              </div>

              <div>
                <span className="font-bold uppercase tracking-wider text-aroham-muted block mb-1">
                  Mentorship Focus:
                </span>
                <p className="text-aroham-body leading-relaxed bg-[#F4F8F5] p-3 rounded-xl border border-aroham-border">
                  {selectedMentorDetails.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-2.5 rounded-xl bg-[#F4F8F5] border border-aroham-border">
                  <span className="text-[10px] uppercase font-bold text-aroham-muted block">Email:</span>
                  <span className="font-semibold text-aroham-heading truncate block">{selectedMentorDetails.email}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F4F8F5] border border-aroham-border">
                  <span className="text-[10px] uppercase font-bold text-aroham-muted block">Status:</span>
                  <span className="font-bold text-aroham-forest block">{selectedMentorDetails.status}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditingMentor({ ...selectedMentorDetails });
                  setSelectedMentorDetails(null);
                }}
                className="flex-1 py-2.5 bg-aroham-forest hover:bg-aroham-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Edit3 size={14} />
                <span>Edit Profile</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMentorToDelete(selectedMentorDetails);
                }}
                className="py-2.5 px-3.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Trash2 size={14} />
                <span>Remove Mentor</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMentorDetails(null)}
                className="px-4 py-2.5 border border-aroham-border text-aroham-dark rounded-xl text-xs font-bold hover:bg-aroham-sage transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Mentor Modal */}
      {editingMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-aroham-dark/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-aroham-border shadow-popup space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-aroham-border">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-aroham-forest flex items-center justify-center">
                  <Edit3 size={16} />
                </span>
                <div>
                  <h3 className="text-xl font-bold font-serif text-aroham-heading">
                    Edit Mentor Profile
                  </h3>
                  <p className="text-xs text-aroham-muted font-mono">{editingMentor.id}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingMentor(null)}
                className="p-1 rounded-full text-aroham-muted hover:text-aroham-dark"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                let badgeColor = editingMentor.badgeColor || 'bg-emerald-100 text-aroham-forest border-emerald-200';
                if (editingMentor.stream === 'Engineering') {
                  badgeColor = 'bg-amber-100 text-aroham-gold border-amber-200';
                } else if (editingMentor.stream === 'Medicine & Biomedical') {
                  badgeColor = 'bg-orange-100 text-aroham-terracotta border-orange-200';
                } else if (editingMentor.stream === 'Computer Science & AI') {
                  badgeColor = 'bg-blue-100 text-blue-700 border-blue-200';
                }
                const toSave = { ...editingMentor, badgeColor };
                if (onUpdateMentor) onUpdateMentor(toSave);
                setEditingMentor(null);
              }}
              className="space-y-4 text-xs"
            >
              {/* Profile Picture In Edit Form */}
              <div className="p-4 rounded-2xl bg-[#F4F8F5] border border-aroham-border flex flex-col sm:flex-row items-center gap-4">
                <div className="shrink-0">
                  {editingMentor.image ? (
                    <div className="relative">
                      <img
                        src={editingMentor.image}
                        alt="Preview"
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-aroham-forest shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setEditingMentor({ ...editingMentor, image: '' })}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center shadow"
                        title="Remove photo"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-aroham-mint border border-aroham-border flex items-center justify-center text-aroham-dark font-serif font-bold text-base shadow-sm">
                      {(editingMentor.name || 'M').split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1.5 text-center sm:text-left w-full">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-aroham-dark uppercase">Profile Picture</span>
                    {editingMentor.image && (
                      <button
                        type="button"
                        onClick={() => setEditingMentor({ ...editingMentor, image: '' })}
                        className="text-[11px] text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    <label className="px-3 py-1.5 rounded-xl bg-aroham-dark hover:bg-aroham-forest text-white text-xs font-semibold cursor-pointer transition-all shadow-sm flex items-center gap-1.5">
                      <Upload size={13} />
                      <span>Upload from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files && e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setEditingMentor({ ...editingMentor, image: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>

                    <span className="text-[11px] text-aroham-muted">or</span>

                    <input
                      type="url"
                      value={editingMentor.image && !editingMentor.image.startsWith('data:') ? editingMentor.image : ''}
                      onChange={(e) => setEditingMentor({ ...editingMentor, image: e.target.value })}
                      placeholder="Paste image link URL..."
                      className="flex-1 min-w-[150px] px-3 py-1.5 rounded-xl border border-aroham-border bg-white text-xs focus:outline-none focus:ring-1 focus:ring-aroham-dark"
                    />
                  </div>
                </div>
              </div>

              {/* Name & University */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-aroham-dark uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingMentor.name}
                    onChange={(e) => setEditingMentor({ ...editingMentor, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-aroham-dark uppercase mb-1">University / Institution *</label>
                  <input
                    type="text"
                    required
                    value={editingMentor.university}
                    onChange={(e) => setEditingMentor({ ...editingMentor, university: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                  />
                </div>
              </div>

              {/* Major & Stream */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-aroham-dark uppercase mb-1">Major / Degree *</label>
                  <input
                    type="text"
                    required
                    value={editingMentor.major}
                    onChange={(e) => setEditingMentor({ ...editingMentor, major: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-aroham-dark uppercase mb-1">Discipline Stream</label>
                  <select
                    value={editingMentor.stream}
                    onChange={(e) => setEditingMentor({ ...editingMentor, stream: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                  >
                    {streamOptions.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-aroham-dark uppercase mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={editingMentor.location}
                    onChange={(e) => setEditingMentor({ ...editingMentor, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-aroham-dark uppercase mb-1">Mentorship Status</label>
                  <select
                    value={editingMentor.status}
                    onChange={(e) => setEditingMentor({ ...editingMentor, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                  >
                    {statusOptions.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-aroham-dark uppercase mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={editingMentor.email || ''}
                    onChange={(e) => setEditingMentor({ ...editingMentor, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-aroham-dark uppercase mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editingMentor.phone || ''}
                    onChange={(e) => setEditingMentor({ ...editingMentor, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-aroham-dark uppercase mb-1">Mentorship Overview & Focus *</label>
                <textarea
                  rows={3}
                  required
                  value={editingMentor.description}
                  onChange={(e) => setEditingMentor({ ...editingMentor, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                />
              </div>

              <div className="pt-3 border-t border-aroham-border flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMentorToDelete(editingMentor);
                  }}
                  className="px-3.5 py-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl flex items-center gap-1.5 transition-colors active:scale-95"
                >
                  <Trash2 size={13} />
                  <span>Remove Mentor</span>
                </button>

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setEditingMentor(null)}
                    className="px-4 py-2 border border-aroham-border rounded-xl text-aroham-body hover:bg-aroham-sage text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-aroham-dark hover:bg-aroham-forest text-white rounded-xl text-xs font-bold transition-all shadow"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-App Delete Confirmation Modal (100% reliable on mobile and desktop) */}
      {mentorToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-aroham-dark/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-aroham-border shadow-popup space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100">
              <Trash2 size={28} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-serif text-aroham-heading">
                Remove Mentor Profile?
              </h3>
              <p className="text-sm text-aroham-body leading-relaxed">
                Are you sure you want to remove <span className="font-bold text-aroham-dark">{mentorToDelete.name}</span> ({mentorToDelete.university})?
              </p>
              <p className="text-xs text-red-600 font-semibold bg-red-50 py-2 px-3 rounded-xl border border-red-100">
                ⚠️ This mentor will be removed immediately from the live website and UniMates directory.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMentorToDelete(null)}
                className="flex-1 py-3 border border-aroham-border rounded-xl text-xs font-bold text-aroham-body hover:bg-aroham-sage transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteMentor(mentorToDelete.id);
                  setMentorToDelete(null);
                  if (selectedMentorDetails && selectedMentorDetails.id === mentorToDelete.id) {
                    setSelectedMentorDetails(null);
                  }
                  if (editingMentor && editingMentor.id === mentorToDelete.id) {
                    setEditingMentor(null);
                  }
                }}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Trash2 size={14} />
                <span>Yes, Remove</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

