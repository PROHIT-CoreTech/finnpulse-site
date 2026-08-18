'use client';

import { useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import { site } from '@/lib/site';
import { trackEvent, getAttribution } from '@/lib/analytics';

const TURNOVER_OPTIONS = [
  'Under ₹5 Cr', '₹5 Cr – ₹10 Cr', '₹10 Cr – ₹25 Cr',
  '₹25 Cr – ₹50 Cr', '₹50 Cr – ₹100 Cr', 'Above ₹100 Cr',
];

const INDUSTRY_OPTIONS = [
  'Manufacturing', 'D2C / Consumer Brand', 'Trading & Distribution', 'Retail',
  'Services', 'Technology / SaaS', 'Healthcare', 'Construction & Real Estate',
  'Logistics', 'Other',
];

const CHALLENGE_OPTIONS = [
  'MIS & Reporting', 'Cash Flow', 'Working Capital', 'Profitability',
  'Accounting Systems', 'Budgeting & Forecasting', 'Automation', 'Funding', 'Other',
];

type Values = {
  fullName: string; company: string; designation: string;
  mobile: string; email: string; turnover: string; industry: string;
  challenges: string[]; message: string;
};

const EMPTY: Values = {
  fullName: '', company: '', designation: '', mobile: '',
  email: '', turnover: '', industry: '', challenges: [], message: '',
};

const inputCls =
  'w-full min-h-[48px] rounded-[10px] border border-hairStrong bg-white px-4 py-3 text-base text-charcoalDeep ' +
  'transition-colors focus:border-limeInk focus:outline-none focus:ring-[3px] focus:ring-lime/45';

function Field({ id, label, children, error }: { id: string; label: string; children: React.ReactNode; error?: string }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-charcoalDeep">
        {label} <span className="text-limeInk" aria-hidden>*</span>
      </label>
      {children}
      {error && <p id={`${id}-error`} className="text-sm text-red-700">{error}</p>}
    </div>
  );
}

