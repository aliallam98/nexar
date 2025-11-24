"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthSchemas } from "../../../../hooks/validations/useAuthSchemas";
import { AuthCard } from "../_components/AuthCard";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useTranslation } from "react-i18next";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const { t } = useTranslation();
  const { resetPasswordSchema } = useAuthSchemas();

  const loading = false;
  const error = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    if (!token || !email) return;

    try {
      console.log(data);
      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
      // Error is handled by the auth context
    }
  };

  return (
    <AuthCard
      title={t("auth:resetPassword.title")}
      subtitle={t("auth:resetPassword.subtitle")}
      footer={
        <>
          {t("auth:resetPassword.rememberPassword")}{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            {t("auth:resetPassword.backToLogin")}
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
        <PasswordInput
          id="password"
          label={t("auth:common.password")}
          required
          {...register("password")}
          error={errors.password?.message as string}
        />

        <PasswordInput
          id="confirmPassword"
          label={t("auth:common.confirmPassword")}
          required
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message as string}
          hideShowIcon
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? t("auth:resetPassword.buttonLoading")
            : t("auth:resetPassword.button")}
        </Button>
      </form>
    </AuthCard>
  );
}
