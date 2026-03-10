// app/events/page.tsx - Campaign Events/Rallies
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight, FaBullhorn } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Events | Kinity 2027',
  description: 'Join Dr. Isaac Newton Kinity at upcoming rallies, town halls, and campaign events across Kenya.',
};

export default async function EventsPage() {
  const now = new Date();
  
  const upcomingEvents = await prisma.event.findMany({
    where: {
      deletedAt: null,
      isPublic: true,
      startDate: { gte: now },
    },
    orderBy: { startDate: 'asc' },
  });

  const pastEvents = await prisma.event.findMany({
    where: {
      deletedAt: null,
      isPublic: true,
      startDate: { lt: now },
    },
    orderBy: { startDate: 'desc' },
    take: 6,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0074D9] to-[#005CB0] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-slogan text-4xl md:text-5xl text-white mb-4">
            CAMPAIGN EVENTS
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Join us at rallies, town halls, and community meetings across all 47 counties.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="font-headline text-2xl text-[#111111] mb-8 flex items-center gap-3">
            <FaBullhorn className="text-[#E91D0E]" />
            Upcoming Events
          </h2>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="group">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full">
                    {/* Image */}
                    <div className="relative aspect-video">
                      {event.cover ? (
                        <Image
                          src={event.cover}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0074D9] to-[#6B2C91] flex items-center justify-center">
                          <FaBullhorn className="w-12 h-12 text-white/50" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-[#E91D0E] text-white text-xs font-bold">
                          {event.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-slate-500 text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="w-4 h-4 text-[#0074D9]" />
                          {new Date(event.startDate).toLocaleDateString('en-KE', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt className="w-4 h-4 text-[#E91D0E]" />
                          {event.county || event.location}
                        </span>
                      </div>
                      <h3 className="font-headline text-xl text-[#111111] mb-2 group-hover:text-[#0074D9] transition-colors">
                        {event.title}
                      </h3>
                      {event.venue && (
                        <p className="text-slate-600 text-sm">{event.venue}</p>
                      )}
                      <div className="mt-4 flex items-center gap-2 text-[#0074D9] font-semibold text-sm">
                        View Details
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl">
              <FaCalendarAlt className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No Upcoming Events</h3>
              <p className="text-slate-500">Check back soon for new events!</p>
            </div>
          )}
        </section>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section>
            <h2 className="font-headline text-2xl text-[#111111] mb-8">Past Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="group">
                  <article className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all opacity-75 hover:opacity-100">
                    <div className="relative aspect-video">
                      {event.cover ? (
                        <Image
                          src={event.cover}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center">
                          <FaBullhorn className="w-12 h-12 text-white/50" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-slate-500 text-sm mb-2">
                        {new Date(event.startDate).toLocaleDateString('en-KE', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                      <h3 className="font-headline text-lg text-[#111111]">{event.title}</h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
