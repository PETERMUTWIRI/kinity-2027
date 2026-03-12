'use client';

import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// ==========================================
// PROTECTED ADMIN PAGE WRAPPER
// Blocks unauthenticated users from viewing admin content
// ==========================================

interface ProtectedAdminPageProps {
  children: React.ReactNode;
}

export default function ProtectedAdminPage({ children }: ProtectedAdminPageProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication immediately
    const checkAuth = async () => {
      try {
        console.log('Checking auth...');
        const session = await authClient.getSession();
        console.log('Session:', session);
        
        if (!session || session === null) {
          console.log('No session - redirecting to login');
          setIsAuthenticated(false);
          // Use window.location for immediate redirect
          window.location.href = '/auth/sign-in';
          return;
        }
        
        console.log('Session found - user is authenticated');
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Auth check failed:', err);
        setIsAuthenticated(false);
        window.location.href = '/auth/sign-in';
      }
    };

    checkAuth();
  }, []);

  // Show nothing while checking (prevents flash of content)
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0074D9] mx-auto mb-4" />
          <p className="text-slate-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show redirecting message (redirect happens in useEffect)
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0074D9] mx-auto mb-4" />
          <p className="text-slate-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // User is authenticated - render the protected content
  return <>{children}</>;
}
