import type { Metadata } from 'next';
import LegalStub from '@/components/LegalStub';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'The basis on which information published by Finnpulse Advisors on this website should be relied upon.',
  alternates: { canonical: '/disclaimer' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalStub
      title="Disclaimer"
      intro="This page will set out that content published here is general in nature, does not constitute professional financial, tax or legal advice, and should not be relied upon without a specific engagement."
      sections={['General information only', 'No advisory relationship', 'Accuracy of content', 'External links', 'Regulatory position']}
    />
  );
}
