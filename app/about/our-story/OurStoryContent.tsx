'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaHeart, FaGlobe, FaUniversity, FaUsers, FaFlag } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

const timeline = [
  {
    year: '1980s',
    title: 'The Spark',
    description: 'What began as one young civil servant\'s defiance against the dissolution of the Kenya Civil Servants Union became the first stand for a Kenya where workers and citizens matter more than political dynasties.',
    icon: FaFlag,
  },
  {
    year: '1998',
    title: 'The Trial',
    description: 'On January 7, 1998, the regime attempted to silence the voice of change through poisoning. But every attempt to kill the messenger only seeded a movement that would outlive the oppressors.',
    icon: FaHeart,
    highlight: true,
  },
  {
    year: '1998–2000s',
    title: 'The Exile & Global Mission',
    description: 'While receiving life-saving treatment, the struggle went global. Through the Kikimo Foundation and international anti-corruption forums, the message echoed worldwide: Kenya deserves better.',
    icon: FaUniversity,
  },
  {
    year: '2000s–2020s',
    title: 'The Foundation Years',
    description: 'Decades of advocacy built the ideological bedrock of what would become a national political force—rooted in zero tolerance for corruption, economic justice, and the dignity of every Kenyan.',
    icon: FaGlobe,
  },
  {
    year: '2024',
    title: 'The People\'s Call',
    description: 'For two and a half years, appeals poured in from all 47 counties. Youth, elders, workers, and farmers spoke with one voice: it is time to turn decades of sacrifice into a vehicle for national transformation.',
    icon: FaUsers,
    highlight: true,
  },
  {
    year: '2025–2027',
    title: 'The Birth of the National Vision Party',
    description: 'The National Vision Party was forged not in a boardroom, but in the trenches of struggle. A movement by the people, for the people—ready to reclaim Kenya\'s future.',
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
              The NVP Story
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="heading-editorial mb-6">
              Born from the <span className="heading-accent-gold">Struggle</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="hr-gold-wide mx-auto mb-6" />
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              The National Vision Party was not born in a boardroom. It was forged in the trenches of Kenya&apos;s 
              fight for justice—decades of sacrifice, exile, and an unbreakable belief that this nation can be great again.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Image & Quote */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/national-security-cohesion.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] rounded-3xl opacity-20 blur-2xl" />
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white p-8">
                  <Image
                    src="/nvp-party-logo.jpeg"
                    alt="National Vision Party Logo"
                    fill
                    className="object-contain p-6"
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
                <p className="text-slate-500 pl-6">— Dr. Isaac Newton Kinity, Presidential Candidate</p>

                <div className="pt-6 space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    The story of the National Vision Party is inseparable from the story of a young man who, 
                    at age 20, dared to look power in the eye and say <em>no</em>. When the Moi regime dissolved 
                    the Kenya Civil Servants Union, Isaac Newton Kinity did not retreat. He stood.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    That stand evolved into a lifelong mission. Poisoned, exiled, and threatened with death, 
                    he carried the torch across continents and decades—until the Kenyan people themselves 
                    transformed his solitary fight into a national movement. The NVP is that movement.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Banner background */}
        <div className="absolute inset-0 bg-[url('/baner.jpeg')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-white/85" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="kicker-pill mb-4">Our Journey</span>
              <h2 className="heading-editorial mb-4">
                Timeline of a <span className="heading-accent-gold">Movement</span>
              </h2>
              <div className="hr-gold-wide mx-auto mb-4" />
            </div>
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
