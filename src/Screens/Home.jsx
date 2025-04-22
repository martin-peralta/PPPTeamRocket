import React from 'react';
import { Link } from 'react-scroll';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.titleContainer}>
        <p>Collect them <br /><b>ALL</b></p>
      </div>
      
      <div className={styles.buttonsContainer}>
        {/* Boton Login */}
        <Link to="login-section" smooth duration={500} className={styles.callToAction}>
          Join Us
        </Link>
        
        {/* Boton Register */}
        <Link to="register-section" smooth duration={500} className={styles.callToAction}>
          Give Pokémons
        </Link>
      </div>
    </div>
  );
};

export default Home;