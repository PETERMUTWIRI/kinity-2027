// app/api/gallery/images/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth/middleware';

// GET /api/gallery/images - List all images with optional filtering
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const albumId = searchParams.get('albumId');
    const photographer = searchParams.get('photographer');
    const location = searchParams.get('location');
    const county = searchParams.get('county');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;

    const where: any = {
      deletedAt: null,
      published: true,
    };

    if (albumId) where.albumId = parseInt(albumId);
    if (photographer) where.photographer = photographer;
    if (location) where.location = location;
    if (county) where.county = county;
    if (featured === 'true') where.featured = true;

    // Get total count for pagination
    const total = await prisma.galleryImage.count({ where });

    const images = await prisma.galleryImage.findMany({
      where,
      include: {
        album: {
          select: { id: true, title: true }
        }
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit,
      skip: page && limit ? (page - 1) * limit : undefined,
    });

    return NextResponse.json({ images, total });
  } catch (error) {
    console.error('GET /api/gallery/images error:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

// POST /api/gallery/images - Create new image
export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const body = await req.json();
    
    const image = await prisma.galleryImage.create({
      data: {
        url: body.url,
        title: body.title,
        albumId: body.albumId,
        photographer: body.photographer,
        location: body.location,
        county: body.county,
        eventDate: body.eventDate ? new Date(body.eventDate) : null,
        tags: body.tags || [],
        featured: body.featured ?? false,
        published: body.published ?? true,
      },
      include: {
        album: {
          select: { id: true, title: true }
        }
      }
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('POST /api/gallery/images error:', error);
    return NextResponse.json({ error: 'Failed to create image' }, { status: 500 });
  }
}

// PUT /api/gallery/images?id=X - Update image
export async function PUT(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const id = parseInt(req.nextUrl.searchParams.get('id')!);
    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Valid ID required' }, { status: 400 });
    }

    const body = await req.json();

    const image = await prisma.galleryImage.update({
      where: { id },
      data: {
        title: body.title,
        albumId: body.albumId,
        photographer: body.photographer,
        location: body.location,
        county: body.county,
        eventDate: body.eventDate ? new Date(body.eventDate) : null,
        tags: body.tags,
        featured: body.featured,
        published: body.published,
      },
      include: {
        album: {
          select: { id: true, title: true }
        }
      }
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('PUT /api/gallery/images error:', error);
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
  }
}

// DELETE /api/gallery/images?id=X - Soft delete image
export async function DELETE(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const id = parseInt(req.nextUrl.searchParams.get('id')!);
    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Valid ID required' }, { status: 400 });
    }

    await prisma.galleryImage.update({
      where: { id },
      data: { deletedAt: new Date() }
    });

    return NextResponse.json({ message: 'Image deleted' });
  } catch (error) {
    console.error('DELETE /api/gallery/images error:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
