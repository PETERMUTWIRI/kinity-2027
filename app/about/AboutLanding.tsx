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
    description: 'The NVP story—born from decades of struggle. From a young union activist\'s defiance to a nationwide movement ready to reclaim Kenya\'s future through sacrifice and service.',
    icon: FaBookOpen,
    href: '/about/our-story',
    color: '#1E3A8A',
    image: '/images/kinity-podium.jpeg',
  },
  {
    id: 'leadership',
    title: 'Leadership',
    description: 'Meet the servant-leaders of the National Vision Party. Explore our party structure, organs, and the presidential candidate leading the charge for a better Kenya.',
    icon: FaUsers,
    href: '/about/leadership',
    color: '#D4A017',
    image: '/images/Dr.png',
  },
  {
    id: 'vision-2027',
    title: 'Vision 2027',
    description: 'Four transformative pillars that will restore Kenya\'s dignity: Economic Transformation, Zero Corruption, Universal Healthcare, and Education Revolution.',
    icon: FaEye,
    href: '/about/vision-2027',
    color: '#1E3A8A',
    image: '/images/rally.jpeg',
  },
  {
    id: 'manifesto',
    title: 'Manifesto',
    description: 'Our detailed policy commitments to the Kenyan people. Specific, measurable actions to eliminate corruption, create jobs, provide healthcare, and transform education.',
    icon: FaFileAlt,
    href: '/about/manifesto',
    color: '#D4A017',
    image: '/images/kinity-street.jpeg',
  },
];

export default function AboutLanding() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Banner background */}
        <div className="absolute inset-0 bg-[url('/baner.jpeg')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-white/85" />
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A017]/10 text-[#D4A017] border border-[#D4A017]/20 font-semibold text-sm mb-6">
                Our Movement
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6">
                Building a <span className="text-[#D4A017]">Better Kenya</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] mx-auto rounded-full mb-6" />
              <p className="text-lg text-slate-600 leading-relaxed">
                We are a movement of Kenyans committed to ending corruption, creating prosperity, 
                and restoring dignity to our nation. Led by Dr. Isaac Newton Kinity, our party represents 
                a new era of leadership—one that puts the people first, always.
              </p>
            </div>
          </ScrollReveal>

          {/* Navigation Cards - Image on Top, Text Below */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section, index) => (
              <ScrollReveal key={section.id} delay={index * 0.1}>
                <Link href={section.href} className="group block h-full">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl hover:border-[#D4A017]/30 transition-all duration-500 h-full flex flex-col"
                  >
                    {/* Image Section - Full width on top */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {/* Icon Badge - Top Left */}
                      <div 
                        className="absolute top-4 left-4 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg z-10"
                        style={{ backgroundColor: section.color }}
                      >
                        <section.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Content Section - Below Image */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Gold accent line */}
                      <div className="w-8 h-0.5 bg-gradient-to-r from-[#D4A017] to-[#E6C200] rounded-full mb-3 opacity-60 group-hover:w-12 transition-all duration-300" />
                      
                      <h2 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#1E3A8A] transition-colors">
                        {section.title}
                      </h2>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                        {section.description}
                      </p>
                      <div className="flex items-center gap-2 font-semibold text-sm text-[#1E3A8A] group-hover:text-[#D4A017] transition-colors">
                        <span>Learn More</span>
                        <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                      </div>
                    </div>
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
                { value: '40+', label: 'Years of Activism', color: '#1E3A8A' },
                { value: '47', label: 'Counties Reached', color: '#D4A017' },
                { value: '4', label: 'Key Pillars', color: '#1E3A8A' },
                { value: '50M+', label: 'Kenyans to Serve', color: '#D4A017' },
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


    </div>
  );
}
