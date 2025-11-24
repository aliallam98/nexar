// lib/get-server-locale.ts
import { cookies } from "next/headers";

const LANGUAGE_COOKIE_KEY = "lang";

/**
 * Get current locale from cookies (server-side)
 * @returns Current locale or default "en"
 */
export async function getServerLocale(): Promise<string> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(LANGUAGE_COOKIE_KEY);
  return locale?.value || "en";
}
