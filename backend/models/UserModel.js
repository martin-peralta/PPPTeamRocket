
//Librerias importadas
import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({ // Parametros de inventario al guardar carta en seccion cards
  cardId: { type: String, required: true }, 
  name: String,
  types: [String],
  rarity: String,
  setName: String
});

// Modelo de usuario
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { 
    type: String,
    required: true
  },
  inventory: [CardSchema]  //Llamada a los parametros de arriba
});

const User = mongoose.model('User', UserSchema);
export default User;
