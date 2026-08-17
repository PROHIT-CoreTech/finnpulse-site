import type { Metadata } from 'next';
import LegalStub from '@/components/LegalStub';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Finnpulse Advisors collects, uses and protects information submitted through this website.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalStub
      title="Privacy Policy"
      intro="This page will set out what information Finnpulse Advisors collects through this website, how it is used, how long it is retained, who it is shared with, and how you can request its correction or removal."
      sections={['Information we collect', 'How we use your information', 'Cookies and analytics', 'Data retention', 'Your rights', 'Contacting us']}
    />
  );
}
