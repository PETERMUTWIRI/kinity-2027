'use client';

import { useEffect, useState } from 'react';
import { FaWhatsapp, FaHeart, FaShareAlt, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileActionBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    // Only show on mobile/tablet after scrolling down
    const handleScroll = () => {
      const isMobile = window.innerWidth < 1024;
      setIsVisible(isMobile && window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const shareMessage = encodeURIComponent(
    `🇰🇪 Kenya's Hope 2027\n\nDr. Isaac Newton Kinity is running for President. Join the movement!\n\n🌐 https://www.nationalvisionparty.com\n📱 WhatsApp: +1 (203) 675-9354`
  );

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${shareMessage}`,
      color: 'bg-[#1E3A8A]',
    },
    {
      name: 'Twitter',
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent('🇰🇪 Kenya\'s Hope 2027. Dr. Isaac Newton Kinity for President. Join the movement!')}&url=https://www.nationalvisionparty.com`,
      color: 'bg-black',
    },
    {
      name: 'Facebook',
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=https://www.nationalvisionparty.com`,
      color: 'bg-[#1877F2]',
    },
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60] flex items-end justify-center pb-24 px-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 w-full max-w-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-[#0F172A]">Spread the Word</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
                >
                  <FaTimes className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${option.color} text-white rounded-2xl p-4 flex flex-col items-center gap-2 hover:opacity-90 transition-opacity`}
                  >
                    <option.icon className="w-6 h-6" />
                    <span className="text-xs font-medium">{option.name}</span>
                  </a>
                ))}
              </div>
              <p className="text-center text-slate-500 text-sm mt-4">
                Share the movement with your friends and family
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Action Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-4 py-3 shadow-2xl lg:hidden"
      >
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <a
            href="https://wa.me/12036759354?text=Hello%2C%20I%20want%20to%20join%20the%20National%20Vision%20Party%20movement"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1E3A8A] text-white font-bold text-sm hover:bg-[#1E40AF] transition-colors"
          >
            <FaWhatsapp className="w-5 h-5" />
            Join WhatsApp
          </a>
          <a
            href="/support"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#DC2626] text-white font-bold text-sm hover:bg-[#B91C1C] transition-colors"
          >
            <FaHeart className="w-4 h-4" />
            Support
          </a>
          <button
            onClick={() => setShowShareModal(true)}
            className="w-12 h-12 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center hover:bg-[#0F172A] transition-colors"
            aria-label="Share"
          >
            <FaShareAlt className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </>
  );
}
