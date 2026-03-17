'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
  FaClock,
  FaShieldAlt,
  FaBullhorn,
  FaDonate,
  FaCalendarAlt,
  FaCommentDots,
  FaUserTie,
  FaMapMarkedAlt,
  FaBuilding,
  FaHeadset,
  FaAmbulance,
} from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

// Campaign Contact Information
const CAMPAIGN_CONTACTS = {
  emergency: {
    phone: '+254 700 000 000', // 24/7 Hotline
    whatsapp: '+254 700 000 001',
    label: 'Emergency Response Team',
    description: 'For urgent incidents, security concerns, and immediate campaign matters',
  },
  general: {
    email: 'info@isaackinity.net',
    whatsapp: '+254 711 000 000',
    phone: '+254 711 000 000',
    hours: 'Mon - Fri: 8:00 AM - 6:00 PM EAT',
  },
  media: {
    email: 'press@isaackinity.net',
    whatsapp: '+254 722 000 000',
    phone: '+254 722 000 000',
    label: 'Media Relations',
  },
  volunteer: {
    email: 'volunteer@isaackinity.net',
    phone: '+254 733 000 000',
  },
  events: {
    email: 'events@isaackinity.net',
    phone: '+254 744 000 000',
  },
  policy: {
    email: 'policy@isaackinity.net',
  },
  donations: {
    email: 'donations@isaackinity.net',
    phone: '+254 755 000 000',
  },
  corruption: {
    email: 'integrity@isaackinity.net',
    whatsapp: '+254 766 000 000',
    anonymous: true,
    label: 'Anti-Corruption Hotline',
  },
};

// Office Locations
const OFFICES = [
  {
    name: 'Campaign Headquarters',
    location: 'Nairobi CBD',
    address: 'Coming Soon - Nairobi, Kenya',
    type: 'headquarters',
    hours: 'Mon-Fri: 8AM - 6PM | Sat: 9AM - 2PM',
    phone: CAMPAIGN_CONTACTS.general.phone,
    coordinates: { lat: -1.2921, lng: 36.8219 },
  },
  {
    name: 'Mombasa Regional Office',
    location: 'Mombasa County',
    address: 'Coming Soon - Mombasa, Kenya',
    type: 'regional',
    hours: 'Mon-Fri: 8AM - 5PM',
    phone: '+254 700 000 002',
  },
  {
    name: 'Kisumu Regional Office',
    location: 'Kisumu County',
    address: 'Coming Soon - Kisumu, Kenya',
    type: 'regional',
    hours: 'Mon-Fri: 8AM - 5PM',
    phone: '+254 700 000 003',
  },
  {
    name: 'Nakuru Regional Office',
    location: 'Nakuru County',
    address: 'Coming Soon - Nakuru, Kenya',
    type: 'regional',
    hours: 'Mon-Fri: 8AM - 5PM',
    phone: '+254 700 000 004',
  },
];

// Department Contacts
interface DepartmentContact {
  icon: React.ElementType;
  title: string;
  description: string;
  email?: string;
  phone?: string;
  color: string;
  urgent?: boolean;
}

const DEPARTMENTS: DepartmentContact[] = [
  {
    icon: FaUsers,
    title: 'Volunteer Coordination',
    description: 'Join the ground team, organize events, or help with canvassing',
    email: CAMPAIGN_CONTACTS.volunteer.email,
    phone: CAMPAIGN_CONTACTS.volunteer.phone,
    color: 'from-[#0074D9] to-[#005CB0]',
  },
  {
    icon: FaNewspaper,
    title: 'Media & Communications',
    description: 'Press inquiries, interview requests, and media partnerships',
    email: CAMPAIGN_CONTACTS.media.email,
    phone: CAMPAIGN_CONTACTS.media.phone,
    color: 'from-[#6B2C91] to-[#4a1f66]',
  },
  {
    icon: FaCalendarAlt,
    title: 'Events & Rallies',
    description: 'Host an event, request a town hall, or rally coordination',
    email: CAMPAIGN_CONTACTS.events.email,
    phone: CAMPAIGN_CONTACTS.events.phone,
    color: 'from-[#0074D9] to-[#6B2C91]',
  },
  {
    icon: FaCommentDots,
    title: 'Policy & Issues',
    description: 'Share policy suggestions, report community issues, or policy questions',
    email: CAMPAIGN_CONTACTS.policy.email,
    color: 'from-[#6B2C91] to-[#0074D9]',
  },
  {
    icon: FaDonate,
    title: 'Donations & Support',
    description: 'Financial contributions, fundraising events, and donor relations',
    email: CAMPAIGN_CONTACTS.donations.email,
    phone: CAMPAIGN_CONTACTS.donations.phone,
    color: 'from-[#E91D0E] to-[#BA170C]',
  },
  {
    icon: FaShieldAlt,
    title: 'Security & Safety',
    description: 'Security concerns, incident reports, and safety coordination',
    phone: CAMPAIGN_CONTACTS.emergency.phone,
    color: 'from-[#E91D0E] to-[#6B2C91]',
    urgent: true,
  },
];

