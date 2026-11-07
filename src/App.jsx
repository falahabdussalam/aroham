import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import UniMatesPage from './pages/UniMatesPage';
import ContactPage from './pages/ContactPage';
import RegisterModal from './components/RegisterModal';
import RequestMatchModal from './components/RequestMatchModal';
import GetInvolvedModal from './components/GetInvolvedModal';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState('Next Guidance Cohort & University Workshop');
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [getInvolvedModalOpen, setGetInvolvedModalOpen] = useState(false);

  // Sync hash in URL with active page
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'events', 'unimates', 'contact'].includes(hash)) {
        setActivePage(hash);
        window.scrollTo(0, 0);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo(0, 0);
  };

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
    <div className="min-h-screen flex flex-col bg-[#F4F8F5]">
      {/* Navigation Bar */}
      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
        onOpenGetInvolved={handleOpenGetInvolved}
      />

      {/* Main Dynamic View with Slow Fade Transition */}
      <main className="flex-1">
        <div key={activePage} className="animate-page-fade">
          {activePage === 'home' && (
            <HomePage
              setActivePage={handlePageChange}
              onOpenRegister={() => handleOpenRegister("Next Guidance Cohort & University Workshop")}
              onOpenGetInvolved={handleOpenGetInvolved}
            />
          )}
          {activePage === 'about' && (
            <AboutPage
              setActivePage={handlePageChange}
              onOpenGetInvolved={handleOpenGetInvolved}
            />
          )}
          {activePage === 'events' && (
            <EventsPage
              setActivePage={handlePageChange}
              onOpenRegister={() => handleOpenRegister("Fall 2026 Global Academic Pathways")}
              onOpenGetInvolved={handleOpenGetInvolved}
            />
          )}
          {activePage === 'unimates' && (
            <UniMatesPage
              onOpenRequestMatch={handleOpenRequestMatch}
              onOpenGetInvolved={handleOpenGetInvolved}
            />
          )}
          {activePage === 'contact' && (
            <ContactPage />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer
        setActivePage={handlePageChange}
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

