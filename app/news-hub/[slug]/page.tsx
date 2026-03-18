// app/news-hub/[slug]/page.tsx - Enterprise News Article Page with Two-Column Layout
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaCalendar, FaUser, FaArrowLeft, FaShare, FaClock, 
  FaMapMarkerAlt, FaCamera, FaTag, FaFacebook, FaTwitter,
  FaWhatsapp, FaLinkedin, FaEnvelope, FaBookmark, FaComment,
  FaPrint, FaCopy, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import CommentSection from '@/components/CommentSection';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug, published: true, deletedAt: null },
  });

  if (!post) {
    return { title: 'Article Not Found' };
  }

  const description = post.metaDesc || post.excerpt || post.content.slice(0, 160).replace(/<[^>]*>/g, '');
  const title = post.metaTitle || post.title;

  return {
    title: `${title} | News`,
    description,
    openGraph: {
      title,
      description,
      images: post.ogImage || post.cover ? [{ url: post.ogImage || post.cover! }] : undefined,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: post.author ? [post.author] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.ogImage || post.cover ? [post.ogImage || post.cover!] : undefined,
    },
  };
}

// Share Buttons Component
function ShareButtons({ title, url }: { title: string; url: string }) {
  const shareLinks = [
    { 
      icon: FaFacebook, 
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'bg-[#1877F2]',
      label: 'Share on Facebook'
    },
    { 
      icon: FaTwitter, 
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'bg-[#1DA1F2]',
      label: 'Share on Twitter'
    },
    { 
      icon: FaWhatsapp, 
      href: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      color: 'bg-[#25D366]',
      label: 'Share on WhatsApp'
    },
    { 
      icon: FaLinkedin, 
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'bg-[#0A66C2]',
      label: 'Share on LinkedIn'
    },
    { 
      icon: FaEnvelope, 
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      color: 'bg-slate-600',
      label: 'Share via Email'
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={`w-10 h-10 ${link.color} text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity`}
        >
          <link.icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}

// Articles Carousel Component
async function ArticlesCarousel({ currentId, category }: { currentId: number; category: string }) {
  const articles = await prisma.post.findMany({
    where: {
      id: { not: currentId },
      published: true,
      deletedAt: null,
    },
    orderBy: { publishedAt: 'desc' },
    take: 8,
  });

  if (articles.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t-2 border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          More Articles
          <span className="text-sm font-normal text-slate-500">({articles.length})</span>
        </h3>
        <Link 
          href="/news-hub"
          className="text-[#0074D9] hover:text-[#005CB0] font-medium flex items-center gap-1"
        >
          View All
          <FaArrowLeft className="w-4 h-4 rotate-180" />
        </Link>
      </div>
      
      {/* Horizontal Scroll Carousel */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {articles.map((article) => (
            <Link 
              key={article.id} 
              href={`/news-hub/${article.slug}`}
              className="group flex-shrink-0 w-72 snap-start"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-slate-200">
                {article.cover ? (
                  <img 
                    src={article.cover} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0074D9] to-[#6B2C91] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{article.category}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700">{article.category}</span>
                <span>•</span>
                <span>{article.publishedAt?.toLocaleDateString('en-KE', {
                  day: 'numeric',
                  month: 'short',
                })}</span>
              </div>
              <h4 className="font-semibold text-slate-900 group-hover:text-[#0074D9] transition-colors line-clamp-2 text-sm leading-relaxed">
                {article.title}
              </h4>
            </Link>
          ))}
        </div>
        
        {/* Fade indicators */}
        <div className="absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug, published: true, deletedAt: null },
  });

  if (!post) {
    notFound();
  }

  // Get full URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.nationalvisionparty.com';
  const articleUrl = `${baseUrl}/news-hub/${post.slug}`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link 
              href="/news-hub"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0074D9] transition-colors text-sm font-medium"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to News
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">
                <FaClock className="inline mr-1" />
                {post.readingTime || Math.ceil((post.wordCount || 0) / 200) || 3} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TWO COLUMN LAYOUT: Cover + Meta Left, Title Right */}
        <div className="grid lg:grid-cols-[400px,1fr] gap-8 mb-8">
          {/* LEFT COLUMN: Cover Image & Meta */}
          <div className="space-y-4">
            {/* Cover Image - Smaller, clearly visible */}
            {post.cover ? (
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Caption below image */}
                {(post.coverCaption || post.coverPhotographer) && (
                  <div className="mt-3 text-sm text-slate-500 flex items-start gap-2 bg-slate-100 rounded-lg p-3">
                    <FaCamera className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-400" />
                    <span>
                      {post.coverCaption}
                      {post.coverCaption && post.coverPhotographer && ' | '}
                      {post.coverPhotographer && (
                        <span className="text-slate-400">Photo: {post.coverPhotographer}</span>
                      )}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#0074D9] to-[#6B2C91] flex items-center justify-center">
                <span className="text-white text-6xl font-bold">{(post.title || 'A').charAt(0)}</span>
              </div>
            )}

            {/* Article Meta Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
              {/* Category */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#E91D0E] text-white text-sm font-semibold">
                  {post.category}
                </span>
                {post.featured && (
                  <span className="px-3 py-1 rounded-full bg-[#0074D9] text-white text-sm font-medium">
                    Featured
                  </span>
                )}
                {post.isPressRelease && (
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-sm font-medium">
                    Press Release
                  </span>
                )}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0074D9] to-[#6B2C91] flex items-center justify-center text-white font-bold text-lg">
                  {(post.author || 'A').charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{post.author || 'Staff Writer'}</p>
                  {post.authorTitle && (
                    <p className="text-sm text-slate-500">{post.authorTitle}</p>
                  )}
                </div>
              </div>

              {/* Date & Location */}
              <div className="space-y-2 text-sm text-slate-500 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <FaCalendar className="w-4 h-4 text-slate-400" />
                  {post.publishedAt?.toLocaleDateString('en-KE', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
                {(post.location || post.county) && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="w-4 h-4 text-slate-400" />
                    {[post.location, post.county].filter(Boolean).join(', ')}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900">{post.readingTime || 3}</p>
                  <p className="text-xs text-slate-500">Min Read</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900">{(post.wordCount || 0).toLocaleString()}</p>
                  <p className="text-xs text-slate-500">Words</p>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h4 className="font-semibold text-slate-900 mb-4 text-sm">Share Article</h4>
              <ShareButtons title={post.title} url={articleUrl} />
            </div>
          </div>

          {/* RIGHT COLUMN: Title & Content */}
          <div>
            {/* Title Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-6">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {post.title}
              </h1>

              {post.subtitle && (
                <h2 className="text-lg md:text-xl text-slate-600 font-light mb-4">
                  {post.subtitle}
                </h2>
              )}

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg text-slate-600 font-light italic border-l-4 border-[#0074D9] pl-4 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </div>

            {/* Article Body */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-[#0074D9] hover:prose-a:text-[#005CB0] prose-blockquote:border-l-[#0074D9] prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-img:rounded-lg prose-figure:my-8 prose-strong:text-slate-900"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <FaTag className="w-4 h-4" />
                    Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <Link
                        key={i}
                        href={`/news-hub?tag=${encodeURIComponent(tag)}`}
                        className="px-4 py-2 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-[#0074D9] hover:text-white transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Articles Carousel */}
            <ArticlesCarousel 
              currentId={post.id} 
              category={post.category}
            />

            {/* Comments Section */}
            <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <CommentSection postId={post.id.toString()} />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
