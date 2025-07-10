import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Usaremos axios para consistencia
import { useAuth } from '../context/AuthContext';
import styles from './Account.module.css';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AccountPage = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [stats, setStats] = useState(null); // Nuevo estado para las estadísticas

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.user?._id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Hacemos las dos peticiones a la vez para más eficiencia
        const [collectionsRes, statsRes] = await Promise.all([
          axios.get(`/api/cards/collections/${auth.user._id}`),
          axios.get(`/api/cards/stats/${auth.user._id}`)
        ]);

        setCollections(collectionsRes.data.collections);
        setStats(statsRes.data);

      } catch (error) {
        console.error('Error fetching account data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth]);

  // Lógica para preparar los datos de los gráficos (solo si hay estadísticas)
  const rarityData = stats && {
    labels: Object.keys(stats.rarityDistribution),
    datasets: [{
      label: 'Cards by Rarity',
      data: Object.values(stats.rarityDistribution),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    }],
  };

  const typeData = stats && {
    labels: Object.keys(stats.typeDistribution),
    datasets: [{
      label: 'Cards by Type',
      data: Object.values(stats.typeDistribution),
      backgroundColor: '#36A2EB',
    }],
  };
  
  const barOptions = {
    indexAxis: 'y', // Opcional: para hacer las barras horizontales
    responsive: true,
    plugins: {
        legend: { display: false },
        title: { display: true, text: 'Card Types Distribution' }
    }
  };

  if (loading) {
    // Puedes usar tu componente <Loading /> si lo tienes
    return <div>Loading Account...</div>;
  }

  return (
    <div className={styles.esqueleto}>
      <div className={styles.Account}>
        <main className={styles.content}>
          <h1 className={styles.title}>My Account</h1>
          <p className={styles.description}>
            Welcome, {auth?.user?.name || 'Guest'}. Here you can view your personal information and collection stats.
          </p>

          <div className={styles.profileBox}>
            <p><strong>Name:</strong> {auth?.user?.name}</p>
            <p><strong>Mail:</strong> {auth?.user?.email}</p>
          </div>

          {/* --- SECCIÓN DE ESTADÍSTICAS --- */}
          {stats && stats.totalCards > 0 ? (
            <div className={styles.statsSection}>
              <h2 className={styles.sectionTitle}>Collection Statistics</h2>
              <div className={styles.summaryGrid}>
                <div className={styles.statBox}>
                  <h3>Total Cards</h3>
                  <p>{stats.totalCards}</p>
                </div>
                <div className={styles.statBox}>
                  <h3>Total Value</h3>
                  <p>${stats.totalValue}</p>
                </div>
              </div>
              <div className={styles.chartsGrid}>
                <div className={styles.chartBox}>
                  <h3>Rarity Distribution</h3>
                  <Doughnut data={rarityData} />
                </div>
                <div className={styles.chartBox}>
                  <Bar options={barOptions} data={typeData} />
                </div>
              </div>
            </div>
          ) : (
            <p>No cards in inventory to generate statistics.</p>
          )}

           {/* --- SECCIÓN DE COLECCIONES --- */}
           <div className={styles.collectionsSection}>
              <h2 className={styles.sectionTitle}>My Collections</h2>
              <ul style={{ paddingLeft: '1.5rem', listStyle: 'none' }}>
                {collections.length > 0 ? (
                  collections.map((col) => (
                    <li key={col._id} className={styles.collectionItem}>
                      <strong>{col.name}</strong>: {col.description || 'No description'} ({col.cards?.length || 0} cards)
                    </li>
                  ))
                ) : (
                  <li>No collections found.</li>
                )}
              </ul>
            </div>

        </main>
      </div>
    </div>
  );
};

export default AccountPage;