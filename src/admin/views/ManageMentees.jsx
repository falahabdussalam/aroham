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
  X
} from 'lucide-react';

export default function ManageMentees({ mentees, mentors, onUpdateMenteeStatus, onDeleteMentee, onAddMentee }) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isAddOpen, setIsAddOpen] = useState(false);
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
          <h2 className="text-2xl font-bold font-serif text-aroham-heading">
            Manage Mentees
          </h2>
          <p className="text-xs text-aroham-body mt-0.5">
            Oversee 1-on-1 mentorship pairings, academic goal tracks, and application progress.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-5 py-2.5 bg-aroham-dark hover:bg-aroham-forest text-white rounded-xl text-xs font-bold transition-all shadow hover:shadow-elevated flex items-center justify-center gap-2 transform hover:-translate-y-0.5 shrink-0"
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

      {/* Mentees Table */}
      <div className="bg-white rounded-3xl border border-aroham-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F4F8F5] text-xs font-bold text-aroham-muted uppercase tracking-wider border-b border-aroham-border">
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
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-aroham-gold font-bold font-serif text-sm flex items-center justify-center border border-amber-200 shrink-0">
                        {mentee.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-aroham-heading flex items-center gap-2">
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
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-transform active:scale-95 ${
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
                    <button
                      onClick={() => onDeleteMentee(mentee.id)}
                      className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                      title="Delete Student Record"
                    >
                      <Trash2 size={16} />
                    </button>
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
              <h3 className="text-xl font-bold font-serif text-aroham-heading">
                Enroll Student Mentee
              </h3>
              <button onClick={() => setIsAddOpen(false)} className="text-aroham-muted hover:text-aroham-dark">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-aroham-dark uppercase mb-1">Student Name *</label>
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
                <label className="block font-bold text-aroham-dark uppercase mb-1">Current School / College</label>
                <input
                  type="text"
                  value={newStudent.schoolOrCollege}
                  onChange={(e) => setNewStudent({ ...newStudent, schoolOrCollege: e.target.value })}
                  placeholder="e.g. Bolster Girls Campus (Class 12)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-aroham-border bg-[#F4F8F5] text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20"
                />
              </div>

              <div>
                <label className="block font-bold text-aroham-dark uppercase mb-1">Target Major / Specialization *</label>
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
                <label className="block font-bold text-aroham-dark uppercase mb-1">Assign Alumna Mentor</label>
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
                  className="px-5 py-2 bg-aroham-dark hover:bg-aroham-forest text-white rounded-xl font-bold"
                >
                  Enroll Mentee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
