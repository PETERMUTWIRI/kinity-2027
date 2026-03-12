'use client';

import { useState } from 'react';
import { FaArrowLeft, FaSave, FaImage } from 'react-icons/fa';
import Link from 'next/link';
import ProtectedAdminPage from '@/components/ProtectedAdminPage';

// ==========================================
// NEW POST PAGE - Protected
// ==========================================

function NewPostContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement post creation
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/posts"
          className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Post</h1>
          <p className="text-slate-400 text-sm">Write a new news article or update</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Post Title *
          </label>
          <input
            type="text"
            required
            placeholder="Enter post title..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0074D9] focus:border-transparent"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category
          </label>
          <select className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#0074D9]">
            <option value="">Select category...</option>
            <option value="news">News</option>
            <option value="event-recap">Event Recap</option>
            <option value="policy">Policy</option>
            <option value="press-release">Press Release</option>
          </select>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Cover Image
          </label>
          <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-[#0074D9]/50 transition-colors cursor-pointer">
            <FaImage className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 mb-2">Drag and drop an image here, or click to browse</p>
            <p className="text-slate-500 text-sm">Recommended: 1200 x 630 pixels</p>
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Content *
          </label>
          <textarea
            rows={12}
            required
            placeholder="Write your post content here..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0074D9] focus:border-transparent resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0074D9] text-white font-semibold hover:bg-[#005CB0] transition-colors disabled:opacity-50"
          >
            <FaSave />
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </button>
          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors"
          >
            Save as Draft
          </button>
          <Link
            href="/admin/posts"
            className="px-6 py-3 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function NewPostPage() {
  return (
    <ProtectedAdminPage>
      <NewPostContent />
    </ProtectedAdminPage>
  );
}
