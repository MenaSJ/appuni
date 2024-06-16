const Universidades = require('../models/universidades');

const getUniversidades = (req, res) => {
    Universidades.getAll((err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error al ejecutar la consulta.');
            return;
        }
        res.json(results);
    });
};

module.exports = {
    getUniversidades
};
