import React from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";

interface FormBuilderProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode | ((methods: UseFormReturn<T>) => React.ReactNode);
  className?: string;
}

export const FormBuilder = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormBuilderProps<T>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={className}
        noValidate
      >
        {typeof children === "function" ? children(form) : children}
      </form>
    </Form>
  );
};
