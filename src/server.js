// frontend/server.js

const express = require('express');
const path = require('path');
const app = express();

// Lee el puerto de la variable de entorno de Railway, o usa 3000 si no existe.
const port = process.env.PORT || 3000;

// Sirve los archivos estáticos de la carpeta 'build' (que se crea con 'npm run build').
app.use(express.static(path.join(__dirname, 'build')));

// Para cualquier otra petición, devuelve el 'index.html' de React.
// Esto es crucial para que el enrutamiento de React (React Router) funcione.
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor de frontend escuchando en el puerto ${port}`);
});