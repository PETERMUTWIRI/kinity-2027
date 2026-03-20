'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import NewsTicker from './NewsTicker';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  
  const [showNewsTicker, setShowNewsTicker] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNewsTicker(false);
      } else {
        setShowNewsTicker(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
