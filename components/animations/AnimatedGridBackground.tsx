"use client";

import { useEffect, useRef } from "react";

interface AnimatedGridBackgroundProps {
  className?: string;
}

export const AnimatedGridBackground = ({ className = "" }: AnimatedGridBackgroundProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      {/* Grid pattern */}
      <div 
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          animation: 'grid-shift 20s linear infinite',
        }}
      />

      {/* Radial gradient overlay for center glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            rgba(139, 92, 246, 0.15) 0%, 
            rgba(59, 130, 246, 0.1) 25%,
            transparent 60%
          )`,
        }}
      />

      {/* Additional glow effect */}
      <div 
        className="absolute inset-0 animate-pulse"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            rgba(167, 139, 250, 0.08) 0%, 
            transparent 50%
          )`,
          animationDuration: '4s',
        }}
      />

      {/* CSS Animation for grid movement */}
      <style jsx>{`
        @keyframes grid-shift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 80px 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedGridBackground;
