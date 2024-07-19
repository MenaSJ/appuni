const db = require('../config/db');

const Favoritos = {
    addFavorito: (usuarioID, universidadID, callback) => {
        const query = 'INSERT INTO Favoritos (UsuarioID, UniversidadID) VALUES (?, ?)';
        db.query(query, [usuarioID, universidadID], callback);
    },
    deleteFavorito: (favoritoID, callback) => {
        const query = 'DELETE FROM Favoritos WHERE FavoritoID = ?';
        db.query(query, [favoritoID], callback);
    }
};

module.exports = Favoritos;
