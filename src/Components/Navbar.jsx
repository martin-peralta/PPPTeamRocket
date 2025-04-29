import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { IoMdClose, IoMdMenu } from "react-icons/io";

// Toast
import { toast } from 'react-toastify';

const Navbar = () => {
    const [navBarOpen, setNavBarOpen] = useState(false);
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
        { id: 5, link: "Log In", to: "/login", type: "route" }, 
    ];

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
                                // Si el link es InProgress, mostrar un botón que dispare el toast
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
                                // Si es de tipo scroll, usar ScrollLink
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
                                // Si no, usar RouterLink normal
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
                </ul>
            )}
        </div>
    );
};

export default Navbar;