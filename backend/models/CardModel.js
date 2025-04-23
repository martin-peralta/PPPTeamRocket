import mongoose from 'mongoose';

const PokemonCardSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  tipo: {
    type: String,
    required: true
  },
  ataque: {
    type: Number,
    required: true,
    min: 0
  },
  defensa: {
    type: Number,
    required: true,
    min: 0
  },
  rareza: {
    type: String,
    enum: ['común', 'rara', 'épica', 'legendaria'],
    default: 'común'
  },
  imagenUrl: {
    type: String,
    required: true
  },
  
});

const PokemonCard = mongoose.model('PokemonCard', PokemonCardSchema);
export default PokemonCard;
