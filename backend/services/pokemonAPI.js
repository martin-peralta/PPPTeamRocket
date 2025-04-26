import axios from 'axios';

const API_KEY = process.env.POKEMON_API_KEY;
const BASE_URL = 'https://api.pokemontcg.io/v2/cards';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json',
  },
});

// Buscar cartas por nombre
export async function searchCardsByName(name) {
  try {
    const response = await apiClient.get('/', {
      params: {
        q: `name:${name}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error buscando cartas por nombre:', error.message);
    throw error;
  }
}

// Buscar carta específica por ID
export async function getCardById(id) {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error buscando carta por ID:', error.message);
    throw error;
  }
}

// Buscar cartas por tipo
export async function searchCardsByType(type) {
  try {
    const response = await apiClient.get('/', {
      params: {
        q: `types:${type}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error buscando cartas por tipo:', error.message);
    throw error;
  }
}
