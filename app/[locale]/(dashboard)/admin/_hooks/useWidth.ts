import { useEffect, useState } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

/**
 * Custom hook to detect current screen width breakpoint
 * Uses window.matchMedia for responsive breakpoint detection
 */
function useWidth(): Breakpoint {
  const [width, setWidth] = useState<Breakpoint>("lg");

  useEffect(() => {
    const getBreakpoint = (): Breakpoint => {
      const windowWidth = window.innerWidth;
      
      if (windowWidth >= breakpoints.xl) return "xl";
      if (windowWidth >= breakpoints.lg) return "lg";
      if (windowWidth >= breakpoints.md) return "md";
      if (windowWidth >= breakpoints.sm) return "sm";
      return "xs";
    };

    const handleResize = () => {
      setWidth(getBreakpoint());
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default useWidth;

export const isWidthDown = (breakpoint: Breakpoint, screenWidth: Breakpoint): boolean => {
  const BREAK_POINTS: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];
  const breakpointIndex = BREAK_POINTS.indexOf(breakpoint);
  const screenWidthIndex = BREAK_POINTS.indexOf(screenWidth);
  if (screenWidthIndex === -1 || breakpointIndex === -1) return false;
  return breakpointIndex >= screenWidthIndex;
};

export const isWidthUp = (breakpoint: Breakpoint, screenWidth: Breakpoint): boolean => {
  const BREAK_POINTS: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];
  const breakpointIndex = BREAK_POINTS.indexOf(breakpoint);
  const screenWidthIndex = BREAK_POINTS.indexOf(screenWidth);
  if (screenWidthIndex === -1 || breakpointIndex === -1) return false;
  return breakpointIndex <= screenWidthIndex;
};
