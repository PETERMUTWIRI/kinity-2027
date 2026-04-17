// app/news-hub/[slug]/page.tsx - Professional News Article Page
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaCalendar, FaArrowLeft, FaClock, 
  FaMapMarkerAlt, FaCamera, FaTag,
  FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaEnvelope
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
    <div className="mt-16 pt-12 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-slate-900">More Articles</h3>
        <Link 
          href="/news-hub"
          className="text-[#1E3A8A] hover:text-[#0F172A] font-medium flex items-center gap-1"
        >
          View All
          <FaArrowLeft className="w-4 h-4 rotate-180" />
        </Link>
      </div>
      
      {/* Horizontal Scroll Carousel */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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
                  <div className="w-full h-full bg-gradient-to-br from-[#1E3A8A] to-[#1E3A8A] flex items-center justify-center">
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
              <h4 className="font-semibold text-slate-900 group-hover:text-[#1E3A8A] transition-colors line-clamp-2 text-sm leading-relaxed">
                {article.title}
              </h4>
            </Link>
          ))}
        </div>
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
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/news-hub"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-[#1E3A8A] transition-colors text-sm font-medium"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to News Hub
            </Link>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FaClock className="w-4 h-4" />
              {post.readingTime || Math.ceil((post.wordCount || 0) / 200) || 3} min read
            </div>
          </div>
        </div>
      </nav>

      {/* Main Article */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Article Card */}
        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Hero Image */}
          {post.cover && (
            <div className="relative">
              <div className="aspect-[21/9] md:aspect-[3/1] relative">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Caption Overlay */}
              {(post.coverCaption || post.coverPhotographer) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
                  <p className="text-white/90 text-sm flex items-center gap-2">
                    <FaCamera className="w-4 h-4" />
                    {post.coverCaption}
                    {post.coverCaption && post.coverPhotographer && ' • '}
                    {post.coverPhotographer && <span className="text-white/70">Photo: {post.coverPhotographer}</span>}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Article Content */}
          <div className="p-6 md:p-10 lg:p-12">
            {/* Meta Header */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-[#DC2626] text-white text-sm font-semibold">
                {post.category}
              </span>
              {post.featured && (
                <span className="px-3 py-1 rounded-full bg-[#1E3A8A] text-white text-sm font-medium">
                  Featured
                </span>
              )}
              {post.isPressRelease && (
                <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-sm font-medium">
                  Press Release
                </span>
              )}
              <span className="text-slate-500 text-sm ml-auto">
                {post.publishedAt?.toLocaleDateString('en-KE', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <h2 className="text-xl md:text-2xl text-slate-600 font-light mb-8">
                {post.subtitle}
              </h2>
            )}

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg text-slate-600 font-light italic border-l-4 border-[#1E3A8A] pl-6 py-3 mb-10 bg-slate-50 rounded-r-lg">
                {post.excerpt}
              </p>
            )}

            {/* Author Bar */}
            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-slate-100 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#1E3A8A] flex items-center justify-center text-white font-bold text-lg">
                  {(post.author || 'A').charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{post.author || 'Staff Writer'}</p>
                  {post.authorTitle && (
                    <p className="text-sm text-slate-500">{post.authorTitle}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-6 ml-auto text-sm text-slate-500">
                {(post.location || post.county) && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    {[post.location, post.county].filter(Boolean).join(', ')}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900">{post.readingTime || 3}</span> min read
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-[#1E3A8A] hover:prose-a:text-[#0F172A] prose-blockquote:border-l-[#1E3A8A] prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-img:rounded-xl prose-figure:my-8 prose-strong:text-slate-900 prose-li:text-slate-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <FaTag className="w-4 h-4" />
                  Related Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <Link
                      key={i}
                      href={`/news-hub?tag=${encodeURIComponent(tag)}`}
                      className="px-4 py-2 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-[#1E3A8A] hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Share this article</h4>
              <ShareButtons title={post.title} url={articleUrl} />
            </div>
          </div>
        </article>

        {/* More Articles */}
        <ArticlesCarousel 
          currentId={post.id} 
          category={post.category}
        />

        {/* Comments Section */}
        <div className="mt-12">
          <CommentSection postId={post.id.toString()} />
        </div>
      </main>
    </div>
  );
}
