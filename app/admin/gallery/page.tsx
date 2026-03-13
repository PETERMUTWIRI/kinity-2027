// app/admin/gallery/page.tsx - FULL GALLERY MANAGEMENT WITH BULK UPLOAD
'use client';

import ProtectedAdminPage from '@/components/ProtectedAdminPage';
import { useState, useEffect, useCallback } from 'react';
import { 
  FaImages, FaPlus, FaUpload, FaSearch, FaFilter, FaCalendar,
  FaMapMarkerAlt, FaCamera, FaFolder, FaEdit, FaTrash, FaTimes,
  FaChevronDown, FaChevronUp, FaCheck, FaSpinner, FaEye, FaEyeSlash
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  id: number;
  title: string | null;
  url: string;
  albumId: number | null;
  album: { id: number; title: string } | null;
  photographer: string | null;
  location: string | null;
  county: string | null;
  eventDate: string | null;
  featured: boolean;
  published: boolean;
  tags: string[];
  createdAt: string;
}

interface Album {
  id: number;
  title: string;
  slug: string;
  category: string;
}

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

const CATEGORIES = ['All', 'Rallies', 'Community', 'Behind the Scenes', 'Press', 'County Tours'];

function GalleryAdminPage() {
  // State
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState<number | 'all'>('all');
  const [selectedPhotographer, setSelectedPhotographer] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Upload modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadData, setUploadData] = useState({
    albumId: '',
    photographer: '',
    location: '',
    county: '',
    eventDate: '',
    tags: '',
  });
  
  // Edit modal
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  
  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [imagesRes, albumsRes] = await Promise.all([
        fetch('/api/gallery/images'),
        fetch('/api/gallery/albums')
      ]);
      
      if (imagesRes.ok) {
        const imagesData = await imagesRes.json();
        setImages(imagesData);
      }
      
      if (albumsRes.ok) {
        const albumsData = await albumsRes.json();
        setAlbums(albumsData);
      }
    } catch (err) {
      console.error('Error fetching gallery data:', err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Get unique photographers and locations for filter dropdowns
  const photographers = Array.from(new Set(images.map(img => img.photographer).filter(Boolean)));
  const locations = Array.from(new Set(images.map(img => img.location).filter(Boolean)));

  // Filter images
  const filteredImages = images.filter(img => {
    if (searchQuery && !img.title?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedAlbum !== 'all' && img.albumId !== selectedAlbum) return false;
    if (selectedPhotographer !== 'all' && img.photographer !== selectedPhotographer) return false;
    if (selectedLocation !== 'all' && img.location !== selectedLocation) return false;
    if (selectedCounty !== 'all' && img.county !== selectedCounty) return false;
    if (dateFrom && img.eventDate && new Date(img.eventDate) < new Date(dateFrom)) return false;
    if (dateTo && img.eventDate && new Date(img.eventDate) > new Date(dateTo)) return false;
    return true;
  });

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadFiles(Array.from(e.target.files));
    }
  };

  // Bulk upload
  const handleUpload = async () => {
    if (uploadFiles.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    const uploadedImages = [];
    
    for (let i = 0; i < uploadFiles.length; i++) {
      const file = uploadFiles[i];
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        // Upload to ImgBB
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const uploadDataRes = await uploadRes.json();
        
        if (uploadDataRes.url) {
          // Create gallery image record
          const imageRes = await fetch('/api/gallery/images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              url: uploadDataRes.url,
              title: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
              albumId: uploadData.albumId ? parseInt(uploadData.albumId) : null,
              photographer: uploadData.photographer || null,
              location: uploadData.location || null,
              county: uploadData.county || null,
              eventDate: uploadData.eventDate || null,
              tags: uploadData.tags ? uploadData.tags.split(',').map((t: string) => t.trim()) : [],
            }),
          });
          
          if (imageRes.ok) {
            uploadedImages.push(await imageRes.json());
          }
        }
        
        setUploadProgress(((i + 1) / uploadFiles.length) * 100);
      } catch (err) {
        console.error('Upload error:', err);
      }
    }
    
    setImages([...uploadedImages, ...images]);
    setUploading(false);
    setUploadFiles([]);
    setShowUploadModal(false);
    setUploadData({ albumId: '', photographer: '', location: '', county: '', eventDate: '', tags: '' });
  };

  // Update image
  const handleUpdate = async (image: GalleryImage) => {
    try {
      const res = await fetch(`/api/gallery/images?id=${image.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image),
      });
      
      if (res.ok) {
        setImages(images.map(img => img.id === image.id ? image : img));
        setEditingImage(null);
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  // Delete image
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/gallery/images?id=${id}`, { method: 'DELETE' });
      
      if (res.ok) {
        setImages(images.filter(img => img.id !== id));
        setDeleteConfirm(null);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Toggle featured
  const toggleFeatured = async (image: GalleryImage) => {
    const updated = { ...image, featured: !image.featured };
    await handleUpdate(updated);
  };

  // Toggle published
  const togglePublished = async (image: GalleryImage) => {
    const updated = { ...image, published: !image.published };
    await handleUpdate(updated);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FaImages className="text-[#0074D9]" />
            Gallery Management
          </h1>
          <p className="text-slate-400 mt-1">
            {images.length} images • {albums.length} albums
          </p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0074D9] text-white font-semibold rounded-xl hover:bg-[#005CB0] transition-colors"
        >
          <FaUpload className="w-4 h-4" />
          Upload Images
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900 rounded-xl p-4 mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images..."
              className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-[#0074D9] focus:outline-none"
            />
          </div>
          
          {/* Album Filter */}
          <select
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-[#0074D9] focus:outline-none min-w-[180px]"
          >
            <option value="all">All Albums</option>
            {albums.map(album => (
              <option key={album.id} value={album.id}>{album.title}</option>
            ))}
          </select>
          
          {/* Toggle Filters */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white hover:bg-slate-700 transition-colors"
          >
            <FaFilter className="w-4 h-4" />
            Filters
            {showFilters ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />}
          </button>
        </div>
        
        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                {/* Photographer Filter */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">Photographer</label>
                  <select
                    value={selectedPhotographer}
                    onChange={(e) => setSelectedPhotographer(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:border-[#0074D9] focus:outline-none"
                  >
                    <option value="all">All Photographers</option>
                    {photographers.map(p => (
                      <option key={p} value={p!}>{p}</option>
                    ))}
                  </select>
                </div>
                
                {/* Location Filter */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:border-[#0074D9] focus:outline-none"
                  >
                    <option value="all">All Locations</option>
                    {locations.map(l => (
                      <option key={l} value={l!}>{l}</option>
                    ))}
                  </select>
                </div>
                
                {/* County Filter */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">County</label>
                  <select
                    value={selectedCounty}
                    onChange={(e) => setSelectedCounty(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:border-[#0074D9] focus:outline-none"
                  >
                    <option value="all">All Counties</option>
                    {KENYAN_COUNTIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                
                {/* Date Range */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">Date Range</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:border-[#0074D9] focus:outline-none"
                      placeholder="From"
                    />
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:border-[#0074D9] focus:outline-none"
                      placeholder="To"
                    />
                  </div>
                </div>
              </div>
              
              {/* Clear Filters */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedAlbum('all');
                    setSelectedPhotographer('all');
                    setSelectedLocation('all');
                    setSelectedCounty('all');
                    setDateFrom('');
                    setDateTo('');
                  }}
                  className="text-sm text-[#0074D9] hover:text-[#005CB0]"
                >
                  Clear all filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-slate-400">
          Showing <span className="text-white font-medium">{filteredImages.length}</span> of {images.length} images
        </p>
      </div>

      {/* Images Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-slate-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredImages.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all"
            >
              {/* Image */}
              <div className="relative aspect-square">
                <img 
                  src={image.url} 
                  alt={image.title || 'Gallery image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setEditingImage(image)}
                    className="p-3 bg-[#0074D9] text-white rounded-full hover:bg-[#005CB0] transition-colors"
                    title="Edit"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(image.id)}
                    className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    title="Delete"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Status Badges */}
                <div className="absolute top-2 left-2 flex gap-1">
                  {image.featured && (
                    <span className="px-2 py-1 bg-[#0074D9] text-white text-xs rounded">
                      Featured
                    </span>
                  )}
                  {!image.published && (
                    <span className="px-2 py-1 bg-amber-500 text-white text-xs rounded">
                      Draft
                    </span>
                  )}
                </div>
              </div>
              
              {/* Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-medium text-white truncate">
                  {image.title || 'Untitled'}
                </h3>
                
                {image.photographer && (
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <FaCamera className="w-3 h-3" />
                    {image.photographer}
                  </p>
                )}
                
                {(image.location || image.county) && (
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    {[image.location, image.county].filter(Boolean).join(', ')}
                  </p>
                )}
                
                {image.eventDate && (
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <FaCalendar className="w-3 h-3" />
                    {new Date(image.eventDate).toLocaleDateString('en-KE')}
                  </p>
                )}
                
                {image.album && (
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <FaFolder className="w-3 h-3" />
                    {image.album.title}
                  </p>
                )}
                
                {/* Quick Actions */}
                <div className="flex gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => toggleFeatured(image)}
                    className={`flex-1 py-1.5 text-xs rounded transition-colors ${
                      image.featured 
                        ? 'bg-[#0074D9]/20 text-[#0074D9]' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {image.featured ? 'Featured' : 'Feature'}
                  </button>
                  <button
                    onClick={() => togglePublished(image)}
                    className={`flex-1 py-1.5 text-xs rounded transition-colors ${
                      image.published 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {image.published ? 'Published' : 'Draft'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/50 rounded-xl border border-slate-800 border-dashed">
          <FaImages className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No images found</h3>
          <p className="text-slate-400 mb-6">
            {searchQuery || selectedAlbum !== 'all' 
              ? 'Try adjusting your filters'
              : 'Upload your first images to get started'
            }
          </p>
          {!searchQuery && selectedAlbum === 'all' && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0074D9] text-white font-semibold rounded-xl hover:bg-[#005CB0] transition-colors"
            >
              <FaUpload className="w-4 h-4" />
              Upload Images
            </button>
          )}
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
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
              className="bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaUpload className="text-[#0074D9]" />
                  Upload Images
                </h2>
                <button 
                  onClick={() => !uploading && setShowUploadModal(false)}
                  className="text-slate-400 hover:text-white"
                  disabled={uploading}
                >
                  <FaTimes />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-6 space-y-6">
                {/* File Input */}
                <div>
                  <label className="block border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-[#0074D9]/50 transition-colors cursor-pointer">
                    <FaImages className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 mb-2">
                      {uploadFiles.length > 0 
                        ? `${uploadFiles.length} files selected`
                        : 'Click to select multiple images'
                      }
                    </p>
                    <p className="text-slate-500 text-sm">JPG, PNG, WebP up to 10MB each</p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>

                {/* Selected Files Preview */}
                {uploadFiles.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {uploadFiles.map((file, i) => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden bg-slate-800">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Metadata Form */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Album</label>
                    <select
                      value={uploadData.albumId}
                      onChange={(e) => setUploadData({...uploadData, albumId: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                      disabled={uploading}
                    >
                      <option value="">No Album</option>
                      {albums.map(album => (
                        <option key={album.id} value={album.id}>{album.title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Photographer</label>
                    <input
                      type="text"
                      value={uploadData.photographer}
                      onChange={(e) => setUploadData({...uploadData, photographer: e.target.value})}
                      placeholder="e.g., John Doe"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                      disabled={uploading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                    <input
                      type="text"
                      value={uploadData.location}
                      onChange={(e) => setUploadData({...uploadData, location: e.target.value})}
                      placeholder="e.g., Uhuru Park"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                      disabled={uploading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">County</label>
                    <select
                      value={uploadData.county}
                      onChange={(e) => setUploadData({...uploadData, county: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                      disabled={uploading}
                    >
                      <option value="">Select County</option>
                      {KENYAN_COUNTIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Event Date</label>
                    <input
                      type="date"
                      value={uploadData.eventDate}
                      onChange={(e) => setUploadData({...uploadData, eventDate: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                      disabled={uploading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={uploadData.tags}
                      onChange={(e) => setUploadData({...uploadData, tags: e.target.value})}
                      placeholder="rally, nairobi, crowd"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                      disabled={uploading}
                    />
                  </div>
                </div>

                {/* Progress */}
                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>Uploading...</span>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#0074D9] transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-800">
                <button
                  onClick={() => setShowUploadModal(false)}
                  disabled={uploading}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={uploadFiles.length === 0 || uploading}
                  className="flex items-center gap-2 px-6 py-2 bg-[#0074D9] text-white rounded-lg font-medium hover:bg-[#005CB0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaUpload className="w-4 h-4" />
                      Upload {uploadFiles.length > 0 && `(${uploadFiles.length})`}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingImage && (
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
              className="bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <h2 className="text-xl font-bold text-white">Edit Image</h2>
                <button 
                  onClick={() => setEditingImage(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-6 space-y-6">
                {/* Preview */}
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-800">
                  <img 
                    src={editingImage.url} 
                    alt={editingImage.title || 'Preview'}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Form */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={editingImage.title || ''}
                      onChange={(e) => setEditingImage({...editingImage, title: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Album</label>
                    <select
                      value={editingImage.albumId || ''}
                      onChange={(e) => setEditingImage({...editingImage, albumId: e.target.value ? parseInt(e.target.value) : null})}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="">No Album</option>
                      {albums.map(album => (
                        <option key={album.id} value={album.id}>{album.title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Photographer</label>
                    <input
                      type="text"
                      value={editingImage.photographer || ''}
                      onChange={(e) => setEditingImage({...editingImage, photographer: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                    <input
                      type="text"
                      value={editingImage.location || ''}
                      onChange={(e) => setEditingImage({...editingImage, location: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">County</label>
                    <select
                      value={editingImage.county || ''}
                      onChange={(e) => setEditingImage({...editingImage, county: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="">Select County</option>
                      {KENYAN_COUNTIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Event Date</label>
                    <input
                      type="date"
                      value={editingImage.eventDate ? editingImage.eventDate.split('T')[0] : ''}
                      onChange={(e) => setEditingImage({...editingImage, eventDate: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-800">
                <button
                  onClick={() => setEditingImage(null)}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdate(editingImage)}
                  className="flex items-center gap-2 px-6 py-2 bg-[#0074D9] text-white rounded-lg font-medium hover:bg-[#005CB0] transition-colors"
                >
                  <FaCheck className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
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
                <h3 className="text-xl font-bold text-white mb-2">Delete Image?</h3>
                <p className="text-slate-400 mb-6">
                  This will permanently remove the image from the gallery.
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
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
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

export default function GalleryPage() {
  return (
    <ProtectedAdminPage>
      <GalleryAdminPage />
    </ProtectedAdminPage>
  );
}
