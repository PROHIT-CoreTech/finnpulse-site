import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Icon, { IconBadge, type IconName } from '@/components/ui/Icon';
import Highlight from '@/components/ui/Highlight';
import Eyebrow from '@/components/ui/Eyebrow';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'CFO Services & Business Finance Solutions',
  description:
    'Can’t trust your numbers? Cash disappearing? Profitability unclear? Business dependent on you? The seven finance problems Finnpulse solves for growing MSMEs, and the outcome of each.',
  alternates: { canonical: '/what-we-solve' },
};

type Problem = {
  icon: IconName;
  pain: string;
  service: string;
  intro: string;
  workLabel: string;
  work: string[];
  outcome: string;
};

const PROBLEMS: Problem[] = [
  {
    icon: 'shield',
    pain: 'I can’t trust my numbers',
    service: 'Financial Control & Accounting Systems',
    intro: 'We help build the financial foundation required for reliable decision-making.',
    workLabel: 'We work on',
    work: ['Accounting review', 'Month-end closing', 'Ledger scrutiny', 'Reconciliations', 'Financial controls', 'Inventory accounting', 'Data accuracy', 'Chart of accounts and reporting structure'],
    outcome: 'Numbers you can trust.',
  },
  {
    icon: 'cash',
    pain: 'I don’t know where my cash is going',
    service: 'Cash Flow & Working Capital',
    intro: 'We help management understand and control:',
    workLabel: 'We work on',
    work: ['Receivables', 'Credit terms', 'Collections', 'Payables', 'Vendor terms', 'Inventory', 'Working-capital requirements', '13-week cash flow'],
    outcome: 'See cash problems before they become emergencies.',
  },
  {
    icon: 'pie',
    pain: 'I don’t know what is actually profitable',
    service: 'Product & Customer Profitability',
    intro: 'We analyse:',
    workLabel: 'We analyse',
    work: ['Product profitability', 'Customer profitability', 'Geography', 'Sales channels', 'Marketing ROI', 'Pricing', 'Contribution margins', 'Cost structures'],
    outcome: 'Know where your business actually makes money.',
  },
  {
    icon: 'cog',
    pain: 'My business is still dependent on me',
    service: 'SOPs, Controls & Automation',
    intro: 'We help create:',
    workLabel: 'We help create',
    work: ['Finance SOPs', 'Approval workflows', 'Process controls', 'Accounting systems', 'Automated reconciliations', 'Reporting automation', 'Document workflows', 'AI-enabled finance processes', 'System integrations'],
    outcome: 'A finance function that works through systems, not memory.',
  },
  {
    icon: 'target',
    pain: 'I want to grow but don’t know what the numbers look like',
    service: 'Budgeting & Forecasting',
    intro: 'We develop:',
    workLabel: 'We develop',
    work: ['Annual budgets', 'Revenue plans', 'Margin plans', 'Expense budgets', 'Hiring plans', 'Capex plans', 'Cash flow plans', 'Scenario analysis', '3–5 year projections'],
    outcome: 'A financial roadmap for the business.',
  },
  {
    icon: 'chart',
    pain: 'I need to make better decisions',
    service: 'MIS, KPIs & Business Intelligence',
    intro: 'MIS should tell you: what changed, why it changed, what matters, and what needs action.',
    workLabel: 'We build management reporting around',
    work: ['P&L', 'Balance Sheet', 'Cash Flow', 'Budget vs Actual', 'Business KPIs', 'Product profitability', 'Customer profitability', 'Risk indicators', 'Action tracking'],
    outcome: 'Reports that drive decisions.',
  },
  {
    icon: 'growth',
    pain: 'I need funding to scale',
    service: 'Funding & Strategic Finance',
    intro: 'We help prepare:',
    workLabel: 'We help prepare',
    work: ['Financial projections', 'Revenue plans', 'Raising Funds', 'SME IPO Advisory', 'Subsidies & Grants', 'Capex plans', 'Funding requirements', 'Investor-ready financial information'],
    outcome: 'Funding that accelerates growth instead of rescuing it.',
  },
];

export default function WhatWeSolvePage() {
  return (
    <>
      <Section className="!pb-0">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow>Problems We Solve</Eyebrow>
            <h1 className="mt-4 font-display text-display-xl font-semibold text-charcoalDeep">
              What Is Holding Your Business <Highlight>Back?</Highlight>
            </h1>
          </div>
          <div className="space-y-4 rounded-2xl border border-hair bg-gradient-to-br from-white to-limeSoft/30 p-6 shadow-card lg:col-span-5 sm:p-7">
            <h2 className="font-display text-xl font-semibold text-charcoalDeep">
              Solving the Financial Bottlenecks of Scale
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-charcoalSoft">
              We solve the core financial problems that appear when a business starts getting bigger — from untrusted numbers and cash flow emergencies to unorganized systems and scaling bottlenecks.
            </p>
            <ul className="flex flex-wrap gap-2 pt-1 text-xs font-semibold text-limeInk">
              <li className="rounded-md bg-limeSoft px-2.5 py-1">✓ Trustworthy Numbers</li>
              <li className="rounded-md bg-limeSoft px-2.5 py-1">✓ 13-Week Cash Visibility</li>
              <li className="rounded-md bg-limeSoft px-2.5 py-1">✓ Scalable SOPs</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.pain} delay={(i % 2) * 60} className={i === PROBLEMS.length - 1 ? 'lg:col-span-2' : ''}>
              <Card className="h-full">
                <IconBadge name={p.icon} />
                <h2 className="font-display text-[1.45rem] font-semibold leading-snug text-charcoalDeep">
                  “{p.pain}”
                </h2>
                <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.13em] text-limeInk">{p.service}</p>
                <p className="mt-4 text-[0.97rem] leading-relaxed text-charcoalSoft">{p.intro}</p>

                {/* Detail expands in place — keeps the grid scannable without a second page. */}
                <details className="group mt-4 border-t border-hair pt-4">
                  <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-charcoalDeep marker:hidden hover:text-limeInk">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md border border-hairStrong transition-transform group-open:rotate-45">
                      <span aria-hidden className="text-base leading-none">+</span>
                    </span>
                    <span className="group-open:hidden">See what this involves</span>
                    <span className="hidden group-open:inline">Hide detail</span>
                  </summary>
                  <div className="mt-4">
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">{p.workLabel}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {p.work.map((w) => (
                        <li key={w} className="rounded-full border border-hair bg-offwhite px-3 py-1.5 text-[0.83rem] text-charcoal">{w}</li>
                      ))}
                    </ul>
                  </div>
                </details>

                <div className="mt-auto flex items-start gap-2.5 rounded-lg border border-[#D6EBBE] bg-limeSoft px-4 py-3">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-limeInk" />
                  <p className="text-[0.94rem] font-medium text-charcoalDeep">
                    <span className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-limeInk">Outcome — </span>
                    {p.outcome}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title={<>Which part of your finance function is holding your business <Highlight>back?</Highlight></>}
        primaryLabel="Talk to a CFO"
        secondary={{ label: 'Take the CFO Readiness Test', href: '/cfo-readiness-test' }}
      />
    </>
  );
}
