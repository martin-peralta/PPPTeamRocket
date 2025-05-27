import React, { useState } from 'react';
import styles from './CardFilters.module.css';

function CardFilters({
  selectedRarity,
  setSelectedRarity,
  selectedType,
  setSelectedType,
  maxHP,
  setMaxHP,
  onApplyFilters,
  onClearFilters
}) {
  const [isOpen, setIsOpen] = useState(false);


  const [localRarity, setLocalRarity] = useState(selectedRarity);
  const [localType, setLocalType] = useState(selectedType);
  const [localHP, setLocalHP] = useState(maxHP);

  const toggleFilters = () => setIsOpen(prev => !prev);

  const handleApply = () => {
    setSelectedRarity(localRarity);
    setSelectedType(localType);
    setMaxHP(localHP);
    setIsOpen(false);
    if (onApplyFilters) onApplyFilters();
  };

  const handleClear = () => {
    setLocalRarity('');
    setLocalType('');
    setLocalHP('');
    setSelectedRarity('');
    setSelectedType('');
    setMaxHP('');
    if (onClearFilters) onClearFilters();
  };

  return (
    <div className={styles.dropdownContainer}>
      <button onClick={toggleFilters} className={styles.filterButton}>
        {isOpen ? 'Close Filters ▲' : 'Filter ▼'}
      </button>

      {isOpen && (
        <div className={styles.filtersPanel}>
          <label>
            Rarity:
            <select
              onChange={(e) => setLocalRarity(e.target.value)}
              value={localRarity}
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
              onChange={(e) => setLocalType(e.target.value)}
              value={localType}
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
              value={localHP}
              onChange={(e) => setLocalHP(e.target.value)}
              className={styles.input}
              placeholder="e.g. 100"
            />
          </label>

          <div className={styles.buttonGroup}>
            <button onClick={handleApply} className={styles.applyButton}>
              Apply Filters
            </button>
            <button onClick={handleClear} className={styles.clearButton}>
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardFilters;
