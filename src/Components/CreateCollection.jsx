import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import styles from './CreateCollection.module.css';

const CreateCollection = () => {
  const { auth } = useAuth();
  const [collectionName, setCollectionName] = useState('');
  const [description, setDescription] = useState('');
  const [inventory, setInventory] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener imagen desde la API de cartas Pokémon
  const getCardImage = async (cardId) => {
    try {
      const response = await axios.get(`https://api.pokemontcg.io/v2/cards/${cardId}`, {
        headers: {
          'X-Api-Key': process.env.REACT_APP_POKEMON_API_KEY
        }
      });
      return response.data.data.images.small;
    } catch (error) {
      console.error(`Error fetching image for card ${cardId}:`, error);
      return 'https://via.placeholder.com/100';
    }
  };

  // Cargar inventario y agregar imágenes
  useEffect(() => {
    const fetchInventory = async () => {
      if (!auth?.user?._id) return;

      try {
        const response = await fetch(`http://localhost:5000/api/cards/user/${auth.user._id}`);
        const data = await response.json();

        if (response.ok) {
          const cardsWithImages = await Promise.all(
            (data.cards || []).map(async (card) => {
              const image = await getCardImage(card.cardId);
              return { ...card, image };
            })
          );
          setInventory(cardsWithImages);
        } else {
          toast.error(data.message || 'Failed to load inventory.');
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
        toast.error('Error loading inventory. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [auth?.user?._id]);

  const handleCardSelect = (cardId) => {
    setSelectedCards(prevSelected =>
      prevSelected.includes(cardId)
        ? prevSelected.filter(id => id !== cardId)
        : [...prevSelected, cardId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!collectionName) {
      toast.error('Collection name is required.');
      return;
    }

    if (selectedCards.length < 2) {
      toast.error('You must select at least 2 cards.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/cards/collections/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: auth.user._id,
          collectionName,
          description,
          cards: selectedCards
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Collection created successfully!');
        setCollectionName('');
        setDescription('');
        setSelectedCards([]);
      } else {
        toast.error(data.message || 'Failed to create collection.');
      }
    } catch (error) {
      console.error('Error creating collection:', error);
      toast.error('Error creating collection.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create New Collection</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="Collection Name"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Collection Description"
            className={styles.input}
          />
        </div>

        <div className={styles.cardSelection}>
          <h3>Select Cards for the Collection (Minimum 2)</h3>
          {loading ? (
            <div className={styles.loading}>Loading cards...</div>
          ) : (
            <div className={styles.cardList}>
              {inventory.map((card) => (
                <div key={card.cardId} className={styles.cardItem}>
                  <input
                    type="checkbox"
                    id={card.cardId}
                    checked={selectedCards.includes(card.cardId)}
                    onChange={() => handleCardSelect(card.cardId)}
                  />
                  <label htmlFor={card.cardId}>
                    <img
                      src={card.image}
                      alt={card.name}
                      className={styles.cardImage}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }}
                    />
                    <span>{card.name}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>Create Collection</button>
      </form>
    </div>
  );
};

export default CreateCollection;
