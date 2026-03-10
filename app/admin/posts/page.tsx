// app/admin/posts/page.tsx - Post Editor (News/Press Releases)
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { FaSave, FaImage, FaSpinner, FaEye, FaTimes } from 'react-icons/fa';

// Dynamic import CKEditor to avoid SSR issues
const CKEditor = dynamic(
  () => import('@ckeditor/ckeditor5-react').then((mod) => mod.CKEditor),
  { ssr: false }
);

const ClassicEditor = dynamic(
  () => import('@ckeditor/ckeditor5-build-classic') as any,
  { ssr: false }
);

const categories = ['News', 'Press Release', 'Event Recap', 'Statement'];

export default function PostEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'News',
    cover: '',
    author: '',
    published: true,
    isPressRelease: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);

  // Fetch post data if editing
  useEffect(() => {
    if (postId) {
      setIsLoading(true);
      fetch(`/api/blog?id=${postId}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.title || '',
            content: data.content || '',
            excerpt: data.excerpt || '',
            category: data.category || 'News',
            cover: data.cover || '',
            author: data.author || '',
            published: data.published ?? true,
            isPressRelease: data.isPressRelease || false,
          });
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching post:', err);
          setIsLoading(false);
        });
    }
  }, [postId]);

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadForm = new FormData();
    uploadForm.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadForm,
      });
      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, cover: data.url });
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload image');
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = postId ? `/api/blog?id=${postId}` : '/api/blog';
      const method = postId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to save post');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save post');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="w-8 h-8 animate-spin text-[#0074D9]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">
          {postId ? 'Edit Post' : 'New Post'}
        </h1>
        <button
          onClick={() => router.push('/admin')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
        >
          <FaTimes /> Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-[#0074D9] focus:outline-none"
            placeholder="Post title"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-[#0074D9] focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Cover Image
          </label>
          <div className="flex items-center gap-4">
            {formData.cover && (
              <img src={formData.cover} alt="Cover" className="w-32 h-20 object-cover rounded-lg" />
            )}
            <label className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 cursor-pointer">
              <FaImage /> Upload Image
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Excerpt
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-[#0074D9] focus:outline-none"
            placeholder="Brief summary of the post"
          />
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Content *
          </label>
          <div className="bg-white rounded-lg overflow-hidden">
            {typeof window !== 'undefined' && (
              <CKEditor
                editor={ClassicEditor as any}
                data={formData.content}
                onChange={(event: any, editor: any) => {
                  const data = editor.getData();
                  setFormData({ ...formData, content: data });
                }}
                config={{
                  toolbar: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'imageUpload',
                    'blockQuote',
                    'insertTable',
                    '|',
                    'undo',
                    'redo',
                  ],
                }}
              />
            )}
          </div>
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Author
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-[#0074D9] focus:outline-none"
            placeholder="Author name"
          />
        </div>

        {/* Options */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-slate-300">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 rounded border-slate-600"
            />
            Published
          </label>
          <label className="flex items-center gap-2 text-slate-300">
            <input
              type="checkbox"
              checked={formData.isPressRelease}
              onChange={(e) => setFormData({ ...formData, isPressRelease: e.target.checked })}
              className="w-4 h-4 rounded border-slate-600"
            />
            Press Release
          </label>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-4 bg-[#0074D9] text-white font-bold rounded-xl hover:bg-[#005CB0] transition-colors disabled:opacity-50"
          >
            {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {isSaving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
