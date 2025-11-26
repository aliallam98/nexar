"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Zap, Shield, Globe, Users, Lightbulb } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Heart,
    title: "Customer Obsessed",
    description: "We start with the customer and work backwards. Their success is our success.",
    color: "from-red-400 to-rose-500",
    borderColor: "border-red-500/20 hover:border-red-500/40",
    glowColor: "red-500"
  },
  {
    icon: Zap,
    title: "Move Fast",
    description: "Speed matters in business. We calculate risk and take bold actions.",
    color: "from-yellow-400 to-orange-500",
    borderColor: "border-yellow-500/20 hover:border-yellow-500/40",
    glowColor: "yellow-500"
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "We earn trust by doing the right thing, even when no one is watching.",
    color: "from-blue-400 to-cyan-500",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    glowColor: "blue-500"
  },
  {
    icon: Globe,
    title: "Global Mindset",
    description: "We build for everyone, everywhere. Our diversity is our strength.",
    color: "from-green-400 to-emerald-500",
    borderColor: "border-green-500/20 hover:border-green-500/40",
    glowColor: "green-500"
  },
  {
    icon: Users,
    title: "Better Together",
    description: "We collaborate across boundaries to achieve shared goals.",
    color: "from-purple-400 to-violet-500",
    borderColor: "border-purple-500/20 hover:border-purple-500/40",
    glowColor: "purple-500"
  },
  {
    icon: Lightbulb,
    title: "Innovate Always",
    description: "We never settle. We're constantly looking for better ways to solve problems.",
    color: "from-orange-400 to-amber-500",
    borderColor: "border-orange-500/20 hover:border-orange-500/40",
    glowColor: "orange-500"
  }
];

export default function AboutValues() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(headerRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
    });

    // Use batch for more reliable grid animations
    ScrollTrigger.batch(".value-card", {
      start: "top 90%",
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: true
        });
      },
      onLeaveBack: (batch) => {
        gsap.to(batch, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          overwrite: true
        });
      }
    });
    
    // Set initial state
    gsap.set(".value-card", { opacity: 0, y: 50 });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center mb-20">
          <span className="text-purple-400 font-semibold tracking-wider uppercase text-sm">Our Values</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            What Drives Us Forward
          </h2>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="value-card group relative">
              {/* Card */}
              <div className={`relative h-full overflow-hidden rounded-2xl backdrop-blur-xl bg-white/5 border ${value.borderColor} p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-2`}>
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-10 blur-2xl`} />
                </div>

                {/* Animated gradient background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${value.color}`}
                    style={{
                      opacity: 0.03,
                      backgroundSize: '200% 200%',
                      animation: 'gradient-shift 8s ease infinite'
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                        <value.icon className={`w-7 h-7 bg-gradient-to-br ${value.color} bg-clip-text text-transparent`} />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text ${value.color}`} style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {value.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${value.color} opacity-20 blur-2xl`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}
