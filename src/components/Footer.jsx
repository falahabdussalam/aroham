import React from 'react';
import ArohamLogo from './ArohamLogo';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Footer({ setActivePage, onOpenGetInvolved }) {
  const handleNav = (page) => {
    setActivePage(page);
  };

  return (
    <footer className="bg-[#EBF2EE] border-t border-aroham-border/80 pt-16 pb-12 text-aroham-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-aroham-border">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <ArohamLogo size="footer" onClick={() => handleNav('home')} />
            <p className="text-sm text-aroham-body leading-relaxed max-w-sm pt-2">
              Empowering women-led academic mentorship, lifelong alumni solidarity, and generational uplift across academic and career milestones.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-aroham-forest bg-aroham-mint/60 w-fit px-3 py-1.5 rounded-full border border-aroham-border">
              <span>🎓 Rooted in Alma Mater: Bolster Girls Campus</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-aroham-dark">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-aroham-dark transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-aroham-dark transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('unimates')}
                  className="hover:text-aroham-dark transition-colors"
                >
                  UniMates Mentorship
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('events')}
                  className="hover:text-aroham-dark transition-colors"
                >
                  Events & Guidance
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-aroham-dark transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Connect With Us */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-aroham-dark">
              Connect With Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:arohamconnect@gmail.com"
                  className="flex items-center gap-2.5 text-aroham-body hover:text-aroham-dark transition-colors group"
                >
                  <Mail className="w-4 h-4 text-aroham-forest group-hover:scale-110 transition-transform" />
                  <span>arohamconnect@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/arohamfoundation?xtok=MWFnYWYyMDkwcHdpeQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-aroham-body hover:text-aroham-dark transition-colors group"
                >
                  <InstagramIcon size={16} className="text-aroham-forest group-hover:scale-110 transition-transform" />
                  <span>@arohamfoundation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-aroham-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-aroham-body">
                <MapPin className="w-4 h-4 text-aroham-forest shrink-0 mt-0.5" />
                <span>Higher Education & Mentorship Network</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-aroham-muted gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <p>© 2026 Aroham Foundation. Built with pride by Bolster Girls Campus Alumnae.</p>
            <span className="hidden sm:inline text-aroham-border-dark">•</span>
            <p>
              Powered by{' '}
              <a
                href="https://ziqx.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-aroham-dark hover:text-aroham-terracotta underline decoration-aroham-muted/40 hover:decoration-aroham-terracotta transition-colors"
              >
                Ziqx
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('about')} className="hover:text-aroham-dark transition-colors">Sisterhood Charter</button>
            <button onClick={() => handleNav('contact')} className="hover:text-aroham-dark transition-colors">Privacy & Guidelines</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
