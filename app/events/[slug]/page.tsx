// app/events/[slug]/page.tsx - Billion Dollar Event Detail Page
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaArrowLeft, 
  FaBullhorn, 
  FaUsers,
  FaWhatsapp,
  FaChevronDown,
} from 'react-icons/fa';
import { Suspense } from 'react';
import ShareButtons from './ShareButtons';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for SEO and social sharing
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug, deletedAt: null },
  });

  if (!event) {
    return { title: 'Event Not Found | National Vision Party' };
  }

  const description = event.description?.slice(0, 160) || 'Join us for this campaign event with Dr. Isaac Newton Kinity.';
  const canonicalUrl = `https://nationalvisionparty.com/events/${event.slug}`;

  return {
    title: `${event.title} | Campaign Event`,
    description,
    keywords: ['Dr Isaac Newton Kinity', 'campaign event', 'Kenya 2027', 'National Vision Party', event.category, event.location],
    authors: [{ name: 'National Vision Party' }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: event.title,
      description,
      url: canonicalUrl,
      siteName: 'National Vision Party',
      images: event.cover ? [
        {
          url: event.cover,
          width: 1200,
          height: 630,
          alt: event.title,
        }
      ] : [],
      locale: 'en_KE',
      type: 'article',
      publishedTime: event.startDate.toISOString(),
      modifiedTime: event.updatedAt?.toISOString(),
      section: 'Events',
      tags: [event.category, event.location, 'Campaign 2027'],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description,
      images: event.cover ? [event.cover] : [],
      creator: '@DrKinity2027',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Fetch other events for the "Explore More" section
async function getOtherEvents(currentSlug: string) {
  const now = new Date();
  
  const upcomingEvents = await prisma.event.findMany({
    where: {
      deletedAt: null,
      slug: { not: currentSlug },
      startDate: { gte: now },
    },
    orderBy: { startDate: 'asc' },
    take: 3,
  });

  const pastEvents = await prisma.event.findMany({
    where: {
      deletedAt: null,
      slug: { not: currentSlug },
      startDate: { lt: now },
    },
    orderBy: { startDate: 'desc' },
    take: 3,
  });

  return { upcomingEvents, pastEvents };
}

// Event Card Component
function EventCard({ event }: { event: any }) {
  const isPast = new Date(event.startDate) < new Date();
  
  return (
    <Link href={`/events/${event.slug}`} className="group">
      <article className={`bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-[#D4A017]/50 transition-all hover:shadow-xl hover:shadow-[#D4A017]/10 ${isPast ? 'opacity-70' : ''}`}>
        <div className="relative aspect-video overflow-hidden">
          {event.cover ? (
            <Image
              src={event.cover}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] flex items-center justify-center">
              <FaBullhorn className="w-12 h-12 text-white/30" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${isPast ? 'bg-slate-600 text-slate-300' : 'bg-[#DC2626] text-white'}`}>
              {isPast ? 'Past' : event.category}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-center gap-3 text-slate-400 text-sm mb-2">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="w-3 h-3 text-[#1E3A8A]" />
              {new Date(event.startDate).toLocaleDateString('en-KE', {
                day: 'numeric',
                month: 'short',
              })}
            </span>
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="w-3 h-3 text-[#DC2626]" />
              {event.county || event.location}
            </span>
          </div>
          <h4 className="font-headline text-lg text-white group-hover:text-[#D4A017] transition-colors line-clamp-2">
            {event.title}
          </h4>
        </div>
      </article>
    </Link>
  );
}

// Explore More Events Section
async function ExploreMoreEvents({ currentSlug }: { currentSlug: string }) {
  const { upcomingEvents, pastEvents } = await getOtherEvents(currentSlug);
  const hasEvents = upcomingEvents.length > 0 || pastEvents.length > 0;
  
  if (!hasEvents) return null;

  return (
    <section className="mt-20 pt-16 border-t border-slate-800">
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl md:text-4xl text-white mb-4">
          Explore More <span className="text-[#D4A017]">Events</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Join Dr. Isaac Newton Kinity at rallies, town halls, and community meetings across Kenya.
        </p>
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Upcoming Events
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Past Events - Collapsible */}
      {pastEvents.length > 0 && (
        <div className="border-t border-slate-800 pt-8">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                Past Events
                <span className="text-sm font-normal text-slate-500">({pastEvents.length})</span>
              </h3>
              <span className="transition-transform group-open:rotate-180">
                <FaChevronDown className="w-5 h-5 text-slate-500" />
              </span>
            </summary>
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </details>
        </div>
      )}
    </section>
  );
}

// Main Page Component
export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  
  const event = await prisma.event.findUnique({
    where: { slug, deletedAt: null },
  });

  if (!event) {
    notFound();
  }

  const isPast = new Date(event.startDate) < new Date();
  const canonicalUrl = `https://nationalvisionparty.com/events/${event.slug}`;

  // Structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description?.slice(0, 200),
    image: event.cover,
    startDate: event.startDate.toISOString(),
    endDate: event.endDate?.toISOString() || event.startDate.toISOString(),
    eventStatus: isPast ? 'https://schema.org/EventPast' : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.venue || event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.county || event.location,
        addressCountry: 'KE',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'National Vision Party',
      url: 'https://nationalvisionparty.com',
    },
    performer: {
      '@type': 'Person',
      name: 'Dr. Isaac Newton Kinity',
      url: 'https://nationalvisionparty.com/about',
    },
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation Spacer - Prevents content from being hidden under navbar */}
      <div className="h-20" />

      {/* Back Button - Floating */}
      <div className="fixed top-24 left-4 sm:left-8 z-30">
        <Link 
          href="/events"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 backdrop-blur-sm text-white/80 hover:text-white hover:bg-slate-800 transition-all border border-slate-700"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Events</span>
        </Link>
      </div>

      {/* Main Event Poster - Prominent Display */}
      <div className="relative">
        {/* Large Poster Display */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <div className="relative aspect-[16/9] md:aspect-[2/1] max-h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-800">
            {event.cover ? (
              <Image
                src={event.cover}
                alt={event.title}
                fill
                className="object-contain bg-slate-900"
                priority
                sizes="(max-width: 1280px) 100vw, 1024px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1E3A8A] via-[#0F172A] to-[#D4A017] flex items-center justify-center">
                <div className="text-center p-8">
                  <FaBullhorn className="w-20 h-20 text-white/30 mx-auto mb-4" />
                  <h1 className="font-headline text-3xl md:text-5xl text-white">{event.title}</h1>
                </div>
              </div>
            )}
            
            {/* Category Badge - Floating on poster */}
            <div className="absolute top-4 right-4">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${isPast ? 'bg-slate-700 text-slate-300' : 'bg-[#DC2626] text-white'} shadow-lg`}>
                {isPast ? 'Past Event' : event.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">
            {/* Event Title & Quick Info */}
            <div className="mb-8">
              <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                {event.title}
              </h1>
              
              {/* Quick Info Bar */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-slate-300">
                <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
                  <FaCalendarAlt className="w-4 h-4 text-[#1E3A8A]" />
                  <span>{new Date(event.startDate).toLocaleDateString('en-KE', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
                  <FaClock className="w-4 h-4 text-[#DC2626]" />
                  <span>{new Date(event.startDate).toLocaleTimeString('en-KE', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
                  <FaMapMarkerAlt className="w-4 h-4 text-[#D4A017]" />
                  <span>{event.county || event.location}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            {event.description ? (
              <div 
                className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-[#D4A017] hover:prose-a:text-[#E6C200]"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            ) : (
              <p className="text-slate-400 text-lg">Join us for this important campaign event with Dr. Isaac Newton Kinity.</p>
            )}

            {/* Open to All Banner */}
            {!isPast && (
              <div className="mt-10 p-6 bg-gradient-to-r from-[#1E3A8A]/20 to-[#D4A017]/20 border border-[#1E3A8A]/30 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] flex items-center justify-center flex-shrink-0">
                    <FaUsers className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">Open to All</h3>
                    <p className="text-slate-300">This event is free and open to everyone. No registration required - just show up and be part of the movement!</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Share Card */}
            <ShareButtons event={event} url={canonicalUrl} />

            {/* Event Details Card */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 sticky top-24">
              <h3 className="font-headline text-xl text-white mb-6">Event Details</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/20 flex items-center justify-center flex-shrink-0">
                    <FaCalendarAlt className="w-5 h-5 text-[#1E3A8A]" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Date</p>
                    <p className="text-white font-medium">{new Date(event.startDate).toLocaleDateString('en-KE', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#DC2626]/20 flex items-center justify-center flex-shrink-0">
                    <FaClock className="w-5 h-5 text-[#DC2626]" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Time</p>
                    <p className="text-white font-medium">{new Date(event.startDate).toLocaleTimeString('en-KE', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}</p>
                    {event.endDate && (
                      <p className="text-slate-500 text-sm">
                        to {new Date(event.endDate).toLocaleTimeString('en-KE', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4A017]/20 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-5 h-5 text-[#D4A017]" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Venue</p>
                    <p className="text-white font-medium">{event.venue || 'TBA'}</p>
                    <p className="text-slate-400">{event.county || event.location}</p>
                    {event.address && (
                      <p className="text-slate-500 text-sm mt-1">{event.address}</p>
                    )}
                  </div>
                </div>

                {event.author && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <FaBullhorn className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Hosted by</p>
                      <p className="text-white font-medium">{event.author}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              {!isPast && (
                <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${(event.endDate || event.startDate).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent(event.description?.slice(0, 200) || '')}&location=${encodeURIComponent(event.venue || event.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 text-center rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] text-white font-bold hover:shadow-lg hover:shadow-[#1E3A8A]/30 transition-all"
                  >
                    Add to Calendar
                  </a>
                  <a
                    href={`https://wa.me/12036759354?text=${encodeURIComponent(`Hi, I'm interested in attending \"${event.title}\" on ${new Date(event.startDate).toLocaleDateString('en-KE')}. Can you provide more information?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 text-center rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    Ask on WhatsApp
                  </a>
                </div>
              )}
            </div>

            {/* Campaign Hotline */}
            <div className="bg-gradient-to-br from-[#1E3A8A]/20 to-[#DC2626]/20 rounded-2xl p-6 border border-[#1E3A8A]/30">
              <h4 className="text-white font-bold mb-2">Need Help?</h4>
              <p className="text-slate-400 text-sm mb-4">Contact our campaign hotline for event information.</p>
              <a 
                href="tel:+12036759354" 
                className="text-[#D4A017] font-bold text-lg hover:text-[#E6C200] transition-colors"
              >
                +1 (203) 675-9354
              </a>
            </div>
          </div>
        </div>

        {/* Explore More Events Section */}
        <Suspense fallback={<div className="h-40 bg-slate-900/50 rounded-2xl animate-pulse" />}>
          <ExploreMoreEvents currentSlug={slug} />
        </Suspense>
      </div>
    </div>
  );
}
