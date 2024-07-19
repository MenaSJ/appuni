const db = require('../config/db');

const Reportes = {
    deleteReporte: (reporteID, callback) => {
        const query = 'DELETE FROM Reportes WHERE ReporteID = ?';
        db.query(query, [reporteID], callback);
    }
};

module.exports = Reportes;
