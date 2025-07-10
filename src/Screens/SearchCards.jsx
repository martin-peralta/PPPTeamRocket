import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './SearchCards.module.css';
import Loading from '../pages/Loading'; 
import CardFilters from '../Components/CardFilters'; 

function SearchCards() {
  const [searchTerm, setSearchTerm] = useState('');
  

  const [filters, setFilters] = useState({
    rarity: '',
    type: '',
    maxHP: '',
  });

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('Enter a card name to start searching.');


  useEffect(() => {

    if (!searchTerm.trim()) {
      setCards([]); 
      return;
    }

    setLoading(true);
    setFeedback('');

    const delayDebounceFn = setTimeout(() => {

      const params = new URLSearchParams({
        name: searchTerm,
        rarity: filters.rarity,
        type: filters.type,
        maxHP: filters.maxHP,
      });

 
      for (let [key, value] of [...params.entries()]) {
        if (!value) {
            params.delete(key);
        }
      }


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
    }, 500); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filters]); 

  return (
    <div className={styles.searchContainer}>
      <h2 className={styles.title}>Search for a Pokémon Card</h2>

      
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Enter card name (e.g., Charizard)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
      </div>

      
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