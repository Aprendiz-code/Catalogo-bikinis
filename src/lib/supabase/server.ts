import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { MOCK_ADMIN_EMAIL } from "@/lib/mock-admin";
import { isMockDataEnabled } from "@/lib/mock-data";

function createMockClient() {
  const buildChain = (table: string) => {
    const chain = {
      select: () => chain,
      eq: () => chain,
      maybeSingle: async () => ({ data: table === "admin_profiles" ? { id: "demo-admin" } : null, error: null }),
      order: () => chain,
      limit: () => chain,
      range: async () => ({ data: [], error: null, count: 0 }),
      single: async () => ({ data: {}, error: null }),
      insert: () => chain,
      update: () => chain,
      delete: () => chain,
    };
    return chain;
  };

  return {
    auth: {
      getUser: async () => ({
        data: {
          user: { id: "demo-admin", email: MOCK_ADMIN_EMAIL },
        },
        error: null,
      }),
      signOut: async () => ({ error: null }),
    },
    from: (table: string) => buildChain(table),
    storage: {
      from: () => ({
        remove: async () => ({ data: null, error: null }),
      }),
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
}

export async function createClient() {
  const cookieStore = await cookies();

  if (isMockDataEnabled()) {
    return createMockClient();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Your project's URL and Key are required to create a Supabase client.");
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component; middleware will refresh sessions.
        }
      },
    },
  });
}
