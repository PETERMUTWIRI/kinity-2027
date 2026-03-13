// app/api/gallery/albums/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth/middleware';

// GET /api/gallery/albums - List all albums
export async function GET(req: NextRequest) {
  try {
    const albums = await prisma.galleryCategory.findMany({
      where: {
        deletedAt: null,
        published: true,
      },
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { images: true }
        }
      }
    });

    return NextResponse.json(albums);
  } catch (error) {
    console.error('GET /api/gallery/albums error:', error);
    return NextResponse.json({ error: 'Failed to fetch albums' }, { status: 500 });
  }
}

// POST /api/gallery/albums - Create new album
export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const body = await req.json();
    
    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const album = await prisma.galleryCategory.create({
      data: {
        title: body.title,
        slug: `${slug}-${Date.now()}`, // Ensure unique slug
        description: body.description,
        category: body.category || 'Rallies',
        coverImage: body.coverImage,
        published: body.published ?? true,
        order: body.order ?? 0,
      }
    });

    return NextResponse.json(album, { status: 201 });
  } catch (error) {
    console.error('POST /api/gallery/albums error:', error);
    return NextResponse.json({ error: 'Failed to create album' }, { status: 500 });
  }
}

// PUT /api/gallery/albums?id=X - Update album
export async function PUT(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const id = parseInt(req.nextUrl.searchParams.get('id')!);
    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Valid ID required' }, { status: 400 });
    }

    const body = await req.json();

    const album = await prisma.galleryCategory.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        coverImage: body.coverImage,
        published: body.published,
        order: body.order,
      }
    });

    return NextResponse.json(album);
  } catch (error) {
    console.error('PUT /api/gallery/albums error:', error);
    return NextResponse.json({ error: 'Failed to update album' }, { status: 500 });
  }
}

// DELETE /api/gallery/albums?id=X - Soft delete album
export async function DELETE(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const id = parseInt(req.nextUrl.searchParams.get('id')!);
    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Valid ID required' }, { status: 400 });
    }

    await prisma.galleryCategory.update({
      where: { id },
      data: { deletedAt: new Date() }
    });

    return NextResponse.json({ message: 'Album deleted' });
  } catch (error) {
    console.error('DELETE /api/gallery/albums error:', error);
    return NextResponse.json({ error: 'Failed to delete album' }, { status: 500 });
  }
}
