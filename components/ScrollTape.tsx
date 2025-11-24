"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";

// Brand logos for the tapes
const topTapeLogos = [
  "/placeholder.svg?height=60&width=120&text=BOSE",
  "/placeholder.svg?height=60&width=80&text=M",
  "/placeholder.svg?height=60&width=140&text=logitech",
  "/placeholder.svg?height=60&width=100&text=Apple",
  "/placeholder.svg?height=60&width=120&text=Bower",
  "/placeholder.svg?height=60&width=120&text=BOSE",
  "/placeholder.svg?height=60&width=80&text=M",
  "/placeholder.svg?height=60&width=140&text=logitech",
];

const bottomTapeLogos = [
  "/placeholder.svg?height=60&width=120&text=barista",
  "/placeholder.svg?height=60&width=100&text=D%26B",
  "/placeholder.svg?height=60&width=120&text=BOSE",
  "/placeholder.svg?height=60&width=80&text=M",
  "/placeholder.svg?height=60&width=140&text=logitech",
  "/placeholder.svg?height=60&width=120&text=barista",
  "/placeholder.svg?height=60&width=100&text=D%26B",
  "/placeholder.svg?height=60&width=120&text=BOSE",
];

interface ImageTapeProps {
  images: string[];
  rotation: number;
  baseSpeed: number;
  scrollVelocity: number;
  scrollDirection: "up" | "down" | "idle";
  reverse?: boolean;
  isTopTape?: boolean;
  isPaused?: boolean;
  onHover?: (isHovering: boolean) => void;
}

