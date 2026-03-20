'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaNewspaper, FaDownload, FaEnvelope, FaPhone, FaUser, FaCamera, FaVideo, FaMicrophone, FaCalendarAlt } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

const pressReleases = [
  {
    date: 'March 2025',
    title: 'Dr. Kinity Announces Presidential Bid for 2027',
    excerpt: 'After 2.5 years of appeals from Kenyans across all 47 counties, Dr. Isaac Newton Kinity officially announces his candidacy for the 2027 presidential election.',
  },
  {
    date: 'February 2025',
    title: 'National Vision Party Unveils Vision 2027 Manifesto',
    excerpt: 'Comprehensive policy document outlines plans for economic transformation, zero corruption, universal healthcare, and education revolution.',
  },
];

const mediaResources = [
  {
    icon: FaCamera,
    title: 'High-Resolution Photos',
    description: 'Official campaign photos of Dr. Kinity for media use.',
    link: '/gallery',
  },
  {
    icon: FaVideo,
    title: 'Campaign Videos',
    description: 'Speeches, rallies, and interview footage.',
    link: '/videos',
  },
  {
    icon: FaNewspaper,
    title: 'Press Releases',
    description: 'Latest news and official statements.',
    link: '/news-hub',
  },
  {
    icon: FaDownload,
    title: 'Logo & Brand Assets',
    description: 'Official NVP logos and campaign branding.',
    link: '#',
  },
];

export default function PressContent() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0074D9] to-[#6B2C91]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-sm mb-6">
              <FaNewspaper className="w-4 h-4" />
              Media Center
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Press & <span className="text-amber-300">Media</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Resources for journalists, media professionals, and content creators covering 
              the National Vision Party and Dr. Isaac Newton Kinity&apos;s 2027 presidential campaign.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Media Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-[#111111] mb-12">
              Media <span className="text-[#0074D9]">Contact</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <ScrollReveal>
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <h3 className="text-2xl font-bold text-[#111111] mb-6 flex items-center gap-3">
                  <FaUser className="text-[#0074D9]" />
                  Press Inquiries
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0074D9]/10 flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="w-5 h-5 text-[#0074D9]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#111111]">Email</p>
                      <a href="mailto:press@nationalvisionparty.com" className="text-[#0074D9] hover:underline">
                        press@nationalvisionparty.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0074D9]/10 flex items-center justify-center flex-shrink-0">
                      <FaPhone className="w-5 h-5 text-[#0074D9]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#111111]">Phone</p>
                      <a href="tel:+254XXXXXXXXX" className="text-[#0074D9] hover:underline">
                        +254 XXX XXX XXX
                      </a>
                      <p className="text-sm text-slate-500 mt-1">Media Hotline</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0074D9]/10 flex items-center justify-center flex-shrink-0">
                      <FaMicrophone className="w-5 h-5 text-[#0074D9]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#111111]">Interview Requests</p>
                      <p className="text-slate-600">
                        For interview requests with Dr. Kinity, please email with details 
                        about your outlet, audience, and proposed questions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick Facts */}
            <ScrollReveal delay={0.1}>
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <h3 className="text-2xl font-bold text-[#111111] mb-6 flex items-center gap-3">
                  <FaCalendarAlt className="text-[#E91D0E]" />
                  Quick Facts
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl">
                    <p className="text-sm text-slate-500 mb-1">Candidate</p>
                    <p className="font-semibold text-[#111111]">Dr. Isaac Newton Kinity</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-xl">
                    <p className="text-sm text-slate-500 mb-1">Party</p>
                    <p className="font-semibold text-[#111111]">National Vision Party (NVP)</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-xl">
                    <p className="text-sm text-slate-500 mb-1">Slogan</p>
                    <p className="font-semibold text-[#111111]">&ldquo;Kenya&apos;s Hope - Committed to the Service of Kenyans&rdquo;</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-xl">
                    <p className="text-sm text-slate-500 mb-1">Election Date</p>
                    <p className="font-semibold text-[#111111]">August 9, 2027</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Media Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-[#111111] mb-12">
              Media <span className="text-[#0074D9]">Resources</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaResources.map((resource, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Link href={resource.link} className="group block">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-[#0074D9]/30 transition-all h-full">
                    <div className="w-14 h-14 rounded-xl bg-[#0074D9]/10 flex items-center justify-center mb-4 group-hover:bg-[#0074D9] transition-colors">
                      <resource.icon className="w-7 h-7 text-[#0074D9] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-[#111111] mb-2">{resource.title}</h3>
                    <p className="text-sm text-slate-600">{resource.description}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Press Releases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-[#111111] mb-12">
              Recent <span className="text-[#E91D0E]">Press Releases</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <span className="text-sm text-[#0074D9] font-semibold">{release.date}</span>
                  <h3 className="text-xl font-bold text-[#111111] mt-2 mb-3">{release.title}</h3>
                  <p className="text-slate-600">{release.excerpt}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-8">
              <Link 
                href="/news-hub"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0074D9] text-white font-semibold hover:bg-[#005CB0] transition-colors"
              >
                <FaNewspaper className="w-4 h-4" />
                View All News
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#111111]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white mb-6">
              Follow the <span className="text-[#E91D0E]">Campaign</span>
            </h2>
            <p className="text-white/70 mb-8">
              Stay updated with the latest news, events, and campaign moments across our social media channels.
            </p>
            
            <div className="flex justify-center gap-4">
              {[
                { name: 'Twitter', handle: '@NVP_Kenya', color: '#1DA1F2' },
                { name: 'Facebook', handle: '@NationalVisionParty', color: '#1877F2' },
                { name: 'Instagram', handle: '@NationalVisionParty', color: '#E4405F' },
                { name: 'YouTube', handle: '@NationalVisionParty', color: '#FF0000' },
              ].map((social) => (
                <div 
                  key={social.name}
                  className="px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm"
                >
                  {social.name}: {social.handle}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
