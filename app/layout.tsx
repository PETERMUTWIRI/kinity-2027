import type { Metadata } from 'next';
import { Inter, Playfair_Display, Oswald } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '../components/ConditionalLayout';
import PageTransition from '@/components/PageTransition';
import BackToTop from '@/components/BackToTop';
import ScrollToTop from '@/components/ScrollToTop';

// ==========================================
// JENGAKENYA - PRESIDENTIAL CAMPAIGN
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
    default: "JENGAKENYA",
    template: "%s | JENGAKENYA",
  },
  
  // Application name for installed PWA
  applicationName: "JENGAKENYA",
  
  // Primary description
  description: "JENGAKENYA - Kenya's Hope 2027. Empowering communities and transforming lives through service and dedication.",
  
  // Keywords for search engines
  keywords: [
    'Isaac Newton Kinity',
    'Dr Kinity',
    'JENGAKENYA',
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
  authors: [{ name: "JENGAKENYA" }],
  creator: "JENGAKENYA",
  publisher: "JENGAKENYA",
  
  // Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Canonical URL base
  metadataBase: new URL('https://www.jengakenya.com'),
  
  // Alternates
  alternates: {
    canonical: '/',
  },
  
  // Icons - Using JENGAKENYA Logo (Jengakenya-logo.jpg)
  icons: {
    icon: [
      { url: '/Jengakenya-logo.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/Jengakenya-logo.jpg', sizes: '16x16', type: 'image/jpeg' },
    ],
    shortcut: '/Jengakenya-logo.jpg',
    apple: [
      { url: '/Jengakenya-logo.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
    other: [
      { rel: 'apple-touch-icon-precomposed', url: '/Jengakenya-logo.jpg' },
    ],
  },
  
  // Open Graph - Social sharing
  openGraph: {
    title: "JENGAKENYA | Kenya's Hope 2027",
    description: "Join the movement for a better Kenya. JENGAKENYA - Committed to the service of Kenyans. Kenya's Hope 2027.",
    url: 'https://www.jengakenya.com',
    siteName: "JENGAKENYA 2027",
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: '/Jengakenya-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Isaac Newton Kinity - Kenya\'s Hope 2027',
      },
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: "JENGAKENYA | Kenya's Hope 2027",
    description: "Join the movement for a better Kenya. JENGAKENYA - Committed to the service of Kenyans.",
    images: ['/Jengakenya-logo.jpg'],
    creator: '@JengaKenya',
    site: '@JengaKenya',
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
    'og:email': 'info@jengakenya.com',
    'og:phone_number': '+254 XXX XXX XXX',
    'political-party': "JENGAKENYA",
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
              name: 'Dr. Isaac Newton Kinity - JENGAKENYA',
              alternateName: 'Kinity',
              description: "Presidential Candidate Kenya 2027. Committed to the service of Kenyans.",
              url: 'https://www.jengakenya.com',
              image: 'https://www.jengakenya.com/dr-kinity-profile.jpg',
              jobTitle: 'Presidential Candidate',
              worksFor: {
                '@type': 'Organization',
                name: "JENGAKENYA",
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'KE',
              },
              sameAs: [
                'https://twitter.com/JengaKenya',
                'https://facebook.com/Jengakenya',
                'https://instagram.com/Jengakenya',
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
              name: "JENGAKENYA",
              alternateName: "Kenya's Hope",
              url: 'https://www.jengakenya.com',
              logo: 'https://www.jengakenya.com/logo.png',
              description: "Official campaign organization for Dr. Isaac Newton Kinity's 2027 presidential bid.",
              foundingDate: '2024',
              politicalParty: 'Independent',
              slogan: "Kenya's Hope - Committed to the Service of Kenyans",
              sameAs: [
                'https://twitter.com/JengaKenya',
                'https://facebook.com/Jengakenya',
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
        
        {/* Scroll to top on route change */}
        <ScrollToTop />
        
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
