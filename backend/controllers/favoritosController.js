const Favorito = require('../models/favoritos');
const Universidad = require('../models/universidades');
const User = require('../models/usuarios');

const agregarFavorito = async (req, res) => {
    const { usuarioID, universidadID } = req.body;

    if (!usuarioID || !universidadID) {
        return res.status(400).json({ message: 'UsuarioID y UniversidadID son requeridos.' });
    }

    try {
        // Verificar que el usuario y la universidad existen
        const usuario = await User.findById(usuarioID).exec();
        const universidad = await Universidad.findById(universidadID).exec();

        if (!usuario || !universidad) {
            return res.status(404).json({ message: 'Usuario o Universidad no encontrada.' });
        }

        // Verificar si ya está en la lista de favoritos
        const favoritoExistente = await Favorito.findOne({ usuarioID, universidadID }).exec();
        if (favoritoExistente) {
            return res.status(409).json({ message: 'Universidad ya está en la lista de favoritos.' });
        }

        // Agregar a favoritos
        const nuevoFavorito = new Favorito({ usuarioID, universidadID });
        await nuevoFavorito.save();

        // Poblar la información de la universidad en el favorito recién agregado
        const favoritoConUniversidad = await Favorito.findById(nuevoFavorito._id)
            .populate({
                path: 'universidadID', // Campo en el esquema de Favorito
                select: 'Nombre Siglas Pagina_Web Vision Mision Logo Latitud Longitud Carreras' // Campos a incluir
            })
            .exec();

        res.status(201).json(favoritoConUniversidad);
    } catch (err) {
        console.error('Error al agregar a favoritos:', err);
        res.status(500).json({ message: 'Error al agregar a favoritos.' });
    }
};


// Obtener universidades favoritas del usuario
const obtenerFavoritos = async (req, res) => {
    const { q } = req.query;
    const usuarioID = q;
    try {
        // Buscar favoritos del usuario y poblar la información de la universidad
        const favoritos = await Favorito.find({ usuarioID })
            .populate({
                path: 'universidadID', // Campo en el esquema de Favorito
                select: 'Nombre Siglas Pagina_Web Vision Mision Logo Latitud Longitud Carreras' // Campos a incluir
            });

        if (favoritos.length === 0) {
            return res.status(404).json({ message: 'No tienes universidades favoritas.' });
        }

        res.status(200).json(favoritos);
    } catch (err) {
        console.error('Error al obtener favoritos:', err);
        res.status(500).json({ message: 'Error al obtener favoritos.' });
    }
};

const eliminarFavorito = async (req, res) => {
    const { usuarioID, universidadID } = req.body;

    try {
        // Validate inputs
        if (!universidadID || !usuarioID) {
            return res.status(400).json({ message: 'UniversidadID y UsuarioID son requeridos.' });
        }

        // Eliminar el favorito
        const resultado = await Favorito.deleteOne({ usuarioID, universidadID });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ message: 'Favorito no encontrado.' });
        }

        res.status(200).json({ message: 'Favorito eliminado exitosamente.' });
    } catch (err) {
        console.error('Error al eliminar favorito:', err);
        res.status(500).json({ message: 'Error al eliminar favorito.' });
    }
};


module.exports = {
    agregarFavorito,
    obtenerFavoritos,
    eliminarFavorito
};
