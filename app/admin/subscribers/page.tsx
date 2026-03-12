'use client';

import { FaEnvelope, FaPlus, FaDownload } from 'react-icons/fa';
import ProtectedAdminPage from '@/components/ProtectedAdminPage';

// ==========================================
// SUBSCRIBERS PAGE - Protected
// ==========================================

function SubscribersContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Subscribers</h1>
          <p className="text-slate-400 mt-1">Manage newsletter subscribers and email list</p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors">
            <FaDownload className="w-4 h-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E91D0E] text-white hover:bg-[#BA170C] transition-colors">
            <FaEnvelope className="w-4 h-4" />
            Send Newsletter
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <p className="text-slate-400 text-sm">Total Subscribers</p>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <p className="text-slate-400 text-sm">New This Week</p>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <p className="text-slate-400 text-sm">Open Rate</p>
          <p className="text-3xl font-bold text-white mt-2">0%</p>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
          <FaEnvelope className="w-8 h-8 text-slate-600" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No subscribers yet</h3>
        <p className="text-slate-400 mb-6">Build your email list to keep supporters updated.</p>
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0074D9] text-white font-semibold hover:bg-[#005CB0] transition-colors">
          <FaPlus className="w-4 h-4" />
          Add Subscriber
        </button>
      </div>
    </div>
  );
}

export default function SubscribersPage() {
  return (
    <ProtectedAdminPage>
      <SubscribersContent />
    </ProtectedAdminPage>
  );
}
