import { Metadata } from 'next';
import PressContent from './PressContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Press | National Vision Party',
  description: 'Media resources, press releases, and contact information for journalists covering the National Vision Party and Dr. Isaac Newton Kinity\'s 2027 presidential campaign.',
  keywords: ['press', 'media', 'press kit', 'journalists', 'interviews', 'Kenya', 'campaign'],
  openGraph: {
    title: 'Press | National Vision Party',
    description: 'Media resources and press contact for the 2027 presidential campaign.',
    images: [{ url: '/nvp-party-logo.jpeg', width: 1200, height: 630 }],
  },
  alternates: { canonical: '/press' },
};

export default function PressPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Press', path: '/press' },
        ]}
      />
      <PressContent />
    </>
  );
}
