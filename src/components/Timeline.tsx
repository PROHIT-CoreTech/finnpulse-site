import PulseRule from '@/components/ui/PulseRule';

export type Step = { n: number; title: string; caption: string };

/**
 * 12-step journey. Horizontal rails of six on desktop (mirrors the wireframe),
 * a single vertical rail on mobile. One reusable component, two layouts.
 */
export default function Timeline({ steps }: { steps: Step[] }) {
  const rows = [steps.slice(0, 6), steps.slice(6)];

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        {rows.map((row, ri) => (
          <div key={ri} className={ri === 1 ? 'mt-14' : ''}>
            <div className="relative">
              <div aria-hidden className="absolute inset-x-0 top-5 h-0.5 bg-gradient-to-r from-limeInk/60 via-limeInk/30 to-hairStrong" />
              <ol className="relative grid grid-cols-6 gap-5">
                {row.map((s) => (
                  <li key={s.n} className="text-center">
                    <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-limeInk bg-lime font-mono text-sm font-medium text-charcoalDeep">
                      {s.n}
                    </span>
                    <h3 className="mt-4 text-[0.95rem] font-semibold text-charcoalDeep">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-snug text-charcoalSoft">{s.caption}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
        <div className="mx-auto mt-12 max-w-md"><PulseRule /></div>
      </div>

      {/* Mobile / tablet */}
      <ol className="relative ml-4 border-l-2 border-hair pl-8 lg:hidden">
        {steps.map((s) => (
          <li key={s.n} className="relative pb-8 last:pb-0">
            <span className="absolute -left-[3.05rem] flex h-9 w-9 items-center justify-center rounded-full border-2 border-limeInk bg-lime font-mono text-[0.8rem] font-medium text-charcoalDeep">
              {s.n}
            </span>
            <h3 className="pt-1 text-base font-semibold text-charcoalDeep">{s.title}</h3>
            <p className="mt-1 text-[0.95rem] leading-relaxed text-charcoalSoft">{s.caption}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
