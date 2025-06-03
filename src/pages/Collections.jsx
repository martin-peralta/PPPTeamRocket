import React, { useState, useEffect } from 'react';
import CardSearch from '../Components/CardSearch';
import styles from './Collections.module.css';

// Simula una detección de carta desde imagen (reemplazar por API real)
const uploadImageAndDetectCard = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("http://localhost:5000/api/pokemon/detect", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error en la detección de carta");

    const detectedCard = await response.json(); // Asegúrate que devuelve { id, name, imageUrl }
    return detectedCard;
  } catch (error) {
    console.error("Error al detectar carta:", error);
    alert("No se pudo detectar la carta desde la imagen.");
    return null;
  }
};

const Collections = () => {
  const [collection, setCollection] = useState([]);
  const [favorite, setFavorite] = useState(null);

  // Cargar datos desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem('collection');
    const storedFav = localStorage.getItem('favoriteCard');
    if (stored) setCollection(JSON.parse(stored));
    if (storedFav) setFavorite(JSON.parse(storedFav));
  }, []);

  // Guardar en localStorage cada vez que se actualiza
  useEffect(() => {
    localStorage.setItem('collection', JSON.stringify(collection));
  }, [collection]);

  useEffect(() => {
    if (favorite) localStorage.setItem('favoriteCard', JSON.stringify(favorite));
  }, [favorite]);

  const handleAddCard = (card) => {
    // Evita duplicados
    if (!collection.find(c => c.id === card.id)) {
      setCollection(prev => [...prev, card]);
    }
  };

  const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const card = await uploadImageAndDetectCard(file);
  if (card) {
    handleAddCard(card);
  }
  };

  const handleRemoveCard = (id) => {
    setCollection(prev => prev.filter(card => card.id !== id));
    if (favorite?.id === id) setFavorite(null);
  };

  const handleSetFavorite = (card) => {
    setFavorite(card);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Collection</h2>

      <div className={styles.uploadSection}>
        <label className={styles.uploadLabel}>
          Upload Image:
          <input type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} id="uploadInput" />
        </label>
      </div>

      <CardSearch onAddCard={handleAddCard} />

      <div>
        <label htmlFor="fileInput" style={{ display: "block", marginTop: "1rem" }}>
          O sube una imagen de carta (.jpg):
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          id="fileInput"
        />
      </div>

      <h3 className={styles.subtitle}>Your Cards:</h3>
      <div className={styles.cardsGrid}>
        {collection.map(card => (
          <div key={card.id} className={styles.card}>
            <img src={card.imageUrl || card.images?.small} alt={card.name} className={styles.cardImage} />
            <p>{card.name}</p>
            <div className={styles.cardButtons}>
              <button onClick={() => handleRemoveCard(card.id)} className={styles.removeButton}>Remove</button>
              <button onClick={() => handleSetFavorite(card)} className={styles.favoriteButton}>
                {favorite?.id === card.id ? "★ Favorite" : "☆ Set Favorite"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {favorite && (
        <div className={styles.favoritePreview}>
          <h4>Favorite Preview:</h4>
          <img src={favorite.imageUrl || favorite.images?.small} alt={favorite.name} className={styles.favoriteImage} />
          <p>{favorite.name}</p>
        </div>
      )}
    </div>
  );
};

export default Collections;
