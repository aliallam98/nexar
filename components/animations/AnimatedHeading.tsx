"use client";
import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { gsap } from "gsap";

// Define all available effect types
export type HeadingEffect =
  | "fadeSlideUp"
  | "revealCover"
  | "splitReveal"
  | "charReveal"
  | "scaleBlur"
  | "typewriter"
  | "morphSlide"
  | "glitch"
  | "liquidFill"
  | "bounceIn"
  | "perspective3D"
  | "neonGlow";

// Component props interface
export interface HeadingEffectsProps {
  /** The text content to animate */
  text?: string;
  /** The animation effect to apply */
  effect?: HeadingEffect;
  /** Additional CSS classes */
  className?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Whether the component should be visible/active */
  isActive?: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
}

export interface AnimatedHeadingRef {
  trigger: () => void;
  reset: () => void;
}

export const AnimatedHeading = forwardRef<
  AnimatedHeadingRef,
  HeadingEffectsProps
>(
  (
    {
      text = "Award Winning Design",
      effect = "fadeSlideUp",
      className = "",
      delay = 0,
      duration = 1,
      isActive = true,
      onComplete,
    },
    ref
  ) => {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const charsRef = useRef<HTMLSpanElement[]>([]);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const runAnimation = () => {
      const heading = headingRef.current;
      const overlay = overlayRef.current;

      if (!heading) return;

      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Reset styles
      gsap.set(heading, { clearProps: "all" });
      if (overlay) gsap.set(overlay, { clearProps: "all" });

      // Split text into characters for some effects
      if (
        effect === "charReveal" ||
        effect === "typewriter" ||
        effect === "glitch"
      ) {
        const chars = text
          .split("")
          .map(
            (char, i) =>
              `<span key="${i}" style="display: inline-block; opacity: 0;">${
                char === " " ? "&nbsp;" : char
              }</span>`
          )
          .join("");
        heading.innerHTML = chars;
        charsRef.current = Array.from(heading.querySelectorAll("span"));
      } else {
        heading.innerHTML = text;
      }

      const tl = gsap.timeline({
        delay,
        onComplete: onComplete,
      });
      timelineRef.current = tl;

      switch (effect) {
        case "fadeSlideUp":
          gsap.set(heading, { opacity: 0, y: 50 });
          tl.to(heading, {
            opacity: 1,
            y: 0,
            duration,
            ease: "power3.out",
          });
          break;

        case "revealCover":
          gsap.set(heading, { opacity: 1 });
          gsap.set(overlay, {
            scaleX: 1,
            transformOrigin: "left center",
            backgroundColor: "#000",
          });
          tl.to(overlay, {
            scaleX: 0,
            duration,
            ease: "power3.inOut",
            transformOrigin: "right center",
          });
          break;

        case "splitReveal":
          const words = text.split(" ");
          heading.innerHTML = words
            .map(
              (word) =>
                `<span style="display: inline-block; overflow: hidden;">
            <span style="display: inline-block; transform: translateY(100%);">${word}</span>
          </span>&nbsp;`
            )
            .join("");
          const wordSpans = heading.querySelectorAll("span span");
          tl.to(wordSpans, {
            y: 0,
            duration: duration * 0.8,
            stagger: 0.1,
            ease: "power3.out",
          });
          break;

        case "charReveal":
          tl.to(charsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.03,
            ease: "back.out(1.7)",
          });
          break;

        case "scaleBlur":
          gsap.set(heading, {
            opacity: 0,
            scale: 1.2,
            filter: "blur(10px)",
          });
          tl.to(heading, {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration,
            ease: "power3.out",
          });
          break;

        case "typewriter":
          gsap.set(heading, {
            borderRight: "2px solid #333",
          });
          tl.to(charsRef.current, {
            opacity: 1,
            duration: 0.05,
            stagger: 0.05,
            ease: "none",
          }).to(
            heading,
            {
              borderRight: "2px solid transparent",
              duration: 0.5,
              repeat: 3,
              yoyo: true,
              ease: "power2.inOut",
            },
            "-=0.5"
          );
          break;

        case "morphSlide":
          gsap.set(heading, {
            opacity: 0,
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          });
          tl.to(heading, {
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            duration,
            ease: "power3.out",
          });
          break;

        case "glitch":
          tl.to(charsRef.current, {
            opacity: 1,
            duration: 0.1,
            stagger: {
              amount: 0.5,
              from: "random",
            },
            ease: "power2.inOut",
          })
            .to(
              heading,
              {
                textShadow: "2px 0 #ff0000, -2px 0 #00ff00",
                duration: 0.1,
                repeat: 3,
                yoyo: true,
                ease: "power2.inOut",
              },
              0.2
            )
            .to(heading, {
              textShadow: "none",
              duration: 0.1,
            });
          break;

        case "liquidFill":
          gsap.set(heading, {
            background:
              "linear-gradient(90deg, #333 0%, #333 0%, transparent 0%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            border: "1px solid #333",
          });
          tl.to(heading, {
            background:
              "linear-gradient(90deg, #333 0%, #333 100%, transparent 100%)",
            duration,
            ease: "power3.inOut",
          }).to(heading, {
            color: "#333",
            border: "none",
            background: "none",
            duration: 0.1,
          });
          break;

        case "bounceIn":
          gsap.set(heading, {
            opacity: 0,
            scale: 0.3,
            rotation: -15,
          });
          tl.to(heading, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration,
            ease: "elastic.out(1, 0.5)",
          });
          break;

        case "perspective3D":
          gsap.set(heading, {
            opacity: 0,
            rotationX: -90,
            transformOrigin: "50% 100%",
            transformPerspective: 1000,
          });
          tl.to(heading, {
            opacity: 1,
            rotationX: 0,
            duration,
            ease: "back.out(1.7)",
          });
          break;

        case "neonGlow":
          gsap.set(heading, {
            opacity: 0,
            textShadow: "none",
          });
          tl.to(heading, {
            opacity: 1,
            textShadow: "0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88",
            duration,
            ease: "power3.out",
          });
          break;

        default:
          tl.to(heading, {
            opacity: 1,
            duration,
            ease: "power3.out",
          });
      }
    };

    const resetAnimation = () => {
      const heading = headingRef.current;
      const overlay = overlayRef.current;

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      if (heading) {
        gsap.set(heading, { opacity: 0, clearProps: "all" });
        heading.innerHTML = text;
      }

      if (overlay) {
        gsap.set(overlay, { clearProps: "all" });
      }
    };

    useImperativeHandle(ref, () => ({
      trigger: runAnimation,
      reset: resetAnimation,
    }));

    useEffect(() => {
      if (isActive) {
        runAnimation();
      } else {
        resetAnimation();
      }

      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill();
        }
      };
    }, [text, effect, delay, duration, isActive]);

    const baseClasses = "text-6xl font-bold mb-8 relative";

    return (
      <div className="relative inline-block">
        <h1
          ref={headingRef}
          className={`${baseClasses} ${className}`}
          style={{
            opacity: 0,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {text}
        </h1>
        {effect === "revealCover" && (
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black"
            style={{ transformOrigin: "left center" }}
          />
        )}
      </div>
    );
  }
);

AnimatedHeading.displayName = "AnimatedHeading";
