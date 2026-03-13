'use client';

import ProtectedAdminPage from '@/components/ProtectedAdminPage';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  FaSave, FaImage, FaSpinner, FaEye, FaTimes, FaCalendar, 
  FaTag, FaAlignLeft, FaAlignCenter, FaAlignRight, FaTrash,
  FaBold, FaItalic, FaUnderline, FaHeading, FaQuoteRight,
  FaListUl, FaListOl, FaLink, FaUndo, FaRedo, FaCamera,
  FaNewspaper, FaSearch, FaCheckCircle, FaClock, FaUserEdit,
  FaGlobe, FaMapMarkerAlt, FaChevronDown, FaChevronUp,
  FaPlus, FaMinus, FaCopy, FaCheck, FaExclamationCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// ENTERPRISE NEWS EDITOR - Daily Nation Style
// ==========================================

const CATEGORIES = [
  'News', 'Politics', 'Opinion', 'Analysis', 'Breaking News',
  'Press Release', 'Event Recap', 'Statement', 'Interview',
  'County News', 'National', 'International', 'Business'
];

const KENYAN_COUNTIES = [
  'Mombasa', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita-Taveta',
  'Garissa', 'Wajir', 'Mandera', 'Marsabit', 'Isiolo', 'Meru',
  'Tharaka-Nithi', 'Embu', 'Kitui', 'Machakos', 'Makueni', 'Nyandarua',
  'Nyeri', 'Kirinyaga', "Murang'a", 'Kiambu', 'Turkana', 'West Pokot',
  'Samburu', 'Trans Nzoia', 'Uasin Gishu', 'Elgeyo-Marakwet', 'Nandi',
  'Baringo', 'Laikipia', 'Nakuru', 'Narok', 'Kajiado', 'Kericho',
  'Bomet', 'Kakamega', 'Vihiga', 'Bungoma', 'Busia', 'Siaya',
  'Kisumu', 'Homa Bay', 'Migori', 'Kisii', 'Nyamira', 'Nairobi'
];

// Inline Image Type
interface InlineImage {
  id: string;
  url: string;
  caption: string;
  photographer: string;
  align: 'left' | 'center' | 'right' | 'full';
  width?: number;
}

// Form Data Type
interface PostFormData {
  title: string;
  subtitle: string;
  content: string;
  excerpt: string;
  category: string;
  cover: string;
  coverCaption: string;
  coverPhotographer: string;
  author: string;
  authorTitle: string;
  published: boolean;
  featured: boolean;
  isPressRelease: boolean;
  tags: string[];
  location: string;
  county: string;
  metaTitle: string;
  metaDesc: string;
  ogImage: string;
}

