import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';


export const metadata: Metadata = {
  title: 'Privacy Policy | Isaac Kinity',
  description: 'Learn how the Isaac Kinity Campaign collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
  keywords: ['privacy policy', 'data protection', 'GDPR', 'personal information', 'cookies', 'political campaign'],
  alternates: {
    canonical: 'https://www.isaackinity.net/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Privacy Policy', path: '/privacy' },
      ]} />

      <div className="min-h-screen bg-brand-background">
        {/* HERO */}
        <section className="bg-brand-background pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-brand-text mb-4">
              Privacy Policy
            </h1>
            <p className="text-brand-text/70">
              Last updated: January 2025
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-16 bg-brand-background">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <div className="prose prose-lg max-w-none text-brand-text/80">
              
              <p className="text-xl text-brand-text/70 mb-8">
                The Isaac Kinity Campaign is committed to protecting your privacy. This Privacy Policy explains 
                how we collect, use, and safeguard your personal information when you visit our 
                website, make donations, sign up to volunteer, register for events, or subscribe to our newsletter.
              </p>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">Personal Information</h3>
              <p className="mb-4">
                We collect personal information that you voluntarily provide when you:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Make a donation (name, email address, billing address, employer/occupation information as required by law)</li>
                <li>Sign up to volunteer (name, email address, phone number, skills/interests)</li>
                <li>Subscribe to our newsletter (email address, name optional)</li>
                <li>Register for campaign events (name, email, contact information)</li>
                <li>Contact us via email or contact forms</li>
                <li>Sign petitions or pledge to vote</li>
              </ul>

              <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">Payment Information</h3>
              <p className="mb-4">
                All payment processing is handled securely by our third-party payment 
                processor. We do not store your credit card information on our servers. Our payment processor 
                processes your payment details in accordance with their own privacy policy and 
                security standards (PCI DSS compliant).
              </p>

              <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">Automatically Collected Information</h3>
              <p className="mb-4">
                We may automatically collect certain information when you visit our website:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on site</li>
                <li>Referring website or search terms</li>
                <li>Campaign content interactions and engagement</li>
              </ul>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Process and confirm donations and contributions</li>
                <li>Send campaign updates, event notifications, and volunteer opportunities</li>
                <li>Deliver our newsletter with news about the campaign and policy updates</li>
                <li>Respond to your inquiries and provide support</li>
                <li>Improve our website and personalize your experience</li>
                <li>Comply with legal obligations, including campaign finance reporting</li>
              </ul>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">3. Data Sharing and Third Parties</h2>
              <p className="mb-4">
                <strong>We do not sell, trade, or rent your personal information to third parties.</strong>
              </p>
              <p className="mb-4">
                We may share your information only with:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Payment Processors:</strong> For secure donation processing (PCI DSS compliant)</li>
                <li><strong>Email Service Providers:</strong> To deliver newsletters and campaign communications</li>
                <li><strong>Analytics Services:</strong> To understand website usage and improve our services</li>
                <li><strong>Legal Authorities:</strong> When required by law, such as for campaign finance reporting, or to protect our rights</li>
              </ul>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">4. Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar technologies to enhance your browsing experience:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant campaign content</li>
              </ul>
              <p className="mb-4">
                You can control cookies through your browser settings. Disabling certain cookies 
                may affect the functionality of the website.
              </p>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">5. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or 
                destruction. All data transmission is encrypted using SSL/TLS technology.
              </p>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">6. Your Rights</h2>
              <p className="mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Request deletion of your personal data (subject to legal requirements)</li>
                <li>Unsubscribe from communications at any time via the unsubscribe link</li>
                <li>Object to certain types of data processing</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact us at <a href="mailto:contact@isaackinity.net" className="text-brand-dark hover:underline">contact@isaackinity.net</a>.
              </p>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">7. Data Retention</h2>
              <p className="mb-4">
                We retain your personal information only for as long as necessary to fulfill the 
                purposes for which it was collected, including legal, accounting, or reporting 
                requirements. Newsletter subscriber data is retained until you unsubscribe. 
                Donation records may be retained longer to comply with campaign finance laws.
              </p>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">8. Children&apos;s Privacy</h2>
              <p className="mb-4">
                Our website is not directed at children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If you believe we have 
                collected information from a child under 13, please contact us immediately.
              </p>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">9. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any 
                significant changes by posting the new policy on this page with an updated date. 
                We encourage you to review this policy periodically.
              </p>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have any questions or concerns about this Privacy Policy or our data 
                practices, please contact us:
              </p>
              <div className="bg-white rounded-xl p-6 mt-4 shadow-sm">
                <p className="mb-1"><strong>Isaac Kinity Campaign</strong></p>
                <p className="mb-1">Email: <a href="mailto:contact@isaackinity.net" className="text-brand-dark hover:underline">contact@isaackinity.net</a></p>
                <p>General Inquiries: <a href="mailto:contact@isaackinity.net" className="text-brand-dark hover:underline">contact@isaackinity.net</a></p>
              </div>

            </div>

            <div className="mt-16 pt-8 border-t border-brand-text/10 text-center">
              <Link href="/" className="inline-flex items-center gap-2 text-brand-dark font-semibold hover:underline">
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
