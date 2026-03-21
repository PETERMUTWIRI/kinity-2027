// app/events/[slug]/page.tsx - Event Detail Page (No RSVP - Open to All)
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowLeft, FaBullhorn, FaUsers } from 'react-icons/fa';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug, deletedAt: null },
  });

  if (!event) {
    return { title: 'Event Not Found' };
  }

  return {
    title: `${event.title} | Events`,
    description: event.description?.slice(0, 160) || 'Join us for this campaign event.',
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  
  const event = await prisma.event.findUnique({
    where: { slug, deletedAt: null },
  });

  if (!event) {
    notFound();
  }

  const isPast = new Date(event.startDate) < new Date();

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[500px]">
        {event.cover ? (
          <Image
            src={event.cover}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] to-[#D4A017]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
            <Link 
              href="/events"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Events
            </Link>
            <span className="inline-block px-4 py-1 rounded-full bg-[#DC2626] text-white text-sm font-bold mb-4">
              {event.category}
            </span>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="w-5 h-5 text-[#1E3A8A]" />
                <span className="text-lg">{new Date(event.startDate).toLocaleDateString('en-KE', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-5 h-5 text-[#DC2626]" />
                <span className="text-lg">{event.county || event.location}</span>
              </div>
              {event.venue && (
                <div className="flex items-center gap-2">
                  <FaBullhorn className="w-5 h-5 text-[#D4A017]" />
                  <span className="text-lg">{event.venue}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {event.description ? (
              <div 
                className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            ) : (
              <p className="text-slate-400 text-lg">Join us for this important campaign event.</p>
            )}

            {/* Open to All Banner */}
            {!isPast && (
              <div className="mt-12 p-6 bg-gradient-to-r from-[#1E3A8A]/20 to-[#D4A017]/20 border border-[#1E3A8A]/30 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1E3A8A] flex items-center justify-center flex-shrink-0">
                    <FaUsers className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Open to All</h3>
                    <p className="text-slate-300">This event is free and open to everyone. No registration required - just show up!</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Event Details */}
          <div>
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 sticky top-24">
              <h3 className="font-headline text-xl text-white mb-6">Event Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaCalendarAlt className="w-5 h-5 text-[#1E3A8A] mt-1" />
                  <div>
                    <p className="text-slate-400 text-sm">Date</p>
                    <p className="text-white">{new Date(event.startDate).toLocaleDateString('en-KE', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaClock className="w-5 h-5 text-[#DC2626] mt-1" />
                  <div>
                    <p className="text-slate-400 text-sm">Time</p>
                    <p className="text-white">{new Date(event.startDate).toLocaleTimeString('en-KE', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-[#D4A017] mt-1" />
                  <div>
                    <p className="text-slate-400 text-sm">Location</p>
                    <p className="text-white">{event.venue || 'TBA'}</p>
                    <p className="text-slate-400 text-sm">{event.county || event.location}</p>
                  </div>
                </div>

                {event.address && (
                  <div className="flex items-start gap-3">
                    <FaBullhorn className="w-5 h-5 text-[#1E3A8A] mt-1" />
                    <div>
                      <p className="text-slate-400 text-sm">Address</p>
                      <p className="text-white">{event.address}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              {!isPast && (
                <div className="mt-8 pt-6 border-t border-slate-800">
                  <a
                    href="#"
                    className="block w-full py-4 text-center rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] text-white font-bold hover:shadow-lg hover:shadow-[#1E3A8A]/30 transition-all"
                  >
                    Add to Calendar
                  </a>
                  <p className="text-center text-slate-500 text-sm mt-3">
                    Free entry - All are welcome!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
