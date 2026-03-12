import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ==========================================
// AUTH MIDDLEWARE - Server-side protection
// Blocks access to admin routes at the edge
// ==========================================

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip auth pages and API routes
  if (
    pathname.startsWith('/auth') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // Check if the path is an admin route
  if (pathname.startsWith('/admin')) {
    
    // Check for any auth session cookie (Neon Auth uses various cookie names)
    const possibleCookies = [
      'neon-session',
      'better-auth.session',
      'session',
      'auth-token',
      'next-auth.session-token',
    ];
    
    let hasSession = false;
    for (const cookieName of possibleCookies) {
      if (request.cookies.get(cookieName)) {
        hasSession = true;
        break;
      }
    }
    
    if (!hasSession) {
      // No session - redirect to login
      console.log('Middleware: No session cookie found, redirecting to login');
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
    
    console.log('Middleware: Session cookie found, allowing access to', pathname);
  }
  
  return NextResponse.next();
}

// Apply middleware to admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
