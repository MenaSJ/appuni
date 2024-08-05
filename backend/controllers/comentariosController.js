// controllers/comentarioController.js
const Comentario = require('../models/comentarios');
const Universidad = require('../models/universidades');
const User = require('../models/usuarios');

// Agregar un nuevo comentario
const agregarComentario = async (req, res) => {
    console.log(req.body)
    const { universidadID, usuarioID, comentario } = req.body;
    if (!universidadID || !usuarioID || !comentario) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }
    const findUni = await Universidad.findById(universidadID).exec();
    const findUser = await User.findById(usuarioID).exec();
    if (!findUni || !findUser) {
        return res.status(400).json({ message: 'Universidad o Usuario no encontrada.' });
    }
    try {
        const nuevoComentario = await Comentario.create({
            "universidadID": universidadID,
            "usuarioID": usuarioID,
            "comentario": comentario
        });
        res.status(201).json(nuevoComentario);
    } catch (err) {
        res.status(500).json({ message: 'Error al agregar el comentario.' });
    }
};

// Obtener comentarios por ID de universidad
const getComentariosUniversidadID = async (req, res) => {
    const { universidadID } = req.query; // Cambiar a req.params para obtener el ID desde la URL

    try {
        // Buscar comentarios y poblar el campo usuarioID con nombre
        const comentarios = await Comentario.find({ universidadID })
            .populate({
                path: 'usuarioID', // Campo en el esquema de Comentario
                select: 'username' // Solo incluir el campo 'nombre'
            })
            .sort({ fecha: -1 }); // Ordenar por fecha en orden descendente

        res.status(200).json(comentarios);
    } catch (err) {
        console.error('Error al obtener los comentarios:', err);
        res.status(500).json({ message: 'Error al obtener los comentarios.' });
    }
};


// Eliminar un comentario
const eliminarComentario = async (req, res) => {
    const { comentarioID } = req.body;

    try {
        // Eliminar el comentario por su ID
        const resultado = await Comentario.findByIdAndDelete(comentarioID);

        if (!resultado) {
            return res.status(404).json({ message: 'Comentario no encontrado.' });
        }

        res.status(200).json({ message: 'Comentario eliminado exitosamente.' });
    } catch (err) {
        console.error('Error al eliminar el comentario:', err);
        res.status(500).json({ message: 'Error al eliminar el comentario.' });
    }
};

const actualizarComentario = async (req, res) => {
    const { comentarioID, usuarioID, nuevoComentario } = req.body;
    if (!nuevoComentario) {
        return res.status(400).json({ message: 'El nuevo comentario es requerido.' });
    }
    try {
        // Buscar el comentario por su ID
        const comentario = await Comentario.findById(comentarioID);
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado.' });
        }
        // Verificar que el usuario que hace la solicitud es el autor del comentario
        if (comentario.usuarioID.toString() !== usuarioID.toString()) {
            return res.status(403).json({ message: 'No tienes permiso para actualizar este comentario.' });
        }
        // Actualizar el comentario
        comentario.comentario = nuevoComentario;
        comentario.fecha = Date.now(); // Actualizar la fecha a la hora actual
        await comentario.save();
        res.status(200).json({ message: 'Comentario actualizado exitosamente.' });
    } catch (error) {
        console.error('Error al actualizar el comentario:', error);
        res.status(500).json({ message: 'Error al actualizar el comentario.' });
    }
};

// const eliminarComentarioAdmin = async (req, res) => {
//     const { comentarioID } = req.params;
//     const { usuarioID } = req.body;

//     try {
//         // Buscar el comentario por su ID
//         const comentario = await Comentario.findById(comentarioID);

//         if (!comentario) {
//             return res.status(404).json({ message: 'Comentario no encontrado.' });
//         }

//         // Verificar que el usuario que hace la solicitud es el autor del comentario o admin
//         // Aquí asumimos que tienes una manera de verificar si el usuario es admin
//         // Por simplicidad, estamos asumiendo que cualquier usuario puede eliminar cualquier comentario
//         if (comentario.usuarioID.toString() !== usuarioID.toString() && !isAdmin(usuarioID)) {
//             return res.status(403).json({ message: 'No tienes permiso para eliminar este comentario.' });
//         }

//         // Eliminar el comentario
//         await comentario.remove();

//         res.status(200).json({ message: 'Comentario eliminado exitosamente.' });
//     } catch (error) {
//         console.error('Error al eliminar el comentario:', error);
//         res.status(500).json({ message: 'Error al eliminar el comentario.' });
//     }
// };

// Helper function to check if the user is an admin
const isAdmin = (usuarioID) => {
    // Implementar lógica para verificar si el usuario es un admin
    return true; // Ejemplo: siempre devuelve true, reemplázalo con tu lógica real
};


module.exports = {
    agregarComentario,
    getComentariosUniversidadID,
    eliminarComentario,
    actualizarComentario
};
