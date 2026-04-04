'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaFlag, FaHandshake, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// ==========================================
// DUAL FOCUS HERO CAROUSEL
// Party-centric & Candidate-centric messaging
// ==========================================

const slides = [
  {
    id: 'party',
    type: 'party-centric',
    title: 'National Vision Party',
    subtitle: 'Kenya\'s Hope 2027',
    message: 'Building a prosperous future through economic transformation, zero corruption, universal healthcare, and education revolution.',
    cta: {
      primary: { text: 'Our Manifesto', href: '/about/manifesto', icon: FaFlag },
      secondary: { text: 'Join the Party', href: '/join-us', icon: FaHandshake }
    },
    background: '/WhatsApp Image 2026-03-18 at 5.03.43 PM.jpeg'
  },
  {
    id: 'candidate',
    type: 'candidate-centric',
    title: 'Dr. Isaac Newton Kinity',
    subtitle: 'Presidential Candidate 2027',
    quote: '"For great heights of prosperity of Kenyan nation and for the happiness, joy, and comfort of the Kenyan people, the demolition of corruption and the rejection of recycling corrupt politicians into leadership positions, should be a mandatory obligation."',
    cta: {
      primary: { text: 'Support the Candidate', href: '/about', icon: FaHandshake },
      secondary: { text: 'Learn More', href: '/about', icon: FaArrowRight }
    },
    background: '/WhatsApp Image 2026-03-18 at 5.03.42 PM (2).jpeg',
    headshot: '/images/Dr.png'
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

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src={currentSlide.background}
          alt="Kenyan rally background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Navy to white gradient overlay - smooth transition from top to bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/85 via-[#2D5A9E]/60 to-white/80" />
        {/* Additional overlay for enhanced text clarity */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Carousel Content */}
      <div className="relative z-10 flex items-center w-full min-h-screen px-4 sm:px-6 lg:px-8 py-0">
        <div className="max-w-7xl mx-auto w-full h-full flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full"
            >
              {/* Left Side - Text Content */}
              <div className="text-center lg:text-left space-y-4 sm:space-y-6">
                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                    {currentSlide.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#D4A017] font-semibold">
                    {currentSlide.subtitle}
                  </p>
                </motion.div>

                {/* Message/Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="max-w-xl mx-auto lg:mx-0"
                >
                  {currentSlide.type === 'party-centric' ? (
                    <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
                      {currentSlide.message}
                    </p>
                  ) : (
                    <blockquote className="text-sm sm:text-base md:text-lg text-white/95 border-l-4 border-[#D4A017] pl-4 py-4 bg-white/10 backdrop-blur-sm rounded-r-lg">
                      {currentSlide.quote}
                    </blockquote>
                  )}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2"
                >
                  <Link
                    href={currentSlide.cta.primary.href}
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#DC2626] text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-[#B91C1C] transition-all duration-300 hover:-translate-y-1 shadow-lg"
                  >
                    <currentSlide.cta.primary.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    {currentSlide.cta.primary.text}
                    <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href={currentSlide.cta.secondary.href}
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <currentSlide.cta.secondary.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    {currentSlide.cta.secondary.text}
                  </Link>
                </motion.div>
              </div>

              {/* Right Side - Visual Content */}
              <div className="flex justify-center lg:justify-end h-full items-center">
                {currentSlide.type === 'candidate-centric' && currentSlide.headshot ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                  >
                    {/* Headshot with blended gradient */}
                    <div className="relative w-56 h-96 sm:w-64 sm:h-[500px] lg:w-72 lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={currentSlide.headshot}
                        alt="Dr. Isaac Newton Kinity"
                        fill
                        className="object-cover object-top"
                        priority
                      />
                      {/* Blending gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/60 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/40 via-transparent to-transparent" />
                    </div>

                    {/* Floating badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl px-4 py-2 border-l-4 border-[#D4A017]"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#1E3A8A] flex items-center justify-center">
                          <Image
                            src="/images/kenya-flag.png"
                            alt="Kenya"
                            width={12}
                            height={8}
                            className="object-cover rounded-sm"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-slate-600">2027</p>
                          <p className="text-sm font-bold text-[#1E3A8A]">Candidate</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
                      <Image
                        src="/images/logo.png"
                        alt="National Vision Party Logo"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </div>
                  </motion.div>
                )}
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