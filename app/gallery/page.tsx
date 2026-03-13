// app/gallery/page.tsx - UNIFIED MEDIA CENTER (Photos + Videos)
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { FaImages, FaFolder, FaVideo, FaPlay, FaYoutube } from 'react-icons/fa';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Media Center | Kikimo Foundation',
  description: 'Photos, videos, speeches, interviews, and campaign moments.',
};

// Video Card Component
function VideoCard({ video }: { video: any }) {
  return (
    <div className="group relative aspect-video rounded-2xl overflow-hidden bg-slate-900 cursor-pointer">
      {/* Thumbnail */}
      <Image
        src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
        alt={video.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-[#E91D0E]/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-[#E91D0E]/30">
          <FaPlay className="w-6 h-6 text-white ml-1" />
        </div>
      </div>
      
      {/* Duration badge (placeholder) */}
      <div className="absolute top-4 right-4 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
        <FaYoutube className="inline w-3 h-3 mr-1 text-red-500" />
        Watch
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <FaVideo className="w-4 h-4" />
          {video.category}
        </div>
        <h3 className="font-headline text-lg text-white group-hover:text-[#0074D9] transition-colors line-clamp-2">
          {video.title}
        </h3>
      </div>
      
      {/* Clickable link */}
      <a 
        href={`https://youtube.com/watch?v=${video.youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
        aria-label={`Watch ${video.title}`}
      />
    </div>
  );
}

// Photo Album Card Component
function AlbumCard({ category }: { category: any }) {
  return (
    <Link 
      href={`/gallery/${category.slug}`}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
    >
      {category.coverImage ? (
        <Image
          src={category.coverImage}
          alt={category.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <FaImages className="w-20 h-20 text-slate-700" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <FaFolder className="w-4 h-4" />
          {category.category}
        </div>
        <h3 className="font-headline text-xl text-white group-hover:text-[#0074D9] transition-colors">
          {category.title}
        </h3>
      </div>
    </Link>
  );
}

// Tab Content Components
async function PhotosTab() {
  const categories = await prisma.galleryCategory.findMany({
    where: { published: true, deletedAt: null },
    orderBy: { order: 'asc' },
  });

  if (categories.length === 0) {
    return (
      <div className="text-center py-16">
        <FaImages className="w-16 h-16 text-slate-700 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Gallery Coming Soon</h3>
        <p className="text-slate-400">Photos from our campaign will be added here.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category) => (
        <AlbumCard key={category.id} category={category} />
      ))}
    </div>
  );
}

async function VideosTab() {
  const videos = await prisma.video.findMany({
    where: { published: true },
    orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
  });

  if (videos.length === 0) {
    return (
      <div className="text-center py-16">
        <FaVideo className="w-16 h-16 text-slate-700 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Videos Coming Soon</h3>
        <p className="text-slate-400">Speeches, interviews, and campaign videos will be added here.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

// Main Page Component
export default async function MediaCenterPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const activeTab = searchParams.tab || 'photos';

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
