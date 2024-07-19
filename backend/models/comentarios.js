const db = require('../config/db');

const Comentarios = {
    agregarComentario: (usuarioID, reporteID, comentario, fecha, callback) => {
        const query = 'INSERT INTO Comentarios (UsuarioID, ReporteID, Comentario, Fecha) VALUES (?, ?, ?, ?)';
        db.query(query, [usuarioID, reporteID, comentario, fecha], callback);
    },
    eliminarComentario: (comentarioID, callback) => {
        const query = 'DELETE FROM Comentarios WHERE ComentarioID = ?';
        db.query(query, [comentarioID], callback);
    }
};

module.exports = Comentarios;
