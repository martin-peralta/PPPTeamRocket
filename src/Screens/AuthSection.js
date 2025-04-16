import React from 'react';
import { Link } from 'react-scroll';
import Login from '../pages/Login';
import Register from '../pages/Register';
import styles from './AuthSection.module.css'; // Estilos opcionales

const AuthSection = () => {
  return (
    <div className={styles.authContainer}>
      {/* Login */}
      <div id="login-section" className={styles.section}>
        <Login />
      </div>
      
      {/* Register */}
      <div id="register-section" className={styles.section}>
        <Register />
      </div>
      
      {/* Enlaces internos */}
      <div className={styles.authLinks}>
        <Link to="login-section" smooth duration={500} className={styles.link}>
          ¿Ya tienes cuenta? Inicia Sesión
        </Link>
        <Link to="register-section" smooth duration={500} className={styles.link}>
          ¿Nuevo? Regístrate
        </Link>
      </div>
    </div>
  );
};

export default AuthSection;