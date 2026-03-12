'use client';

import '@neondatabase/auth/ui/css';
import { NeonAuthUIProvider, SignUpForm, authLocalization } from '@neondatabase/auth/react/ui';
import { authClient } from '@/lib/auth/client';
import Link from 'next/link';
import Image from 'next/image';

// ==========================================
// AUTH SIGN UP - Kikimo Foundation Admin
// ==========================================

export default function SignUpPage() {
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
            <SignUpForm localization={authLocalization} />
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
