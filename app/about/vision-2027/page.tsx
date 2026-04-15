import { Metadata } from 'next';
import VisionContent from './VisionContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Vision 2027 | National Vision Party',
  description: 'Eight transformative pillars that will restore Kenya\'s dignity: Economic Transformation, Zero Corruption, Universal Healthcare, Education Revolution, Social Protection, Agriculture, Youth & Women Empowerment, and Security.',
  keywords: ['Vision 2027', 'economic transformation', 'zero corruption', 'healthcare', 'education', 'Kenya'],
  openGraph: {
    title: 'Vision 2027 | National Vision Party',
    description: 'Eight pillars to transform Kenya into a prosperous, corruption-free nation.',
    images: [{ url: '/images/rally.jpeg', width: 1200, height: 630 }],
  },
  alternates: { canonical: '/about/vision-2027' },
};

export default function VisionPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Our Movement', path: '/about' },
          { name: 'Vision 2027', path: '/about/vision-2027' },
        ]}
      />
      <VisionContent />
    </>
  );
}
