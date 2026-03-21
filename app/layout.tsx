import type { Metadata } from 'next';
import { Inter, Playfair_Display, Oswald } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '../components/ConditionalLayout';
import PageTransition from '@/components/PageTransition';
import BackToTop from '@/components/BackToTop';

// ==========================================
// NATIONAL VISION PARTY - PRESIDENTIAL CAMPAIGN
// Root Layout with SEO Optimization
// ==========================================

// Primary body font - clean and modern
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Headline font - authority and tradition
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
});

// Slogan font - impact and strength
const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
});

// ==========================================
// SEO METADATA - OPTIMIZED FOR SEARCH
// ==========================================

export const metadata: Metadata = {
  // Core title template - Shows in browser tab with favicon
  title: {
    default: "National Vision Party",
    template: "%s | National Vision Party",
  },
  
  // Application name for installed PWA
  applicationName: "National Vision Party",
  
  // Primary description
  description: "National Vision Party - Kenya's Hope 2027. Empowering communities and transforming lives through service and dedication.",
  
  // Keywords for search engines
  keywords: [
    'Isaac Newton Kinity',
    'Dr Kinity',
    'National Vision Party',
    'Kenya President 2027',
    'Kenya\'s Hope',
    'Kenyan Politics',
    'Anti-corruption Leader',
    'Economic Transformation Kenya',
    'Presidential Candidate Kenya',
    'Kenya Election 2027',
    'Kinity for President',
    'New Leadership Kenya',
    'Committed to Service',
  ],
  
  // Authors and ownership
  authors: [{ name: "National Vision Party" }],
  creator: "National Vision Party",
  publisher: "National Vision Party",
  
  // Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Canonical URL base
  metadataBase: new URL('https://www.nationalvisionparty.com'),
  
  // Alternates
  alternates: {
    canonical: '/',
  },
  
  // Icons - Using National Vision Party Logo (nvp-party-logo.jpeg)
  icons: {
    icon: [
      { url: '/nvp-party-logo.jpeg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/nvp-party-logo.jpeg', sizes: '16x16', type: 'image/jpeg' },
    ],
    shortcut: '/nvp-party-logo.jpeg',
    apple: [
      { url: '/nvp-party-logo.jpeg', sizes: '180x180', type: 'image/jpeg' },
    ],
    other: [
      { rel: 'apple-touch-icon-precomposed', url: '/nvp-party-logo.jpeg' },
    ],
  },
  
  // Open Graph - Social sharing
  openGraph: {
    title: "National Vision Party | Kenya's Hope 2027",
    description: "Join the movement for a better Kenya. National Vision Party - Committed to the service of Kenyans. Kenya's Hope 2027.",
    url: 'https://www.nationalvisionparty.com',
    siteName: "National Vision Party 2027",
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: '/nvp-party-logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Dr. Isaac Newton Kinity - Kenya\'s Hope 2027',
      },
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: "National Vision Party | Kenya's Hope 2027",
    description: "Join the movement for a better Kenya. National Vision Party - Committed to the service of Kenyans.",
    images: ['/nvp-party-logo.jpeg'],
    creator: '@NVP_Kenya',
    site: '@NVP_Kenya',
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  
  // Category
  category: 'politics',
  
  // Additional metadata
  other: {
    'og:country-name': 'Kenya',
    'og:email': 'info@nationalvisionparty.com',
    'og:phone_number': '+254 XXX XXX XXX',
    'political-party': "National Vision Party",
    'campaign-slogan': "Kenya's Hope",
    'election-year': '2027',
  },
};

// ==========================================
// VIEWPORT CONFIGURATION
// ==========================================

export const viewport = {
  themeColor: '#1E3A8A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// ==========================================
// ROOT LAYOUT
// ==========================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfair.variable} ${oswald.variable}`}
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.imgbb.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        
        {/* Preload critical assets */}
        {/* Font preloading removed - using next/font/google instead */}
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Dr. Isaac Newton Kinity - National Vision Party',
              alternateName: 'Kinity',
              description: "Presidential Candidate Kenya 2027. Committed to the service of Kenyans.",
              url: 'https://www.nationalvisionparty.com',
              image: 'https://www.nationalvisionparty.com/dr-kinity-profile.jpg',
              jobTitle: 'Presidential Candidate',
              worksFor: {
                '@type': 'Organization',
                name: "National Vision Party",
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'KE',
              },
              sameAs: [
                'https://twitter.com/NVP_Kenya',
                'https://facebook.com/NationalVisionParty',
                'https://instagram.com/NationalVisionParty',
              ],
            }),
          }}
        />
        
        {/* Campaign Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: "National Vision Party",
              alternateName: "Kenya's Hope",
              url: 'https://www.nationalvisionparty.com',
              logo: 'https://www.nationalvisionparty.com/logo.png',
              description: "Official campaign organization for Dr. Isaac Newton Kinity's 2027 presidential bid.",
              foundingDate: '2024',
              politicalParty: 'Independent',
              slogan: "Kenya's Hope - Committed to the Service of Kenyans",
              sameAs: [
                'https://twitter.com/NVP_Kenya',
                'https://facebook.com/NationalVisionParty',
              ],
            }),
          }}
        />
      </head>
      
      <body 
        className={`${inter.className} antialiased bg-white text-slate-900 overscroll-none`}
      >
        {/* Clean white background */}
        <div className="fixed inset-0 bg-white pointer-events-none z-0" />
        
        {/* Conditional Layout - hides navbar/footer on admin routes */}
        <ConditionalLayout>
          <PageTransition>
            {children}
          </PageTransition>
        </ConditionalLayout>
        
        {/* Back to top button */}
        <BackToTop />
      </body>
    </html>
  );
}
