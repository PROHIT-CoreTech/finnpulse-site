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
npm run build      # production build (runs next build --webpack)
```

Node 20+ required (Next.js 16 requirement).

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

---

## Brand system & Layout

Colours are derived from the supplied logo and set in `tailwind.config.ts`:

| Token | Hex | Use |
|---|---|---|
| `charcoal` | `#4E4D4B` | headings, nav, body text |
| `charcoalDeep` | `#3B3A38` | dark CTA bands, footer *(derived, for depth)* |
| `lime` | `#C0FF72` | CTA fills, highlight bars, progress, numbers |
| `limeInk` | `#4C7A1C` | green **text** on light backgrounds *(derived)* |
| `limeSoft` | `#EEF8E3` | card and section tints |
| `offwhite` | `#F7F7F7` | page background |

**Layout Container Width:** 
- Configured to `1440px` (`max-w-wrap`) for optimal desktop screen utilization.

**Typography:**
- **sans**: `Manrope` (body & UI copy)
- **display**: `Source Serif 4` & `Bodoni Moda` (headings & display titles)
- **mono**: `IBM Plex Mono` (data, eyebrows, numbers, labels)

Loaded via Google Fonts in `src/app/layout.tsx`.

---

## Project Structure

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

## Deploying

### Option 1: Vercel (Recommended for Next.js)
Vercel is pre-configured via `vercel.json`:
- Import the repository into Vercel.
- Set `CRM_WEBHOOK_URL` in Environment Variables.

### Option 2: Hostinger Premium Web Hosting (Shared Hosting / hPanel)
The project is configured for static export (`output: 'export'` in `next.config.mjs`):
1. Run `npm run build` locally. This generates the static output in the `out/` folder.
2. In Hostinger hPanel for `finnpulse.com`, open **File Manager** → `public_html`.
3. Upload all files from the local `out/` folder directly into `public_html`.
4. Alternatively, use Hostinger **Advanced → Git Auto Deployment** pointing to `https://github.com/PROHIT-CoreTech/finnpulse-site.git`.

### Option 3: Hostinger VPS / Node.js Server
If deploying on a Node.js VPS with PM2 & Nginx:
```bash
git clone https://github.com/PROHIT-CoreTech/finnpulse-site.git
npm install
npm run build
pm2 start npm --name "finnpulse-site" -- start
```
