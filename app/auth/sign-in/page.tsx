'use client';

import { authClient } from '@/lib/auth/client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';

// ==========================================
// AUTH SIGN IN - Kikimo Foundation Admin
// Custom styled form for dark theme
// ==========================================

export default function SignInPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: '/admin',
      });

      if (result.error) {
        setError(result.error.message || 'Sign in failed');
      } else {
        router.replace('/admin');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
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
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Admin Sign In
          </h1>
          <p className="text-slate-400 text-center mb-6 text-sm">
            Enter your credentials to access the dashboard
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-700/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0074D9] focus:border-transparent transition-all"
                  placeholder="admin@kikimofoundation.org"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0074D9] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0074D9] to-[#6B2C91] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#0074D9]/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-500 text-sm">or</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-slate-400 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/auth/sign-up" className="text-[#0074D9] hover:text-[#005CB0] font-medium">
              Create one
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
  );
}
