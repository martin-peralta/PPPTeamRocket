import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './TRdb.js';
import authRoutes from './routes/authRoutes.js';
import cardRoutes from './routes/cardRoutes.js'; 

dotenv.config();
connectDB(); 

const app = express();
app.use(cors());
app.use(express.json());

// Rutas (user y cartas)
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes); 


app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
