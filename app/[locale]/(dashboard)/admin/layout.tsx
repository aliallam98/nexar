import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ThemeProvider } from "../../../../theme/ThemeProvider";
import { AdminLayoutWrapper } from "./components/AdminLayoutWrapper";

interface AdminLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  // if (!token) {
  //   redirect(`/${locale}/login`);
  // }

  return (
    <ThemeProvider>
      <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
    </ThemeProvider>
  );
}
