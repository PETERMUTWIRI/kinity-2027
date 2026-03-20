'use client';

import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

const testimonials = [
  {
    id: 1,
    name: 'Mary Wanjiku',
    role: 'Business Owner, Nairobi',
    content: 'Dr. Kinity represents the change Kenya desperately needs. His commitment to ending corruption and supporting local businesses convinced me to join the movement.',
    rating: 5,
  },
  {
    id: 2,
    name: 'James Otieno',
    role: 'Teacher, Kisumu',
    content: 'For 40 years, this man has fought for Kenyans. His vision for free education and healthcare for all is exactly what our children need.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Amina Hassan',
    role: 'Youth Leader, Mombasa',
    content: 'The youth of Kenya are tired of recycled corrupt politicians. Dr. Kinity is the fresh start we need. Kenya\'s Hope 2027!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Peter Kimani',
    role: 'Farmer, Nakuru',
    content: 'Finally, a leader who understands the struggles of farmers. His plan to reduce cost of living by 40% gives me hope for the future.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-[#E91D0E]/10 text-[#E91D0E] font-semibold text-sm mb-4">
              Voices of Kenyans
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] mb-4">
              What People Are <span className="text-[#0074D9]">Saying</span>
            </h2>
            <p className="text-lg text-slate-600">
              Join thousands of Kenyans who believe in a corruption-free, prosperous nation.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-100 h-full"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                
                <FaQuoteLeft className="w-8 h-8 text-[#0074D9]/20 mb-4" />
                
                <p className="text-slate-700 leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0074D9] to-[#6B2C91] flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#111111]">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
