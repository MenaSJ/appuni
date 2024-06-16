const express = require('express');
const app = express();
require('dotenv').config();

const rutas = require('./routes/rutas');

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Rutas
app.use('/', rutas);

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});