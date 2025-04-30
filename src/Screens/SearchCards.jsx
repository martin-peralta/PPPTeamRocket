


/*  Librerias y componentes    */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link
import styles from './SearchCards.module.css'; // Your CSS module

function SearchCards() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchExecuted, setSearchExecuted] = useState(false);

  // Recuperar búsqueda anterior si existe
  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm');
    const storedCards = localStorage.getItem('cards');

    if (storedSearchTerm && storedCards) {
      setSearchTerm(storedSearchTerm);
      setCards(JSON.parse(storedCards));
      setSearchExecuted(true);
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCards([]);
    setSearchExecuted(false);

    if (!searchTerm.trim()) {
      setError('Please enter a card name.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/pokemon/search?name=${searchTerm}`);
      const data = await response.json();
      setCards(data);

      // Guardar en localStorage
      localStorage.setItem('searchTerm', searchTerm);
      localStorage.setItem('cards', JSON.stringify(data));
    } catch (error) {
      setError('Error while fetching cards.');
      console.error('Search error:', error);
    }

    setLoading(false);
    setSearchExecuted(true);
  };

  return (
    <div className={styles.searchContainer}>
      <h2 className={styles.title}>Search for a Pokémon Card</h2>

      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          placeholder="Enter card name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>

      {loading && <p className={styles.loading}>Searching...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.cardsGrid}>
        {searchExecuted && (
          Array.isArray(cards) && cards.length > 0 ? (
            cards.map(card => (
              <Link
                key={card.id}
                to={`/cards/${card.id}`} // Link dinámico al detalle
                className={styles.cardLink}
              >
                <div className={styles.card}>
                  <img src={card.images.small} alt={card.name} className={styles.cardImage} />
                  <p className={styles.cardName}>{card.name}</p>
                  <p className={styles.cardRarity}>{card.rarity || 'No rarity available'}</p>
                </div>
              </Link>
            ))
          ) : (
            !loading && !error && (
              <p className={styles.noResults}>No cards found for "{searchTerm}".</p>
            )
          )
        )}
      </div>
    </div>
  );
}

export default SearchCards;
