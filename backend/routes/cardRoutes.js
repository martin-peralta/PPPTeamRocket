import express from 'express';
import User from '../models/UserModel.js';

const router = express.Router();

// Agregar una carta al inventario del usuario

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

// Verificar si una carta ya está en el inventario

router.get('/check/:userId/:cardId', async (req, res) => {
  const { userId, cardId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ exists: false, message: 'Usuario no encontrado.' });

    const exists = user.inventory.some(c => c.cardId === cardId);
    res.status(200).json({ exists });
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar carta en inventario.', error: error.message });
  }
});


// Obtener el inventario completo del usuario

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    res.status(200).json({ cards: user.inventory });
  } catch (error) {
    console.error('🔥 Error en GET /user/:userId:', error);
    res.status(500).json({ message: 'Error al obtener el inventario.', error: error.message });
  }
});

// Eliminar una carta del inventario del usuario

router.delete('/remove/:userId/:cardId', async (req, res) => {
  const { userId, cardId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    user.inventory = user.inventory.filter(card => card.cardId !== cardId);
    await user.save();

    res.status(200).json({ message: 'Carta eliminada del inventario.' });
  } catch (error) {
    console.error('🔥 Error en DELETE /remove:', error);
    res.status(500).json({ message: 'Error al eliminar la carta.', error: error.message });
  }
});

export default router;
