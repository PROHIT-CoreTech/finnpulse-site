import type { Metadata } from 'next';
import LegalStub from '@/components/LegalStub';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms on which Finnpulse Advisors makes this website and its content available.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalStub
      title="Terms of Use"
      intro="This page will set out the terms on which this website and its content are made available, including permitted use, intellectual property in The CFO Meeting™ methodology, and limitation of liability."
      sections={['Acceptance of terms', 'Permitted use of this website', 'Intellectual property', 'Third-party links', 'Limitation of liability', 'Governing law']}
    />
  );
}
