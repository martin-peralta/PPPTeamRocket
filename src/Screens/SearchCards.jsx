import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './SearchCards.module.css';
import Loading from '../pages/Loading'; 
import CardFilters from '../Components/CardFilters'; 

function SearchCards() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // 1. Unificamos todos los filtros en un solo objeto de estado.
  const [filters, setFilters] = useState({
    rarity: '',
    type: '',
    maxHP: '',
  });

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('Enter a card name to start searching.');

  // 2. Usamos useEffect para que la búsqueda se ejecute automáticamente al cambiar los filtros o el texto.
  useEffect(() => {
    // No busca si no hay nada escrito en la barra principal
    if (!searchTerm.trim()) {
      setCards([]); // Limpia resultados si no hay búsqueda
      return;
    }

    setLoading(true);
    setFeedback('');

    const delayDebounceFn = setTimeout(() => {
      // 3. Construye los parámetros de búsqueda dinámicamente
      const params = new URLSearchParams({
        name: searchTerm,
        rarity: filters.rarity,
        type: filters.type,
        maxHP: filters.maxHP,
      });

      // Limpia parámetros vacíos para no enviarlos a la API
      for (let [key, value] of [...params.entries()]) {
        if (!value) {
            params.delete(key);
        }
      }

      // 4. Llama a la ruta correcta que sabe cómo manejar estos filtros
      axios.get(`/api/cards/search?${params.toString()}`)
        .then(response => {
          setCards(response.data);
          if (response.data.length === 0) {
            setFeedback('No cards found with these criteria.');
          }
        })
        .catch(error => {
          console.error('Search error:', error);
          setCards([]);
          setFeedback('Error while fetching cards.');
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500); // Pequeña espera para no hacer peticiones en cada tecla

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filters]); // El efecto se dispara si 'searchTerm' o 'filters' cambian

  return (
    <div className={styles.searchContainer}>
      <h2 className={styles.title}>Search for a Pokémon Card</h2>

      {/* El input ahora solo actualiza el 'searchTerm' */}
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Enter card name (e.g., Charizard)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
      </div>

      {/* 5. Pasamos 'filters' y 'setFilters' al componente hijo. ¡Esto corrige el error! */}
      <CardFilters filters={filters} setFilters={setFilters} />

      {loading && <Loading />}
      {feedback && <p className={styles.error}>{feedback}</p>}

      <div className={styles.cardsGrid}>
        {cards.length > 0 && cards.map(card => (
          <Link key={card.id} to={`/cards/${card.id}`} className={styles.cardLink}>
            <div className={styles.card}>
              <img src={card.images.small} alt={card.name} className={styles.cardImage} />
              <p className={styles.cardName}>{card.name}</p>
              <p className={styles.cardRarity}>{card.rarity || 'No rarity'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchCards;