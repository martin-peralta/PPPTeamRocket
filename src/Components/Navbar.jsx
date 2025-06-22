/*  Librerias y componentes    */
import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { toast } from 'react-toastify';                                 //Notificaciones/Toast
import { IoMdClose, IoMdMenu } from "react-icons/io";                   //Icono barra menu 

import styles from './Navbar.module.css'; //estilo css module


const Navbar = () => {
    const [navBarOpen, setNavBarOpen] = useState(false);
    const { auth, logout } = useAuth(); // auth y logout
    const navigate = useNavigate();


    /*  Estados dimensiones de la ventana*/
    const [windowDimension, setWindowDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    /*  Detector cambios de tamaño ventana*/
    const detectDimension = () => {
        setWindowDimension({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', detectDimension); //Manejo de dimensiones
        if (windowDimension.width > 800) setNavBarOpen(false);
        return () => window.removeEventListener('resize', detectDimension);
    }, [windowDimension]);


    /*  Enlaces*/
    const links = [
        { id: 1, link: "Home", to: "/", type: "route" },
        { id: 2, link: "Account", to: "/account", type: "route" }, 
        { id: 3, link: "Cards", to: "/cards", type: "route" },
        { id: 4, link: "Decks", to: "/decks", type: "route" },             // ✅ Nuevo
        { id: 5, link: "Collections", to: "/collections", type: "route" }, // ✅ Nuevo
        { id: 6, link: "InProgress", to: "inprogress", type: "scroll" },
    ];


    /*  Manejo Sesion cierre*/
    const handleLogout = () => {
        logout();
        navigate('/'); 
        setNavBarOpen(false);
    };

    return (
        <div className={navBarOpen ? styles.navOpen : styles.navBar}>

            {/*  "Logo"*/}
            {!navBarOpen && <p className={styles.logo}>Team Rocket Steal</p>}
            
            {/*  Menu que abre y cierra*/}
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

            {/*  Contenedor de enlaces*/}
            {(navBarOpen || windowDimension.width > 800) && (
                <ul className={styles.linksContainer}>

                    {/*  Mapeo enlaces*/}
                    {links.map((x) => (
                        <li key={x.id} style={{ listStyle: "none" }}>

                            {/*  Mapeo para InProgress / Toast*/}
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

                    {/* Botón dinámico LogIn/Out */}
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
