"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const companies = [
  { name: "Microsoft", logo: "/logos/microsoft.svg" },
  { name: "Google", logo: "/logos/google.svg" },
  { name: "Amazon", logo: "/logos/amazon.svg" },
  { name: "Netflix", logo: "/logos/netflix.svg" },
  { name: "Shopify", logo: "/logos/shopify.svg" },
  { name: "Stripe", logo: "/logos/stripe.svg" },
  { name: "Adobe", logo: "/logos/adobe.svg" },
  { name: "Salesforce", logo: "/logos/salesforce.svg" },
];

const stats = [
  { value: 10000, suffix: "+", label: "Active Users", color: "from-violet-400 to-purple-400" },
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1, color: "from-blue-400 to-cyan-400" },
  { value: 150, suffix: "+", label: "Countries", color: "from-pink-400 to-rose-400" },
  { value: 24, suffix: "/7", label: "Support", color: "from-green-400 to-emerald-400" },
];

export const TrustedBySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

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

    // Logos Animation
    tl.from(logosRef.current?.children || [], {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
    }, "-=0.4");

    // Stats Animation
    const statItems = statsRef.current?.children;
    if (statItems) {
      Array.from(statItems).forEach((item, index) => {
        const valueElement = item.querySelector(".stat-value");
        const targetValue = stats[index].value;
        
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: 0.2 + index * 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
          ease: "power3.out",
        });

        // Count up animation
        if (valueElement) {
          gsap.to(valueElement, {
            innerText: targetValue,
            duration: 2.5,
            snap: { innerText: stats[index].decimals ? 0.1 : 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            },
            ease: "power2.out",
            onUpdate: function() {
              const val = parseFloat(this.targets()[0].innerText);
              this.targets()[0].innerText = stats[index].decimals 
                ? val.toFixed(1) 
                : Math.round(val).toLocaleString();
            }
          });
        }
      });
    }

    // Badges Animation
    tl.from(badgesRef.current?.children || [], {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=1");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden bg-black">
      {/* Gradient orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">
            Trusted by industry leaders
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              Powering the future of commerce
            </span>
          </h2>
        </div>

        {/* Company Logos */}
        <div className="mb-20">
          <div className="relative">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
            
            {/* Logo grid */}
            <div ref={logosRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-40 hover:opacity-60 transition-opacity duration-500">
              {companies.map((company) => (
                <div key={company.name} className="group relative">
                  <div className="w-32 h-16 flex items-center justify-center">
                    {/* Placeholder for company logos */}
                    <div className="text-white/60 text-xl font-bold group-hover:text-white/80 transition-colors">
                      {company.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="group relative">
              {/* Glassmorphism card */}
              <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                {/* Gradient border glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20 blur-xl`} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      <span className="stat-value">0</span>
                    </span>
                    <span className={`text-3xl font-bold ml-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm text-center uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>

                {/* Animated gradient background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color}`}
                    style={{
                      opacity: 0.05,
                      backgroundSize: '200% 200%',
                      animation: 'gradient-shift 8s ease infinite'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div ref={badgesRef} className="mt-16 flex flex-wrap justify-center gap-8 items-center">
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">SOC 2 Certified</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="text-sm">10,000+ Companies</span>
          </div>
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
};
