# Finnpulse Advisors — Website

Fractional CFO marketing site for growing Indian MSMEs.
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS.

---

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm start    # production build
```

Node 20+ required (Next 16 needs it).

`npm audit` should report **0 vulnerabilities**. If it ever reports Next.js issues, upgrade Next rather than running `npm audit fix --force`.

---

## ⚠️ Before go-live — everything you must supply

**All client-specific values live in one file: `src/lib/site.ts`.**
Nothing is hard-coded anywhere else. Open it and replace every `@placeholder`.

| What | Where | Currently |
|---|---|---|
| Production domain | `site.url` | `https://www.finnpulse.com` |
| Phone number | `site.phone` / `site.phoneHref` | `+91 98765 43210` (placeholder) |
| Email | `site.email` | `hello@finnpulse.com` (placeholder) |
| LinkedIn / YouTube / Instagram | `site.social` | generic homepages |
| Book purchase URL | `site.bookPurchaseUrl` | `null` → buy button renders disabled with "coming soon" |
| Chapter 1 PDF | `site.chapterOneUrl` | `/chapter-1-placeholder.pdf` |
| Meeting scheduler (Calendly etc.) | `site.bookingUrl` | `null` → every CTA routes to `/contact` |
| CRM endpoint | `site.leadEndpoint` | `/api/lead` (logs only) |

**Asset files to replace in `/public`:**

- `logo.png` — swap with the final export (keep the same filename). `logo-light.png` is the white version used on the dark footer.
- `favicon.png`, `og.png` — regenerate from final artwork if the logo changes.
- `chapter-1-placeholder.pdf` — replace with the approved Chapter 1.

**Components with placeholder content, clearly marked in code:**

- `src/components/BookCover.tsx` — CSS-rendered cover. Replace the whole component with an `<Image>` when real artwork arrives.
- Founder portrait — `src/app/about/page.tsx`, marked `PLACEHOLDER`. Drop in `/public/rohan-mehta.jpg` and swap the block for `<Image>`.
- `/privacy-policy`, `/terms`, `/disclaimer` — stubs. They are `noindex` until real copy lands; remove the `robots` line in each page's metadata once published.

---

## Wiring the lead form to your CRM

Both the contact form and the CFO Readiness Test gate POST to `src/app/api/lead/route.ts`, which currently logs the payload and returns 200 so the form is fully testable.

To go live, edit that one file:

```ts
const url = process.env.CRM_WEBHOOK_URL;
await fetch(url, { method: 'POST', headers: {...}, body: JSON.stringify(payload) });
```

Put the URL in `.env.local` (never commit it):

```
CRM_WEBHOOK_URL=https://...
```

**Still to add before production:** rate limiting, a honeypot or CAPTCHA, and server-side re-validation of every field. The route has comments marking where.

Every submission already carries UTM source/medium/campaign, referrer and landing page, so lead attribution works from day one.

---

## Analytics

`src/lib/analytics.ts` pushes to `window.dataLayer` — works with GTM/GA4 with no code changes. To move to Segment/PostHog/Plausible, change only the `dispatch()` function.

Events firing: `cta_click`, `meeting_form_start`, `meeting_form_submit`, `meeting_form_error`, `quiz_start`, `quiz_question_progress`, `quiz_lead_capture`, `quiz_complete`, `quiz_result_view`, `chapter_one_open`, `buy_book_click`, `scroll_depth` (Home, Book, About at 25/50/75/100%).

Debug in the browser console: `window.FP_DEBUG = true`.

---

## CFO Readiness Test — scoring

All of it is configurable in `src/lib/quiz.ts`. No scoring logic is hard-coded in the UI.

**Method:** each of 10 questions is Yes = 2 / Partially = 1 / No = 0 → raw 0–20. Displayed score = `raw ÷ 2`, rounded → 0–10. Bands apply to the 0–10 score:

