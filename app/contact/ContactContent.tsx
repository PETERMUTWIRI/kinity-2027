'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaPaperPlane,
  FaHandsHelping,
  FaNewspaper,
  FaExclamationTriangle,
  FaUsers,
  FaHandshake,
  FaFlag,
  FaChevronDown,
  FaChevronUp,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

// Placeholder contact info - can be updated later
const CAMPAIGN_CONTACTS = {
  general: {
    email: 'info@isaackinity.net',
    whatsapp: '+254 XXX XXX XXX', // To be updated
    phone: '+254 XXX XXX XXX', // To be updated
  },
  media: {
    email: 'press@isaackinity.net',
    whatsapp: '+254 XXX XXX XXX', // To be updated
  },
  volunteer: {
    email: 'volunteer@isaackinity.net',
  },
  emergency: {
    phone: '+254 XXX XXX XXX', // To be updated - for incident reporting
  }
};

const COUNTIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Kiambu', 'Kajiado', 'Machakos', 'Murang\'a',
  'Nyeri', 'Kirinyaga', 'Nyandarua', 'Meru', 'Tharaka-Nithi', 'Embu', 'Kitui', 'Makueni',
  'Taita-Taveta', 'Kwale', 'Kilifi', 'Lamu', 'Tana River', 'Garissa', 'Wajir', 'Mandera',
  'Marsabit', 'Isiolo', 'Samburu', 'Turkana', 'West Pokot', 'Trans Nzoia', 'Uasin Gishu',
  'Elgeyo-Marakwet', 'Nandi', 'Baringo', 'Laikipia', 'Samburu', 'Kakamega', 'Vihiga',
  'Bungoma', 'Busia', 'Siaya', 'Kisumu', 'Homa Bay', 'Migori', 'Kisii', 'Nyamira'
];

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: 'How can I volunteer for the campaign?',
    answer: 'You can sign up as a volunteer through our Join Us page or contact our volunteer coordinator directly. We have opportunities for canvassers, event staff, digital volunteers, drivers, and county coordinators. Every contribution matters!'
  },
  {
    question: 'How do I find my county coordinator?',
    answer: 'Select your county from the dropdown above to get contact information for your local county coordinator. They can provide information about local events, volunteer opportunities, and how to get involved in your area.'
  },
  {
    question: 'I\'m from the media. How do I request an interview?',
    answer: 'For media inquiries, interviews, and press materials, please use the Media & Press contact option above. Include your outlet name, deadline, and nature of the request for a faster response.'
  },
  {
    question: 'How can I report a campaign incident or safety concern?',
    answer: 'If you witness or experience any incident at a campaign event, please use the Emergency/Report option above immediately. Your safety is our priority, and all reports are handled confidentially.'
  },
  {
    question: 'Can I host a campaign event in my area?',
    answer: 'Absolutely! Contact your county coordinator or use the general inquiry form. We\'ll help you organize town halls, meet-and-greets, or volunteer recruitment events in your community.'
  },
  {
    question: 'How do I make a donation to the campaign?',
    answer: 'Visit our Support page to make a contribution. We accept M-Pesa, bank transfers, and international donations. Every shilling helps us reach more Kenyans with our message of hope and transformation.'
  }
];

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    county: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountyChange = (county: string) => {
    setSelectedCounty(county);
    setFormData({ ...formData, county });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format message for email/WhatsApp
    const subject = encodeURIComponent(`Campaign Inquiry: ${formData.inquiryType}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `County: ${formData.county}\n` +
      `Inquiry Type: ${formData.inquiryType}\n\n` +
      `Message:\n${formData.message}`
    );

    // Open email client
    window.location.href = `mailto:${CAMPAIGN_CONTACTS.general.email}?subject=${subject}&body=${body}`;

    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      county: '',
      inquiryType: '',
      message: '',
    });
  };

  const contactCards = [
    {
      icon: FaHandsHelping,
      title: 'Become a Volunteer',
      description: 'Join thousands of volunteers across all 47 counties. Help with canvassing, events, or digital outreach.',
      action: 'Sign Up',
      href: '/join-us',
      color: 'from-[#0074D9] to-[#005CB0]',
      iconBg: 'bg-[#0074D9]',
    },
    {
      icon: FaNewspaper,
      title: 'Media & Press',
      description: 'For interview requests, press materials, and media inquiries.',
      action: 'Contact Press Team',
      href: `mailto:${CAMPAIGN_CONTACTS.media.email}`,
      color: 'from-[#6B2C91] to-[#4a1f66]',
      iconBg: 'bg-[#6B2C91]',
      external: true,
    },
    {
      icon: FaExclamationTriangle,
      title: 'Report an Incident',
      description: 'Safety concerns or incident reports from campaign events. Confidential and immediate response.',
      action: 'Report Now',
      href: `tel:${CAMPAIGN_CONTACTS.emergency.phone.replace(/\s/g, '')}`,
      color: 'from-[#E91D0E] to-[#BA170C]',
      iconBg: 'bg-[#E91D0E]',
      external: true,
      urgent: true,
    },
    {
      icon: FaUsers,
      title: 'County Coordinator',
      description: 'Connect with your local county coordinator for events and local opportunities.',
      action: 'Find Coordinator',
      href: '#county-coordinators',
      color: 'from-[#0074D9] to-[#6B2C91]',
      iconBg: 'bg-gradient-to-br from-[#0074D9] to-[#6B2C91]',
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com/Kinity2027', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: FaTwitter, href: 'https://twitter.com/Kinity2027', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: FaInstagram, href: 'https://instagram.com/Kinity2027', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: FaYoutube, href: 'https://youtube.com/@Kinity2027', label: 'YouTube', color: 'hover:bg-red-600' },
  ];

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 lg:pb-20 bg-gradient-to-br from-[#0074D9] to-[#6B2C91]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.png')] opacity-5" />
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#E91D0E]/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
                <FaHandshake className="w-4 h-4" />
                Get In Touch
              </span>
              <h1 className="font-slogan text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                Let&apos;s Build a <span className="text-[#E91D0E]">Better Kenya</span> Together
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Whether you want to volunteer, report an incident, or connect with your county coordinator, 
                we&apos;re here to help. Every voice matters in this movement.
              </p>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="relative -mt-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {contactCards.map((card, index) => (
              <ScrollReveal key={card.title} delay={index * 0.1}>
                <div className="group relative h-full">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.color} rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur`} />
                  <div className="relative h-full p-6 bg-white rounded-2xl shadow-lg border border-slate-100 hover:border-transparent transition-all duration-300">
                    {card.urgent && (
                      <span className="absolute -top-3 right-4 px-3 py-1 bg-[#E91D0E] text-white text-xs font-bold rounded-full">
                        24/7 Hotline
                      </span>
                    )}
                    <div className={`w-14 h-14 ${card.iconBg} rounded-xl flex items-center justify-center text-white mb-4`}>
                      <card.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#111111] mb-2">{card.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{card.description}</p>
                    {card.external ? (
                      <a
                        href={card.href}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${card.color} text-white text-sm font-semibold hover:shadow-lg transition-all`}
                      >
                        {card.action}
                        <FaExternalLinkAlt className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        href={card.href}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${card.color} text-white text-sm font-semibold hover:shadow-lg transition-all`}
                      >
                        {card.action}
                      </Link>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* County Coordinators Section */}
      <section id="county-coordinators" className="py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0074D9]/10 text-[#0074D9] font-semibold text-sm mb-4">
              Local Support
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-[#111111] mb-4">
              Find Your <span className="text-[#0074D9]">County Coordinator</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Connect with campaign coordinators in your county for local events, volunteer opportunities, and updates.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Your County
              </label>
              <div className="relative">
                <select
                  value={selectedCounty}
                  onChange={(e) => handleCountyChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#111111] focus:outline-none focus:border-[#0074D9] focus:ring-2 focus:ring-[#0074D9]/20 transition-all appearance-none cursor-pointer bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5rem',
                  }}
                >
                  <option value="">Choose a county...</option>
                  {COUNTIES.map((county) => (
                    <option key={county} value={county}>{county}</option>
                  ))}
                </select>
              </div>

              {selectedCounty && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0074D9]/10 flex items-center justify-center">
                      <FaMapMarkerAlt className="w-6 h-6 text-[#0074D9]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111111]">{selectedCounty} County</h3>
                      <p className="text-sm text-slate-500">Campaign Coordinator</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-600">
                      <FaUsers className="w-5 h-5 text-[#6B2C91]" />
                      <span>Coordinator contact coming soon</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <FaEnvelope className="w-5 h-5 text-[#0074D9]" />
                      <span>{selectedCounty.toLowerCase().replace(/\s+/g, '.')}@isaackinity.net</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <Link
                      href="/join-us"
                      className="inline-flex items-center gap-2 text-[#0074D9] font-semibold hover:gap-3 transition-all"
                    >
                      Join {selectedCounty} team
                      <FaExternalLinkAlt className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 lg:py-20 bg-slate-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Contact Info */}
            <div>
              <ScrollReveal>
                <span className="inline-block px-4 py-1 rounded-full bg-[#E91D0E]/10 text-[#E91D0E] font-semibold text-sm mb-4">
                  General Inquiry
                </span>
                <h2 className="font-headline text-3xl md:text-4xl text-[#111111] mb-4">
                  Send Us a <span className="text-[#0074D9]">Message</span>
                </h2>
                <p className="text-slate-600 mb-8">
                  Have a question or suggestion? Fill out the form and our team will get back to you within 24-48 hours.
                </p>
              </ScrollReveal>

              <div className="space-y-6">
                <ScrollReveal delay={0.1}>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100">
                    <div className="w-12 h-12 rounded-xl bg-[#0074D9]/10 flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="w-6 h-6 text-[#0074D9]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111111]">Email Us</h3>
                      <p className="text-slate-600 text-sm">{CAMPAIGN_CONTACTS.general.email}</p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100">
                    <div className="w-12 h-12 rounded-xl bg-[#6B2C91]/10 flex items-center justify-center flex-shrink-0">
                      <FaWhatsapp className="w-6 h-6 text-[#6B2C91]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111111]">WhatsApp</h3>
                      <p className="text-slate-600 text-sm">{CAMPAIGN_CONTACTS.general.whatsapp}</p>
                      <p className="text-xs text-slate-400 mt-1">Coming soon</p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100">
                    <div className="w-12 h-12 rounded-xl bg-[#E91D0E]/10 flex items-center justify-center flex-shrink-0">
                      <FaFlag className="w-6 h-6 text-[#E91D0E]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111111]">Campaign Headquarters</h3>
                      <p className="text-slate-600 text-sm">Nairobi, Kenya</p>
                      <p className="text-xs text-slate-400 mt-1">Full address coming soon</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Social Links */}
              <ScrollReveal delay={0.4}>
                <div className="mt-8">
                  <p className="text-sm font-medium text-slate-700 mb-4">Follow the Campaign</p>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 ${social.color} hover:text-white hover:border-transparent transition-all`}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right - Form */}
            <div>
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-100">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Kamau"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#111111] placeholder-slate-400 focus:outline-none focus:border-[#0074D9] focus:ring-2 focus:ring-[#0074D9]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#111111] placeholder-slate-400 focus:outline-none focus:border-[#0074D9] focus:ring-2 focus:ring-[#0074D9]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone & County */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+254 XXX XXX XXX"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#111111] placeholder-slate-400 focus:outline-none focus:border-[#0074D9] focus:ring-2 focus:ring-[#0074D9]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="county" className="block text-sm font-medium text-slate-700 mb-2">
                          Your County
                        </label>
                        <select
                          id="county"
                          name="county"
                          value={formData.county}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#111111] focus:outline-none focus:border-[#0074D9] focus:ring-2 focus:ring-[#0074D9]/20 transition-all appearance-none cursor-pointer bg-white"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            backgroundSize: '1.5rem',
                          }}
                        >
                          <option value="">Select county...</option>
                          {COUNTIES.map((county) => (
                            <option key={county} value={county}>{county}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-medium text-slate-700 mb-2">
                        Type of Inquiry *
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#111111] focus:outline-none focus:border-[#0074D9] focus:ring-2 focus:ring-[#0074D9]/20 transition-all appearance-none cursor-pointer bg-white"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '1.5rem',
                        }}
                      >
                        <option value="">Select inquiry type...</option>
                        <option value="General Question">General Question</option>
                        <option value="Volunteer Interest">Volunteer Interest</option>
                        <option value="Event Request">Host an Event</option>
                        <option value="Media Inquiry">Media Inquiry</option>
                        <option value="Partnership">Partnership/Sponsorship</option>
                        <option value="Feedback">Feedback/Suggestion</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us how we can help..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#111111] placeholder-slate-400 focus:outline-none focus:border-[#0074D9] focus:ring-2 focus:ring-[#0074D9]/20 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E91D0E] to-[#BA170C] text-white font-bold text-lg hover:shadow-lg hover:shadow-[#E91D0E]/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      <FaPaperPlane className="w-5 h-5" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>

                    <p className="text-center text-slate-500 text-sm">
                      By submitting, you agree to receive campaign updates. You can unsubscribe anytime.
                    </p>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-[#6B2C91]/10 text-[#6B2C91] font-semibold text-sm mb-4">
              FAQ
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-[#111111] mb-4">
              Frequently Asked <span className="text-[#0074D9]">Questions</span>
            </h2>
            <p className="text-slate-600">
              Quick answers to common questions about the campaign.
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div 
                  className="border border-slate-200 rounded-xl overflow-hidden hover:border-[#0074D9]/30 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-[#111111] pr-4">{faq.question}</span>
                    {openFaq === index ? (
                      <FaChevronUp className="w-5 h-5 text-[#0074D9] flex-shrink-0" />
                    ) : (
                      <FaChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 bg-white"
                    >
                      <p className="text-slate-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-[#0074D9] to-[#6B2C91] px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-slogan text-3xl md:text-4xl text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of Kenyans who are already part of this movement for change.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/join-us"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#E91D0E] text-white font-bold hover:bg-[#BA170C] transition-all hover:shadow-lg"
              >
                <FaHandshake className="w-5 h-5" />
                Join the Movement
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#0074D9] font-bold hover:bg-slate-100 transition-all"
              >
                <FaFlag className="w-5 h-5" />
                Support the Campaign
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
