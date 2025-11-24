"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { MoveLeft, MoveRight } from "lucide-react";
import { AnimatedButton } from "../animations/AnimatedButton";
import {
  CollectionCard,
  CollectionCardWithLayer,
} from "../../app/[locale]/(marketing)/collections/page";

// Mock data (can be fetched dynamically later)
const collections = [
  {
    id: "all-products",
    type: "withLayer",
    headingText: "All Products",
    subHeading: "Checkout all products",
    src: "/collections/all-products.webp",
    href: "/collections/products",
    totalCount: 15,
  },
  {
    id: "headphones1",
    headingText: "Headphones",
    subHeading: "Surround yourself in sound",
    src: "/collections/collection-02.webp",
    href: `/collections/Headphones-6650a1f1f0e8d74b5c1a1001`,
  },
  {
    id: "earphones1",
    headingText: "Earphones",
    subHeading: "Surround yourself in sound",
    src: "/collections/collection-03.webp",
    href: `/collections/Earphones-6650a1f1f0e8d74b5c1a1002`,
  },
  {
    id: "speakers1",
    headingText: "Speakers",
    subHeading: "Premium sound quality",
    src: "/collections/collection-04.jfif",
    href: `/collections/Speakers-6650a1f1f0e8d74b5c1a1003`,
  },

  {
    id: "headphones",
    headingText: "Headphones",
    subHeading: "Surround yourself in sound",
    src: "/collections/collection-02.webp",
    href: `/collections/Headphones-6650a1f1f0e8d74b5c1a1001`,
  },
  {
    id: "earphones",
    headingText: "Earphones",
    subHeading: "Surround yourself in sound",
    src: "/collections/collection-03.webp",
    href: `/collections/Earphones-6650a1f1f0e8d74b5c1a1002`,
  },
  {
    id: "speakers",
    headingText: "Speakers",
    subHeading: "Premium sound quality",
    src: "/collections/collection-07.webp",
    href: `/collections/Speakers-6650a1f1f0e8d74b5c1a1003`,
  },
];

const CollectionSlider = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="relative py-12 md:py-20">
      <div className="container mx-auto group ">
        <Swiper
          modules={[Navigation, Pagination]}
          loop={false}
          spaceBetween={24}
          slidesPerView={1.2}
          slidesPerGroup={1}
          breakpoints={{
            640: { slidesPerView: 2, slidesPerGroup: 2 },
            768: { slidesPerView: 3, slidesPerGroup: 3 },
            1024: { slidesPerView: 4, slidesPerGroup: 4 },
          }}
          navigation={{
            prevEl: ".collection-prev-btn",
            nextEl: ".collection-next-btn",
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onInit={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          //   pagination={{
          //     clickable: true,
          //     bulletClass: "swiper-pagination-bullet !bg-black/40",
          //     bulletActiveClass: "swiper-pagination-bullet-active !bg-black",
          //   }}
        >
          {collections.map((col) => (
            <SwiperSlide key={col.id}>
              {col.type === "withLayer" ? (
                <CollectionCardWithLayer
                  src={col.src}
                  headingText={col.headingText}
                  subHeading={col.subHeading}
                  href={col.href}
                  totalCount={col.totalCount}
                />
              ) : (
                <CollectionCard
                  headingText={col.headingText}
                  subHeading={col.subHeading}
                  src={col.src}
                  href={col.href}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows */}
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-8 z-20 pointer-events-none">
          <AnimatedButton
            className={`collection-prev-btn border-none pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full transition-all absolute left-10 ${
              isBeginning
                ? "opacity-0 pointer-events-none"
                : "bg-black/80 hover:bg-black/20"
            }`}
            aria-label="Previous collection"
          >
            <MoveLeft className="w-6 h-6 " />
          </AnimatedButton>
          <AnimatedButton
            className={`collection-next-btn border-none pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full transition-all absolute right-10 ${
              isEnd
                ? "opacity-0 pointer-events-none"
                : "bg-black/80 hover:bg-black/20"
            }`}
            aria-label="Next collection"
          >
            <MoveRight className="w-6 h-6 " />
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default CollectionSlider;
