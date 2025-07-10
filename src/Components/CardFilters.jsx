import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CardFilters.module.css';

// Ahora el componente recibe directamente los filtros y las funciones para cambiarlos.
function CardFilters({ filters, setFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rarities, setRarities] = useState([]);
  const [types, setTypes] = useState([]);

  // useEffect para cargar las opciones de filtros cuando el componente se monta
  useEffect(() => {
    // Usamos las nuevas rutas del backend
    axios.get('/api/pokemon/rarities').then(res => setRarities(res.data));
    axios.get('/api/pokemon/types').then(res => setTypes(res.data));
  }, []);

  const toggleFilters = () => setIsOpen(prev => !prev);

  // Función que actualiza el estado de los filtros en el componente padre
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      rarity: '',
      type: '',
      maxHP: ''
    });
  };

  return (
    <div className={styles.dropdownContainer}>
      <button onClick={toggleFilters} className={styles.filterButton}>
        {isOpen ? 'Close Filters ▲' : 'Filters ▼'}
      </button>

      {isOpen && (
        <div className={styles.filtersPanel}>
          <label>
            Rarity:
            <select
              name="rarity" // El 'name' es importante para handleFilterChange
              onChange={handleFilterChange}
              value={filters.rarity}
              className={styles.select}
            >
              <option value="">All</option>
              {/* Mapeamos las rarezas obtenidas de la API */}
              {rarities.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>

          <label>
            Type:
            <select
              name="type"
              onChange={handleFilterChange}
              value={filters.type}
              className={styles.select}
            >
              <option value="">All</option>
              {/* Mapeamos los tipos obtenidos de la API */}
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>

          <label>
            Max HP:
            <input
              name="maxHP"
              type="number"
              min="0"
              value={filters.maxHP}
              onChange={handleFilterChange}
              className={styles.input}
              placeholder="e.g. 100"
            />
          </label>
          
          <div className={styles.buttonGroup}>
             {/* Ya no necesitamos el botón "Apply", solo el de limpiar */}
            <button onClick={handleClearFilters} className={styles.clearButton}>
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardFilters;