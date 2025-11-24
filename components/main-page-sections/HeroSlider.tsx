"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MoveLeft, MoveRight } from "lucide-react";
import { AnimatedHeading } from "../animations/AnimatedHeading";
import { AnimatedButton } from "../animations/AnimatedButton";

// Mock slides data
const slides = [
  {
    id: 1,
    image: "/v1.webp",
    title: "EXPERIENCE UNPARALLELED AUDIO ELEGANCE",
  },
  {
    id: 2,
    image: "/v2.webp",
    title: "PREMIUM SOUND FOR AUDIOPHILES",
  },
  {
    id: 3,
    image: "/v3.webp",
    title: "WIRELESS FREEDOM, WIRED QUALITY",
  },
];

export function HeroSlider({
  withAnimatedHeading = false,
}: {
  withAnimatedHeading?: boolean;
}) {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="relative h-full w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        loop
        navigation={{
          prevEl: ".custom-prev-btn",
          nextEl: ".custom-next-btn",
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white !opacity-50",
          bulletActiveClass: "swiper-pagination-bullet-active !opacity-100",
        }}
        onSlideChange={
          withAnimatedHeading
            ? (swiper) => setActiveSlide(swiper.realIndex)
            : undefined
        }
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40 px-10">
                <div className="absolute bottom-26 md:bottom-40 left-5 right-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  {!withAnimatedHeading && (
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-lg">
                      {slide.title}
                    </h1>
                  )}

                  {withAnimatedHeading && (
                    <AnimatedHeading
                      key={`${slide.id}-${
                        activeSlide === index ? "active" : "inactive"
                      }`}
                      className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-lg"
                      text={slide.title}
                      effect="splitReveal"
                    />
                  )}

                  <AnimatedButton
                    className="bg-white text-black hover:text-white rounded-full px-4 py-2 sm:px-6 sm:py-3 font-medium transition-colors flex-shrink-0"
                    effectColor="bg-black text-white"
                  >
                    Shop Headphones
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div className="absolute bottom-0 px-32 -translate-y-1/2 left-0 right-0 flex justify-between z-20 pointer-events-none">
        {/* Left Arrow */}
        <AnimatedButton
          className="custom-prev-btn pointer-events-auto group relative w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="Previous slide"
        >
          {/* Icon layer */}
          <MoveLeft />
        </AnimatedButton>

        {/* Right Arrow */}
        <AnimatedButton
          className="custom-next-btn pointer-events-auto group relative w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="Next slide"
        >
          <MoveRight />
        </AnimatedButton>
      </div>
    </div>
  );
}
