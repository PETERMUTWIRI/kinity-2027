import VideosClient from './VideosClient';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';


export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Videos | Dr. Isaac Newton Kinity',
  description: 'Watch campaign videos, speeches, rallies, interviews, and behind-the-scenes footage from Dr. Isaac Newton Kinity\'s 2027 presidential campaign.',
  keywords: ['campaign videos', 'speeches', 'rallies', 'Kenya politics', 'presidential campaign', 'interviews', 'youtube', 'political events'],
  openGraph: {
    title: 'Videos | Dr. Isaac Newton Kinity',
    description: 'Watch campaign videos, speeches, rallies, and interviews from the 2027 presidential campaign.',
    type: 'video.other',
    url: 'https://www.isaackinity.net/videos',
    images: [
      {
        url: '/isaac_kinity-logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Dr. Isaac Newton Kinity Campaign Videos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Videos | Dr. Isaac Newton Kinity',
    description: 'Watch campaign videos, speeches, and rallies from the 2027 presidential campaign.',
  },
  alternates: {
    canonical: 'https://www.isaackinity.net/videos',
  },
};

// Server component to fetch videos from DB
async function getVideos() {
  try {
    const videos = await prisma.video.findMany({
      where: { published: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    
    // Convert nulls to undefined and dates to strings
    return videos.map((v) => ({
      id: String(v.id),
      title: v.title,
      description: v.description ?? undefined,
      youtubeId: v.youtubeId,
      category: v.category,
      thumbnail: v.thumbnail ?? undefined,
      published: v.published,
      order: v.order,
      createdAt: v.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default async function VideosPage() {
  const videos = await getVideos();
  
  return (
    <VideosClient initialVideos={videos} />
  );
}
