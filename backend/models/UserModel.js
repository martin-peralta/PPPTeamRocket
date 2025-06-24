// Librerías importadas
import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({  
  cardId: { type: String, required: true }, 
  name: String,
  types: [String],
  rarity: String,
  setName: String,
  price: Number,
  isTradable: { type: Boolean, default: false } 
});

const CollectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  cards: [CardSchema],  
});

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
  inventory: [CardSchema],  
  collections: [CollectionSchema]  
});

const User = mongoose.model('User', UserSchema);
export default User;
