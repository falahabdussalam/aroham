import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import DashboardOverview from './views/DashboardOverview';
import ManageMentors from './views/ManageMentors';
import ManageMentees from './views/ManageMentees';
import ManageEvents from './views/ManageEvents';
import ManageApplications from './views/ManageApplications';
import AddMentorModal from './views/AddMentorModal';
import SyncModal from './components/SyncModal';
import { 
  INITIAL_MENTORS, 
  INITIAL_MENTEES, 
  INITIAL_EVENTS, 
  INITIAL_APPLICATIONS 
} from './data/initialAdminData';
import { saveLiveDatabase, markIdDeleted } from './data/dataSyncManager';

export default function AdminDashboardApp({ 
  onBackToSite,
  mentors: externalMentors,
  setMentors: externalSetMentors,
  mentees: externalMentees,
  setMentees: externalSetMentees,
  events: externalEvents,
  setEvents: externalSetEvents,
  applications: externalApplications,
  setApplications: externalSetApplications
}) {
  // Authentication state with localStorage persistence
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('aroham_admin_auth') === 'true';
  });

  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('aroham_admin_user');
    return saved ? JSON.parse(saved) : { name: 'Admin Council', email: 'admin@aroham.org' };
  });

  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isAddMentorOpen, setIsAddMentorOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  // Internal data collections fallback with localStorage persistence
  const [internalMentors, setInternalMentors] = useState(() => {
    const saved = localStorage.getItem('aroham_mentors');
    return saved ? JSON.parse(saved) : INITIAL_MENTORS;
  });

  const [internalMentees, setInternalMentees] = useState(() => {
    const saved = localStorage.getItem('aroham_mentees');
    return saved ? JSON.parse(saved) : INITIAL_MENTEES;
  });

  const [internalEvents, setInternalEvents] = useState(() => {
    const saved = localStorage.getItem('aroham_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [internalApplications, setInternalApplications] = useState(() => {
    const saved = localStorage.getItem('aroham_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const mentors = externalMentors !== undefined ? externalMentors : internalMentors;
  const setMentors = externalSetMentors || setInternalMentors;

  const mentees = externalMentees !== undefined ? externalMentees : internalMentees;
  const setMentees = externalSetMentees || setInternalMentees;

  const events = externalEvents !== undefined ? externalEvents : internalEvents;
  const setEvents = externalSetEvents || setInternalEvents;

  const applications = externalApplications !== undefined ? externalApplications : internalApplications;
  const setApplications = externalSetApplications || setInternalApplications;

  // Sync state to localStorage and broadcast sync event
  useEffect(() => {
    localStorage.setItem('aroham_mentors', JSON.stringify(mentors));
    window.dispatchEvent(new Event('aroham_data_sync'));
  }, [mentors]);

  useEffect(() => {
    localStorage.setItem('aroham_mentees', JSON.stringify(mentees));
    window.dispatchEvent(new Event('aroham_data_sync'));
  }, [mentees]);

  useEffect(() => {
    localStorage.setItem('aroham_events', JSON.stringify(events));
    window.dispatchEvent(new Event('aroham_data_sync'));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('aroham_applications', JSON.stringify(applications));
    window.dispatchEvent(new Event('aroham_data_sync'));
  }, [applications]);

  // Auth Handlers
  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setAdminUser(user);
    localStorage.setItem('aroham_admin_auth', 'true');
    localStorage.setItem('aroham_admin_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('aroham_admin_auth');
    localStorage.removeItem('aroham_admin_user');
  };

  // Mentor Actions
  const handleAddMentor = (newMentor) => {
    const updated = [newMentor, ...mentors];
    setMentors(updated);
    saveLiveDatabase({ mentors: updated, events, mentees, applications });
  };

  const handleUpdateMentor = (updatedMentor) => {
    const updated = mentors.map(m => m.id === updatedMentor.id ? updatedMentor : m);
    setMentors(updated);
    saveLiveDatabase({ mentors: updated, events, mentees, applications });
  };

  const handleDeleteMentor = (mentorId) => {
    markIdDeleted(mentorId);
    const updated = mentors.filter(m => String(m.id) !== String(mentorId));
    setMentors(updated);
    saveLiveDatabase({ mentors: updated, events, mentees, applications });
  };

  // Mentee Actions
  const handleAddMentee = (newMentee) => {
    const updated = [newMentee, ...mentees];
    setMentees(updated);
    saveLiveDatabase({ mentors, events, mentees: updated, applications });
  };

  const handleUpdateMentee = (updatedMentee) => {
    const updated = mentees.map(m => m.id === updatedMentee.id ? updatedMentee : m);
    setMentees(updated);
    saveLiveDatabase({ mentors, events, mentees: updated, applications });
  };

  const handleUpdateMenteeStatus = (menteeId, newStatus) => {
    const updated = mentees.map(m => m.id === menteeId ? { ...m, status: newStatus } : m);
    setMentees(updated);
    saveLiveDatabase({ mentors, events, mentees: updated, applications });
  };

  const handleDeleteMentee = (menteeId) => {
    markIdDeleted(menteeId);
    const updated = mentees.filter(m => String(m.id) !== String(menteeId));
    setMentees(updated);
    saveLiveDatabase({ mentors, events, mentees: updated, applications });
  };

  // Event Actions
  const handleAddEvent = (newEvent) => {
    const updated = [newEvent, ...events];
    setEvents(updated);
    saveLiveDatabase({ mentors, events: updated, mentees, applications });
  };

  const handleToggleEventStatus = (eventId) => {
    const updated = events.map(e => e.id === eventId ? {
      ...e,
      status: e.status === 'Upcoming' ? 'Completed' : 'Upcoming'
    } : e);
    setEvents(updated);
    saveLiveDatabase({ mentors, events: updated, mentees, applications });
  };

  const handleDeleteEvent = (eventId) => {
    markIdDeleted(eventId);
    const updated = events.filter(e => String(e.id) !== String(eventId));
    setEvents(updated);
    saveLiveDatabase({ mentors, events: updated, mentees, applications });
  };

  // Application Actions
  const handleUpdateApplicationStatus = (appId, newStatus) => {
    const updated = applications.map(a => a.id === appId ? { ...a, status: newStatus } : a);
    setApplications(updated);
    saveLiveDatabase({ mentors, events, mentees, applications: updated });
  };

  const handleDeleteApplication = (appId) => {
    markIdDeleted(appId);
    const updated = applications.filter(a => String(a.id) !== String(appId));
    setApplications(updated);
    saveLiveDatabase({ mentors, events, mentees, applications: updated });
  };

  // If not logged in, display the Admin Login page
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLogin={handleLogin}
        onBackToSite={onBackToSite}
      />
    );
  }

  return (
    <AdminLayout
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      adminUser={adminUser}
      onLogout={handleLogout}
      onBackToSite={onBackToSite}
      onOpenAddMentor={() => setIsAddMentorOpen(true)}
      onOpenSyncModal={() => setIsSyncModalOpen(true)}
    >
      {currentTab === 'dashboard' && (
        <DashboardOverview
          mentors={mentors}
          mentees={mentees}
          events={events}
          applications={applications}
          onNavigateTab={setCurrentTab}
          onOpenAddMentor={() => setIsAddMentorOpen(true)}
        />
      )}

      {currentTab === 'mentors' && (
        <ManageMentors
          mentors={mentors}
          onDeleteMentor={handleDeleteMentor}
          onOpenAddMentor={() => setIsAddMentorOpen(true)}
          onUpdateMentor={handleUpdateMentor}
          onOpenSyncModal={() => setIsSyncModalOpen(true)}
        />
      )}

      {currentTab === 'mentees' && (
        <ManageMentees
          mentees={mentees}
          mentors={mentors}
          onAddMentee={handleAddMentee}
          onUpdateMentee={handleUpdateMentee}
          onUpdateMenteeStatus={handleUpdateMenteeStatus}
          onDeleteMentee={handleDeleteMentee}
        />
      )}

      {currentTab === 'events' && (
        <ManageEvents
          events={events}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
          onToggleEventStatus={handleToggleEventStatus}
        />
      )}

      {currentTab === 'applications' && (
        <ManageApplications
          applications={applications}
          onUpdateApplicationStatus={handleUpdateApplicationStatus}
          onDeleteApplication={handleDeleteApplication}
        />
      )}

      {/* Global Add Mentor Modal accessible from any view */}
      <AddMentorModal
        isOpen={isAddMentorOpen}
        onClose={() => setIsAddMentorOpen(false)}
        onAddMentor={handleAddMentor}
      />

      {/* Cross-Device Cloud Sync Modal */}
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onDataUpdated={() => {
          fetchLiveDatabase().then(live => {
            if (live) {
              if (live.mentors) setMentors(live.mentors);
              if (live.events) setEvents(live.events);
              if (live.mentees) setMentees(live.mentees);
              if (live.applications) setApplications(live.applications);
            }
          });
        }}
      />
    </AdminLayout>
  );
}

