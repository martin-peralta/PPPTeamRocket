import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
  id: { // ID oficial de la carta en la API PokémonTCG
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  types: [{ 
    type: String,
  }],
  rarity: {
    type: String,
  },
  user: { // Usuario dueño de esta carta
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true }); // opcional: guarda createdAt y updatedAt

const Card = mongoose.model('Card', CardSchema);
export default Card;
