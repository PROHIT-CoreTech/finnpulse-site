/**
 * ---------------------------------------------------------------------------
 * FINNPULSE — SINGLE SOURCE OF TRUTH FOR CLIENT-SUPPLIED VALUES
 * ---------------------------------------------------------------------------
 * Everything below marked @placeholder must be replaced with real values
 * supplied by Finnpulse Advisors before go-live. Nothing in this file is
 * hard-coded anywhere else in the codebase — change it here only.
 */

export const site = {
  name: 'Finnpulse Advisors',
  legalName: 'Finnpulse Advisors LLP',
  tagline: 'Fractional CFO Services for Growing Businesses',
  locationLine: 'Mumbai | Serving Businesses Across India',

  /** @placeholder — production domain, used for canonicals + sitemap */
  url: 'https://www.finnpulse.com',

  /** @placeholder — real number to be supplied by Finnpulse */
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',

  /** @placeholder — real inbox to be supplied by Finnpulse */
  email: 'hello@finnpulse.com',

  city: 'Mumbai, India',

  /** @placeholder — real profile URLs to be supplied by Finnpulse */
  social: {
    linkedin: 'https://www.linkedin.com/in/rohanmehta-ca',
    facebook: 'https://facebook.com/rohan.mehta.798',
    youtube: 'https://www.youtube.com/@CARohanMehta',
    instagram: 'https://www.instagram.com/cforohanmehta?igsh=MWFxMTVnYzRoN2o3bw%3D%3D',
  },

  /**
   * @placeholder — retailer / publisher product page for the book.
   * Leave null to render the buy button as disabled with a "coming soon" note.
   */
  bookPurchaseUrl: null as string | null,

  /**
   * @placeholder — hosted Chapter 1 PDF. Drop the real file into /public and
   * point this at it, or use an external URL.
   */
  chapterOneUrl: '/chapter-1-placeholder.pdf',

  /**
   * @placeholder — external scheduler (Calendly / HubSpot / Zoho Bookings).
   * Leave null and every "Book a Meeting" CTA routes to /contact instead.
   */
  bookingUrl: null as string | null,

  /**
   * @placeholder — CRM webhook. The bundled /api/lead route logs the payload
   * and returns 200 so the form is testable; swap LEAD_ENDPOINT for the real
   * destination (or forward from inside the route handler).
   */
  leadEndpoint: '/api/lead',
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/fractional-cfo', label: 'Fractional CFO' },
  { href: '/what-we-solve', label: 'What We Solve' },
  { href: '/our-approach', label: 'Our Approach' },
  { href: '/cfo-readiness-test', label: 'CFO Readiness Test' },
  { href: '/the-book', label: 'The Book' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const footerServices = [
  'Financial Management',
  'Working Capital',
  'Process Improvement',
  'Automation & Technology',
  'MIS & Reporting',
  'Strategic Financial Advisory',
  'Budgeting & Forecasting',
  'Funding & Scale Readiness',
];

/** Resolves the primary CTA destination — external scheduler if set, else /contact. */
export const bookingHref = site.bookingUrl ?? '/contact';
