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
  FaNewspaper,
  FaImages,
  FaVideo,
  FaCamera,
  FaExternalLinkAlt,
  FaBullhorn,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';
import TiltCard from '@/components/TiltCard';
import { EconomicIcon, AntiCorruptionIcon, HealthcareIcon, EducationIcon } from '@/components/PillarIcons';
import SocialProof from '@/components/SocialProof';
import HeroDualCarousel from '@/components/HeroDualCarousel';

// ==========================================
// NATIONAL VISION PARTY - PREMIUM HOMEPAGE
// Kenya's Hope 2027 - Authoritative Design
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

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  cover: string | null;
  location: string;
  county: string | null;
  venue: string | null;
  startDate: string;
  endDate: string | null;
}

// Hardcoded manifesto pillars for reliability
const pillars = [
  {
    id: 'economic-transformation',
    title: 'Economic Transformation',
    subtitle: 'Creating jobs and prosperity',
    summary: 'Creating jobs, supporting local businesses, and building a self-reliant economy that works for every Kenyan.',
    Icon: EconomicIcon,
    image: '/images/vission/economic-transformation.png',
    color: '#1E3A8A',
    featured: true,
  },
  {
    id: 'zero-corruption',
    title: 'Zero Corruption',
    subtitle: 'Uncompromising stance against graft',
    summary: 'Uncompromising stance against corruption. Transparent governance and accountability at every level.',
    Icon: AntiCorruptionIcon,
    image: '/images/vission/corruption.png',
    color: '#D4A017',
    featured: true,
  },
  {
    id: 'universal-healthcare',
    title: 'Universal Healthcare',
    subtitle: 'Quality healthcare accessible to all',
    summary: 'Quality healthcare accessible to all Kenyans. Modern facilities and well-equipped medical professionals.',
    Icon: HealthcareIcon,
    image: '/images/vission/healthcare.png',
    color: '#1E3A8A',
    featured: true,
  },
  {
    id: 'education-revolution',
    title: 'Education Revolution',
    subtitle: 'World-class education for our children',
    summary: 'World-class education system that prepares our youth for the challenges and opportunities of tomorrow.',
    Icon: EducationIcon,
    image: '/images/vission/education.png',
    color: '#D4A017',
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
  const [latestEvents, setLatestEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [mediaLoading, setMediaLoading] = useState(true);
  const [loadingMoreImages, setLoadingMoreImages] = useState(false);
  const [imagesPage, setImagesPage] = useState(1);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const [totalImages, setTotalImages] = useState(0);

  // Fetch latest events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events?limit=3');
        const data = await res.json();
        const events = Array.isArray(data) ? data : [];
        setLatestEvents(events.slice(0, 3));
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };
    fetchEvents();
  }, []);

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
          HERO SECTION - Dual Focus Carousel
          ========================================== */}
      <section className="relative">
        <HeroDualCarousel />
      </section>

      {/* ==========================================
          JOIN THE MOVEMENT BANNER
          ========================================== */}
      <section className="relative bg-gradient-to-r from-[#1E3A8A] via-[#0F172A] to-[#1E3A8A] py-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A017] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4A017]"></span>
              </span>
              <p className="text-white font-medium text-sm md:text-base">
                <span className="text-[#D4A017] font-bold">JOIN THE MOVEMENT:</span> The National Vision Party is growing across all 47 counties. 
                <span className="hidden md:inline"> Be part of the change Kenya needs.</span>
              </p>
            </div>
            <Link 
              href="/join-us" 
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D4A017] text-[#0F172A] font-bold text-sm hover:bg-[#E6C200] transition-colors whitespace-nowrap"
            >
              Get Involved
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          VISION SECTION - Policy Pillars
          ========================================== */}
      <section id="vision" className="py-10 md:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Kenyan flag background */}
        <div className="absolute inset-0 bg-[url('/images/kenya-flag.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay for readability */}
        <div className="absolute inset-0 bg-white/95" />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-[#D4A017]/10 text-[#D4A017] border border-[#D4A017]/20 font-semibold text-sm mb-4">
                Our Vision
              </span>
              <h2 className="font-headline text-4xl md:text-5xl text-[#0F172A] mb-4">
                Building a <span className="text-[#D4A017]">Better Kenya</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] mx-auto rounded-full mb-4" />
              <p className="text-lg text-slate-600">
                Four pillars that will transform Kenya into a nation of prosperity, 
                integrity, and opportunity for all.
              </p>
            </div>
          </ScrollReveal>

          {/* Pillars Grid - Clean Premium Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {pillars.length > 0 ? (
              pillars.map((pillar, index) => (
                <ScrollReveal key={pillar.id} delay={index * 0.1}>
                  <Link href={`/about#${pillar.id}`} className="group block h-full">
                    <TiltCard className="h-full" borderColor={pillar.color}>
                      <div className="h-full bg-white rounded-2xl p-5 md:p-6 shadow-md border border-slate-100 group-hover:shadow-xl group-hover:border-[#D4A017]/30 transition-all duration-300">
                        {/* Pillar image */}
                        <div className="relative mb-4">
                          <div className="w-full h-32 md:h-36 rounded-xl overflow-hidden">
                            <Image
                              src={pillar.image}
                              alt={pillar.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          {/* Subtle gold accent dot */}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#D4A017] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        {/* Title with subtle gold underline on mobile */}
                        <h3 className="font-headline text-lg md:text-xl text-[#0F172A] mb-2 group-hover:text-[#1E3A8A] transition-colors">
                          {pillar.title}
                        </h3>
                        
                        {/* Gold accent line */}
                        <div className="w-10 h-0.5 bg-gradient-to-r from-[#D4A017] to-[#E6C200] rounded-full mb-3 opacity-60 group-hover:w-16 transition-all duration-300" />
                        
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                          {pillar.summary}
                        </p>
                        
                        {/* Learn more link */}
                        <div className="flex items-center gap-2 text-[#1E3A8A] font-semibold text-sm group-hover:text-[#D4A017] transition-colors">
                          <span>Learn more</span>
                          <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </TiltCard>
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
                    color: '#1E3A8A',
                    image: '/images/vission/economic-transformation.png',
                    Icon: EconomicIcon
                  },
                  { 
                    id: 'zero-corruption',
                    title: 'Zero Corruption', 
                    desc: 'Uncompromising stance against corruption. Transparent governance and accountability at every level.',
                    color: '#D4A017',
                    image: '/images/vission/corruption.png',
                    Icon: AntiCorruptionIcon
                  },
                  { 
                    id: 'universal-healthcare',
                    title: 'Universal Healthcare', 
                    desc: 'Quality healthcare accessible to all Kenyans. Modern facilities and well-equipped medical professionals.',
                    color: '#1E3A8A',
                    image: '/images/vission/healthcare.png',
                    Icon: HealthcareIcon
                  },
                  { 
                    id: 'education-revolution',
                    title: 'Education Revolution', 
                    desc: 'World-class education system that prepares our youth for the challenges and opportunities of tomorrow.',
                    color: '#D4A017',
                    image: '/images/vission/education.png',
                    Icon: EducationIcon
                  },
                ].map((pillar, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <Link href={`/about#${pillar.id}`} className="group block h-full">
                      <TiltCard className="h-full" borderColor={pillar.color}>
                        <div className="h-full bg-white rounded-2xl p-5 md:p-6 shadow-md border border-slate-100 group-hover:shadow-xl group-hover:border-[#D4A017]/30 transition-all duration-300">
                          {/* Pillar image */}
                          <div className="relative mb-4">
                            <div className="w-full h-32 md:h-36 rounded-xl overflow-hidden">
                              <Image
                                src={pillar.image}
                                alt={pillar.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            {/* Subtle gold accent dot */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#D4A017] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          
                          {/* Title */}
                          <h3 className="font-headline text-lg md:text-xl text-[#0F172A] mb-2 group-hover:text-[#1E3A8A] transition-colors">
                            {pillar.title}
                          </h3>
                          
                          {/* Gold accent line */}
                          <div className="w-10 h-0.5 bg-gradient-to-r from-[#D4A017] to-[#E6C200] rounded-full mb-3 opacity-60 group-hover:w-16 transition-all duration-300" />
                          
                          <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            {pillar.desc}
                          </p>
                          
                          {/* Learn more link */}
                          <div className="flex items-center gap-2 text-[#1E3A8A] font-semibold text-sm group-hover:text-[#D4A017] transition-colors">
                            <span>Learn more</span>
                            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </TiltCard>
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
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1E3A8A]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[5]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] rounded-3xl opacity-20 blur-2xl" />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/president.jpeg"
                    alt="Dr. Isaac Newton Kinity - Presidential Candidate"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/40 via-transparent to-transparent" />
                </div>
                
                {/* Experience badge */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border-t-4 border-[#D4A017]">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#1E3A8A]">20+</div>
                    <div className="text-sm text-slate-600">Years of Service</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Content Side */}
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <span className="inline-block px-4 py-1 rounded-full bg-[#D4A017]/10 text-[#D4A017] border border-[#D4A017]/20 font-semibold text-sm">
                  Meet the Candidate
                </span>
                <h2 className="font-headline text-4xl md:text-5xl text-[#0F172A]">
                  A Leader for <span className="text-[#D4A017]">All Kenyans</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#D4A017] to-[#E6C200] rounded-full" />
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
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] font-semibold text-sm hover:bg-[#1E3A8A] hover:text-white transition-all duration-300"
                    >
                      {trait.label}
                      <FaArrowRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    </Link>
                  ))}
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#1E3A8A] text-white font-bold hover:bg-[#0F172A] transition-all duration-300 hover:shadow-lg hover:shadow-[#1E3A8A]/30"
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
          LATEST MESSAGE FROM THE MOVEMENT
          ========================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-white via-30% to-[#1E3A8A] relative overflow-hidden">
        {/* Background decoration - subtle blue accents on white */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E3A8A]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#D4A017]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A017]/10 text-[#D4A017] border border-[#D4A017]/20 font-semibold text-sm mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A017] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A017]"></span>
                </span>
                Latest Update
              </span>
              <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl mb-4 text-[#0F172A]">
                Message to the <span className="text-[#D4A017]">Nation</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Watch the latest address to Kenyans and share it with your network. Together we are building a movement for change.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Main Video */}
            <ScrollReveal className="lg:col-span-2">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-black">
                {latestVideos.length > 0 ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${latestVideos[0].youtubeId}?rel=0`}
                    title="Latest Message to the Nation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <iframe
                    src="https://www.youtube.com/embed/BqPibiAzqIk?rel=0"
                    title="Latest Message to the Nation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                )}
              </div>
            </ScrollReveal>

            {/* Side: More videos + Actions */}
            <div className="space-y-6">
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h3 className="font-bold text-lg mb-4 text-[#0F172A]">More Videos</h3>
                  <div className="space-y-4">
                    {(latestVideos.length > 1 ? latestVideos.slice(1, 4) : []).map((video, index) => (
                      <a
                        key={video.id}
                        href={`https://youtube.com/watch?v=${video.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-3 group"
                      >
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                          <Image
                            src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                            alt={video.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 bg-[#DC2626]/90 rounded-full flex items-center justify-center">
                              <FaPlay className="w-2.5 h-2.5 text-white ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#0F172A] line-clamp-2 group-hover:text-[#D4A017] transition-colors">
                            {video.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">{video.category}</p>
                        </div>
                      </a>
                    ))}
                    {latestVideos.length <= 1 && (
                      <p className="text-slate-500 text-sm">More campaign videos coming soon. Subscribe to stay updated.</p>
                    )}
                  </div>
                  <Link
                    href="/videos"
                    className="mt-4 inline-flex items-center gap-2 text-[#D4A017] font-semibold text-sm hover:text-[#E6C200] transition-colors"
                  >
                    View All Videos
                    <FaArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <a
                  href="https://www.youtube.com/channel/UCBoBfckNNdCS7joUqClADbA?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 rounded-xl bg-[#DC2626] text-white font-bold hover:bg-[#B91C1C] transition-colors"
                >
                  Subscribe on YouTube
                </a>
              </ScrollReveal>

              <ScrollReveal>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent('Watch the latest message from the National Vision Party: https://www.nationalvisionparty.com/videos')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-colors"
                >
                  Share on WhatsApp
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          LATEST NEWS SECTION - REAL POSTS
          ========================================== */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-[#D4A017]/10 text-[#D4A017] border border-[#D4A017]/20 font-semibold text-sm mb-4">
                  Latest Updates
                </span>
                <h2 className="font-headline text-4xl md:text-5xl text-[#0F172A]">
                  From the <span className="text-[#D4A017]">News Hub</span>
                </h2>
              </div>
              <Link
                href="/news-hub"
                className="inline-flex items-center gap-2 text-[#1E3A8A] font-semibold hover:text-[#0F172A] transition-colors"
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
                  <div key={i} className="card-premium overflow-hidden h-full animate-pulse">
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
                    <article className="card-premium overflow-hidden h-full">
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
                          <div className="w-full h-full bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] flex items-center justify-center">
                            <FaNewspaper className="w-12 h-12 text-white/50" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-[#D4A017] text-white text-xs font-bold">
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
                        <h3 className="font-headline text-xl text-[#0F172A] mb-3 group-hover:text-[#1E3A8A] transition-colors line-clamp-2">
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
          UPCOMING EVENTS SECTION
          ========================================== */}
      <section className="py-12 md:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20 font-semibold text-sm mb-4">
                  Campaign Trail
                </span>
                <h2 className="font-headline text-4xl md:text-5xl text-[#0F172A]">
                  Upcoming <span className="text-[#DC2626]">Events</span>
                </h2>
              </div>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-[#1E3A8A] font-semibold hover:text-[#0F172A] transition-colors"
              >
                View All Events
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Events Grid - Shows 3 Latest Events */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestEvents.length > 0 ? (
              // Real events from API
              latestEvents.map((event, index) => (
                <ScrollReveal key={event.id} delay={index * 0.1}>
                  <Link href={`/events/${event.slug}`} className="group">
                    <article className="card-premium overflow-hidden h-full bg-white">
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden">
                        {event.cover ? (
                          <Image
                            src={event.cover}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] flex items-center justify-center">
                            <FaBullhorn className="w-12 h-12 text-white/50" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-[#DC2626] text-white text-xs font-bold">
                            {event.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-slate-500 text-sm mb-3">
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt className="w-4 h-4 text-[#1E3A8A]" />
                            {new Date(event.startDate).toLocaleDateString('en-KE', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="w-4 h-4 text-[#DC2626]" />
                            {event.county || event.location}
                          </span>
                        </div>
                        <h3 className="font-headline text-xl text-[#0F172A] mb-2 group-hover:text-[#1E3A8A] transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                        {event.venue && (
                          <p className="text-slate-600 text-sm line-clamp-1 mb-3">{event.venue}</p>
                        )}
                        <p className="text-slate-600 text-sm line-clamp-2">
                          {event.description?.slice(0, 120)}...
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-[#1E3A8A] font-semibold text-sm">
                          View Details
                          <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))
            ) : (
              // Fallback if no events
              <div className="col-span-3 text-center py-12">
                <FaCalendarAlt className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No upcoming events</h3>
                <p className="text-slate-500">Check back soon for new campaign events!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          MEDIA SHOWCASE SECTION - White to Blue Gradient
          ========================================== */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-white via-30% to-[#1E3A8A] relative overflow-hidden">
        {/* Background decoration - subtle blue accents on white */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E3A8A]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#D4A017]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-[#D4A017]/10 text-[#D4A017] border border-[#D4A017]/20 font-semibold text-sm mb-4">
                  Media Center
                </span>
                <h2 className="font-headline text-4xl md:text-5xl text-[#0F172A]">
                  Latest <span className="text-[#1E3A8A]">From The Trail</span>
                </h2>
              </div>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-[#1E3A8A] font-semibold hover:text-[#0F172A] transition-colors"
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
                  <FaImages className="w-5 h-5 text-[#1E3A8A]" />
                  <h3 className="text-lg font-semibold text-[#0F172A]">Latest Photos</h3>
                </div>
              </ScrollReveal>
              
              {mediaLoading ? (
                // Loading skeleton for images
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="aspect-square bg-slate-200 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : latestImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {latestImages.map((image, index) => (
                    <ScrollReveal key={image.id} delay={index * 0.05}>
                      <Link 
                        href="/gallery"
                        className="group relative aspect-square rounded-xl overflow-hidden block bg-slate-100 shadow-lg"
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
                <div className="text-center py-12 bg-slate-100 rounded-2xl">
                  <FaImages className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No photos available yet</p>
                </div>
              )}
              
              {/* Load More Button */}
              {!mediaLoading && hasMoreImages && (
                <div className="mt-6 text-center">
                  <button
                    onClick={loadMoreImages}
                    disabled={loadingMoreImages}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A8A] hover:bg-[#0F172A] disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-300 text-white font-medium shadow-lg"
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
                  <p className="text-white/70 text-sm">
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
                  <FaVideo className="w-5 h-5 text-[#1E3A8A]" />
                  <h3 className="text-lg font-semibold text-[#0F172A]">Latest Videos</h3>
                </div>
              </ScrollReveal>
              
              {mediaLoading ? (
                // Loading skeleton for videos
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="aspect-video bg-slate-200 rounded-xl animate-pulse" />
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
                          <div className="w-10 h-10 bg-[#DC2626]/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                            <FaPlay className="w-4 h-4 text-white ml-0.5" />
                          </div>
                        </div>
                        
                        {/* Category badge */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#D4A017] text-white text-xs font-bold rounded">
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
                <div className="text-center py-12 bg-slate-100 rounded-2xl">
                  <FaVideo className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No videos available yet</p>
                </div>
              )}

              {/* View all videos link */}
              {!mediaLoading && latestVideos.length > 0 && (
                <ScrollReveal delay={0.3}>
                  <Link
                    href="/gallery?tab=videos"
                    className="mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1E3A8A] hover:bg-[#0F172A] transition-all duration-300 text-white font-medium text-sm shadow-md"
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
          SOCIAL PROOF SECTION - Endorsements & Stats
          ========================================== */}
      <SocialProof />

      {/* ==========================================
          CALL TO ACTION SECTION - Premium Dark with Video Background
          ========================================== */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#0F172A] text-white relative overflow-hidden min-h-[600px]">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.youtube.com/embed/BqPibiAzqIk?autoplay=1&mute=1&loop=1&playlist=BqPibiAzqIk&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
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
        
        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent z-10" />
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/30 via-transparent to-[#1E3A8A]/30 z-[2]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              {/* Gold accent line */}
              <div className="w-24 h-1 bg-gradient-to-r from-[#D4A017] to-[#E6C200] mx-auto rounded-full mb-8" />
              
              <h2 className="font-slogan text-4xl md:text-5xl lg:text-6xl mb-6">
                BE PART OF THE <span className="text-[#D4A017]">MOVEMENT</span>
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
                    <div className="text-4xl md:text-5xl font-bold text-[#D4A017]">{stat.value}</div>
                    <div className="text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/join-us"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-[#DC2626] text-white font-bold text-lg hover:bg-[#B91C1C] transition-all duration-300 hover:shadow-xl hover:shadow-red-900/30"
                >
                  <FaHandshake className="w-6 h-6" />
                  Become a Volunteer
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-white text-[#0F172A] font-bold text-lg hover:bg-slate-100 transition-all duration-300"
                >
                  <FaHeart className="w-6 h-6 text-[#DC2626]" />
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
