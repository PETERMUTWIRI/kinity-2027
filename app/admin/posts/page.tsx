'use client';

import ProtectedAdminPage from '@/components/ProtectedAdminPage';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaEye,
  FaNewspaper, FaCheckCircle, FaClock, FaStar, FaMapMarkerAlt,
  FaSpinner, FaTimes, FaExternalLinkAlt, FaCheck
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  cover: string | null;
  published: boolean;
  publishedAt: string | null;
  featured: boolean;
  isPressRelease: boolean;
  author: string | null;
  county: string | null;
  readingTime: number | null;
  wordCount: number | null;
  createdAt: string;
}

const CATEGORIES = [
  'All', 'News', 'Politics', 'Opinion', 'Analysis', 'Breaking News',
  'Press Release', 'Event Recap', 'Statement', 'Interview',
  'County News', 'National', 'International', 'Business'
];

function PostsListPage() {
  const searchParams = useSearchParams();
  const successParam = searchParams.get('success');
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'draft' | 'featured'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(successParam);

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      const postsList = data.posts || data || [];
      setPosts(postsList);
      setFilteredPosts(postsList);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter posts
  useEffect(() => {
    let filtered = posts;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.author?.toLowerCase().includes(query) ||
        post.county?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus === 'published') {
      filtered = filtered.filter(post => post.published);
    } else if (selectedStatus === 'draft') {
      filtered = filtered.filter(post => !post.published);
    } else if (selectedStatus === 'featured') {
      filtered = filtered.filter(post => post.featured);
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedCategory, selectedStatus]);

  // Delete post
  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter(p => p.id !== id));
        setDeleteConfirm(null);
      } else {
        alert('Failed to delete post');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-KE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="w-8 h-8 animate-spin text-[#1E3A8A]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Success Notification */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <FaCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-green-400 font-semibold">Success!</p>
            <p className="text-green-300/80 text-sm">
              Article has been {successMessage === 'published' ? 'published' : 'saved as draft'} successfully.
              {successMessage === 'published' && ' It is now live on the news hub.'}
            </p>
          </div>
          <button 
            onClick={() => setSuccessMessage(null)}
            className="ml-auto text-green-400 hover:text-green-300"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FaNewspaper className="text-[#1E3A8A]" />
            News Articles
          </h1>
          <p className="text-slate-400 mt-1">
            Manage your news content and press releases
          </p>
        </div>
        <Link
          href="/admin/posts/edit"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] text-white font-semibold rounded-xl hover:bg-[#0F172A] transition-colors"
        >
          <FaPlus />
          New Article
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
          label="Total Articles" 
          value={posts.length} 
          icon={<FaNewspaper />}
          color="blue"
        />
        <StatCard 
          label="Published" 
          value={posts.filter(p => p.published).length} 
          icon={<FaCheckCircle />}
          color="green"
        />
        <StatCard 
          label="Drafts" 
          value={posts.filter(p => !p.published).length} 
          icon={<FaClock />}
          color="orange"
        />
        <StatCard 
          label="Featured" 
          value={posts.filter(p => p.featured).length} 
          icon={<FaStar />}
          color="purple"
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
              placeholder="Search articles, authors, counties..."
              className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-[#1E3A8A] focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-11 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-[#1E3A8A] focus:outline-none appearance-none cursor-pointer min-w-[180px]"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Articles', count: posts.length },
            { key: 'published', label: 'Published', count: posts.filter(p => p.published).length },
            { key: 'draft', label: 'Drafts', count: posts.filter(p => !p.published).length },
            { key: 'featured', label: 'Featured', count: posts.filter(p => p.featured).length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedStatus(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === tab.key
                  ? 'bg-[#1E3A8A] text-white'
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
          Showing <span className="text-white font-medium">{filteredPosts.length}</span> articles
        </p>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-sm text-[#1E3A8A] hover:text-[#0F172A]"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors group"
            >
              <div className="flex flex-col md:flex-row">
                {/* Cover Image */}
                <div className="md:w-48 lg:w-64 flex-shrink-0">
                  <div className="aspect-video md:aspect-square md:h-full bg-slate-800 relative overflow-hidden">
                    {post.cover ? (
                      <img 
                        src={post.cover} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700">
                        <FaNewspaper className="w-12 h-12 text-slate-600" />
                      </div>
                    )}
                    {/* Status Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {!post.published && (
                        <span className="px-2 py-1 bg-amber-500/90 text-white text-xs font-medium rounded">
                          Draft
                        </span>
                      )}
                      {post.featured && (
                        <span className="px-2 py-1 bg-[#1E3A8A]/90 text-white text-xs font-medium rounded">
                          Featured
                        </span>
                      )}
                      {post.isPressRelease && (
                        <span className="px-2 py-1 bg-purple-500/90 text-white text-xs font-medium rounded">
                          Press
                        </span>
                      )}
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
                            {post.category}
                          </span>
                          {post.county && (
                            <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded flex items-center gap-1">
                              <FaMapMarkerAlt className="w-3 h-3" />
                              {post.county}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-[#1E3A8A] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </div>

                    {/* Excerpt */}
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-1">
                      {post.excerpt || 'No excerpt available'}
                    </p>

                    {/* Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>{formatDate(post.publishedAt)}</span>
                        {post.author && (
                          <span>By {post.author}</span>
                        )}
                        {post.readingTime && (
                          <span>{post.readingTime} min read</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/news-hub/${post.slug}`}
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                          title="View on site"
                        >
                          <FaExternalLinkAlt className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/posts/edit?id=${post.id}`}
                          className="flex items-center gap-2 px-3 py-2 bg-[#1E3A8A]/10 text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white rounded-lg transition-all"
                          title="Edit Article"
                        >
                          <FaEdit className="w-4 h-4" />
                          <span className="text-sm font-medium">Edit</span>
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(post.id)}
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
          <FaNewspaper className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No articles found</h3>
          <p className="text-slate-400 mb-6">
            {searchQuery 
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first article'
            }
          </p>
          {!searchQuery && (
            <Link
              href="/admin/posts/edit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] text-white font-semibold rounded-xl hover:bg-[#0F172A] transition-colors"
            >
              <FaPlus />
              Create Article
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
                <h3 className="text-xl font-bold text-white mb-2">Delete Article?</h3>
                <p className="text-slate-400 mb-6">
                  This action cannot be undone. The article will be permanently removed from your site.
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
                      <FaSpinner className="w-5 h-5 animate-spin mx-auto" />
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
  color?: 'blue' | 'green' | 'orange' | 'purple'; 
}) {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-green-500/10 text-green-500',
    orange: 'bg-orange-500/10 text-orange-500',
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
export default function PostsPage() {
  return (
    <ProtectedAdminPage>
      <PostsListPage />
    </ProtectedAdminPage>
  );
}
