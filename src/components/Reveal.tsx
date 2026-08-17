'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Scroll-triggered fade-up.
 *
 * Fails safe: content renders fully visible during SSR and before hydration,
 * so it is never hidden from crawlers, no-JS visitors, or anyone whose
 * IntersectionObserver call fails. Only once JS has confirmed it can run does
 * the element opt in to being hidden until it scrolls into view. Disabled
 * entirely under prefers-reduced-motion.
 */
export default function Reveal({ children, delay = 0, className = '' }: {
  children: ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);   // JS confirmed + motion allowed
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    const el = ref.current;
    if (!el) return;

    // Anything already on screen at mount stays visible — no flash.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setShown(true); setArmed(true); return;
    }

    setArmed(true);
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setShown(true), delay);
        io.disconnect();
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const hidden = armed && !shown;

  return (
    <div ref={ref}
         className={`transition-all duration-700 ease-out ${hidden ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'} ${className}`}>
      {children}
    </div>
  );
}
