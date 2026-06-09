'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaCheck, FaGlobe, FaFlag } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

// SUPPORT / DONATIONS PAGE (final cleaned version)

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#1E3A8A] to-[#1E3A8A]">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1E3A8A 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              className="w-16 h-1 bg-gradient-to-r from-white/60 to-white/30 mx-auto rounded-full mb-6"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/30 text-white font-medium text-sm mb-6"
            >
              <FaFlag className="w-4 h-4" />
              Fuel the Movement
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="heading-editorial !text-white mb-6"
            >
              Support the <span className="heading-accent-gold">Campaign</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 mb-8"
            >
              Your contribution powers our grassroots movement across all 47 counties.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 text-center"
            >
              <div>
                <div className="text-3xl font-bold text-white">2.5M+</div>
                <div className="text-white/60">Raised</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">1,200+</div>
                <div className="text-white/60">Donors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">47</div>
                <div className="text-white/60">Counties</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zelle and CashApp Details - Professional */}
      <section className="py-20 relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/images/vission/healthcare.png')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="kicker-pill mb-4">Payment Details</span>
              <h2 className="heading-editorial mb-4">
                Support via <span className="heading-accent-gold">Zelle</span> or <span className="heading-accent-gold">CashApp</span>
              </h2>
              <div className="hr-gold-wide mx-auto mb-4" />
              <p className="text-slate-600 max-w-2xl mx-auto">
                For secure and immediate support, please use one of the preferred methods below.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-lg font-semibold text-[#1E3A8A] mb-4 flex items-center gap-2">
                  <FaMobileAlt className="text-[#00A650]" />
                  Quick Transfer
                </h3>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Zelle (US)</span>
                    <span className="text-[#1E3A8A] font-mono">+1 (203) 675-9354</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">CashApp (US)</span>
                    <span className="text-[#1E3A8A] font-mono">$98KIN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reference</span>
                    <span className="text-[#1E3A8A]">98 KIN</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  Send the full amount and include the reference so donations are allocated correctly. Keep a copy of the confirmation for your records.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-lg font-semibold text-[#1E3A8A] mb-4 flex items-center gap-2">
                  <FaGlobe className="text-[#1E3A8A]" />
                  How to Give
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <FaCheck className="w-4 h-4 text-green-600 mt-1" />
                    Use Zelle to send to the campaign phone number. This is the preferred US bank transfer option.
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="w-4 h-4 text-green-600 mt-1" />
                    Use CashApp and send to the cashtag <span className="font-semibold">$98KIN</span>.
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="w-4 h-4 text-green-600 mt-1" />
                    After transfer, please email a confirmation to <span className="font-semibold">newtonkinity@yahoo.com</span>.
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </div>
  );
}
 
