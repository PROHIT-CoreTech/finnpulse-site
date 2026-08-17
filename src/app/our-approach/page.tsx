import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Highlight from '@/components/ui/Highlight';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/Reveal';
import Timeline, { type Step } from '@/components/Timeline';
import TrackedCta from '@/components/TrackedCta';
import { bookingHref, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Approach',
  description:
    'One problem at a time. One system at a time. One breakthrough at a time. The Finnpulse 12-step finance transformation journey — diagnose, fix, build, systemise, plan, automate, measure, control, analyse, prepare, report, institutionalise.',
  alternates: { canonical: '/our-approach' },
};

const STEPS: Step[] = [
  { n: 1, title: 'Diagnose', caption: 'Understand the real picture' },
  { n: 2, title: 'Fix', caption: 'Uncover the gaps' },
  { n: 3, title: 'Build', caption: 'Accounting backbone' },
  { n: 4, title: 'Systemise', caption: 'SOPs & controls' },
  { n: 5, title: 'Plan', caption: 'Budget & forecast' },
  { n: 6, title: 'Automate', caption: 'Technology & AI' },
  { n: 7, title: 'Measure', caption: 'KPIs' },
  { n: 8, title: 'Control', caption: 'Cash & working capital' },
  { n: 9, title: 'Analyse', caption: 'Profitability & decisions' },
  { n: 10, title: 'Prepare', caption: 'Scale & funding' },
  { n: 11, title: 'Report', caption: 'Management reporting' },
  { n: 12, title: 'Institutionalise', caption: 'The new business rhythm' },
];

export default function OurApproachPage() {
  return (
    <>
      <Section className="!pb-0">
        <SectionHeading as="h1" size="xl" eyebrow="How We Work"
          title={<>One Problem at a Time. One System at a Time. <Highlight>One Breakthrough at a Time.</Highlight></>}
          lede="Financial transformation is not a one-day exercise. We follow a structured journey." />
      </Section>

      <Section>
        <Reveal><SectionHeading center eyebrow="The Journey" title="The Finance Transformation Journey" /></Reveal>
        <Reveal delay={80}><div className="mt-14"><Timeline steps={STEPS} /></div></Reveal>
      </Section>

      <Section tone="soft" narrow className="text-center">
        <h2 className="font-display text-display-md font-semibold text-charcoalDeep">
          The Goal Isn’t to Make You Dependent on Your CFO.
        </h2>
        <p className="mx-auto mt-5 max-w-prose text-[1.05rem] leading-relaxed text-charcoal">
          The goal is to build a business that needs less firefighting from you.
        </p>
        <div className="mt-8 flex justify-center">
          <TrackedCta label="Build the Finance Function Your Next Stage Requires" location="approach_close">
            <Button href={bookingHref} external={!!site.bookingUrl}>
              Build the Finance Function Your Next Stage Requires
            </Button>
          </TrackedCta>
        </div>
      </Section>
    </>
  );
}
