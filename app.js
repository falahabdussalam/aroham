/**
 * AROHAM FOUNDATION · OFFICIAL ALUMNI PORTAL
 * Interactive Engine: Alumni Directory, Filter Tabs, Modals & Annual Report
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------- Alumni & UniMates Mentors Data Store ----------------
  const ALUMNI_DATA = [
    {
      id: 'mufeedha',
      name: 'Fathimath Mufeedha',
      degree: 'MBBS',
      university: 'Govt. Medical College',
      availability: 'Available for Mentorship',
      category: 'medicine',
      categoryLabel: 'Medicine & Healthcare',
      badgeClass: 'badge-med',
      summitRole: 'President, Aroham Foundation · UniMates Mentor',
      focusAreas: ['NEET-UG Preparation Strategy', 'MBBS Course Curriculum & Clinical Rotations', 'Medical Career Pathways & Leadership'],
      bio: 'Founding President of Aroham Foundation and MBBS scholar. Spearheads foundation initiatives, bridging the gap between higher secondary students and professional medical education.'
    },
    {
      id: 'hija',
      name: 'Fathima Hija T',
      degree: 'B.Sc. Physics',
      university: 'University of Calicut',
      availability: 'Available for Mentorship',
      category: 'sciences',
      categoryLabel: 'Pure & Applied Sciences',
      badgeClass: 'badge-sci',
      summitRole: 'Trustee, Aroham Foundation · UniMates Mentor',
      focusAreas: ['Pure Science Research & Academic Careers', 'Physics Specializations & Higher Studies', 'Higher Secondary Science Stream Mastery'],
      bio: 'Executive Trustee and Physics scholar dedicated to promoting pure sciences. Guides students passionate about fundamental research, space physics, and academic fellowships.'
    },
    {
      id: 'afifa',
      name: 'Afifa M.A',
      degree: 'B.Sc. (Hons.) Biotechnology',
      university: 'University of Calicut',
      availability: 'Available for Mentorship',
      category: 'sciences',
      categoryLabel: 'Pure & Applied Sciences',
      badgeClass: 'badge-sci',
      summitRole: 'General Secretary, Aroham Foundation · UniMates Mentor',
      focusAreas: ['Molecular Biology, Genetics & Biotechnology', 'Higher Secondary Science Stream Planning', 'Academic Leadership & Community Organizing'],
      bio: 'General Secretary of Aroham Foundation and Biotechnology scholar. Coordinates foundation operations, alumni mobilization, and one-on-one mentorship matching for school students.'
    },
    {
      id: 'farsana',
      name: 'Farsana',
      degree: 'Pharm.D (Doctor of Pharmacy)',
      university: 'Al Shifa College of Pharmacy',
      availability: 'Available for Mentorship',
      category: 'medicine',
      categoryLabel: 'Medicine & Healthcare',
      badgeClass: 'badge-med',
      summitRole: 'EduWay Career Mentor · UniMates Mentor',
      focusAreas: ['Clinical Pharmacy & Hospital Practice', 'Doctor of Pharmacy Curriculum & Career Options', 'Pharmaceutical Research & Patient Care'],
      bio: 'Graduated from Bolster Girls Campus and pursued Pharm.D (Doctor of Pharmacy). Guided Class 10–12 aspirants at EduWay 2026 on clinical pharmacy, hospital practice, and healthcare careers.'
    },
    {
      id: 'maryam',
      name: 'Maryam Beevi C.S',
      degree: 'B.Tech Computer Science',
      university: 'APJ Abdul Kalam Technological University',
      availability: 'Available for Mentorship',
      category: 'engineering',
      categoryLabel: 'Engineering & Tech',
      badgeClass: 'badge-eng',
      summitRole: 'EduWay Career Mentor · UniMates Mentor',
      focusAreas: ['KEAM / JEE Engineering Entrances', 'Core Engineering & Tech Disciplines', 'Women in Engineering & Technology'],
      bio: 'Engineering alumna who represented Aroham Foundation at the EduWay 2026 Career Summit, mentoring students on engineering branches, career options, and technical opportunities.'
    },
    {
      id: 'niya',
      name: 'Niya Fathima',
      degree: 'B.Arch (Architecture)',
      university: 'School of Architecture',
      availability: 'Available for Mentorship',
      category: 'design',
      categoryLabel: 'Architecture & Design',
      badgeClass: 'badge-design',
      summitRole: 'EduWay Career Mentor · UniMates Mentor',
      focusAreas: ['NATA & JEE Paper 2 Entrance Exams', 'Architectural Design Studios & Spatial Planning', 'Sustainable Built Environment & Interior Architecture'],
      bio: 'Architecture alumna demystifying NATA entrance preparation and architecture studies, helping students explore creative careers in spatial design and built environments.'
    },
    {
      id: 'hana',
      name: 'Hana Fathima',
      degree: 'B.A. (Hons.) Spanish',
      university: 'English and Foreign Languages University (EFLU)',
      availability: 'Available for Mentorship',
      category: 'humanities',
      categoryLabel: 'Humanities & Languages',
      badgeClass: 'badge-lang',
      summitRole: 'EduWay Career Mentor · UniMates Mentor',
      focusAreas: ['Foreign Language Degrees & Linguistics', 'Translation, International Relations & Diplomacy', 'Undergraduate Degree Admissions & Language Programs'],
      bio: 'Pioneered foreign language studies from Bolster Girls Campus alumni network. Mentors students on unconventional career paths in European languages, global diplomacy, and translation.'
    },
    {
      id: 'naqa',
      name: 'Naqa Fathima',
      degree: 'Bachelor of Design (B.Des)',
      university: 'National Institute of Design (NID)',
      availability: 'Available for Mentorship',
      category: 'design',
      categoryLabel: 'Architecture & Design',
      badgeClass: 'badge-design',
      summitRole: 'EduWay Career Mentor · UniMates Mentor',
      focusAreas: ['Design Aptitude Tests (UCEED / NID DAT / NIFT)', 'Product Design, UI/UX & Visual Communication', 'Creative Portfolio Building & Studio Culture'],
      bio: 'Design graduate guiding creative students into design industries. Mentored students at Rose Lounge, Malappuram on portfolio development and entrance preparation for creative careers.'
    },
    {
      id: 'labeeba',
      name: 'Labeeba',
      degree: 'B.Sc. Physics',
      university: 'University of Calicut',
      availability: 'Available for Mentorship',
      category: 'sciences',
      categoryLabel: 'Pure & Applied Sciences',
      badgeClass: 'badge-sci',
      summitRole: 'EduWay Career Mentor · UniMates Mentor',
      focusAreas: ['Pure Science Foundations & Physics Degrees', 'Academic Horizons & Higher Education Guidance', 'Science Curriculum Planning for Higher Secondary'],
      bio: 'Pure science scholar helping students explore career trajectories in Physics and scientific research, encouraging young women to excel in core sciences.'
    },
    {
      id: 'nuha',
      name: 'Nuha Kadija',
      degree: 'International Higher Education Scholar',
      university: 'Khalifa University, UAE',
      availability: 'Available for Mentorship',
      category: 'engineering',
      categoryLabel: 'Engineering & Tech',
      badgeClass: 'badge-eng',
      summitRole: 'GCC Guidance Speaker · UniMates Mentor',
      focusAreas: ['GCC University Admissions', 'Scholarships in UAE', 'International Student Life & STEM Research'],
      bio: 'Speaker at the GCC Higher Education Guidance Session, guiding students on university admission processes and scholarship pathways in the UAE and Gulf region.'
    }
  ];

  // ---------------- DOM References ----------------
  const alumniGrid = document.getElementById('alumni-grid');
  const searchInput = document.getElementById('alumni-search-input');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const directoryCounter = document.getElementById('directory-count');

  // Modals
  const alumniModal = document.getElementById('alumni-modal');
  const unimateModal = document.getElementById('unimate-modal');
  const volunteerModal = document.getElementById('volunteer-modal');
  const reportModal = document.getElementById('report-modal');

  // Toast
  const toast = document.getElementById('toast-notice');

  // Mobile menu
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksList = document.querySelector('.site-nav .nav-links');

  let currentCategory = 'all';
  let searchQuery = '';

  // ---------------- API Configuration & Live Sync ----------------
  const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? (window.location.port === '5000' ? '/api' : 'http://localhost:5000/api')
    : '/api';

  let liveAlumniData = [...ALUMNI_DATA];

  async function fetchLiveMentors() {
    try {
      const res = await fetch(`${API_BASE}/mentors`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.mentors && json.mentors.length > 0) {
          liveAlumniData = json.mentors;
          renderAlumni();
        }
      }
    } catch (e) {
      // Offline fallback: retains initial ALUMNI_DATA
    }
  }

  // ---------------- Render UniMates Mentor Cards ----------------
  function renderAlumni() {
    if (!alumniGrid) return;

    const filtered = liveAlumniData.filter(person => {
      const matchesCategory = currentCategory === 'all' || person.category === currentCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        person.name.toLowerCase().includes(q) ||
        person.degree.toLowerCase().includes(q) ||
        (person.university && person.university.toLowerCase().includes(q)) ||
        (person.categoryLabel && person.categoryLabel.toLowerCase().includes(q)) ||
        (person.focusAreas && person.focusAreas.some(area => area.toLowerCase().includes(q)));
      
      return matchesCategory && matchesSearch;
    });

    // Update Counter
    if (directoryCounter) {
      directoryCounter.textContent = `Showing ${filtered.length} of ${liveAlumniData.length} mentors`;
    }

    // Filter transition
    alumniGrid.style.opacity = '0.6';

    setTimeout(() => {
      if (filtered.length === 0) {
        alumniGrid.innerHTML = `
          <div class="alumni-empty-state">
            <svg style="margin: 0 auto 12px; width: 36px; height: 36px; color: var(--slate-400);" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <h4 style="font-size: 1.1rem; color: #FFFFFF; margin-bottom: 4px;">No mentors found</h4>
            <p style="font-size: 0.85rem; color: #94A3B8;">Try searching for a different mentor name or course/major (e.g. MBBS, Physics, Biotechnology, B.Tech, B.Arch).</p>
          </div>
        `;
        alumniGrid.style.opacity = '1';
        return;
      }

      alumniGrid.innerHTML = filtered.map(person => {
        const initials = person.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        return `
          <article class="alumni-card" data-id="${person.id}">
            <div class="alumni-top">
              <span class="alumni-badge-pill ${person.badgeClass || 'badge-pine'}">${person.categoryLabel || 'UniMates Mentor'}</span>
              <div class="alumni-avatar-circle">${initials}</div>
            </div>
            <h3 class="alumni-name">${person.name}</h3>
            <div class="alumni-degree">${person.degree}</div>
            <div class="alumni-university">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="flex-shrink:0;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <span>${person.university || 'University of Calicut'}</span>
            </div>
            <div class="alumni-availability-badge">
              <span class="availability-dot"></span>
              <span>${person.availability || 'Available for Mentorship'}</span>
            </div>
            <div class="alumni-footer-meta">
              <span>${person.summitRole || 'UniMates Mentor'}</span>
              <span class="alumni-action-link">
                View Profile
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div>
          </article>
        `;
      }).join('');

      // Attach click events
      alumniGrid.querySelectorAll('.alumni-card').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.getAttribute('data-id');
          openAlumniDetailModal(id);
        });
      });

      alumniGrid.style.opacity = '1';
      window.dispatchEvent(new CustomEvent('aroham:alumni-rendered'));
    }, 120);
  }

  // ---------------- Modal Handling ----------------
  function openAlumniDetailModal(id) {
    const person = liveAlumniData.find(p => p.id === id);
    if (!person || !alumniModal) return;

    const modalBody = alumniModal.querySelector('#alumni-modal-content');
    if (!modalBody) return;

    const initials = person.name.split(' ').map(n => n[0]).join('').substring(0, 2);

    modalBody.innerHTML = `
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
        <div class="member-avatar" style="width: 60px; height: 60px; font-size: 1.2rem; background: rgba(45, 212, 191, 0.15); color: #2DD4BF;">${initials}</div>
        <div>
          <div class="alumni-badge-pill ${person.badgeClass}" style="margin-bottom: 6px; display: inline-block;">${person.categoryLabel}</div>
          <h3 style="font-size: 1.35rem; color: #FFFFFF; font-weight: 700;">${person.name}</h3>
          <div style="font-size: 0.95rem; font-weight: 600; color: #2DD4BF;">${person.degree}</div>
          <div style="font-size: 0.85rem; color: #DF9C2C; margin-top: 2px;">${person.university || 'University of Calicut'}</div>
        </div>
      </div>

      <div style="background: rgba(14, 27, 23, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <div>
          <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: #DF9C2C; font-weight: 700;">Role & Mentorship</div>
          <div style="font-size: 0.9rem; font-weight: 600; color: #E2E8F0;">${person.summitRole}</div>
        </div>
        <div class="alumni-availability-badge" style="margin: 0;">
          <span class="availability-dot"></span>
          <span>${person.availability || 'Available for Mentorship'}</span>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #2DD4BF; font-weight: 700; margin-bottom: 8px;">About the Alumna & Mentorship Journey</h4>
        <p style="font-size: 0.9rem; color: #CBD5E1; line-height: 1.65;">${person.bio}</p>
      </div>

      <div style="margin-bottom: 12px;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #2DD4BF; font-weight: 700; margin-bottom: 10px;">Primary Guidance & Mentorship Areas</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; padding: 0;">
          ${person.focusAreas.map(area => `
            <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.88rem; color: #E2E8F0;">
              <svg style="width: 16px; height: 16px; color: #2DD4BF; flex-shrink: 0; margin-top: 2px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
              <span>${area}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    // Connect button action in modal
    const requestBtn = alumniModal.querySelector('#modal-request-guidance-btn');
    if (requestBtn) {
      requestBtn.onclick = () => {
        closeModal(alumniModal);
        openUnimateModalWithPref(person.name, person.degree);
      };
    }

    openModal(alumniModal);
  }

  function openUnimateModalWithPref(mentorName = '', stream = '') {
    if (!unimateModal) return;
    const prefInput = unimateModal.querySelector('#mentor-preference-input');
    if (prefInput && mentorName) {
      prefInput.value = `${mentorName} (${stream})`;
    }
    openModal(unimateModal);
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Close handlers
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('.modal-close-btn') || e.target.closest('.modal-dismiss-btn')) {
        closeModal(modal);
      }
    });
  });

  // ESC key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m));
    }
  });

  // ---------------- Filter Tab Clicks ----------------
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      renderAlumni();
    });
  });

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderAlumni();
    });
  }

  // ---------------- Trigger Buttons for Modals ----------------
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) openModal(targetModal);
    });
  });

  // ---------------- Form Submissions & Live Backend Sync ----------------
  const unimateForm = document.getElementById('unimate-form');
  if (unimateForm) {
    unimateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const studentName = document.getElementById('student-name')?.value || 'Student';
      const studentClass = document.getElementById('student-class')?.value || 'Class 12';
      const mentorPreference = document.getElementById('mentor-preference-input')?.value || 'General Mentorship';
      const studentContact = document.getElementById('student-contact')?.value || '';
      const studentQueries = document.getElementById('student-queries')?.value || '';

      const submitBtn = unimateForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }

      const payload = {
        studentName,
        studentClass,
        mentorPreference,
        studentContact,
        studentQueries
      };

      try {
        const res = await fetch(`${API_BASE}/unimates/request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const json = await res.json();
          showToast(json.message || `Thank you, ${studentName}! Your mentorship request has been received.`);
        } else {
          showToast(`Thank you, ${studentName}! Your mentorship request has been received. Our UniMates coordinator will connect with you.`);
        }
      } catch (err) {
        // Fallback: save to localStorage for offline resilience
        try {
          const offlineRequests = JSON.parse(localStorage.getItem('aroham_offline_requests') || '[]');
          offlineRequests.push({ ...payload, id: 'req-' + Date.now(), createdAt: new Date().toISOString() });
          localStorage.setItem('aroham_offline_requests', JSON.stringify(offlineRequests));
        } catch (e) {}
        showToast(`Thank you, ${studentName}! Your mentorship request has been received. Our UniMates coordinator will connect with you.`);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Mentorship Request';
        }
        closeModal(unimateModal);
        unimateForm.reset();
      }
    });
  }

  const volunteerForm = document.getElementById('volunteer-form');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const alumnaName = document.getElementById('vol-name')?.value || 'Alumna';
      const volBatch = document.getElementById('vol-batch')?.value || '';
      const volProfession = document.getElementById('vol-profession')?.value || '';
      const volContact = document.getElementById('vol-contact')?.value || '';
      const volInterest = document.getElementById('vol-interest')?.value || '';

      try {
        await fetch(`${API_BASE}/volunteers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: alumnaName,
            batchYear: volBatch,
            currentProfession: volProfession,
            contact: volContact,
            interest: volInterest
          })
        });
      } catch (err) {}

      closeModal(volunteerModal);
      volunteerForm.reset();
      showToast(`Welcome to the Aroham Volunteer Network, ${alumnaName}! The Executive Committee will be in touch shortly.`);
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const senderName = document.getElementById('contact-name')?.value || 'Friend';
      const senderEmail = document.getElementById('contact-email')?.value || '';
      const senderPhone = document.getElementById('contact-phone')?.value || '';
      const senderPurpose = document.getElementById('contact-subject')?.value || document.getElementById('contact-category')?.value || '';
      const senderMessage = document.getElementById('contact-message')?.value || '';

      try {
        await fetch(`${API_BASE}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: senderName,
            email: senderEmail,
            phone: senderPhone,
            purpose: senderPurpose,
            message: senderMessage
          })
        });
      } catch (err) {}

      contactForm.reset();
      showToast(`Thank you, ${senderName}! Your message has been sent to Aroham Foundation. We will respond shortly.`);
    });
  }

  // ---------------- Toast Display ----------------
  function showToast(message) {
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-message');
    if (msgEl) msgEl.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // ---------------- Mobile Menu Navigation (Pull-Down & Toggle) ----------------
  const navBackdrop = document.getElementById('nav-mobile-backdrop');

  const closeMobileMenu = () => {
    if (navLinksList && navLinksList.classList.contains('open')) {
      navLinksList.classList.remove('open');
      if (mobileToggle) mobileToggle.classList.remove('active');
      if (navBackdrop) navBackdrop.classList.remove('open');
    }
  };

  const openMobileMenu = () => {
    if (navLinksList) {
      navLinksList.classList.add('open');
      if (mobileToggle) mobileToggle.classList.add('active');
      if (navBackdrop) navBackdrop.classList.add('open');
    }
  };

  if (mobileToggle && navLinksList) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !navLinksList.classList.contains('open');
      if (willOpen) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!navLinksList.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  // ==========================================================================
  // Standard Smooth Scroll Navigation
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      if (targetId === '#top' || targetId === '#hero') {
        e.preventDefault();

        // Immediate active class update
        document.querySelectorAll('.nav-links .nav-link').forEach(l => l.classList.remove('active'));
        const homeLink = document.querySelector('.nav-links a[href="#hero"]') || document.querySelector('.nav-links a[href="#top"]');
        if (homeLink) homeLink.classList.add('active');

        // Close mobile drawer if open
        closeMobileMenu();

        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();

        // Immediate active class update
        document.querySelectorAll('.nav-links .nav-link').forEach(l => l.classList.remove('active'));
        if (this.classList.contains('nav-link')) {
          this.classList.add('active');
        }

        // Close mobile drawer if open
        closeMobileMenu();

        // Calculate smooth scroll offset (navbar height: 60px + 24px buffer = 84px)
        const headerOffset = 84;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---------------- Hero Campus Showcase Video Controller ----------------
  const mainVideo = document.getElementById('hero-main-video');
  const playBtn = document.getElementById('video-play-toggle');
  const soundBtn = document.getElementById('video-sound-toggle');
  const fullscreenBtn = document.getElementById('video-fullscreen-btn');
  const videoContainer = document.getElementById('hero-video-container');

  if (mainVideo) {
    // Attempt instant autoplay (muted is standard for browser autoplay compliance)
    const playPromise = mainVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay prevented by browser: wait for first interaction
        const startOnUserAction = () => {
          mainVideo.play().catch(() => {});
          window.removeEventListener('click', startOnUserAction);
          window.removeEventListener('scroll', startOnUserAction);
          window.removeEventListener('touchstart', startOnUserAction);
        };
        window.addEventListener('click', startOnUserAction, { once: true });
        window.addEventListener('scroll', startOnUserAction, { once: true });
        window.addEventListener('touchstart', startOnUserAction, { once: true });
      });
    }

    // Play / Pause Toggle
    const updatePlayStateUI = () => {
      if (!playBtn) return;
      const iconPause = playBtn.querySelector('.icon-pause');
      const iconPlay = playBtn.querySelector('.icon-play');
      if (mainVideo.paused) {
        if (iconPause) iconPause.style.display = 'none';
        if (iconPlay) iconPlay.style.display = 'block';
        playBtn.setAttribute('title', 'Play');
      } else {
        if (iconPause) iconPause.style.display = 'block';
        if (iconPlay) iconPlay.style.display = 'none';
        playBtn.setAttribute('title', 'Pause');
      }
    };

    mainVideo.addEventListener('play', updatePlayStateUI);
    mainVideo.addEventListener('pause', updatePlayStateUI);

    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mainVideo.paused) {
          mainVideo.play();
        } else {
          mainVideo.pause();
        }
      });
    }

    // Click on video to toggle play / pause
    mainVideo.addEventListener('click', () => {
      if (mainVideo.paused) {
        mainVideo.play();
      } else {
        mainVideo.pause();
      }
    });

    // Sound Toggle (Mute / Unmute)
    if (soundBtn) {
      soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mainVideo.muted = !mainVideo.muted;

        const iconMuted = soundBtn.querySelector('.icon-muted');
        const iconUnmuted = soundBtn.querySelector('.icon-unmuted');
        const label = soundBtn.querySelector('.vid-ctrl-label');

        if (mainVideo.muted) {
          if (iconMuted) iconMuted.style.display = 'block';
          if (iconUnmuted) iconUnmuted.style.display = 'none';
          if (label) label.textContent = 'Muted';
        } else {
          if (iconMuted) iconMuted.style.display = 'none';
          if (iconUnmuted) iconUnmuted.style.display = 'block';
          if (label) label.textContent = 'Sound On';
          showToast('Campus video audio enabled.');
        }
      });
    }

    // Fullscreen Toggle
    if (fullscreenBtn && videoContainer) {
      fullscreenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
          if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
          } else if (videoContainer.webkitRequestFullscreen) {
            videoContainer.webkitRequestFullscreen();
          } else if (mainVideo.webkitEnterFullscreen) {
            mainVideo.webkitEnterFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      });
    }
  }

  // ---------------- Standard Scroll Spy for Header Navigation ----------------
  const sections = document.querySelectorAll('section[id], .about-subsection[id], .unimates-subsection[id], #upcoming-events, #past-events, #aroham-unimates, #unimates-mentors, #register-mentor, #register-mentee');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  const updateActiveNavOnScroll = () => {
    let current = '';
    const scrollY = window.pageYOffset;

    if (scrollY < 180) {
      current = 'hero';
    } else {
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
    }

    if (current) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isAboutFamily = (['about', 'story', 'our-story', 'team', 'our-team', 'mission', 'vision'].includes(current)) && href === '#about';
        const isEventsFamily = (['events', 'upcoming-events', 'past-events'].includes(current)) && href === '#events';
        const isUnimatesFamily = (['unimates', 'aroham-unimates', 'unimates-mentors', 'mentors', 'register-mentor', 'register-mentee', 'unimates-join'].includes(current)) && href === '#unimates';
        const isMatch = href === `#${current}` || (current === 'hero' && (href === '#hero' || href === '#top')) || isAboutFamily || isEventsFamily || isUnimatesFamily;
        link.classList.toggle('active', isMatch);
      });
    }
  };

  window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });
  updateActiveNavOnScroll();

  // ---------------- Dropdown Toggle Handlers (Mobile & Touch) ----------------
  const dropdownWrappers = document.querySelectorAll('.nav-dropdown-wrapper');

  dropdownWrappers.forEach(wrapper => {
    const toggle = wrapper.querySelector('.nav-dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
          if (!wrapper.classList.contains('open')) {
            e.preventDefault();
            // Close other dropdowns
            dropdownWrappers.forEach(w => {
              if (w !== wrapper) {
                w.classList.remove('open');
                const t = w.querySelector('.nav-dropdown-toggle');
                if (t) t.setAttribute('aria-expanded', 'false');
              }
            });
            wrapper.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
          }
        }
      });
    }
  });

  document.addEventListener('click', (e) => {
    dropdownWrappers.forEach(wrapper => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('open');
        const toggle = wrapper.querySelector('.nav-dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ==========================================================================
  // SCROLL POPUP ANIMATION ENGINE (GPU Accelerated IntersectionObserver)
  // ==========================================================================
  function initScrollPopupEngine() {
    const selectorList = [
      '.section-header-block',
      '.pillar-card',
      '.committee-member-card',
      '.bearer-card',
      '.trustee-card',
      '.advisor-card',
      '.support-team-card',
      '.alumni-card',
      '.initiative-card',
      '.timeline-item',
      '.impact-stat-card',
      '.reflection-panel',
      '.goal-card',
      '.gratitude-box',
      '.contact-info-card',
      '.contact-form-card',
      '.campus-video-container',
      '.campus-highlights-bar',
      '.campus-showcase-header',
      '.directory-controls',
      '.site-footer .footer-top > div',
      '.highlight-feature-card',
      '.story-paragraph',
      '.story-milestone-highlight',
      '.upcoming-events-card',
      '.past-event-card',
      '.unimates-narrative-card',
      '.unimates-milestone-card',
      '.unimates-activities-card',
      '.session-item-card',
      '.unimates-cta-card',
      '.contact-channel-card',
      '.about-subsection',
      '.unimates-subsection'
    ].join(',');

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    };

    const popupObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    function registerPopupElements(container = document) {
      const elements = container.querySelectorAll(selectorList);
      elements.forEach(el => {
        if (!el.classList.contains('scroll-popup')) {
          el.classList.add('scroll-popup');
          
          // Immediate reveal if already in initial viewport
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('is-visible');
          } else {
            popupObserver.observe(el);
          }
        }
      });
    }

    // Register initial DOM elements
    registerPopupElements();

    // Hook into dynamic renders (e.g., when alumni cards are filtered/rendered)
    window.addEventListener('aroham:alumni-rendered', () => {
      registerPopupElements();
    });
  }

  initScrollPopupEngine();

  // Initial Render & Live Sync
  renderAlumni();
  fetchLiveMentors();
});

