'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className={`relative z-10 ${isAdminRoute ? '' : ''}`}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
