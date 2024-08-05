const Universidad = require('../models/universidades');

const getUniversidades = async (req, res) => {
    const universidades = await Universidad.find();
    if (!universidades) return res.status(204).json({ 'message': 'No se econtraron Universidades' });
    res.json(universidades);
};
const getUniversidad = async (req, res) => {
    const { q } = req.query; // Obtener el parámetro de búsqueda 'q'

    if (!q) {
        return res.status(400).json({ 'message': 'Se requiere un parámetro de búsqueda' });
    }

    try {
        // Buscar universidades que coincidan con el término de búsqueda en varios campos
        const results = await Universidad.find({
            $or: [
                { Nombre: { $regex: q, $options: 'i' } }, // Buscar en Nombre (insensible a mayúsculas/minúsculas)
                { Siglas: { $regex: q, $options: 'i' } }, // Buscar en Siglas
            ]
        }).exec();

        if (results.length === 0) {
            return res.status(404).json({ 'message': 'El término de búsqueda no coincide con ninguna universidad' });
        }

        res.json(results);

    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ 'message': 'Error del servidor' });
    }
};



const getUniversidadById = async (req, res) => {
    const { id } = req.params; // Usar req.params para parámetros en GET requests con ID
    if (!id) {
        return res.status(400).json({ 'message': 'ID de universidad es requerido' });
    }
    try {
        const universidad = await Universidad.findById(id).exec();
        if (!universidad) {
            return res.status(404).json({ 'message': `Universidad con ID: ${id} no encontrada` });
        }
        res.json(universidad);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ 'message': 'Error del servidor' });
    }
};


//ARREGLAR
const createUniversidad = async (req, res) => {
    const datosUniversidad = req.body;
    if (!datosUniversidad?.Nombre || !datosUniversidad?.Pagina_Web || !datosUniversidad?.Vision || !datosUniversidad?.Mision || !datosUniversidad?.Logo) {
        return res.status(400).json({ 'message': 'Todos los campos son necesarios' });
    }
    const duplicate = await User.findOne({ Nombre: datosUniversidad.Nombre }).exec();
    if (duplicate) return res.sendStatus(409); //conflict
    try {
        const result = await Universidad.create({
        "Nombre": datosUniversidad.Nombre,
        "Siglas": datosUniversidad.Siglas,
        "Pagina_Web": datosUniversidad.Pagina_Web,
        "Vision": datosUniversidad.Vision,
        "Mision": datosUniversidad.Mision,
        "Logo": datosUniversidad.Logo,
        "Latitud": datosUniversidad.Latitud,
        "Longitud": datosUniversidad.Longitud,
        "Carreras": datosUniversidad.Carreras.map(carrera => ({
            "Carrera": carrera.Carrera
            }))
        });
    res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}
const updateUniversidad = async (req, res) => {
    const datosUniversidad = req.body;
    if (!datosUniversidad) {
        return res.status(400).json({ 'message': 'Se necesita el nombre'})
    }
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Id necesario'})
    }
    const universidad = await Universidad.findOne({ _id: req.body.id }).exec();
    if (!universidad) {
        return res.status(204).json({"message":`Ninguna Universidad con id: ${req.body.id}`})
    }
    if(datosUniversidad.Nombre) universidad.Nombre = datosUniversidad.Nombre
    if(datosUniversidad.Siglas) universidad.Siglas = datosUniversidad.Siglas
    if(datosUniversidad.Pagina_Web) universidad.Pagina_Web = datosUniversidad.Pagina_Web
    if(datosUniversidad.Vision) universidad.Vision = datosUniversidad.Vision
    if(datosUniversidad.Mision) universidad.Mision = datosUniversidad.Mision
    if(datosUniversidad.Logo) universidad.Logo = datosUniversidad.Logo
    if(datosUniversidad.Latitud) universidad.Latitud = datosUniversidad.Latitud
    if(datosUniversidad.Longitud) universidad.Longitud = datosUniversidad.Longitud
    if (datosUniversidad.Carreras) {
        universidad.Carreras = [...new Set([...universidad.Carreras, ...datosUniversidad.Carreras])];
    }
    await universidad.save();
    res.status(200).json(universidad);
}
const deleteUniversidad = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Universidad ID requerida.' });

    const universidad = await Universidad.findOne({ _id: req.body.id }).exec();
    if (!universidad) {
        return res.status(204).json({ "message": `Ninguna Universidad con id: ${req.body.id}.` });
    }
    const result = await universidad.deleteOne();
    res.status(200).json(result);
}
module.exports = {
    getUniversidades, getUniversidad, createUniversidad, updateUniversidad, deleteUniversidad, getUniversidadById
};
