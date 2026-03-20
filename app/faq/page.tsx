import { Metadata } from 'next';
import FAQContent from './FAQContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'FAQ | National Vision Party',
  description: 'Frequently asked questions about Dr. Isaac Newton Kinity, the National Vision Party, and our vision for Kenya 2027.',
  keywords: ['FAQ', 'questions', 'Kenya 2027', 'Dr. Kinity', 'National Vision Party', 'policies'],
  openGraph: {
    title: 'FAQ | National Vision Party',
    description: 'Find answers to commonly asked questions about our campaign.',
    images: [{ url: '/nvp-party-logo.jpeg', width: 1200, height: 630 }],
  },
  alternates: { canonical: '/faq' },
};

export default function FAQPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ]}
      />
      <FAQContent />
    </>
  );
}
