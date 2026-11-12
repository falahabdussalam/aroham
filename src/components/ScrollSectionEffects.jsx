import { useEffect } from 'react';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function buildSectionTextureMarkup(idx) {
  const flip = idx % 2 === 1;
  return `
    <svg viewBox="0 0 64 64" fill="none" stroke="var(--tex-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="tex-item tex-anim-a w-12 h-12 sm:w-16 sm:h-16 ${flip ? 'top-8 right-[4%]' : 'top-8 left-[3%]'}" style="animation-delay: 0s;">
      <rect x="10" y="10" width="44" height="44" rx="8" />
      <rect x="20" y="20" width="24" height="24" rx="4" stroke="var(--tex-accent)" stroke-dasharray="4 4" />
    </svg>

    <svg viewBox="0 0 64 64" fill="none" stroke="var(--tex-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="tex-item tex-anim-b w-12 h-12 sm:w-16 sm:h-16 ${flip ? 'top-14 left-[4%]' : 'top-12 right-[4%]'}" style="animation-delay: 0.9s;">
      <polygon points="32,8 56,52 8,52" />
      <polygon points="32,20 46,45 18,45" stroke="var(--tex-primary)" opacity="0.8" />
    </svg>

    <svg viewBox="0 0 48 48" fill="none" stroke="var(--tex-accent)" stroke-width="2"
      class="tex-item tex-anim-blink w-8 h-8 sm:w-10 sm:h-10 ${flip ? 'top-[42%] left-[2%]' : 'top-[45%] right-[2.5%]'}" style="animation-delay: 0.4s;">
      <rect x="12" y="12" width="24" height="24" rx="4" transform="rotate(45 24 24)" />
    </svg>

    <svg viewBox="0 0 48 48" fill="none" stroke="var(--tex-primary)" stroke-width="2" stroke-linejoin="round"
      class="tex-item tex-anim-blink w-8 h-8 sm:w-10 sm:h-10 ${flip ? 'top-[48%] right-[2.5%]' : 'top-[42%] left-[2%]'}" style="animation-delay: 1.7s;">
      <polygon points="24,8 40,38 8,38" fill="var(--tex-accent)" fill-opacity="0.22" />
    </svg>

    <svg viewBox="0 0 64 64" fill="none"
      class="tex-item tex-anim-blink w-10 h-10 sm:w-12 sm:h-12 ${flip ? 'bottom-10 right-[5%]' : 'bottom-10 left-[4%]'}" style="animation-delay: 1.1s;">
      <rect x="8" y="8" width="12" height="12" rx="3" stroke="var(--tex-primary)" stroke-width="2" />
      <rect x="26" y="8" width="12" height="12" rx="3" fill="var(--tex-accent)" fill-opacity="0.35" />
      <rect x="8" y="26" width="12" height="12" rx="3" fill="var(--tex-primary)" fill-opacity="0.3" />
      <rect x="26" y="26" width="12" height="12" rx="3" stroke="var(--tex-accent)" stroke-width="2" />
    </svg>

    <svg viewBox="0 0 56 56" fill="none" stroke="var(--tex-primary)" stroke-width="2" stroke-linejoin="round"
      class="tex-item tex-anim-a w-10 h-10 sm:w-14 sm:h-14 ${flip ? 'bottom-8 left-[5%]' : 'bottom-8 right-[5%]'}" style="animation-delay: 2.1s;">
      <polygon points="10,44 28,12 46,44" />
      <rect x="23" y="29" width="10" height="10" rx="2" stroke="var(--tex-accent)" />
    </svg>
  `;
}

function getSectionThemeClass(section) {
  const cls = section.className || '';
  if (cls.includes('bg-aroham-dark')) return 'theme-dark';
  if (cls.includes('bg-[#FEF3DC]')) return 'theme-orange';
  return 'theme-mint';
}

export default function ScrollSectionEffects({ activePage }) {
  useEffect(() => {
    const container = document.getElementById('page-scroll-root');
    if (!container) return;

    const sections = Array.from(container.querySelectorAll(':scope > div > section'));
    if (!sections.length) return;

    const injectedLayers = [];

    sections.forEach((sec, idx) => {
      sec.classList.add('scroll-overlay-section');
      sec.style.zIndex = String(10 + idx);

      if (!sec.querySelector(':scope > .section-texture-layer')) {
        const layer = document.createElement('div');
        layer.className = `section-texture-layer ${getSectionThemeClass(sec)}`;
        layer.setAttribute('aria-hidden', 'true');
        layer.innerHTML = buildSectionTextureMarkup(idx);
        sec.prepend(layer);
        injectedLayers.push(layer);
      }
    });

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      return () => {
        injectedLayers.forEach((layer) => layer.remove());
        sections.forEach((sec) => {
          sec.classList.remove('scroll-overlay-section');
          sec.style.zIndex = '';
        });
      };
    }

    let rafId = null;

    const update = () => {
      rafId = null;
      const vh = window.innerHeight || 800;

      sections.forEach((sec, idx) => {
        const rect = sec.getBoundingClientRect();

        // First section (Hero): starts crisp; gently recedes as next section pulls up over it
        if (idx === 0) {
          const pastRatio = rect.bottom < vh * 0.55
            ? clamp01((vh * 0.55 - rect.bottom) / (vh * 0.55))
            : 0;
          const eased = easeOutCubic(pastRatio);

          if (eased <= 0.001) {
            sec.style.transform = '';
            sec.style.opacity = '';
          } else {
            const scale = 1 - eased * 0.025;
            const y = -eased * 14;
            sec.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
            sec.style.opacity = String((1 - eased * 0.25).toFixed(3));
          }
          return;
        }

        // Subsequent sections:
        // Pull up when scrolling down; push back down when scrolling up.
        // Guaranteed 100% settled once the section's bottom is inside the viewport.
        const enterStart = vh * 1.02;
        const enterEnd = vh * 0.58;
        const rawEnter = rect.bottom <= vh + 24
          ? 1
          : clamp01((enterStart - rect.top) / (enterStart - enterEnd));
        const enterEased = easeOutCubic(rawEnter);

        // Recede smoothly when the next section below begins overlaying this one
        const exitStart = vh * 0.35;
        const exitEnd = -vh * 0.15;
        const rawExit = rect.bottom < exitStart
          ? clamp01((exitStart - rect.bottom) / (exitStart - exitEnd))
          : 0;
        const exitEased = easeOutCubic(rawExit);

        if (enterEased < 0.999) {
          const pullOffset = (1 - enterEased) * 56;
          const scale = 0.97 + enterEased * 0.03;
          const opacity = 0.18 + enterEased * 0.82;
          sec.style.transform = `translate3d(0, ${pullOffset.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
          sec.style.opacity = String(opacity.toFixed(3));
        } else if (exitEased > 0.001) {
          const y = -exitEased * 16;
          const scale = 1 - exitEased * 0.025;
          sec.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
          sec.style.opacity = String((1 - exitEased * 0.25).toFixed(3));
        } else {
          // Clear transform when settled in view so fixed modals/lightboxes stay viewport-anchored
          sec.style.transform = '';
          sec.style.opacity = '';
        }
      });
    };

    const onScrollOrResize = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    const initTimer = window.setTimeout(update, 40);
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.clearTimeout(initTimer);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      injectedLayers.forEach((layer) => layer.remove());
      sections.forEach((sec) => {
        sec.classList.remove('scroll-overlay-section');
        sec.style.transform = '';
        sec.style.opacity = '';
        sec.style.zIndex = '';
      });
    };
  }, [activePage]);

  return null;
}
