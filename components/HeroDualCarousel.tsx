'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaFlag, FaHandshake } from 'react-icons/fa';

// ==========================================
// HERO SECTION - Kenya's Hope 2027
// ==========================================

export default function HeroDualCarousel() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image - focused left on mobile, center on desktop */}
      <div className="absolute inset-0">
        <Image
          src="/baner.jpeg"
          alt="National Vision Party rally"
          fill
          className="object-cover object-left sm:object-center"
          priority
        />
        {/* White overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />
        <div className="absolute inset-0 bg-white/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A017]/20 border border-[#D4A017]/40 text-[#D4A017] font-semibold text-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A017] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A017]"></span>
            </span>
            NATIONAL VISION PARTY
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0F172A] leading-tight mb-4"
          >
            KENYA&apos;S HOPE <span className="text-[#D4A017]">2027</span>
          </motion.h1>

          {/* Gold accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent mx-auto rounded-full mb-6"
          />

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-[#0F172A]/90 leading-relaxed max-w-2xl mx-auto mb-6"
          >
            A movement of Kenyans committed to ending corruption and restoring dignity. 
            Led by Dr. Isaac Newton Kinity, we are building a prosperous, just, and equitable nation for all.
          </motion.p>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-[#0F172A]/95 italic border-l-4 border-[#D4A017] pl-5 py-3 bg-[#0F172A]/5 backdrop-blur-sm rounded-r-lg max-w-2xl mx-auto mb-8 text-left"
          >
            &ldquo;For great heights of prosperity of Kenyan nation and for the happiness, joy, and comfort of the Kenyan people, the demolition of corruption and the rejection of recycling corrupt politicians into leadership positions, should be a mandatory obligation.&rdquo;
            <span className="block text-[#D4A017] font-semibold mt-2 not-italic">— Dr. Isaac Newton Kinity</span>
          </motion.blockquote>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
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
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-[#D4A017] text-[#0F172A] font-bold text-sm sm:text-base rounded-xl hover:bg-[#E6C200] transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <FaFlag className="w-4 h-4 sm:w-5 sm:h-5" />
              Our Manifesto
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
