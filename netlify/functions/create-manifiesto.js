import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function handler(event) {
  const { titulo, cuerpo } = JSON.parse(event.body);
  const { data, error } = await supabase
    .from('manifiestos')
    .insert([{ titulo, cuerpo }])
    .single();
  return error
    ? { statusCode: 500, body: JSON.stringify({ error }) }
    : { statusCode: 201, body: JSON.stringify(data) };
}
