import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';

export default function NotFound() {
  return (
    <Section narrow className="text-center">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-limeInk">Error 404</p>
      <h1 className="mt-4 font-display text-display-lg font-semibold text-charcoalDeep">This page doesn’t exist.</h1>
      <p className="mx-auto mt-5 max-w-prose text-charcoalSoft">
        The link may be out of date. Start from the homepage, or tell us what you were looking for.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/contact" variant="outline">Contact us</Button>
      </div>
    </Section>
  );
}
