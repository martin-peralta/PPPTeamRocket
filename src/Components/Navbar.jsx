/* Librerías y componentes */
import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { IoMdClose, IoMdMenu } from "react-icons/io";
import styles from './Navbar.module.css';

const Navbar = () => {
  const [navBarOpen, setNavBarOpen] = useState(false);
  const { auth, logout } = useAuth();
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

  // Se eliminó "Cards" del array para manejarlo como un dropdown separado
  const links = [
    { id: 1, link: "Home", to: "/", type: "route" },
    { id: 2, link: "Account", to: "/account", type: "route" },
    { id: 4, link: "InProgress", to: "inprogress", type: "scroll" }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
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
          {/* Renderiza Home y Account */}
          {links.slice(0, 2).map((x) => (
            <li key={x.id} style={{ listStyle: "none" }}>
              <RouterLink
                to={x.to}
                onClick={() => setNavBarOpen(false)}
                className={styles.navLink}
              >
                {x.link}
              </RouterLink>
            </li>
          ))}
          
          {/* --- NUEVO DROPDOWN PARA "CARDS" --- */}
          <li style={{ listStyle: "none" }}>
            <div className={styles.dropdown}>
              <button className={styles.navLink}>Cards</button>
              <div className={styles.dropdownContent}>
                <RouterLink to="/cards" onClick={() => setNavBarOpen(false)} className={styles.navLink}>
                  Search Card
                </RouterLink>
                <RouterLink to="/scan" onClick={() => setNavBarOpen(false)} className={styles.navLink}>
                  Scan Card
                </RouterLink>
              </div>
            </div>
          </li>

          {/* Dropdown existente para "Collections & Inventory" */}
          <li style={{ listStyle: "none" }}>
            <div className={styles.dropdown}>
              <button className={styles.navLink}>Collections & Inventory</button>
              <div className={styles.dropdownContent}>
                <RouterLink to="/collections" onClick={() => setNavBarOpen(false)} className={styles.navLink}>
                  Inventory
                </RouterLink>
                <RouterLink to="/collections/mycollections" onClick={() => setNavBarOpen(false)} className={styles.navLink}>
                  My Collections
                </RouterLink>
                <RouterLink to="/collections/create" onClick={() => setNavBarOpen(false)} className={styles.navLink}>
                  Create Collection
                </RouterLink>
              </div>
            </div>
          </li>

          {/* Link de InProgress */}
          {links.slice(2).map((x) => (
            <li key={x.id} style={{ listStyle: "none" }}>
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
            </li>
          ))}

          {/* Botón Login/Logout */}
          <li style={{ listStyle: "none" }}>
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
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;