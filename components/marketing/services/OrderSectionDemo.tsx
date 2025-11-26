"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Order, TimelineStep, Notification } from "./types";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OrderSectionDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStatus, setActiveStatus] = useState<number>(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Mock order data
  const order: Order = {
    id: "ORD-2024-1234",
    orderNumber: "#1234",
    customer: "Sarah Anderson",
    status: "processing",
    total: 1249.99,
    items: 3,
    date: "Nov 26, 2024",
    trackingNumber: "TRK-9876543210",
    estimatedDelivery: "Nov 30, 2024",
  };

  const timelineSteps: TimelineStep[] = [
    {
      status: "processing",
      label: "Processing",
      description: "Order confirmed and being prepared",
      timestamp: "Nov 26, 09:15 AM",
      completed: true,
    },
    {
      status: "shipped",
      label: "Shipped",
      description: "Package in transit",
      timestamp: "Nov 27, 02:30 PM",
      completed: false,
    },
    {
      status: "delivered",
      label: "Delivered",
      description: "Package delivered successfully",
      timestamp: "",
      completed: false,
    },
  ];

  // Simulate live notifications
  useEffect(() => {
    const notificationMessages = [
      { type: "info" as const, message: "Order #1234 is being packed", delay: 2000 },
      { type: "success" as const, message: "Quality check completed ✓", delay: 4000 },
      { type: "info" as const, message: "Shipping label generated", delay: 6000 },
    ];

    notificationMessages.forEach((notif) => {
      setTimeout(() => {
        const newNotification: Notification = {
          id: Math.random().toString(36).substr(2, 9),
          type: notif.type,
          message: notif.message,
          timestamp: new Date().toLocaleTimeString(),
        };
        
        setNotifications((prev) => [newNotification, ...prev].slice(0, 3));
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
        }, 8000);
      }, notif.delay);
    });
  }, []);

  useGSAP(
    () => {
      // Entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 20%",
        },
      });

      tl.fromTo(
        ".order-demo-header",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      tl.fromTo(
        ".order-card",
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" },
        "-=0.4"
      );

      tl.fromTo(
        ".timeline-step",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: "power2.out" },
        "-=0.4"
      );

      // Continuous pulse animation for active step
      gsap.to(".active-pulse", {
        scale: 1.2,
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  // Animate new notifications
  useEffect(() => {
    if (notifications.length > 0) {
      gsap.fromTo(
        ".notification-item:first-child",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }
      );
    }
  }, [notifications]);

  const handleQuickAction = (action: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    
    // Ripple effect
    gsap.fromTo(
      btn,
      { scale: 1 },
      {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      }
    );
  };

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full -translate-y-1/2" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="order-demo-header text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Order Management{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Reimagined
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Track, manage, and optimize every order with precision and elegance
          </p>
        </div>

        {/* Main Demo Card */}
        <div className="order-card max-w-5xl mx-auto">
          <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
            
            <div className="relative z-10 grid lg:grid-cols-5 gap-8">
              {/* Left: Order Info & Timeline */}
              <div className="lg:col-span-3 space-y-8">
                {/* Order Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{order.orderNumber}</h3>
                    <p className="text-slate-400">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">${order.total.toLocaleString()}</div>
                    <div className="text-sm text-slate-400">{order.items} items</div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

                {/* Smart Timeline */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    Order Timeline
                  </h4>
                  
                  <div className="space-y-6">
                    {timelineSteps.map((step, index) => (
                      <div
                        key={step.status}
                        className="timeline-step relative flex gap-4 group"
                      >
                        {/* Timeline line */}
                        {index < timelineSteps.length - 1 && (
                          <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-slate-700 group-hover:bg-slate-600 transition-colors" />
                        )}
                        
                        {/* Status indicator */}
                        <div className="relative flex-shrink-0">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                              step.completed
                                ? "bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/50"
                                : index === 1
                                ? "bg-slate-800 border-blue-400/50"
                                : "bg-slate-800 border-slate-600"
                            }`}
                          >
                            {step.completed ? (
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : index === 1 ? (
                              <div className="w-3 h-3 bg-blue-400 rounded-full">
                                <div className="active-pulse absolute inset-0 w-3 h-3 bg-blue-400 rounded-full" />
                              </div>
                            ) : (
                              <div className="w-2 h-2 bg-slate-600 rounded-full" />
                            )}
                          </div>
                        </div>
                        
                        {/* Step content */}
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className={`font-semibold ${step.completed ? "text-white" : "text-slate-400"}`}>
                              {step.label}
                            </h5>
                            {step.timestamp && (
                              <span className="text-xs text-slate-500">{step.timestamp}</span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wide">Quick Actions</h4>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={(e) => handleQuickAction("track", e)}
                      className="group px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-500/30 hover:border-blue-400/50 rounded-lg text-sm font-medium text-blue-300 transition-all hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Track Package
                      </span>
                    </button>
                    
                    <button
                      onClick={(e) => handleQuickAction("contact", e)}
                      className="group px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 hover:border-slate-500 rounded-lg text-sm font-medium text-slate-300 transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact Customer
                      </span>
                    </button>
                    
                    <button
                      onClick={(e) => handleQuickAction("invoice", e)}
                      className="group px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 hover:border-slate-500 rounded-lg text-sm font-medium text-slate-300 transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Invoice
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Live Updates */}
              <div className="lg:col-span-2">
                <div className="sticky top-8">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Live Updates
                  </h4>
                  
                  <div className="space-y-3 min-h-[300px]">
                    {notifications.length === 0 ? (
                      <div className="text-center py-12 text-slate-500">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-800 flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                        <p className="text-sm">Waiting for updates...</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="notification-item p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                notification.type === "success"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-blue-500/20 text-blue-400"
                              }`}
                            >
                              {notification.type === "success" ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white mb-1">{notification.message}</p>
                              <p className="text-xs text-slate-500">{notification.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
