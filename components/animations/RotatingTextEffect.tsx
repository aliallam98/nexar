"use client";

import React from "react";

interface RotatingTextEffectProps {
  words: string[];
}

export default function RotatingTextEffect({ words }: RotatingTextEffectProps) {
  const textItems = Array.from({ length: 16 }, (_, i) => i + 1);

  return (
    <>
      <style jsx>{`
        .rotating-text-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          pointer-events: none;
        }

        /* Removed rotating-text-overlay as there's no content to make readable */

        .rotating-text-box {
          transform-style: preserve-3d;
          animation: rotate3d 12s ease-in-out infinite alternate;
        }

        .rotating-text-span {
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.03),
            rgba(0, 0, 0, 0.08) 90%,
            transparent
          ); /* Adjusted gradient for white background */
          text-transform: uppercase;
          line-height: 0.76em;
          position: absolute;
          color: black; /* Changed default text color to black for visibility on white background */
          font-size: clamp(2rem, 4vw, 3.5rem);
          white-space: nowrap;
          font-weight: bold;
          padding: 0px 15px;
          transform-style: preserve-3d;
          text-shadow: 0 15px 25px rgba(0, 0, 0, 0.2); /* Subtle shadow */
          opacity: 0.6; /* Increased opacity for better visibility */
        }

        .rotating-text-span:nth-child(1) {
          transform: translate(-50%, -50%) rotateX(0deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(2) {
          transform: translate(-50%, -50%) rotateX(22.5deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(3) {
          transform: translate(-50%, -50%) rotateX(45deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(4) {
          transform: translate(-50%, -50%) rotateX(67.5deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(5) {
          transform: translate(-50%, -50%) rotateX(90deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(6) {
          transform: translate(-50%, -50%) rotateX(112.5deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(7) {
          transform: translate(-50%, -50%) rotateX(135deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(8) {
          transform: translate(-50%, -50%) rotateX(157.5deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(9) {
          transform: translate(-50%, -50%) rotateX(180deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(10) {
          transform: translate(-50%, -50%) rotateX(202.5deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(11) {
          transform: translate(-50%, -50%) rotateX(225deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(12) {
          transform: translate(-50%, -50%) rotateX(247.5deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(13) {
          transform: translate(-50%, -50%) rotateX(270deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(14) {
          transform: translate(-50%, -50%) rotateX(292.5deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(15) {
          transform: translate(-50%, -50%) rotateX(315deg) translateZ(120px);
        }
        .rotating-text-span:nth-child(16) {
          transform: translate(-50%, -50%) rotateX(337.5deg) translateZ(120px);
        }

        .text-primary-color {
          color: #5c5fc4;
        } /* Purple */
        .text-secondary-color {
          color: #c4c15c;
        } /* Gold */
        .text-default-color {
          color: black;
        } /* Ensure visibility on white background */

        @keyframes rotate3d {
          0% {
            transform: perspective(800px) rotateX(0deg) rotate(2deg);
          }
          100% {
            transform: perspective(200px) rotateX(360deg) rotate(2deg);
          }
        }

        @media (max-width: 768px) {
          .rotating-text-span {
            font-size: 2rem;
            opacity: 0.4; /* Slightly lower opacity for mobile */
          }
        }
      `}</style>

      {/* 3D Rotating Text - Background Effect */}
      <div className="rotating-text-container">
        <div className="rotating-text-box">
          {textItems.map((i) => (
            <span key={i} className="rotating-text-span">
              {words.map((word, wordIndex) => (
                <React.Fragment key={wordIndex}>
                  <i
                    className={
                      wordIndex === 0
                        ? "text-primary-color font-normal"
                        : wordIndex === 1
                        ? "text-default-color"
                        : "text-secondary-color font-normal"
                    }
                  >
                    {word}
                  </i>{" "}
                </React.Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
