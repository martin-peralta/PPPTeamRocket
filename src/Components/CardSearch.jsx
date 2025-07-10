
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardFilters from './CardFilters';
import styles from './CardSearch.module.css';

const CardSearch = ({ onAddCard }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  
  const [filters, setFilters] = useState({
    rarity: '',
    type: '',
    maxHP: '',
  });

  const [results, setResults] = useState([]);
  const [feedback, setFeedback] = useState('Enter a card name to start searching.');

  
  useEffect(() => {
    // No busca si no hay término de búsqueda
    if (!searchTerm.trim()) {
      setResults([]);
      setFeedback('Enter a card name to start searching.');
      return;
    }

    setFeedback('Searching...');

   
    const delayDebounceFn = setTimeout(() => {
      const params = {
        name: searchTerm,
        rarity: filters.rarity,
        type: filters.type,
        maxHP: filters.maxHP
      };

      // Limpia parámetros vacíos antes de enviar
      Object.keys(params).forEach(key => {
        if (!params[key]) {
          delete params[key];
        }
      });
      
      
      axios.get('/api/cards/search', { params })
        .then(response => {
          setResults(response.data);
          if (response.data.length > 0) {
            setFeedback('');
          } else {
            setFeedback('No cards found for this criteria.');
          }
        })
        .catch(err => {
          console.error('Search error:', err);
          setResults([]);
          setFeedback('Error while fetching cards.');
        });

    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filters]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Enter card name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
      </div>

     
      <CardFilters filters={filters} setFilters={setFilters} />

      {feedback && <p className={styles.feedback}>{feedback}</p>}

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