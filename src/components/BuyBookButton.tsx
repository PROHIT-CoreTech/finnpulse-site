'use client';

import Button from '@/components/ui/Button';
import { site } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

/** Purchase CTA. Disabled until site.bookPurchaseUrl is supplied. */
export default function BuyBookButton({ location, variant = 'primary', className = '' }: {
  location: string; variant?: 'primary' | 'outline'; className?: string;
}) {
  if (!site.bookPurchaseUrl) {
    return (
      <span className={`inline-flex flex-col items-start gap-1 ${className}`}>
        <Button disabled variant={variant}>Buy The Book</Button>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">Purchase link coming soon</span>
      </span>
    );
  }
  return (
    <Button href={site.bookPurchaseUrl} external variant={variant} className={className}
            onClick={() => trackEvent('buy_book_click', { location })}>
      Buy The Book
    </Button>
  );
}
