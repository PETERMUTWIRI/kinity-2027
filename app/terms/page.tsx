import Link from 'next/link';
import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';


export const metadata: Metadata = {
  title: 'Terms of Service | National Vision Party',
  description: 'Read the Terms of Service for using the National Vision Party website. Guidelines for donations, event registrations, and volunteer participation.',
  keywords: ['terms of service', 'terms and conditions', 'user agreement', 'legal', 'political campaign'],
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Terms of Service', path: '/terms' },
      ]} />

      <div className="min-h-screen bg-brand-background">
        {/* HERO */}
        <section className="bg-brand-background pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-brand-text mb-4">
              Terms of Service
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
                Welcome to National Vision Party. By accessing or using our website, 
                you agree to be bound by these Terms of Service. Please read them carefully 
                before using our services.
              </p>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">1. Introduction</h2>
              <p className="mb-4">
                These Terms of Service govern your use of the National Vision Party website and all 
                related services, including volunteer signups, event registrations, 
                donation processing, and community engagement features. By accessing or using our website, 
                you agree to comply with these terms.
              </p>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">2. Use of Website</h2>
              <p className="mb-4">
                National Vision Party provides a platform for supporters to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Learn about campaign policies, events, and news updates</li>
                <li>Sign up as volunteers for campaign activities and events</li>
                <li>Register to attend rallies, town halls, and campaign events</li>
                <li>Make donations to support the campaign</li>
                <li>Subscribe to newsletters for campaign updates</li>
                <li>Engage with community features including comments and supporter submissions</li>
              </ul>
              <p className="mb-4">
                You agree to use our website only for lawful purposes and in a way that does not 
                infringe the rights of others or restrict their use and enjoyment of the site.
              </p>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">3. Event Registrations</h2>
              <p className="mb-4">
                When registering for events through National Vision Party:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Event registrations are processed securely through our systems</li>
                <li>Admission is free for most campaign events unless otherwise noted</li>
                <li>In the event of cancellation or rescheduling, registered attendees will be notified via email</li>
                <li>Seating or entry may be subject to venue capacity limits</li>
                <li>We reserve the right to deny entry for safety or security reasons</li>
                <li>Registration information may be used for campaign communications</li>
              </ul>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">4. Intellectual Property</h2>
              <p className="mb-4">
                All content on this website, including but not limited to text, images, videos, 
                logos, campaign materials, and design elements, is the exclusive property of National Vision Party or its 
                licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mb-4">
                You may:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>View and share campaign content for personal, non-commercial use</li>
                <li>Share links to our content on social media</li>
                <li>Download campaign materials for personal use or authorized distribution</li>
              </ul>
              <p className="mb-4">
                You may not:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Reproduce, distribute, or publicly display campaign materials for commercial purposes without authorization</li>
                <li>Use campaign content to imply endorsement of unauthorized products or services</li>
                <li>Remove or alter any copyright notices or watermarks</li>
                <li>Create derivative works from campaign materials without permission</li>
                <li>Use campaign content in a manner that misrepresents the campaign&apos;s positions</li>
              </ul>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">5. User Content</h2>
              <p className="mb-4">
                By submitting content to our website (including comments, volunteer applications, and messages):
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>You grant National Vision Party a non-exclusive, royalty-free license to use, display, 
                    and share your content</li>
                <li>You confirm that your content does not infringe on any third-party rights</li>
                <li>We reserve the right to remove any content that violates these terms or is 
                    deemed inappropriate</li>
                <li>Harassment, hate speech, and spam will not be tolerated</li>
              </ul>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">6. Donations</h2>
              <p className="mb-4">
                All donations are processed securely through our payment providers. Donations are 
                subject to applicable campaign finance laws and regulations. We reserve the right 
                to return donations that exceed legal limits or violate campaign finance rules. 
                Donors must be U.S. citizens or permanent residents and must be at least 18 years old. 
                Donations are not tax-deductible as charitable contributions for federal income tax purposes.
              </p>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">7. Disclaimer of Warranties</h2>
              <p className="mb-4">
                This website and its content are provided &quot;as is&quot; without any warranties, 
                express or implied. While we strive for uninterrupted service, we do not guarantee 
                that the website will always be available, secure, or error-free.
              </p>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">8. Limitation of Liability</h2>
              <p className="mb-4">
                To the fullest extent permitted by law, National Vision Party shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages arising out of 
                or relating to your use of the website, even if we have been advised of the 
                possibility of such damages.
              </p>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">9. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms of Service at any time. Changes will 
                be effective immediately upon posting to the website. Your continued use of the 
                website after any changes indicates your acceptance of the updated terms.
              </p>

              <h2 className="text-2xl font-bold text-brand-text mt-12 mb-4">10. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-white rounded-xl p-6 mt-4 shadow-sm">
                <p className="mb-1"><strong>National Vision Party</strong></p>
                <p className="mb-1">Email: <a href="mailto:info@nationalvisionparty.com" className="text-brand-dark hover:underline">info@nationalvisionparty.com</a></p>
                <p className="mb-1">General Inquiries: <a href="mailto:info@nationalvisionparty.com" className="text-brand-dark hover:underline">info@nationalvisionparty.com</a></p>
              </div>

              <p className="mt-8 text-sm text-brand-text/50">
                By using this website, you acknowledge that you have read, understood, and agree 
                to be bound by these Terms of Service.
              </p>

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
