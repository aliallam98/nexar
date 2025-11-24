"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "../../lib/utils";
import { useTranslation } from "react-i18next";
import InfoButton from "../InfoButton";
import ToolTipWrapper from "../ToolTipWrapper";

interface PasswordInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  defaultValue?: string;
  hideShowIcon?: boolean;
}

export function PasswordInput({
  id,
  label,
  placeholder,
  error,
  hideShowIcon,
  ...inputProps
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation("auth");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <Label htmlFor={id} className="text-sm font-medium">
            {label}{" "}
            {inputProps.required && <span className="text-red-500">*</span>}
          </Label>
        </div>
      )}
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          id={id}
          {...inputProps} // <-- spread RHF props here
          className="pr-10"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {!hideShowIcon && (
          <InfoButton
            ariaLabel="passwordInfo"
            tipMessage="passwordRequirements"
          />
        )}

        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
          onClick={togglePasswordVisibility}
          tabIndex={-1}
          aria-label={showPassword ? t("passwordHide") : t("passwordShow")}
        >
          <ToolTipWrapper
            tipMessage={showPassword ? t("passwordHide") : t("passwordShow")}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </ToolTipWrapper>
        </button>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm text-red-500"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
