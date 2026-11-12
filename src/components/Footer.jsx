import React from 'react';
import ArohamLogo from './ArohamLogo';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Footer({ setActivePage, onOpenGetInvolved }) {
  const handleNav = (page) => {
    setActivePage(page);
  };

  return (
    <footer className="bg-aroham-dark border-t border-white/10 pt-16 pb-12 text-emerald-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/15">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <ArohamLogo size="footer" textDark={false} onClick={() => handleNav('home')} />
            <p className="text-sm text-emerald-100/85 leading-relaxed max-w-sm pt-2">
              Supporting women-led mentorship, alumni unity, and student growth across academic and career milestones.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-emerald-100/80 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-emerald-100/80 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('unimates')}
                  className="text-emerald-100/80 hover:text-white transition-colors"
                >
                  UniMates Mentorship
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('events')}
                  className="text-emerald-100/80 hover:text-white transition-colors"
                >
                  Events & Guidance
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-emerald-100/80 hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a
                  href="#admin"
                  className="text-emerald-100/80 hover:text-white transition-colors"
                >
                  Admin Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Connect With Us */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Connect With Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:arohamconnect@gmail.com"
                  className="flex items-center gap-2.5 text-emerald-100/85 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                  <span>arohamconnect@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/arohamfoundation?xtok=MWFnYWYyMDkwcHdpeQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-emerald-100/85 hover:text-white transition-colors group"
                >
                  <InstagramIcon size={16} className="text-emerald-300 group-hover:scale-110 transition-transform" />
                  <span>@arohamfoundation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-emerald-100/85">
                <MapPin className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>Higher Education & Mentorship Network</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-100/75 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <p>© 2026 Aroham Foundation.</p>
            <span className="hidden sm:inline text-white/25">•</span>
            <p>
              Powered by{' '}
              <a
                href="https://ziqx.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-amber-300 underline decoration-white/30 hover:decoration-amber-300 transition-colors"
              >
                Ziqx
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('about')} className="text-emerald-100/80 hover:text-white transition-colors">Sisterhood Charter</button>
            <button onClick={() => handleNav('contact')} className="text-emerald-100/80 hover:text-white transition-colors">Privacy & Guidelines</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
