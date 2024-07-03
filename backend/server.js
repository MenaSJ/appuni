const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql');

// Configuración de la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos');
    }
});

// Inicializar la aplicación Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Definición de rutas y modelos

// Ruta para obtener carreras por universidad
app.get('/universidades/:id/carreras', (req, res) => {
    const universidadID = req.params.id;
    const query = `
        SELECT C.NombreCarrera
        FROM Universidades U
        JOIN Carreras C ON U.UniversidadID = C.UniversidadID
        WHERE U.UniversidadID = ?;
    `;
    db.query(query, [universidadID], (err, results) => { 
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Ruta para obtener todas las universidades
app.get('/universidades', (req, res) => {
    const query = 'SELECT UniversidadID, Nombre, Acronimo, PaginaWeb, Vision, Mision, Logo FROM Universidades';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});
// Buscar universidades por nombre o acrónimo 
app.get('/universidades/search', (req, res) => {
    const { q } = req.query;
    const query = 'SELECT UniversidadID, Nombre, Acronimo, PaginaWeb, Vision, Mision, Logo FROM Universidades WHERE Nombre LIKE ? OR Acronimo LIKE ?';
    const searchTerm = `%${q}%`;
    db.query(query, [searchTerm, searchTerm], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Crear una nueva universidad
app.post('/universidades', (req, res) => {
    const { Nombre, Acronimo, PaginaWeb, Vision, Mision, Logo } = req.body;
    const query = 'INSERT INTO Universidades (Nombre, Acronimo, PaginaWeb, Vision, Mision, Logo) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [Nombre, Acronimo, PaginaWeb, Vision, Mision, Logo], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, Nombre, Acronimo, PaginaWeb, Vision, Mision, Logo });
    });
});

// Actualizar una universidad
app.put('/universidades/:id', (req, res) => {
    const universidadID = req.params.id;
    const { Nombre, Acronimo, PaginaWeb, Vision, Mision, Logo } = req.body;
    const query = 'UPDATE Universidades SET Nombre = ?, Acronimo = ?, PaginaWeb = ?, Vision = ?, Mision = ?, Logo = ? WHERE UniversidadID = ?';
    db.query(query, [Nombre, Acronimo, PaginaWeb, Vision, Mision, Logo, universidadID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: universidadID, Nombre, Acronimo, PaginaWeb, Vision, Mision, Logo });
    });
});

// Eliminar una universidad
app.delete('/universidades/:id', (req, res) => {
    const universidadID = req.params.id;
    const query = 'DELETE FROM Universidades WHERE UniversidadID = ?';
    db.query(query, [universidadID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
















// const express = require('express');
// const app = express();
// const cors = require('cors')
// require('dotenv').config();

// const rutas = require('./routes/rutas');

// // Middleware para parsear el cuerpo de las solicitudes
// app.use(cors());
// app.use(express.json());

// // Rutasa
// app.use('/', rutas);

// // Inicia el servidor
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Servidor ejecutándose en http://localhost:${port}`);
// });