import { neonAuth } from '@neondatabase/auth/next/server';
import { NextRequest, NextResponse } from 'next/server';

// ==========================================
// NEON AUTH API ROUTE
// Handles auth session and callbacks
// ==========================================

export async function GET(req: NextRequest) {
  try {
    const { session, user } = await neonAuth();
    
    if (!session || !user) {
      return NextResponse.json({ 
        authenticated: false,
        session: null,
        user: null 
      }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      session,
      user
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ 
      authenticated: false,
      error: 'Authentication failed' 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { session, user } = await neonAuth();
    
    if (!session || !user) {
      return NextResponse.json({ 
        authenticated: false,
        session: null,
        user: null 
      }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      session,
      user
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ 
      authenticated: false,
      error: 'Authentication failed' 
    }, { status: 500 });
  }
}