// Toolbar Button Component
const ToolbarButton = ({ 
  icon: Icon, 
  active = false, 
  onClick, 
  title,
  disabled = false
}: { 
  icon: any; 
  active?: boolean; 
  onClick: () => void; 
  title: string;
  disabled?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-[#0074D9] text-white' 
        : 'text-slate-400 hover:text-white hover:bg-slate-700'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <Icon className="w-4 h-4" />
  </button>
);

// Rich Text Editor Component
function RichTextEditor({ 
  value, 
  onChange, 
  onImageInsert 
}: { 
  value: string; 
  onChange: (html: string) => void;
  onImageInsert: () => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    updateActiveFormats();
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const updateActiveFormats = () => {
    const formats = [];
    if (document.queryCommandState('bold')) formats.push('bold');
    if (document.queryCommandState('italic')) formats.push('italic');
    if (document.queryCommandState('underline')) formats.push('underline');
    setActiveFormats(formats);
  };

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-900">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-slate-800 border-b border-slate-700 flex-wrap">
        <div className="flex items-center gap-1 pr-2 border-r border-slate-700">
          <ToolbarButton 
            icon={FaUndo} 
            onClick={() => execCommand('undo')} 
            title="Undo" 
          />
          <ToolbarButton 
            icon={FaRedo} 
            onClick={() => execCommand('redo')} 
            title="Redo" 
          />
        </div>
        
        <div className="flex items-center gap-1 px-2 border-r border-slate-700">
          <select 
            onChange={(e) => execCommand('formatBlock', e.target.value)}
            className="bg-slate-700 text-white text-sm rounded px-2 py-1 border-none outline-none"
          >
            <option value="P">Paragraph</option>
            <option value="H2">Heading 2</option>
            <option value="H3">Heading 3</option>
            <option value="H4">Heading 4</option>
            <option value="BLOCKQUOTE">Quote</option>
          </select>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-slate-700">
          <ToolbarButton 
            icon={FaBold} 
            active={activeFormats.includes('bold')}
            onClick={() => execCommand('bold')} 
            title="Bold" 
          />
          <ToolbarButton 
            icon={FaItalic} 
            active={activeFormats.includes('italic')}
            onClick={() => execCommand('italic')} 
            title="Italic" 
          />
          <ToolbarButton 
            icon={FaUnderline} 
            active={activeFormats.includes('underline')}
            onClick={() => execCommand('underline')} 
            title="Underline" 
          />
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-slate-700">
          <ToolbarButton 
            icon={FaListUl} 
            onClick={() => execCommand('insertUnorderedList')} 
            title="Bullet List" 
          />
          <ToolbarButton 
            icon={FaListOl} 
            onClick={() => execCommand('insertOrderedList')} 
            title="Numbered List" 
          />
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-slate-700">
          <ToolbarButton 
            icon={FaLink} 
            onClick={() => {
              const url = prompt('Enter URL:');
              if (url) execCommand('createLink', url);
            }} 
            title="Insert Link" 
          />
          <ToolbarButton 
            icon={FaQuoteRight} 
            onClick={() => execCommand('formatBlock', 'BLOCKQUOTE')} 
            title="Blockquote" 
          />
        </div>

        <div className="flex items-center gap-1 px-2">
          <ToolbarButton 
            icon={FaImage} 
            onClick={onImageInsert} 
            title="Insert Image with Caption" 
          />
        </div>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        onClick={updateActiveFormats}
        className="min-h-[400px] p-6 text-slate-200 outline-none prose prose-invert prose-lg max-w-none"
        style={{ 
          lineHeight: '1.8',
          fontFamily: 'Georgia, "Times New Roman", serif'
        }}
        suppressContentEditableWarning
      />
    </div>
  );
}

// Image Manager Modal
function ImageManagerModal({ 
  isOpen, 
  onClose, 
  onInsert,
  existingImages = []
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onInsert: (image: InlineImage) => void;
  existingImages?: InlineImage[];
}) {
  const [images, setImages] = useState<InlineImage[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<InlineImage | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        const newImage: InlineImage = {
          id: Date.now().toString(),
          url: data.url,
          caption: '',
          photographer: '',
          align: 'center'
        };
        setImages([...images, newImage]);
        setSelectedImage(newImage);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleInsert = () => {
    if (selectedImage) {
      onInsert(selectedImage);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaCamera className="text-[#0074D9]" />
            Insert Image with Credits
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Upload Area */}
          <div className="mb-6">
            <label className="block border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-[#0074D9]/50 transition-colors cursor-pointer">
              <FaImage className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">
                {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-slate-500 text-sm">JPG, PNG, WebP up to 10MB</p>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
                disabled={uploading}
              />
            </label>
          </div>

          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              {images.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImage?.id === img.id 
                      ? 'border-[#0074D9] ring-2 ring-[#0074D9]/30' 
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  {selectedImage?.id === img.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#0074D9] rounded-full flex items-center justify-center">
                      <FaCheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Image Details Form */}
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 bg-slate-800/50 rounded-xl p-4"
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Image Caption
                </label>
                <input
                  type="text"
                  value={selectedImage.caption}
                  onChange={(e) => setSelectedImage({...selectedImage, caption: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                  placeholder="Describe the image..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Photographer / Source
                  </label>
                  <input
                    type="text"
                    value={selectedImage.photographer}
                    onChange={(e) => setSelectedImage({...selectedImage, photographer: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                    placeholder="e.g., John Doe / Nation Media"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Alignment
                  </label>
                  <div className="flex gap-2">
                    {(['left', 'center', 'right', 'full'] as const).map((align) => (
                      <button
                        key={align}
                        type="button"
                        onClick={() => setSelectedImage({...selectedImage, align})}
                        className={`flex-1 py-2 rounded-lg text-sm capitalize transition-colors ${
                          selectedImage.align === align
                            ? 'bg-[#0074D9] text-white'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {align}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            disabled={!selectedImage}
            className="px-6 py-2 rounded-lg bg-[#0074D9] text-white font-medium hover:bg-[#005CB0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Insert Image
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Live Preview Component
function LivePreview({ formData, inlineImages }: { formData: PostFormData; inlineImages: InlineImage[] }) {
  const calculateReadingTime = (text: string) => {
    const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const readingTime = calculateReadingTime(formData.content);
  const wordCount = formData.content.replace(/<[^>]*>/g, '').split(/\s+/).length;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
      {/* Browser Chrome */}
      <div className="bg-slate-100 px-4 py-2 flex items-center gap-2 border-b">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-sm text-slate-500 text-center">
          dailynation.co.ke/news/{formData.title.toLowerCase().replace(/\s+/g, '-')}
        </div>
      </div>

      {/* Article Preview */}
      <div className="max-w-3xl mx-auto p-8">
        {/* Category & Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 bg-[#E91D0E] text-white text-sm font-semibold rounded">
            {formData.category || 'News'}
          </span>
          <span className="text-slate-500 text-sm">
            {new Date().toLocaleDateString('en-KE', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          {formData.title || 'Your Headline Goes Here'}
        </h1>
        
        {formData.subtitle && (
          <h2 className="text-xl text-slate-600 mb-4 font-light">
            {formData.subtitle}
          </h2>
        )}

        {/* Author & Reading Time */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#0074D9] flex items-center justify-center text-white font-bold">
              {(formData.author || 'A').charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{formData.author || 'Author Name'}</p>
              {formData.authorTitle && (
                <p className="text-sm text-slate-500">{formData.authorTitle}</p>
              )}
            </div>
          </div>
          <div className="text-slate-500 text-sm">
            <FaClock className="inline mr-1" />
            {readingTime} min read
          </div>
          <div className="text-slate-500 text-sm">
            {wordCount.toLocaleString()} words
          </div>
        </div>

        {/* Cover Image */}
        {formData.cover && (
          <figure className="mb-6">
            <img 
              src={formData.cover} 
              alt={formData.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
            {(formData.coverCaption || formData.coverPhotographer) && (
              <figcaption className="mt-2 text-sm text-slate-500 flex items-start gap-2">
                <FaCamera className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  {formData.coverCaption}
                  {formData.coverCaption && formData.coverPhotographer && ' | '}
                  {formData.coverPhotographer && (
                    <span className="text-slate-400">Photo: {formData.coverPhotographer}</span>
                  )}
                </span>
              </figcaption>
            )}
          </figure>
        )}

        {/* Excerpt */}
        {formData.excerpt && (
          <p className="text-lg text-slate-600 italic border-l-4 border-[#0074D9] pl-4 mb-6">
            {formData.excerpt}
          </p>
        )}

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700"
          dangerouslySetInnerHTML={{ 
            __html: formData.content || '<p class="text-slate-400 italic">Your article content will appear here...</p>' 
          }}
        />

        {/* Tags */}
        {formData.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// SEO Preview Component
function SEOPreview({ formData }: { formData: PostFormData }) {
  const title = formData.metaTitle || formData.title;
  const desc = formData.metaDesc || formData.excerpt;

  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200">
      <div className="text-xs text-slate-500 mb-1">
        dailynation.co.ke › news › {formData.category?.toLowerCase()}
      </div>
      <div className="text-[#1a0dab] text-xl hover:underline cursor-pointer truncate">
        {title || 'Page Title'}
      </div>
      <div className="text-[#006621] text-sm">
        https://dailynation.co.ke/news/{formData.title.toLowerCase().replace(/\s+/g, '-')}
      </div>
      <div className="text-slate-600 text-sm line-clamp-2">
        {desc || 'No meta description set. Search engines will use content excerpt instead.'}
      </div>
    </div>
  );
}

// Main Editor Component
function NewsEditorInternal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    subtitle: '',
    content: '',
    excerpt: '',
    category: 'News',
    cover: '',
    coverCaption: '',
    coverPhotographer: '',
    author: '',
    authorTitle: '',
    published: false,
    featured: false,
    isPressRelease: false,
    tags: [],
    location: '',
    county: '',
    metaTitle: '',
    metaDesc: '',
    ogImage: ''
  });

  const [inlineImages, setInlineImages] = useState<InlineImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showImageManager, setShowImageManager] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
  const [newTag, setNewTag] = useState('');
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // Fetch post if editing
  useEffect(() => {
    if (postId) {
      setIsLoading(true);
      fetch(`/api/blog?id=${postId}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.title || '',
            subtitle: data.subtitle || '',
            content: data.content || '',
            excerpt: data.excerpt || '',
            category: data.category || 'News',
            cover: data.cover || '',
            coverCaption: data.coverCaption || '',
            coverPhotographer: data.coverPhotographer || '',
            author: data.author || '',
            authorTitle: data.authorTitle || '',
            published: data.published ?? false,
            featured: data.featured ?? false,
            isPressRelease: data.isPressRelease || false,
            tags: data.tags || [],
            location: data.location || '',
            county: data.county || '',
            metaTitle: data.metaTitle || '',
            metaDesc: data.metaDesc || '',
            ogImage: data.ogImage || ''
          });
          setInlineImages(data.inlineImages || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching post:', err);
          setIsLoading(false);
        });
    }
  }, [postId]);

  // Handle cover image upload
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Handle inserting inline image into content
  const handleInsertImage = (image: InlineImage) => {
    setInlineImages([...inlineImages, image]);
    
    const alignClass = {
      left: 'float-left mr-4 mb-4 max-w-sm',
      right: 'float-right ml-4 mb-4 max-w-sm',
      center: 'mx-auto my-6 max-w-2xl',
      full: 'w-full my-6'
    }[image.align];

    const imageHtml = `
      <figure class="${alignClass}">
        <img src="${image.url}" alt="${image.caption}" class="w-full rounded-lg" />
        ${(image.caption || image.photographer) ? `
          <figcaption class="text-sm text-slate-500 mt-2 text-center">
            ${image.caption || ''}
            ${image.caption && image.photographer ? ' | ' : ''}
            ${image.photographer ? `<span class="text-slate-400">Photo: ${image.photographer}</span>` : ''}
          </figcaption>
        ` : ''}
      </figure>
    `;

    setFormData(prev => ({ ...prev, content: prev.content + imageHtml }));
  };

  // Add tag
  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) });
  };

  // Calculate word count and reading time
  const getStats = useCallback(() => {
    const text = formData.content.replace(/<[^>]*>/g, '');
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const readingTime = Math.ceil(words / 200);
    return { words, readingTime };
  }, [formData.content]);

  const stats = getStats();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent, publish = false) => {
    e.preventDefault();
    setIsSaving(true);

    const submitData = {
      ...formData,
      published: publish,
      wordCount: stats.words,
      readingTime: stats.readingTime,
      inlineImages
    };

    try {
      const url = postId ? `/api/blog?id=${postId}` : '/api/blog';
      const method = postId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        const data = await res.json();
        const action = publish ? 'published' : 'saved as draft';
        // Show notification before redirecting
        setNotification({
          type: 'success',
          message: `Article "${data.title}" has been ${action} successfully!`
        });
        // Wait a moment to show the notification, then redirect
        setTimeout(() => {
          router.push('/admin/posts?success=' + encodeURIComponent(action));
        }, 1500);
      } else {
        const error = await res.json();
        setNotification({
          type: 'error',
          message: error.error || 'Failed to save post'
        });
      }
    } catch (err) {
      console.error('Save error:', err);
      setNotification({
        type: 'error',
        message: 'Failed to save post. Please try again.'
      });
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
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      {/* Success/Error Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 ${
              notification.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            {notification.type === 'success' ? (
              <FaCheck className="w-5 h-5" />
            ) : (
              <FaExclamationCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin')}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaNewspaper className="text-[#0074D9]" />
                  {postId ? 'Edit Article' : 'New Article'}
                </h1>
                <p className="text-xs text-slate-500">
                  {stats.words.toLocaleString()} words • {stats.readingTime} min read
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showPreview 
                    ? 'bg-[#0074D9]/20 text-[#0074D9]' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FaEye />
                Preview
              </button>
              
              <button
                onClick={(e) => handleSubmit(e, false)}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                Save Draft
              </button>
              
              <button
                onClick={(e) => handleSubmit(e, true)}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#0074D9] text-white text-sm font-medium hover:bg-[#005CB0] transition-colors disabled:opacity-50"
              >
                {isSaving ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                Publish
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={`grid gap-6 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-1 bg-slate-900 p-1 rounded-lg">
              {(['content', 'seo', 'settings'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'bg-[#0074D9] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Tab */}
            {activeTab === 'content' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Title */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 text-2xl font-bold bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-[#0074D9] focus:outline-none focus:ring-1 focus:ring-[#0074D9]"
                    placeholder="Enter headline..."
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    Subtitle / Deck
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-4 py-2 text-lg bg-slate-900 border border-slate-700 rounded-xl text-slate-300 placeholder-slate-600 focus:border-[#0074D9] focus:outline-none"
                    placeholder="Add a secondary headline..."
                  />
                </div>

                {/* Cover Image */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <label className="block text-xs font-medium text-slate-500 mb-3 uppercase tracking-wider">
                    Cover Image
                  </label>
                  
                  {formData.cover ? (
                    <div className="space-y-3">
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <img src={formData.cover} alt="Cover" className="w-full h-full object-cover" />
                        <button
                          onClick={() => setFormData({ ...formData, cover: '' })}
                          className="absolute top-2 right-2 p-2 bg-red-500/90 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={formData.coverCaption}
                        onChange={(e) => setFormData({ ...formData, coverCaption: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                        placeholder="Image caption..."
                      />
                      <input
                        type="text"
                        value={formData.coverPhotographer}
                        onChange={(e) => setFormData({ ...formData, coverPhotographer: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                        placeholder="Photographer / Source..."
                      />
                    </div>
                  ) : (
                    <label className="block border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-[#0074D9]/50 transition-colors cursor-pointer">
                      <FaImage className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-400 text-sm">Click to upload cover image</p>
                      <p className="text-slate-500 text-xs mt-1">Recommended: 1200 x 630 pixels</p>
                      <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                    </label>
                  )}
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    Excerpt / Lead
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-[#0074D9] focus:outline-none resize-none"
                    placeholder="Write a compelling summary..."
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {formData.excerpt.length}/500 characters
                  </p>
                </div>

                {/* Rich Text Editor */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    Article Body
                  </label>
                  <RichTextEditor 
                    value={formData.content}
                    onChange={(html) => setFormData({ ...formData, content: html })}
                    onImageInsert={() => setShowImageManager(true)}
                  />
                </div>
              </motion.div>
            )}

            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* SEO Preview */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <label className="block text-xs font-medium text-slate-500 mb-3 uppercase tracking-wider">
                    Search Preview
                  </label>
                  <SEOPreview formData={formData} />
                </div>

                {/* Meta Title */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-[#0074D9] focus:outline-none"
                    placeholder="SEO title (defaults to article title)"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {formData.metaTitle.length}/60 characters
                  </p>
                </div>

                {/* Meta Description */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.metaDesc}
                    onChange={(e) => setFormData({ ...formData, metaDesc: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-[#0074D9] focus:outline-none resize-none"
                    placeholder="SEO description (defaults to excerpt)"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {formData.metaDesc.length}/160 characters
                  </p>
                </div>

                {/* OG Image */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    Social Share Image
                  </label>
                  {formData.ogImage ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <img src={formData.ogImage} alt="OG" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setFormData({ ...formData, ogImage: '' })}
                        className="absolute top-2 right-2 p-2 bg-red-500/90 text-white rounded-lg"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setFormData({ ...formData, ogImage: formData.cover })}
                      className="w-full py-3 border border-dashed border-slate-700 rounded-xl text-slate-400 hover:text-white hover:border-[#0074D9] transition-colors"
                    >
                      Use Cover Image
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Category */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-[#0074D9] focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-[#0074D9] focus:outline-none"
                      placeholder="Author name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                      Author Title
                    </label>
                    <input
                      type="text"
                      value={formData.authorTitle}
                      onChange={(e) => setFormData({ ...formData, authorTitle: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-[#0074D9] focus:outline-none"
                      placeholder="e.g. Senior Editor"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-[#0074D9] focus:outline-none"
                      placeholder="e.g. Nairobi"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                      County
                    </label>
                    <select
                      value={formData.county}
                      onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-[#0074D9] focus:outline-none"
                    >
                      <option value="">Select County</option>
                      {KENYAN_COUNTIES.map((county) => (
                        <option key={county} value={county}>{county}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-[#0074D9] focus:outline-none"
                      placeholder="Add tag and press Enter"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-[#0074D9]/20 text-[#0074D9] text-sm rounded-full"
                      >
                        {tag}
                        <button 
                          onClick={() => removeTag(tag)}
                          className="hover:text-white"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-600 text-[#0074D9] focus:ring-[#0074D9]"
                    />
                    <div>
                      <p className="text-white font-medium">Feature on Homepage</p>
                      <p className="text-slate-500 text-sm">Show as top story</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.isPressRelease}
                      onChange={(e) => setFormData({ ...formData, isPressRelease: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-600 text-[#0074D9] focus:ring-[#0074D9]"
                    />
                    <div>
                      <p className="text-white font-medium">Mark as Press Release</p>
                      <p className="text-slate-500 text-sm">Special formatting for official statements</p>
                    </div>
                  </label>
                </div>
              </motion.div>
            )}
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                  Live Preview
                </h3>
                <span className="text-xs text-slate-500">
                  Desktop View
                </span>
              </div>
              <LivePreview formData={formData} inlineImages={inlineImages} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Image Manager Modal */}
      <ImageManagerModal
        isOpen={showImageManager}
        onClose={() => setShowImageManager(false)}
        onInsert={handleInsertImage}
        existingImages={inlineImages}
      />
    </div>
  );
}

// Export with protection
export default function NewsEditorPage() {
  return (
    <ProtectedAdminPage>
      <NewsEditorInternal />
    </ProtectedAdminPage>
  );
}
