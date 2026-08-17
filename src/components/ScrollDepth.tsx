'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/** Fires scroll-depth events at 25/50/75/100%. Mounted on Home, Book and About. */
export default function ScrollDepth({ page }: { page: string }) {
  useEffect(() => {
    const fired = new Set<number>();
    const marks = [25, 50, 75, 100];
    let ticking = false;
    const check = () => {
      ticking = false;
      const h = document.documentElement;
      const pct = ((h.scrollTop + window.innerHeight) / h.scrollHeight) * 100;
      marks.forEach((m) => {
        if (pct >= m && !fired.has(m)) { fired.add(m); trackEvent('scroll_depth', { page, depth: m }); }
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [page]);
  return null;
}
