const db = require('../config/db');

const Favoritos = {
    // Función para crear la tabla de favoritos
    createFavoritosTable: (req, res) => {
        const query = `
            CREATE TABLE IF NOT EXISTS Favoritos (
                FavoritoID INT AUTO_INCREMENT PRIMARY KEY,
                UsuarioID INT NOT NULL,
                UniversidadID INT NOT NULL,
                FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID),
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
    }
};

module.exports = Favoritos;
