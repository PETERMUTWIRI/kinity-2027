'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

const faqs = [
  {
    category: 'About Our Candidate',
    questions: [
      {
        q: 'Who is Dr. Isaac Newton Kinity?',
        a: 'Dr. Isaac Newton Kinity is a veteran governance activist, former Secretary-General of the Kenya Civil Servants Union, and presidential candidate for the 2027 elections. With over 40 years of experience fighting for workers rights and good governance.',
      },
      {
        q: 'What is his background and experience?',
        a: 'Dr. Kinity has over four decades of activism, union leadership, and governance advocacy. He has fought for workers at the grassroots level, represented Kenya at international anti-corruption conferences, and survived assassination attempts for standing against corruption.',
      },
      {
        q: 'Why is he running for president?',
        a: 'After 2.5 years of appeals from Kenyans across all 47 counties, Dr. Kinity answered the call to run. Unlike traditional politicians who emerge through party coalitions, his candidacy was born from a genuine grassroots movement of citizens desperate for change.',
      },
    ],
  },
  {
    category: 'Vision 2027',
    questions: [
      {
        q: 'What are the pillars of Vision 2027?',
        a: 'Vision 2027 rests on eight transformative pillars: 1) Economic Transformation, 2) Zero Corruption, 3) Universal Healthcare, 4) Education Revolution, 5) Social Protection & Inclusion - dignity for widows, orphans, PWDs and the elderly, 6) Agriculture & Food Security - empowering farmers and ending hunger, 7) Youth & Women Empowerment - innovation hubs and affirmative funding, and 8) Security & National Cohesion - police reform and unity beyond tribal lines.',
      },
      {
        q: 'How will he eliminate corruption in 2 years?',
        a: 'Dr. Kinity pledges to establish independent anti-corruption courts, arrest those responsible for looting billions (not just petty thieves), protect whistleblowers, and remove corrupt officials regardless of political friendships. Failure to achieve this goal will compel him to voluntarily resign.',
      },
      {
        q: 'What is the 2-year corruption pledge?',
        a: 'This is Dr. Kinitys personal commitment to eradicate corruption within his first two years in office. If he fails to achieve this goal, he will voluntarily resign - a testament to his unwavering commitment to accountability.',
      },
    ],
  },
  {
    category: 'Get Involved',
    questions: [
      {
        q: 'How can I join the movement?',
        a: 'You can join by visiting our Join Us page and filling out the membership form. We welcome volunteers, county coordinators, and supporters from all 47 counties. Every voice matters in this movement for change.',
      },
      {
        q: 'How can I donate to the campaign?',
        a: 'Visit our Support page to make a donation. Your contribution helps us reach more Kenyans across all counties, organize rallies, and spread the message of hope and transformation.',
      },
      {
        q: 'How can I volunteer?',
        a: 'We need volunteers for various roles including event organization, community outreach, social media, and more. Fill out the volunteer form on our Join Us page and our team will contact you.',
      },
    ],
  },
  {
    category: 'Election 2027',
    questions: [
      {
        q: 'When is the 2027 election?',
        a: 'The Kenya General Election is scheduled for August 9, 2027. The countdown is on our website shows exactly how many days remain until Kenyans vote for their next president.',
      },
      {
        q: 'What makes Dr. Kinity different from other candidates?',
        a: 'Unlike career politicians who have recycled through governments without delivering results, Dr. Kinity represents a new generation of leadership. He has already sacrificed his health and safety for Kenya, and he pledges to resign if he fails to eliminate corruption - something no other candidate has committed to.',
      },
      {
        q: 'How can I stay updated on campaign news?',
        a: 'Follow us on social media (Twitter, Facebook, Instagram, YouTube), subscribe to our newsletter, and regularly check our News Hub for the latest updates, events, and campaign announcements.',
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-semibold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <FaChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-slate-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQContent() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1E3A8A] to-[#1E3A8A]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-sm mb-6">
              <FaQuestionCircle className="w-4 h-4" />
              FAQ
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="heading-editorial !text-white mb-6">
              Frequently Asked <span className="heading-accent-gold !text-white">Questions</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Find answers to commonly asked questions about Dr. Isaac Newton Kinity, 
              the National Vision Party, and our vision for Kenya 2027.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/national-security-cohesion.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <ScrollReveal key={category.category} delay={categoryIndex * 0.1}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-100">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-6 flex items-center gap-3">
                    <div className="w-2 h-8 bg-[#DC2626] rounded-full" />
                    {category.category}
                  </h2>
                  <div className="space-y-0">
                    {category.questions.map((faq, faqIndex) => (
                      <FAQItem key={faqIndex} question={faq.q} answer={faq.a} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Still Have Questions */}
          <ScrollReveal delay={0.4}>
            <div className="mt-12 text-center">
              <p className="text-slate-600 mb-4">
                Still have questions? We are here to help.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#DC2626] text-white font-bold rounded-xl hover:bg-[#B91C1C] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
