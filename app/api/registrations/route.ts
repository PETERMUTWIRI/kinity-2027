// app/api/registrations/route.ts - RSVP for Events (Free rallies)
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth/middleware';

const prisma = new PrismaClient();

/* ---------- validation schemas ---------- */
const rsvpSchema = z.object({
  eventId: z.number().int().positive('Event ID is required'),
  email: z.string().email('Valid email is required'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().optional(),
  county: z.string().optional(),
});

const updateSchema = z.object({
  status: z.enum(['confirmed', 'cancelled', 'verified', 'no-show']).optional(),
  verified: z.boolean().optional(),
});

/* ---------- GET - List RSVPs ---------- */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const eventId = searchParams.get('eventId');
    const status = searchParams.get('status');

    // Get current user session for authorization
    const { session, user } = await import('@neondatabase/auth/next/server').then(m => m.neonAuth());
    const isAdmin = await checkIsAdmin(user);

    // GET /:id - Get single RSVP
    if (id) {
      const rsvp = await prisma.rSVP.findUnique({
        where: { id: Number(id) },
        include: {
          event: {
            select: {
              id: true,
              title: true,
              slug: true,
              startDate: true,
              endDate: true,
              location: true,
              venue: true,
              cover: true,
            },
          },
        },
      });

      if (!rsvp) {
        return NextResponse.json({ error: 'RSVP not found' }, { status: 404 });
      }

      // Check authorization: admin or RSVP owner
      if (!isAdmin && rsvp.email !== user?.email) {
        return unauthorizedResponse();
      }

      return NextResponse.json(rsvp);
    }

    // For admin dashboard: return empty array if not admin
    if (!isAdmin) {
      return NextResponse.json([]);
    }

    const where: any = {};
    
    if (eventId) {
      where.eventId = Number(eventId);
    }
    
    if (status) {
      where.status = status;
    }

    const rsvps = await prisma.rSVP.findMany({
      where,
      include: {
        event: {
          select: {
            id: true,
            title: true,
            slug: true,
            startDate: true,
            location: true,
            venue: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(rsvps);
  } catch (error) {
    console.error('GET /api/registrations error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSVPs' },
      { status: 500 }
    );
  }
}

/* ---------- POST - Create RSVP ---------- */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = rsvpSchema.parse(body);

    // Get event details
    const event = await prisma.event.findUnique({
      where: { id: validated.eventId },
      include: {
        registrations: {
          where: { status: { in: ['confirmed', 'verified'] } },
          select: { id: true },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Check if event is full
    if (event.maxAttendees && event.registrations.length >= event.maxAttendees) {
      return NextResponse.json(
        { error: 'Event is at capacity' },
        { status: 400 }
      );
    }

    // Check RSVP deadline
    if (event.rsvpDeadline && new Date() > new Date(event.rsvpDeadline)) {
      return NextResponse.json(
        { error: 'RSVP deadline has passed' },
        { status: 400 }
      );
    }

    // Check if user already RSVP'd for this event
    const existingRSVP = await prisma.rSVP.findFirst({
      where: {
        eventId: validated.eventId,
        email: validated.email,
        status: { in: ['confirmed', 'verified'] },
      },
    });

    if (existingRSVP) {
      return NextResponse.json(
        { error: 'You have already RSVP\'d for this event' },
        { status: 400 }
      );
    }

    // Create RSVP
    const rsvp = await prisma.rSVP.create({
      data: {
        eventId: validated.eventId,
        email: validated.email,
        name: validated.name,
        phone: validated.phone || null,
        county: validated.county || null,
        status: 'confirmed',
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            slug: true,
            startDate: true,
            location: true,
            venue: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        ...rsvp,
        message: 'RSVP confirmed! See you at the event.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/registrations error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create RSVP' },
      { status: 500 }
    );
  }
}

/* ---------- PUT - Update RSVP (admin only) ---------- */
export async function PUT(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const id = Number(new URL(req.url).searchParams.get('id'));
    if (!id) {
      return NextResponse.json(
        { error: 'RSVP ID required' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const validated = updateSchema.parse(body);

    const rsvp = await prisma.rSVP.update({
      where: { id },
      data: {
        ...(validated.status && { status: validated.status }),
        ...(validated.verified !== undefined && { verified: validated.verified }),
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    console.log(`[${new Date().toISOString()}] Updated RSVP: ${rsvp.id} - status: ${rsvp.status}`);

    return NextResponse.json(rsvp);
  } catch (error) {
    console.error('PUT /api/registrations error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update RSVP' },
      { status: 500 }
    );
  }
}

/* ---------- DELETE - Cancel RSVP ---------- */
export async function DELETE(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const id = Number(new URL(req.url).searchParams.get('id'));
    if (!id) {
      return NextResponse.json(
        { error: 'RSVP ID required' },
        { status: 400 }
      );
    }

    const rsvp = await prisma.rSVP.update({
      where: { id },
      data: {
        status: 'cancelled',
      },
    });

    console.log(`[${new Date().toISOString()}] Cancelled RSVP: ${id}`);

    return NextResponse.json({
      ok: true,
      message: 'RSVP cancelled successfully',
      rsvpId: rsvp.id,
    });
  } catch (error) {
    console.error('DELETE /api/registrations error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel RSVP' },
      { status: 500 }
    );
  }
}

/* ---------- Helper functions ---------- */
async function checkIsAdmin(user: any): Promise<boolean> {
  if (!user) return false;
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });
  return dbUser?.role === 'admin';
}
