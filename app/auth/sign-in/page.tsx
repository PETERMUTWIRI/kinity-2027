'use client';

import '@neondatabase/auth/ui/css';
import { SignInForm, NeonAuthUIProvider, authLocalization } from '@neondatabase/auth/react/ui';
import { authClient } from '@/lib/auth/client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// ==========================================
// AUTH SIGN IN - Kikimo Foundation Admin
// ==========================================

export default function SignInPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        if (session) {
          router.replace('/admin');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

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

        {/* Auth Card */}
        <NeonAuthUIProvider 
          authClient={authClient as any}
          emailOTP
          redirectTo="/admin"
        >
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
            <h1 className="text-2xl font-bold text-white text-center mb-6">
              Admin Sign In
            </h1>
            
            <SignInForm localization={authLocalization} />
          </div>
        </NeonAuthUIProvider>

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
