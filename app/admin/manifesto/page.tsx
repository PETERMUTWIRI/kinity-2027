'use client';

import { FaFlag, FaEdit, FaEye } from 'react-icons/fa';
import Link from 'next/link';
import ProtectedAdminPage from '@/components/ProtectedAdminPage';

const manifestoPillars = [
  {
    id: 'economic-transformation',
    title: 'Economic Transformation',
    description: 'Creating jobs, supporting local businesses, and building a self-reliant economy.',
    status: 'published',
  },
  {
    id: 'zero-corruption',
    title: 'Zero Corruption',
    description: 'Uncompromising stance against corruption and transparent governance.',
    status: 'published',
  },
  {
    id: 'universal-healthcare',
    title: 'Universal Healthcare',
    description: 'Quality healthcare accessible to all Kenyans.',
    status: 'published',
  },
  {
    id: 'education-revolution',
    title: 'Education Revolution',
    description: 'World-class education system for our youth.',
    status: 'published',
  },
  {
    id: 'social-protection',
    title: 'Social Protection & Inclusion',
    description: 'Dignity and support for widows, orphans, PWDs, and the elderly.',
    status: 'published',
  },
  {
    id: 'agriculture-food-security',
    title: 'Agriculture & Food Security',
    description: 'Farmer subsidies, modern tools, and fair markets for food security.',
    status: 'published',
  },
  {
    id: 'youth-women-empowerment',
    title: 'Youth & Women Empowerment',
    description: 'Affirmative funding, innovation hubs, and leadership opportunities.',
    status: 'published',
  },
  {
    id: 'security-cohesion',
    title: 'Security & National Cohesion',
    description: 'Police reform and national unity for a safe, united Kenya.',
    status: 'published',
  },
];

// ==========================================
// MANIFESTO PAGE - Protected
// ==========================================

function ManifestoContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Manifesto</h1>
          <p className="text-slate-400 mt-1">Manage campaign vision and policy pillars</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/about"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            <FaEye className="w-4 h-4" />
            View Public Page
          </Link>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E3A8A] text-white hover:bg-[#0F172A] transition-colors">
            <FaEdit className="w-4 h-4" />
            Edit Manifesto
          </button>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {manifestoPillars.map((pillar) => (
          <div key={pillar.id} className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-[#1E3A8A]/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center">
                <FaFlag className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-xs font-medium">
                {pillar.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{pillar.title}</h3>
            <p className="text-slate-400 text-sm">{pillar.description}</p>
            <button className="mt-4 text-[#1E3A8A] text-sm font-medium hover:underline">
              Edit Pillar →
            </button>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors">
            Add New Pillar
          </button>
          <button className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors">
            Reorder Pillars
          </button>
          <button className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors">
            Preview Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ManifestoPage() {
  return (
    <ProtectedAdminPage>
      <ManifestoContent />
    </ProtectedAdminPage>
  );
}
