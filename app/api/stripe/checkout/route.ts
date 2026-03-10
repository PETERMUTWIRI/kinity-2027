// app/api/stripe/checkout/route.ts - DISABLED FOR NOW
// Stripe integration for event tickets - will be re-enabled later

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: 'Stripe checkout is temporarily disabled. RSVP is free for all events.' },
    { status: 503 }
  );
}
