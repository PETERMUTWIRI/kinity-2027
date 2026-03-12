'use client';
import { createAuthClient } from '@neondatabase/auth/next';

// ==========================================
// NEON AUTH CLIENT
// Automatically reads NEXT_PUBLIC_NEON_AUTH_URL from environment
// ==========================================

export const authClient = createAuthClient();
