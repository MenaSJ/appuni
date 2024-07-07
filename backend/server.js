const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

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
// app.get('/universidades/search', (req, res) => {
//     const { q } = req.query;
//     const query = 'SELECT UniversidadID, Nombre, Acronimo, PaginaWeb, Vision, Mision, Logo FROM Universidades WHERE Nombre LIKE ? OR Acronimo LIKE ?';
//     const searchTerm = `%${q}%`;
//     db.query(query, [searchTerm, searchTerm], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(results);
//     });
// });
app.get('/universidades/search', (req, res) => {
    const { q } = req.query;
    const queryUniversidades = `
        SELECT u.UniversidadID AS UniversidadID, u.nombre AS Nombre, u.Acronimo AS Acronimo, u.paginaweb AS PaginaWeb, u.mision AS Mision, u.logo AS Logo, 
               c.id AS CarreraID, c.nombre AS NombreCarrera
        FROM Universidades u
        LEFT JOIN Universidad_Carreras uc ON u.UniversidadID = uc.universidad_id
        LEFT JOIN Carreras c ON uc.carrera_id = c.id
        WHERE u.nombre LIKE ? OR u.acronimo LIKE ?
    `;
    const searchTerm = `%${q}%`;
    db.query(queryUniversidades, [searchTerm, searchTerm], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Organizar los resultados en un formato adecuado
        const universities = {};
        results.forEach(row => {
            if (!universities[row.UniversidadID]) {
                universities[row.UniversidadID] = {
                    id: row.UniversidadID,
                    nombre: row.Nombre,
                    siglas: row.Acronimo,
                    pagina_web: row.PaginaWeb,
                    mision: row.Mision,
                    logo: row.Logo,
                    carreras: []
                };
            }
            if (row.CarreraID) {
                universities[row.UniversidadID].carreras.push({
                    id: row.CarreraID,
                    nombre: row.NombreCarrera
                });
            }
        });
        // Convertir el objeto en un array antes de enviar la respuesta
        const universitiesArray = Object.values(universities);
        res.json(universitiesArray);
    });
});
app.get('/universidades/carreras', (req, res) => {
    const { ids } = req.query;
    if (!ids) {
        return res.status(400).json({ error: 'No university IDs provided' });
    }
    const universityIds = ids.split(',').map(id => parseInt(id, 10));
    const query = 'SELECT carreraID, nombreCarrera, universidadId FROM Carreras WHERE UniversidadID IN (?)';
    db.query(query, [universityIds], (err, results) => {
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
    console.log(res)
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


//Registrar usuarios
app.post('/usuarios/register', async (req, res) => {
    try {
        const { nombre, apellido, estado, correo, contrasena } = req.body;
        console.log('Datos recibidos:', req.body); // Log de los datos recibidos

        if (!nombre || !apellido || !estado || !correo || !contrasena) {
            console.error('Faltan campos obligatorios');
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const hash = await bcrypt.hash(contrasena, 10);
        console.log('Contraseña hash generada');

        const newUser = {
            nombre,
            apellido,
            estado,
            correo,
            contrasena: hash
        };

        const query = 'INSERT INTO usuarios (nombre, apellido, estado, correo, contrasena) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [newUser.nombre, newUser.apellido, newUser.estado, newUser.correo, newUser.contrasena], (err, result) => {
            if (err) {
                console.error('Error al registrar usuario en la base de datos:', err);
                return res.status(500).json({ message: 'Error al registrar usuario en la base de datos', error: err });
            }

            res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
            console.log('Usuario registrado exitosamente');
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});


//Login del usuario
app.post('/usuarios/login', (req, res) => {
    const { correo, contrasena } = req.body;

    db.query('SELECT * FROM usuarios WHERE correo = ?', correo, async (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error al iniciar sesión' });
        } else {
            if (results.length > 0) {
                const isMatch = await bcrypt.compare(contrasena, results[0].contrasena);
                if (isMatch) {
                    res.status(200).json({ message: 'Login exitoso' });
                } else {
                    res.status(401).json({ message: 'Contraseña incorrecta' });
                }
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        }
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