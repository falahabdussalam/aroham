import React, { useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className = '',
  as: Component = 'div',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState('below');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }

    // Determine initial position relative to viewport on mount
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight - 40 && rect.bottom > 40) {
      setVisible(true);
    } else if (rect.bottom <= 40) {
      setDirection('above');
    } else {
      setDirection('below');
    }

    // Dynamic bidirectional scroll observer (triggers on scroll down and scroll up return)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentRect = entry.boundingClientRect;
          const rootTop = entry.rootBounds ? entry.rootBounds.top : 0;
          const rootBottom = entry.rootBounds ? entry.rootBounds.bottom : window.innerHeight;

          if (entry.isIntersecting) {
            setVisible(true);
          } else {
            setVisible(false);
            if (currentRect.top >= rootBottom - 20) {
              setDirection('below');
            } else if (currentRect.bottom <= rootTop + 20) {
              setDirection('above');
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '-30px 0px -30px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dirClass = direction === 'above' ? 'reveal-above' : 'reveal-below';
  const variantClass = variant ? `reveal-${variant}` : 'reveal-up';

  return (
    <Component
      ref={ref}
      style={visible && delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${variantClass} ${dirClass} ${visible ? 'is-visible' : ''} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
