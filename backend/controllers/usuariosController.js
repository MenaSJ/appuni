const Usuarios = require('../models/usuarios');

// Función para actualizar la contraseña
const getUsuarios = (req, res) => {
    Usuarios.getUsuarios((err, results) => {
        if (err) {
            return res.status(500).send('Error del servidor.');
        }
        const updatedUsuarios = results.map(usuario => {
            return {
                ...usuario,
                "pwd": "",
                "roles": JSON.parse(usuario.roles)
            }
        })
        res.json(updatedUsuarios).status(200);
    })
};
const deleteUsuario = (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).send({'message':'Username necesario'})
    }
    Usuarios.deleteUsuario((err, results) => {
        if (err) {
            return res.status(500).send('Error del servidor.');
        }
        if (results.affectedRows === 0) {
            return res.sendStatus(400);
        }
        return res.sendStatus(200);
    })
}
const actualizarContrasena = (req, res) => {
    const { usuarioID } = req.params;
    const { nuevaContrasena } = req.body;
    if (!nuevaContrasena) {
        return res.status(400).send('Nueva contraseña es requerida.');
    }
    Usuarios.actualizarContrasena(usuarioID, nuevaContrasena, (err, results) => {
        if (err) {
            return res.status(500).send('Error al actualizar la contraseña.');
        }
        res.status(200).send('Contraseña actualizada exitosamente.');
    });
};

module.exports = {
    getUsuarios, deleteUsuario
};
