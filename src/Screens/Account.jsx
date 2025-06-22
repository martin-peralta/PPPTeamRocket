/*  Librerías y componentes    */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './Account.module.css';
import Loading from '../pages/Loading'; // Pantalla de carga

const AccountPage = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);

  // Simula carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 segundos

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.esqueleto}>
      <div className={styles.Account}>
        <main className={styles.content}>
          <h1 className={styles.title}>My Account</h1>
          <p className={styles.description}>
            See and edit your collection.
          </p>

          <div className={styles.profileBox}>
            <p><strong>Name:</strong> {auth?.user?.name || 'Guest'}</p>
            <p><strong>Mail:</strong> {auth?.user?.email || 'Not available'}</p>
            <p><strong>Collections:</strong> Pikachu 233, Charizard 121, Bulbasaur 111, Squirtle 177</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountPage;
