/**
 * ---------------------------------------------------------------------------
 * ANALYTICS — abstracted so the tool can be swapped without touching pages.
 * ---------------------------------------------------------------------------
 * Currently pushes to window.dataLayer (works out of the box with GTM / GA4).
 * To move to Segment / Plausible / PostHog, change only `dispatch()` below.
 */

export type AnalyticsEvent =
  | 'cta_click'                 // any primary/secondary CTA
  | 'meeting_form_start'        // first keystroke in the lead form
  | 'meeting_form_submit'       // successful submission
  | 'meeting_form_error'        // validation or network failure
  | 'quiz_start'                // first question rendered
  | 'quiz_question_progress'    // each answer
  | 'quiz_lead_capture'         // lead gate completed
  | 'quiz_complete'             // all questions answered
  | 'quiz_result_view'          // result category shown
  | 'chapter_one_open'          // Chapter 1 reader opened
  | 'buy_book_click'            // Buy The Book clicked
  | 'scroll_depth';             // 25/50/75/100 on Home, Book, About

type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Payload[];
    FP_DEBUG?: boolean;
  }
}

function dispatch(event: AnalyticsEvent, payload: Payload) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: `fp_${event}`, ...payload });
  if (window.FP_DEBUG) console.log('[fp:analytics]', event, payload);
}

export function trackEvent(event: AnalyticsEvent, payload: Payload = {}) {
  dispatch(event, { ...payload, path: typeof window !== 'undefined' ? window.location.pathname : undefined });
}

/** Reads UTM parameters off the current URL so leads carry attribution. */
export function getAttribution() {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utmSource: p.get('utm_source') ?? undefined,
    utmMedium: p.get('utm_medium') ?? undefined,
    utmCampaign: p.get('utm_campaign') ?? undefined,
    utmTerm: p.get('utm_term') ?? undefined,
    utmContent: p.get('utm_content') ?? undefined,
    referrer: document.referrer || undefined,
    landingPage: window.location.href,
  };
}