export default function LeadForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const started = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    if (!started.current) { started.current = true; trackEvent('meeting_form_start'); }
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const e: Partial<Record<keyof Values, string>> = {};
    if (!values.fullName.trim()) e.fullName = 'Please enter your full name.';
    if (!values.company.trim()) e.company = 'Please enter your company name.';
    if (!values.designation.trim()) e.designation = 'Please enter your designation.';
    if (values.mobile.replace(/\D/g, '').length < 10) e.mobile = 'Please enter a valid 10-digit mobile number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) e.email = 'Please enter a valid email address.';
    if (!values.turnover) e.turnover = 'Please select your annual turnover.';
    if (!values.industry) e.industry = 'Please select your industry.';
    return e;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length) {
      trackEvent('meeting_form_error', { fields: Object.keys(found).length });
      const first = document.getElementById(Object.keys(found)[0]);
      first?.focus();
      return;
    }

    setStatus('sending');
    try {
      // Stub endpoint. Point site.leadEndpoint at the real CRM webhook, or
      // forward from inside src/app/api/lead/route.ts — no address is hard-coded.
      const res = await fetch(site.leadEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: 'rohan@finnpulse.com',
          source: 'cfo_discovery_meeting',
          ...values,
          ...getAttribution(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackEvent('meeting_form_submit', {
        turnover: values.turnover, industry: values.industry,
        challenges: values.challenges.join('|'),
      });
      setStatus('ok');
      setValues(EMPTY);
    } catch {
      trackEvent('meeting_form_error', { reason: 'network' });
      setStatus('error');
    } finally {
      statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }


  if (status === 'ok') {
    return (
      <div ref={statusRef} role="status"
           className="rounded-xl border border-limeInk bg-limeSoft p-8 text-center">
        <p className="font-display text-2xl font-semibold text-charcoalDeep">Thank you — your request is in.</p>
        <p className="mx-auto mt-3 max-w-prose leading-relaxed text-charcoal">
          A member of the Finnpulse team will contact you within one working day to schedule your
          CFO Discovery Meeting. If it is urgent, call us on{' '}
          <a href={site.phoneHref} className="font-medium underline underline-offset-4">{site.phone}</a>.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus('idle')}>Submit another enquiry</Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full Name" error={errors.fullName}>
          <input id="fullName" type="text" autoComplete="name" value={values.fullName}
                 aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                 onChange={(e) => set('fullName', e.target.value)}
                 className={`${inputCls} ${errors.fullName ? 'border-red-600 ring-[3px] ring-red-600/15' : ''}`} />
        </Field>
        <Field id="company" label="Company Name" error={errors.company}>
          <input id="company" type="text" autoComplete="organization" value={values.company}
                 aria-invalid={!!errors.company} aria-describedby={errors.company ? 'company-error' : undefined}
                 onChange={(e) => set('company', e.target.value)}
                 className={`${inputCls} ${errors.company ? 'border-red-600 ring-[3px] ring-red-600/15' : ''}`} />
        </Field>
        <Field id="designation" label="Designation" error={errors.designation}>
          <input id="designation" type="text" autoComplete="organization-title" value={values.designation}
                 aria-invalid={!!errors.designation} aria-describedby={errors.designation ? 'designation-error' : undefined}
                 onChange={(e) => set('designation', e.target.value)}
                 className={`${inputCls} ${errors.designation ? 'border-red-600 ring-[3px] ring-red-600/15' : ''}`} />
        </Field>
        <Field id="mobile" label="Mobile Number" error={errors.mobile}>
          <input id="mobile" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" value={values.mobile}
                 aria-invalid={!!errors.mobile} aria-describedby={errors.mobile ? 'mobile-error' : undefined}
                 onChange={(e) => set('mobile', e.target.value)}
                 className={`${inputCls} ${errors.mobile ? 'border-red-600 ring-[3px] ring-red-600/15' : ''}`} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" type="email" inputMode="email" autoComplete="email" value={values.email}
                 aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
                 onChange={(e) => set('email', e.target.value)}
                 className={`${inputCls} ${errors.email ? 'border-red-600 ring-[3px] ring-red-600/15' : ''}`} />
        </Field>
        <Field id="turnover" label="Annual Turnover" error={errors.turnover}>
          <select id="turnover" value={values.turnover}
                  aria-invalid={!!errors.turnover} aria-describedby={errors.turnover ? 'turnover-error' : undefined}
                  onChange={(e) => set('turnover', e.target.value)}
                  className={`${inputCls} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238D8B85' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-[length:17px] bg-[right_0.85rem_center] bg-no-repeat pr-10 ${errors.turnover ? 'border-red-600 ring-[3px] ring-red-600/15' : ''}`}>
            <option value="">Select</option>
            {TURNOVER_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      <Field id="industry" label="Industry" error={errors.industry}>
        <select id="industry" value={values.industry}
                aria-invalid={!!errors.industry} aria-describedby={errors.industry ? 'industry-error' : undefined}
                onChange={(e) => set('industry', e.target.value)}
                className={`${inputCls} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238D8B85' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-[length:17px] bg-[right_0.85rem_center] bg-no-repeat pr-10 ${errors.industry ? 'border-red-600 ring-[3px] ring-red-600/15' : ''}`}>
          <option value="">Select</option>
          {INDUSTRY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </Field>

      <fieldset className="border-0 p-0">
        <legend className="mb-2.5 text-sm font-semibold text-charcoalDeep">
          What is your biggest finance challenge?{' '}
          <span className="font-normal text-muted">(Select all that apply)</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {CHALLENGE_OPTIONS.map((c) => {
            const checked = values.challenges.includes(c);
            return (
              <label key={c}
                     className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-limeInk ${
                       checked ? 'border-limeInk bg-limeSoft text-limeInk' : 'border-hairStrong bg-white text-charcoalDeep hover:border-limeInk'}`}>
                <input type="checkbox" className="sr-only" checked={checked}
                       onChange={() => set('challenges', checked
                         ? values.challenges.filter((x) => x !== c)
                         : [...values.challenges, c])} />
                {c}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold text-charcoalDeep">Tell us a little more</label>
        <textarea id="message" rows={4} value={values.message}
                  placeholder="What is going on in the business right now?"
                  onChange={(e) => set('message', e.target.value)}
                  className={`${inputCls} min-h-[110px] resize-y leading-relaxed`} />
      </div>

      <div ref={statusRef} aria-live="polite">
        {status === 'error' && (
          <p role="alert" className="rounded-[10px] border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
            We could not send that just now. Please email{' '}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>{' '}
            or call {site.phone} and we will pick it up.
          </p>
        )}
      </div>

      <p className="text-[0.83rem] leading-relaxed text-muted">
        By submitting this form you agree that {site.legalName} may contact you about your enquiry.
        We do not share your details with anyone else.
      </p>

      <Button type="submit" className="w-full" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Book My CFO Discovery Meeting'}
      </Button>
    </form>
  );
}
