import React, { useState } from 'react';
import ArohamLogo from './ArohamLogo';
import { Menu, X } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenGetInvolved }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'events', label: 'Events' },
    { id: 'unimates', label: 'UniMates' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F4F8F5]/90 backdrop-blur-md border-b border-aroham-border/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand with hover popup transition */}
        <div className="transform transition-transform duration-300 hover:scale-105 active:scale-95">
          <ArohamLogo onClick={() => handleNavClick('home')} />
        </div>

        {/* Desktop Navigation Links with spring popup transition */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 p-1.5 rounded-2xl bg-aroham-sage/30 border border-aroham-border/40">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            const isHovered = hoveredLink === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform select-none ${
                  isActive
                    ? 'bg-aroham-dark text-white shadow-soft -translate-y-0.5 scale-[1.02]'
                    : isHovered
                    ? 'bg-white text-aroham-dark shadow-elevated -translate-y-1 scale-105 border border-aroham-border'
                    : 'text-aroham-body hover:text-aroham-dark bg-transparent border border-transparent'
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {link.label}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                  )}
                </span>

                {/* Subtle bottom pop indicator line */}
                {isHovered && !isActive && (
                  <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-aroham-gold rounded-full transform scale-x-100 transition-transform duration-300" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button with attractive popup hover transition */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenGetInvolved}
            className="px-5 py-2.5 bg-aroham-dark hover:bg-aroham-forest text-white text-sm font-semibold rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform hover:-translate-y-1 hover:scale-105 active:scale-95 active:translate-y-0 flex items-center gap-1.5"
          >
            <span>Get Involved</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-aroham-dark hover:bg-white hover:shadow-soft transition-all duration-200 transform hover:scale-105 active:scale-95"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F4F8F5] border-b border-aroham-border px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-[1.01] ${
                activePage === link.id
                  ? 'bg-aroham-dark text-white shadow-soft'
                  : 'text-aroham-body hover:bg-white hover:text-aroham-dark hover:shadow-sm'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetInvolved();
              }}
              className="w-full py-3 bg-aroham-terracotta hover:bg-aroham-terracotta-dark text-white rounded-xl font-semibold text-sm text-center shadow-soft hover:shadow-elevated transition-all duration-200 transform hover:-translate-y-0.5 active:scale-98"
            >
              Get Involved
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
