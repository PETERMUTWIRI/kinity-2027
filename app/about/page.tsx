import { Metadata } from 'next';
import AboutContent from './AboutContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'About | Kikimo Foundation',
  description: 'Learn about Dr. Isaac Newton Kinity and the Kikimo Foundation\'s mission to transform Kenya through integrity, economic development, and service to all Kenyans.',
  keywords: ['Isaac Newton Kinity', 'Kikimo Foundation', 'Kenya', 'foundation', 'charity', 'integrity', 'economic transformation'],
  openGraph: {
    title: 'About Dr. Isaac Newton Kinity | Kikimo Foundation',
    description: 'Learn about Dr. Isaac Newton Kinity and the Kikimo Foundation\'s mission to transform Kenya.',
    images: [
      {
        url: '/images/about/dr-kinity.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Isaac Newton Kinity - Kikimo Foundation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dr. Isaac Newton Kinity | Kikimo Foundation',
    description: 'Learn about Dr. Isaac Newton Kinity and the Kikimo Foundation\'s mission to transform Kenya.',
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
