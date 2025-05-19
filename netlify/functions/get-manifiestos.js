import { createClient } from "@supabase/supabase-js";

export async function handler() {
  console.log("🔍 SUPABASE_URL:", process.env.SUPABASE_URL);
  console.log("🔍 SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY?.slice(0,10) + "…");

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase
    .from('manifiestos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("❌ Supabase error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
