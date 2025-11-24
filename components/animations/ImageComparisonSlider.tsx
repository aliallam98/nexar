"use client";
import React, { useState, useRef, useCallback } from "react";

interface ImageComparisonSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeTitle?: string;
  afterTitle?: string;
  beforeSubtitle?: string;
  afterSubtitle?: string;
  showLabels?: boolean;
  applyFilters?: boolean;
  className?: string;
  style?: React.CSSProperties;
  sectionTitle?: string;
}

const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({
  beforeImage,
  afterImage,
  beforeTitle,
  afterTitle,
  beforeSubtitle,
  afterSubtitle,
  showLabels = true,
  applyFilters = true,
  className,
  style,
  sectionTitle,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSlider = useCallback((clientX: number): void => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>): void => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>): void => {
    setIsDragging(true);
    e.preventDefault();
  };

  React.useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent): void => handleMouseMove(e);
    const handleGlobalMouseUp = (): void => handleMouseUp();
    const handleGlobalTouchMove = (e: TouchEvent): void => {
      if (isDragging) {
        e.preventDefault();
        updateSlider(e.touches[0].clientX);
      }
    };
    const handleGlobalTouchEnd = (): void => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("touchmove", handleGlobalTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleGlobalTouchEnd);
    }

    return (): void => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchmove", handleGlobalTouchMove);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, [isDragging, updateSlider]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "ArrowLeft") {
        setSliderPosition((prev: number) => Math.max(0, prev - 5));
      } else if (e.key === "ArrowRight") {
        setSliderPosition((prev: number) => Math.min(100, prev + 5));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return (): void => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filterStyle: React.CSSProperties = applyFilters
    ? { filter: "grayscale(100%) contrast(1.2)" }
    : {};

  return (
    <div className={`image-comparison-container ${className}`} style={style}>
      {sectionTitle && (
        <h3
          className="text-center text-2xl md:text-4xl lg:text-6xl mb-6 font-semibold 
             bg-gradient-to-br from-yellow-400 via-yellow-600 to-black 
             bg-clip-text text-transparent"
        >
          {sectionTitle}
        </h3>
      )}
      <div
        ref={containerRef}
        className="image-comparison"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          aspectRatio: "16/9",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
          userSelect: "none",
          margin: "0 auto",
        }}
      >
        {/* Before Image (Base Layer) */}
        <div
          className="comparison__before"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${beforeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            ...filterStyle,
          }}
        >
          {showLabels && (
            <div
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "2rem",
                display: "grid",
                gap: "0.5rem",
                textAlign: "left",
                opacity: isDragging ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 300,
                  opacity: 0.9,
                  letterSpacing: "2px",
                  color: "white",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                  margin: 0,
                }}
              >
                {beforeSubtitle}
              </p>
              <p
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  color: "white",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                {beforeTitle}
              </p>
            </div>
          )}
        </div>

        {/* After Image (Clipped Layer) */}
        <div
          className="comparison__after"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            backgroundImage: `url(${afterImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`,
            transition: isDragging ? "none" : "clip-path 0.1s ease-out",
            ...filterStyle,
          }}
        >
          {showLabels && (
            <div
              style={{
                position: "absolute",
                bottom: "2rem",
                right: "2rem",
                display: "grid",
                gap: "0.5rem",
                textAlign: "right",
                opacity: isDragging ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 300,
                  opacity: 0.9,
                  letterSpacing: "2px",
                  color: "white",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                  margin: 0,
                }}
              >
                {afterSubtitle}
              </p>
              <p
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  color: "white",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                {afterTitle}
              </p>
            </div>
          )}
        </div>

        {/* Divider Line - Full height and draggable */}
        <div
          className="hover:cursor-ew-resize"
          style={{
            position: "absolute",
            top: 0,
            left: `${sliderPosition}%`,
            transform: "translateX(-50%)",
            width: "5px",
            height: "100%",
            background: "white",
            zIndex: 8,
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />

        {/* Slider Button with Drag Icon */}
        <button
          className="slider-button hover:cursor-ew-resize"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          aria-label="Drag to compare images"
          type="button"
          style={{
            position: "absolute",
            top: "50%",
            left: `${sliderPosition}%`,
            transform: `translate(-50%, -50%)`,
            width: "50px",
            height: "85px",
            background: "white",
            border: "none",
            borderRadius: "24px",
            zIndex: 10,
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Three vertical lines icon */}
          <div
            style={{
              display: "flex",
              gap: "3px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "2px",
                height: "16px",
                background: "#666",
                borderRadius: "1px",
              }}
            />
            <div
              style={{
                width: "2px",
                height: "16px",
                background: "#666",
                borderRadius: "1px",
              }}
            />
            <div
              style={{
                width: "2px",
                height: "16px",
                background: "#666",
                borderRadius: "1px",
              }}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ImageComparisonSlider;
