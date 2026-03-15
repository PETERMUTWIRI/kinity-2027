'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaArrowRight, 
  FaUsers, 
  FaHeart, 
  FaFlag, 
  FaHandshake,
  FaCalendarAlt,
  FaPlay,
  FaChevronDown,
  FaNewspaper,
  FaImages,
  FaVideo,
  FaCamera,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

// ==========================================
// KIKIMO FOUNDATION - HOMEPAGE
// The Movement Begins
// ==========================================

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  cover: string | null;
  publishedAt: string | null;
  createdAt: string;
}

interface GalleryImage {
  id: number;
  url: string;
  title: string | null;
  photographer: string | null;
  location: string | null;
  county: string | null;
}

interface Video {
  id: number;
  title: string;
  youtubeId: string;
  category: string;
  thumbnail: string | null;
}

// Hardcoded manifesto pillars for reliability
const pillars = [
  {
    id: 'economic-transformation',
    title: 'Economic Transformation',
    subtitle: 'Creating jobs and prosperity',
    summary: 'Creating jobs, supporting local businesses, and building a self-reliant economy that works for every Kenyan.',
    icon: '💼',
    color: '#0074D9',
    featured: true,
  },
  {
    id: 'zero-corruption',
    title: 'Zero Corruption',
    subtitle: 'Uncompromising stance against graft',
    summary: 'Uncompromising stance against corruption. Transparent governance and accountability at every level.',
    icon: '🛡️',
    color: '#E91D0E',
    featured: true,
  },
  {
    id: 'universal-healthcare',
    title: 'Universal Healthcare',
    subtitle: 'Quality healthcare accessible to all',
    summary: 'Quality healthcare accessible to all Kenyans. Modern facilities and well-equipped medical professionals.',
    icon: '🏥',
    color: '#6B2C91',
    featured: true,
  },
  {
    id: 'education-revolution',
    title: 'Education Revolution',
    subtitle: 'World-class education for our children',
    summary: 'World-class education system that prepares our youth for the challenges and opportunities of tomorrow.',
    icon: '🎓',
    color: '#0074D9',
    featured: true,
  },
];

// Fallback data
const upcomingEvents: any[] = [];

