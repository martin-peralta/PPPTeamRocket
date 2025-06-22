import React, { useState, useEffect } from 'react';
import './Collections.css';

const GOOGLE_VISION_API_KEY = process.env.REACT_APP_GOOGLE_VISION_KEY;

function Collections() {
  const [cardName, setCardName] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [cardsFound, setCardsFound] = useState(() => {
    const stored = localStorage.getItem('savedCards');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedCards', JSON.stringify(cardsFound));
  }, [cardsFound]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedImage(file);
    handleScan(file);
  };

  const extractCardInfo = (text) => {
    const nameMatch = text.match(/(?:^|\n)([A-Z][a-zñáéíóú]+(?:\s[A-Z][a-zñáéíóú]+)*)/);
    const name = nameMatch ? nameMatch[1].trim() : '';

    const hpMatch = text.match(/(?:HP|P)\s?(\d{1,4})/i);
    const hp = hpMatch ? hpMatch[1] : '';

    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    let firstAttack = '';

    const hpIndex = lines.findIndex(line => /(?:HP|P)\s?\d{1,4}/i.test(line));
    if (hpIndex !== -1 && hpIndex + 1 < lines.length) {
      firstAttack = lines[hpIndex + 1];
    }

    return { name, hp, firstAttack };
  };

  const handleSearch = async ({ name, hp, firstAttack, rawQuery = null }) => {
    let query = '';

    if (rawQuery && rawQuery.includes(':')) {
      query = rawQuery;
    } else {
      if (!name) {
        alert('Please enter the card name or a valid query.');
        return;
      }
      query = `name:"${name}"`;
      if (firstAttack) query += ` AND attacks.name:"${firstAttack}"`;
      if (hp) query += ` AND hp:${hp}`;
    }

    console.log('API query:', query);

    try {
      const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.data?.length > 0) {
        setCardsFound(prev => [...prev, data.data[0]]);
      } else {
        alert('No cards found with those parameters.');
      }
    } catch (err) {
      console.error('Error querying the Pokémon API:', err);
    }
  };

  const handleDeleteCard = (id) => {
    const index = cardsFound.findIndex((card) => card.id === id);
    if (index !== -1) {
      const updated = [...cardsFound];
      updated.splice(index, 1);
      setCardsFound(updated);
    }
  };

  const handleScan = async (imageFile) => {
    const file = imageFile || uploadedImage;
    if (!file) return alert('Please upload an image first.');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const base64 = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
        const body = {
          requests: [
            {
              image: { content: base64 },
              features: [{ type: 'TEXT_DETECTION' }]
            }
          ]
        };

        const response = await fetch(
          `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          }
        );
        const data = await response.json();
        const text = data.responses[0]?.fullTextAnnotation?.text;
        if (!text) return alert('Could not extract text from image.');

        console.log('OCR Text from Vision:', text);
        const { name, hp, firstAttack } = extractCardInfo(text);
        console.log('Name:', name);
        console.log('HP:', hp);
        console.log('First Attack:', firstAttack);

        setCardName(name);
        await handleSearch({ name, hp, firstAttack });
      } catch (error) {
        console.error('Error using Google Vision:', error);
        alert('Error processing the image.');
      }
    };
  };

  return (
    <div className="collections-container">
      <h1 className="title">My Collection</h1>
      <div className="collections-layout">
        <div className="left-panel">
          <section className="search-section">
            <h2>Search Cards</h2>
            <input
              type="text"
              placeholder='e.g. name:"Lucario" AND number:79'
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            <button onClick={() => handleSearch({ rawQuery: cardName })}>Search</button>
          </section>

          <section className="upload-section">
            <h2>Scan Card</h2>
            <label className="scan-button">
              Upload and Scan
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
          </section>
        </div>

        <div className="right-panel">
          <h2>Your Cards:</h2>
          <div className="card-grid">
            {cardsFound.length > 0 ? (
              cardsFound.map((card, index) => (
                <div key={`${card.id}-${index}`} className="card-item">
                  <img src={card.images.small} alt={card.name} />
                  <p>{card.name}</p>
                  <small>{card.supertype}</small>
                  <p className="card-detail">Type: {card.types?.[0] || 'N/A'}</p>
                  <p className="card-detail">Price: ${card.cardmarket?.prices?.averageSellPrice?.toFixed(2) || 'N/A'}</p>
                  <button className="delete-button" onClick={() => handleDeleteCard(card.id)}>
                    🗑 Remove
                  </button>
                </div>
              ))
            ) : (
              <p style={{ color: 'white' }}>No cards found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections;
