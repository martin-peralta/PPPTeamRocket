import express from 'express';
import PokemonCard from '../models/PokemonCardModel.js';

const router = express.Router();

// Crear una carta nueva
router.post('/', async (req, res) => {
  try {
    const nuevaCarta = new PokemonCard(req.body);
    await nuevaCarta.save();
    res.status(201).json(nuevaCarta);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la carta', error });
  }
});

// Obtener todas las cartas
router.get('/', async (req, res) => {
  try {
    const cartas = await PokemonCard.find();
    res.status(200).json(cartas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las cartas', error });
  }
});

// Obtener una carta por ID
router.get('/:id', async (req, res) => {
  try {
    const carta = await PokemonCard.findById(req.params.id);
    if (!carta) {
      return res.status(404).json({ message: 'Carta no encontrada' });
    }
    res.status(200).json(carta);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar la carta', error });
  }
});

export default router;
