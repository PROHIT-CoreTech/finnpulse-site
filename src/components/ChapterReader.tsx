'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { site } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

/**
 * Opens Chapter 1 in an accessible modal with an embedded document viewer.
 * Point site.chapterOneUrl at the real PDF — a placeholder file ships in /public.
 */
export default function ChapterReader({
  label = 'Read Chapter 1 →',
  variant = 'primary',
}: {
  label?: string;
  variant?: 'primary' | 'outline' | 'outlineLight';
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
      <span ref={openerRef} className="contents">
        <Button variant={variant} onClick={() => { setOpen(true); trackEvent('chapter_one_open', { source: 'the_book' }); }}>
          {label}
        </Button>
      </span>

      {open && (
        <div role="dialog" aria-modal="true" aria-labelledby="chapter-title"
             className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoalDeep/70 p-4 backdrop-blur-sm"
             onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="flex h-full max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-lift">
            <div className="flex items-center gap-3 border-b border-hair bg-offwhite px-5 py-3.5">
              <Icon name="book" className="h-4 w-4 text-limeInk" />
              <h2 id="chapter-title" className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                The CFO Meeting™ · Chapter 1
              </h2>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close chapter reader"
                      className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg border border-hairStrong bg-white hover:bg-offwhite">
                <Icon name="x" className="h-4 w-4" />
              </button>
            </div>

            <iframe src={site.chapterOneUrl} title="The CFO Meeting — Chapter 1" className="flex-1 w-full border-0" />

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#D6EBBE] bg-limeSoft px-5 py-4">
              <p className="text-sm text-charcoal">If the story resonates with you, continue the journey.</p>
              <div className="flex gap-2.5">
                <Button size="sm" variant="outline" href={site.chapterOneUrl} external>Open in new tab</Button>
                {site.bookPurchaseUrl ? (
                  <Button size="sm" href={site.bookPurchaseUrl} external
                          onClick={() => trackEvent('buy_book_click', { location: 'chapter_reader' })}>Buy The Book</Button>
                ) : (
                  <Button size="sm" disabled>Buy The Book</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
