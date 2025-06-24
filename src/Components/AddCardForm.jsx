import React, { useState, useEffect } from 'react';
import styles from './AddCardForm.module.css';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddCardForm = () => {
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    cardId: '',
    name: '',
    types: [],
    rarity: '',
    setName: ''
  });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [collection, setCollection] = useState([]);

  // Fetch user's collection when component mounts
  useEffect(() => {
    const fetchCollection = async () => {
      if (auth?.user?._id) {
        try {
          const response = await fetch(`http://localhost:5000/api/cards/user/${auth.user._id}`);
          const data = await response.json();
          setCollection(data.cards || []);
        } catch (error) {
          console.error('Error fetching collection:', error);
          toast.error('Error loading collection');
        }
      }
    };
    fetchCollection();
  }, [auth?.user?._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.cardId.trim()) {
      errors.cardId = 'Card ID is required';
    }

    if (!formData.name.trim()) {
      errors.name = 'Card name is required';
    }

    if (!formData.types.length) {
      errors.types = 'At least one type is required';
    }

    if (!formData.rarity.trim()) {
      errors.rarity = 'Rarity is required';
    }

    if (!formData.setName.trim()) {
      errors.setName = 'Set name is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const checkCardExists = async (cardId) => {
    try {
      const response = await axios.get(`https://api.pokemontcg.io/v2/cards/${cardId}`, {
        headers: {
          'X-Api-Key': process.env.REACT_APP_POKEMON_API_KEY
        }
      });
      return response.data.data;
    } catch (error) {
      return null;
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;

    if (!auth?.user?._id) {
      toast.warning('You must be logged in to add cards.');
      return;
    }

    setLoading(true);
    
    try {
      // Check if card exists in Pokémon TCG API
      const cardExists = await checkCardExists(formData.cardId);
      if (!cardExists) {
        toast.error('Invalid card ID. Please enter a valid Pokémon TCG card ID.');
        setLoading(false);
        return;
      }

      // Check if card is already in collection
      const cardInCollection = collection.some(card => card.cardId === formData.cardId);
      if (cardInCollection) {
        toast.warning('This card is already in your collection!');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/cards/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: auth.user._id,
          card: {
            cardId: formData.cardId,
            name: formData.name,
            types: formData.types,
            rarity: formData.rarity,
            setName: formData.setName
          }
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Card added to inventory!');
        // Clear form
        setFormData({
          cardId: '',
          name: '',
          types: [],
          rarity: '',
          setName: ''
        });
        // Update collection
        setCollection(prev => [...prev, {
          cardId: formData.cardId,
          name: formData.name,
          types: formData.types,
          rarity: formData.rarity,
          setName: formData.setName
        }]);
      } else {
        toast.error(data.message || 'Failed to add card.');
      }
    } catch (error) {
      console.error('Error adding card:', error);
      toast.error('Error adding card to inventory.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Add Card to Inventory</h2>
        <form onSubmit={handleAddCard} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="cardId">Card ID:</label>
            <input
              type="text"
              id="cardId"
              name="cardId"
              value={formData.cardId}
              onChange={handleChange}
              required
              placeholder="Enter card ID"
            />
            {validationErrors.cardId && (
              <p className={styles.error}>{validationErrors.cardId}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Card Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter card name"
            />
            {validationErrors.name && (
              <p className={styles.error}>{validationErrors.name}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="types">Card Types:</label>
            <input
              type="text"
              id="types"
              name="types"
              value={formData.types.join(', ')}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                types: e.target.value.split(',').map(type => type.trim())
              }))}
              placeholder="Enter types (comma separated)"
            />
            {validationErrors.types && (
              <p className={styles.error}>{validationErrors.types}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="rarity">Rarity:</label>
            <input
              type="text"
              id="rarity"
              name="rarity"
              value={formData.rarity}
              onChange={handleChange}
              required
              placeholder="Enter rarity"
            />
            {validationErrors.rarity && (
              <p className={styles.error}>{validationErrors.rarity}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="setName">Set Name:</label>
            <input
              type="text"
              id="setName"
              name="setName"
              value={formData.setName}
              onChange={handleChange}
              required
              placeholder="Enter set name"
            />
            {validationErrors.setName && (
              <p className={styles.error}>{validationErrors.setName}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'Adding...' : 'Add to Inventory'}
          </button>
        </form>
      </div>

      <div className={styles.collectionContainer}>
        <h2>Your Collection</h2>
        <div className={styles.collectionList}>
          {collection.map((card, index) => (
            <div key={index} className={styles.collectionCard}>
              <h3>{card.name}</h3>
              <p><strong>ID:</strong> {card.cardId}</p>
              <p><strong>Types:</strong> {card.types.join(', ')}</p>
              <p><strong>Rarity:</strong> {card.rarity}</p>
              <p><strong>Set:</strong> {card.setName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddCardForm;
