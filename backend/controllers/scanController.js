// backend/controllers/scanController.js

import fs from 'fs';
import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import levenshtein from 'js-levenshtein';
import { searchCards } from '../services/pokemonAPI.js';
import { cardNamesCache } from '../cache.js';


const findBestNameMatch = (ocrText, nameList) => {
    if (!ocrText) return null;
    const candidateWords = ocrText.replace(/[^a-zA-Z\s-]/g, '').split(/[\s\n]+/).filter(word => word.length > 2);
    if (candidateWords.length === 0) return null;

    let bestMatch = { name: null, score: Infinity };
    const threshold = 3;

    for (const candidate of candidateWords) {
        for (const correctName of nameList) {
            const mainName = correctName.split(' ')[0];
            const dist = levenshtein(candidate, mainName);
            if (dist < bestMatch.score) {
                bestMatch = { name: correctName, score: dist };
            }
        }
    }
    return bestMatch.score < threshold ? bestMatch.name : null;
};


export const scanCard = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image file uploaded.');
  }
  const imagePath = req.file.path;

  try {
    // 1. Pre-procesar la imagen para mejorar la lectura del OCR
    const ocrBuffer = await sharp(imagePath)
        .greyscale().median(3).sharpen().normalize().toBuffer();

    const tesseractOptions = {
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-&', // Añadimos '&'
        psm: Tesseract.PSM.SINGLE_LINE 
    };
    
    const { data: { text } } = await Tesseract.recognize(ocrBuffer, 'eng', tesseractOptions);
    console.log(`--- Nombre extraído por OCR: "${text.trim()}" ---`);

    // 2. Corregir el nombre usando la base de datos completa
    const name = findBestNameMatch(text.trim(), cardNamesCache);
    console.log(`--- Nombre corregido y final: "${name}" ---`);

    if (!name) {
      return res.status(404).json({ message: 'Could not detect a valid card name from the image.' });
    }

    // 3. Buscar todas las coincidencias por el nombre corregido y devolverlas
    const query = `name:*${name}*`;
    const foundCards = await searchCards(query, 25);
    
    if (foundCards && foundCards.length > 0) {
        console.log(`✅ Búsqueda exitosa. Devolviendo ${foundCards.length} coincidencias para que el usuario elija.`);
        return res.status(200).json(foundCards);
    }

    console.log('❌ No se encontró ninguna carta con ese nombre.');
    return res.status(404).json({ message: `No card found for name: "${name}".` });

  } catch (error) {
    console.error('🚨 ERROR:', error);
    res.status(500).send('An error occurred during card processing.');
  } finally {
    if (fs.existsSync(imagePath)) {
      // fs.unlinkSync(imagePath);
    }
  }
};