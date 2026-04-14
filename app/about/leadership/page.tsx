import { Metadata } from 'next';
import LeadershipContent from './LeadershipContent';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Leadership | National Vision Party',
  description: 'Meet the leadership of the National Vision Party—a movement of servant-leaders committed to restoring Kenya\'s dignity through accountable, people-centered governance.',
  keywords: ['National Vision Party', 'leadership', 'party structure', 'servant leadership', 'Kenya', 'NVP'],
  openGraph: {
    title: 'Leadership | National Vision Party',
    description: 'A movement of servant-leaders committed to restoring Kenya\'s dignity.',
    images: [{ url: '/images/president.jpeg', width: 1200, height: 630 }],
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
          { name: 'Leadership', path: '/about/leadership' },
        ]}
      />
      <LeadershipContent />
    </>
  );
}