- 0–3 Financial Visibility Gap
- 4–6 Control Gap
- 7–8 Management Ready
- 9–10 CFO Ready

**Lead gate placement** — change one constant to A/B it:

```ts
export const LEAD_GATE_MODE = 'before-results';  // 'after-results' | 'off'
export const LEAD_GATE_SKIPPABLE = true;
```

---

## Brand system

Colours are derived from the supplied logo and set in `tailwind.config.ts`:

| Token | Hex | Use |
|---|---|---|
| `charcoal` | `#4E4D4B` | headings, nav, body text |
| `charcoalDeep` | `#3B3A38` | dark CTA bands, footer *(derived, for depth)* |
| `lime` | `#C0FF72` | CTA fills, highlight bars, progress, numbers |
| `limeInk` | `#4C7A1C` | green **text** on light backgrounds *(derived)* |
| `limeSoft` | `#EEF8E3` | card and section tints |
| `offwhite` | `#F7F7F7` | page background |

**Why the two derived tokens exist:** `#C0FF72` on white is roughly 1.3:1 contrast — it fails WCAG AA badly as text. So lime is only ever used as a *fill* with charcoal text on top (which passes comfortably), and `limeInk` handles green text. The `Highlight` component paints lime behind display text rather than colouring it.

**Type:** Manrope (body/UI) · Bodoni Moda (display headlines — matches the logo's serif) · IBM Plex Mono (data, eyebrows, labels). Loaded via Google Fonts in `src/app/layout.tsx`.

---

## Structure

```
src/
  app/
    page.tsx                    Home
    fractional-cfo/             Fractional CFO
    what-we-solve/              7 problem-led cards
    our-approach/               12-step journey
    cfo-readiness-test/         interactive quiz
    the-book/                   book + Chapter 1 reader
    about/                      philosophy, vision, founder
    contact/                    explanation + lead form
    privacy-policy/ terms/ disclaimer/
    api/lead/route.ts           lead handler (stub)
    layout.tsx  globals.css  sitemap.ts  robots.ts  not-found.tsx
  components/
    layout/     Header, Footer
    ui/         Button, Card, Section, SectionHeading, Eyebrow,
                Highlight, PulseRule, Icon
    ReadinessQuiz  LeadForm  Timeline  BeforeAfter  DashboardMotif
    BookCover  ChapterReader  BuyBookButton  CtaBand  TrackedCta
    Reveal  ScrollDepth  LegalStub
  lib/
    site.ts        ← all client-supplied values
    quiz.ts        ← questions + scoring
    analytics.ts   ← event tracking
```

---

## Accessibility & QA status

Verified in a headless browser across all 8 pages at 1440px and 390px:

- No horizontal overflow at any breakpoint
- Exactly one `<h1>` per page, logical H2/H3 order
- No console or runtime errors
- Quiz completes and scores correctly; form validation catches all 7 required fields and reaches its success state
- Keyboard-navigable nav, quiz and form; visible focus rings throughout
- `prefers-reduced-motion` respected — all animation disabled
- Scroll reveals fail safe: content renders visible during SSR and for no-JS visitors, and only opts into hiding once JS confirms it can run

**Not yet done:** real-device testing (iOS Safari, Android Chrome), Lighthouse run against a deployed URL, and screen-reader pass. Worth doing once it's on a staging domain.

---

## Deploying

Vercel is the least-friction option — import the repo, set `CRM_WEBHOOK_URL`, done.

For a static host (S3, Netlify drop, cPanel), uncomment in `next.config.mjs`:

```js
output: 'export', images: { unoptimized: true },
```

Note that `output: 'export'` disables the `/api/lead` route — you'll need an external form handler in that case.

---

## Content governance

Home, Fractional CFO, What We Solve and About deliberately do **not** repeat the same problem/solution explanation — each page has a distinct job. Please keep them distinct when editing.

Changes to positioning, claims, service scope, quiz scoring, book messaging or founder statements need Finnpulse approval before publication.
