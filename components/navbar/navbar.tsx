"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { Heart, User } from "lucide-react";
import { gsap } from "gsap";

import { Button } from "@/components/ui/button";
import { IRoute, marketingNavLinks } from "@/constants/marketing-links";
import { MobileMenu } from "../MobileMenu";
import { AnnouncementBar } from "./AnnouncementBar";
import { Logo } from "../Logo";
import { NavLink } from "./NavLink";
import LangSwitcher from "./LangSwitcher";
import { NavLinks } from "./NavLinks";

// Types
interface ScrollState {
  previousScrollY: number;
  isNavbarVisible: boolean;
}

interface MarketingNavbarProps {
  /** Optional className for additional styling */
  className?: string;
}

interface SearchBarProps {
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
}

// Constants
const SCROLL_THRESHOLD = 100; // Minimum scroll distance before hiding navbar
const ANIMATION_DURATION = 0.3;
const SCROLL_THROTTLE_MS = 16; // ~60fps

/**
 * Throttle function to limit the frequency of function calls
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
const throttle = (func: (...args: any[]) => void, limit: number) => {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};




/**
 * Marketing Navbar Component with Scroll Animation
 *
 * Features:
 * - Auto-hide/show based on scroll direction
 * - Smooth GSAP animations
 * - Dynamic background opacity
 * - Performance optimized with throttling
 * - Accessible navigation structure
 * - Memory efficient with proper cleanup
 *
 * Behavior:
 * - At top (scrollY = 0): Always visible with lighter background
 * - Scrolling down (>100px): Hides with slide-up animation
 * - Scrolling up: Shows with slide-down animation
 * - Background becomes more opaque when scrolling for better readability
 *
 * @param props - Component props
 * @param props.className - Optional additional CSS classes
 * @returns JSX.Element - Animated navigation header
 */
export function Navbar({ className = "" }: MarketingNavbarProps) {
  // State management
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [scrollState, setScrollState] = useState<ScrollState>({
    previousScrollY: 0,
    isNavbarVisible: true,
  });

  // Refs
  const navbarRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  /**
   * Handles scroll events with optimized performance
   * Updates navbar visibility and background opacity based on scroll direction
   */
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setScrollState((prevState) => {
      const { previousScrollY, isNavbarVisible } = prevState;

      // Early return if no significant scroll change
      if (Math.abs(currentScrollY - previousScrollY) < 5) return prevState;

      let newVisibility = isNavbarVisible;
      const navbarElement = navbarRef.current;

      if (currentScrollY === 0) {
        // At top - always show with transparent background
        newVisibility = true;
        if (navbarElement) {
          navbarElement.classList.remove("bg-black");
          navbarElement.classList.add("bg-transparent");
        }
      } else if (
        currentScrollY > previousScrollY &&
        currentScrollY > SCROLL_THRESHOLD
      ) {
        // Scrolling down - hide navbar
        newVisibility = false;
        if (navbarElement) {
          navbarElement.classList.remove("bg-transparent");
          navbarElement.classList.add("bg-black");
        }
      } else if (currentScrollY < previousScrollY) {
        // Scrolling up - show navbar with solid black background
        newVisibility = true;
        if (navbarElement) {
          navbarElement.classList.remove("bg-transparent");
          navbarElement.classList.add("bg-black");
        }
      }

      // Only update state if there's a change to prevent unnecessary re-renders
      if (
        newVisibility !== isNavbarVisible ||
        currentScrollY !== previousScrollY
      ) {
        return {
          previousScrollY: currentScrollY,
          isNavbarVisible: newVisibility,
        };
      }

      return prevState;
    });
  }, []);

  /**
   * Setup scroll event listener with cleanup
   */
  useEffect(() => {
    // Create throttled version of handleScroll
    const throttledHandleScroll = throttle(handleScroll, SCROLL_THROTTLE_MS);

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      // Clean up any ongoing animations
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [handleScroll]);

  /**
   * GSAP animation for navbar visibility changes
   * Optimized to prevent animation conflicts and memory leaks
   */
  useEffect(() => {
    const navbarElement = navbarRef.current;
    if (!navbarElement) return;

    // Kill any existing animation to prevent conflicts
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Create new animation
    animationRef.current = gsap.to(navbarElement, {
      y: scrollState.isNavbarVisible ? 0 : -100,
      opacity: scrollState.isNavbarVisible ? 1 : 0,
      duration: ANIMATION_DURATION,
      ease: "power2.out",
      onComplete: () => {
        // Clear reference when animation completes
        animationRef.current = null;
      },
    });

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [scrollState.isNavbarVisible]);

  return (
    <header
      ref={navbarRef}
      className={`container sticky top-0 z-50 w-full border-b border-white/5 backdrop-blur-md bg-transparent transition-colors duration-300 ${className}`}
      role="banner"
      style={{
        boxShadow: '0 1px 0 0 rgba(139, 92, 246, 0.1)',
      }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <NavLinks />

        {/* Action buttons section */}
        <div
          className="flex items-center space-x-4"
          role="toolbar"
          aria-label="User actions"
        >
          <LangSwitcher />
        </div>

        {/* Mobile menu - hidden on desktop */}
        <MobileMenu />
      </div>
    </header>
  );
}
