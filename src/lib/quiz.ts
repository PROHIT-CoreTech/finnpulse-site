/**
 * ---------------------------------------------------------------------------
 * CFO READINESS TEST — questions, scoring and result bands.
 * ---------------------------------------------------------------------------
 * SCORING APPROACH (documented, single consistent method):
 *   Each of the 10 questions is answered Yes / Partially / No.
 *   Raw points per answer:  Yes = 2, Partially = 1, No = 0  →  raw range 0–20.
 *   Displayed score = raw / 2, rounded to the nearest whole number → 0–10.
 *   Result bands are then applied against that 0–10 score.
 *
 * Every value below is configurable here. Nothing is hard-coded in the UI.
 */

export type AnswerKey = 'yes' | 'partially' | 'no';

export const ANSWER_OPTIONS: { key: AnswerKey; label: string; points: number }[] = [
  { key: 'yes', label: 'Yes', points: 2 },
  { key: 'partially', label: 'Partially', points: 1 },
  { key: 'no', label: 'No', points: 0 },
];

export const MAX_DISPLAY_SCORE = 10;

/**
 * Where the lead-capture gate appears.
 *   'before-results' — gate sits between the last question and the result
 *   'after-results'  — result shows first, gate follows as an inline card
 *   'off'            — no gate at all
 * Change this one value to A/B the conversion flow.
 */
export const LEAD_GATE_MODE: 'before-results' | 'after-results' | 'off' = 'before-results';

/** Whether the visitor can skip the gate and still see their result. */
export const LEAD_GATE_SKIPPABLE = true;

export type Question = {
  id: number;
  prompt: string;
  /** Plain-language framing shown under the question. */
  context: string;
  /** Named gap surfaced on the results screen when the answer is not 'yes'. */
  gap: string;
};

export const QUESTIONS: Question[] = [
  { id: 1, prompt: 'How quickly do you close your monthly books?',
    context: 'Answer Yes if the books are closed within about 10 days of month end.',
    gap: 'Monthly close discipline' },
  { id: 2, prompt: 'Do you receive a monthly MIS that you can trust?',
    context: 'Trust means you would take a significant decision on it without checking elsewhere.',
    gap: 'Reliable management reporting' },
  { id: 3, prompt: 'Do you know your product-wise profitability?',
    context: 'Margin at the overall level does not count — this is per product or service line.',
    gap: 'Product-wise profitability' },
  { id: 4, prompt: 'Do you know which customers are actually profitable?',
    context: 'Your largest customer and your most profitable customer are often not the same.',
    gap: 'Customer profitability' },
  { id: 5, prompt: 'Can you see your expected cash position for the next 13 weeks?',
    context: 'A rolling forward view, not the current bank balance.',
    gap: '13-week cash visibility' },
  { id: 6, prompt: 'Do you review Budget vs Actual every month?',
    context: 'A budget that is not reviewed monthly is a document, not a control.',
    gap: 'Budget vs Actual review' },
  { id: 7, prompt: 'Does every department have measurable KPIs?',
    context: 'Measurable means someone can state the number without opening a debate.',
    gap: 'Departmental KPIs' },
  { id: 8, prompt: 'Are your key business processes documented through SOPs?',
    context: 'If a process lives in someone’s memory, it leaves when they do.',
    gap: 'Documented SOPs' },
  { id: 9, prompt: 'Can your business operate for a few weeks without you being involved in every financial decision?',
    context: 'Founder dependence is usually the real ceiling on growth.',
    gap: 'Reduced founder dependence' },
  { id: 10, prompt: 'Do your monthly finance meetings end with clear decisions and action owners?',
    context: 'Numbers create value only at the point they become an owned action.',
    gap: 'Decisions and action owners' },
];

export type BandKey = 'visibility' | 'control' | 'management' | 'cfo';

export type Band = {
  key: BandKey;
  min: number;
  max: number;
  label: string;
  /** Verbatim approved copy — do not reword without Finnpulse sign-off. */
  summary: string;
  detail: string;
};

export const BANDS: Band[] = [
  {
    key: 'visibility', min: 0, max: 3, label: 'Financial Visibility Gap',
    summary: 'Your business may have outgrown its existing finance structure.',
    detail:
      'The business is currently being run on instinct and bank balance rather than on numbers. That is entirely normal at a smaller scale, but at your size it usually means margin leaks, cash surprises and decisions that cannot be checked against data. The first priority is not more reporting — it is making the underlying numbers reliable enough to trust.',
  },
  {
    key: 'control', min: 4, max: 6, label: 'Control Gap',
    summary: 'You have information, but it isn’t yet being converted into consistent management action.',
    detail:
      'You can see part of the picture, but not early enough to act on it. Typically the numbers exist, yet they arrive late, sit in different places, or stop short of the questions that matter — which products earn, which customers cost, and what cash looks like three months out. This is the stage where a CFO layer pays for itself fastest.',
  },
  {
    key: 'management', min: 7, max: 8, label: 'Management Ready',
    summary: 'Your finance function is becoming more structured, but there may still be opportunities to improve.',
    detail:
      'The fundamentals are largely working — the numbers are reliable and the reporting exists. What is usually missing at this point is the discipline that converts good reporting into consistent decisions and follow-through, plus the systems work that removes the remaining dependence on individual people.',
  },
  {
    key: 'cfo', min: 9, max: 10, label: 'CFO Ready',
    summary: 'You already have strong financial discipline. The next opportunity is using finance more strategically for growth.',
    detail:
      'You have the foundations most growing businesses are still building. At this level a Fractional CFO stops being a fixer and becomes a multiplier — sharpening capital allocation, working capital efficiency, scale readiness and funding conversations. Fewer gains in count, considerably larger in value.',
  },
];

/** Raw points (0–20) → displayed score (0–10). */
export function toDisplayScore(rawPoints: number) {
  const max = QUESTIONS.length * Math.max(...ANSWER_OPTIONS.map((o) => o.points));
  return Math.round((rawPoints / max) * MAX_DISPLAY_SCORE);
}

export function bandFor(displayScore: number): Band {
  return BANDS.find((b) => displayScore >= b.min && displayScore <= b.max) ?? BANDS[0];
}

export function pointsFor(key: AnswerKey) {
  return ANSWER_OPTIONS.find((o) => o.key === key)?.points ?? 0;
}
