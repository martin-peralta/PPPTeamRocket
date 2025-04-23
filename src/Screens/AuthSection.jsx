import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthSection.module.css';

const AuthSection = () => {
  return (
    <div className={styles.authContainer}>
      <h2 className={styles.title}>Accede o crea tu cuenta</h2>
      
      <div className={styles.authLinks}>
        <Link to="/login" className={styles.link}>
          ¿Ya tienes cuenta? Inicia Sesión
        </Link>
        <Link to="/register" className={styles.link}>
          ¿Nuevo? Regístrate
        </Link>
      </div>
    </div>
  );
};

export default AuthSection;
