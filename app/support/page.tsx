'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaHeart, 
  FaMobileAlt, 
  FaCreditCard, 
  FaCheck,
  FaLock,
  FaShieldAlt,
  FaGlobe,
  FaUsers,
  FaFlag,
  FaReceipt,
} from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

// ==========================================
// SUPPORT / DONATIONS PAGE
// Multi-payment platform for campaign funding
// ==========================================

const impactCards = [
  {
    amount: 'KES 100',
    impact: 'Prints 10 campaign posters for local distribution',
    icon: FaFlag,
  },
  {
    amount: 'KES 1,000',
    impact: 'Fuels a campaign vehicle for a day of grassroots mobilization',
    icon: FaMobileAlt,
  },
  {
    amount: 'KES 5,000',
    impact: 'Sponsors a community town hall meeting',
    icon: FaUsers,
  },
  {
    amount: 'KES 10,000',
    impact: 'Supports a county coordinator for a week',
    icon: FaGlobe,
  },
];

export default function SupportPage() {
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'zelle' | 'cashup'>('zelle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isRecurring: false,
    message: '',
    anonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // TODO: Connect to actual payment API (Zelle, CashUp, Stripe, etc.)
    console.log('Donation:', {
      amount: customAmount,
      method: paymentMethod,
      ...formData,
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E3A8A] to-[#0F172A] pt-20">
        {/* Subtle pattern overlay */}
        <div 
          className="fixed inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1E3A8A 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-20 text-center">
          {/* Gold accent line */}
          <div className="w-24 h-1 bg-gradient-to-r from-white/60 to-white/30 mx-auto rounded-full mb-8" />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 rounded-full bg-[#1E3A8A]/20 flex items-center justify-center mx-auto mb-6"
          >
            <FaCheck className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Thank You for Your <span className="text-white">Support!</span>
          </h1>
          <p className="text-white/70 text-lg mb-8">
            Your contribution brings us one step closer to transforming Kenya. 
            A confirmation has been sent to your email.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
            <div className="flex justify-between mb-4">
              <span className="text-white/60">Amount</span>
              <span className="text-white font-bold">
                KES {customAmount || '0'}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-white/60">Payment Method</span>
              <span className="text-white capitalize">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Transaction ID</span>
              <span className="text-white font-mono">KIK{Date.now()}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#1E3A8A] text-white font-semibold hover:bg-[#0F172A] transition-colors"
            >
              Return Home
            </a>
            <a 
              href="/join-us" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white text-white font-semibold hover:bg-white hover:text-[#0F172A] transition-colors"
            >
              Join as Volunteer
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#1E3A8A] to-[#1E3A8A]">
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1E3A8A 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Gold accent line */}
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
              <FaHeart className="w-4 h-4" />
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
              Every shilling brings us closer to a transformed Kenya.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 text-center"
            >
              <div>
                <div className="text-3xl font-bold text-white">KES 2.5M+</div>
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

      {/* Impact Section */}
      <section className="py-20 relative overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/economic-transformation.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="kicker-pill mb-4">Impact</span>
              <h2 className="heading-editorial mb-4">
                Your Donation <span className="heading-accent-gold">Matters</span>
              </h2>
              <div className="hr-gold-wide mx-auto mb-4" />
              <p className="text-slate-600 max-w-2xl mx-auto">
                See exactly how your contribution fuels our campaign for change.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactCards.map((card, index) => (
              <ScrollReveal key={card.amount} delay={index * 0.1}>
                <div className="h-full p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#1E3A8A]/50 transition-all group">
                  <div className="w-14 h-14 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center mb-4 group-hover:bg-[#1E3A8A]/20 transition-colors">
                    <card.icon className="w-7 h-7 text-[#1E3A8A]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1E3A8A] mb-2">{card.amount}</div>
                  <p className="text-slate-600 text-sm">{card.impact}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 relative overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/education.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Donation Options */}
            <ScrollReveal>
              <div>
                <h2 className="heading-editorial mb-6">
                  Your <span className="heading-accent-gold">Contribution</span>
                </h2>
                
                {/* Custom Amount */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-[#1E3A8A] mb-2">
                      Enter Custom Amount (KES)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#1E3A8A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                      placeholder="Enter amount"
                    />
                  </div>

                {/* Payment Methods */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-[#1E3A8A] mb-4">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('zelle')}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        paymentMethod === 'zelle'
                          ? 'border-[#1E3A8A] bg-[#1E3A8A]/10'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#1E3A8A] flex items-center justify-center">
                        <FaCreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className={`font-semibold ${
                          paymentMethod === 'zelle' ? 'text-[#1E3A8A]' : 'text-[#1E3A8A]'
                        }`}>
                          Zelle
                        </div>
                        <div className="text-xs text-slate-500">Send to phone number</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cashup')}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        paymentMethod === 'cashup'
                          ? 'border-[#00A650] bg-[#00A650]/10'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#00A650] flex items-center justify-center">
                        <FaMobileAlt className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className={`font-semibold ${
                          paymentMethod === 'cashup' ? 'text-[#00A650]' : 'text-[#1E3A8A]'
                        }`}>
                          CashUp
                        </div>
                        <div className="text-xs text-slate-500">Quick wallet transfer</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Security Note */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <FaShieldAlt className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-[#1E3A8A] font-medium flex items-center gap-2">
                      <FaLock className="w-4 h-4 text-green-600" />
                      Secure Payment
                    </div>
                    <p className="text-slate-600 text-sm">
                      Your payment is encrypted and secure. We never store your financial details.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Donor Information */}
            <ScrollReveal delay={0.2}>
              <form onSubmit={handleDonate} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-[#1E3A8A] mb-6 flex items-center gap-2">
                  <FaReceipt className="text-[#1E3A8A]" />
                  Donor Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1E3A8A] mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#1E3A8A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1E3A8A] mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#1E3A8A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1E3A8A] mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#1E3A8A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1E3A8A] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#1E3A8A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                    placeholder="+1 (203) 675-9354"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Use +1 (203) 675-9354 for Zelle or CashUp. Reference 98 KIN.
                  </p>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={formData.isRecurring}
                      onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-300 bg-white text-[#1E3A8A] focus:ring-[#1E3A8A]"
                    />
                    <span className="text-slate-600">
                      Make this a monthly recurring donation
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.anonymous}
                      onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-300 bg-white text-[#1E3A8A] focus:ring-[#1E3A8A]"
                    />
                    <span className="text-slate-600">
                      Donate anonymously
                    </span>
                  </label>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1E3A8A] mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#1E3A8A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent resize-none"
                    placeholder="Leave a message of support..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !customAmount}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaHeart />
                      Donate KES {customAmount || '0'}
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-500 mt-4">
                  By donating, you agree to our Terms of Service and Privacy Policy.
                  Contributions are not tax-deductible.
                </p>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Zelle and CashUp Details */}
      <section className="py-20 relative overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/healthcare.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="kicker-pill mb-4">Payment Details</span>
              <h2 className="heading-editorial mb-4">
                Use <span className="heading-accent-gold">Zelle</span> or <span className="heading-accent-gold">CashUp</span>
              </h2>
              <div className="hr-gold-wide mx-auto mb-4" />
              <p className="text-slate-600 max-w-2xl mx-auto">
                For now, please send support directly via Zelle or CashUp to the campaign phone number below.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-lg font-semibold text-[#1E3A8A] mb-4 flex items-center gap-2">
                  <FaMobileAlt className="text-[#00A650]" />
                  Campaign Wallet
                </h3>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone Number</span>
                    <span className="text-[#1E3A8A] font-mono">+1 (203) 675-9354</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reference</span>
                    <span className="text-[#1E3A8A] font-mono">98 KIN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Accepts</span>
                    <span className="text-[#1E3A8A]">Zelle / CashUp</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  PayPal support is coming soon. For now, use Zelle or CashUp with the campaign reference above.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-lg font-semibold text-[#1E3A8A] mb-4 flex items-center gap-2">
                  <FaGlobe className="text-[#1E3A8A]" />
                  Quick Instructions
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <FaCheck className="w-4 h-4 text-green-600 mt-1" />
                    Send the full amount to +1 (203) 675-9354 using Zelle or CashUp.
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="w-4 h-4 text-green-600 mt-1" />
                    Use reference <span className="font-semibold">98 KIN</span> so your donation is credited correctly.
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="w-4 h-4 text-green-600 mt-1" />
                    Keep the transfer confirmation screenshot for your records.
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
