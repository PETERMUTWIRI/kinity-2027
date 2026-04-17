'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaCheck, FaSpinner, FaGlobe } from 'react-icons/fa';

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'dark';
  title?: string;
  subtitle?: string;
}

export default function NewsletterSignup({ 
  variant = 'default',
  title = 'Join 10,000+ Supporters',
  subtitle = 'Get the latest campaign updates, speeches, and event announcements directly from Dr. Kinity.'
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [county, setCounty] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, county }),
      });
      const data = await res.json();
      setMessage(data.message);
      setStatus(data.success ? 'success' : 'error');
      if (data.success) {
        setEmail('');
        setName('');
        setCounty('');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const isDark = variant === 'dark';
  const isCompact = variant === 'compact';

  return (
    <div className={`rounded-3xl p-8 md:p-12 ${isDark ? 'bg-[#0F172A] text-white' : 'bg-white text-[#0F172A]'} shadow-xl border ${isDark ? 'border-[#1E3A8A]/30' : 'border-slate-100'}`}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${isDark ? 'bg-[#1E3A8A]/20' : 'bg-[#1E3A8A]/10'}`}
        >
          <FaEnvelope className="w-8 h-8 text-[#1E3A8A]" />
        </motion.div>
        
        <h3 className={`font-headline font-bold mb-3 ${isCompact ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
          {title}
        </h3>
        <p className={`mb-8 ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
          {subtitle}
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-6 flex items-center justify-center gap-3 ${isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-50 text-green-700'}`}
            >
              <FaCheck className="w-6 h-6" />
              <span className="font-semibold">{message}</span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className={`grid gap-4 ${isCompact ? '' : 'md:grid-cols-3'}`}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className={`w-full px-5 py-4 rounded-xl border-2 focus:outline-none focus:border-[#1E3A8A] transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : 'bg-slate-50 border-slate-200 text-[#0F172A]'}`}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className={`w-full px-5 py-4 rounded-xl border-2 focus:outline-none focus:border-[#1E3A8A] transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : 'bg-slate-50 border-slate-200 text-[#0F172A]'}`}
                />
                <input
                  type="text"
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  placeholder="Your county (optional)"
                  className={`w-full px-5 py-4 rounded-xl border-2 focus:outline-none focus:border-[#1E3A8A] transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : 'bg-slate-50 border-slate-200 text-[#0F172A]'}`}
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full md:w-auto px-10 py-4 rounded-xl bg-[#DC2626] text-white font-bold hover:bg-[#B91C1C] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 mx-auto"
              >
                {status === 'loading' ? (
                  <>
                    <FaSpinner className="w-5 h-5 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <FaGlobe className="w-5 h-5" />
                    Subscribe for Updates
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-sm">{message}</p>
              )}
              
              <p className={`text-xs ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                We respect your privacy. Unsubscribe anytime.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
