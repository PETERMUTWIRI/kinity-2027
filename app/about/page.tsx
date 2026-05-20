import { Metadata } from 'next';
import AboutLanding from './AboutLanding';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Our Movement | UKOMBOZI party',
  description: 'Learn about the UKOMBOZI party, Dr. Isaac Newton Kinity, and our mission to transform Kenya through integrity, economic development, and service to all Kenyans.',
  keywords: ['UKOMBOZI party', 'Isaac Newton Kinity', 'Kenya', 'political party', 'vision 2027', 'integrity'],
  openGraph: {
    title: 'Our Movement | UKOMBOZI party',
    description: 'Learn about the UKOMBOZI party and our mission to transform Kenya.',
    images: [
      {
        url: '/images/about/party-overview.jpg',
        width: 1200,
        height: 630,
        alt: 'UKOMBOZI party - Kenya\'s Hope 2027',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Movement | UKOMBOZI party',
    description: 'Learn about the UKOMBOZI party and our mission to transform Kenya.',
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
          { name: 'Our Movement', path: '/about' },
        ]}
      />
      <AboutLanding />
    </>
  );
}
