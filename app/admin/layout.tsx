'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FaHome, 
  FaNewspaper, 
  FaCalendarAlt, 
  FaVideo, 
  FaImages, 
  FaHeart, 
  FaEnvelope,
  FaFlag,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHandshake,
} from 'react-icons/fa';

// ==========================================
// ADMIN LAYOUT - Kikimo Foundation
// ==========================================

const adminNavLinks = [
  { name: 'Dashboard', href: '/admin', icon: FaHome },
  { name: 'News Posts', href: '/admin/posts', icon: FaNewspaper },
  { name: 'Events', href: '/admin/events', icon: FaCalendarAlt },
  { name: 'Videos', href: '/admin/videos', icon: FaVideo },
  { name: 'Gallery', href: '/admin/gallery', icon: FaImages },
  { name: 'Donations', href: '/admin/donations', icon: FaHeart },
  { name: 'Volunteers', href: '/admin/volunteers', icon: FaHandshake },
  { name: 'Subscribers', href: '/admin/subscribers', icon: FaEnvelope },
  { name: 'Manifesto', href: '/admin/manifesto', icon: FaFlag },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check authentication status via API
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            setUser(data.user);
          } else {
            router.replace('/auth/sign-in');
          }
        } else {
          // Not authenticated
          router.replace('/auth/sign-in');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.replace('/auth/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0074D9] mx-auto mb-4" />
          <p className="text-slate-400">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 lg:transform-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0074D9] to-[#6B2C91] flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div>
              <h1 className="text-white font-slogan text-lg leading-tight">Kikimo Foundation</h1>
              <p className="text-slate-400 text-xs">Admin Panel</p>
            </div>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {adminNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 group"
            >
              <link.icon className="w-5 h-5 group-hover:text-[#0074D9] transition-colors" />
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <button
            onClick={async () => {
              try {
                await fetch('/api/auth/signout', { method: 'POST', credentials: 'include' });
              } catch (e) {
                // Ignore error
              }
              window.location.href = '/auth/sign-in';
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40">
          <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <FaBars className="w-5 h-5" />
              </button>
              <h2 className="text-white font-semibold text-lg hidden sm:block">
                Campaign Management
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Quick Actions */}
              <Link
                href="/admin/posts/new"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0074D9] text-white text-sm font-semibold hover:bg-[#005CB0] transition-colors"
              >
                <FaNewspaper className="w-4 h-4" />
                New Post
              </Link>
              <Link
                href="/admin/events/new"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E91D0E] text-white text-sm font-semibold hover:bg-[#BA170C] transition-colors"
              >
                <FaCalendarAlt className="w-4 h-4" />
                New Event
              </Link>

              {/* User Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0074D9] to-[#6B2C91] flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.name?.[0] || user?.email?.[0] || 'A'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
