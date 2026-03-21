import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // CSS Variable-based colors for theming
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        
        // NATIONAL VISION PARTY BRAND COLORS - Premium Political Palette
        kinity: {
          // Primary Deep Blue - Authority, trust, presidential dignity
          blue: {
            DEFAULT: '#1E3A8A',
            50: '#EEF2FF',
            100: '#E0E7FF',
            200: '#C7D2FE',
            300: '#A5B4FC',
            400: '#818CF8',
            500: '#6366F1',
            600: '#1E3A8A', // Primary
            700: '#1E3A8A',
            800: '#0F172A', // Dark base
            900: '#0F172A',
          },
          // Dark Navy - Sophisticated base
          navy: {
            DEFAULT: '#0F172A',
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A', // Dark base
          },
          // Premium Gold - Excellence, prestige, premium feel
          gold: {
            DEFAULT: '#D4A017',
            50: '#FDF9E7',
            100: '#F9F0C8',
            200: '#F3E295',
            300: '#EDD162',
            400: '#E6C200', // Highlight
            500: '#D4A017', // Primary gold
            600: '#B8860B',
            700: '#966F0D',
            800: '#7A5C12',
            900: '#664C14',
          },
          // Power Red - Reserved for critical CTAs only
          red: {
            DEFAULT: '#DC2626',
            50: '#FEF2F2',
            100: '#FEE2E2',
            200: '#FECACA',
            300: '#FCA5A5',
            400: '#F87171',
            500: '#DC2626', // Primary red (limited use)
            600: '#B91C1C',
            700: '#991B1B',
            800: '#7F1D1D',
            900: '#450A0A',
          },
          // Authority colors
          white: '#FFFFFF',
          slate: '#64748B',
          charcoal: '#334155',
          black: '#0F172A',
        },
      },
      fontFamily: {
        // Presidential typography system
        headline: ['Playfair Display', 'Georgia', 'Noto Serif', 'serif'],
        body: ['Inter', 'system-ui', 'Noto Sans', 'sans-serif'],
        slogan: ['Oswald', 'Impact', 'Arial Narrow', 'sans-serif'],
      },
      backgroundImage: {
        // Presidential gradients - deep, authoritative
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-kinity': 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)',
        'gradient-hero': 'linear-gradient(180deg, #0F172A 0%, #1E3A8A 50%, #1E3A8A 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4A017 0%, #E6C200 100%)',
        'gradient-shine': 'linear-gradient(90deg, transparent, rgba(212,160,23,0.3), transparent)',
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(30, 58, 138, 0.4)',
        'glow-gold': '0 0 30px rgba(212, 160, 23, 0.4)',
        'glow-red': '0 0 30px rgba(220, 38, 38, 0.4)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'presidential': '0 10px 40px -10px rgba(30, 58, 138, 0.3)',
        'gold-border': 'inset 0 2px 0 0 #D4A017',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(30, 58, 138, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 160, 23, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.kinity.charcoal'),
            '--tw-prose-headings': theme('colors.kinity.black'),
            '--tw-prose-links': theme('colors.kinity.blue.DEFAULT'),
            '--tw-prose-bold': theme('colors.kinity.black'),
            '--tw-prose-counters': theme('colors.kinity.slate'),
            '--tw-prose-bullets': theme('colors.kinity.blue.DEFAULT'),
            '--tw-prose-hr': theme('colors.kinity.slate'),
            '--tw-prose-quotes': theme('colors.kinity.gold.DEFAULT'),
            '--tw-prose-quote-borders': theme('colors.kinity.gold.DEFAULT'),
            '--tw-prose-captions': theme('colors.kinity.slate'),
            maxWidth: 'none',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
