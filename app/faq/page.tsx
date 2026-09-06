import { Metadata } from 'next';
import FAQContent from './FAQContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'FAQ | JENGAKENYA',
  description: 'Frequently asked questions about Dr. Isaac Newton Kinity, the JENGAKENYA, and our vision for Kenya 2027.',
  keywords: ['FAQ', 'questions', 'Kenya 2027', 'Dr. Kinity', 'JENGAKENYA', 'policies'],
  openGraph: {
    title: 'FAQ | JENGAKENYA',
    description: 'Find answers to commonly asked questions about our campaign.',
    images: [{ url: '/Jengakenya-logo.jpg', width: 1200, height: 630 }],
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
