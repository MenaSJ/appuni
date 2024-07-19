const db = require('../config/db');

const Comentarios = {
    // Función para crear la tabla de comentarios
    createComentariosTable: (req, res) => {
        const query = `
            CREATE TABLE IF NOT EXISTS Comentarios (
                ComentarioID INT AUTO_INCREMENT PRIMARY KEY,
                UsuarioID INT NOT NULL,
                ReporteID INT NOT NULL,
                Comentario TEXT NOT NULL,
                Fecha DATE,
                FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID),
                FOREIGN KEY (ReporteID) REFERENCES Reportes(ReporteID)
            );
        `;

        db.query(query, (err, result) => {
            if (err) {
                console.error('Error al crear la tabla de comentarios:', err);
                return res.status(500).send('Error al crear la tabla de comentarios.');
            }

            res.status(201).send('Tabla de comentarios creada exitosamente.');
        });
    },

    agregarComentario: (req, res) => {
        const { usuarioID, reporteID, comentario, fecha } = req.body;

        if (!usuarioID || !reporteID || !comentario || !fecha) {
            return res.status(400).send('Faltan datos necesarios.');
        }

        const query = 'INSERT INTO Comentarios (UsuarioID, ReporteID, Comentario, Fecha) VALUES (?, ?, ?, ?)';
        db.query(query, [usuarioID, reporteID, comentario, fecha], (err, result) => {
            if (err) {
                console.error('Error al agregar comentario:', err);
                return res.status(500).send('Error al agregar comentario.');
            }

            res.status(201).send('Comentario agregado exitosamente.');
        });
    },

    eliminarComentario: (req, res) => {
        const { comentarioID } = req.params;

        const query = 'DELETE FROM Comentarios WHERE ComentarioID = ?';
        db.query(query, [comentarioID], (err, result) => {
            if (err) {
                console.error('Error al eliminar comentario:', err);
                return res.status(500).send('Error al eliminar comentario.');
            }

            res.status(200).send('Comentario eliminado exitosamente.');
        });
    }
};

module.exports = Comentarios;
