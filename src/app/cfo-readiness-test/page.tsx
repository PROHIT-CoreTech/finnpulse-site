import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import Highlight from '@/components/ui/Highlight';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import ReadinessQuiz from '@/components/ReadinessQuiz';
import Reveal from '@/components/Reveal';
import { BANDS } from '@/lib/quiz';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'CFO Readiness Test',
  description:
    'Take the free 2-minute CFO Readiness Test. Answer 10 questions about your finance function — monthly close, MIS, profitability, 13-week cash, budgets, KPIs and SOPs — and discover where your business stands.',
  alternates: { canonical: '/cfo-readiness-test' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CFO Readiness Test',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${site.url}/cfo-readiness-test`,
  description: 'A free 10-question diagnostic scoring how ready a growing business is for a Fractional CFO.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  provider: { '@type': 'ProfessionalService', name: site.name },
};

const PROMISES = [
  '10 simple questions', 'Instant score & insights',
  'Understand your financial gaps', 'Get expert recommendations',
];

export default function ReadinessTestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Section className="!pb-8 sm:!pb-10">
        <SectionHeading as="h1" size="xl" center eyebrow="2-Minute Diagnostic"
          title={<>Does Your Business Need a <Highlight>Fractional CFO?</Highlight></>}
          lede="Take the 2-minute CFO Readiness Test. Answer 10 questions about your finance function and discover where your business stands." />

        <ul className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
          {PROMISES.map((p) => (
            <li key={p} className="flex items-center gap-3 text-[0.98rem] text-charcoal">
              <Icon name="check" className="h-[18px] w-[18px] shrink-0 text-limeInk" />{p}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="offwhite" className="!pt-8 sm:!pt-10">
        <ReadinessQuiz />
        <p className="mt-7 text-center text-sm text-muted">
          Your answers stay in your browser until you choose to share them.
        </p>
      </Section>

      <Section>
        <Reveal><SectionHeading center eyebrow="How To Read Your Score" title="Four Result Categories" /></Reveal>
        <Reveal delay={80}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {BANDS.map((b) => (
              <Card key={b.key} tone={b.key === 'cfo' ? 'soft' : 'white'}>
                <p className="font-mono text-[0.75rem] tracking-[0.12em] text-limeInk">{b.min}–{b.max}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-charcoalDeep">{b.label}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-charcoalSoft">{b.summary}</p>
              </Card>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
