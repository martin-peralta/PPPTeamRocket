// backend/cache.js
import axios from 'axios';

const API_URL = 'https://api.pokemontcg.io/v2/cards';
const POKEMON_API_KEY = process.env.POKEMON_API_KEY;

// Aquí guardaremos la lista de nombres en memoria.
export let cardNamesCache = [];

export const loadCardNames = async () => {
  try {
    console.log('--- Cargando y cacheando nombres de cartas desde la API... ---');
    
    // Usamos un Set para asegurarnos de que los nombres sean únicos
    const names = new Set();
    let page = 1;
    let hasMore = true;

    while(hasMore) {
      const response = await axios.get(API_URL, {
        headers: { 'X-Api-Key': POKEMON_API_KEY },
        params: {
          select: 'name', // Solo pedimos el campo del nombre para que sea más rápido
          page: page,
          pageSize: 250
        }
      });
      
      response.data.data.forEach(card => names.add(card.name));
      
      console.log(`Página ${page} cargada. Total de nombres únicos: ${names.size}`);

      // La API nos dice si hay más páginas de resultados
      hasMore = page * response.data.pageSize < response.data.totalCount;
      page++;
    }

    cardNamesCache = [...names];
    console.log(`✅ Cache de nombres cargado con ${cardNamesCache.length} nombres de cartas.`);

  } catch (error) {
    console.error('🚨 Error fatal al cargar el caché de nombres:', error.message);
    // Si falla, el servidor no debería iniciar.
    process.exit(1);
  }
};