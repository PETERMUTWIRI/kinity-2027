'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaBriefcase, FaHandshake, FaHeart, FaShieldAlt, FaCheckCircle, FaGlobe, FaAward } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

const keyAchievements = [
  {
    icon: FaBriefcase,
    title: '40+ Years',
    description: 'Of unwavering activism fighting for workers\' rights and good governance since age 20.',
  },
  {
    icon: FaHandshake,
    title: 'Union Leadership',
    description: 'Former Secretary-General of Kenya Civil Servants Union, defending public servants.',
  },
  {
    icon: FaHeart,
    title: 'Survivor',
    description: 'Survived poisoning and assassination attempts for standing against corruption.',
  },
  {
    icon: FaShieldAlt,
    title: 'Zero Tolerance',
    description: 'Pledged to eliminate corruption within 2 years or voluntarily resign.',
  },
];

const traits = [
  {
    id: 'integrity',
    title: 'Integrity',
    description: 'Uncompromising moral principles',
    content: 'Dr. Kinity has demonstrated unwavering integrity throughout his 40+ years of public service. Even when his life was in danger, he refused to compromise on his principles. He has consistently spoken truth to power, calling out corruption regardless of who was in office—from the Moi era to the current administration.',
    highlights: [
      'Refused to bow to political pressure during the Moi era',
      'Consistently criticized corruption across all administrations',
      'Pledged to resign if corruption is not eliminated in 2 years',
      'Never compromised on workers\' rights and fair treatment',
    ],
  },
  {
    id: 'experience',
    title: 'Experience',
    description: 'Decades of hands-on leadership',
    content: 'With over four decades of activism, union leadership, and governance advocacy, Dr. Kinity brings unparalleled experience. He has fought for workers at the grassroots level, represented Kenya at international forums, and survived the darkest periods of political oppression.',
    highlights: [
      'Led Kenya Civil Servants Union as Secretary-General',
      'Advocated at International Anti-Corruption Conferences',
      'Traveled worldwide promoting good governance for Kenya',
      'Survived assassination attempts and continued the fight',
    ],
  },
  {
    id: 'vision',
    title: 'Vision',
    description: 'Clear roadmap for Kenya\'s future',
    content: 'Dr. Kinity\'s vision is built on four transformative pillars: Economic Transformation, Zero Corruption, Universal Healthcare, and Education Revolution. This is not empty rhetoric—each pillar has specific, measurable targets and actionable policies to restore Kenya\'s dignity.',
    highlights: [
      '40% cost of living reduction within 2 years',
      'Elimination of corruption or voluntary resignation',
      'Universal healthcare coverage for all Kenyans',
      'World-class free education with STEM and digital focus',
    ],
  },
  {
    id: 'commitment',
    title: 'Commitment',
    description: 'Sacrifice for the Kenyan people',
    content: 'Dr. Kinity\'s commitment to Kenya is not just words—it is written in sacrifice. He has been poisoned, survived brain surgery, lived in exile, and continued fighting for Kenyans for over 40 years. His commitment is to serve or die trying, never to enrich himself.',
    highlights: [
      'Poisoned in 1998 for opposing the Moi regime',
      'Endured brain surgery and partial paralysis',
      'Lived in exile but never stopped advocating for Kenya',
      'Called to run by the people, not political machinery',
    ],
  },
];

export default function CandidateContent() {
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
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A017]/10 text-[#D4A017] border border-[#D4A017]/20 font-semibold text-sm mb-6">
              Presidential Candidate
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6">
              Dr. Isaac Newton <span className="text-[#D4A017]">Kinity</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] mx-auto rounded-full mb-6" />
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Flagbearer of the National Vision Party. A proven track record of sacrifice, courage, 
              and unwavering commitment to the Kenyan people. Four pillars define exceptional leadership for Kenya&apos;s future.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Achievements Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-[#0F172A] mb-12">
              Key <span className="text-[#D4A017]">Achievements</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyAchievements.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-[#D4A017]/50 hover:shadow-md transition-all">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-[#1E3A8A]" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-[#0F172A]">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Four Pillars of Leadership */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                The Four <span className="text-[#D4A017]">Pillars</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] mx-auto rounded-full mb-4" />
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                These core principles have guided Dr. Kinity throughout his 40+ years of service to Kenya.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-16">
            {traits.map((trait, index) => (
              <ScrollReveal key={trait.id} delay={index * 0.1}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A017]/10 text-[#D4A017] border border-[#D4A017]/20 font-semibold text-sm mb-4">
                      <FaAward className="w-4 h-4" />
                      {trait.title}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">{trait.description}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{trait.content}</p>
                    <ul className="space-y-2">
                      {trait.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <FaCheckCircle className="w-4 h-4 text-[#D4A017] flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`bg-slate-50 rounded-2xl p-8 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="grid grid-cols-2 gap-4">
                      {trait.highlights.map((highlight, i) => (
                        <div key={i} className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-8 h-8 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center mb-2">
                            <span className="text-[#1E3A8A] font-bold text-sm">{i + 1}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-tight">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {index < traits.length - 1 && <div className="mt-16 border-b border-slate-200" />}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* International Advocacy Section */}
      <section className="py-16 bg-[#0F172A] text-white relative overflow-hidden">
        {/* Subtle Kenyan flag hint at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex opacity-30">
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-[#DC2626]" />
          <div className="flex-1 bg-[#006600]" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                {/* Gold accent line */}
                <div className="w-16 h-1 bg-gradient-to-r from-[#D4A017] to-[#E6C200] rounded-full" />
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A8A]/20 text-[#D4A017] font-semibold text-sm">
                  <FaGlobe className="w-4 h-4" />
                  Global Impact
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  International <span className="text-[#D4A017]">Advocacy</span>
                </h2>
                <p className="text-white/70 leading-relaxed">
                  While in exile, Dr. Kinity transformed his personal tragedy into a global mission. 
                  He traveled to numerous countries, speaking at prestigious institutions and international 
                  forums to shine a light on Kenya&apos;s governance challenges.
                </p>
                <div className="space-y-4">
                  {[
                    'Yale University Medical Treatment',
                    'International Anti-Corruption Conferences',
                    'Trade Union Advocacy Worldwide',
                    'Kikimo Foundation Leadership',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FaCheckCircle className="w-5 h-5 text-[#D4A017]" />
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] rounded-3xl opacity-20 blur-2xl" />
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                  <Image
                    src="/images/kinity-connection.jpeg"
                    alt="Dr. Kinity connecting with people"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
