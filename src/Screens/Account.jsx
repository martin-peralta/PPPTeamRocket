/*  Librerías y componentes    */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './Account.module.css';
import Loading from '../pages/Loading'; // Pantalla de carga
import { useNavigate } from 'react-router-dom'; // hook para redirección

const AccountPage = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // hook 

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

          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '40px' }}>
            {/* Collections */}
            <div style={{
              width: '260px',
              height: '200px',
              border: '1px solid white',
              borderRadius: '16px',
              textAlign: 'center',
              padding: '20px',
              backgroundColor: '#222'
            }}>
              <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Collections</h3>
              <button
                style={{ fontSize: '24px', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => navigate('/collections')}
              >
                +
              </button>
              <p style={{ marginTop: '10px', fontSize: '14px' }}>add new one</p>
              {/* mostrar carta favorita en un futuro */}
            </div>

            {/* Decks */}
            <div style={{
              width: '260px',
              height: '200px',
              border: '1px solid white',
              borderRadius: '16px',
              textAlign: 'center',
              padding: '20px',
              backgroundColor: '#222'
            }}>
              <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Decks</h3>
              <button
                style={{ fontSize: '24px', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => navigate('/decks')}
              >
                +
              </button>
              <p style={{ marginTop: '10px', fontSize: '14px' }}>add new one</p>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AccountPage;
