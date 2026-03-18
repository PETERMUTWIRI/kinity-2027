import { Metadata } from 'next';
import AboutContent from './AboutContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'About | National Vision Party',
  description: 'Learn about Dr. Isaac Newton Kinity and his mission to transform Kenya through integrity, economic development, and service to all Kenyans.',
  keywords: ['Isaac Newton Kinity', 'National Vision Party', 'Kenya', 'presidential campaign', 'integrity', 'economic transformation'],
  openGraph: {
    title: 'About Dr. Isaac Newton Kinity | National Vision Party',
    description: 'Learn about Dr. Isaac Newton Kinity and his mission to transform Kenya.',
    images: [
      {
        url: '/images/about/dr-kinity.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Isaac Newton Kinity - National Vision Party',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dr. Isaac Newton Kinity | National Vision Party',
    description: 'Learn about Dr. Isaac Newton Kinity and his mission to transform Kenya.',
    images: ['/images/about/dr-kinity.jpg'],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />
      <AboutContent />
    </>
  );
}
