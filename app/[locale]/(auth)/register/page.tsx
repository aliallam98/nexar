"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCard } from "../_components/AuthCard";
import { useAuthSchemas } from "../../../../hooks/validations/useAuthSchemas";
import { useTranslation } from "react-i18next";
import { useRegisterMutation } from "@/graphql/mutations/auth/register.generated";

export default function SignUpPage() {
  const { t } = useTranslation();
  const [registerMutation, { loading, error }] = useRegisterMutation();
  const { signUpSchema } = useAuthSchemas();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log({ data });
    const results = await registerMutation({
      variables: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    // Add Type here came form codegen
    try {
      // await signup(data.name, data.email, data.password);
      // Redirect will be handled by the API response
    } catch (error) {
      // Error is handled by the auth context
      console.log({ error });
    }
  };

  return (
    <AuthCard
      title={t("auth:signUp.title")}
      subtitle={t("auth:signUp.subtitle")}
      footer={
        <>
          {t("auth:signUp.hasAccount")}{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            {t("auth:signUp.signIn")}
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
          <Label htmlFor="name">
            {t("auth:common.name")} <span className="text-red-500">*</span>
          </Label>
          <Input id="name" placeholder="John Doe" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message as string}
            </p>
          )}
        </div>

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
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t("auth:signUp.buttonLoading") : t("auth:signUp.button")}
        </Button>
      </form>
    </AuthCard>
  );
}
