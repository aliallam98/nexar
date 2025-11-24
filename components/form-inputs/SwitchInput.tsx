/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import { Check, Minus } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

interface SwitchInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<any>;
  label?: string;
  description?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  showIcons?: boolean;
}

export function SwitchInput<T extends FieldValues>({
  name,
  control,
  label,
  description,
  loading = false,
  disabled = false,
  className,
  showIcons = true,
}: SwitchInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              "flex flex-row items-center justify-between rounded-lg border p-4",
              className
            )}
          >
            {(label || description) && (
              <div className="space-y-1 leading-none">
                {label && <FormLabel>{label}</FormLabel>}
                {description && (
                  <FormDescription>{description}</FormDescription>
                )}
              </div>
            )}
            <FormControl>
              <button
                type="button"
                role="switch"
                aria-checked={field.value}
                disabled={disabled || loading}
                onClick={() => field.onChange(!field.value)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  field.value ? "bg-primary" : "bg-input",
                  className
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
                    "flex items-center justify-center",
                    field.value ? "translate-x-5" : "translate-x-0"
                  )}
                >
                  {showIcons &&
                    (field.value ? (
                      <Check className="h-3 w-3 text-primary" />
                    ) : (
                      <Minus className="h-3 w-3 text-muted-foreground" />
                    ))}
                </span>
              </button>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
