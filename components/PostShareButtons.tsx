'use client';

import { FaWhatsapp, FaTwitter, FaFacebook } from 'react-icons/fa';

interface PostShareButtonsProps {
  title: string;
  slug: string;
}

export default function PostShareButtons({ title, slug }: PostShareButtonsProps) {
  const url = `https://www.nationalvisionparty.com/news-hub/${slug}`;
  
  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(title + ' - Read more: ' + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp className="w-4 h-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="w-8 h-8 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Share on Twitter"
      >
        <FaTwitter className="w-4 h-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Share on Facebook"
      >
        <FaFacebook className="w-4 h-4" />
      </a>
    </div>
  );
}
