// app/gallery/page.tsx - UNIFIED MEDIA CENTER (Photos + Videos)
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { FaImages, FaVideo, FaPlay, FaYoutube, FaCamera, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Media Center | Isaac Kinity',
  description: 'Photos, videos, speeches, interviews, and campaign moments.',
};

interface Props {
  searchParams: Promise<{ tab?: string }>;
}

// Video Card Component
function VideoCard({ video }: { video: any }) {
  return (
    <a 
      href={`https://youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-video rounded-2xl overflow-hidden bg-slate-900 cursor-pointer block"
    >
      {/* Thumbnail */}
      <Image
        src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
        alt={video.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        unoptimized
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-[#E91D0E]/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-[#E91D0E]/30">
          <FaPlay className="w-6 h-6 text-white ml-1" />
        </div>
      </div>
      
      {/* Category badge */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-[#E91D0E] text-white text-xs font-bold rounded-full">
        {video.category}
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-headline text-lg text-white group-hover:text-[#0074D9] transition-colors line-clamp-2">
          {video.title}
        </h3>
        <p className="text-white/60 text-sm mt-1">
          Watch on YouTube
        </p>
      </div>
    </a>
  );
}

// Photo Card Component
function PhotoCard({ image }: { image: any }) {
  return (
    <div className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-800 cursor-pointer">
      <Image
        src={image.url}
        alt={image.title || 'Campaign photo'}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        unoptimized
      />
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Info on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
        {image.photographer && (
          <p className="text-white/80 text-sm flex items-center gap-1 mb-1">
            <FaCamera className="w-3 h-3" />
            {image.photographer}
          </p>
        )}
        {(image.location || image.county) && (
          <p className="text-white/60 text-xs flex items-center gap-1">
            <FaMapMarkerAlt className="w-3 h-3" />
            {[image.location, image.county].filter(Boolean).join(', ')}
          </p>
        )}
        {image.eventDate && (
          <p className="text-white/60 text-xs flex items-center gap-1 mt-1">
            <FaCalendar className="w-3 h-3" />
            {new Date(image.eventDate).toLocaleDateString('en-KE', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
        )}
      </div>
      
      {/* Click to view full image */}
      <a 
        href={image.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
        aria-label="View full image"
      />
    </div>
  );
}

// Album Card Component
function AlbumCard({ album }: { album: any }) {
  return (
    <Link 
      href={`/gallery/album/${album.slug}`}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden block"
    >
      {album.coverImage ? (
        <Image
          src={album.coverImage}
          alt={album.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <FaImages className="w-20 h-20 text-slate-700" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className="inline-block px-2 py-1 bg-[#0074D9]/80 text-white text-xs rounded mb-2">
          {album._count?.images || 0} photos
        </span>
        <h3 className="font-headline text-xl text-white group-hover:text-[#0074D9] transition-colors">
          {album.title}
        </h3>
      </div>
    </Link>
  );
}

// Photos Tab with Albums and Images
async function PhotosTab() {
  const [albums, recentImages] = await Promise.all([
    prisma.galleryCategory.findMany({
      where: { published: true, deletedAt: null },
      orderBy: { order: 'asc' },
      include: {
        _count: { select: { images: true } }
      }
    }),
    prisma.galleryImage.findMany({
      where: { published: true, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 12,
    })
  ]);

  const hasContent = albums.length > 0 || recentImages.length > 0;

  if (!hasContent) {
    return (
      <div className="text-center py-16">
        <FaImages className="w-16 h-16 text-slate-700 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Gallery Coming Soon</h3>
        <p className="text-slate-400">Photos from our campaign will be added here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Albums Section */}
      {albums.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FaImages className="text-[#0074D9]" />
            Photo Albums
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Images Section */}
      {recentImages.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FaCamera className="text-[#0074D9]" />
            Recent Photos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recentImages.map((image) => (
              <PhotoCard key={image.id} image={image} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Videos Tab
async function VideosTab() {
  const videos = await prisma.video.findMany({
    where: { published: true },
    orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
  });

  if (videos.length === 0) {
    return (
      <div className="text-center py-16">
        <FaVideo className="w-16 h-16 text-slate-700 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No Videos Yet</h3>
        <p className="text-slate-400 mb-4">Campaign videos will appear here once added from the admin panel.</p>
        <p className="text-slate-500 text-sm">
          Make sure videos are marked as &quot;Published&quot; in the admin to show here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

// Tab Navigation Component (Client Component wrapper not needed, just using correct Link)
function TabNavigation({ activeTab }: { activeTab: string }) {
  return (
    <div className="flex gap-1 -mb-px">
      <Link
        href="/gallery?tab=photos"
        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
          activeTab === 'photos'
            ? 'border-[#0074D9] text-[#0074D9]'
            : 'border-transparent text-slate-400 hover:text-white hover:border-slate-700'
        }`}
      >
        <FaImages className="w-4 h-4" />
        Photos
      </Link>
      <Link
        href="/gallery?tab=videos"
        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
          activeTab === 'videos'
            ? 'border-[#0074D9] text-[#0074D9]'
            : 'border-transparent text-slate-400 hover:text-white hover:border-slate-700'
        }`}
      >
        <FaVideo className="w-4 h-4" />
        Videos
      </Link>
    </div>
  );
}

// Main Page Component
export default async function MediaCenterPage({
  searchParams,
}: Props) {
  // Await searchParams as it's now a Promise in Next.js 15
  const params = await searchParams;
  const activeTab = params.tab || 'photos';

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0074D9] to-[#6B2C91] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-slogan text-4xl md:text-5xl text-white mb-4">
            MEDIA CENTER
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Explore photos, videos, speeches, interviews, and campaign moments from across Kenya.
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-16 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TabNavigation activeTab={activeTab} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense 
          fallback={
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-slate-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          }
        >
          {activeTab === 'videos' ? <VideosTab /> : <PhotosTab />}
        </Suspense>
      </div>
    </div>
  );
}
