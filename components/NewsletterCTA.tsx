'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaBell } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

// ==========================================
// NEWSLETTER SIGNUP COMPONENT
// Converts visitors into subscribers
// ==========================================

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [county, setCounty] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const COUNTIES = [
    'Mombasa', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita-Taveta',
    'Garissa', 'Wajir', 'Mandera', 'Marsabit', 'Isiolo', 'Meru',
    'Tharaka-Nithi', 'Embu', 'Kitui', 'Machakos', 'Makueni', 'Nyandarua',
    'Nyeri', 'Kirinyaga', "Murang'a", 'Kiambu', 'Turkana', 'West Pokot',
    'Samburu', 'Trans Nzoia', 'Uasin Gishu', 'Elgeyo-Marakwet', 'Nandi',
    'Baringo', 'Laikipia', 'Nakuru', 'Narok', 'Kajiado', 'Kericho',
    'Bomet', 'Kakamega', 'Vihiga', 'Bungoma', 'Busia', 'Siaya',
    'Kisumu', 'Homa Bay', 'Migori', 'Kisii', 'Nyamira', 'Nairobi'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#0074D9] via-[#6B2C91] to-[#0074D9] relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E91D0E]/10 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <FaBell className="w-4 h-4" />
              Stay Updated
            </motion.div>
            <h2 className="font-headline text-4xl md:text-5xl text-white mb-4">
              Join <span className="text-[#E91D0E]">50,000+</span> Supporters
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Get the latest campaign updates, event invitations, and exclusive content delivered to your inbox.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 border-0 focus:ring-2 focus:ring-[#E91D0E] outline-none"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-[#E91D0E] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#BA170C] transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <FaPaperPlane className="w-4 h-4" />
                        Subscribe
                      </>
                    )}
                  </motion.button>
                </div>
                
                {/* County selector - optional */}
                <div className="mt-3 px-2">
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 rounded-lg bg-white/10 text-white text-sm border border-white/20 focus:ring-1 focus:ring-white/50 outline-none cursor-pointer"
                  >
                    <option value="" className="text-slate-900">Select your county (optional)</option>
                    {COUNTIES.map(c => (
                      <option key={c} value={c} className="text-slate-900">{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <p className="text-center text-white/60 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <FaCheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome to the Movement!</h3>
              <p className="text-white/80">
                Check your inbox for a confirmation email. Together, we&apos;ll build a better Kenya.
              </p>
            </motion.div>
          )}
        </ScrollReveal>

        {/* Trust indicators */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure & Encrypted
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Weekly Updates
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No Spam Ever
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
