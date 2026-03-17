// app/api/blog/route.ts - ENTERPRISE NEWS API
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth/middleware';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// Enhanced schema with all news fields
const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  subtitle: z.string().optional().nullable(),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(500),
  category: z.enum([
    'News', 'Politics', 'Opinion', 'Analysis', 'Breaking News',
    'Press Release', 'Event Recap', 'Statement', 'Interview',
    'County News', 'National', 'International', 'Business'
  ]),
  cover: z.preprocess(
    (val) => {
      if (!val || val === '') return null;
      // Encode spaces in URL to prevent validation errors
      return String(val).replace(/ /g, '%20');
    },
    z.string().url().optional().nullable()
  ),
  coverCaption: z.string().optional().nullable(),
  coverPhotographer: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
  authorTitle: z.string().optional().nullable(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  isPressRelease: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  location: z.string().optional().nullable(),
  county: z.string().optional().nullable(),
  metaTitle: z.string().max(100).optional().nullable(),
  metaDesc: z.string().max(160).optional().nullable(),
  ogImage: z.preprocess(
    (val) => {
      if (!val || val === '') return null;
      // Encode spaces in URL to prevent validation errors
      return String(val).replace(/ /g, '%20');
    },
    z.string().url().optional().nullable()
  ),
  wordCount: z.number().default(0),
  readingTime: z.number().default(0),
  inlineImages: z.array(z.any()).default([]),
});

// Slug generator
const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200);

// Generate unique slug
async function generateUniqueSlug(title: string, excludeId?: number): Promise<string> {
  let slug = slugify(title);
  let counter = 1;
  let uniqueSlug = slug;

  while (true) {
    const existing = await prisma.post.findFirst({
      where: { 
        slug: uniqueSlug,
        deletedAt: null,
        ...(excludeId ? { id: { not: excludeId } } : {})
      }
    });
    
    if (!existing) break;
    
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

/* GET /api/blog */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');
    const county = searchParams.get('county');
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const search = searchParams.get('search');

    // Get single post by ID
    if (id) {
      const post = await prisma.post.findUnique({
        where: { 
          id: Number(id),
          deletedAt: null,
        },
      });
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    // Get single post by slug
    if (slug) {
      const post = await prisma.post.findUnique({
        where: { 
          slug,
          deletedAt: null,
        },
      });
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    // Build where clause
    const where: any = {
      deletedAt: null,
    };

    if (category && category !== 'All') {
      where.category = category;
    }

    if (county) {
      where.county = county;
    }

    if (tag) {
      where.tags = { has: tag };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get total count for pagination
    const total = await prisma.post.count({ where });

    // Get posts
    const posts = await prisma.post.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' }
      ],
      take: limit,
      skip: limit ? (page - 1) * limit : undefined,
    });

    return NextResponse.json({
      posts,
      pagination: limit ? {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      } : null
    });
  } catch (error) {
    console.error('GET /api/blog error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

/* POST /api/blog */
export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const body = await req.json();
    
    // Validate request body
    const validated = postSchema.parse(body);
    
    // Generate unique slug
    const slug = await generateUniqueSlug(validated.title!);

    // Create post
    const post = await prisma.post.create({
      data: { 
        title: validated.title!,
        slug,
        subtitle: validated.subtitle,
        content: validated.content!,
        excerpt: validated.excerpt!,
        category: validated.category!,
        cover: validated.cover,
        coverCaption: validated.coverCaption,
        coverPhotographer: validated.coverPhotographer,
        author: validated.author,
        authorTitle: validated.authorTitle,
        published: validated.published,
        publishedAt: validated.published ? new Date() : null,
        featured: validated.featured,
        isPressRelease: validated.isPressRelease,
        tags: validated.tags,
        location: validated.location,
        county: validated.county,
        metaTitle: validated.metaTitle,
        metaDesc: validated.metaDesc,
        ogImage: validated.ogImage,
        wordCount: validated.wordCount,
        readingTime: validated.readingTime,
        inlineImages: validated.inlineImages as any,
      },
    });
    
    // Revalidate paths
    revalidatePath('/news-hub');
    revalidatePath('/news-hub/[slug]');
    revalidatePath('/');
    
    console.log(`[${new Date().toISOString()}] Created post: ${post.title} by ${auth.user?.email}`);
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('POST /api/blog error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
      }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

/* PUT /api/blog */
export async function PUT(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const id = Number(req.nextUrl.searchParams.get('id'));
    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Valid Post ID required' }, { status: 400 });
    }

    const body = await req.json();
    const validated = postSchema.parse(body);

    // Get existing post to check slug
    const existingPost = await prisma.post.findUnique({
      where: { id }
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Generate new slug if title changed
    let slug = existingPost.slug;
    if (validated.title !== existingPost.title) {
      slug = await generateUniqueSlug(validated.title!, id);
    }

    // Update post
    const post = await prisma.post.update({
      where: { id },
      data: { 
        title: validated.title!,
        slug,
        subtitle: validated.subtitle,
        content: validated.content!,
        excerpt: validated.excerpt!,
        category: validated.category!,
        cover: validated.cover,
        coverCaption: validated.coverCaption,
        coverPhotographer: validated.coverPhotographer,
        author: validated.author,
        authorTitle: validated.authorTitle,
        published: validated.published,
        publishedAt: validated.published && !existingPost.publishedAt 
          ? new Date() 
          : existingPost.publishedAt,
        featured: validated.featured,
        isPressRelease: validated.isPressRelease,
        tags: validated.tags,
        location: validated.location,
        county: validated.county,
        metaTitle: validated.metaTitle,
        metaDesc: validated.metaDesc,
        ogImage: validated.ogImage,
        wordCount: validated.wordCount,
        readingTime: validated.readingTime,
        inlineImages: validated.inlineImages as any,
      },
    });
    
    // Revalidate paths
    revalidatePath('/news-hub');
    revalidatePath('/news-hub/[slug]');
    revalidatePath('/');
    
    console.log(`[${new Date().toISOString()}] Updated post: ${post.title} by ${auth.user?.email}`);
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('PUT /api/blog error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
      }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

/* DELETE /api/blog */
export async function DELETE(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const id = Number(req.nextUrl.searchParams.get('id'));
    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Valid Post ID required' }, { status: 400 });
    }

    // Soft delete
    const post = await prisma.post.update({
      where: { id },
      data: { deletedAt: new Date() }
    });

    // Revalidate paths
    revalidatePath('/news-hub');
    revalidatePath('/news-hub/[slug]');
    revalidatePath('/');
    
    console.log(`[${new Date().toISOString()}] Deleted post: ${post.title} by ${auth.user?.email}`);

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/blog error:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
