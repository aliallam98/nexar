"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function ContactHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Ensure elements are hidden before animation starts
    gsap.set([titleRef.current, textRef.current, ".contact-card"], { opacity: 0 });

    tl.fromTo(titleRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
    .fromTo(textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(".contact-card",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      "+=0.1" // Reduced delay for snappier feel
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px]" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-white/80">We're here to help</span>
        </div>

        <h1 ref={titleRef} className="opacity-0 will-change-transform will-change-opacity text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Let's Start a <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Conversation
          </span>
        </h1>

        <p ref={textRef} className="opacity-0 will-change-transform will-change-opacity text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
          Have a project in mind? Want to know more about our platform? 
          We're all ears. Reach out to us and let's build something amazing together.
        </p>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 text-left">
          {[
            {
              icon: MessageSquare,
              title: "Chat to Sales",
              desc: "Speak to our friendly team.",
              link: "sales@nexar.com",
              color: "text-blue-400",
              bg: "bg-blue-500/10",
              border: "border-blue-500/20"
            },
            {
              icon: Mail,
              title: "Chat to Support",
              desc: "We're here to help.",
              link: "support@nexar.com",
              color: "text-purple-400",
              bg: "bg-purple-500/10",
              border: "border-purple-500/20"
            },
            {
              icon: Phone,
              title: "Call Us",
              desc: "Mon-Fri from 8am to 5pm.",
              link: "+1 (555) 000-0000",
              color: "text-pink-400",
              bg: "bg-pink-500/10",
              border: "border-pink-500/20"
            }
          ].map((item, index) => (
            <div key={index} className={`contact-card opacity-0 will-change-transform will-change-opacity group p-6 rounded-2xl bg-white/5 border ${item.border} backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1`}>
              <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{item.desc}</p>
              <span className={`text-sm font-semibold ${item.color}`}>{item.link}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
