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
        <Link to="Singup" smooth duration={500} className={styles.callToAction} > 
        Join Us
        </Link>
        <Link to="Singup" smooth duration={500} className={styles.callToAction} > 
        Give Pokemons 
        </Link>
      </div>
    </div>
    
  )
}

export default Home













