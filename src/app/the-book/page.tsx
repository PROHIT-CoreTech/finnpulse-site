import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import Highlight from '@/components/ui/Highlight';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import BookCover from '@/components/BookCover';
import BuyBookButton from '@/components/BuyBookButton';
import ChapterReader from '@/components/ChapterReader';
import Reveal from '@/components/Reveal';
import ScrollDepth from '@/components/ScrollDepth';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'The CFO Meeting Book',
  description:
    'One Year. Twelve Meetings. A Business Transformed. Read the story behind The CFO Meeting™ by CA Rohan Mehta — and read Chapter 1 free.',
  alternates: { canonical: '/the-book' },
  openGraph: { type: 'book' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'The CFO Meeting',
  author: { '@type': 'Person', name: 'CA Rohan Mehta' },
  publisher: { '@type': 'Organization', name: site.name },
  inLanguage: 'en',
  url: `${site.url}/the-book`,
  description: 'A practical account of how one growing business was transformed through twelve monthly finance meetings.',
};

const STORY = [
  'A business grows from ₹5 crore to nearly ₹40 crore.',
  'Sales are increasing. The team is growing. Opportunities are everywhere.',
  'But the finance function hasn’t kept pace.',
  'Cash is tight. Inventory isn’t reliable. Margins aren’t clear. MIS comes too late. The founder is firefighting.',
  'Then comes one decision: Bring in a Fractional CFO.',
  'What follows is one year, twelve monthly meetings and a transformation in the way the business is run.',
];

const DISCOVER = [
  'How to build financial control',
  'How to fix the accounting backbone',
  'How to create systems that run without the founder',
  'How to build a practical budget',
  'How to automate finance processes',
  'How to make teams accountable through KPIs',
  'How to control working capital and cash flow',
  'How to use data to make better decisions',
  'How to prepare a business for funding and scale',
  'How finance can become a growth engine instead of a back-office function',
];

const CHAPTERS = [
  'Meet the Business', 'The Finance Mess Behind the Growth', 'The First CFO Meeting',
  'Uncovering the Gaps', 'Designing the Accounting Backbone', 'Systems That Run Without You',
  'Budgeting for Real Growth', 'From Manual to Magical', 'Numbers That Drive People',
  'Mastering Cash Flow', 'Decision-Making with Data', 'Ready for Scale',
  'Reporting That Drives Action', 'The New Business Rhythm', 'The Transformation',
];

const AUDIENCE = [
  'Your business has crossed ₹10 crore',
  'You’re growing but don’t feel completely in control',
  'You struggle with cash flow',
  'You don’t fully trust your MIS',
  'Your accounts team is busy but finance still feels reactive',
  'You want to scale but know your systems aren’t ready',
  'You’re a second-generation entrepreneur trying to build on what the previous generation created',
];

export default function TheBookPage() {
  return (
    <>
      <ScrollDepth page="book" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-offwhite py-14 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-wrap items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <BookCover />
          <div>
            <p className="flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-limeInk">
              <span aria-hidden className="h-0.5 w-5 bg-limeInk" />By CA Rohan Mehta
            </p>
            <h1 className="mt-5 font-display text-display-xl font-semibold text-charcoalDeep">
              Read the Story Behind <Highlight>The CFO Meeting™</Highlight>
            </h1>
            <p className="mt-6 font-display text-display-md font-semibold text-charcoalSoft">
              One Year. Twelve Meetings. A Business Transformed.
            </p>
            <div className="mt-8 flex flex-wrap items-start gap-3">
              <ChapterReader />
              <BuyBookButton location="book_hero" variant="outline" />
            </div>
          </div>
        </div>
      </section>

      {/* The story */}
      <Section narrow>
        <Reveal><SectionHeading eyebrow="The Story" title="A founder, a set of numbers, and one hour a month." /></Reveal>
        <Reveal delay={60}>
          <div className="mt-10 space-y-5 border-l-2 border-hair pl-6 text-[1.05rem] leading-relaxed text-charcoalSoft sm:pl-8">
            {STORY.map((line, i) => (
              <p key={line} className={i === 4 || i === 5 ? 'font-medium text-charcoalDeep' : ''}>{line}</p>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* What you'll discover */}
      <Section tone="offwhite">
        <Reveal><SectionHeading eyebrow="Inside the Book" title="What You’ll Discover Inside" /></Reveal>
        <Reveal delay={80}>
          <ul className="mt-10 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {DISCOVER.map((d) => (
              <li key={d} className="flex items-start gap-3 text-[0.98rem] leading-relaxed text-charcoal">
                <Icon name="check" className="mt-1 h-[18px] w-[18px] shrink-0 text-limeInk" />{d}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Free chapter */}
      <Section narrow>
        <Reveal>
          <Card tone="soft" hover={false} className="text-center">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-limeInk">Read a Chapter Free</p>
            <p className="mx-auto mt-5 max-w-prose font-display text-display-md font-semibold text-charcoalDeep">
              Don’t buy the book because we tell you it’s useful.
            </p>
            <p className="mx-auto mt-4 max-w-prose text-[1.02rem] leading-relaxed text-charcoal">
              Read the first chapter. If the story resonates with you, continue the journey.
            </p>
            <div className="mt-8 flex justify-center"><ChapterReader /></div>
          </Card>
        </Reveal>
      </Section>

      {/* Chapter list */}
      <Section tone="offwhite">
        <Reveal><SectionHeading eyebrow="Contents" title="What’s Inside?" /></Reveal>
        <Reveal delay={80}>
          <ol className="mt-10 grid gap-x-10 sm:grid-cols-2">
            {CHAPTERS.map((c, i) => (
              <li key={c} className="flex items-baseline gap-4 border-b border-hair py-3.5">
                <span className="w-9 shrink-0 font-mono text-[0.75rem] tracking-wide text-limeInk">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[1rem] font-medium text-charcoalDeep">{c}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* Who it's for */}
      <Section>
        <Reveal><SectionHeading eyebrow="Readership" title="Who Is This Book For?" /></Reveal>
        <Reveal delay={80}>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {AUDIENCE.map((a) => (
              <li key={a} className="flex items-start gap-3 rounded-xl border border-hair bg-white p-4 text-[0.96rem] leading-relaxed text-charcoal">
                <Icon name="check" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-limeInk" />{a}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-charcoalDeep py-16 sm:py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-[radial-gradient(600px_200px_at_50%_100%,rgba(192,255,114,0.14),transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-display-lg font-semibold text-white">Ready to Read the Rest?</h2>
          <p className="mt-5 font-display text-xl text-white/70">One Year. Twelve Meetings. A Business Transformed.</p>
          <div className="mt-8 flex flex-wrap items-start justify-center gap-3">
            <BuyBookButton location="book_footer" />
            <ChapterReader label="Read a Free Chapter" variant="outline" />
          </div>
        </div>
      </section>
    </>
  );
}
