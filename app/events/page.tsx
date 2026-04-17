// app/events/page.tsx - Campaign Events/Rallies
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight, FaBullhorn } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Events | National Vision Party',
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
      <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="kicker-gold mb-4 !text-white">Campaign Trail</span>
          <h1 className="heading-editorial !text-white mb-4">
            Campaign <span className="heading-accent-gold !text-white">Events</span>
          </h1>
          <div className="hr-white mx-auto mb-4" />
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Join us at rallies, town halls, and community meetings across all 47 counties.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/genz2.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        
        {/* Upcoming Events */}
        <section className="mb-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="kicker-pill mb-4">
              <FaBullhorn className="w-4 h-4 inline mr-2" />
              Upcoming
            </span>
            <h2 className="heading-editorial mb-4">
              Upcoming <span className="heading-accent-gold">Events</span>
            </h2>
            <div className="hr-gold-wide mx-auto mb-4" />
          </div>
          
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
                        <div className="w-full h-full bg-gradient-to-br from-[#1E3A8A] to-[#1E3A8A] flex items-center justify-center">
                          <FaBullhorn className="w-12 h-12 text-white/50" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-[#DC2626] text-white text-xs font-bold">
                          {event.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-slate-500 text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="w-4 h-4 text-[#1E3A8A]" />
                          {new Date(event.startDate).toLocaleDateString('en-KE', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt className="w-4 h-4 text-[#DC2626]" />
                          {event.county || event.location}
                        </span>
                      </div>
                      <h3 className="font-headline text-xl text-[#0F172A] mb-2 group-hover:text-[#1E3A8A] transition-colors">
                        {event.title}
                      </h3>
                      {event.venue && (
                        <p className="text-slate-600 text-sm">{event.venue}</p>
                      )}
                      <div className="mt-4 flex items-center gap-2 text-[#1E3A8A] font-semibold text-sm">
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
          <section className="relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="kicker-pill mb-4">Archive</span>
              <h2 className="heading-editorial mb-4">
                Past <span className="heading-accent-gold">Events</span>
              </h2>
              <div className="hr-gold-wide mx-auto mb-4" />
            </div>
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
                      <h3 className="font-headline text-lg text-[#0F172A]">{event.title}</h3>
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
