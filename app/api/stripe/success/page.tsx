// app/api/stripe/success/page.tsx - DISABLED FOR NOW
// Success page for Stripe checkout - will be re-enabled later

import { redirect } from 'next/navigation';

export default function StripeSuccessPage() {
  // Redirect to homepage
  redirect('/');
}
