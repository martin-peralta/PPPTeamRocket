import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 🔥 Importamos el contexto de autenticación
import { toast } from 'react-toastify';
import styles from './Navbar.module.css';
import { IoMdClose, IoMdMenu } from "react-icons/io";


const Navbar = () => {
    const [navBarOpen, setNavBarOpen] = useState(false);
    const { auth, logout } = useAuth(); // 🔥 auth y logout
    const navigate = useNavigate();

    const [windowDimension, setWindowDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const detectDimension = () => {
        setWindowDimension({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', detectDimension);
        if (windowDimension.width > 800) setNavBarOpen(false);
        return () => window.removeEventListener('resize', detectDimension);
    }, [windowDimension]);

    const links = [
        { id: 1, link: "Home", to: "/", type: "route" },
        { id: 2, link: "Account", to: "/account", type: "route" }, 
        { id: 3, link: "Cards", to: "/cards", type: "route" },
        { id: 4, link: "InProgress", to: "inprogress", type: "scroll" },
    ];

    const handleLogout = () => {
        logout();
        navigate('/'); // 🔥 Al hacer logout, redirigir al home
        setNavBarOpen(false);
    };

    return (
        <div className={navBarOpen ? styles.navOpen : styles.navBar}>
            {!navBarOpen && <p className={styles.logo}>Team Rocket Steal</p>}
            
            {windowDimension.width < 800 && (
                navBarOpen ? (
                    <IoMdClose
                        onClick={() => setNavBarOpen(false)}
                        color="#f1f1f1"
                        size={50}
                    />
                ) : (
                    <IoMdMenu
                        onClick={() => setNavBarOpen(true)}
                        color="#f1f1f1"
                        size={50}
                    />
                )
            )}

            {(navBarOpen || windowDimension.width > 800) && (
                <ul className={styles.linksContainer}>
                    {links.map((x) => (
                        <li key={x.id} style={{ listStyle: "none" }}>
                            {x.link === "InProgress" ? (
                                <button
                                    onClick={() => {
                                        toast.info("Work in progress 🚧", {
                                            position: "top-center",
                                            autoClose: 2000,
                                        });
                                        setNavBarOpen(false);
                                    }}
                                    className={styles.navLink}
                                    style={{ background: "none", border: "none", cursor: "pointer" }}
                                >
                                    {x.link}
                                </button>
                            ) : x.type === "scroll" ? (
                                <ScrollLink
                                    activeClass="active"
                                    to={x.to}
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    onClick={() => setNavBarOpen(false)}
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
                        </li>
                    ))}

                    {/* 🔥 Botón dinámico Log In / Log Out */}
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
