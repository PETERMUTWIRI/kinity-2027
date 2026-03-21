'use client';

import { useState, useEffect, useRef } from 'react';
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
  FaChevronDown,
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaNewspaper,
  FaCalendarAlt,
  FaImages,
  FaVideo,
  FaUsers,
  FaFlag,
  FaEye,
} from 'react-icons/fa';
import ElectionCountdown from './ElectionCountdown';

// ==========================================
// National Vision Party - PREMIUM NAVIGATION
// Authoritative, presidential design system
// ==========================================

interface NavItem {
  name: string;
  href: string;
  children?: { name: string; href: string; description?: string; icon?: React.ElementType }[];
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { 
    name: 'Our Party', 
    href: '/about',
    children: [
      { name: 'Our Story', href: '/about/our-story', description: 'The journey of Dr. Kinity', icon: FaFlag },
      { name: 'Leadership', href: '/about/leadership', description: 'Meet the team', icon: FaUsers },
      { name: 'Vision 2027', href: '/about/vision-2027', description: 'Our plan for Kenya', icon: FaEye },
      { name: 'Manifesto', href: '/about/manifesto', description: 'Our commitments', icon: FaNewspaper },
    ]
  },
  { 
    name: 'News & Media', 
    href: '/news-hub',
    children: [
      { name: 'News Hub', href: '/news-hub', description: 'Latest updates', icon: FaNewspaper },
      { name: 'Events', href: '/events', description: 'Upcoming rallies', icon: FaCalendarAlt },
      { name: 'Photo Gallery', href: '/gallery', description: 'Campaign photos', icon: FaImages },
      { name: 'Videos', href: '/videos', description: 'Speeches & interviews', icon: FaVideo },
    ]
  },
  { 
    name: 'Get Involved', 
    href: '/join-us',
    children: [
      { name: 'Join Us', href: '/join-us', description: 'Become a member', icon: FaHandshake },
      { name: 'Donate', href: '/support', description: 'Support our campaign', icon: FaHeart },
      { name: 'Volunteer', href: '/join-us', description: 'Offer your skills', icon: FaUsers },
      { name: 'Events', href: '/events', description: 'Attend our rallies', icon: FaCalendarAlt },
      { name: 'Contact', href: '/contact', description: 'Get in touch', icon: FaEnvelope },
    ]
  },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  { icon: FaFacebook, href: 'https://facebook.com/NationalVisionParty', label: 'Facebook', color: '#1877F2' },
  { icon: FaTwitter, href: 'https://twitter.com/NVP_Kenya', label: 'Twitter', color: '#1DA1F2' },
  { icon: FaInstagram, href: 'https://instagram.com/NationalVisionParty', label: 'Instagram', color: '#E4405F' },
  { icon: FaYoutube, href: 'https://youtube.com/@NationalVisionParty', label: 'YouTube', color: '#FF0000' },
];

