/**
 * Verifica conectividade com Supabase e orienta a criação do schema.
 * Uso: node scripts/setup-db.mjs (lê variáveis do processo ou do .env.local manualmente)
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "❌ Variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY não definidas."
  );
  process.exit(1);
}

// Extrai o project ref da URL para montar o link do dashboard dinamicamente
const projectRef = new URL(SUPABASE_URL).hostname.split(".")[0];

console.log(`🔗 Conectando em: ${SUPABASE_URL}`);

async function testConnection() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    console.log(res.ok ? "✅ Conexão com Supabase OK" : `⚠️  Status: ${res.status}`);
    return res.ok;
  } catch (e) {
    console.error("❌ Falha na conexão:", e.message);
    return false;
  }
}

async function tableExists() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/transactions?limit=1`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  if (res.status === 200) {
    console.log("✅ Tabela 'transactions' já existe");
    return true;
  }
  console.log("⚠️  Tabela 'transactions' não encontrada");
  return false;
}

async function main() {
  const connected = await testConnection();
  if (!connected) {
    console.log("\n💡 Verifique as variáveis no .env.local.");
    process.exit(1);
  }

  const exists = await tableExists();
  if (!exists) {
    const schemaPath = join(__dirname, "..", "supabase", "schema.sql");
    const sql = readFileSync(schemaPath, "utf-8");
    const dashboardUrl = `https://supabase.com/dashboard/project/${projectRef}/sql/new`;

    console.log("\n📋 Execute o SQL abaixo no Supabase Dashboard:");
    console.log(`   → ${dashboardUrl}\n`);
    console.log("─".repeat(60));
    console.log(sql);
    console.log("─".repeat(60));
    console.log("\n💡 Após executar o SQL, rode: npm run dev");
  } else {
    console.log("\n🚀 Banco configurado! Execute: npm run dev");
  }
}

main().catch(console.error);
