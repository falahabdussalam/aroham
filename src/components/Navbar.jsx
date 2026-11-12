import React, { useState } from 'react';
import ArohamLogo from './ArohamLogo';
import { Menu, X } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenGetInvolved }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'unimates', label: 'UniMates' },
    { id: 'events', label: 'Events' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    setActivePage(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F4F8F5]/90 backdrop-blur-md border-b border-aroham-border/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand with hover popup transition */}
        <div className="transform transition-transform duration-300 hover:scale-105 active:scale-95">
          <ArohamLogo size="header" onClick={() => handleNavClick('home')} />
        </div>

        {/* Desktop Navigation Links with smooth underline transition */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`group relative py-2 text-sm no-underline bg-transparent transition-colors duration-300 select-none ${
                  isActive
                    ? 'text-aroham-dark font-bold'
                    : 'text-aroham-body hover:text-aroham-dark font-semibold'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className={`absolute left-0 right-0 bottom-0 h-[2.5px] rounded-full bg-aroham-dark origin-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Action Button with attractive popup hover transition */}
        <div className="hidden md:flex items-center gap-3">
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
        <div className="md:hidden bg-[#F4F8F5] border-b border-aroham-border px-4 pt-3 pb-6 space-y-1.5 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`group block w-full text-left px-2 py-2.5 text-sm bg-transparent transition-colors duration-200 ${
                  isActive
                    ? 'text-aroham-dark font-bold'
                    : 'text-aroham-body hover:text-aroham-dark font-semibold'
                }`}
              >
                <span className="relative inline-block pb-1">
                  {link.label}
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-[2.5px] rounded-full bg-aroham-dark origin-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </span>
              </button>
            );
          })}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetInvolved();
              }}
              className="w-full py-3 bg-aroham-terracotta hover:bg-aroham-terracotta-dark text-white rounded-xl font-semibold text-sm text-center shadow-soft hover:shadow-elevated transition-all duration-200"
            >
              Get Involved
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
