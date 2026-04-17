'use client';

import { useEffect, useRef } from 'react';

// ==========================================
// KENYAN COAT OF ARMS CANVAS ANIMATION
// Presidential-grade visual sophistication
// ==========================================

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Shield path - Traditional Maasai shield shape
    const drawShield = (x: number, y: number, scale: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      ctx.globalAlpha = alpha;

      // Shield gradient - Deep blue with gold accents
      const gradient = ctx.createLinearGradient(-100, -120, 100, 120);
      gradient.addColorStop(0, 'rgba(30, 58, 138, 0.12)');
      gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.08)');
      gradient.addColorStop(1, 'rgba(30, 58, 138, 0.06)');

      // Main shield shape
      ctx.beginPath();
      ctx.moveTo(0, -120);
      ctx.bezierCurveTo(80, -100, 100, -40, 100, 20);
      ctx.bezierCurveTo(100, 80, 60, 120, 0, 140);
      ctx.bezierCurveTo(-60, 120, -100, 80, -100, 20);
      ctx.bezierCurveTo(-100, -40, -80, -100, 0, -120);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Shield border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Shield patterns - traditional stripes
      for (let i = -60; i <= 60; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, -80);
        ctx.lineTo(i, 100);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Central vertical pattern - Gold accent
      ctx.beginPath();
      ctx.moveTo(0, -100);
      ctx.lineTo(0, 120);
      ctx.strokeStyle = 'rgba(30, 58, 138, 0.25)';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.restore();
    };

    // Spear drawing
    const drawSpear = (x: number, y: number, scale: number, angle: number, alpha: number, isRight: boolean) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);
      ctx.globalAlpha = alpha;

      // Spear shaft
      ctx.beginPath();
      ctx.moveTo(0, -200);
      ctx.lineTo(0, 200);
      ctx.strokeStyle = 'rgba(139, 90, 43, 0.3)';
      ctx.lineWidth = 6;
      ctx.stroke();

      // Spear head
      ctx.beginPath();
      ctx.moveTo(0, -200);
      ctx.lineTo(-15, -160);
      ctx.lineTo(0, -140);
      ctx.lineTo(15, -160);
      ctx.closePath();
      const headGradient = ctx.createLinearGradient(0, -200, 0, -140);
      headGradient.addColorStop(0, 'rgba(192, 192, 192, 0.4)');
      headGradient.addColorStop(1, 'rgba(128, 128, 128, 0.3)');
      ctx.fillStyle = headGradient;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Spear decorations - Gold accent
      ctx.beginPath();
      ctx.moveTo(-8, -100);
      ctx.lineTo(8, -100);
      ctx.moveTo(-6, -80);
      ctx.lineTo(6, -80);
      ctx.strokeStyle = 'rgba(30, 58, 138, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    // Flowing lines - representing progress and movement
    const drawFlowingLines = (time: number) => {
      const lineCount = 5;
      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();
        const baseY = canvas.height * 0.3 + (i * 80);
        
        for (let x = 0; x <= canvas.width; x += 10) {
          const wave1 = Math.sin((x * 0.003) + (time * 0.5) + (i * 0.5)) * 30;
          const wave2 = Math.sin((x * 0.007) + (time * 0.3) + (i * 0.3)) * 15;
          const y = baseY + wave1 + wave2;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        const gradient = ctx.createLinearGradient(0, baseY - 50, canvas.width, baseY + 50);
        gradient.addColorStop(0, 'rgba(30, 58, 138, 0)');
        gradient.addColorStop(0.3, `rgba(30, 58, 138, ${0.04 + i * 0.01})`);
        gradient.addColorStop(0.7, `rgba(30, 58, 138, ${0.03 + i * 0.01})`);
        gradient.addColorStop(1, 'rgba(30, 58, 138, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    // Particle system - elegant dust/pollen effect
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const drawParticles = () => {
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.01;

      // Draw flowing lines background
      drawFlowingLines(time);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw crossed spears (behind shield)
      const spearScale = Math.min(canvas.width / 1200, 1);
      const spearOffset = 150 * spearScale;
      
      // Left spear (angled right)
      drawSpear(
        centerX - spearOffset, 
        centerY, 
        spearScale, 
        Math.sin(time * 0.5) * 0.05 - 0.3, 
        0.4,
        false
      );
      
      // Right spear (angled left)
      drawSpear(
        centerX + spearOffset, 
        centerY, 
        spearScale, 
        Math.sin(time * 0.5 + Math.PI) * 0.05 + 0.3, 
        0.4,
        true
      );

      // Draw main shield with subtle breathing animation
      const shieldScale = (Math.min(canvas.width / 1000, 1.2) * 1.5) + Math.sin(time) * 0.02;
      drawShield(
        centerX, 
        centerY, 
        shieldScale, 
        Math.sin(time * 0.3) * 0.02, 
        0.6
      );

      // Draw particles
      drawParticles();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}
