'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// ==========================================
// HERO IMAGE CAROUSEL
// Cinematic crossfade for presidential presence
// ==========================================

interface CarouselImage {
  src: string;
  alt: string;
}

interface HeroImageCarouselProps {
  images: CarouselImage[];
  interval?: number;        // Time between transitions (ms)
  transitionDuration?: number; // Transition animation duration (ms)
}

export default function HeroImageCarousel({
  images,
  interval = 6000,
  transitionDuration = 1500,
}: HeroImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState<boolean[]>(new Array(images.length).fill(false));

  // Preload all images
  useEffect(() => {
    images.forEach((img, index) => {
      const image = new window.Image();
      image.src = img.src;
      image.onload = () => {
        setIsLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
  }, [images]);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, interval, images.length]);

  // Pause when tab is hidden (performance)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const allLoaded = isLoaded.every(Boolean);

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Images with crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: transitionDuration / 1000, 
            ease: [0.4, 0, 0.2, 1] // Smooth easing
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-cover object-top"
            priority={currentIndex === 0}
            quality={95}
          />
        </motion.div>
      </AnimatePresence>

      {/* Loading placeholder */}
      {!allLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-3xl" />
      )}

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl pointer-events-none" />

      {/* Progress indicators - dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative p-1"
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Background dot */}
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/40 group-hover:bg-white/60'
            }`} />
            
            {/* Active progress ring (desktop only) */}
            {index === currentIndex && !isPaused && (
              <svg 
                className="absolute -inset-1 w-6 h-6 -rotate-90 hidden sm:block"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="62.8"
                  initial={{ strokeDashoffset: 62.8 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ 
                    duration: interval / 1000, 
                    ease: "linear" 
                  }}
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Pause indicator (subtle) */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
