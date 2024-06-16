const express = require('express');
const router = express.Router();
const universidadesController = require('../controllers/universidadesController');
const carrerasController = require('../controllers/carrerasController');

router.get('/universidades', universidadesController.getUniversidades);
router.get('/carreras/:universidadID', carrerasController.getCarreras);

module.exports = router;
