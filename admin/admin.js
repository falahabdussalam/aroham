/**
 * AROHAM FOUNDATION · EXECUTIVE ADMIN CONSOLE
 * Real-time notification engine, student requests manager,
 * mentor profile CRUD, and volunteer tracking.
 * Features automatic offline local-first fallback & synchronization.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ---------------- Default Initial Seed Data (Offline Resilience) ----------------
  const DEFAULT_MENTORS = [
    {
      id: "mufeedha",
      name: "Fathimath Mufeedha",
      degree: "MBBS",
      category: "medicine",
      categoryLabel: "Medicine & Healthcare",
      badgeClass: "badge-med",
      summitRole: "President, Aroham Foundation · EduWay 2026 Mentor",
      focusAreas: ["NEET-UG Preparation Strategy", "MBBS Course Curriculum & Clinical Rotations", "Medical Career Pathways & Leadership"],
      bio: "Founding President of Aroham Foundation and MBBS scholar. Spearheads foundation initiatives, bridging the gap between higher secondary students and professional medical education.",
      status: "active",
      createdAt: "2025-07-13T10:00:00.000Z"
    },
    {
      id: "hija",
      name: "Fathima Hija T",
      degree: "B.Sc. Physics",
      category: "sciences",
      categoryLabel: "Pure & Applied Sciences",
      badgeClass: "badge-sci",
      summitRole: "Trustee, Aroham Foundation · EduWay 2026 Mentor",
      focusAreas: ["Pure Science Research & Academic Careers", "Physics Specializations & Higher Studies", "Higher Secondary Science Stream Mastery"],
      bio: "Executive Trustee and Physics scholar dedicated to promoting pure sciences. Guides students passionate about fundamental research, space physics, and academic fellowships.",
      status: "active",
      createdAt: "2025-07-13T10:00:00.000Z"
    },
    {
      id: "afifa",
      name: "Afifa M.A",
      degree: "B.Sc. (Hons.) Biotechnology",
      category: "sciences",
      categoryLabel: "Pure & Applied Sciences",
      badgeClass: "badge-sci",
      summitRole: "General Secretary, Aroham Foundation · EduWay Mentor",
      focusAreas: ["Molecular Biology, Genetics & Biotechnology", "Higher Secondary Science Stream Planning", "Academic Leadership & Community Organizing"],
      bio: "General Secretary of Aroham Foundation and Biotechnology scholar. Coordinates foundation operations, alumni mobilization, and one-on-one mentorship matching for school students.",
      status: "active",
      createdAt: "2025-07-13T10:00:00.000Z"
    },
    {
      id: "farsana",
      name: "Farsana",
      degree: "Pharm.D",
      category: "medicine",
      categoryLabel: "Medicine & Healthcare",
      badgeClass: "badge-med",
      summitRole: "EduWay 2026 Career Mentor",
      focusAreas: ["Clinical Pharmacy & Hospital Practice", "Doctor of Pharmacy Curriculum & Career Options", "Pharmaceutical Research & Patient Care"],
      bio: "Graduated from Bolster Girls Campus and pursued Pharm.D (Doctor of Pharmacy). Guided Class 10–12 aspirants at EduWay 2026 on clinical pharmacy, hospital practice, and healthcare careers.",
      status: "active",
      createdAt: "2026-05-23T10:00:00.000Z"
    },
    {
      id: "maryam",
      name: "Maryam Beevi C.S",
      degree: "B.Tech",
      category: "engineering",
      categoryLabel: "Engineering & Tech",
      badgeClass: "badge-eng",
      summitRole: "EduWay 2026 Career Mentor",
      focusAreas: ["KEAM / JEE Engineering Entrances", "Core Engineering & Tech Disciplines", "Women in Engineering & Technology"],
      bio: "Engineering alumna who represented Aroham Foundation at the EduWay 2026 Career Summit, mentoring students on engineering branches, career options, and technical opportunities.",
      status: "active",
      createdAt: "2026-05-23T10:00:00.000Z"
    },
    {
      id: "niya",
      name: "Niya Fathima",
      degree: "B.Arch",
      category: "design",
      categoryLabel: "Architecture & Design",
      badgeClass: "badge-design",
      summitRole: "EduWay 2026 Career Mentor",
      focusAreas: ["NATA & JEE Paper 2 Entrance Exams", "Architectural Design Studios & Spatial Planning", "Sustainable Built Environment & Interior Architecture"],
      bio: "Architecture alumna demystifying NATA entrance preparation and architecture studies, helping students explore creative careers in spatial design and built environments.",
      status: "active",
      createdAt: "2026-05-23T10:00:00.000Z"
    },
    {
      id: "hana",
      name: "Hana Fathima",
      degree: "B.A. (Hons.) Spanish",
      category: "humanities",
      categoryLabel: "Humanities & Languages",
      badgeClass: "badge-lang",
      summitRole: "EduWay 2026 Career Mentor",
      focusAreas: ["Foreign Language Degrees & Linguistics", "Translation, International Relations & Diplomacy", "Undergraduate Degree Admissions & Language Programs"],
      bio: "Pioneered foreign language studies from Bolster Girls Campus alumni network. Mentors students on unconventional career paths in European languages, global diplomacy, and translation.",
      status: "active",
      createdAt: "2026-05-23T10:00:00.000Z"
    },
    {
      id: "naqa",
      name: "Naqa Fathima",
      degree: "Bachelor of Design",
      category: "design",
      categoryLabel: "Architecture & Design",
      badgeClass: "badge-design",
      summitRole: "EduWay 2026 Career Mentor",
      focusAreas: ["Design Aptitude Tests (UCEED / NID DAT / NIFT)", "Product Design, UI/UX & Visual Communication", "Creative Portfolio Building & Studio Culture"],
      bio: "Design graduate guiding creative students into design industries. Mentored students at Rose Lounge, Malappuram on portfolio development and entrance preparation for creative careers.",
      status: "active",
      createdAt: "2026-05-23T10:00:00.000Z"
    },
    {
      id: "labeeba",
      name: "Labeeba",
      degree: "B.Sc. Physics",
      category: "sciences",
      categoryLabel: "Pure & Applied Sciences",
      badgeClass: "badge-sci",
      summitRole: "EduWay 2026 Career Mentor",
      focusAreas: ["Pure Science Foundations & Physics Degrees", "Academic Horizons & Higher Education Guidance", "Science Curriculum Planning for Higher Secondary"],
      bio: "Pure science scholar helping students explore career trajectories in Physics and scientific research, encouraging young women to excel in core sciences.",
      status: "active",
      createdAt: "2026-05-23T10:00:00.000Z"
    }
  ];

  const DEFAULT_STUDENTS = [
    {
      id: "req-101",
      studentName: "Fathima Nihala",
      studentClass: "Class 12",
      mentorPreference: "MBBS / NEET Strategy",
      studentContact: "+91 94471 28910",
      studentQueries: "Preparing for NEET-UG 2027. Need guidance on balancing State Board Plus Two syllabus with intensive physics problem practice and coaching test series.",
      status: "matched",
      assignedMentorId: "mufeedha",
      assignedMentorName: "Fathimath Mufeedha (MBBS)",
      adminNotes: "Paired with Mufeedha on 5 May 2026. Weekly phone mentoring scheduled.",
      createdAt: "2026-05-04T11:20:00.000Z"
    },
    {
      id: "req-102",
      studentName: "Amina Shaza",
      studentClass: "Class 11",
      mentorPreference: "Architecture / NATA & JEE Paper 2",
      studentContact: "+91 98952 14320",
      studentQueries: "Interested in B.Arch admissions. Need advice on portfolio development and how to prepare for spatial perception questions in NATA.",
      status: "matched",
      assignedMentorId: "niya",
      assignedMentorName: "Niya Fathima (B.Arch)",
      adminNotes: "Shared sample sketchbook and NATA mock questions.",
      createdAt: "2026-05-08T15:45:00.000Z"
    },
    {
      id: "req-103",
      studentName: "Rinsha Mariyam",
      studentClass: "Repeater / Entrance Aspirant",
      mentorPreference: "Pure Sciences / Central Universities (CUET)",
      studentContact: "+91 97455 60123",
      studentQueries: "Want to pursue B.Sc. Physics at IISER or central university. Seeking guidance on entrance options and research fellowships.",
      status: "pending",
      assignedMentorId: null,
      assignedMentorName: null,
      adminNotes: "Reviewing mentor availability with Hija T.",
      createdAt: "2026-05-18T09:15:00.000Z"
    }
  ];

  const DEFAULT_VOLUNTEERS = [
    {
      id: "vol-1",
      name: "Shahana K.P",
      batchYear: "2023",
      currentProfession: "B.Com / CA Foundation Aspirant",
      contact: "+91 96332 55100",
      interest: "Event Coordination & Student Registration Desks",
      status: "approved",
      createdAt: "2026-05-10T14:30:00.000Z"
    }
  ];

  const DEFAULT_NOTIFICATIONS = [
    {
      id: "notif-001",
      type: "unimate_request",
      title: "New UniMate Mentorship Request",
      message: "Rinsha Mariyam (Repeater / Entrance Aspirant) submitted a request for Pure Sciences / Central Universities (CUET).",
      targetId: "req-103",
      unread: true,
      createdAt: "2026-05-18T09:15:00.000Z"
    },
    {
      id: "notif-002",
      type: "unimate_matched",
      title: "Mentor Successfully Assigned",
      message: "Amina Shaza was matched with Niya Fathima (B.Arch).",
      targetId: "req-102",
      unread: false,
      createdAt: "2026-05-09T10:00:00.000Z"
    },
    {
      id: "notif-003",
      type: "system",
      title: "Aroham Foundation Admin Initialized",
      message: "Executive Dashboard and backend server connected successfully.",
      targetId: null,
      unread: false,
      createdAt: "2026-05-01T08:00:00.000Z"
    }
  ];

  // ---------------- Configuration & State ----------------
  let API_BASE = localStorage.getItem('aroham_api_base') || (
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? (window.location.port === '5000' ? '/api' : 'http://localhost:5000/api')
      : '/api'
  );

  let currentPasscode = localStorage.getItem('aroham_admin_pass') || 'aroham2025';
  let soundEnabled = localStorage.getItem('aroham_sound_enabled') !== 'false';
  let isServerOnline = false;
  let lastNotificationCount = null;
  let activeStudentFilter = 'all';
  let studentSearchQuery = '';
  let activeMentorCategory = 'all';
  let mentorSearchQuery = '';

  let mentorsData = [];
  let studentsData = [];
  let volunteersData = [];
  let contactsData = [];
  let notificationsData = [];

  // ---------------- DOM References ----------------
  const authGate = document.getElementById('auth-gate');
  const authForm = document.getElementById('auth-form');
  const authPassInput = document.getElementById('auth-passcode');
  const authError = document.getElementById('auth-error');
  const logoutBtn = document.getElementById('logout-btn');

  const navItems = document.querySelectorAll('.admin-nav-item');
  const pageViews = document.querySelectorAll('.page-view');
  const pageTitleEl = document.getElementById('current-page-title');
  const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');
  const sidebar = document.getElementById('admin-sidebar');

  // Server Status Pill
  const serverStatusPill = document.getElementById('server-status-pill');
  const serverStatusDot = document.getElementById('server-status-dot');
  const serverStatusText = document.getElementById('server-status-text');

  // Notifications
  const notifBellBtn = document.getElementById('notif-bell-btn');
  const notifDropdown = document.getElementById('notif-dropdown');
  const notifListContainer = document.getElementById('notif-list-container');
  const unreadCountBadge = document.getElementById('unread-count-badge');
  const markAllReadBtn = document.getElementById('mark-all-read-btn');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  const soundLabel = document.getElementById('sound-label');

  // Toast
  const adminToast = document.getElementById('admin-toast');
  const toastTitle = document.getElementById('toast-title');
  const toastBody = document.getElementById('toast-body');

  // Modals
  const mentorModal = document.getElementById('mentor-modal');
  const mentorForm = document.getElementById('mentor-form');
  const mentorModalTitle = document.getElementById('mentor-modal-title');
  const mentorIdInput = document.getElementById('mentor-id-input');
  const mentorModalClose = document.getElementById('mentor-modal-close');
  const mentorCancelBtn = document.getElementById('mentor-cancel-btn');
  const btnOpenAddMentor = document.getElementById('btn-open-add-mentor');
  const btnQuickAddMentor = document.getElementById('btn-quick-add-mentor');

  const studentModal = document.getElementById('student-modal');
  const studentManageForm = document.getElementById('student-manage-form');
  const studentModalClose = document.getElementById('student-modal-close');
  const studentModalCancel = document.getElementById('student-modal-cancel');

  // Settings
  const settingApiUrl = document.getElementById('setting-api-url');
  const settingPasscode = document.getElementById('setting-passcode');
  const btnSaveSettings = document.getElementById('btn-save-settings');
  const btnTestConnection = document.getElementById('btn-test-connection');

  // ---------------- Category Helpers ----------------
  function getCategoryLabel(cat) {
    const map = {
      medicine: 'Medicine & Healthcare',
      sciences: 'Pure & Applied Sciences',
      engineering: 'Engineering & Tech',
      design: 'Architecture & Design',
      humanities: 'Humanities & Languages'
    };
    return map[cat] || 'Academic Guidance';
  }

  function getBadgeClass(cat) {
    const map = {
      medicine: 'badge-med',
      sciences: 'badge-sci',
      engineering: 'badge-eng',
      design: 'badge-design',
      humanities: 'badge-lang'
    };
    return map[cat] || 'badge-sci';
  }

  // ---------------- Server Status Pill ----------------
  function updateServerStatus(online) {
    isServerOnline = online;
    if (!serverStatusPill || !serverStatusText) return;
    if (online) {
      serverStatusPill.className = 'server-status-pill online';
      serverStatusText.textContent = 'Backend Online (Port 5000)';
      serverStatusPill.title = `Connected to API at ${API_BASE}. Real-time synchronization active.`;
    } else {
      serverStatusPill.className = 'server-status-pill offline';
      serverStatusText.textContent = 'Offline Mode (Local Storage)';
      serverStatusPill.title = `Backend server not reachable at ${API_BASE}. Changes are saved locally in your browser. Start server with "node backend/server.js" for multi-device sync.`;
    }
  }

  if (serverStatusPill) {
    serverStatusPill.addEventListener('click', () => {
      if (isServerOnline) {
        showToast('Backend Online', `Connected to ${API_BASE} on port 5000.`);
      } else {
        alert(
          `Aroham Admin is running in Offline Local Mode.\n\n` +
          `Your mentors, student pairings, and records are being saved directly in your browser's Local Storage.\n\n` +
          `To enable the full Node.js API server & real-time network sync:\n` +
          `1. Open terminal\n` +
          `2. Run: node backend/server.js\n` +
          `3. Click 'Test API Connection' in Settings`
        );
      }
    });
  }

  // ---------------- Authentication Gate ----------------
  function checkAuth() {
    const isAuthed = sessionStorage.getItem('aroham_admin_auth') === 'true';
    if (!isAuthed) {
      authGate.style.display = 'flex';
    } else {
      authGate.style.display = 'none';
      initDashboard();
    }
  }

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = authPassInput.value.trim();
      if (entered === currentPasscode) {
        sessionStorage.setItem('aroham_admin_auth', 'true');
        authGate.style.display = 'none';
        authError.style.display = 'none';
        initDashboard();
      } else {
        authError.style.display = 'block';
        authPassInput.select();
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('aroham_admin_auth');
      window.location.reload();
    });
  }

  // ---------------- Navigation & View Switching ----------------
  const pageTitles = {
    'dashboard-view': 'Executive Dashboard',
    'students-view': 'Manage Students · UniMates Matching',
    'mentors-view': 'Manage Mentors · Alumni Directory',
    'volunteers-view': 'Volunteer Network Roster',
    'contacts-view': 'Institutional Inquiries',
    'settings-view': 'API & System Settings'
  };

  function switchView(targetId) {
    navItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-target') === targetId);
    });

    pageViews.forEach(view => {
      view.classList.toggle('active', view.id === targetId);
    });

    if (pageTitleEl && pageTitles[targetId]) {
      pageTitleEl.textContent = pageTitles[targetId];
    }

    // Close mobile sidebar
    if (sidebar) sidebar.classList.remove('open');
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target');
      if (target) switchView(target);
    });
  });

  const btnGotoStudents = document.getElementById('btn-goto-students');
  if (btnGotoStudents) {
    btnGotoStudents.addEventListener('click', () => switchView('students-view'));
  }

  if (mobileSidebarToggle) {
    mobileSidebarToggle.addEventListener('click', () => {
      if (sidebar) sidebar.classList.toggle('open');
    });
  }

  // ---------------- Web Audio Alert Chime ----------------
  function playAlertChime() {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Primary tone (880Hz - A5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15);
      gain1.gain.setValueAtTime(0.15, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // Audio policy safe
    }
  }

  function updateSoundUI() {
    if (soundIcon && soundLabel) {
      soundIcon.textContent = soundEnabled ? '🔔' : '🔕';
      soundLabel.textContent = soundEnabled ? 'Sound On' : 'Muted';
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem('aroham_sound_enabled', soundEnabled);
      updateSoundUI();
      if (soundEnabled) playAlertChime();
    });
    updateSoundUI();
  }

  // ---------------- Toast Display ----------------
  let toastTimer = null;
  function showToast(title, body) {
    if (!adminToast) return;
    if (toastTitle) toastTitle.textContent = title;
    if (toastBody) toastBody.textContent = body;
    adminToast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      adminToast.classList.remove('show');
    }, 5000);
  }

  // ---------------- API Fetch Helpers with Fast Timeout ----------------
  async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 3000 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(resource, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  async function apiGet(endpoint) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}${endpoint}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      updateServerStatus(true);
      return json;
    } catch (err) {
      updateServerStatus(false);
      return null;
    }
  }

  async function apiPost(endpoint, data) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      updateServerStatus(true);
      return json;
    } catch (err) {
      updateServerStatus(false);
      return { success: false, error: err.message, isNetworkError: true };
    }
  }

  async function apiPatch(endpoint, data) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}${endpoint}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      updateServerStatus(true);
      return json;
    } catch (err) {
      updateServerStatus(false);
      return { success: false, error: err.message, isNetworkError: true };
    }
  }

  async function apiPut(endpoint, data) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      updateServerStatus(true);
      return json;
    } catch (err) {
      updateServerStatus(false);
      return { success: false, error: err.message, isNetworkError: true };
    }
  }

  async function apiDelete(endpoint) {
    try {
      const res = await fetchWithTimeout(`${API_BASE}${endpoint}`, {
        method: 'DELETE'
      });
      const json = await res.json();
      updateServerStatus(true);
      return json;
    } catch (err) {
      updateServerStatus(false);
      return { success: false, error: err.message, isNetworkError: true };
    }
  }

  // ---------------- Dashboard Data Loaders ----------------
  async function loadDashboardStats() {
    let stats = await apiGet('/stats');
    if (!stats) {
      // Offline calculation fallback
      const pendingCount = studentsData.filter(s => s.status === 'pending').length;
      const matchedCount = studentsData.filter(s => s.status === 'matched').length;
      const unreadCount = notificationsData.filter(n => n.unread).length;
      stats = {
        totalRequests: studentsData.length,
        pendingRequests: pendingCount,
        matchedRequests: matchedCount,
        totalMentors: mentorsData.length,
        unreadNotifications: unreadCount
      };
    }

    const elTotalReq = document.getElementById('kpi-total-requests');
    const elPendingSub = document.getElementById('kpi-pending-sub');
    const elTotalMentors = document.getElementById('kpi-total-mentors');
    const elMatchedCount = document.getElementById('kpi-matched-count');
    const elUnreadNotifs = document.getElementById('kpi-unread-notifs');
    const elSideStudents = document.getElementById('sidebar-unimates-badge');
    const elSideMentors = document.getElementById('sidebar-mentors-badge');

    if (elTotalReq) elTotalReq.textContent = stats.totalRequests || 0;
    if (elPendingSub) elPendingSub.textContent = `${stats.pendingRequests || 0} pending match`;
    if (elTotalMentors) elTotalMentors.textContent = stats.totalMentors || 0;
    if (elMatchedCount) elMatchedCount.textContent = stats.matchedRequests || 0;
    if (elUnreadNotifs) elUnreadNotifs.textContent = stats.unreadNotifications || 0;
    if (elSideStudents) elSideStudents.textContent = stats.pendingRequests || 0;
    if (elSideMentors) elSideMentors.textContent = stats.totalMentors || 0;
  }

  // ---------------- Real-time Notifications Polling ----------------
  async function pollNotifications() {
    const res = await apiGet('/notifications');
    let unreadCount = 0;

    if (res && res.notifications) {
      notificationsData = res.notifications;
      unreadCount = res.unreadCount || 0;
      localStorage.setItem('aroham_notifications', JSON.stringify(notificationsData));
    } else {
      // Offline fallback: check localStorage
      try {
        const cached = localStorage.getItem('aroham_notifications');
        notificationsData = cached ? JSON.parse(cached) : DEFAULT_NOTIFICATIONS;
        if (!cached) localStorage.setItem('aroham_notifications', JSON.stringify(DEFAULT_NOTIFICATIONS));

        // Check for new offline requests from the user website that need a notification
        const offRequests = JSON.parse(localStorage.getItem('aroham_offline_requests') || '[]');
        offRequests.forEach(req => {
          const alreadyNotified = notificationsData.some(n => n.targetId === req.id);
          if (!alreadyNotified) {
            notificationsData.unshift({
              id: 'notif-' + Date.now(),
              type: 'unimate_request',
              title: 'New UniMate Mentorship Request',
              message: `${req.studentName} (${req.studentClass}) requested mentorship for ${req.mentorPreference}.`,
              targetId: req.id,
              unread: true,
              createdAt: req.createdAt || new Date().toISOString()
            });
          }
        });
        localStorage.setItem('aroham_notifications', JSON.stringify(notificationsData));
      } catch (e) {
        notificationsData = DEFAULT_NOTIFICATIONS;
      }
      unreadCount = notificationsData.filter(n => n.unread).length;
    }

    // Update Bell Badge
    if (unreadCountBadge) {
      if (unreadCount > 0) {
        unreadCountBadge.textContent = unreadCount > 99 ? '99+' : unreadCount;
        unreadCountBadge.style.display = 'flex';
      } else {
        unreadCountBadge.style.display = 'none';
      }
    }

    // Check if new notifications arrived since last check
    if (lastNotificationCount !== null && unreadCount > lastNotificationCount) {
      const latest = notificationsData[0];
      if (latest && latest.unread) {
        playAlertChime();
        showToast(latest.title, latest.message);
        loadStudents();
        loadDashboardStats();
      }
    }
    lastNotificationCount = unreadCount;

    // Render Notifications Dropdown
    renderNotificationsDropdown(notificationsData);
  }

  function renderNotificationsDropdown(list) {
    if (!notifListContainer) return;
    if (list.length === 0) {
      notifListContainer.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          No notifications yet.
        </div>
      `;
      return;
    }

    notifListContainer.innerHTML = list.map(item => {
      const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      return `
        <div class="notif-item ${item.unread ? 'unread' : ''}" data-target-id="${item.targetId || ''}">
          <div class="notif-dot" style="${item.unread ? '' : 'background-color: transparent;'}"></div>
          <div class="notif-body">
            <div class="notif-title">${item.title}</div>
            <div class="notif-desc">${item.message}</div>
            <div class="notif-time">${dateStr}</div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click event to jump to student request
    notifListContainer.querySelectorAll('.notif-item').forEach(el => {
      el.addEventListener('click', () => {
        const targetId = el.getAttribute('data-target-id');
        if (notifDropdown) notifDropdown.classList.remove('open');
        switchView('students-view');
        if (targetId) {
          openStudentManageModal(targetId);
        }
      });
    });
  }

  if (notifBellBtn) {
    notifBellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (notifDropdown) notifDropdown.classList.toggle('open');
    });
  }

  document.addEventListener('click', (e) => {
    if (notifDropdown && !notifDropdown.contains(e.target) && e.target !== notifBellBtn) {
      notifDropdown.classList.remove('open');
    }
  });

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', async () => {
      await apiPost('/notifications/mark-read', {});
      // Also update local cache
      notificationsData.forEach(n => n.unread = false);
      localStorage.setItem('aroham_notifications', JSON.stringify(notificationsData));
      pollNotifications();
      loadDashboardStats();
    });
  }

  // ---------------- Students & UniMates Applications ----------------
  async function loadStudents() {
    const res = await apiGet('/unimates');
    if (res && res.requests) {
      studentsData = res.requests;
      localStorage.setItem('aroham_unimates', JSON.stringify(studentsData));
    } else {
      // Offline fallback: load cached data or defaults
      try {
        const cached = localStorage.getItem('aroham_unimates');
        studentsData = cached ? JSON.parse(cached) : [...DEFAULT_STUDENTS];
        if (!cached) localStorage.setItem('aroham_unimates', JSON.stringify(DEFAULT_STUDENTS));

        // Merge any new requests submitted from public website in offline mode
        const offRequests = JSON.parse(localStorage.getItem('aroham_offline_requests') || '[]');
        offRequests.forEach(req => {
          if (!studentsData.some(s => s.id === req.id || (s.studentContact === req.studentContact && s.studentName === req.studentName))) {
            studentsData.unshift({
              id: req.id || 'req-' + Date.now(),
              studentName: req.studentName,
              studentClass: req.studentClass,
              mentorPreference: req.mentorPreference,
              studentContact: req.studentContact,
              studentQueries: req.studentQueries,
              status: 'pending',
              assignedMentorId: null,
              assignedMentorName: null,
              createdAt: req.createdAt || new Date().toISOString()
            });
          }
        });
        localStorage.setItem('aroham_unimates', JSON.stringify(studentsData));
      } catch (e) {
        studentsData = [...DEFAULT_STUDENTS];
      }
    }

    renderStudentsTables();
    updateStudentCounts();
  }

  function updateStudentCounts() {
    const total = studentsData.length;
    const pending = studentsData.filter(s => s.status === 'pending').length;
    const matched = studentsData.filter(s => s.status === 'matched').length;

    const elAll = document.getElementById('count-all-students');
    const elPen = document.getElementById('count-pending-students');
    const elMat = document.getElementById('count-matched-students');

    if (elAll) elAll.textContent = total;
    if (elPen) elPen.textContent = pending;
    if (elMat) elMat.textContent = matched;
  }

  function renderStudentsTables() {
    // 1. Dashboard Recent Table (top 5)
    const dashboardTbody = document.getElementById('dashboard-recent-table');
    if (dashboardTbody) {
      const recents = studentsData.slice(0, 5);
      if (recents.length === 0) {
        dashboardTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color: var(--text-muted);">No student applications received yet.</td></tr>`;
      } else {
        dashboardTbody.innerHTML = recents.map(req => createStudentTableRow(req)).join('');
      }
    }

    // 2. Full Students View Table
    const fullTbody = document.getElementById('students-full-table');
    if (fullTbody) {
      const q = studentSearchQuery.toLowerCase().trim();
      const filtered = studentsData.filter(req => {
        const matchesStatus = activeStudentFilter === 'all' || req.status === activeStudentFilter;
        const matchesQuery = !q ||
          (req.studentName && req.studentName.toLowerCase().includes(q)) ||
          (req.studentContact && req.studentContact.toLowerCase().includes(q)) ||
          (req.mentorPreference && req.mentorPreference.toLowerCase().includes(q)) ||
          (req.studentClass && req.studentClass.toLowerCase().includes(q));
        return matchesStatus && matchesQuery;
      });

      if (filtered.length === 0) {
        fullTbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 32px; color: var(--text-muted);">No student requests found matching criteria.</td></tr>`;
      } else {
        fullTbody.innerHTML = filtered.map(req => createStudentTableRow(req, true)).join('');
      }
    }

    // Attach row action listeners
    document.querySelectorAll('[data-action-manage-student]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-action-manage-student');
        openStudentManageModal(id);
      });
    });

    document.querySelectorAll('[data-action-delete-student]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-action-delete-student');
        if (confirm('Are you sure you want to remove this student application record?')) {
          let res = await apiDelete(`/unimates/${id}`);
          if (res && res.success) {
            showToast('Student Record Removed', 'The application was deleted.');
          } else {
            // Local fallback delete
            studentsData = studentsData.filter(s => s.id !== id);
            localStorage.setItem('aroham_unimates', JSON.stringify(studentsData));
            showToast('Student Record Removed', 'The application was deleted from local storage.');
          }
          loadStudents();
          loadDashboardStats();
        }
      });
    });
  }

  function createStudentTableRow(req, isFullView = false) {
    const dateFormatted = req.createdAt ? new Date(req.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent';
    const cleanPhone = (req.studentContact || '').replace(/[^0-9]/g, '');
    const waLink = cleanPhone ? `https://wa.me/${cleanPhone}` : '#';

    const statusPill = `
      <span class="status-pill ${req.status || 'pending'}">
        ● ${(req.status || 'pending').toUpperCase()}
      </span>
    `;

    const mentorDisplay = req.assignedMentorName
      ? `<span style="font-weight: 600; color: var(--pine-800);">${req.assignedMentorName}</span>`
      : `<span style="color: var(--text-muted); font-style: italic;">Unassigned</span>`;

    if (!isFullView) {
      return `
        <tr>
          <td><strong>${req.studentName}</strong></td>
          <td><span class="tag-badge">${req.studentClass}</span></td>
          <td>${req.mentorPreference}</td>
          <td><a href="${waLink}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="padding: 2px 8px; font-size: 0.75rem;">💬 ${req.studentContact}</a></td>
          <td>${statusPill}</td>
          <td>${mentorDisplay}</td>
          <td>
            <button class="btn btn-primary btn-sm" data-action-manage-student="${req.id}">Assign / Match</button>
          </td>
        </tr>
      `;
    }

    return `
      <tr>
        <td style="font-size: 0.78rem; color: var(--text-muted);">${dateFormatted}</td>
        <td><strong>${req.studentName}</strong></td>
        <td><span class="tag-badge">${req.studentClass}</span></td>
        <td><strong>${req.mentorPreference}</strong></td>
        <td>
          <a href="${waLink}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="padding: 2px 8px; font-size: 0.75rem; color: #059669; border-color: #A7F3D0;">
            💬 ${req.studentContact}
          </a>
        </td>
        <td style="max-width: 260px; font-size: 0.82rem; color: var(--slate-700); line-height: 1.4;">${req.studentQueries || 'General academic guidance.'}</td>
        <td>${statusPill}</td>
        <td>${mentorDisplay}</td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-primary btn-sm" data-action-manage-student="${req.id}">Pair</button>
            <button class="btn btn-outline btn-sm" style="color: #EF4444;" data-action-delete-student="${req.id}" title="Delete">&times;</button>
          </div>
        </td>
      </tr>
    `;
  }

  // Filter Pills for Students View
  document.querySelectorAll('[data-student-status]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('[data-student-status]').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeStudentFilter = pill.getAttribute('data-student-status');
      renderStudentsTables();
    });
  });

  const studentsSearchInput = document.getElementById('students-search-input');
  if (studentsSearchInput) {
    studentsSearchInput.addEventListener('input', (e) => {
      studentSearchQuery = e.target.value;
      renderStudentsTables();
    });
  }

  // Open Student Manage / Pair Modal
  function openStudentManageModal(requestId) {
    const req = studentsData.find(r => r.id === requestId);
    if (!req || !studentModal) return;

    document.getElementById('manage-student-id').value = req.id;
    document.getElementById('modal-student-name').textContent = req.studentName;
    document.getElementById('modal-student-meta').textContent = `${req.studentClass} · Preferred: ${req.mentorPreference} · Contact: ${req.studentContact}`;
    document.getElementById('modal-student-query').textContent = `Query: "${req.studentQueries || 'None provided'}"`;

    // Populate Mentor Select Dropdown
    const select = document.getElementById('manage-mentor-select');
    if (select) {
      select.innerHTML = `<option value="">-- No Mentor Assigned (Pending Match) --</option>` +
        mentorsData.map(m => `
          <option value="${m.id}" ${req.assignedMentorId === m.id ? 'selected' : ''}>
            ${m.name} (${m.degree}) — ${m.categoryLabel || getCategoryLabel(m.category)}
          </option>
        `).join('');
    }

    document.getElementById('manage-status-select').value = req.status || 'pending';
    document.getElementById('manage-admin-notes').value = req.adminNotes || '';

    studentModal.classList.add('open');
  }

  if (studentModalClose) studentModalClose.addEventListener('click', () => studentModal.classList.remove('open'));
  if (studentModalCancel) studentModalCancel.addEventListener('click', () => studentModal.classList.remove('open'));

  if (studentManageForm) {
    studentManageForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('manage-student-id').value;
      const mentorSelect = document.getElementById('manage-mentor-select');
      const mentorId = mentorSelect.value || null;
      const mentorName = mentorId ? mentorSelect.options[mentorSelect.selectedIndex].text.split(' — ')[0].trim() : null;
      const status = document.getElementById('manage-status-select').value;
      const adminNotes = document.getElementById('manage-admin-notes').value;

      const payload = {
        assignedMentorId: mentorId,
        assignedMentorName: mentorName,
        status: status,
        adminNotes: adminNotes
      };

      let res = await apiPatch(`/unimates/${id}`, payload);

      if (res && res.success) {
        showToast('Student Record Updated', `${mentorName ? 'Assigned to ' + mentorName : 'Status updated.'}`);
      } else {
        // Local storage fallback
        const idx = studentsData.findIndex(s => s.id === id);
        if (idx !== -1) {
          studentsData[idx] = { ...studentsData[idx], ...payload, updatedAt: new Date().toISOString() };
          localStorage.setItem('aroham_unimates', JSON.stringify(studentsData));
        }
        showToast('Student Record Updated', `${mentorName ? 'Assigned to ' + mentorName : 'Status updated.'} (Saved locally)`);
      }

      studentModal.classList.remove('open');
      loadStudents();
      loadDashboardStats();
    });
  }

  // Export Students CSV
  const btnExportStudents = document.getElementById('btn-export-students');
  if (btnExportStudents) {
    btnExportStudents.addEventListener('click', () => {
      if (studentsData.length === 0) {
        alert('No students to export.');
        return;
      }
      let csv = 'ID,Date,Student Name,Class,Preferred Stream,Contact,Guidance Need,Status,Assigned Mentor,Admin Notes\n';
      studentsData.forEach(s => {
        csv += `"${s.id}","${s.createdAt}","${s.studentName}","${s.studentClass}","${s.mentorPreference}","${s.studentContact}","${(s.studentQueries || '').replace(/"/g, '""')}","${s.status}","${s.assignedMentorName || ''}","${(s.adminNotes || '').replace(/"/g, '""')}"\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Aroham_Students_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // ---------------- Mentors Management ----------------
  async function loadMentors() {
    const res = await apiGet('/mentors');
    if (res && res.mentors) {
      mentorsData = res.mentors;
      localStorage.setItem('aroham_mentors', JSON.stringify(mentorsData));
    } else {
      // Offline fallback: load cached data or defaults
      try {
        const cached = localStorage.getItem('aroham_mentors');
        mentorsData = cached ? JSON.parse(cached) : [...DEFAULT_MENTORS];
        if (!cached) localStorage.setItem('aroham_mentors', JSON.stringify(DEFAULT_MENTORS));
      } catch (e) {
        mentorsData = [...DEFAULT_MENTORS];
      }
    }

    renderMentorsGrid();
    updateStreamCounts();
  }

  function updateStreamCounts() {
    const med = mentorsData.filter(m => m.category === 'medicine').length;
    const sci = mentorsData.filter(m => m.category === 'sciences').length;
    const eng = mentorsData.filter(m => m.category === 'engineering').length;
    const des = mentorsData.filter(m => m.category === 'design').length;
    const lan = mentorsData.filter(m => m.category === 'humanities').length;

    const elMed = document.getElementById('count-med');
    const elSci = document.getElementById('count-sci');
    const elEng = document.getElementById('count-eng');
    const elDes = document.getElementById('count-design');
    const elLan = document.getElementById('count-lang');

    if (elMed) elMed.textContent = `${med} Mentors`;
    if (elSci) elSci.textContent = `${sci} Mentors`;
    if (elEng) elEng.textContent = `${eng} Mentors`;
    if (elDes) elDes.textContent = `${des} Mentors`;
    if (elLan) elLan.textContent = `${lan} Mentors`;
  }

  function renderMentorsGrid() {
    const container = document.getElementById('mentors-cards-container');
    if (!container) return;

    const q = mentorSearchQuery.toLowerCase().trim();
    const filtered = mentorsData.filter(m => {
      const matchesCategory = activeMentorCategory === 'all' || m.category === activeMentorCategory;
      const matchesSearch = !q ||
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.degree && m.degree.toLowerCase().includes(q)) ||
        (m.categoryLabel && m.categoryLabel.toLowerCase().includes(q)) ||
        (m.focusAreas && m.focusAreas.some(tag => tag.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted); background: #FFF; border-radius: var(--radius-md);">
          No mentors found matching your filters. Click <strong>+ Add New Mentor</strong> to register one.
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(m => {
      const initials = (m.name || 'M').split(' ').map(n => n[0]).join('').substring(0, 2);
      const tags = (m.focusAreas || []).map(t => `<span class="tag-badge">${t}</span>`).join('');
      const catLabel = m.categoryLabel || getCategoryLabel(m.category);
      return `
        <div class="mentor-admin-card" data-mentor-id="${m.id}">
          <div class="mentor-card-top">
            <div class="mentor-avatar">${initials}</div>
            <div class="mentor-info">
              <h4>${m.name}</h4>
              <div class="degree-tag">${m.degree} · ${catLabel}</div>
            </div>
          </div>
          <div class="mentor-role-meta">${m.summitRole || 'EduWay Career Mentor'}</div>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">${m.bio || ''}</p>
          <div class="mentor-tags">${tags}</div>
          <div class="mentor-card-actions">
            <button class="btn btn-outline btn-sm" data-action-edit-mentor="${m.id}">Edit</button>
            <button class="btn btn-outline btn-sm" style="color: #EF4444;" data-action-delete-mentor="${m.id}">Delete</button>
          </div>
        </div>
      `;
    }).join('');

    // Attach Edit & Delete Listeners
    container.querySelectorAll('[data-action-edit-mentor]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-action-edit-mentor');
        openEditMentorModal(id);
      });
    });

    container.querySelectorAll('[data-action-delete-mentor]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-action-delete-mentor');
        const mentor = mentorsData.find(m => m.id === id);
        if (confirm(`Are you sure you want to delete ${mentor ? mentor.name : 'this mentor'} from the directory?`)) {
          let res = await apiDelete(`/mentors/${id}`);
          if (res && res.success) {
            showToast('Mentor Removed', `${mentor ? mentor.name : 'Mentor'} has been deleted.`);
          } else {
            // Local storage fallback delete
            mentorsData = mentorsData.filter(m => m.id !== id);
            localStorage.setItem('aroham_mentors', JSON.stringify(mentorsData));
            showToast('Mentor Removed', `${mentor ? mentor.name : 'Mentor'} removed from local directory.`);
          }
          loadMentors();
          loadDashboardStats();
        }
      });
    });
  }

  // Filter Pills for Mentors View
  document.querySelectorAll('[data-mentor-category]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('[data-mentor-category]').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeMentorCategory = pill.getAttribute('data-mentor-category');
      renderMentorsGrid();
    });
  });

  const mentorsSearchInput = document.getElementById('mentors-search-input');
  if (mentorsSearchInput) {
    mentorsSearchInput.addEventListener('input', (e) => {
      mentorSearchQuery = e.target.value;
      renderMentorsGrid();
    });
  }

  // Mentor Add / Edit Modal Controls
  function openAddMentorModal() {
    if (!mentorForm || !mentorModal) return;
    mentorForm.reset();
    mentorIdInput.value = '';
    mentorModalTitle.textContent = 'Add New Mentor Profile';
    const submitBtn = document.getElementById('mentor-submit-btn');
    if (submitBtn) submitBtn.textContent = 'Add Mentor to Network';
    mentorModal.classList.add('open');
  }

  function openEditMentorModal(id) {
    const m = mentorsData.find(item => item.id === id);
    if (!m || !mentorModal) return;

    mentorIdInput.value = m.id;
    mentorModalTitle.textContent = `Edit Mentor: ${m.name}`;
    document.getElementById('m-name').value = m.name || '';
    document.getElementById('m-degree').value = m.degree || '';
    document.getElementById('m-category').value = m.category || 'sciences';
    document.getElementById('m-role').value = m.summitRole || '';
    document.getElementById('m-tags').value = (m.focusAreas || []).join(', ');
    document.getElementById('m-bio').value = m.bio || '';
    document.getElementById('m-status').value = m.status || 'active';
    const submitBtn = document.getElementById('mentor-submit-btn');
    if (submitBtn) submitBtn.textContent = 'Update Profile';

    mentorModal.classList.add('open');
  }

  if (btnOpenAddMentor) btnOpenAddMentor.addEventListener('click', openAddMentorModal);
  if (btnQuickAddMentor) {
    btnQuickAddMentor.addEventListener('click', () => {
      switchView('mentors-view');
      openAddMentorModal();
    });
  }
  if (mentorModalClose) mentorModalClose.addEventListener('click', () => mentorModal.classList.remove('open'));
  if (mentorCancelBtn) mentorCancelBtn.addEventListener('click', () => mentorModal.classList.remove('open'));

  if (mentorForm) {
    mentorForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = mentorIdInput.value;
      const payload = {
        name: document.getElementById('m-name').value.trim(),
        degree: document.getElementById('m-degree').value.trim(),
        category: document.getElementById('m-category').value,
        categoryLabel: getCategoryLabel(document.getElementById('m-category').value),
        badgeClass: getBadgeClass(document.getElementById('m-category').value),
        summitRole: document.getElementById('m-role').value.trim() || 'EduWay 2026 Career Mentor',
        focusAreas: document.getElementById('m-tags').value.split(',').map(s => s.trim()).filter(Boolean),
        bio: document.getElementById('m-bio').value.trim(),
        status: document.getElementById('m-status').value || 'active'
      };

      let res = null;
      try {
        if (id) {
          res = await apiPut(`/mentors/${id}`, payload);
        } else {
          res = await apiPost('/mentors', payload);
        }
      } catch (networkErr) {
        res = { success: false, error: networkErr.message, isNetworkError: true };
      }

      if (res && res.success) {
        showToast(id ? 'Mentor Updated' : 'Mentor Added', `${payload.name} saved to network.`);
        mentorModal.classList.remove('open');
        await loadMentors();
        loadDashboardStats();
      } else {
        // Resilient Local-First Fallback: Save directly to browser storage
        try {
          let localMentors = JSON.parse(localStorage.getItem('aroham_mentors') || 'null');
          if (!localMentors || !Array.isArray(localMentors)) {
            localMentors = [...mentorsData];
          }

          if (id) {
            const idx = localMentors.findIndex(m => m.id === id);
            if (idx !== -1) {
              localMentors[idx] = {
                ...localMentors[idx],
                ...payload,
                updatedAt: new Date().toISOString()
              };
            }
          } else {
            const newMentor = {
              id: 'mentor-' + Date.now(),
              ...payload,
              createdAt: new Date().toISOString()
            };
            localMentors.unshift(newMentor);
          }

          localStorage.setItem('aroham_mentors', JSON.stringify(localMentors));
          mentorsData = localMentors;
          renderMentorsGrid();
          updateStreamCounts();
          loadDashboardStats();
          showToast(id ? 'Mentor Updated' : 'Mentor Added', `${payload.name} saved successfully (Saved in browser storage).`);
          mentorModal.classList.remove('open');
        } catch (storageErr) {
          alert('Could not save mentor: ' + storageErr.message);
        }
      }
    });
  }

  // Close modals on overlay click or Escape key
  [mentorModal, studentModal].forEach(overlay => {
    if (!overlay) return;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mentorModal) mentorModal.classList.remove('open');
      if (studentModal) studentModal.classList.remove('open');
      if (notifDropdown) notifDropdown.classList.remove('open');
    }
  });

  // ---------------- Volunteers View ----------------
  async function loadVolunteers() {
    const res = await apiGet('/volunteers');
    if (res && res.volunteers) {
      volunteersData = res.volunteers;
      localStorage.setItem('aroham_volunteers', JSON.stringify(volunteersData));
    } else {
      try {
        const cached = localStorage.getItem('aroham_volunteers');
        volunteersData = cached ? JSON.parse(cached) : [...DEFAULT_VOLUNTEERS];
      } catch (e) {
        volunteersData = [...DEFAULT_VOLUNTEERS];
      }
    }

    const tbody = document.getElementById('volunteers-table-body');
    if (!tbody) return;

    if (volunteersData.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px; color: var(--text-muted);">No volunteer registrations logged yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = volunteersData.map(v => {
      const dateStr = v.createdAt ? new Date(v.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent';
      return `
        <tr>
          <td>${dateStr}</td>
          <td><strong>${v.name}</strong></td>
          <td><span class="tag-badge">Class of ${v.batchYear || 'Alumna'}</span></td>
          <td>${v.currentProfession || '—'}</td>
          <td><a href="tel:${v.contact}" class="btn btn-outline btn-sm" style="padding: 2px 8px; font-size: 0.75rem;">📞 ${v.contact}</a></td>
          <td style="max-width: 280px; font-size: 0.82rem; color: var(--slate-700); line-height: 1.4;">${v.interest || 'General summit volunteering'}</td>
          <td><span class="status-pill completed">● ACTIVE</span></td>
        </tr>
      `;
    }).join('');
  }

  // ---------------- Contacts View ----------------
  async function loadContacts() {
    const res = await apiGet('/contact');
    if (res && res.contacts) {
      contactsData = res.contacts;
      localStorage.setItem('aroham_contacts', JSON.stringify(contactsData));
    } else {
      try {
        const cached = localStorage.getItem('aroham_contacts');
        contactsData = cached ? JSON.parse(cached) : [];
      } catch (e) {
        contactsData = [];
      }
    }

    const tbody = document.getElementById('contacts-table-body');
    if (!tbody) return;

    if (contactsData.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px; color: var(--text-muted);">No messages or inquiries logged yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = contactsData.map(c => {
      const dateStr = c.createdAt ? new Date(c.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent';
      return `
        <tr>
          <td>${dateStr}</td>
          <td><strong>${c.name}</strong></td>
          <td>${c.email || '—'}</td>
          <td>${c.phone || '—'}</td>
          <td><span class="tag-badge">${c.purpose || 'General'}</span></td>
          <td style="max-width: 320px; font-size: 0.82rem; line-height: 1.4;">${c.message || ''}</td>
          <td><span class="status-pill ${c.status === 'new' ? 'pending' : 'completed'}">${c.status || 'Received'}</span></td>
        </tr>
      `;
    }).join('');
  }

  // ---------------- Settings Handlers ----------------
  if (btnSaveSettings) {
    btnSaveSettings.addEventListener('click', () => {
      if (settingApiUrl) {
        API_BASE = settingApiUrl.value.trim().replace(/\/$/, '');
        localStorage.setItem('aroham_api_base', API_BASE);
      }
      if (settingPasscode) {
        currentPasscode = settingPasscode.value.trim();
        localStorage.setItem('aroham_admin_pass', currentPasscode);
      }
      showToast('Settings Saved', 'API endpoint and passcode updated successfully.');
      initDashboard();
    });
  }

  if (btnTestConnection) {
    btnTestConnection.addEventListener('click', async () => {
      const health = await apiGet('/health');
      if (health && health.status === 'active') {
        alert(`Success! Connected to Aroham Foundation Backend API (Version: ${health.version})\nEndpoint: ${API_BASE}`);
        updateServerStatus(true);
      } else {
        alert(`Could not connect to ${API_BASE}.\n\nThe admin console will run in offline mode using browser Local Storage.\nTo start the server, open a terminal and run: node backend/server.js`);
        updateServerStatus(false);
      }
    });
  }

  // ---------------- Master Initializer ----------------
  async function initDashboard() {
    // 1. Initial health ping
    const health = await apiGet('/health');
    updateServerStatus(Boolean(health && health.status === 'active'));

    // 2. Load all modules
    await Promise.all([
      loadMentors(),
      loadStudents(),
      loadVolunteers(),
      loadContacts(),
      pollNotifications()
    ]);

    loadDashboardStats();

    // 3. Start background polling every 5 seconds
    setInterval(() => {
      pollNotifications();
      loadDashboardStats();
    }, 5000);
  }

  // Run Auth Check
  checkAuth();
});
