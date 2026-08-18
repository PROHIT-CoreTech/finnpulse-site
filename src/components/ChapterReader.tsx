'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import BuyBookButton from '@/components/BuyBookButton';
import TrackedCta from '@/components/TrackedCta';
import { bookingHref } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

export default function ChapterReader({
  label = 'Read Chapter 1 →',
  variant = 'primary',
  inline = false,
}: {
  label?: string;
  variant?: 'primary' | 'outline' | 'outlineLight';
  inline?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setExpanded(true);
      const el = document.getElementById('read-chapter-free');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('open-chapter-1', handleOpen);
    return () => window.removeEventListener('open-chapter-1', handleOpen);
  }, []);

  const toggleExpand = (state: boolean) => {
    setExpanded(state);
    if (state) {
      trackEvent('chapter_one_open', { source: 'the_book' });
      const el = document.getElementById('read-chapter-free');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If this is a trigger button in Hero or Footer:
  if (!inline) {
    return (
      <Button
        variant={variant}
        onClick={() => {
          window.dispatchEvent(new CustomEvent('open-chapter-1'));
        }}
      >
        {label}
      </Button>
    );
  }

  // Inline Section Reader (Expands in-place to cover the section)
  return (
    <div id="read-chapter-free" className="w-full transition-all duration-300">
      {!expanded ? (
        <Card tone="soft" hover={false} className="text-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-limeInk">
            Read a Chapter Free
          </p>
          <h3 className="mx-auto mt-4 max-w-2xl font-display text-display-md font-semibold text-charcoalDeep">
            Don’t buy the book because we tell you it’s useful.
          </h3>
          <p className="mx-auto mt-4 max-w-prose text-[1.02rem] leading-relaxed text-charcoal">
            Read the first chapter. If the story resonates with you, continue the journey.
          </p>
          <div className="mt-8 flex justify-center">
            <Button variant={variant} onClick={() => toggleExpand(true)}>
              {label}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="w-full rounded-3xl border border-[#D6EBBE] bg-white p-6 sm:p-10 shadow-lift animate-rise">
          {/* Top Header Bar inside Section */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hair pb-6">
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-limeSoft px-3 py-1 font-mono text-xs font-semibold text-limeInk">
                Free Sample
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                The CFO Meeting™ · Chapter 1: Meet the Business
              </span>
            </div>
            <Button size="sm" variant="outline" onClick={() => toggleExpand(false)}>
              Close Chapter 1 ✕
            </Button>
          </div>

          {/* Full Chapter Content covering the Section */}
          <div className="mt-8 space-y-8 text-[1.08rem] leading-relaxed text-charcoalSoft">
            <div className="border-b border-hair pb-6">
              <h2 className="font-display text-display-xl font-semibold text-charcoalDeep">
                Chapter 1: Meet the Business
              </h2>
              <p className="mt-2 font-mono text-sm uppercase tracking-[0.15em] text-limeInk">
                By CA Rohan Mehta · Founder, Finnpulse Advisors
              </p>
            </div>

            {/* About This Book Intro */}
            <div className="space-y-4">
              <h3 className="font-display text-display-md font-semibold text-charcoalDeep">
                About This Book
              </h3>
              <blockquote className="border-l-4 border-limeInk pl-6 text-lg font-medium italic text-charcoalDeep space-y-2">
                <p>This is not a book about theory.</p>
                <p>This is not a book full of jargon or abstract financial concepts.</p>
                <p>This is the real story of a business — just like yours — that hit a wall.</p>
                <p>And how one simple change… a monthly CFO meeting… changed everything.</p>
              </blockquote>
            </div>

            {/* The Gap */}
            <div className="rounded-2xl border border-hair bg-offwhite p-6 sm:p-8 space-y-3">
              <p className="text-lg font-semibold text-charcoalDeep">
                In the world of fast-growing businesses, there’s a dangerous gap that most founders don’t notice until it’s almost too late.
              </p>
              <p className="text-xl font-display font-semibold text-limeInk">
                That gap is between growth and control.
              </p>
              <p>
                On one side, you have growing sales, increasing orders, and expansion plans. On the other, a finance function that’s outdated, messy, under-resourced, and reactive.
              </p>
            </div>

            {/* Story: Suresh & Amit */}
            <div className="space-y-4">
              <p>
                For years, <strong>Suresh Bansal</strong> ran a successful manufacturing business the old-fashioned way: hands-on management, personal relationships with vendors and clients, and a deep understanding of his product. It worked. It was steady. It was profitable.
              </p>
              <p>
                Then came his son, <strong>Amit</strong> — a second-generation entrepreneur full of energy, ideas, and ambition. He modernized sales, entered new markets, built a bigger team, and within a few years, the business scaled rapidly from <strong>₹5 crore to nearly ₹40 crore</strong> in turnover.
              </p>
            </div>

            {/* The Breakdown */}
            <div className="rounded-2xl border border-hair bg-white p-6 sm:p-8 shadow-card space-y-4">
              <h3 className="font-display text-xl font-semibold text-charcoalDeep">
                But the back-end systems didn’t scale with it:
              </h3>
              <ul className="grid gap-3 text-[1rem] sm:grid-cols-2 text-charcoal">
                <li className="flex items-start gap-2.5"><span className="text-red-500 font-bold">✕</span> Invoices recorded late or incorrectly</li>
                <li className="flex items-start gap-2.5"><span className="text-red-500 font-bold">✕</span> No real-time inventory view</li>
                <li className="flex items-start gap-2.5"><span className="text-red-500 font-bold">✕</span> Cash flow always tight, even in high sales months</li>
                <li className="flex items-start gap-2.5"><span className="text-red-500 font-bold">✕</span> Profitability per product? Unknown.</li>
                <li className="flex items-start gap-2.5"><span className="text-red-500 font-bold">✕</span> Budgeting? Nonexistent.</li>
                <li className="flex items-start gap-2.5"><span className="text-red-500 font-bold">✕</span> MIS reports? Too late to act upon.</li>
                <li className="flex items-start gap-2.5 sm:col-span-2"><span className="text-red-500 font-bold">✕</span> Fundraising decisions? Based on gut, not data.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <p>
                What once was a smooth operation turned into chaos. The son began feeling like he was running blind, firefighting daily problems while losing grip on the big picture.
              </p>
              <p>
                The father, watching from the sidelines, saw the stress on his son’s face and the cracks in what he had built. They knew they needed help. Not just accounting help. Not just another CA.
              </p>
              <p className="text-lg font-semibold text-charcoalDeep">
                They needed a strategic partner in finance.
              </p>
              <p className="text-xl font-display font-semibold text-limeInk">
                That’s when they brought us in — as their Fractional CFO.
              </p>
              <p>
                This book is a month-by-month retelling of that transformation journey. It’s written in the form of a story, told from the perspective of the son. Each chapter represents a monthly meeting we had with them. In each of these meetings, we solved one key finance problem — the biggest bottleneck holding the business back.
              </p>
              <p>
                From setting up clean accounting systems to building budgets, from managing receivables to raising funds, each meeting added one layer of financial strength, control, and insight.
              </p>
              <p className="font-medium italic text-charcoalDeep">
                The transformation didn’t happen overnight. It happened in a series of focused, action-oriented meetings: One problem at a time. One system at a time. One breakthrough at a time.
              </p>
            </div>

            {/* Outcome Card */}
            <div className="rounded-2xl border border-[#D6EBBE] bg-limeSoft/50 p-6 sm:p-8 space-y-4">
              <h3 className="font-display text-xl font-semibold text-charcoalDeep">
                By the End of the Year:
              </h3>
              <ul className="grid gap-3 text-[1rem] sm:grid-cols-2 text-charcoal">
                <li className="flex items-center gap-2.5"><Icon name="check" className="h-5 w-5 text-limeInk shrink-0" /> Their financial systems were clean.</li>
                <li className="flex items-center gap-2.5"><Icon name="check" className="h-5 w-5 text-limeInk shrink-0" /> Their inventory was fully visible.</li>
                <li className="flex items-center gap-2.5"><Icon name="check" className="h-5 w-5 text-limeInk shrink-0" /> Profit margins were optimized.</li>
                <li className="flex items-center gap-2.5"><Icon name="check" className="h-5 w-5 text-limeInk shrink-0" /> They had a clear forecast for the future.</li>
                <li className="flex items-center gap-2.5"><Icon name="check" className="h-5 w-5 text-limeInk shrink-0" /> Funding was raised at the right time.</li>
                <li className="flex items-center gap-2.5"><Icon name="check" className="h-5 w-5 text-limeInk shrink-0" /> Decision-making powered by data, not emotion.</li>
              </ul>
              <p className="mt-4 font-display text-lg font-semibold text-charcoalDeep">
                The father was proud. The son was confident.
              </p>
            </div>

            {/* Who This Book Is For */}
            <div className="space-y-4 pt-4">
              <h3 className="font-display text-display-md font-semibold text-charcoalDeep">
                Who This Book Is For
              </h3>
              <p>This book is for the entrepreneur stuck in the chaos of growth.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 rounded-xl border border-hair bg-offwhite p-4 text-[0.98rem]">
                  <Icon name="check" className="mt-1 h-5 w-5 text-limeInk shrink-0" />
                  <span>If your business has crossed <strong>₹10 crore in turnover...</strong></span>
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-hair bg-offwhite p-4 text-[0.98rem]">
                  <Icon name="check" className="mt-1 h-5 w-5 text-limeInk shrink-0" />
                  <span>If you’re running at full speed but feel like the numbers aren’t matching the effort...</span>
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-hair bg-offwhite p-4 text-[0.98rem]">
                  <Icon name="check" className="mt-1 h-5 w-5 text-limeInk shrink-0" />
                  <span>If your team is working hard but you still don’t know where the cash is going...</span>
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-hair bg-offwhite p-4 text-[0.98rem]">
                  <Icon name="check" className="mt-1 h-5 w-5 text-limeInk shrink-0" />
                  <span>If you feel like your CA is only filing returns and not helping you grow...</span>
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-hair bg-offwhite p-4 text-[0.98rem]">
                  <Icon name="check" className="mt-1 h-5 w-5 text-limeInk shrink-0" />
                  <span>If you’re struggling to raise funds, manage working capital, or get a monthly financial report you can trust…</span>
                </li>
              </ul>
              <p className="text-lg font-medium text-charcoalDeep">
                Then this book is for you.
              </p>
              <p>
                It will show you what’s possible when you take control of your finance function. Not by doing it yourself, but by building a system and a rhythm that works for you — through the Fractional CFO model.
              </p>
            </div>

            {/* What Is a Fractional CFO? */}
            <div className="rounded-2xl border border-hair bg-gradient-to-br from-white to-offwhite p-7 sm:p-9 shadow-card space-y-4">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-limeInk">A Quick Word</p>
              <h3 className="font-display text-display-md font-semibold text-charcoalDeep">
                What Is a Fractional CFO?
              </h3>
              <p>
                A <strong>Fractional CFO</strong> (also called a Virtual CFO) is a senior finance professional who works with your business on a part-time, retainer basis — typically a few days a month — instead of as a full-time employee. You get the strategic thinking, financial discipline, and decision support of an experienced CFO, without the ₹1-crore-plus annual cost of hiring one full-time.
              </p>
              <p>
                A Fractional CFO is different from your Chartered Accountant in one key way: a <strong>CA typically focuses on compliance</strong> — filing GST returns, finalising accounts, closing audits. A <strong>Fractional CFO focuses on control and strategy</strong> — building your MIS, tracking cash flow and margins, running budgets, preparing you for funding, and sitting across the table with you every month to review numbers and decide what to do next.
              </p>
              <p className="font-medium text-charcoalDeep">
                For a growing SME, this model offers the best of both worlds: senior-level financial guidance at a fraction of the cost, delivered through a structured monthly rhythm rather than an ad hoc phone call.
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="space-y-4 pt-4">
              <h3 className="font-display text-display-md font-semibold text-charcoalDeep">
                What You’ll Learn
              </h3>
              <p className="text-charcoalSoft">Across 15 chapters, you’ll see:</p>
              <ul className="grid gap-3 sm:grid-cols-2 text-[0.98rem]">
                <li className="flex items-start gap-2.5 rounded-lg border border-hair bg-white p-3.5">
                  <Icon name="check" className="h-5 w-5 text-limeInk shrink-0 mt-0.5" />
                  <span>How a single monthly meeting can give you control over your finances</span>
                </li>
                <li className="flex items-start gap-2.5 rounded-lg border border-hair bg-white p-3.5">
                  <Icon name="check" className="h-5 w-5 text-limeInk shrink-0 mt-0.5" />
                  <span>How to fix your accounting system to build trust in your numbers</span>
                </li>
                <li className="flex items-start gap-2.5 rounded-lg border border-hair bg-white p-3.5">
                  <Icon name="check" className="h-5 w-5 text-limeInk shrink-0 mt-0.5" />
                  <span>Why inventory tracking is the key to knowing your real margins</span>
                </li>
                <li className="flex items-start gap-2.5 rounded-lg border border-hair bg-white p-3.5">
                  <Icon name="check" className="h-5 w-5 text-limeInk shrink-0 mt-0.5" />
                  <span>How to build a budget you can actually use</span>
                </li>
                <li className="flex items-start gap-2.5 rounded-lg border border-hair bg-white p-3.5">
                  <Icon name="check" className="h-5 w-5 text-limeInk shrink-0 mt-0.5" />
                  <span>What good monthly reporting looks like</span>
                </li>
                <li className="flex items-start gap-2.5 rounded-lg border border-hair bg-white p-3.5">
                  <Icon name="check" className="h-5 w-5 text-limeInk shrink-0 mt-0.5" />
                  <span>How to raise funds with clarity and confidence</span>
                </li>
                <li className="flex items-start gap-2.5 sm:col-span-2 rounded-lg border border-hair bg-white p-3.5">
                  <Icon name="check" className="h-5 w-5 text-limeInk shrink-0 mt-0.5" />
                  <span>How finance can go from a pain point to your biggest growth driver</span>
                </li>
              </ul>
            </div>

            {/* Conclusion callout */}
            <div className="rounded-2xl bg-charcoalDeep p-8 text-white space-y-4">
              <p className="font-display text-xl font-semibold text-lime">
                This isn’t a pitch for Fractional CFO services.
              </p>
              <p className="text-white/80 leading-relaxed">
                This is a wake-up call for every founder who’s scaled faster than their systems. It’s a roadmap to take your business from reactive to strategic. From chaotic to confident. From stress to scalability.
              </p>
              <p className="font-display text-lg font-medium text-white">
                Let’s start from the beginning. Let’s meet the business that took this journey.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-hair pt-8">
              <Button variant="outline" onClick={() => toggleExpand(false)}>
                Close Chapter 1 ✕
              </Button>

              <div className="flex flex-wrap items-center gap-3">
                <BuyBookButton location="chapter_reader_inline" />
                <TrackedCta label="Book CFO Discovery Meeting" location="chapter_reader_inline">
                  <Button href={bookingHref} variant="outline">
                    Book a Discovery Meeting
                  </Button>
                </TrackedCta>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
