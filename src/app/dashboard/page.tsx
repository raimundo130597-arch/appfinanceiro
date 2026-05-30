import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <DashboardClient
      userEmail={user?.email ?? ""}
      userId={user?.id ?? ""}
    />
  );
}
