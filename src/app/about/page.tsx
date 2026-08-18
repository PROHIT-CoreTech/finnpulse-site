import type { Metadata } from 'next';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Icon, { IconBadge, type IconName } from '@/components/ui/Icon';
import Highlight from '@/components/ui/Highlight';
import PulseRule from '@/components/ui/PulseRule';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import ScrollDepth from '@/components/ScrollDepth';

export const metadata: Metadata = {
  title: 'About Finnpulse Advisors',
  description:
    'We believe in creating value. If we work with a business, we should make the business better. The philosophy, vision and founder behind Finnpulse Advisors’ Fractional CFO model.',
  alternates: { canonical: '/about' },
};

const DIFFERENTIATORS: { icon: IconName; title: string; body: string }[] = [
  { icon: 'bulb', title: 'We Think Like Business Owners', body: 'We don’t look at finance in isolation. We consider how financial decisions affect sales, operations, people, customers and growth.' },
  { icon: 'target', title: 'We Focus on Outcomes', body: 'The objective isn’t to produce more reports or hold more meetings. The objective is better business outcomes.' },
  { icon: 'layers', title: 'We Build, Not Just Advise', body: 'Where possible, we help create the systems, processes, dashboards and controls required to make the improvement sustainable.' },
  { icon: 'compass', title: 'We Challenge the Status Quo', body: 'If something isn’t working, we ask why — even if it has been done that way for years.' },
  { icon: 'cog', title: 'We Use Technology Intelligently', body: 'We use automation, data and AI where they can genuinely improve the way finance works.' },
];

const VISION_POINTS = [
  'The numbers are understood', 'Cash is under control', 'Profits are protected',
  'Systems can scale', 'Decisions are data-led', 'The founder has the freedom to focus on growth',
];

export default function AboutPage() {
  return (
    <>
      <ScrollDepth page="about" />

      <Section className="!pb-0">
        <SectionHeading as="h1" size="xl" eyebrow="About Finnpulse"
          title={<>We Believe in <Highlight>Creating Value.</Highlight></>}
          lede="At Finnpulse, our philosophy is simple:" />
        <div className="mt-10 max-w-lg"><PulseRule /></div>
      </Section>

      {/* Philosophy */}
      <Section narrow>
        <Reveal>
          <blockquote className="border-l-2 border-limeInk pl-6 sm:pl-8">
            <p className="font-display text-display-md font-semibold leading-snug text-charcoalDeep">
              If we work with a business, we should make the business better.
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-10 space-y-5 text-[1.05rem] leading-relaxed text-charcoalSoft">
            <p>We don’t believe in adding processes, preparing reports or making recommendations simply because they are part of a standard CFO engagement.</p>
            <p>Our work should create value for the client — through better decisions, improved profitability, stronger cash flow, better systems, greater visibility or simply by saving management valuable time.</p>
            <p className="font-medium text-charcoalDeep">And if we don’t believe we are continuing to add value, we should be honest enough to say so.</p>
          </div>
        </Reveal>
      </Section>

      {/* Differentiators */}
      <Section tone="offwhite">
        <Reveal><SectionHeading eyebrow="Our Difference" title="What We Do Differently" /></Reveal>
        <Reveal delay={80}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((d) => (
              <Card key={d.title}>
                <IconBadge name={d.icon} />
                <h3 className="text-[1.05rem] font-semibold leading-snug text-charcoalDeep">{d.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoalSoft">{d.body}</p>
              </Card>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Vision */}
      <Section>
        <Reveal>
          <SectionHeading eyebrow="Our Vision" title={<>Help 100 Businesses Build <Highlight>₹100 Crore Businesses.</Highlight></>}
            lede="We want to work with ambitious entrepreneurs through the stages of their growth and help them build businesses that are financially strong, professionally managed and capable of scaling." />
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-10 text-[1.05rem] leading-relaxed text-charcoal">
            For us, reaching ₹100 crore isn’t simply about increasing revenue. It means building a business where:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {VISION_POINTS.map((v) => (
              <li key={v} className="flex items-start gap-3 rounded-xl border border-hair bg-white p-4 text-[0.96rem] text-charcoal">
                <Icon name="check" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-limeInk" />{v}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <Card tone="soft" hover={false} className="mt-10">
            <div className="space-y-4 text-[1.05rem] leading-relaxed text-charcoal">
              <p>Ultimately, our work isn’t about better spreadsheets or better reports.</p>
              <p className="font-display text-display-md font-semibold text-charcoalDeep">It’s about helping entrepreneurs build better businesses.</p>
              <p>More clarity. Better decisions. Stronger systems. Greater control. More time to focus on growth. That’s what we believe a good Fractional CFO should create.</p>
              <p className="font-medium text-charcoalDeep">We want to help build businesses that become stronger as they grow.</p>
            </div>
          </Card>
        </Reveal>
      </Section>

      {/* Founder */}
      <Section tone="offwhite">
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border border-hair bg-white shadow-card">
              <Image
                src="/profile.png"
                alt="CA Rohan Mehta - Founder of Finnpulse Advisors"
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover object-top"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-limeInk">Founder</p>
            <h2 className="mt-3 font-display text-display-lg font-semibold text-charcoalDeep">CA Rohan Mehta</h2>
            <p className="mt-2 text-[1.02rem] text-charcoalSoft">Founder, Finnpulse Advisors LLP</p>

            <div className="mt-7 space-y-4 leading-relaxed text-charcoalSoft">
              <p>Rohan Mehta is a Chartered Accountant and the founder of Finnpulse Advisors LLP.</p>
              <p>He works with growing businesses as a Fractional CFO, helping management improve financial visibility, profitability, working capital, systems, reporting and strategic decision-making.</p>
              <p>His approach combines finance, business understanding, technology, automation and AI to build practical financial systems that support growth.</p>
            </div>

            <blockquote className="mt-8 rounded-xl border border-[#D6EBBE] bg-limeSoft p-6">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.15em] text-limeInk">His belief</p>
              <p className="mt-3 font-display text-xl font-semibold leading-snug text-charcoalDeep sm:text-2xl">
                “Finance should not just tell you where your business has been. It should help you decide where it should go next.”
              </p>
            </blockquote>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title={<>Let’s Create <Highlight>Value Together.</Highlight></>}
        body="If you believe your business can benefit from a stronger finance function, we’d be happy to have a conversation."
        secondary={{ label: 'Take the CFO Readiness Test', href: '/cfo-readiness-test' }}
      />
    </>
  );
}
