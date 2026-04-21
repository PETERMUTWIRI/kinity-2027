'use client';

import Link from 'next/link';
import { FaArrowLeft, FaLanguage, FaBriefcase, FaHandsHelping, FaUserShield, FaBookOpen, FaHeartbeat } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

const services = [
  { icon: FaLanguage, title: 'Translation', description: 'Professional translation services to bridge language barriers.' },
  { icon: FaBriefcase, title: 'Job Training', description: 'Skills development and career readiness programs.' },
  { icon: FaHandsHelping, title: 'Mentor Youth', description: 'Guidance and support for young people building new lives.' },
  { icon: FaUserShield, title: 'Case Management & Rights Advocacy', description: 'Navigating systems and standing up for your rights.' },
  { icon: FaBookOpen, title: 'English Literacy', description: 'Language education to empower communication.' },
  { icon: FaHeartbeat, title: 'Health Management', description: 'Access to healthcare resources and wellness support.' },
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
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] font-semibold text-sm mb-6">
              Our Story
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="heading-editorial mb-6">
              New International Hope for <span className="heading-accent-gold">Refugees and Immigrants</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="hr-gold-wide mx-auto mb-6" />
            <p className="text-xl text-slate-600 leading-relaxed">
              New International Hope for Refugees and Immigrants is a 501(c)3 non-profit organization 
              created to give hope to those who are in need. Whether you are moving to find a new home 
              or forced to leave your home, we are here to help.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="kicker-pill mb-4">What We Offer</span>
              <h2 className="heading-editorial mb-4">
                Our <span className="heading-accent-gold">Services</span>
              </h2>
              <div className="hr-gold-wide mx-auto mb-4" />
              <p className="text-lg text-slate-600">
                We offer services to help Translate, Job training, Mentor youth, 
                Case management & Rights advocacy, English Literacy, and Health Management. 
                We provide Resources to all!
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <div className="h-full bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:border-[#1E3A8A]/30 hover:shadow-md transition-all text-center">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-[#1E3A8A]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
