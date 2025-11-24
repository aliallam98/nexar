/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthSchemas } from "../../../../hooks/validations/useAuthSchemas";
import { AuthCard } from "../_components/AuthCard";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { forgotPasswordSchema } = useAuthSchemas();
  const error = "";
  const loading = false;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      // Navigate to OTP verification page with email in query params
      router.push(
        `/auth/verify-otp?email=${encodeURIComponent(data.email)}&type=reset`
      );
    } catch (err) {
      console.log(err);
      // Error is handled by the auth context
    }
  };

  return (
    <AuthCard
      title={t("auth:forgotPassword.title")}
      subtitle={t("auth:forgotPassword.subtitle")}
      footer={
        <>
          {t("auth:forgotPassword.rememberPassword")}{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            {t("auth:forgotPassword.backToLogin")}
          </Link>
        </>
      }
    >
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">
            {t("auth:common.email")} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? t("auth:forgotPassword.buttonLoading")
            : t("auth:forgotPassword.button")}
        </Button>
      </form>
    </AuthCard>
  );
}
