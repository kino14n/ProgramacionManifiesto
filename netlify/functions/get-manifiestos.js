import { createClient } from 'supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function handler() {
  const { data, error } = await supabase
    .from('manifiestos')
    .select('*')
    .order('created_at', { ascending: false });
  return error
    ? { statusCode: 500, body: JSON.stringify({ error }) }
    : { statusCode: 200, body: JSON.stringify(data) };
}
