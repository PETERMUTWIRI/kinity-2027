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
        
        // NATIONAL VISION PARTY BRAND COLORS - Presidential Campaign Palette
        kinity: {
          // Primary Trust Blue - Stability, presidential authority
          blue: {
            DEFAULT: '#0074D9',
            50: '#E6F2FC',
            100: '#CCE5F9',
            200: '#99CBF3',
            300: '#66B1ED',
            400: '#3397E7',
            500: '#0074D9', // Primary
            600: '#005CB0',
            700: '#004588',
            800: '#002E5B',
            900: '#00172D',
          },
          // Power Red - Energy, urgency, anti-corruption passion
          red: {
            DEFAULT: '#E91D0E',
            50: '#FDE8E7',
            100: '#FBD1CE',
            200: '#F7A39D',
            300: '#F3756C',
            400: '#EF473B',
            500: '#E91D0E', // Primary
            600: '#BA170C',
            700: '#8B1109',
            800: '#5D0C06',
            900: '#2E0603',
          },
          // Royal Purple - Wisdom, leadership, distinction
          purple: {
            DEFAULT: '#6B2C91',
            50: '#F0E6F5',
            100: '#E1CCEB',
            200: '#C399D7',
            300: '#A566C3',
            400: '#8733AF',
            500: '#6B2C91', // Primary
            600: '#552374',
            700: '#401A57',
            800: '#2A123A',
            900: '#15091D',
          },
          // Authority colors
          black: '#111111',
          charcoal: '#1F2937',
          slate: '#64748B',
          white: '#FFFFFF',
          'off-white': '#F8FAFC',
        },
      },
      fontFamily: {
        // Presidential typography system
        headline: ['Playfair Display', 'Georgia', 'Noto Serif', 'serif'],
        body: ['Inter', 'system-ui', 'Noto Sans', 'sans-serif'],
        slogan: ['Oswald', 'Impact', 'Arial Narrow', 'sans-serif'],
      },
      backgroundImage: {
        // Presidential gradients
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-kinity': 'linear-gradient(135deg, #0074D9 0%, #FFFFFF 100%)',
        'gradient-hero': 'linear-gradient(180deg, #0074D9 0%, #E6F2FC 50%, #FFFFFF 100%)',
        'gradient-dark': 'linear-gradient(135deg, #111111 0%, #1F2937 100%)',
        'gradient-purple': 'linear-gradient(135deg, #6B2C91 0%, #552374 100%)',
        'gradient-red': 'linear-gradient(135deg, #E91D0E 0%, #BA170C 100%)',
        'gradient-shine': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(0, 116, 217, 0.4)',
        'glow-red': '0 0 30px rgba(233, 29, 14, 0.4)',
        'glow-purple': '0 0 30px rgba(107, 44, 145, 0.4)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'presidential': '0 10px 40px -10px rgba(0, 116, 217, 0.3)',
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
          '0%': { boxShadow: '0 0 20px rgba(0, 116, 217, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(233, 29, 14, 0.6)' },
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
            '--tw-prose-quotes': theme('colors.kinity.purple.DEFAULT'),
            '--tw-prose-quote-borders': theme('colors.kinity.purple.DEFAULT'),
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
