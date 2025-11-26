const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware CORS liberado
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

// Dados
let items = [
  { id: 1, title: 'Comprar café', description: 'Marca premium' },
  { id: 2, title: 'Estudar React Native', description: 'Focar em Hooks' },
];

// Rotas
app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Título obrigatório' });
  
  const newItem = { 
    id: Date.now(), 
    title: title.trim(), 
    description: (description || '').trim() 
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  
  const item = items.find(item => item.id == id);
  if (!item) return res.status(404).json({ error: 'Item não encontrado' });
  
  if (title) item.title = title.trim();
  if (description !== undefined) item.description = description.trim();
  
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id == id);
  
  if (index === -1) return res.status(404).json({ error: 'Item não encontrado' });
  
  const deletedItem = items.splice(index, 1);
  res.json(deletedItem[0]);
});

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando via Tunnel!',
    totalItems: items.length 
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 URL Local: http://localhost:${PORT}`);
});