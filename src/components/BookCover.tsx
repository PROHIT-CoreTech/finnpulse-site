/**
 * PLACEHOLDER book cover. Replace this whole component with an <Image> once the
 * real artwork is supplied — nothing else in the codebase depends on it.
 */
export default function BookCover({ className = '' }: { className?: string }) {
  return (
    <div className={`relative mx-auto aspect-[2/3] w-[min(280px,72vw)] overflow-hidden rounded-r-[9px] rounded-l-[3px] bg-gradient-to-br from-[#3A3936] via-charcoalDeep to-[#26251F] p-8 shadow-lift ${className}`}>
      <div aria-hidden className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/55 to-white/5" />
      <div className="flex h-full flex-col">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-lime">By CA Rohan Mehta</p>
        <svg viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden className="absolute inset-x-0 bottom-[26%] w-full opacity-60">
          <path d="M0 26 H90 l7 -8 l6 16 l8 -22 l6 26 l7 -12 H300" fill="none" stroke="#C0FF72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="mt-auto">
          <h2 className="font-display text-[2.05rem] font-semibold leading-[1.02] text-white">
            The CFO<br />Meeting<sup className="relative -top-3 text-[0.36em]">™</sup>
          </h2>
          <p className="mt-3.5 border-t border-white/15 pt-3.5 text-[0.76rem] leading-relaxed text-white/65">
            One Year. Twelve Meetings. A Business Transformed.
          </p>
          <p className="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-white/80">Finnpulse Advisors</p>
        </div>
      </div>
    </div>
  );
}
