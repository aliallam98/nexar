"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthSchemas } from "../../../../hooks/validations/useAuthSchemas";
import { AuthCard } from "../_components/AuthCard";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "@/graphql/mutations/auth/login.generated";
import { useAuth } from "../../../../context/AuthContext";
import { User } from "@/graphql/types";
import { red } from "@mui/material/colors";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { t } = useTranslation();
  const { loginSchema } = useAuthSchemas();
  const { setUser } = useAuth();
  const [login, { loading, error }] = useLoginMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const results = await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      setUser(results.data?.login.user as User);
      if (results.data?.login.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      // Error is handled by the auth context
      console.log(err);
    }
  };

  return (
    <AuthCard
      title={t("auth:login.title")}
      subtitle={t("auth:login.subtitle")}
      footer={
        <>
          {t("auth:login.noAccount")}{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            {t("auth:login.signUp")}
          </Link>
        </>
      }
    >
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error.message}</AlertDescription>
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

        <PasswordInput
          id="password"
          label={t("auth:common.password")}
          required
          {...register("password")}
          error={errors.password?.message as string}
          hideShowIcon
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="rememberMe" {...register("rememberMe")} />
            <Label htmlFor="rememberMe" className="text-sm font-normal">
              {t("auth:login.rememberMe")}
            </Label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            {t("auth:login.forgotPassword")}
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t("auth:login.buttonLoading") : t("auth:login.button")}
        </Button>
      </form>
    </AuthCard>
  );
}
