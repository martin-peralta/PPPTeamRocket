import express from 'express';
import { searchCardsByName, getCardById, searchCardsByType } from '../services/pokemonAPI.js';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ message: 'El parámetro "name" es obligatorio.' });
  }
  try {
    const cards = await searchCardsByName(name);
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
