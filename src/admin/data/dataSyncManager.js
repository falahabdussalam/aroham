import { 
  INITIAL_MENTORS, 
  INITIAL_EVENTS, 
  INITIAL_MENTEES, 
  INITIAL_APPLICATIONS 
} from './initialAdminData';

const LOCAL_API_ENDPOINT = '/api/data';
const CLOUD_API_BASE = 'https://crudcrud.com/api/d90d7c9b04fc4e3ea8dbbb50f9c3c46f/aroham';
const CLOUD_DOC_ID = '6af192c42c743903e8e0f2b9';

/**
 * Fetch from cloud database with strict 2.5s timeout to prevent UI freezes
 */
async function fetchCloudDatabase() {
  try {
    const res = await fetch(CLOUD_API_BASE, {
      signal: AbortSignal.timeout(2500),
      cache: 'no-store'
    });
    if (res.ok) {
      const list = await res.json();
      if (Array.isArray(list) && list.length > 0) {
        const item = list[0];
        if (item && Array.isArray(item.mentors)) {
          return item;
        }
      }
    }
  } catch (err) {
    // Network / timeout fallback
  }
  return null;
}

/**
 * Push to cloud database
 */
async function pushCloudDatabase(payload) {
  try {
    // Try updating existing document
    const res = await fetch(`${CLOUD_API_BASE}/${CLOUD_DOC_ID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000)
    });
    if (!res.ok) {
      // If doc expired or missing, create new document
      await fetch(CLOUD_API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(3000)
      });
    }
  } catch (err) {}
}

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

  // 1. Fetch from cloud database
  try {
    remoteData = await fetchCloudDatabase();
  } catch (e) {}

  // 2. Fetch from local LAN Vite API if cloud was unreachable
  if (!remoteData) {
    try {
      const res = await fetch(LOCAL_API_ENDPOINT, {
        signal: AbortSignal.timeout(1500),
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.mentors)) {
          remoteData = data;
        }
      }
    } catch (e) {}
  }

  // 3. Read cached data from local browser storage
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

  // 4. Merge local with remote
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

    // If local device had new records (e.g. mentor added on phone), push merged state to cloud!
    const localHadNew = localMentors && localMentors.some(lm => !remoteData.mentors?.some(rm => rm.id === lm.id));
    if (localHadNew) {
      pushCloudDatabase(mergedPayload);
    }

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
    mentors: localMentors || INITIAL_MENTORS,
    events: localEvents || INITIAL_EVENTS,
    mentees: localMentees || INITIAL_MENTEES,
    applications: localApps || INITIAL_APPLICATIONS
  };
}

/**
 * Save data to cloud database, local network database, and browser localStorage
 */
export async function saveLiveDatabase(payload) {
  const payloadWithMeta = {
    mentors: payload.mentors || INITIAL_MENTORS,
    events: payload.events || INITIAL_EVENTS,
    mentees: payload.mentees || INITIAL_MENTEES,
    applications: payload.applications || INITIAL_APPLICATIONS,
    lastModified: new Date().toISOString()
  };

  // 1. Immediately cache in localStorage
  try {
    localStorage.setItem('aroham_mentors', JSON.stringify(payloadWithMeta.mentors));
    localStorage.setItem('aroham_events', JSON.stringify(payloadWithMeta.events));
    localStorage.setItem('aroham_mentees', JSON.stringify(payloadWithMeta.mentees));
    localStorage.setItem('aroham_applications', JSON.stringify(payloadWithMeta.applications));
  } catch (e) {}

  // 2. Dispatch custom event to update all components in current window
  window.dispatchEvent(new Event('aroham_data_sync'));

  // 3. Broadcast to cloud database asynchronously
  pushCloudDatabase(payloadWithMeta);

  // 4. Save to local network database API (/api/data)
  try {
    fetch(LOCAL_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadWithMeta),
      signal: AbortSignal.timeout(1500)
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
