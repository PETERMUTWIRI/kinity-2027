'use client';

import Link from 'next/link';
import { FaArrowLeft, FaFileContract, FaCheckCircle, FaCalendarAlt, FaHandshake, FaHandsHelping, FaSeedling, FaUsers, FaUserShield } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

const commitments = [
  {
    title: 'The 2-Year Corruption Pledge',
    description: 'Dr. Kinity pledges to launch a determined campaign to eliminate corruption within two years. Failure to achieve this goal will compel him to voluntarily resign—a testament to his commitment to accountability.',
    icon: FaFileContract,
    color: '#DC2626',
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
    color: '#1E3A8A',
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
    color: '#1E3A8A',
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
    color: '#1E3A8A',
    points: [
      'Restore completely free primary and secondary education',
      'Integrate digital learning tools in all public schools',
      'Strengthen STEM education (Science, Technology, Engineering, Mathematics)',
      'Build and equip modern schools in underserved areas',
      'Establish vocational training centers in every county',
    ],
  },
  {
    title: 'Social Protection Pledge',
    description: 'A compassionate commitment to widows, orphans, persons with disabilities, and the elderly. No Kenyan will be left behind in a Kinity administration.',
    icon: FaHandsHelping,
    color: '#1E3A8A',
    points: [
      'Monthly stipends for widows, orphans, and elderly citizens without income',
      'Free assistive devices and accessibility infrastructure for persons with disabilities',
      'Mandatory 5% public procurement quota for businesses owned by PWDs',
      'Specialized healthcare and psychosocial support for vulnerable groups',
      'Protection of inheritance rights for widows and orphans',
    ],
  },
  {
    title: 'Agriculture & Food Security Guarantee',
    description: 'Farming is the backbone of Kenya. We will subsidize inputs, expand irrigation, guarantee fair prices, and ban unnecessary food imports.',
    icon: FaSeedling,
    color: '#1E3A8A',
    points: [
      'Subsidized fertilizer, seeds, and farming equipment for smallholder farmers',
      'Nationwide expansion of irrigation schemes to reduce rain dependency',
      'Government guarantee of minimum farm-gate prices for key produce',
      'Ban on unnecessary food imports that undercut local farmers',
      'Climate-smart agriculture training and crop insurance for all farmers',
    ],
  },
  {
    title: 'Youth & Women Empowerment Commitment',
    description: 'Unlocking the potential of our youth and women through affirmative funding, innovation hubs, and equal leadership opportunities.',
    icon: FaUsers,
    color: '#1E3A8A',
    points: [
      'Youth Innovation Hubs in all 47 counties with free internet and mentorship',
      'Affirmative Action Fund of KES 1 billion annually for women entrepreneurs',
      'Mandatory 50% women representation in all public appointments',
      'Paid internship and apprenticeship programs for all university graduates',
      'Zero-interest startup loans for youth and women-led businesses',
    ],
  },
  {
    title: 'Security & National Cohesion Promise',
    description: 'Every Kenyan deserves to feel safe. We will reform the police, end extrajudicial killings, and build a united nation beyond tribal lines.',
    icon: FaUserShield,
    color: '#1E3A8A',
    points: [
      'Comprehensive police reform with independent oversight and better welfare',
      'End to extrajudicial killings and enforced disappearances',
      'Deployment of community policing units in every ward',
      'National Cohesion Curriculum in schools and public institutions',
      'Rapid response units for gender-based violence and child protection',
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
      'Launch Social Protection Fund registration for vulnerable households',
      'Deploy agricultural extension officers to all counties',
      'Open first 10 Youth Innovation Hubs',
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
      'Roll out farmer subsidies and minimum price guarantees',
      'Enact 50% women representation in public appointments',
      'Establish independent police oversight authority',
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
      'Full social protection coverage for widows, orphans, and elderly',
      'Achieve 70% reduction in youth unemployment',
      'Complete police reform and end extrajudicial killings',
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] border border-[#1E3A8A]/20 font-semibold text-sm mb-6">
              Manifesto
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="heading-editorial mb-6">
              Our <span className="heading-accent-gold">Commitment</span> to Kenya
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="hr-gold-wide mx-auto mb-6" />
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Specific, measurable, and actionable policy commitments to transform Kenya into 
              a prosperous, corruption-free nation where every citizen can thrive.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Commitments */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/economic-transformation.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="kicker-pill mb-4">Manifesto</span>
              <h2 className="heading-editorial mb-4">
                Our Key <span className="heading-accent-gold">Commitments</span>
              </h2>
              <div className="hr-gold-wide mx-auto mb-4" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {commitments.map((commitment, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 h-full hover:shadow-xl hover:border-[#1E3A8A]/30 transition-all duration-300">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${commitment.color}15`, color: commitment.color }}
                  >
                    <commitment.icon className="w-7 h-7" />
                  </div>
                  
                  {/* Gold accent line */}
                  <div className="w-10 h-0.5 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] rounded-full mb-4 opacity-60" />
                  
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/education.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="kicker-pill mb-4">Roadmap</span>
              <h2 className="heading-editorial mb-4">
                Implementation <span className="heading-accent-gold">Timeline</span>
              </h2>
              <div className="hr-gold-wide mx-auto mb-4" />
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {timeline.map((phase, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-3">
                    <span 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ 
                        backgroundColor: index === 0 ? '#DC2626' : index === 1 ? '#1E3A8A' : '#1E3A8A' 
                      }}
                    >
                      {index + 1}
                    </span>
                    {phase.period}
                  </h3>
                  <ul className="space-y-3 ml-14">
                    {phase.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#1E3A8A] mt-2 flex-shrink-0" />
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
      <section className="py-16 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/corruption.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            {/* Gold accent line */}
            <div className="w-24 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] mx-auto rounded-full mb-8" />
            
            <FaFileContract className="w-16 h-16 text-[#1E3A8A] mx-auto mb-6" />
            <h2 className="heading-editorial mb-6">
              A Promise Written in <span className="heading-accent-gold">Sacrifice</span>
            </h2>
            <blockquote className="text-2xl text-slate-600 italic mb-8 max-w-3xl mx-auto">
              &ldquo;These are not empty campaign promises. I have already sacrificed my health, 
              faced death, and dedicated 40 years to this cause. I pledge to serve with integrity 
              or resign. This is my commitment to you, the people of Kenya.&rdquo;
            </blockquote>
            <p className="text-slate-500 mb-10">— Dr. Isaac Newton Kinity</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
