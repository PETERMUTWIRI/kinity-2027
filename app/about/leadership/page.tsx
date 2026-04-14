import { Metadata } from 'next';
import LeadershipContent from './LeadershipContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Our Candidate | National Vision Party',
  description: 'Meet Dr. Isaac Newton Kinity and discover the four pillars of his leadership: Integrity, Experience, Vision, and Commitment forged over 40+ years of sacrifice.',
  keywords: ['Isaac Newton Kinity', 'leadership', 'integrity', 'experience', 'vision', 'commitment'],
  openGraph: {
    title: 'Our Candidate | Dr. Isaac Newton Kinity',
    description: 'Four pillars that define exceptional leadership for Kenya.',
    images: [{ url: '/images/kinity-connection.jpeg', width: 1200, height: 630 }],
  },
  alternates: { canonical: '/about/leadership' },
};

export default function LeadershipPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Our Movement', path: '/about' },
          { name: 'Our Candidate', path: '/about/leadership' },
        ]}
      />
      <LeadershipContent />
    </>
  );
}
