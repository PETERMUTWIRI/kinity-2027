'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaUsers, FaFlag, FaHandshake, FaAward, FaCheckCircle, FaGlobe, FaHeart } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

const partyOrgans = [
  {
    title: 'National Executive Committee',
    description: 'The strategic nerve center of the party, responsible for policy direction, national campaigns, and ensuring the party remains true to its founding principles.',
    icon: FaFlag,
  },
  {
    title: 'County Coordinators',
    description: 'Grassroots architects operating in all 47 counties, translating national vision into local action and building village-by-village momentum.',
    icon: FaGlobe,
  },
  {
    title: 'Youth League',
    description: 'The engine of innovation and energy, mobilizing young Kenyans to shape the future they will inherit through active political participation.',
    icon: FaHandshake,
  },
  {
    title: 'Women League',
    description: 'A powerful voice for gender equity and inclusive leadership, ensuring the party advances policies that uplift women, mothers, and daughters across Kenya.',
    icon: FaHeart,
  },
];

const leadershipValues = [
  {
    title: 'Servant Leadership',
    content: 'We do not seek power to rule; we seek responsibility to serve. Every official in the National Vision Party is accountable to the people, not the other way around.',
  },
  {
    title: 'Grassroots Democracy',
    content: 'Decisions are made from the ground up. From village meetings to national strategy sessions, the voice of the ordinary Kenyan is the loudest voice in the room.',
  },
  {
    title: 'Zero Tolerance for Corruption',
    content: 'Our leadership is bound by a sacred contract: serve with integrity or step aside. No exceptions, no excuses, no protection for the well-connected.',
  },
  {
    title: 'Collective Vision',
    content: 'While Dr. Kinity carries the flag, the vision belongs to millions of Kenyans who demand a nation built on dignity, prosperity, and justice for all.',
  },
];

export default function LeadershipContent() {
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
              Party Leadership
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="heading-editorial mb-6">
              Leadership Built on <span className="heading-accent-gold">Service</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="hr-gold-wide mx-auto mb-6" />
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              The National Vision Party is not a one-man show. It is a disciplined movement of servant-leaders 
              united by a single mandate: to restore Kenya&apos;s dignity through accountable, people-centered governance.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Presidential Candidate Card */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative aspect-[4/3] lg:aspect-auto">
                  <Image
                    src="/images/president.jpeg"
                    alt="Dr. Isaac Newton Kinity - Presidential Candidate"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] border border-[#1E3A8A]/20 font-semibold text-sm mb-6 w-fit">
                    <FaAward className="w-4 h-4" />
                    Flagbearer 2027
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                    Dr. Isaac Newton <span className="heading-accent-gold">Kinity</span>
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Presidential Candidate of the National Vision Party. A veteran governance activist with over 
                    40 years of sacrifice, poisoned for standing against corruption, and called to leadership by 
                    the people—not political cartels.
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      '40+ years of activism and union leadership',
                      'Survived assassination attempts for opposing graft',
                      'Pledged to eliminate corruption within 2 years or resign',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <FaCheckCircle className="w-5 h-5 text-[#1E3A8A] flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/about/candidate"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#1E3A8A] text-white font-bold hover:bg-[#0F172A] transition-all duration-300 w-fit"
                  >
                    Meet the Candidate
                    <FaArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Party Organs */}
      <section className="py-16 relative overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Banner background */}
        <div className="absolute inset-0 bg-[url('/baner.jpeg')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="kicker-pill mb-4">Party Organization</span>
              <h2 className="heading-editorial mb-4">
                Party <span className="heading-accent-gold">Structure</span>
              </h2>
              <div className="hr-gold-wide mx-auto mb-4" />
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                A nationwide organization designed to put power back where it belongs—in the hands of the people.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {partyOrgans.map((organ, index) => (
              <ScrollReveal key={organ.title} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:border-[#1E3A8A]/30 hover:shadow-md transition-all h-full">
                  <div className="w-14 h-14 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center mb-5">
                    <organ.icon className="w-7 h-7 text-[#1E3A8A]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{organ.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{organ.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0F172A] text-white relative overflow-hidden">
        {/* Subtle Kenyan flag hint at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex opacity-30">
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-[#DC2626]" />
          <div className="flex-1 bg-[#006600]" />
        </div>

        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="kicker-gold mb-4">Our Values</span>
              <h2 className="heading-editorial !text-white mb-4">
                The <span className="heading-accent-gold">Covenant</span> of Leadership
              </h2>
              <div className="hr-gold mx-auto mb-4" />
              <p className="text-white/70 max-w-2xl mx-auto">
                Every leader who wears the NVP badge makes these four commitments to the Kenyan people.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {leadershipValues.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#1E3A8A]/30 transition-all">
                  <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">{value.title}</h3>
                  <p className="text-white/80 leading-relaxed">{value.content}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
