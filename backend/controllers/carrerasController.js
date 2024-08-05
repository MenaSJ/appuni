// controllers/carreraController.js
const Carrera = require('../models/carreras');

// Obtener todas las carreras
const getCarreras = async (req, res) => {
    try {
        const carreras = await Carrera.find();
        console.log(carreras)
        return res.status(200).json(carreras);
    } catch (err) {
        return res.status(500).json({ message: 'Error del servidor.' });
    }
};

// Crear una nueva carrera
const createCarrera = async (req, res) => {
    const { Nombre } = req.body;
    if (!Nombre) {
        return res.status(400).json({ message: 'Nombre de la carrera es requerido.' });
    }
    const duplicado = await Carrera.findOne({ Nombre: Nombre }).exec();
    if (duplicado) {
        return res.sendStatus(409);
    }
    try {
        const result = await Carrera.create({ "Nombre": Nombre });
        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ message: 'Error al crear la carrera.' });
    }
};

// Actualizar una carrera existente
const updateCarrera = async (req, res) => {
    const { datosCarrera } = req.body;
    if (!datosCarrera) {
        return res.sendStatus(400);
    }
    if (!datosCarrera.Nombre || !datosCarrera.id) {
        return res.status(400).json({ message: 'Nombre e Id de la carrera es requerido.' });
    }
    try {
        const carrera = await Carrera.findOne({ _id: datosCarrera.id });
        if (!carrera) {
            return res.status(404).json({ message: 'Carrera no encontrada.' });
        }
        if (datosCarrera.Nombre) carrera.Nombre = datosCarrera.Nombre;
        await carrera.save();
        res.status(200).json(carrera);
    } catch (err) {
        return res.status(500).json({ message: 'Error al actualizar la carrera.' });
    }
};

// Eliminar una carrera
const deleteCarrera = async (req, res) => {
    const { id } = req.params;
    try {
        const carrera = await Carrera.findByIdAndDelete(id);
        if (!carrera) {
            return res.status(404).json({ message: 'Carrera no encontrada.' });
        }
        return res.status(200).json({ message: 'Carrera eliminada exitosamente.' });
    } catch (err) {
        return res.status(500).json({ message: 'Error al eliminar la carrera.' });
    }
};

module.exports = {
    getCarreras,
    createCarrera,
    updateCarrera,
    deleteCarrera
};
