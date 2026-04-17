'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaCommentDots, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Message Sent!</h3>
        <p className="text-slate-600">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="space-y-5">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-colors ${
                errors.name 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-slate-200 focus:border-[#1E3A8A]'
              } focus:outline-none`}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-colors ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-slate-200 focus:border-[#1E3A8A]'
              } focus:outline-none`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Field (Optional) */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+254 XXX XXX XXX"
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#1E3A8A] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
            Subject
          </label>
          <div className="relative">
            <FaCommentDots className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#1E3A8A] focus:outline-none transition-colors appearance-none bg-white"
            >
              <option value="general">General Inquiry</option>
              <option value="volunteer">Volunteer</option>
              <option value="donate">Donation</option>
              <option value="media">Media Inquiry</option>
              <option value="event">Event Information</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you?"
            rows={5}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors resize-none ${
              errors.message 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-slate-200 focus:border-[#1E3A8A]'
            } focus:outline-none`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-[#1E3A8A] to-[#1E3A8A] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#1E3A8A]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <FaPaperPlane className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </div>
    </form>
  );
}
