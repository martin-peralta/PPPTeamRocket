import React, { useState } from 'react';
import CardSearch from '../Components/CardSearch'; // ✅ Ajusta esta ruta si tu estructura de carpetas es distinta

export default function Decks() {
  const [decks, setDecks] = useState([]);
  const [currentDeck, setCurrentDeck] = useState([]);
  const [deckName, setDeckName] = useState("");

  const addToDeck = (card) => {
    if (currentDeck.length < 100) {
      setCurrentDeck([...currentDeck, card]);
    }
  };

  const saveDeck = () => {
    if (decks.length >= 2) return alert("Max 2 decks");
    setDecks([...decks, { name: deckName, cards: currentDeck }]);
    setCurrentDeck([]);
    setDeckName("");
  };

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl mb-4">Create Deck</h2>
      <input type="text" value={deckName} onChange={e => setDeckName(e.target.value)} placeholder="Deck name" />
      <CardSearch onAddCard={addToDeck} />
      <button onClick={saveDeck}>Save Deck</button>

      {decks.map((deck, i) => (
        <div key={i}>
          <h3>{deck.name}</h3>
          <p>{deck.cards.length} cards</p>
        </div>
      ))}
    </div>
  );
}
