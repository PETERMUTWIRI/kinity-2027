'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// ==========================================
// AUTH SIGN IN - Kikimo Foundation Admin
// Uses Neon Auth server-side flow
// ==========================================

export default function SignInPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            router.replace('/admin');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  // Redirect to Neon Auth sign-in
  const handleSignIn = () => {
    // Neon Auth uses the auth.neon.tech service
    // Redirect to the Neon Auth sign-in page
    const authUrl = process.env.NEXT_PUBLIC_NEON_AUTH_URL || 'https://auth.neon.tech';
    const callbackUrl = `${window.location.origin}/admin`;
    window.location.href = `${authUrl}/sign-in?callback=${encodeURIComponent(callbackUrl)}`;
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0074D9] mx-auto mb-4" />
          <p className="text-slate-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0074D9] mx-auto mb-4" />
          <p className="text-slate-400">Redirecting to admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-lg ring-2 ring-[#0074D9]/30">
              <Image
                src="/kikimo-logo.jpeg"
                alt="Kikimo Foundation"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <p className="font-slogan text-xl text-[#E91D0E]">Kikimo Foundation</p>
              <p className="text-xs text-slate-400">Admin Portal</p>
            </div>
          </Link>
        </div>

        {/* Sign In Card */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Admin Sign In
          </h1>
          <p className="text-slate-400 text-center mb-8">
            Sign in to access the campaign management dashboard
          </p>

          <button
            onClick={handleSignIn}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0074D9] to-[#6B2C91] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#0074D9]/25"
          >
            Sign In with Neon Auth
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Secure authentication powered by{' '}
              <a 
                href="https://neon.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0074D9] hover:underline"
              >
                Neon Auth
              </a>
            </p>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <Link 
            href="/"
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
