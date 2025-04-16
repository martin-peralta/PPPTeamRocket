import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom'; // Alias para diferenciar
import styles from './Navbar.module.css';
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { useScrollPosition } from '../Hooks/scrollsPositions';

const Navbar = () => {
    const [navBarOpen, setNavBarOpen] = useState(false);

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


    const links = [
        { id: 1, link: "Home", to: "", type: "route" },
        { id: 2, link: "Account", type: "scroll" },
        { id: 3, link: "PokeCards", type: "scroll" },
        { id: 4, link: "SignUp", type: "scroll" },
        { id: 5, link: "InProgress", type: "scroll" },
        { id: 6, link: "Perfil", to: "/perfil", type: "route" }, 
    ];

    const scrollPosition = useScrollPosition();

    return (
        <div className={
            navBarOpen
                ? styles.navOpen
                : scrollPosition > 0
                ? styles.navOnScroll
                : styles.navBar
        }>
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
                                    {x.link === "PokeCards" ? "Poke Cards" : x.link}
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
                                    {x.link === "PokeCards" ? "Poke Cards" : x.link}
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
                    <ScrollLink
                        onClick={() => setNavBarOpen(false)}
                        to="Contact"
                        smooth
                        duration={500}
                        className={styles.contactlink}
                    >
                        Contact
                    </ScrollLink>
                </ul>
            )}
        </div>
    );
};

export default Navbar;
