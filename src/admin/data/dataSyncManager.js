import { 
  INITIAL_MENTORS, 
  INITIAL_EVENTS, 
  INITIAL_MENTEES, 
  INITIAL_APPLICATIONS 
} from './initialAdminData';

const SYNC_ENDPOINT = '/api/data';

/**
 * Fetch latest database from local/network API or fallback to localStorage
 */
export async function fetchLiveDatabase() {
  try {
    const res = await fetch(SYNC_ENDPOINT, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.mentors)) {
        // Cache to localStorage for instant startup and offline capability
        try {
          localStorage.setItem('aroham_mentors', JSON.stringify(data.mentors));
          if (Array.isArray(data.events)) {
            localStorage.setItem('aroham_events', JSON.stringify(data.events));
          }
          if (Array.isArray(data.mentees)) {
            localStorage.setItem('aroham_mentees', JSON.stringify(data.mentees));
          }
          if (Array.isArray(data.applications)) {
            localStorage.setItem('aroham_applications', JSON.stringify(data.applications));
          }
        } catch (e) {
          console.warn('LocalStorage cache warning:', e);
        }
        return data;
      }
    }
  } catch (err) {
    // Expected in standalone static hosting without backend
  }

  // Fallback to localStorage or initial seeds
  const savedMentors = localStorage.getItem('aroham_mentors');
  const savedEvents = localStorage.getItem('aroham_events');
  const savedMentees = localStorage.getItem('aroham_mentees');
  const savedApps = localStorage.getItem('aroham_applications');

  return {
    mentors: savedMentors ? JSON.parse(savedMentors) : INITIAL_MENTORS,
    events: savedEvents ? JSON.parse(savedEvents) : INITIAL_EVENTS,
    mentees: savedMentees ? JSON.parse(savedMentees) : INITIAL_MENTEES,
    applications: savedApps ? JSON.parse(savedApps) : INITIAL_APPLICATIONS
  };
}

/**
 * Save data to centralized database and sync to all connected devices & localStorage
 */
export async function saveLiveDatabase(payload) {
  // 1. Immediately cache in localStorage
  try {
    if (payload.mentors) localStorage.setItem('aroham_mentors', JSON.stringify(payload.mentors));
    if (payload.events) localStorage.setItem('aroham_events', JSON.stringify(payload.events));
    if (payload.mentees) localStorage.setItem('aroham_mentees', JSON.stringify(payload.mentees));
    if (payload.applications) localStorage.setItem('aroham_applications', JSON.stringify(payload.applications));
  } catch (e) {
    console.warn('LocalStorage save warning:', e);
  }

  // 2. Dispatch event to update all components in current window
  window.dispatchEvent(new Event('aroham_data_sync'));

  // 3. Post to centralized local/network database API
  try {
    await fetch(SYNC_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        lastModified: new Date().toISOString()
      })
    });
  } catch (err) {
    // Silent fallback
  }
}
