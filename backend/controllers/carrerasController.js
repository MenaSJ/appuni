const Carreras = require('../models/carreras');

const getCarreras = (req, res) => {
    const universidadID = req.params.universidadID;
    Carreras.getByUniversityId(universidadID, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error al ejecutar la consulta.');
            return;
        }
        res.json(results);
    });
};

module.exports = {
    getCarreras
};
