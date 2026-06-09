import { Metadata } from 'next';
import CandidateContent from './CandidateContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Presidential Candidate | UKOMBOZI LIBERATION PARTY',
  description: 'Meet Dr. Isaac Newton Kinity, flagbearer of the UKOMBOZI LIBERATION PARTY, and discover the four pillars of his leadership: Integrity, Experience, Vision, and Commitment forged over 40+ years of sacrifice.',
  keywords: ['Isaac Newton Kinity', 'presidential candidate', 'NVP', 'leadership', 'integrity', 'experience', 'vision', 'commitment'],
  openGraph: {
    title: 'Presidential Candidate | Dr. Isaac Newton Kinity',
    description: 'Four pillars that define exceptional leadership for Kenya.',
    images: [{ url: '/images/kinity-connection.jpeg', width: 1200, height: 630 }],
  },
  alternates: { canonical: '/about/candidate' },
};

export default function CandidatePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Our Movement', path: '/about' },
          { name: 'Presidential Candidate', path: '/about/candidate' },
        ]}
      />
      <CandidateContent />
    </>
  );
}
