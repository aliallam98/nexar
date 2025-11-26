"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ShoppingCart, 
  BarChart2, 
  CreditCard, 
  Megaphone, 
  Puzzle, 
  Code 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    icon: ShoppingCart,
    title: "E-Commerce Platform",
    description: "Complete store builder with inventory management, order processing, and drag-and-drop customization.",
    color: "from-blue-400 to-indigo-500",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    glowColor: "blue-500"
  },
  {
    icon: BarChart2,
    title: "Analytics & Insights",
    description: "Real-time data visualization, sales reporting, and customer behavior tracking to drive growth.",
    color: "from-purple-400 to-pink-500",
    borderColor: "border-purple-500/20 hover:border-purple-500/40",
    glowColor: "purple-500"
  },
  {
    icon: CreditCard,
    title: "Payment Solutions",
    description: "Secure multi-currency checkout, subscription billing, and integration with top payment gateways.",
    color: "from-emerald-400 to-teal-500",
    borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
    glowColor: "emerald-500"
  },
  {
    icon: Megaphone,
    title: "Marketing Tools",
    description: "Built-in SEO, email campaigns, social media integration, and discount management engines.",
    color: "from-orange-400 to-red-500",
    borderColor: "border-orange-500/20 hover:border-orange-500/40",
    glowColor: "orange-500"
  },
  {
    icon: Puzzle,
    title: "Integrations",
    description: "Connect with 100+ third-party apps for shipping, accounting, CRM, and more.",
    color: "from-cyan-400 to-blue-500",
    borderColor: "border-cyan-500/20 hover:border-cyan-500/40",
    glowColor: "cyan-500"
  },
  {
    icon: Code,
    title: "Developer Platform",
    description: "Robust GraphQL API, webhooks, and CLI tools for building custom storefronts and apps.",
    color: "from-gray-200 to-white",
    borderColor: "border-gray-500/20 hover:border-gray-500/40",
    glowColor: "gray-500"
  }
];

export default function ServiceCategoriesGrid() {
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

    // Header Animation
    tl.from(headerRef.current?.children || [], {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Grid Animation using batch for reliability
    ScrollTrigger.batch(".category-card", {
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
    gsap.set(".category-card", { opacity: 0, y: 50 });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-24 bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-80" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm">
            Our Ecosystem
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            Comprehensive Solutions for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Modern Commerce
            </span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to build, manage, and scale your online business in one unified platform.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="category-card will-change-transform will-change-opacity group relative"
            >
              {/* Card */}
              <div className={`relative h-full overflow-hidden rounded-3xl backdrop-blur-xl bg-white/5 border ${category.borderColor} p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-2`}>
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 blur-2xl`} />
                </div>

                {/* Animated gradient background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${category.color}`}
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
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center">
                        <category.icon className={`w-7 h-7 bg-gradient-to-br ${category.color} bg-clip-text text-transparent`} />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text ${category.color}`} style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {category.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center text-sm font-medium text-white/40 group-hover:text-white transition-colors">
                    <span>Explore</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${category.color} opacity-20 blur-2xl`} />
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
