// app/news-hub/[slug]/page.tsx - Enterprise News Article Page
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaCalendar, FaUser, FaArrowLeft, FaShare, FaClock, 
  FaMapMarkerAlt, FaCamera, FaTag, FaFacebook, FaTwitter,
  FaWhatsapp, FaLinkedin, FaEnvelope, FaBookmark, FaComment,
  FaPrint, FaCopy
} from 'react-icons/fa';

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

// Related Articles Component
async function RelatedArticles({ currentId, category, county }: { currentId: number; category: string; county?: string | null }) {
  const related = await prisma.post.findMany({
    where: {
      id: { not: currentId },
      category,
      published: true,
      deletedAt: null,
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  if (related.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-6">More in {category}</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {related.map((article) => (
          <Link 
            key={article.id} 
            href={`/news-hub/${article.slug}`}
            className="group"
          >
            <div className="aspect-video rounded-lg overflow-hidden mb-3">
              {article.cover ? (
                <img 
                  src={article.cover} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0074D9] to-[#6B2C91]" />
              )}
            </div>
            <h4 className="font-semibold text-slate-900 group-hover:text-[#0074D9] transition-colors line-clamp-2">
              {article.title}
            </h4>
            <p className="text-sm text-slate-500 mt-1">
              {article.publishedAt?.toLocaleDateString('en-KE', {
                day: 'numeric',
                month: 'short',
              })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
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

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug, published: true, deletedAt: null },
  });

  if (!post) {
    notFound();
  }

  // Get full URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kikimo.foundation';
  const articleUrl = `${baseUrl}/news-hub/${post.slug}`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200">
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

      {/* Hero Section */}
      <div className="relative">
        {post.cover ? (
          <div className="relative h-[50vh] min-h-[400px] max-h-[600px]">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          </div>
        ) : (
          <div className="h-32 bg-gradient-to-r from-[#0074D9] to-[#6B2C91]" />
        )}
        
        {/* Article Header - Overlapping */}
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${post.cover ? '-mt-48 relative z-10' : 'pt-12'}`}>
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
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

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <h2 className="text-xl md:text-2xl text-slate-600 font-light mb-6">
                {post.subtitle}
              </h2>
            )}

            {/* Author & Meta Row */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3">
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
              
              <div className="h-8 w-px bg-slate-300 hidden sm:block" />
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <FaCalendar className="w-4 h-4" />
                  {post.publishedAt?.toLocaleDateString('en-KE', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                
                {(post.location || post.county) && (
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    {[post.location, post.county].filter(Boolean).join(', ')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cover Image Caption */}
        {post.cover && (post.coverCaption || post.coverPhotographer) && (
          <div className="mb-8 text-sm text-slate-500 flex items-start gap-2 bg-slate-100 rounded-lg p-4">
            <FaCamera className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              {post.coverCaption}
              {post.coverCaption && post.coverPhotographer && ' | '}
              {post.coverPhotographer && (
                <span className="text-slate-400">Photo: {post.coverPhotographer}</span>
              )}
            </span>
          </div>
        )}

        {/* Social Share Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-slate-200">
          <ShareButtons title={post.title} url={articleUrl} />
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-[#0074D9] transition-colors">
              <FaBookmark className="w-4 h-4" />
              <span className="text-sm font-medium">Save</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-[#0074D9] transition-colors">
              <FaPrint className="w-4 h-4" />
              <span className="text-sm font-medium">Print</span>
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="grid lg:grid-cols-[1fr,280px] gap-12">
          {/* Main Content */}
          <div>
            {/* Excerpt / Lead */}
            {post.excerpt && (
              <p className="text-xl text-slate-600 font-light italic border-l-4 border-[#0074D9] pl-6 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-[#0074D9] prose-blockquote:border-l-[#0074D9] prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-img:rounded-lg prose-figure:my-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
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

            {/* Related Articles */}
            <RelatedArticles 
              currentId={post.id} 
              category={post.category}
              county={post.county}
            />

            {/* Comments Section Placeholder */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FaComment className="w-5 h-5" />
                Comments
              </h3>
              <p className="text-slate-500">
                Comments are moderated and will appear after approval.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* About Author */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-4">About the Author</h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0074D9] to-[#6B2C91] flex items-center justify-center text-white font-bold text-xl">
                  {(post.author || 'A').charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{post.author || 'Staff Writer'}</p>
                  {post.authorTitle && (
                    <p className="text-sm text-slate-500">{post.authorTitle}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Article Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-4">Article Info</h4>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Published</dt>
                  <dd className="text-slate-900">
                    {post.publishedAt?.toLocaleDateString('en-KE')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Category</dt>
                  <dd className="text-slate-900">{post.category}</dd>
                </div>
                {post.county && (
                  <div className="flex justify-between">
                    <dt className="text-slate-500">County</dt>
                    <dd className="text-slate-900">{post.county}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-slate-500">Reading Time</dt>
                  <dd className="text-slate-900">{post.readingTime || 3} min</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Word Count</dt>
                  <dd className="text-slate-900">{(post.wordCount || 0).toLocaleString()}</dd>
                </div>
              </dl>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-gradient-to-br from-[#0074D9] to-[#6B2C91] rounded-xl p-6 text-white">
              <h4 className="font-bold mb-2">Stay Informed</h4>
              <p className="text-sm text-white/80 mb-4">
                Get the latest news and updates delivered to your inbox.
              </p>
              <Link 
                href="/join-us"
                className="block w-full py-2 bg-white text-[#0074D9] text-center rounded-lg font-semibold hover:bg-slate-100 transition-colors"
              >
                Subscribe Now
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
