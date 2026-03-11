'use client';

import Script from 'next/script';

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${item.path}`,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function MusicGroupSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: 'Ray Armillion',
    description: 'Kenyan-American gospel artist and performer',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    genre: ['Gospel', 'Christian', 'World Music'],
    sameAs: [
      'https://www.youtube.com/channel/UCBoBfckNNdCS7joUqClADbA',
    ],
  };

  return (
    <Script
      id="music-group-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ray Armillion',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function VideoSchema({ 
  name, 
  description, 
  thumbnailUrl, 
  uploadDate,
  videoId 
}: { 
  name: string; 
  description: string; 
  thumbnailUrl: string; 
  uploadDate: string;
  videoId: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
  };

  return (
    <Script
      id={`video-schema-${videoId}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
