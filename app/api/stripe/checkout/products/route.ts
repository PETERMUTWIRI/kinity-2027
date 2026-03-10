// app/api/stripe/checkout/products/route.ts - DISABLED FOR NOW
// Stripe integration for donations - will be re-enabled with M-Pesa integration

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: 'Stripe checkout is temporarily disabled. M-Pesa integration coming soon.' },
    { status: 503 }
  );
}

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { error: 'Stripe checkout is temporarily disabled.' },
    { status: 503 }
  );
}
