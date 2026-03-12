'use client';

import { ReactNode } from 'react';

// ==========================================
// PROTECTED ADMIN PAGE WRAPPER
// Note: Actual protection is handled by middleware
// This is a fallback for client-side checks
// ==========================================

interface ProtectedAdminPageProps {
  children: ReactNode;
}

export default function ProtectedAdminPage({ children }: ProtectedAdminPageProps) {
  // Middleware handles the actual protection
  // This component just renders children
  return <>{children}</>;
}
