import React, { useState } from 'react';
import { 
  Search, 
  GraduationCap, 
  UserCheck, 
  MapPin, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  UserPlus, 
  Sparkles,
  Edit3,
  X
} from 'lucide-react';

export default function ManageMentees({ mentees, mentors, onUpdateMenteeStatus, onDeleteMentee, onAddMentee, onUpdateMentee }) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingMentee, setEditingMentee] = useState(null);
  const [menteeToDelete, setMenteeToDelete] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    schoolOrCollege: '',
    targetMajor: '',
    targetCountry: 'India / GCC',
    assignedMentorId: ''
  });

  const filtered = mentees.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.targetMajor.toLowerCase().includes(search.toLowerCase()) ||
      m.schoolOrCollege.toLowerCase().includes(search.toLowerCase()) ||
      m.assignedMentorName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || m.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newStudent.name.trim() || !newStudent.targetMajor.trim()) return;

    const mentorObj = mentors.find(m => m.id === newStudent.assignedMentorId);

    const created = {
      id: `STU-${Math.floor(100 + Math.random() * 900)}`,
      name: newStudent.name.trim(),
      schoolOrCollege: newStudent.schoolOrCollege.trim() || 'Bolster Girls Campus Student',
      targetMajor: newStudent.targetMajor.trim(),
      assignedMentorId: mentorObj ? mentorObj.id : null,
      assignedMentorName: mentorObj ? mentorObj.name : 'Unassigned',
      status: mentorObj ? 'Active Match' : 'Pending Match',
      matchedDate: mentorObj ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'In Review',
      targetCountry: newStudent.targetCountry
    };

    onAddMentee(created);
    setIsAddOpen(false);
    setNewStudent({
      name: '',
      schoolOrCollege: '',
      targetMajor: '',
      targetCountry: 'India / GCC',
      assignedMentorId: ''
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-aroham-border shadow-soft">
        <div>
          <h2 className="text-2xl font-semibold font-serif text-aroham-heading">
            Manage Mentees
          </h2>
          <p className="text-xs text-aroham-body mt-0.5">
            Oversee 1-on-1 mentorship pairings, academic goal tracks, and application progress.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-5 py-2.5 bg-aroham-dark hover:bg-aroham-forest text-white rounded-xl text-xs font-semibold transition-all shadow hover:shadow-elevated flex items-center justify-center gap-2 transform hover:-translate-y-0.5 shrink-0"
        >
          <UserPlus size={16} />
          <span>Enroll New Mentee</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-aroham-border shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-aroham-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mentee name, school, major, or mentor..."
            className="w-full pl-11 pr-4 py-2.5 bg-[#F4F8F5] rounded-xl border border-aroham-border text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {['All', 'Active Match', 'Pending Match'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterStatus === st
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
        {filtered.map((mentee) => (
          <div
            key={mentee.id}
            className="bg-white rounded-2xl p-4 border border-aroham-border shadow-soft space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-aroham-gold font-semibold font-serif text-sm flex items-center justify-center border border-amber-200 shrink-0">
                  {mentee.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h4 className="font-semibold font-serif text-aroham-heading text-base leading-snug">
                    {mentee.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-aroham-sage text-aroham-muted border border-aroham-border">
                      {mentee.id}
                    </span>
                    <button
                      onClick={() => onUpdateMenteeStatus(mentee.id, mentee.status === 'Active Match' ? 'Pending Match' : 'Active Match')}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        mentee.status === 'Active Match'
                          ? 'bg-emerald-50 text-aroham-forest border-emerald-200'
                          : 'bg-amber-50 text-aroham-gold border-amber-200'
                      }`}
                    >
                      {mentee.status}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs pt-1 border-t border-aroham-border/60">
              <div className="text-aroham-muted">
                {mentee.schoolOrCollege}
              </div>
              <div className="font-semibold text-aroham-forest flex items-center gap-1.5">
                <GraduationCap size={14} />
                <span>{mentee.targetMajor}</span>
              </div>
              <div className="text-xs text-aroham-heading">
                Mentor: <span className="font-semibold">{mentee.assignedMentorName}</span>
              </div>
            </div>

            {/* Mobile Touch Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-aroham-border/60">
              <button
                type="button"
                onClick={() => setEditingMentee({ ...mentee })}
                className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-aroham-forest rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-emerald-200 active:scale-95"
              >
                <Edit3 size={13} />
                <span>Edit Profile</span>
              </button>

              <button
                type="button"
                onClick={() => setMenteeToDelete(mentee)}
                className="py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-red-200 active:scale-95"
              >
                <Trash2 size={13} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-8 border border-aroham-border text-center text-aroham-muted text-xs">
            No mentees found matching your search.
          </div>
        )}
      </div>

      {/* Desktop Mentees Table (hidden on mobile) */}
      <div className="hidden md:block bg-white rounded-3xl border border-aroham-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F4F8F5] text-xs font-semibold text-aroham-muted uppercase tracking-wider border-b border-aroham-border">
              <tr>
                <th className="py-4 px-6">Student Scholar</th>
                <th className="py-4 px-6">Target Specialization</th>
                <th className="py-4 px-6">Assigned Alumna Mentor</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-aroham-border/60">
              {filtered.map((mentee) => (
                <tr key={mentee.id} className="hover:bg-aroham-sage/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-aroham-gold font-semibold font-serif text-sm flex items-center justify-center border border-amber-200 shrink-0">
                        {mentee.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-aroham-heading flex items-center gap-2">
                          <span>{mentee.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-aroham-sage text-aroham-muted border border-aroham-border">
                            {mentee.id}
                          </span>
                        </div>
                        <div className="text-xs text-aroham-muted mt-0.5">
                          {mentee.schoolOrCollege}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="font-semibold text-aroham-forest flex items-center gap-1.5">
                      <GraduationCap size={15} />
                      <span>{mentee.targetMajor}</span>
                    </div>
                    <div className="text-xs text-aroham-muted flex items-center gap-1 mt-0.5">
                      <MapPin size={12} />
                      <span>Target: {mentee.targetCountry}</span>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    {mentee.assignedMentorId ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-semibold text-aroham-heading">{mentee.assignedMentorName}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-amber-600 font-semibold italic">Unassigned (Awaiting Match)</span>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    <button
                      onClick={() => onUpdateMenteeStatus(mentee.id, mentee.status === 'Active Match' ? 'Pending Match' : 'Active Match')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-transform active:scale-95 ${
                        mentee.status === 'Active Match'
                          ? 'bg-emerald-50 text-aroham-forest border-emerald-200 hover:bg-emerald-100'
                          : 'bg-amber-50 text-aroham-gold border-amber-200 hover:bg-amber-100'
                      }`}
                      title="Click to toggle status"
                    >
                      {mentee.status === 'Active Match' ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                      <span>{mentee.status}</span>
                    </button>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingMentee({ ...mentee })}
                        className="p-2 rounded-lg text-aroham-muted hover:text-aroham-forest hover:bg-emerald-50 transition-colors"
                        title="Edit Mentee Profile"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setMenteeToDelete(mentee)}
                        className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                        title="Delete Student Record"
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
                    No mentees found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enroll Mentee Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-aroham-dark/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-aroham-border shadow-popup space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-aroham-border">
              <h3 className="text-xl font-semibold font-serif text-aroham-heading">
                Enroll Student Mentee
              </h3>
              <button onClick={() => setIsAddOpen(false)} className="text-aroham-muted hover:text-aroham-dark">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-aroham-dark uppercase mb-1">Student Name *</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="e.g. Maryam K.T"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-aroham-dark uppercase mb-1">Current School / College</label>
                <input
                  type="text"
                  value={newStudent.schoolOrCollege}
                  onChange={(e) => setNewStudent({ ...newStudent, schoolOrCollege: e.target.value })}
                  placeholder="e.g. Bolster Girls Campus (Class 12)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-aroham-dark uppercase mb-1">Target Major / Specialization *</label>
                <input
                  type="text"
                  required
                  value={newStudent.targetMajor}
                  onChange={(e) => setNewStudent({ ...newStudent, targetMajor: e.target.value })}
                  placeholder="e.g. Biotechnology & Research"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-aroham-dark uppercase mb-1">Assign Alumna Mentor</label>
                <select
                  value={newStudent.assignedMentorId}
                  onChange={(e) => setNewStudent({ ...newStudent, assignedMentorId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                >
                  <option value="">-- Leave Unassigned for Review --</option>
                  {mentors.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.university} - {m.major})
                    </option>
                  ))}
                </select>
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
                  className="px-5 py-2 bg-aroham-dark hover:bg-aroham-forest text-white rounded-xl font-semibold"
                >
                  Enroll Mentee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Mentee Modal */}
      {editingMentee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-aroham-dark/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-lg w-full max-h-[92vh] overflow-y-auto border border-aroham-border shadow-popup space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-aroham-border">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-aroham-forest flex items-center justify-center">
                  <Edit3 size={16} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold font-serif text-aroham-heading">
                    Edit Mentee Profile
                  </h3>
                  <p className="text-xs text-aroham-muted font-mono">{editingMentee.id}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingMentee(null)}
                className="p-1 rounded-full text-aroham-muted hover:text-aroham-dark"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const mentorObj = mentors.find(m => m.id === editingMentee.assignedMentorId);
                const toSave = {
                  ...editingMentee,
                  assignedMentorId: mentorObj ? mentorObj.id : null,
                  assignedMentorName: mentorObj ? mentorObj.name : 'Unassigned',
                  matchedDate: mentorObj && (!editingMentee.matchedDate || editingMentee.matchedDate === 'In Review')
                    ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                    : editingMentee.matchedDate
                };
                if (onUpdateMentee) onUpdateMentee(toSave);
                setEditingMentee(null);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-semibold text-aroham-dark uppercase mb-1">Student Name *</label>
                <input
                  type="text"
                  required
                  value={editingMentee.name}
                  onChange={(e) => setEditingMentee({ ...editingMentee, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-aroham-dark uppercase mb-1">Current School / College *</label>
                <input
                  type="text"
                  required
                  value={editingMentee.schoolOrCollege}
                  onChange={(e) => setEditingMentee({ ...editingMentee, schoolOrCollege: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-aroham-dark uppercase mb-1">Target Major / Specialization *</label>
                <input
                  type="text"
                  required
                  value={editingMentee.targetMajor}
                  onChange={(e) => setEditingMentee({ ...editingMentee, targetMajor: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-aroham-dark uppercase mb-1">Target Country</label>
                  <input
                    type="text"
                    value={editingMentee.targetCountry || ''}
                    onChange={(e) => setEditingMentee({ ...editingMentee, targetCountry: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-aroham-dark uppercase mb-1">Mentorship Status</label>
                  <select
                    value={editingMentee.status}
                    onChange={(e) => setEditingMentee({ ...editingMentee, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                  >
                    <option value="Active Match">Active Match</option>
                    <option value="Pending Match">Pending Match</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-aroham-dark uppercase mb-1">Assigned Alumna Mentor</label>
                <select
                  value={editingMentee.assignedMentorId || ''}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const mentorObj = mentors.find(m => m.id === selectedId);
                    setEditingMentee({
                      ...editingMentee,
                      assignedMentorId: selectedId || null,
                      assignedMentorName: mentorObj ? mentorObj.name : 'Unassigned',
                      status: mentorObj ? 'Active Match' : editingMentee.status
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                >
                  <option value="">-- Unassigned (Awaiting Match) --</option>
                  {mentors.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.university} - {m.stream})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-aroham-border flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMenteeToDelete(editingMentee);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl flex items-center gap-1.5 transition-colors active:scale-95"
                >
                  <Trash2 size={13} />
                  <span>Remove Student</span>
                </button>

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setEditingMentee(null)}
                    className="px-4 py-2 border border-aroham-border rounded-xl text-aroham-body hover:bg-aroham-sage text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-aroham-dark hover:bg-aroham-forest text-white rounded-xl text-xs font-semibold transition-all shadow"
                  >
                    Save Mentee Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-App Delete Confirmation Modal */}
      {menteeToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-aroham-dark/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-aroham-border shadow-popup space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100">
              <Trash2 size={28} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold font-serif text-aroham-heading">
                Remove Student Record?
              </h3>
              <p className="text-sm text-aroham-body leading-relaxed">
                Are you sure you want to remove <span className="font-semibold text-aroham-dark">{menteeToDelete.name}</span> ({menteeToDelete.schoolOrCollege})?
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMenteeToDelete(null)}
                className="flex-1 py-3 border border-aroham-border rounded-xl text-xs font-semibold text-aroham-body hover:bg-aroham-sage transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteMentee(menteeToDelete.id);
                  setMenteeToDelete(null);
                  if (editingMentee && editingMentee.id === menteeToDelete.id) {
                    setEditingMentee(null);
                  }
                }}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95"
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

