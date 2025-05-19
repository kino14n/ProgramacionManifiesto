import { createClient } from "@supabase/supabase-js";

export async function handler() {
  // DEBUG de variables de entorno
  console.log("🔍[env] SUPABASE_URL:", process.env.SUPABASE_URL);
  console.log("🔍[env] SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY ? process.env.SUPABASE_ANON_KEY.slice(0,10) + "…" : "undefined");

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.error("❌ Faltan variables de entorno de Supabase!");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing Supabase environment variables" }),
    };
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  try {
    const { data, error } = await supabase
      .from("manifiestos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("❌ Supabase returned error:", error);
      return { statusCode: 500, body: JSON.stringify({ error }) };
    }
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    console.error("❌ Unexpected fetch error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
