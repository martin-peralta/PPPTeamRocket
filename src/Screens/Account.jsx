import React from 'react';
import styles from './Account.module.css';

const AccountPage = () => {
    return (
        <div classname= {styles.esqueleto}>
        <div className= {styles.Account}>
            <main className={styles.content}>
            
                <h1 className={styles.title}>My Account</h1>
                <p className={styles.description}>
                    See and edit your collection.
                </p>

                <div className={styles.profileBox}>
                    <p><strong>Username:</strong> Ash Ketchum</p>
                    <p><strong>Mail:</strong> ash@paleta.com</p>
                    <p><strong>Collections:</strong> Pikachu 233, Charizard 121, Bulbasaur 111, Squirtle 177</p>
                </div>
            </main>
        </div>
    </div>
    );
};

export default AccountPage;
