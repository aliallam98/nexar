"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Puzzle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Mock partners data
const partners = [
  "Stripe", "PayPal", "SendGrid", "Twilio", "Slack", 
  "HubSpot", "Salesforce", "Mailchimp", "Shopify", "Google Analytics",
  "Meta", "TikTok", "AWS", "Vercel", "Prisma"
];

export default function IntegrationPartnersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

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

    // Marquee Animation
    // Row 1: Left to Right
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });

    // Row 2: Right to Left
    gsap.fromTo(marqueeRef2.current, 
      { xPercent: -50 },
      {
        xPercent: 0,
        ease: "none",
        duration: 20,
        repeat: -1,
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      <div className="relative max-w-7xl mx-auto px-6 mb-20">
        {/* Header */}
        <div ref={headerRef} className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Puzzle className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Seamless Integrations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Connects with Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              Favorite Tools
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            NeXar plays nice with the tools you already use. Connect to payment gateways, marketing platforms, and shipping providers in seconds.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden space-y-8">
        {/* Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Row 1 */}
        <div className="flex w-max" ref={marqueeRef}>
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div key={`${partner}-${index}`} className="mx-4">
              <div className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                <span className="text-xl font-bold text-white/70">{partner}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex w-max" ref={marqueeRef2}>
          {[...partners.reverse(), ...partners, ...partners].map((partner, index) => (
            <div key={`${partner}-${index}-2`} className="mx-4">
              <div className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                <span className="text-xl font-bold text-white/70">{partner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
