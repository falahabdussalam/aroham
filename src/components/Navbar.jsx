import React, { useState, useRef } from 'react';
import ArohamLogo from './ArohamLogo';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  ArrowRight,
  Sparkles, 
  BookOpen, 
  Calendar, 
  Users, 
  Mail, 
  Compass, 
  GraduationCap, 
  Award,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenGetInvolved }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const timeoutRef = useRef(null);

  const navLinks = [
    { 
      id: 'home', 
      label: 'Home',
      badge: '🌿 Ecosystem',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Home & Shared Mission',
      description: 'Bridging school corridors to global lecture halls through generational sisterhood.',
      icon: Compass,
      highlights: [
        { label: 'Upcoming Workshop', sub: 'Nov 16 University Guidance & Admissions' },
        { label: 'Two Pillars', sub: 'Aroham Foundation & UniMates Mentorship' },
        { label: 'Mentorship Growth', sub: 'STEM, Humanities, Law & Healthcare' }
      ]
    },
    { 
      id: 'about', 
      label: 'About Us',
      badge: '🏛 Legacy & Horizon',
      badgeColor: 'bg-amber-50 text-aroham-gold border-amber-200',
      title: 'About Aroham Foundation',
      description: 'A women-led alumni collective rooted in Bolster Girls Campus, nurturing generations.',
      icon: BookOpen,
      highlights: [
        { label: 'Genesis of Aroham', sub: 'From July 2025 Alumni Meet to HiLite Summit' },
        { label: 'Foundational Timeline', sub: 'Four milestones shaping our operational ethos' },
        { label: 'Our Committee', sub: 'President, General Secretary & Leadership' }
      ]
    },
    { 
      id: 'events', 
      label: 'Events',
      badge: '📅 Sessions & Summits',
      badgeColor: 'bg-red-50 text-aroham-terracotta border-red-200',
      title: 'Events & Guidance Archive',
      description: 'Global admissions webinars, university roundtables, and career counseling.',
      icon: Calendar,
      highlights: [
        { label: 'Fall 2026 Pathways', sub: 'Zoom interactive meet with mentors worldwide' },
        { label: 'Past Milestones', sub: 'GCC & UK guidance sessions, EduWay 2026' },
        { label: '160+ Scholars Reached', sub: 'Chronological timeline with oldest/newest sorting' }
      ]
    },
    { 
      id: 'unimates', 
      label: 'UniMates',
      badge: '🤝 1:1 Mentorship',
      badgeColor: 'bg-aroham-mint text-aroham-dark border-aroham-border',
      title: 'Aroham UniMates',
      description: 'Direct 1-on-1 mentorship connecting students with verified alumnae mentors.',
      icon: Users,
      highlights: [
        { label: 'Verified Directory', sub: 'Explore 6+ mentors (UK, GCC, and India)' },
        { label: 'Filter by Stream', sub: 'Aerospace, Business, Medicine, AI & Literature' },
        { label: '100% Match Rate', sub: 'Personalized pairings tailored to student aspirations' }
      ]
    },
    { 
      id: 'contact', 
      label: 'Contact Us',
      badge: '✉ Secretariat & Desk',
      badgeColor: 'bg-orange-50 text-aroham-terracotta border-orange-200',
      title: 'Get in Touch with Aroham',
      description: 'Connect with our mentorship council, alumnae liaison, or student desk.',
      icon: Mail,
      highlights: [
        { label: 'Direct Inbox', sub: 'arohamconnect@gmail.com (24–48h turnaround)' },
        { label: 'Instagram Pulse', sub: '@arohamfoundation daily recaps & stories' },
        { label: 'Inquiry Center & FAQs', sub: 'Direct messaging & frequently asked questions' }
      ]
    },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setHoveredNav(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseEnter = (id) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredNav(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredNav(null);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F4F8F5]/90 backdrop-blur-md border-b border-aroham-border/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <ArohamLogo onClick={() => handleNavClick('home')} />

        {/* Desktop Navigation Links with Interactive Popups */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            const isHovered = hoveredNav === link.id;

            return (
              <div 
                key={link.id}
                className="relative py-3"
                onMouseEnter={() => handleMouseEnter(link.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Trigger Button with Pop / Lift effect */}
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 relative flex items-center gap-1.5 transform active:scale-95 ${
                    isHovered
                      ? 'bg-white shadow-soft text-aroham-dark -translate-y-0.5 border border-aroham-border/80'
                      : isActive
                      ? 'text-aroham-dark font-bold bg-aroham-mint/60 border border-aroham-border/40'
                      : 'text-aroham-body hover:text-aroham-dark hover:bg-white/60 border border-transparent'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-aroham-dark" />
                  )}
                  {isHovered && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-aroham-gold animate-ping" />
                  )}
                </button>

                {/* Animated Popup Card */}
                {isHovered && (
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-popup border border-aroham-border/90 p-5 z-50 animate-popup pointer-events-auto"
                    onMouseEnter={() => handleMouseEnter(link.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Upward Pointer Arrow */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-aroham-border/80 transform rotate-45 rounded-tl-sm shadow-[-2px_-2px_4px_rgba(0,0,0,0.02)]" />

                    {/* Popup Card Header */}
                    <div className="relative z-10 flex items-start justify-between gap-3 pb-3 border-b border-aroham-border/70">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-aroham-mint flex items-center justify-center text-aroham-dark shrink-0 shadow-sm">
                          <link.icon size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-aroham-heading font-serif leading-tight">
                            {link.title}
                          </h4>
                          <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${link.badgeColor}`}>
                            {link.badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Summary paragraph */}
                    <p className="text-xs text-aroham-body leading-relaxed my-3">
                      {link.description}
                    </p>

                    {/* Highlighted items */}
                    <div className="space-y-1.5 my-3">
                      {link.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          onClick={() => handleNavClick(link.id)}
                          className="p-2 rounded-xl hover:bg-aroham-sage/40 transition-colors cursor-pointer flex items-center justify-between group"
                        >
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-aroham-heading group-hover:text-aroham-forest transition-colors">
                              {h.label}
                            </div>
                            <div className="text-[11px] text-aroham-muted truncate max-w-[260px]">
                              {h.sub}
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-aroham-muted opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      ))}
                    </div>

                    {/* Popup Footer Action */}
                    <div className="pt-3 border-t border-aroham-border/70 flex items-center justify-between text-xs font-bold">
                      <span className="text-aroham-muted text-[11px]">
                        Click to explore section
                      </span>
                      <button
                        onClick={() => handleNavClick(link.id)}
                        className="text-aroham-forest hover:text-aroham-dark flex items-center gap-1 group transition-colors"
                      >
                        <span>Open {link.label}</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenGetInvolved}
            className="px-5 py-2.5 bg-aroham-dark hover:bg-aroham-forest text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
          >
            <span>Get Involved</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-aroham-dark hover:bg-aroham-mint transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F4F8F5] border-b border-aroham-border px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                activePage === link.id
                  ? 'bg-aroham-mint text-aroham-dark font-semibold'
                  : 'text-aroham-body hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{link.label}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${link.badgeColor}`}>
                  {link.badge}
                </span>
              </div>
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetInvolved();
              }}
              className="w-full py-3 bg-aroham-dark text-white rounded-lg font-semibold text-center shadow"
            >
              Get Involved
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
