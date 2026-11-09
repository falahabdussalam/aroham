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
  Eye 
} from 'lucide-react';

export default function ManageMentors({ mentors, onDeleteMentor, onOpenAddMentor }) {
  const [search, setSearch] = useState('');
  const [selectedStream, setSelectedStream] = useState('All');
  const [selectedMentorDetails, setSelectedMentorDetails] = useState(null);

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

      {/* Mentors Table */}
      <div className="bg-white rounded-3xl border border-aroham-border shadow-soft overflow-hidden">
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
                      <div className="w-10 h-10 rounded-xl bg-aroham-mint border border-aroham-border text-aroham-dark font-serif font-bold text-sm flex items-center justify-center shrink-0">
                        {mentor.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
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
                        onClick={() => setSelectedMentorDetails(mentor)}
                        className="p-2 rounded-lg text-aroham-muted hover:text-aroham-dark hover:bg-aroham-sage transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteMentor(mentor.id)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-aroham-dark/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-aroham-border shadow-popup space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-aroham-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-aroham-mint text-aroham-dark font-bold font-serif flex items-center justify-center text-base border border-aroham-border">
                  {selectedMentorDetails.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
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

            <div className="pt-2">
              <button
                onClick={() => setSelectedMentorDetails(null)}
                className="w-full py-2.5 bg-aroham-dark text-white rounded-xl text-xs font-bold hover:bg-aroham-forest"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
