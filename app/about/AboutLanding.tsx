'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaArrowRight,
  FaBookOpen,
  FaUsers,
  FaEye,
  FaFileAlt,
} from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

const sections = [
  {
    id: 'our-story',
    title: 'Our Story',
    description: 'The remarkable journey of Dr. Isaac Newton Kinity—from a 20-year-old union activist opposing the Moi regime to surviving poisoning and assassination attempts, to becoming Kenya\'s hope for 2027.',
    icon: FaBookOpen,
    href: '/about/our-story',
    color: '#0074D9',
    image: '/images/president.jpeg',
  },
  {
    id: 'leadership',
    title: 'Leadership',
    description: 'Meet the man behind the movement. Discover the four pillars that define Dr. Kinity\'s leadership: Integrity, Experience, Vision, and Commitment forged over 40+ years of sacrifice.',
    icon: FaUsers,
    href: '/about/leadership',
    color: '#E91D0E',
    image: '/images/kinity-connection.jpeg',
  },
  {
    id: 'vision-2027',
    title: 'Vision 2027',
    description: 'Four transformative pillars that will restore Kenya\'s dignity: Economic Transformation, Zero Corruption, Universal Healthcare, and Education Revolution.',
    icon: FaEye,
    href: '/about/vision-2027',
    color: '#6B2C91',
    image: '/images/rally.jpeg',
  },
  {
    id: 'manifesto',
    title: 'Manifesto',
    description: 'Our detailed policy commitments to the Kenyan people. Specific, measurable actions to eliminate corruption, create jobs, provide healthcare, and transform education.',
    icon: FaFileAlt,
    href: '/about/manifesto',
    color: '#006600',
    image: '/images/kinity-1.jpeg',
  },
];

export default function AboutLanding() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0074D9]/10 text-[#0074D9] font-semibold text-sm mb-6">
                Our Party
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6">
                Building a <span className="text-[#E91D0E]">Better Kenya</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                The National Vision Party is a movement of Kenyans committed to ending corruption, 
                creating prosperity, and restoring dignity to our nation. Led by Dr. Isaac Newton Kinity, 
                we represent a new era of leadership—one that puts the people first, always.
              </p>
            </div>
          </ScrollReveal>

          {/* Navigation Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <ScrollReveal key={section.id} delay={index * 0.1}>
                <Link href={section.href} className="group block">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="relative bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Icon Badge */}
                      <div 
                        className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: section.color }}
                      >
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-[#111111] mb-3 group-hover:text-[#0074D9] transition-colors">
                        {section.title}
                      </h2>
                      <p className="text-slate-600 mb-4 line-clamp-3">
                        {section.description}
                      </p>
                      <div className="flex items-center gap-2 font-semibold" style={{ color: section.color }}>
                        <span>Learn More</span>
                        <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div 
                      className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-opacity-100 transition-all duration-300 pointer-events-none"
                      style={{ borderColor: section.color }}
                    />
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '40+', label: 'Years of Activism', color: '#0074D9' },
                { value: '47', label: 'Counties Reached', color: '#E91D0E' },
                { value: '4', label: 'Key Pillars', color: '#6B2C91' },
                { value: '50M+', label: 'Kenyans to Serve', color: '#006600' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Be Part of the Change?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of Kenyans who believe in a corruption-free, prosperous nation. 
              Your voice matters in the 2027 elections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/join-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#E91D0E] text-white font-bold hover:bg-[#BA170C] transition-all"
              >
                Join the Movement
              </Link>
              <Link 
                href="/about/our-story"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#111111] font-bold hover:bg-slate-100 transition-all"
              >
                Read Our Story
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
