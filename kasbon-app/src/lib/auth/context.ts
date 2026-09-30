import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";

export async function getAuthenticatedContext(request: Request) {
  const authorization = request.headers.get("authorization");
  const bearerToken = authorization?.match(/^Bearer\s+(\S+)$/i)?.[1];

  if (authorization && !bearerToken) {
    return null;
  }

  let supabase;

  if (bearerToken) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Konfigurasi Supabase belum lengkap.");
    }

    supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${bearerToken}` } },
    });
  } else {
    supabase = await createClient();
  }

  const { data, error } = await supabase.auth.getClaims(bearerToken);

  const claims = data?.claims;
  const userId = typeof claims?.sub === "string" ? claims.sub : null;

  if (error || !userId) {
    return null;
  }

  return {
    supabase,
    userId,
  };
}
