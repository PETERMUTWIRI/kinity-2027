// app/gallery/page.tsx - PHOTO GALLERY WITH PAGINATION
import { Metadata } from 'next';
import { Suspense } from 'react';
import { FaImages } from 'react-icons/fa';
import GalleryContent from './GalleryContent';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Photo Gallery | National Vision Party',
  description: 'Photos from campaign rallies, events, and moments from across Kenya.',
};

// Loading Skeleton
function GallerySkeleton() {
  return (
    <div className="space-y-12">
      <section>
        <div className="h-8 w-48 bg-slate-800 rounded animate-pulse mb-6" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      </section>
      <section>
        <div className="h-8 w-48 bg-slate-800 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1E3A8A] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="kicker-gold mb-4 !text-white">Media Center</span>
          <h1 className="heading-editorial !text-white mb-4">
            Photo <span className="heading-accent-gold !text-white">Gallery</span>
          </h1>
          <div className="hr-white mx-auto mb-4" />
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Explore photos from campaign rallies, events, and moments from across Kenya.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<GallerySkeleton />}>
          <GalleryContent />
        </Suspense>
      </div>
    </div>
  );
}
