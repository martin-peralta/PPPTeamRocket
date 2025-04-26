import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [navBarOpen, setNavBarOpen] = useState(false);
    const { auth, logout } = useAuth();

    const [windowDimension, setWindowDimension] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });

    const detectDimension = () => {
        setWindowDimension({
            height: window.innerHeight,
            width: window.innerWidth,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', detectDimension);
        windowDimension.width > 800 && setNavBarOpen(false);
        return () => {
            window.removeEventListener('resize', detectDimension);
        };
    }, [windowDimension]);

    return (
        <div className={!navBarOpen ? styles.navBar : styles.navOpen}>
            {!navBarOpen && <p className={styles.logo}>Team Rocket Steal</p>}
            
            {!navBarOpen ? (
                <IoMdMenu
                    onClick={() => setNavBarOpen(!navBarOpen)}
                    color="#f1f1f1"
                    size={30}
                />
            ) : (
                <IoMdClose
                    onClick={() => setNavBarOpen(!navBarOpen)}
                    color="#f1f1f1"
                    size={30}
                />
            )}

            {navBarOpen && (
                <ul>
                    <div>
                        <Link to="/" className={styles.navLink} onClick={() => setNavBarOpen(false)}>
                            Home
                        </Link>
                        <div className={styles.border}></div>
                    </div>

                    {!auth && (
                        <>
                            <div>
                                <Link to="/login" className={styles.navLink} onClick={() => setNavBarOpen(false)}>
                                    Login
                                </Link>
                                <div className={styles.border}></div>
                            </div>
                            <div>
                                <Link to="/register" className={styles.navLink} onClick={() => setNavBarOpen(false)}>
                                    Register
                                </Link>
                                <div className={styles.border}></div>
                            </div>
                        </>
                    )}

                    {auth && (
                        <div>
                            <button onClick={logout} className={styles.navLink}>
                                Cerrar sesión
                            </button>
                            <div className={styles.border}></div>
                        </div>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Navbar;
