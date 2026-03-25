'use client';

import { 
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaTelegram,
  FaLink,
  FaShareAlt,
} from 'react-icons/fa';
import { useState } from 'react';

interface ShareButtonsProps {
  event: {
    title: string;
    county: string | null;
    location: string;
    startDate: Date | string;
  };
  url: string;
}

export default function ShareButtons({ event, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const shareText = `Join me at "${event.title}" with Dr. Isaac Newton Kinity! ${event.county || event.location} • ${new Date(event.startDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'bg-sky-500 hover:bg-sky-600',
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Telegram',
      icon: FaTelegram,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      color: 'bg-sky-600 hover:bg-sky-700',
    },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <h3 className="font-headline text-lg text-white mb-4 flex items-center gap-2">
        <FaShareAlt className="text-[#D4A017]" />
        Share This Event
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} p-3 rounded-xl flex items-center justify-center transition-all hover:scale-105`}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-5 h-5 text-white" />
          </a>
        ))}
      </div>
      <button
        onClick={handleCopy}
        className="w-full mt-3 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all flex items-center justify-center gap-2"
      >
        <FaLink className="w-4 h-4" />
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}
