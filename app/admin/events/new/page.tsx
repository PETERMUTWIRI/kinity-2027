'use client';

import { useState } from 'react';
import { FaArrowLeft, FaSave, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';
import ProtectedAdminPage from '@/components/ProtectedAdminPage';

// ==========================================
// NEW EVENT PAGE - Protected
// ==========================================

function NewEventContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement event creation
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/events"
          className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Event</h1>
          <p className="text-slate-400 text-sm">Schedule a campaign event or rally</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Event Title *
          </label>
          <input
            type="text"
            required
            placeholder="Enter event title..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Event Type
          </label>
          <select className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]">
            <option value="">Select type...</option>
            <option value="rally">Rally</option>
            <option value="town-hall">Town Hall</option>
            <option value="campaign-launch">Campaign Launch</option>
            <option value="fundraiser">Fundraiser</option>
            <option value="meet-greet">Meet & Greet</option>
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <FaCalendarAlt className="inline w-4 h-4 mr-2" />
              Date *
            </label>
            <input
              type="date"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Time *
            </label>
            <input
              type="time"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <FaMapMarkerAlt className="inline w-4 h-4 mr-2" />
              County *
            </label>
            <select className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]">
              <option value="">Select county...</option>
              <option value="nairobi">Nairobi</option>
              <option value="mombasa">Mombasa</option>
              <option value="kisumu">Kisumu</option>
              <option value="nakuru">Nakuru</option>
              <option value="kiambu">Kiambu</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Venue *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Uhuru Park"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description
          </label>
          <textarea
            rows={6}
            placeholder="Describe the event..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DC2626] text-white font-semibold hover:bg-[#B91C1C] transition-colors disabled:opacity-50"
          >
            <FaSave />
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </button>
          <Link
            href="/admin/events"
            className="px-6 py-3 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function NewEventPage() {
  return (
    <ProtectedAdminPage>
      <NewEventContent />
    </ProtectedAdminPage>
  );
}
