/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Control } from "react-hook-form";
import React, { ReactNode, TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  control: Control<any>;
  label?: string;
  description?: string;
  icon?: ReactNode; // New icon prop
}

const TextAreaInput = ({
  name,
  control,
  label,
  description,
  icon,
  className,
  ...rest
}: IProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Textarea
                className={`resize-none pr-10 ${className ?? ""}`}
                {...field}
                {...rest}
              />
              {icon && (
                <span className="absolute bottom-2 right-2 text-gray-400 ">
                  {icon}
                </span>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextAreaInput;
