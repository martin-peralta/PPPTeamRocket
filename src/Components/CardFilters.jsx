// src/components/CardFilters.jsx
import React from 'react';
import styles from './CardFilters.module.css';

function CardFilters({ selectedRarity, setSelectedRarity, selectedType, setSelectedType, maxHP, setMaxHP }) {
  return (
    <div className={styles.filters}>
      <label>
        Rarity:
        <select
          onChange={(e) => setSelectedRarity(e.target.value)}
          value={selectedRarity}
          className={styles.select}
        >
          <option value="">All</option>
          <option value="Common">Common</option>
          <option value="Uncommon">Uncommon</option>
          <option value="Rare">Rare</option>
          <option value="Rare Holo">Rare Holo</option>
          <option value="Promo">Promo</option>
        </select>
      </label>

      <label>
        Type:
        <select
          onChange={(e) => setSelectedType(e.target.value)}
          value={selectedType}
          className={styles.select}
        >
          <option value="">All</option>
          <option value="Fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Electric">Electric</option>
          <option value="Grass">Grass</option>
          <option value="Psychic">Psychic</option>
          <option value="Fighting">Fighting</option>
          <option value="Darkness">Darkness</option>
          <option value="Metal">Metal</option>
          <option value="Dragon">Dragon</option>
          <option value="Fairy">Fairy</option>
          <option value="Colorless">Colorless</option>
        </select>
      </label>

      <label>
        Max HP:
        <input
          type="number"
          min="0"
          value={maxHP}
          onChange={(e) => setMaxHP(e.target.value)}
          className={styles.input}
          placeholder="e.g. 100"
        />
      </label>
    </div>
  );
}

export default CardFilters;
