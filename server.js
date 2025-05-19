const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Cliente Supabase
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// JSON Middleware
app.use(express.json());

// Endpoints API
app.get('/api/manifiestos', async (_, res) => {
  const { data, error } = await supabase
    .from('manifiestos')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/api/manifiestos', async (req, res) => {
  const { titulo, cuerpo } = req.body;
  const { data, error } = await supabase
    .from('manifiestos')
    .insert([{ titulo, cuerpo }])
    .single();
  if (error) return res.status(500).json({ error });
  res.status(201).json(data);
});

// Sirve el frontend React desde /build
const FRONTEND_FOLDER = 'build';
app.use(express.static(path.join(__dirname, FRONTEND_FOLDER)));
app.get('*', (_req, res) =>
  res.sendFile(path.join(__dirname, FRONTEND_FOLDER, 'index.html'))
);

// Arranca el servidor
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
