'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import BuyBookButton from '@/components/BuyBookButton';
import TrackedCta from '@/components/TrackedCta';
import { bookingHref } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

type Theme = 'cream' | 'sepia' | 'dark';
type FontSize = 'sm' | 'base' | 'lg';

export default function ChapterReader({
  label = 'Read Chapter 1 →',
  variant = 'primary',
  inline = false,
}: {
  label?: string;
  variant?: 'primary' | 'outline' | 'outlineLight';
  inline?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('cream');
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Synchronized global event listeners for open and close
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      trackEvent('chapter_one_open', { source: 'button_trigger' });
    };
    const handleClose = () => {
      setIsOpen(false);
    };

    window.addEventListener('open-chapter-1', handleOpen);
    window.addEventListener('close-chapter-1', handleClose);
    return () => {
      window.removeEventListener('open-chapter-1', handleOpen);
      window.removeEventListener('close-chapter-1', handleClose);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('close-chapter-1'));
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Calculate scroll progress percentage inside the book container
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const total = scrollHeight - clientHeight;
    if (total > 0) {
      const p = Math.min(100, Math.max(0, Math.round((scrollTop / total) * 100)));
      setProgress(p);
    }
  };

  const openReader = () => {
    window.dispatchEvent(new CustomEvent('open-chapter-1'));
  };

  // Theme styling definitions
  const themeStyles = {
    cream: {
      bg: 'bg-[#FAF7F2]',
      pageBg: 'bg-[#FFFDF9]',
      text: 'text-[#2C2A26]',
      heading: 'text-[#1A1916]',
      subtext: 'text-[#5C584F]',
      accent: 'text-[#4C7A1C]',
      border: 'border-[#EBE3D5]',
      cardBg: 'bg-[#F4EFE6]',
      shadow: 'shadow-[0_20px_60px_-15px_rgba(44,42,38,0.18)]',
      spine: 'border-l-4 border-l-[#DFD5C3]',
    },
    sepia: {
      bg: 'bg-[#F3ECE0]',
      pageBg: 'bg-[#FAF4E8]',
      text: 'text-[#362E24]',
      heading: 'text-[#241D15]',
      subtext: 'text-[#685A49]',
      accent: 'text-[#8A5A1A]',
      border: 'border-[#E4D7C3]',
      cardBg: 'bg-[#EAE0CD]',
      shadow: 'shadow-[0_20px_60px_-15px_rgba(54,46,36,0.2)]',
      spine: 'border-l-4 border-l-[#D7C7B0]',
    },
    dark: {
      bg: 'bg-[#181715]',
      pageBg: 'bg-[#22201D]',
      text: 'text-[#E3DEC3]',
      heading: 'text-[#F5F2EB]',
      subtext: 'text-[#A6A093]',
      accent: 'text-[#C0FF72]',
      border: 'border-[#383530]',
      cardBg: 'bg-[#2B2925]',
      shadow: 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]',
      spine: 'border-l-4 border-l-[#3D3934]',
    },
  }[theme];

  const fontSizeStyles = {
    sm: 'text-[0.98rem] leading-[1.75]',
    base: 'text-[1.12rem] leading-[1.85]',
    lg: 'text-[1.25rem] leading-[1.9]',
  }[fontSize];

  // Standalone Trigger Buttons (Hero / Footer):
  // They only trigger the global open-chapter-1 event.
  if (!inline) {
    return (
      <Button
        variant={variant}
        onClick={openReader}
      >
        {label}
      </Button>
    );
  }

  // Inline Section Reader Component on /the-book page:
  // Manages and renders the single Book Reader modal.
  return (
    <div id="read-chapter-free" className="w-full">
      <Card tone="soft" hover={false} className="text-center transition-all duration-300">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-limeInk/10 text-limeInk">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <p className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-limeInk">
          Read a Chapter Free
        </p>
        <h3 className="mx-auto mt-3 max-w-2xl font-display text-display-md font-semibold text-charcoalDeep">
          Don’t buy the book because we tell you it’s useful.
        </h3>
        <p className="mx-auto mt-3 max-w-prose text-[1.02rem] leading-relaxed text-charcoal">
          Read the first chapter in our interactive book reader. If the story resonates with you, continue the journey.
        </p>
        <div className="mt-7 flex justify-center">
          <Button variant={variant} onClick={openReader}>
            📖 Open Book Reader
          </Button>
        </div>
      </Card>

      {/* Render Single Reader Modal */}
      {isOpen && renderBookModal()}
    </div>
  );

  /* -------------------------------------------------------------------------- */
  /* BOOK READER MODAL IMPLEMENTATION                                           */
  /* -------------------------------------------------------------------------- */
  function renderBookModal() {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/75 p-2 backdrop-blur-md transition-opacity duration-300 sm:p-4 md:p-6"
        role="dialog"
        aria-modal="true"
        aria-label="The CFO Meeting — Chapter 1"
      >
        {/* Main Book Shell */}
        <div className={`relative flex h-full max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl ${themeStyles.bg} ${themeStyles.shadow} transition-colors duration-300`}>
          
          {/* Top Book Reader Controls Header */}
          <header className={`flex shrink-0 items-center justify-between border-b ${themeStyles.border} px-4 py-3 sm:px-6`}>
            {/* Left: Book Title */}
            <div className="flex items-center gap-3">
              <span className="hidden rounded bg-limeInk/15 px-2.5 py-1 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-limeInk sm:inline-block">
                Free Preview
              </span>
              <div className="flex flex-col">
                <span className={`font-display text-sm font-semibold tracking-wide ${themeStyles.heading}`}>
                  The CFO Meeting™
                </span>
                <span className={`font-mono text-[0.68rem] uppercase tracking-wider ${themeStyles.subtext}`}>
                  Chapter 1: Meet the Business
                </span>
              </div>
            </div>

            {/* Middle: Reading Progress */}
            <div className="hidden items-center gap-2 sm:flex">
              <div className={`h-1.5 w-24 overflow-hidden rounded-full ${themeStyles.border} bg-black/10`}>
                <div
                  className="h-full bg-limeInk transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={`font-mono text-[0.7rem] ${themeStyles.subtext}`}>
                {progress}%
              </span>
            </div>

            {/* Right: Customization Controls & Close */}
            <div className="flex items-center gap-2">
              {/* Font Size Selector */}
              <div className={`flex items-center rounded-lg border ${themeStyles.border} ${themeStyles.cardBg} p-0.5`}>
                <button
                  type="button"
                  title="Smaller text"
                  onClick={() => setFontSize('sm')}
                  className={`px-2 py-1 font-serif text-xs font-semibold ${fontSize === 'sm' ? 'rounded bg-white/40 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                >
                  A-
                </button>
                <button
                  type="button"
                  title="Normal text"
                  onClick={() => setFontSize('base')}
                  className={`px-2 py-1 font-serif text-xs font-semibold ${fontSize === 'base' ? 'rounded bg-white/40 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                >
                  A
                </button>
                <button
                  type="button"
                  title="Larger text"
                  onClick={() => setFontSize('lg')}
                  className={`px-2 py-1 font-serif text-sm font-semibold ${fontSize === 'lg' ? 'rounded bg-white/40 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                >
                  A+
                </button>
              </div>

              {/* Theme Selector */}
              <div className={`flex items-center rounded-lg border ${themeStyles.border} ${themeStyles.cardBg} p-0.5`}>
                <button
                  type="button"
                  title="Cream Paper"
                  onClick={() => setTheme('cream')}
                  className={`h-5 w-5 rounded-full bg-[#FAF7F2] border border-[#D5CDBC] transition-transform ${theme === 'cream' ? 'ring-2 ring-limeInk scale-110' : 'opacity-70 hover:opacity-100'}`}
                />
                <button
                  type="button"
                  title="Sepia Paper"
                  onClick={() => setTheme('sepia')}
                  className={`ml-1 h-5 w-5 rounded-full bg-[#F3ECE0] border border-[#C5BBA7] transition-transform ${theme === 'sepia' ? 'ring-2 ring-[#8A5A1A] scale-110' : 'opacity-70 hover:opacity-100'}`}
                />
                <button
                  type="button"
                  title="Night Mode"
                  onClick={() => setTheme('dark')}
                  className={`ml-1 h-5 w-5 rounded-full bg-[#181715] border border-[#444] transition-transform ${theme === 'dark' ? 'ring-2 ring-[#C0FF72] scale-110' : 'opacity-70 hover:opacity-100'}`}
                />
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className={`ml-2 flex h-9 w-9 items-center justify-center rounded-full border ${themeStyles.border} ${themeStyles.cardBg} ${themeStyles.heading} transition-colors hover:bg-red-500 hover:text-white`}
                aria-label="Close book reader"
              >
                ✕
              </button>
            </div>
          </header>

          {/* Book Page Reading Area */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className={`relative flex-1 overflow-y-auto ${themeStyles.pageBg} ${themeStyles.spine} px-6 py-8 sm:px-12 sm:py-14 md:px-16 md:py-16 selection:bg-lime/40 selection:text-charcoalDeep transition-colors duration-300`}
          >
            {/* Decorative Ribbon Bookmark */}
            <div
              aria-hidden
              className="absolute right-8 top-0 h-16 w-6 rounded-b-md bg-limeInk shadow-md sm:right-14"
            >
              <div className="absolute inset-x-0 bottom-0 h-0 w-0 border-x-12 border-b-[10px] border-x-transparent border-b-[#FAF7F2]" />
            </div>

            {/* Book Inner Content Container */}
            <article className={`mx-auto max-w-2xl font-serif ${fontSizeStyles} ${themeStyles.text}`}>
              
              {/* Book Header / Running Title */}
              <div className={`mb-12 border-b-2 ${themeStyles.border} pb-8 text-center`}>
                <span className={`font-mono text-xs uppercase tracking-[0.25em] ${themeStyles.accent}`}>
                  CHAPTER ONE
                </span>
                <h1 className={`mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl ${themeStyles.heading}`}>
                  Meet the Business
                </h1>
                <p className={`mt-4 font-serif text-base italic ${themeStyles.subtext}`}>
                  By CA Rohan Mehta · Founder, Finnpulse Advisors
                </p>
                
                {/* Ornamental Section Divider */}
                <div className={`mt-6 flex items-center justify-center gap-3 ${themeStyles.subtext} opacity-50`}>
                  <span className="h-px w-12 bg-current" />
                  <span className="font-serif text-sm">❖ ❖ ❖</span>
                  <span className="h-px w-12 bg-current" />
                </div>
              </div>

              {/* Book Content Body */}
              <div className="space-y-8">
                
                {/* Intro Callout */}
                <div className={`rounded-xl border ${themeStyles.border} ${themeStyles.cardBg} p-6 sm:p-8 italic shadow-sm`}>
                  <h2 className={`not-italic font-display text-xl font-bold ${themeStyles.heading} mb-3`}>
                    About This Book
                  </h2>
                  <p className="mb-2">This is not a book about theory.</p>
                  <p className="mb-2">This is not a book full of jargon or abstract financial concepts.</p>
                  <p className="mb-2">This is the real story of a business — just like yours — that hit a wall.</p>
                  <p className="font-semibold not-italic">And how one simple change… a monthly CFO meeting… changed everything.</p>
                </div>

                {/* Opening Paragraph with Drop Cap */}
                <p className="relative">
                  <span className={`float-left mr-3.5 mt-1 font-display text-6xl font-bold leading-none ${themeStyles.accent}`}>
                    I
                  </span>
                  n the world of fast-growing businesses, there’s a dangerous gap that most founders don’t notice until it’s almost too late. That gap is between <strong>growth and control</strong>. On one side, you have growing sales, increasing orders, and expansion plans. On the other, a finance function that’s outdated, messy, under-resourced, and reactive.
                </p>

                {/* Story Block: Suresh & Amit */}
                <h2 className={`pt-4 font-display text-2xl font-bold ${themeStyles.heading}`}>
                  The Story of Suresh & Amit
                </h2>

                <p>
                  For years, <strong>Suresh Bansal</strong> ran a successful manufacturing business the old-fashioned way: hands-on management, personal relationships with vendors and clients, and a deep understanding of his product. It worked. It was steady. It was profitable.
                </p>
                
                <p>
                  Then came his son, <strong>Amit</strong> — a second-generation entrepreneur full of energy, ideas, and ambition. He modernized sales, entered new markets, built a bigger team, and within a few years, the business scaled rapidly from <strong>₹5 crore to nearly ₹40 crore</strong> in turnover.
                </p>

                {/* The Breakdown Quote */}
                <blockquote className={`my-8 border-l-4 ${themeStyles.border} pl-6 italic ${themeStyles.heading} text-xl leading-relaxed`}>
                  “We were doing ₹40 crore in sales, but at the end of every month, I was still sweating over whether we had enough cash to clear vendor payments. The faster we grew, the more out of control it felt.”
                </blockquote>

                {/* The Back-end Gaps */}
                <div className={`rounded-xl border ${themeStyles.border} ${themeStyles.cardBg} p-6 sm:p-8 space-y-4`}>
                  <h3 className={`font-display text-lg font-bold ${themeStyles.heading}`}>
                    The back-end systems hadn’t scaled with the growth:
                  </h3>
                  <ul className="grid gap-3 text-base sm:grid-cols-2">
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span> Invoices recorded late or incorrectly
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span> No real-time inventory visibility
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span> Cash flow tight even in high sales months
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span> Profitability per product? Unknown.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span> Budgeting? Nonexistent.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span> MIS reports? Too late to act upon.
                    </li>
                  </ul>
                </div>

                <p>
                  What once was a smooth operation turned into chaos. The son began feeling like he was running blind, firefighting daily problems while losing grip on the big picture.
                </p>

                <p>
                  The father, watching from the sidelines, saw the stress on his son’s face and the cracks in what he had built. They knew they needed help. Not just accounting help. Not just another CA.
                </p>

                <p className={`font-display text-xl font-semibold ${themeStyles.accent}`}>
                  They needed a strategic partner in finance. That’s when they brought us in — as their Fractional CFO.
                </p>

                <p>
                  This book is a month-by-month retelling of that transformation journey. It’s written in the form of a story, told from the perspective of the son. Each chapter represents a monthly meeting we had with them. In each of these meetings, we solved one key finance problem — the biggest bottleneck holding the business back.
                </p>

                {/* End of Chapter Backplate / Next Chapter Callout */}
                <div className={`mt-14 border-t-2 ${themeStyles.border} pt-10 text-center`}>
                  <span className={`font-mono text-xs uppercase tracking-[0.2em] ${themeStyles.accent}`}>
                    END OF CHAPTER 1 PREVIEW
                  </span>
                  
                  <h3 className={`mt-3 font-display text-2xl font-bold ${themeStyles.heading}`}>
                    Ready to Read the Rest of the Book?
                  </h3>
                  
                  <p className={`mx-auto mt-3 max-w-md font-serif text-base ${themeStyles.subtext}`}>
                    Discover all 15 monthly transformation meetings, practical templates, and actionable CFO insights in the full book.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <BuyBookButton location="reader_modal_end" />
                    <TrackedCta label="Book CFO Discovery Meeting" location="reader_modal_end">
                      <Button href={bookingHref} variant="outline">
                        Book a CFO Discovery Meeting
                      </Button>
                    </TrackedCta>
                  </div>
                </div>

              </div>

              {/* Running Footer Page Number */}
              <div className={`mt-14 flex items-center justify-between border-t ${themeStyles.border} pt-6 font-mono text-xs ${themeStyles.subtext}`}>
                <span>The CFO Meeting™</span>
                <span>Page 1 of 1</span>
                <span>Finnpulse Advisors</span>
              </div>

            </article>
          </div>

        </div>
      </div>
    );
  }
}
