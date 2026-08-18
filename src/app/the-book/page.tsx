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
    'One Year. Twelve Meetings. A Business Transformed. The real story of Suresh & Amit Bansal scaling from ₹5Cr to ₹40Cr with a Fractional CFO. By CA Rohan Mehta — read Chapter 1 free.',
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

const DISCOVER = [
  'How a single monthly meeting can give you control over your finances',
  'How to fix your accounting system to build trust in your numbers',
  'Why inventory tracking is the key to knowing your real margins',
  'How to build a budget you can actually use',
  'What good monthly reporting looks like',
  'How to raise funds with clarity and confidence',
  'How finance can go from a pain point to your biggest growth driver',
];

const CHAPTERS = [
  'Meet the Business',
  'The Finance Mess Behind the Growth',
  'The First CFO Meeting',
  'Uncovering the Gaps',
  'Designing the Accounting Backbone',
  'Systems That Run Without You',
  'Budgeting for Real Growth',
  'From Manual to Magical',
  'Numbers That Drive People',
  'Mastering Cash Flow',
  'Decision-Making with Data',
  'Ready for Scale',
  'Reporting That Drives Action',
  'The New Business Rhythm',
  'The Transformation',
];

const AUDIENCE = [
  'Your business has crossed ₹10 crore in turnover',
  'You’re running at full speed but feel like the numbers aren’t matching the effort',
  'Your team is working hard but you still don’t know where the cash is going',
  'You feel like your CA is only filing returns and not helping you grow',
  'You’re struggling to raise funds, manage working capital, or just get a monthly financial report you can trust',
  'You want to take control of your finance function by building a system and a rhythm that works through the Fractional CFO model',
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
        <Reveal>
          <SectionHeading
            eyebrow="The Story"
            title="A founder, a set of numbers, and one hour a month."
            lede="This is not a book about theory or abstract financial concepts. This is the real story of a business — just like yours — that hit a wall. And how one simple change… a monthly CFO meeting… changed everything."
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-10 space-y-6 border-l-2 border-hair pl-6 text-[1.05rem] leading-relaxed text-charcoalSoft sm:pl-8">
            <p className="text-lg font-medium text-charcoalDeep">
              In the world of fast-growing businesses, there’s a dangerous gap that most founders don’t notice until it’s almost too late: the gap between growth and control.
            </p>
            <p>
              On one side, you have growing sales, increasing orders, and expansion plans. On the other, a finance function that’s outdated, messy, under-resourced, and reactive.
            </p>
            <p>
              For years, <strong>Suresh Bansal</strong> ran a successful manufacturing business the old-fashioned way: hands-on management, personal relationships with vendors and clients, and a deep understanding of his product. It worked. It was steady. It was profitable.
            </p>
            <p>
              Then came his son, <strong>Amit</strong> — a second-generation entrepreneur full of energy, ideas, and ambition. He modernized sales, entered new markets, built a bigger team, and within a few years, the business scaled rapidly from <strong>₹5 crore to nearly ₹40 crore</strong> in turnover.
            </p>
            <div className="rounded-xl border border-hair bg-offwhite p-5 text-charcoal">
              <p className="font-semibold text-charcoalDeep">But the back-end systems didn’t scale with it:</p>
              <ul className="mt-3 grid gap-2 text-[0.98rem] sm:grid-cols-2">
                <li className="flex items-center gap-2">❌ Invoices recorded late or incorrectly</li>
                <li className="flex items-center gap-2">❌ No real-time inventory view</li>
                <li className="flex items-center gap-2">❌ Cash flow always tight in high sales months</li>
                <li className="flex items-center gap-2">❌ Profitability per product unknown</li>
                <li className="flex items-center gap-2">❌ Budgeting nonexistent</li>
                <li className="flex items-center gap-2">❌ MIS reports too late to act upon</li>
                <li className="flex items-center gap-2 lg:col-span-2">❌ Fundraising decisions based on gut, not data</li>
              </ul>
            </div>
            <p>
              What once was a smooth operation turned into chaos. The son began feeling like he was running blind, firefighting daily problems while losing grip on the big picture.
            </p>
            <p>
              The father, watching from the sidelines, saw the stress on his son’s face and the cracks in what he had built. They knew they needed help. Not just accounting help. Not just another CA. <strong>They needed a strategic partner in finance.</strong>
            </p>
            <p className="text-lg font-semibold text-charcoalDeep">
              That’s when they brought us in — as their Fractional CFO.
            </p>
            <p>
              This book is a month-by-month retelling of that transformation journey. Told from the perspective of the son, each chapter represents a monthly meeting we had with them, solving the biggest bottleneck holding the business back.
            </p>
            <p>
              The transformation didn’t happen overnight. It happened in a series of focused, action-oriented meetings: <em>One problem at a time. One system at a time. One breakthrough at a time.</em>
            </p>
          </div>
        </Reveal>

        {/* Year-end Transformation Outcome */}
        <Reveal delay={100}>
          <Card tone="soft" hover={false} className="mt-10">
            <h3 className="font-display text-xl font-semibold text-charcoalDeep">By the End of the Year:</h3>
            <ul className="mt-4 grid gap-3 text-[0.98rem] sm:grid-cols-2">
              <li className="flex items-center gap-3 text-charcoal"><Icon name="check" className="h-[18px] w-[18px] text-limeInk shrink-0" /> Financial systems were clean</li>
              <li className="flex items-center gap-3 text-charcoal"><Icon name="check" className="h-[18px] w-[18px] text-limeInk shrink-0" /> Inventory was fully visible</li>
              <li className="flex items-center gap-3 text-charcoal"><Icon name="check" className="h-[18px] w-[18px] text-limeInk shrink-0" /> Profit margins were optimized</li>
              <li className="flex items-center gap-3 text-charcoal"><Icon name="check" className="h-[18px] w-[18px] text-limeInk shrink-0" /> Clear forecast for the future</li>
              <li className="flex items-center gap-3 text-charcoal"><Icon name="check" className="h-[18px] w-[18px] text-limeInk shrink-0" /> Funding raised at the right time</li>
              <li className="flex items-center gap-3 text-charcoal"><Icon name="check" className="h-[18px] w-[18px] text-limeInk shrink-0" /> Decisions powered by data, not emotion</li>
            </ul>
            <p className="mt-6 font-display text-lg font-medium text-charcoalDeep">
              The father was proud. The son was confident.
            </p>
          </Card>
        </Reveal>
      </Section>

      {/* Inside the Book */}
      <Section tone="offwhite">
        <Reveal>
          <SectionHeading
            eyebrow="Inside the Book"
            title="What You’ll Discover Inside"
            lede="Across 15 chapters, see how finance goes from a pain point to your biggest growth driver."
          />
        </Reveal>
        <Reveal delay={80}>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {DISCOVER.map((d) => (
              <li key={d} className="flex items-start gap-3 rounded-xl border border-hair bg-white p-4.5 text-[0.98rem] leading-relaxed text-charcoal shadow-sm">
                <Icon name="check" className="mt-1 h-[18px] w-[18px] shrink-0 text-limeInk" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* What is a Fractional CFO? */}
      <Section narrow>
        <Reveal>
          <div className="rounded-2xl border border-[#D6EBBE] bg-gradient-to-br from-limeSoft/50 to-white p-7 sm:p-9 shadow-card">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-limeInk">A Quick Word</p>
            <h3 className="mt-2 font-display text-display-md font-semibold text-charcoalDeep">
              What Is a Fractional CFO?
            </h3>
            <div className="mt-4 space-y-4 text-[1.02rem] leading-relaxed text-charcoalSoft">
              <p>
                A <strong>Fractional CFO</strong> (also called a Virtual CFO) is a senior finance professional who works with your business on a part-time, retainer basis — typically a few days a month — instead of as a full-time employee. You get the strategic thinking, financial discipline, and decision support of an experienced CFO, without the ₹1-crore-plus annual cost of hiring one full-time.
              </p>
              <p>
                A Fractional CFO is different from your Chartered Accountant in one key way: a <strong>CA typically focuses on compliance</strong> — filing GST returns, finalising accounts, closing audits. A <strong>Fractional CFO focuses on control and strategy</strong> — building your MIS, tracking cash flow and margins, running budgets, preparing you for funding, and sitting across the table with you every month to review numbers and decide what to do next.
              </p>
              <p className="font-medium text-charcoalDeep">
                For a growing SME, this model offers the best of both worlds: senior-level financial guidance at a fraction of the cost, delivered through a structured monthly rhythm.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Read a Chapter Free */}
      <Section narrow>
        <Reveal>
          <Card tone="soft" hover={false} className="text-center">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-limeInk">Read a Chapter Free</p>
            <h3 className="mx-auto mt-4 max-w-2xl font-display text-display-md font-semibold text-charcoalDeep">
              A Wake-Up Call for Every Founder Who’s Scaled Faster Than Their Systems
            </h3>
            <p className="mx-auto mt-4 max-w-prose text-[1.02rem] leading-relaxed text-charcoal">
              This isn’t a pitch for Fractional CFO services. It’s a roadmap to take your business from reactive to strategic, from chaotic to confident, and from stress to scalability.
            </p>
            <p className="mt-4 font-display text-lg font-medium text-charcoalDeep">
              Let’s start from the beginning. Let’s meet the business that took this journey.
            </p>
            <div className="mt-8 flex justify-center"><ChapterReader /></div>
          </Card>
        </Reveal>
      </Section>

      {/* Contents / 15 Chapters */}
      <Section tone="offwhite">
        <Reveal>
          <SectionHeading eyebrow="Contents" title="15 Chapters of Transformation" lede="Each chapter represents one monthly meeting and solves one key financial bottleneck." />
        </Reveal>
        <Reveal delay={80}>
          <ol className="mt-10 grid gap-x-10 sm:grid-cols-2">
            {CHAPTERS.map((c, i) => (
              <li key={c} className="flex items-baseline gap-4 border-b border-hair py-3.5">
                <span className="w-9 shrink-0 font-mono text-[0.78rem] font-semibold tracking-wide text-limeInk">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[1rem] font-medium text-charcoalDeep">{c}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* Readership / Who This Book Is For */}
      <Section>
        <Reveal>
          <SectionHeading eyebrow="Readership" title="Who Is This Book For?" lede="If you’re an entrepreneur stuck in the chaos of growth, this book is written for you." />
        </Reveal>
        <Reveal delay={80}>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {AUDIENCE.map((a) => (
              <li key={a} className="flex items-start gap-3 rounded-xl border border-hair bg-white p-4.5 text-[0.98rem] leading-relaxed text-charcoal shadow-sm">
                <Icon name="check" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-limeInk" />
                <span>{a}</span>
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
