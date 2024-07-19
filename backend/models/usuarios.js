const db = require('../config/db');

const Usuarios = {
    // Función para actualizar la contraseña
    actualizarContrasena: (usuarioID, nuevaContrasena, callback) => {
        const query = 'UPDATE Usuarios SET Contrasena = ? WHERE UsuarioID = ?';
        db.query(query, [nuevaContrasena, usuarioID], callback);
    }
};

module.exports = Usuarios;
