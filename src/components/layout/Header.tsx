'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { nav, bookingHref, site } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer on route change and lock scroll while it is open.
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex min-h-[70px] max-w-wrap items-center gap-2 px-4 sm:gap-4 sm:px-8">
        <Link href="/" className="shrink-0" aria-label={`${site.name} — home`}>
          {/* Logo is a fixed asset — never redrawn or recoloured. Swap /public/logo.png with the final export. */}
          <Image src="/logo.png" alt={site.name} width={1363} height={256} priority
                 className="h-6 w-auto sm:h-[30px]" />
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}
                    className={`whitespace-nowrap rounded-md px-2.5 py-2 text-[0.875rem] transition-colors ${
                      active ? 'font-semibold text-charcoalDeep' : 'font-medium text-charcoal hover:bg-offwhite hover:text-charcoalDeep'}`}>
                {item.label}
                {active && <span aria-hidden className="mt-0.5 block h-0.5 rounded bg-limeInk" />}
              </Link>
            );
          })}
        </nav>

        {/* Primary CTA stays visible at every breakpoint, per the brief. */}
        <div className="ml-auto shrink-0 xl:ml-2">
          <Button href={bookingHref} size="sm" external={!!site.bookingUrl} className="whitespace-nowrap"
                  onClick={() => trackEvent('cta_click', { label: 'Book a Meeting', location: 'header' })}>
            Book a Meeting
          </Button>
        </div>

        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[9px] border border-hairStrong bg-white xl:hidden">
          <span aria-hidden className="relative block h-[1.5px] w-[19px]">
            <span className={`absolute left-0 h-[1.5px] w-[19px] bg-charcoalDeep transition-all ${open ? 'top-0 rotate-45' : '-top-1.5'}`} />
            <span className={`absolute left-0 top-0 h-[1.5px] w-[19px] bg-charcoalDeep transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 h-[1.5px] w-[19px] bg-charcoalDeep transition-all ${open ? 'top-0 -rotate-45' : 'top-1.5'}`} />
          </span>
        </button>
      </div>

      {/* Slide-in drawer */}
      <div id="mobile-nav" hidden={!open}
           className="absolute inset-x-0 top-full max-h-[calc(100dvh-70px)] overflow-y-auto border-b border-hair bg-white px-5 pb-6 shadow-card sm:px-8 xl:hidden">
        <nav aria-label="Mobile">
          {nav.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}
                    className={`block border-b border-hair py-4 text-lg ${active ? 'font-semibold text-limeInk' : 'text-charcoalDeep'}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Button href={bookingHref} external={!!site.bookingUrl} className="mt-6 w-full"
                onClick={() => trackEvent('cta_click', { label: 'Book a CFO Discovery Meeting', location: 'mobile_nav' })}>
          Book a CFO Discovery Meeting
        </Button>
      </div>
    </header>
  );
}
