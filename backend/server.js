const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

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
app.use(bodyParser.json()); // Usar bodyParser para procesar datos JSON

// Ruta para obtener todas las universidades con sus carreras
app.get('/universidades', (req, res) => {
    const query = `
        SELECT u.UniversidadID, u.Nombre, u.Acronimo, u.PaginaWeb, u.Mision, u.Vision, u.Logo, 
               c.id AS CarreraID, c.nombre AS NombreCarrera
        FROM Universidades u
        LEFT JOIN Universidad_Carreras uc ON u.UniversidadID = uc.universidad_id
        LEFT JOIN Carreras c ON uc.carrera_id = c.id
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        // Objeto para almacenar las universidades indexadas por UniversidadID
        const universities = {};
        // Iterar sobre los resultados y construir el objeto universities
        results.forEach(row => {
            const universityID = row.UniversidadID;
            if (!universities[universityID]) {
                universities[universityID] = {
                    id: universityID,
                    nombre: row.Nombre,
                    siglas: row.Acronimo,
                    pagina_web: row.PaginaWeb,
                    mision: row.Mision,
                    vision: row.Vision,
                    logo: row.Logo,
                    carreras: [] // Inicializar el array de carreras
                };
            }
            // Agregar carrera a la universidad actual si existe
            if (row.CarreraID) {
                universities[universityID].carreras.push({
                    id: row.CarreraID,
                    nombre: row.NombreCarrera
                });
            }
        });
        // Convertir el objeto universities en un array de valores
        const universitiesArray = Object.values(universities);
        // Enviar la respuesta JSON con el array de universidades
        res.json(universitiesArray);
    });
});

app.get('/universidades/search', (req, res) => {
    const { q } = req.query;
    const queryUniversidades = `
        SELECT u.UniversidadID AS UniversidadID, u.nombre AS Nombre, u.Acronimo AS Acronimo, u.paginaweb AS PaginaWeb, u.mision AS Mision, u.vision AS Vision, u.logo AS Logo, 
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
                    vision: row.Vision,
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
        console.log(req.body);
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
                    console.log(results)
                    res.status(200).json({ _id: results[0]._id, nombre: results[0].nombre, apellido: results[0].apellido, estado: results[0].estado, email: results[0].correo, rol: results[0].role});
                } else {
                    res.status(401).json({ message: 'Correo o Contraseña incorrectas' });
                }
            } else {
                res.status(404).json({ message: 'Correo o Contraseña incorrectas' });
            }
        }
    });
});

// Recuperar contraseña
app.post('/usuarios/recover', (req, res) => {
    const { correo } = req.body;
    const token = crypto.randomBytes(20).toString('hex');
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);
    const query = 'SELECT correo FROM usuarios WHERE correo = ?';
    db.query(query, [correo], (err, result) => {
        if (err) {
            console.error('Error obtaining email:', err);
            res.status(500).json({ error: 'Error obteniendo correo' });
            return;
        }
        if (result.length === 0) {
            res.status(404).send('No se encontró el correo');
            return;
        }
        const correoDB = result[0].correo;
        if (correo === correoDB) {
            const updateTokenQuery = 'UPDATE usuarios SET token = ?, token_time = ? WHERE correo = ?';
            db.query(updateTokenQuery, [token, expirationTime, correo], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating token:', updateErr);
                    res.status(500).json({ error: 'Error actualizando token' });
                    return;
                }
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'juanPruebasb@gmail.com',
                        pass: 'jtia vsxs vekf xdwz',
                    },
                });
                const mailOptions = {
                    from: 'juanPruebasb@gmail.com',
                    to: correoDB,
                    subject: 'Recuperación de contraseña',
                    text: `Click en el siguiente enlace para recuperar tu contraseña: http://localhost:3000/reset-password/${token}`,
                };
                transporter.sendMail(mailOptions, (sendMailErr, info) => {
                    if (sendMailErr) {
                        console.error('Error sending email:', sendMailErr);
                        res.status(500).send('Error enviando correo');
                    } else {
                        console.log(`Correo enviado: ${info.response}`);
                        res.status(200).send('Revisa tu correo para instrucciones sobre cómo restablecer tu contraseña');
                    }
                });
            });
        } else {
            res.status(404).send('Correo no encontrado');
        }
    });
});
app.post('/reset-password/:token', (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const checkQuery = 'SELECT correo, token_time FROM usuarios WHERE token = ?';
    db.query(checkQuery, [token], (err, result) => {
        if (err) {
            console.error('Error checking token:', err);
            return res.status(500).send('Error interno del servidor');
        }

        if (result.length === 0) {
            return res.status(404).send('Token inválido');
        }

        const { correo, token_time } = result[0];
        const currentTime = new Date();
        if (currentTime > token_time) {
            return res.status(404).send('El token ha expirado');
        }

        bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
            if (hashErr) {
                console.error('Error hashing password:', hashErr);
                return res.status(500).send('Error interno del servidor');
            }

            const updateQuery = 'UPDATE usuarios SET contrasena = ?, token = NULL, token_time = NULL WHERE correo = ?';
            db.query(updateQuery, [hashedPassword, correo], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating password:', updateErr);
                    return res.status(500).send('Error actualizando la contraseña');
                }
                if (updateResult.affectedRows === 0) {
                    return res.status(404).send('Error actualizando la contraseña');
                }
                return res.status(200).send('Contraseña restablecida con éxito');
            });
        });
    });
});

