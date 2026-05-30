import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Em Next.js 14, cookies() é síncrono — sem async/await.
// O padrão async (await cookies()) é do Next.js 15.
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component: cookies são read-only aqui.
            // O middleware é responsável por persistir a sessão renovada.
          }
        },
      },
    }
  );
}
