import { 
  INITIAL_MENTORS, 
  INITIAL_EVENTS, 
  INITIAL_MENTEES, 
  INITIAL_APPLICATIONS 
} from './initialAdminData';

const LOCAL_API_ENDPOINT = '/api/data';

/**
 * Get all tombstone/deleted IDs from localStorage
 */
export function getDeletedIds() {
  try {
    const raw = localStorage.getItem('aroham_deleted_ids');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Permanently mark an item ID as deleted so it can never be resurrected
 */
export function markIdDeleted(id) {
  if (!id) return;
  try {
    const ids = getDeletedIds();
    const strId = String(id);
    if (!ids.includes(strId)) {
      ids.push(strId);
      localStorage.setItem('aroham_deleted_ids', JSON.stringify(ids));
    }
  } catch (e) {}
}

/**
 * Unmark an ID as deleted (if an entity with the same ID is explicitly re-created)
 */
export function unmarkIdDeleted(id) {
  if (!id) return;
  try {
    const ids = getDeletedIds();
    const strId = String(id);
    const filtered = ids.filter(i => i !== strId);
    localStorage.setItem('aroham_deleted_ids', JSON.stringify(filtered));
  } catch (e) {}
}

/**
 * Filter out any items that have been marked as deleted
 */
export function filterOutDeleted(items, deletedSet) {
  if (!Array.isArray(items)) return [];
  const dSet = deletedSet || new Set(getDeletedIds().map(String));
  return items.filter(item => item && item.id && !dSet.has(String(item.id)));
}

/**
 * Smart merge two collections by ID, strictly respecting deleted tombstones
 */
function mergeById(localItems = [], remoteItems = [], deletedSet) {
  const dSet = deletedSet || new Set(getDeletedIds().map(String));
  const map = new Map();

  // 1. Add remote items (only if NOT marked as deleted)
  remoteItems.forEach(item => {
    if (item && item.id && !dSet.has(String(item.id))) {
      map.set(String(item.id), item);
    }
  });

  // 2. Local items overwrite or add (only if NOT marked as deleted)
  localItems.forEach(item => {
    if (item && item.id && !dSet.has(String(item.id))) {
      if (!map.has(String(item.id))) {
        map.set(String(item.id), item);
      } else {
        map.set(String(item.id), { ...map.get(String(item.id)), ...item });
      }
    }
  });

  return Array.from(map.values());
}

/**
 * Fetch latest database with multi-layer fallback & smart bidirectional merge
 */
export async function fetchLiveDatabase() {
  const deletedList = getDeletedIds();
  const deletedSet = new Set(deletedList.map(String));

  let remoteData = null;

  // 1. Fetch from local LAN Vite API endpoint if available
  try {
    const res = await fetch(LOCAL_API_ENDPOINT, {
      signal: AbortSignal.timeout(1500),
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        remoteData = data;
        // Collect and merge any remote deletedIds
        if (Array.isArray(data.deletedIds)) {
          data.deletedIds.forEach(id => {
            markIdDeleted(id);
            deletedSet.add(String(id));
          });
        }
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

  // 3. Merge local with remote (remote data updates local, but deleted items NEVER return)
  if (remoteData) {
    const remoteMentors = filterOutDeleted(remoteData.mentors, deletedSet);
    const remoteEvents = filterOutDeleted(remoteData.events, deletedSet);
    const remoteMentees = filterOutDeleted(remoteData.mentees, deletedSet);
    const remoteApps = filterOutDeleted(remoteData.applications, deletedSet);

    const safeLocalMentors = localMentors !== null ? filterOutDeleted(localMentors, deletedSet) : null;
    const safeLocalEvents = localEvents !== null ? filterOutDeleted(localEvents, deletedSet) : null;
    const safeLocalMentees = localMentees !== null ? filterOutDeleted(localMentees, deletedSet) : null;
    const safeLocalApps = localApps !== null ? filterOutDeleted(localApps, deletedSet) : null;

    const mergedMentors = safeLocalMentors !== null ? mergeById(safeLocalMentors, remoteMentors, deletedSet) : remoteMentors;
    const mergedEvents = safeLocalEvents !== null ? mergeById(safeLocalEvents, remoteEvents, deletedSet) : remoteEvents;
    const mergedMentees = safeLocalMentees !== null ? mergeById(safeLocalMentees, remoteMentees, deletedSet) : remoteMentees;
    const mergedApps = safeLocalApps !== null ? mergeById(safeLocalApps, remoteApps, deletedSet) : remoteApps;

    const mergedPayload = {
      mentors: mergedMentors,
      events: mergedEvents,
      mentees: mergedMentees,
      applications: mergedApps,
      deletedIds: Array.from(deletedSet),
      lastModified: new Date().toISOString()
    };

    // Cache merged state locally
    try {
      localStorage.setItem('aroham_mentors', JSON.stringify(mergedMentors));
      localStorage.setItem('aroham_events', JSON.stringify(mergedEvents));
      localStorage.setItem('aroham_mentees', JSON.stringify(mergedMentees));
      localStorage.setItem('aroham_applications', JSON.stringify(mergedApps));
      localStorage.setItem('aroham_initialized', 'true');
    } catch (e) {}

    return mergedPayload;
  }

  // Fallback to localStorage or initial seeds
  const isInitialized = localStorage.getItem('aroham_initialized') === 'true';

  const finalMentors = localMentors !== null
    ? filterOutDeleted(localMentors, deletedSet)
    : (isInitialized ? [] : filterOutDeleted(INITIAL_MENTORS, deletedSet));

  const finalEvents = localEvents !== null
    ? filterOutDeleted(localEvents, deletedSet)
    : (isInitialized ? [] : filterOutDeleted(INITIAL_EVENTS, deletedSet));

  const finalMentees = localMentees !== null
    ? filterOutDeleted(localMentees, deletedSet)
    : (isInitialized ? [] : filterOutDeleted(INITIAL_MENTEES, deletedSet));

  const finalApps = localApps !== null
    ? filterOutDeleted(localApps, deletedSet)
    : (isInitialized ? [] : filterOutDeleted(INITIAL_APPLICATIONS, deletedSet));

  return {
    mentors: finalMentors,
    events: finalEvents,
    mentees: finalMentees,
    applications: finalApps,
    deletedIds: Array.from(deletedSet)
  };
}

/**
 * Save data to local network database and browser localStorage with quota protection and deletion persistence
 */
export async function saveLiveDatabase(payload) {
  const deletedList = getDeletedIds();
  const deletedSet = new Set(deletedList.map(String));

  // If newly created items carry an ID previously in deletedSet, unmark them
  if (Array.isArray(payload.mentors)) {
    payload.mentors.forEach(m => m && m.id && deletedSet.delete(String(m.id)));
  }
  if (Array.isArray(payload.events)) {
    payload.events.forEach(e => e && e.id && deletedSet.delete(String(e.id)));
  }
  if (Array.isArray(payload.mentees)) {
    payload.mentees.forEach(m => m && m.id && deletedSet.delete(String(m.id)));
  }
  if (Array.isArray(payload.applications)) {
    payload.applications.forEach(a => a && a.id && deletedSet.delete(String(a.id)));
  }
  localStorage.setItem('aroham_deleted_ids', JSON.stringify(Array.from(deletedSet)));

  const cleanMentors = filterOutDeleted(payload.mentors || [], deletedSet);
  const cleanEvents = filterOutDeleted(payload.events || [], deletedSet);
  const cleanMentees = filterOutDeleted(payload.mentees || [], deletedSet);
  const cleanApps = filterOutDeleted(payload.applications || [], deletedSet);

  const payloadWithMeta = {
    mentors: cleanMentors,
    events: cleanEvents,
    mentees: cleanMentees,
    applications: cleanApps,
    deletedIds: Array.from(deletedSet),
    lastModified: new Date().toISOString()
  };

  // 1. Immediately cache in localStorage with quota-safe protection
  try {
    localStorage.setItem('aroham_mentors', JSON.stringify(payloadWithMeta.mentors));
    localStorage.setItem('aroham_events', JSON.stringify(payloadWithMeta.events));
    localStorage.setItem('aroham_mentees', JSON.stringify(payloadWithMeta.mentees));
    localStorage.setItem('aroham_applications', JSON.stringify(payloadWithMeta.applications));
    localStorage.setItem('aroham_initialized', 'true');
  } catch (e) {
    console.warn('LocalStorage quota limit reached, saving with image compression...', e);
    try {
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
  const deletedSet = new Set(getDeletedIds().map(String));
  const data = {
    mentors: filterOutDeleted(JSON.parse(localStorage.getItem('aroham_mentors') || '[]'), deletedSet),
    events: filterOutDeleted(JSON.parse(localStorage.getItem('aroham_events') || '[]'), deletedSet),
    mentees: filterOutDeleted(JSON.parse(localStorage.getItem('aroham_mentees') || '[]'), deletedSet),
    applications: filterOutDeleted(JSON.parse(localStorage.getItem('aroham_applications') || '[]'), deletedSet),
    deletedIds: Array.from(deletedSet),
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
    if (data && typeof data === 'object') {
      if (Array.isArray(data.deletedIds)) {
        data.deletedIds.forEach(id => markIdDeleted(id));
      }
      await saveLiveDatabase(data);
      window.dispatchEvent(new Event('aroham_data_sync'));
      return { success: true, count: Array.isArray(data.mentors) ? data.mentors.length : 0 };
    }
    return { success: false, error: 'Invalid data format' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
