'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCopy, FaCheck, FaWhatsapp, FaTwitter, FaFacebook, FaShareAlt } from 'react-icons/fa';

const captions = {
  whatsapp: [
    `🇰🇪 *KENYA'S HOPE 2027*

Dr. Isaac Newton Kinity has pledged to dismantle corruption within 2 years—or resign.

✅ 40% cost of living reduction
✅ Universal healthcare
✅ Free quality education
✅ Zero tolerance for graft

This is not politics. This is a movement for our children's future.

🌐 https://www.nationalvisionparty.com
📱 WhatsApp: +1 (203) 675-9354

#KenyasHope2027`,

    `🗳️ *Your Vote is Your Voice*

The same politicians who have recycled through government for decades have brought us here. 

Dr. Kinity is different. He survived poisoning and assassination attempts for standing with Kenyans.

Join the movement: https://www.nationalvisionparty.com`,

    `💚💛❤️ *47 Counties. One Dream.*

The National Vision Party is building a Kenya where every citizen thrives—not just the politically connected.

Dr. Kinity is in the USA, but his heart is with Kenya. Follow his latest messages and virtual town halls.

👉 https://www.nationalvisionparty.com/videos`,
  ],
  twitter: [
    `🇰🇪 Kenya's Hope 2027. Dr. Isaac Newton Kinity: "Eliminate corruption in 2 years or resign." That's accountability. That's leadership. Join the movement → https://www.nationalvisionparty.com #KenyasHope2027`,
    `The old guard recycled themselves for decades. Dr. Kinity survived poisoning for speaking truth to power. Now he's running for President. This is our moment. 🗳️ https://www.nationalvisionparty.com`,
    `Economic transformation. Zero corruption. Universal healthcare. Education revolution. These aren't slogans—they're promises. Dr. Kinity's Vision 2027 → https://www.nationalvisionparty.com/about/vision-2027`,
  ],
  facebook: [
    `🇰🇪 Kenya's Hope 2027 🇰🇪\n\nI believe in a Kenya where corruption is history, where our youth have jobs, where healthcare is a right, and where education is world-class.\n\nDr. Isaac Newton Kinity has dedicated 40+ years to this fight. Now he needs our support.\n\nJoin the National Vision Party movement today:\n🌐 https://www.nationalvisionparty.com\n📱 WhatsApp: +1 (203) 675-9354\n\n#KenyasHope2027 #DrKinity2027`,
    `The difference between Dr. Kinity and career politicians?\n\nHe has already sacrificed his health and safety for Kenya. He has pledged to resign if he fails to eliminate corruption in 2 years.\n\nThat is the kind of servant leadership Kenya needs.\n\nLearn more: https://www.nationalvisionparty.com`,
  ],
};

type Platform = 'whatsapp' | 'twitter' | 'facebook';

export default function SocialMediaToolkit() {
  const [activeTab, setActiveTab] = useState<Platform>('whatsapp');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const tabs = [
    { id: 'whatsapp' as Platform, label: 'WhatsApp', icon: FaWhatsapp, color: 'bg-[#25D366]' },
    { id: 'twitter' as Platform, label: 'Twitter', icon: FaTwitter, color: 'bg-[#1DA1F2]' },
    { id: 'facebook' as Platform, label: 'Facebook', icon: FaFacebook, color: 'bg-[#1877F2]' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#D4A017] flex items-center justify-center">
            <FaShareAlt className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white">Digital Warrior Toolkit</h3>
        </div>
        <p className="text-white/80">
          Copy these ready-made posts and share them with your network. Every share brings us closer to 2027.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? 'text-[#1E3A8A] border-b-2 border-[#D4A017] bg-slate-50'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Captions */}
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {captions[activeTab].map((caption, index) => (
              <div
                key={index}
                className="relative group bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-[#D4A017]/50 transition-colors"
              >
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line pr-12">
                  {caption}
                </p>
                <button
                  onClick={() => handleCopy(caption, index)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-[#1E3A8A] hover:border-[#D4A017] transition-all"
                  aria-label="Copy caption"
                >
                  {copiedIndex === index ? (
                    <FaCheck className="w-4 h-4 text-green-500" />
                  ) : (
                    <FaCopy className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-center text-slate-500 text-sm">
            💡 <span className="font-semibold">Pro tip:</span> Personalize these captions with your own county or story for maximum impact.
          </p>
        </div>
      </div>
    </div>
  );
}
