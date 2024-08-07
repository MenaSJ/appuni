const User = require('../models/usuarios');
const getUsuarios = async (req, res) => {
    try {
        const { username: currentUsername } = req.body; // Obtener el nombre de usuario desde el cuerpo de la solicitud

        console.log('Cuerpo de la solicitud:', req.body); // Agrega este log para verificar el cuerpo de la solicitud
        const usuarios = await User.find({ username: { $ne: currentUsername } }); // Encuentra todos los usuarios excepto el actual
        console.log('Usuarios encontrados:', usuarios); // Agrega este log para verificar los usuarios encontrados

        if (!usuarios.length) {
            return res.status(404).send('No hay usuarios disponibles.'); // Maneja el caso donde no hay usuarios
        }

        const updatedUsuarios = usuarios.map(usuario => {
            const userObject = usuario.toObject();
            return {
                ...userObject,
                "pwd": "",  // No envíes la contraseña
                "roles": typeof userObject.roles === 'string' ? JSON.parse(userObject.roles) : userObject.roles  // Convierte roles de string a objeto si es necesario
            };
        });

        res.json(updatedUsuarios).status(200);
    } catch (err) {
        console.error('Error del servidor:', err); // Agrega este log para verificar errores
        res.status(500).send('Error del servidor.');
    }
};


// Eliminar un usuario
const deleteUsuario = async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).send({'message': 'Username necesario'});
    }

    try {
        const result = await User.deleteOne({ username });
        if (result.deletedCount === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.status(200).send('Usuario eliminado');
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).send('Error del servidor.');
    }
};

module.exports = {
    getUsuarios,
    deleteUsuario
};
