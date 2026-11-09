import { 
  INITIAL_MENTORS, 
  INITIAL_EVENTS, 
  INITIAL_MENTEES, 
  INITIAL_APPLICATIONS 
} from './initialAdminData';

const LOCAL_API_ENDPOINT = '/api/data';

/**
 * Smart merge two collections by ID, preserving additions and updates
 */
function mergeById(localItems = [], remoteItems = []) {
  const map = new Map();
  // Remote items first
  remoteItems.forEach(item => {
    if (item && item.id) map.set(item.id, item);
  });
  // Local items overwrite or add
  localItems.forEach(item => {
    if (item && item.id) {
      if (!map.has(item.id)) {
        // Brand new local addition
        map.set(item.id, item);
      } else {
        map.set(item.id, { ...map.get(item.id), ...item });
      }
    }
  });
  return Array.from(map.values());
}

/**
 * Fetch latest database with multi-layer fallback & smart bidirectional merge
 */
export async function fetchLiveDatabase() {
  let remoteData = null;

  // 1. Fetch from local LAN Vite API endpoint if available
  try {
    const res = await fetch(LOCAL_API_ENDPOINT, {
      signal: AbortSignal.timeout(1500),
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.mentors) && data.mentors.length > 0) {
        remoteData = data;
      }
    }
  } catch (e) {}

  // 2. Read cached data from local browser storage
  let localMentors = null;
  let localEvents = null;
  let localMentees = null;
  let localApps = null;

  try {
    const sm = localStorage.getItem('aroham_mentors');
    if (sm) localMentors = JSON.parse(sm);
    const se = localStorage.getItem('aroham_events');
    if (se) localEvents = JSON.parse(se);
    const sme = localStorage.getItem('aroham_mentees');
    if (sme) localMentees = JSON.parse(sme);
    const sa = localStorage.getItem('aroham_applications');
    if (sa) localApps = JSON.parse(sa);
  } catch (e) {}

  // 3. Merge local with remote (remote data updates local, but local additions are NEVER deleted)
  if (remoteData) {
    const mergedMentors = localMentors ? mergeById(localMentors, remoteData.mentors || []) : (remoteData.mentors || INITIAL_MENTORS);
    const mergedEvents = localEvents ? mergeById(localEvents, remoteData.events || []) : (remoteData.events || INITIAL_EVENTS);
    const mergedMentees = localMentees ? mergeById(localMentees, remoteData.mentees || []) : (remoteData.mentees || INITIAL_MENTEES);
    const mergedApps = localApps ? mergeById(localApps, remoteData.applications || []) : (remoteData.applications || INITIAL_APPLICATIONS);

    const mergedPayload = {
      mentors: mergedMentors,
      events: mergedEvents,
      mentees: mergedMentees,
      applications: mergedApps,
      lastModified: new Date().toISOString()
    };

    // Cache merged state locally
    try {
      localStorage.setItem('aroham_mentors', JSON.stringify(mergedMentors));
      localStorage.setItem('aroham_events', JSON.stringify(mergedEvents));
      localStorage.setItem('aroham_mentees', JSON.stringify(mergedMentees));
      localStorage.setItem('aroham_applications', JSON.stringify(mergedApps));
    } catch (e) {}

    return mergedPayload;
  }

  // Fallback to localStorage or initial seeds
  return {
    mentors: (localMentors && localMentors.length > 0) ? localMentors : INITIAL_MENTORS,
    events: (localEvents && localEvents.length > 0) ? localEvents : INITIAL_EVENTS,
    mentees: (localMentees && localMentees.length > 0) ? localMentees : INITIAL_MENTEES,
    applications: (localApps && localApps.length > 0) ? localApps : INITIAL_APPLICATIONS
  };
}

/**
 * Save data to local network database and browser localStorage with quota protection
 */
export async function saveLiveDatabase(payload) {
  const payloadWithMeta = {
    mentors: payload.mentors || INITIAL_MENTORS,
    events: payload.events || INITIAL_EVENTS,
    mentees: payload.mentees || INITIAL_MENTEES,
    applications: payload.applications || INITIAL_APPLICATIONS,
    lastModified: new Date().toISOString()
  };

  // 1. Immediately cache in localStorage with quota-safe protection
  try {
    localStorage.setItem('aroham_mentors', JSON.stringify(payloadWithMeta.mentors));
    localStorage.setItem('aroham_events', JSON.stringify(payloadWithMeta.events));
    localStorage.setItem('aroham_mentees', JSON.stringify(payloadWithMeta.mentees));
    localStorage.setItem('aroham_applications', JSON.stringify(payloadWithMeta.applications));
  } catch (e) {
    console.warn('LocalStorage quota limit reached, saving with image compression...', e);
    try {
      // If quota exceeded, strip heavy image data URLs so mentor details are NEVER lost
      const safeMentors = payloadWithMeta.mentors.map(m => {
        if (m.image && m.image.length > 50000) {
          return { ...m, image: '' };
        }
        return m;
      });
      localStorage.setItem('aroham_mentors', JSON.stringify(safeMentors));
    } catch (err) {}
  }

  // 2. Dispatch custom event to update all components in current window
  window.dispatchEvent(new Event('aroham_data_sync'));

  // 3. Save to local network database API (/api/data)
  try {
    fetch(LOCAL_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadWithMeta),
      signal: AbortSignal.timeout(2000)
    }).catch(() => {});
  } catch (err) {}
}

/**
 * Export current database as a compressed JSON sync string
 */
export function exportSyncString() {
  const data = {
    mentors: JSON.parse(localStorage.getItem('aroham_mentors') || '[]'),
    events: JSON.parse(localStorage.getItem('aroham_events') || '[]'),
    mentees: JSON.parse(localStorage.getItem('aroham_mentees') || '[]'),
    applications: JSON.parse(localStorage.getItem('aroham_applications') || '[]'),
    exportedAt: new Date().toISOString()
  };
  return JSON.stringify(data);
}

/**
 * Import a sync string from another device and immediately persist and broadcast
 */
export async function importSyncString(rawString) {
  try {
    const data = JSON.parse(rawString.trim());
    if (data && Array.isArray(data.mentors)) {
      await saveLiveDatabase(data);
      window.dispatchEvent(new Event('aroham_data_sync'));
      return { success: true, count: data.mentors.length };
    }
    return { success: false, error: 'Invalid data format' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
