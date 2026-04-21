import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { boardMembers } from '@/lib/board';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import BoardMemberContent from './BoardMemberContent';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return boardMembers.map((member) => ({
    id: member.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const member = boardMembers.find((m) => m.slug === id);

  if (!member) {
    return {
      title: 'Not Found | National Vision Party',
    };
  }

  return {
    title: `${member.name} — ${member.role} | National Vision Party`,
    description: member.bio,
    openGraph: {
      title: `${member.name} — ${member.role}`,
      description: member.bio,
      images: member.image ? [{ url: member.image, width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: `/about/leadership/${member.slug}`,
    },
  };
}

export default async function BoardMemberPage({ params }: PageProps) {
  const { id } = await params;
  const member = boardMembers.find((m) => m.slug === id);

  if (!member) {
    notFound();
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Our Movement', path: '/about' },
          { name: 'Leadership', path: '/about/leadership' },
          { name: member.name, path: `/about/leadership/${member.slug}` },
        ]}
      />
      <BoardMemberContent member={member} />
    </>
  );
}
