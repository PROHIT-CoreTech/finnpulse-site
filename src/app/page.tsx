import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Eyebrow from '@/components/ui/Eyebrow';
import Icon, { type IconName } from '@/components/ui/Icon';
import Highlight from '@/components/ui/Highlight';
import PulseRule from '@/components/ui/PulseRule';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import BeforeAfter from '@/components/BeforeAfter';
import CtaBand from '@/components/CtaBand';
import DashboardMotif from '@/components/DashboardMotif';
import Reveal from '@/components/Reveal';
import ScrollDepth from '@/components/ScrollDepth';
import TrackedCta from '@/components/TrackedCta';
import { bookingHref, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Fractional CFO Services for Growing MSMEs | Finnpulse Advisors',
  description:
    'Your business is growing — is your finance function growing with it? Finnpulse Advisors builds the financial systems, visibility and discipline growing MSMEs need to scale with confidence.',
  alternates: { canonical: '/' },
};

const PAINS: { icon: IconName; text: string }[] = [
  { icon: 'clock', text: 'Your books take too long to close.' },
  { icon: 'chart', text: 'You don’t fully trust your MIS.' },
  { icon: 'cash', text: 'Cash is tight despite good sales.' },
  { icon: 'boxes', text: 'Inventory is difficult to track.' },
  { icon: 'pie', text: 'You don’t know which products or customers are actually profitable.' },
  { icon: 'target', text: 'Budgets don’t really drive decisions.' },
  { icon: 'user', text: 'Every important decision still comes back to you.' },
];

const BUILD_FLOW = [
  'Reliable numbers', 'Meaningful MIS', 'Cash visibility',
  'Profitability', 'Budgets', 'Systems', 'Better decisions',
];

const SIX_QUESTIONS = [
  { n: '01', q: 'What happened?' },
  { n: '02', q: 'Why did it happen?' },
  { n: '03', q: 'What does it mean?' },
  { n: '04', q: 'What should we do?' },
  { n: '05', q: 'Who will do it?' },
  { n: '06', q: 'What happened to it next month?' },
];

const BA_ROWS = [
  { before: 'Late MIS', after: 'Timely MIS' },
  { before: 'Cash surprises', after: '13-week cash visibility' },
  { before: 'Unknown margins', after: 'Product & customer profitability' },
  { before: 'Manual processes', after: 'Automated systems' },
  { before: 'Founder dependence', after: 'Accountability' },
  { before: 'Decisions by instinct', after: 'Data-led decisions' },
];

const AUDIENCE = [
  '₹10 Cr+ businesses', 'Growing MSMEs', 'Manufacturers', 'D2C / consumer businesses',
  'Family-owned businesses', 'Second-generation businesses', 'Businesses with an existing accounts team',
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does a Fractional CFO do?',
      acceptedAnswer: { '@type': 'Answer', text: 'A Fractional CFO gives your business access to senior-level financial thinking without the cost of hiring a full-time CFO — covering financial control, MIS and business intelligence, cash and working capital, budgeting and forecasting, systems and automation, and profitability and strategic finance.' } },
    { '@type': 'Question', name: 'How is a Fractional CFO different from an accountant or a CA?',
      acceptedAnswer: { '@type': 'Answer', text: 'Your accounts team records the numbers and your CA handles compliance. A Fractional CFO helps management use those numbers to run the business.' } },
    { '@type': 'Question', name: 'Which businesses is Finnpulse built for?',
      acceptedAnswer: { '@type': 'Answer', text: 'Growing MSMEs above roughly ₹10 crore in turnover — manufacturers, D2C and consumer businesses, family-owned and second-generation businesses that already have an accounts team.' } },
    { '@type': 'Question', name: 'What is The CFO Meeting?',
      acceptedAnswer: { '@type': 'Answer', text: 'The CFO Meeting is the Finnpulse monthly finance rhythm — one meeting each month that answers six questions and converts numbers into decisions and owned actions.' } },
  ],
};

