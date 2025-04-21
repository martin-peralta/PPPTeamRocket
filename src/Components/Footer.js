import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.BackgroundFooter}>
        <img className={styles.Image} src={require("../Assets/Logo.png")}/>
        <p>
            Contactanos en: <br />
            <b>Numero: </b> <br />
            <b>Social Media:</b> <br />
            <b>Mail: </b>
        </p>
      </div>
    </div>
  )
}

export default Footer