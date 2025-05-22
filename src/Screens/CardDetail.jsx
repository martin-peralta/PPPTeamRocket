/*  Librerías y componentes    */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './CardDetail.module.css';
import Loading from '../pages/Loading'; // 👈 Importamos la pantalla de carga

function CardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pokemon/${id}`);
        const data = await response.json();
        setCard(data);
      } catch (error) {
        setError('Error while fetching card details.');
        console.error('Card fetch error:', error);
      }
      setLoading(false);
    };

    fetchCard();
  }, [id]);

  // 👇 Mostrar Loading si la data aún no está lista
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!card) {
    return <p className={styles.error}>Card not found.</p>;
  }

  const handleGoBack = () => {
    if (location.state && location.state.searchTerm) {
      navigate(-1);
    } else {
      navigate('/cards');
    }
  };

  return (
    <div className={styles.cardDetailContainer}>
      <h2 className={styles.title}>{card.name}</h2>
      <img src={card.images.small} alt={card.name} className={styles.cardImage} />
      <div className={styles.details}>
        <p><strong>Rarity:</strong> {card.rarity || 'Unknown'}</p>
        <p><strong>Type:</strong> {card.types ? card.types.join(', ') : 'Unknown'}</p>
        <p><strong>PS:</strong> {card.hp || 'Unknown'}</p>
      </div>

      <button onClick={handleGoBack} className={styles.backButton}>
        Go Back
      </button>
    </div>
  );
}

export default CardDetail;
