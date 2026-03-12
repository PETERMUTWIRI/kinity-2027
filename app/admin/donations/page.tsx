'use client';

import { FaHeart, FaDownload } from 'react-icons/fa';

export default function DonationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Donations</h1>
          <p className="text-slate-400 mt-1">Track and manage campaign donations</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors">
          <FaDownload className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <p className="text-slate-400 text-sm">Total Donations</p>
          <p className="text-3xl font-bold text-white mt-2">KES 0</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <p className="text-slate-400 text-sm">Total Donors</p>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <p className="text-slate-400 text-sm">This Month</p>
          <p className="text-3xl font-bold text-white mt-2">KES 0</p>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
          <FaHeart className="w-8 h-8 text-slate-600" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No donations yet</h3>
        <p className="text-slate-400">Donations will appear here when supporters contribute to the campaign.</p>
      </div>
    </div>
  );
}
