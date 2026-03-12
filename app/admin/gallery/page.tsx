'use client';

import { FaImages, FaPlus, FaUpload } from 'react-icons/fa';

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Gallery</h1>
          <p className="text-slate-400 mt-1">Manage campaign photos and media gallery</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0074D9] text-white hover:bg-[#005CB0] transition-colors">
          <FaUpload className="w-4 h-4" />
          Upload Images
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <p className="text-slate-400 text-sm">Total Images</p>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <p className="text-slate-400 text-sm">Rallies</p>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <p className="text-slate-400 text-sm">Community</p>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <p className="text-slate-400 text-sm">Meetings</p>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
          <FaImages className="w-8 h-8 text-slate-600" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No images yet</h3>
        <p className="text-slate-400 mb-6">Upload photos from rallies, community events, and campaign activities.</p>
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0074D9] text-white font-semibold hover:bg-[#005CB0] transition-colors">
          <FaPlus className="w-4 h-4" />
          Upload First Image
        </button>
      </div>
    </div>
  );
}
