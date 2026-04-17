// app/gallery/album/[slug]/page.tsx - Album Detail Page
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { FaImages, FaArrowLeft, FaCamera, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = await prisma.galleryCategory.findUnique({
    where: { slug, published: true, deletedAt: null },
  });

  if (!album) {
    return { title: 'Album Not Found' };
  }

  return {
    title: `${album.title} | Media Center`,
    description: album.description || `View photos from ${album.title}`,
  };
}

export default async function AlbumPage({ params }: Props) {
  const { slug } = await params;
  
  const album = await prisma.galleryCategory.findUnique({
    where: { slug, published: true, deletedAt: null },
  });

  if (!album) {
    notFound();
  }

  const images = await prisma.galleryImage.findMany({
    where: {
      albumId: album.id,
      published: true,
      deletedAt: null,
    },
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1E3A8A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/gallery?tab=photos"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Media Center
          </Link>
          <h1 className="font-slogan text-4xl md:text-5xl text-white mb-4">
            {album.title}
          </h1>
          {album.description && (
            <p className="text-white/80 text-lg max-w-2xl">
              {album.description}
            </p>
          )}
          <p className="text-white/60 mt-4">
            {images.length} {images.length === 1 ? 'photo' : 'photos'}
          </p>
        </div>
      </div>

      {/* Images Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <a
                key={image.id}
                href={image.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-xl bg-slate-800 ${
                  index === 0 ? 'col-span-2 row-span-2' : 'aspect-square'
                }`}
              >
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
                  {image.title && (
                    <p className="text-white font-medium mb-2">{image.title}</p>
                  )}
                  {image.photographer && (
                    <p className="text-white/80 text-sm flex items-center gap-1">
                      <FaCamera className="w-3 h-3" />
                      {image.photographer}
                    </p>
                  )}
                  {(image.location || image.county) && (
                    <p className="text-white/60 text-xs flex items-center gap-1 mt-1">
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
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FaImages className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No photos yet</h3>
            <p className="text-slate-400">This album is empty. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
