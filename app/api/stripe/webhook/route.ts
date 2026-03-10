// app/api/stripe/webhook/route.ts - DISABLED FOR NOW

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: 'Stripe webhook is temporarily disabled.' },
    { status: 503 }
  );
}
