import express from 'express';
// 👇 1. Importamos las nuevas funciones desde tu servicio de API
import { 
  searchCards, 
  getCardById, 
  searchCardsByType,
  getRarities,
  getTypes
} from '../services/pokemonAPI.js';

const router = express.Router();

// --- RUTAS NUEVAS PARA LOS FILTROS ---

// Ruta para obtener todas las rarezas
router.get('/rarities', async (req, res) => {
  try {
    const rarities = await getRarities();
    res.json(rarities);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las rarezas.' });
  }
});

// Ruta para obtener todos los tipos
router.get('/types', async (req, res) => {
  try {
    const types = await getTypes();
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tipos.' });
  }
});


// --- RUTAS EXISTENTES ---

router.get('/search', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ message: 'El parámetro "name" es obligatorio.' });
  }
  try {
    const query = `name:*${name}*`;
    const cards = await searchCards(query);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar cartas.', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const card = await getCardById(id);
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la carta.', error: error.message });
  }
});

router.get('/type/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const cards = await searchCardsByType(type);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar cartas por tipo.', error: error.message });
  }
});

export default router;