import React, { useState, useEffect } from 'react';
import ArohamLogo from './ArohamLogo';
import { Menu, X } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenGetInvolved }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll position to apply curved glassmorphic floating header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background page scrolling while mobile menu popup is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? 'pt-2.5 sm:pt-3.5 px-3 sm:px-6 lg:px-8 bg-transparent pointer-events-none'
          : 'pt-0 px-0 bg-[#F4F8F5]/90 backdrop-blur-md border-b border-aroham-border/60 pointer-events-auto'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto ${
          isScrolled
            ? 'h-16 sm:h-[4.25rem] px-5 sm:px-8 rounded-2xl sm:rounded-full bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_12px_36px_-6px_rgba(13,43,34,0.1),0_4px_12px_-2px_rgba(13,43,34,0.05)] ring-1 ring-emerald-950/5'
            : 'h-20 sm:h-24 px-4 sm:px-6 lg:px-8 rounded-none bg-transparent border-transparent shadow-none ring-0'
        }`}
      >
        {/* Brand with hover popup transition & adaptive scroll scale */}
        <div
          className={`transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled ? 'scale-[0.92] sm:scale-95 origin-left' : 'scale-100 origin-left'
          } hover:scale-105 active:scale-95`}
        >
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
                    ? 'text-aroham-dark font-semibold'
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
            className={`px-5 py-2.5 bg-aroham-dark hover:bg-aroham-forest text-white text-sm font-semibold shadow-soft hover:shadow-elevated transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform hover:-translate-y-0.5 hover:scale-105 active:scale-95 active:translate-y-0 flex items-center gap-1.5 ${
              isScrolled ? 'rounded-full' : 'rounded-xl'
            }`}
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

      {/* Mobile Floating Popup Menu (overlays in front of all pages without pushing content) */}
      {mobileMenuOpen && (
        <>
          {/* Dimmed backdrop overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-aroham-dark/35 backdrop-blur-sm md:hidden animate-fadeIn pointer-events-auto"
            aria-hidden="true"
          />

          {/* Floating Popup Panel */}
          <div
            className={`md:hidden absolute top-full left-0 right-0 z-50 transition-all duration-300 pointer-events-auto ${
              isScrolled ? 'px-3 sm:px-6 pt-2' : 'px-4 pt-2'
            }`}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/80 shadow-popup px-4 pt-3 pb-5 space-y-1.5 animate-popup">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`group block w-full text-left px-2 py-2.5 text-sm bg-transparent transition-colors duration-200 ${
                      isActive
                        ? 'text-aroham-dark font-semibold'
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
          </div>
        </>
      )}
    </header>
  );
}
