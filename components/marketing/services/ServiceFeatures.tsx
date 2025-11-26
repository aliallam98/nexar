"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServiceFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const feature1Ref = useRef<HTMLDivElement>(null);
  const feature2Ref = useRef<HTMLDivElement>(null);
  const feature3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Create timeline for each feature card
      const features = [
        { ref: feature1Ref, class: ".store-builder-visual" },
        { ref: feature2Ref, class: ".global-scale-visual" },
        { ref: feature3Ref, class: ".analytics-visual" },
      ];

      features.forEach((feature, index) => {
        // Pin and scrub effect for each feature
        ScrollTrigger.create({
          trigger: feature.ref.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onEnter: () => {
            gsap.to(feature.ref.current, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            });
          },
        });

        // Animate visual elements based on scroll progress
        gsap.fromTo(
          feature.class,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: feature.ref.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      });

      // Store Builder - Drag and Drop Animation
      gsap.to(".drag-element", {
        x: "random(-20, 20)",
        y: "random(-15, 15)",
        rotation: "random(-5, 5)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      // Global Scale - Globe pins animation
      gsap.fromTo(
        ".globe-pin",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: feature2Ref.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Analytics - Chart bars growing
      gsap.fromTo(
        ".chart-bar",
        { scaleY: 0, transformOrigin: "bottom" },
        {
          scaleY: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: feature3Ref.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section ref={containerRef} className="relative py-32 bg-slate-950">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Modern Commerce</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Powerful features designed to scale your business from startup to enterprise
          </p>
        </div>

        {/* Feature 1: Store Builder */}
        <div
          ref={feature1Ref}
          className="relative mb-40 opacity-30 scale-95 transition-all duration-700"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                
                {/* Visual: Drag & Drop Interface */}
                <div className="store-builder-visual relative h-80 bg-slate-900/50 rounded-2xl border border-slate-700/30 p-6">
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  
                  <div className="mt-12 space-y-4">
                    <div className="drag-element bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 rounded-lg p-4 cursor-move">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500/30 rounded-lg" />
                        <div className="flex-1 h-4 bg-slate-700/50 rounded" />
                      </div>
                    </div>
                    
                    <div className="drag-element bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-lg p-4 cursor-move">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-500/30 rounded-lg" />
                        <div className="flex-1 h-4 bg-slate-700/50 rounded" />
                      </div>
                    </div>
                    
                    <div className="drag-element bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-4 cursor-move">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-500/30 rounded-lg" />
                        <div className="flex-1 h-4 bg-slate-700/50 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Drag, Drop, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Done.</span>
              </h3>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                Build stunning storefronts without touching code. Our intuitive drag-and-drop builder 
                puts the power of professional design at your fingertips.
              </p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <span>Pre-built templates & components</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                  <span>Real-time preview</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                  </div>
                  <span>Mobile-responsive by default</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature 2: Global Scale */}
        <div
          ref={feature2Ref}
          className="relative mb-40 opacity-30 scale-95 transition-all duration-700"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Sell <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Everywhere.</span>
              </h3>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                Reach customers across the globe with multi-currency support, localization, 
                and seamless international shipping integrations.
              </p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <span>135+ currencies supported</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                  <span>Multi-language storefronts</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                  </div>
                  <span>Global shipping partners</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
                
                {/* Visual: Globe with Pins */}
                <div className="global-scale-visual relative h-80 bg-slate-900/50 rounded-2xl border border-slate-700/30 flex items-center justify-center overflow-hidden">
                  <div className="relative w-64 h-64">
                    {/* Globe */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                      <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_30%_30%,rgba(59,130,246,0.3),transparent_50%)]" />
                    </div>
                    
                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
                      <path d="M 128 128 Q 100 80, 80 60" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none" className="globe-pin" />
                      <path d="M 128 128 Q 180 90, 200 70" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="2" fill="none" className="globe-pin" />
                      <path d="M 128 128 Q 90 170, 70 190" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2" fill="none" className="globe-pin" />
                      <path d="M 128 128 Q 170 160, 190 180" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none" className="globe-pin" />
                    </svg>
                    
                    {/* Location Pins */}
                    <div className="globe-pin absolute top-[20%] left-[25%] w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50">
                      <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75" />
                    </div>
                    <div className="globe-pin absolute top-[25%] right-[20%] w-4 h-4 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50">
                      <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
                    </div>
                    <div className="globe-pin absolute bottom-[25%] left-[22%] w-4 h-4 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50">
                      <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-75" />
                    </div>
                    <div className="globe-pin absolute bottom-[20%] right-[22%] w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50">
                      <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Analytics */}
        <div
          ref={feature3Ref}
          className="relative opacity-30 scale-95 transition-all duration-700"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                
                {/* Visual: Animated Charts */}
                <div className="analytics-visual relative h-80 bg-slate-900/50 rounded-2xl border border-slate-700/30 p-6">
                  <div className="mb-4">
                    <h4 className="text-slate-400 text-sm font-semibold mb-2">Revenue Overview</h4>
                    <div className="text-3xl font-bold text-white">$124,593</div>
                    <div className="text-green-400 text-sm">+23.5% from last month</div>
                  </div>
                  
                  {/* Chart */}
                  <div className="flex items-end justify-between h-40 gap-3 mt-8">
                    <div className="chart-bar flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg h-[60%]" />
                    <div className="chart-bar flex-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg h-[75%]" />
                    <div className="chart-bar flex-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg h-[45%]" />
                    <div className="chart-bar flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg h-[90%]" />
                    <div className="chart-bar flex-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg h-[70%]" />
                    <div className="chart-bar flex-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg h-[85%]" />
                    <div className="chart-bar flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg h-[100%]" />
                  </div>
                  
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Data-Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Growth.</span>
              </h3>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                Make informed decisions with real-time analytics and insights. Track performance, 
                understand your customers, and optimize for growth.
              </p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <span>Real-time dashboard</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                  <span>Customer behavior insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                  </div>
                  <span>Custom reports & exports</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
