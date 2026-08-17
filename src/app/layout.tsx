import type { Metadata, Viewport } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { site } from '@/lib/site';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#3B3A38',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Fractional CFO Services for Growing MSMEs | Finnpulse Advisors',
    template: `%s | ${site.name}`,
  },
  description:
    'Finnpulse Advisors is a Fractional CFO partner for growing Indian MSMEs — financial control, MIS, 13-week cash visibility, working capital, budgeting, profitability and scale readiness.',
  keywords: ['Fractional CFO', 'Virtual CFO', 'CFO services for MSMEs', 'MIS', 'working capital', 'cash flow', 'budgeting', 'profitability'],
  authors: [{ name: site.legalName }],
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
  openGraph: {
    type: 'website', locale: 'en_IN', siteName: site.name, url: site.url,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
};

const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#organisation`,
  name: site.name,
  alternateName: site.legalName,
  description: 'Fractional CFO and Virtual CFO services for growing Indian MSMEs.',
  url: site.url,
  logo: `${site.url}/logo.png`,
  image: `${site.url}/og.png`,
  telephone: site.phone,
  email: site.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressRegion: 'Maharashtra', addressCountry: 'IN' },
  areaServed: { '@type': 'Country', name: 'India' },
  knowsAbout: ['Fractional CFO', 'Virtual CFO', 'MIS reporting', 'Working capital management', 'Cash flow forecasting', 'Budgeting and forecasting', 'Profitability analysis'],
  sameAs: [site.social.linkedin, site.social.youtube, site.social.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,600;6..96,700&family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
