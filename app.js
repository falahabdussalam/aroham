/**
 * AROHAM FOUNDATION · OFFICIAL ALUMNI PORTAL
 * Interactive Engine: Alumni Directory, Filter Tabs, Modals & Annual Report
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------- Alumni Data Store ----------------
  const ALUMNI_DATA = [
    {
      id: 'mufeedha',
      name: 'Fathimath Mufeedha',
      degree: 'MBBS',
      category: 'medicine',
      categoryLabel: 'Medicine & Healthcare',
      badgeClass: 'badge-med',
      summitRole: 'President, Aroham Foundation · EduWay 2026 Mentor',
      focusAreas: ['NEET-UG Preparation Strategy', 'MBBS Course Curriculum & Clinical Rotations', 'Medical Career Pathways & Leadership'],
      bio: 'Founding President of Aroham Foundation and MBBS scholar. Spearheads foundation initiatives, bridging the gap between higher secondary students and professional medical education.'
    },
    {
      id: 'hija',
      name: 'Fathima Hija T',
      degree: 'B.Sc. Physics',
      category: 'sciences',
      categoryLabel: 'Pure & Applied Sciences',
      badgeClass: 'badge-sci',
      summitRole: 'Trustee, Aroham Foundation · EduWay 2026 Mentor',
      focusAreas: ['Pure Science Research & Academic Careers', 'Physics Specializations & Higher Studies', 'Higher Secondary Science Stream Mastery'],
      bio: 'Executive Trustee and Physics scholar dedicated to promoting pure sciences. Guides students passionate about fundamental research, space physics, and academic fellowships.'
    },
    {
      id: 'afifa',
      name: 'Afifa M.A',
      degree: 'B.Sc. (Hons.) Biotechnology',
      category: 'sciences',
      categoryLabel: 'Pure & Applied Sciences',
      badgeClass: 'badge-sci',
      summitRole: 'General Secretary, Aroham Foundation · EduWay Mentor',
      focusAreas: ['Molecular Biology, Genetics & Biotechnology', 'Higher Secondary Science Stream Planning', 'Academic Leadership & Community Organizing'],
      bio: 'General Secretary of Aroham Foundation and Biotechnology scholar. Coordinates foundation operations, alumni mobilization, and one-on-one mentorship matching for school students.'
    },
    {
      id: 'farsana',
      name: 'Farsana',
      degree: 'Pharm.D',
      category: 'medicine',
      categoryLabel: 'Medicine & Healthcare',
      badgeClass: 'badge-med',
      summitRole: 'EduWay 2026 Career Mentor',
      focusAreas: ['Clinical Pharmacy & Hospital Practice', 'Doctor of Pharmacy Curriculum & Career Options', 'Pharmaceutical Research & Patient Care'],
      bio: 'Graduated from Bolster Girls Campus and pursued Pharm.D (Doctor of Pharmacy). Guided Class 10–12 aspirants at EduWay 2026 on clinical pharmacy, hospital practice, and healthcare careers.'
    },
    {
      id: 'maryam',
      name: 'Maryam Beevi C.S',
      degree: 'B.Tech',
      category: 'engineering',
      categoryLabel: 'Engineering & Tech',
      badgeClass: 'badge-eng',
      summitRole: 'EduWay 2026 Career Mentor',
      focusAreas: ['KEAM / JEE Engineering Entrances', 'Core Engineering & Tech Disciplines', 'Women in Engineering & Technology'],
      bio: 'Engineering alumna who represented Aroham Foundation at the EduWay 2026 Career Summit, mentoring students on engineering branches, career options, and technical opportunities.'
    },
    {
      id: 'niya',
      name: 'Niya Fathima',
      degree: 'B.Arch',
      category: 'design',
      categoryLabel: 'Architecture & Design',
      badgeClass: 'badge-design',
      summitRole: 'EduWay 2026 Career Mentor',
      focusAreas: ['NATA & JEE Paper 2 Entrance Exams', 'Architectural Design Studios & Spatial Planning', 'Sustainable Built Environment & Interior Architecture'],
      bio: 'Architecture alumna demystifying NATA entrance preparation and architecture studies, helping students explore creative careers in spatial design and built environments.'
    },
    {
      id: 'hana',
      name: 'Hana Fathima',
      degree: 'B.A. (Hons.) Spanish',
      category: 'humanities',
      categoryLabel: 'Humanities & Languages',
      badgeClass: 'badge-lang',
      summitRole: 'EduWay 2026 Career Mentor',
      focusAreas: ['Foreign Language Degrees & Linguistics', 'Translation, International Relations & Diplomacy', 'Undergraduate Degree Admissions & Language Programs'],
      bio: 'Pioneered foreign language studies from Bolster Girls Campus alumni network. Mentors students on unconventional career paths in European languages, global diplomacy, and translation.'
    },
    {
      id: 'naqa',
      name: 'Naqa Fathima',
      degree: 'Bachelor of Design',
      category: 'design',
      categoryLabel: 'Architecture & Design',
      badgeClass: 'badge-design',
      summitRole: 'EduWay 2026 Career Mentor',
      focusAreas: ['Design Aptitude Tests (UCEED / NID DAT / NIFT)', 'Product Design, UI/UX & Visual Communication', 'Creative Portfolio Building & Studio Culture'],
      bio: 'Design graduate guiding creative students into design industries. Mentored students at Rose Lounge, Malappuram on portfolio development and entrance preparation for creative careers.'
    },
    {
      id: 'labeeba',
      name: 'Labeeba',
      degree: 'B.Sc. Physics',
      category: 'sciences',
      categoryLabel: 'Pure & Applied Sciences',
      badgeClass: 'badge-sci',
      summitRole: 'EduWay 2026 Career Mentor',
      focusAreas: ['Pure Science Foundations & Physics Degrees', 'Academic Horizons & Higher Education Guidance', 'Science Curriculum Planning for Higher Secondary'],
      bio: 'Pure science scholar helping students explore career trajectories in Physics and scientific research, encouraging young women to excel in core sciences.'
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

  // ---------------- Render Alumni Cards ----------------
  function renderAlumni() {
    if (!alumniGrid) return;

    const filtered = ALUMNI_DATA.filter(person => {
      const matchesCategory = currentCategory === 'all' || person.category === currentCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        person.name.toLowerCase().includes(q) ||
        person.degree.toLowerCase().includes(q) ||
        person.categoryLabel.toLowerCase().includes(q) ||
        person.focusAreas.some(area => area.toLowerCase().includes(q));
      
      return matchesCategory && matchesSearch;
    });

    // Update Counter
    if (directoryCounter) {
      directoryCounter.textContent = `Showing ${filtered.length} of ${ALUMNI_DATA.length} mentors & achievers`;
    }

    // Digital filter transition animation
    alumniGrid.classList.add('digital-filter-transition');

    setTimeout(() => {
      if (filtered.length === 0) {
        alumniGrid.innerHTML = `
          <div class="alumni-empty-state">
            <svg style="margin: 0 auto 12px; width: 36px; height: 36px; color: var(--slate-400);" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <h4 style="font-size: 1.1rem; color: var(--pine-900); margin-bottom: 4px;">No alumni found</h4>
            <p style="font-size: 0.85rem; color: var(--slate-600);">Try searching for a different name or academic stream (e.g. MBBS, Physics, Design, B.Arch).</p>
          </div>
        `;
        alumniGrid.classList.remove('digital-filter-transition');
        return;
      }

      alumniGrid.innerHTML = filtered.map(person => {
        const initials = person.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        return `
          <article class="alumni-card digital-reveal-card" data-id="${person.id}">
            <div class="alumni-top">
              <span class="alumni-badge-pill ${person.badgeClass}">${person.categoryLabel}</span>
              <div class="alumni-avatar-circle">${initials}</div>
            </div>
            <h3 class="alumni-name">${person.name}</h3>
            <div class="alumni-degree">${person.degree}</div>
            <div class="alumni-footer-meta">
              <span>${person.summitRole}</span>
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

      // Attach click events and digital stagger
      alumniGrid.querySelectorAll('.alumni-card').forEach((card, idx) => {
        card.style.transitionDelay = `${(idx % 6) * 55}ms`;
        card.addEventListener('click', () => {
          const id = card.getAttribute('data-id');
          openAlumniDetailModal(id);
        });
      });

      alumniGrid.classList.remove('digital-filter-transition');
    }, 90);
  }

  // ---------------- Modal Handling ----------------
  function openAlumniDetailModal(id) {
    const person = ALUMNI_DATA.find(p => p.id === id);
    if (!person || !alumniModal) return;

    const modalBody = alumniModal.querySelector('#alumni-modal-content');
    if (!modalBody) return;

    const initials = person.name.split(' ').map(n => n[0]).join('').substring(0, 2);

    modalBody.innerHTML = `
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
        <div class="member-avatar" style="width: 60px; height: 60px; font-size: 1.2rem;">${initials}</div>
        <div>
          <div class="alumni-badge-pill ${person.badgeClass}" style="margin-bottom: 6px; display: inline-block;">${person.categoryLabel}</div>
          <h3 style="font-size: 1.35rem; color: var(--pine-900); font-weight: 600;">${person.name}</h3>
          <div style="font-size: 0.95rem; font-weight: 600; color: var(--pine-800);">${person.degree}</div>
        </div>
      </div>

      <div style="background-color: var(--bg-page); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px 16px; margin-bottom: 20px;">
        <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ochre-600); font-weight: 600; margin-bottom: 4px;">Role & Mentorship</div>
        <div style="font-size: 0.92rem; font-weight: 500; color: var(--pine-900);">${person.summitRole}</div>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--pine-900); font-weight: 600; margin-bottom: 8px;">About the Alumna & Mentorship Journey</h4>
        <p style="font-size: 0.9rem; color: var(--slate-700); line-height: 1.6;">${person.bio}</p>
      </div>

      <div style="margin-bottom: 12px;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--pine-900); font-weight: 600; margin-bottom: 10px;">Primary Guidance & Mentorship Areas</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
          ${person.focusAreas.map(area => `
            <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.88rem; color: var(--slate-700);">
              <svg style="width: 16px; height: 16px; color: var(--pine-800); flex-shrink: 0; margin-top: 2px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

  // ---------------- Form Submissions (Simulated Client Handling) ----------------
  const unimateForm = document.getElementById('unimate-form');
  if (unimateForm) {
    unimateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const studentName = document.getElementById('student-name')?.value || 'Student';
      closeModal(unimateModal);
      unimateForm.reset();
      showToast(`Thank you, ${studentName}! Your mentorship request has been received. Our UniMates coordinator will connect with you.`);
    });
  }

  const volunteerForm = document.getElementById('volunteer-form');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const alumnaName = document.getElementById('vol-name')?.value || 'Alumna';
      closeModal(volunteerModal);
      volunteerForm.reset();
      showToast(`Welcome to the Aroham Volunteer Network, ${alumnaName}! The Executive Committee will be in touch shortly.`);
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
  if (mobileToggle && navLinksList) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinksList.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!navLinksList.contains(e.target) && !mobileToggle.contains(e.target)) {
        if (navLinksList.classList.contains('open')) {
          navLinksList.classList.remove('open');
          mobileToggle.classList.remove('active');
        }
      }
    });
  }

  // ==========================================================================
  // Digital Page & Section Animation Engine
  // ==========================================================================
  const digitalBeam = document.getElementById('digital-page-beam');

  function triggerDigitalPageBeam() {
    if (!digitalBeam) return;
    digitalBeam.classList.remove('active');
    void digitalBeam.offsetWidth; // Force reflow to replay CSS keyframe
    digitalBeam.classList.add('active');
    setTimeout(() => {
      digitalBeam.classList.remove('active');
    }, 850);
  }

  // Inject digital scan sweeps and setup entrance classes for each section
  const allSections = document.querySelectorAll('section');
  allSections.forEach(section => {
    if (!section.querySelector('.section-digital-sweep')) {
      const sweep = document.createElement('div');
      sweep.className = 'section-digital-sweep';
      sweep.setAttribute('aria-hidden', 'true');
      section.prepend(sweep);
    }

    const header = section.querySelector('.section-header-block');
    if (header) {
      header.classList.add('digital-reveal-header');
    }

    const cards = section.querySelectorAll(
      '.committee-member-card, .advisor-card, .alumni-card, .initiative-card, .timeline-card, .goal-card, .pillar-card'
    );
    cards.forEach((card, idx) => {
      card.classList.add('digital-reveal-card');
      card.style.transitionDelay = `${(idx % 6) * 65}ms`;
    });
  });

  // IntersectionObserver: Triggers digital entrance when scrolling into any section
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('digital-entered');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });

    allSections.forEach(sec => sectionObserver.observe(sec));
  } else {
    allSections.forEach(sec => sec.classList.add('digital-entered'));
  }

  // Smooth Scroll Navigation with Digital Beam Sweep and Section Refresh
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      if (targetId === '#top') {
        e.preventDefault();
        triggerDigitalPageBeam();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();

        // 1. Digital laser beam transition
        triggerDigitalPageBeam();

        // 2. Visual tap feedback
        this.classList.add('nav-link-tapped');
        setTimeout(() => this.classList.remove('nav-link-tapped'), 280);

        // 3. Immediate active class update
        document.querySelectorAll('.nav-links .nav-link').forEach(l => l.classList.remove('active'));
        if (this.classList.contains('nav-link')) {
          this.classList.add('active');
        }

        // 4. Re-arm digital entrance effect for the target section
        targetSection.classList.remove('digital-entered');
        void targetSection.offsetWidth;
        targetSection.classList.add('digital-entered');

        // 5. Close mobile drawer smoothly if open
        if (navLinksList && navLinksList.classList.contains('open')) {
          setTimeout(() => {
            navLinksList.classList.remove('open');
            if (mobileToggle) mobileToggle.classList.remove('active');
          }, 150);
        }

        // 6. Calculate smooth scroll offset (navbar height: 72px + 12px buffer = 84px)
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

  // ---------------- Scroll Spy for Navigation Active State ----------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Initial Render
  renderAlumni();
});

