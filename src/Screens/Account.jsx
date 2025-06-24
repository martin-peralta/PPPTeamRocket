/*  Librerías y componentes    */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './Account.module.css';
import Loading from '../pages/Loading';

const AccountPage = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      if (!auth?.user?._id) return;

      try {
        const response = await fetch(`http://localhost:5000/api/cards/collections/${auth.user._id}`);
        const data = await response.json();

        if (response.ok) {
          setCollections(data.collections);
        } else {
          console.error('Error al obtener colecciones:', data.message);
        }
      } catch (error) {
        console.error('Error al obtener colecciones:', error);
      }
    };

    fetchCollections();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [auth]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.esqueleto}>
      <div className={styles.Account}>
        <main className={styles.content}>
          <h1 className={styles.title}>My Account</h1>
          <p className={styles.description}>
            Welcome to your account. Here you can view your personal information and collections.
          </p>

          <div className={styles.profileBox}>
            <p><strong>Name:</strong> {auth?.user?.name || 'Guest'}</p>
            <p><strong>Mail:</strong> {auth?.user?.email || 'Not available'}</p>
            <p><strong>Collections:</strong></p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              {collections.length > 0 ? (
                collections.map((col) => (
                  <li key={col._id}>
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
