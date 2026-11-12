import { useEffect } from 'react';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function ScrollSectionEffects({ activePage }) {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = document.getElementById('page-scroll-root');
    if (!container) return;

    const sections = Array.from(container.querySelectorAll(':scope > div > section'));
    if (!sections.length) return;

    sections.forEach((sec, idx) => {
      sec.classList.add('scroll-overlay-section');
      sec.style.zIndex = String(10 + idx);
    });

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

