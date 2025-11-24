"use client";

import { AnimatedGridBackground } from "../animations/AnimatedGridBackground";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LandingSection = () => {
  return (
    <section className="h-screen overflow-hidden relative flex items-center justify-center">
      {/* Animated Grid Background */}
      <AnimatedGridBackground />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Main Heading with Gradient */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '3s' }}>
            Experience liftoff with
          </span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-blue-300 bg-clip-text text-transparent">
            the next-generation
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-300 via-violet-300 to-purple-400 bg-clip-text text-transparent">
            E-Commerce Platform
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Build faster, ship smarter, and scale effortlessly with NeXar
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/products">
            <Button 
              size="lg"
              className="relative overflow-hidden bg-white text-black hover:bg-gray-200 font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 group"
              style={{
                boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
                animation: 'shadow-pulse 4s ease-in-out infinite'
              }}
            >
              <span className="relative z-10">Explore Products</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                   style={{
                     background: 'linear-gradient(45deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6)',
                     backgroundSize: '300% 300%',
                     animation: 'gradient-shift 4s ease infinite'
                   }}
              />
            </Button>
          </Link>
          <Link href="/about">
            <Button 
              size="lg"
              className="relative overflow-hidden border-2 border-white/30 bg-white/5 text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm group"
              style={{
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
                animation: 'shadow-pulse-alt 4s ease-in-out infinite'
              }}
            >
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                   style={{
                     background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
                     backgroundSize: '300% 300%',
                     animation: 'gradient-shift 4s ease infinite'
                   }}
              />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
      
      {/* Keyframe animations for gradient and shadow effects */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          33% {
            background-position: 50% 50%;
          }
          66% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes shadow-pulse {
          0% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(139, 92, 246, 0.1);
          }
          33% {
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.3), 0 0 80px rgba(236, 72, 153, 0.1);
          }
          66% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.1);
          }
          100% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(139, 92, 246, 0.1);
          }
        }
        
        @keyframes shadow-pulse-alt {
          0% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.1);
          }
          33% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(139, 92, 246, 0.1);
          }
          66% {
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.3), 0 0 80px rgba(236, 72, 153, 0.1);
          }
          100% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.1);
          }
        }
      `}</style>
    </section>
  );
};
