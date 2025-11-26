"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UserPlus, Layout, Rocket, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your account in 30 seconds. No credit card required for the trial.",
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    border: "border-blue-500/30"
  },
  {
    icon: Layout,
    title: "Customize",
    description: "Choose a template and customize it with our drag-and-drop builder.",
    color: "text-purple-400",
    bg: "bg-purple-500/20",
    border: "border-purple-500/30"
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Add your products, set up payments, and go live with one click.",
    color: "text-pink-400",
    bg: "bg-pink-500/20",
    border: "border-pink-500/30"
  },
  {
    icon: TrendingUp,
    title: "Grow",
    description: "Use our built-in marketing tools to drive traffic and increase sales.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
    border: "border-emerald-500/30"
  }
];

export default function ServiceProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Header Animation
    tl.from(headerRef.current?.children || [], {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Line Animation
    gsap.from(lineRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: stepsRef.current,
        start: "top 70%",
      }
    });

    // Steps Animation
    gsap.from(stepsRef.current?.children || [], {
      y: 50,
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      stagger: 0.2,
      scrollTrigger: {
        trigger: stepsRef.current,
        start: "top 70%",
      },
      ease: "back.out(1.7)",
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-slate-950 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-24">
          <span className="text-purple-400 font-semibold tracking-wider uppercase text-sm">
            Simple Process
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            From Idea to Empire <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              in 4 Simple Steps
            </span>
          </h2>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-white/10">
            <div ref={lineRef} className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          </div>

          {/* Steps Grid */}
          <div ref={stepsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Number Badge */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-sm font-bold text-white/50 z-20">
                  {index + 1}
                </div>

                {/* Icon Circle */}
                <div className={`w-24 h-24 mx-auto mb-8 rounded-full ${step.bg} border ${step.border} flex items-center justify-center backdrop-blur-xl group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(0,0,0,0.3)]`}>
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute bottom-[-24px] left-1/2 w-0.5 h-12 bg-white/10 -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <button className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold overflow-hidden transition-transform hover:scale-105">
            <span className="relative z-10">Start Your Journey</span>
            <Rocket className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </section>
  );
}
