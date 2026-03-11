import { Metadata } from 'next';
import AboutContent from './AboutContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'About | Dr. Isaac Newton Kinity',
  description: 'Learn about Dr. Isaac Newton Kinity - the 2027 presidential candidate committed to transforming Kenya through integrity, economic development, and service to all Kenyans.',
  keywords: ['Isaac Newton Kinity', 'Kinity 2027', 'Kenya president', 'presidential candidate', 'Kenya politics', 'integrity', 'economic transformation'],
  openGraph: {
    title: 'About Dr. Isaac Newton Kinity | Kenya\'s Hope 2027',
    description: 'Meet the 2027 presidential candidate committed to the service of Kenyans. No recycling of corrupt politicians.',
    images: [
      {
        url: '/images/about/dr-kinity.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Isaac Newton Kinity - Presidential Candidate 2027',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dr. Isaac Newton Kinity | Kenya\'s Hope 2027',
    description: 'Meet the 2027 presidential candidate committed to the service of Kenyans.',
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
