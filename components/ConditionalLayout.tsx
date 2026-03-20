'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import NewsTicker from './NewsTicker';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  
  const [showNewsTicker, setShowNewsTicker] = useState(true);
  
  // Use refs to track scroll state without causing re-renders
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const scrollDirection = useRef<'up' | 'down'>('up');

  useEffect(() => {
    const handleScroll = () => {
      // Prevent multiple updates within the same animation frame
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Determine scroll direction
          if (currentScrollY > lastScrollY.current) {
            scrollDirection.current = 'down';
          } else {
            scrollDirection.current = 'up';
          }
          
          // Apply visibility logic with a threshold to prevent flickering
          // Only hide after scrolling down 50px, show immediately on scroll up
          if (scrollDirection.current === 'down' && currentScrollY > 150) {
            setShowNewsTicker(false);
          } else if (scrollDirection.current === 'up') {
            setShowNewsTicker(true);
          }
          
          // Special case: always show when near top
          if (currentScrollY < 50) {
            setShowNewsTicker(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <NewsTicker isVisible={showNewsTicker} />}
      <main className={`relative z-10 ${isAdminRoute ? '' : ''}`}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
