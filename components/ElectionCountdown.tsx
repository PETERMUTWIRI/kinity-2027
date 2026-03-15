'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Kenya General Election Date: August 9, 2027
const ELECTION_DATE = new Date('2027-08-09T06:00:00+03:00'); // 6 AM EAT

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const difference = ELECTION_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

interface ElectionCountdownProps {
  variant?: 'navbar' | 'footer' | 'hero';
  showLabel?: boolean;
}

export default function ElectionCountdown({ variant = 'navbar', showLabel = true }: ElectionCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        {showLabel && <span className="text-xs font-medium opacity-80">To Election:</span>}
        <div className="flex items-center gap-1">
          <span className="font-bold">--</span>
          <span className="text-xs">d</span>
          <span className="font-bold">--</span>
          <span className="text-xs">h</span>
        </div>
      </div>
    );
  }

  if (variant === 'navbar') {
    return (
      <div className="flex items-center gap-2 text-white">
        {showLabel && (
          <span className="text-xs font-medium opacity-80 hidden sm:inline">To Election:</span>
        )}
        <div className="flex items-center gap-1">
          <CountdownUnit value={timeLeft.days} label="d" />
          <span className="opacity-60">:</span>
          <CountdownUnit value={timeLeft.hours} label="h" />
          <span className="opacity-60 hidden sm:inline">:</span>
          <CountdownUnit value={timeLeft.minutes} label="m" className="hidden sm:flex" />
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="flex flex-col items-center md:items-start">
        {showLabel && (
          <span className="text-xs font-medium text-white/70 uppercase tracking-wider mb-2">
            Time to Election Day
          </span>
        )}
        <div className="flex items-center gap-2">
          <CountdownCard value={timeLeft.days} label="Days" />
          <span className="text-2xl font-bold text-white/40">:</span>
          <CountdownCard value={timeLeft.hours} label="Hours" />
          <span className="text-2xl font-bold text-white/40">:</span>
          <CountdownCard value={timeLeft.minutes} label="Minutes" />
          <span className="text-2xl font-bold text-white/40 hidden sm:inline">:</span>
          <CountdownCard value={timeLeft.seconds} label="Seconds" className="hidden sm:flex" />
        </div>
        <p className="text-xs text-white/60 mt-2">
          August 9, 2027 • Kenya General Election
        </p>
      </div>
    );
  }

  // Hero variant (for future use)
  return (
    <div className="flex flex-col items-center">
      {showLabel && (
        <span className="text-sm font-medium text-white/80 uppercase tracking-widest mb-4">
          Countdown to Election Day
        </span>
      )}
      <div className="flex items-center gap-3 sm:gap-4">
        <CountdownCardLarge value={timeLeft.days} label="Days" />
        <span className="text-4xl font-bold text-white/30">:</span>
        <CountdownCardLarge value={timeLeft.hours} label="Hours" />
        <span className="text-4xl font-bold text-white/30">:</span>
        <CountdownCardLarge value={timeLeft.minutes} label="Minutes" />
        <span className="text-4xl font-bold text-white/30 hidden sm:inline">:</span>
        <CountdownCardLarge value={timeLeft.seconds} label="Seconds" className="hidden sm:flex" />
      </div>
    </div>
  );
}

// Small unit for navbar
function CountdownUnit({ value, label, className = '' }: { value: number; label: string; className?: string }) {
  return (
    <motion.div 
      key={value}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-baseline gap-0.5 ${className}`}
    >
      <span className="font-bold tabular-nums">{value.toString().padStart(2, '0')}</span>
      <span className="text-xs opacity-70">{label}</span>
    </motion.div>
  );
}

// Card for footer
function CountdownCard({ value, label, className = '' }: { value: number; label: string; className?: string }) {
  return (
    <motion.div 
      key={`${label}-${value}`}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className={`flex flex-col items-center ${className}`}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[50px] text-center border border-white/10">
        <span className="text-xl sm:text-2xl font-bold tabular-nums">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-white/60 mt-1">{label}</span>
    </motion.div>
  );
}

// Large card for hero
function CountdownCardLarge({ value, label, className = '' }: { value: number; label: string; className?: string }) {
  return (
    <motion.div 
      key={`${label}-${value}`}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className={`flex flex-col items-center ${className}`}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4 min-w-[70px] sm:min-w-[90px] text-center border border-white/20">
        <span className="text-3xl sm:text-5xl font-bold tabular-nums">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-xs sm:text-sm uppercase tracking-wider text-white/60 mt-2">{label}</span>
    </motion.div>
  );
}
