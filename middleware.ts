import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ==========================================
// AUTH MIDDLEWARE - Protects admin routes only
// ==========================================

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only protect admin routes (not auth routes)
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
        break;
      }
    }
    
    // Also check any cookie containing session/auth keywords
    if (!hasSession) {
      const allCookies = request.cookies.getAll();
      for (const cookie of allCookies) {
        const name = cookie.name.toLowerCase();
        if (name.includes('session') || name.includes('auth') || name.includes('token')) {
          hasSession = true;
          break;
        }
      }
    }
    
    // No session = redirect to sign in
    if (!hasSession) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
  }
  
  // Allow all other requests (including /auth/*)
  return NextResponse.next();
}

// Only apply to admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
