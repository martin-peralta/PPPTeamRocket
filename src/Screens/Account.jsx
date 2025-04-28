import React from 'react';
import { useAuth } from '../context/AuthContext'; // 🔥 Importamos el contexto
import styles from './Account.module.css';

const AccountPage = () => {
  const { auth } = useAuth(); // 🔥 Obtenemos auth
  
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
