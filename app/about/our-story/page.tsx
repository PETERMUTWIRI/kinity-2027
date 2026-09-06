import { Metadata } from 'next';
import OurStoryContent from './OurStoryContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'The Jengakenya Story | JENGAKENYA',
  description: 'The JENGAKENYA was born from decades of struggle—from a young union activist\'s defiance to a nationwide movement ready to reclaim Kenya\'s future.',
  keywords: ['JENGAKENYA', 'Jengakenya history', 'Kenya politics', 'Moi era', 'activism', 'movement', 'party origin'],
  openGraph: {
    title: 'The Jengakenya Story | JENGAKENYA',
    description: 'Born from decades of sacrifice and struggle, a movement by the people, for the people.',
    images: [{ url: '/images/president.jpeg', width: 1200, height: 630 }],
  },
  alternates: { canonical: '/about/our-story' },
};

export default function OurStoryPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Our Movement', path: '/about' },
          { name: 'Our Story', path: '/about/our-story' },
        ]}
      />
      <OurStoryContent />
    </>
  );
}
