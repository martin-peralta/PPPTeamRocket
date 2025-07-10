import express from 'express';
// Asegúrate de que solo importas searchCards, ya que es la única que se usa aquí
import { searchCards, getCardById, searchCardsByType } from '../services/pokemonAPI.js';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ message: 'El parámetro "name" es obligatorio.' });
  }
  try {
    // 1. Construir la query formateada que la API espera
    const query = `name:*${name}*`;

    // 2. Pasar la query formateada a la función
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