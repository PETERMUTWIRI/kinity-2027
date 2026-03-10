// app/events/[slug]/success/page.tsx - RSVP Success Page
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ email?: string }>;
}

export default async function RSVPSuccessPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { email } = await searchParams;

  const event = await prisma.event.findUnique({
    where: { slug, deletedAt: null },
  });

  if (!event) {
    redirect('/events');
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="font-headline text-3xl md:text-4xl text-white mb-4">
          RSVP Confirmed!
        </h1>
        <p className="text-slate-400 text-lg mb-8">
          You&apos;re all set for <span className="text-white font-semibold">{event.title}</span>
        </p>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 mb-8">
          <div className="flex items-center justify-center gap-2 text-slate-300 mb-2">
            <FaCalendarAlt className="w-5 h-5 text-[#0074D9]" />
            <span>{new Date(event.startDate).toLocaleDateString('en-KE', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-300">
            <FaMapMarkerAlt className="w-5 h-5 text-[#E91D0E]" />
            <span>{event.venue || event.location}</span>
          </div>
        </div>

        {email && (
          <p className="text-slate-400 mb-8">
            A confirmation has been sent to <span className="text-white">{email}</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0074D9] text-white font-bold hover:bg-[#005CB0] transition-colors"
          >
            View All Events
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