const IMAGES_PER_PAGE = 12;

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [latestImages, setLatestImages] = useState<GalleryImage[]>([]);
  const [latestVideos, setLatestVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [mediaLoading, setMediaLoading] = useState(true);
  const [loadingMoreImages, setLoadingMoreImages] = useState(false);
  const [imagesPage, setImagesPage] = useState(1);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const [totalImages, setTotalImages] = useState(0);

  // Fetch latest posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog?limit=3');
        const data = await res.json();
        // Handle both formats: { posts: [...] } or [...]
        const posts = data.posts || data || [];
        setLatestPosts(posts.slice(0, 3));
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Fetch latest media (images and videos)
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // Fetch images (first page)
        const imagesRes = await fetch(`/api/gallery/images?limit=${IMAGES_PER_PAGE}&page=1`);
        const imagesData = await imagesRes.json();
        const images = imagesData.images || imagesData || [];
        setLatestImages(images);
        setTotalImages(imagesData.total || images.length);
        setHasMoreImages(images.length >= IMAGES_PER_PAGE);

        // Fetch videos
        const videosRes = await fetch('/api/videos?limit=3');
        const videosData = await videosRes.json();
        const videos = videosData.videos || videosData || [];
        setLatestVideos(videos.slice(0, 3));
      } catch (err) {
        console.error('Error fetching media:', err);
      } finally {
        setMediaLoading(false);
      }
    };
    fetchMedia();
  }, []);

  // Load more images
  const loadMoreImages = async () => {
    if (loadingMoreImages) return;
    setLoadingMoreImages(true);
    const nextPage = imagesPage + 1;
    
    try {
      const res = await fetch(`/api/gallery/images?limit=${IMAGES_PER_PAGE}&page=${nextPage}`);
      const data = await res.json();
      const newImages = data.images || data || [];
      
      if (newImages.length > 0) {
        setLatestImages(prev => [...prev, ...newImages]);
        setImagesPage(nextPage);
        setHasMoreImages(newImages.length >= IMAGES_PER_PAGE);
      } else {
        setHasMoreImages(false);
      }
    } catch (err) {
      console.error('Error loading more images:', err);
    } finally {
      setLoadingMoreImages(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* ==========================================
          HERO SECTION - Split Layout with Images
          ========================================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
        {/* Background Image - Rally Crowd */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rally.jpeg"
            alt="Dr. Isaac Newton Kinity with supporters at rally"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0074D9]/95 via-[#0074D9]/80 to-[#0074D9]/60" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6B2C91]/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E91D0E]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Hero Content - Split Layout */}
        {/* pt-24 accounts for fixed navbar (top bar + main nav = ~96px) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-28 lg:pb-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-7rem)] lg:min-h-[calc(100vh-8rem)]">
            
            {/* LEFT: Text Content */}
            <div className="space-y-8 text-center lg:text-left">
              

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <span className="block font-slogan text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#E91D0E] tracking-tight drop-shadow-lg">
                  KENYA&apos;S HOPE
                </span>
                <span className="block font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-md">
                  DR. ISAAC NEWTON KINITY
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 max-w-xl font-light italic"
              >
                The Incoming President 2027 — Committed to the Service of Kenyans
              </motion.p>

              {/* Key Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="max-w-lg"
              >
                <p className="text-lg text-white/80 border-l-4 border-[#E91D0E] pl-6 text-left">
                  No Recycling of Corrupt Politicians. A new era of leadership built on integrity, 
                  economic transformation, and unwavering commitment to every Kenyan.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 pt-4"
              >
                <Link
                  href="/join-us"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#E91D0E] text-white font-bold text-lg hover:bg-[#BA170C] transition-all duration-300 hover:shadow-xl hover:shadow-[#E91D0E]/30 hover:-translate-y-1"
                >
                  <FaHandshake className="w-5 h-5" />
                  Join the Movement
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-[#0074D9] font-bold text-lg hover:bg-slate-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <FaFlag className="w-5 h-5" />
                  Learn More
                </Link>
              </motion.div>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="pt-8"
              >
                <div className="inline-flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12 bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
                  {[
                    { value: '47', label: 'Counties', suffix: '+' },
                    { value: '50', label: 'Million Kenyans', suffix: 'M+' },
                    { value: '1', label: 'Vision', suffix: '' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white">
                        {stat.value}<span className="text-[#E91D0E]">{stat.suffix}</span>
                      </div>
                      <div className="text-sm text-white/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Dr. Kinity Portrait */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative block"
            >
              <div className="relative aspect-[3/4] max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#E91D0E]/30 via-[#6B2C91]/30 to-[#0074D9]/30 rounded-3xl blur-2xl" />
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <Image
                    src="/images/president.jpeg"
                    alt="Dr. Isaac Newton Kinity - Presidential Candidate"
                    fill
                    className="object-cover object-top"
                    priority
                    quality={95}
                  />
                  
                  {/* Subtle Gradient Overlay at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0074D9]/40 via-transparent to-transparent" />
                </div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-6 py-4 border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E91D0E] to-[#BA170C] flex items-center justify-center overflow-hidden">
                      <Image
                        src="/images/kenya-flag.png"
                        alt="Kenya Flag"
                        width={36}
                        height={24}
                        className="object-cover rounded-sm"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Presidential</p>
                      <p className="text-lg font-bold text-[#111111]">Candidate 2027</p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 border-2 border-dashed border-white/20 rounded-3xl pointer-events-none"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <a 
            href="#vision" 
            className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-xs tracking-widest uppercase">Discover More</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaChevronDown className="w-5 h-5" />
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* ==========================================
          VISION SECTION - Policy Pillars
          ========================================== */}
      <section id="vision" className="section-padding bg-white relative">
        <div className="container-presidential">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-[#0074D9]/10 text-[#0074D9] font-semibold text-sm mb-4">
                Our Vision
              </span>
              <h2 className="font-headline text-4xl md:text-5xl text-[#111111] mb-4">
                Building a <span className="text-[#E91D0E]">Better Kenya</span>
              </h2>
              <p className="text-lg text-slate-600">
                Four pillars that will transform Kenya into a nation of prosperity, 
                integrity, and opportunity for all.
              </p>
            </div>
          </ScrollReveal>

          {/* Pillars Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.length > 0 ? (
              pillars.map((pillar, index) => (
                <ScrollReveal key={pillar.id} delay={index * 0.1}>
                  <Link href={`/about#${pillar.id}`} className="group">
                    <div className="card-presidential h-full p-6 hover:border-[#0074D9]/30">
                      {/* Icon placeholder */}
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                        style={{ 
                          backgroundColor: `${pillar.color}20`,
                          color: pillar.color 
                        }}
                      >
                        {pillar.icon || '★'}
                      </div>
                      <h3 className="font-headline text-xl text-[#111111] mb-2 group-hover:text-[#0074D9] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3">
                        {pillar.summary}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-[#0074D9] font-semibold text-sm">
                        Learn more
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))
            ) : (
              // Fallback content if no pillars in DB
              <>
                {[
                  { 
                    id: 'economic-transformation',
                    title: 'Economic Transformation', 
                    desc: 'Creating jobs, supporting local businesses, and building a self-reliant economy that works for every Kenyan.',
                    color: '#0074D9',
                    icon: '💼'
                  },
                  { 
                    id: 'zero-corruption',
                    title: 'Zero Corruption', 
                    desc: 'Uncompromising stance against corruption. Transparent governance and accountability at every level.',
                    color: '#E91D0E',
                    icon: '🛡️'
                  },
                  { 
                    id: 'universal-healthcare',
                    title: 'Universal Healthcare', 
                    desc: 'Quality healthcare accessible to all Kenyans. Modern facilities and well-equipped medical professionals.',
                    color: '#6B2C91',
                    icon: '🏥'
                  },
                  { 
                    id: 'education-revolution',
                    title: 'Education Revolution', 
                    desc: 'World-class education system that prepares our youth for the challenges and opportunities of tomorrow.',
                    color: '#0074D9',
                    icon: '🎓'
                  },
                ].map((pillar, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <Link href={`/about#${pillar.id}`} className="group">
                      <div className="card-presidential h-full p-6">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                          style={{ 
                            backgroundColor: `${pillar.color}20`,
                            color: pillar.color 
                          }}
                        >
                          {pillar.icon}
                        </div>
                        <h3 className="font-headline text-xl text-[#111111] mb-2 group-hover:text-[#0074D9] transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="text-slate-600 text-sm">
                          {pillar.desc}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-[#0074D9] font-semibold text-sm">
                          Learn more
                          <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          ABOUT TEASER SECTION
          ========================================== */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0074D9]/5 to-transparent pointer-events-none" />
        
        <div className="container-presidential relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#0074D9] to-[#6B2C91] rounded-3xl opacity-20 blur-2xl" />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/kinity-connection.jpeg"
                    alt="Dr. Isaac Newton Kinity connecting with community"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0074D9]/40 via-transparent to-transparent" />
                </div>
                
                {/* Experience badge */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#E91D0E]">20+</div>
                    <div className="text-sm text-slate-600">Years of Service</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Content Side */}
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <span className="inline-block px-4 py-1 rounded-full bg-[#E91D0E]/10 text-[#E91D0E] font-semibold text-sm">
                  Meet the Candidate
                </span>
                <h2 className="font-headline text-4xl md:text-5xl text-[#111111]">
                  A Leader for <span className="text-[#0074D9]">All Kenyans</span>
                </h2>
                <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                  <p>
                    Dr. Isaac Newton Kinity brings decades of experience in public service, 
                    business leadership, and community development. His journey from humble 
                    beginnings to becoming one of Kenya&apos;s most respected voices is a testament 
                    to his dedication and vision.
                  </p>
                  <p>
                    Unlike career politicians who have recycled through governments without 
                    delivering results, Dr. Kinity represents a new generation of leadership—
                    one that puts the people first, always.
                  </p>
                </div>
                
                {/* Key traits */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    { label: 'Integrity', href: '/about#why-dr-kinity' },
                    { label: 'Experience', href: '/about#why-dr-kinity' },
                    { label: 'Vision', href: '/about#vision-2027' },
                    { label: 'Commitment', href: '/about#why-dr-kinity' },
                  ].map((trait, i) => (
                    <Link
                      key={i}
                      href={trait.href}
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0074D9]/10 text-[#0074D9] font-semibold text-sm hover:bg-[#0074D9] hover:text-white transition-all duration-300"
                    >
                      {trait.label}
                      <FaArrowRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    </Link>
                  ))}
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0074D9] text-white font-bold hover:bg-[#005CB0] transition-all duration-300 hover:shadow-lg hover:shadow-[#0074D9]/30"
                >
                  Read Full Story
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          LATEST NEWS SECTION - REAL POSTS
          ========================================== */}
      <section className="section-padding bg-white">
        <div className="container-presidential">
          {/* Section Header */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-[#6B2C91]/10 text-[#6B2C91] font-semibold text-sm mb-4">
                  Latest Updates
                </span>
                <h2 className="font-headline text-4xl md:text-5xl text-[#111111]">
                  From the <span className="text-[#0074D9]">News Hub</span>
                </h2>
              </div>
              <Link
                href="/news-hub"
                className="inline-flex items-center gap-2 text-[#0074D9] font-semibold hover:text-[#005CB0] transition-colors"
              >
                View All News
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* News Grid - Shows 3 Actual Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              <>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card-presidential overflow-hidden h-full animate-pulse">
                    <div className="aspect-video bg-slate-200" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-slate-200 rounded w-1/3" />
                      <div className="h-6 bg-slate-200 rounded" />
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </>
            ) : latestPosts.length > 0 ? (
              // Real posts from API
              latestPosts.map((post, index) => (
                <ScrollReveal key={post.id} delay={index * 0.1}>
                  <Link href={`/news-hub/${post.slug}`} className="group">
                    <article className="card-presidential overflow-hidden h-full">
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden">
                        {post.cover ? (
                          <Image
                            src={post.cover}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#0074D9] to-[#6B2C91] flex items-center justify-center">
                            <FaNewspaper className="w-12 h-12 text-white/50" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-[#E91D0E] text-white text-xs font-bold">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <p className="text-sm text-slate-500 mb-2">
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-KE', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                        <h3 className="font-headline text-xl text-[#111111] mb-3 group-hover:text-[#0074D9] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm line-clamp-3">
                          {post.excerpt || post.content.replace(/<[^>]*>/g, '').slice(0, 150)}...
                        </p>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))
            ) : (
              // Fallback if no posts
              <div className="col-span-3 text-center py-12">
                <FaNewspaper className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No articles yet</h3>
                <p className="text-slate-500">Check back soon for the latest updates from the campaign.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          MEDIA SHOWCASE SECTION
          ========================================== */}
      <section className="section-padding bg-gradient-to-br from-[#0074D9] to-[#005CB0] text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E91D0E]/10 rounded-full blur-3xl" />
        </div>

        <div className="container-presidential relative z-10">
          {/* Section Header */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white font-semibold text-sm mb-4">
                  Media Center
                </span>
                <h2 className="font-headline text-4xl md:text-5xl">
                  Latest <span className="text-white/80">From The Trail</span>
                </h2>
              </div>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-white font-semibold hover:text-white/80 transition-colors"
              >
                View All Media
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Media Grid - 3/4 Images + 1/4 Videos */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left: Images (3/4 width on desktop) */}
            <div className="lg:w-3/4">
              <ScrollReveal>
                <div className="flex items-center gap-2 mb-4">
                  <FaImages className="w-5 h-5 text-white/80" />
                  <h3 className="text-lg font-semibold text-white/90">Latest Photos</h3>
                </div>
              </ScrollReveal>
              
              {mediaLoading ? (
                // Loading skeleton for images
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="aspect-square bg-white/10 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : latestImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {latestImages.map((image, index) => (
                    <ScrollReveal key={image.id} delay={index * 0.05}>
                      <Link 
                        href="/gallery"
                        className="group relative aspect-square rounded-xl overflow-hidden block bg-white/10"
                      >
                        <Image
                          src={image.url}
                          alt={image.title || 'Campaign photo'}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {/* Camera icon on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <FaCamera className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        {/* Location tag if available */}
                        {(image.location || image.county) && (
                          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-xs truncate">
                              {[image.location, image.county].filter(Boolean).join(', ')}
                            </p>
                          </div>
                        )}
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white/5 rounded-2xl">
                  <FaImages className="w-12 h-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/60">No photos available yet</p>
                </div>
              )}
              
              {/* Load More Button */}
              {!mediaLoading && hasMoreImages && (
                <div className="mt-6 text-center">
                  <button
                    onClick={loadMoreImages}
                    disabled={loadingMoreImages}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed transition-all duration-300 text-white font-medium"
                  >
                    {loadingMoreImages ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <FaImages className="w-4 h-4" />
                        Load More Photos
                        <span className="text-white/60 text-sm">
                          ({latestImages.length} of {totalImages})
                        </span>
                      </>
                    )}
                  </button>
                </div>
              )}
              
              {/* Show count when all loaded */}
              {!mediaLoading && !hasMoreImages && latestImages.length > 0 && (
                <div className="mt-6 text-center">
                  <p className="text-white/50 text-sm">
                    Showing all {latestImages.length} photos
                  </p>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 mt-3 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-white font-medium text-sm"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    Visit Full Gallery
                  </Link>
                </div>
              )}
            </div>

            {/* Right: Videos (1/4 width on desktop) */}
            <div className="lg:w-1/4">
              <ScrollReveal>
                <div className="flex items-center gap-2 mb-4">
                  <FaVideo className="w-5 h-5 text-white/80" />
                  <h3 className="text-lg font-semibold text-white/90">Latest Videos</h3>
                </div>
              </ScrollReveal>
              
              {mediaLoading ? (
                // Loading skeleton for videos
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="aspect-video bg-white/10 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : latestVideos.length > 0 ? (
                <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
                  {latestVideos.map((video, index) => (
                    <ScrollReveal key={video.id} delay={index * 0.1}>
                      <a
                        href={`https://youtube.com/watch?v=${video.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-video lg:aspect-video rounded-xl overflow-hidden block bg-white/10 flex-shrink-0 w-48 sm:w-56 lg:w-full"
                      >
                        <Image
                          src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 1024px) 200px, 25vw"
                          unoptimized
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        
                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 bg-[#E91D0E]/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                            <FaPlay className="w-4 h-4 text-white ml-0.5" />
                          </div>
                        </div>
                        
                        {/* Category badge */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#E91D0E] text-white text-xs font-bold rounded">
                          {video.category}
                        </div>
                        
                        {/* Title */}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-white/90 transition-colors">
                            {video.title}
                          </h4>
                        </div>
                      </a>
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white/5 rounded-2xl">
                  <FaVideo className="w-12 h-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/60">No videos available yet</p>
                </div>
              )}

              {/* View all videos link */}
              {!mediaLoading && latestVideos.length > 0 && (
                <ScrollReveal delay={0.3}>
                  <Link
                    href="/gallery?tab=videos"
                    className="mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-white font-medium text-sm"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    View All Videos
                  </Link>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CALL TO ACTION SECTION - with Video Background
          ========================================== */}
      <section className="section-padding bg-[#111111] text-white relative overflow-hidden min-h-[600px]">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/BqPibiAzqIk?autoplay=1&mute=1&loop=1&playlist=BqPibiAzqIk&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=0"
            title="Kinity Campaign Movement"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute w-full h-full"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '100vh',
              transform: 'translate(-50%, -50%) scale(1.3)',
              pointerEvents: 'none',
            }}
          />
        </div>
        
        {/* Dark Glass Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-blur-[2px]" />
        
        {/* Additional subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0074D9]/20 via-transparent to-[#6B2C91]/20" />

        <div className="container-presidential relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-slogan text-4xl md:text-5xl lg:text-6xl mb-6">
                BE PART OF THE <span className="text-[#E91D0E]">MOVEMENT</span>
              </h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Change doesn&apos;t happen from the top down. It starts with dedicated citizens 
                like you who believe in a better Kenya. Join thousands of supporters across 
                all 47 counties.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
                {[
                  { value: '10K+', label: 'Volunteers' },
                  { value: '47', label: 'Counties' },
                  { value: '100K+', label: 'Supporters' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-[#0074D9]">{stat.value}</div>
                    <div className="text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/join-us"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-[#E91D0E] text-white font-bold text-lg hover:bg-[#BA170C] transition-all duration-300 hover:shadow-xl hover:shadow-[#E91D0E]/30"
                >
                  <FaHandshake className="w-6 h-6" />
                  Become a Volunteer
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-white text-[#111111] font-bold text-lg hover:bg-slate-100 transition-all duration-300"
                >
                  <FaHeart className="w-6 h-6 text-[#E91D0E]" />
                  Support the Campaign
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </div>
  );
}
