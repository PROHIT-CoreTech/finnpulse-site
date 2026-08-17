import Icon from '@/components/ui/Icon';

export type Row = { before: string; after: string };

/** Comparison table on desktop; stacked paired cards on mobile. */
export default function BeforeAfter({ rows }: { rows: Row[] }) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-hair md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Finance function before and after working with Finnpulse</caption>
          <thead>
            <tr>
              <th scope="col" className="w-1/2 border-b border-hair bg-offwhite px-6 py-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">Before</th>
              <th scope="col" className="w-1/2 border-b border-[#D6EBBE] bg-limeSoft px-6 py-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-limeInk">After</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.before}>
                <td className="border-b border-hair px-6 py-4 align-top last:border-b-0">
                  <span className="flex items-start gap-3 text-charcoalSoft">
                    <Icon name="x" className="mt-1 h-4 w-4 shrink-0 text-muted" />{r.before}
                  </span>
                </td>
                <td className="border-b border-[#D6EBBE] bg-limeSoft px-6 py-4 align-top last:border-b-0">
                  <span className="flex items-start gap-3 font-medium text-charcoalDeep">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-limeInk" />{r.after}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="grid gap-3 md:hidden">
        {rows.map((r) => (
          <li key={r.before} className="overflow-hidden rounded-xl border border-hair">
            <div className="flex items-start gap-3 bg-offwhite px-4 py-3.5">
              <Icon name="x" className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
              <span className="text-[0.95rem] text-charcoalSoft"><span className="mr-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-muted">Before</span>{r.before}</span>
            </div>
            <div className="flex items-start gap-3 border-t border-[#D6EBBE] bg-limeSoft px-4 py-3.5">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-limeInk" />
              <span className="text-[0.95rem] font-medium text-charcoalDeep"><span className="mr-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-limeInk">After</span>{r.after}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
