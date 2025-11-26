"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface WorldWinnerAnimationProps {
  className?: string;
}

export const WorldWinnerAnimation = ({ className }: WorldWinnerAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const text = "Contact Us";
  const letters = text.split("");

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".animated-char",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.8,
        }
      );

      // Optional glow/pulse effect after entrance
      tl.to(
        ".animated-char",
        {
          textShadow: "0 0 10px rgba(255,255,255,0.5)",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.1,
            from: "center",
          },
        },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col items-center justify-center py-10",
        className
      )}
    >
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-violet-400/20 via-purple-300/20 to-blue-300/20 blur-xl opacity-50 rounded-full" />
        <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center">
          {letters.map((char, index) => (
            <span
              key={index}
              className={cn(
                "animated-char inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-blue-300",
                char === " " && "mr-4" // Add margin for spaces since we handle them explicitly
              )}
              style={{ opacity: 0 }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};
