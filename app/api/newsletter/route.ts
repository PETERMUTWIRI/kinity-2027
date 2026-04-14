// app/api/newsletter/route.ts - Newsletter subscriptions
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().optional(),
  county: z.string().optional(),
  phone: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = subscribeSchema.parse(body);

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      if (existing.subscribed) {
        return NextResponse.json(
          { success: true, message: 'You are already subscribed to our newsletter!' },
          { status: 200 }
        );
      }
      await prisma.newsletterSubscriber.update({
        where: { email: data.email },
        data: { subscribed: true, updatedAt: new Date() },
      });
      return NextResponse.json(
        { success: true, message: 'Welcome back! You have been resubscribed.' },
        { status: 200 }
      );
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email: data.email,
        name: data.name || null,
        county: data.county || null,
        phone: data.phone || null,
        subscribed: true,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Thank you for subscribing! You will receive campaign updates from Dr. Kinity.' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors[0]?.message || 'Invalid input' },
        { status: 400 }
      );
    }
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