// Search suggestions
const searchSuggestions = [
  { title: 'Join the Movement', href: '/join-us' },
  { title: 'Donate to Campaign', href: '/support' },
  { title: 'Upcoming Events', href: '/events' },
  { title: 'Dr. Kinity\'s Vision', href: '/about' },
  { title: 'Latest News', href: '/news-hub' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  
  // Track scroll direction for top bar hide/show
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > previous && latest > 100) {
      setIsTopBarVisible(false);
    } else {
      setIsTopBarVisible(true);
    }
    
    setIsScrolled(latest > 20);
  });

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setIsSearchOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleDropdownEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Main Navbar Container */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Top Bar - Deep Navy with Gold Accent */}
        <motion.div
          initial={false}
          animate={{ 
            height: isTopBarVisible ? 'auto' : 0,
            opacity: isTopBarVisible ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden bg-[#0F172A] border-b border-[#D4A017]/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2 gap-2 sm:gap-4">
              {/* Left - Countdown Timer */}
              <div className="flex-shrink-0">
                <ElectionCountdown variant="navbar" />
              </div>
              
              {/* Center - Slogan (Visible on all screens) */}
              <p className="flex-1 text-center text-white text-xs sm:text-sm font-medium tracking-wide truncate">
                <span className="font-slogan text-[#D4A017]">KENYA&apos;S HOPE</span>
                <span className="hidden sm:inline ml-2 text-white/70">— Committed to the Service of Kenyans</span>
              </p>
              
              {/* Right - Social Icons & Date */}
              <div className="flex-shrink-0 flex items-center gap-4">
                {/* Social Icons */}
                <div className="hidden sm:flex items-center gap-1">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D4A017]/20 flex items-center justify-center text-white/80 hover:text-[#D4A017] transition-all duration-200"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
                <span className="text-xs text-white/50 hidden md:block">
                  August 9, 2027
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Navigation Bar */}
        <motion.div
          initial={false}
          animate={{
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 1)',
            backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.3 }}
          className={`border-b transition-all duration-300 ${
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
                  className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl overflow-hidden shadow-md ring-2 ring-[#1E3A8A]/10 group-hover:ring-[#D4A017]/50 transition-all duration-300 flex-shrink-0"
                >
                  <Image
                    src="/nvp-party-logo.jpeg"
                    alt="National Vision Party Logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <div className="block min-w-0">
                  <motion.p 
                    className="font-headline text-[11px] xs:text-sm sm:text-base lg:text-xl leading-tight text-[#1E3A8A] group-hover:text-[#0F172A] transition-colors duration-300 whitespace-nowrap tracking-wide"
                    style={{ fontWeight: 800 }}
                  >
                    National Vision Party
                  </motion.p>
                  <p className="text-[9px] xs:text-xs text-slate-500 hidden sm:block font-medium tracking-wider uppercase">
                    <span className="text-[#D4A017]">Kenya&apos;s Hope</span> 2027
                  </p>
                </div>
                {/* Subtle Kenyan Flag */}
                <div className="hidden md:flex flex-col justify-center ml-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-1 bg-black rounded-t-sm" />
                  <div className="w-6 h-1 bg-[#DC2626]" />
                  <div className="w-6 h-1 bg-[#006600] rounded-b-sm" />
                </div>
                </div>
              </Link>

              {/* Desktop Navigation with Dropdowns */}
              <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                    className="relative"
                    onMouseEnter={() => item.children && handleDropdownEnter(item.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      href={item.href}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full flex items-center gap-1 ${
                        pathname === item.href || pathname.startsWith(item.href + '/')
                          ? 'text-[#1E3A8A]' 
                          : 'text-slate-600 hover:text-[#1E3A8A]'
                      }`}
                    >
                      {(pathname === item.href || pathname.startsWith(item.href + '/')) && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute inset-0 bg-[#1E3A8A]/10 rounded-full"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                      {item.children && (
                        <FaChevronDown className={`w-3 h-3 relative z-10 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {item.children && activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 overflow-hidden z-50"
                        >
                          <div className="py-2">
                            {item.children.map((child, childIndex) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group"
                              >
                                {child.icon && (
                                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4A017]/20 transition-colors">
                                    <child.icon className="w-4 h-4 text-[#1E3A8A] group-hover:text-[#D4A017] transition-colors" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-slate-700 group-hover:text-[#1E3A8A] transition-colors text-sm">
                                    {child.name}
                                  </p>
                                  {child.description && (
                                    <p className="text-xs text-slate-400 mt-0.5">{child.description}</p>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </nav>

              {/* Right Section: Search + CTAs */}
              <div className="hidden lg:flex items-center gap-3">
                {/* Search Button */}
                <div className="relative" ref={searchRef}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSearchOpen 
                        ? 'bg-[#1E3A8A] text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-[#1E3A8A] hover:text-white'
                    }`}
                    aria-label="Search"
                  >
                    {isSearchOpen ? <FaTimes className="w-4 h-4" /> : <FaSearch className="w-4 h-4" />}
                  </motion.button>

                  {/* Search Dropdown */}
                  <AnimatePresence>
                    {isSearchOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 overflow-hidden z-50 p-4"
                      >
                        <div className="relative">
                          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                            autoFocus
                          />
                        </div>
                        <div className="mt-4">
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Quick Links</p>
                          <div className="space-y-1">
                            {searchSuggestions.map((suggestion) => (
                              <Link
                                key={suggestion.title}
                                href={suggestion.href}
                                onClick={() => setIsSearchOpen(false)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-600 hover:text-[#1E3A8A]"
                              >
                                <FaChevronRight className="w-3 h-3" />
                                {suggestion.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link 
                    href="/join-us"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DC2626] text-white text-sm font-semibold shadow-md shadow-red-900/20 hover:shadow-lg hover:shadow-red-900/30 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Join Us
                    <FaChevronRight className="w-3 h-3" />
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link 
                    href="/support"
                    className="px-5 py-2.5 rounded-full border-2 border-[#1E3A8A] text-[#1E3A8A] text-sm font-semibold hover:bg-[#1E3A8A] hover:text-white transition-all duration-300"
                  >
                    Donate
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center bg-slate-100 text-slate-700 hover:bg-[#1E3A8A] hover:text-white transition-all duration-300"
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

      {/* Mobile Menu - Full Screen with Search */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 lg:hidden overflow-y-auto"
            >
              {/* Header with Logo */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md">
                      <Image
                        src="/nvp-party-logo.jpeg"
                        alt="National Vision Party Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-slogan text-lg text-[#1E3A8A]">National Vision Party</p>
                      <p className="text-xs text-[#D4A017]">Kenya&apos;s Hope 2027</p>
                    </div>
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-[#1E3A8A] hover:text-white transition-all duration-300"
                  >
                    <FaTimes className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Mobile Search */}
              <div className="px-6 py-4 border-b border-slate-100">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

              {/* Navigation Links with Expandable Submenus */}
              <nav className="p-6 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <Link
                      href={item.href}
                      onClick={() => !item.children && setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-all duration-300 ${
                        pathname === item.href
                          ? 'bg-[#1E3A8A] text-white shadow-lg'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#1E3A8A]'
                      }`}
                    >
                      {item.name}
                      {!item.children && (
                        <FaChevronRight className={`w-4 h-4 ${pathname === item.href ? 'opacity-100' : 'opacity-0'}`} />
                      )}
                    </Link>
                    
                    {/* Mobile Submenu */}
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1 pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:text-[#D4A017] transition-colors"
                          >
                            {child.icon && <child.icon className="w-4 h-4 text-[#1E3A8A]" />}
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
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
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#DC2626] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl border-2 border-[#1E3A8A] text-[#1E3A8A] font-semibold hover:bg-[#1E3A8A] hover:text-white transition-all duration-300"
                    >
                      <FaHeart className="w-5 h-5" />
                      Donate to Campaign
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="px-6 py-4 border-t border-slate-100">
                <div className="space-y-3">
                  <a href="tel:+254XXX" className="flex items-center gap-3 text-sm text-slate-600">
                    <FaPhone className="w-4 h-4 text-[#1E3A8A]" />
                    +254 XXX XXX XXX
                  </a>
                  <a href="mailto:info@nationalvisionparty.com" className="flex items-center gap-3 text-sm text-slate-600">
                    <FaEnvelope className="w-4 h-4 text-[#1E3A8A]" />
                    info@nationalvisionparty.com
                  </a>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <FaMapMarkerAlt className="w-4 h-4 text-[#1E3A8A]" />
                    Nairobi, Kenya
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="px-6 py-4">
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
                      className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#D4A017] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-[#0F172A] border-t border-[#D4A017]/20">
                <p className="text-center text-sm text-white/70">
                  Committed to the Service of Kenyans
                </p>
                <p className="text-center text-xs text-[#D4A017] mt-1">
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
