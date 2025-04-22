import React from 'react'
import styles from './Footer.module.css'
import logo from '../Assets/Logo.png'

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.footerContent}>
        <img className={styles.Image} src={logo} alt="Logo de la aplicación" />
        <p>
          Contáctanos en: <br />
          <b>Teléfono:</b> +56 9 1234 5678 <br />
          <b>Redes Sociales:</b> @miapp (Instagram, Twitter) <br />
          <b>Email:</b> contacto@miapp.com
        </p>
      </div>
    </footer>
  )
}

export default Footer
