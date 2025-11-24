/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "../../lib/utils";
import { Loader } from "lucide-react";

interface TextInputComponentProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: Path<T>;
  label: string;
  control: Control<any>;
  loading?: boolean;
  description?: string;
  /** Icon rendered inside the input on the left */
  leftIcon?: React.ReactNode;
  /** Icon rendered inside the input on the right */
  rightIcon?: React.ReactNode;
}

// Instead of an empty interface, explicitly pick the needed props
type LoadingInputProps = Pick<
  TextInputComponentProps<any>,
  "label" | "className" | "description" | "placeholder" | "disabled" | "type"
>;

/**
 * Loading state component for text inputs.
 */
function LoadingInput({
  label,
  className,
  description,
  ...props
}: LoadingInputProps) {
  return (
    <FormItem className={cn("opacity-50 pointer-events-none", className)}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input disabled placeholder="Loading…" {...props} />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Loader
              size={20}
              strokeWidth={1.5}
              className="animate-spin text-muted-foreground"
            />
          </div>
        </div>
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
    </FormItem>
  );
}

/**
 * Reusable text input component with optional loading state,
 * left and right icons, and reserved error space.
 */
export function TextInput<T extends FieldValues>({
  name,
  label,
  control,
  loading = false,
  description,
  leftIcon,
  rightIcon,
  className,
  ...inputProps
}: TextInputComponentProps<T>) {
  // Loading state
  if (loading) {
    return (
      <LoadingInput
        label={label}
        className={className}
        description={description}
        {...inputProps}
      />
    );
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {error?.type === "required" && (
              <span className="text-destructive ml-1">*</span>
            )}
          </FormLabel>
          <FormControl>
            <div className="relative">
              {leftIcon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                  {leftIcon}
                </div>
              )}
              <Input
                placeholder={inputProps.placeholder}
                {...field}
                value={field.value ?? ""}
                className={cn(
                  leftIcon && "pl-10",
                  rightIcon && "pr-10",
                  className
                )}
                {...inputProps}
              />
              {rightIcon && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
                  {rightIcon}
                </div>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
