import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import styles from './Navbar.module.css';
import { IoMdClose, IoMdMenu } from "react-icons/io";

const Navbar = () => {
    

        const[navBarOpen, setNavBarOpen] = useState(false)

        /*  Ajuste de tamaño pagina Navbar   */
        const[windowDimension, setWindowDimension] = useState({
            height: window.innerHeight,
            width: window.innerWidth,
        });

        /* cambio constante */ 
        const detectDimension = () => {
            setWindowDimension({
                height: window.innerHeight,
                width: window.innerWidth,
            })
        }
        useEffect(() =>{
            window.addEventListener('resize', detectDimension)
            windowDimension.width > 800 && setNavBarOpen(false)
            return () =>{
                window.removeEventListener('resize', detectDimension)
            }
        },[windowDimension]);


    /*Links para el navBar (No funcionales)*/
    const links = [
        {   
            id: 1,
            link: "Home",
        },
        {   
            id: 2,
            link: "Account",
        },
        {  
            id: 3,
            link: "PokeCards",
        },
        {   
            id: 4,
            link: "SignUp",
        },
        {   
            id: 5,
            link: "InProgress",
        },
    ]
  return (  
    <div className={!navBarOpen === true ? styles.navBar : styles.navOpen}>
        {!navBarOpen && <p className={styles.logo}>Team Rocket Steal</p>}
        {!navBarOpen ? (
            <IoMdMenu onClick={() => setNavBarOpen(!navBarOpen)}
            color="#f1f1f1"  
            size = {30} />
        ): (
            <IoMdClose onClick={() => setNavBarOpen(!navBarOpen)} 
            color="#f1f1f1" 
            size = {30}/>
        )} 
        {navBarOpen && (
            <ul>
                {links.map(x => (
                    <div>
                        <Link
                        onClick={() => setNavBarOpen(false)}
                            to={x.link}
                            smooth
                            duration={500}
                            className={styles.navLink}
                            
                        >{x.link === "PokeCards" ? "Poke Cards" : x.link} </Link>
                        <div className={styles.border}></div>
                    </div>
                ))}
            </ul>
        )}
    </div>
 );
}
export default Navbar