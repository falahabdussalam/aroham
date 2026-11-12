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
import BackgroundIllustrations from './components/BackgroundIllustrations';
import ScrollSectionEffects from './components/ScrollSectionEffects';
import AdminDashboardApp from './admin/AdminDashboardApp';
import { 
  INITIAL_MENTORS, 
  INITIAL_EVENTS, 
  INITIAL_MENTEES, 
  INITIAL_APPLICATIONS 
} from './admin/data/initialAdminData';
import { fetchLiveDatabase, saveLiveDatabase } from './admin/data/dataSyncManager';

const VALID_PAGES = ['home', 'about', 'unimates', 'events', 'contact'];

const getPageFromHash = () => {
  const hash = window.location.hash.replace('#', '');
  return VALID_PAGES.includes(hash) ? hash : 'home';
};

export default function App() {
  const [activePage, setActivePage] = useState(getPageFromHash);
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.hash.startsWith('#admin');
  });

  // Centralized collections with localStorage persistence
  const [mentors, setMentors] = useState(() => {
    const saved = localStorage.getItem('aroham_mentors');
    return saved ? JSON.parse(saved) : INITIAL_MENTORS;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('aroham_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [mentees, setMentees] = useState(() => {
    const saved = localStorage.getItem('aroham_mentees');
    return saved ? JSON.parse(saved) : INITIAL_MENTEES;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('aroham_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  // Real-time bidirectional cross-device synchronization
  useEffect(() => {
    let isMounted = true;

    const syncLive = async () => {
      try {
        const live = await fetchLiveDatabase();
        if (isMounted && live) {
          if (Array.isArray(live.mentors)) {
            setMentors(prev => JSON.stringify(prev) !== JSON.stringify(live.mentors) ? live.mentors : prev);
          }
          if (Array.isArray(live.events)) {
            setEvents(prev => JSON.stringify(prev) !== JSON.stringify(live.events) ? live.events : prev);
          }
          if (Array.isArray(live.mentees)) {
            setMentees(prev => JSON.stringify(prev) !== JSON.stringify(live.mentees) ? live.mentees : prev);
          }
          if (Array.isArray(live.applications)) {
            setApplications(prev => JSON.stringify(prev) !== JSON.stringify(live.applications) ? live.applications : prev);
          }
        }
      } catch (err) {}
    };

    // 1. Initial live fetch on mount
    syncLive();

    // 2. Poll every 2.5 seconds so changes on desktop appear on mobile, and vice-versa
    const pollTimer = setInterval(syncLive, 2500);

    // 3. Immediately sync on tab focus, screen unlock, or visibility change
    const handleFocus = () => syncLive();
    window.addEventListener('focus', handleFocus);
    window.addEventListener('visibilitychange', handleFocus);
    window.addEventListener('storage', handleFocus);
    window.addEventListener('aroham_data_sync', handleFocus);

    return () => {
      isMounted = false;
      clearInterval(pollTimer);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('visibilitychange', handleFocus);
      window.removeEventListener('storage', handleFocus);
      window.removeEventListener('aroham_data_sync', handleFocus);
    };
  }, []);

  // Sync state changes to both localStorage and centralized network database
  const handleUpdateMentors = (newMentors) => {
    setMentors(newMentors);
    saveLiveDatabase({ mentors: newMentors, events, mentees, applications });
  };

  const handleUpdateEvents = (newEvents) => {
    setEvents(newEvents);
    saveLiveDatabase({ mentors, events: newEvents, mentees, applications });
  };

  const handleUpdateMentees = (newMentees) => {
    setMentees(newMentees);
    saveLiveDatabase({ mentors, events, mentees: newMentees, applications });
  };

  const handleUpdateApplications = (newApps) => {
    setApplications(newApps);
    saveLiveDatabase({ mentors, events, mentees, applications: newApps });
  };

  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState('Next Guidance Cohort & University Workshop');
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [getInvolvedModalOpen, setGetInvolvedModalOpen] = useState(false);

  // Navigate to a standalone page and reset scroll to the top
  const navigateToPage = (page) => {
    const targetPage = VALID_PAGES.includes(page) ? page : 'home';
    if (isAdminView) {
      setIsAdminView(false);
    }
    setActivePage(targetPage);

    if (window.history.pushState) {
      if (targetPage === 'home') {
        if (window.location.hash) {
          window.history.pushState(null, '', window.location.pathname + window.location.search);
        }
      } else {
        const targetHash = `#${targetPage}`;
        if (window.location.hash !== targetHash) {
          window.history.pushState(null, '', targetHash);
        }
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Sync active page with browser navigation (forward/back, hash changes & #admin)
  useEffect(() => {
    if (window.location.hash === '#home' && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const handleRouteChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('admin')) {
        setIsAdminView(true);
        window.scrollTo(0, 0);
        return;
      }
      setIsAdminView(false);
      if (hash === 'home' && window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      setActivePage(VALID_PAGES.includes(hash) ? hash : 'home');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
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

  // Handler for mentee applications from website (UniMates Request Match Modal)
  const handleApplyMentee = (applicationData, menteeData) => {
    const updatedApps = [applicationData, ...applications];
    setApplications(updatedApps);

    let updatedMentees = mentees;
    if (menteeData) {
      updatedMentees = [menteeData, ...mentees];
      setMentees(updatedMentees);
    }

    saveLiveDatabase({
      mentors,
      events,
      mentees: updatedMentees,
      applications: updatedApps
    });
  };

  // Handler for network applications from Join Aroham Network / Get Involved form
  const handleAddApplication = (applicationData) => {
    const updatedApps = [applicationData, ...applications];
    setApplications(updatedApps);

    let updatedMentees = mentees;
    if (applicationData.role === 'Student Aspirant') {
      const studentId = `STU-${Math.floor(100 + Math.random() * 900)}`;
      const menteeItem = {
        id: studentId,
        name: applicationData.name,
        schoolOrCollege: applicationData.campusBatch !== 'N/A' ? applicationData.campusBatch : 'Student Applicant',
        targetMajor: 'General Guidance',
        assignedMentorId: null,
        assignedMentorName: 'Unassigned',
        status: 'Pending Match',
        matchedDate: 'In Review',
        targetCountry: 'Global'
      };
      updatedMentees = [menteeItem, ...mentees];
      setMentees(updatedMentees);
    }

    saveLiveDatabase({
      mentors,
      events,
      mentees: updatedMentees,
      applications: updatedApps
    });
  };

  // If viewing admin route, render the complete Admin Dashboard Application
  if (isAdminView) {
    return (
      <AdminDashboardApp
        onBackToSite={() => {
          navigateToPage('home');
        }}
        mentors={mentors}
        setMentors={handleUpdateMentors}
        events={events}
        setEvents={handleUpdateEvents}
        mentees={mentees}
        setMentees={handleUpdateMentees}
        applications={applications}
        setApplications={handleUpdateApplications}
      />
    );
  }

  const renderActivePage = () => {
    switch (activePage) {
      case 'about':
        return (
          <AboutPage
            setActivePage={navigateToPage}
            onOpenGetInvolved={handleOpenGetInvolved}
          />
        );
      case 'unimates':
        return (
          <UniMatesPage
            setActivePage={navigateToPage}
            onOpenRequestMatch={handleOpenRequestMatch}
            onOpenGetInvolved={handleOpenGetInvolved}
            mentors={mentors}
          />
        );
      case 'events':
        return (
          <EventsPage
            setActivePage={navigateToPage}
            onOpenRegister={() => handleOpenRegister("Next Guidance Cohort & University Workshop")}
            onOpenGetInvolved={handleOpenGetInvolved}
            events={events}
          />
        );
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return (
          <HomePage
            setActivePage={navigateToPage}
            onOpenRegister={() => handleOpenRegister("Next Guidance Cohort & University Workshop")}
            onOpenGetInvolved={handleOpenGetInvolved}
            mentorsCount={mentors.length}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8F5] selection:bg-aroham-terracotta/20 selection:text-aroham-dark">
      {/* Navigation Bar */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateToPage}
        onOpenGetInvolved={handleOpenGetInvolved}
      />

      {/* Active Page View */}
      <main className="flex-1 relative overflow-x-clip">
        <BackgroundIllustrations variant={activePage} />
        <div id="page-scroll-root" key={activePage} className="animate-page-fade relative z-10">
          {renderActivePage()}
        </div>
        <ScrollSectionEffects activePage={activePage} />
      </main>

      {/* Footer */}
      <Footer
        setActivePage={navigateToPage}
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
        onApplyMentee={handleApplyMentee}
      />

      <GetInvolvedModal
        isOpen={getInvolvedModalOpen}
        onClose={() => setGetInvolvedModalOpen(false)}
        onSubmitApplication={handleAddApplication}
      />
    </div>
  );
}
