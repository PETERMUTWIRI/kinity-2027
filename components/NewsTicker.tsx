'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaClock } from 'react-icons/fa';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
}

// Default news items to show when API fails or no data
const defaultNews: NewsItem[] = [
  { id: 1, title: 'Dr. Kinity Announces Presidential Bid for 2027', slug: 'kinity-announces-2027', createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
  { id: 2, title: 'National Vision Party Launches Vision 2027 Manifesto', slug: 'vision-2027-manifesto', createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() },
  { id: 3, title: 'Campaign Rally Scheduled for Next Week', slug: 'campaign-rally-next-week', createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() },
  { id: 4, title: 'Youth Leaders Endorse Dr. Kinity for President', slug: 'youth-leaders-endorse', createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString() },
];

// Format relative time (always show as "X hours ago" with 4 hours behind)
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  // Subtract 4 hours to make it appear older
  const adjustedDate = new Date(date.getTime() - 4 * 60 * 60 * 1000);
  const now = new Date();
  const diffMs = now.getTime() - adjustedDate.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 1) return 'Just now';
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

interface NewsTickerProps {
  isVisible: boolean;
}

export default function NewsTicker({ isVisible }: NewsTickerProps) {
  const [news, setNews] = useState<NewsItem[]>(defaultNews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/posts?limit=5');
        const data = await res.json();
        if (data.posts && data.posts.length > 0) {
          setNews(data.posts.slice(0, 5));
        }
      } catch (err) {
        console.log('Using default news items');
      }
    };
    fetchNews();
  }, []);

  // Auto-rotate news every 5 seconds
  useEffect(() => {
    if (isPaused || news.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, news.length]);

  if (!isVisible) return null;

  const currentNews = news[currentIndex];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ 
        duration: 0.35, 
        ease: [0.22, 1, 0.36, 1] // Smooth easing curve
      }}
      className="sticky top-[80px] sm:top-[88px] lg:top-[112px] z-40 overflow-hidden will-change-transform"
      style={{
        background: 'linear-gradient(90deg, #0074D9 0%, #0074D9 60%, #E91D0E 85%, #E91D0E 100%)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4 py-2 sm:py-2.5">
          
          {/* Breaking News Badge - Pulsating */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="px-2 sm:px-3 py-1 bg-[#E91D0E] rounded-full flex items-center gap-1.5"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white font-bold text-[10px] sm:text-xs uppercase tracking-wide">
                NVP
              </span>
            </motion.div>
            <span className="hidden md:block text-white font-bold text-xs uppercase tracking-wide">
              Breaking News
            </span>
          </div>

          {/* News Ticker */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 sm:gap-4"
              >
                {/* Category Tag */}
                <span className="hidden sm:inline-flex px-2 py-0.5 bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider rounded flex-shrink-0">
                  Latest
                </span>
                
                {/* News Title */}
                <Link 
                  href={`/news-hub/${currentNews.slug}`}
                  className="text-white text-sm sm:text-base font-medium truncate hover:underline"
                >
                  {currentNews.title}
                </Link>

                {/* Time */}
                <span className="hidden lg:flex items-center gap-1 text-white/70 text-xs flex-shrink-0">
                  <FaClock className="w-3 h-3" />
                  {formatRelativeTime(currentNews.createdAt)}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-1">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/40'
                }`}
                aria-label={`Go to news item ${index + 1}`}
              />
            ))}
          </div>

          {/* News Button */}
          <Link
            href="/news-hub"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-2 sm:px-4 py-1.5 bg-white text-[#E91D0E] text-[10px] sm:text-sm font-bold rounded-full hover:bg-slate-100 transition-colors"
          >
            <span>News</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-0.5 bg-white/20">
        <motion.div
          className="h-full bg-white"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
          key={currentIndex}
        />
      </div>
    </motion.div>
  );
}
