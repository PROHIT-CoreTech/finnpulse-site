/**
 * Signature element: the Finnpulse pulse line. A flat baseline that spikes once
 * and steadies — the visual echo of the logo's rising arrow, reused as a
 * section divider, a progress track and a background motif.
 */
export default function PulseRule({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 1000 20" preserveAspectRatio="none" aria-hidden
         className={`h-5 w-full overflow-visible ${className}`}>
      <path d="M0 10 H1000" fill="none" strokeWidth="1" className={light ? 'stroke-white/20' : 'stroke-hairStrong'} />
      <path d="M0 10 H120 l7 -7 l6 14 l7 -18 l6 22 l7 -11 H1000" fill="none" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round"
            className={light ? 'stroke-lime' : 'stroke-limeInk'} />
    </svg>
  );
}
