import React, { useState } from 'react';
import styles from './AddCardForm.module.css';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    if (!auth?.user?._id) {
      toast.warning('You must be logged in to add cards.');
      return;
    }

    setLoading(true);
    try {
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
        // Clear form after successful submission
        setFormData({
          cardId: '',
          name: '',
          types: [],
          rarity: '',
          setName: ''
        });
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
  );
};

export default AddCardForm;