const COUNTIES = [
  'Mombasa', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita-Taveta',
  'Garissa', 'Wajir', 'Mandera', 'Marsabit', 'Isiolo', 'Meru',
  'Tharaka-Nithi', 'Embu', 'Kitui', 'Machakos', 'Makueni', 'Nyandarua',
  'Nyeri', 'Kirinyaga', "Murang'a", 'Kiambu', 'Turkana', 'West Pokot',
  'Samburu', 'Trans Nzoia', 'Uasin Gishu', 'Elgeyo-Marakwet', 'Nandi',
  'Baringo', 'Laikipia', 'Nakuru', 'Narok', 'Kajiado', 'Kericho',
  'Bomet', 'Kakamega', 'Vihiga', 'Bungoma', 'Busia', 'Siaya',
  'Kisumu', 'Homa Bay', 'Migori', 'Kisii', 'Nyamira', 'Nairobi'
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
    answer: 'For media inquiries, interviews, and press materials, please contact our Media & Communications team. Include your outlet name, deadline, and nature of the request for a faster response.'
  },
  {
    question: 'How can I report a campaign incident or safety concern?',
    answer: 'If you witness or experience any incident at a campaign event, please use the 24/7 Emergency Hotline immediately. Your safety is our priority, and all reports are handled confidentially.'
  },
  {
    question: 'Can I host a campaign event in my area?',
    answer: 'Absolutely! Contact your county coordinator or use the Events department contact. We\'ll help you organize town halls, meet-and-greets, or volunteer recruitment events in your community.'
  },
  {
    question: 'How do I report corruption or integrity issues?',
    answer: 'Use our Anti-Corruption Hotline to report any integrity concerns. You can remain anonymous. Dr. Kinity is committed to zero tolerance for corruption at all levels.'
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
  const [corruptionForm, setCorruptionForm] = useState({
    anonymous: true,
    name: '',
    contact: '',
    incident: '',
    details: '',
    county: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingCorruption, setIsSubmittingCorruption] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeOffice, setActiveOffice] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCorruptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setCorruptionForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleCountyChange = (county: string) => {
    setSelectedCounty(county);
    setFormData({ ...formData, county });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Campaign Inquiry: ${formData.inquiryType}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `County: ${formData.county}\n` +
      `Inquiry Type: ${formData.inquiryType}\n\n` +
      `Message:\n${formData.message}`
    );

    window.location.href = `mailto:${CAMPAIGN_CONTACTS.general.email}?subject=${subject}&body=${body}`;

    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      county: '',
      inquiryType: '',
      message: '',
    });
  };

  const handleCorruptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingCorruption(true);

    const subject = encodeURIComponent('Anonymous Integrity Report');
    const body = encodeURIComponent(
      `${corruptionForm.anonymous ? 'Anonymous Report' : `From: ${corruptionForm.name}`}\n` +
      `County: ${corruptionForm.county}\n` +
      `Incident Type: ${corruptionForm.incident}\n\n` +
      `Details:\n${corruptionForm.details}`
    );

    window.location.href = `mailto:${CAMPAIGN_CONTACTS.corruption.email}?subject=${subject}&body=${body}`;

    setIsSubmittingCorruption(false);
    setCorruptionForm({
      anonymous: true,
      name: '',
      contact: '',
      incident: '',
      details: '',
      county: '',
    });
  };

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com/Kinity2027', label: 'Facebook', color: 'hover:bg-blue-600', followers: '50K+' },
    { icon: FaTwitter, href: 'https://twitter.com/Kinity2027', label: 'Twitter', color: 'hover:bg-sky-500', followers: '35K+' },
    { icon: FaInstagram, href: 'https://instagram.com/Kinity2027', label: 'Instagram', color: 'hover:bg-pink-600', followers: '45K+' },
    { icon: FaYoutube, href: 'https://youtube.com/@Kinity2027', label: 'YouTube', color: 'hover:bg-red-600', followers: '20K+' },
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
                Your Voice <span className="text-[#E91D0E]">Matters</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Whether it&apos;s an emergency, a suggestion, or you want to join the movement — 
                we&apos;re here to listen and act. Reach out through any channel below.
              </p>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Emergency & Quick Contact Cards */}
      <section className="relative -mt-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Emergency Hotline - Prominent */}
          <ScrollReveal>
            <div className="mb-6 bg-gradient-to-r from-[#E91D0E] to-[#BA170C] rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                    <FaAmbulance className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-white/80 text-sm font-medium">24/7 EMERGENCY HOTLINE</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {CAMPAIGN_CONTACTS.emergency.phone}
                    </h3>
                    <p className="text-white/70 text-sm">
                      For urgent incidents, security concerns, and immediate response
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a
                    href={`tel:${CAMPAIGN_CONTACTS.emergency.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#E91D0E] font-bold hover:bg-slate-100 transition-all"
                  >
                    <FaPhone className="w-5 h-5" />
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${CAMPAIGN_CONTACTS.emergency.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-all"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Contact Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              {
                icon: FaHandsHelping,
                title: 'Become a Volunteer',
                description: 'Join thousands across all 47 counties. Help with canvassing, events, or digital outreach.',
                action: 'Sign Up',
                href: '/join-us',
                color: 'from-[#0074D9] to-[#005CB0]',
                iconBg: 'bg-[#0074D9]',
              },
              {
                icon: FaNewspaper,
                title: 'Media & Press',
                description: 'For interview requests, press materials, and media inquiries.',
                action: 'Contact Press',
                href: `mailto:${CAMPAIGN_CONTACTS.media.email}`,
                color: 'from-[#6B2C91] to-[#4a1f66]',
                iconBg: 'bg-[#6B2C91]',
                external: true,
              },
              {
                icon: FaMapMarkerAlt,
                title: 'Find Your County',
                description: 'Connect with local coordinators for events and opportunities near you.',
                action: 'Find Coordinator',
                href: '#county-coordinators',
                color: 'from-[#0074D9] to-[#6B2C91]',
                iconBg: 'bg-gradient-to-br from-[#0074D9] to-[#6B2C91]',
              },
              {
                icon: FaShieldAlt,
                title: 'Report Corruption',
                description: 'Zero tolerance policy. Report integrity issues anonymously.',
                action: 'Report Now',
                href: '#report-corruption',
                color: 'from-[#E91D0E] to-[#BA170C]',
                iconBg: 'bg-[#E91D0E]',
              },
            ].map((card, index) => (
              <ScrollReveal key={card.title} delay={index * 0.1}>
                <div className="group relative h-full">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.color} rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur`} />
                  <div className="relative h-full p-6 bg-white rounded-2xl shadow-lg border border-slate-100 hover:border-transparent transition-all duration-300">
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

      {/* Office Locations Section */}
      <section className="py-16 lg:py-20 bg-slate-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0074D9]/10 text-[#0074D9] font-semibold text-sm mb-4">
              <FaBuilding className="w-4 h-4 inline mr-2" />
              Visit Our Offices
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-[#111111] mb-4">
              Campaign <span className="text-[#0074D9]">Offices</span> Near You
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Visit our headquarters or regional offices. Our doors are open to every Kenyan.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Office List */}
            <ScrollReveal>
              <div className="space-y-4">
                {OFFICES.map((office, index) => (
                  <motion.div
                    key={office.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                      activeOffice === index 
                        ? 'bg-white border-[#0074D9] shadow-lg' 
                        : 'bg-white border-slate-200 hover:border-[#0074D9]/50'
                    }`}
                    onClick={() => setActiveOffice(index)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        office.type === 'headquarters' ? 'bg-[#E91D0E]/10' : 'bg-[#0074D9]/10'
                      }`}>
                        {office.type === 'headquarters' ? (
                          <FaBuilding className="w-6 h-6 text-[#E91D0E]" />
                        ) : (
                          <FaMapMarkerAlt className="w-6 h-6 text-[#0074D9]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-[#111111]">{office.name}</h3>
                          {office.type === 'headquarters' && (
                            <span className="px-2 py-0.5 bg-[#E91D0E] text-white text-xs rounded-full">
                              HQ
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm">{office.address}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <FaClock className="w-4 h-4" />
                            {office.hours}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaPhone className="w-4 h-4" />
                            {office.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Map Placeholder / Visual */}
            <ScrollReveal delay={0.2}>
              <div className="h-full min-h-[400px] bg-gradient-to-br from-[#0074D9]/5 to-[#6B2C91]/5 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-[#0074D9]/10 flex items-center justify-center mb-4">
                  <FaMapMarkedAlt className="w-10 h-10 text-[#0074D9]" />
                </div>
                <h3 className="text-xl font-bold text-[#111111] mb-2">
                  {OFFICES[activeOffice].name}
                </h3>
                <p className="text-slate-600 mb-4">{OFFICES[activeOffice].address}</p>
                <p className="text-sm text-slate-500 mb-6">
                  Interactive map coming soon. For now, contact us for directions.
                </p>
                <a
                  href={`tel:${OFFICES[activeOffice].phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0074D9] text-white font-semibold hover:bg-[#005CB0] transition-all"
                >
                  <FaPhone className="w-5 h-5" />
                  Call for Directions
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-[#6B2C91]/10 text-[#6B2C91] font-semibold text-sm mb-4">
              <FaHeadset className="w-4 h-4 inline mr-2" />
              Department Contacts
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-[#111111] mb-4">
              Contact the <span className="text-[#6B2C91]">Right Team</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Reach out to specific departments for faster, more relevant responses.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((dept, index) => (
              <ScrollReveal key={dept.title} delay={index * 0.1}>
                <div className="group h-full p-6 bg-white rounded-2xl border border-slate-200 hover:border-[#0074D9]/30 hover:shadow-xl transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${dept.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    <dept.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] mb-2">{dept.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{dept.description}</p>
                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    {dept.email && (
                      <a
                        href={`mailto:${dept.email}`}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#0074D9] transition-colors"
                      >
                        <FaEnvelope className="w-4 h-4" />
                        {dept.email}
                      </a>
                    )}
                    {dept.phone && (
                      <a
                        href={`tel:${dept.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#0074D9] transition-colors"
                      >
                        <FaPhone className="w-4 h-4" />
                        {dept.phone}
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* County Coordinators Section */}
      <section id="county-coordinators" className="py-16 lg:py-20 bg-slate-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0074D9]/10 text-[#0074D9] font-semibold text-sm mb-4">
              <FaUserTie className="w-4 h-4 inline mr-2" />
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
                  className="mt-6 p-6 bg-white rounded-2xl border border-slate-200 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0074D9] to-[#6B2C91] flex items-center justify-center">
                      <FaUserTie className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111111]">{selectedCounty} County</h3>
                      <p className="text-sm text-slate-500">Campaign Coordinator</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <FaUsers className="w-5 h-5 text-[#6B2C91]" />
                      </div>
                      <span>Coordinator contact coming soon</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <FaEnvelope className="w-5 h-5 text-[#0074D9]" />
                      </div>
                      <span>{selectedCounty.toLowerCase().replace(/\s+/g, '.')}@isaackinity.net</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <FaWhatsapp className="w-5 h-5 text-green-500" />
                      </div>
                      <span>WhatsApp group coming soon</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200 flex gap-3">
                    <Link
                      href="/join-us"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#0074D9] text-white font-semibold hover:bg-[#005CB0] transition-all"
                    >
                      Join Team
                      <FaExternalLinkAlt className="w-4 h-4" />
                    </Link>
                    <a
                      href={`https://wa.me/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-all"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      WhatsApp
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Report Corruption Section */}
      <section id="report-corruption" className="py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <span className="inline-block px-4 py-1 rounded-full bg-[#E91D0E]/10 text-[#E91D0E] font-semibold text-sm mb-4">
                <FaShieldAlt className="w-4 h-4 inline mr-2" />
                Zero Tolerance Policy
              </span>
              <h2 className="font-headline text-3xl md:text-4xl text-[#111111] mb-4">
                Report <span className="text-[#E91D0E]">Corruption</span> or Integrity Issues
              </h2>
              <p className="text-slate-600 mb-6">
                Dr. Kinity is committed to a corruption-free campaign and government. 
                If you witness or suspect any integrity issues, report them here. 
                All reports can be made anonymously.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-[#E91D0E]/10 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="w-6 h-6 text-[#E91D0E]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111111]">Email Report</h4>
                    <p className="text-slate-600 text-sm">{CAMPAIGN_CONTACTS.corruption.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111111]">WhatsApp Hotline</h4>
                    <p className="text-slate-600 text-sm">{CAMPAIGN_CONTACTS.corruption.whatsapp}</p>
                  </div>
                </div>

                <div className="p-4 bg-[#E91D0E]/5 rounded-xl border border-[#E91D0E]/20">
                  <p className="text-sm text-[#E91D0E] font-medium">
                    <FaExclamationTriangle className="w-4 h-4 inline mr-2" />
                    Your identity will be protected. Anonymous reports are fully supported.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold text-[#111111] mb-6">Submit a Report</h3>
                <form onSubmit={handleCorruptionSubmit} className="space-y-5">
                  {/* Anonymous Toggle */}
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <input
                      type="checkbox"
                      id="anonymous"
                      name="anonymous"
                      checked={corruptionForm.anonymous}
                      onChange={handleCorruptionChange}
                      className="w-5 h-5 rounded border-slate-300 text-[#E91D0E] focus:ring-[#E91D0E]"
                    />
                    <label htmlFor="anonymous" className="text-sm font-medium text-slate-700">
                      Submit anonymously
                    </label>
                  </div>

                  {/* Name (if not anonymous) */}
                  {!corruptionForm.anonymous && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={corruptionForm.name}
                        onChange={handleCorruptionChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#111111] focus:outline-none focus:border-[#E91D0E] focus:ring-2 focus:ring-[#E91D0E]/20 transition-all"
                        placeholder="Optional"
                      />
                    </motion.div>
                  )}

                  {/* County */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      County Where Incident Occurred *
                    </label>
                    <select
                      name="county"
                      value={corruptionForm.county}
                      onChange={handleCorruptionChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#111111] focus:outline-none focus:border-[#E91D0E] focus:ring-2 focus:ring-[#E91D0E]/20 transition-all appearance-none cursor-pointer bg-white"
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

                  {/* Incident Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Type of Incident *
                    </label>
                    <select
                      name="incident"
                      value={corruptionForm.incident}
                      onChange={handleCorruptionChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#111111] focus:outline-none focus:border-[#E91D0E] focus:ring-2 focus:ring-[#E91D0E]/20 transition-all appearance-none cursor-pointer bg-white"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '1.5rem',
                      }}
                    >
                      <option value="">Select type...</option>
                      <option value="Bribery">Bribery</option>
                      <option value="Misuse of Resources">Misuse of Campaign Resources</option>
                      <option value="Fraud">Fraud</option>
                      <option value="Conflict of Interest">Conflict of Interest</option>
                      <option value="Abuse of Power">Abuse of Power</option>
                      <option value="Other">Other Integrity Issue</option>
                    </select>
                  </div>

                  {/* Details */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Incident Details *
                    </label>
                    <textarea
                      name="details"
                      value={corruptionForm.details}
                      onChange={handleCorruptionChange}
                      required
                      rows={4}
                      placeholder="Describe what happened, when, and who was involved..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#111111] placeholder-slate-400 focus:outline-none focus:border-[#E91D0E] focus:ring-2 focus:ring-[#E91D0E]/20 transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmittingCorruption}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E91D0E] to-[#BA170C] text-white font-bold text-lg hover:shadow-lg hover:shadow-[#E91D0E]/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    <FaShieldAlt className="w-5 h-5" />
                    {isSubmittingCorruption ? 'Submitting...' : 'Submit Report'}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#0074D9] to-[#6B2C91] px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-slogan text-3xl md:text-4xl text-white mb-4">
              Connect With Us Online
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Follow the campaign for daily updates, behind-the-scenes content, and live event coverage.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-[#0074D9] transition-all"
                >
                  <social.icon className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-semibold">{social.label}</div>
                    <div className="text-xs opacity-70 group-hover:text-[#0074D9]">{social.followers} followers</div>
                  </div>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form & Info Section */}
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

              <div className="space-y-4">
                <ScrollReveal delay={0.1}>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
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
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <FaWhatsapp className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111111]">WhatsApp</h3>
                      <p className="text-slate-600 text-sm">{CAMPAIGN_CONTACTS.general.whatsapp}</p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
                    <div className="w-12 h-12 rounded-xl bg-[#E91D0E]/10 flex items-center justify-center flex-shrink-0">
                      <FaClock className="w-6 h-6 text-[#E91D0E]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111111]">Office Hours</h3>
                      <p className="text-slate-600 text-sm">{CAMPAIGN_CONTACTS.general.hours}</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200">
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
