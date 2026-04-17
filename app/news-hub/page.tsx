// app/news-hub/page.tsx - NEWS HUB
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendar, FaArrowRight, FaNewspaper } from 'react-icons/fa';
import GalleryCarousel from '@/components/GalleryCarousel';
import PostShareButtons from '@/components/PostShareButtons';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'News Hub | National Vision Party',
  description: 'Latest news, press releases, and campaign updates from Dr. Isaac Newton Kinity.',
};

const categories = ['All', 'News', 'Press Release', 'Event Recap', 'Statement'];

export default async function NewsHubPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ category?: string }> 
}) {
  const { category: categoryParam } = await searchParams;
  const category = categoryParam || 'All';
  
  // Safe query with fallback
  let posts: any[] = [];
  try {
    posts = await prisma.post.findMany({
      where: {
        published: true,
        deletedAt: null,
        ...(category !== 'All' && { category }),
      },
      orderBy: { publishedAt: 'desc' },
    });
  } catch (error) {
    console.warn('Database not available, showing empty state');
    posts = [];
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="kicker-gold mb-4">Latest Updates</span>
          <h1 className="heading-editorial !text-white mb-4">
            News <span className="heading-accent-gold">Hub</span>
          </h1>
          <div className="hr-gold mx-auto mb-4" />
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Stay informed with the latest campaign news, press releases, and event coverage.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/vission/economic-transformation.png')] bg-cover bg-center bg-no-repeat" />
        {/* White overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 relative z-10">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/news-hub${cat === 'All' ? '' : `?category=${cat}`}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                category === cat
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {posts.map((post) => (
              <Link key={post.id} href={`/news-hub/${post.slug}`} className="group">
                <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full">
                  {/* Image */}
                  <div className="relative aspect-video">
                    {post.cover ? (
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1E3A8A] to-[#1E3A8A] flex items-center justify-center">
                        <FaNewspaper className="w-12 h-12 text-white/50" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-[#DC2626] text-white text-xs font-bold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                      <FaCalendar className="w-4 h-4" />
                      {post.publishedAt?.toLocaleDateString('en-KE', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    <h2 className="font-headline text-xl text-[#0F172A] mb-2 group-hover:text-[#1E3A8A] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 text-sm line-clamp-3">
                      {post.excerpt || post.content.replace(/<[^>]*>/g, '').slice(0, 150)}...
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#1E3A8A] font-semibold text-sm">
                        Read more
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <PostShareButtons title={post.title} slug={post.slug} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 relative z-10">
            <FaNewspaper className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">News Coming Soon</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Our news section is being prepared. Check back soon for campaign updates, press releases, and event coverage.
            </p>
          </div>
        )}
      </div>

      {/* Gallery Carousel - From the Campaign Trail */}
      <div className="relative z-10">
        <GalleryCarousel />
      </div>
    </div>
  );
}
