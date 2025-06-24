import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // Asegúrate de tener esto si no usas connectDB
import authRoutes from './routes/authRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import pokemonRoutes from './routes/pokemonRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

connectDB();

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
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
