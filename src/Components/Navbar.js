import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 🔥 Importamos useAuth
import styles from './Navbar.module.css';
import { IoMdClose, IoMdMenu } from "react-icons/io";

const Navbar = () => {
    const [navBarOpen, setNavBarOpen] = useState(false);
    const { auth, logout } = useAuth(); // 🔥 auth y logout
    const navigate = useNavigate();

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

    const handleLogout = () => {
        logout();
        navigate('/'); // 🔥 Redirigir a Home después de cerrar sesión
    };

    const links = [
        { id: 1, link: "Home", to: "/", type: "route" },
        { id: 2, link: "Account", to: "/account", type: "route" },
        { id: 3, link: "Cards", to: "/cards", type: "route" },
        { id: 5, link: "InProgress", type: "scroll" },
    ];

    return (
        <div className={navBarOpen ? styles.navOpen : styles.navBar}>
            {!navBarOpen && <p className={styles.logo}>Team Rocket Steal</p>}

            {!navBarOpen && windowDimension.width < 800 ? (
                <IoMdMenu
                    onClick={() => setNavBarOpen(!navBarOpen)}
                    color="#f1f1f1"
                    size={30}
                />
            ) : windowDimension.width < 800 && (
                <IoMdClose
                    onClick={() => setNavBarOpen(!navBarOpen)}
                    color="#f1f1f1"
                    size={30}
                />
            )}

            {navBarOpen && (
                <ul className={styles.linksContainer}>
                    {links.map((x) => (
                        <div key={x.id}>
                            {x.type === "scroll" ? (
                                <ScrollLink
                                    onClick={() => setNavBarOpen(false)}
                                    to={x.link}
                                    smooth
                                    duration={500}
                                    className={styles.navLink}
                                >
                                    {x.link}
                                </ScrollLink>
                            ) : (
                                <RouterLink
                                    to={x.to}
                                    onClick={() => setNavBarOpen(false)}
                                    className={styles.navLink}
                                >
                                    {x.link}
                                </RouterLink>
                            )}
                            <div className={styles.border}></div>
                        </div>
                    ))}

                    {/* 🔥 Botón dinámico para móvil */}
                    {!auth ? (
                        <RouterLink
                            to="/login"
                            onClick={() => setNavBarOpen(false)}
                            className={styles.loginButton}
                        >
                            Log In
                        </RouterLink>
                    ) : (
                        <button
                            onClick={() => {
                                handleLogout();
                                setNavBarOpen(false);
                            }}
                            className={styles.loginButton}
                        >
                            Log Out ({auth.user.name})
                        </button>
                    )}
                </ul>
            )}

            {windowDimension.width > 800 && (
                <ul className={styles.linksContainer}>
                    {links.map((x) => (
                        <div key={x.id}>
                            {x.type === "scroll" ? (
                                <ScrollLink
                                    onClick={() => setNavBarOpen(false)}
                                    to={x.link}
                                    smooth
                                    duration={500}
                                    className={styles.navLink}
                                >
                                    {x.link}
                                </ScrollLink>
                            ) : (
                                <RouterLink
                                    to={x.to}
                                    onClick={() => setNavBarOpen(false)}
                                    className={styles.navLink}
                                >
                                    {x.link}
                                </RouterLink>
                            )}
                            <div className={styles.border}></div>
                        </div>
                    ))}

                    {/* 🔥 Botón dinámico para escritorio */}
                    {!auth ? (
                        <RouterLink to="/login" className={styles.loginButton}>
                            Log In
                        </RouterLink>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className={styles.loginButton}
                        >
                            Log Out ({auth.user.name})
                        </button>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Navbar;
