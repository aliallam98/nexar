import React, { useEffect, useRef, PropsWithChildren } from "react";

interface StyledButtonProps {
  className?: string;
  onClick?: () => void;
}

export const StyledButton: React.FC<PropsWithChildren<StyledButtonProps>> = ({
  children,
  className = "",
  onClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const updateRect = () => {
      if (buttonRef.current) {
        rectRef.current = buttonRef.current.getBoundingClientRect();
      }
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!circleRef.current || !rectRef.current) return;

    const x = e.clientX - rectRef.current.left;
    const y = e.clientY - rectRef.current.top;

    circleRef.current.style.left = `${x}px`;
    circleRef.current.style.top = `${y}px`;

    circleRef.current.style.transform = `translate(-50%, -50%) scale(1)`;
  };

  const handleMouseLeave = () => {
    if (circleRef.current) {
      circleRef.current.style.transform = `translate(-50%, -50%) scale(0)`;
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        className={`styled-button ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          color: "black", //"var(--color-accent)"
        }}
      >
        <div className="circle" ref={circleRef} />
        <span className="content">{children}</span>
      </button>

      <style>{`
        .styled-button {
          position: relative;
          display: inline-grid;
          place-items: center;
          overflow: hidden;
          border: 2px solid currentColor;
          border-radius: 2.5rem;
          padding: 1rem 2.5rem;
          font-size: 1.5rem;
          font-weight: 600;
          background: transparent;
          color: black;
          cursor: pointer;
          transition: color 0.3s ease-in-out;
        }

        .styled-button .circle {
          position: absolute;
          width: 175%;
          aspect-ratio: 1;
          background-color: black;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          transform-origin: center;
          transition: transform 0.4s ease, top 0.2s, left 0.2s;
          pointer-events: none;
          z-index: 0;
        }

        .styled-button .content {
          position: relative;
          z-index: 1;
          transition: color 0.2s ease-in-out;
        }

        .styled-button:hover .content {
          color: white
        }
      `}</style>
    </>
  );
};
