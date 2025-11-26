"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5, suffix: "M+", label: "Orders Processed", color: "text-blue-400" },
  { value: 10, suffix: "k+", label: "Active Merchants", color: "text-purple-400" },
  { value: 150, suffix: "+", label: "Countries Served", color: "text-pink-400" },
  { value: 99, suffix: "%", label: "Customer Satisfaction", color: "text-green-400" },
];

export default function AboutStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const statItems = statsRef.current?.children;
    
    if (statItems) {
      Array.from(statItems).forEach((item, index) => {
        const valueElement = item.querySelector(".stat-value");
        const targetValue = stats[index].value;

        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          ease: "power3.out",
          delay: index * 0.1,
        });

        if (valueElement) {
          gsap.to(valueElement, {
            innerText: targetValue,
            duration: 2.5,
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
            ease: "power2.out",
            onUpdate: function() {
              this.targets()[0].innerText = Math.ceil(this.targets()[0].innerText);
            }
          });
        }
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">
                <span className="stat-value">0</span>
                <span className={stat.color}>{stat.suffix}</span>
              </div>
              <p className="text-gray-400 text-lg font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
