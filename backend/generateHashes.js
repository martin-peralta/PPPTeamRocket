// backend/generateHashes.js

import fs from 'fs';
import axios from 'axios';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { hash } = require('imghash');

const POKEMON_API_KEY = '507f6f84-8c67-47dc-984b-98e002829833';
const API_URL = 'https://api.pokemontcg.io/v2/sets';

const generateDatabase = async () => {
  try {
    console.log('--- Iniciando descarga de la lista de sets ---');
    const response = await axios.get(API_URL, {
      headers: { 'X-Api-Key': POKEMON_API_KEY }
    });
    
    const sets = response.data.data;
    const database = [];

    console.log(`✅ Se encontraron ${sets.length} sets. Iniciando procesamiento...`);

    for (const set of sets) {
      if (!set.images.symbol) {
        console.log(`🟡 Omitiendo set "${set.name}" (sin símbolo).`);
        continue;
      }
      try {
        const imageResponse = await axios.get(set.images.symbol, { responseType: 'arraybuffer' });
        const generatedHash = await hash(imageResponse.data);
        database.push({ setId: set.id, name: set.name, hash: generatedHash });
        console.log(`✅ Procesado: ${set.name}`);
      } catch (imageError) {
        console.error(`❌ Error procesando el símbolo para "${set.name}":`, imageError.message);
      }
    }

    // Guardar el resultado como un archivo JSON limpio
    fs.writeFileSync('symbolDatabase.json', JSON.stringify(database, null, 2), 'utf-8');
    console.log('\n\n--- ✅ Proceso completado ---');
    console.log('Base de datos guardada en "symbolDatabase.json"');

  } catch (error) {
    console.error('🚨 Error fatal:', error);
  }
};

generateDatabase();