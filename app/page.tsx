'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
} from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

// ==========================================
// KIKIMO FOUNDATION - HOMEPAGE
// The Movement Begins
// ==========================================

// Client-side rendered page

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
const latestPosts: any[] = [];

export default function HomePage() {

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
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[3/4] max-w-md mx-auto">
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
          LATEST NEWS SECTION
          ========================================== */}
      <section className="section-padding bg-white">
        <div className="container-presidential">
          {/* Section Header */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-[#6B2C91]/10 text-[#6B2C91] font-semibold text-sm mb-4">
                  On The Ground
                </span>
                <h2 className="font-headline text-4xl md:text-5xl text-[#111111]">
                  Latest <span className="text-[#0074D9]">Updates</span>
                </h2>
              </div>
              <Link
                href="/on-the-ground"
                className="inline-flex items-center gap-2 text-[#0074D9] font-semibold hover:text-[#005CB0] transition-colors"
              >
                View All News
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.length > 0 ? (
              latestPosts.map((post, index) => (
                <ScrollReveal key={post.id} delay={index * 0.1}>
                  <Link href={`/on-the-ground/${post.slug}`} className="group">
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
              // Fallback content
              <>
                {[
                  { 
                    title: 'Historic Rally Draws Thousands in Nairobi',
                    category: 'Event Recap',
                    date: 'March 10, 2025',
                    excerpt: 'Dr. Kinity addresses a massive crowd at Uhuru Park, outlining his vision for economic transformation and zero tolerance for corruption.'
                  },
                  { 
                    title: 'Meeting with County Leaders',
                    category: 'News',
                    date: 'March 8, 2025',
                    excerpt: 'Productive discussions with governors and county officials on devolution and resource allocation to grassroots communities.'
                  },
                  { 
                    title: 'Youth Employment Initiative Launched',
                    category: 'Policy',
                    date: 'March 5, 2025',
                    excerpt: 'New program aims to create 1 million jobs for young Kenyans through technology and entrepreneurship support.'
                  },
                ].map((news, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <Link href="/on-the-ground" className="group">
                      <article className="card-presidential overflow-hidden h-full">
                        <div className="relative aspect-video overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-[#0074D9] to-[#6B2C91] flex items-center justify-center">
                            <FaNewspaper className="w-12 h-12 text-white/50" />
                          </div>
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full bg-[#E91D0E] text-white text-xs font-bold">
                              {news.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-sm text-slate-500 mb-2">{news.date}</p>
                          <h3 className="font-headline text-xl text-[#111111] mb-3 group-hover:text-[#0074D9] transition-colors">
                            {news.title}
                          </h3>
                          <p className="text-slate-600 text-sm">{news.excerpt}</p>
                        </div>
                      </article>
                    </Link>
                  </ScrollReveal>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          UPCOMING EVENTS SECTION
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
                  Upcoming
                </span>
                <h2 className="font-headline text-4xl md:text-5xl">
                  Join Us <span className="text-white/80">On The Trail</span>
                </h2>
              </div>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-white font-semibold hover:text-white/80 transition-colors"
              >
                View All Events
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Events List */}
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <ScrollReveal key={event.id} delay={index * 0.1}>
                  <Link href={`/events/${event.slug}`} className="group">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Date */}
                        <div className="flex-shrink-0 text-center md:text-left">
                          <div className="inline-flex md:flex-col items-center md:items-start gap-2 md:gap-0">
                            <span className="text-3xl md:text-4xl font-bold text-[#E91D0E]">
                              {new Date(event.startDate).getDate()}
                            </span>
                            <span className="text-lg md:text-sm text-white/80 uppercase">
                              {new Date(event.startDate).toLocaleDateString('en-KE', { month: 'short' })}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 rounded-full bg-[#E91D0E] text-white text-xs font-bold">
                              {event.category}
                            </span>
                            <span className="text-white/60 text-sm flex items-center gap-1">
                              <FaCalendarAlt className="w-3 h-3" />
                              {event.county || event.location}
                            </span>
                          </div>
                          <h3 className="font-headline text-xl md:text-2xl group-hover:text-white/90 transition-colors">
                            {event.title}
                          </h3>
                          {event.venue && (
                            <p className="text-white/70 text-sm mt-1">{event.venue}</p>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0074D9] font-semibold group-hover:bg-[#E91D0E] group-hover:text-white transition-all duration-300">
                            RSVP
                            <FaArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))
            ) : (
              // Fallback content
              <>
                {[
                  { 
                    title: 'Nairobi County Rally', 
                    date: '2025-03-15', 
                    county: 'Nairobi',
                    category: 'Rally',
                    venue: 'Uhuru Park'
                  },
                  { 
                    title: 'Central Region Town Hall', 
                    date: '2025-03-22', 
                    county: 'Kiambu',
                    category: 'Town Hall',
                    venue: 'Kiambu Stadium'
                  },
                  { 
                    title: 'Western Kenya Campaign Launch', 
                    date: '2025-03-29', 
                    county: 'Kakamega',
                    category: 'Campaign Launch',
                    venue: 'Bukhungu Stadium'
                  },
                ].map((event, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <Link href="/events" className="group">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                          <div className="flex-shrink-0 text-center md:text-left">
                            <div className="inline-flex md:flex-col items-center md:items-start gap-2 md:gap-0">
                              <span className="text-3xl md:text-4xl font-bold text-[#E91D0E]">
                                {new Date(event.date).getDate()}
                              </span>
                              <span className="text-lg md:text-sm text-white/80 uppercase">
                                {new Date(event.date).toLocaleDateString('en-KE', { month: 'short' })}
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-3 py-1 rounded-full bg-[#E91D0E] text-white text-xs font-bold">
                                {event.category}
                              </span>
                              <span className="text-white/60 text-sm flex items-center gap-1">
                                <FaCalendarAlt className="w-3 h-3" />
                                {event.county}
                              </span>
                            </div>
                            <h3 className="font-headline text-xl md:text-2xl">{event.title}</h3>
                            <p className="text-white/70 text-sm mt-1">{event.venue}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0074D9] font-semibold group-hover:bg-[#E91D0E] group-hover:text-white transition-all duration-300">
                              RSVP
                              <FaArrowRight className="w-4 h-4" />
                            </span>
                          </div>
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
          CALL TO ACTION SECTION
          ========================================== */}
      <section className="section-padding bg-[#111111] text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0074D9]/10 rounded-full blur-3xl" />
        </div>

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
