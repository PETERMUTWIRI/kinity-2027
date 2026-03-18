'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ==========================================
// 3D TILT CARD COMPONENT
// Premium hover effect for cards
// ==========================================

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
  borderColor?: string;
}

export default function TiltCard({
  children,
  className = '',
  tiltAmount = 10,
  glareEnabled = true,
  borderColor = '#0074D9',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [tiltAmount, -tiltAmount]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltAmount, tiltAmount]), {
    stiffness: 300,
    damping: 30,
  });

  const glareX = useTransform(x, [0, 1], ['0%', '100%']);
  const glareY = useTransform(y, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated border gradient */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${borderColor}40, ${borderColor}, ${borderColor}40)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      {/* Card content */}
      <div className="relative bg-white rounded-2xl h-full overflow-hidden" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>

      {/* Glare effect */}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255,255,255,0.3) 0%, transparent 60%)',
            opacity: isHovered ? 0.5 : 0,
            '--glare-x': glareX,
            '--glare-y': glareY,
          } as any}
        />
      )}
    </motion.div>
  );
}
