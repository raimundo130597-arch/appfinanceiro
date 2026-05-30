/**
 * Script de diagnóstico de conexão com Supabase.
 * Uso: NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... node scripts/test-supabase.mjs
 * Ou com .env.local: npx dotenv -e .env.local -- node scripts/test-supabase.mjs
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "❌ Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY antes de rodar este script."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("🔗 Testando conexão com Supabase...");

const { data, error } = await supabase
  .from("transactions")
  .select("count")
  .limit(1);

if (error) {
  console.log("❌ Erro:", error.message);
  console.log("   Code:", error.code);
} else {
  console.log("✅ Tabela transactions acessível:", data);
}

const { data: authData, error: authError } = await supabase.auth.getSession();
console.log(
  "\n🔑 Auth status:",
  authError
    ? authError.message
    : "OK - " + (authData?.session ? "com sessão" : "sem sessão ativa")
);
