'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFlag, FaHandshake } from 'react-icons/fa';

// ==========================================
// HERO SECTION - Kenya's Hope 2027
// Split layout: Content left, Video right on desktop
// Video below content on mobile
// ==========================================

export default function HeroDualCarousel() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      {/* Left side subtle background */}
      <div className="absolute inset-0 lg:w-[55%] bg-gradient-to-br from-slate-50 via-white to-slate-100" />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* LEFT SIDE — Content */}
        <div className="w-full lg:w-[55%] flex items-center px-4 sm:px-6 lg:px-12 xl:px-20 pt-24 pb-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A8A]/10 border border-[#1E3A8A]/20 text-[#1E3A8A] font-semibold text-sm mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E3A8A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E3A8A]"></span>
              </span>
              NATIONAL VISION PARTY
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F172A] leading-tight mb-4"
            >
              KENYA&apos;S HOPE <span className="text-[#1E3A8A]">2027</span>
            </motion.h1>

            {/* Accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-24 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] rounded-full mb-6 origin-left"
            />

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-[#0F172A]/80 leading-relaxed max-w-lg mb-6"
            >
              A movement of Kenyans committed to ending corruption and restoring dignity.
              Led by Dr. Isaac Newton Kinity, we are building a prosperous, just, and equitable nation for all.
            </motion.p>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-sm sm:text-base text-[#0F172A]/70 italic border-l-4 border-[#1E3A8A] pl-5 py-2 bg-[#0F172A]/5 rounded-r-lg max-w-lg mb-8"
            >
              &ldquo;For great heights of prosperity of Kenyan nation and for the happiness, joy, and comfort of the Kenyan people, the demolition of corruption and the rejection of recycling corrupt politicians into leadership positions, should be a mandatory obligation.&rdquo;
              <span className="block text-[#1E3A8A] font-semibold mt-2 not-italic">
                — Dr. Isaac Newton Kinity
              </span>
            </motion.blockquote>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                href="/join-us"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-[#DC2626] text-white font-bold text-sm sm:text-base rounded-xl hover:bg-[#B91C1C] transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <FaHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
                Join the Movement
              </Link>
              <Link
                href="/about/manifesto"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-[#1E3A8A] text-white font-bold text-sm sm:text-base rounded-xl hover:bg-[#0F172A] transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <FaFlag className="w-4 h-4 sm:w-5 sm:h-5" />
                Our Manifesto
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT SIDE — Video (below on mobile, right on desktop) */}
        <div className="w-full lg:w-[45%] lg:absolute lg:right-0 lg:top-0 lg:h-full">
          <div className="relative w-full aspect-video lg:aspect-auto lg:h-full">
            <iframe
              src="https://www.youtube.com/embed/BqPibiAzqIk?autoplay=1&mute=1&loop=1&playlist=BqPibiAzqIk&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
              title="Campaign Background Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute inset-0 w-full h-full rounded-none"
              style={{ pointerEvents: 'none', border: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