function ImageTape({
  images,
  rotation,
  baseSpeed,
  scrollVelocity,
  scrollDirection,
  reverse = false,
  isTopTape = false,
  isPaused = false,
  onHover,
}: ImageTapeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const animationRef = useRef<number>(null);

  // Create seamless infinite loop - only duplicate twice for perfect loop
  const duplicatedImages = [...images, ...images];

  const imageWidth = 140;
  const singleSetWidth = images.length * imageWidth;

  useEffect(() => {
    const animate = () => {
      if (isPaused) {
        // Keep current position when paused
      } else {
        setOffset((prev) => {
          // Use fixed speed of 1.4 when scrolling, base speed when idle
          const speed = scrollDirection !== "idle" ? 1.4 : baseSpeed;

          // Determine direction based on scroll direction and tape type
          let direction = reverse ? 1 : -1;

          // If scrolling up, reverse the direction
          if (scrollDirection === "up") {
            direction = -direction;
          }

          let newOffset = prev + speed * direction;

          // Seamless infinite loop reset
          // When moving left (negative direction)
          if (direction < 0) {
            if (newOffset <= -singleSetWidth) {
              // Reset to start position when first set is completely off screen
              newOffset = 0;
            }
          }
          // When moving right (positive direction)
          else if (direction > 0) {
            if (newOffset >= singleSetWidth) {
              // Reset to start position when moved one full set
              newOffset = 0;
            }
          }

          return newOffset;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    baseSpeed,
    scrollVelocity,
    scrollDirection,
    singleSetWidth,
    reverse,
    isPaused,
  ]);

  // Update position with vanilla JS
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, [offset]);

  return (
    <div
      className="absolute inset-0 overflow-hidden cursor-pointer"
      style={{ transform: `rotate(${rotation}deg)` }}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      <div
        className={`absolute inset-0 ${
          isTopTape ? "bg-yellow-300" : "bg-gray-100"
        }`}
      />

      <div
        ref={containerRef}
        className="flex items-center h-full whitespace-nowrap relative z-10"
        style={{
          width: `${duplicatedImages.length * imageWidth}px`,
        }}
      >
        {duplicatedImages.map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-6 flex items-center justify-center hover:scale-110 transition-transform duration-200"
            style={{ width: "140px", height: "60px" }}
          >
            <img
              src={src || "/placeholder.svg"}
              alt={`Brand ${(index % images.length) + 1}`}
              className="max-w-full max-h-full object-contain filter brightness-0 hover:brightness-100 transition-all duration-300"
              style={{
                maxWidth: "120px",
                maxHeight: "50px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Animated Button Component with Vanilla JS
function AnimatedButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Vanilla JS animation function
  const animateElement = (
    element: HTMLElement,
    fromY: number,
    toY: number,
    duration: number,
    callback?: () => void
  ) => {
    const startTime = performance.now();
    const startY = fromY;
    const endY = toY;
    const distance = endY - startY;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentY = startY + distance * easeOut;

      element.style.transform = `translateY(${currentY}%)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (callback) {
        callback();
      }
    };

    requestAnimationFrame(animate);
  };

  // Animate text color with vanilla JS
  const animateTextColor = (
    element: HTMLElement,
    fromColor: string,
    toColor: string,
    duration: number
  ) => {
    const startTime = performance.now();

    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    };

    const startColor = hexToRgb(fromColor);
    const endColor = hexToRgb(toColor);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const r = Math.round(
        startColor.r + (endColor.r - startColor.r) * progress
      );
      const g = Math.round(
        startColor.g + (endColor.g - startColor.g) * progress
      );
      const b = Math.round(
        startColor.b + (endColor.b - startColor.b) * progress
      );

      element.style.color = `rgb(${r}, ${g}, ${b})`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (backgroundRef.current && textRef.current) {
      if (isHovered) {
        // Animate from bottom (100%) to visible (0%)
        animateElement(backgroundRef.current, 100, 0, 500);
        // Change text color to white
        animateTextColor(textRef.current, "#000000", "#ffffff", 300);
      } else {
        // Animate back to bottom (100%)
        animateElement(backgroundRef.current, 0, 100, 500);
        // Change text color to black
        animateTextColor(textRef.current, "#ffffff", "#000000", 300);
      }
    }
  }, [isHovered]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* State Display */}
      <div className="text-sm text-gray-600 mb-2">
        Hover State:{" "}
        <span
          className={`font-semibold ${
            isHovered ? "text-green-600" : "text-red-600"
          }`}
        >
          {isHovered ? "TRUE" : "FALSE"}
        </span>
      </div>

      {/* Main Animated Button */}
      <button
        className="relative px-8 py-4 bg-white text-black border border-gray-300 font-medium rounded-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {/* Fill background - animated with vanilla JS */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 bg-black rounded-full"
          style={{
            transform: "translateY(100%)", // Initial position at bottom
          }}
        />

        {/* Text that changes color with vanilla JS */}
        <span
          ref={textRef}
          className="relative z-10"
          style={{ color: "#000000" }}
        >
          {children}
        </span>
      </button>

      {/* Animation Flow Description */}
      <div className="text-xs text-gray-500 text-center max-w-xs">
        <p>
          <strong>Hover ON:</strong> State = TRUE → Vanilla JS animates from
          translateY(100%) to 0%
        </p>
        <p>
          <strong>Hover LEAVE:</strong> State = FALSE → Vanilla JS animates back
          to translateY(100%)
        </p>
        <p className="mt-2 text-green-600 font-semibold">
          ✅ No Animation Libraries - Pure JavaScript!
        </p>
      </div>
    </div>
  );
}

export default function Component() {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<
    "up" | "down" | "idle"
  >("idle");
  const [isTopTapeHovered, setIsTopTapeHovered] = useState(false);
  const [isBottomTapeHovered, setIsBottomTapeHovered] = useState(false);

  // Vanilla JS scroll detection
  useEffect(() => {
    let lastScrollY = 0;
    let velocityTimeout: NodeJS.Timeout;

    const updateVelocity = () => {
      const currentScrollY = window.scrollY;
      const deltaScroll = currentScrollY - lastScrollY;

      // Determine scroll direction
      if (Math.abs(deltaScroll) > 1) {
        // Threshold to avoid jitter
        if (deltaScroll > 0) {
          setScrollDirection("down");
        } else {
          setScrollDirection("up");
        }
      }

      setScrollVelocity(Math.abs(deltaScroll) * 10); // Scale for visibility

      clearTimeout(velocityTimeout);

      velocityTimeout = setTimeout(() => {
        setScrollVelocity(0);
        setScrollDirection("idle");
      }, 200);

      lastScrollY = currentScrollY;
    };

    // Use requestAnimationFrame for smooth scroll detection
    let rafId: number;
    const scrollLoop = () => {
      updateVelocity();
      rafId = requestAnimationFrame(scrollLoop);
    };
    rafId = requestAnimationFrame(scrollLoop);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(velocityTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1 - With Animated Button */}
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Section 1</h1>
          <p className="text-xl text-gray-600 mb-8">
            Scroll down to see the brand tapes
          </p>
        </div>

        <AnimatedButton onClick={() => console.log("Accessories clicked!")}>
          Accessories
        </AnimatedButton>
      </div>

      {/* Section 2 */}
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Section 2</h2>
          <p className="text-xl text-gray-600">
            Keep scrolling to reach the tapes
          </p>
        </div>
      </div>

      {/* Section 3 - Tape Section */}
      <div className="h-screen flex items-center justify-center bg-white relative overflow-hidden">
        <div className="text-center z-20 relative">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Brand Partners
          </h2>
          <p className="text-xl text-gray-600">
            Seamless infinite loop • Hover to pause
          </p>
        </div>

        {/* Tape container - Full width */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Top Tape - Full width */}
          <div className="absolute w-full h-20 -translate-y-6">
            <ImageTape
              images={topTapeLogos}
              rotation={15}
              baseSpeed={0.3}
              scrollVelocity={scrollVelocity}
              scrollDirection={scrollDirection}
              isTopTape={true}
              isPaused={isTopTapeHovered}
              onHover={setIsTopTapeHovered}
            />
          </div>

          {/* Bottom Tape - Full width */}
          <div className="absolute w-full h-20 translate-y-6">
            <ImageTape
              images={bottomTapeLogos}
              rotation={-15}
              baseSpeed={0.4}
              scrollVelocity={scrollVelocity}
              scrollDirection={scrollDirection}
              reverse={true}
              isTopTape={false}
              isPaused={isBottomTapeHovered}
              onHover={setIsBottomTapeHovered}
            />
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Section 4</h2>
          <p className="text-xl text-gray-600">
            The tapes are above this section
          </p>
        </div>
      </div>

      {/* Section 5 */}
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Section 5</h2>
          <p className="text-xl text-gray-600">
            Final section - scroll back up to test reverse direction
          </p>
        </div>
      </div>

      {/* Debug info - fixed position */}
      <div className="fixed bottom-4 left-4 bg-black/80 text-white px-4 py-2 rounded-lg text-sm z-50">
        <div>Scroll velocity: {Math.abs(scrollVelocity).toFixed(1)}</div>
        <div>
          Direction:{" "}
          {scrollDirection === "idle"
            ? "⏸️ IDLE"
            : scrollDirection === "down"
            ? "⬇️ DOWN"
            : "⬆️ UP"}
        </div>
        <div>Speed: {scrollDirection !== "idle" ? "1.4" : "0.3-0.4"}</div>
        <div>Top tape: {isTopTapeHovered ? "⏸️ PAUSED" : "▶️ Moving"}</div>
        <div>
          Bottom tape: {isBottomTapeHovered ? "⏸️ PAUSED" : "▶️ Moving"}
        </div>
      </div>
    </div>
  );
}
