import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

const routes: { path: string; priority: number; freq: 'monthly' | 'yearly' }[] = [
  { path: '', priority: 1.0, freq: 'monthly' },
  { path: '/contact', priority: 0.9, freq: 'monthly' },
  { path: '/cfo-readiness-test', priority: 0.9, freq: 'monthly' },
  { path: '/fractional-cfo', priority: 0.8, freq: 'monthly' },
  { path: '/what-we-solve', priority: 0.8, freq: 'monthly' },
  { path: '/the-book', priority: 0.8, freq: 'monthly' },
  { path: '/our-approach', priority: 0.7, freq: 'monthly' },
  { path: '/about', priority: 0.6, freq: 'monthly' },
  { path: '/privacy-policy', priority: 0.2, freq: 'yearly' },
  { path: '/terms', priority: 0.2, freq: 'yearly' },
  { path: '/disclaimer', priority: 0.2, freq: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
