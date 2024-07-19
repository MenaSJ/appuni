const Usuarios = require('../models/usuarios');

// Función para actualizar la contraseña
const actualizarContrasena = (req, res) => {
    const { usuarioID } = req.params;
    const { nuevaContrasena } = req.body;

    if (!nuevaContrasena) {
        return res.status(400).send('Nueva contraseña es requerida.');
    }

    Usuarios.actualizarContrasena(usuarioID, nuevaContrasena, (err, result) => {
        if (err) {
            console.error('Error al actualizar la contraseña:', err);
            return res.status(500).send('Error al actualizar la contraseña.');
        }

        res.status(200).send('Contraseña actualizada exitosamente.');
    });
};

module.exports = {
    actualizarContrasena
};
