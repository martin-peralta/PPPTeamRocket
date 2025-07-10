// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import pokemonRoutes from './routes/pokemonRoutes.js';
import { loadCardNames } from './cache.js'; // 👈 Se importa la nueva función

dotenv.config();

const app = express();

// Middleware
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


// Conexión a MongoDB Atlas
const connectDB = async () => {
  try {
    // Las opciones 'useNewUrlParser' y 'useUnifiedTopology' ya no son necesarias.
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

// Función para iniciar el servidor de forma ordenada
const startServer = async () => {
  await connectDB();     // 1. Primero conecta a la base de datos.
  await loadCardNames();   // 2. Luego carga el caché de nombres.

  // 3. Finalmente, levanta el servidor.
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

// Iniciar todo el proceso
startServer();