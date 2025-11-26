"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ServiceHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLButtonElement>(null);
  const secondaryBtnRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const headline = "The Future of E-Commerce is Here.";
  const headlineChars = headline.split("");

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Staggered floating shapes animation
      tl.fromTo(
        ".floating-shape",
        { opacity: 0, scale: 0, rotate: -180 },
        {
          opacity: 0.6,
          scale: 1,
          rotate: 0,
          duration: 2,
          stagger: 0.3,
          ease: "back.out(1.7)",
        }
      );

      // Character-by-character reveal (SplitText style)
      tl.fromTo(
        ".hero-char",
        { y: 120, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power4.out",
        },
        "-=1.5"
      );

      // Subtitle reveal
      tl.fromTo(
        ".hero-subtitle",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Button reveal with bounce
      tl.fromTo(
        ".hero-btn",
        { y: 30, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.4)",
        },
        "-=0.6"
      );

      // Continuous floating animation for shapes
      gsap.to(".floating-shape", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "random",
        },
      });
    },
    { scope: containerRef }
  );

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, btnRef: React.RefObject<HTMLButtonElement | null>) => {
    if (!btnRef.current) return;
    
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (btnRef: React.RefObject<HTMLButtonElement | null>) => {
    if (!btnRef.current) return;
    
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="floating-shape absolute top-20 left-[10%] w-72 h-72 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
        <div className="floating-shape absolute top-40 right-[15%] w-96 h-96 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl" />
        <div className="floating-shape absolute bottom-20 left-[20%] w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
        <div className="floating-shape absolute bottom-40 right-[10%] w-64 h-64 bg-gradient-to-br from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto py-20">
        {/* Main Headline with Character Animation */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
            {headlineChars.map((char, index) => {
              const isEcommerce = headline.substring(index).startsWith("E-Commerce");
              const isInEcommerce = index >= headline.indexOf("E-Commerce") && index < headline.indexOf("E-Commerce") + "E-Commerce".length;
              
              return (
                <span
                  key={index}
                  className={`hero-char inline-block ${
                    isInEcommerce
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500"
                      : "text-white"
                  }`}
                  style={{ 
                    opacity: 0,
                    perspective: "1000px",
                    display: char === " " ? "inline" : "inline-block",
                    marginRight: char === " " ? "0.25em" : "0"
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </h1>
        </div>

        {/* Subtitle with Glassmorphism */}
        <div className="hero-subtitle relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl rounded-full" />
          <p className="relative text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-slate-900/30 rounded-2xl px-8 py-6 border border-slate-700/50">
            Empower your business with NeXar's award-winning platform. Build,
            scale, and manage your store with unparalleled precision and style.
          </p>
        </div>

        {/* CTAs with Magnetic Effect */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            ref={magneticBtnRef}
            onMouseMove={(e) => handleMouseMove(e, magneticBtnRef)}
            onMouseLeave={() => handleMouseLeave(magneticBtnRef)}
            className="hero-btn group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold text-lg overflow-hidden shadow-xl shadow-blue-500/30 transition-shadow hover:shadow-2xl hover:shadow-blue-500/40"
          >
            <span className="relative z-10">Start Building</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button
            ref={secondaryBtnRef}
            onMouseMove={(e) => handleMouseMove(e, secondaryBtnRef)}
            onMouseLeave={() => handleMouseLeave(secondaryBtnRef)}
            className="hero-btn group relative px-10 py-5 bg-slate-900/50 backdrop-blur-sm border-2 border-slate-600 hover:border-slate-400 text-white rounded-full font-semibold text-lg transition-all hover:bg-slate-800/50"
          >
            <span className="relative z-10">View Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-slate-400 text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-slate-400 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
