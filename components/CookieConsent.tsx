'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCookieBite, FaTimes } from 'react-icons/fa';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie-consent');
    if (!hasConsented) {
      // Show after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0074D9]/10 flex items-center justify-center flex-shrink-0">
                  <FaCookieBite className="w-5 h-5 text-[#0074D9]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#111111] mb-1">We value your privacy</h3>
                  <p className="text-sm text-slate-600">
                    We use cookies to enhance your browsing experience, serve personalized content, 
                    and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                    <a href="/privacy" className="text-[#0074D9] hover:underline ml-1">
                      Learn more
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleDecline}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 sm:flex-none px-6 py-2 bg-[#0074D9] text-white text-sm font-semibold rounded-lg hover:bg-[#005CB0] transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={handleDecline}
                  className="hidden sm:block p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Close"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
