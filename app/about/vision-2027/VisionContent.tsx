'use client';

import Link from 'next/link';
import { FaArrowLeft, FaChartLine, FaShieldAlt, FaHeart, FaGraduationCap, FaCheckCircle, FaBalanceScale, FaLandmark, FaHandsHelping, FaSeedling, FaUsers, FaUserShield } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

const pillars = [
  {
    id: 'economic-transformation',
    number: '01',
    title: 'Economic Transformation',
    subtitle: 'Creating Jobs & Prosperity for All',
    icon: FaChartLine,
    image: '/images/vission/economic-transformation.png',
    color: '#1E3A8A',
    stats: [
      { value: '40%', label: 'Cost of Living Reduction' },
      { value: '1M+', label: 'New Jobs Target' },
      { value: '100%', label: 'Local Business Protection' },
    ],
    problem: 'Kenya faces a severe unemployment crisis, particularly among youth. The destruction of businesses, misuse of state power, and hostile economic policies have weakened enterprises.',
    solution: 'A Kinity administration will cut the cost of living by 40% within two years through strategic economic reforms. We will protect farmers, traders, and investors against extortion.',
    policies: [
      'End unnecessary food imports by boosting local agricultural production',
      'Ensure fair pay for all Kenyan workers, including KDF members',
      'Strengthen local industries and protect private enterprise',
      'Create 1 million+ jobs through technology and entrepreneurship',
      'End economic repression and political intimidation of businesses',
      'Reform taxation to be matched with security and fairness',
    ],
    quote: 'Kenya\'s crisis is not one of scarcity, but of leadership and governance. Weakening businesses weakens the economy.',
  },
  {
    id: 'zero-corruption',
    number: '02',
    title: 'Zero Corruption',
    subtitle: 'Uncompromising Stance Against Graft',
    icon: FaShieldAlt,
    image: '/images/vission/corruption.png',
    color: '#D4A017',
    stats: [
      { value: '2', label: 'Years to Eliminate Corruption' },
      { value: '0', label: 'Tolerance for Graft' },
      { value: '100%', label: 'Accountability Promise' },
    ],
    problem: 'Corruption remains the root cause of Kenya\'s challenges—widespread looting of public funds, weak public services, high unemployment, and rising poverty.',
    solution: 'Dr. Kinity pledges to launch a determined campaign to eliminate corruption within two years. Failure to achieve this goal will compel him to voluntarily resign.',
    policies: [
      'Arrest those responsible for looting billions, not just petty thieves',
      'Strict protection and enforcement of the 2010 Constitution',
      'End the recycling of corrupt political leaders',
      'Remove corrupt officials regardless of political friendships',
      'Protect whistleblowers and anti-corruption activists',
      'Establish independent anti-corruption courts with fast-track prosecutions',
    ],
    quote: 'If Kenyans entrust me with this responsibility, I will eradicate corruption within two years. Failure to do so, I will voluntarily resign.',
  },
  {
    id: 'universal-healthcare',
    number: '03',
    title: 'Universal Healthcare',
    subtitle: 'Quality Healthcare Accessible to All',
    icon: FaHeart,
    image: '/images/vission/healthcare.png',
    color: '#1E3A8A',
    stats: [
      { value: '100%', label: 'Healthcare Coverage' },
      { value: '47', label: 'Counties with Modern Facilities' },
      { value: '0', label: 'Medical Fees for Essential Care' },
    ],
    problem: 'Kenya\'s health system struggles with inadequate facilities, shortage of medical professionals, and high costs that place healthcare out of reach for millions.',
    solution: 'Implement universal healthcare through improved NHIF, ensuring every Kenyan has access to quality medical care without financial burden.',
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
  {
    id: 'education-revolution',
    number: '04',
    title: 'Education Revolution',
    subtitle: 'World-Class Education for Our Children',
    icon: FaGraduationCap,
    image: '/images/vission/education.png',
    color: '#D4A017',
    stats: [
      { value: '100%', label: 'Free Primary & Secondary' },
      { value: 'STEM', label: 'Curriculum Focus' },
      { value: 'Digital', label: 'Learning Integration' },
    ],
    problem: 'Kenya\'s education sector faces difficulties including high costs, inadequate infrastructure, and a curriculum that needs modernization.',
    solution: 'Restore completely free education for Kenyan children and revolutionize the system with digital learning, STEM focus, and world-class standards.',
    policies: [
      'Restore completely free primary and secondary education',
      'Integrate digital learning tools in all public schools',
      'Strengthen STEM education (Science, Technology, Engineering, Mathematics)',
      'Build and equip modern schools in underserved areas',
      'Train and fairly compensate teachers nationwide',
      'Establish vocational training centers in every county',
    ],
    quote: 'Education is the foundation of our nation\'s future. Every child deserves access to world-class education that unlocks their full potential.',
  },
  {
    id: 'social-protection',
    number: '05',
    title: 'Social Protection & Inclusion',
    subtitle: 'Dignity for Widows, Orphans, PWDs & the Elderly',
    icon: FaHandsHelping,
    image: '/images/vission/social-protection.png',
    color: '#D4A017',
    stats: [
      { value: '100%', label: 'Disability Rights Coverage' },
      { value: '0', label: 'Tolerance for Discrimination' },
      { value: '50K+', label: 'Widows Supported' },
    ],
    problem: 'Kenya\'s most vulnerable citizens—widows, orphans, persons with disabilities, and the elderly—often face systemic neglect, discrimination, and lack of access to basic services and economic opportunities.',
    solution: 'We will establish a comprehensive Social Protection Fund that guarantees monthly support for widows, orphans, and the elderly, while enforcing disability rights and creating inclusive economic opportunities.',
    policies: [
      'Monthly stipends for widows, orphans, and elderly citizens without income',
      'Free assistive devices and accessibility infrastructure for persons with disabilities',
      'Mandatory 5% public procurement quota for businesses owned by PWDs',
      'Specialized healthcare and psychosocial support for vulnerable groups',
      'Protection of inheritance rights for widows and orphans',
      'Integration of sign language and braille in all public service delivery',
    ],
    quote: 'A nation is judged by how it treats its most vulnerable. Every widow, orphan, and person with disability deserves dignity, care, and opportunity.',
  },
  {
    id: 'agriculture-food-security',
    number: '06',
    title: 'Agriculture & Food Security',
    subtitle: 'Farming First, Hunger Never',
    icon: FaSeedling,
    image: '/images/vission/agriculture-food-security.png',
    color: '#1E3A8A',
    stats: [
      { value: '40%', label: 'Cost of Living Cut' },
      { value: '100%', label: 'Food Self-Sufficiency' },
      { value: '2M', label: 'Farmers Supported' },
    ],
    problem: 'Kenyan farmers struggle with high input costs, unpredictable markets, climate shocks, and unfair competition from cheap imports, leaving millions food insecure.',
    solution: 'We will prioritize agriculture as the backbone of our economy through subsidized inputs, modern irrigation, guaranteed minimum prices, and strict protection against unnecessary food imports.',
    policies: [
      'Subsidized fertilizer, seeds, and farming equipment for smallholder farmers',
      'Nationwide expansion of irrigation schemes to reduce rain dependency',
      'Government guarantee of minimum farm-gate prices for maize, milk, and tea',
      'Ban on unnecessary food imports that undercut local farmers',
      'Establishment of farmer cooperatives with direct market access',
      'Climate-smart agriculture training and crop insurance for all farmers',
    ],
    quote: 'The farmer feeds the nation. When we uplift our farmers, we eliminate hunger and build a self-reliant Kenya.',
  },
  {
    id: 'youth-women-empowerment',
    number: '07',
    title: 'Youth & Women Empowerment',
    subtitle: 'Opportunity for Every Kenyan',
    icon: FaUsers,
    image: '/images/vission/youth-and-women-empowerment.png',
    color: '#D4A017',
    stats: [
      { value: '70%', label: 'Youth Unemployment Cut' },
      { value: '50%', label: 'Women in Leadership' },
      { value: '1B', label: 'Affirmative Action Fund' },
    ],
    problem: 'Despite comprising the majority of Kenya\'s population, youth and women remain marginalized in economic opportunities, leadership positions, and access to capital, perpetuating inequality.',
    solution: 'We will create dedicated affirmative action funds, enforce constitutional gender quotas, and establish youth innovation hubs in every county to unlock the full potential of our demographic dividend.',
    policies: [
      'Youth Innovation Hubs in all 47 counties with free internet and mentorship',
      'Affirmative Action Fund of KES 1 billion annually for women entrepreneurs',
      'Mandatory 50% women representation in all public appointments',
      'Paid internship and apprenticeship programs for all university graduates',
      'Zero-interest startup loans for youth and women-led businesses',
      'Elimination of gender-based violence through specialized courts and shelters',
    ],
    quote: 'Our youth and women are not the future—they are the present. When we empower them, we empower the entire nation.',
  },
  {
    id: 'security-cohesion',
    number: '08',
    title: 'Security & National Cohesion',
    subtitle: 'Safe Homes, United Nation',
    icon: FaUserShield,
    image: '/images/vission/national-security-cohesion.png',
    color: '#1E3A8A',
    stats: [
      { value: '100%', label: 'Police Reform' },
      { value: '47', label: 'Peace Counties' },
      { value: '0', label: 'Tribal Politics' },
    ],
    problem: 'Many Kenyans live in fear due to rising crime, police brutality, and tribal divisions that are often weaponized for political gain, undermining national unity.',
    solution: 'We will professionalize the police service, end extrajudicial killings, and launch a national cohesion program that celebrates our diversity while uniting us under one Kenyan identity.',
    policies: [
      'Comprehensive police reform with independent oversight and better welfare',
      'End to extrajudicial killings and enforced disappearances',
      'Deployment of community policing units in every ward',
      'National Cohesion Curriculum in schools and public institutions',
      'Fair representation of all communities in security appointments',
      'Rapid response units for gender-based violence and child protection',
    ],
    quote: 'Every Kenyan deserves to feel safe in their home and proud of their identity. Security and unity are the foundation of progress.',
  },
];

export default function VisionContent() {
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] font-semibold text-sm mb-6">
              Vision 2027
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6">
              Building a <span className="text-[#D4A017]">Better Kenya</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] mx-auto rounded-full mb-6" />
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Eight transformative pillars that will restore Kenya&apos;s dignity, eliminate corruption, 
              and create prosperity for all 50 million+ Kenyans across all 47 counties.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pillar Navigation */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3">
              {pillars.map((pillar) => (
                <a
                  key={pillar.id}
                  href={`#${pillar.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:border-[#D4A017] hover:text-[#D4A017] transition-colors text-sm font-medium"
                >
                  <span style={{ color: pillar.color }}>{pillar.number}</span>
                  <span>{pillar.title}</span>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pillar Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-6xl mx-auto space-y-24">
          {pillars.map((pillar, index) => (
            <ScrollReveal key={pillar.id}>
              <div id={pillar.id} className="scroll-mt-32 relative rounded-3xl overflow-hidden">
                {/* Background image with 88% white overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${pillar.image}')` }}
                />
                <div className="absolute inset-0 bg-white/88" />
                
                <div className="relative z-10 p-6 md:p-10">
                {/* Header */}
                <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-6xl font-bold opacity-20" style={{ color: pillar.color }}>
                        {pillar.number}
                      </span>
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${pillar.color}20`, color: pillar.color }}
                      >
                        <pillar.icon className="w-7 h-7" />
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
                      {pillar.title}
                    </h2>
                    <p className="text-xl text-slate-500">{pillar.subtitle}</p>
                    
                    {/* Gold accent line */}
                    <div className="w-16 h-1 bg-gradient-to-r from-[#D4A017] to-[#E6C200] rounded-full mt-4" />
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
                      <h3 className="font-semibold text-[#DC2626] mb-3 flex items-center gap-2">
                        <FaBalanceScale className="w-4 h-4" />
                        The Challenge
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{pillar.problem}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                      <h3 className="font-semibold text-[#1E3A8A] mb-3 flex items-center gap-2">
                        <FaCheckCircle className="w-4 h-4" />
                        Our Solution
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{pillar.solution}</p>
                    </div>
                  </div>

                  {/* Policy Points */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                      <FaLandmark className="w-4 h-4" />
                      Key Policy Actions
                    </h3>
                    <ul className="space-y-3">
                      {pillar.policies.map((policy, i) => (
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
                <div 
                  className="mt-8 p-6 bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl border-l-4"
                  style={{ borderLeftColor: pillar.color }}
                >
                  <p className="text-slate-700 italic text-lg leading-relaxed">
                    &ldquo;{pillar.quote}&rdquo;
                  </p>
                  <p className="text-sm text-slate-500 mt-3">— Dr. Isaac Newton Kinity</p>
                </div>

                {/* Divider */}
                {index < pillars.length - 1 && <div className="mt-16 border-b border-slate-200" />}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
