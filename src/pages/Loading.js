import React, { useState, useEffect } from 'react';
import './Loading.css';  // Importa los estilos

import logo from '../Assets/logomasterball.png';  // Imagen de la carga

function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <img src={logo} alt="cargando" className="rotating-img" />
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{progress}%</p>
    </div>
  );
}

export default Loading;
