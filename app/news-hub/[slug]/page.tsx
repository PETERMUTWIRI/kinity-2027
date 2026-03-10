// app/news-hub/[slug]/page.tsx - News Article Detail
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaUser, FaArrowLeft, FaShare } from 'react-icons/fa';

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

  return {
    title: `${post.title} | News`,
    description: post.excerpt || post.content.slice(0, 160).replace(/<[^>]*>/g, ''),
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug, published: true, deletedAt: null },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0074D9] to-[#6B2C91]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
            <Link 
              href="/news-hub"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to News
            </Link>
            <span className="inline-block px-3 py-1 rounded-full bg-[#E91D0E] text-white text-sm font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <FaCalendar className="w-4 h-4" />
                <span>{post.publishedAt?.toLocaleDateString('en-KE', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-2">
                  <FaUser className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {post.excerpt && (
            <p className="text-xl text-slate-600 font-light italic border-l-4 border-[#0074D9] pl-6 mb-8">
              {post.excerpt}
            </p>
          )}
          
          <div 
            className="prose prose-lg max-w-none prose-headings:text-[#111111] prose-p:text-slate-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Share */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="text-slate-500">Share this article:</span>
          <button className="w-10 h-10 rounded-full bg-[#0074D9] text-white flex items-center justify-center hover:bg-[#005CB0] transition-colors">
            <FaShare className="w-4 h-4" />
          </button>
        </div>
      </article>
    </div>
  );
}
