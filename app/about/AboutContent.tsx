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
  FaChartLine,
  FaUsers,
  FaLandmark,
  FaLeaf,
  FaArrowRight,
  FaCheckCircle,
  FaGlobe,
  FaBalanceScale,
} from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

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

const detailedPillars = [
  {
    id: 'economic-transformation',
    number: '01',
    title: 'Economic Transformation',
    subtitle: 'Creating Jobs & Prosperity for All',
    icon: FaChartLine,
    color: '#0074D9',
    stats: [
      { value: '40%', label: 'Cost of Living Reduction' },
      { value: '1M+', label: 'New Jobs Target' },
      { value: '100%', label: 'Local Business Protection' },
    ],
    content: {
      problem: 'Kenya faces a severe unemployment crisis, particularly among youth. The destruction of businesses, misuse of state power, and hostile economic policies have weakened enterprises and reduced the economy\'s capacity to absorb labor.',
      solution: 'A Kinity administration will cut the cost of living by 40% within two years through strategic economic reforms. We will protect farmers, traders, and investors against extortion and bribery demands by corrupt officials.',
      policies: [
        'End unnecessary food imports by boosting local agricultural production',
        'Ensure fair pay for all Kenyan workers, including KDF members',
        'Strengthen local industries and protect private enterprise',
        'Create 1 million+ jobs through technology and entrepreneurship support',
        'End economic repression and political intimidation of businesses',
        'Reform taxation to be matched with security, fairness, and due process',
      ],
      quote: 'Kenya\'s crisis is not one of scarcity, but of leadership and governance. Weakening businesses weakens the economy. Until enterprise is protected, unemployment will remain high.',
    },
  },
  {
    id: 'zero-corruption',
    number: '02',
    title: 'Zero Corruption',
    subtitle: 'Uncompromising Stance Against Graft',
    icon: FaShieldAlt,
    color: '#E91D0E',
    stats: [
      { value: '2', label: 'Years to Eliminate Corruption' },
      { value: '0', label: 'Tolerance for Graft' },
      { value: '100%', label: 'Accountability Promise' },
    ],
    content: {
      problem: 'Corruption remains the root cause of Kenya\'s challenges—widespread looting of public funds, weak public services, high unemployment, struggling health systems, and rising poverty. Since independence, Kenya has had enough resources, but corrupt leadership has been the only problem.',
      solution: 'Dr. Kinity pledges to launch a determined campaign to eliminate corruption within two years. Failure to achieve this goal will compel him to voluntarily resign—a testament to his commitment to accountability.',
      policies: [
        'Arrest those responsible for looting billions, not just petty thieves',
        'Strict protection and enforcement of the 2010 Constitution',
        'End the recycling of corrupt political leaders',
        'Remove corrupt officials regardless of political friendships',
        'Protect whistleblowers and anti-corruption activists',
        'Establish independent anti-corruption courts with fast-track prosecutions',
      ],
      quote: 'If Kenyans entrust me with this responsibility and reject corrupt leadership during the 2027 elections, I will eradicate corruption within two years. Failure to do so, I will voluntarily resign.',
    },
  },
  {
    id: 'universal-healthcare',
    number: '03',
    title: 'Universal Healthcare',
    subtitle: 'Quality Healthcare Accessible to All',
    icon: FaHeart,
    color: '#6B2C91',
    stats: [
      { value: '100%', label: 'Healthcare Coverage' },
      { value: '47', label: 'Counties with Modern Facilities' },
      { value: '0', label: 'Medical Fees for Essential Care' },
    ],
    content: {
      problem: 'Kenya\'s health system struggles with inadequate facilities, shortage of medical professionals, and high costs that place healthcare out of reach for millions. The NHIF system needs fundamental reform to serve all Kenyans effectively.',
      solution: 'Implement universal healthcare through improved NHIF, ensuring every Kenyan has access to quality medical care without financial burden. Build modern facilities and invest in well-equipped medical professionals across all 47 counties.',
      policies: [
        'Universal healthcare coverage for all Kenyans through reformed NHIF',
        'Build and equip modern healthcare facilities in every county',
        'Train and deploy adequate medical professionals nationwide',
        'Eliminate medical fees for essential and emergency care',
        'Invest in preventive healthcare and public health education',
        'Ensure availability of essential medicines in all public facilities',
      ],
      quote: 'No Kenyan should die because they cannot afford medical care. Healthcare is a right, not a privilege for the wealthy few.',
    },
  },
  {
    id: 'education-revolution',
    number: '04',
    title: 'Education Revolution',
    subtitle: 'World-Class Education for Our Children',
    icon: FaGraduationCap,
    color: '#0074D9',
    stats: [
      { value: '100%', label: 'Free Primary & Secondary' },
      { value: 'STEM', label: 'Curriculum Focus' },
      { value: 'Digital', label: 'Learning Integration' },
    ],
    content: {
      problem: 'Kenya\'s education sector faces difficulties including high costs, inadequate infrastructure, and a curriculum that needs modernization to prepare youth for tomorrow\'s challenges. Many families struggle to afford quality education for their children.',
      solution: 'Restore completely free education for Kenyan children and revolutionize the system with digital learning, STEM focus, and world-class standards that prepare our youth for the opportunities of tomorrow.',
      policies: [
        'Restore completely free primary and secondary education',
        'Integrate digital learning tools in all public schools',
        'Strengthen STEM education (Science, Technology, Engineering, Mathematics)',
        'Build and equip modern schools in underserved areas',
        'Train and fairly compensate teachers nationwide',
        'Establish vocational training centers in every county',
      ],
      quote: 'Education is the foundation of our nation\'s future. Every child, regardless of background, deserves access to world-class education that unlocks their full potential.',
    },
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
                    <div className="text-4xl font-bold text-[#E91D0E]">40+</div>
                    <div className="text-sm text-slate-600">Years of Activism</div>
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
                    <strong>Dr. Isaac Newton Kinity</strong> is a veteran governance activist, former Secretary-General 
                    of the Kenya Civil Servants Union, and counselor with over 40 years of unwavering commitment 
                    to fighting for workers&apos; rights and good governance in Kenya.
                  </p>
                  <p>
                    His journey began at age 20 when he publicly opposed the dissolution of the Kenya Civil Servants 
                    Union by President Daniel arap Moi. This courageous stand placed his life in grave danger—he survived 
                    poisoning on January 7, 1998, and multiple alleged assassination attempts. The poisoning left him 
                    with severe health complications requiring brain surgery and extensive treatment at Yale New Haven 
                    Hospital in Connecticut, USA.
                  </p>
                  <p>
                    Forced into exile, Dr. Kinity continued his advocacy through international platforms including the 
                    International Anti-Corruption Conferences. As Chairperson of the <strong>Kikimo Foundation for 
                    Corruption and Poverty Eradication</strong>, he has consistently argued that corruption, misuse of 
                    state authority, and hostility toward independent businesses undermine growth and widen inequality.
                  </p>
                  <p className="border-l-4 border-[#E91D0E] pl-6 italic text-slate-500">
                    &ldquo;I am committed to the service of Kenyans. No recycling of corrupt politicians. 
                    If entrusted with the presidency, I will eradicate corruption within two years—or voluntarily 
                    resign. Together, we will restore the dignity and prosperity of our nation.&rdquo;
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

      {/* Vision 2027 - Detailed Pillars Section */}
      <section id="vision-2027" className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-[#0074D9]/10 text-[#0074D9] font-semibold text-sm mb-4">
                Vision 2027
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">
                Building a <span className="text-[#E91D0E]">Better Kenya</span>
              </h2>
              <p className="text-lg text-slate-600">
                Four transformative pillars that will restore Kenya&apos;s dignity, eliminate corruption, 
                and create prosperity for all 50 million+ Kenyans across all 47 counties.
              </p>
            </div>
          </ScrollReveal>

          {/* Pillar Navigation */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {detailedPillars.map((pillar) => (
                <a
                  key={pillar.id}
                  href={`#${pillar.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#0074D9] hover:text-[#0074D9] transition-colors text-sm font-medium"
                >
                  <span style={{ color: pillar.color }}>{pillar.number}</span>
                  <span>{pillar.title}</span>
                </a>
              ))}
            </div>
          </ScrollReveal>

          {/* Detailed Pillar Sections */}
          <div className="space-y-24">
            {detailedPillars.map((pillar, index) => (
              <ScrollReveal key={pillar.id}>
                <div id={pillar.id} className="scroll-mt-32">
                  {/* Pillar Header */}
                  <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span 
                          className="text-6xl font-bold opacity-20"
                          style={{ color: pillar.color }}
                        >
                          {pillar.number}
                        </span>
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${pillar.color}20`, color: pillar.color }}
                        >
                          <pillar.icon className="w-7 h-7" />
                        </div>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-[#111111] mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-xl text-slate-500">{pillar.subtitle}</p>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      {pillar.stats.map((stat, i) => (
                        <div key={i} className="text-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                          <div className="text-2xl md:text-3xl font-bold" style={{ color: pillar.color }}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Problem & Solution */}
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h4 className="font-semibold text-[#E91D0E] mb-3 flex items-center gap-2">
                          <FaBalanceScale className="w-4 h-4" />
                          The Challenge
                        </h4>
                        <p className="text-slate-600 leading-relaxed">{pillar.content.problem}</p>
                      </div>
                      
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h4 className="font-semibold text-[#0074D9] mb-3 flex items-center gap-2">
                          <FaCheckCircle className="w-4 h-4" />
                          Our Solution
                        </h4>
                        <p className="text-slate-600 leading-relaxed">{pillar.content.solution}</p>
                      </div>
                    </div>

                    {/* Policy Points */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                      <h4 className="font-semibold text-[#111111] mb-4 flex items-center gap-2">
                        <FaLandmark className="w-4 h-4" />
                        Key Policy Actions
                      </h4>
                      <ul className="space-y-3">
                        {pillar.content.policies.map((policy, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div 
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ backgroundColor: `${pillar.color}20` }}
                            >
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pillar.color }} />
                            </div>
                            <span className="text-slate-600 text-sm">{policy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl border-l-4" style={{ borderLeftColor: pillar.color }}>
                    <p className="text-slate-700 italic text-lg leading-relaxed">
                      &ldquo;{pillar.content.quote}&rdquo;
                    </p>
                    <p className="text-sm text-slate-500 mt-3">— Dr. Isaac Newton Kinity</p>
                  </div>

                  {/* Divider */}
                  {index < detailedPillars.length - 1 && (
                    <div className="mt-16 border-b border-slate-200" />
                  )}
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
                A proven track record of sacrifice, courage, and unwavering commitment to the Kenyan people.
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

          {/* Additional Highlights */}
          <ScrollReveal delay={0.4}>
            <div className="mt-16 grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <FaGlobe className="w-8 h-8 text-[#0074D9] mb-4" />
                <h3 className="text-xl font-bold mb-3">International Advocacy</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  While in exile, Dr. Kinity traveled widely advocating for political reform and good governance 
                  in Kenya through international forums including the International Anti-Corruption Conferences. 
                  He has spoken at Yale University and other international platforms.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <FaUsers className="w-8 h-8 text-[#E91D0E] mb-4" />
                <h3 className="text-xl font-bold mb-3">The People&apos;s Choice</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Dr. Kinity&apos;s decision to run followed more than two and a half years of appeals from Kenyan 
                  youths, elderly citizens, and groups across all 47 counties urging him to offer leadership. 
                  This grassroots call represents a desire for reform and accountable leadership.
                </p>
              </div>
            </div>
          </ScrollReveal>
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
              Be part of the change Kenya needs. Together, we can eliminate corruption, 
              create prosperity, and build a nation that works for everyone across all 47 counties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/join-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#E91D0E] text-white font-bold text-lg hover:bg-[#BA170C] transition-all"
              >
                <FaHandshake className="w-5 h-5" />
                Become a Volunteer
              </Link>
              <Link 
                href="/our-story"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#0074D9] font-bold text-lg hover:bg-slate-100 transition-all"
              >
                <FaArrowRight className="w-5 h-5" />
                Read Full Story
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
