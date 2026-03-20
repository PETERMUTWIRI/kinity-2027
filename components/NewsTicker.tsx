'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { FaArrowRight, FaClock } from 'react-icons/fa';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
}

// Default news items
const defaultNews: NewsItem[] = [
  { id: 1, title: 'Dr. Kinity Announces Presidential Bid for 2027', slug: 'kinity-announces-2027', createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
  { id: 2, title: 'National Vision Party Launches Vision 2027 Manifesto', slug: 'vision-2027-manifesto', createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() },
  { id: 3, title: 'Campaign Rally Scheduled for Next Week', slug: 'campaign-rally-next-week', createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() },
  { id: 4, title: 'Youth Leaders Endorse Dr. Kinity for President', slug: 'youth-leaders-endorse', createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString() },
];

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
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

export default function NewsTicker() {
  const [news, setNews] = useState<NewsItem[]>(defaultNews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  
  // Use refs for scroll handling - no re-renders
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const isHidden = useRef(false);

  // Fetch news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/posts?limit=5');
        const data = await res.json();
        if (data.posts && data.posts.length > 0) {
          setNews(data.posts.slice(0, 5));
        }
      } catch (err) {
        // Use defaults
      }
    };
    fetchNews();
  }, []);

  // Auto-rotate news
  useEffect(() => {
    if (isPaused || news.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, news.length]);

  // Scroll handler with throttling and debouncing
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    
    ticking.current = true;
    
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      
      // Only hide after scrolling down significantly (200px)
      if (currentScrollY > 200 && scrollDelta > 5 && !isHidden.current) {
        isHidden.current = true;
        setIsVisible(false);
      }
      // Show when scrolling up any amount
      else if (scrollDelta < -2 && isHidden.current) {
        isHidden.current = false;
        setIsVisible(true);
      }
      // Always show at top
      else if (currentScrollY < 100) {
        isHidden.current = false;
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
      
      // Release throttle after a delay
      setTimeout(() => {
        ticking.current = false;
      }, 100);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const currentNews = news[currentIndex];

  return (
    <div
      className={`fixed left-0 right-0 z-40 transition-transform duration-300 ease-out top-16 lg:top-20 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{
        background: 'linear-gradient(90deg, #0074D9 0%, #0074D9 60%, #E91D0E 85%, #E91D0E 100%)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4 py-2">
          
          {/* Breaking News Badge */}
          <div className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2">
            <div className="px-2 sm:px-3 py-1 bg-[#E91D0E] rounded-full flex items-center gap-1 animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              <span className="text-white font-bold text-[10px] sm:text-xs uppercase tracking-wide">
                NVP
              </span>
            </div>
            <span className="hidden md:block text-white font-bold text-xs uppercase tracking-wide">
              Breaking News
            </span>
          </div>

          {/* News Ticker */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div
              key={currentIndex}
              className="flex items-center gap-2 animate-fadeIn"
            >
              <span className="hidden sm:inline-flex px-2 py-0.5 bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider rounded flex-shrink-0">
                Latest
              </span>
              
              <Link 
                href={`/news-hub/${currentNews.slug}`}
                className="text-white text-xs sm:text-sm font-medium truncate hover:underline"
              >
                {currentNews.title}
              </Link>

              <span className="hidden lg:flex items-center gap-1 text-white/70 text-xs flex-shrink-0">
                <FaClock className="w-3 h-3" />
                {formatRelativeTime(currentNews.createdAt)}
              </span>
            </div>
          </div>

          {/* Navigation Dots */}
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
            className="flex-shrink-0 inline-flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-white text-[#E91D0E] text-[10px] sm:text-sm font-bold rounded-full hover:bg-slate-100 transition-colors"
          >
            <span>News</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-0.5 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-[5000ms] ease-linear"
          style={{ width: isPaused ? '0%' : '100%', transitionDuration: isPaused ? '0ms' : '5000ms' }}
          key={currentIndex}
        />
      </div>
    </div>
  );
}
