import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ==========================================
// AUTH MIDDLEWARE - Server-side protection
// Blocks admin access for unauthenticated users
// ==========================================

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow auth pages to work (sign-in, sign-up, etc.)
  if (pathname.startsWith('/auth')) {
    return NextResponse.next();
  }
  
  // Allow API routes
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  
  // Check if accessing admin routes
  if (pathname.startsWith('/admin')) {
    
    // List of possible auth cookie names
    const cookieNames = [
      'neon-session',
      'better-auth.session',
      'better-auth',
      'session',
      'auth-token',
    ];
    
    let hasSession = false;
    
    // Check for known auth cookies
    for (const name of cookieNames) {
      const cookie = request.cookies.get(name);
      if (cookie?.value) {
        hasSession = true;
        console.log(`[Middleware] Found session cookie: ${name}`);
        break;
      }
    }
    
    // Also check any cookie containing 'session' or 'auth'
    if (!hasSession) {
      const allCookies = request.cookies.getAll();
      for (const cookie of allCookies) {
        if (cookie.name.toLowerCase().includes('session') || 
            cookie.name.toLowerCase().includes('auth') ||
            cookie.name.toLowerCase().includes('token')) {
          hasSession = true;
          console.log(`[Middleware] Found auth cookie: ${cookie.name}`);
          break;
        }
      }
    }
    
    if (!hasSession) {
      console.log('[Middleware] No session found, redirecting to sign-in');
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
    
    console.log('[Middleware] Session verified, allowing access');
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};
