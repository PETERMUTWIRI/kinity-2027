'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
  FaBars, 
  FaTimes,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHandshake,
  FaHeart,
  FaChevronRight,
} from 'react-icons/fa';
import ElectionCountdown from './ElectionCountdown';

// ==========================================
// National Vision Party - MODERN NAVIGATION
// Smart scroll behavior with logo integration
// ==========================================

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'News Hub', href: '/news-hub' },
  { name: 'Events', href: '/events' },
  { name: 'Media Center', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  { icon: FaFacebook, href: 'https://facebook.com/NationalVisionParty', label: 'Facebook', color: '#1877F2' },
  { icon: FaTwitter, href: 'https://twitter.com/NVP_Kenya', label: 'Twitter', color: '#1DA1F2' },
  { icon: FaInstagram, href: 'https://instagram.com/NationalVisionParty', label: 'Instagram', color: '#E4405F' },
  { icon: FaYoutube, href: 'https://youtube.com/@NationalVisionParty', label: 'YouTube', color: '#FF0000' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  const { scrollY } = useScroll();
  
  // Track scroll direction for top bar hide/show
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Show/hide top bar based on scroll direction
    if (latest > previous && latest > 100) {
      setIsTopBarVisible(false);
    } else {
      setIsTopBarVisible(true);
    }
    
    // Add background blur when scrolled
    setIsScrolled(latest > 20);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Main Navbar Container */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Top Bar - Countdown + Campaign Slogan (Hide on scroll down) */}
        <motion.div
          initial={false}
          animate={{ 
            height: isTopBarVisible ? 'auto' : 0,
            opacity: isTopBarVisible ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-r from-[#0074D9] via-[#6B2C91] to-[#0074D9] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2 gap-4">
              {/* Left - Countdown Timer */}
              <div className="flex-shrink-0">
                <ElectionCountdown variant="navbar" />
              </div>
              
              {/* Center - Slogan */}
              <p className="flex-1 text-center text-white text-sm font-medium tracking-wide hidden md:block">
                <span className="font-slogan">KENYA&apos;S HOPE</span> — 
                <span className="ml-2 opacity-90">Committed to the Service of Kenyans</span>
              </p>
              
              {/* Right - Social Proof or Call to Action */}
              <div className="flex-shrink-0 hidden sm:block">
                <span className="text-xs text-white/70">
                  August 9, 2027
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Navigation Bar - Always visible with glass effect when scrolled */}
        <motion.div
          initial={false}
          animate={{
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 1)',
            backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.3 }}
          className={`border-b transition-colors duration-300 ${
            isScrolled ? 'border-slate-200/80 shadow-lg shadow-slate-900/5' : 'border-slate-200'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo with Image */}
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl overflow-hidden shadow-md ring-2 ring-[#0074D9]/10 group-hover:ring-[#0074D9]/30 transition-all duration-300 flex-shrink-0"
                >
                  <Image
                    src="/isaac_kinity-logo.jpeg"
                    alt="National Vision Party Logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <div className="block min-w-0">
                  <motion.p 
                    className="font-headline text-[11px] xs:text-sm sm:text-base lg:text-xl leading-tight text-[#E91D0E] group-hover:text-[#0074D9] transition-colors duration-300 whitespace-nowrap tracking-wide"
                    style={{ fontWeight: 800 }}
                  >
                    National Vision Party
                  </motion.p>
                  <p className="text-[9px] xs:text-xs text-slate-500 hidden sm:block font-medium tracking-wider uppercase">Kenya&apos;s Hope 2027</p>
                </div>
              </Link>

              {/* Desktop Navigation - Modern Pills */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                        pathname === link.href 
                          ? 'text-[#0074D9]' 
                          : 'text-slate-600 hover:text-[#0074D9]'
                      }`}
                    >
                      {pathname === link.href && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute inset-0 bg-[#0074D9]/10 rounded-full"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Buttons - Modern Style */}
              <div className="hidden lg:flex items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link 
                    href="/join-us"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E91D0E] to-[#c4180c] text-white text-sm font-semibold shadow-md shadow-[#E91D0E]/20 hover:shadow-lg hover:shadow-[#E91D0E]/30 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Join Us
                    <FaChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link 
                    href="/support"
                    className="px-5 py-2.5 rounded-full border-2 border-[#0074D9] text-[#0074D9] text-sm font-semibold hover:bg-[#0074D9] hover:text-white transition-all duration-300"
                  >
                    Support
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button - Modern Style */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center bg-slate-100 text-slate-700 hover:bg-[#0074D9] hover:text-white transition-all duration-300"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaTimes className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaBars className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Menu - Full Screen Modern Design */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Panel - Slide from right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 lg:hidden"
            >
              {/* Header with Logo */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md">
                      <Image
                        src="/isaac_kinity-logo.jpeg"
                        alt="National Vision Party Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-slogan text-lg text-[#E91D0E]">National Vision Party</p>
                    </div>
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-[#0074D9] hover:text-white transition-all duration-300"
                  >
                    <FaTimes className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="p-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-5 py-4 rounded-2xl text-base font-medium transition-all duration-300 ${
                        pathname === link.href
                          ? 'bg-gradient-to-r from-[#0074D9] to-[#6B2C91] text-white shadow-lg shadow-[#0074D9]/25'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-[#0074D9]'
                      }`}
                    >
                      {link.name}
                      <FaChevronRight className={`w-4 h-4 ${pathname === link.href ? 'opacity-100' : 'opacity-0'}`} />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Section */}
              <div className="px-6 py-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Get Involved</p>
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      href="/join-us"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-[#E91D0E] to-[#c4180c] text-white font-semibold shadow-lg shadow-[#E91D0E]/25 hover:shadow-xl hover:shadow-[#E91D0E]/30 transition-all duration-300"
                    >
                      <FaHandshake className="w-5 h-5" />
                      Join the Movement
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link
                      href="/support"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl border-2 border-[#0074D9] text-[#0074D9] font-semibold hover:bg-[#0074D9] hover:text-white transition-all duration-300"
                    >
                      <FaHeart className="w-5 h-5" />
                      Support the Vision
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Social Links */}
              <div className="px-6 py-4 mt-auto">
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#0074D9] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-r from-[#0074D9]/5 to-[#6B2C91]/5 border-t border-slate-100">
                <p className="text-center text-sm text-slate-500">
                  Committed to the Service of Kenyans
                </p>
                <p className="text-center text-xs text-slate-400 mt-1">
                  © 2025 National Vision Party
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
