import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ==========================================
// AUTH MIDDLEWARE - Temporarily simplified
// ==========================================

export function middleware(request: NextRequest) {
  // Allow all requests for now to test auth redirect
  return NextResponse.next();
}

// Apply to admin routes only
export const config = {
  matcher: ['/admin/:path*'],
};
