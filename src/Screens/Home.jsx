import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // 🔥 Importamos RouterLink
import { useAuth } from '../context/AuthContext'; // 🔥 Importamos el contexto
import styles from "./Home.module.css";

const Home = () => {
  const { auth } = useAuth(); // 🔥 Obtenemos auth para saber si está logueado

  return (
    <div className={styles.home}>
      <div className={styles.titleContainer}>
        <p>
          Collect them <br />
          <b>ALL</b>
        </p>
      </div>

      <div>
        <RouterLink
          to={auth ? "/account" : "/register"} // 🔥 Si logueado -> account, si no -> register
          className={styles.callToAction}
        >
          Join Us
        </RouterLink>

        <RouterLink
          to="/cards" // 🔥 Siempre a /cards
          className={styles.callToAction}
        >
          See Cards
        </RouterLink>
      </div>

      <div className={styles.TextHome}>
        <p>
          Join Team Rocket to level up your Pokémon passion! 
          Safely store your cards, access exclusive resources, trade with members, and join a bold community. 
          Protect your rare treasures and dominate battles. Ready to rise? 🚀✨
        </p>
      </div>
    </div>
  );
};

export default Home;
