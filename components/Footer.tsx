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
// NATIONAL VISION PARTY - PREMIUM FOOTER
// Authoritative dark navy with gold accents
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
    { name: 'Diaspora', href: '/diaspora' },
    { name: 'Youth/GenZ', href: '/youth' },
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
      {/* Dark Navy Background */}
      <div className="absolute inset-0 bg-[#0F172A]" />
      
      {/* Subtle Kenyan Coat of Arms Watermark */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Coat_of_arms_of_Kenya_%28Official%29.svg/1200px-Coat_of_arms_of_Kenya_%28Official%29.svg.png')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center 70%',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Subtle Kenyan Flag Hint - Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-1 flex opacity-30">
        <div className="flex-1 bg-black" />
        <div className="flex-1 bg-[#DC2626]" />
        <div className="flex-1 bg-[#006600]" />
      </div>
      
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* CTA Banner with Countdown - Dark Navy with Gold Accent */}
      <div className="relative bg-[#0F172A] border-b border-[#D4A017]/30">
        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left - Countdown */}
            <div className="flex-shrink-0">
              <ElectionCountdown variant="footer" />
            </div>
            
            {/* Center - CTA Text */}
            <div className="text-center lg:text-left lg:flex-1">
              <h3 className="font-slogan text-2xl md:text-3xl mb-2 text-white">
                READY TO JOIN THE <span className="text-[#D4A017]">MOVEMENT</span>?
              </h3>
              <p className="text-white/80 max-w-md mx-auto lg:mx-0">
                Be part of the change Kenya needs. Volunteer, donate, or spread the word.
              </p>
            </div>
            
            {/* Right - Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/join-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#DC2626] text-white font-bold hover:bg-[#B91C1C] transition-all duration-300 shadow-lg"
              >
                <FaHandshake className="w-5 h-5" />
                Join Us
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#1E3A8A] font-bold hover:bg-slate-100 transition-all duration-300"
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
                className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg ring-2 ring-[#D4A017]/30 group-hover:ring-[#D4A017]/60 transition-all duration-300"
              >
                <Image
                  src="/nvp-party-logo.jpeg"
                  alt="National Vision Party"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div>
                <span className="font-slogan text-2xl text-white group-hover:text-[#D4A017] transition-colors block">
                  NATIONAL VISION PARTY
                </span>
                <span className="text-sm text-[#D4A017]">Kenya&apos;s Hope 2027</span>
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
                className="flex items-center gap-3 text-white/60 hover:text-[#D4A017] transition-colors"
              >
                <FaEnvelope className="w-5 h-5 text-[#D4A017]" />
                info@nationalvisionparty.com
              </a>
              <a 
                href="tel:+254XXXXXXXXX" 
                className="flex items-center gap-3 text-white/60 hover:text-[#D4A017] transition-colors"
              >
                <FaPhone className="w-5 h-5 text-[#D4A017]" />
                +254 XXX XXX XXX
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <FaMapMarkerAlt className="w-5 h-5 text-[#D4A017]" />
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
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#D4A017] transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Our Party Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#D4A017] rounded-full" />
              Our Party
            </h4>
            <ul className="space-y-3">
              {footerLinks.ourParty.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#D4A017] transition-colors flex items-center gap-2 group"
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
              <span className="w-1 h-4 bg-[#1E3A8A] rounded-full" />
              News & Media
            </h4>
            <ul className="space-y-3">
              {footerLinks.newsMedia.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#D4A017] transition-colors flex items-center gap-2 group"
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
              <span className="w-1 h-4 bg-[#D4A017] rounded-full" />
              Get Involved
            </h4>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#D4A017] transition-colors flex items-center gap-2 group"
                  >
                    <FaArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Resources Sub-section */}
            <h4 className="font-semibold text-white mb-4 mt-8 flex items-center gap-2">
              <span className="w-1 h-4 bg-white/50 rounded-full" />
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#D4A017] transition-colors flex items-center gap-2 group"
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
        {/* Gold accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              &copy; {currentYear} National Vision Party. All rights reserved.
            </p>
            <p className="text-white/40 text-sm flex items-center gap-2">
              Made with <FaHeart className="w-4 h-4 text-[#D4A017]" /> for Kenya
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
