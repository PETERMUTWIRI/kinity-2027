'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaHandshake,
  FaArrowRight,
  FaUsers,
  FaCalendarAlt,
  FaFlag,
  FaNewspaper,
  FaImages,
  FaVideo,
} from 'react-icons/fa';
import ElectionCountdown from './ElectionCountdown';

// ==========================================
// NATIONAL VISION PARTY - PATRIOTIC FOOTER
// Kenyan flag gradient background with coat of arms
// ==========================================

const footerLinks = {
  ourParty: [
    { name: 'Our Story', href: '/about/our-story' },
    { name: 'Leadership', href: '/about/leadership' },
    { name: 'Vision 2027', href: '/about/vision-2027' },
    { name: 'Manifesto', href: '/about/manifesto' },
  ],
  newsMedia: [
    { name: 'News Hub', href: '/news-hub' },
    { name: 'Events', href: '/events' },
    { name: 'Photo Gallery', href: '/gallery' },
    { name: 'Videos', href: '/videos' },
  ],
  getInvolved: [
    { name: 'Join Us', href: '/join-us' },
    { name: 'Donate', href: '/support' },
    { name: 'Volunteer', href: '/join-us' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Press & Media', href: '/press' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: FaFacebook, href: 'https://facebook.com/NationalVisionParty', label: 'Facebook', color: '#1877F2' },
  { icon: FaTwitter, href: 'https://twitter.com/NVP_Kenya', label: 'Twitter', color: '#1DA1F2' },
  { icon: FaInstagram, href: 'https://instagram.com/NationalVisionParty', label: 'Instagram', color: '#E4405F' },
  { icon: FaYoutube, href: 'https://youtube.com/@NationalVisionParty', label: 'YouTube', color: '#FF0000' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-white overflow-hidden">
      {/* Kenyan Flag Background - Black to Flag Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              #000000 0%, 
              #000000 20%,
              #1a1a1a 30%,
              #000000 40%,
              #006600 50%,
              #006600 55%,
              #FFFFFF 55%,
              #FFFFFF 56%,
              #E91D0E 56%,
              #E91D0E 72%,
              #FFFFFF 72%,
              #FFFFFF 73%,
              #006600 73%,
              #006600 100%
            )
          `,
        }}
      />
      
      {/* Coat of Arms Overlay - Center Right */}
      <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 opacity-20 pointer-events-none">
        <div className="relative w-full h-full">
          {/* Shield Shape */}
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-2xl">
            {/* Shield Background */}
            <path 
              d="M100 10 L180 50 L180 120 Q180 180 100 230 Q20 180 20 120 L20 50 Z" 
              fill="none"
              stroke="white"
              strokeWidth="3"
            />
            {/* Coat of Arms Elements - Simplified */}
            <g opacity="0.6">
              {/* Spears Cross */}
              <line x1="70" y1="80" x2="130" y2="160" stroke="white" strokeWidth="4" />
              <line x1="130" y1="80" x2="70" y2="160" stroke="white" strokeWidth="4" />
              {/* Shield Center */}
              <ellipse cx="100" cy="120" rx="25" ry="30" fill="white" opacity="0.3" />
              {/* Lions (stylized) */}
              <circle cx="85" cy="110" r="8" fill="white" opacity="0.4" />
              <circle cx="115" cy="110" r="8" fill="white" opacity="0.4" />
            </g>
            {/* Rooster at top */}
            <circle cx="100" cy="45" r="12" fill="white" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />

      {/* CTA Banner with Countdown - Blue to Red Gradient */}
      <div 
        className="relative"
        style={{
          background: 'linear-gradient(90deg, #0074D9 0%, #0074D9 60%, #E91D0E 85%, #E91D0E 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left - Countdown */}
            <div className="flex-shrink-0">
              <ElectionCountdown variant="footer" />
            </div>
            
            {/* Center - CTA Text */}
            <div className="text-center lg:text-left lg:flex-1">
              <h3 className="font-slogan text-2xl md:text-3xl mb-2 text-white">
                READY TO JOIN THE MOVEMENT?
              </h3>
              <p className="text-white/90 max-w-md mx-auto lg:mx-0">
                Be part of the change Kenya needs. Volunteer, donate, or spread the word.
              </p>
            </div>
            
            {/* Right - Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/join-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#E91D0E] font-bold hover:bg-slate-100 transition-all duration-300 shadow-lg"
              >
                <FaHandshake className="w-5 h-5" />
                Join Us
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#111111] text-white font-bold hover:bg-black transition-all duration-300"
              >
                <FaHeart className="w-5 h-5" />
                Donate
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column with Logo */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-4 mb-6 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg ring-2 ring-white/20 group-hover:ring-[#0074D9]/50 transition-all duration-300"
              >
                <Image
                  src="/nvp-party-logo.jpeg"
                  alt="National Vision Party"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div>
                <span className="font-slogan text-2xl text-white group-hover:text-[#E91D0E] transition-colors block">
                  NATIONAL VISION PARTY
                </span>
                <span className="text-sm text-white/60">Kenya&apos;s Hope 2027</span>
              </div>
            </Link>
            <p className="text-white/70 mb-6 max-w-sm leading-relaxed">
              Kenya&apos;s Hope. A movement for economic transformation, zero corruption, 
              and a brighter future for all Kenyans. Committed to the service of Kenyans.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:info@nationalvisionparty.com" 
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              >
                <FaEnvelope className="w-5 h-5 text-[#E91D0E]" />
                info@nationalvisionparty.com
              </a>
              <a 
                href="tel:+254XXXXXXXXX" 
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              >
                <FaPhone className="w-5 h-5 text-[#E91D0E]" />
                +254 XXX XXX XXX
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <FaMapMarkerAlt className="w-5 h-5 text-[#E91D0E]" />
                Nairobi, Kenya
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#0074D9] transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Our Party Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#E91D0E] rounded-full" />
              Our Party
            </h4>
            <ul className="space-y-3">
              {footerLinks.ourParty.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <FaArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* News & Media Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#0074D9] rounded-full" />
              News & Media
            </h4>
            <ul className="space-y-3">
              {footerLinks.newsMedia.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <FaArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#006600] rounded-full" />
              Get Involved
            </h4>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <FaArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Resources Sub-section */}
            <h4 className="font-semibold text-white mb-4 mt-8 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#6B2C91] rounded-full" />
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <FaArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Professional Copyright */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              &copy; {currentYear} National Vision Party. All rights reserved.
            </p>
            <p className="text-white/40 text-sm flex items-center gap-2">
              Made with <FaHeart className="w-4 h-4 text-[#E91D0E]" /> for Kenya
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
