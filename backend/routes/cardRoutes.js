import express from 'express';
import User from '../models/UserModel.js';

const router = express.Router();

// Agregar carta al inventario
router.post('/add', async (req, res) => {
  const { userId, card } = req.body;

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
    console.error('Error en /add:', error);
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

// Obtener inventario
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    res.status(200).json({ cards: user.inventory });
  } catch (error) {
    console.error('Error en GET /user/:userId:', error);
    res.status(500).json({ message: 'Error al obtener el inventario.', error: error.message });
  }
});

// Eliminar carta del inventario
router.delete('/remove/:userId/:cardId', async (req, res) => {
  const { userId, cardId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    user.inventory = user.inventory.filter(card => card.cardId !== cardId);
    await user.save();

    res.status(200).json({ message: 'Carta eliminada del inventario.' });
  } catch (error) {
    console.error('Error en DELETE /remove:', error);
    res.status(500).json({ message: 'Error al eliminar la carta.', error: error.message });
  }
});

// Crear colección con cartas
router.post('/collections/create', async (req, res) => {
  const { userId, collectionName, description, cards } = req.body;

  if (!userId || !collectionName) {
    return res.status(400).json({ message: 'userId y collectionName son requeridos.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const exists = user.collections.some(col => col.name === collectionName);
    if (exists) {
      return res.status(400).json({ message: 'Ya existe una colección con este nombre.' });
    }

    const newCollection = {
      name: collectionName,
      description: description || '',
      cards: (cards || []).map(cardId => ({ cardId }))
    };

    user.collections.push(newCollection);
    await user.save();

    res.status(200).json({ message: 'Colección creada con éxito.' });
  } catch (error) {
    console.error('Error creando la colección:', error);
    res.status(500).json({ message: 'Error al crear la colección.', error });
  }
});

// Obtener todas las colecciones
router.get('/collections/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    res.status(200).json({ collections: user.collections });
  } catch (error) {
    console.error('Error en GET /collections/:userId:', error);
    res.status(500).json({ message: 'Error al obtener las colecciones.', error: error.message });
  }
});

router.get('/collections/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    res.status(200).json({ collections: user.collections });
  } catch (error) {
    console.error('Error en GET /collections/user/:userId:', error);
    res.status(500).json({ message: 'Error al obtener las colecciones.', error: error.message });
  }
});

// Añadir carta a colección específica
router.post('/collections/add-card', async (req, res) => {
  const { userId, collectionName, cardId } = req.body;

  if (!userId || !collectionName || !cardId) {
    return res.status(400).json({ message: 'userId, collectionName y cardId son requeridos.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const collection = user.collections.find(col => col.name === collectionName);
    if (!collection) {
      return res.status(404).json({ message: 'Colección no encontrada.' });
    }

    const exists = collection.cards.some(c => c.cardId === cardId);
    if (!exists) {
      collection.cards.push({ cardId });
      await user.save();
    }

    res.status(200).json({ message: 'Carta añadida a la colección.' });
  } catch (error) {
    console.error('Error añadiendo carta a la colección:', error);
    res.status(500).json({ message: 'Error al añadir carta a la colección.', error });
  }
});

// Obtener colección por nombre
router.get('/collections/detail/:userId/:collectionName', async (req, res) => {
  const { userId, collectionName } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const collection = user.collections.find(c => c.name === collectionName);
    if (!collection) return res.status(404).json({ message: 'Colección no encontrada.' });

    res.status(200).json({ collection });
  } catch (error) {
    console.error('Error obteniendo colección:', error);
    res.status(500).json({ message: 'Error al obtener colección.', error });
  }
});

// Obtener colección por ID
router.get('/collections/detail-by-id/:userId/:collectionId', async (req, res) => {
  const { userId, collectionId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const collection = user.collections.find(c => c._id.toString() === collectionId);
    if (!collection) return res.status(404).json({ message: 'Colección no encontrada.' });

    res.status(200).json({ collection });
  } catch (error) {
    console.error('Error obteniendo colección por ID:', error);
    res.status(500).json({ message: 'Error al obtener colección por ID.', error });
  }
});

// Editar nombre y descripción de colección
router.put('/collections/edit/:userId/:collectionName', async (req, res) => {
  const { userId, collectionName } = req.params;
  const { newName, newDescription } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const collection = user.collections.find(c => c.name === collectionName);
    if (!collection) return res.status(404).json({ message: 'Colección no encontrada.' });

    if (newName) collection.name = newName;
    if (newDescription !== undefined) collection.description = newDescription;

    await user.save();
    res.status(200).json({ message: 'Colección actualizada con éxito.' });
  } catch (error) {
    console.error('Error editando colección:', error);
    res.status(500).json({ message: 'Error al editar la colección.', error });
  }
});

// Eliminar colección por nombre
router.delete('/collections/delete/:userId/:collectionName', async (req, res) => {
  const { userId, collectionName } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const initialLength = user.collections.length;
    user.collections = user.collections.filter(col => col.name !== collectionName);

    if (user.collections.length === initialLength) {
      return res.status(404).json({ message: 'Colección no encontrada.' });
    }

    await user.save();
    res.status(200).json({ message: 'Colección eliminada con éxito.' });
  } catch (error) {
    console.error('Error al eliminar colección:', error);
    res.status(500).json({ message: 'Error al eliminar la colección.', error });
  }
});

// Eliminar colección por ID
router.delete('/collections/:userId/:collectionId', async (req, res) => {
  const { userId, collectionId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const initialLength = user.collections.length;
    user.collections = user.collections.filter(col => col._id.toString() !== collectionId);

    if (user.collections.length === initialLength) {
      return res.status(404).json({ message: 'Colección no encontrada.' });
    }

    await user.save();
    res.status(200).json({ message: 'Colección eliminada con éxito.' });
  } catch (error) {
    console.error('Error al eliminar colección por ID:', error);
    res.status(500).json({ message: 'Error al eliminar la colección.', error });
  }
});

export default router;
