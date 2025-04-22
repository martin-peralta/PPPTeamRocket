import React from 'react'
import styles from "./Home.module.css"
import { Link } from "react-scroll"



const Home = () => {
  return (
    
    <div className={styles.home}>
      <div className={styles.titleContainer}>
          <p>
            Collet them <br />
            <b>ALL</b>
          </p>
      </div>

    <div>
        <Link to="/singup" smooth duration={500} className={styles.callToAction} > 
        Join Us
        </Link>
        <Link to="/cards" smooth duration={500} className={styles.callToAction} > 
        See Cards 
        </Link>
        
      </div>

      <div className={styles.TextHome}>
        <p>
        Join Team Rocket to level up your Pokémon passion! 
        Safely store your cards, access exclusive resources, trade with members, and join a bold community. 
        Protect your rare treasures and dominate battles. Ready to rise? 🚀✨
        </p>

      </div>



    </div>
    
  )
}

export default Home













