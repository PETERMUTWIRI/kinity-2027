'use client';

import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// ==========================================
// PROTECTED ADMIN PAGE WRAPPER
// Protects individual admin pages from unauthorized access
// ==========================================

interface ProtectedAdminPageProps {
  children: React.ReactNode;
}

export default function ProtectedAdminPage({ children }: ProtectedAdminPageProps) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        if (!session) {
          // Not authenticated - redirect immediately
          window.location.replace('/auth/sign-in');
          return;
        }
        // Authenticated - show content
        setIsAuth(true);
        setIsLoading(false);
      } catch (err) {
        console.error('Auth error:', err);
        window.location.replace('/auth/sign-in');
      }
    };

    checkAuth();
  }, []);

  // Show loading or nothing while checking auth
  if (isLoading || !isAuth) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0074D9] mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  // User is authenticated - render the protected content
  return <>{children}</>;
}
