import { Metadata } from 'next';
import AboutLanding from './AboutLanding';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Our Party | National Vision Party',
  description: 'Learn about the National Vision Party, Dr. Isaac Newton Kinity, and our mission to transform Kenya through integrity, economic development, and service to all Kenyans.',
  keywords: ['National Vision Party', 'Isaac Newton Kinity', 'Kenya', 'political party', 'vision 2027', 'integrity'],
  openGraph: {
    title: 'Our Party | National Vision Party',
    description: 'Learn about the National Vision Party and our mission to transform Kenya.',
    images: [
      {
        url: '/images/about/party-overview.jpg',
        width: 1200,
        height: 630,
        alt: 'National Vision Party - Kenya\'s Hope 2027',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Party | National Vision Party',
    description: 'Learn about the National Vision Party and our mission to transform Kenya.',
    images: ['/images/about/party-overview.jpg'],
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
          { name: 'Our Party', path: '/about' },
        ]}
      />
      <AboutLanding />
    </>
  );
}
