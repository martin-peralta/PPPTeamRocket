import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
  cardId: { type: String, required: true }, 
  name: String,
  types: [String],
  rarity: String,
  setName: String
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
  inventory: [CardSchema] 
});

const User = mongoose.model('User', UserSchema);
export default User;
