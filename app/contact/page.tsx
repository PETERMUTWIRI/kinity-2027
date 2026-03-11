import { Metadata } from 'next';
import ContactContent from './ContactContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Contact | Dr. Isaac Newton Kinity',
  description: 'Get in touch with Dr. Isaac Newton Kinity for volunteering, campaign events, media inquiries, or general questions. Join the 2027 presidential campaign for a better Kenya.',
  keywords: ['Dr. Isaac Newton Kinity', 'contact', 'Kenya 2027', 'presidential campaign', 'volunteer', 'political events', 'media contact', 'Kinity 2027'],
  openGraph: {
    title: 'Contact Dr. Isaac Newton Kinity | 2027 Presidential Campaign',
    description: 'Connect with Dr. Isaac Newton Kinity for volunteering, campaign events, or media inquiries. Join us in shaping Kenya\'s future.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Dr. Isaac Newton Kinity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Dr. Isaac Newton Kinity | 2027 Presidential Campaign',
    description: 'Connect with Dr. Isaac Newton Kinity for volunteering, campaign events, or media inquiries.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />
      <ContactContent />
    </>
  );
}
