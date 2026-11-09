import { 
  INITIAL_MENTORS, 
  INITIAL_EVENTS, 
  INITIAL_MENTEES, 
  INITIAL_APPLICATIONS 
} from './initialAdminData';

const LOCAL_API_ENDPOINT = '/api/data';
export const CLOUD_SYNC_TOPIC = 'aroham_cloud_live_sync_v1_9a2f';
export const CLOUD_SYNC_URL = `https://ntfy.sh/${CLOUD_SYNC_TOPIC}`;

/**
 * Helper to fetch the latest database from the cloud relay (ntfy.sh)
 */
async function fetchCloudDatabase() {
  try {
    const res = await fetch(`${CLOUD_SYNC_URL}/json?poll=1&since=all`, { cache: 'no-store' });
    if (!res.ok) return null;
    const text = await res.text();
    const lines = text.trim().split('\n').filter(Boolean);
    
    // Parse from newest to oldest
    for (let i = lines.length - 1; i >= 0; i--) {
      try {
        const entry = JSON.parse(lines[i]);
        if (entry.attachment && entry.attachment.url) {
          const fileRes = await fetch(entry.attachment.url, { cache: 'no-store' });
          if (fileRes.ok) {
            const parsed = await fileRes.json();
            if (parsed && Array.isArray(parsed.mentors)) {
              return parsed;
            }
          }
        }
        if (entry.message && entry.message.startsWith('{')) {
          const parsed = JSON.parse(entry.message);
          if (parsed && Array.isArray(parsed.mentors)) {
            return parsed;
          }
        }
      } catch (err) {}
    }
  } catch (err) {
    // Silent cloud fetch error (e.g. offline)
  }
  return null;
}

/**
 * Smart merge two collections by ID, preserving additions and updates
 */
function mergeById(localItems = [], remoteItems = []) {
  const map = new Map();
  // Put remote items first
  remoteItems.forEach(item => {
    if (item && item.id) map.set(item.id, item);
  });
  // Local items overwrite or add
  localItems.forEach(item => {
    if (item && item.id) {
      if (!map.has(item.id)) {
        // Brand new local addition (e.g. added on mobile)
        map.set(item.id, item);
      } else {
        // Keep updated fields
        map.set(item.id, { ...map.get(item.id), ...item });
      }
    }
  });
  return Array.from(map.values());
}

/**
 * Fetch latest database with multi-layer fallback & smart bidirectional merge:
 * 1. Cloud relay (works across different networks, mobile cellular & desktop)
 * 2. Local LAN API (/api/data)
 * 3. Local browser localStorage
 */
export async function fetchLiveDatabase() {
  let remoteData = null;

  // 1. Try cloud relay first (globally accessible from any phone or PC)
  try {
    remoteData = await fetchCloudDatabase();
  } catch (e) {}

  // 2. If cloud didn't respond, try local LAN Vite API endpoint
  if (!remoteData) {
    try {
      const res = await fetch(LOCAL_API_ENDPOINT, { cache: 'no-store' });
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

    // If local device had new records that remote lacked (e.g. mentor added on phone), push merged state to cloud!
    const localHadNewMentors = localMentors && localMentors.some(lm => !remoteData.mentors?.some(rm => rm.id === lm.id));
    if (localHadNewMentors) {
      saveLiveDatabase(mergedPayload);
    } else {
      // Otherwise just cache remote/merged state to localStorage
      try {
        localStorage.setItem('aroham_mentors', JSON.stringify(mergedMentors));
        localStorage.setItem('aroham_events', JSON.stringify(mergedEvents));
        localStorage.setItem('aroham_mentees', JSON.stringify(mergedMentees));
        localStorage.setItem('aroham_applications', JSON.stringify(mergedApps));
      } catch (e) {}
    }

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
 * Save data to centralized cloud relay, local network database, and browser localStorage
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

  // 3. Broadcast to global cloud relay (synchronizes across internet, mobile, desktop instantly)
  try {
    fetch(CLOUD_SYNC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Title': 'aroham_db_update'
      },
      body: JSON.stringify(payloadWithMeta)
    }).catch(() => {});
  } catch (err) {}

  // 4. Save to local LAN network database API (/api/data)
  try {
    fetch(LOCAL_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadWithMeta)
    }).catch(() => {});
  } catch (err) {}
}
