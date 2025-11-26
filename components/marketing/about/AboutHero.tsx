"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      delay: 0.2,
      skewY: 5,
    })
    .from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
    }, "-=0.8")
    .from(imageRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    }, "-=1");

    // Parallax effect for image
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <span className="text-sm font-medium text-blue-400 tracking-wider uppercase">Our Mission</span>
        </div>

        <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-tight">
          Building the Future <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            of Digital Commerce
          </span>
        </h1>

        <p ref={textRef} className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-20 leading-relaxed">
          We believe in a world where anyone can build a global business. 
          NeXar is the engine powering the next generation of entrepreneurs.
        </p>
      </div>

      {/* Hero Image / Visualization */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] overflow-hidden">
        <div ref={imageRef} className="w-full h-full bg-[url('/grid-pattern.svg')] bg-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
    </section>
  );
}
