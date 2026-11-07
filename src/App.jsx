import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import UniMatesPage from './pages/UniMatesPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import RegisterModal from './components/RegisterModal';
import RequestMatchModal from './components/RequestMatchModal';
import GetInvolvedModal from './components/GetInvolvedModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState('Next Guidance Cohort & University Workshop');
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [getInvolvedModalOpen, setGetInvolvedModalOpen] = useState(false);

  // Smooth scroll handler to target section
  const scrollToSection = (id) => {
    setActiveSection(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.history.pushState) {
        window.history.pushState(null, '', '#home');
      }
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (window.history.pushState) {
        window.history.pushState(null, '', `#${id}`);
      }
    }
  };

  // Sync hash on initial page load or browser forward/back
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'unimates', 'events', 'contact'].includes(hash)) {
        setActiveSection(hash);
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const timer = setTimeout(handleHash, 150);
    window.addEventListener('hashchange', handleHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  // Scrollspy: automatically update active section in navbar during scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      const sectionIds = ['home', 'about', 'unimates', 'events', 'contact'];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenRegister = (eventTitle = "Next Guidance Cohort & University Workshop") => {
    setSelectedEventTitle(eventTitle);
    setRegisterModalOpen(true);
  };

  const handleOpenRequestMatch = (mentor = null) => {
    setSelectedMentor(mentor);
    setMatchModalOpen(true);
  };

  const handleOpenGetInvolved = () => {
    setGetInvolvedModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8F5] selection:bg-aroham-terracotta/20 selection:text-aroham-dark">
      {/* Navigation Bar with active scroll state */}
      <Navbar
        activePage={activeSection}
        setActivePage={scrollToSection}
        onOpenGetInvolved={handleOpenGetInvolved}
      />

      {/* Main Unified Single-Page Architecture */}
      <main className="flex-1">
        {/* Section 1: Home / Hero / Pillars */}
        <section id="home" className="scroll-mt-24 sm:scroll-mt-28">
          <HomePage
            setActivePage={scrollToSection}
            onOpenRegister={() => handleOpenRegister("Next Guidance Cohort & University Workshop")}
            onOpenGetInvolved={handleOpenGetInvolved}
          />
        </section>

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center">
          <div className="h-px bg-gradient-to-r from-transparent via-aroham-border to-transparent w-full" />
        </div>

        {/* Section 2: About Us & Leadership Committee */}
        <section id="about" className="scroll-mt-24 sm:scroll-mt-28">
          <AboutPage
            setActivePage={scrollToSection}
            onOpenGetInvolved={handleOpenGetInvolved}
          />
        </section>

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center">
          <div className="h-px bg-gradient-to-r from-transparent via-aroham-border to-transparent w-full" />
        </div>

        {/* Section 3: UniMates Mentorship Ecosystem */}
        <section id="unimates" className="scroll-mt-24 sm:scroll-mt-28">
          <UniMatesPage
            setActivePage={scrollToSection}
            onOpenRequestMatch={handleOpenRequestMatch}
            onOpenGetInvolved={handleOpenGetInvolved}
          />
        </section>

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center">
          <div className="h-px bg-gradient-to-r from-transparent via-aroham-border to-transparent w-full" />
        </div>

        {/* Section 4: Events, Upcoming Schedule & Chronological Timeline */}
        <section id="events" className="scroll-mt-24 sm:scroll-mt-28">
          <EventsPage
            setActivePage={scrollToSection}
            onOpenRegister={() => handleOpenRegister("Fall 2026 Global Academic Pathways")}
            onOpenGetInvolved={handleOpenGetInvolved}
          />
        </section>

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center">
          <div className="h-px bg-gradient-to-r from-transparent via-aroham-border to-transparent w-full" />
        </div>

        {/* Section 5: Contact & FAQs */}
        <section id="contact" className="scroll-mt-24 sm:scroll-mt-28">
          <ContactPage />
        </section>
      </main>

      {/* Footer */}
      <Footer
        setActivePage={scrollToSection}
        onOpenGetInvolved={handleOpenGetInvolved}
      />

      {/* Interactive Modals */}
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        eventTitle={selectedEventTitle}
      />

      <RequestMatchModal
        isOpen={matchModalOpen}
        onClose={() => setMatchModalOpen(false)}
        mentor={selectedMentor}
      />

      <GetInvolvedModal
        isOpen={getInvolvedModalOpen}
        onClose={() => setGetInvolvedModalOpen(false)}
      />
    </div>
  );
}
