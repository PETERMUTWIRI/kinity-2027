import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.kinity2027.com';
  
  // Static pages
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/our-story', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/vision-2027', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/on-the-ground', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/events', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/gallery', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/videos', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/press', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/join-us', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/support', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  // Dynamic pages - Events
  let events: { slug: string; updatedAt: Date }[] = [];
  try {
    events = await prisma.event.findMany({
      where: { deletedAt: null, isPublic: true },
      select: { slug: true, updatedAt: true },
    });
  } catch (e) {
    console.error('Error fetching events for sitemap:', e);
  }

  // Dynamic pages - Posts (News/Press Releases)
  let posts: { slug: string; updatedAt: Date }[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { published: true, deletedAt: null },
      select: { slug: true, updatedAt: true },
    });
  } catch (e) {
    console.error('Error fetching posts for sitemap:', e);
  }

  // Dynamic pages - Gallery Categories
  let galleries: { slug: string; updatedAt: Date }[] = [];
  try {
    galleries = await prisma.galleryCategory.findMany({
      where: { deletedAt: null, published: true },
      select: { slug: true, updatedAt: true },
    });
  } catch (e) {
    console.error('Error fetching galleries for sitemap:', e);
  }

  // Dynamic pages - Videos
  let videos: { id: number; updatedAt: Date }[] = [];
  try {
    videos = await prisma.video.findMany({
      where: { published: true },
      select: { id: true, updatedAt: true },
    });
  } catch (e) {
    console.error('Error fetching videos for sitemap:', e);
  }

  const now = new Date();

  return [
    // Static pages
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),

    // Events
    ...events.map((event) => ({
      url: `${baseUrl}/events/${event.slug}`,
      lastModified: event.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Posts (News/Press Releases)
    ...posts.map((post) => ({
      url: `${baseUrl}/on-the-ground/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Gallery Categories
    ...galleries.map((gallery) => ({
      url: `${baseUrl}/gallery/${gallery.slug}`,
      lastModified: gallery.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Videos
    ...videos.map((video) => ({
      url: `${baseUrl}/videos/${video.id}`,
      lastModified: video.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
