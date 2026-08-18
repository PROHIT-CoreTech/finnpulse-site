import type { Metadata } from 'next';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Icon, { IconBadge, type IconName } from '@/components/ui/Icon';
import Highlight from '@/components/ui/Highlight';
import Eyebrow from '@/components/ui/Eyebrow';
import PulseRule from '@/components/ui/PulseRule';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Fractional CFO',
  description:
    'What does a Fractional CFO actually do? Senior-level financial thinking without a full-time hire — financial control, MIS, cash and working capital, budgeting, systems and profitability.',
  alternates: { canonical: '/fractional-cfo' },
};

const PILLARS: { n: string; image: string; title: string; body: string }[] = [
  { n: '01', image: '/1_financial_control.png', title: 'Financial Control', body: 'Make your numbers reliable.' },
  { n: '02', image: '/2_mis_business_intelligence.png', title: 'MIS & Business Intelligence', body: 'Turn financial data into management insights.' },
  { n: '03', image: '/3_cash_working_capital.png', title: 'Cash & Working Capital', body: 'Know where your cash is today — and where it will be 13 weeks from now.' },
  { n: '04', image: '/4_budgeting_forecasting.png', title: 'Budgeting & Forecasting', body: 'Plan your growth in numbers.' },
  { n: '05', image: '/5_systems_automation.png', title: 'Systems & Automation', body: 'Build processes that don’t depend on people remembering what to do.' },
  { n: '06', image: '/6_profitability_strategic_finance.png', title: 'Profitability & Strategic Finance', body: 'Understand where you make money and where you don’t.' },
];

const ROLES: { who: string; caption: string; hero?: boolean }[] = [
  { who: 'Your Team', caption: 'Handles day-to-day execution' },
  { who: 'Fractional CFO', caption: 'Brings structure, review, insight & decisions', hero: true },
  { who: 'Management', caption: 'Takes better decisions with confidence' },
];

const RHYTHM: { icon: IconName; label: string }[] = [
  { icon: 'doc', label: 'Dashboard & Reports' },
  { icon: 'handshake', label: 'CFO Meeting' },
  { icon: 'compass', label: 'Understand What Changed' },
  { icon: 'user', label: 'Decisions & Action Owners' },
  { icon: 'check', label: 'Follow-up & Accountability' },
];

export default function FractionalCfoPage() {
  return (
    <>
      <Section className="!pb-0">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow>The Role, Explained</Eyebrow>
            <h1 className="mt-4 font-display text-display-xl font-semibold text-charcoalDeep">
              What Does a Fractional CFO <Highlight>Actually Do?</Highlight>
            </h1>
            <div className="mt-8 max-w-lg"><PulseRule /></div>
          </div>
          <div className="space-y-4 rounded-2xl border border-hair bg-gradient-to-br from-white to-limeSoft/30 p-6 shadow-card lg:col-span-5 sm:p-7">
            <h2 className="font-display text-xl font-semibold text-charcoalDeep">
              Senior Financial Leadership On-Demand
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-charcoalSoft">
              A Fractional CFO gives your business access to senior-level financial thinking, structure, and strategic governance — without the cost of hiring a full-time executive.
            </p>
            <ul className="flex flex-wrap gap-2 pt-1 text-xs font-semibold text-limeInk">
              <li className="rounded-md bg-limeSoft px-2.5 py-1">✓ Financial Control</li>
              <li className="rounded-md bg-limeSoft px-2.5 py-1">✓ MIS &amp; BI</li>
              <li className="rounded-md bg-limeSoft px-2.5 py-1">✓ Strategic Growth</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Six pillars */}
      <Section>
        <Reveal><SectionHeading center eyebrow="Scope of Work" title="The Six Areas We Manage" /></Reveal>
        <Reveal delay={80}>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <Card as="li" key={p.n} className="group flex flex-col overflow-hidden">
                <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-lg border border-hair bg-limeSoft">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="font-mono text-[0.72rem] tracking-[0.14em] text-limeInk">{p.n}</p>
                <h3 className="mt-2 text-[1.08rem] font-semibold leading-snug text-charcoalDeep">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoalSoft">{p.body}</p>
              </Card>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={120}>
          <Card tone="soft" hover={false} className="mt-4 !flex-row flex-wrap items-center gap-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-white text-limeInk">
              <Icon name="growth" className="h-[21px] w-[21px]" />
            </span>
            <div className="min-w-[240px] flex-1">
              <h3 className="text-[1.08rem] font-semibold text-charcoalDeep">Plus: Funding &amp; Scale Readiness</h3>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-charcoal">
                Prepare for funding and scale with strong financial planning and projections.
              </p>
            </div>
          </Card>
        </Reveal>
      </Section>

      {/* Existing team */}
      <Section tone="offwhite">
        <Reveal>
          <SectionHeading center eyebrow="The Operating Model" title="We Work With Your Existing Team"
            lede="No. We work with your existing accounts and finance team. Your team handles the day-to-day execution." />
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {ROLES.map((r) => (
              <Card key={r.who} tone={r.hero ? 'dark' : 'white'} className="text-center">
                <span className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${r.hero ? 'bg-lime text-charcoalDeep' : 'bg-limeSoft text-limeInk'}`}>
                  <Icon name={r.hero ? 'spark' : 'user'} className="h-5 w-5" />
                </span>
                <h3 className={`font-display text-xl font-semibold ${r.hero ? 'text-white' : 'text-charcoalDeep'}`}>{r.who}</h3>
                <p className={`mt-2 text-[0.95rem] leading-relaxed ${r.hero ? 'text-white/75' : 'text-charcoalSoft'}`}>{r.caption}</p>
              </Card>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[1.05rem] leading-relaxed text-charcoal">
            We bring: <strong className="font-semibold text-charcoalDeep">structure + review + analysis + systems + decision support + accountability</strong>.
          </p>
        </Reveal>
      </Section>

      {/* Monthly rhythm */}
      <Section>
        <Reveal>
          <SectionHeading center eyebrow="The Monthly Rhythm" title="What You Can Expect Every Month"
            lede="A dashboard. A CFO meeting. A clear understanding of what changed. An explanation of why it changed. Decisions. Action owners. Follow-up." />
        </Reveal>

        <Reveal delay={80}>
          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {RHYTHM.map((r, i) => (
              <li key={r.label} className="relative rounded-xl border border-hair bg-white p-5 text-center">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-[10px] bg-limeSoft text-limeInk">
                  <Icon name={r.icon} className="h-[21px] w-[21px]" />
                </span>
                <p className="mt-3.5 text-[0.92rem] font-semibold leading-snug text-charcoalDeep">{r.label}</p>
                {i < RHYTHM.length - 1 && (
                  <span aria-hidden className="absolute right-[-0.65rem] top-1/2 hidden -translate-y-1/2 text-hairStrong lg:block">→</span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-10 text-center font-display text-display-md font-semibold text-charcoalDeep">
            That’s the CFO rhythm.
          </p>
        </Reveal>
      </Section>

      <CtaBand title={<>Want to know how a Fractional CFO can help <Highlight>your business?</Highlight></>} />
    </>
  );
}
