'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaArrowUpRightFromSquare, FaXmark, FaYoutube } from 'react-icons/fa6';
import { FaHandshake, FaHeart } from 'react-icons/fa';
import CommentSection from '@/components/CommentSection';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

interface Video {
  id: string;
  title: string;
  description?: string;
  youtubeId: string;
  category: string;
  thumbnail?: string;
  published: boolean;
  order: number;
  createdAt: string;
}

interface VideosClientProps {
  initialVideos: Video[];
}

const categories = ['All', 'Speeches', 'Rallies', 'Interviews', 'Campaign Events', 'Behind the Scenes'];

export default function VideosClient({ initialVideos }: VideosClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filteredVideos = useMemo(() => {
    if (activeCategory === 'All') return initialVideos;
    return initialVideos.filter((v) => v.category === activeCategory);
  }, [activeCategory, initialVideos]);

  const featuredVideo = initialVideos[0];

  const getThumbnailUrl = (youtubeId: string) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean with Subscribe CTA */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#1E3A8A] to-[#0F172A]">
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
          <StaggerContainer className="space-y-8">
            <StaggerItem>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-[#D4A017]/30 text-[#D4A017] text-sm font-medium"
              >
                <FaYoutube className="w-4 h-4" />
                Campaign Media Center
              </motion.span>
            </StaggerItem>

            <StaggerItem>
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="heading-editorial !text-white"
              >
                Watch the{' '}
                <span className="heading-accent-gold">
                  Movement
                </span>
              </motion.h1>
            </StaggerItem>

            <StaggerItem>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
              >
                Campaign speeches, rallies, interviews, and behind-the-scenes moments. 
                Experience the vision that will transform Kenya.
              </motion.p>
            </StaggerItem>

            {/* Gold accent line */}
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="w-24 h-1 bg-gradient-to-r from-[#D4A017] to-[#E6C200] mx-auto rounded-full"
              />
            </StaggerItem>

            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <a
                  href="https://www.youtube.com/channel/UCBoBfckNNdCS7joUqClADbA?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#DC2626] text-white font-bold hover:bg-[#B91C1C] transition-all duration-300 hover:scale-105 shadow-lg shadow-red-900/30"
                >
                  <FaYoutube className="w-5 h-5" />
                  Subscribe on YouTube
                </a>
                <button
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold hover:bg-white/20 transition-all duration-300"
                >
                  Explore Videos
                </button>
              </motion.div>
            </StaggerItem>

            {/* Stats */}
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex justify-center gap-8 pt-8"
              >
                {[
                  { value: initialVideos.length, label: 'Videos' },
                  { value: '10K+', label: 'Views' },
                  { value: '5K+', label: 'Subscribers' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-[#D4A017]">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white/50 tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-gradient-to-b from-[#D4A017] to-[#E6C200] rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Video Section */}
      {featuredVideo && (
        <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-1 bg-gradient-to-r from-[#D4A017] to-[#E6C200] rounded-full" />
                <span className="text-[#D4A017] font-semibold uppercase tracking-wider text-sm">Featured</span>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <motion.div
                className="relative group cursor-pointer"
                onClick={() => setSelectedVideo(featuredVideo)}
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                  <div className="grid lg:grid-cols-2">
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-[300px]">
                      <Image
                        src={featuredVideo.thumbnail || getThumbnailUrl(featuredVideo.youtubeId)}
                        alt={featuredVideo.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent lg:bg-gradient-to-r" />
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-20 h-20 rounded-full bg-[#DC2626] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"
                          whileHover={{ scale: 1.1 }}
                        >
                          <FaPlay className="w-8 h-8 text-white ml-1" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#D4A017]/10 text-[#D4A017] text-sm font-medium mb-4 w-fit border border-[#D4A017]/20">
                        {featuredVideo.category}
                      </span>
                      
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-4 leading-tight">
                        {featuredVideo.title}
                      </h2>
                      
                      {featuredVideo.description && (
                        <p className="text-slate-600 text-lg mb-6">
                          {featuredVideo.description}
                        </p>
                      )}

                      <div className="flex items-center gap-4">
                        <button className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#1E3A8A] text-white font-semibold hover:bg-[#0F172A] transition-all">
                          <FaPlay className="w-4 h-4" />
                          Watch Now
                        </button>
                        <a
                          href={`https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#1E3A8A] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaYoutube className="w-5 h-5" />
                          Open on YouTube
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="relative sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-[#1E3A8A] text-white shadow-lg'
                      : 'bg-slate-100 text-slate-600 hover:text-[#1E3A8A] hover:bg-[#1E3A8A]/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filteredVideos.length > 0 ? (
                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video) => (
                    <StaggerItem key={video.id}>
                      <motion.div
                        className="group h-full cursor-pointer"
                        onClick={() => setSelectedVideo(video)}
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl hover:border-[#D4A017]/30 transition-all duration-500">
                          {/* Thumbnail */}
                          <div className="relative aspect-video overflow-hidden">
                            <Image
                              src={video.thumbnail || getThumbnailUrl(video.youtubeId)}
                              alt={video.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                            
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-14 h-14 rounded-full bg-[#DC2626] flex items-center justify-center shadow-xl">
                                <FaPlay className="w-5 h-5 text-white ml-1" />
                              </div>
                            </div>

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 rounded-full bg-[#1E3A8A]/90 backdrop-blur-md text-white text-xs font-bold">
                                {video.category}
                              </span>
                            </div>

                            {/* YouTube Icon */}
                            <div className="absolute bottom-4 right-4">
                              <FaYoutube className="w-8 h-8 text-[#DC2626]" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5">
                            <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#1E3A8A] transition-colors line-clamp-2">
                              {video.title}
                            </h3>
                            {video.description && (
                              <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                                {video.description}
                              </p>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-slate-400">
                                Watch on YouTube
                              </span>
                              <FaArrowUpRightFromSquare className="w-4 h-4 text-slate-400 group-hover:text-[#1E3A8A] transition-colors" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 sm:py-20"
                >
                  <div className="text-6xl mb-6">🎬</div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-3">
                    No videos found
                  </h3>
                  <p className="text-slate-500">
                    Check back soon for new {activeCategory !== 'All' ? activeCategory.toLowerCase() : ''} content!
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#D4A017] transition-colors p-2 z-10"
                aria-label="Close video"
              >
                <FaXmark className="text-3xl" />
              </button>

              {/* Video container */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?rel=0&modestbranding=1&playsinline=1&autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              {/* Video info */}
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedVideo.title}
                </h3>
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#D4A017] hover:text-[#E6C200] transition-colors"
                >
                  <FaYoutube className="w-5 h-5" />
                  Watch on YouTube
                  <FaArrowUpRightFromSquare className="w-4 h-4" />
                </a>
              </div>

              {/* Comments Section */}
              <CommentSection videoId={selectedVideo.id} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subscribe CTA - Dark Section with Video Background */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0F172A] overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.youtube.com/embed/JL2zN5ZgD6Q?autoplay=1&mute=1&loop=1&playlist=JL2zN5ZgD6Q&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            title="Campaign Background Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ pointerEvents: 'none' }}
          />
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#0F172A]/70 z-[1]" />
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5 z-[2]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent z-10" />
        
        <div className="max-w-4xl mx-auto relative z-[5]">
          <ScrollReveal>
            <div className="text-center">
              {/* Gold accent line */}
              <div className="w-24 h-1 bg-gradient-to-r from-[#D4A017] to-[#E6C200] mx-auto rounded-full mb-8" />
              
              <FaYoutube className="w-16 h-16 text-[#DC2626] mx-auto mb-6" />
              <h2 className="heading-editorial !text-white mb-4">
                Be Part of the <span className="heading-accent-gold">Movement</span>
              </h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto">
                Subscribe to our channel for campaign updates, speeches, rallies, and exclusive content. 
                Join thousands of Kenyans following the journey to 2027.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://www.youtube.com/channel/UCBoBfckNNdCS7joUqClADbA?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#DC2626] text-white font-bold hover:bg-[#B91C1C] transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <FaYoutube className="w-5 h-5" />
                  Subscribe on YouTube
                </a>
                <Link
                  href="/join-us"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold hover:bg-white/20 transition-all duration-300"
                >
                  <FaHandshake className="w-5 h-5" />
                  Join the Movement
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

// Stagger Container and Item components
function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
