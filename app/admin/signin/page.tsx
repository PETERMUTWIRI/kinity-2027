import { redirect } from 'next/navigation';

// ==========================================
// ADMIN SIGNIN (no dash) - Redirect to auth
// Neon Auth uses this as default callback
// ==========================================

export default function AdminSigninRedirect() {
  redirect('/auth/sign-in');
}
