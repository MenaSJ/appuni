const db = require('../config/db');

const Carrera = {
    getByUniversityId: (universidadID, callback) => {
        const query = `
            SELECT C.NombreCarrera
            FROM Universidades U
            JOIN Carreras C ON U.UniversidadID = C.UniversidadID
            WHERE U.UniversidadID = ?;
        `;
        db.query(query, [universidadID], callback);
    }
};

module.exports = Carrera;
