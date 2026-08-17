'use client';

import { useMemo, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { bookingHref, site } from '@/lib/site';
import { trackEvent, getAttribution } from '@/lib/analytics';
import {
  ANSWER_OPTIONS, QUESTIONS, LEAD_GATE_MODE, LEAD_GATE_SKIPPABLE,
  MAX_DISPLAY_SCORE, bandFor, pointsFor, toDisplayScore, type AnswerKey,
} from '@/lib/quiz';

type Stage = 'quiz' | 'gate' | 'result';
type Lead = { name: string; email: string; phone: string };

export default function ReadinessQuiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerKey>>({});
  const [stage, setStage] = useState<Stage>('quiz');
  const [lead, setLead] = useState<Lead>({ name: '', email: '', phone: '' });
  const [leadErrors, setLeadErrors] = useState<Partial<Lead>>({});
  const startedRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  if (!startedRef.current) { startedRef.current = true; trackEvent('quiz_start'); }

  const raw = useMemo(
    () => Object.values(answers).reduce((sum, key) => sum + pointsFor(key), 0),
    [answers],
  );
  const score = toDisplayScore(raw);
  const band = bandFor(score);
  const gaps = QUESTIONS.filter((q) => answers[q.id] !== 'yes').map((q) => q.gap);

  const question = QUESTIONS[index];
  const progress = (index / QUESTIONS.length) * 100;

  function answer(key: AnswerKey) {
    const next = { ...answers, [question.id]: key };
    setAnswers(next);
    trackEvent('quiz_question_progress', { question: question.id, answer: key, of: QUESTIONS.length });

    if (index + 1 < QUESTIONS.length) {
      setIndex(index + 1);
      requestAnimationFrame(() => headingRef.current?.focus());
      return;
    }

    const finalRaw = Object.values(next).reduce((s, k) => s + pointsFor(k), 0);
    const finalScore = toDisplayScore(finalRaw);
    trackEvent('quiz_complete', { rawScore: finalRaw, score: finalScore, band: bandFor(finalScore).label });

    if (LEAD_GATE_MODE === 'before-results') setStage('gate');
    else { setStage('result'); trackEvent('quiz_result_view', { band: bandFor(finalScore).label }); }
  }

  function submitLead(e: React.FormEvent) {
    e.preventDefault();
    const errs: Partial<Lead> = {};
    if (!lead.name.trim()) errs.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email.trim())) errs.email = 'Please enter a valid email address.';
    if (lead.phone.replace(/\D/g, '').length < 10) errs.phone = 'Please enter a valid 10-digit mobile number.';
    setLeadErrors(errs);
    if (Object.keys(errs).length) return;

    trackEvent('quiz_lead_capture', { score, band: band.label });
    // Stubbed: swap site.leadEndpoint for the real CRM webhook.
    void fetch(site.leadEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'cfo_readiness_test', ...lead, score, rawScore: raw, band: band.label, gaps, ...getAttribution() }),
    }).catch(() => {/* never block the result on a network failure */});

    setStage('result');
    trackEvent('quiz_result_view', { band: band.label });
  }

  function restart() {
    setIndex(0); setAnswers({}); setStage('quiz'); setLeadErrors({});
  }

  /* ---------------------------------------------------------------- QUIZ */
  if (stage === 'quiz') {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-hair bg-white p-6 shadow-card sm:p-10" aria-live="polite">
        <div className="flex items-center justify-between font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted">
          <span>Question {index + 1} of {QUESTIONS.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>

        <div role="progressbar" aria-valuenow={index} aria-valuemin={0} aria-valuemax={QUESTIONS.length}
             aria-label="Test progress"
             className="my-3 h-1.5 overflow-hidden rounded-full border border-hair bg-offwhite">
          <div className="h-full rounded-full bg-gradient-to-r from-limeInk to-lime transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>

        <h2 ref={headingRef} tabIndex={-1} className="mt-7 font-display text-2xl font-semibold leading-tight text-charcoalDeep outline-none sm:text-3xl">
          {question.prompt}
        </h2>
        <p className="mt-3 text-[0.94rem] text-muted">{question.context}</p>

        <div className="mt-7 grid gap-2.5" role="group" aria-label={`Answer question ${index + 1}`}>
          {ANSWER_OPTIONS.map((opt) => (
            <button key={opt.key} type="button" onClick={() => answer(opt.key)}
                    className="flex min-h-[56px] items-center gap-3.5 rounded-[10px] border border-hairStrong bg-white px-4 py-3.5 text-left text-base font-medium text-charcoalDeep transition-all hover:border-limeInk hover:bg-limeSoft focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-limeInk">
              <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-hairStrong font-mono text-[0.72rem] text-muted">
                {opt.label[0]}
              </span>
              {opt.label}
            </button>
          ))}
        </div>

        {index > 0 && (
          <button type="button" onClick={() => setIndex(index - 1)}
                  className="mt-6 text-sm text-muted underline underline-offset-4 hover:text-charcoalDeep">
            ← Previous question
          </button>
        )}
      </div>
    );
  }

  /* ---------------------------------------------------------- LEAD GATE */
  if (stage === 'gate') {
    const field = 'w-full min-h-[48px] rounded-[10px] border border-hairStrong px-4 py-3 text-base text-charcoalDeep focus:border-limeInk focus:outline-none focus:ring-[3px] focus:ring-lime/45';
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-hair bg-white p-6 shadow-card sm:p-10">
        <div className="mb-3 h-1.5 overflow-hidden rounded-full border border-hair bg-offwhite">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-limeInk to-lime" />
        </div>
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted">All {QUESTIONS.length} answered</p>
        <h2 className="mt-4 font-display text-2xl font-semibold text-charcoalDeep sm:text-3xl">Your score is ready.</h2>
        <p className="mt-3 text-charcoalSoft">
          Tell us where to send it and we will include a short note on what your result means for a business at your stage.
        </p>

        <form onSubmit={submitLead} className="mt-7 grid gap-4" noValidate>
          {([
            { k: 'name' as const, label: 'Full name', type: 'text', ac: 'name' },
            { k: 'email' as const, label: 'Email', type: 'email', ac: 'email' },
            { k: 'phone' as const, label: 'Mobile number', type: 'tel', ac: 'tel' },
          ]).map((f) => (
            <div key={f.k} className="grid gap-1.5">
              <label htmlFor={`lead-${f.k}`} className="text-sm font-semibold text-charcoalDeep">{f.label}</label>
              <input id={`lead-${f.k}`} type={f.type} autoComplete={f.ac} value={lead[f.k]}
                     aria-invalid={!!leadErrors[f.k]}
                     aria-describedby={leadErrors[f.k] ? `lead-${f.k}-err` : undefined}
                     onChange={(e) => setLead({ ...lead, [f.k]: e.target.value })}
                     className={`${field} ${leadErrors[f.k] ? 'border-red-600 ring-[3px] ring-red-600/15' : ''}`} />
              {leadErrors[f.k] && <p id={`lead-${f.k}-err`} className="text-sm text-red-700">{leadErrors[f.k]}</p>}
            </div>
          ))}

          <Button type="submit" className="mt-2 w-full">Show my result</Button>

          {LEAD_GATE_SKIPPABLE && (
            <button type="button"
                    onClick={() => { setStage('result'); trackEvent('quiz_result_view', { band: band.label, gated: false }); }}
                    className="mx-auto text-sm text-muted underline underline-offset-4 hover:text-charcoalDeep">
              See my result without sharing details
            </button>
          )}
        </form>
      </div>
    );
  }

  /* -------------------------------------------------------------- RESULT */
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-hair bg-white p-6 shadow-card sm:p-10">
      <div className="text-center">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted">Your result</p>
        <p className="mt-4 font-display text-6xl font-semibold tabular-nums leading-none text-charcoalDeep sm:text-7xl">
          {score}<span className="font-mono text-[0.32em] text-muted">/{MAX_DISPLAY_SCORE}</span>
        </p>
        <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
          {raw} of {QUESTIONS.length * 2} raw points
        </p>
        <span className="mt-5 inline-block rounded-full border border-[#D6EBBE] bg-lime px-4 py-1.5 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-charcoalDeep">
          {band.label}
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold leading-snug text-charcoalDeep sm:text-3xl">{band.summary}</h2>
      </div>

      <p className="mt-6 leading-relaxed text-charcoalSoft">{band.detail}</p>

      {gaps.length > 0 && (
        <div className="mt-7 rounded-xl border border-hair bg-offwhite p-5">
          <h3 className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted">Your open gaps</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {gaps.map((g) => (
              <li key={g} className="flex items-start gap-2.5 text-[0.94rem] text-charcoal">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-limeInk" />{g}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 rounded-xl border border-[#D6EBBE] bg-limeSoft p-5 text-center">
        <p className="font-medium text-charcoalDeep">Want to know what your score means for your business?</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Button href={bookingHref} external={!!site.bookingUrl}
                  onClick={() => trackEvent('cta_click', { label: 'Book a CFO Discovery Meeting', location: 'quiz_result' })}>
            Book a CFO Discovery Meeting
          </Button>
          <Button variant="outline" onClick={restart}>Retake the test</Button>
        </div>
      </div>

      {LEAD_GATE_MODE === 'after-results' && (
        <p className="mt-6 flex items-start gap-2 text-sm text-muted">
          <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0" />
          Lead capture is configured to appear after results — see LEAD_GATE_MODE in src/lib/quiz.ts.
        </p>
      )}
    </div>
  );
}
