'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import NewsTicker from './NewsTicker';
import WhatsAppChat from './WhatsAppChat';
import CookieConsent from './CookieConsent';
import MobileActionBar from './MobileActionBar';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <NewsTicker />}
      <main className="relative z-10">{children}</main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppChat />}
      {!isAdminRoute && <CookieConsent />}
      {!isAdminRoute && <MobileActionBar />}
    </>
  );
}
