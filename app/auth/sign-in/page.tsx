'use client';

import '@neondatabase/auth/ui/css';
import { NeonAuthUIProvider } from '@neondatabase/auth/react/ui';
import { AuthView } from '@neondatabase/auth/react/ui';
import { authClient } from '@/lib/auth/client';
import Link from 'next/link';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <>
      {/* CSS Overrides for Neon Auth UI visibility */}
      <style jsx global>{`
        /* Force light background on auth forms */
        .auth-form {
          background: white !important;
          color: #1f2937 !important;
        }
        
        /* Input styling */
        .auth-form input,
        .auth-form input[type="email"],
        .auth-form input[type="password"],
        .auth-form input[type="text"] {
          background: white !important;
          color: #1f2937 !important;
          border: 1px solid #d1d5db !important;
        }
        
        /* Label styling */
        .auth-form label {
          color: #374151 !important;
        }
        
        /* Button styling */
        .auth-form button[type="submit"] {
          background: #0074D9 !important;
          color: white !important;
        }
        
        /* Card/container styling */
        .auth-card,
        [class*="card"] {
          background: white !important;
        }
        
        /* Text colors */
        .auth-form p,
        .auth-form span,
        .auth-form div {
          color: #374151 !important;
        }
        
        /* Link colors */
        .auth-form a {
          color: #0074D9 !important;
        }
      `}</style>
      
      <NeonAuthUIProvider
        authClient={authClient as any}
        emailOTP
        redirectTo="/admin"
      >
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

            {/* Auth Card with White Background for visibility */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl">
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Sign In</h1>
              
              <div className="auth-form-wrapper">
                <AuthView path="sign-in" />
              </div>

              <p className="text-center mt-6 text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/auth/sign-up" className="text-[#0074D9] hover:underline font-medium">
                  Sign up
                </Link>
              </p>
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
      </NeonAuthUIProvider>
    </>
  );
}
