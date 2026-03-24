'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaImages } from 'react-icons/fa';

interface GalleryImage {
  id: number;
  url: string;
  title: string | null;
  location: string | null;
  county: string | null;
}

export default function GalleryCarousel() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch only 12 images for the carousel - minimal DB/ImgBB impact
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/gallery/images?limit=12&page=1');
        const data = await res.json();
        const fetchedImages = data.images || data || [];
        
        // Duplicate images for seamless infinite scroll
        const duplicatedImages = [...fetchedImages, ...fetchedImages];
        setImages(duplicatedImages.slice(0, 24)); // Max 24 items (12 x 2)
      } catch (err) {
        console.error('Error fetching gallery images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="py-8 bg-slate-900 overflow-hidden">
        <div className="flex gap-4 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-64 h-40 bg-slate-800 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaImages className="w-6 h-6 text-[#1E3A8A]" />
            <h2 className="font-headline text-2xl text-[#0F172A]">From the Campaign Trail</h2>
          </div>
          <Link 
            href="/gallery"
            className="text-[#1E3A8A] font-semibold hover:text-[#0F172A] transition-colors text-sm"
          >
            View Gallery →
          </Link>
        </div>
      </div>

      {/* Infinite Scroll Carousel */}
      <div className="relative overflow-hidden bg-slate-900 py-4">
        {/* Gradient masks for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div className="flex gap-4 animate-scroll-right-to-left hover:[animation-play-state:paused]">
          {images.map((image, index) => (
            <Link
              key={`${image.id}-${index}`}
              href="/gallery"
              className="flex-shrink-0 group relative w-72 h-48 rounded-lg overflow-hidden"
            >
              <Image
                src={image.url}
                alt={image.title || 'Campaign photo'}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="288px"
                unoptimized // Skip Next.js image optimization to reduce processing
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Location tag */}
              {(image.location || image.county) && (
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium truncate">
                    {[image.location, image.county].filter(Boolean).join(', ')}
                  </p>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-right-to-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-right-to-left {
          animation: scroll-right-to-left 30s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
