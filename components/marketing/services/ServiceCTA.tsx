"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServiceCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLButtonElement | null>(null);

  useGSAP(
    () => {
      // Entrance animation
      gsap.fromTo(
        ".cta-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Gradient animation
      gsap.to(".gradient-orb", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magneticBtnRef.current) return;

    const btn = magneticBtnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!magneticBtnRef.current) return;

    gsap.to(magneticBtnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"
    >
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-[100px] rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="cta-content max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span>Join 10,000+ businesses growing with NeXar</span>
          </div>

          {/* Headline */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
              Launch?
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Start building your dream e-commerce platform today. No credit card required, 
            cancel anytime.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              ref={magneticBtnRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold text-lg overflow-hidden shadow-2xl shadow-blue-500/40 transition-all hover:shadow-blue-500/60"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button className="group px-10 py-5 bg-slate-900/50 backdrop-blur-sm border-2 border-slate-600 hover:border-slate-400 text-white rounded-full font-semibold text-lg transition-all hover:bg-slate-800/50">
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Watch Demo
              </span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
