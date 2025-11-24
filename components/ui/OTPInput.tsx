"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "../../lib/utils";
import { useCurrentLocale } from "@/hooks/i18next/client";

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  disabled?: boolean;
  className?: string;
}

export function OTPInput({
  length = 6,
  onComplete,
  disabled = false,
  className,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const locale = useCurrentLocale();
  const isRTL = locale === "ar";

  useEffect(() => {
    // Pre-populate refs array
    inputRefs.current = inputRefs.current.slice(0, length);

    // Focus first input on mount
    if (inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [length, disabled]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Only accept single digit
    if (value.length > 1) return;

    // Update OTP state
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if value is entered
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete if all digits are filled
    if (value && index === length - 1) {
      const completeOtp = newOtp.join("");
      if (completeOtp.length === length && onComplete) {
        onComplete(completeOtp);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Allow navigation with arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Only process if pasted data matches expected length
    if (pastedData.length === length && /^\d+$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);

      // Focus last input
      inputRefs.current[length - 1]?.focus();

      // Call onComplete
      if (onComplete) {
        onComplete(pastedData);
      }
    }
  };

  return (
    <div
      className={cn(
        "flex justify-center gap-2",
        isRTL ? "flex-row-reverse" : "",
        className
      )}
    >
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={otp[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          className="w-12 h-12 text-center text-xl"
          disabled={disabled}
          aria-label={`Digit ${index + 1} of OTP`}
        />
      ))}
    </div>
  );
}
