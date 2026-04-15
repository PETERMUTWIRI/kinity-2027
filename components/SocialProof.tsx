'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

// ==========================================
// SOCIAL PROOF / ENDORSEMENTS SECTION
// Premium design with gold accents
// ==========================================

const endorsements = [
  {
    name: "Kenya Association of Manufacturers",
    role: "Industry Body",
    quote: "The National Vision Party's economic transformation plan addresses the real challenges facing Kenyan businesses.",
    logo: "KAM",
  },
  {
    name: "Youth Empowerment Alliance",
    role: "Civil Society",
    quote: "A movement that truly understands the aspirations of Kenya's youth. This education revolution will change lives.",
    logo: "YEA",
  },
  {
    name: "Healthcare Workers Union",
    role: "Professional Association",
    quote: "The party's universal healthcare vision prioritizes both patients and healthcare professionals.",
    logo: "HWU",
  },
];

export default function SocialProof() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Banner background */}
      <div className="absolute inset-0 bg-[url('/baner.jpeg')] bg-cover bg-center bg-no-repeat" />
      {/* White overlay */}
      <div className="absolute inset-0 bg-white/87" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl text-[#0F172A] mb-4">
              Voices of <span className="text-[#D4A017]">Support</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] mx-auto rounded-full mb-4" />
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Leaders and organizations across Kenya share their perspectives on the National Vision Party&apos;s vision for our nation.
            </p>
          </div>
        </ScrollReveal>

        {/* Endorsements */}
        <div className="grid md:grid-cols-3 gap-8">
          {endorsements.map((item, index) => (
            <ScrollReveal key={item.name} delay={index * 0.15}>
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#1E3A8A] h-full"
                whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Quote icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] flex items-center justify-center mb-4">
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
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E3A8A]/20 to-[#D4A017]/20 flex items-center justify-center border border-[#D4A017]/30">
                    <span className="text-[#1E3A8A] font-bold text-sm">{item.logo}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#0F172A]">{item.name}</div>
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
                  <div className="w-2 h-2 rounded-full bg-[#D4A017]" />
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
