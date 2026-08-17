import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import Highlight from '@/components/ui/Highlight';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import LeadForm from '@/components/LeadForm';
import Reveal from '@/components/Reveal';
import TrackedCta from '@/components/TrackedCta';
import { bookingHref, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Finnpulse Advisors',
  description:
    'Book a CFO Discovery Meeting with Finnpulse Advisors. Tell us where your business is today and where you want it to go — we’ll help you understand where the financial gaps are.',
  alternates: { canonical: '/contact' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${site.url}/contact`,
  name: 'Book a CFO Discovery Meeting',
  mainEntity: {
    '@type': 'ProfessionalService', name: site.name,
    telephone: site.phone, email: site.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressRegion: 'Maharashtra', addressCountry: 'IN' },
  },
};

const STEPS = [
  { n: '01', title: 'Understand', body: 'We understand your business, current finance setup and growth plans.' },
  { n: '02', title: 'Identify', body: 'We discuss the financial challenges you’re experiencing — cash flow, MIS, profitability, working capital, systems, budgeting, automation, funding or other priorities.' },
  { n: '03', title: 'Assess', body: 'We identify where your current finance function stands and where the biggest gaps are.' },
  { n: '04', title: 'Recommend', body: 'If we believe a Fractional CFO engagement can help, we’ll explain what we would focus on and how we would approach it.' },
];

const WHO = [
  'Your business has crossed ₹10 crore in turnover',
  'Your business is growing rapidly',
  'You have an accounts team but still don’t have financial visibility',
  'You don’t receive timely MIS',
  'Cash flow is becoming difficult to manage',
  'You don’t know your true product/customer margins',
  'You’re planning significant expansion',
  'You’re considering fundraising',
  'You’re spending too much time firefighting finance',
];

const PREP = [
  'Your approximate turnover',
  'Industry',
  'Number of finance/accounts team members',
  'Your biggest current finance challenge',
  'Your next 12–24 month growth objective',
];

const CONNECT = [
  { key: 'linkedin', label: 'LinkedIn', href: site.social.linkedin,
    d: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21H9z',
    body: 'Connect with CA Rohan Mehta for insights on finance, working capital, business growth, automation and Fractional CFO services.' },
  { key: 'facebook', label: 'Facebook', href: site.social.facebook,
    d: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.69c0-2.47 1.47-3.83 3.72-3.83 1.08 0 2.21.19 2.21.19v2.43h-1.25c-1.23 0-1.61.76-1.61 1.54V12h2.74l-.44 3h-2.3v6.8c4.56-.93 8-4.96 8-9.8z',
    body: 'Follow updates, financial insights and business announcements on Facebook.' },
  { key: 'youtube', label: 'YouTube', href: site.social.youtube,
    d: 'M23 12s0-3.6-.46-5.32a2.76 2.76 0 0 0-1.95-1.95C18.87 4.27 12 4.27 12 4.27s-6.87 0-8.59.46A2.76 2.76 0 0 0 1.46 6.7C1 8.4 1 12 1 12s0 3.6.46 5.3a2.76 2.76 0 0 0 1.95 1.95c1.72.46 8.59.46 8.59.46s6.87 0 8.59-.46a2.76 2.76 0 0 0 1.95-1.95C23 15.6 23 12 23 12ZM9.8 15.3V8.7l5.7 3.3z',
    body: 'Watch practical videos on finance and business management.' },
  { key: 'instagram', label: 'Instagram', href: site.social.instagram,
    d: 'M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.25.07 1.63.07 4.81s0 3.56-.07 4.81c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.25.06-1.63.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.56 2.2 15.18 2.2 12s0-3.56.07-4.81c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.44 2.21 8.82 2.2 12 2.2Zm0 3.14A6.66 6.66 0 1 0 18.66 12 6.66 6.66 0 0 0 12 5.34Zm0 10.98A4.32 4.32 0 1 1 16.32 12 4.32 4.32 0 0 1 12 16.32Zm6.92-11.2a1.56 1.56 0 1 1-1.55-1.55 1.56 1.56 0 0 1 1.55 1.55Z',
    body: 'Follow content on financial management, business growth and CFO insights.' },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Section className="!pb-8 sm:!pb-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Left — explanation */}
          <div>
            <SectionHeading as="h1" size="xl" eyebrow="Book a CFO Discovery Meeting"
              title={<>Let’s Talk About <Highlight>Your Business.</Highlight></>} />
            <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-charcoalSoft">
              <p>You don’t need to have your finance function figured out before you speak to us.</p>
              <p>Tell us where your business is today. Tell us where you want it to go. We’ll help you understand where the financial gaps are and whether a Fractional CFO model can help.</p>
            </div>
            <div className="mt-8">
              <TrackedCta label="Book a CFO Discovery Meeting" location="contact_intro">
                <Button href={site.bookingUrl ?? '#lead-form'} external={!!site.bookingUrl}>Book a CFO Discovery Meeting</Button>
              </TrackedCta>
            </div>

            <h2 className="mt-14 font-display text-display-md font-semibold text-charcoalDeep">What Happens in the First Meeting?</h2>
            <ol className="mt-7 space-y-4">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-5 rounded-xl border border-hair bg-white p-5">
                  <span className="font-mono text-sm font-medium tracking-wide text-limeInk">{s.n}</span>
                  <div>
                    <h3 className="font-semibold text-charcoalDeep">{s.title}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-charcoalSoft">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 font-medium text-charcoalDeep">No hard sell. Just a conversation about your business.</p>

            <h2 className="mt-14 font-display text-display-md font-semibold text-charcoalDeep">Who Should Book a Meeting?</h2>
            <ul className="mt-7 grid gap-2.5">
              {WHO.map((w) => (
                <li key={w} className="flex items-start gap-3 text-[0.96rem] leading-relaxed text-charcoal">
                  <Icon name="check" className="mt-1 h-[17px] w-[17px] shrink-0 text-limeInk" />{w}
                </li>
              ))}
            </ul>

            <h2 className="mt-14 font-display text-display-md font-semibold text-charcoalDeep">Before We Speak</h2>
            <p className="mt-4 text-charcoalSoft">It helps if you can tell us:</p>
            <ul className="mt-5 grid gap-2.5">
              {PREP.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[0.96rem] text-charcoal">
                  <Icon name="arrow" className="mt-1 h-[17px] w-[17px] shrink-0 text-limeInk" />{p}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-charcoalSoft">You don’t need to prepare a presentation. We will take it from there.</p>
          </div>

          {/* Right — form */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card hover={false} className="!p-6 sm:!p-8" >
              <h2 id="lead-form" className="scroll-mt-28 font-display text-display-md font-semibold text-charcoalDeep">
                Book Your CFO Discovery Meeting
              </h2>
              <p className="mb-7 mt-2 text-[0.95rem] text-charcoalSoft">
                Fields marked <span className="text-limeInk">*</span> are required. We reply within one working day.
              </p>
              <LeadForm />
            </Card>
          </div>
        </div>
      </Section>

      {/* Readiness test */}
      <Section tone="soft" narrow className="text-center">
        <h2 className="font-display text-display-md font-semibold text-charcoalDeep">Or Start With the CFO Readiness Test</h2>
        <p className="mx-auto mt-5 max-w-prose leading-relaxed text-charcoal">
          Not ready for a conversation yet? That’s completely fine. Take our 2-minute CFO Readiness Test and understand
          how prepared your finance function is for your next stage of growth.
        </p>
        <div className="mt-8 flex justify-center">
          <TrackedCta label="Take the CFO Readiness Test" location="contact_secondary">
            <Button href="/cfo-readiness-test" variant="outline">Take the CFO Readiness Test →</Button>
          </TrackedCta>
        </div>
      </Section>

      {/* Other ways to connect */}
      <Section>
        <SectionHeading center eyebrow="Elsewhere" title="Other Ways to Connect" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONNECT.map((c) => (
            <a key={c.key} href={c.href} target="_blank" rel="noopener noreferrer"
               className="group flex h-full flex-col rounded-xl border border-hair bg-white p-6 transition-all hover:border-limeInk hover:shadow-card motion-safe:hover:-translate-y-0.5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] bg-limeSoft text-limeInk">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden><path d={c.d} /></svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-charcoalDeep">{c.label}</h3>
              <p className="mt-2 text-[0.85rem] leading-normal text-charcoalSoft">{c.body}</p>
              <span className="mt-auto flex items-center gap-2 pt-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-limeInk">
                Open <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <Card hover={false}>
            <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-limeInk">
              <Icon name="phone" className="h-4 w-4" />
              <span>Call</span>
            </div>
            <a href={site.phoneHref} className="mt-2 block text-[1.05rem] font-medium text-charcoalDeep underline underline-offset-4 hover:text-limeInk">
              {site.phone}
            </a>
          </Card>

          <Card hover={false}>
            <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-limeInk">
              <Icon name="mail" className="h-4 w-4" />
              <span>Email</span>
            </div>
            <a href={`mailto:${site.email}`} className="mt-2 block text-[1.05rem] font-medium text-charcoalDeep underline underline-offset-4 hover:text-limeInk">
              {site.email}
            </a>
          </Card>

          <Card hover={false}>
            <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-limeInk">
              <Icon name="pin" className="h-4 w-4" />
              <span>Location</span>
            </div>
            <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-[1.05rem] font-medium text-charcoalDeep underline underline-offset-4 hover:text-limeInk">
              {site.locationLine}
            </a>
          </Card>
        </div>
      </Section>
    </>
  );
}
