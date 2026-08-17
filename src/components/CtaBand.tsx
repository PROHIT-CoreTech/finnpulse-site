import Button from '@/components/ui/Button';
import { bookingHref, site } from '@/lib/site';
import TrackedCta from './TrackedCta';

/** The final CTA on every page — deliberately heavier than body sections. */
export default function CtaBand({
  title, body, primaryLabel = 'Book a CFO Discovery Meeting', primaryHref, secondary,
}: {
  title: React.ReactNode;
  body?: React.ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-charcoalDeep py-16 sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-[radial-gradient(600px_200px_at_50%_100%,rgba(192,255,114,0.14),transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="font-display text-display-lg font-semibold text-white">{title}</h2>
        {body && <p className="mx-auto mt-5 max-w-prose text-[1.05rem] leading-relaxed text-white/70">{body}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <TrackedCta label={primaryLabel} location="cta_band">
            <Button href={primaryHref ?? bookingHref} external={!primaryHref && !!site.bookingUrl}>{primaryLabel}</Button>
          </TrackedCta>
          {secondary && (
            <TrackedCta label={secondary.label} location="cta_band">
              <Button href={secondary.href} variant="outlineLight">{secondary.label}</Button>
            </TrackedCta>
          )}
        </div>
      </div>
    </section>
  );
}
