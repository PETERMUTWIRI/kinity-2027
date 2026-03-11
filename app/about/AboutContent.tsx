'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaFlag,
  FaHandshake,
  FaHeart,
  FaShieldAlt,
  FaGraduationCap,
  FaBriefcase,
} from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

const keyAchievements = [
  {
    icon: FaBriefcase,
    title: 'Public Service',
    description: 'Decades of experience in public service and community development.',
  },
  {
    icon: FaHandshake,
    title: 'Integrity',
    description: 'Unwavering commitment to transparency and accountability.',
  },
  {
    icon: FaHeart,
    title: 'People-First',
    description: 'Dedicated to putting the needs of Kenyans above all else.',
  },
  {
    icon: FaShieldAlt,
    title: 'Anti-Corruption',
    description: 'Zero tolerance for corruption at all levels of government.',
  },
];

export default function AboutContent() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#0074D9] to-[#6B2C91] rounded-3xl opacity-20 blur-2xl" />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#0074D9] to-[#005CB0]">
                  {/* Placeholder for Dr. Kinity portrait */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center text-6xl">
                        👤
                      </div>
                      <p className="text-xl font-semibold">Dr. Isaac Newton Kinity</p>
                      <p className="text-white/70 mt-2">Presidential Candidate 2027</p>
                    </div>
                  </div>
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
            <div className="space-y-8">
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E91D0E]/10 text-[#E91D0E] font-semibold text-sm">
                  <FaFlag className="w-4 h-4" />
                  Meet the Candidate
                </span>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111]">
                  A Leader for <span className="text-[#0074D9]">All Kenyans</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
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
                  <p className="border-l-4 border-[#E91D0E] pl-6 italic text-slate-500">
                    &ldquo;I am committed to the service of Kenyans. No recycling of corrupt politicians. 
                    Together, we will build a Kenya that works for everyone.&rdquo;
                  </p>
                </div>
              </ScrollReveal>

              {/* Key traits */}
              <ScrollReveal delay={0.3}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Integrity', icon: '🛡️' },
                    { label: 'Experience', icon: '💼' },
                    { label: 'Vision', icon: '👁️' },
                    { label: 'Commitment', icon: '🤝' },
                  ].map((trait, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                      <span className="text-2xl">{trait.icon}</span>
                      <span className="font-semibold text-slate-700">{trait.label}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-[#0074D9]/10 text-[#0074D9] font-semibold text-sm mb-4">
                Our Vision
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">
                Building a <span className="text-[#E91D0E]">Better Kenya</span>
              </h2>
              <p className="text-lg text-slate-600">
                Four pillars that will transform Kenya into a nation of prosperity, 
                integrity, and opportunity for all.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Economic Transformation', 
                desc: 'Creating jobs, supporting local businesses, and building a self-reliant economy.',
                color: '#0074D9',
                icon: '💼'
              },
              { 
                title: 'Zero Corruption', 
                desc: 'Uncompromising stance against corruption with transparent governance.',
                color: '#E91D0E',
                icon: '🛡️'
              },
              { 
                title: 'Universal Healthcare', 
                desc: 'Quality healthcare accessible to all Kenyans through improved NHIF.',
                color: '#6B2C91',
                icon: '🏥'
              },
              { 
                title: 'Education Revolution', 
                desc: 'World-class education system with digital learning and STEM focus.',
                color: '#0074D9',
                icon: '🎓'
              },
            ].map((pillar, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow h-full">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ 
                      backgroundColor: `${pillar.color}20`,
                      color: pillar.color 
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <h3 className="font-bold text-xl text-[#111111] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {pillar.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-24 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why <span className="text-[#E91D0E]">Dr. Kinity?</span>
              </h2>
              <p className="text-lg text-white/70">
                A proven track record of service and commitment to the Kenyan people.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyAchievements.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0074D9]/20 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-[#0074D9]" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-[#0074D9] to-[#005CB0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the Movement
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Be part of the change Kenya needs. Together, we can build a nation 
              that works for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/join-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#E91D0E] text-white font-bold text-lg hover:bg-[#BA170C] transition-all"
              >
                <FaHandshake className="w-5 h-5" />
                Volunteer
              </a>
              <a 
                href="/vision-2027"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#0074D9] font-bold text-lg hover:bg-slate-100 transition-all"
              >
                <FaFlag className="w-5 h-5" />
                Read the Vision
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
