'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaHeart, 
  FaHandHoldingUsd, 
  FaMobileAlt, 
  FaCreditCard, 
  FaPaypal,
  FaCheck,
  FaArrowRight,
  FaLock,
  FaShieldAlt,
  FaGlobe,
  FaUsers,
  FaFlag,
  FaReceipt,
  FaHandshake,
} from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

// ==========================================
// SUPPORT / DONATIONS PAGE
// Multi-payment platform for campaign funding
// ==========================================

const donationAmounts = [
  { amount: 100, label: 'KES 100', description: 'Supporter' },
  { amount: 500, label: 'KES 500', description: 'Patriot' },
  { amount: 1000, label: 'KES 1,000', description: 'Champion' },
  { amount: 5000, label: 'KES 5,000', description: 'Defender' },
  { amount: 10000, label: 'KES 10,000', description: 'Guardian' },
  { amount: 0, label: 'Custom', description: 'Your Choice' },
];

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
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'paypal' | 'bank'>('mpesa');
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
    
    // TODO: Connect to actual payment API (M-Pesa, Stripe, etc.)
    console.log('Donation:', {
      amount: selectedAmount === 0 ? customAmount : selectedAmount,
      method: paymentMethod,
      ...formData,
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 pt-20">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
          >
            <FaCheck className="w-10 h-10 text-green-500" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Thank You for Your Support!
          </h1>
          <p className="text-slate-400 text-lg mb-8">
            Your contribution brings us one step closer to transforming Kenya. 
            A confirmation has been sent to your email.
          </p>
          <div className="bg-slate-900 rounded-2xl p-8 mb-8">
            <div className="flex justify-between mb-4">
              <span className="text-slate-400">Amount</span>
              <span className="text-white font-bold">
                KES {selectedAmount === 0 ? customAmount : selectedAmount?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-slate-400">Payment Method</span>
              <span className="text-white capitalize">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Transaction ID</span>
              <span className="text-white font-mono">KIK{Date.now()}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0074D9] text-white font-semibold hover:bg-[#005CB0] transition-colors"
            >
              Return Home
            </a>
            <a 
              href="/join-us" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-[#E91D0E] text-[#E91D0E] font-semibold hover:bg-[#E91D0E] hover:text-white transition-colors"
            >
              Join as Volunteer
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rally.jpeg"
            alt="Support the campaign"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E91D0E]/20 border border-[#E91D0E]/30 text-[#E91D0E] font-medium text-sm mb-6"
            >
              <FaHeart className="w-4 h-4" />
              Fuel the Movement
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-slogan text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            >
              Support the <span className="text-[#E91D0E]">Campaign</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 mb-8"
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
                <div className="text-3xl font-bold text-[#E91D0E]">KES 2.5M+</div>
                <div className="text-slate-500">Raised</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0074D9]">1,200+</div>
                <div className="text-slate-500">Donors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#6B2C91]">47</div>
                <div className="text-slate-500">Counties</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-headline text-3xl md:text-4xl text-white mb-4">
                Your Donation <span className="text-[#E91D0E]">Matters</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                See exactly how your contribution fuels our campaign for change.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactCards.map((card, index) => (
              <ScrollReveal key={card.amount} delay={index * 0.1}>
                <div className="h-full p-6 rounded-2xl bg-slate-800 border border-slate-700 hover:border-[#E91D0E]/50 transition-all group">
                  <div className="w-14 h-14 rounded-xl bg-[#E91D0E]/10 flex items-center justify-center mb-4 group-hover:bg-[#E91D0E]/20 transition-colors">
                    <card.icon className="w-7 h-7 text-[#E91D0E]" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{card.amount}</div>
                  <p className="text-slate-400 text-sm">{card.impact}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Donation Options */}
            <ScrollReveal>
              <div>
                <h2 className="font-headline text-3xl text-white mb-6">
                  Choose Your <span className="text-[#E91D0E]">Contribution</span>
                </h2>
                
                {/* Amount Selection */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {donationAmounts.map((option) => (
                    <button
                      key={option.amount}
                      onClick={() => setSelectedAmount(option.amount)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedAmount === option.amount
                          ? 'border-[#E91D0E] bg-[#E91D0E]/10'
                          : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className={`font-bold text-lg ${
                        selectedAmount === option.amount ? 'text-[#E91D0E]' : 'text-white'
                      }`}>
                        {option.label}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{option.description}</div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                {selectedAmount === 0 && (
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Enter Custom Amount (KES)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E91D0E] focus:border-transparent"
                      placeholder="Enter amount"
                    />
                  </div>
                )}

                {/* Payment Methods */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-slate-300 mb-4">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mpesa')}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        paymentMethod === 'mpesa'
                          ? 'border-[#00A650] bg-[#00A650]/10'
                          : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#00A650] flex items-center justify-center">
                        <FaMobileAlt className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className={`font-semibold ${
                          paymentMethod === 'mpesa' ? 'text-[#00A650]' : 'text-white'
                        }`}>
                          M-Pesa
                        </div>
                        <div className="text-xs text-slate-500">Mobile Money</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#0074D9] bg-[#0074D9]/10'
                          : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#0074D9] flex items-center justify-center">
                        <FaCreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className={`font-semibold ${
                          paymentMethod === 'card' ? 'text-[#0074D9]' : 'text-white'
                        }`}>
                          Card
                        </div>
                        <div className="text-xs text-slate-500">Visa / Mastercard</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        paymentMethod === 'paypal'
                          ? 'border-[#003087] bg-[#003087]/10'
                          : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#003087] flex items-center justify-center">
                        <FaPaypal className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className={`font-semibold ${
                          paymentMethod === 'paypal' ? 'text-[#0070BA]' : 'text-white'
                        }`}>
                          PayPal
                        </div>
                        <div className="text-xs text-slate-500">International</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        paymentMethod === 'bank'
                          ? 'border-[#6B2C91] bg-[#6B2C91]/10'
                          : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#6B2C91] flex items-center justify-center">
                        <FaHandHoldingUsd className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className={`font-semibold ${
                          paymentMethod === 'bank' ? 'text-[#6B2C91]' : 'text-white'
                        }`}>
                          Bank
                        </div>
                        <div className="text-xs text-slate-500">Wire Transfer</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Security Note */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <FaShieldAlt className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-white font-medium flex items-center gap-2">
                      <FaLock className="w-4 h-4" />
                      Secure Payment
                    </div>
                    <p className="text-slate-400 text-sm">
                      Your payment is encrypted and secure. We never store your financial details.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Donor Information */}
            <ScrollReveal delay={0.2}>
              <form onSubmit={handleDonate} className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <FaReceipt className="text-[#E91D0E]" />
                  Donor Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E91D0E] focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E91D0E] focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E91D0E] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Phone Number {paymentMethod === 'mpesa' && '*'}
                  </label>
                  <input
                    type="tel"
                    required={paymentMethod === 'mpesa'}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E91D0E] focus:border-transparent"
                    placeholder="+254 XXX XXX XXX"
                  />
                  {paymentMethod === 'mpesa' && (
                    <p className="text-xs text-slate-500 mt-1">
                      Enter the M-Pesa number you&apos;ll use to complete payment
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={formData.isRecurring}
                      onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-[#E91D0E] focus:ring-[#E91D0E]"
                    />
                    <span className="text-slate-300">
                      Make this a monthly recurring donation
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.anonymous}
                      onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-[#E91D0E] focus:ring-[#E91D0E]"
                    />
                    <span className="text-slate-300">
                      Donate anonymously
                    </span>
                  </label>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E91D0E] focus:border-transparent resize-none"
                    placeholder="Leave a message of support..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || (selectedAmount === 0 && !customAmount)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E91D0E] to-[#BA170C] text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaHeart />
                      Donate KES {selectedAmount === 0 ? (customAmount || '0') : selectedAmount?.toLocaleString()}
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

      {/* Bank Transfer Info */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl text-white mb-4">
                Other Ways to <span className="text-[#0074D9]">Support</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FaHandHoldingUsd className="text-[#6B2C91]" />
                  Bank Transfer
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account Name:</span>
                    <span className="text-white font-mono">Isaac Kinity Campaign</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bank:</span>
                    <span className="text-white">KCB Bank Kenya</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account Number:</span>
                    <span className="text-white font-mono">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Swift Code:</span>
                    <span className="text-white font-mono">KCBLKENX</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  For international transfers. Email receipt to donations@isaackinity.net
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FaGlobe className="text-[#0074D9]" />
                  International Support
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  Kenyans in the diaspora can support the campaign through:
                </p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <FaCheck className="w-4 h-4 text-green-500" />
                    PayPal (USD, EUR, GBP)
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="w-4 h-4 text-green-500" />
                    Credit/Debit Cards
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="w-4 h-4 text-green-500" />
                    International Wire Transfer
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="w-4 h-4 text-green-500" />
                    WorldRemit / Wise
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#E91D0E] to-[#BA170C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-slogan text-3xl md:text-4xl text-white mb-4">
            Can&apos;t Donate? Volunteer!
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Your time and skills are just as valuable. Join our team of dedicated volunteers.
          </p>
          <a 
            href="/join-us"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-[#E91D0E] font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg"
          >
            <FaHandshake />
            Become a Volunteer
            <FaArrowRight />
          </a>
        </div>
      </section>
    </div>
  );
}
