import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';

/**
 * Shared shell for the three legal stubs. Final copy is to be supplied by
 * Finnpulse — the notice below is deliberately visible so it cannot ship
 * unnoticed. These pages are noindex until the real copy lands.
 */
export default function LegalStub({ title, intro, sections }: {
  title: string; intro: string; sections: string[];
}) {
  return (
    <Section narrow>
      <Eyebrow>Legal</Eyebrow>
      <h1 className="mt-4 font-display text-display-lg font-semibold text-charcoalDeep">{title}</h1>
      <p className="mt-6 text-[1.05rem] leading-relaxed text-charcoalSoft">{intro}</p>

      <Card tone="soft" hover={false} className="mt-10">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-limeInk">Placeholder</p>
        <h2 className="mt-3 text-lg font-semibold text-charcoalDeep">Final legal copy to be supplied.</h2>
        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-charcoal">
          This page exists so that footer links, the sitemap and consent references resolve correctly during build and QA.
          It is excluded from search indexing until the approved text is in place.
        </p>
      </Card>

      <h2 className="mt-12 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">Sections to be drafted</h2>
      <ol className="mt-5">
        {sections.map((s, i) => (
          <li key={s} className="flex items-baseline gap-4 border-b border-hair py-3.5">
            <span className="w-7 shrink-0 font-mono text-[0.72rem] text-limeInk">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-charcoalDeep">{s}</span>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/" variant="outline">Back to home</Button>
        <Button href="/contact">Contact us</Button>
      </div>
    </Section>
  );
}
