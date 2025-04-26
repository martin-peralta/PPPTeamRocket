import dotenv from 'dotenv';
import axios from 'axios';
import connectDB from './TRdb.js';
import PokemonCard from './models/CardModel.js';

dotenv.config();
await connectDB();

const API_KEY = process.env.POKEMON_API_KEY;

const headers = {
  'X-Api-Key': API_KEY
};

const loadAllCards = async () => {
  let page = 1;
  const pageSize = 250;
  let totalInsertadas = 0;

  try {
    while (true) {
      const { data } = await axios.get(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`, {
        headers
      });

      if (!data.data || data.data.length === 0) break;

      const formatted = data.data.map(card => ({
        nombre: card.name,
        tipo: card.types?.[0]?.toLowerCase() || 'desconocido',
        ataque: parseInt(card.attacks?.[0]?.damage) || 0,
        defensa: parseInt(card.hp) || 0,
        rareza: card.rarity?.toLowerCase() || 'común',
        imagenUrl: card.images?.small || ''
      }));

      await PokemonCard.insertMany(formatted);
      console.log(`✔ Página ${page} → ${formatted.length} cartas insertadas`);

      totalInsertadas += formatted.length;
      page++;
    }

    console.log(`✅ Total de cartas insertadas: ${totalInsertadas}`);
    process.exit();
  } catch (error) {
    console.error('❌ Error al cargar cartas:', error.message);
    process.exit(1);
  }
};

loadAllCards();
