// app/admin/videos/list/page.tsx - VIDEO MANAGEMENT LIST
'use client';

import ProtectedAdminPage from '@/components/ProtectedAdminPage';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaEyeSlash,
  FaVideo, FaYoutube, FaArrowLeft, FaExternalLinkAlt
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Video {
  id: number;
  title: string;
  category: string;
  youtubeId: string;
  thumbnail?: string;
  published: boolean;
  featured: boolean;
  order: number;
  createdAt: string;
}

const CATEGORIES = [
  'All', 'Speech', 'Rally', 'Interview', 'Statement', 'Live Event', 'Advertisement', 'Documentary'
];

function VideosListPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch videos
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/videos');
      const data = await res.json();
      const videosList = Array.isArray(data) ? data : [];
      setVideos(videosList);
      setFilteredVideos(videosList);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter videos
  useEffect(() => {
    let filtered = videos;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(query) ||
        video.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus === 'published') {
      filtered = filtered.filter(video => video.published);
    } else if (selectedStatus === 'draft') {
      filtered = filtered.filter(video => !video.published);
    }

    setFilteredVideos(filtered);
  }, [videos, searchQuery, selectedCategory, selectedStatus]);

  // Delete video
  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/videos?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVideos(videos.filter(v => v.id !== id));
        setDeleteConfirm(null);
      } else {
        alert('Failed to delete video');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete video');
    } finally {
      setIsDeleting(false);
    }
  };

  // Toggle publish status
  const togglePublish = async (video: Video) => {
    try {
      const res = await fetch(`/api/videos?id=${video.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...video, published: !video.published }),
      });
      if (res.ok) {
        setVideos(videos.map(v => 
          v.id === video.id ? { ...v, published: !v.published } : v
        ));
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-[#0074D9] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <FaVideo className="text-[#0074D9]" />
              Video Library
            </h1>
            <p className="text-slate-400 mt-1">
              Manage speeches, interviews, rallies, and campaign videos
            </p>
          </div>
        </div>
        <Link
          href="/admin/videos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0074D9] text-white font-semibold rounded-xl hover:bg-[#005CB0] transition-colors"
        >
          <FaPlus />
          Add Video
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
          label="Total Videos" 
          value={videos.length} 
          icon={<FaVideo />}
          color="blue"
        />
        <StatCard 
          label="Published" 
          value={videos.filter(v => v.published).length} 
          icon={<FaEye />}
          color="green"
        />
        <StatCard 
          label="Drafts" 
          value={videos.filter(v => !v.published).length} 
          icon={<FaEyeSlash />}
          color="orange"
        />
        <StatCard 
          label="Featured" 
          value={videos.filter(v => v.featured).length} 
          icon={<FaYoutube />}
          color="red"
        />
      </div>

      {/* Filters */}
      <div className="bg-slate-900 rounded-xl p-4 mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos by title or category..."
              className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-[#0074D9] focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-[#0074D9] focus:outline-none min-w-[180px]"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Videos', count: videos.length },
            { key: 'published', label: 'Published', count: videos.filter(v => v.published).length },
            { key: 'draft', label: 'Drafts', count: videos.filter(v => !v.published).length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedStatus(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === tab.key
                  ? 'bg-[#0074D9] text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {tab.label}
              <span className="ml-2 px-2 py-0.5 bg-slate-950/50 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-slate-400">
          Showing <span className="text-white font-medium">{filteredVideos.length}</span> videos
        </p>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-sm text-[#0074D9] hover:text-[#005CB0]"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Videos Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid gap-4">
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors group"
            >
              <div className="flex flex-col md:flex-row">
                {/* Thumbnail */}
                <div className="md:w-64 flex-shrink-0">
                  <div className="aspect-video md:h-full bg-slate-800 relative overflow-hidden">
                    {video.thumbnail ? (
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700">
                        <FaYoutube className="w-12 h-12 text-slate-600" />
                      </div>
                    )}
                    {/* Status Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {!video.published && (
                        <span className="px-2 py-1 bg-amber-500/90 text-white text-xs font-medium rounded">
                          Draft
                        </span>
                      )}
                      {video.featured && (
                        <span className="px-2 py-1 bg-[#0074D9]/90 text-white text-xs font-medium rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-[#E91D0E]/90 rounded-full flex items-center justify-center">
                        <FaYoutube className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded">
                            {video.category}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded">
                            Order: {video.order}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-[#0074D9] transition-colors line-clamp-2">
                          {video.title}
                        </h3>
                      </div>
                    </div>

                    {/* YouTube ID */}
                    <p className="text-slate-500 text-sm font-mono mb-4">
                      ID: {video.youtubeId}
                    </p>

                    {/* Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 mt-auto">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>{new Date(video.createdAt).toLocaleDateString('en-KE')}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://youtube.com/watch?v=${video.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                          title="View on YouTube"
                        >
                          <FaExternalLinkAlt className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => togglePublish(video)}
                          className={`p-2 rounded-lg transition-colors ${
                            video.published 
                              ? 'text-green-400 hover:bg-green-400/10' 
                              : 'text-slate-400 hover:text-white hover:bg-slate-800'
                          }`}
                          title={video.published ? 'Unpublish' : 'Publish'}
                        >
                          {video.published ? <FaEye className="w-4 h-4" /> : <FaEyeSlash className="w-4 h-4" />}
                        </button>
                        <Link
                          href={`/admin/videos?id=${video.id}`}
                          className="flex items-center gap-2 px-3 py-2 bg-[#0074D9]/10 text-[#0074D9] hover:bg-[#0074D9] hover:text-white rounded-lg transition-all"
                          title="Edit Video"
                        >
                          <FaEdit className="w-4 h-4" />
                          <span className="text-sm font-medium">Edit</span>
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(video.id)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/50 rounded-xl border border-slate-800 border-dashed">
          <FaVideo className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No videos found</h3>
          <p className="text-slate-400 mb-6">
            {searchQuery 
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first video'
            }
          </p>
          {!searchQuery && (
            <Link
              href="/admin/videos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0074D9] text-white font-semibold rounded-xl hover:bg-[#005CB0] transition-colors"
            >
              <FaPlus />
              Add Video
            </Link>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-800"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTrash className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Delete Video?</h3>
                <p className="text-slate-400 mb-6">
                  This will remove the video from your media center. The YouTube video itself will not be affected.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-4 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Stat Card Component
function StatCard({ 
  label, 
  value, 
  icon, 
  color = 'blue' 
}: { 
  label: string; 
  value: number; 
  icon: React.ReactNode; 
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple'; 
}) {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-green-500/10 text-green-500',
    orange: 'bg-orange-500/10 text-orange-500',
    red: 'bg-red-500/10 text-red-500',
    purple: 'bg-purple-500/10 text-purple-500',
  };

  return (
    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-slate-400 text-sm">{label}</p>
        </div>
      </div>
    </div>
  );
}

// Export with protection
export default function VideosPage() {
  return (
    <ProtectedAdminPage>
      <VideosListPage />
    </ProtectedAdminPage>
  );
}
