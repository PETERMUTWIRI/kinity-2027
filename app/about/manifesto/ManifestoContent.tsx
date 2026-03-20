'use client';

import Link from 'next/link';
import { FaArrowLeft, FaFileContract, FaCheckCircle, FaCalendarAlt, FaHandshake } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

const commitments = [
  {
    title: 'The 2-Year Corruption Pledge',
    description: 'Dr. Kinity pledges to launch a determined campaign to eliminate corruption within two years. Failure to achieve this goal will compel him to voluntarily resign—a testament to his commitment to accountability.',
    icon: FaFileContract,
    color: '#E91D0E',
    points: [
      'Establish independent anti-corruption courts with fast-track prosecutions',
      'Arrest those responsible for looting billions, not just petty thieves',
      'Remove corrupt officials regardless of political friendships',
      'Protect whistleblowers and anti-corruption activists',
      'Public declaration of assets by all government officials',
    ],
  },
  {
    title: 'Economic Transformation Guarantee',
    description: 'A commitment to cut the cost of living by 40% within two years through strategic economic reforms that protect businesses and workers alike.',
    icon: FaCheckCircle,
    color: '#0074D9',
    points: [
      'End unnecessary food imports by boosting local agricultural production',
      'Ensure fair pay for all Kenyan workers, including KDF members',
      'Create 1 million+ jobs through technology and entrepreneurship support',
      'Strengthen local industries and protect private enterprise',
      'End economic repression and political intimidation of businesses',
    ],
  },
  {
    title: 'Universal Healthcare Promise',
    description: 'Every Kenyan deserves access to quality healthcare without financial burden. We will implement universal healthcare through improved NHIF.',
    icon: FaHandshake,
    color: '#6B2C91',
    points: [
      'Universal healthcare coverage for all Kenyans through reformed NHIF',
      'Build and equip modern healthcare facilities in every county',
      'Train and deploy adequate medical professionals nationwide',
      'Eliminate medical fees for essential and emergency care',
      'Ensure availability of essential medicines in all public facilities',
    ],
  },
  {
    title: 'Education Revolution Commitment',
    description: 'Restore completely free education for Kenyan children and revolutionize the system with digital learning and world-class standards.',
    icon: FaCalendarAlt,
    color: '#006600',
    points: [
      'Restore completely free primary and secondary education',
      'Integrate digital learning tools in all public schools',
      'Strengthen STEM education (Science, Technology, Engineering, Mathematics)',
      'Build and equip modern schools in underserved areas',
      'Establish vocational training centers in every county',
    ],
  },
];

const timeline = [
  {
    period: 'First 100 Days',
    actions: [
      'Establish anti-corruption task force with prosecutorial powers',
      'Audit all government contracts and procurement processes',
      'Freeze unnecessary government spending',
      'Launch universal healthcare registration drive',
      'Begin school infrastructure assessment nationwide',
    ],
  },
  {
    period: 'First Year',
    actions: [
      'Prosecute high-level corruption cases',
      'Reduce cost of living by 20%',
      'Deploy healthcare workers to all counties',
      'Distribute free digital learning devices to schools',
      'Create 250,000 new jobs through infrastructure projects',
    ],
  },
  {
    period: 'Second Year',
    actions: [
      'Achieve 40% cost of living reduction',
      'Complete elimination of corruption or voluntary resignation',
      'Universal healthcare fully operational',
      'Free education fully implemented',
      '1 million+ jobs created',
    ],
  },
];

export default function ManifestoContent() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Back Navigation */}
      <div className="fixed top-24 left-4 z-40">
        <Link 
          href="/about"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-slate-600 hover:text-[#0074D9] transition-colors"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Our Party</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#006600]/10 text-[#006600] font-semibold text-sm mb-6">
              Manifesto
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6">
              Our <span className="text-[#E91D0E]">Commitment</span> to Kenya
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Specific, measurable, and actionable policy commitments to transform Kenya into 
              a prosperous, corruption-free nation where every citizen can thrive.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Commitments */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#111111] mb-12">
              Four Key <span className="text-[#0074D9]">Commitments</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {commitments.map((commitment, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 h-full">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${commitment.color}15`, color: commitment.color }}
                  >
                    <commitment.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#111111] mb-4">
                    {commitment.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {commitment.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {commitment.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheckCircle 
                          className="w-5 h-5 flex-shrink-0 mt-0.5" 
                          style={{ color: commitment.color }}
                        />
                        <span className="text-slate-600 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#111111] mb-12">
              Implementation <span className="text-[#0074D9]">Timeline</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            {timeline.map((phase, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-[#111111] mb-4 flex items-center gap-3">
                    <span 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ 
                        backgroundColor: index === 0 ? '#E91D0E' : index === 1 ? '#0074D9' : '#006600' 
                      }}
                    >
                      {index + 1}
                    </span>
                    {phase.period}
                  </h3>
                  <ul className="space-y-3 ml-14">
                    {phase.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#0074D9] mt-2 flex-shrink-0" />
                        <span className="text-slate-600">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Promise */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <FaFileContract className="w-16 h-16 text-[#E91D0E] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              A Promise Written in <span className="text-[#E91D0E]">Sacrifice</span>
            </h2>
            <blockquote className="text-2xl text-white/80 italic mb-8 max-w-3xl mx-auto">
              &ldquo;These are not empty campaign promises. I have already sacrificed my health, 
              faced death, and dedicated 40 years to this cause. I pledge to serve with integrity 
              or resign. This is my commitment to you, the people of Kenya.&rdquo;
            </blockquote>
            <p className="text-white/60 mb-10">— Dr. Isaac Newton Kinity</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/join-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#E91D0E] text-white font-bold hover:bg-[#BA170C] transition-all"
              >
                <FaHandshake className="w-5 h-5" />
                Support This Vision
              </Link>
              <Link 
                href="/support"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#111111] font-bold hover:bg-slate-100 transition-all"
              >
                Donate to Campaign
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
