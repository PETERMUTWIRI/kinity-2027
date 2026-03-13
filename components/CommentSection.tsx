'use client';

import { useState, useEffect } from 'react';
import { FaUser, FaPaperPlane, FaComment, FaSpinner } from 'react-icons/fa';

interface Comment {
  id: number;
  content: string;
  author: string | null;
  createdAt: string;
  approved: boolean;
}

interface CommentSectionProps {
  postId?: string;
  videoId?: string;
}

export default function CommentSection({ postId, videoId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId, videoId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (postId) params.append('postId', postId.toString());
      if (videoId) params.append('videoId', videoId.toString());

      const response = await fetch(`/api/comments?${params}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.filter((c: Comment) => c.approved !== false));
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // If no author name, show prompt
    if (!author.trim()) {
      setShowNamePrompt(true);
      return;
    }

    await submitComment();
  };

  const submitComment = async () => {
    setSubmitting(true);
    const data = {
      content: newComment,
      author: author.trim() || 'Anonymous',
      postId,
      videoId,
    };

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setNewComment('');
        setAuthor('');
        setShowNamePrompt(false);
        fetchComments();
      } else {
        console.error('Error posting comment');
        alert('Failed to post comment. Please try again.');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    }
    setSubmitting(false);
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate consistent color for author
  const getAuthorColor = (authorName: string | null) => {
    if (!authorName || authorName === 'Anonymous') return 'bg-slate-500';
    const colors = [
      'bg-[#0074D9]', 'bg-[#E91D0E]', 'bg-[#6B2C91]', 
      'bg-emerald-600', 'bg-amber-600', 'bg-rose-600', 'bg-cyan-600'
    ];
    const index = authorName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
        <div className="w-10 h-10 bg-[#0074D9]/10 rounded-full flex items-center justify-center">
          <FaComment className="w-5 h-5 text-[#0074D9]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Comments</h3>
          <p className="text-sm text-slate-500">
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'} • Moderated before publishing
          </p>
        </div>
      </div>

      {/* Comment Form */}
      <div className="bg-slate-50 rounded-xl p-5 mb-8">
        <h4 className="font-semibold text-slate-900 mb-4">Leave a Comment</h4>
        
        {/* Name Input (prominent) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Your Name <span className="text-slate-400">(required)</span>
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Enter your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:border-[#0074D9] focus:outline-none focus:ring-2 focus:ring-[#0074D9]/20"
              required
            />
          </div>
        </div>

        {/* Comment Textarea */}
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            placeholder="Share your thoughts on this article..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:border-[#0074D9] focus:outline-none focus:ring-2 focus:ring-[#0074D9]/20 resize-none"
            required
          />
          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="mt-3 flex items-center gap-2 px-6 py-2.5 bg-[#0074D9] text-white rounded-lg font-medium hover:bg-[#005CB0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? (
              <>
                <FaSpinner className="w-4 h-4 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <FaPaperPlane className="w-4 h-4" />
                Post Comment
              </>
            )}
          </button>
        </form>

        {/* Name Prompt Modal */}
        {showNamePrompt && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-sm mb-3">
              Please enter your name before posting your comment.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-amber-300 rounded text-slate-900 focus:border-amber-500 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => {
                  if (author.trim()) {
                    submitComment();
                  }
                }}
                className="px-4 py-2 bg-amber-500 text-white rounded font-medium hover:bg-amber-600 transition-colors"
              >
                Continue
              </button>
              <button
                onClick={() => setShowNamePrompt(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-8">
          <FaSpinner className="w-6 h-6 text-[#0074D9] animate-spin mx-auto mb-2" />
          <p className="text-slate-500">Loading comments...</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-xl">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaComment className="w-8 h-8 text-slate-400" />
          </div>
          <h4 className="text-lg font-semibold text-slate-900 mb-2">No comments yet</h4>
          <p className="text-slate-500">Be the first to share your thoughts on this article!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
              {/* Avatar with author color */}
              <div className={`w-12 h-12 ${getAuthorColor(comment.author)} rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm`}>
                {getInitials(comment.author || 'Anonymous')}
              </div>
              
              <div className="flex-1 min-w-0">
                {/* Author name in different color */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`font-bold ${comment.author && comment.author !== 'Anonymous' ? 'text-[#0074D9]' : 'text-slate-600'}`}>
                    {comment.author || 'Anonymous'}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(comment.createdAt).toLocaleDateString('en-KE', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                
                {/* Comment content */}
                <p className="text-slate-700 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