// Endpoint para recuperar los datos del usuario
app.get('/usuarios/datos', (req, res) => {
    const { correo } = req.query; // Asegúrate de enviar el correo en la query string

    if (!correo) {
        return res.status(400).json({ message: 'Correo es requerido' });
    }

    db.query('SELECT _id, nombre, apellido, estado, correo FROM usuarios WHERE correo = ?', correo, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al recuperar los datos del usuario' });
        }

        if (results.length > 0) {
            const userData = results[0];
            res.status(200).json(userData);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    });
});

//ADMIN
// Admin - Mostrar todos los usuarios
app.get('/usuarios', (req, res) => {
    const query = 'SELECT nombre, apellido, correo FROM usuarios';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al recuperar los usuarios' });
        }

        res.status(200).json(results); // Devuelve la lista de usuarios
    });
});
 


// Ruta para eliminar usuario
app.delete('/usuarios', (req, res) => {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({ error: 'El correo electrónico es requerido' });
    }

    const query = 'DELETE FROM usuarios WHERE correo = ?';

    db.query(query, [correo], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al eliminar el usuario' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(204).send();
    });
});

// Ruta para crear la tabla de favoritos
app.post('/create-favoritos-table', (req, res) => {
    const query = `
        CREATE TABLE IF NOT EXISTS Favoritos (
            _id INT AUTO_INCREMENT PRIMARY KEY,
            UsuarioID INT NOT NULL,
            UniversidadID INT NOT NULL,
            FOREIGN KEY (UsuarioID) REFERENCES Usuarios(_id),
            FOREIGN KEY (UniversidadID) REFERENCES Universidades(UniversidadID)
        );
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error al crear la tabla de favoritos:', err);
            return res.status(500).send('Error al crear la tabla de favoritos.');
        }
        res.status(201).send('Tabla de favoritos creada exitosamente.');
    });
});

// Ruta para agregar un favorito
app.post('/favoritos', (req, res) => {
    const { UsuarioID, UniversidadID } = req.body;
    console.log(req.body)
    const query = 'INSERT INTO Favoritos (UsuarioID, UniversidadID) VALUES (?, ?)';

    db.query(query, [UsuarioID, UniversidadID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, UsuarioID, UniversidadID });
    });
});

// Ruta para obtener todos los favoritos de un usuario específico
app.get('/favoritos/:UsuarioID', (req, res) => {
    const { UsuarioID } = req.params;
    const query = 'SELECT * FROM Favoritos WHERE UsuarioID = ?';

    db.query(query, [UsuarioID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});
app.delete('/favoritos/:userId/:favoritoId', (req, res) => {
    const userId = req.params.userId;
    const favoritoId = req.params.favoritoId;
    const query = 'DELETE FROM Favoritos WHERE _id = ? AND UsuarioID = ?';

    db.query(query, [favoritoId, userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Favorito no encontrado para este usuario.');
        }
        res.status(200).send('Favorito eliminado exitosamente.');
    });
});

// Add a comment
app.post('/comentarios', (req, res) => {
    const { UniversidadID, UsuarioID, Comentario } = req.body;

    if (!UniversidadID || !UsuarioID || !Comentario) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    console.log(UsuarioID)

    const query = 'INSERT INTO comentarios (UniversidadID, UsuarioID, Comentario) VALUES (?, ?, ?)';
    db.query(query, [UniversidadID, UsuarioID, Comentario], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al agregar el comentario' });
        }
        res.status(201).json({ message: 'Comentario agregado exitosamente', comentarioID: results.insertId });
    });
});

// Get comments for a university
app.get('/comentarios/:universidadID', (req, res) => {
    const { universidadID } = req.params;

    const query = 'SELECT c.ComentarioID, c.Comentario, c.Fecha, u.nombre, u.apellido FROM comentarios c JOIN usuarios u ON c.UsuarioID = u._id WHERE c.UniversidadID = ? ORDER BY c.Fecha DESC';
    db.query(query, [universidadID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener los comentarios' });
        }
        res.status(200).json(results);
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