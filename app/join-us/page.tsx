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
  FaWhatsapp,
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
      <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E3A8A] to-[#0F172A] pt-20">
        {/* Subtle pattern overlay */}
        <div 
          className="fixed inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-20 text-center">
          {/* Gold accent line */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4A017] to-[#E6C200] mx-auto rounded-full mb-8" />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 rounded-full bg-[#D4A017]/20 flex items-center justify-center mx-auto mb-6"
          >
            <FaCheck className="w-10 h-10 text-[#D4A017]" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Welcome to the <span className="text-[#D4A017]">Movement!</span>
          </h1>
          <p className="text-[#0F172A]/70 text-lg mb-8">
            Thank you for joining us, {formData.firstName}. Our team will contact you within 24 hours to discuss next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#1E3A8A] text-[#0F172A] font-semibold hover:bg-[#0F172A] transition-colors"
            >
              Return Home
            </a>
            <a 
              href="/support" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-[#D4A017] text-[#D4A017] font-semibold hover:bg-[#D4A017] hover:text-[#0F172A] transition-colors"
            >
              Support the Campaign
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
            backgroundImage: `radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Gold accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              className="w-16 h-1 bg-gradient-to-r from-[#D4A017] to-[#E6C200] mx-auto rounded-full mb-6"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-[#D4A017]/30 text-[#D4A017] font-medium text-sm mb-6"
            >
              <FaHandshake className="w-4 h-4" />
              Be Part of the Change
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-slogan text-4xl md:text-5xl lg:text-6xl text-[#0F172A] mb-6"
            >
              Join the <span className="text-[#D4A017]">Movement</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#0F172A]/80 mb-8"
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
                <div className="text-3xl font-bold text-[#D4A017]">10,000+</div>
                <div className="text-[#0F172A]/60">Volunteers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#D4A017]">47</div>
                <div className="text-[#0F172A]/60">Counties</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#D4A017]">2027</div>
                <div className="text-[#0F172A]/60">Victory</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              {/* Gold accent line */}
              <div className="w-24 h-1 bg-gradient-to-r from-[#D4A017] to-[#E6C200] mx-auto rounded-full mb-6" />
              <h2 className="font-headline text-3xl md:text-4xl text-[#0F172A] mb-4">
                How You Can <span className="text-[#D4A017]">Help</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We need passionate individuals in every role. Choose where your skills can make the biggest impact.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerRoles.map((role, index) => (
              <ScrollReveal key={role.title} delay={index * 0.1}>
                <div 
                  className={`h-full p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#D4A017]/50 hover:shadow-lg transition-all cursor-pointer group ${
                    formData.role === role.title ? 'border-[#D4A017] ring-2 ring-[#D4A017]/20' : ''
                  }`}
                  onClick={() => setFormData({ ...formData, role: role.title })}
                >
                  <div className="w-14 h-14 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4A017]/20 transition-colors">
                    <role.icon className="w-7 h-7 text-[#1E3A8A] group-hover:text-[#D4A017] transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{role.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{role.description}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FaCalendarAlt className="text-[#D4A017]" />
                    {role.commitment}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* County Champions - Digital Ground Game */}
      <section className="py-20 bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0F172A] text-white relative overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="w-24 h-1 bg-gradient-to-r from-[#D4A017] to-[#E6C200] mx-auto rounded-full mb-6" />
              <h2 className="font-headline text-3xl md:text-4xl mb-4">
                County <span className="text-[#D4A017]">Digital Champions</span>
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto text-lg">
                Dr. Kinity is in the USA, but the movement is alive in all 47 counties. 
                Join your county WhatsApp group and connect with local coordinators organizing 
                digital rallies, voter education, and grassroots mobilization.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Find Your County Team</h3>
                  <ul className="space-y-3 text-white/90">
                    <li className="flex items-start gap-3">
                      <FaCheck className="w-5 h-5 text-[#D4A017] flex-shrink-0 mt-0.5" />
                      <span>Get real-time updates from your county coordinator</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="w-5 h-5 text-[#D4A017] flex-shrink-0 mt-0.5" />
                      <span>Receive shareable posters and campaign materials</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="w-5 h-5 text-[#D4A017] flex-shrink-0 mt-0.5" />
                      <span>Join virtual town halls with Dr. Kinity from the USA</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="w-5 h-5 text-[#D4A017] flex-shrink-0 mt-0.5" />
                      <span>Organize local meetups and voter registration drives</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="w-5 h-5 text-[#D4A017] flex-shrink-0 mt-0.5" />
                      <span>Earn campaign rewards and recognition as a top champion</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                        <FaWhatsapp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Join via WhatsApp</p>
                        <p className="text-white/60 text-sm">Message us your county name</p>
                      </div>
                    </div>
                    <a
                      href="https://wa.me/254713064026?text=Hello%2C%20I%20want%20to%20join%20my%20county%20WhatsApp%20group.%20My%20county%20is%3A%20"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-4 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-colors"
                    >
                      Connect to My County
                    </a>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#D4A017] flex items-center justify-center">
                        <FaUsers className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Become a Coordinator</p>
                        <p className="text-white/60 text-sm">No coordinator in your county yet?</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const form = document.getElementById('volunteer-form');
                        form?.scrollIntoView({ behavior: 'smooth' });
                        setFormData(prev => ({ ...prev, role: 'County Coordinator' }));
                      }}
                      className="block w-full text-center py-4 rounded-xl bg-[#D4A017] text-[#0F172A] font-bold hover:bg-[#E6C200] transition-colors"
                    >
                      Apply to Lead My County
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Registration Form */}
      <section id="volunteer-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              {/* Gold accent line */}
              <div className="w-24 h-1 bg-gradient-to-r from-[#D4A017] to-[#E6C200] mx-auto rounded-full mb-6" />
              <h2 className="font-headline text-3xl md:text-4xl text-[#0F172A] mb-4">
                Sign Up to <span className="text-[#D4A017]">Volunteer</span>
              </h2>
              <p className="text-slate-600">
                Fill out the form below and our team will contact you with next steps.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 md:p-12">
              {/* Personal Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#0F172A] mb-6 flex items-center gap-2">
                  <FaUser className="text-[#1E3A8A]" />
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent"
                        placeholder="+254 XXX XXX XXX"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#0F172A] mb-6 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#D4A017]" />
                  Location
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">County *</label>
                    <div className="relative">
                      <select
                        required
                        value={formData.county}
                        onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent appearance-none"
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
                    <label className="block text-sm font-medium text-slate-700 mb-2">Constituency/Ward</label>
                    <input
                      type="text"
                      value={formData.constituency}
                      onChange={(e) => setFormData({ ...formData, constituency: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent"
                      placeholder="e.g., Kiambaa Constituency"
                    />
                  </div>
                </div>
              </div>

              {/* Role & Availability */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#0F172A] mb-6 flex items-center gap-2">
                  <FaHandshake className="text-[#D4A017]" />
                  Volunteer Preferences
                </h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Role *</label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent appearance-none"
                  >
                    <option value="">Select a role</option>
                    {volunteerRoles.map(role => (
                      <option key={role.title} value={role.title}>{role.title}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Availability *</label>
                  <select
                    required
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent appearance-none"
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">Relevant Experience</label>
                  <textarea
                    rows={3}
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent resize-none"
                    placeholder="Tell us about any relevant experience..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Why do you want to join? *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent resize-none"
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
                    className="w-5 h-5 rounded border-slate-600 bg-white text-[#1E3A8A] focus:ring-[#D4A017] mt-0.5"
                  />
                  <span className="text-slate-600 text-sm">
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
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] text-[#0F172A] font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
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


    </div>
  );
}
