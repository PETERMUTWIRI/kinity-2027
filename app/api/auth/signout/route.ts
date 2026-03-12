import { NextResponse } from 'next/server';

// ==========================================
// AUTH SIGNOUT ROUTE
// Clears the session cookie
// ==========================================

export async function POST() {
  try {
    // Create response that clears the auth cookie
    const response = NextResponse.json({ success: true });
    
    // Clear the session cookie
    response.cookies.set('neon-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Sign out error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
