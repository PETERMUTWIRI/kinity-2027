import type { Metadata } from 'next';
import { Inter, Playfair_Display, Oswald } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '@/components/PageTransition';
import BackToTop from '@/components/BackToTop';

// ==========================================
// KINITY 2027 - PRESIDENTIAL CAMPAIGN
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
  // Core title template
  title: {
    default: "Kikimo Foundation",
    template: "%s | Kikimo Foundation",
  },
  
  // Primary description
  description: "Kikimo Foundation - Empowering communities and transforming lives through service and dedication.",
  
  // Keywords for search engines
  keywords: [
    'Isaac Newton Kinity',
    'Dr Kinity',
    'Kinity 2027',
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
  authors: [{ name: "Dr. Isaac Newton Kinity Campaign" }],
  creator: "Dr. Isaac Newton Kinity",
  publisher: "Kinity 2027 Campaign",
  
  // Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Canonical URL base
  metadataBase: new URL('https://www.kikimofoundation.org'),
  
  // Alternates
  alternates: {
    canonical: '/',
  },
  
  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  
  // Open Graph - Social sharing
  openGraph: {
    title: "Dr. Isaac Newton Kinity | Kenya's Hope 2027",
    description: "Join the movement for a better Kenya. Dr. Isaac Newton Kinity - Committed to the service of Kenyans. The Incoming President 2027.",
    url: 'https://www.kikimofoundation.org',
    siteName: "Dr. Isaac Newton Kinity 2027",
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Isaac Newton Kinity - Kenya\'s Hope 2027',
      },
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: "Dr. Isaac Newton Kinity | Kenya's Hope 2027",
    description: "Join the movement for a better Kenya. Dr. Isaac Newton Kinity - Committed to the service of Kenyans.",
    images: ['/og-image.jpg'],
    creator: '@Kinity2027',
    site: '@Kinity2027',
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
    'og:email': 'info@kikimofoundation.org',
    'og:phone_number': '+254 XXX XXX XXX',
    ' political-party': "Independent",
    'campaign-slogan': "Kenya's Hope",
    'election-year': '2027',
  },
};

// ==========================================
// VIEWPORT CONFIGURATION
// ==========================================

export const viewport = {
  themeColor: '#0074D9',
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
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Dr. Isaac Newton Kinity',
              alternateName: 'Kinity',
              description: "Presidential Candidate Kenya 2027. Committed to the service of Kenyans.",
              url: 'https://www.kikimofoundation.org',
              image: 'https://www.kikimofoundation.org/dr-kinity-profile.jpg',
              jobTitle: 'Presidential Candidate',
              worksFor: {
                '@type': 'Organization',
                name: "Kinity 2027 Campaign",
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'KE',
              },
              sameAs: [
                'https://twitter.com/Kinity2027',
                'https://facebook.com/Kinity2027',
                'https://instagram.com/Kinity2027',
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
              name: "Kinity 2027 Campaign",
              alternateName: "Kenya's Hope",
              url: 'https://www.kikimofoundation.org',
              logo: 'https://www.kikimofoundation.org/logo.png',
              description: "Official campaign organization for Dr. Isaac Newton Kinity's 2027 presidential bid.",
              foundingDate: '2024',
              politicalParty: 'Independent',
              slogan: "Kenya's Hope - Committed to the Service of Kenyans",
              sameAs: [
                'https://twitter.com/Kinity2027',
                'https://facebook.com/Kinity2027',
              ],
            }),
          }}
        />
      </head>
      
      <body 
        className={`${inter.className} antialiased bg-slate-50 text-slate-900 overscroll-none`}
      >
        {/* Mesh gradient background overlay */}
        <div className="fixed inset-0 bg-gradient-mesh pointer-events-none z-0" />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main content with transition - accounts for fixed navbar */}
        <main className="relative z-10 pt-21 lg:pt-25">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Back to top button */}
        <BackToTop />
      </body>
    </html>
  );
}
