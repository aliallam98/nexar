"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Variants + sizes
const animatedButtonVariants = cva(
  "relative inline-flex items-center justify-center font-semibold leading-tight tracking-[-0.01em] gap-1.5 overflow-hidden rounded-full transition-colors duration-150 ease-[cubic-bezier(0.77,0,0.175,1)]",
  {
    variants: {
      variant: {
        default: "border-2 border-white text-white hover:text-black",
        destructive:
          "border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
        outline:
          "border-2 border-gray-400 text-gray-400 hover:bg-gray-200 hover:text-black",
        secondary:
          "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
        ghost: "border-2 border-transparent text-gray-700 hover:bg-gray-100",
        link: "border-0 text-blue-600 underline-offset-4 hover:underline",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof animatedButtonVariants> {
  children: React.ReactNode;
  effectColor?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant,
  size,
  className,
  effectColor,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const flairRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const flair = flairRef.current;
    if (!button || !flair) return;

    const xSet = gsap.quickSetter(flair, "xPercent");
    const ySet = gsap.quickSetter(flair, "yPercent");

    const getXY = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const xTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, width, 0, 100),
        gsap.utils.clamp(0, 100)
      );
      const yTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, height, 0, 100),
        gsap.utils.clamp(0, 100)
      );
      return {
        x: xTransformer(e.clientX - left),
        y: yTransformer(e.clientY - top),
      };
    };

    const handleEnter = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      xSet(x);
      ySet(y);
      gsap.to(flair, { scale: 1, duration: 0.4, ease: "power2.out" });
    };

    const handleLeave = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      gsap.killTweensOf(flair);
      gsap.to(flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMove = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2",
      });
    };

    button.addEventListener("mouseenter", handleEnter);
    button.addEventListener("mouseleave", handleLeave);
    button.addEventListener("mousemove", handleMove);

    return () => {
      button.removeEventListener("mouseenter", handleEnter);
      button.removeEventListener("mouseleave", handleLeave);
      button.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={cn(animatedButtonVariants({ variant, size, className }))}
      {...props}
    >
      {/* flair background */}
      <span
        ref={flairRef}
        className="absolute inset-0 scale-0 origin-top-left will-change-transform"
      >
        <span
          className={cn(
            "absolute top-0 left-0 w-[170%] aspect-square rounded-full  -translate-x-1/2 -translate-y-1/2 pointer-events-none",
            effectColor ?? "bg-white"
          )}
        />
      </span>

      {/* label */}
      <span className="relative">{children}</span>
    </button>
  );
};
