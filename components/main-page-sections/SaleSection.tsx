"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

interface SaleSectionProps {
  bgImage: string;
  saleTimeEndsIn: Date;
  header?: string;
  subHeader?: string;
  link?: string;
  productImage?: string;
}

export function SaleSection({
  bgImage,
  saleTimeEndsIn,
  header = "Get up to 50% off",
  subHeader = "on waterproof speakers",
  link = "#",
}: SaleSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = saleTimeEndsIn.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [saleTimeEndsIn]);

  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Social Media Sidebar - Hidden on mobile and small tablets */}
      <SocialMediaSidebar />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="text-center space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Header Text */}
          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight px-2">
              {header}
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white/90 px-2">
              {subHeader}
            </h2>
          </div>

          {/* Countdown Timer */}
          {!isExpired ? (
            <div className="flex justify-center items-end gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-white mt-6 sm:mt-8 lg:mt-12 px-2">
              {/* Days */}
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                  {timeLeft.days.toString().padStart(3, "0")}
                </div>
                <div className="text-xs sm:text-sm font-semibold tracking-wider mt-1 sm:mt-2">
                  DAYS
                </div>
              </div>

              {/* Colon */}
              <div className="flex flex-col items-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-orange-300">
                  :
                </div>
                <div className="text-xs sm:text-sm font-semibold tracking-wider mt-1 sm:mt-2 opacity-0">
                  .
                </div>
              </div>

              {/* Hours */}
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm font-semibold tracking-wider mt-1 sm:mt-2">
                  HOURS
                </div>
              </div>

              {/* Colon */}
              <div className="flex flex-col items-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-orange-300">
                  :
                </div>
                <div className="text-xs sm:text-sm font-semibold tracking-wider mt-1 sm:mt-2 opacity-0">
                  .
                </div>
              </div>

              {/* Minutes */}
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm font-semibold tracking-wider mt-1 sm:mt-2">
                  MINS
                </div>
              </div>

              {/* Colon */}
              <div className="flex flex-col items-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-orange-300">
                  :
                </div>
                <div className="text-xs sm:text-sm font-semibold tracking-wider mt-1 sm:mt-2 opacity-0">
                  .
                </div>
              </div>

              {/* Seconds */}
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm font-semibold tracking-wider mt-1 sm:mt-2">
                  SECS
                </div>
              </div>
            </div>
          ) : (
            <div className="text-red-400 font-semibold text-lg sm:text-xl lg:text-2xl px-4">
              Sale has ended!
            </div>
          )}

          {/* CTA Button */}
          <div className="flex justify-center mt-6 sm:mt-8 lg:mt-12 px-4">
            <Button
              size="lg"
              className="bg-[#a7554d] hover:bg-[#8f463f] px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-full shadow-lg transition-all duration-300 w-full sm:w-auto max-w-xs sm:max-w-none"
              disabled={isExpired}
            >
              {isExpired ? "Sale Ended" : "Discover sales →"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const SocialMediaSidebar = () => {
  return (
    <div className="hidden lg:block absolute left-4 xl:left-6 top-1/2 -translate-y-1/2 z-20">
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 space-y-3 lg:space-y-4 shadow-lg">
        <button className="w-10 lg:w-12 h-10 lg:h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
          <Facebook className="w-4 lg:w-5 h-4 lg:h-5 text-gray-700" />
        </button>
        <button className="w-10 lg:w-12 h-10 lg:h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
          <Twitter className="w-4 lg:w-5 h-4 lg:h-5 text-gray-700" />
        </button>
        <button className="w-10 lg:w-12 h-10 lg:h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
          <Instagram className="w-4 lg:w-5 h-4 lg:h-5 text-gray-700" />
        </button>
        <button className="w-10 lg:w-12 h-10 lg:h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
          <Youtube className="w-4 lg:w-5 h-4 lg:h-5 text-gray-700" />
        </button>
      </div>

      <div className="mt-6 lg:mt-8 bg-white/90 backdrop-blur-sm rounded-full px-2 lg:px-3 py-4 lg:py-6">
        <div className="text-gray-800 font-bold text-xs lg:text-sm tracking-wider transform -rotate-90 whitespace-nowrap origin-center">
          GET 20% OFF
        </div>
      </div>
    </div>
  );
};
