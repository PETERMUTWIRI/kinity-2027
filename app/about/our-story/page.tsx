import { Metadata } from 'next';
import OurStoryContent from './OurStoryContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Our Story | National Vision Party',
  description: 'The remarkable journey of Dr. Isaac Newton Kinity—from a 20-year-old union activist opposing the Moi regime to surviving poisoning and becoming Kenya\'s hope for 2027.',
  keywords: ['Isaac Newton Kinity', 'biography', 'Kenya history', 'Moi era', 'activism', 'poisoning', 'exile'],
  openGraph: {
    title: 'Our Story | Dr. Isaac Newton Kinity',
    description: 'The journey of a man who sacrificed everything for Kenya.',
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
          { name: 'Our Party', path: '/about' },
          { name: 'Our Story', path: '/about/our-story' },
        ]}
      />
      <OurStoryContent />
    </>
  );
}
