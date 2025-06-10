import express from 'express';
import User from '../models/UserModel.js';

const router = express.Router();

// Agregar una carta al inventario
router.post('/add', async (req, res) => {
  const { userId, card } = req.body;

  // Validación
  if (!userId || !card?.cardId) {
  return res.status(400).json({ message: 'userId y card.cardId son requeridos.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const exists = user.inventory.some(c => c.cardId === card.cardId);
    if (!exists) {
      user.inventory.push(card);
      await user.save();
    }

    res.status(200).json({ message: 'Carta agregada al inventario.' });
  } catch (error) {
    console.error('🔥 Error en /add:', error);
    res.status(500).json({ message: 'Error al guardar la carta.', error });
  }
});

// Verificar si una carta está en el inventario
router.get('/check/:userId/:cardId', async (req, res) => {
  const { userId, cardId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ exists: false, message: 'User not found' });

    const exists = user.inventory.some(c => c.cardId === cardId);
    res.status(200).json({ exists });
  } catch (error) {
    res.status(500).json({ message: 'Error checking card in inventory', error: error.message });
  }
});

export default router;
