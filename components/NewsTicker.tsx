'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaNewspaper, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  slug: string;
}

export default function NewsTicker() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog?limit=5');
        const data = await res.json();
        const postsData = data.posts || data || [];
        setPosts(postsData.slice(0, 5));
      } catch (err) {
        console.error('Error fetching news ticker:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (posts.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-[#D4A017]">
        <FaNewspaper className="w-4 h-4" />
        <div className="w-48 h-4 bg-[#D4A017]/20 rounded animate-pulse" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Link href="/news-hub" className="flex items-center gap-3 text-[#D4A017] hover:text-white transition-colors">
        <FaNewspaper className="w-4 h-4" />
        <span className="text-sm font-medium">Visit News Hub</span>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <FaNewspaper className="w-4 h-4 text-[#D4A017] flex-shrink-0" />
      
      <div className="relative overflow-hidden min-w-[200px] sm:min-w-[300px] md:min-w-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Link 
              href={`/news-hub/${posts[currentIndex].slug}`}
              className="text-sm text-[#D4A017] hover:text-white transition-colors truncate max-w-[180px] sm:max-w-[280px] md:max-w-[380px]"
              title={posts[currentIndex].title}
            >
              {posts[currentIndex].title}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center gap-1">
        <button
          onClick={goToPrev}
          className="w-6 h-6 rounded-full bg-[#D4A017]/20 hover:bg-[#D4A017]/40 flex items-center justify-center text-[#D4A017] transition-colors"
          aria-label="Previous news"
        >
          <FaChevronLeft className="w-3 h-3" />
        </button>
        <button
          onClick={goToNext}
          className="w-6 h-6 rounded-full bg-[#D4A017]/20 hover:bg-[#D4A017]/40 flex items-center justify-center text-[#D4A017] transition-colors"
          aria-label="Next news"
        >
          <FaChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="hidden sm:flex items-center gap-1 ml-2">
        {posts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              idx === currentIndex ? 'bg-[#D4A017]' : 'bg-[#D4A017]/30'
            }`}
            aria-label={`Go to news ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