export default function HomePage() {
  return (
    <>
      <ScrollDepth page="home" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ------------------------------------------------------------ HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-offwhite py-14 sm:py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_520px_at_82%_8%,#EEF8E3_0%,rgba(238,248,227,0)_62%)]" />
        <div className="relative mx-auto grid max-w-wrap items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <Eyebrow>Fractional CFO Services for Growing Businesses</Eyebrow>
            <h1 className="mt-5 font-display text-[clamp(2.1rem,1.35rem+2.5vw,3.05rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-charcoalDeep">
              Your Business Is Growing.<br />
              Is Your Finance Function <Highlight>Growing With It?</Highlight>
            </h1>
            <p className="mt-6 max-w-prose text-[1.05rem] leading-relaxed text-charcoalSoft sm:text-[1.15rem]">
              We help growing MSMEs build the financial systems, visibility and discipline they need to scale with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedCta label="Book a CFO Discovery Meeting" location="hero">
                <Button href={bookingHref} external={!!site.bookingUrl}>Book a CFO Discovery Meeting</Button>
              </TrackedCta>
              <TrackedCta label="Take the CFO Readiness Test" location="hero">
                <Button href="/cfo-readiness-test" variant="outline">Take the CFO Readiness Test</Button>
              </TrackedCta>
            </div>
            <p className="mt-9 border-t border-hair pt-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              ₹10 Cr+ turnover · Manufacturers · D2C · Family-owned businesses
            </p>
          </div>
          <DashboardMotif />
        </div>
      </section>

      {/* ------------------------------------------- GROWTH WITHOUT CONTROL */}
      <Section tone="offwhite">
        <Reveal>
          <SectionHeading center eyebrow="The Growth Problem" title="Growth Without Control Is Risky."
            lede="Sales are growing. Your team is growing. Your business is becoming more complex. But…" />
        </Reveal>

        <Reveal delay={80}>
          <ul className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PAINS.map((p) => (
              <li key={p.text} className="flex items-start gap-3.5 rounded-xl border border-hair bg-white p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-limeSoft text-limeInk">
                  <Icon name={p.icon} className="h-[18px] w-[18px]" />
                </span>
                <span className="pt-1 text-[0.96rem] leading-snug text-charcoal">{p.text}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-12 max-w-2xl text-center font-display text-display-md font-semibold text-charcoalDeep">
            You are running a bigger business with the financial visibility of a smaller one.
          </p>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------- CFO THINKING */}
      <Section>
        <Reveal>
          <SectionHeading center eyebrow="The Distinction"
            title={<>You Don’t Need More Accounting.<br />You Need <Highlight>CFO Thinking.</Highlight></>} />
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <Card>
              <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-muted">Your accounts team</p>
              <p className="text-[1.02rem] leading-relaxed text-charcoal">Records the numbers.</p>
            </Card>
            <Card>
              <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-muted">Your CA</p>
              <p className="text-[1.02rem] leading-relaxed text-charcoal">Handles compliance.</p>
            </Card>
            <Card tone="dark">
              <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-lime">Your Fractional CFO</p>
              <p className="text-[1.02rem] leading-relaxed text-white">
                Helps management <strong className="font-semibold">use those numbers</strong> to run the business.
              </p>
            </Card>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14">
            <div className="flex justify-center"><Eyebrow center>We work with your existing team to build</Eyebrow></div>
            <ol className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {BUILD_FLOW.map((step, i) => (
                <li key={step} className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-hairStrong bg-white px-3.5 py-2.5 text-[0.875rem] font-medium text-charcoalDeep">
                    <Icon name="check" className="h-[15px] w-[15px] text-limeInk" />{step}
                  </span>
                  {i < BUILD_FLOW.length - 1 && <span aria-hidden className="hidden text-hairStrong sm:inline">→</span>}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Section>

      {/* -------------------------------------------------- THE CFO MEETING */}
      <Section tone="dark">
        <Reveal>
          <SectionHeading center light eyebrow="Our Core Framework" title={<>The CFO Meeting™</>}
            lede="One monthly meeting that turns numbers into decisions." />
        </Reveal>

        <div className="mx-auto mt-10 max-w-md"><PulseRule light /></div>

        <Reveal delay={80}>
          <p className="mt-10 text-center font-mono text-[0.72rem] uppercase tracking-[0.16em] text-white/50">
            Every month we answer six questions
          </p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SIX_QUESTIONS.map((s) => (
              <li key={s.n} className="rounded-xl border border-white/12 bg-white/[0.04] p-6">
                <p className="font-mono text-[0.72rem] tracking-[0.14em] text-lime">{s.n}</p>
                <p className="mt-3 font-display text-xl font-semibold leading-snug text-white">{s.q}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <TrackedCta label="See How The CFO Meeting Works" location="home_framework">
            <Button href="/the-book" variant="outlineLight">See How The CFO Meeting Works</Button>
          </TrackedCta>
        </div>
      </Section>

      {/* ----------------------------------------------------- BEFORE/AFTER */}
      <Section>
        <Reveal>
          <SectionHeading eyebrow="The Shift" title="From Firefighting to Financial Control" />
        </Reveal>
        <Reveal delay={80}><div className="mt-10"><BeforeAfter rows={BA_ROWS} /></div></Reveal>
      </Section>

      {/* --------------------------------------------------------- AUDIENCE */}
      <Section tone="offwhite">
        <Reveal>
          <SectionHeading eyebrow="Who We Work With" title="Built for Businesses That Have Outgrown Their Finance Function" />
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-8 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted">Typically</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {AUDIENCE.map((a) => (
              <li key={a} className="inline-flex items-center gap-2 rounded-full border border-hairStrong bg-white px-4 py-2.5 text-[0.92rem] font-medium text-charcoalDeep">
                <Icon name="check" className="h-4 w-4 text-limeInk" />{a}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <CtaBand
        title={<>Ready to Get Your Finance Function <Highlight>Under Control?</Highlight></>}
        body="One conversation is usually enough to show you where the gaps are."
        secondary={{ label: 'Take the CFO Readiness Test', href: '/cfo-readiness-test' }}
      />
    </>
  );
}
