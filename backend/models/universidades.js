const db = require('../config/db');

const Universidades = {
    getAll: (callback) => {
        const query = 'SELECT UniversidadID, Nombre, Acronimo, PaginaWeb, Vision, Mision, Logo FROM Universidades';
        db.query(query, callback);
    }
};

module.exports = Universidades;
