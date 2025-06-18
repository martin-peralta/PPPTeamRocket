import React, { useState, useEffect } from 'react';
import styles from './CollectionView.module.css';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const CollectionView = () => {
  const { auth } = useAuth();
  const [collection, setCollection] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Obtener imagen de carta desde API
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
      return 'https://via.placeholder.com/200';
    }
  };

  // Obtener colección con imágenes
  useEffect(() => {
    const fetchCollection = async () => {
      if (!auth?.user?._id) return;

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/cards/user/${auth.user._id}`);
        const data = await response.json();

        if (response.ok) {
          const cardsWithImages = await Promise.all(
            (data.cards || []).map(async (card) => {
              const image = await getCardImage(card.cardId);
              return { ...card, image };
            })
          );
          setCollection(cardsWithImages);
          setError('');
        } else {
          setError(data.message || 'Error loading collection');
        }
      } catch (error) {
        console.error('Error fetching collection:', error);
        setError('Error loading collection. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [auth?.user?._id]);

  // Eliminar carta
  const handleRemoveCard = async (cardId) => {
    if (!auth?.user?._id) {
      toast.warning('You must be logged in to remove cards.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/cards/remove/${auth.user._id}/${cardId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        toast.success('Card removed from collection!');
        setCollection(prev => prev.filter(card => card.cardId !== cardId));
      } else {
        toast.error('Failed to remove card.');
      }
    } catch (error) {
      console.error('Error removing card:', error);
      toast.error('Error removing card from collection.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Your Collection</h1>
        <div className={styles.viewControls}>
          <button
            className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
          <button
            className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </button>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading collection...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <div className={`${styles.collection} ${viewMode === 'grid' ? styles.grid : styles.list}`}>
          {collection.map((card, index) => (
            <div key={index} className={`${styles.card} ${viewMode === 'grid' ? styles.gridCard : styles.listCard}`}>
              <img
                src={card.image}
                alt={card.name}
                className={styles.cardImage}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/200'; }}
              />

              <div className={styles.cardInfo}>
                <h3 className={styles.cardName}>{card.name}</h3>
                {viewMode === 'list' && (
                  <>
                    <p><strong>ID:</strong> {card.cardId}</p>
                    <p><strong>Types:</strong> {card.types?.join(', ') || 'Unknown'}</p>
                    <p><strong>Rarity:</strong> {card.rarity}</p>
                    <p><strong>Set:</strong> {card.setName}</p>
                  </>
                )}
              </div>

              <button
                className={styles.removeButton}
                onClick={() => handleRemoveCard(card.cardId)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionView;
