import initTranslations from "../i18n";
import { dir } from "i18next";
import { Toaster } from "sonner";
import { TooltipProvider } from "../../components/ui/tooltip";
import LanguageProvider from "../../i18n/LanguageProvider";
import { AuthProvider } from "../../context/AuthContext";
import ApolloProviderWrapper from "../../apollo/ApolloProviderWrapper";

import "./globals.css";

const i18nNamespaces = ["auth", "common", "main", "breadcrumb", "sidebar"];

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ApolloProviderWrapper>
            <LanguageProvider
              namespaces={i18nNamespaces}
              locale={locale}
              resources={resources}
            >
              <TooltipProvider>
                <main>{children}</main>
                <Toaster />
              </TooltipProvider>
            </LanguageProvider>
          </ApolloProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
