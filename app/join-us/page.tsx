'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaHandshake, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaBullhorn, 
  FaHeart,
  FaCheck,
  FaArrowRight,
  FaFlag,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaCalendarAlt,
  FaChevronDown,
} from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

// ==========================================
// JOIN US - Volunteer Registration Page
// Enterprise level volunteer recruitment
// ==========================================

const volunteerRoles = [
  {
    icon: FaBullhorn,
    title: 'Campaign Ambassador',
    description: 'Spread our message through social media, community events, and word-of-mouth.',
    commitment: 'Flexible',
  },
  {
    icon: FaMapMarkerAlt,
    title: 'County Coordinator',
    description: 'Lead campaign efforts in your county. Organize events and mobilize volunteers.',
    commitment: 'Part-time',
  },
  {
    icon: FaUsers,
    title: 'Event Volunteer',
    description: 'Help organize and execute rallies, town halls, and community meetings.',
    commitment: 'Event-based',
  },
  {
    icon: FaHandshake,
    title: 'Community Organizer',
    description: 'Engage with local communities, churches, and groups to build support.',
    commitment: 'Flexible',
  },
];

const counties = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Kiambu', 'Kakamega', 'Bungoma',
  'Meru', 'Nyeri', 'Murang\'a', 'Machakos', 'Kajiado', 'Uasin Gishu', 'Kericho',
  'Nandi', 'Bomet', 'Kisii', 'Nyamira', 'Homa Bay', 'Migori', 'Siaya', 'Busia',
  'Vihiga', 'Kitui', 'Makueni', 'Embu', 'Kirinyaga', 'Kwale', 'Kilifi', 'Taita Taveta',
  'Lamu', 'Tana River', 'Garissa', 'Wajir', 'Mandera', 'Marsabit', 'Isiolo',
  'Samburu', 'Laikipia', 'Turkana', 'West Pokot', 'Trans Nzoia', 'Elgeyo Marakwet',
  'Baringo', 'Narok', 'Nyandarua', 'Tharaka Nithi', 'Mombasa', 'Other'
];

export default function JoinUsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    county: '',
    constituency: '',
    role: '',
    availability: '',
    experience: '',
    motivation: '',
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // TODO: Connect to actual API
    console.log('Volunteer registration:', formData);
  };

  if (isSubmitted) {
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
            Welcome to the Movement!
          </h1>
          <p className="text-slate-400 text-lg mb-8">
            Thank you for joining us, {formData.firstName}. Our team will contact you within 24 hours to discuss next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#1E3A8A] text-white font-semibold hover:bg-[#0F172A] transition-colors"
            >
              Return Home
            </a>
            <a 
              href="/support" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-[#DC2626] text-[#DC2626] font-semibold hover:bg-[#DC2626] hover:text-white transition-colors"
            >
              Support the Campaign
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
            alt="Join the movement"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A8A]/20 border border-[#1E3A8A]/30 text-[#1E3A8A] font-medium text-sm mb-6"
            >
              <FaHandshake className="w-4 h-4" />
              Be Part of the Change
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-slogan text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            >
              Join the <span className="text-[#DC2626]">Movement</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 mb-8"
            >
              Kenya&apos;s transformation starts with dedicated citizens like you. 
              Volunteer your time, skills, and passion to build a better future for all.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 text-center"
            >
              <div>
                <div className="text-3xl font-bold text-[#1E3A8A]">10,000+</div>
                <div className="text-slate-500">Volunteers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#DC2626]">47</div>
                <div className="text-slate-500">Counties</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#D4A017]">2027</div>
                <div className="text-slate-500">Victory</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-headline text-3xl md:text-4xl text-white mb-4">
                How You Can <span className="text-[#1E3A8A]">Help</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                We need passionate individuals in every role. Choose where your skills can make the biggest impact.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerRoles.map((role, index) => (
              <ScrollReveal key={role.title} delay={index * 0.1}>
                <div 
                  className={`h-full p-6 rounded-2xl bg-slate-800 border border-slate-700 hover:border-[#1E3A8A]/50 transition-all cursor-pointer group ${
                    formData.role === role.title ? 'border-[#1E3A8A] ring-2 ring-[#1E3A8A]/20' : ''
                  }`}
                  onClick={() => setFormData({ ...formData, role: role.title })}
                >
                  <div className="w-14 h-14 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center mb-4 group-hover:bg-[#1E3A8A]/20 transition-colors">
                    <role.icon className="w-7 h-7 text-[#1E3A8A]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{role.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{role.description}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FaCalendarAlt />
                    {role.commitment}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl text-white mb-4">
                Sign Up to <span className="text-[#DC2626]">Volunteer</span>
              </h2>
              <p className="text-slate-400">
                Fill out the form below and our team will contact you with next steps.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <form onSubmit={handleSubmit} className="bg-slate-900 rounded-2xl border border-slate-800 p-8 md:p-12">
              {/* Personal Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <FaUser className="text-[#1E3A8A]" />
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                        placeholder="+254 XXX XXX XXX"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#DC2626]" />
                  Location
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">County *</label>
                    <div className="relative">
                      <select
                        required
                        value={formData.county}
                        onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent appearance-none"
                      >
                        <option value="">Select your county</option>
                        {counties.map(county => (
                          <option key={county} value={county}>{county}</option>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Constituency/Ward</label>
                    <input
                      type="text"
                      value={formData.constituency}
                      onChange={(e) => setFormData({ ...formData, constituency: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                      placeholder="e.g., Kiambaa Constituency"
                    />
                  </div>
                </div>
              </div>

              {/* Role & Availability */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <FaHandshake className="text-[#D4A017]" />
                  Volunteer Preferences
                </h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Role *</label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent appearance-none"
                  >
                    <option value="">Select a role</option>
                    {volunteerRoles.map(role => (
                      <option key={role.title} value={role.title}>{role.title}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Availability *</label>
                  <select
                    required
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent appearance-none"
                  >
                    <option value="">When are you available?</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="evenings">Evenings only</option>
                    <option value="full-time">Full-time</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Relevant Experience</label>
                  <textarea
                    rows={3}
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent resize-none"
                    placeholder="Tell us about any relevant experience..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Why do you want to join? *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent resize-none"
                    placeholder="Share your motivation for joining the movement..."
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="mb-8">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-[#1E3A8A] focus:ring-[#1E3A8A] mt-0.5"
                  />
                  <span className="text-slate-400 text-sm">
                    I agree to volunteer my time and effort to support the National Vision Party campaign. 
                    I understand that this is a voluntary position and I commit to representing the 
                    campaign with integrity and respect. *
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaFlag />
                    Join the Movement
                  </>
                )}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-slogan text-3xl md:text-4xl text-white mb-4">
            Can&apos;t Volunteer Right Now?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            You can still support the campaign through donations. Every contribution brings us closer to victory.
          </p>
          <a 
            href="/support"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#DC2626] text-white font-bold text-lg hover:bg-[#B91C1C] transition-colors shadow-lg"
          >
            <FaHeart />
            Support the Campaign
            <FaArrowRight />
          </a>
        </div>
      </section>
    </div>
  );
}
