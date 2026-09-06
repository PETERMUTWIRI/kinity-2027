import { Metadata } from 'next';
import PressContent from './PressContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Press | JENGAKENYA',
  description: 'Media resources, press releases, and contact information for journalists covering the JENGAKENYA and Dr. Isaac Newton Kinity\'s 2027 presidential campaign.',
  keywords: ['press', 'media', 'press kit', 'journalists', 'interviews', 'Kenya', 'campaign'],
  openGraph: {
    title: 'Press | JENGAKENYA',
    description: 'Media resources and press contact for the 2027 presidential campaign.',
    images: [{ url: '/Jengakenya-logo.jpg', width: 1200, height: 630 }],
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
