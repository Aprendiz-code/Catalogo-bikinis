import { isMockDataEnabled } from "@/lib/mock-data";

export const MOCK_ADMIN_EMAIL = "admin@demo.local";
export const MOCK_ADMIN_PASSWORD = "admin123";
export const MOCK_ADMIN_SESSION_VALUE = "demo-admin";

export function hasMockAdminSessionCookie(cookies?: {
  get: (name: string) => { value?: string } | undefined;
}) {
  if (!isMockDataEnabled()) return false;
  return cookies?.get("mock_admin_session")?.value === MOCK_ADMIN_SESSION_VALUE;
}
