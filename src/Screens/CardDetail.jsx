import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './CardDetail.module.css';
import Loading from '../pages/Loading';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

function CardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [alreadyInInventory, setAlreadyInInventory] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pokemon/${id}`);
        const data = await response.json();
        setCard(data);

        // Verificar si ya está en el inventario
        if (auth?.user?._id) {
          const check = await fetch(`http://localhost:5000/api/cards/check/${auth.user._id}/${data.id}`);
          const res = await check.json();
          if (res.exists) {
            setAlreadyInInventory(true);
          }
        }
      } catch (error) {
        setError('Error while fetching card details.');
        console.error('Card fetch error:', error);
      }
      setLoading(false);
    };

    fetchCard();
  }, [id, auth]);

  const handleGoBack = () => {
    if (location.state && location.state.searchTerm) {
      navigate(-1);
    } else {
      navigate('/cards');
    }
  };

  const handleAddToInventory = async () => {
    if (!auth?.user?._id) {
      toast.warning('You must be logged in to add cards.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/cards/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: auth.user._id,
          cardId: card.id
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Card added to inventory!');
        setAlreadyInInventory(true);
      } else {
        toast.error(data.message || 'Failed to add card.');
      }
    } catch (error) {
      console.error('Error adding card:', error);
      toast.error('Error adding card to inventory.');
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!card) return <p className={styles.error}>Card not found.</p>;

  return (
    <div className={styles.cardDetailContainer}>
      <h2 className={styles.title}>{card.name}</h2>
      <img src={card.images.small} alt={card.name} className={styles.cardImage} />
      <div className={styles.details}>
        <p><strong>Rarity:</strong> {card.rarity || 'Unknown'}</p>
        <p><strong>Type:</strong> {card.types ? card.types.join(', ') : 'Unknown'}</p>
        <p><strong>PS:</strong> {card.hp || 'Unknown'}</p>
      </div>

      <div className={styles.buttonsContainer}>
        <button onClick={handleGoBack} className={styles.backButton}>
          Go Back
        </button>

        {alreadyInInventory ? (
          <button className={styles.ownedButton} disabled>
            Already in Inventory
          </button>
        ) : (
          <button onClick={handleAddToInventory} className={styles.addButton}>
            Add to Inventory
          </button>
        )}
      </div>
    </div>
  );
}

export default CardDetail;
