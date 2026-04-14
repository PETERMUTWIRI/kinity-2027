'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaHeart, FaGlobe, FaUniversity } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

const timeline = [
  {
    year: '1980s',
    title: 'Early Activism Begins',
    description: 'At age 20, Dr. Kinity began his activism by opposing the dissolution of the Kenya Civil Servants Union by President Daniel arap Moi.',
    icon: FaCalendarAlt,
  },
  {
    year: '1998',
    title: 'The Poisoning Incident',
    description: 'On January 7, 1998, Dr. Kinity was poisoned for his outspoken opposition to the regime. This led to brain surgery and partial paralysis.',
    icon: FaHeart,
    highlight: true,
  },
  {
    year: '1998-2000s',
    title: 'Treatment & Exile',
    description: 'Received extensive treatment at Yale New Haven Hospital in Connecticut. Forced into exile but never stopped advocating for Kenya.',
    icon: FaUniversity,
  },
  {
    year: '2000s-2020s',
    title: 'International Advocacy',
    description: 'Spoke at International Anti-Corruption Conferences worldwide as Chairperson of the Kikimo Foundation for Corruption and Poverty Eradication.',
    icon: FaGlobe,
  },
  {
    year: '2024',
    title: 'The People\'s Call',
    description: 'After 2.5 years of appeals from Kenyans across all 47 counties, Dr. Kinity answered the call to run for President in 2027.',
    icon: FaMapMarkerAlt,
    highlight: true,
  },
];

export default function OurStoryContent() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Back Navigation */}
      <div className="fixed top-24 left-4 z-40">
        <Link 
          href="/about"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-slate-600 hover:text-[#1E3A8A] transition-colors"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Our Movement</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] font-semibold text-sm mb-6">
              Our Story
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6">
              A Journey of <span className="text-[#D4A017]">Sacrifice</span> & Service
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] mx-auto rounded-full mb-6" />
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              The remarkable story of Dr. Isaac Newton Kinity—a man who has dedicated over 40 years 
              to fighting for Kenya&apos;s workers and good governance, surviving assassination attempts, 
              and never backing down from the truth.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Image & Quote */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] rounded-3xl opacity-20 blur-2xl" />
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/president.jpeg"
                    alt="Dr. Isaac Newton Kinity"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <blockquote className="text-2xl md:text-3xl font-medium text-[#0F172A] leading-relaxed border-l-4 border-[#D4A017] pl-6">
                  &ldquo;I am committed to the service of Kenyans. No recycling of corrupt politicians. 
                  If entrusted with the presidency, I will eradicate corruption within two years—or 
                  voluntarily resign.&rdquo;
                </blockquote>
                <p className="text-slate-500 pl-6">— Dr. Isaac Newton Kinity</p>

                <div className="pt-6 space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Dr. Isaac Newton Kinity</strong> is a veteran governance activist, former 
                    Secretary-General of the Kenya Civil Servants Union, and counselor with over 40 years 
                    of unwavering commitment to fighting for workers&apos; rights and good governance in Kenya.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    As Chairperson of the <strong>Kikimo Foundation for Corruption and Poverty Eradication</strong>, 
                    he has consistently argued that corruption, misuse of state authority, and hostility 
                    toward independent businesses undermine growth and widen inequality.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0F172A] mb-12">
              Timeline of a <span className="text-[#D4A017]">Life of Service</span>
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1E3A8A] via-[#D4A017] to-[#1E3A8A]" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className={`relative pl-20 ${item.highlight ? 'scale-105' : ''}`}>
                    {/* Icon */}
                    <div className={`absolute left-4 w-8 h-8 rounded-full flex items-center justify-center ${item.highlight ? 'bg-[#D4A017]' : 'bg-white border-2 border-[#1E3A8A]'}`}>
                      <item.icon className={`w-4 h-4 ${item.highlight ? 'text-white' : 'text-[#1E3A8A]'}`} />
                    </div>

                    {/* Content */}
                    <div className={`p-6 rounded-2xl ${item.highlight ? 'bg-[#D4A017]/5 border border-[#D4A017]/20' : 'bg-white border border-slate-100'}`}>
                      <span className={`text-sm font-bold ${item.highlight ? 'text-[#D4A017]' : 'text-[#1E3A8A]'}`}>
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-[#0F172A] mt-1 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
