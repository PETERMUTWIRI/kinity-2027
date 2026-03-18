'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

// ==========================================
// SOCIAL PROOF / ENDORSEMENTS SECTION
// Builds credibility and trust
// ==========================================

const endorsements = [
  {
    name: "Kenya Association of Manufacturers",
    role: "Industry Body",
    quote: "Dr. Kinity's economic transformation plan addresses the real challenges facing Kenyan businesses.",
    logo: "KAM",
  },
  {
    name: "Youth Empowerment Alliance",
    role: "Civil Society",
    quote: "A leader who truly understands the aspirations of Kenya's youth. His education revolution will change lives.",
    logo: "YEA",
  },
  {
    name: "Healthcare Workers Union",
    role: "Professional Association",
    quote: "His universal healthcare vision prioritizes both patients and healthcare professionals.",
    logo: "HWU",
  },
];

const stats = [
  { value: "50K+", label: "Registered Volunteers", suffix: "" },
  { value: "47", label: "Counties Covered", suffix: "" },
  { value: "200+", label: "Community Events", suffix: "" },
  { value: "5M+", label: "Social Reach", suffix: "" },
];

export default function SocialProof() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0074D9]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E91D0E]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0074D9]/10 text-[#0074D9] font-semibold text-sm mb-4">
              Growing Movement
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-[#111111] mb-4">
              Trusted by <span className="text-[#E91D0E]">Thousands</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From grassroots volunteers to industry leaders, Kenyans from all walks of life are joining the movement.
            </p>
          </div>
        </ScrollReveal>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <motion.div
                className="text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-100"
                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#0074D9] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Endorsements */}
        <div className="grid md:grid-cols-3 gap-8">
          {endorsements.map((item, index) => (
            <ScrollReveal key={item.name} delay={index * 0.15}>
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 h-full"
                whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Quote icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0074D9] to-[#6B2C91] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>

                {/* Quote text */}
                <p className="text-slate-700 mb-6 leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0074D9]/20 to-[#6B2C91]/20 flex items-center justify-center">
                    <span className="text-[#0074D9] font-bold text-sm">{item.logo}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#111111]">{item.name}</div>
                    <div className="text-sm text-slate-500">{item.role}</div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust badges */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 pt-12 border-t border-slate-200">
            <p className="text-center text-slate-500 text-sm mb-6">ENDORSED BY LEADERS ACROSS KENYA</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
              {['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'].map((city) => (
                <div key={city} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0074D9]" />
                  <span className="font-medium text-slate-600">{city} Chapter</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
