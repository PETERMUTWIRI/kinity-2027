'use client';

import { useState } from 'react';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';

interface RSVPFormProps {
  eventId: number;
  eventTitle: string;
  rsvpDeadline?: Date | null;
}

export default function RSVPForm({ eventId, eventTitle, rsvpDeadline }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    county: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to RSVP');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">RSVP Confirmed!</h3>
        <p className="text-slate-400">
          Thank you for registering. We look forward to seeing you at {eventTitle}.
        </p>
      </div>
    );
  }

  // Check if RSVP deadline has passed
  if (rsvpDeadline && new Date() > new Date(rsvpDeadline)) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-bold text-white mb-2">RSVP Closed</h3>
        <p className="text-slate-400">
          The deadline to RSVP for this event has passed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-[#0074D9] focus:outline-none"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-[#0074D9] focus:outline-none"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-[#0074D9] focus:outline-none"
          placeholder="+254 XXX XXX XXX"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          County
        </label>
        <input
          type="text"
          value={formData.county}
          onChange={(e) => setFormData({ ...formData, county: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-[#0074D9] focus:outline-none"
          placeholder="Your county"
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0074D9] to-[#005CB0] text-white font-bold hover:shadow-lg hover:shadow-[#0074D9]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          'Confirm RSVP'
        )}
      </button>

      <p className="text-xs text-slate-500 text-center">
        By RSVPing, you agree to receive updates about this event.
      </p>
    </form>
  );
}
