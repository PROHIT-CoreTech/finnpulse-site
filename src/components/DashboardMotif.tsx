'use client';

import { useEffect, useRef, useState } from 'react';

/** Counts a number up once on mount; respects prefers-reduced-motion. */
function useCountUp(target: number, decimals = 0) {
  const [value, setValue] = useState(target);
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setValue(0);
    let raf = 0, start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1400, 1);
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value.toFixed(decimals);
}

function Tile({ label, prefix = '', value, decimals = 0, suffix = '', note, tone = 'plain' }: {
  label: string; prefix?: string; value: number; decimals?: number; suffix?: string; note?: string; tone?: 'plain' | 'accent';
}) {
  const shown = useCountUp(value, decimals);
  return (
    <div className={`rounded-[10px] border p-3.5 ${tone === 'accent' ? 'border-[#D6EBBE] bg-limeSoft' : 'border-hair bg-offwhite'}`}>
      <p className="font-mono text-[0.63rem] uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-charcoalDeep sm:text-3xl">
        {prefix}{shown}{suffix}
      </p>
      {note && <p className="mt-0.5 font-mono text-[0.7rem] text-limeInk">{note}</p>}
    </div>
  );
}

function Mini({ label, value, decimals = 0, suffix = '' }: { label: string; value: number; decimals?: number; suffix?: string }) {
  const shown = useCountUp(value, decimals);
  return (
    <div className="rounded-[10px] border border-hair p-3">
      <p className="flex min-h-[2.1em] items-start font-mono text-[0.6rem] uppercase leading-snug tracking-[0.1em] text-muted">{label}</p>
      <p className="mt-1 font-display text-xl font-semibold tabular-nums text-charcoalDeep">{shown}{suffix}</p>
    </div>
  );
}

/**
 * The hero motif: a financial-control dashboard, not stock accounting imagery.
 * Figures are illustrative and deliberately generic.
 */
export default function DashboardMotif() {
  return (
    <div className="rounded-2xl border border-hair bg-white p-4 shadow-lift"
         role="img"
         aria-label="Illustrative Finnpulse management dashboard: revenue of 12.4 crore rupees, cash in hand of 1.8 crore rupees, a 13-week cash trend, gross margin 28 percent, DSO 45 days and inventory turns 6.2 times.">
      <div className="flex items-center gap-2 border-b border-hair px-1 pb-3">
        <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-limeInk motion-safe:animate-beat" />
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">Business Vitals</span>
        <span className="ml-auto font-mono text-[0.66rem] tracking-wide text-muted">Month 09 · FY 26–27</span>
      </div>

      <div className="mt-3.5 grid grid-cols-2 gap-2.5">
        <Tile label="Revenue YTD" prefix="₹" value={12.4} decimals={1} suffix=" Cr" note="▲ 18.2% vs LY" />
        <Tile label="Cash in Hand" prefix="₹" value={1.8} decimals={1} suffix=" Cr" note="13-week runway mapped" tone="accent" />
      </div>

      <div className="mt-2.5 rounded-[10px] bg-charcoalDeep p-3.5">
        <div className="mb-1 flex items-baseline justify-between">
          <span className="font-mono text-[0.63rem] uppercase tracking-[0.14em] text-white/55">Cash pulse · 13 weeks</span>
          <span className="font-mono text-[0.78rem] text-lime">Stable</span>
        </div>
        <svg viewBox="0 0 320 78" preserveAspectRatio="none" aria-hidden className="h-[78px] w-full">
          <defs>
            <linearGradient id="fpFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C0FF72" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#C0FF72" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path fill="url(#fpFill)" d="M0 62 L26 58 L52 63 L78 46 L96 68 L110 20 L124 74 L138 44 L164 48 L190 38 L216 42 L242 28 L268 33 L294 18 L320 22 L320 78 L0 78 Z" />
          <path fill="none" stroke="#C0FF72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                d="M0 62 L26 58 L52 63 L78 46 L96 68 L110 20 L124 74 L138 44 L164 48 L190 38 L216 42 L242 28 L268 33 L294 18 L320 22" />
          <circle cx="320" cy="22" r="3.2" fill="#C0FF72" />
        </svg>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2.5">
        <Mini label="Gross Margin" value={28} suffix="%" />
        <Mini label="DSO" value={45} suffix=" Days" />
        <Mini label="Inventory Turns" value={6.2} decimals={1} suffix="x" />
      </div>
    </div>
  );
}
