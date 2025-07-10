// frontend/src/Components/ScanCard.jsx

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styles from './ScanCard.module.css';

const ScanCard = () => {
  const { auth } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [identifiedCards, setIdentifiedCards] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [addFeedback, setAddFeedback] = useState('');

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setFeedback(`File selected: ${event.target.files[0].name}`);
      setIdentifiedCards([]);
      setAddFeedback('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setFeedback('Please select an image first.');
      return;
    }
    setFeedback('Identifying card, please wait...');
    setAddFeedback('');
    const formData = new FormData();
    formData.append('cardImage', selectedFile);

    try {
      const response = await axios.post('/api/cards/scan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setIdentifiedCards(response.data);
      if (response.data.length > 1) {
        setFeedback(`Found ${response.data.length} possible matches. Please select your card below:`);
      } else if (response.data.length === 1) {
        setFeedback('Card identified successfully!');
      } else {
        setFeedback('No matches found.');
      }
    } catch (error) {
      console.error('Error identifying card:', error);
      setFeedback('Could not identify the card. Please try another image.');
    }
  };
  
  const handleAddToInventory = async (cardToAdd) => {
    if (!cardToAdd || !auth?.user?._id) {
        setAddFeedback('You must be logged in to add cards.');
        return;
    };

    setAddFeedback(`Adding ${cardToAdd.name} to inventory...`);
    try {
      await axios.post('/api/cards/add', { 
        userId: auth.user._id, 
        card: { cardId: cardToAdd.id } 
      });

      setAddFeedback(`"${cardToAdd.name}" successfully added to your inventory!`);
      setIdentifiedCards([]);
    } catch (error) {
      console.error('Error adding to inventory:', error);
      setAddFeedback('Failed to add card to inventory.');
    }
  };

  return (
    <div className={styles.scanContainer}>
      <h2 className={styles.title}>Scan and Add Card</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.actionsContainer}>
          <button type="button" onClick={() => cameraInputRef.current.click()} className={styles.actionButton}>
            Scan with Camera
          </button>
          <button type="button" onClick={() => fileInputRef.current.click()} className={styles.actionButton}>
            Upload File
          </button>
        </div>
        
        {selectedFile && 
          <button type="submit" className={styles.actionButton} style={{backgroundColor: '#007bff'}}>
            Identify Card
          </button>
        }
      </form>

      {feedback && <p className={styles.feedback}>{feedback}</p>}

      {identifiedCards.length > 0 && (
        <div className={styles.resultsGrid}>
          {identifiedCards
            .filter(card => card.images?.small)
            .map((card) => (
              <div key={card.id} className={styles.resultItem} onClick={() => handleAddToInventory(card)}>
                <img src={card.images.small} alt={card.name} className={styles.cardImage} />
                <p>{card.name}</p>
                <div className={styles.setInfo}>
                  <small>{card.set.name}</small>
                  <img src={card.set.images.symbol} alt={`${card.set.name} symbol`} className={styles.setSymbol} />
                </div>
              </div>
            ))}
        </div>
      )}
      {addFeedback && <p className={styles.feedback}>{addFeedback}</p>}

      <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} ref={cameraInputRef} style={{ display: 'none' }} />
      <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
    </div>
  );
};

export default ScanCard;