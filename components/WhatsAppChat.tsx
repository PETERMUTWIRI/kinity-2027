'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';
import Image from 'next/image';

// TODO: Replace with actual WhatsApp number when available
const WHATSAPP_NUMBER = '12036759354'; // Campaign HQ WhatsApp
const WHATSAPP_MESSAGE = 'Hello! I would like to learn more about the National Vision Party and how I can support Dr. Kinity\'s campaign for 2027.';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [message, setMessage] = useState('');

  // Show tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    // Hide tooltip after 10 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleSend = () => {
    const text = message || WHATSAPP_MESSAGE;
    const encodedMessage = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="absolute bottom-16 right-0 mb-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-4 max-w-[280px] relative">
                <button
                  onClick={() => setShowTooltip(false)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
                <p className="text-sm text-slate-700">
                  👋 Hi there! Have questions about the campaign? Chat with us on WhatsApp!
                </p>
                <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-4 h-4 bg-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-colors ${
            isOpen ? 'bg-slate-700' : 'bg-[#25D366] hover:bg-[#128C7E]'
          }`}
          aria-label="Open WhatsApp chat"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaTimes className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaWhatsapp className="w-8 h-8 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)]"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div 
                className="p-4 flex items-center gap-3"
                style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/30">
                    <Image
                      src="/images/president.jpeg"
                      alt="Dr. Kinity"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">NVP Support</h3>
                  <p className="text-white/80 text-xs">Typically replies in minutes</p>
                </div>
              </div>

              {/* Chat Body */}
              <div className="p-4 bg-[#E5DDD5] min-h-[200px] max-h-[300px] overflow-y-auto">
                {/* Welcome Message */}
                <div className="flex gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/president.jpeg"
                      alt="NVP"
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm text-slate-700">
                      Hello! Welcome to National Vision Party. How can we help you today? 🇰🇪
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Suggested Questions */}
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-slate-500 text-center mb-2">Quick replies</p>
                  {[
                    'How can I join the movement?',
                    'Where is the next rally?',
                    'How can I donate?',
                  ].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setMessage(q)}
                      className="block w-full text-left px-4 py-2 bg-white rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-slate-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button
                    onClick={handleSend}
                    className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:bg-[#128C7E] transition-colors"
                    aria-label="Send message"
                  >
                    <FaPaperPlane className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  Powered by WhatsApp Business
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
