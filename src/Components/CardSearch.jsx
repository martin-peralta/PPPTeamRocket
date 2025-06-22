import React, { useState } from 'react';
import styles from './CardSearch.module.css';

const CardSearch = ({ onAddCard }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);

    if (!searchTerm.trim()) {
      setError('Please enter a card name.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/pokemon/search?name=${searchTerm}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Error while fetching cards.');
      console.error('Search error:', err);
    }
  };

  return (
    <div className={styles.searchContainer}>
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

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.results}>
        {results.map(card => (
          <div key={card.id} className={styles.card}>
            <img src={card.images.small} alt={card.name} className={styles.cardImage} />
            <p>{card.name}</p>
            <button onClick={() => onAddCard(card)} className={styles.addButton}>Add to Collection</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSearch;
