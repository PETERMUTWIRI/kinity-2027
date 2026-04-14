import { Metadata } from 'next';
import ManifestoContent from './ManifestoContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Manifesto | National Vision Party',
  description: 'Our detailed policy commitments to the Kenyan people. Specific, measurable actions to eliminate corruption, create jobs, provide healthcare, and transform education.',
  keywords: ['manifesto', 'policy', 'commitments', 'Kenya 2027', 'election', 'pledges'],
  openGraph: {
    title: 'Manifesto | National Vision Party',
    description: 'Detailed policy commitments for a transformed Kenya.',
    images: [{ url: '/images/kinity-1.jpeg', width: 1200, height: 630 }],
  },
  alternates: { canonical: '/about/manifesto' },
};

export default function ManifestoPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Our Movement', path: '/about' },
          { name: 'Manifesto', path: '/about/manifesto' },
        ]}
      />
      <ManifestoContent />
    </>
  );
}
