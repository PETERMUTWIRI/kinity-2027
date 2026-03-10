'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHandshake,
  FaHeart,
  FaNewspaper,
  FaCalendarAlt,
  FaImages,
  FaMicrophone,
  FaEnvelope,
  FaUser,
  FaFlag,
  FaHome,
} from 'react-icons/fa';

// ==========================================
// KINITY 2027 - PRESIDENTIAL NAVIGATION
// ==========================================

const navLinks = [
  { name: 'Home', href: '/', icon: FaHome },
  { name: 'Our Story', href: '/our-story', icon: FaUser },
  { name: 'Vision 2027', href: '/vision-2027', icon: FaFlag },
  { name: 'News Hub', href: '/news-hub', icon: FaNewspaper },
  { name: 'Events', href: '/events', icon: FaCalendarAlt },
  { name: 'Gallery', href: '/gallery', icon: FaImages },
  { name: 'Press', href: '/press', icon: FaMicrophone },
  { name: 'Contact', href: '/contact', icon: FaEnvelope },
];

const ctaLinks = [
  { name: 'Join Us', href: '/join-us', icon: FaHandshake, primary: true },
  { name: 'Support', href: '/support', icon: FaHeart, primary: false },
];

const socialLinks = [
  { icon: FaFacebook, href: 'https://facebook.com/Kinity2027', label: 'Facebook', color: '#1877F2' },
  { icon: FaTwitter, href: 'https://twitter.com/Kinity2027', label: 'Twitter', color: '#1DA1F2' },
  { icon: FaInstagram, href: 'https://instagram.com/Kinity2027', label: 'Instagram', color: '#E4405F' },
  { icon: FaYoutube, href: 'https://youtube.com/@Kinity2027', label: 'YouTube', color: '#FF0000' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200/50'
            : 'bg-transparent'
        }`}
      >
        {/* Top Bar - Campaign Slogan */}
        <div className={`transition-all duration-300 overflow-hidden ${
          isScrolled ? 'h-0' : 'h-10'
        }`}>
          <div className="bg-gradient-to-r from-[#0074D9] via-[#6B2C91] to-[#0074D9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-white text-sm py-2 font-medium tracking-wide">
                <span className="font-slogan">KENYA&apos;S HOPE</span> — 
                <span className="ml-2">Committed to the Service of Kenyans</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className={`relative w-14 h-14 rounded-xl overflow-hidden transition-all duration-300 ${
                isScrolled ? 'ring-2 ring-[#0074D9]/20' : 'ring-2 ring-white/30'
              }`}>
                {/* Logo placeholder - replace with actual logo */}
                <div className={`w-full h-full flex items-center justify-center font-bold text-2xl transition-colors duration-300 ${
                  isScrolled ? 'bg-gradient-to-br from-[#0074D9] to-[#005CB0] text-white' : 'bg-white text-[#0074D9]'
                }`}>
                  K
                </div>
              </div>
              <div className="hidden sm:block">
                <p className={`font-slogan text-lg leading-tight transition-colors duration-300 ${
                  isScrolled ? 'text-[#E91D0E]' : 'text-[#E91D0E]'
                }`}>
                  KINITY 2027
                </p>
                <p className={`text-xs transition-colors duration-300 ${
                  isScrolled ? 'text-slate-600' : 'text-slate-700'
                }`}>
                  The Incoming President
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    pathname === link.href 
                      ? isScrolled 
                        ? 'text-[#0074D9] bg-[#0074D9]/10' 
                        : 'text-[#0074D9] bg-white/90'
                      : isScrolled
                        ? 'text-slate-600 hover:text-[#0074D9] hover:bg-slate-100'
                        : 'text-slate-700 hover:text-[#0074D9] hover:bg-white/80'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons & Social */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Social Icons */}
              <div className="flex items-center gap-2">
                {socialLinks.slice(0, 3).map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isScrolled 
                        ? 'bg-slate-100 text-slate-600 hover:bg-[#0074D9] hover:text-white' 
                        : 'bg-white/20 text-slate-700 hover:bg-white hover:text-[#0074D9]'
                    }`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className={`w-px h-8 ${isScrolled ? 'bg-slate-200' : 'bg-slate-300'}`} />

              {/* CTA Buttons */}
              <div className="flex items-center gap-2">
                <Link 
                  href="/join-us"
                  className="px-5 py-2.5 rounded-lg bg-[#E91D0E] text-white text-sm font-semibold hover:bg-[#BA170C] transition-all duration-300 hover:shadow-lg hover:shadow-[#E91D0E]/30"
                >
                  Join Us
                </Link>
                <Link 
                  href="/support"
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isScrolled 
                      ? 'bg-[#0074D9] text-white hover:bg-[#005CB0]' 
                      : 'bg-white text-[#0074D9] hover:bg-slate-50'
                  }`}
                >
                  Support
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isScrolled 
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                  : 'bg-white/90 text-slate-800 hover:bg-white'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 lg:hidden shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-slogan text-xl text-[#E91D0E]">KINITY 2027</p>
                    <p className="text-xs text-slate-500">Kenya&apos;s Hope</p>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="p-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                        pathname === link.href
                          ? 'bg-gradient-to-r from-[#0074D9] to-[#005CB0] text-white shadow-md'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-[#0074D9]'
                      }`}
                    >
                      <link.icon className={`w-5 h-5 ${pathname === link.href ? 'text-white' : 'text-[#0074D9]'}`} />
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Section */}
              <div className="p-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-4">Get Involved</p>
                <div className="space-y-2">
                  <Link
                    href="/join-us"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#E91D0E] text-white font-semibold hover:bg-[#BA170C] transition-colors"
                  >
                    <FaHandshake className="w-5 h-5" />
                    Join the Movement
                  </Link>
                  <Link
                    href="/support"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0074D9] text-white font-semibold hover:bg-[#005CB0] transition-colors"
                  >
                    <FaHeart className="w-5 h-5" />
                    Support the Vision
                  </Link>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-4 border-t border-slate-100">
                <div className="flex justify-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#0074D9] hover:text-white transition-all duration-300"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-[#0074D9]/5 to-[#6B2C91]/5 border-t border-slate-100">
                <p className="text-center text-xs text-slate-500">
                  Committed to the Service of Kenyans
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
