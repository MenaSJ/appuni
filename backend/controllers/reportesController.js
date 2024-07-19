const db = require('../config/db');

const Reportes = {
    // Función para crear la tabla de reportes
    createReportesTable: (req, res) => {
        const query = `
            CREATE TABLE IF NOT EXISTS Reportes (
                ReporteID INT AUTO_INCREMENT PRIMARY KEY,
                Titulo VARCHAR(255) NOT NULL,
                Descripcion TEXT,
                Fecha DATE
            );
        `;

        db.query(query, (err, result) => {
            if (err) {
                console.error('Error al crear la tabla de reportes:', err);
                return res.status(500).send('Error al crear la tabla de reportes.');
            }

            res.status(201).send('Tabla de reportes creada exitosamente.');
        });
    }
};

module.exports = Reportes;
