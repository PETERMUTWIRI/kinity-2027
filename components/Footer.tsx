'use client';

import Link from 'next/link';
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
} from 'react-icons/fa';

// ==========================================
// KIKIMO FOUNDATION - FOOTER
// Nonprofit Foundation Footer
// ==========================================

const footerLinks = {
  campaign: [
    { name: 'Our Story', href: '/our-story' },
    { name: 'Vision 2027', href: '/vision-2027' },
    { name: 'On The Ground', href: '/on-the-ground' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
  ],
  getInvolved: [
    { name: 'Join as Volunteer', href: '/join-us' },
    { name: 'Support the Campaign', href: '/support' },
    { name: 'Host an Event', href: '/contact' },
    { name: 'Become a County Coordinator', href: '/join-us' },
  ],
  resources: [
    { name: 'Press Kit', href: '/press' },
    { name: 'Media Inquiries', href: '/press' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: FaFacebook, href: 'https://facebook.com/Kinity2027', label: 'Facebook', color: '#1877F2' },
  { icon: FaTwitter, href: 'https://twitter.com/Kinity2027', label: 'Twitter', color: '#1DA1F2' },
  { icon: FaInstagram, href: 'https://instagram.com/Kinity2027', label: 'Instagram', color: '#E4405F' },
  { icon: FaYoutube, href: 'https://youtube.com/@Kinity2027', label: 'YouTube', color: '#FF0000' },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-[#0074D9] to-[#6B2C91]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-slogan text-2xl md:text-3xl mb-2">
                READY TO JOIN THE MOVEMENT?
              </h3>
              <p className="text-white/80">
                Be part of the change Kenya needs. Volunteer, donate, or spread the word.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/join-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#E91D0E] text-white font-bold hover:bg-[#BA170C] transition-all duration-300"
              >
                <FaHandshake className="w-5 h-5" />
                Join Us
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#0074D9] font-bold hover:bg-slate-100 transition-all duration-300"
              >
                <FaHeart className="w-5 h-5" />
                Donate
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-slogan text-3xl text-[#E91D0E]">KIKIMO FOUNDATION</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              Kenya&apos;s Hope. A movement for economic transformation, zero corruption, 
              and a brighter future for all Kenyans. Committed to the service of Kenyans.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:contact@kikimofoundation.org" 
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
              >
                <FaEnvelope className="w-5 h-5 text-[#0074D9]" />
                contact@kikimofoundation.org
              </a>
              <a 
                href="tel:+254XXXXXXXXX" 
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
              >
                <FaPhone className="w-5 h-5 text-[#0074D9]" />
                +254 XXX XXX XXX
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <FaMapMarkerAlt className="w-5 h-5 text-[#0074D9]" />
                Nairobi, Kenya
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0074D9] transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Campaign Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#E91D0E] rounded-full" />
              Campaign
            </h4>
            <ul className="space-y-3">
              {footerLinks.campaign.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
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
              <span className="w-1 h-4 bg-[#0074D9] rounded-full" />
              Get Involved
            </h4>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <FaArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#6B2C91] rounded-full" />
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
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

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Dr. Isaac Newton Kinity Campaign. 
              All rights reserved. Kenya&apos;s Hope 2027.
            </p>
            <p className="text-slate-600 text-sm flex items-center gap-2">
              Made with <FaHeart className="w-4 h-4 text-[#E91D0E]" /> for Kenya
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
