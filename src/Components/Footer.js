


/*  Librerias y componentes    */
import React from 'react'
import styles from './Footer.module.css'
import logo from '../Assets/Logo.png'
const Footer = () => {
  return (
    /* styles y orden del footer */
    <footer className={styles.Footer}>
      <div className={styles.footerContent}>
        <img className={styles.Image} src={logo} alt="Logo" />

        <p>
          Contact: <br />
          <b>Number:</b> +56 9 1234 5678 <br />
          <b>Social Media:</b> @TRts (Instagram, Twitter) <br />
          <b>Email:</b> meowth@TRts.com
        </p>

      </div>
    </footer>
  )
}

export default Footer
