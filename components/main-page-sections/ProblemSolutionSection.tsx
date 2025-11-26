"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { XCircle, CheckCircle2, Zap, DollarSign, Palette, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: XCircle,
    title: "Slow & Complex Platforms",
    description: "Traditional solutions are bloated with unnecessary features that slow you down",
    color: "text-red-400"
  },
  {
    icon: XCircle,
    title: "Hidden Costs Everywhere",
    description: "Unexpected fees, transaction charges, and surprise billing drain your budget",
    color: "text-red-400"
  },
  {
    icon: XCircle,
    title: "Limited Customization",
    description: "Cookie-cutter templates that don't reflect your brand's uniqueness",
    color: "text-red-400"
  },
  {
    icon: XCircle,
    title: "Poor Scalability",
    description: "Systems that break when you actually start growing your business",
    color: "text-red-400"
  },
];

const solutions = [
  {
    icon: Zap,
    title: "Lightning-Fast Performance",
    description: "Built on Next.js 14 with server components for instant page loads",
    color: "text-green-400",
    gradient: "from-green-400 to-emerald-400"
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees. What you see is what you pay. Simple, affordable plans",
    color: "text-green-400",
    gradient: "from-green-400 to-emerald-400"
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description: "Complete design freedom with our component library and theming system",
    color: "text-green-400",
    gradient: "from-green-400 to-emerald-400"
  },
  {
    icon: TrendingUp,
    title: "Built to Scale Infinitely",
    description: "Handle millions of products and visitors without breaking a sweat",
    color: "text-green-400",
    gradient: "from-green-400 to-emerald-400"
  },
];

export const ProblemSolutionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
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

    // Split Screen Animation
    // Problems Side
    gsap.from(problemsRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: problemsRef.current,
        start: "top 85%",
      },
      ease: "power3.out",
    });

    gsap.from(problemsRef.current?.querySelectorAll(".problem-card") || [], {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.2,
      scrollTrigger: {
        trigger: problemsRef.current,
        start: "top 85%",
      },
      ease: "power2.out",
    });

    // Solutions Side
    gsap.from(solutionsRef.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: solutionsRef.current,
        start: "top 85%",
      },
      ease: "power3.out",
    });

    gsap.from(solutionsRef.current?.querySelectorAll(".solution-card") || [], {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.2,
      scrollTrigger: {
        trigger: solutionsRef.current,
        start: "top 85%",
      },
      ease: "power2.out",
    });

    // CTA Animation
    gsap.from(ctaRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 90%",
      },
      ease: "power3.out",
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-scroll 20s linear infinite'
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <p className="text-violet-400 text-sm uppercase tracking-wider mb-4 font-semibold">
            The NeXar Difference
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent">
              Traditional platforms
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              vs. Modern Solutions
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            See why forward-thinking businesses are making the switch
          </p>
        </div>

        {/* Split-screen comparison */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Problems Side */}
          <div ref={problemsRef} className="space-y-6">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-200 mb-2 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
                The Challenge
              </h3>
              <p className="text-gray-400">What you're dealing with right now</p>
            </div>

            {problems.map((problem, index) => (
              <div key={index} className="problem-card group relative">
                <div className="relative overflow-hidden rounded-2xl backdrop-blur-sm bg-white/5 border border-red-500/20 p-6 hover:border-red-500/40 transition-all duration-500">
                  {/* Red glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-red-500/5 blur-xl" />
                  </div>

                  <div className="relative z-10 flex gap-4">
                    <div className="flex-shrink-0">
                      <problem.icon className={`w-6 h-6 ${problem.color}`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-200 mb-2">
                        {problem.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Solutions Side */}
          <div ref={solutionsRef} className="space-y-6">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-200 mb-2 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                The NeXar Way
              </h3>
              <p className="text-gray-400">How we solve it for you</p>
            </div>

            {solutions.map((solution, index) => (
              <div key={index} className="solution-card group relative">
                <div className="relative overflow-hidden rounded-2xl backdrop-blur-sm bg-white/5 border border-green-500/20 p-6 hover:border-green-500/40 transition-all duration-500 hover:scale-105">
                  {/* Green glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-10 blur-xl`} />
                  </div>

                  {/* Animated gradient background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${solution.gradient}`}
                      style={{
                        opacity: 0.05,
                        backgroundSize: '200% 200%',
                        animation: 'gradient-shift 8s ease infinite'
                      }}
                    />
                  </div>

                  <div className="relative z-10 flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <solution.icon className={`w-5 h-5 ${solution.color}`} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-white transition-colors">
                        {solution.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRef} className="mt-20 text-center">
          <p className="text-gray-400 mb-6 text-lg">
            Ready to experience the difference?
          </p>
          <button className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50">
            <span className="relative z-10">Start Your Free Trial</span>
            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }
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
};
