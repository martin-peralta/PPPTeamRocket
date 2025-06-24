import React, { useState, useEffect } from 'react';
import styles from './InventoryView.module.css';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Loading from '../pages/Loading';

const InventoryView = () => {
  const { auth } = useAuth();
  const [collection, setCollection] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const getCardImage = async (cardId) => {
    try {
      const response = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`, {
        headers: { 'X-Api-Key': process.env.REACT_APP_POKEMON_API_KEY }
      });
      const data = await response.json();
      return data.data.images.small;
    } catch (error) {
      console.error(`Error fetching image for card ${cardId}:`, error);
      return 'https://via.placeholder.com/200';
    }
  };

  useEffect(() => {
    const fetchCollection = async () => {
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
          setCollection(cardsWithImages);

          const total = cardsWithImages.reduce((sum, card) => {
            return sum + (card.price != null ? card.price : 0);
          }, 0);
          setTotalPrice(total);
          setError('');
        } else {
          setError(data.message || 'Error loading collection');
        }
      } catch (error) {
        console.error('Error fetching collection:', error);
        setError('Error loading collection. Please try again.');
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };

    fetchCollection();
  }, [auth?.user?._id]);

  const handleRemoveCard = async (cardId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cards/remove/${auth.user._id}/${cardId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        toast.success('Card removed from inventory!');
        setCollection(prev => {
          const updated = prev.filter(card => card.cardId !== cardId);
          const updatedTotal = updated.reduce((sum, card) => sum + (card.price || 0), 0);
          setTotalPrice(updatedTotal);
          return updated;
        });
      } else {
        toast.error('Failed to remove card.');
      }
    } catch (error) {
      console.error('Error removing card:', error);
      toast.error('Error removing card from inventory.');
    }
  };

  const handleToggleTradeStatus = async (cardId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cards/trade-status/${auth.user._id}/${cardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (response.ok) {
        const newStatus = data.newStatus;
        toast.success(`Trade status updated to: ${newStatus}`);
        setCollection(prev =>
          prev.map(card =>
            card.cardId === cardId ? { ...card, tradeStatus: newStatus } : card
          )
        );
      } else {
        toast.error(data.message || 'Failed to update trade status.');
      }
    } catch (error) {
      console.error('Error updating trade status:', error);
      toast.error('Error updating trade status.');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <h1>Your Inventory</h1>
        <span className={styles.totalPrice}>Total value: ${totalPrice.toFixed(2)}</span>
      </div>

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

      {error ? (
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
                    <p><strong>Price:</strong> {card.price != null ? `$${card.price.toFixed(2)}` : 'N/A'}</p>
                    <p className={
                      card.tradeStatus === 'available'
                        ? styles.tradeAvailable
                        : styles.tradeUnavailable
                    }>
                      <strong>Trade status:</strong> {card.tradeStatus === 'available' ? 'Available for trade' : 'Not available for trade'}
                    </p>
                  </>
                )}
              </div>
              <div className={styles.cardActions}>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveCard(card.cardId)}
                >
                  Remove
                </button>
                <button
                  className={styles.tradeToggle}
                  onClick={() => handleToggleTradeStatus(card.cardId)}
                >
                  {card.tradeStatus === 'available' ? 'Mark as not tradable' : 'Mark as tradable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryView;
