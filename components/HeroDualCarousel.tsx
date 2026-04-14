'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaFlag, FaHandshake, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// ==========================================
// DUAL FOCUS HERO - Static background, rotating content
// ==========================================

const slides = [
  {
    id: 'party',
    type: 'party-centric',
    subtitle: 'NATIONAL VISION PARTY',
    title: 'KENYA\'S HOPE 2027',
    message: 'A movement of Kenyans committed to ending corruption and restoring dignity. Led by Dr. Isaac Newton Kinity, we are building a prosperous, just, and equitable nation for all.',
    cta: {
      primary: { text: 'Our Manifesto', href: '/about/manifesto', icon: FaFlag },
      secondary: { text: 'Meet Our Candidate', href: '/about/leadership', icon: FaArrowRight }
    },
  },
  {
    id: 'candidate',
    type: 'candidate-centric',
    title: 'Dr. Isaac Newton Kinity',
    subtitle: 'Presidential Candidate 2027 — National Vision Party',
    quote: '"For great heights of prosperity of Kenyan nation and for the happiness, joy, and comfort of the Kenyan people, the demolition of corruption and the rejection of recycling corrupt politicians into leadership positions, should be a mandatory obligation."',
    cta: {
      primary: { text: 'Join the Movement', href: '/join-us', icon: FaHandshake },
      secondary: { text: 'Our Vision', href: '/about/vision-2027', icon: FaArrowRight }
    },
  }
];

export default function HeroDualCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Static Background Image - baner.jpeg only */}
      <div className="absolute inset-0 bg-[#0F172A]">
        <Image
          src="/baner.jpeg"
          alt="National Vision Party rally"
          fill
          className="object-contain object-center"
          priority
        />
        {/* Navy to dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/90 via-[#1E3A8A]/70 to-[#0F172A]/85" />
        {/* Additional overlay for enhanced text clarity */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Carousel Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center w-full h-full"
            >
              <div className={`w-full h-full flex flex-col justify-center space-y-4 sm:space-y-6 ${currentSlide.type === 'party-centric' ? 'max-w-3xl mx-auto text-center' : 'max-w-3xl mx-auto text-center'}`}>
                {/* Title Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  {currentSlide.type === 'party-centric' ? (
                    <>
                      <p className="text-sm sm:text-base md:text-lg text-[#D4A017] font-semibold tracking-wide uppercase">
                        {currentSlide.subtitle}
                      </p>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                        {currentSlide.title}
                      </h1>
                    </>
                  ) : (
                    <>
                      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                        {currentSlide.title}
                      </h1>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#D4A017] font-semibold">
                        {currentSlide.subtitle}
                      </p>
                    </>
                  )}
                </motion.div>

                {/* Message/Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="max-w-2xl mx-auto"
                >
                  {currentSlide.type === 'party-centric' ? (
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
                      {currentSlide.message}
                    </p>
                  ) : (
                    <blockquote className="text-xs sm:text-sm md:text-base lg:text-lg text-white/95 border-l-4 border-[#D4A017] pl-4 py-4 bg-white/10 backdrop-blur-sm rounded-r-lg text-left">
                      {currentSlide.quote}
                    </blockquote>
                  )}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className={`flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center`}
                >
                  <Link
                    href={currentSlide.cta.primary.href}
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-3 bg-[#DC2626] text-white font-semibold text-xs sm:text-base rounded-lg hover:bg-[#B91C1C] transition-all duration-300 hover:-translate-y-1 shadow-lg"
                  >
                    <currentSlide.cta.primary.icon className="w-3 h-3 sm:w-5 sm:h-5" />
                    {currentSlide.cta.primary.text}
                  </Link>
                  <Link
                    href={currentSlide.cta.secondary.href}
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-xs sm:text-base rounded-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <currentSlide.cta.secondary.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    {currentSlide.cta.secondary.text}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white shadow-lg scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-xs sm:text-sm hover:bg-white/20 transition-all duration-300"
        aria-label={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
      >
        {isAutoPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
