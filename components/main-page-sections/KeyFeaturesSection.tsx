"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Zap, 
  Palette, 
  Shield, 
  BarChart3, 
  Globe, 
  Code2,
  Sparkles,
  Lock,
  TrendingUp,
  Layers
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Blazing Fast Performance",
    description: "Built on Next.js 14 App Router with Server Components for instant page loads and seamless navigation.",
    color: "from-yellow-400 to-orange-400",
    borderColor: "border-yellow-500/20 hover:border-yellow-500/40",
    glowColor: "yellow-500",
  },
  {
    icon: Palette,
    title: "Beautiful UI Components",
    description: "Material UI Design System with dark mode support, fully responsive, and customizable to match your brand.",
    color: "from-pink-400 to-purple-400",
    borderColor: "border-pink-500/20 hover:border-pink-500/40",
    glowColor: "pink-500",
  },
  {
   icon: Shield,
    title: "Enterprise Security",
    description: "JWT authentication, role-based access control, data encryption, and industry-standard security practices.",
    color: "from-blue-400 to-cyan-400",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    glowColor: "blue-500",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Real-time dashboards, custom reports, sales insights, and data-driven decision making at your fingertips.",
    color: "from-green-400 to-emerald-400",
    borderColor: "border-green-500/20 hover:border-green-500/40",
    glowColor: "green-500",
  },
  {
    icon: Globe,
    title: "Global Ready",
    description: "Multi-currency support, internationalization (i18n), multi-language capabilities, and worldwide reach.",
    color: "from-violet-400 to-purple-400",
    borderColor: "border-violet-500/20 hover:border-violet-500/40",
    glowColor: "violet-500",
  },
  {
    icon: Code2,
    title: "Developer Friendly",
    description: "GraphQL API, comprehensive documentation, TypeScript support, and modern development experience.",
    color: "from-cyan-400 to-blue-400",
    borderColor: "border-cyan-500/20 hover:border-cyan-500/40",
    glowColor: "cyan-500",
  },
];

export const KeyFeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-wider">
              Powerful Features
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent">
              Everything you need
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              to succeed online
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Built with cutting-edge technology and designed for performance, security, and scalability
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              {/* Card */}
              <div className={`relative h-full overflow-hidden rounded-2xl backdrop-blur-xl bg-white/5 border ${feature.borderColor} p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-2`}>
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 blur-2xl`} />
                </div>

                {/* Animated gradient background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color}`}
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
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                        <feature.icon className={`w-7 h-7 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`} />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>

                  {/* Learn more link */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      Learn more
                    </span>
                    <svg className="w-4 h-4 text-violet-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${feature.color} opacity-20 blur-2xl`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6 text-lg">
            Want to see all features in action?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50">
              <span className="relative z-10">View Full Feature List</span>
              <Layers className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="group relative inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-white overflow-hidden backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
              <span className="relative z-10">Schedule a Demo</span>
              <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </motion.div>
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
