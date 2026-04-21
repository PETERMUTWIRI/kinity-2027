'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaCheckCircle, FaAward } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';
import type { BoardMember } from '@/lib/board';

interface Props {
  member: BoardMember;
}

export default function BoardMemberContent({ member }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Back Navigation */}
      <div className="fixed top-24 left-4 z-40">
        <Link
          href="/about/leadership"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-slate-600 hover:text-[#1E3A8A] transition-colors"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Leadership</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#1E3A8A] to-[#1E3A8A] rounded-3xl opacity-20 blur-2xl" />
                <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] flex items-center justify-center">
                      <span className="text-white text-6xl font-bold">{member.initials}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/40 via-transparent to-transparent" />
                </div>
              </div>
            </ScrollReveal>

            {/* Content Side */}
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] border border-[#1E3A8A]/20 font-semibold text-sm">
                  <FaAward className="w-4 h-4" />
                  {member.role}
                </span>

                <h1 className="heading-editorial">
                  {member.name.includes('Kinity') ? (
                    <>
                      Dr. Isaac Newton <span className="heading-accent-gold">Kinity</span>
                    </>
                  ) : (
                    <>
                      {member.name.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="heading-accent-gold">{member.name.split(' ').slice(-1)[0]}</span>
                    </>
                  )}
                </h1>

                <div className="hr-gold-accent" />

                <p className="text-xl text-slate-600 leading-relaxed">{member.fullBio}</p>

                {member.highlights.length > 0 && (
                  <div className="space-y-3 pt-4">
                    {member.highlights.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <FaCheckCircle className="w-5 h-5 text-[#1E3A8A] flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href="/about/leadership"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#1E3A8A] text-white font-bold hover:bg-[#0F172A] transition-all duration-300 w-fit"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  View All Leadership
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
