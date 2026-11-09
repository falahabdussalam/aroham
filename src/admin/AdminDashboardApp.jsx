import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import DashboardOverview from './views/DashboardOverview';
import ManageMentors from './views/ManageMentors';
import ManageMentees from './views/ManageMentees';
import ManageEvents from './views/ManageEvents';
import ManageApplications from './views/ManageApplications';
import AddMentorModal from './views/AddMentorModal';
import { 
  INITIAL_MENTORS, 
  INITIAL_MENTEES, 
  INITIAL_EVENTS, 
  INITIAL_APPLICATIONS 
} from './data/initialAdminData';

export default function AdminDashboardApp({ onBackToSite }) {
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

  // Data collections with localStorage persistence
  const [mentors, setMentors] = useState(() => {
    const saved = localStorage.getItem('aroham_mentors');
    return saved ? JSON.parse(saved) : INITIAL_MENTORS;
  });

  const [mentees, setMentees] = useState(() => {
    const saved = localStorage.getItem('aroham_mentees');
    return saved ? JSON.parse(saved) : INITIAL_MENTEES;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('aroham_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('aroham_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  // Sync state to localStorage whenever collections update
  useEffect(() => {
    localStorage.setItem('aroham_mentors', JSON.stringify(mentors));
  }, [mentors]);

  useEffect(() => {
    localStorage.setItem('aroham_mentees', JSON.stringify(mentees));
  }, [mentees]);

  useEffect(() => {
    localStorage.setItem('aroham_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('aroham_applications', JSON.stringify(applications));
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
    setMentors([newMentor, ...mentors]);
  };

  const handleDeleteMentor = (mentorId) => {
    if (window.confirm('Are you sure you want to remove this mentor profile?')) {
      setMentors(mentors.filter(m => m.id !== mentorId));
    }
  };

  // Mentee Actions
  const handleAddMentee = (newMentee) => {
    setMentees([newMentee, ...mentees]);
  };

  const handleUpdateMenteeStatus = (menteeId, newStatus) => {
    setMentees(mentees.map(m => m.id === menteeId ? { ...m, status: newStatus } : m));
  };

  const handleDeleteMentee = (menteeId) => {
    if (window.confirm('Are you sure you want to remove this student record?')) {
      setMentees(mentees.filter(m => m.id !== menteeId));
    }
  };

  // Event Actions
  const handleAddEvent = (newEvent) => {
    setEvents([newEvent, ...events]);
  };

  const handleToggleEventStatus = (eventId) => {
    setEvents(events.map(e => e.id === eventId ? {
      ...e,
      status: e.status === 'Upcoming' ? 'Completed' : 'Upcoming'
    } : e));
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to remove this event?')) {
      setEvents(events.filter(e => e.id !== eventId));
    }
  };

  // Application Actions
  const handleUpdateApplicationStatus = (appId, newStatus) => {
    setApplications(applications.map(a => a.id === appId ? { ...a, status: newStatus } : a));
  };

  const handleDeleteApplication = (appId) => {
    if (window.confirm('Delete this application entry?')) {
      setApplications(applications.filter(a => a.id !== appId));
    }
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
        />
      )}

      {currentTab === 'mentees' && (
        <ManageMentees
          mentees={mentees}
          mentors={mentors}
          onAddMentee={handleAddMentee}
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
    </AdminLayout>
  );
}
