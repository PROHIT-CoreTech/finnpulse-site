'use client';

import type { ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';

/** Wraps any CTA so a server component can still emit a click event. */
export default function TrackedCta({ children, label, location }: {
  children: ReactNode; label: string; location: string;
}) {
  return (
    <span onClick={() => trackEvent('cta_click', { label, location })} className="contents">
      {children}
    </span>
  );
}
