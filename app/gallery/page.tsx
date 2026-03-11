// app/gallery/page.tsx - PHOTO GALLERY
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { FaImages, FaFolder } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Gallery | Kikimo Foundation',
  description: 'Campaign photos, rally images, and behind-the-scenes moments.',
};

export default async function GalleryPage() {
  const categories = await prisma.galleryCategory.findMany({
    where: { published: true, deletedAt: null },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0074D9] to-[#6B2C91] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-slogan text-4xl md:text-5xl text-white mb-4">
            PHOTO GALLERY
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Capturing the energy and passion of our campaign across Kenya.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.id} 
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
                  <h2 className="font-headline text-xl text-white group-hover:text-[#0074D9] transition-colors">
                    {category.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FaImages className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Gallery Coming Soon</h3>
            <p className="text-slate-400">Photos from our campaign will be added here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
