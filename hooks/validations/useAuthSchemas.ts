"use client";

import { useTranslation } from "react-i18next";
import { z } from "zod";

// Function to create schemas with i18n support
export function useAuthSchemas() {
  const { t } = useTranslation("common");

  // Reusable password schema
  const passwordSchema = z
    .string()
    .min(
      8,
      t("validation.minLength", { field: t("auth:common.password"), length: 8 })
    )
    .max(
      100,
      t("validation.maxLength", {
        field: t("auth:common.password"),
        length: 100,
      })
    );
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
  //   t("validation.passwordRequirements")
  // );

  // Sign up schema
  const signUpSchema = z.object({
    name: z
      .string()
      .min(
        2,
        t("validation.minLength", { field: t("auth:common.name"), length: 2 })
      ),
    email: z.string().email(t("validation.email")),
    password: passwordSchema,
  });
  // .refine((data) => data.password === data.confirmPassword, {
  //   message: t("validation.passwordMatch"),
  //   path: ["confirmPassword"],
  // });

  // Login schema
  const loginSchema = z.object({
    email: z.string().email(t("validation.email")),
    password: z
      .string()
      .min(1, t("validation.required", { field: t("auth:common.password") })),
    rememberMe: z.boolean().optional(),
  });

  // Forgot password schema
  const forgotPasswordSchema = z.object({
    email: z.string().email(t("validation.email")),
  });

  // Verify OTP schema
  const verifyOtpSchema = z.object({
    otp: z.string().length(6, t("validation.invalidOtp")),
  });

  // Reset password schema
  const resetPasswordSchema = z
    .object({
      password: passwordSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordMatch"),
      path: ["confirmPassword"],
    });

  return {
    signUpSchema,
    loginSchema,
    forgotPasswordSchema,
    verifyOtpSchema,
    resetPasswordSchema,
  };
}
