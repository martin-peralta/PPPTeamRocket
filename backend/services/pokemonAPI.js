// backend/services/pokemonAPI.js

import axios from 'axios';

const API_KEY = process.env.POKEMON_API_KEY;
const BASE_URL = 'https://api.pokemontcg.io/v2'; // URL base para toda la API

// Cliente Axios para las búsquedas de cartas
const cardApiClient = axios.create({
  baseURL: `${BASE_URL}/cards`,
  headers: {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json',
  },
});

// Le cambiamos el nombre para que sea más genérico y aceptamos un límite
export async function searchCards(query, limit = 50) {
  try {
    const response = await cardApiClient.get('/', {
      params: {
        q: query,
        pageSize: limit,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error buscando cartas:', error.message);
    throw error;
  }
}

// Buscar carta específica por ID
export async function getCardById(id) {
  try {
    const response = await cardApiClient.get(`/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error buscando carta por ID:', error.message);
    throw error;
  }
}

// Buscar cartas por tipo
export async function searchCardsByType(type) {
  try {
    const response = await cardApiClient.get('/', {
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




export async function getRarities() {
  try {
    // Rarezas
    const response = await axios.get(`${BASE_URL}/rarities`, {
      headers: { 'X-Api-Key': API_KEY }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching rarities:', error.message);
    throw error;
  }
}

// Tipos disponibles
export async function getTypes() {
  try {
    // Hacemos la llamada directamente al endpoint de 'types'
    const response = await axios.get(`${BASE_URL}/types`, {
      headers: { 'X-Api-Key': API_KEY }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching types:', error.message);
    throw error;
  }
}