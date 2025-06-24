import express from 'express';
import cors from 'cors';  // Importa el middleware CORS
import dotenv from 'dotenv';
import connectDB from './TRdb.js';
import authRoutes from './routes/authRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import pokemonRoutes from './routes/pokemonRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/pokemon', pokemonRoutes); 

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
