'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaImages, FaCamera, FaMapMarkerAlt, FaCalendar, FaSpinner, FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

interface GalleryImage {
  id: number;
  title: string | null;
  url: string;
  photographer: string | null;
  location: string | null;
  county: string | null;
  eventDate: string | null;
}

interface Album {
  id: number;
  title: string;
  slug: string;
  coverImage: string | null;
  _count: { images: number };
}

// Photo Card Component
function PhotoCard({ image }: { image: GalleryImage }) {
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
function AlbumCard({ album }: { album: Album }) {
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
        <span className="inline-block px-2 py-1 bg-[#1E3A8A]/80 text-white text-xs rounded mb-2">
          {album._count?.images || 0} photos
        </span>
        <h3 className="font-headline text-xl text-white group-hover:text-[#1E3A8A] transition-colors">
          {album.title}
        </h3>
      </div>
    </Link>
  );
}

export default function GalleryContent() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [albumsLoaded, setAlbumsLoaded] = useState(false);

  const IMAGES_PER_PAGE = 12;

  // Fetch albums once
  useEffect(() => {
    fetch('/api/gallery/albums')
      .then(res => res.json())
      .then(data => {
        setAlbums(data || []);
        setAlbumsLoaded(true);
      })
      .catch(err => {
        console.error('Error fetching albums:', err);
        setAlbumsLoaded(true);
      });
  }, []);

  // Fetch images with pagination
  const fetchImages = useCallback(async (pageNum: number, append = false) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const res = await fetch(`/api/gallery/images?page=${pageNum}&limit=${IMAGES_PER_PAGE}`);
      const data = await res.json();
      
      if (data.images) {
        if (append) {
          setImages(prev => [...prev, ...data.images]);
        } else {
          setImages(data.images);
        }
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error('Error fetching images:', err);
    }

    if (pageNum === 1) setLoading(false);
    else setLoadingMore(false);
  }, []);

  // Initial load
  useEffect(() => {
    fetchImages(1);
  }, [fetchImages]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(nextPage, true);
  };

  const hasMore = images.length < total;
  const hasContent = albums.length > 0 || images.length > 0;

  if (loading && !albumsLoaded) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-[4/3] bg-slate-800 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

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
            <FaImages className="text-[#1E3A8A]" />
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
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <FaCamera className="text-[#1E3A8A]" />
          Recent Photos
          <span className="text-sm font-normal text-slate-400 ml-2">
            ({images.length} of {total})
          </span>
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <PhotoCard key={image.id} image={image} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E3A8A] text-white font-semibold rounded-xl hover:bg-[#0F172A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <>
                      <FaSpinner className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <FaChevronDown className="w-5 h-5" />
                      Load More Photos
                      <span className="text-white/60 text-sm">
                        ({total - images.length} remaining)
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
