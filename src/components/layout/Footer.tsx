import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { nav, footerServices, site } from '@/lib/site';

const socials = [
  { key: 'linkedin', label: 'LinkedIn', href: site.social.linkedin,
    d: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21H9z' },
  { key: 'facebook', label: 'Facebook', href: site.social.facebook,
    d: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.69c0-2.47 1.47-3.83 3.72-3.83 1.08 0 2.21.19 2.21.19v2.43h-1.25c-1.23 0-1.61.76-1.61 1.54V12h2.74l-.44 3h-2.3v6.8c4.56-.93 8-4.96 8-9.8z' },
  { key: 'youtube', label: 'YouTube', href: site.social.youtube,
    d: 'M23 12s0-3.6-.46-5.32a2.76 2.76 0 0 0-1.95-1.95C18.87 4.27 12 4.27 12 4.27s-6.87 0-8.59.46A2.76 2.76 0 0 0 1.46 6.7C1 8.4 1 12 1 12s0 3.6.46 5.3a2.76 2.76 0 0 0 1.95 1.95c1.72.46 8.59.46 8.59.46s6.87 0 8.59-.46a2.76 2.76 0 0 0 1.95-1.95C23 15.6 23 12 23 12ZM9.8 15.3V8.7l5.7 3.3z' },
  { key: 'instagram', label: 'Instagram', href: site.social.instagram,
    d: 'M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.25.07 1.63.07 4.81s0 3.56-.07 4.81c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.25.06-1.63.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.56 2.2 15.18 2.2 12s0-3.56.07-4.81c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.44 2.21 8.82 2.2 12 2.2Zm0 3.14A6.66 6.66 0 1 0 18.66 12 6.66 6.66 0 0 0 12 5.34Zm0 10.98A4.32 4.32 0 1 1 16.32 12 4.32 4.32 0 0 1 12 16.32Zm6.92-11.2a1.56 1.56 0 1 1-1.55-1.55 1.56 1.56 0 0 1 1.55 1.55Z' },
];

export default function Footer() {
  return (
    <footer className="bg-charcoalDeep text-white/70">
      <div className="mx-auto max-w-wrap px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image src="/logo-light.png" alt={site.name} width={1363} height={256} className="h-8 w-auto" />
            <p className="mt-4 max-w-[26ch] text-sm leading-relaxed">{site.tagline}</p>
            <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/45">{site.locationLine}</p>
          </div>

          <div>
            <h2 className="mb-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white">Quick Links</h2>
            <ul className="space-y-2.5 text-sm">
              {nav.map((i) => (
                <li key={i.href}><Link href={i.href} className="transition-colors hover:text-lime">{i.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white">Services</h2>
            <ul className="space-y-2.5 text-sm">
              {footerServices.map((s) => (
                <li key={s}><Link href="/what-we-solve" className="transition-colors hover:text-lime">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white">Contact</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5"><Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <a href={site.phoneHref} className="hover:text-lime">{site.phone}</a></li>
              <li className="flex gap-2.5"><Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <a href={`mailto:${site.email}`} className="hover:text-lime">{site.email}</a></li>
              <li className="flex gap-2.5"><Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <span>{site.city}</span></li>
            </ul>

            <h2 className="mb-3 mt-8 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white">Stay Connected</h2>
            <p className="text-sm leading-relaxed">Insights on business growth and CFO thinking.</p>
            <div className="mt-4 flex gap-2.5">
              {socials.map((s) => (
                <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer"
                   aria-label={`${site.name} on ${s.label}`}
                   className="flex h-10 w-10 items-center justify-center rounded-[9px] border border-white/20 transition-colors hover:border-lime hover:bg-lime/10">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-[17px] w-[17px]"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-lime">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-lime">Terms</Link>
            <Link href="/disclaimer" className="hover:text-lime">Disclaimer</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
